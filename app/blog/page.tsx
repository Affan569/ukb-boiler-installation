import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton",
  description: "Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton's Gas Safe registered engineers.",
  keywords: "boiler installation blog, heating tips, boiler maintenance, energy efficiency, combi boiler advice, boiler repair tips, central heating advice, Southampton heating guide",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstallation.co.uk/blog',
    title: 'Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton',
    description: 'Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton\'s Gas Safe registered engineers.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Boiler installation blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton',
    description: 'Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton\'s Gas Safe registered engineers.',
    images: ['/images/hero.png'],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
