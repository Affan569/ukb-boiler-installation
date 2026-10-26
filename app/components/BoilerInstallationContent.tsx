"use client";
import React, { useEffect, useRef, useState } from "react";
import QuoteModal from "./QuoteModal";

// 👉 Apni images public folder mein rakho aur sirf yahan path change karo
const HERO_BG = "/images/hero.png";
const ENGINEERS_IMG = "/images/1.jpg";
const INSTALLED_IMG = "/images/2.jpg";

const PATHS: Record<string, string> = {
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6",
  flame: "M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
  tag: "M3 12V4h8l10 10-8 8L3 12zM7.5 8.5h.01",
  file: "M7 3h7l5 5v13H7V3zM14 3v5h5M10 13h6M10 17h6",
  truck: "M2 6h12v10H2zM14 10h4l3 3v3h-7M6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
  pipe: "M5 4v7a3 3 0 003 3h8a3 3 0 013 3v3M3 4h4M17 20h4",
  controls: "M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zM12 17h.01M9 7h6v5H9z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5L16 9.5",
  drop: "M12 3s6 6 6 11a6 6 0 01-12 0c0-5 6-11 6-11z",
  space: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  home: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6",
  wrench: "M14.5 6.5a4 4 0 005 5L21 13l-8 8-4-4 8-8-2.5-2.5zM8 17l-5 5",
  gauge: "M4 18a8 8 0 1116 0M12 18l4-6M7 18h.01M17 18h.01",
  hand: "M5 12l4 4 4-3 6-6M3 20h18",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19 12l2-1-1-3-2 .5-1.5-1.5.5-2-3-1-1 2h-2l-1-2-3 1 .5 2L6 8.5 4 8l-1 3 2 1v0l-2 1 1 3 2-.5L7.5 17l-.5 2 3 1 1-2h2l1 2 3-1-.5-2 1.5-1.5 2 .5 1-3-2-1z",
  headset: "M4 14v-2a8 8 0 0116 0v2M4 14h3v5H4zM17 14h3v5h-3zM17 19c0 1.5-2 2-5 2",
  arrow: "M5 12h14M13 6l6 6-6 6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  plus: "M12 5v14M5 12h14",
  check: "M5 12.5l4.5 4.5L19 7.5",
};

const Icon = ({ n, s = 22 }: { n: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[n]} />
  </svg>
);

/* ---------- Content ---------- */
const trust = [
  { i: "user", t: "Expert engineers" },
  { i: "flame", t: "Gas Safe registered" },
  { i: "tag", t: "Competitive pricing" },
  { i: "file", t: "Free quotes" },
];

const included = [
  { i: "truck", t: "Removal of old boiler", d: "We safely remove and dispose of your old boiler and equipment." },
  { i: "pipe", t: "Flue & pipework", d: "New flue, pipework and connections fitted to current standards." },
  { i: "controls", t: "Controls", d: "Modern controls for better comfort and energy efficiency." },
  { i: "shield", t: "Testing & commissioning", d: "Full system checks, performance testing and certification." },
];

const boilers = [
  { n: "Combi boiler", tag: "Most popular", d: "Compact and efficient. Heats water on demand.", f: [["drop", "No water tank required"], ["space", "Space saving"], ["bolt", "High efficiency"]] },
  { n: "System boiler", tag: "Best for larger homes", d: "Ideal for homes with higher hot-water demand.", f: [["drop", "Works with a hot water tank"], ["gauge", "Consistent pressure"], ["shield", "Reliable performance"]] },
  { n: "Regular boiler", tag: "Traditional", d: "Perfect for traditional systems with a hot water cylinder.", f: [["drop", "Uses a cold water tank"], ["home", "Great for larger homes"], ["check", "Proven and reliable"]] },
];

