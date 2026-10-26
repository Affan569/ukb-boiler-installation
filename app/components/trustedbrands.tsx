"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Brand {
  name: string;
  logo?: string;
}

const MAIN_BRANDS: Brand[] = [
   { name: "Baxi", logo: "/images/baxi.jpg" },
   { name: "Vaillant", logo: "/images/vallient.webp" },
  { name: "Ideal", logo: "/images/worcester.webp" },
  { name: "Glow-worm", logo: "/images/glowworm.webp" },
];

const GHOST_BRANDS: Brand[] = [
   { name: "Baxi", logo: "/images/baxi.jpg" },
   { name: "Vaillant", logo: "/images/vallient.webp" },
  { name: "Ideal", logo: "/images/worcester.webp" },
  { name: "Glow-worm", logo: "/images/glowworm.webp" },
];

const DOTS = 5;

/* ------------------------------------------------------------------ */
/* Continuous marquee hook with drag + inertia                         */
/* ------------------------------------------------------------------ */
function useMarquee(opts: {
  speed: number; // px per second (positive = content moves left)
  draggable: boolean;
  onProgress?: (p: number) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const s = useRef({ x: 0, vel: 0, dragging: false, lastX: 0, lastT: 0, lastDot: -1 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduce ? 0 : opts.speed;

    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - prev, 50) / 1000;
      prev = now;
      const st = s.current;
      const half = track.scrollWidth / 2;

      if (!st.dragging) {
        st.x += speed * dt + st.vel;
        st.vel *= 0.94;
        if (Math.abs(st.vel) < 0.01) st.vel = 0;
      }
      if (half > 0) {
        st.x = ((st.x % half) + half) % half;
        track.style.transform = `translate3d(${-st.x}px,0,0)`;
        if (opts.onProgress) {
          const dot = Math.min(DOTS - 1, Math.floor((st.x / half) * DOTS));
          if (dot !== st.lastDot) {
            st.lastDot = dot;
            opts.onProgress(dot);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.speed]);

  const handlers = opts.draggable
    ? {
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
          const st = s.current;
          st.dragging = true;
          st.lastX = e.clientX;
          st.vel = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
        },
        onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
          const st = s.current;
          if (!st.dragging) return;
          const dx = e.clientX - st.lastX;
          st.lastX = e.clientX;
          st.x -= dx;
          st.vel = -dx; // inertia on release
        },
        onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
          s.current.dragging = false;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        },
        onPointerCancel: () => {
          s.current.dragging = false;
        },
        onWheel: (e: React.WheelEvent<HTMLDivElement>) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            s.current.x += e.deltaX;
          }
        },
      }
    : {};

  return { viewportRef, trackRef, handlers };
}
const BrandCard: React.FC<{ brand: Brand; ghost?: boolean }> = ({ brand, ghost }) => (
  <div className={`tb__card${ghost ? " tb__card--ghost" : ""}`}>
    {brand.logo ? (
      <img src={brand.logo} alt={ghost ? "" : brand.name} draggable={false} />
    ) : (
      <span className="tb__wordmark">{brand.name}</span>
    )}
  </div>
);

