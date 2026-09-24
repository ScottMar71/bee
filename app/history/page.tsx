import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "History" };

export default function HistoryPage() {
  return (
    <main id="main">
      <PageHero
        title="History"
        image="/photos/history-street-party.jpg"
        imageClassName="object-cover object-[60%_40%]"
      >
        An award-winning Victorian local on Leopold Road, Eaton.
      </PageHero>

      <Reveal>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-muted">
          Its journey from a corner shop to a thriving modern pub reflects both
          the changing character of Norwich and the enduring appeal of
          traditional, community-focused pubs.
        </p>

        <h2 className="font-display mt-16 text-4xl">
          The Victorian Era: 1896 onwards
        </h2>

        <h3 className="font-display mt-10 text-2xl">The building’s origins</h3>
        <p className="mt-4 text-lg leading-8 text-muted">
          The Beehive building was constructed in 1896, during the height of
          the Victorian era when public house construction was prolific across
          Britain. The building was originally constructed as a shop, making
          use of the corner site on Leopold Road (between Unthank Road and
          Newmarket Road) on the edge of what would become Norwich’s
          fashionable Golden Triangle neighbourhood.
        </p>

        <Figure
          src="/photos/history-cooch-exterior.jpg"
          alt="The Beehive on Leopold Road in earlier years, with the Cooch sign"
          caption="The Beehive on Leopold Road, when the house still showed the Cooch name."
        />

        <h3 className="font-display mt-12 text-2xl">
          The transition to a public house: 1898
        </h3>
        <p className="mt-4 text-lg leading-8 text-muted">
          The site’s conversion to licensed premises came shortly after
          construction. The premises were licensed from 22nd August 1898 when
          the beerhouse licence of the Bird in Hand, King Street, Norwich, was
          transferred to this location and a six-day licence was approved, with
          53 persons having signed a memorial in favour of the house. However,
          the vicar, Rev. Melville Pigot, opposed the application.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          This licence transfer marked a significant moment in the site’s
          history. The Bird in Hand, situated on the historic King Street in
          the city centre, had its licence transferred to the Leopold Road
          premises, establishing the site as a proper public house. The
          existence of both clerical opposition and local support demonstrates
          the sometimes contentious nature of public house licensing in
          Victorian society.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/photos/history-dix-notice-1898.jpg"
            alt="1898 licensing notice by Caroline Dix"
            caption="Caroline Dix’s notice of 30 July 1898, ahead of the 22 August licensing meeting."
            contain
          />
          <Figure
            src="/photos/history-growing-district.jpg"
            alt="Newspaper report on the need for a licence in a growing district"
            caption="The application was argued as meeting the needs of a growing district."
            contain
          />
        </div>

        <Figure
          src="/photos/history-licence-withdrawn.jpg"
          alt="Newspaper report of withdrawn licence applications by Augustus William Dix"
          caption="Earlier applications by Augustus William Dix were withdrawn."
          contain
        />

        <h3 className="font-display mt-12 text-2xl">Early years of operation</h3>
        <p className="mt-4 text-lg leading-8 text-muted">
          In its earliest years, the Beehive operated as a traditional
          Victorian local, serving the residential communities that were
          developing around Eaton during this period. The late 19th and early
          20th centuries were a golden age for British public houses, with pubs
          serving as the primary social gathering places for working-class and
          middle-class communities alike.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The first recorded licensee was Mrs Caroline Dix in 1898. The
          premises had been operated as a shop by Mrs Dix since about 1888.
        </p>

        <Figure
          src="/photos/history-dix-court.jpg"
          alt="Newspaper report concerning Augustus William Dix and Caroline Dix"
          caption="A contemporary report concerning Augustus William Dix and Caroline Dix of Eaton."
          contain
        />

        <h2 className="font-display mt-16 text-4xl">
          The interwar period and formalisation: 1920s
        </h2>
        <h3 className="font-display mt-10 text-2xl">
          Conversion to full public house status (1922)
        </h3>
        <p className="mt-4 text-lg leading-8 text-muted">
          While the premises had been licensed since 1898, the Beehive was
          formally converted from a corner shop in 1922 with a transfer of a
          licence from the Bird in Hand in King Street. This 1922 conversion
          may represent either a formal redesignation of the premises or
          perhaps the completion of internal remodelling to establish it as a
          proper purpose-built pub rather than a converted shop.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The interwar period was a complex time for British public houses. The
          Licensing Act of 1921 had reduced the number of public house licences
          available, making those that survived this period particularly
          valuable. The Beehive’s survival and formalisation during this period
          speaks to the strength of local support for the establishment.
        </p>

        <Figure
          src="/photos/history-street-party.jpg"
          alt="A street party on Leopold Road outside The Beehive"
          caption="A Leopold Road street party, with The Beehive in the background."
        />

        <h2 className="font-display mt-16 text-4xl">The 1950s refurbishment</h2>
        <h3 className="font-display mt-10 text-2xl">Post-war modernisation</h3>
        <p className="mt-4 text-lg leading-8 text-muted">
          The Beehive was refitted in the 1950s, reflecting broader trends in
          British pub design and modernisation in the post-war period. The
          1950s saw many traditional pubs being updated with contemporary
          fixtures, whilst attempting to retain their character.
        </p>

        <h2 className="font-display mt-16 text-4xl">
          Late 20th century: the real ale revolution
        </h2>
        <h3 className="font-display mt-10 text-2xl">
          Growth during the craft ale movement
        </h3>
        <p className="mt-4 text-lg leading-8 text-muted">
          The latter part of the 20th century saw the emergence of CAMRA (the
          Campaign for Real Ale) in 1971, which sparked a revival of interest
          in traditional real ales and authentic pub culture. During this
          period, the Beehive positioned itself as a champion of real ale,
          steadily building a reputation for quality and variety.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          The pub became known among real ale enthusiasts for its commitment to
          stocking genuine cask-conditioned ales from both established and
          emerging breweries, bucking the trend towards mass-produced lagers
          and processed beers that dominated the British pub market for much of
          the late 20th century.
        </p>

        <Figure
          src="/photos/history-camra-letter-1976.jpg"
          alt="1976 letter to the paper about real ale at The Beehive, from P. J. Walter of CAMRA"
          caption="A 1976 letter praising real ale at The Beehive, from P. J. Walter of Norwich and Norfolk CAMRA."
          contain
        />

        <h2 className="font-display mt-16 text-4xl">The Beehive today</h2>
        <p className="mt-6 text-lg leading-8 text-muted">
          A Victorian local pub used by customers of all ages, with an
          excellent range of beers from local and national brewers. The Beehive
          is an award-winning house — Norwich & Norfolk CAMRA Pub of the Year
          2015.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          Inside there are three bar areas: a traditional bar with a real fire;
          a comfortable lounge with leather sofas; and a small entrance hall
          snug area. The pub also boasts a function room upstairs, plays host
          to football, golf, darts, cricket and rugby clubs, and has regular
          quiz nights.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          There is a large beer garden at the rear with a barbecue shed,
          profits from which raise money for local charities during the spring
          and summer months. A popular beer festival with around twenty-five
          beers is held in June or July.
        </p>
      </article>
      </Reveal>
    </main>
  );
}

function Figure({
  src,
  alt,
  caption,
  contain,
}: {
  src: string;
  alt: string;
  caption: string;
  contain?: boolean;
}) {
  return (
    <figure className="mt-8">
      <div
        className={`relative overflow-hidden rounded-2xl bg-cream-dark ${
          contain ? "" : "aspect-[4/3]"
        }`}
      >
        {contain ? (
          <Image
            src={src}
            alt={alt}
            width={900}
            height={1200}
            className="mx-auto h-auto w-full object-contain p-3 sm:p-5"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        )}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
