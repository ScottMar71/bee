import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Real Ales" };
export const dynamic = "force-dynamic";

export default async function RealAlesPage() {
  const site = await getSite();

  return (
    <main id="main">
      <PageHero title="Real Ales" image="/photos/bar-pumps.jpg">
        An excellent range from local and national brewers, plus lagers, cider
        and bottled Belgian beers.
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {site.ales.length === 0 ? (
          <p className="text-center text-lg text-muted">
            What’s on the bar changes regularly. Ask at the bar for today’s
            ales — or check back here after the next update.
          </p>
        ) : (
          <ul className="divide-y divide-ink/10">
            {site.ales.map((ale) => (
              <li key={ale.id} className="py-5">
                <p className="font-display text-2xl">{ale.name}</p>
                <p className="text-sm text-brick">{ale.brewery}</p>
                {ale.note ? <p className="mt-1 text-muted">{ale.note}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
