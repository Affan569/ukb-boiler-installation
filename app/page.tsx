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
  title: "Boiler Installation Southampton | Gas Safe Registered Engineers | UKB Boiler Installs",
  description: "Professional boiler installation, repair and servicing in Southampton. Gas Safe registered engineers offering 24/7 emergency boiler repair, combi boiler replacement and central heating services. Free quotes available.",
  keywords: "boiler installation Southampton, boiler repair Southampton, Gas Safe registered engineers, combi boiler installation, emergency boiler repair, central heating Southampton, boiler replacement, boiler service, Worcester boiler, Vaillant boiler, Baxi boiler, heating engineers Southampton, new boiler cost, boiler servicing",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk',
  },
  openGraph: {
    type: 'website',
    url: 'https://ukbboilerinstalls.co.uk',
    title: 'Boiler Installation Southampton | Gas Safe Registered Engineers | UKB Boiler Installs',
    description: 'Professional boiler installation, repair and servicing in Southampton. Gas Safe registered engineers offering 24/7 emergency boiler repair, combi boiler replacement and central heating services.',
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
      
      {/* Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "UKB Boiler Installs",
            "description": "Professional boiler installation, repair and servicing in Southampton. Gas Safe registered engineers with 24/7 emergency support.",
            "url": "https://ukbboilerinstalls.co.uk",
            "telephone": "+44 54326546",
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
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does a boiler installation take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most boiler replacements are completed in a single day. Larger jobs, such as moving the boiler or changing the pipework, can take a little longer. We confirm the timescale in your quote."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer free quotes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide free, no-obligation quotes for all boiler installations. Our team will assess your needs, recommend the best options and give you a clear, upfront price with no hidden costs."
                }
              },
              {
                "@type": "Question",
                "name": "Are your engineers Gas Safe registered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. All of our engineers are Gas Safe registered and fully insured, and they carry their ID card on every visit. You can check any engineer on the Gas Safe Register."
                }
              },
              {
                "@type": "Question",
                "name": "What brands of boilers do you install?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We install boilers from leading manufacturers and will recommend the right model for your home, heating needs and budget. Ask us which brands we can supply when you request your quote."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide warranty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Every installation comes with the manufacturer's warranty on the boiler, plus a guarantee on our workmanship. The exact length depends on the model and is confirmed in your quote."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}
