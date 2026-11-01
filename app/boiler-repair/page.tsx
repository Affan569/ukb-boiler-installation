import type { Metadata } from "next";
import BoilerRepairContent from "../components/BoilerRepairContent";

const REPAIR_DESCRIPTION = "Emergency boiler repair in Southampton from Gas Safe registered engineers. Fast diagnosis and reliable fixes for breakdowns, leaks and heating problems.";

export const metadata: Metadata = {
  title: "Boiler Repair Southampton",
  description: REPAIR_DESCRIPTION,
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/boiler-repair',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/boiler-repair',
    title: 'Boiler Repair Southampton | UKB Boiler Installs',
    description: REPAIR_DESCRIPTION,
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Emergency boiler repair in Southampton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Repair Southampton | UKB Boiler Installs',
    description: REPAIR_DESCRIPTION,
    images: ['/images/hero.png'],
  },
};

export default function BoilerRepairPage() {
  return (
    <>
      <main>
        <BoilerRepairContent />
      </main>
    </>
  );
}
