import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { HoursList } from "@/components/HoursList";
import { SectionHeading } from "@/components/SectionHeading";
import { getSite } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const site = await getSite();

  return (
    <main id="main">
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src="/photos/hero-leopold-2.jpg"
          alt="The Beehive pub on Leopold Road, Norwich"
          fill
          priority
          className="z-0 object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
        <h1 className="sr-only">The Beehive</h1>
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="flex h-56 w-56 items-center justify-center rounded-full bg-black shadow-2xl sm:h-72 sm:w-72">
            <Image
              src="/beehive-logo-white.png"
              alt=""
              width={260}
              height={235}
              className="h-40 w-auto sm:h-52"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-4 pb-8 text-center sm:pb-10">
          <p className="text-sm tracking-[0.28em] text-cream/90 uppercase">
            Award-winning · Eaton, Norwich · since 1892
          </p>
          <a
            href="#welcome"
            className="mt-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cream/70 text-cream transition hover:bg-cream hover:text-ink"
            aria-label="Scroll down"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>

      <section
        id="welcome"
        className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 text-center sm:px-6"
      >
        <SectionHeading eyebrow="Welcome">Welcome</SectionHeading>
        <p className="mt-8 text-lg leading-8 text-muted">
          An award-winning traditional English real ale pub that has been
          trading in Norwich since 1892.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The Beehive Pub in Eaton, Norwich offers a friendly and relaxed
          atmosphere in which to enjoy a drink and socialise, with customers
          from all ages. The pub prides itself on featuring an excellent range
          of real ales, lagers, cider and a range of bottled Belgian beers.
        </p>
      </section>

      <section id="whats-on" className="bg-cream-dark py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="This week">What’s on</SectionHeading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {site.whatsOn.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-cream p-6 shadow-sm"
              >
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3">
        {[
          {
            href: "/real-ales",
            src: "/photos/bar-pumps.jpg",
            title: "Real ales",
            copy: "Local and national brewers, plus lager, cider and Belgian bottles.",
          },
          {
            href: "/function-room",
            src: "/photos/wine-tasting-cheese.jpg",
            title: "Function room",
            copy: "Upstairs for parties, clubs, societies and meetings.",
          },
          {
            href: "/gallery",
            src: "/photos/garden-festival-crowd.jpg",
            title: "Garden & festivals",
            copy: "A large beer garden, charity barbecue and a summer beer festival.",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group overflow-hidden rounded-2xl bg-cream-dark shadow-sm transition hover:-translate-y-1"
          >
            <div className="relative h-56">
              <Image
                src={card.src}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl">{card.title}</h3>
              <p className="mt-2 text-sm text-muted">{card.copy}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="border-t border-ink/10 bg-cream-dark">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <SectionHeading>Opening hours</SectionHeading>
            <div className="mx-auto mt-8 max-w-md">
              <HoursList hours={site.hours} />
            </div>
          </div>
          <div>
            <SectionHeading>Find us</SectionHeading>
            <p className="mt-8 text-center text-muted">
              {site.contact.addressLines.join(", ")}
            </p>
            <p className="mt-4 text-center text-sm text-muted">
              {site.contact.location}
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink href="/contact" variant="ghost">
                Map & contact
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
