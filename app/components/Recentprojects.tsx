"use client";

import React, { useEffect, useRef, useState } from "react";
import { FILTERS, PROJECTS, type Filter, type Project } from "../Data/Projects";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ---------- Icons ---------- */
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7a99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FlameIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0a6cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c3 4 6 6.5 6 11a6 6 0 0 1-12 0c0-2 1-3.5 2-4.5.3 1.5 1 2.5 2 3 0-3 0-6 2-9.5z" />
  </svg>
);

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/* ---------- Before / After slider ---------- */
const CompareSlider: React.FC<{ before: string; after: string; onTap?: () => void }> = ({
  before,
  after,
  onTap,
}) => {
  const [pos, setPos] = useState(48);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const moved = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(95, Math.max(5, pct)));
  };

  return (
    <div
      ref={ref}
      className="rp-compare"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => {
        dragging.current = true;
        moved.current = false;
        startX.current = e.clientX;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        if (!onTap) update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        if (Math.abs(e.clientX - startX.current) > 5) moved.current = true;
        if (moved.current || !onTap) update(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
        // a simple tap (no drag) on a card image opens the popup
        if (onTap && !moved.current) onTap();
      }}
    >
      <img className="rp-img" src={after} alt="After" draggable={false} />
      <div className="rp-before-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img className="rp-img" src={before} alt="Before" draggable={false} />
      </div>

      <span className="rp-tag rp-tag-before">Before</span>
      <span className="rp-tag rp-tag-after">After</span>

      <div className="rp-divider" style={{ left: `${pos}%` }}>
        <div className="rp-handle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a6cff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ---------- Details popup ---------- */
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a6cff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const { details: d } = project;

  // Close on Escape and lock page scroll while the popup is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const facts: [string, string][] = [
    ["Boiler", d.boilerModel],
    ["Property", d.propertyType],
    ["Completed", d.completedOn],
    ["Duration", d.duration],
    ["Warranty", d.warranty],
    ["Category", project.category],
  ];

  return (
    <div className="rp-overlay" onClick={onClose} role="presentation">
      <div
        className="rp-modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="rp-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <CompareSlider before={project.before} after={project.after} />

        <div className="rp-modal-body">
          <div className="rp-meta">
            <span className="rp-loc">
              <PinIcon />
              {project.location}
            </span>
            <span className="rp-brand">
              <FlameIcon />
              {project.brand}
            </span>
          </div>

          <h3 className="rp-modal-title">{project.title}</h3>
          <p className="rp-modal-desc">{project.description}</p>
          <p className="rp-modal-overview">{d.overview}</p>

          <div className="rp-facts">
            {facts.map(([label, value]) => (
              <div className="rp-fact" key={label}>
                <span className="rp-fact-label">{label}</span>
                <span className="rp-fact-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="rp-cols">
            <div>
              <h4 className="rp-h4">Work carried out</h4>
              <ul className="rp-list">
                {d.workDone.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="rp-h4">Results</h4>
              <ul className="rp-list">
                {d.results.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Main section ---------- */
const RecentProjects: React.FC = () => {
  const [active, setActive] = useState<Filter>("All Projects");
  const [selected, setSelected] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const visible = PROJECTS.filter((p) => active === "All Projects" || p.category === active);

  const scrollBy = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * 520, behavior: "smooth" });

  return (
    <section ref={sectionRef} className="rp-section">
      <style>{CSS}</style>

      <div className="rp-container">
        <div className={`scroll-animate rp-eyebrow ${sectionVisible ? 'is-visible' : ''}`}>
          <span className="rp-eyebrow-line" />
          <span>BEFORE / AFTER</span>
        </div>

        <div className="rp-top">
          <div>
            <h2 className={`scroll-animate-delay-1 rp-title ${sectionVisible ? 'is-visible' : ''}`}>
              Recent Projects.
              <br />
              <span className="rp-title-accent">Real Results.</span>
            </h2>
            <p className={`scroll-animate-delay-2 rp-sub ${sectionVisible ? 'is-visible' : ''}`}>
              Take a look at some of our recent boiler installations
              <br />
              and see the difference a new, efficient system can make.
            </p>
          </div>

          <div className="rp-controls">
            <div className="rp-script">
              <span>Same home.</span>
              <span>Better heating.</span>
              <svg className="rp-scribble" viewBox="0 0 140 24" fill="none">
                <path d="M2 20 C 40 6, 90 4, 138 2" stroke="#ff5a1f" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <button className="rp-arrow rp-arrow-light" onClick={() => scrollBy(-1)} aria-label="Previous">
              <Chevron dir="left" />
            </button>
            <button className="rp-arrow rp-arrow-primary" onClick={() => scrollBy(1)} aria-label="Next">
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        <div className={`scroll-animate-delay-3 rp-filters ${sectionVisible ? 'is-visible' : ''}`}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`rp-pill ${active === f ? "rp-pill-active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rp-track" ref={trackRef}>
        {visible.map((p, i) => (
          <article className={`scroll-animate scroll-animate-delay-${i + 4} rp-card ${sectionVisible ? 'is-visible' : ''}`} key={p.id} onClick={() => setSelected(p)}>
            <CompareSlider before={p.before} after={p.after} onTap={() => setSelected(p)} />
            <div className="rp-card-body">
              <div className="rp-meta">
                <span className="rp-loc">
                  <PinIcon />
                  {p.location}
                </span>
                <span className="rp-brand">
                  <FlameIcon />
                  {p.brand}
                </span>
              </div>
              <h3 className="rp-card-title">{p.title}</h3>
              <p className="rp-card-desc">{p.description}</p>
              <button className="rp-more" onClick={() => setSelected(p)}>
                Read more
                <Chevron dir="right" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default RecentProjects;

/* ---------- Styles ---------- */
const CSS = `
.rp-section {
  --navy: #0b1f4d;
  --blue: #0a6cff;
  --orange: #ff5a1f;
  --muted: #5b6b8c;
  /* Match these two to your other sections */
  --max: 1280px;
  --gutter: 24px;
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  background: #fff;
  padding: 48px 0 56px;
  overflow: hidden;
}
.rp-container { max-width: var(--max); margin: 0 auto; padding: 0 var(--gutter); box-sizing: border-box; }
.rp-eyebrow {
  display: flex; align-items: center; gap: 28px;
  color: var(--navy); letter-spacing: 0.2em; font-size: 17px; font-weight: 500;
}
.rp-eyebrow-line { width: 40px; height: 2px; background: var(--orange); display: inline-block; }
.rp-top { display: flex; justify-content: space-between; align-items: flex-start; }
.rp-title {
  margin: 14px 0 0; font-size: 40px; line-height: 1.02; font-weight: 800;
  color: var(--navy); letter-spacing: -0.02em;
}
.rp-title-accent { color: var(--blue); }
.rp-sub { margin: 22px 0 0; font-size: 16px; line-height: 1.65; color: var(--muted); }

.rp-controls { display: flex; align-items: center; gap: 30px; padding-top: 70px; }
.rp-script {
  position: relative; display: flex; flex-direction: column; margin-right: 70px;
  font-family: "Caveat", "Segoe Script", "Brush Script MT", cursive;
  font-size: 30px; line-height: 1.1; color: var(--navy); transform: rotate(-6deg);
}
.rp-script span:nth-child(2) { margin-left: 8px; }
.rp-scribble { width: 140px; height: 24px; margin-top: -2px; margin-left: 20px; }

.rp-arrow {
  width: 54px; height: 54px; border-radius: 50%; border: none; cursor: pointer;
  display: grid; place-items: center; transition: transform .15s ease;
}
.rp-arrow:hover { transform: scale(1.06); }
.rp-arrow-light { background: #fff; color: var(--blue); box-shadow: 0 6px 20px rgba(11,31,77,.12); }
.rp-arrow-primary { background: var(--blue); color: #fff; box-shadow: 0 8px 22px rgba(10,108,255,.35); }

.rp-filters { display: flex; gap: 14px; margin-top: 34px; }
.rp-pill {
  border: none; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 600;
  padding: 13px 20px; border-radius: 999px; background: #f1f4f9; color: #3b4a6b;
  transition: all .15s ease;
}
.rp-pill:hover { background: #e6ecf6; }
.rp-pill-active { background: var(--blue); color: #fff; box-shadow: 0 8px 18px rgba(10,108,255,.28); }
.rp-pill-active:hover { background: var(--blue); }

.rp-track {
  display: flex; gap: 32px; margin-top: 28px; padding-top: 6px; padding-bottom: 30px;
  /* first card lines up with the centered container's left edge */
  --edge: max(var(--gutter), calc((100% - var(--max)) / 2 + var(--gutter)));
  padding-left: var(--edge); padding-right: var(--edge);
  scroll-padding-left: var(--edge);
  overflow-x: auto; scroll-snap-type: x proximity; scrollbar-width: none;
}
.rp-track::-webkit-scrollbar { display: none; }

.rp-card {
  flex: 0 0 auto; width: 470px; background: #fff; border-radius: 18px;
  box-shadow: 0 10px 34px rgba(11,31,77,.09); overflow: hidden; scroll-snap-align: start;
  cursor: pointer; transition: transform .2s ease, box-shadow .2s ease;
}
.rp-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(11,31,77,.14); }
.rp-card:nth-child(2) { width: 460px; }
.rp-card:nth-child(3) { width: 468px; }

.rp-compare {
  position: relative; height: 266px; overflow: hidden; cursor: ew-resize;
  touch-action: pan-y; user-select: none; background: #dfe5ee;
}
.rp-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.rp-before-wrap { position: absolute; inset: 0; }
.rp-tag {
  position: absolute; top: 12px; padding: 8px 18px; border-radius: 999px;
  font-size: 14px; font-weight: 600; color: #fff; z-index: 2;
}
.rp-tag-before { left: 14px; background: rgba(40,40,40,.72); backdrop-filter: blur(4px); }
.rp-tag-after { right: 14px; background: var(--blue); }
.rp-divider { position: absolute; top: 0; bottom: 0; width: 3px; background: #fff; transform: translateX(-50%); z-index: 3; }
.rp-handle {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 44px; height: 44px; border-radius: 50%; background: #fff;
  display: grid; place-items: center; box-shadow: 0 4px 14px rgba(0,0,0,.25);
}

.rp-card-body { padding: 18px 18px 26px; }
.rp-meta { display: flex; justify-content: space-between; align-items: center; }
.rp-loc { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--muted); }
.rp-brand {
  display: inline-flex; align-items: center; gap: 8px; background: #e8f1ff; color: var(--blue);
  font-size: 13.5px; font-weight: 600; padding: 9px 18px; border-radius: 999px;
}
.rp-card-title { margin: 10px 0 8px; font-size: 18px; font-weight: 700; color: var(--navy); }
.rp-card-desc { margin: 0; font-size: 14px; color: var(--muted); }
.rp-more {
  display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; padding: 0;
  border: none; background: none; cursor: pointer; font-family: inherit;
  font-size: 14px; font-weight: 600; color: var(--blue);
}
.rp-more svg { width: 16px; height: 16px; transition: transform .15s ease; }
.rp-more:hover svg { transform: translateX(3px); }

/* Popup */
.rp-overlay {
  position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center;
  padding: 24px; background: rgba(11,31,77,.55); backdrop-filter: blur(4px);
  animation: rp-fade .18s ease;
}
.rp-modal {
  position: relative; width: 100%; max-width: 760px; max-height: 92vh; overflow-y: auto;
  background: #fff; border-radius: 22px; box-shadow: 0 30px 80px rgba(11,31,77,.35);
  animation: rp-pop .22s ease;
}
.rp-modal .rp-compare { height: 340px; }
.rp-close {
  position: absolute; top: 14px; right: 14px; z-index: 10; width: 42px; height: 42px;
  border: none; border-radius: 50%; background: #fff; color: var(--navy); cursor: pointer;
  display: grid; place-items: center; box-shadow: 0 4px 14px rgba(0,0,0,.2);
}
.rp-close:hover { background: #f1f4f9; }
.rp-modal .rp-tag-after { right: 70px; }
.rp-modal-body { padding: 24px 28px 30px; }
.rp-modal-title { margin: 14px 0 6px; font-size: 26px; font-weight: 800; color: var(--navy); }
.rp-modal-desc { margin: 0 0 12px; font-size: 16px; font-weight: 600; color: var(--blue); }
.rp-modal-overview { margin: 0; font-size: 15.5px; line-height: 1.7; color: var(--muted); }
.rp-facts {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 22px 0 26px;
}
.rp-fact { background: #f5f8fd; border-radius: 12px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
.rp-fact-label { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.rp-fact-value { font-size: 14.5px; font-weight: 700; color: var(--navy); }
.rp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.rp-h4 { margin: 0 0 12px; font-size: 16px; font-weight: 700; color: var(--navy); }
.rp-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.rp-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; line-height: 1.45; color: #3b4a6b; }
.rp-list li svg { flex: 0 0 auto; margin-top: 2px; }
@keyframes rp-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes rp-pop { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }

@media (max-width: 900px) {
  .rp-title { font-size: 40px; }
  .rp-sub { font-size: 16px; }
  .rp-sub br { display: none; }
  .rp-top { flex-direction: column; }
  .rp-controls { padding-top: 20px; gap: 16px; }
  .rp-script { display: none; }
  .rp-filters { flex-wrap: wrap; }
  .rp-card, .rp-card:nth-child(2), .rp-card:nth-child(3) { width: 82vw; }
  .rp-modal .rp-compare { height: 240px; }
  .rp-modal-body { padding: 20px; }
  .rp-facts { grid-template-columns: 1fr 1fr; }
  .rp-cols { grid-template-columns: 1fr; gap: 20px; }
}
@media (max-width: 768px) {
  .rp-title { font-size: 30px; }
}
`;