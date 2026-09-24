import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const { gallery } = await getSite();

  return (
    <main id="main">
      <PageHero title="Gallery" image="/photos/window-box-geraniums.jpg">
        Life at an award-winning Eaton local — the pub, garden, bar and
        community events.
      </PageHero>
      <Reveal>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {gallery.length === 0 ? (
          <p className="text-center text-lg text-muted">
            Photos coming soon. In the meantime, see{" "}
            <a className="text-brick underline" href="/history">
              History
            </a>{" "}
            or the{" "}
            <a className="text-brick underline" href="/function-room">
              Function Room
            </a>
            .
          </p>
        ) : (
          <GalleryGrid items={gallery} />
        )}
      </section>
      </Reveal>
    </main>
  );
}
