import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie policy",
  description:
    "How The Beehive website uses cookies. The site does not use analytics or advertising cookies.",
  path: "/cookies",
});
export const dynamic = "force-dynamic";

export default async function CookiePolicyPage() {
  const site = await getSite();

  return (
    <main id="main">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-5xl">Cookie policy</h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          This page describes the cookies and similar tools actually used on
          The Beehive website. The site does not use analytics or advertising
          cookies.
        </p>

        <h2 className="font-display mt-12 text-3xl">Necessary</h2>
        <p className="mt-4 text-lg leading-8 text-muted">
          These stay on. They are not used to advertise to you.
        </p>
        <ul className="mt-4 space-y-4 text-lg leading-8 text-muted">
          <li>
            <strong className="text-ink">beehive_consent.</strong> Set when you
            accept, reject, or save cookie preferences. It remembers that
            choice for 6 months and stores the choice only, not your name or
            contact details.
          </li>
          <li>
            <strong className="text-ink">beehive_admin.</strong> Set only when
            the pub owner logs in to update the site. It remembers that login
            for 14 days. People browsing the site do not receive it.
          </li>
        </ul>

        <h2 className="font-display mt-12 text-3xl">Map</h2>
        <p className="mt-4 text-lg leading-8 text-muted">
          The contact page can show a Google Map. The map is not loaded until
          you allow it. If you allow it, your browser loads the map from
          Google, and Google may set its own cookies. This site does not choose
          those cookies or how long Google keeps them. Google describes its own
          practices at{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-brick underline underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            policies.google.com/privacy
          </a>
          .
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">
          Switching the map off stops it from loading again. Cookies Google has
          already stored stay in your browser until you clear them or they
          expire.
        </p>

        <h2 className="font-display mt-12 text-3xl">Contact form</h2>
        <p className="mt-4 text-lg leading-8 text-muted">
          The contact form does not set a cookie. If you send a message, your
          name, email, phone number and message are emailed to the pub through
          FormSubmit.
        </p>

        <h2 className="font-display mt-12 text-3xl">Links that leave the site</h2>
        <p className="mt-4 text-lg leading-8 text-muted">
          Facebook, Twitter, CAMRA, and “Open in Google Maps” are ordinary
          links. Those sites are not loaded until you choose to open them.
        </p>

        <h2 className="font-display mt-12 text-3xl">Change your choice</h2>
        <p className="mt-4 text-lg leading-8 text-muted">
          Use Cookie settings in the footer, or the button here. Questions
          about this page can go to{" "}
          <a
            className="text-brick underline underline-offset-2 hover:underline"
            href={`mailto:${site.contact.email}`}
          >
            {site.contact.email}
          </a>
          .
        </p>
        <div className="mt-4">
          <CookieSettingsButton />
        </div>
      </article>
    </main>
  );
}
