import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Quiz" };
export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const { quiz } = await getSite();

  return (
    <main id="main">
      <PageHero title="Quiz" image="/photos/interior-snug-logo-mirror.jpg">
        Regular quiz nights at a friendly Eaton local.
      </PageHero>
      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <p className="text-lg leading-8 text-muted">{quiz.intro}</p>
        {quiz.nextDate ? (
          <p className="font-display mt-8 text-3xl">
            Next quiz: {quiz.nextDate}
            {quiz.time ? ` · ${quiz.time}` : ""}
          </p>
        ) : null}
        <p className="mt-6 text-muted">{quiz.notes}</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact" variant="ghost">
            Ask us
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
