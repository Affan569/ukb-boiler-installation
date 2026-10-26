"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Add once in your index.html / layout:
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

const css = `
.hiw{--navy:#0f1b3d;--blue:#0A6CFF;--orange:#f5651d;--grey:#6b7280;
  font-family:var(--font-geist-sans),system-ui,sans-serif;color:var(--navy);background:#fff;
  position:relative;overflow:hidden;padding:64px 24px 30px}
@media (min-width:1024px){.hiw{padding:30px 24px}}
.hiw *{box-sizing:border-box;margin:0;padding:0}
/* Light orange gradient on the content (left) half only */
.hiw::before{content:"";position:absolute;top:0;bottom:0;left:0;width:90%;pointer-events:none;z-index:0;
  background:linear-gradient(90deg,rgba(245,101,29,.16) 0%,rgba(245,101,29,.07) 55%,rgba(245,101,29,0) 100%)}
.hiw__inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(24px,4vw,64px);align-items:center}
.hiw__eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.hiw__eyebrow::before{content:"";width:40px;height:2px;background:var(--orange)}
.hiw__eyebrow span{font-size:14px;font-weight:500;letter-spacing:.18em;color:#4b5563;text-transform:uppercase}
.hiw h2{font-size:40px;line-height:1.15;font-weight:700;letter-spacing:-.01em}
.hiw h2 .hiw__blue{color:var(--blue);display:block}
@media (max-width:768px){.hiw h2{font-size:30px}}
.hiw__lead{margin-top:22px;max-width:470px;font-size:clamp(14px,1.1vw,16px);line-height:1.7;color:var(--grey)}
.hiw__features{margin-top:34px;display:flex;flex-wrap:wrap;align-items:center;gap:18px 0}
.hiw__feature{display:flex;align-items:center;gap:12px;padding:0 24px;font-size:13px;font-weight:500;line-height:1.3}
.hiw__feature:first-child{padding-left:0}
.hiw__feature + .hiw__feature{border-left:1px solid #dfe3ea}
.hiw__feature svg{width:28px;height:28px;flex:none}
.hiw__orbit{position:relative;width:100%;max-width:640px;margin-inline:auto;aspect-ratio:1/0.9}
.hiw__ring{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.hiw__hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:38%;aspect-ratio:1;border-radius:50%;background:#fff;
  box-shadow:0 10px 40px rgba(15,27,61,.08),inset 0 0 0 1px #eef1f6;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6%}
.hiw__hub svg{width:34%;height:auto;margin-bottom:8%}
.hiw__hub p{font-size:clamp(8px,1.1vw,11px);letter-spacing:.14em;color:#4b5563;font-weight:500;line-height:1.5}
.hiw__hub p b{display:block;font-weight:500;font-size:.9em;color:#9aa3b2}
.hiw__card{position:absolute;display:flex;gap:10px;align-items:flex-start;background:#fff;border-radius:22px;
  padding:clamp(12px,1.6vw,20px);box-shadow:0 12px 36px rgba(15,27,61,.10);width:44%}
.hiw__ico{flex:none;width:clamp(34px,4.4vw,48px);height:clamp(34px,4.4vw,48px);border-radius:14px;display:grid;place-items:center}
.hiw__ico svg{width:58%;height:58%}
.hiw__card h3{font-size:clamp(12px,1.2vw,14px);font-weight:600;margin-bottom:4px}
.hiw__card p{font-size:clamp(10px,.95vw,12px);line-height:1.5;color:var(--grey)}
.hiw__badge{position:absolute;top:-12px;left:-12px;width:clamp(26px,2.9vw,32px);height:clamp(26px,2.9vw,32px);border-radius:50%;color:#fff;
  font-size:clamp(10px,1vw,12px);font-weight:600;display:grid;place-items:center;box-shadow:0 0 0 4px #fff}
.hiw--blue{background:var(--blue)}.hiw--orange{background:var(--orange)}
.hiw__ico--blue{background:#e8f1ff}.hiw__ico--orange{background:#fff0e8}
.hiw__c1{left:25%;top:2%}
.hiw__c2{right:0;top:34%;width:42%}
.hiw__c3{left:34%;bottom:0;width:46%}
.hiw__c4{left:0;top:26%;width:42%}
@media (max-width:960px){
  /* stacked layout: content is on top, so the gradient covers the top half */
  .hiw::before{right:0;bottom:auto;width:auto;height:50%;
    background:linear-gradient(180deg,rgba(245,101,29,.16) 0%,rgba(245,101,29,0) 100%)}
  .hiw__inner{grid-template-columns:1fr}
  .hiw__lead{max-width:640px}
}
@media (max-width:640px){
  .hiw__features{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:28px;width:100%}
  .hiw__feature{flex-direction:column;justify-content:flex-start;gap:8px;padding:0 6px!important;text-align:center;font-size:12px}
  .hiw__feature svg{width:30px;height:30px}
  .hiw__orbit{aspect-ratio:auto;display:grid;gap:18px}
  .hiw__ring{display:none}
  .hiw__hub{position:relative;left:auto;top:auto;transform:none;width:min(220px,70%);margin:0 auto 10px;order:-1}
  .hiw__hub p{font-size:10px}
  .hiw__card{position:relative;inset:auto!important;width:100%!important;padding:16px;margin-left:12px;max-width:calc(100% - 12px)}
  .hiw__card h3{font-size:15px}
  .hiw__card p{font-size:13px}
  .hiw__ico{width:46px;height:46px}
  .hiw__badge{width:30px;height:30px;font-size:12px}
}
`;

