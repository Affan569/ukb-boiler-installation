"use client";

// Gallery.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  categories,
  galleryProjects,
  galleryStats,
  type GalleryProject,
} from "../Data/gallery";
import QuoteModal from "../components/QuoteModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Column spans (out of 12) that repeat down the grid, like the design: 1 big + 2, then 3, then 4 */
const SPAN_PATTERN = [6, 3, 3, 4, 4, 4, 3, 3, 3, 3];

function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) {
    return <div className={`ukbg-fallback ${className ?? ""}`} role="img" aria-label={alt} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const Icon = {
  arrow: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7" />
    </svg>
  ),
  customers: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11l8-7 8 7M6 10v10h12V10" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Project popup                                                       */
/* ------------------------------------------------------------------ */

function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  onQuote,
}: {
  project: GalleryProject;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onQuote: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photos = project.images?.length ? project.images : [project.image];
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => setPhotoIndex(0), [project.id]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="ukbg-backdrop" onMouseDown={onClose}>
      <div
        className="ukbg-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ukbg-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="ukbg-close" onClick={onClose} aria-label="Close project details">
          {Icon.close}
        </button>

        <div className="ukbg-modal-media">
          <Img src={photos[photoIndex]} alt={`${project.title} in ${project.location}`} className="ukbg-modal-img" />
          <span className="ukbg-tag">{project.tag}</span>
          {photos.length > 1 && (
            <div className="ukbg-thumbs">
              {photos.map((p, i) => (
                <button
                  key={p}
                  className={`ukbg-thumb ${i === photoIndex ? "is-active" : ""}`}
                  onClick={() => setPhotoIndex(i)}
                  aria-label={`Show photo ${i + 1} of ${photos.length}`}
                  aria-current={i === photoIndex}
                >
                  <Img src={p} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ukbg-modal-body">
          <p className="ukbg-meta">
            {Icon.pin}
            {project.propertyType} · {project.location}
          </p>
          <h2 id="ukbg-modal-title">{project.title}</h2>
          <p className="ukbg-lead">{project.description}</p>

          <dl className="ukbg-facts">
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Time taken</dt>
              <dd>{project.duration}</dd>
            </div>
            <div>
              <dt>Property</dt>
              <dd>{project.propertyType}</dd>
            </div>
            <div className="ukbg-facts-wide">
              <dt>Equipment</dt>
              <dd>{project.equipment}</dd>
            </div>
          </dl>

          <h3>What we did</h3>
          <ul className="ukbg-checks">
            {project.workDone.map((item) => (
              <li key={item}>
                <span>{Icon.check}</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="ukbg-result">
            <strong>Result</strong>
            <p>{project.result}</p>
          </div>

          <div className="ukbg-modal-actions">
            <button type="button" className="ukbg-btn" onClick={onQuote}>
              Get a free quote
            </button>
            <div className="ukbg-pager">
              <button onClick={onPrev} aria-label="Previous project">
                {Icon.left}
              </button>
              <button onClick={onNext} aria-label="Next project">
                {Icon.right}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function GalleryClient() {
  const [active, setActive] = useState<(typeof categories)[number]>("All Projects");
  const [openId, setOpenId] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [quote, setQuote] = useState(false);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: filtersRef, isVisible: filtersVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const visible = useMemo(
    () => (active === "All Projects" ? galleryProjects : galleryProjects.filter((p) => p.category === active)),
    [active]
  );
  const featured = useMemo(() => galleryProjects.filter((p) => p.featured), []);

  const openIndex = visible.findIndex((p) => p.id === openId);
  const openProject = openIndex >= 0 ? visible[openIndex] : null;

  const close = useCallback(() => setOpenId(null), []);
  const prev = useCallback(() => {
    if (openIndex > 0) setOpenId(visible[openIndex - 1].id);
  }, [openIndex, visible]);
  const next = useCallback(() => {
    if (openIndex < visible.length - 1) setOpenId(visible[openIndex + 1].id);
  }, [openIndex, visible]);

  const shownFeatured = featured.length
    ? [0, 1, 2, 3].map((o) => featured[(featuredIndex + o) % featured.length])
    : [];

  return (
    <main className="ukbg">
      <style>{css}</style>

      {/* HERO */}
      <section className="ukbg-hero">
        <Img src="./images/hhero.jpg" alt="A freshly installed boiler" className="ukbg-hero-bg" />
        <div className="ukbg-hero-overlay" aria-hidden="true" />

        <div className="ukbg-hero-inner">
          <p className="ukbg-eyebrow">Our gallery</p>
          <h1>
            Our Work,
            <br />
            <span>Your Warmth</span>
          </h1>
          <p className="ukbg-hero-copy">
            Explore our gallery to see the quality, professionalism and care we bring to every boiler installation,
            service and repair.
          </p>

          <div className="ukbg-hero-actions">
            <button type="button" className="ukbg-btn" onClick={() => setQuote(true)}>
              Get a free quote
            </button>
           
          </div>

          <ul className="ukbg-stats">
            {galleryStats.map((s) => (
              <li key={s.label}>
                <span className="ukbg-stat-icon">{Icon[s.icon]}</span>
                <span>
                  <strong>{s.label}</strong>
                  <small>{s.sub}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FILTERS */}
      <nav id="ukbg-projects" className="ukbg-filters" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            className={`ukbg-pill ${active === c ? "is-active" : ""}`}
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </nav>

      {/* GRID */}
      <section className="ukbg-grid" aria-live="polite">
        {visible.map((p, i) => {
          const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
          const overlay = span === 6;
          return (
            <button
              key={p.id}
              className={`ukbg-card ${overlay ? "is-overlay" : ""}`}
              style={{ "--span": span } as React.CSSProperties}
              onClick={() => setOpenId(p.id)}
              aria-haspopup="dialog"
            >
              <div className="ukbg-card-media">
                <Img src={p.image} alt={`${p.title} in ${p.location}`} />
                <span className="ukbg-tag">{p.tag}</span>
              </div>
              <div className="ukbg-card-body">
                <div>
                  <h3>{p.title}</h3>
                  <p>
                    {p.propertyType} · {p.location}
                  </p>
                </div>
                <span className="ukbg-go">{Icon.arrow}</span>
              </div>
            </button>
          );
        })}
        {!visible.length && <p className="ukbg-empty">No projects in this category yet. Check back soon.</p>}
      </section>

      {/* CTA BAND */}
      {shownFeatured.length > 0 && (
        <section className="ukbg-cta">
          <div className="ukbg-cta-text">
            <p className="ukbg-eyebrow">Real projects, real results</p>
            <h2>See the difference our work makes</h2>
            <p>
              From modern homes to commercial properties, our gallery shows the quality, reliability and attention to
              detail we bring to every project.
            </p>
            <button type="button" className="ukbg-btn" onClick={() => setQuote(true)}>
              Get a free quote
            </button>
          </div>
          <div className="ukbg-cta-strip">
            <button
              className="ukbg-round"
              onClick={() => setFeaturedIndex((featuredIndex - 1 + featured.length) % featured.length)}
              aria-label="Previous featured projects"
            >
              {Icon.left}
            </button>
            <div className="ukbg-strip">
              {shownFeatured.map((p, i) => (
                <button
                  key={`${p.id}-${i}`}
                  className={`ukbg-strip-item ${i === 0 ? "is-main" : ""}`}
                  onClick={() => {
                    setActive("All Projects");
                    setOpenId(p.id);
                  }}
                  aria-label={`Open ${p.title}`}
                >
                  <Img src={p.image} alt={p.title} />
                </button>
              ))}
            </div>
            <button
              className="ukbg-round"
              onClick={() => setFeaturedIndex((featuredIndex + 1) % featured.length)}
              aria-label="Next featured projects"
            >
              {Icon.right}
            </button>
          </div>
        </section>
      )}

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={close}
          onPrev={prev}
          onNext={next}
          onQuote={() => {
            close();
            setQuote(true);
          }}
        />
      )}

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Styles (scoped with the ukbg- prefix, no extra libraries needed)    */
/* ------------------------------------------------------------------ */

const css = `
.ukbg{
  --navy:#0b2a5b; --blue:#1769ff; --blue-soft:#eaf2ff; --ink:#1d2b44; --muted:#5d6b84;
  --line:#dde6f3; --bg:#f5f8fd; --card:#fff;
  font-family:"Plus Jakarta Sans","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--ink); background:var(--bg); padding:0 0 64px; min-height:100vh;
}
.ukbg *{box-sizing:border-box}
.ukbg button{font:inherit;color:inherit;cursor:pointer}
.ukbg :focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.ukbg img{display:block;width:100%;height:100%;object-fit:cover}
.ukbg-fallback{width:100%;height:100%;background:linear-gradient(135deg,#dbe8ff,#f3f7ff 55%,#cfe0fb)}

/* hero */
.ukbg-hero{position:relative;isolation:isolate;display:flex;align-items:center;min-height:clamp(460px,70vh,640px);overflow:hidden;background:var(--navy);color:#fff}
.ukbg-hero-bg{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;object-position:center}
.ukbg-hero-overlay{position:absolute;inset:0;z-index:-1;background:rgba(0,0,0,.45)}
.ukbg-hero-inner{width:100%;max-width:1280px;margin:0 auto;padding:80px clamp(16px,4vw,48px)}
.ukbg-eyebrow{display:inline-flex;align-items:center;gap:10px;margin:0 0 14px;font-size:.78rem;font-weight:600;color:var(--muted)}
.ukbg-eyebrow::before{content:"";width:22px;height:2px;background:#ff8a1f;border-radius:2px}
.ukbg-hero .ukbg-eyebrow{color:rgba(255,255,255,.85);text-transform:uppercase;letter-spacing:.14em;font-size:.75rem}
.ukbg-hero h1{margin:0 0 18px;font-size:clamp(2.4rem,5.5vw,4.8rem);line-height:1.04;font-weight:900;color:#fff;letter-spacing:-.025em}
.ukbg-hero h1 span{color:#FF7A1A}
.ukbg-hero-copy{max-width:50ch;margin:0 0 28px;color:rgba(255,255,255,.82);font-size:1.02rem;line-height:1.7}
.ukbg-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:40px}
.ukbg-hero .ukbg-btn{padding:14px 28px}
.ukbg-hero .ukbg-btn-ghost{background:transparent;border:1.5px solid rgba(255,255,255,.7);box-shadow:none}
.ukbg-hero .ukbg-btn-ghost:hover{background:rgba(255,255,255,.14);transform:translateY(-1px)}
.ukbg-stats{display:flex;flex-wrap:wrap;gap:14px;margin:0;padding:0;list-style:none}
.ukbg-stats li{display:flex;align-items:center;gap:12px;padding:10px 18px 10px 10px;border-radius:16px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(8px)}
.ukbg-stat-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#fff;color:var(--blue)}
.ukbg-stats strong{display:block;font-size:.9rem;color:#fff}
.ukbg-stats small{display:block;font-size:.75rem;color:rgba(255,255,255,.75)}

/* filters */
.ukbg-filters{display:flex;flex-wrap:wrap;gap:10px;padding:26px clamp(16px,4vw,48px) 18px;max-width:1280px;margin:0 auto;scroll-margin-top:16px}
.ukbg-pill{padding:11px 20px;border-radius:999px;border:1px solid var(--line);background:#fff;font-weight:600;font-size:.88rem;color:var(--ink);transition:background .2s,color .2s,box-shadow .2s}
.ukbg-pill:hover{background:var(--blue-soft)}
.ukbg-pill.is-active{background:var(--blue);border-color:var(--blue);color:#fff;box-shadow:0 8px 20px rgba(23,105,255,.28)}

/* grid */
.ukbg-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;padding:0 clamp(16px,4vw,48px);max-width:1280px;margin:0 auto}
.ukbg-card{grid-column:span var(--span);display:flex;flex-direction:column;padding:0;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 6px 20px rgba(20,50,100,.07);transition:transform .25s,box-shadow .25s}
.ukbg-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(20,50,100,.14)}
.ukbg-card-media{position:relative;aspect-ratio:16/10;overflow:hidden;flex:1}
.ukbg-card-media img{transition:transform .5s}
.ukbg-card:hover .ukbg-card-media img{transform:scale(1.05)}
.ukbg-card-body{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px}
.ukbg-card h3{margin:0 0 2px;font-size:.88rem;font-weight:700;color:var(--navy)}
.ukbg-card p{margin:0;font-size:.74rem;color:var(--muted)}
.ukbg-go{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:50%;background:var(--blue-soft);color:var(--blue)}
.ukbg-card.is-overlay{position:relative;min-height:300px}
.ukbg-card.is-overlay .ukbg-card-media{position:absolute;inset:0;aspect-ratio:auto}
.ukbg-card.is-overlay .ukbg-card-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,20,45,0) 40%,rgba(8,20,45,.82))}
.ukbg-card.is-overlay .ukbg-card-body{position:relative;margin-top:auto;z-index:1;padding:20px}
.ukbg-card.is-overlay h3{color:#fff;font-size:1.15rem}
.ukbg-card.is-overlay p{color:rgba(255,255,255,.85)}
.ukbg-card.is-overlay .ukbg-go{background:var(--blue);color:#fff}
.ukbg-tag{position:absolute;top:10px;left:10px;z-index:1;padding:5px 10px;border-radius:8px;background:rgba(255,255,255,.92);font-size:.68rem;font-weight:600;color:var(--navy);backdrop-filter:blur(4px)}
.ukbg-empty{grid-column:1/-1;padding:40px;text-align:center;color:var(--muted)}

/* cta */
.ukbg-cta{display:grid;grid-template-columns:minmax(260px,.9fr) 1.4fr;gap:28px;align-items:center;margin:34px auto 0;max-width:calc(1280px - 2 * clamp(16px,4vw,48px));padding:28px;background:linear-gradient(100deg,#eaf2ff,#f6f9ff);border:1px solid var(--line);border-radius:20px;width:calc(100% - 2 * clamp(16px,4vw,48px))}
.ukbg-cta h2{margin:0 0 10px;font-size:clamp(1.4rem,2.6vw,2rem);line-height:1.15;color:var(--navy);font-weight:800}
.ukbg-cta p{color:var(--muted);line-height:1.6;font-size:.9rem}
.ukbg-cta .ukbg-eyebrow{font-size:.7rem}
.ukbg-cta-strip{display:flex;align-items:center;gap:10px}
.ukbg-strip{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:10px;flex:1;height:150px}
.ukbg-strip-item{padding:0;border:0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 6px 16px rgba(20,50,100,.12)}
.ukbg-round{display:grid;place-items:center;flex:none;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--blue)}
.ukbg-round:hover{background:var(--blue);color:#fff}
.ukbg-btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 22px;border-radius:999px;background:var(--blue);color:#fff;font-weight:700;font-size:.88rem;text-decoration:none;border:0;box-shadow:0 8px 20px rgba(23,105,255,.3);transition:transform .2s,background .2s}
.ukbg-btn:hover{background:#0e56d9;transform:translateY(-1px)}
.ukbg button.ukbg-btn{color:#fff}

/* modal */
.ukbg-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:16px;background:rgba(8,20,45,.6);backdrop-filter:blur(4px);animation:ukbg-fade .2s ease-out}
.ukbg-modal{position:relative;display:grid;grid-template-columns:1.1fr 1fr;width:min(1000px,100%);max-height:min(640px,calc(100vh - 32px));background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35);animation:ukbg-pop .25s cubic-bezier(.2,.9,.3,1.1)}
.ukbg-close{position:absolute;top:12px;right:12px;z-index:3;display:grid;place-items:center;width:38px;height:38px;border-radius:50%;border:0;background:#fff;color:var(--navy);box-shadow:0 4px 14px rgba(0,0,0,.2)}
.ukbg-modal-media{position:relative;min-height:320px;background:#dbe8ff}
.ukbg-thumbs{position:absolute;left:14px;bottom:14px;display:flex;gap:8px}
.ukbg-thumb{width:56px;height:42px;padding:0;border-radius:8px;overflow:hidden;border:2px solid #fff;opacity:.8}
.ukbg-thumb.is-active{opacity:1;border-color:var(--blue)}
.ukbg-modal-body{padding:30px 28px 24px;overflow-y:auto}
.ukbg-meta{display:flex;align-items:center;gap:6px;margin:0 0 8px;font-size:.8rem;font-weight:600;color:var(--blue)}
.ukbg-modal h2{margin:0 0 10px;font-size:1.6rem;line-height:1.15;color:var(--navy);font-weight:800;padding-right:36px}
.ukbg-lead{margin:0 0 18px;color:var(--muted);line-height:1.65;font-size:.93rem}
.ukbg-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0 0 20px}
.ukbg-facts div{padding:10px 12px;border-radius:12px;background:var(--bg);border:1px solid var(--line)}
.ukbg-facts-wide{grid-column:1/-1}
.ukbg-facts dt{font-size:.7rem;color:var(--muted);margin-bottom:2px}
.ukbg-facts dd{margin:0;font-size:.86rem;font-weight:700;color:var(--navy)}
.ukbg-modal h3{margin:0 0 10px;font-size:.95rem;color:var(--navy)}
.ukbg-checks{display:grid;gap:8px;margin:0 0 18px;padding:0;list-style:none}
.ukbg-checks li{display:flex;gap:10px;align-items:flex-start;font-size:.88rem;line-height:1.45}
.ukbg-checks li span{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;background:var(--blue-soft);color:var(--blue)}
.ukbg-result{padding:14px 16px;border-radius:14px;background:var(--blue-soft);border-left:4px solid var(--blue);margin-bottom:20px}
.ukbg-result strong{color:var(--navy);font-size:.85rem}
.ukbg-result p{margin:4px 0 0;font-size:.88rem;line-height:1.5;color:var(--ink)}
.ukbg-modal-actions{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ukbg-pager{display:flex;gap:8px}
.ukbg-pager button{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--blue)}
.ukbg-pager button:hover{background:var(--blue);color:#fff}

@keyframes ukbg-fade{from{opacity:0}to{opacity:1}}
@keyframes ukbg-pop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}

/* responsive */
@media (max-width:1000px){
  .ukbg-card{grid-column:span 6}
  .ukbg-card.is-overlay{grid-column:span 12}
  .ukbg-cta{grid-template-columns:1fr}
}
@media (max-width:760px){
  .ukbg-hero{min-height:520px;align-items:flex-end}
  .ukbg-hero-overlay{background:rgba(0,0,0,.45)}
  .ukbg-hero-inner{padding:56px 16px 36px}
  .ukbg-hero-actions .ukbg-btn{flex:1}
  .ukbg-stats li{flex:1 1 100%}
  .ukbg-filters{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}
  .ukbg-pill{white-space:nowrap}
  .ukbg-modal{grid-template-columns:1fr;overflow-y:auto}
  .ukbg-modal-media{min-height:220px;aspect-ratio:16/10}
  .ukbg-modal-body{overflow:visible}
  .ukbg-strip{grid-template-columns:2fr 1fr;height:120px}
  .ukbg-strip-item:nth-child(n+3){display:none}
}
@media (max-width:520px){
  .ukbg-card{grid-column:span 12}
}
@media (prefers-reduced-motion:reduce){
  .ukbg *,.ukbg-backdrop,.ukbg-modal{animation:none!important;transition:none!important}
}
`;