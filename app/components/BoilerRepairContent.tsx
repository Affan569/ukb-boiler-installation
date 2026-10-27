"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const styles = `
  .boiler-repair-hero {
    position: relative;
    background: linear-gradient(135deg, #1a1a2e 0%, #0b7cf0 100%);
    min-height: 500px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .boiler-repair-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero.png') center/cover;
    opacity: 0.15;
  }

  .boiler-repair-content {
    position: relative;
    z-index: 10;
  }

  .emergency-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #ff4444;
    color: white;
    padding: 8px 16px;
    border-radius: 50px;
    font-weight: bold;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .problem-card {
    background: white;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .problem-card:hover {
    border-color: #0b7cf0;
    transform: translateY(-5px);
  }

  .timeline-item {
    position: relative;
    padding-left: 60px;
    padding-bottom: 40px;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e0e0e0;
  }

  .timeline-item:last-child::before {
    display: none;
  }

  .timeline-item::after {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    width: 16px;
    height: 16px;
    background: #0b7cf0;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #0b7cf0;
  }

  .cta-section {
    background: linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%);
    border-radius: 24px;
    padding: 60px 40px;
    color: white;
  }

  @media (max-width: 768px) {
    .boiler-repair-hero {
      min-height: 400px;
    }
  }
`;

const PROBLEMS = [
  {
    title: "No Heating or Hot Water",
    description: "Complete loss of heating and hot water supply - often caused by thermostat issues, broken diaphragms, or airlocks",
    icon: "❄️",
    urgency: "High",
  },
  {
    title: "Boiler Leaking",
    description: "Water leaking from your boiler could indicate corrosion, seal failure, or pressure issues - requires immediate attention",
    icon: "💧",
    urgency: "Critical",
  },
  {
    title: "Strange Noises",
    description: "Banging, whistling, or gurgling sounds often indicate air in the system, low pressure, or pump failure",
    icon: "🔊",
    urgency: "Medium",
  },
  {
    title: "Pilot Light Issues",
    description: "Pilot light won't stay lit or has yellow/orange flame - could be thermocouple or gas supply problems",
    icon: "🔥",
    urgency: "High",
  },
  {
    title: "Low Pressure",
    description: "Pressure gauge below 1 bar indicates water leak or pressure relief valve failure",
    icon: "📉",
    urgency: "Medium",
  },
  {
    title: "Boiler Keeps Switching Off",
    description: "Frequent shutdowns can be caused by thermostat problems, pump failure, or blocked condensate pipe",
    icon: "🔄",
    urgency: "High",
  },
];

const STEPS = [
  {
    title: "Emergency Call",
    description: "Call our 24/7 emergency line and describe your boiler problem",
  },
  {
    title: "Rapid Response",
    description: "Engineer dispatched within 2 hours for urgent repairs",
  },
  {
    title: "Diagnosis",
    description: "Thorough inspection to identify the root cause of the problem",
  },
  {
    title: "Repair",
    description: "Expert repair using quality parts with warranty",
  },
  {
    title: "Testing",
    description: "Full system test to ensure everything is working perfectly",
  },
];

export default function BoilerRepairContent() {
  const [quote, setQuote] = useState(false);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: problemsRef, isVisible: problemsVisible } = useScrollAnimation();
  const { elementRef: timelineRef, isVisible: timelineVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} className="boiler-repair-hero">
        <div className="boiler-repair-content mx-auto max-w-7xl px-6 py-20">
          <div className={`scroll-animate ${heroVisible ? 'is-visible' : ''}`}>
            <div className="emergency-badge mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              24/7 Emergency Service
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Boiler Breakdown?<br />
              <span className="text-[#ffb84d]">We'll Fix It Fast</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-8">
              Emergency boiler repair in Southampton. Gas Safe engineers available 24/7 to get your heating back on quickly and safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setQuote(true)}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#1a1a2e] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffb84d] transition-colors"
              >
                Emergency Repair
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

      {/* COMMON PROBLEMS */}
      <section ref={problemsRef} className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate text-center mb-16 ${problemsVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Common Issues</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mt-4 mb-6">
              Boiler Problems We <span className="text-[#0b7cf0]">Fix</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From minor issues to complete breakdowns, our expert engineers fix all boiler problems quickly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((problem, index) => (
              <div
                key={problem.title}
                className={`scroll-animate scroll-animate-delay-${index + 1} problem-card ${problemsVisible ? 'is-visible' : ''}`}
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-[#1a1a2e]">{problem.title}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    problem.urgency === 'Critical' ? 'bg-red-100 text-red-600' :
                    problem.urgency === 'High' ? 'bg-orange-100 text-orange-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {problem.urgency}
                  </span>
                </div>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPAIR PROCESS */}
      <section ref={timelineRef} className="py-20 bg-[#f8fbff]">
        <div className="mx-auto max-w-4xl px-6">
          <div className={`scroll-animate text-center mb-16 ${timelineVisible ? 'is-visible' : ''}`}>
            <span className="text-[#0b7cf0] font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mt-4 mb-6">
              Emergency Repair <span className="text-[#0b7cf0]">Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our streamlined 5-step process ensures you get back to warmth as quickly as possible.
            </p>
          </div>

          <div className="space-y-0">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className={`scroll-animate scroll-animate-delay-${index + 1} timeline-item ${timelineVisible ? 'is-visible' : ''}`}
              >
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="cta-section">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Boiler Emergency?</h2>
              <p className="text-xl text-white/90 mb-8">
                Don't suffer in the cold. Call our 24/7 emergency line now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+4454326546"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#ff4444] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
                  </svg>
                  Call Now: +44 54326546
                </a>
                <button
                  onClick={() => setQuote(true)}
                  className="inline-flex items-center justify-center gap-3 bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
                >
                  Get a Quote
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </>
  );
}
