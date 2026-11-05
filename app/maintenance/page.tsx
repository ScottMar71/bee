import type { Metadata } from "next";
import Image from "next/image";
import { HoursList } from "@/components/HoursList";
import { contactActions } from "@/lib/contact-actions";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Coming soon | The Beehive Norwich" },
  description:
    "Our new website is coming soon. The Beehive pub in Eaton, Norwich is open as usual.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Coming soon | The Beehive Norwich",
    description: "Our new website is coming soon. The pub is open as usual.",
  },
};

export const dynamic = "force-dynamic";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default async function MaintenancePage() {
  const site = await getSite();
  const actions = contactActions(site.contact.phone);
  const socials = [
    site.socials.facebook
      ? { href: site.socials.facebook, name: "Facebook" }
      : null,
    site.socials.instagram
      ? { href: site.socials.instagram, name: "Instagram" }
      : null,
  ].filter((item) => item !== null);

  return (
    <main
      id="main"
      className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col px-4 py-16"
    >
      <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-black p-2 sm:h-44 sm:w-44 sm:p-2.5">
        <Image
          src="/logo/beehive-logo.png"
          alt=""
          width={260}
          height={235}
          priority
          className="h-auto w-full translate-y-1.5"
        />
      </div>
      <h1 className="font-display mt-8 text-center text-5xl text-ink">
        The Beehive
      </h1>
      <p className="mt-3 text-center text-sm tracking-[0.22em] text-muted uppercase">
        Eaton, Norwich
      </p>
      <p className="mt-6 text-center text-lg leading-8 text-ink">
        Our new website is coming soon. The pub is open as usual.
      </p>

      <section className="mt-10">
        <h2 className="text-sm font-semibold tracking-wide uppercase">Find us</h2>
        <address className="mt-3 leading-7 text-muted not-italic">
          {site.contact.addressLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </address>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Opening hours
        </h2>
        <div className="mt-1">
          <HoursList hours={site.hours} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold tracking-wide uppercase">Contact</h2>
        {actions.call || actions.whatsapp ? (
          <div className="mt-4 flex flex-col gap-4">
            {actions.call ? (
              <div>
                <a
                  href={actions.call.href}
                  className={`inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brick px-7 text-base font-semibold text-cream ${focus}`}
                >
                  Call {actions.call.label}
                </a>
                {actions.call.note ? (
                  <p className="mt-2 text-center text-sm text-muted">
                    {actions.call.note}
                  </p>
                ) : null}
              </div>
            ) : null}
            {actions.whatsapp ? (
              <div>
                <a
                  href={actions.whatsapp.href}
                  className={`inline-flex min-h-12 w-full items-center justify-center rounded-full border border-ink/15 bg-cream px-7 text-base font-semibold text-ink ${focus}`}
                >
                  WhatsApp {actions.whatsapp.label}
                </a>
                {actions.whatsapp.note ? (
                  <p className="mt-2 text-center text-sm text-muted">
                    {actions.whatsapp.note}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 leading-7 text-muted">{actions.raw}</p>
        )}
      </section>

      {socials.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Follow
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-11 items-center text-brick underline underline-offset-2 ${focus}`}
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
