"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const styles = `
  .bs-hero {
    position: relative;
    min-height: 500px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .bs-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero.png') center/cover;
    opacity: 0.15;
  }
  .bs-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .bs-hero-content { position: relative; z-index: 10; }

  .bs-eyebrow {
    display: inline-block; font-size: 10px; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: #0b7cf0;
  }

  .bs-card {
    background: #fff; border-radius: 14px; padding: 18px;
    border: 1px solid #e6effb; box-shadow: 0 8px 28px rgba(11,124,240,.10);
    transition: all .3s ease;
  }
  .bs-card:hover { transform: translateY(-5px); border-color: #0b7cf0; box-shadow: 0 14px 36px rgba(11,124,240,.18); }

  .bs-icon {
    width: 40px; height: 40px; border-radius: 10px; background: #eaf3ff;
    color: #0b7cf0; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .bs-icon-orange { background: #fff3e6; color: #ff8a1f; }

  .bs-dark {
    background: linear-gradient(120deg, #07163a 0%, #0a2a6b 60%, #0b4fb3 100%);
    border-radius: 16px; padding: 30px 32px; position: relative; overflow: hidden;
  }
  .bs-dark::after {
    content: ''; position: absolute; right: -90px; top: -90px; width: 280px; height: 280px;
    border-radius: 50%; background: rgba(255,255,255,.05);
  }
  .bs-benefit-circle {
    width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 10px;
    border: 2px solid rgba(255,138,31,.7); color: #ff8a1f;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.06); transition: all .3s ease;
  }
  .bs-benefit:hover .bs-benefit-circle { background: #ff8a1f; color: #fff; transform: translateY(-4px); }

  .bs-types-bg { background: linear-gradient(100deg, #eaf3ff 0%, #f6faff 55%, #dcebff 100%); }
  .bs-type-card {
    background: #fff; border-radius: 14px; padding: 22px 18px;
    border: 1px solid #e6effb; box-shadow: 0 8px 28px rgba(11,124,240,.10);
    text-align: center; transition: all .3s ease;
  }
  .bs-type-card:hover { transform: translateY(-6px); border-color: #0b7cf0; }
  .bs-type-icon {
    width: 48px; height: 48px; border-radius: 12px; background: #eaf3ff; color: #0b7cf0;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;
  }

  .bs-step-icon {
    width: 40px; height: 40px; border-radius: 50%; background: #fff3e6; color: #ff8a1f;
    display: flex; align-items: center; justify-content: center; margin-bottom: 10px; position: relative;
  }
  .bs-step-num {
    position: absolute; top: -6px; left: -6px; width: 18px; height: 18px; border-radius: 50%;
    background: #ff8a1f; color: #fff; font-size: 10px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }

  .bs-peace {
    background: linear-gradient(135deg, #fff6ea 0%, #ffe9d0 100%);
    border: 1px solid #ffd9ae; border-radius: 16px; padding: 24px;
  }

  .bs-faq { background: #fff; border: 1px solid #e3edfb; border-radius: 8px; overflow: hidden; transition: box-shadow .3s ease; }
  .bs-faq:hover { box-shadow: 0 6px 20px rgba(11,124,240,.10); }
  .bs-faq.open { background: #fff4e5; border-color: #ffd29a; }

  .bs-banner {
    background: linear-gradient(120deg, #07163a 0%, #0a2a6b 60%, #0b4fb3 100%);
    border-radius: 16px; padding: 28px 32px; position: relative; overflow: hidden;
  }
  .bs-banner::after {
    content: ''; position: absolute; right: -80px; top: -80px; width: 260px; height: 260px;
    border-radius: 50%; border: 24px solid rgba(255,138,31,.25);
  }

  @media (max-width: 768px) {
    .bs-hero { min-height: 400px; }
  }
`;

function Icon({ d, size = 20 }: { d: string | string[]; size?: number }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const ICONS = {
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"],
  clean: ["M19 3l-7 7", "M14 8l2 2", "M3 21l3-9 6 6-9 3z", "M9 15l-1 1"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
  gauge: ["M12 14l4-4", "M3.3 17a10 10 0 1 1 17.4 0"],
  bolt: "M13 2L3 14h8l-1 8 10-12h-8z",
  hourglass: ["M6 2h12", "M6 22h12", "M7 2v4a5 5 0 0 0 2 4l3 2-3 2a5 5 0 0 0-2 4v4", "M17 2v4a5 5 0 0 1-2 4l-3 2 3 2a5 5 0 0 1 2 4v4"],
  power: ["M18.4 6.6a9 9 0 1 1-12.8 0", "M12 2v10"],
  flame: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-4-2-7-4-9 0 4-4 6-4 12 0 4 3 8 7 8z",
  tank: ["M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M4 9h16", "M9 15h6"],
  drop: "M12 2.7s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z",
  calendar: ["M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z", "M16 2v4", "M8 2v4", "M3 10h18", "M9 16l2 2 4-4"],
  truck: ["M1 3h15v13H1z", "M16 8h4l3 3v5h-7z", "M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", "M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
  check: ["M22 11.1V12a10 10 0 1 1-5.9-9.1", "M22 4L12 14l-3-3"],
  home: ["M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  phone: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  arrow: "M5 12h14M13 6l6 6-6 6",
  tick: "M20 6L9 17l-5-5",
};

const INCLUDED = [
  { title: "Full System Inspection", text: "We check all key components for safety and performance.", icon: ICONS.search },
  { title: "Cleaning & Flushing", text: "Removes buildup and keeps your boiler running efficiently.", icon: ICONS.clean },
  { title: "Safety Checks", text: "We test gas pressure, correct pressure and safe operation.", icon: ICONS.shield },
  { title: "Performance Check", text: "Ensures your boiler is working efficiently and reliably.", icon: ICONS.gauge },
];

const BENEFITS = [
  { title: "Improved Safety", text: "Detects the risk of dangerous leaks.", icon: ICONS.shield },
  { title: "Better Efficiency", text: "Used less energy, lower bills.", icon: ICONS.bolt },
  { title: "Longer Lifespan", text: "Keeps your boiler in top condition.", icon: ICONS.hourglass },
  { title: "Fewer Breakdowns", text: "Avoids costly emergency repairs.", icon: ICONS.power },
];

const BOILER_TYPES = [
  { name: "Combi Boilers", icon: ICONS.flame, points: ["Compact and efficient", "Instant hot water", "Ideal for smaller homes"] },
  { name: "System Boilers", icon: ICONS.tank, points: ["Larger hot water supply", "Great for bigger homes", "Works with a cylinder"] },
  { name: "Regular Boilers", icon: ICONS.drop, points: ["Uses a hot water cylinder", "Reliable & durable", "Ideal for larger properties"] },
];

const STEPS = [
  { title: "Book Your Service", text: "Get in touch and choose a convenient time.", icon: ICONS.calendar },
  { title: "Engineer Visit", text: "Our Gas Safe engineer carries out a full service.", icon: ICONS.truck },
  { title: "Inspection & Testing", text: "We check, clean and ensure everything is safe.", icon: ICONS.check },
  { title: "Peace of Mind", text: "You're all set with a safe, more efficient boiler.", icon: ICONS.home },
];

const FAQS = [
  { q: "How often should I service my boiler?", a: "We recommend servicing your boiler once every 12 months to keep it running safely, efficiently and to maintain your warranty." },
  { q: "What does a boiler service include?", a: "A full inspection, cleaning of key components, performance testing and safety checks, followed by a written report." },
  { q: "How long does a boiler service take?", a: "Most services take around 45–60 minutes, depending on the type and condition of your boiler." },
  { q: "Will a service affect my boiler warranty?", a: "Regular annual servicing by a Gas Safe engineer helps keep your manufacturer warranty valid." },
];

export default function BoilerServicingContent() {
  const [quote, setQuote] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: includedRef, isVisible: includedVisible } = useScrollAnimation();
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { elementRef: typesRef, isVisible: typesVisible } = useScrollAnimation();
  const { elementRef: processRef, isVisible: processVisible } = useScrollAnimation();
  const { elementRef: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { elementRef: bannerRef, isVisible: bannerVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} className="bs-hero">
        <div className="bs-hero-content mx-auto max-w-7xl px-6 py-[30px]">
          <div className={`scroll-animate ${heroVisible ? "is-visible" : ""}`}>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Expert Boiler<br />
              <span className="text-[#FF7A1A]">Servicing</span>
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
                <Icon d={ICONS.arrow} />
              </button>
              <a
                href="tel:+4454326546"
                className="inline-flex items-center justify-center gap-3 bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
              >
                <Icon d={ICONS.phone} />
                07988530358
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section ref={includedRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.6fr] gap-10 items-center">
          <div className={`scroll-animate ${includedVisible ? "is-visible" : ""}`}>
            <span className="bs-eyebrow">What&apos;s Included</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] mt-3 mb-3 leading-tight">
              What&apos;s Included in <span className="text-[#0b7cf0]">Our Boiler Servicing?</span>
            </h2>
            <p className="text-gray-600 text-sm">
              Our comprehensive boiler service includes a full inspection, cleaning and safety check to ensure your system is working at its best.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {INCLUDED.map((item, i) => (
              <div key={item.title} className={`scroll-animate scroll-animate-delay-${i + 1} bs-card flex gap-3 items-start ${includedVisible ? "is-visible" : ""}`}>
                <div className="bs-icon"><Icon d={item.icon} /></div>
                <div>
                  <h3 className="font-bold text-[#0a2a6b] text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS (DARK PANEL) */}
      <section ref={benefitsRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate bs-dark grid lg:grid-cols-[1fr_2fr] gap-8 items-center ${benefitsVisible ? "is-visible" : ""}`}>
            <div className="relative z-10">
              <span className="bs-eyebrow !text-[#ffb84d]">Why Choose Us</span>
              <h2 className="text-3xl font-black text-white mt-2 mb-3 leading-tight">
                The Benefits of <span className="text-[#ffb84d]">Regular Boiler Servicing</span>
              </h2>
              <p className="text-white/75 text-sm">
                A well-serviced boiler is safer, more efficient and less likely to break down. It also helps you save money on energy bills and extends the life of your system.
              </p>
            </div>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bs-benefit text-center">
                  <div className="bs-benefit-circle"><Icon d={b.icon} size={24} /></div>
                  <h3 className="text-white font-bold text-sm mb-1">{b.title}</h3>
                  <p className="text-white/70 text-xs">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ALL BOILER TYPES */}
      <section ref={typesRef} className="bs-types-bg py-[30px]">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate ${typesVisible ? "is-visible" : ""}`}>
            <span className="bs-eyebrow">We Service All Types of Boilers</span>
            <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 items-center mt-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] leading-tight mb-3">
                  Boiler Servicing for <span className="text-[#0b7cf0]">All Boiler Types</span>
                </h2>
                <p className="text-gray-600 text-sm mb-5">
                  We service all major boiler brands and types, including combi, system and regular boilers.
                </p>
                <button
                  onClick={() => setQuote(true)}
                  className="inline-flex items-center gap-2 bg-[#0a2a6b] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0b7cf0] transition-colors"
                >
                  View Our Boiler Brands <Icon d={ICONS.arrow} size={14} />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {BOILER_TYPES.map((t, i) => (
                  <div key={t.name} className={`scroll-animate scroll-animate-delay-${i + 1} bs-type-card ${typesVisible ? "is-visible" : ""}`}>
                    <div className="bs-type-icon"><Icon d={t.icon} size={24} /></div>
                    <h3 className="font-bold text-[#0a2a6b] mb-3">{t.name}</h3>
                    <ul className="space-y-1.5 text-left">
                      {t.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-[#0b7cf0] mt-0.5"><Icon d={ICONS.tick} size={12} /></span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS + PEACE OF MIND */}
      <section ref={processRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[2.2fr_1fr] gap-8 items-start">
          <div className={`scroll-animate ${processVisible ? "is-visible" : ""}`}>
            <span className="bs-eyebrow">Our Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] mt-3 mb-3 leading-tight">
              Our Boiler <span className="text-[#0b7cf0]">Servicing Process</span>
            </h2>
            <p className="text-gray-600 text-sm mb-6">Fast, efficient and hassle-free from start to finish.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {STEPS.map((s, i) => (
                <div key={s.title} className={`scroll-animate scroll-animate-delay-${i + 1} ${processVisible ? "is-visible" : ""}`}>
                  <div className="bs-step-icon">
                    <span className="bs-step-num">{i + 1}</span>
                    <Icon d={s.icon} />
                  </div>
                  <h3 className="font-bold text-[#0a2a6b] text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`scroll-animate scroll-animate-delay-2 bs-peace ${processVisible ? "is-visible" : ""}`}>
            <span className="bs-eyebrow !text-[#ff8a1f]">Warranty &amp; Guarantee</span>
            <h3 className="text-2xl font-black text-[#0a2a6b] mt-2 mb-2 leading-tight">Peace of Mind Included</h3>
            <p className="text-xs text-gray-600 mb-4">All our boiler servicing comes with our workmanship guarantee and certified engineers.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <div className="bs-icon bs-icon-orange"><Icon d={ICONS.shield} /></div>
                <div className="text-xs font-bold text-[#0a2a6b]">Fully qualified &amp; Gas Safe registered engineers</div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <div className="bs-icon bs-icon-orange"><Icon d={ICONS.check} /></div>
                <div className="text-xs font-bold text-[#0a2a6b]">No hidden costs, ever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section ref={faqRef} className="py-[30px] bg-[#f4f9ff]">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.8fr] gap-10 items-start">
          <div className={`scroll-animate ${faqVisible ? "is-visible" : ""}`}>
            <span className="bs-eyebrow">Helpful Page</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] mt-3 mb-3 leading-tight">
              Boiler Servicing <span className="text-[#0b7cf0]">FAQs</span>
            </h2>
            <p className="text-gray-600 text-sm">Find answers to the most common questions about boiler servicing.</p>
          </div>
          <div className={`scroll-animate scroll-animate-delay-2 space-y-2 ${faqVisible ? "is-visible" : ""}`}>
            {FAQS.map((f, i) => (
              <div key={f.q} className={`bs-faq ${openFaq === i ? "open" : ""}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#0a2a6b]"
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="text-[#0b7cf0]"><Icon d={openFaq === i ? ICONS.minus : ICONS.plus} size={16} /></span>
                </button>
                {openFaq === i && <p className="px-4 pb-4 text-xs text-gray-600">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING BANNER */}
      <section ref={bannerRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate bs-banner flex flex-col md:flex-row items-center justify-between gap-6 ${bannerVisible ? "is-visible" : ""}`}>
            <div className="relative z-10 text-center md:text-left">
              <span className="bs-eyebrow !text-[#ffb84d]">Ready To Book Your Service?</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-1">
                Book Your Boiler <span className="text-[#ffb84d]">Service Today</span>
              </h2>
              <p className="text-white/75 text-sm">Keep your home safe, warm and efficient with our professional boiler servicing. Fast, reliable and hassle-free.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setQuote(true)}
                className="inline-flex items-center justify-center gap-2 bg-[#ff8a1f] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#ffa13d] transition-colors"
              >
                Get a Free Quote <Icon d={ICONS.arrow} size={16} />
              </button>
              <a
                href="tel:+4454326546"
                className="inline-flex items-center justify-center gap-2 border border-white/60 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
              >
                <Icon d={ICONS.phone} size={16} />
                Call Us 07988530358
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </>
  );
}