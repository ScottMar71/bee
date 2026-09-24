import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Function Room" };
export const dynamic = "force-dynamic";

export default async function FunctionRoomPage() {
  const site = await getSite();

  return (
    <main id="main">
      <PageHero
        title="The Function Room"
        image="/photos/wine-tasting-cheese.jpg"
      >
        A flexible space for parties, gatherings, meetings and more.
      </PageHero>

      <Reveal>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-muted">
          Located on the first floor of The Beehive, our function room is a
          relaxed and versatile space that can be used for all sorts of
          occasions.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          To find us, simply walk through the bar area and take the stairs to
          your right, just behind the bar.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The room offers additional seating and plenty to keep your guests
          entertained, including a pool table and dart board. It’s a great
          space for getting together with friends, celebrating a special
          occasion or bringing a group together outside of the main bar area.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The function room is also home to our popular wine tasting evenings,
          held every three months, making it a familiar space for regular
          customers and a great place to discover something new.
        </p>
      </article>
      </Reveal>

      <Reveal>
      <section className="bg-cream-dark py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-4xl">A space for your occasion</h2>
          <p className="mt-8 text-lg leading-8 text-muted">
            Whether you're planning a birthday party, club or society gathering,
            team get-together, meeting or informal event, the function room
            offers a comfortable setting with all the atmosphere of The Beehive.
          </p>
          <p className="mt-6 text-lg leading-8 text-muted">
            And, of course, being part of the pub means drinks and refreshments
            are never far away.
          </p>
          <p className="mt-6 text-lg leading-8 text-muted">
            If you're looking for a space for your next gathering, speak to a
            member of the team at the bar to find out more about availability
            and arrangements.
          </p>
          <div className="mt-10">
            <a
              href={`mailto:${site.contact.email}?subject=Function room enquiry`}
              className="cta inline-flex min-h-12 items-center justify-center rounded-full bg-brick px-7 text-base font-semibold text-cream shadow-sm hover:bg-brick-dark hover:shadow"
            >
              Enquire by email
            </a>
          </div>
        </div>
      </section>
      </Reveal>
    </main>
  );
}
