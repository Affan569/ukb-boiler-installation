import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Boiler Installation Southampton | Get a Free Quote | UKB Boiler Installs",
  description: "Contact UKB Boiler Installs in Southampton for professional boiler installation and repair services. Get a free quote from our Gas Safe registered engineers. 24/7 emergency support available.",
  keywords: "contact boiler installation Southampton, boiler quote Southampton, heating engineer contact, emergency boiler repair contact, free boiler quote, boiler installation inquiry, Southampton heating services contact",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/contactus',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstallation.co.uk/contactus',
    title: 'Contact Us | Boiler Installation Southampton | Get a Free Quote | UKB Boiler Installs',
    description: 'Contact UKB Boiler Installs in Southampton for professional boiler installation and repair services. Get a free quote from our Gas Safe registered engineers. 24/7 emergency support available.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Contact UKB Boiler Installs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Boiler Installation Southampton | Get a Free Quote | UKB Boiler Installs',
    description: 'Contact UKB Boiler Installs in Southampton for professional boiler installation and repair services. Get a free quote from our Gas Safe registered engineers. 24/7 emergency support available.',
    images: ['/images/hero.png'],
  },
};

export default function Contact() {
  return <ContactForm />;
}