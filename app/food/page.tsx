import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Food" };
export const dynamic = "force-dynamic";

export default async function FoodPage() {
  const { food } = await getSite();

  return (
    <main id="main">
      <PageHero title="Food" image="/photos/sunday-roast.jpg">
        Friday pizza and Sunday roasts at an award-winning Eaton local.
      </PageHero>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <article className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-brick uppercase">
                Every Friday, 5–9pm
              </p>
              <h2 className="font-display mt-2 text-4xl">
                Tiago’s Pizza at The Beehive
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-8 text-muted">
                <p>
                  Every Friday from 5–9pm, Tiago’s Pizza takes up residence at
                  The Beehive on Leopold Road, bringing a taste of Italy right
                  to our doorstep.
                </p>
                <p>
                  Tiago’s is no ordinary pizza van. Their freshly made pizzas
                  combine classic favourites with imaginative weekly specials,
                  offering something a little different every time you visit.
                  Expect light, crispy bases, generous toppings and plenty of
                  flavour.
                </p>
                <p>
                  It’s become a firm Friday favourite with locals, and it’s
                  easy to see why. Whether you fancy a traditional topping or
                  want to try one of Tiago’s more adventurous creations,
                  there’s always something worth coming back for.
                </p>
                <p>
                  And there’s no need to stand around waiting. Grab yourself a
                  drink from the bar, take a buzzer and relax while your pizza
                  is being prepared.
                </p>
              </div>
            </div>
            <Image
              src="/photos/tiagos-pizza.jpg"
              alt="Tiago’s Pizza box, wood fired oven, established 2023"
              width={447}
              height={447}
              className="h-auto w-full rounded-2xl"
            />
          </article>
        </Reveal>
        <Reveal delay={90}>
          <article className="mt-10 max-w-xl rounded-2xl bg-cream-dark p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-brick uppercase">
              From April 2026
            </p>
            <h2 className="font-display mt-2 text-3xl">Sunday roasts</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{food.roasts}</p>
          </article>
        </Reveal>
      </section>
    </main>
  );
}