type Tone = "blue" | "orange";

interface Step {
  id: string;
  number: string;
  title: string;
  text: string;
  tone: Tone;
  position: "c1" | "c2" | "c3" | "c4";
  icon: React.ReactNode;
}

const svgProps = {
  viewBox: "0 0 28 28",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const steps: Step[] = [
  {
    id: "quote",
    number: "01",
    title: "Free Quote",
    text: "Get a no-obligation quote, quickly and easily.",
    tone: "blue",
    position: "c1",
    icon: (
      <svg {...svgProps} stroke="#0A6CFF">
        <path d="M7 3h10l5 5v17H7z" />
        <path d="M17 3v5h5" />
        <path d="M15.5 13.5c-.5-.7-1.2-1-2-1-1.3 0-2.2.9-2.2 2.2v2.6c0 .8-.4 1.4-1.1 1.9h5.8M10.2 17h3.6" />
      </svg>
    ),
  },
  {
    id: "survey",
    number: "02",
    title: "Survey",
    text: "We'll visit your home, assess your needs and confirm the best solution.",
    tone: "orange",
    position: "c2",
    icon: (
      <svg {...svgProps} stroke="#0f1b3d">
        <path d="M3 13L14 4l11 9" />
        <path d="M6 11v13h8" />
        <circle cx="18.5" cy="18.5" r="4" stroke="#f5651d" />
        <path d="M21.5 21.5l3.5 3.5" stroke="#f5651d" />
      </svg>
    ),
  },
  {
    id: "install",
    number: "03",
    title: "Installation Day",
    text: "Our certified engineers fit your new boiler with care and professionalism.",
    tone: "blue",
    position: "c3",
    icon: (
      <svg {...svgProps} stroke="#0f1b3d">
        <path d="M4 24L15 13" />
        <path d="M20 4a5 5 0 00-5 6.5L4 21.5 6.5 24l11-11A5 5 0 0024 8l-3 3-3-1-1-3z" stroke="#0A6CFF" />
        <path d="M6 6l5 5M9 4l-5 5l2 2l5-5z" />
      </svg>
    ),
  },
  {
    id: "aftercare",
    number: "04",
    title: "Aftercare",
    text: "We're here for the long run with ongoing support and servicing.",
    tone: "orange",
    position: "c4",
    icon: (
      <svg {...svgProps} stroke="#0f1b3d">
        <path d="M14 3l9 3.5v6.7c0 5.6-3.8 9.8-9 11.8-5.2-2-9-6.2-9-11.8V6.5z" />
        <path d="M9.8 13.8l3 3 5.4-5.6" stroke="#f5651d" />
      </svg>
    ),
  },
];

const features = [
  {
    label: ["Simple", "Process"],
    icon: (
      <svg {...svgProps} stroke="#f5651d">
        <path d="M14 3l9 3.5v6.7c0 5.6-3.8 9.8-9 11.8-5.2-2-9-6.2-9-11.8V6.5z" />
        <path d="M9.8 13.8l3 3 5.4-5.6" />
      </svg>
    ),
  },
  {
    label: ["Fast", "Response"],
    icon: (
      <svg {...svgProps} stroke="#0A6CFF">
        <circle cx="14" cy="14" r="10.5" />
        <path d="M14 7.5V14l4.5 2.7" />
      </svg>
    ),
  },
  {
    label: ["Trusted", "Local Experts"],
    icon: (
      <svg {...svgProps} stroke="#f5651d">
        <path d="M8 13l4.2-8.5c1.8 0 3 1.4 2.6 3.3L14 11h6.3c1.5 0 2.6 1.4 2.3 2.9l-1.4 7c-.2 1.2-1.3 2.1-2.5 2.1H8z" />
        <path d="M3.5 13H8v10H3.5z" />
      </svg>
    ),
  },
];

const HowItWorks: React.FC = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <section ref={sectionRef} className="hiw" aria-labelledby="hiw-title">
      <style>{css}</style>

      <div className="hiw__inner">
        {/* LEFT */}
        <div>
          <div className={`scroll-animate hiw__eyebrow ${sectionVisible ? 'is-visible' : ''}`}>
            <span>How it works</span>
          </div>
          <h2 id="hiw-title" className={`scroll-animate-delay-1 ${sectionVisible ? 'is-visible' : ''}`}>
            From Quote to <span className="hiw__blue">Warmth in 4 Simple Steps</span>
          </h2>
          <p className={`scroll-animate-delay-2 hiw__lead ${sectionVisible ? 'is-visible' : ''}`}>
            Getting a new boiler couldn't be easier. We make the process simple, stress-free and
            fully supported — from your first enquiry to long after installation.
          </p>

          <div className="hiw__features">
            {features.map((f, i) => (
              <div className={`scroll-animate scroll-animate-delay-${i + 3} hiw__feature ${sectionVisible ? 'is-visible' : ''}`} key={f.label.join(" ")}>
                {f.icon}
                <span>
                  {f.label[0]}
                  <br />
                  {f.label[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

      {/* RIGHT */}
      <div className="hiw__orbit">
        <svg className="hiw__ring" viewBox="0 0 100 90" aria-hidden="true">
          <circle cx="50" cy="45" r="39" fill="none" stroke="#0A6CFF" strokeWidth=".25" strokeDasharray="1.2 1.6" opacity=".55" />
          <path d="M83 30 A39 39 0 0 1 89 52" fill="none" stroke="#f5651d" strokeWidth=".35" strokeDasharray="1 1.5" />
          <path d="M70 80 A39 39 0 0 1 56 84" fill="none" stroke="#0A6CFF" strokeWidth=".35" strokeDasharray="1 1.5" />
          <path d="M16 65 A39 39 0 0 1 12 55" fill="none" stroke="#f5651d" strokeWidth=".35" strokeDasharray="1 1.5" />
          <circle cx="82" cy="28" r=".9" fill="#f5651d" />
          <circle cx="90" cy="56" r=".9" fill="#0A6CFF" />
          <circle cx="16" cy="66" r=".9" fill="#f5651d" />
          <circle cx="20" cy="22" r=".9" fill="#0A6CFF" />
        </svg>

        <div className="hiw__hub">
          <svg viewBox="0 0 56 56" fill="none" stroke="#0f1b3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 27L28 7l22 20" />
            <path d="M11 24v25h34V24" />
            <path
              d="M28 43c-4 0-6.6-2.7-6.6-6.2 0-3.2 2.6-5 3.6-8.1 1.8 1.2 2.6 2.6 2.8 4.4 1.4-1 2-2.5 2-4 3.2 2 4.8 4.6 4.8 7.7 0 3.3-2.6 6.2-6.6 6.2z"
              stroke="#0A6CFF"
              fill="#e8f1ff"
            />
          </svg>
          <p>
            A WARMER HOME
            <b>IS JUST 4 STEPS AWAY</b>
          </p>
        </div>

        {steps.map((s, i) => (
          <article key={s.id} className={`scroll-animate scroll-animate-delay-${i + 6} hiw__card hiw__${s.position} ${sectionVisible ? 'is-visible' : ''}`}>
            <span className={`hiw__badge hiw--${s.tone}`}>{s.number}</span>
            <div className={`hiw__ico hiw__ico--${s.tone}`}>{s.icon}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default HowItWorks;