const steps = [
  { i: "home", t: "Home assessment", tag: "Day 1", d: "We visit, check your property and heating needs.", pts: ["Free survey", "Fixed price quote"] },
  { i: "wrench", t: "repair", tag: "Install day", d: "Our certified engineers fit your new boiler.", pts: ["Old boiler removed", "Flue & controls fitted"] },
  { i: "gauge", t: "Testing & commissioning", tag: "Same day", d: "We test the system and make sure everything is perfect.", pts: ["Safety checks", "Performance tested"] },
  { i: "hand", t: "Handover & support", tag: "Day 2+", d: "You get full certification and ongoing support.", pts: ["Warranty registered", "Aftercare support"] },
];

const warranty = [
  { i: "shield", t: "Manufacturer warranty", d: "Up to 12 years, depending on model." },
  { i: "gear", t: "Workmanship guarantee", d: "Our work is guaranteed for your peace of mind." },
  { i: "headset", t: "Aftercare & support", d: "Ongoing support and service options available." },
];

const faqs = [
  { q: "How long does a boiler repair take?", a: "Most combi swaps are finished in one day. System and regular boilers, or jobs that involve moving the boiler, can take two days." },
  { q: "Do I need to be at home during the repair?", a: "Yes. An adult needs to be there to give access, approve the final position of the boiler and receive the handover." },
  { q: "What is included in the quote?", a: "Removal of your old boiler, flue and pipework, controls, testing, commissioning and certification. Your quote lists everything, with no hidden costs." },
  { q: "How long is the warranty?", a: "Manufacturer warranties run up to 12 years depending on the model. Our workmanship is guaranteed on top of that." },
];

