import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Quiz" };
export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const { quiz } = await getSite();

  return (
    <main id="main">
      <PageHero
        title="Quiz Night at The Beehive"
        image="/photos/quiz-hero.jpg"
        imageClassName="object-cover object-center"
      >
        Put your general knowledge to the test every week at The Beehive.
      </PageHero>

      <Reveal>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-muted">
          Join us for our regular quiz night — a relaxed, friendly evening of
          questions, laughs, drinks and a bit of healthy competition.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          Whether you’re a quiz regular, a self-confessed trivia expert, or
          simply looking for a fun night out, everyone is welcome. Bring along
          your friends, family or colleagues, put a team together and see how
          you fare across a mix of questions covering everything from music and
          film to sport, history, general knowledge and plenty of surprises
          along the way.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          There’s no need to be a quiz whizz — it’s all about getting together,
          having a good time and seeing how many answers you can come up with!
        </p>
        <figure className="mx-auto mt-10 max-w-md">
          <Image
            src="/photos/quiz-night.jpg"
            alt="Quiz night at The Beehive, with the host at the microphone"
            width={768}
            height={1024}
            className="h-auto w-full rounded-2xl"
          />
        </figure>
        <p className="mt-6 text-lg leading-8 text-muted">
          As an award-winning local pub in Eaton, The Beehive is the perfect
          place to spend a midweek evening. Grab a drink, settle in with your
          team and enjoy the atmosphere while you battle it out for quiz-night
          glory.
        </p>
      </article>
      </Reveal>

      <Reveal>
      <section className="bg-cream-dark py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl">When is the next quiz?</h2>
          {quiz.nextDate ? (
            <p className="font-display mt-8 text-3xl">
              Next quiz: {quiz.nextDate}
              {quiz.time ? ` · ${quiz.time}` : ""}
            </p>
          ) : (
            <p className="mt-8 text-lg leading-8 text-muted">
              Our quiz nights take place regularly at The Beehive.
            </p>
          )}
          <p className="mt-6 text-lg leading-8 text-muted">
            Ask at the bar or check our{" "}
            <Link
              href="/#whats-on"
              className="text-brick underline-offset-2 hover:underline"
            >
              What’s On
            </Link>{" "}
            page for the next quiz date.
          </p>
          <p className="mt-6 text-lg leading-8 text-muted">
            Gather your team, bring your best general knowledge and we’ll see
            you at The Beehive!
          </p>
          <p className="font-display mt-10 text-2xl">
            Everyone welcome. Teams encouraged. Bragging rights guaranteed.
          </p>
        </div>
      </section>
      </Reveal>
    </main>
  );
}
