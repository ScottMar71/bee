import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const SUNDAY_PHOTOS = [
  {
    src: "/photos/sunday-lunch-window.jpg",
    alt: "Sunday roast and cauliflower cheese by the window",
  },
  {
    src: "/photos/sunday-brownie.jpg",
    alt: "Brownie with ice cream",
  },
  {
    src: "/photos/sunday-roast-line.jpg",
    alt: "A row of Sunday roasts",
  },
  {
    src: "/photos/sunday-lunch-table.jpg",
    alt: "Sunday roast with cauliflower cheese",
  },
];

export const metadata: Metadata = { title: "Food" };

export default function FoodPage() {

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
          <article className="mt-16 grid items-center gap-10 border-t border-cream-dark pt-16 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-brick uppercase">
                Every Sunday
              </p>
              <h2 className="font-display mt-2 text-4xl">
                Sunday Lunch at The Beehive
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-8 text-muted">
                <p>There’s something special about a Sunday lunch at The Beehive.</p>
                <p>
                  Settle in, relax and enjoy a proper Sunday roast in a
                  welcoming pub atmosphere. Whether you’re catching up with
                  family, meeting friends or simply looking for a good excuse
                  to make Sunday feel like Sunday, our roast is made for taking
                  your time over.
                </p>
                <p>
                  Expect generous portions, traditional favourites and all the
                  trimmings – beautifully roasted meat, crispy roast potatoes,
                  seasonal vegetables, rich gravy and all the things that make
                  a Sunday lunch worth looking forward to.
                </p>
                <p>
                  And, of course, there’s no need to rush. Enjoy a drink from
                  the bar, settle into the pub and make an afternoon of it.
                </p>
                <p className="font-display text-2xl text-ink">
                  Good food. Good company. A proper Sunday.
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {SUNDAY_PHOTOS.map((photo) => (
                <li
                  key={photo.src}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 20rem, 45vw"
                  />
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </section>
    </main>
  );
}
