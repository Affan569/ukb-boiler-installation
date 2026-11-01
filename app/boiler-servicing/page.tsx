import type { Metadata } from "next";
import BoilerServicingContent from "../components/BoilerServicingContent";

const SERVICING_DESCRIPTION = "Annual boiler servicing and maintenance in Southampton by Gas Safe registered engineers. Safety checks and efficiency tuning to keep your boiler reliable.";

export const metadata: Metadata = {
  title: "Boiler Servicing Southampton",
  description: SERVICING_DESCRIPTION,
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/boiler-servicing',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/boiler-servicing',
    title: 'Boiler Servicing Southampton | UKB Boiler Installs',
    description: SERVICING_DESCRIPTION,
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
    title: 'Boiler Servicing Southampton | UKB Boiler Installs',
    description: SERVICING_DESCRIPTION,
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
