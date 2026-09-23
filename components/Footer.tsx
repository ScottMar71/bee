import Link from "next/link";
import type { SiteContent } from "@/lib/types";
import { NAV } from "@/lib/nav";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">The Beehive</p>
          <p className="mt-2 text-sm text-muted">
            A traditional English real ale pub in Eaton, Norwich, since 1892.
          </p>
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
      <p className="border-t border-ink/10 px-4 py-4 text-center text-xs text-muted">
        The Beehive Freehouse, Eaton, Norwich
      </p>
    </footer>
  );
}
