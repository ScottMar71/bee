import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { HoursList } from "@/components/HoursList";
import { Reveal } from "@/components/Reveal";
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
          className="hero-zoom z-0 object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-4 pb-8 text-center sm:pb-10">
          <div className="w-full max-w-xl rounded-3xl bg-ink/45 px-6 py-8 backdrop-blur-md sm:px-10">
            <h1 className="hero-rise font-display text-5xl leading-none text-cream sm:text-6xl">
              The Beehive
            </h1>
            <p className="hero-rise hero-rise-2 mt-4 text-sm tracking-[0.28em] text-cream/90 uppercase">
              Award-winning · Eaton, Norwich · since 1892
            </p>
          </div>
          <a
            href="#welcome"
            className="hero-rise hero-rise-3 group mt-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cream/70 text-cream transition hover:bg-cream hover:text-ink"
            aria-label="Scroll down"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 transition-transform duration-300 group-hover:translate-y-1"
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
        <Reveal>
          <div className="mx-auto mb-8 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-black p-2 sm:h-44 sm:w-44 sm:p-2.5">
            <Image
              src="/logo/beehive-logo.png"
              alt=""
              width={260}
              height={235}
              className="h-auto w-full translate-y-1.5"
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <SectionHeading>Welcome</SectionHeading>
        </Reveal>
        <Reveal delay={160}>
          <div>
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
          </div>
        </Reveal>
      </section>

      <section id="whats-on" className="bg-cream-dark py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="This week">What’s on</SectionHeading>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {site.whatsOn.map((item, index) => (
              <Reveal key={item.id} delay={index * 80} className="h-full">
                <article className="h-full rounded-2xl bg-cream p-6 shadow-sm">
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.detail}</p>
                </article>
              </Reveal>
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
            href: "/food",
            src: "/photos/sunday-roast-plate.jpg",
            title: "Food",
            copy: "Friday pizza and Sunday roasts at the pub.",
          },
          {
            href: "/function-room",
            src: "/photos/wine-tasting-cheese.jpg",
            title: "Function room",
            copy: "Upstairs for parties, clubs, societies and meetings.",
          },
        ].map((card, index) => (
          <Reveal key={card.href} delay={index * 90} className="h-full">
          <Link
            href={card.href}
            className="group block h-full overflow-hidden rounded-2xl bg-cream-dark shadow-sm transition hover:-translate-y-1"
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
          </Reveal>
        ))}
      </section>

      <section className="border-t border-ink/10 bg-cream-dark">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading>Opening hours</SectionHeading>
              <div className="mx-auto mt-8 max-w-md">
                <HoursList hours={site.hours} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
