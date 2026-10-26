"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* =====================================================================
   DATA — edit everything here, no need to touch the component below.
   ===================================================================== */

// The card stage is designed at this size, then scaled down to fit any screen,
// so mobile shows exactly the same 3D layout as desktop.
const STAGE_W = 620;
const STAGE_H = 330;

type BadgeIcon = "shield" | "star" | "people";

export const SECTION = {
  eyebrow: "TESTIMONIALS",
  titleTop: "What Our",
  titleAccent: "Customers Say.",
  lead: "Real feedback from real Southampton homeowners. See why so many trust us for their boiler installation and heating needs.",
  tagline: ["Real People.", "Real Experiences."] as [string, string],
  startIndex: 1, // which review is centred on load (0-based)
  autoplay: true, // cards keep moving automatically
  intervalMs: 1500, // time between moves (milliseconds) — card move itself takes ~1s
  badges: [
    { icon: "shield" as BadgeIcon, label: ["Trusted", "& Verified"] },
    { icon: "star" as BadgeIcon, label: ["100%", "Satisfaction"] },
    { icon: "people" as BadgeIcon, label: ["Southampton", "Experts"] },
  ],
};

type Review = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tone: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Our old boiler gave up in January. They quoted the same day and had a new one fitted within 48 hours.",
    name: "Michael Hughes",
    role: "Shirley, Southampton",
    initials: "MH",
    tone: "#6b8cc7",
  },
  {
    quote:
      "Tidy, on time and explained everything clearly. Our new combi boiler has made the house warm and the bills lower.",
    name: "Sarah Thompson",
    role: "Portswood, Southampton",
    initials: "ST",
    tone: "#c98a6b",
  },
  {
    quote:
      "Honest advice, a fair price and no pushy sales talk. They even removed the old boiler and left everything spotless.",
    name: "Emily Carter",
    role: "Bitterne, Southampton",
    initials: "EC",
    tone: "#b07aa8",
  },
  {
    quote:
      "Gas Safe registered, fully insured and brilliant to deal with. I'd recommend them to anyone in Southampton.",
    name: "David Patel",
    role: "Woolston, Southampton",
    initials: "DP",
    tone: "#5f9e8f",
  },
  {
    quote:
      "From the free survey to the final handover, the whole boiler installation was smooth and stress-free.",
    name: "Anna Walker",
    role: "Sholing, Southampton",
    initials: "AW",
    tone: "#d1a24f",
  },
  {
    quote:
      "They fitted a new boiler and smart thermostat in one day. Friendly local team, and they still check in on us.",
    name: "James Collins",
    role: "Bassett, Southampton",
    initials: "JC",
    tone: "#7a8fd1",
  },
];

/* Card slots. Every card has the same size; only transform + opacity change,
   so the browser animates it on the GPU (smooth, no layout jumps).
   x = left offset in stage px, z = depth, ry = Y rotation, s = scale, o = opacity */
const SLOTS: Record<number, { x: number; z: number; ry: number; s: number; o: number; layer: number }> = {
  [-2]: { x: -185, z: 0, ry: 30, s: 0.7, o: 0, layer: 0 },
  [-1]: { x: -25, z: 0, ry: 22, s: 0.8, o: 1, layer: 2 },
  [0]: { x: 167, z: 40, ry: 0, s: 1, o: 1, layer: 4 },
  [1]: { x: 366, z: 0, ry: -22, s: 0.8, o: 1, layer: 3 },
  [2]: { x: 518, z: 0, ry: -30, s: 0.68, o: 0.55, layer: 1 },
  [3]: { x: 635, z: 0, ry: -30, s: 0.6, o: 0, layer: 0 },
};

const Stars = () => (
  <div className="tst-stars" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z"
          fill="#FFB400"
        />
      </svg>
    ))}
  </div>
);

const QuoteMark = () => (
  <svg className="tst-qm" viewBox="0 0 32 28" aria-hidden="true">
    <path
      d="M0 28V16.4C0 7.2 5 1.2 13.4 0l1.4 3.6C10 5 7.6 8 7.4 12H14v16H0zm18 0V16.4C18 7.2 23 1.2 31.4 0l1.4 3.6C28 5 25.6 8 25.4 12H32v16H18z"
      fill="currentColor"
    />
  </svg>
);

