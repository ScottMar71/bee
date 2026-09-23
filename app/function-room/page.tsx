import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Function Room" };

export default async function FunctionRoomPage() {
  const site = await getSite();

  return (
    <main id="main">
      <PageHero title="Function Room" image="/photos/wine-tasting-cheese.jpg">
        Upstairs for parties, clubs, societies and meetings.
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-muted">
          The function room is situated on the first floor of the pub (walk
          through the bar area on the left and take the stairs to your right
          behind the bar).
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          This room has additional seating, a pool table and dart board. It is
          used for the wine tasting evenings that take place every three months.
          It is a great venue for all sorts of uses: parties, clubs, societies
          or meetings.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={`mailto:${site.contact.email}?subject=Function room enquiry`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brick px-7 text-base font-semibold text-cream hover:bg-brick-dark"
          >
            Enquire by email
          </a>
        </div>
        <p className="mt-6 text-center">
          <ButtonLink href="/contact" variant="ghost">
            Address & hours
          </ButtonLink>
        </p>
      </section>
    </main>
  );
}
