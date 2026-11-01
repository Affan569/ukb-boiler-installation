import type { Metadata } from "next";
import BoilerInstallationContent from "../components/BoilerInstallationContent";

const INSTALLATION_DESCRIPTION = "Expert boiler installation and repair in Southampton. Combi and system boiler replacement, plus emergency boiler repair by Gas Safe registered engineers.";

export const metadata: Metadata = {
  title: "Boiler Installation Southampton",
  description: INSTALLATION_DESCRIPTION,
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/boiler-installation',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/boiler-installation',
    title: 'Boiler Installation Southampton | UKB Boiler Installs',
    description: INSTALLATION_DESCRIPTION,
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Boiler installation services in Southampton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Installation Southampton | UKB Boiler Installs',
    description: INSTALLATION_DESCRIPTION,
    images: ['/images/hero.png'],
  },
};

export default function BoilerInstallationPage() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <BoilerInstallationContent />
      </main>
      
    </>
  );
}