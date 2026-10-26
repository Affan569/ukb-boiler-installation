"use client";
import { useEffect, useRef, useState } from "react";
import QuoteModal from "./QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* Apni image ka path yahan set karo (public/images ke andar) */
const ABOUT_IMAGE = "/images/9.jpg";

const PILLARS = [
  {
    title: "Safe",
    text: "Every install is tested and checked before we leave your home.",
    icon: <path d="M12 3 4.5 6v5.5c0 4.4 3 8.2 7.5 9.5 4.5-1.3 7.5-5.1 7.5-9.5V6L12 3Zm-3 9 2 2 4-4" />,
  },
  {
    title: "Efficient",
    text: "Modern boilers that cut waste and keep your bills down.",
    icon: <path d="M5 19c0-8 5-13 15-14 0 10-5 15-13 15M5 19c2-4 5-7 9-9" />,
  },
  {
    title: "Reliable",
    text: "Honest advice, clear pricing and aftercare you can count on.",
    icon: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  },
];

/* Counts up once, when the stats scroll into view */
function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return (
    <>
      {n.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

export default function AboutUs() {
  const [quote, setQuote] = useState(false);
  const [seen, setSeen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[#f5f8ff] py-12 lg:py-16" >
      {/* soft background shapes */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#0b7cf0]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#ff7a1a]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* ============ IMAGE SIDE ============ */}
          <div className={`scroll-animate-left relative mx-auto w-full max-w-[460px] lg:mx-0 ${sectionVisible ? 'is-visible' : ''}`}>
            {/* offset navy block + dotted pattern behind the photo */}
            <div className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl bg-[#0a2a6b]" aria-hidden />
            <div
              className="absolute -right-4 -top-4 h-20 w-20 opacity-60"
              style={{
                backgroundImage: "radial-gradient(#0b7cf0 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
              aria-hidden
            />

            <div className="relative aspect-[4/3.8] overflow-hidden rounded-2xl bg-gradient-to-br from-[#dbe6ff] to-[#ffe9d6] shadow-[0_20px_40px_rgba(10,42,107,0.2)]">
              {!imgFailed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ABOUT_IMAGE}
                  alt="Our installation van outside a finished home"
                  className="h-full w-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a6b]/50 via-transparent to-transparent" />
            </div>

            {/* experience badge */}
            <div className="absolute -left-2 top-6 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-[0_10px_25px_rgba(10,42,107,0.18)] sm:-left-6">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ff7a1a] text-sm font-extrabold text-white">
                10+
              </span>
              <span className="text-xs font-bold leading-tight text-[#0a2a6b]">
                Years of
                <br />
                heating expertise
              </span>
            </div>

            {/* comfort promise card */}
            <figure className="absolute -bottom-6 right-2 w-[72%] max-w-[240px] rounded-xl bg-white p-3.5 shadow-[0_12px_30px_rgba(10,42,107,0.2)] sm:-right-4 sm:w-[60%]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0b7cf0" aria-hidden>
                <path d="M7 7h4v4c0 3-1.5 5-4 6l-.8-1.6C7.6 14.7 8 13.6 8 12H7V7Zm7 0h4v4c0 3-1.5 5-4 6l-.8-1.6c1.4-.7 1.8-1.8 1.8-3.4h-1V7Z" />
              </svg>
              <blockquote className="mt-1 text-xs font-bold leading-snug text-[#0a2a6b]">
                Your comfort is our priority.
              </blockquote>
              <figcaption className="mt-1 text-[11px] text-slate-500">Our team</figcaption>
            </figure>
          </div>

          {/* ============ CONTENT SIDE ============ */}
          <div className="pt-6 lg:pt-0">
            {/* Eyebrow badge: exact 13px font size */}
            <div className={`scroll-animate inline-flex items-center gap-2 text-[13px] font-bold text-[#ff7a1a] ${sectionVisible ? 'is-visible' : ''}`}>
              <span className="h-[2px] w-7 rounded-full bg-[#ff7a1a]" />
              About us
            </div>

            {/* Heading: strictly capped at 40px max on desktop */}
            <h2 className={`scroll-animate-delay-1 mt-2 text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0a2a6b] sm:text-[34px] lg:text-[40px] ${sectionVisible ? 'is-visible' : ''}`}>
              Local roots,
              <br />
              <span className="relative inline-block">
                trusted heating.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 8c60-7 140-8 296-2" stroke="#ff7a1a" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className={`scroll-animate-delay-2 mt-4 max-w-[480px] text-xs sm:text-sm leading-[1.65] text-slate-600 ${sectionVisible ? 'is-visible' : ''}`}>
              Professional Boiler Installation was built on a simple belief: every home deserves safe,
              efficient and reliable heating. What started as a small local team has grown into a trusted
              name, helping hundreds of homeowners across the region with top-quality boiler services.
            </p>

            {/* pillars */}
            <ul className="mt-5 grid gap-2.5">
              {PILLARS.map((p, i) => (
                <li
                  key={p.title}
                  className={`scroll-animate scroll-animate-delay-${i + 3} group flex items-start gap-3 rounded-xl border border-[#e3ebfb] bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#0b7cf0]/40 hover:shadow-[0_8px_20px_rgba(10,42,107,0.08)] ${sectionVisible ? 'is-visible' : ''}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#eaf2ff] text-[#0b7cf0] transition group-hover:bg-[#0b7cf0] group-hover:text-white">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {p.icon}
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0a2a6b]">{p.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={`scroll-animate-delay-5 mt-6 flex flex-wrap items-center gap-3 ${sectionVisible ? 'is-visible' : ''}`}>
              <button
                type="button"
                onClick={() => setQuote(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0a2a6b] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#0b7cf0]"
              >
                Get a Free Quote
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <a
                href="/contactus"
                className="text-xs font-bold text-[#0a2a6b] underline decoration-[#0b7cf0] decoration-2 underline-offset-6 transition hover:text-[#0b7cf0]"
              >
                Talk to our team
              </a>
            </div>
          </div>
        </div>

        
      </div>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </section>
  );
}