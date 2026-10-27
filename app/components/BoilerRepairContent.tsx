"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const styles = `
  .br-hero {
    position: relative;
    background: linear-gradient(135deg, #1a1a2e 0%, #0b7cf0 100%);
    min-height: 500px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .br-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero.png') center/cover;
    opacity: 0.15;
  }
  .br-hero-content { position: relative; z-index: 10; }

  .br-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #0b7cf0; border: 2px solid rgba(255,255,255,.55); color: #fff; padding: 6px 16px;
    border-radius: 50px; font-weight: bold; animation: br-pulse 2s infinite;
  }
  @keyframes br-pulse { 0%,100% { transform: scale(1);} 50% { transform: scale(1.05);} }

  .br-eyebrow {
    display: inline-block; font-size: 11px; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: #0b7cf0;
  }

  /* soft white cards with blue icon tile */
  .br-card {
    background: #fff; border-radius: 16px; padding: 22px 18px;
    box-shadow: 0 8px 30px rgba(11,124,240,.10);
    border: 1px solid #eaf2fd; transition: all .3s ease;
  }
  .br-card:hover { transform: translateY(-5px); border-color: #0b7cf0; box-shadow: 0 14px 36px rgba(11,124,240,.18); }
  .br-icon {
    width: 48px; height: 48px; border-radius: 12px; background: #eaf3ff;
    display: flex; align-items: center; justify-content: center; color: #0b7cf0;
    margin-bottom: 14px;
  }
  .br-card:hover .br-icon { background: #0b7cf0; color: #fff; }
  .br-icon-sm { width: 40px; height: 40px; border-radius: 10px; margin-bottom: 10px; }

  .br-brands-bg {
    background: linear-gradient(100deg, #eaf3ff 0%, #f6faff 50%, #dcebff 100%);
  }
  .br-logo {
    background: #fff; border-radius: 12px; height: 72px; padding: 0 22px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 20px rgba(11,124,240,.08); font-weight: 900;
    letter-spacing: -.02em; white-space: nowrap; transition: transform .3s ease;
  }
  .br-logo:hover { transform: translateY(-4px); }

  .br-process {
    background: linear-gradient(120deg, #0a1a3f 0%, #0b3a8f 55%, #0b7cf0 100%);
    position: relative; overflow: hidden;
  }
  .br-process::after {
    content: ''; position: absolute; right: -120px; top: -120px; width: 380px; height: 380px;
    border-radius: 50%; background: rgba(255,255,255,.05);
  }
  .br-step-circle {
    width: 64px; height: 64px; border-radius: 50%; background: #0b7cf0;
    border: 4px solid rgba(255,255,255,.9); color: #fff; display: flex;
    align-items: center; justify-content: center; margin: 0 auto 14px;
    box-shadow: 0 0 0 6px rgba(255,255,255,.12); position: relative; z-index: 2;
  }
  .br-step-num {
    position: absolute; top: -6px; left: -6px; width: 24px; height: 24px; border-radius: 50%;
    background: #fff; color: #0b7cf0; font-size: 12px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }
  .br-steps-line {
    position: absolute; left: 12%; right: 12%; top: 32px;
    border-top: 2px dashed rgba(255,255,255,.35); z-index: 1;
  }

  .br-stars { color: #ffb400; letter-spacing: 2px; font-size: 14px; }
  .br-faq {
    background: #fff; border: 1px solid #e3edfb; border-radius: 10px;
    overflow: hidden; transition: box-shadow .3s ease;
  }
  .br-faq:hover { box-shadow: 0 6px 20px rgba(11,124,240,.10); }

  .br-cta {
    background: linear-gradient(135deg, #0b7cf0 0%, #3b9bff 100%);
    border-radius: 24px; padding: 60px 40px; color: #fff;
  }

  @media (max-width: 768px) {
    .br-hero { min-height: 400px; }
    .br-steps-line { display: none; }
  }
`;

function Icon({ d, size = 24 }: { d: string | string[]; size?: number }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const ICONS = {
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"],
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z",
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
  check: ["M22 11.1V12a10 10 0 1 1-5.9-9.1", "M22 4L12 14l-3-3"],
  phone: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z",
  thermo: ["M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"],
  gauge: ["M12 14l4-4", "M3.3 17a10 10 0 1 1 17.4 0"],
  sound: ["M11 5L6 9H2v6h4l5 4V5z", "M15.5 8.5a5 5 0 0 1 0 7", "M19 5a10 10 0 0 1 0 14"],
  flame: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-4-2-7-4-9 0 4-4 6-4 12 0 4 3 8 7 8z",
  drop: "M12 2.7s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z",
  alert: ["M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z", "M12 9v4", "M12 17h.01"],
  cog: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"],
  power: ["M18.4 6.6a9 9 0 1 1-12.8 0", "M12 2v10"],
  badge: ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M8.2 13.9L7 23l5-3 5 3-1.2-9.1"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M9 15l2 2 4-4"],
  headset: ["M3 18v-6a9 9 0 0 1 18 0v6", "M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"],
  chevron: "M6 9l6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

const INCLUDED = [
  { title: "Full Diagnosis", text: "We trace the fault to its root and explain the problem in plain English.", icon: ICONS.search },
  { title: "Expert Repairs", text: "Skilled engineers fit genuine parts and industry-standard repairs.", icon: ICONS.wrench },
  { title: "Safety Checks", text: "We ensure your boiler is working safely and efficiently.", icon: ICONS.shield },
  { title: "Testing & Handover", text: "We test the system and walk you through everything before we leave.", icon: ICONS.check },
];

const BRANDS = [
  { name: "WORCESTER", sub: "Bosch Group", color: "#00a651", cls: "text-xl" },
  { name: "Vaillant", color: "#0a8a4a", cls: "text-2xl" },
  { name: "ideal", color: "#1a1a2e", cls: "text-3xl italic" },
  { name: "BAXI", color: "#1a56db", cls: "text-3xl" },
  { name: "VIESSMANN", color: "#e30613", cls: "text-lg" },
];

const PROBLEMS = [
  { title: "No Heating or Hot Water", icon: ICONS.thermo },
  { title: "Low Boiler Pressure", icon: ICONS.gauge },
  { title: "Strange Noises", icon: ICONS.sound },
  { title: "Pilot Light Issues", icon: ICONS.flame },
  { title: "Leaking Boiler", icon: ICONS.drop },
  { title: "Error Codes", icon: ICONS.alert },
  { title: "Thermostat Problems", icon: ICONS.cog },
  { title: "Boiler Not Turning On", icon: ICONS.power },
];

const STEPS = [
  { title: "Get in Touch", text: "Call or book online. We'll arrange a convenient time for your visit.", icon: ICONS.phone },
  { title: "Diagnosis", text: "Our engineers will inspect your boiler and identify the cause.", icon: ICONS.search },
  { title: "Repair", text: "We'll fix the problem using genuine parts and proven methods.", icon: ICONS.wrench },
  { title: "Test & Handover", text: "We'll test the system, make sure it's safe and fully working.", icon: ICONS.check },
];

const WARRANTY = [
  { title: "Genuine Parts & Workmanship", text: "All repairs use certified parts and are backed by our workmanship guarantee.", icon: ICONS.badge },
  { title: "Manufacturer Warranty Options", text: "Where applicable, we'll advise on manufacturer warranty cover.", icon: ICONS.file },
  { title: "Ongoing Support", text: "Need help after your repair? We're just a call away.", icon: ICONS.headset },
];

const REVIEWS = [
  { name: "Sarah M.", area: "Southampton", initials: "SM", text: "Quick response, friendly engineer and fixed the issue in no time. Highly recommended!" },
  { name: "James T.", area: "Eastleigh", initials: "JT", text: "Great service from start to finish. Explained everything clearly and left no mess behind." },
  { name: "Emma L.", area: "Winchester", initials: "EL", text: "Our boiler finally works as it should. Fair price and a professional team." },
];

const FAQS = [
  { q: "How quickly can you repair my boiler?", a: "For emergencies we aim to dispatch an engineer within 2 hours. Standard repairs are usually booked within 24–48 hours." },
  { q: "Do you charge a call-out fee?", a: "We give you a clear, upfront price before any work begins, so there are no surprises." },
  { q: "Can you repair all boiler brands?", a: "Yes. Our Gas Safe engineers repair all major brands including Worcester Bosch, Vaillant, Ideal, Baxi and Viessmann." },
  { q: "What if my boiler can't be repaired?", a: "If a repair isn't cost-effective, we'll explain your options and provide a free no-obligation replacement quote." },
];

export default function BoilerRepairContent() {
  const [quote, setQuote] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: includedRef, isVisible: includedVisible } = useScrollAnimation();
  const { elementRef: brandsRef, isVisible: brandsVisible } = useScrollAnimation();
  const { elementRef: problemsRef, isVisible: problemsVisible } = useScrollAnimation();
  const { elementRef: processRef, isVisible: processVisible } = useScrollAnimation();
  const { elementRef: warrantyRef, isVisible: warrantyVisible } = useScrollAnimation();
  const { elementRef: reviewsRef, isVisible: reviewsVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      {/* HERO */}
      <section ref={heroRef} className="br-hero">
        <div className="br-hero-content mx-auto max-w-7xl px-6 py-[30px]">
          <div className={`scroll-animate ${heroVisible ? "is-visible" : ""}`}>
            <div className="br-badge mb-6">
              <Icon d={ICONS.alert} size={20} />
              24/7 Emergency Service
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Boiler Breakdown?<br />
              <span className="text-[#ffb84d]">We&apos;ll Fix It Fast</span>
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
                <Icon d={ICONS.arrow} size={20} />
              </button>
              <a
                href="tel:+4454326546"
                className="inline-flex items-center justify-center gap-3 bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
              >
                <Icon d={ICONS.phone} size={20} />
                +44 54326546
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section ref={includedRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_2fr] gap-10 items-center">
          <div className={`scroll-animate ${includedVisible ? "is-visible" : ""}`}>
            <span className="br-eyebrow">What&apos;s Included</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mt-3 mb-4 leading-tight">
              More than just a fix.{" "}
              <span className="text-[#0b7cf0]">Complete boiler repair service.</span>
            </h2>
            <p className="text-gray-600">
              We diagnose the problem, repair it efficiently and make sure your boiler is running safely and smoothly, with minimal disruption to your home.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INCLUDED.map((item, i) => (
              <div key={item.title} className={`scroll-animate scroll-animate-delay-${i + 1} br-card ${includedVisible ? "is-visible" : ""}`}>
                <div className="br-icon"><Icon d={item.icon} /></div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section ref={brandsRef} className="br-brands-bg py-[30px]">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate ${brandsVisible ? "is-visible" : ""}`}>
            <span className="br-eyebrow">All Major Brands</span>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-center mt-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] leading-tight mb-4">
                  We Repair All Major <span className="text-[#0b7cf0]">Boiler Brands</span>
                </h2>
                <p className="text-gray-600 mb-5 text-sm">
                  Our engineers are trained to work with all leading boiler makes including Worcester Bosch, Vaillant, Ideal, Baxi, Viessmann and more.
                </p>
                <button
                  onClick={() => setQuote(true)}
                  className="inline-flex items-center gap-2 border border-[#0b7cf0] text-[#0b7cf0] bg-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0b7cf0] hover:text-white transition-colors"
                >
                  View All Brands <Icon d={ICONS.arrow} size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {BRANDS.map((b) => (
                  <div key={b.name} className={`br-logo ${b.cls}`} style={{ color: b.color }}>
                    <span className="text-center leading-none">
                      {b.name}
                      {b.sub && <span className="block text-[10px] font-semibold mt-1 text-gray-500">{b.sub}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON PROBLEMS */}
      <section ref={problemsRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_2fr] gap-10 items-center">
          <div className={`scroll-animate ${problemsVisible ? "is-visible" : ""}`}>
            <span className="br-eyebrow">Common Issues</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mt-3 mb-4 leading-tight">
              Common Boiler Problems <span className="text-[#0b7cf0]">We Fix It All.</span>
            </h2>
            <p className="text-gray-600 mb-5 text-sm">
              From no heating to strange noises, we&apos;ll get to the root of the problem and get your boiler back up and running.
            </p>
            <button
              onClick={() => setQuote(true)}
              className="inline-flex items-center gap-2 border border-[#0b7cf0] text-[#0b7cf0] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0b7cf0] hover:text-white transition-colors"
            >
              View All Problems <Icon d={ICONS.arrow} size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROBLEMS.map((p, i) => (
              <div key={p.title} className={`scroll-animate scroll-animate-delay-${(i % 6) + 1} br-card text-center ${problemsVisible ? "is-visible" : ""}`}>
                <div className="br-icon br-icon-sm mx-auto"><Icon d={p.icon} size={20} /></div>
                <h3 className="text-sm font-bold text-[#1a1a2e] leading-snug">{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} className="br-process py-[30px]">
        <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_2.2fr] gap-10 items-center">
          <div className={`scroll-animate ${processVisible ? "is-visible" : ""}`}>
            <span className="br-eyebrow !text-[#7fb8ff]">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4 leading-tight">
              Our Simple <span className="text-[#ffb84d]">4-Step</span> Repair Process
            </h2>
            <p className="text-white/80 text-sm">
              From the moment you call to the final check, we make the repair process easy, transparent and stress-free.
            </p>
          </div>
          <div className="relative">
            <div className="br-steps-line" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
              {STEPS.map((s, i) => (
                <div key={s.title} className={`scroll-animate scroll-animate-delay-${i + 1} text-center ${processVisible ? "is-visible" : ""}`}>
                  <div className="br-step-circle">
                    <span className="br-step-num">{i + 1}</span>
                    <Icon d={s.icon} size={26} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{s.title}</h3>
                  <p className="text-white/75 text-xs leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WARRANTY */}
      <section ref={warrantyRef} className="py-[30px] bg-[#f4f9ff] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_2.2fr_1fr] gap-8 items-center">
          <div className={`scroll-animate ${warrantyVisible ? "is-visible" : ""}`}>
            <span className="br-eyebrow">Warranty &amp; Support</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mt-3 mb-4 leading-tight">
              Peace of Mind <span className="text-[#0b7cf0]">with Every Repair.</span>
            </h2>
            <p className="text-gray-600 mb-5 text-sm">
              We stand behind our work with trained parts, qualified engineers and reliable aftercare support.
            </p>
            <button
              onClick={() => setQuote(true)}
              className="inline-flex items-center gap-2 border border-[#0b7cf0] text-[#0b7cf0] bg-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0b7cf0] hover:text-white transition-colors"
            >
              Learn More <Icon d={ICONS.arrow} size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {WARRANTY.map((w, i) => (
              <div key={w.title} className={`scroll-animate scroll-animate-delay-${i + 1} br-card ${warrantyVisible ? "is-visible" : ""}`}>
                <div className="br-icon"><Icon d={w.icon} /></div>
                <h3 className="font-bold text-[#1a1a2e] mb-2 leading-snug">{w.title}</h3>
                <p className="text-sm text-gray-500">{w.text}</p>
              </div>
            ))}
          </div>
          <div className={`scroll-animate hidden lg:block ${warrantyVisible ? "is-visible" : ""}`}>
            <div
              className="rounded-3xl h-72 shadow-xl"
              style={{ background: "linear-gradient(160deg,#cfe3ff,#0b7cf0), url('/images/hero.png') center/cover", backgroundBlendMode: "multiply" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS + FAQ */}
      <section ref={reviewsRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.6fr_1fr] gap-10">
          <div className={`scroll-animate ${reviewsVisible ? "is-visible" : ""}`}>
            <span className="br-eyebrow">Customer Reviews</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mt-3 mb-3 leading-tight">
              Trusted by Homeowners <span className="text-[#0b7cf0]">Across Our Area</span>
            </h2>
            <p className="text-gray-600 text-sm mb-6">Don&apos;t just take our word for it. Here&apos;s what our customers say about our boiler repair service.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {REVIEWS.map((r, i) => (
                <div key={r.name} className={`scroll-animate scroll-animate-delay-${i + 1} br-card ${reviewsVisible ? "is-visible" : ""}`}>
                  <div className="br-stars mb-2">★★★★★</div>
                  <p className="text-sm text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0b7cf0] text-white text-xs font-bold flex items-center justify-center">{r.initials}</div>
                    <div>
                      <div className="text-sm font-bold text-[#1a1a2e]">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.area}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`scroll-animate ${reviewsVisible ? "is-visible" : ""}`}>
            <div className="rounded-2xl border border-[#e3edfb] bg-[#f8fbff] p-6">
              <span className="br-eyebrow">Frequently Asked Questions</span>
              <h3 className="text-2xl font-black text-[#1a1a2e] mt-2 mb-4">
                Boiler Repair <span className="text-[#0b7cf0]">FAQs</span>
              </h3>
              <div className="space-y-2">
                {FAQS.map((f, i) => (
                  <div key={f.q} className="br-faq">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#1a1a2e]"
                      aria-expanded={openFaq === i}
                    >
                      {f.q}
                      <span className={`text-[#0b7cf0] transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                        <Icon d={ICONS.chevron} size={16} />
                      </span>
                    </button>
                    {openFaq === i && <p className="px-4 pb-4 text-sm text-gray-600">{f.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="br-cta">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Boiler Emergency?</h2>
              <p className="text-xl text-white/90 mb-8">Don&apos;t suffer in the cold. Call our 24/7 emergency line now.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+4454326546"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#0b7cf0] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon d={ICONS.phone} size={20} />
                  Call Now: +44 54326546
                </a>
                <button
                  onClick={() => setQuote(true)}
                  className="inline-flex items-center justify-center gap-3 bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
                >
                  Get a Quote
                  <Icon d={ICONS.arrow} size={20} />
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