import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton",
  description: "Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton's Gas Safe registered engineers.",
  keywords: "boiler installation blog, heating tips, boiler maintenance, energy efficiency, combi boiler advice, boiler repair tips, central heating advice, Southampton heating guide",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://ukbboilerinstalls.co.uk/blog',
    title: 'Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton',
    description: 'Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton\'s Gas Safe registered engineers.',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
