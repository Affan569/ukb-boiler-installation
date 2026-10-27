"use client";
import Image from "next/image";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const styles = `
  .boiler-servicing-hero {
    position: relative;
    background: linear-gradient(135deg, #0a2a6b 0%, #0b7cf0 100%);
    min-height: 500px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .boiler-servicing-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero.png') center/cover;
    opacity: 0.15;
  }

  .boiler-servicing-content {
    position: relative;
    z-index: 10;
  }

  .servicing-card {
    background: white;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(10, 42, 107, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .servicing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(10, 42, 107, 0.15);
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

  .pricing-card {
    background: linear-gradient(135deg, #0a2a6b 0%, #0b7cf0 100%);
    color: white;
    border-radius: 24px;
    padding: 40px;
    position: relative;
    overflow: hidden;
  }

  .pricing-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  }

  .process-step {
    position: relative;
    padding-left: 60px;
  }

  .process-step::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #0b7cf0, #0a2a6b);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    .boiler-servicing-hero {
      min-height: 400px;
    }
  }
`;

const BENEFITS = [
  {
    title: "Improved Efficiency",
    description: "Regular servicing ensures your boiler runs at peak efficiency, reducing energy bills by up to 15%",
    icon: "⚡",
  },
  {
    title: "Extended Lifespan",
    description: "Proper maintenance can extend your boiler's life by 5-10 years, saving you thousands in replacement costs",
    icon: "🔧",
  },
  {
    title: "Safety Assurance",
    description: "Gas Safe engineers check for carbon monoxide leaks and other safety hazards to protect your family",
    icon: "🛡️",
  },
  {
    title: "Warranty Protection",
    description: "Most manufacturers require annual servicing to maintain your boiler warranty validity",
    icon: "✅",
  },
];

const PROCESS = [
  {
    step: "1",
    title: "Visual Inspection",
    description: "Thorough examination of boiler exterior, pipework, and flue for any signs of damage or wear",
  },
  {
    step: "2",
    title: "Internal Cleaning",
    description: "Cleaning of key components including heat exchanger, burner, and condensate trap",
  },
  {
    step: "3",
    title: "Performance Testing",
    description: "Testing combustion efficiency, pressure levels, and safety controls",
  },
  {
    step: "4",
    title: "Safety Checks",
    description: "Carbon monoxide detection, gas leak testing, and ventilation assessment",
  },
  {
    step: "5",
    title: "Report & Recommendations",
    description: "Detailed service report with efficiency ratings and any recommended repairs",
  },
];

export default function BoilerServicingContent() {
  const [quote, setQuote] = useState(false);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { elementRef: processRef, isVisible: processVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} className="boiler-servicing-hero">
        <div className="boiler-servicing-content mx-auto max-w-7xl px-6 py-20">
          <div className={`scroll-animate ${heroVisible ? 'is-visible' : ''}`}>
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
              Professional Maintenance
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Expert Boiler<br />
              <span className="text-[#ffb84d]">Servicing</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-8">
              Keep your boiler running safely and efficiently with our comprehensive annual servicing. Gas Safe registered engineers ensuring your peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setQuote(true)}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#0a2a6b] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffb84d] transition-colors"
              >
                Book Your Service
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

      {/* BENEFITS SECTION */}
      <section ref={benefitsRef} className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate text-center mb-16 ${benefitsVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Why Service Your Boiler?</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a2a6b] mt-4 mb-6">
              Benefits of Regular <span className="text-[#0b7cf0]">Servicing</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Annual boiler servicing is essential for safety, efficiency, and longevity. Here's why you should never skip your service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`scroll-animate scroll-animate-delay-${index + 1} servicing-card ${benefitsVisible ? 'is-visible' : ''}`}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#0a2a6b] mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section ref={processRef} className="py-20 bg-[#f8fbff]">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate text-center mb-16 ${processVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a2a6b] mt-4 mb-6">
              What Happens During <span className="text-[#0b7cf0]">Service</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our comprehensive 5-step servicing process ensures every aspect of your boiler is checked and optimized.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS.map((item, index) => (
              <div
                key={item.step}
                className={`scroll-animate scroll-animate-delay-${index + 1} ${processVisible ? 'is-visible' : ''}`}
              >
                <div className="process-step">
                  <h3 className="text-xl font-bold text-[#0a2a6b] mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="pricing-card">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Annual Boiler Service</h2>
              <p className="text-xl text-white/90 mb-8">From just £89 + VAT</p>
              <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Full safety inspection
                </li>
                <li className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Efficiency optimization
                </li>
                <li className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Detailed service report
                </li>
                <li className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Gas Safe certification
                </li>
              </ul>
              <button
                onClick={() => setQuote(true)}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#0a2a6b] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffb84d] transition-colors"
              >
                Book Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </>
  );
}
