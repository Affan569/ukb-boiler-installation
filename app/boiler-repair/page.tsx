import type { Metadata } from "next";
import BoilerRepairContent from "../components/BoilerRepairContent";

export const metadata: Metadata = {
  title: "Boiler Repair Southampton | Emergency Boiler Fix | UKB Boiler Installs",
  description: "Emergency boiler repair services in Southampton. 24/7 rapid response for boiler breakdowns, leaks, and heating problems. Gas Safe registered engineers with fast diagnosis and reliable repairs.",
  keywords: "boiler repair Southampton, emergency boiler repair, boiler breakdown, boiler leak repair, no heating, no hot water, boiler fix, heating engineer repair, 24/7 boiler service",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/boiler-repair',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstallation.co.uk/boiler-repair',
    title: 'Boiler Repair Southampton | Emergency Boiler Fix | UKB Boiler Installs',
    description: 'Emergency boiler repair services in Southampton. 24/7 rapid response for boiler breakdowns, leaks, and heating problems. Gas Safe registered engineers with fast diagnosis and reliable repairs.',
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
    title: 'Boiler Repair Southampton | Emergency Boiler Fix | UKB Boiler Installs',
    description: 'Emergency boiler repair services in Southampton. 24/7 rapid response for boiler breakdowns, leaks, and heating problems. Gas Safe registered engineers with fast diagnosis and reliable repairs.',
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
