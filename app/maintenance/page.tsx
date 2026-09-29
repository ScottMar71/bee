import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Service unavailable",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main
      id="main"
      className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-16 text-center"
    >
      <Image
        src="/logo/beehive-logo-ink.png"
        alt="The Beehive"
        width={260}
        height={235}
        priority
        className="h-auto w-36"
      />
      <p className="font-display mt-8 text-6xl text-ink">503</p>
      <h1 className="font-display mt-3 text-4xl text-ink">Service unavailable</h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-muted">
        The website is temporarily unavailable. Please try again shortly.
      </p>
    </main>
  );
}
