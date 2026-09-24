"use server";

import { Resend } from "resend";
import { getSite } from "@/lib/site";

export type ContactState = {
  ok: boolean;
  error?: string;
  values?: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (String(formData.get("website") || "").trim()) {
    return { ok: true };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const values = { name, email, phone, message };

  if (name.length < 2) {
    return { ok: false, error: "Please enter your name.", values };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address.", values };
  }
  if (message.length < 10) {
    return {
      ok: false,
      error: "Please write a slightly longer message.",
      values,
    };
  }
  if (message.length > 4000) {
    return { ok: false, error: "That message is a bit too long.", values };
  }

  const site = await getSite();
  const to = process.env.CONTACT_TO || site.contact.email;

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend({ to, name, email, phone, message });
    } else {
      await sendWithFormSubmit({ to, name, email, phone, message });
    }
    return { ok: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "";
    if (detail.includes("activate")) {
      return {
        ok: false,
        error:
          "The first message needs a one-time confirmation. Please check the inbox and try again.",
        values,
      };
    }
    return {
      ok: false,
      error: "Sorry — the message could not be sent. Please try emailing us directly.",
      values,
    };
  }
}

async function sendWithResend({
  to,
  name,
  email,
  phone,
  message,
}: {
  to: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from =
    process.env.CONTACT_FROM || "The Beehive <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Website enquiry from ${name}`,
    text: formatText({ name, email, phone, message }),
    html: formatHtml({ name, email, phone, message }),
  });
  if (error) throw new Error(error.message);
}

async function sendWithFormSubmit({
  to,
  name,
  email,
  phone,
  message,
}: {
  to: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || "Not given",
      message,
      _subject: `Website enquiry from ${name}`,
      _replyto: email,
      _template: "table",
      _captcha: "false",
    }),
  });

  const payload = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  if (!response.ok || payload?.success === "false" || payload?.success === false) {
    throw new Error(payload?.message || "FormSubmit request failed.");
  }
}

function formatText({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return [
    `New message from The Beehive website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not given"}`,
    ``,
    message,
  ].join("\n");
}

function formatHtml({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return `
    <h2>New message from The Beehive website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not given")}</p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
