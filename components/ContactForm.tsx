"use client";

import { useActionState } from "react";
import { sendContactAction, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { ok: false };

const fieldClass =
  "mt-1 min-h-12 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactAction, initial);

  if (state.ok) {
    return (
      <p
        className="rounded-2xl bg-cream-dark px-6 py-8 text-lg leading-8"
        role="status"
      >
        Thank you — your message is on its way. We’ll get back to you as soon
        as we can.
      </p>
    );
  }

  return (
    <form
      key={state.error ?? "idle"}
      action={action}
      className="space-y-5"
    >
      <label className="sr-only" htmlFor="website">
        Website
      </label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <label className="block text-sm font-medium" htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={state.values?.name}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium" htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium" htmlFor="phone">
        Phone <span className="font-normal text-muted">(optional)</span>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={state.values?.phone}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium" htmlFor="message">
        Message
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          defaultValue={state.values?.message}
          className={`${fieldClass} min-h-36`}
        />
      </label>

      {state.error ? (
        <p className="text-sm text-brick" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="cta inline-flex min-h-12 items-center justify-center rounded-full bg-brick px-7 text-base font-semibold tracking-wide text-cream shadow-sm hover:bg-brick-dark hover:shadow disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
