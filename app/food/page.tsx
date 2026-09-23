import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Food" };
export const dynamic = "force-dynamic";

export default async function FoodPage() {
  const { food } = await getSite();

  return (
    <main id="main">
      <PageHero title="Food" image="/photos/sunday-roast.jpg">
        Friday pizza now. Sunday roasts from April 2026.
      </PageHero>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <article className="rounded-2xl bg-cream-dark p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-brick uppercase">
            Every Friday
          </p>
          <h2 className="font-display mt-2 text-3xl">Pizza</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{food.fridayPizza}</p>
        </article>
        <article className="rounded-2xl bg-cream-dark p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-brick uppercase">
            From April 2026
          </p>
          <h2 className="font-display mt-2 text-3xl">Sunday roasts</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{food.roasts}</p>
        </article>
      </section>
      <div className="relative mx-auto mb-16 h-72 max-w-5xl overflow-hidden rounded-2xl px-4 sm:px-6">
        <div className="relative h-full overflow-hidden rounded-2xl">
          <Image
            src="/photos/friday-pizza-poster.jpg"
            alt="Tiago’s Pizza at The Beehive, Friday 4:30 to 9pm"
            fill
            className="object-contain bg-cream-dark"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </div>
      </div>
    </main>
  );
}
