import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSite } from "@/lib/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Beehive | Real Ale Pub in Eaton, Norwich",
    template: "%s | The Beehive Norwich",
  },
  description:
    "A traditional English real ale pub in Eaton, Norwich, since 1892. Friendly local, function room, quiz nights and Friday pizza.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();

  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <Header />
        {children}
        <Footer site={site} />
      </body>
    </html>
  );
}
