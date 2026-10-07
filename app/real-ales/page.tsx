import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Real Ales",
  description:
    "Cask ales from Norfolk and Suffolk breweries at The Beehive, an award-winning pub in Eaton, Norwich.",
  path: "/real-ales",
});
export const dynamic = "force-dynamic";

const BREWERIES = [
  {
    name: "Humpty Dumpty",
    logo: "/logos/humpty-dumpty.png",
    note: "Reedham brewery on the Norfolk Broads, brewing cask ales since 1998.",
  },
  {
    name: "Ampersand",
    logo: "/logos/ampersand.png",
    note: "A Diss brewery in south Norfolk, brewing seasonal beers.",
  },
  {
    name: "Winter’s",
    logo: "/logos/winters.png",
    note: "A Norwich family brewery, pouring local ales from the edge of the city.",
  },
  {
    name: "Grain",
    logo: "/logos/grain.png",
    note: "Cask and keg beers from South Farm in Alburgh, near Harleston.",
  },
  {
    name: "Green Jack",
    logo: "/logos/green-jack.png",
    note: "Lowestoft brewers, including our house bitter — Green Jack Golden Best.",
  },
  {
    name: "Moon Gazer",
    logo: "/logos/moon-gazer.png",
    note: "Ales from Hindringham in north Norfolk, brewed on the family farm since 2012.",
  },
];

export default async function RealAlesPage() {
  const site = await getSite();

  return (
    <main id="main">
      <PageHero
        title="Real Ales"
        image="/photos/real-ales-hero.jpg"
        imageClassName="object-cover object-[center_62%]"
      >
        An award-winning range from local and national brewers, plus lagers,
        cider and bottled Belgian beers.
      </PageHero>

      <Reveal>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-4xl">Our Real Ale Selection</h2>
        <p className="mt-6 text-lg leading-8 text-muted">
          At the Beehive, we believe that real ale is more than just a drink —
          it’s a celebration of British brewing craftsmanship, tradition, and
          passion. That’s why we’ve dedicated ourselves to serving only the
          finest cask-conditioned ales from carefully selected breweries across
          Norfolk, East Anglia, and beyond.
        </p>

        <h2 className="font-display mt-16 text-4xl">
          Seven Hand Pumps of Distinction
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted">
          We serve 5 changing beers and 1 regular, meaning there’s always
          something new to discover alongside our house favourites. Each beer
          is selected with care — we don’t simply fill our taps; we partner
          with breweries whose values and quality match our own.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          Our team constantly researches British breweries and distilleries to
          ensure our selection reflects the very best that the independent
          brewing world has to offer. When you visit the Beehive, you’re not
          just getting a pint — you’re getting a carefully curated experience.
        </p>
        <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-cream-dark p-6 sm:flex-row sm:items-center">
          <Image
            src="/logo/real-ale-finder.jpg"
            alt=""
            width={512}
            height={512}
            className="h-24 w-24 shrink-0 rounded-[1.35rem]"
          />
          <div>
            <h3 className="font-display text-3xl">Real Ale Finder</h3>
            <p className="mt-2 text-lg leading-8 text-muted">
              See what’s on the bar before you come in. The app shows the beers
              and ciders currently on at nearby pubs, with a live map and
              tasting notes, and it can tell you when a favourite beer turns up
              close by.
            </p>
            <a
              className="mt-3 inline-flex text-brick underline-offset-2 hover:underline"
              href="https://apps.apple.com/gb/app/real-ale-finder/id1450647388"
              target="_blank"
              rel="noreferrer"
            >
              Get it on the App Store
            </a>
          </div>
        </div>

        <h2 className="font-display mt-16 text-4xl">Featured Breweries</h2>
        <p className="mt-6 text-lg leading-8 text-muted">
          Our commitment to quality means we work with established regional
          breweries and emerging artisans alike. Here are some of the
          breweries you’ll find on our taps:
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {BREWERIES.map((brewery) => (
            <li key={brewery.name} className="rounded-2xl bg-cream-dark p-6 text-center">
              <div className="relative mx-auto mb-4 h-24">
                <Image
                  src={brewery.logo}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="320px"
                />
              </div>
              <h3 className="font-display text-2xl">{brewery.name}</h3>
              <p className="mt-2 text-muted">{brewery.note}</p>
            </li>
          ))}
        </ul>
      </article>
      </Reveal>

      <Reveal>
      <section className="bg-cream-dark py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-center text-4xl">On the bar now</h2>
          {site.ales.length === 0 ? (
            <p className="mt-8 text-center text-lg text-muted">
              What’s on the bar changes regularly. Ask at the bar for today’s
              ales — or check back here after the next update.
            </p>
          ) : (
            <ul className="mt-8 divide-y divide-ink/10">
              {site.ales.map((ale) => (
                <li key={ale.id} className="py-5">
                  <p className="font-display text-2xl">{ale.name}</p>
                  <p className="text-sm text-brick">{ale.brewery}</p>
                  {ale.note ? (
                    <p className="mt-1 text-muted">{ale.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      </Reveal>
    </main>
  );
}
