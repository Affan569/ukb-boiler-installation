import type { Metadata } from "next";
import BoilerInstallationContent from "../components/BoilerInstallationContent";

export const metadata: Metadata = {
  title: "Boiler Installation & Repair Services Southampton | Combi Boiler Replacement | UKB Boiler Installs",
  description: "Expert boiler installation and repair services in Southampton. Professional combi boiler replacement, system boiler installation, and emergency boiler repair by Gas Safe registered engineers. Up to 12 years warranty.",
  keywords: "boiler installation Southampton, combi boiler replacement, system boiler installation, boiler repair Southampton, emergency boiler repair, boiler replacement Southampton, new boiler cost, boiler service, central heating installation, heating engineers",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/boiler-installation',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstallation.co.uk/boiler-installation',
    title: 'Boiler Installation & Repair Services Southampton | Combi Boiler Replacement',
    description: 'Expert boiler installation and repair services in Southampton. Professional combi boiler replacement, system boiler installation, and emergency boiler repair by Gas Safe registered engineers.',
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
    title: 'Boiler Installation & Repair Services Southampton | Combi Boiler Replacement',
    description: 'Expert boiler installation and repair services in Southampton. Professional combi boiler replacement, system boiler installation, and emergency boiler repair by Gas Safe registered engineers.',
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