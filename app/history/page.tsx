import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "History" };

export default function HistoryPage() {
  return (
    <main id="main">
      <PageHero title="History" image="/photos/history-leopold-rd.jpg">
        A Victorian local on Leopold Road, Eaton.
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-muted">
          A Victorian local pub used by customers of all ages, with an excellent
          range of beers from local and national brewers.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          Inside there are three bar areas: a traditional bar with a real fire;
          a comfortable lounge with leather sofas; and a small entrance hall
          snug area. The pub also boasts a function room upstairs, plays host
          to football, golf, darts, cricket and rugby clubs, and has regular
          quiz nights.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          There is a large beer garden at the rear with a barbecue shed, profits
          from which raise money for local charities during the spring and
          summer months. A popular beer festival with around twenty-five beers
          is held in June or July.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          Sunday roasts are available from April 2026.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The first recorded licensee was a Mrs Dix in 1898. The pub had been
          operated as a shop by Mrs Dix since about 1888.
        </p>
        <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-2xl bg-cream-dark">
          <Image
            src="/photos/history-dix-licence-1898.jpg"
            alt="1898 licensing notice by Caroline Dix"
            fill
            className="object-contain p-4"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        </div>
      </section>
    </main>
  );
}
