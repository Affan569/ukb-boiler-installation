import HeroSection from "./components/herosection";
import AboutUs from "./components/Aboutus";
import WhyChooseUs from "./components/whychooseus";
import HowItWorks from "./components/howitworks";
import TrustedBrands from "./components/trustedbrands";
import Recentprojects from "./components/Recentprojects";
import Testimonials from "./components/testimonial";
import FAQ from "./components/faq";
import CTASection from "./components/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boiler Installation Southampton",
  description: "Gas Safe registered boiler installation, repair and servicing in Southampton. Combi boiler replacement and central heating with free, no-obligation quotes.",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk',
    title: 'Boiler Installation Southampton | UKB Boiler Installs',
    description: 'Gas Safe registered boiler installation, repair and servicing in Southampton. Combi boiler replacement and central heating with free, no-obligation quotes.',
    images: [
      {
        url: 'https://ukbboilerinstalls.co.uk/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Professional boiler installation in Southampton',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutUs />
      <WhyChooseUs />
      <HowItWorks />
      <TrustedBrands />
      <Recentprojects />
      <Testimonials />
      <FAQ />
      <CTASection />
      
      {/* Structured Data — Local Business / Plumber */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "Plumber"],
            "@id": "https://ukbboilerinstalls.co.uk/#business",
            "name": "UKB Boiler Installs",
            "description": "Boiler installation, repair and servicing in Southampton by Gas Safe registered engineers.",
            "url": "https://ukbboilerinstalls.co.uk",
            "telephone": "07988530358",
            "email": "info@ukbboilerinstalls.co.uk",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Southampton",
              "addressRegion": "Hampshire",
              "addressCountry": "GB",
              "postalCode": "SO1 1AA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "50.9097",
              "longitude": "-1.4044"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            },
            "priceRange": "£££",
            "areaServed": "Southampton",
            "sameAs": [
              "https://www.facebook.com/ukbboilerinstalls"
            ]
          })
        }}
      />
    </main>
  );
}
