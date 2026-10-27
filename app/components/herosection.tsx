"use client";
import Image from "next/image";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const FEATURES = [
  {
    title: "Gas Safe Registered",
    text: "Trusted & certified engineers",
    icon: (
      <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none" stroke="#0a2a6b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6 10 14v16c0 14 9 23 22 28 13-5 22-14 22-28V14L32 6Z" />
        <path d="m22 32 7 7 14-15" stroke="#0b7cf0" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    text: "Here when you need us",
    icon: (
      <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none" stroke="#0a2a6b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M54 32a22 22 0 1 1-8-17" />
        <path d="M46 6v10H36" stroke="#0b7cf0" />
        <path d="M32 16v16l-9 8" />
        <text x="34" y="52" fontSize="14" fontWeight="700" fill="#0b7cf0" stroke="none">24/7</text>
      </svg>
    ),
  },
  {
    title: "Competitive Prices",
    text: "Quality service, great value",
    icon: (
      <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none" stroke="#0a2a6b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 34c0-10 8-16 20-16s18 7 18 16c0 6-3 10-7 13v7h-8v-4h-8v4h-8v-8c-4-2-7-6-7-12Z" />
        <circle cx="38" cy="12" r="8" stroke="#0b7cf0" />
        <path d="M40 9c-2-2-5-1-5 2v3h-2h6" stroke="#0b7cf0" strokeWidth="2.5" />
        <circle cx="42" cy="32" r="1.5" fill="#0a2a6b" />
      </svg>
    ),
  },
  {
    title: "Warmer Homes",
    text: "Reliable heating solutions",
    icon: (
      <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none" stroke="#0a2a6b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 30 32 8l24 22" />
        <path d="M14 26v28h36V26" />
        <path d="M26 46c-3-3 3-5 0-8s3-5 0-8M34 46c-3-3 3-5 0-8s3-5 0-8M42 46c-3-3 3-5 0-8s3-5 0-8" stroke="#0b7cf0" strokeWidth="3" />
      </svg>
    ),
  },
];

const heroStyles = `
  .hero-section {
    position: relative;
    background: white;
  }

  .hero-content {
    position: relative;
    z-index: 10;
  }

  .hero-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(11, 124, 240, 0.6), rgba(11, 124, 240, 0.4), transparent);
    pointer-events: none;
  }

  .hero-title {
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.18em;
  }

  .hero-cta-button {
    background: #0a2a6b;
    color: white;
    transition: background 0.3s ease;
  }

  .hero-cta-button:hover {
    background: #0b7cf0;
  }

  .features-card {
    background: #f8fbff;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(10, 42, 107, 0.12);
  }

  @media (max-width: 1024px) {
    .hero-section {
      min-height: 450px;
    }
  }

  @media (min-width: 1024px) {
    .hero-section {
      height: 650px;
    }
  }
`;

export default function HeroSection() {
  const [quote, setQuote] = useState(false);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  return (
    <>
      <style>{heroStyles}</style>
      <section className="hero-section">
      {/* Background image + hero content */}
      <div className="relative min-h-[450px] w-full overflow-hidden lg:h-[650px] lg:min-h-0">
        <Image
          src="/images/hero.png"
          alt="Professional boiler installation"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-[center_40%]"
        />
        {/* Gradient overlay with light opacity */}
        <div className="hero-gradient" />
        <div ref={heroRef} className="hero-content relative mx-auto flex h-full max-w-[1280px] flex-col justify-start px-6 pb-32 pt-[calc(123px+3rem)] lg:px-16 lg:pt-[calc(123px+2.5rem)]">
          <h2 className={`scroll-animate text-2xl font-light uppercase tracking-[0.18em] text-[#0a2a6b] sm:text-3xl lg:text-[24px] ${heroVisible ? 'is-visible' : ''}`}>
            Professional
          </h2>
          <h1 className={`scroll-animate-delay-1 mt-1 font-black uppercase leading-[0.95] tracking-tight ${heroVisible ? 'is-visible' : ''}`}>
            <span className="block text-5xl text-[#0a2a6b] sm:text-6xl lg:text-[40px]">Boiler</span>
            <span className="block text-5xl text-[#0b7cf0] sm:text-6xl lg:text-[40px]">Installation</span>
          </h1>

          <p className={`scroll-animate-delay-2 mt-2 text-lg font-medium text-[#0a2a6b] sm:text-[22px] ${heroVisible ? 'is-visible' : ''}`}>
            Safe. Efficient. Reliable.
          </p>

          <div className={`scroll-animate-delay-3 mt-4 h-[4px] w-[120px] rounded-full bg-gradient-to-r from-[#f97316] to-[#fb923c] ${heroVisible ? 'is-visible' : ''}`} />
          <p className={`scroll-animate-delay-4 mt-5 max-w-[440px] text-sm leading-6 text-[#1f2f55] sm:text-base ${heroVisible ? 'is-visible' : ''}`}>
            Expert boiler installation, replacement and servicing for a warmer, more comfortable home.
          </p>

          <div className={`scroll-animate-delay-5 mt-6 flex flex-col gap-5 sm:flex-row sm:items-center ${heroVisible ? 'is-visible' : ''}`}>
            <button
              type="button"
              onClick={() => setQuote(true)}
              className="hero-cta-button inline-flex w-fit items-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg"
            >
              Get a Free Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <a href="tel:+44312092405" className="flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#0b7cf0">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
              </svg>
              <span className="leading-tight">
                <span className="block text-xs text-[#1f2f55]">Call Us Today</span>
                <span className="block text-lg font-bold text-[#0a2a6b]">+44 54326546</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Features card (overlaps the image) */}
      <div ref={featuresRef} className={`scroll-animate-scale relative z-10 mx-auto -mt-[85px] max-w-[1180px] px-4 pb-16 lg:px-0 ${featuresVisible ? 'is-visible' : ''}`}>
        <div className="features-card grid grid-cols-2 gap-y-8 px-6 py-7 lg:grid-cols-4 lg:px-10">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`scroll-animate scroll-animate-delay-${i + 1} flex flex-col items-center px-4 text-center ${
                i !== 0 ? "lg:border-l lg:border-[#dbe5f3]" : ""
              } ${featuresVisible ? 'is-visible' : ''}`}
            >
              {f.icon}
              <h3 className="mt-3 text-base font-bold text-[#0a2a6b]">{f.title}</h3>
              <p className="mt-1 text-sm text-[#1f2f55]">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </section>
    </>
  );
}