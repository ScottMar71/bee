import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { HoursList } from "@/components/HoursList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getSite, mapEmbedUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const site = await getSite();
  const mapSrc = mapEmbedUrl(site.contact.mapQuery);

  return (
    <main id="main">
      <PageHero title="Contact" image="/photos/exterior-corner.jpg">
        An award-winning real ale pub on Leopold Road, Eaton — halfway between
        Unthank Road and Newmarket Road.
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal>
        <div>
          <h2 className="font-display text-3xl">Address</h2>
          <address className="mt-4 not-italic text-lg leading-8 text-muted">
            {site.contact.addressLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
          <p className="mt-6">
            <a
              className="text-lg text-brick underline-offset-2 hover:underline"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
            </a>
          </p>
          {site.contact.phone ? (
            <p className="mt-2">
              <a
                className="text-lg text-brick underline-offset-2 hover:underline"
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              >
                {site.contact.phone}
              </a>
            </p>
          ) : null}
          <p className="mt-8 text-muted">{site.contact.location}</p>
          <h2 className="font-display mt-12 text-3xl">Opening hours</h2>
          <div className="mt-4 max-w-md">
            <HoursList hours={site.hours} />
          </div>
        </div>
        </Reveal>
        <Reveal delay={100}>
        <div>
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream-dark">
            <iframe
              title="Map of The Beehive, Leopold Road, Norwich"
              src={mapSrc}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-sm">
            <a
              className="text-brick underline-offset-2 hover:underline"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
        </Reveal>
      </section>
      <Reveal>
      <section className="bg-cream-dark py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-display text-4xl">Send a message</h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            Drop us a line and we’ll get back to you as soon as we can.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
      </Reveal>
    </main>
  );
}
