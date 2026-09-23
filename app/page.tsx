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
          src="/photos/hero-exterior.jpg"
          alt="The Beehive pub on Leopold Road, Norwich"
          fill
          priority
          className="object-cover object-[50%_70%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-4xl flex-col items-center justify-end px-4 pb-10 text-center sm:pb-14">
          <div className="rise w-full max-w-xl rounded-3xl bg-ink/55 px-6 py-8 backdrop-blur-sm sm:px-10">
            <p className="text-sm tracking-[0.28em] text-cream/90 uppercase">
              Eaton, Norwich · since 1892
            </p>
            <h1 className="font-display mt-3 text-5xl text-cream sm:text-6xl">
              The Beehive
            </h1>
            <p className="mt-4 text-lg text-cream/90">
              A traditional English real ale pub that has been trading in Norwich
              since 1892.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink href="#whats-on">What’s on</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Find us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <SectionHeading eyebrow="Welcome">Welcome</SectionHeading>
        <p className="mt-8 text-lg leading-8 text-muted">
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
