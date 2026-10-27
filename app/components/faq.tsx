"use client";

import { useId, useState, type ReactNode } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* =====================================================================
   DATA — edit everything here, no need to touch the component below.
   ===================================================================== */

type BadgeIcon = "chat" | "shield" | "headset";

export const FAQ_SECTION = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  titleTop: "Got Questions?",
  titleAccent: "We’ve Got Answers.",
  lead: "Find quick answers to the most common questions about our boiler installation services, process, pricing and more.",
  defaultOpen: 1, // index of the item open on load (0-based). Use -1 for all closed
  badges: [
    { icon: "chat" as BadgeIcon, label: ["Quick", "Responses"] },
    { icon: "shield" as BadgeIcon, label: ["Clear", "Information"] },
    { icon: "headset" as BadgeIcon, label: ["Dedicated", "Support"] },
  ],
};

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "How long does a boiler installation take?",
    answer:
      "Most boiler replacements are completed in a single day. Larger jobs, such as moving the boiler or changing the pipework, can take a little longer. We confirm the timescale in your quote.",
  },
  {
    question: "Do you offer free quotes?",
    answer:
      "Yes, we provide free, no-obligation quotes for all boiler installations. Our team will assess your needs, recommend the best options and give you a clear, upfront price with no hidden costs.",
  },
  {
    question: "Are your engineers Gas Safe registered?",
    answer:
      "Yes. All of our engineers are Gas Safe registered and fully insured, and they carry their ID card on every visit. You can check any engineer on the Gas Safe Register.",
  },
  {
    question: "What brands of boilers do you install?",
    answer:
      "We install boilers from leading manufacturers and will recommend the right model for your home, heating needs and budget. Ask us which brands we can supply when you request your quote.",
  },
  {
    question: "Do you provide warranty?",
    answer:
      "Yes. Every installation comes with the manufacturer’s warranty on the boiler, plus a guarantee on our workmanship. The exact length depends on the model and is confirmed in your quote.",
  },
  {
    question: "Can you help with finance options?",
    answer:
      "Yes. We can talk you through ways to spread the cost of your new boiler into monthly payments. Request a quote and we’ll explain the options available to you.",
  },
];

/* ===================================================================== */

