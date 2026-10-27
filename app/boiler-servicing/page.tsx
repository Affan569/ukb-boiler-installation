import type { Metadata } from "next";
import BoilerServicingContent from "../components/BoilerServicingContent";

export const metadata: Metadata = {
  title: "Boiler Servicing Southampton | Annual Boiler Maintenance | UKB Boiler Installs",
  description: "Professional boiler servicing and annual maintenance in Southampton. Gas Safe registered engineers provide thorough boiler checks, safety inspections, and efficiency optimization. Extend your boiler's life with regular servicing.",
  keywords: "boiler servicing Southampton, annual boiler service, boiler maintenance, boiler safety check, gas boiler service, central heating service, boiler inspection, boiler tune-up, Southampton heating maintenance",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/boiler-servicing',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/boiler-servicing',
    title: 'Boiler Servicing Southampton | Annual Boiler Maintenance | UKB Boiler Installs',
    description: 'Professional boiler servicing and annual maintenance in Southampton. Gas Safe registered engineers provide thorough boiler checks, safety inspections, and efficiency optimization.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Boiler servicing in Southampton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Servicing Southampton | Annual Boiler Maintenance | UKB Boiler Installs',
    description: 'Professional boiler servicing and annual maintenance in Southampton. Gas Safe registered engineers provide thorough boiler checks, safety inspections, and efficiency optimization.',
    images: ['/images/hero.png'],
  },
};

export default function BoilerServicingPage() {
  return (
    <>
      <main>
        <BoilerServicingContent />
      </main>
    </>
  );
}
