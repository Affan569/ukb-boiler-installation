import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Boiler Installation Southampton | Get a Free Quote | UKB Boiler Installs",
  description: "Contact UKB Boiler Installs in Southampton for professional boiler installation and repair services. Get a free quote from our Gas Safe registered engineers. 24/7 emergency support available.",
  keywords: "contact boiler installation Southampton, boiler quote Southampton, heating engineer contact, emergency boiler repair contact, free boiler quote, boiler installation inquiry, Southampton heating services contact",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/contactus',
  },
  openGraph: {
    type: 'website',
    url: 'https://ukbboilerinstalls.co.uk/contactus',
    title: 'Contact Us | Boiler Installation Southampton | Get a Free Quote | UKB Boiler Installs',
    description: 'Contact UKB Boiler Installs in Southampton for professional boiler installation and repair services. Get a free quote from our Gas Safe registered engineers. 24/7 emergency support available.',
  },
};

export default function Contact() {
  return <ContactForm />;
}