const ICONS: Record<BadgeIcon, ReactNode> = {
  chat: (
    <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-5 3.5V17H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
  ),
  shield: (
    <path d="M12 3l7 2.8v5.4c0 4.4-2.9 8.1-7 9.8-4.1-1.7-7-5.4-7-9.8V5.8L12 3z" />
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.6" />
      <path d="M19 19c0 1.7-2 2.5-5 2.5" />
    </>
  ),
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className="faq-chev"
    data-open={open}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function FAQ() {
  const [open, setOpen] = useState(FAQ_SECTION.defaultOpen);
  const uid = useId();
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <section ref={sectionRef} className="faq" aria-labelledby={`${uid}-title`}>
      <style>{CSS}</style>

      <div className="faq-inner">
        <div className="faq-copy">
          <div className={`scroll-animate faq-eyebrow ${sectionVisible ? 'is-visible' : ''}`}>
            <span className="faq-line" />
            <span>{FAQ_SECTION.eyebrow}</span>
          </div>

          <h2 className={`scroll-animate-delay-1 faq-title ${sectionVisible ? 'is-visible' : ''}`} id={`${uid}-title`}>
            <span className="faq-navy">{FAQ_SECTION.titleTop}</span>
            <span className="faq-blue">{FAQ_SECTION.titleAccent}</span>
          </h2>

          <p className={`scroll-animate-delay-2 faq-lead ${sectionVisible ? 'is-visible' : ''}`}>{FAQ_SECTION.lead}</p>

          <ul className="faq-badges">
            {FAQ_SECTION.badges.map((b, i) => (
              <li key={b.label[0]} className={`scroll-animate scroll-animate-delay-${i + 3} ${sectionVisible ? 'is-visible' : ''}`}>
                <span className="faq-badge-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#1f6bff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[b.icon]}
                  </svg>
                </span>
                <span className="faq-badge-text">
                  {b.label[0]}
                  <br />
                  {b.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const id = `${uid}-${i}`;
            return (
              <div className={`scroll-animate scroll-animate-delay-${i + 6} faq-item ${sectionVisible ? 'is-visible' : ''}`} data-open={isOpen} key={f.question}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel`}
                  id={`${id}-btn`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-q-text">{f.question}</span>
                  <Chevron open={isOpen} />
                </button>
                <div
                  className="faq-a"
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                >
                  <div>
                    <p>{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.faq{
  --navy:#0b2a5b; --blue:#1479ff; --orange:#F5651D;
  position:relative; overflow:hidden; isolation:isolate;
  background:linear-gradient(180deg,#fff 0%,#fbfcff 100%);
  font-family:var(--font-geist-sans),system-ui,sans-serif;
  padding:40px 0 0px;
}
.faq-inner{
  position:relative; z-index:1; max-width:1200px; margin:0 auto; padding:0 32px;
  display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:48px; align-items:start;
}

/* ---------- left ---------- */
.faq-eyebrow{display:flex; align-items:center; gap:18px; font-size:12px; letter-spacing:.26em; color:var(--navy); font-weight:500; padding-top:18px}
.faq-line{width:46px; height:2px; background:var(--orange); display:inline-block; flex:none}
.faq-title{margin:22px 0 26px; font-weight:800; line-height:1.08; letter-spacing:-.025em; font-size:clamp(34px,4.3vw,40px)}
.faq-title span{display:block}
.faq-navy{color:var(--navy)}
.faq-blue{color:var(--blue)}
.faq-lead{margin:0 0 34px; max-width:370px; color:#4d5c7c; font-size:16.5px; line-height:1.7}
.faq-badges{list-style:none; margin:0; padding:0; display:flex; align-items:center}
.faq-badges li{display:flex; align-items:center; gap:12px; padding:0 26px; position:relative}
.faq-badges li:first-child{padding-left:0}
.faq-badges li:last-child{padding-right:0}
.faq-badges li + li::before{content:""; position:absolute; left:0; top:50%; height:42px; transform:translateY(-50%); width:1px; background:#dbe6f7}
.faq-badge-icon{width:46px; height:46px; border-radius:50%; background:#e8f1ff; display:grid; place-items:center; flex:none}
.faq-badge-text{font-size:14px; line-height:1.4; color:#41507a}

/* ---------- accordion ---------- */
.faq-list{display:flex; flex-direction:column; gap:14px}
.faq-item{
  background:#fff; border:1px solid #e8eefa; border-radius:18px;
  box-shadow:0 10px 28px -14px rgba(14,42,102,.16);
  transition:background .35s, border-color .35s, box-shadow .35s;
}
.faq-item[data-open="true"]{
  background:linear-gradient(135deg,#fde3d0 0%,#fdeadd 55%,#fff1e8 100%);
  border-color:#f8cba9;
  box-shadow:0 14px 30px -14px rgba(245,101,29,.28);
}
.faq-q{
  all:unset; box-sizing:border-box; width:100%; cursor:pointer;
  display:flex; align-items:center; gap:22px; padding:18px 26px 18px 18px; border-radius:18px;
}
.faq-q:focus-visible{outline:2px solid var(--orange); outline-offset:2px}
.faq-num{
  width:44px; height:44px; flex:none; border-radius:50%;
  display:grid; place-items:center; font-weight:800; font-size:16px;
  background:#e6f0ff; color:var(--blue); transition:background .35s,color .35s;
}
.faq-item[data-open="true"] .faq-num{background:linear-gradient(135deg,#ff7a2e,#f25a10); color:#fff; box-shadow:0 6px 14px -4px rgba(245,101,29,.55)}
.faq-q-text{flex:1; font-weight:700; font-size:15px; color:var(--navy); line-height:1.35}
.faq-chev{flex:none; color:var(--navy); transition:transform .35s, color .35s}
.faq-chev[data-open="true"]{transform:rotate(180deg); color:var(--orange)}

.faq-a{
  display:grid; grid-template-rows:0fr; visibility:hidden;
  transition:grid-template-rows .38s ease, visibility .38s;
}
.faq-item[data-open="true"] .faq-a{grid-template-rows:1fr; visibility:visible}
.faq-a > div{overflow:hidden}
.faq-a p{margin:0; padding:0 40px 24px 84px; max-width:640px; color:#4f5d79; font-size:15px; line-height:1.85}

/* ---------- responsive: same design, stacked ---------- */
@media (max-width:900px){
  .faq{padding:30px 0 30px}
  .faq-inner{grid-template-columns:1fr; gap:34px; padding:0 18px}
  .faq-eyebrow{padding-top:0}
  .faq-lead{max-width:none; font-size:15.5px}
  }
@media (max-width:520px){
  .faq-eyebrow{gap:12px; letter-spacing:.18em; font-size:11px}
  .faq-line{width:30px}
  .faq-badges li{padding:0 12px; gap:8px}
  .faq-badges li + li::before{height:34px}
  .faq-badge-icon{width:36px; height:36px}
  .faq-badge-icon svg{width:18px; height:18px}
  .faq-badge-text{font-size:11.5px}
  .faq-q{gap:14px; padding:14px 16px 14px 14px}
  .faq-num{width:38px; height:38px; font-size:14px}
  .faq-q-text{font-size:15px}
  .faq-a p{padding:0 18px 20px 66px; font-size:14px; line-height:1.75}
}
@media (prefers-reduced-motion:reduce){
  .faq-item,.faq-num,.faq-chev,.faq-a{transition:none}
}.faq-inner {
    grid-template-columns: 1fr;
    gap: 34px;
    /* padding: 0px 0px; */
}
`;