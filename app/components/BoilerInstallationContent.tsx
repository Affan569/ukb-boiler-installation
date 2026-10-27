"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const styles = `
  .boiler-installation-hero {
    position: relative;
    background: linear-gradient(135deg, #0a2a6b 0%, #0b7cf0 100%);
    min-height: 550px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .boiler-installation-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero.png') center/cover;
    opacity: 0.15;
  }

  .boiler-installation-content {
    position: relative;
    z-index: 10;
  }

  .boiler-type-card {
    background: white;
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(10, 42, 107, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .boiler-type-card:hover {
    border-color: #0b7cf0;
    transform: translateY(-8px);
  }

  .boiler-type-card.featured {
    background: linear-gradient(135deg, #0a2a6b 0%, #0b7cf0 100%);
    color: white;
  }

  .boiler-type-card.featured h3,
  .boiler-type-card.featured p {
    color: white;
  }

  .feature-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #0b7cf0, #0a2a6b);
    border-radius: 16px;
    display: grid;
    place-items: center;
    color: white;
    font-size: 28px;
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #0b7cf0, #0a2a6b);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
    background: #f8fbff;
    border-radius: 16px;
    border-left: 4px solid #0b7cf0;
  }

  .warranty-badge {
    background: linear-gradient(135deg, #ffb84d, #ff9736);
    color: white;
    padding: 40px;
    border-radius: 24px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .boiler-installation-hero {
      min-height: 450px;
    }
  }
`;

const BOILER_TYPES = [
  {
    name: "Combi Boiler",
    tag: "Most Popular",
    description: "Compact and efficient. Heats water on demand, perfect for smaller homes with limited space.",
    features: ["No water tank required", "Space-saving design", "High efficiency ratings", "Instant hot water"],
    featured: true,
  },
  {
    name: "System Boiler",
    tag: "Best for Families",
    description: "Ideal for homes with higher hot-water demand. Works with a hot water cylinder for consistent pressure.",
    features: ["Works with hot water tank", "Consistent water pressure", "Multiple tap usage", "Reliable performance"],
    featured: false,
  },
  {
    name: "Regular Boiler",
    tag: "Traditional",
    description: "Perfect for traditional systems with a hot water cylinder and cold water tank. Great for larger homes.",
    features: ["Uses cold water tank", "Great for larger homes", "Proven reliability", "Compatible with older systems"],
    featured: false,
  },
];

const BENEFITS = [
  {
    title: "Energy Efficiency",
    description: "Modern A-rated boilers can reduce your energy bills by up to 30% compared to older models",
    icon: "⚡",
  },
  {
    title: "Space Optimization",
    description: "Combi boilers eliminate the need for bulky water tanks, freeing up valuable space in your home",
    icon: "📐",
  },
  {
    title: "Enhanced Comfort",
    description: "Enjoy instant hot water and consistent heating throughout your home with modern controls",
    icon: "🏠",
  },
  {
    title: "Increased Property Value",
    description: "A new efficient boiler adds value to your property and makes it more attractive to buyers",
    icon: "💰",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Free Home Survey",
    description: "Our experts visit your property to assess your heating needs and recommend the perfect boiler",
  },
  {
    number: "2",
    title: "Custom Quote",
    description: "Receive a detailed, no-obligation quote with all costs clearly explained",
  },
  {
    number: "3",
    title: "Professional Installation",
    description: "Gas Safe engineers install your new boiler with minimal disruption to your home",
  },
  {
    number: "4",
    title: "Testing & Handover",
    description: "Full system testing, safety checks, and thorough explanation of your new system",
  },
];

const BRANDS = [
  { name: "Worcester Bosch", logo: "🔧" },
  { name: "Vaillant", logo: "⚙️" },
  { name: "Baxi", logo: "🔥" },
  { name: "Ideal", logo: "💧" },
  { name: "Viessmann", logo: "🌡️" },
  { name: "Potterton", logo: "🔨" },
];

export default function BoilerInstallationContent() {
  const [quote, setQuote] = useState(false);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: typesRef, isVisible: typesVisible } = useScrollAnimation();
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { elementRef: stepsRef, isVisible: stepsVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} className="boiler-installation-hero">
        <div className="boiler-installation-content mx-auto max-w-7xl px-6 py-20">
          <div className={`scroll-animate ${heroVisible ? 'is-visible' : ''}`}>
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
              Premium Installation Service
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Professional Boiler<br />
              <span className="text-[#ffb84d]">Installation</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-8">
              Expert boiler installation in Southampton. Gas Safe registered engineers providing top-quality service with up to 12 years warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setQuote(true)}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#0a2a6b] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffb84d] transition-colors"
              >
                Get Free Quote
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <a
                href="tel:+4454326546"
                className="inline-flex items-center justify-center gap-3 bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
                </svg>
                +44 54326546
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOILER TYPES */}
      <section ref={typesRef} className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate text-center mb-16 ${typesVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Choose Your Boiler</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a2a6b] mt-4 mb-6">
              Types of <span className="text-[#0b7cf0]">Boilers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We install all types of boilers from leading manufacturers. Find the perfect match for your home and lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BOILER_TYPES.map((type, index) => (
              <div
                key={type.name}
                className={`scroll-animate scroll-animate-delay-${index + 1} boiler-type-card ${type.featured ? 'featured' : ''} ${typesVisible ? 'is-visible' : ''}`}
              >
                {type.tag && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                    type.featured ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#0b7cf0]'
                  }`}>
                    {type.tag}
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-3">{type.name}</h3>
                <p className="mb-6 opacity-90">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section ref={benefitsRef} className="py-20 bg-[#f8fbff]">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate text-center mb-16 ${benefitsVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Why Upgrade?</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a2a6b] mt-4 mb-6">
              Benefits of a <span className="text-[#0b7cf0]">New Boiler</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Investing in a new boiler brings numerous advantages for your home, comfort, and wallet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`scroll-animate scroll-animate-delay-${index + 1} benefit-item ${benefitsVisible ? 'is-visible' : ''}`}
              >
                <div className="text-4xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a2a6b] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={stepsRef} className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate text-center mb-16 ${stepsVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a2a6b] mt-4 mb-6">
              Installation <span className="text-[#0b7cf0]">Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our streamlined 4-step process ensures a smooth and stress-free boiler installation experience.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`scroll-animate scroll-animate-delay-${index + 1} text-center ${stepsVisible ? 'is-visible' : ''}`}
              >
                <div className="step-number mx-auto mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-[#0a2a6b] mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-16 bg-[#f8fbff]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-[#0a2a6b] mb-2">Trusted Brands We Install</h3>
            <p className="text-gray-600">We work with all major boiler manufacturers</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-2xl">{brand.logo}</span>
                <span className="font-semibold text-[#0a2a6b]">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARRANTY CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="warranty-badge">
            <h2 className="text-4xl font-black mb-4">Up to 12 Years Warranty</h2>
            <p className="text-xl mb-6 opacity-90">
              All our installations come with comprehensive manufacturer warranty and workmanship guarantee
            </p>
            <button
              onClick={() => setQuote(true)}
              className="inline-flex items-center justify-center gap-3 bg-white text-[#ffb84d] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Your Free Quote
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </>
  );
}
