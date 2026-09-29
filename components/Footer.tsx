import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsent";
import type { SiteContent } from "@/lib/types";
import { NAV } from "@/lib/nav";

export function Footer({ site }: { site: SiteContent }) {
  const { facebook, twitter, instagram, camra } = site.socials;

  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">The Beehive</p>
          <p className="mt-2 text-sm text-muted">
            An award-winning traditional English real ale pub in Eaton,
            Norwich, since 1892.
          </p>
          <nav
            aria-label="Social"
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            {facebook ? (
              <a
                href={facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="The Beehive on Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-ink/5 hover:text-brick"
              >
                <FacebookIcon />
              </a>
            ) : null}
            {twitter ? (
              <a
                href={twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="The Beehive on Twitter"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-ink/5 hover:text-brick"
              >
                <TwitterIcon />
              </a>
            ) : null}
            {instagram ? (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="The Beehive on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-ink/5 hover:text-brick"
              >
                <InstagramIcon />
              </a>
            ) : null}
            {camra ? (
              <a
                href={camra}
                target="_blank"
                rel="noreferrer"
                aria-label="Norwich & District CAMRA"
                className="inline-flex items-center"
              >
                <Image
                  src="/logo/norwich-camra.png"
                  alt="Norwich & District CAMRA"
                  width={512}
                  height={512}
                  className="h-16 w-auto"
                />
              </a>
            ) : null}
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase">Find us</p>
          <address className="mt-3 not-italic text-sm leading-7 text-muted">
            {site.contact.addressLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
            <a
              className="mt-2 block text-brick underline-offset-2 hover:underline"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
            </a>
          </address>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase">Visit</p>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-brick">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 px-4 py-4 text-center text-xs text-muted">
        <p>The Beehive Freehouse, Eaton, Norwich</p>
        <p className="mt-1 flex flex-wrap items-center justify-center gap-x-4">
          <CookieSettingsButton />
          <Link
            href="/cookies"
            className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-brick focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
          >
            Cookie policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M22 12.07A10 10 0 1 0 10.44 21.9v-6.94H7.9v-2.89h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.94A10 10 0 0 0 22 12.07" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.54 8.54 0 0 1-2.7 1.03 4.26 4.26 0 0 0-7.26 3.88A12.1 12.1 0 0 1 3.15 4.9a4.26 4.26 0 0 0 1.32 5.68 4.22 4.22 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.92.07 4.27 4.27 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.41 12.06 12.06 0 0 0 8.29 20.3c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.36-.01-.53A8.35 8.35 0 0 0 22.46 6z" />
    </svg>
  );
}
