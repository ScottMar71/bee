import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Real Ales" };
export const dynamic = "force-dynamic";

const BREWERIES = [
  {
    name: "Humpty Dumpty",
    note: "Reedham brewery on the Norfolk Broads, brewing cask ales since 1998.",
  },
  {
    name: "Adnams",
    note: "Southwold’s brewery, a Suffolk name long found in East Anglian pubs.",
  },
  {
    name: "Winter’s",
    note: "A Norwich family brewery, pouring local ales from the edge of the city.",
  },
  {
    name: "Wolf",
    note: "Norfolk ales from Besthorpe, near Attleborough, since 1995.",
  },
  {
    name: "Green Jack",
    note: "Lowestoft brewers, including our house bitter — Green Jack Golden Best.",
  },
  {
    name: "Chalk Hill",
    note: "Norwich’s long-running independent brewery, on Rosary Road.",
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

        <h2 className="font-display mt-16 text-4xl">Featured Breweries</h2>
        <p className="mt-6 text-lg leading-8 text-muted">
          Our commitment to quality means we work with established regional
          breweries and emerging artisans alike. Here are some of the
          breweries you’ll find on our taps:
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {BREWERIES.map((brewery) => (
            <li key={brewery.name} className="rounded-2xl bg-cream-dark p-6">
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