const sv = {
  viewBox: "0 0 28 28",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features = [
  {
    label: ["Top Quality", "Brands"],
    icon: (
      <svg {...sv} stroke="#0A6CFF">
        <path d="M14 3l9 3.5v6.7c0 5.6-3.8 9.8-9 11.8-5.2-2-9-6.2-9-11.8V6.5z" />
        <path d="M9.8 13.8l3 3 5.4-5.6" />
      </svg>
    ),
  },
  {
    label: ["Manufacturer", "Approved"],
    icon: (
      <svg {...sv} stroke="#0A6CFF">
        <circle cx="14" cy="14" r="3.6" />
        <path d="M14 3.5l1.7 2.3 2.8-.6.9 2.7 2.7.9-.6 2.8L23 14l-2.3 1.7.6 2.8-2.7.9-.9 2.7-2.8-.6L14 24.5l-1.7-2.3-2.8.6-.9-2.7-2.7-.9.6-2.8L5 14l2.3-1.7-.6-2.8 2.7-.9.9-2.7 2.8.6z" />
      </svg>
    ),
  },
  {
    label: ["Suitable for", "All Homes"],
    icon: (
      <svg {...sv} stroke="#0A6CFF">
        <path d="M3.5 13.5L14 4.5l10.5 9" />
        <path d="M6 11.5V24h16V11.5" />
        <path d="M11.5 24v-6.5h5V24" />
      </svg>
    ),
  },
];
const fill = (list: Brand[], min = 8): Brand[] => {
  if (list.length === 0) return list;
  let out = list;
  while (out.length < min) out = [...out, ...list];
  return out;
};

interface TrustedBrandsProps {
  /** Logos in the main (front) row */
  brands?: Brand[];
  /** Logos in the faded (back) row */
  ghostBrands?: Brand[];
}

const TrustedBrands: React.FC<TrustedBrandsProps> = ({
  brands = MAIN_BRANDS,
  ghostBrands = GHOST_BRANDS,
}) => {
  const [dot, setDot] = useState(0);
  const mainList = fill(brands);
  const ghostList = fill(ghostBrands);
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const main = useMarquee({ speed: 55, draggable: true, onProgress: setDot });
  const ghost = useMarquee({ speed: -30, draggable: false });

  return (
    <section ref={sectionRef} className="tb" aria-labelledby="tb-title">
      <style>{css}</style>

      <div className="tb__inner">
        {/* LEFT */}
        <div className="tb__text">
          <div className={`scroll-animate tb__eyebrow ${sectionVisible ? 'is-visible' : ''}`}>
            <span>Boiler brands we fit</span>
          </div>
          <h2 id="tb-title" className={`scroll-animate-delay-1 ${sectionVisible ? 'is-visible' : ''}`}>
            Trusted Brands.
            <span className="tb__blue">Reliable Heating.</span>
          </h2>
          <p className={`scroll-animate-delay-2 tb__lead ${sectionVisible ? 'is-visible' : ''}`}>
            We install a wide range of leading boiler brands, so you get the best quality,
            performance and peace of mind — whatever your home needs.
          </p>

          <div className="tb__features">
            {features.map((f, i) => (
              <div className={`scroll-animate scroll-animate-delay-${i + 3} tb__feature ${sectionVisible ? 'is-visible' : ''}`} key={f.label.join(" ")}>
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
        <div className="tb__stage">
          <svg className="tb__arc" viewBox="0 0 200 200" aria-hidden="true">
            <path d="M30 70 A90 90 0 0 1 90 12" fill="none" stroke="#f5651d" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M150 188 A90 90 0 0 1 100 196" fill="none" stroke="#f5651d" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          {/* faded second row */}
          <div className="tb__ghostwrap" aria-hidden="true">
            <div className="tb__viewport">
              <div className="tb__track" ref={ghost.trackRef}>
                {[0, 1].map((k) => (
                  <React.Fragment key={k}>
                    {ghostList.map((b, i) => (
                      <BrandCard key={`${k}-${i}`} brand={b} ghost />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* main row */}
          <div className="tb__tray">
            <div
              className="tb__viewport tb__viewport--main"
              ref={main.viewportRef}
              {...main.handlers}
              role="group"
              aria-roledescription="carousel"
              aria-label="Boiler brands we fit"
            >
              <div className="tb__track" ref={main.trackRef}>
                {[0, 1].map((k) => (
                  <React.Fragment key={k}>
                    {mainList.map((b, i) => (
                      <BrandCard key={`${k}-${i}`} brand={b} />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="tb__dots" aria-hidden="true">
            {Array.from({ length: DOTS }).map((_, i) => (
              <span key={i} className={i === dot ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const css = `
.tb{--navy:#0f1b3d;--blue:#0A6CFF;--orange:#f5651d;--grey:#6b7280;
  font-family:var(--font-geist-sans),system-ui,sans-serif;color:var(--navy);background:#fff;
  position:relative;overflow:hidden;padding:64px 24px 30px}
@media (min-width:1024px){.tb{padding:30px 24px}}
.tb *{box-sizing:border-box;margin:0;padding:0}
.tb__inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(24px,4vw,64px);align-items:center}

/* left */
.tb__eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.tb__eyebrow::before{content:"";width:40px;height:2px;background:var(--orange)}
.tb__eyebrow span{font-size:14px;font-weight:500;letter-spacing:.18em;color:#4b5563;text-transform:uppercase}
.tb h2{font-size:40px;line-height:1.1;font-weight:700;letter-spacing:-.015em}
.tb h2 .tb__blue{display:block;color:var(--blue)}
@media (max-width:768px){.tb h2{font-size:30px}}
.tb__lead{margin-top:22px;max-width:440px;font-size:clamp(14px,1.1vw,16px);line-height:1.7;color:var(--grey)}
.tb__features{margin-top:34px;display:flex;flex-wrap:wrap;align-items:center;gap:18px 0}
.tb__feature{display:flex;align-items:center;gap:12px;padding:0 22px;font-size:12.5px;font-weight:500;line-height:1.3}
.tb__feature:first-child{padding-left:0}
.tb__feature + .tb__feature{border-left:1px solid #dfe3ea}
.tb__feature svg{width:28px;height:28px;flex:none}

/* stage */
.tb__stage{position:relative;width:100%;max-width:660px;margin-inline:auto;aspect-ratio:1/0.7;min-height:250px}
.tb__arc{position:absolute;left:0;top:-2%;width:46%;pointer-events:none}

/* 3D tray */
.tb__tray{position:absolute;left:4%;right:2%;top:14%;padding:clamp(8px,1.4vw,14px);border-radius:24px;
  background:linear-gradient(135deg,#2a86ff 0%,#0A6CFF 45%,#0652c9 100%);
  box-shadow:0 34px 60px -12px rgba(10,108,240,.45),0 10px 24px rgba(10,108,240,.25),inset 0 2px 0 rgba(255,255,255,.35);
  transform:perspective(1000px) rotateY(-14deg) rotateX(5deg) rotateZ(-4deg);
  transform-origin:60% 50%}
.tb__ghostwrap{position:absolute;left:10%;right:0;top:50%;opacity:.55;filter:blur(.4px);
  transform:perspective(1000px) rotateY(-14deg) rotateX(5deg) rotateZ(-4deg);transform-origin:60% 50%;
  -webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),rgba(0,0,0,.1));
  mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),rgba(0,0,0,.1));pointer-events:none}

.tb__viewport{overflow:hidden;border-radius:16px}
.tb__viewport--main{cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.tb__viewport--main:active{cursor:grabbing}
.tb__track{display:flex;width:max-content;will-change:transform}

.tb__card{flex:none;display:grid;place-items:center;width:clamp(60px,8.4vw,94px);aspect-ratio:1/0.82;margin-right:clamp(7px,1vw,11px);
  background:#fff;border-radius:11px;box-shadow:0 5px 12px rgba(8,40,110,.18);padding:6px}
.tb__card img{max-width:88%;max-height:70%;object-fit:contain;pointer-events:none}
.tb__wordmark{font-weight:700;font-size:clamp(9px,1.2vw,13px);letter-spacing:-.01em;color:var(--navy);text-align:center;line-height:1.1}
.tb__card--ghost{background:#f6f8fc;box-shadow:0 8px 18px rgba(20,50,110,.08)}
.tb__card--ghost .tb__wordmark{color:#aab3c5;font-weight:600}

.tb__dots{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;gap:8px}
.tb__dots span{width:6px;height:6px;border-radius:50%;background:#cfd7e6;transition:all .3s}
.tb__dots span.is-active{background:var(--blue);width:18px;border-radius:6px}

/* tablet */
@media (max-width:960px){
  .tb__inner{grid-template-columns:1fr}
  .tb__lead{max-width:620px}
  .tb__stage{max-width:620px}
}

/* mobile */
@media (max-width:640px){
  .tb__features{display:grid;grid-template-columns:repeat(3,1fr);gap:0;width:100%;margin-top:26px}
  .tb__feature{flex-direction:column;gap:8px;padding:0 6px;text-align:center;font-size:11.5px}
  .tb__feature:first-child{padding-left:6px}
  .tb__stage{aspect-ratio:1/0.78;min-height:230px}
  .tb__tray{left:2%;right:2%;top:14%;transform:perspective(800px) rotateY(-8deg) rotateX(4deg) rotateZ(-3deg)}
  .tb__ghostwrap{left:6%;top:50%;transform:perspective(800px) rotateY(-8deg) rotateX(4deg) rotateZ(-3deg)}
  .tb__card{width:clamp(56px,18vw,74px)}
  .tb__arc{width:52%}
}
@media (prefers-reduced-motion: reduce){
  .tb__dots span{transition:none}
}
`;