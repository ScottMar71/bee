import type { Metadata } from "next";
import { headers } from "next/headers";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Beehive | Real Ale Pub in Eaton, Norwich",
    template: "%s | The Beehive Norwich",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: "The Beehive | Real Ale Pub in Eaton, Norwich",
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/photos/hero-leopold-2.jpg",
        alt: "The Beehive pub on Leopold Road, Norwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Beehive | Real Ale Pub in Eaton, Norwich",
    description: DEFAULT_DESCRIPTION,
    images: ["/photos/hero-leopold-2.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bare = (await headers()).get("x-beehive-maintenance") === "1";
  const site = bare ? null : await getSite();

  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        {bare ? (
          children
        ) : (
          <>
            <Header />
            {children}
            <Footer site={site!} />
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}