const ICONS: Record<BadgeIcon, ReactNode> = {
  shield: (
    <path d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3zm-1.2 11.6l4.9-4.9-1.1-1.1-3.8 3.8-1.7-1.7-1.1 1.1 2.8 2.8z" />
  ),
  star: (
    <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.4 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3zm0 4.6l-1.2 2.6-2.8.3 2.1 1.9-.6 2.8 2.5-1.4 2.5 1.4-.6-2.8 2.1-1.9-2.8-.3L12 7.6z" />
  ),
  people: (
    <path d="M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM9 13c-2.7 0-6 1.3-6 3.5V19h12v-2.5C15 14.3 11.7 13 9 13zm7 0c-.4 0-.8 0-1.2.1 1.2.8 2.2 1.9 2.2 3.4V19h5v-2.5c0-2-2.7-3.5-6-3.5z" />
  ),
};

export default function Testimonials() {
  const [active, setActive] = useState(SECTION.startIndex);
  const total = REVIEWS.length;
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const fitRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const prevOffsets = useRef<number[]>([]);

  // Auto-move: restarts after every change (so manual clicks reset the timer),
  // pauses while a mouse hovers / keyboard focus is inside, and is skipped
  // entirely for people who prefer reduced motion.
  useEffect(() => {
    if (!SECTION.autoplay || paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % total),
      SECTION.intervalMs
    );
    return () => window.clearTimeout(id);
  }, [active, paused, total]);

  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const update = () => {
      setScale(Math.min(1, el.clientWidth / STAGE_W));
      setReady(true);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + total) % total);

  // offset of card i relative to the active one, always in the range -2 … total-3.
  // A card that wraps around jumps between two invisible slots, so it never flies across.
  const offsetOf = (i: number) => ((((i - active + 2) % total) + total) % total) - 2;

  const offsets = REVIEWS.map((_, i) => offsetOf(i));
  const jumped = offsets.map(
    (p, i) => prevOffsets.current[i] !== undefined && Math.abs(prevOffsets.current[i] - p) > 2
  );
  useEffect(() => {
    prevOffsets.current = offsets;
  });

  return (
    <section
      ref={sectionRef}
      className="tst"
      aria-label="Customer testimonials"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{CSS}</style>

      <div className="tst-glow" aria-hidden="true" />

      <div className="tst-inner">
        <div className="tst-copy">
          <div className={`scroll-animate tst-eyebrow ${sectionVisible ? 'is-visible' : ''}`}>
            <span className="tst-line" />
            <span>{SECTION.eyebrow}</span>
          </div>

          <h2 className={`scroll-animate-delay-1 tst-title ${sectionVisible ? 'is-visible' : ''}`}>
            <span className="tst-navy">{SECTION.titleTop}</span>
            <span className="tst-blue">{SECTION.titleAccent}</span>
          </h2>

          <p className={`scroll-animate-delay-2 tst-lead ${sectionVisible ? 'is-visible' : ''}`}>{SECTION.lead}</p>

          <ul className="tst-badges">
            {SECTION.badges.map((b, i) => (
              <li key={b.label[0]} className={`scroll-animate scroll-animate-delay-${i + 3} ${sectionVisible ? 'is-visible' : ''}`}>
                <span className="tst-badge-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#1f6bff" aria-hidden="true">
                    {ICONS[b.icon]}
                  </svg>
                </span>
                <span className="tst-badge-text">
                  {b.label[0]}
                  <br />
                  {b.label[1]}
                </span>
              </li>
            ))}
          </ul>

          <div className={`scroll-animate-delay-5 tst-pager ${sectionVisible ? 'is-visible' : ''}`}>
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="tst-count">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="tst-fit"
          ref={fitRef}
          style={{ height: STAGE_H * scale, opacity: ready ? 1 : 0 }}
        >
          <div
            className="tst-stage"
            style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
          >
            <div className="tst-ring" aria-hidden="true" />

            <div className="tst-tag" aria-hidden="true">
              <span>{SECTION.tagline[0]}</span>
              <span>{SECTION.tagline[1]}</span>
              <svg viewBox="0 0 120 10" width="120" height="10">
                <path d="M2 7c30-6 70-6 116-2" fill="none" stroke="#F5651D" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>

            {REVIEWS.map((r, i) => {
              const pos = offsets[i];
              const slot = SLOTS[Math.max(-2, Math.min(3, pos))];
              return (
                <article
                  key={r.name}
                  className={"tst-card" + (jumped[i] ? " tst-jump" : "")}
                  data-active={pos === 0}
                  aria-hidden={pos !== 0}
                  style={{
                    transform: `translate3d(${slot.x}px,-50%,${slot.z}px) rotateY(${slot.ry}deg) scale(${slot.s})`,
                    opacity: slot.o,
                    zIndex: slot.layer,
                    pointerEvents: slot.o === 0 ? "none" : undefined,
                  }}
                >
                  <div className="tst-card-top">
                    <Stars />
                    <QuoteMark />
                  </div>
                  <p className="tst-quote">{r.quote}</p>
                  <div className="tst-person">
                    <span className="tst-avatar" style={{ background: r.tone }}>
                      {r.initials}
                    </span>
                    <span>
                      <strong>{r.name}</strong>
                      <small>{r.role}</small>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.tst{
  --navy:#0b2a5b; --blue:#1f6bff; --orange:#F5651D;
  position:relative; overflow:hidden; isolation:isolate;
  background:#fff; font-family:var(--font-geist-sans),system-ui,sans-serif;
  padding:56px 0;
}
/* orange gradient coming in from the RIGHT */
.tst::before{
  content:""; position:absolute; top:0; bottom:0; right:0; width:75%;
  pointer-events:none; z-index:0;
  background:
    radial-gradient(60% 70% at 100% 50%, rgba(255,150,70,.30) 0%, rgba(255,150,70,0) 70%),
    linear-gradient(270deg, rgba(245,101,29,.20) 0%, rgba(245,101,29,.09) 50%, rgba(245,101,29,0) 100%);
}
/* soft blue halo behind the cards */
.tst-glow{
  position:absolute; z-index:0; pointer-events:none;
  width:560px; height:560px; right:14%; top:50%; transform:translateY(-50%);
  background:radial-gradient(closest-side, rgba(31,107,255,.12), rgba(31,107,255,0));
}
.tst-inner{
  position:relative; z-index:1; max-width:1180px; margin:0 auto; padding:0 32px;
  display:grid; grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr); align-items:center; gap:24px;
}

/* ---------- left copy ---------- */
.tst-eyebrow{display:flex; align-items:center; gap:12px; font-size:12px; letter-spacing:.2em; color:var(--navy); font-weight:500}
.tst-line{width:30px; height:2px; background:var(--orange); display:inline-block}
.tst-title{margin:18px 0 18px; font-weight:800; line-height:1.08; font-size:clamp(34px,4.2vw,40px); letter-spacing:-.02em}
.tst-title span{display:block}
.tst-navy{color:var(--navy)}
.tst-blue{color:var(--blue)}
.tst-lead{margin:0 0 26px; max-width:340px; color:#43506b; font-size:15px; line-height:1.65}
.tst-badges{list-style:none; margin:0 0 30px; padding:0; display:flex; gap:22px; flex-wrap:wrap}
.tst-badges li{display:flex; align-items:center; gap:8px}
.tst-badge-icon{
  width:38px; height:38px; border-radius:50%; background:#e8f0ff;
  display:grid; place-items:center; flex:none;
}
.tst-badge-text{font-size:11.5px; line-height:1.25; color:#43506b; font-weight:500}
.tst-pager{display:flex; align-items:center; gap:14px}
.tst-pager button{
  width:32px; height:32px; border-radius:50%; border:1.5px solid #cfe0ff; background:#fff;
  color:var(--blue); display:grid; place-items:center; cursor:pointer;
  transition:background .2s,border-color .2s,color .2s;
}
.tst-pager button:hover{background:var(--blue); border-color:var(--blue); color:#fff}
.tst-pager button:focus-visible{outline:2px solid var(--orange); outline-offset:2px}
.tst-count{font-size:13px; color:#8a96ad}
.tst-count b{color:var(--blue); font-weight:600}

/* ---------- card stage ---------- */
.tst-fit{position:relative; width:100%; min-width:0; transition:opacity .3s}
.tst-stage{position:relative; perspective:1400px; transform-origin:0 0}
.tst-ring{
  position:absolute; left:50%; top:50%; width:380px; height:380px; transform:translate(-50%,-50%);
  border-radius:50%; border:1px solid rgba(31,107,255,.18);
  box-shadow:0 0 0 38px rgba(255,255,255,.18);
}
.tst-tag{
  position:absolute; right:0; top:-6px; z-index:5; text-align:left;
  font-family:var(--font-geist-sans),system-ui,sans-serif; font-weight:700; font-size:21px; line-height:1.05;
  color:var(--navy); transform:rotate(-6deg);
}
.tst-tag span{display:block}
.tst-tag span:last-of-type{color:var(--orange)}
.tst-tag svg{display:block; margin-top:2px}

/* All cards share one size. Position / tilt / scale / fade come from inline
   transform + opacity, so only GPU-friendly properties are animated. */
.tst-card{
  position:absolute; top:50%; left:0; width:250px; padding:22px 22px 20px; color:#fff;
  border-radius:16px; border:1px solid rgba(255,255,255,.18);
  background:linear-gradient(155deg,#2a5fc4 0%,#173f8f 45%,#0e2a66 100%);
  box-shadow:0 22px 40px -14px rgba(14,42,102,.55), inset 0 1px 0 rgba(255,255,255,.22);
  transform-style:preserve-3d;
  backface-visibility:hidden;
  will-change:transform, opacity;
  transition:transform 1s cubic-bezier(.65,0,.35,1), opacity .8s ease;
}
.tst-card.tst-jump{transition:none}
/* glow of the centred card fades in/out instead of snapping */
.tst-card::after{
  content:""; position:absolute; inset:-1px; border-radius:inherit; pointer-events:none;
  box-shadow:0 0 0 1px rgba(255,255,255,.25), 0 0 46px rgba(245,101,29,.28);
  opacity:0; transition:opacity .8s ease;
}
.tst-card[data-active="true"]::after{opacity:1}

.tst-card-top{display:flex; justify-content:space-between; align-items:flex-start}
.tst-stars{display:flex; gap:2px}
.tst-qm{width:22px; height:20px; color:#4d86ff; opacity:.9}
.tst-quote{margin:14px 0 18px; font-size:14px; line-height:1.6; color:rgba(255,255,255,.92)}
.tst-person{display:flex; align-items:center; gap:10px}
.tst-person strong{display:block; font-size:13px; font-weight:600}
.tst-person small{display:block; font-size:11px; color:rgba(255,255,255,.65)}
.tst-avatar{
  width:40px; height:40px; border-radius:50%; flex:none; display:grid; place-items:center;
  font-size:12px; font-weight:700; color:#fff; border:2px solid rgba(255,255,255,.85);
}

/* ---------- responsive: same design, scaled ---------- */
@media (max-width:900px){
  .tst{padding:40px 0}
  .tst-inner{grid-template-columns:1fr; gap:28px; padding:0 18px}
  .tst-lead{max-width:none}
  .tst::before{width:100%}
  .tst-glow{right:-140px; top:62%}
}
@media (max-width:420px){
  .tst-badges{gap:12px; flex-wrap:nowrap}
  .tst-badge-icon{width:32px; height:32px}
  .tst-badge-text{font-size:10.5px}
  .tst-lead{font-size:14px}
}
@media (prefers-reduced-motion:reduce){
  .tst-card,.tst-card::after{transition:none}
}
`;