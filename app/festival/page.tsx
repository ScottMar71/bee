import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const FESTIVAL_PHOTOS = [
  {
    src: "/photos/festival-stillage.jpg",
    alt: "Casks on the stillage at the Beehive Beer Festival",
  },
  {
    src: "/photos/festival-casks.jpg",
    alt: "Rows of festival casks under the marquee",
  },
];

export const metadata: Metadata = { title: "Beer Festival" };

export default function FestivalPage() {
  return (
    <main id="main">
      <PageHero
        title="The Beehive Beer Festival"
        image="/photos/festival-marquee.jpg"
        imageClassName="object-cover object-center"
      >
        A summer celebration of great beer, good food and proper pub life.
      </PageHero>

      <Reveal>
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Every summer, the Beehive throws open its doors for one of the
              highlights of the Norwich beer calendar – the Beehive Beer
              Festival.
            </p>
            <p>
              Held at our traditional Victorian pub on Leopold Road, the
              festival brings together a fantastic selection of local and
              national beers and ciders, giving beer lovers the chance to
              discover something new while enjoying the relaxed atmosphere that
              makes the Beehive such a special local.
            </p>
            <p>
              With more than 25 beers and ciders featured at recent festivals,
              there’s plenty to explore – from familiar favourites to beers
              from independent breweries and producers.
            </p>
            <p>But it’s not just about the beer.</p>
            <p>
              The festival is a proper Beehive weekend, with food, our garden,
              good company and a lively atmosphere throughout. Recent festivals
              have featured wood-fired pizzas from Tiago’s Pizza and a weekend
              barbecue, giving visitors plenty of options to enjoy alongside
              their pint.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {FESTIVAL_PHOTOS.map((photo) => (
              <li
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-dark"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 360px, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl bg-cream-dark px-6 py-8 text-center">
            <Image
              src="/logos/nancy-oldfield.png"
              alt="The Nancy Oldfield Trust, accessible boating on the Broads"
              width={336}
              height={205}
              className="mx-auto h-auto w-48"
            />
            <p className="mt-4 text-lg leading-8 text-muted">
              All proceeds from the BBQ donated to The Nancy Oldfield Trust.
            </p>
          </div>
        </article>
      </Reveal>

      <Reveal>
        <section className="bg-cream-dark py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-4xl">Come and raise a glass</h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Whether you’re a dedicated real-ale fan, keen to discover a new
              favourite, or simply looking for a great summer afternoon or
              evening with friends, the Beehive Beer Festival is a chance to
              enjoy the pub at its liveliest.
            </p>
            <p className="font-display mt-8 text-2xl text-ink">
              Great beer. Good food. A proper local pub.
            </p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
