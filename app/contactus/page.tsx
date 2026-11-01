import type { Metadata } from "next";
import ContactForm from "./ContactForm";

const CONTACT_DESCRIPTION = "Contact UKB Boiler Installs in Southampton for boiler installation, repair and servicing quotes. Get a free quote from our Gas Safe registered engineers.";

export const metadata: Metadata = {
  title: "Contact Us",
  description: CONTACT_DESCRIPTION,
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/contactus',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/contactus',
    title: 'Contact Us | UKB Boiler Installs',
    description: CONTACT_DESCRIPTION,
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
    title: 'Contact Us | UKB Boiler Installs',
    description: CONTACT_DESCRIPTION,
    images: ['/images/hero.png'],
  },
};

export default function Contact() {
  return <ContactForm />;
}