/* ---------- Page ---------- */
export default function BoilerrepairContent() {
  const [open, setOpen] = useState<number>(0);
  const [quote, setQuote] = useState(false);
  const railRef = useRef<HTMLOListElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bi">
      <style>{css}</style>

      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="wrap hero-in">
          <span className="eyebrow light">Boiler repair</span>
          <h1>Reliable heating. <em>All year round.</em></h1>
          <p className="lead">Professional boiler repair to keep your home warm, safe and energy efficient.</p>
          <ul className="trust">
            {trust.map((x) => (
              <li key={x.t}><span className="chip"><Icon n={x.i} s={18} /></span>{x.t}</li>
            ))}
          </ul>
          <div className="btns">
            <button type="button" className="btn accent" onClick={() => setQuote(true)}>Get a free quote <Icon n="arrow" s={18} /></button>
           
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="sec">
        <div className="wrap gal">
          <figure className="shot">
            <img src={ENGINEERS_IMG} alt="Our expert engineers working on a boiler repair" loading="lazy" />
            <figcaption><b>Our expert engineers</b>Gas Safe registered, on site and on time.</figcaption>
          </figure>
          <figure className="shot">
            <img src={INSTALLED_IMG} alt="A boiler we installed for a customer" loading="lazy" />
            <figcaption><b>Recently installed</b>A clean, tidy finish on every job.</figcaption>
          </figure>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="sec">
        <div className="wrap split">
          <div>
            <span className="eyebrow">What’s included</span>
            <h2>Everything you need, <em>from start to finish.</em></h2>
            <p className="muted">Our repair service covers every essential step, so your new boiler is fitted safely and efficiently with minimal disruption.</p>
            <p className="script">Complete service, no hidden costs.</p>
          </div>
          <div className="grid4">
            {included.map((x) => (
              <article className="card center" key={x.t}>
                <span className="ico"><Icon n={x.i} /></span>
                <h3>{x.t}</h3><p>{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section className="sec tint" id="types">
        <div className="wrap split wide-right">
          <div>
            <span className="eyebrow">Types of boiler</span>
            <h2>Choose the right boiler for your home</h2>
            <p className="muted">We install high-quality boilers from leading manufacturers, designed for efficiency, reliability and lower energy bills.</p>
            <a href="#quote" className="btn solid">Compare boiler types <Icon n="arrow" s={18} /></a>
          </div>
          <div className="grid3">
            {boilers.map((b, k) => (
              <article className="card type" key={b.n}>
                <span className="pill">{b.tag}</span>
                <svg viewBox="0 0 120 130" className="mini" aria-hidden="true">
                  <rect x="22" y="6" width="76" height="104" rx="10" fill="#fff" stroke="#d6e2f2" />
                  <rect x="44" y="64" width="32" height="20" rx="4" fill="#0b2a63" />
                  {k === 2 && <rect x="84" y="40" width="30" height="86" rx="10" fill="#eef3fa" stroke="#d6e2f2" />}
                  {[38, 52, 60, 68, 82].map((x) => <rect key={x} x={x} y="110" width="4" height="16" rx="2" fill="#d58a55" />)}
                </svg>
                <h3>{b.n}</h3><p>{b.d}</p>
                <ul className="feat">
                  {b.f.map(([i, t]) => <li key={t}><Icon n={i} s={16} />{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec dark proc">
        <div className="wrap">
          <div className="proc-head">
            <span className="eyebrow light">Our process</span>
            <h2>A simple 4-step repair process</h2>
            <p className="muted-l">From first enquiry to final handover, we keep it easy, transparent and stress-free.</p>
          </div>
          <ol ref={railRef} className={"psteps" + (seen ? " seen" : "")}>
            {steps.map((x, i) => (
              <li key={x.t} className="pstep" style={{ "--d": `${i * 0.25}s` } as React.CSSProperties}>
                <span className="node"><Icon n={x.i} s={26} /></span>
                <span className="ghost-n">0{i + 1}</span>
                <span className="when">{x.tag}</span>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
                <ul>{x.pts.map((t) => <li key={t}><Icon n="check" s={14} />{t}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WARRANTY */}
      <section className="sec">
        <div className="wrap split warranty">
          <div className="shield-wrap">
            <svg viewBox="0 0 260 300" className="shield" role="img" aria-label="Up to 12 years warranty">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f86ff" /><stop offset="1" stopColor="#0a3fb8" /></linearGradient>
                <filter id="ss"><feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0a3fb8" floodOpacity=".35" /></filter>
              </defs>
              <path d="M130 12l98 36v78c0 66-42 118-98 142C74 244 32 192 32 126V48z" fill="url(#sg)" filter="url(#ss)" />
              <path d="M130 30l82 30v66c0 54-34 98-82 120-48-22-82-66-82-120V60z" fill="none" stroke="#ff8a1f" strokeWidth="4" />
              <text x="130" y="110" textAnchor="middle" fill="#cfe2ff" fontSize="15" fontWeight="600" fontFamily="Manrope, sans-serif">Up to</text>
              <text x="130" y="158" textAnchor="middle" fill="#fff" fontSize="46" fontWeight="800" fontFamily="Bricolage Grotesque, sans-serif">12</text>
              <text x="130" y="184" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="700" fontFamily="Manrope, sans-serif">year warranty</text>
              <circle cx="130" cy="220" r="17" fill="#fff" />
              <path d="M121 220l6 6 12-12" stroke="#0a3fb8" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="script tilt">Peace of mind with every install.</p>
          </div>
          <div>
            <span className="eyebrow">Warranty & guarantee</span>
            <h2>Your new boiler, <em>fully protected.</em></h2>
            <p className="muted">We only work with trusted manufacturers and back every repair with comprehensive warranties and guarantees.</p>
            <div className="grid3 gap">
              {warranty.map((w) => (
                <article className="card" key={w.t}>
                  <span className="ico sm"><Icon n={w.i} s={20} /></span>
                  <h3>{w.t}</h3><p>{w.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec tint">
        <div className="wrap faq">
          <div>
            <span className="eyebrow">Frequently asked questions</span>
            <h2>Boiler repair FAQs</h2>
            <p className="muted">Straight answers to what people ask us most. Need something else? Call us any time.</p>
          </div>
          <div className="acc">
            {faqs.map((f, i) => (
              <div className={"qa" + (open === i ? " on" : "")} key={f.q}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  {f.q}<span className="plus"><Icon n="plus" s={18} /></span>
                </button>
                <div className="ans"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="quote">
        <div className="wrap cta-grid">
          <div>
            <h2>Ready to upgrade your boiler?</h2>
            <p className="muted-l">Get a free, no-obligation quote today and take the first step towards a warmer, more efficient home.</p>
            <ul className="mini-trust">
              <li><Icon n="clock" s={18} />Fast response</li>
              <li><Icon n="tag" s={18} />No hidden costs</li>
              <li><Icon n="pin" s={18} />Local & trusted</li>
            </ul>
          </div>
          <div className="quote">
            <h3>Get your free quote</h3>
            <p>Tell us a little about your heating and we’ll reply with the best options for your home.</p>
            <button type="button" className="btn solid full" onClick={() => setQuote(true)}>Request a quote <Icon n="arrow" s={18} /></button>
            <span className="call">Or call us on <Icon n="phone" s={16} /> <a href="tel:+441234567890">+44 123 456 7890</a></span>
          </div>
        </div>
      </section>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </div>
  );
}

/* ---------- Styles ---------- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
.bi{--navy:#0b2a63;--blue:#1565f0;--sky:#eaf2ff;--ink:#16233f;--mute:#5d6b85;--line:#e3ebf7;--or:#ff7a00;
 font-family:var(--font-geist-sans),system-ui,sans-serif;color:var(--ink);background:#fff;overflow-x:hidden;line-height:1.55}
.bi *{box-sizing:border-box}
.bi h1,.bi h2,.bi h3{font-family:var(--font-geist-sans),system-ui,sans-serif;color:var(--navy);margin:0;letter-spacing:-.02em}
.bi h1{font-size:40px;line-height:1.12;font-weight:800;margin:14px 0 18px}
.bi h2{font-size:40px;line-height:1.12;font-weight:800;margin:10px 0 14px}
.bi h3{font-size:1.05rem;font-weight:700}
.bi em{font-style:normal;color:var(--blue)}
.bi p{margin:0}
.bi a{color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:700;color:var(--blue);letter-spacing:.06em}
.eyebrow:before{content:"";width:28px;height:2px;background:currentColor;border-radius:2px}
.eyebrow.light{color:#8fb8ff}
.lead{font-size:1.15rem;color:var(--mute);max-width:440px}
.muted{color:var(--mute);max-width:420px}
.muted-l{color:#b9cdf2;max-width:420px}
.script{font-family:Caveat,cursive;font-size:1.6rem;color:var(--navy);margin-top:24px;transform:rotate(-3deg);display:inline-block;border-bottom:2px solid #bcd3f8}
.script.tilt{display:block;text-align:center;margin-top:0}

/* hero */
.hero{position:relative;min-height:600px;display:flex;align-items:center;padding:30px 0;background:#0b2a63 center/cover no-repeat;isolation:isolate}
.hero:before{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgba(7, 27, 68, 0.85) 0%,
    rgba(11, 42, 99, 0.84) 20%,
    rgba(11, 42, 99, 0.45) 40%,
    rgba(11, 42, 99, 0.25) 50%,
    transparent 100%
  );
  pointer-events: none;
}
.hero-in{width:100%}
.hero h1{color:#fff;max-width:560px}
.hero h1 em{color:#8fd0ff}
.hero .lead{color:#dbe8ff}
.hero .trust li{color:#fff}
.trust{list-style:none;padding:0;margin:28px 0;display:flex;flex-wrap:wrap;gap:18px}
.trust li{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:600;color:var(--navy)}
.chip{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#fff;color:var(--blue);box-shadow:0 4px 12px rgba(21,101,240,.15)}
.btns{display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:999px;font-weight:700;font-size:.95rem;text-decoration:none;border:2px solid transparent;cursor:pointer;font-family:inherit;transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px)}
.btn:focus-visible,.qa button:focus-visible,.quote input:focus-visible{outline:3px solid #8fb8ff;outline-offset:3px}
.btn.solid{background:var(--blue);color:#fff;box-shadow:0 10px 24px rgba(21,101,240,.35)}
.btn.accent{background:var(--or);color:#fff;box-shadow:0 12px 28px rgba(255,122,0,.4)}
.btn.ghost{background:#fff;color:var(--blue);border-color:#bcd3f8}
.btn.full{width:100%;justify-content:center}
.btn.ghost-l{background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.55)}
@keyframes bob{50%{transform:translateY(-10px)}}

/* sections */
.sec{padding:30px 0}
.tint{background:linear-gradient(180deg,#f4f8ff,#eaf2ff)}
.split{display:grid;grid-template-columns:.8fr 1.4fr;gap:48px;align-items:center}
.split.wide-right{grid-template-columns:.7fr 1.5fr}
.card{background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px 20px;box-shadow:0 14px 34px rgba(21,60,140,.07);transition:transform .25s,box-shadow .25s}
.card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(21,60,140,.13)}
.card p{color:var(--mute);font-size:.85rem;margin-top:6px}
.card.center{text-align:center}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.grid3.gap{margin-top:28px}
.ico{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(145deg,#fff,#dfeaff);color:var(--blue);box-shadow:inset 0 0 0 1px #d3e2fb,0 8px 18px rgba(21,101,240,.15)}
.ico.sm{width:46px;height:46px;margin:0 0 12px}
.type{position:relative;padding-top:18px}
.pill{display:inline-block;font-size:.7rem;font-weight:700;color:var(--blue);background:#e3eeff;border-radius:999px;padding:4px 10px}
.mini{display:block;width:120px;height:130px;margin:6px auto 10px}
.feat{list-style:none;margin:16px 0 0;padding:14px 0 0;border-top:1px dashed #d3e0f4;display:grid;gap:9px}
.feat li{display:flex;gap:9px;align-items:center;font-size:.82rem;font-weight:600;color:var(--navy)}
.feat svg{color:var(--blue);flex:none}

/* process */
.dark{background:radial-gradient(120% 140% at 85% 0%,#14469e 0%,var(--navy) 55%,#071b44 100%);color:#fff}
.dark h2,.dark h3{color:#fff}
.steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative}

/* warranty */
.warranty{grid-template-columns:.9fr 1.2fr}
.shield-wrap{position:relative;display:grid;gap:6px;justify-items:center}
.shield-wrap:before{content:"";position:absolute;inset:8% 4% 14%;background:radial-gradient(circle,#dbe9ff,transparent 70%);border-radius:50%}
.shield{position:relative;width:min(300px,80%);animation:bob 7s ease-in-out infinite}

/* faq */
.faq{display:grid;grid-template-columns:.8fr 1.2fr;gap:48px;align-items:start}
.acc{display:grid;gap:12px}
.qa{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;transition:box-shadow .25s}
.qa.on{box-shadow:0 14px 30px rgba(21,60,140,.1)}
.qa button{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 22px;cursor:pointer;font-weight:700;color:var(--navy)}
.plus{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--sky);color:var(--blue);flex:none;transition:transform .25s,background .25s}
.qa.on .plus{transform:rotate(45deg);background:var(--blue);color:#fff}
.ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
.qa.on .ans{grid-template-rows:1fr}
.ans p{overflow:hidden;color:var(--mute);padding:0 22px;font-size:.92rem}
.qa.on .ans p{padding-bottom:20px}

/* cta */
.cta{background:linear-gradient(120deg,#0a3fb8,#1565f0 60%,#3b8cff);color:#fff;padding:30px 0}
.cta h2{color:#fff}
.cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.mini-trust{list-style:none;padding:0;margin:26px 0 0;display:flex;gap:22px;flex-wrap:wrap;font-size:.85rem;font-weight:600}
.mini-trust li{display:flex;gap:8px;align-items:center}
.quote{background:#fff;color:var(--ink);border-radius:24px;padding:30px;box-shadow:0 30px 60px rgba(4,20,70,.35);display:grid;gap:14px}
.quote p{color:var(--mute);font-size:.88rem}
.call{display:flex;gap:8px;align-items:center;font-size:.85rem;color:var(--mute)}
.call a{color:var(--blue);font-weight:700;text-decoration:none}

@media (max-width:980px){
 .hero-grid,.split,.split.wide-right,.warranty,.faq,.cta-grid{grid-template-columns:1fr}
 .grid4{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:640px){
 .grid3,.grid4{grid-template-columns:1fr}
}
/* gallery */
.gal{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.shot{position:relative;margin:0;border-radius:24px;overflow:hidden;aspect-ratio:4/3;background:linear-gradient(135deg,#dbe9ff,#bcd3f8);box-shadow:0 20px 44px rgba(21,60,140,.18)}
.shot img{width:100%;height:100%;object-fit:cover;display:block}
.shot figcaption{position:absolute;left:14px;right:14px;bottom:14px;background:rgba(255,255,255,.93);backdrop-filter:blur(6px);border-radius:16px;padding:12px 16px;font-size:.85rem;color:var(--mute)}
.shot figcaption b{display:block;color:var(--navy);font-family:'Bricolage Grotesque',sans-serif;font-size:1rem}
/* process */
.proc-head{text-align:center;display:grid;justify-items:center;margin-bottom:18px}
.proc-head .muted-l{max-width:520px}
.psteps{list-style:none;margin:0;padding:34px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;position:relative}
.psteps:before{content:"";position:absolute;left:12.5%;right:12.5%;top:33px;height:3px;border-radius:3px;background:linear-gradient(90deg,#3b8cff,#8fd0ff);box-shadow:0 0 18px #3b8cff;transform:scaleX(0);transform-origin:left;transition:transform 1.6s ease}
.psteps.seen:before{transform:scaleX(1)}
.pstep{position:relative;text-align:center;padding:42px 18px 20px;border-radius:24px;background:linear-gradient(160deg,rgba(255,255,255,.13),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.15);opacity:0;transform:translateY(16px);transition:opacity .6s var(--d),transform .6s var(--d),border-color .25s}
.seen .pstep{opacity:1;transform:none}
.pstep:hover{border-color:#6aa8ff}
.node{position:absolute;left:50%;top:-27px;margin-left:-27px;width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:#fff;color:var(--blue);box-shadow:0 0 0 6px rgba(59,140,255,.28),0 0 28px rgba(59,140,255,.7)}
.ghost-n{position:absolute;right:12px;top:6px;font:800 76px/1 'Bricolage Grotesque',sans-serif;color:transparent;-webkit-text-stroke:1.5px rgba(143,184,255,.3);pointer-events:none}
.when{display:inline-block;font-size:12px;font-weight:700;color:#8fd0ff;background:rgba(143,208,255,.14);border-radius:999px;padding:3px 10px;margin-bottom:8px}
.pstep ul{list-style:none;width:fit-content;margin:14px auto 0;padding:12px 0 0;border-top:1px solid rgba(255,255,255,.14);display:grid;gap:7px}
.pstep ul li{display:flex;gap:8px;align-items:center;font-size:.8rem;color:#dbe8ff}
.pstep ul svg{color:#6ee7a8;flex:none}
@media (max-width:980px){.psteps{grid-template-columns:repeat(2,1fr);row-gap:44px}.psteps:before{display:none}}
@media (max-width:640px){
 .bi h1,.bi h2{font-size:30px}
 .eyebrow{font-size:12px}
 .gal,.psteps{grid-template-columns:1fr}
 .hero{min-height:420px}
}
@media (prefers-reduced-motion:reduce){.pstep{opacity:1;transform:none;transition:none}.psteps:before{transition:none}.boiler,.shield{animation:none}.btn,.card,.ans,.plus{transition:none}}
`;