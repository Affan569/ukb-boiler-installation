import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Boiler Installation Gallery | Recent Projects | UKB Boiler Installs Southampton",
  description: "View our recent boiler installation projects in Southampton. See examples of combi boiler replacements, system boiler installations, and central heating system upgrades completed by our Gas Safe engineers.",
  keywords: "boiler installation gallery, boiler installation projects, Southampton boiler projects, combi boiler installation examples, central heating installation photos, boiler replacement photos",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/gallery',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/gallery',
    title: 'Boiler Installation Gallery | Recent Projects | UKB Boiler Installs Southampton',
    description: 'View our recent boiler installation projects in Southampton. See examples of combi boiler replacements, system boiler installations, and central heating system upgrades completed by our Gas Safe engineers.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Boiler installation projects gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Installation Gallery | Recent Projects | UKB Boiler Installs Southampton',
    description: 'View our recent boiler installation projects in Southampton. See examples of combi boiler replacements, system boiler installations, and central heating system upgrades completed by our Gas Safe engineers.',
    images: ['/images/hero.png'],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
