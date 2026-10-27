"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const styles = `
  .bi-hero {
    position: relative;
    min-height: 550px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .bi-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero.png') center/cover;
    opacity: 0.15;
  }
  .bi-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }
  .bi-hero-content { position: relative; z-index: 10; }

  .bi-eyebrow {
    display: inline-block; font-size: 10px; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: #0b7cf0;
  }

  .bi-card {
    background: #fff; border-radius: 14px; padding: 18px;
    border: 1px solid #e6effb; box-shadow: 0 8px 28px rgba(11,124,240,.10);
    transition: all .3s ease;
  }
  .bi-card:hover { transform: translateY(-5px); border-color: #0b7cf0; box-shadow: 0 14px 36px rgba(11,124,240,.18); }

  .bi-icon {
    width: 40px; height: 40px; border-radius: 10px; background: #fff3e6;
    color: #ff8a1f; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .bi-icon-blue { background: #eaf3ff; color: #0b7cf0; }

  .bi-types-bg { background: linear-gradient(100deg, #eaf3ff 0%, #f6faff 55%, #dcebff 100%); }

  .bi-type-card {
    background: #fff; border-radius: 14px; padding: 22px 18px;
    border: 1px solid #e6effb; box-shadow: 0 8px 28px rgba(11,124,240,.10);
    text-align: center; transition: all .3s ease;
  }
  .bi-type-card:hover { transform: translateY(-6px); border-color: #0b7cf0; }
  .bi-type-icon {
    width: 48px; height: 48px; border-radius: 12px; background: #eaf3ff; color: #0b7cf0;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;
  }

  .bi-step-icon {
    width: 40px; height: 40px; border-radius: 50%; background: #fff3e6; color: #ff8a1f;
    display: flex; align-items: center; justify-content: center; margin-bottom: 10px; position: relative;
  }
  .bi-step-num {
    position: absolute; top: -6px; left: -6px; width: 18px; height: 18px; border-radius: 50%;
    background: #ff8a1f; color: #fff; font-size: 10px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }

  .bi-peace {
    background: linear-gradient(135deg, #eaf3ff 0%, #dcebff 100%);
    border: 1px solid #cfe2fb; border-radius: 16px; padding: 24px;
  }

  .bi-faq { background: #fff; border: 1px solid #e3edfb; border-radius: 8px; overflow: hidden; transition: box-shadow .3s ease; }
  .bi-faq:hover { box-shadow: 0 6px 20px rgba(11,124,240,.10); }
  .bi-faq.open { background: #fff4e5; border-color: #ffd29a; }

  .bi-banner {
    background: linear-gradient(120deg, #07163a 0%, #0a2a6b 60%, #0b4fb3 100%);
    border-radius: 16px; padding: 28px 32px; position: relative; overflow: hidden;
  }
  .bi-banner::after {
    content: ''; position: absolute; right: -80px; top: -80px; width: 260px; height: 260px;
    border-radius: 50%; border: 24px solid rgba(255,138,31,.25);
  }

  @media (max-width: 768px) {
    .bi-hero { min-height: 450px; }
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
  trash: ["M3 6h18", "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M10 11v6", "M14 11v6"],
  flue: ["M7 21V9a5 5 0 0 1 10 0v12", "M7 14h10", "M12 4V2"],
  controls: ["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"],
  check: ["M22 11.1V12a10 10 0 1 1-5.9-9.1", "M22 4L12 14l-3-3"],
  flame: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-4-2-7-4-9 0 4-4 6-4 12 0 4 3 8 7 8z",
  tank: ["M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M4 9h16", "M9 15h6"],
  drop: "M12 2.7s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z",
  chat: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", "M8 9h8", "M8 13h5"],
  home: ["M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z",
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
  badge: ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M8.2 13.9L7 23l5-3 5 3-1.2-9.1"],
  phone: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  arrow: "M5 12h14M13 6l6 6-6 6",
  tick: "M20 6L9 17l-5-5",
};

const INCLUDED = [
  { title: "Removal of Old Boiler", text: "Safe and responsible removal of your existing boiler.", icon: ICONS.trash },
  { title: "Flue Installation", text: "Correct and compliant flue installation for your new boiler.", icon: ICONS.flue },
  { title: "Controls Setup", text: "Smart and easy setup of your controls for better efficiency.", icon: ICONS.controls },
  { title: "Commissioning", text: "Full system checks and commissioning for safe operation.", icon: ICONS.check },
];

const BOILER_TYPES = [
  { name: "Combi Boiler", icon: ICONS.flame, points: ["Compact design", "Instant hot water", "Ideal for smaller homes"] },
  { name: "System Boiler", icon: ICONS.tank, points: ["Large hot water supply", "Great for bigger homes", "Works with a cylinder"] },
  { name: "Regular Boiler", icon: ICONS.drop, points: ["Uses hot water cylinder", "Durable & reliable", "Ideal for larger properties"] },
];

const STEPS = [
  { title: "Initial Consultation", text: "We discuss your needs, assess your property and recommend the best boiler for your home.", icon: ICONS.chat },
  { title: "Home Survey", text: "We check your home, measure and confirm installation details.", icon: ICONS.home },
  { title: "Installation", text: "Our engineers remove the old boiler, fit the new one and set up all components.", icon: ICONS.wrench },
  { title: "Testing & Commissioning", text: "We test everything, ensure it is working perfectly, and explain how to use it.", icon: ICONS.check },
];

const FAQS = [
  { q: "How long does a boiler installation take?", a: "Most installations are completed within 1 day, depending on the type of boiler and the complexity of the job." },
  { q: "Do you remove the old boiler?", a: "Yes. We safely remove and dispose of your old boiler as part of the installation." },
  { q: "What boiler is right for my home?", a: "It depends on your home size and hot water demand. We'll recommend the best option after a quick survey." },
  { q: "Is the installation covered by a warranty?", a: "Yes. Every installation includes a manufacturer warranty plus our own workmanship guarantee." },
];

export default function BoilerInstallationContent() {
  const [quote, setQuote] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: includedRef, isVisible: includedVisible } = useScrollAnimation();
  const { elementRef: typesRef, isVisible: typesVisible } = useScrollAnimation();
  const { elementRef: processRef, isVisible: processVisible } = useScrollAnimation();
  const { elementRef: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { elementRef: bannerRef, isVisible: bannerVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} className="bi-hero">
        <div className="bi-hero-content mx-auto max-w-7xl px-6 py-[30px]">
          <div className={`scroll-animate ${heroVisible ? "is-visible" : ""}`}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Professional Boiler<br />
              <span className="text-[#FF7A1A]">Installation</span>
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
            <span className="bi-eyebrow">What&apos;s Included</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] mt-3 mb-3 leading-tight">
              What&apos;s Included in Our <span className="text-[#0b7cf0]">Boiler Installation</span>
            </h2>
            <p className="text-gray-600 text-sm">
              Our complete installation service covers everything you need for a safe, efficient and hassle-free experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {INCLUDED.map((item, i) => (
              <div key={item.title} className={`scroll-animate scroll-animate-delay-${i + 1} bi-card flex gap-3 items-start ${includedVisible ? "is-visible" : ""}`}>
                <div className="bi-icon"><Icon d={item.icon} /></div>
                <div>
                  <h3 className="font-bold text-[#0a2a6b] text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES OF BOILERS */}
      <section ref={typesRef} className="bi-types-bg py-[30px]">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate ${typesVisible ? "is-visible" : ""}`}>
            <span className="bi-eyebrow">Types of Boilers</span>
            <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 items-center mt-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] leading-tight mb-3">
                  We Install All <span className="text-[#0b7cf0]">Types of Boilers</span>
                </h2>
                <p className="text-gray-600 text-sm mb-5">
                  From compact combi boilers to powerful system and regular boilers, we&apos;ll help you choose the perfect fit for your home and budget.
                </p>
                <button
                  onClick={() => setQuote(true)}
                  className="inline-flex items-center gap-2 bg-[#0a2a6b] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0b7cf0] transition-colors"
                >
                  Learn More About Brands <Icon d={ICONS.arrow} size={14} />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {BOILER_TYPES.map((t, i) => (
                  <div key={t.name} className={`scroll-animate scroll-animate-delay-${i + 1} bi-type-card ${typesVisible ? "is-visible" : ""}`}>
                    <div className="bi-type-icon"><Icon d={t.icon} size={24} /></div>
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
            <span className="bi-eyebrow">The Installation Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] mt-3 mb-3 leading-tight">
              Our Simple<br />
              <span className="text-[#0b7cf0]">Boiler Installation Process</span>
            </h2>
            <p className="text-gray-600 text-sm mb-6">A smooth and professional process from start to finish.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {STEPS.map((s, i) => (
                <div key={s.title} className={`scroll-animate scroll-animate-delay-${i + 1} ${processVisible ? "is-visible" : ""}`}>
                  <div className="bi-step-icon">
                    <span className="bi-step-num">{i + 1}</span>
                    <Icon d={s.icon} />
                  </div>
                  <h3 className="font-bold text-[#0a2a6b] text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`scroll-animate scroll-animate-delay-2 bi-peace ${processVisible ? "is-visible" : ""}`}>
            <span className="bi-eyebrow">Warranty &amp; Guarantee</span>
            <h3 className="text-2xl font-black text-[#0a2a6b] mt-2 mb-2 leading-tight">Peace of Mind Included</h3>
            <p className="text-xs text-gray-600 mb-4">
              All our boiler installations come with manufacturer warranties and our own workmanship guarantee.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <div className="bi-icon"><Icon d={ICONS.badge} /></div>
                <div>
                  <div className="text-sm font-bold text-[#0a2a6b]">Up to 10 Years</div>
                  <div className="text-xs text-gray-500">Manufacturer Warranty</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <div className="bi-icon"><Icon d={ICONS.shield} /></div>
                <div>
                  <div className="text-sm font-bold text-[#0a2a6b]">Our Workmanship</div>
                  <div className="text-xs text-gray-500">Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section ref={faqRef} className="py-[30px] bg-[#f4f9ff]">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.8fr] gap-10 items-start">
          <div className={`scroll-animate ${faqVisible ? "is-visible" : ""}`}>
            <span className="bi-eyebrow">Helpful Page</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a2a6b] mt-3 mb-3 leading-tight">
              Common Questions About <span className="text-[#0b7cf0]">Boiler Installation</span>
            </h2>
            <p className="text-gray-600 text-sm">Find answers to the most common questions about our boiler installation service.</p>
          </div>
          <div className={`scroll-animate scroll-animate-delay-2 space-y-2 ${faqVisible ? "is-visible" : ""}`}>
            {FAQS.map((f, i) => (
              <div key={f.q} className={`bi-faq ${openFaq === i ? "open" : ""}`}>
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

      {/* QUOTE BANNER */}
      <section ref={bannerRef} className="py-[30px] bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`scroll-animate bi-banner flex flex-col md:flex-row items-center justify-between gap-6 ${bannerVisible ? "is-visible" : ""}`}>
            <div className="relative z-10 text-center md:text-left">
              <span className="bi-eyebrow !text-[#ffb84d]">What To Do Next</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-1">
                Book Your <span className="text-[#ffb84d]">Free Quote</span> Today
              </h2>
              <p className="text-white/75 text-sm">Get in-depth advice, a competitive quote, and professional installation from our trusted team.</p>
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