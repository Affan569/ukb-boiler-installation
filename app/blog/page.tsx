import type { Metadata } from "next";
import BlogClient from "./BlogClient";

const BLOG_DESCRIPTION = "Heating and boiler advice from Southampton's Gas Safe registered engineers. Tips on installation, servicing, energy efficiency, cutting your heating bills.";

export const metadata: Metadata = {
  title: "Boiler & Heating Blog",
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/blog',
    title: 'Boiler & Heating Blog | UKB Boiler Installs',
    description: BLOG_DESCRIPTION,
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Boiler installation blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler & Heating Blog | UKB Boiler Installs',
    description: BLOG_DESCRIPTION,
    images: ['/images/hero.png'],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
