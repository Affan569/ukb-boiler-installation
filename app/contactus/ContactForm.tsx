"use client";

// ContactForm.tsx
import React, { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

/* ------------------------------------------------------------------ */
/* Business details (edit here)                                        */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "07988530358";
const PHONE_HREF = "tel:07988530358";
const EMAIL = "info@ukbboilerinstallation.co.uk";
const ADDRESS_LINES = ["Southampton, Hampshire", "SO1 1AA, United Kingdom"];
const MAP_QUERY = "Southampton, Hampshire, SO1 1AA, United Kingdom";
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;
const MAPS_VIEW = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const INTRO_VIDEO = "/videos/intro.mp4";

const SERVICES = [
  "New boiler installation",
  "Boiler replacement",
  "Boiler repair",
  "No heating or hot water",
  "Boiler service",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) return <div className={`uc-fallback ${className ?? ""}`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

const S = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Icon = {
  phone: (
    <svg {...S}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  ),
  mail: (
    <svg {...S}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  ),
  pin: (
    <svg {...S}>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  support: (
    <svg {...S}>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19a4 4 0 01-4 3h-2" />
    </svg>
  ),
  arrow: (
    <svg {...S} width={16} height={16} strokeWidth={2.3}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  clock: (
    <svg {...S} width={18} height={18}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  expert: (
    <svg {...S} width={18} height={18}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  ),
  tag: (
    <svg {...S} width={18} height={18}>
      <path d="M3 12V4h8l10 10-8 8z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </svg>
  ),
  send: (
    <svg {...S} width={18} height={18}>
      <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />
    </svg>
  ),
  shield: (
    <svg {...S} width={26} height={26}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  ),
  team: (
    <svg {...S} width={26} height={26}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14.5c2.4 0 4 1.6 4 4.5" />
    </svg>
  ),
  quality: (
    <svg {...S} width={26} height={26}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  price: (
    <svg {...S} width={26} height={26}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9a2.5 2.5 0 00-2.5-1.5c-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2A2.7 2.7 0 019.5 15M12 6v1.5M12 16.5V18" />
    </svg>
  ),
  heart: (
    <svg {...S} width={26} height={26}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" />
    </svg>
  ),
  close: (
    <svg {...S} width={18} height={18} strokeWidth={2.3}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [video, setVideo] = useState(false);
  const videoCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideo(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    videoCloseRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [video]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const cards = [
    {
      icon: Icon.phone,
      tone: "blue",
      title: "Call Us",
      lines: [PHONE_DISPLAY, "(Closed on Sundays)"],
      strong: 0,
      href: PHONE_HREF,
      label: `Call ${PHONE_DISPLAY}`,
    },
    {
      icon: Icon.mail,
      tone: "blue",
      title: "Email Us",
      lines: [EMAIL, "We reply within 24 hours (usually much sooner)"],
      strong: 0,
      href: `mailto:${EMAIL}`,
      label: `Email ${EMAIL}`,
    },
    {
      icon: Icon.pin,
      tone: "blue",
      title: "Visit Our Office",
      lines: [...ADDRESS_LINES, "By appointment or walk-in"],
      strong: 0,
      href: MAPS_VIEW,
      label: "View our office on Google Maps",
      external: true,
    },
    {
      icon: Icon.support,
      tone: "orange",
      title: "Emergency Support",
      lines: ["24/7 Available", "For urgent boiler issues and breakdowns"],
      strong: 0,
      href: PHONE_HREF,
      label: "Call emergency support",
    },
  ];

  const strip = [
    { icon: Icon.team, title: "Professional Team", sub: "Fully qualified & insured" },
    { icon: Icon.quality, title: "Quality Work", sub: "Built to last" },
    { icon: Icon.price, title: "Competitive Pricing", sub: "Great value, no hidden costs" },
    { icon: Icon.heart, title: "Local & Reliable", sub: "Here when you need us" },
  ];

  return (
    <main className="uc">
      <style>{css}</style>

      {/* HERO */}
      <section className="uc-hero">
        <Img src="/images/hhero.jpg" alt="Our boiler installation van outside a customer's home" className="uc-hero-img" />
        <div className="uc-hero-inner">
          <div className="uc-hero-text">
            <p className="uc-eyebrow">Get in touch</p>
            <h1>
              We&rsquo;re Here to
              <br />
              <span>Help You</span>
            </h1>
            <p className="uc-hero-copy">
              Have a question, need a quote, or want to discuss your heating &amp; boiler needs? Our friendly team is
              ready to assist you. Get in touch with us today — we&rsquo;re just a call, email or message away.
            </p>
            <ul className="uc-perks">
              <li>
                <span className="uc-perk-icon">{Icon.clock}</span>
                <span>
                  <strong>Fast Response</strong>
                  <small>Within 24 hours</small>
                </span>
              </li>
              <li>
                <span className="uc-perk-icon">{Icon.expert}</span>
                <span>
                  <strong>Expert Advice</strong>
                  <small>From Our Specialists</small>
                </span>
              </li>
              <li>
                <span className="uc-perk-icon">{Icon.tag}</span>
                <span>
                  <strong>No Obligation</strong>
                  <small>Free Quotes</small>
                </span>
              </li>
            </ul>
          </div>

          <div className="uc-hero-media">
            <p className="uc-script uc-script-hero">
              Your Comfort
              <br />
              Our Priority
              <svg viewBox="0 0 160 14" aria-hidden="true">
                <path d="M2 10C40 2 100 2 158 8" fill="none" stroke="#ff8a1f" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </p>
            <button type="button" className="uc-watch" onClick={() => setVideo(true)}>
              <span className="uc-watch-btn">{Icon.play}</span>
              <span>
                Watch Our
                <br />
                Quick Intro
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="uc-wrap uc-cards" aria-label="Contact details">
        {cards.map((c) => (
          <a
            key={c.title}
            className="uc-card"
            href={c.href}
            aria-label={c.label}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className={`uc-card-icon is-${c.tone}`}>{c.icon}</span>
            <span className="uc-card-text">
              <strong>{c.title}</strong>
              {c.lines.map((l, i) => (
                <span key={l} className={i === c.strong ? "uc-card-main" : "uc-card-sub"}>
                  {l}
                </span>
              ))}
            </span>
            <span className="uc-go">{Icon.arrow}</span>
          </a>
        ))}
      </section>

      {/* FORM + MAP */}
      <section className="uc-wrap uc-main" id="contact-form">
        <div className="uc-form-card">
          {status === "success" ? (
            <div className="uc-ok" role="status">
              <span className="uc-tick">✓</span>
              <h2>Thank you, we&rsquo;ve got your details</h2>
              <p>One of our engineers will contact you shortly with your free quote.</p>
              <button type="button" className="uc-btn" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="uc-eyebrow">Send us a message</p>
              <h2>
                Get a Free Quote
                <br />
                <span>Today</span>
              </h2>
              <p className="uc-form-sub">
                Fill out the form below and we&rsquo;ll get back to you as soon as possible with the best solution for
                your needs.
              </p>

              <div className="uc-row">
                <label>
                  Full Name <i>*</i>
                  <input name="name" required minLength={2} placeholder="Your name" autoComplete="name" />
                </label>
                <label>
                  Email Address <i>*</i>
                  <input name="email" type="email" required placeholder="your@email.com" autoComplete="email" />
                </label>
              </div>
              <div className="uc-row">
                <label>
                  Phone Number <i>*</i>
                  <input name="phone" type="tel" required minLength={7} placeholder="Your phone number" autoComplete="tel" />
                </label>
                <label>
                  Service Required <i>*</i>
                  <select name="issue" required defaultValue="">
                    <option value="" disabled>
                      Select service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Message <em>(Optional)</em>
                <textarea name="message" rows={5} maxLength={2000} placeholder="Tell us more about your project or inquiry..." />
              </label>

              {/* honeypot: bots fill this, humans never see it */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />

              {status === "error" && (
                <p className="uc-err" role="alert">
                  {error}
                </p>
              )}

              <div className="uc-form-foot">
                <button className="uc-btn" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send Message"}
                  {status !== "sending" && Icon.send}
                </button>
                <p className="uc-secure">
                  {Icon.shield}
                  <span>
                    Your information is safe
                    <br />
                    and secure with us
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="uc-side">
          <div className="uc-map">
            <iframe
              title="Map showing our office location"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="uc-map-pop">
              <span className="uc-map-pin">{Icon.pin}</span>
              <div>
                <strong>Our Location</strong>
                <p>
                  {ADDRESS_LINES[0].replace(", London", "")}
                  <br />
                  London {ADDRESS_LINES[1]}
                </p>
                <a className="uc-btn uc-btn-sm" href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  Get Directions
                  {Icon.arrow}
                </a>
              </div>
            </div>
          </div>

          <div className="uc-office">
            <Img src="/images/office.jpg" alt="Our office building" className="uc-office-img" />
            <div className="uc-office-text">
              <h3>Visit Our Office</h3>
              <p>Come and see us at our office for a friendly chat about your heating and boiler needs.</p>
              <a className="uc-btn uc-btn-sm" href={MAPS_VIEW} target="_blank" rel="noopener noreferrer">
                View on Google Maps
                {Icon.arrow}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="uc-wrap uc-strip" aria-label="Why choose us">
        <p className="uc-script uc-script-strip">
          More Than Just
          <br />
          Boilers — We Care!
          <svg viewBox="0 0 200 14" aria-hidden="true">
            <path d="M2 10C50 2 130 2 198 8" fill="none" stroke="#ff8a1f" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </p>
        <ul>
          {strip.map((s) => (
            <li key={s.title}>
              <span className="uc-strip-icon">{s.icon}</span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.sub}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* INTRO VIDEO */}
      {video && (
        <div className="uc-backdrop" onMouseDown={() => setVideo(false)}>
          <div
            className="uc-video"
            role="dialog"
            aria-modal="true"
            aria-label="Quick intro video"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button ref={videoCloseRef} className="uc-video-x" onClick={() => setVideo(false)} aria-label="Close video">
              {Icon.close}
            </button>
            <video src="/images/video.mp4" controls autoPlay playsInline />
          </div>
        </div>
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Styles (scoped with the uc- prefix)                                 */
/* ------------------------------------------------------------------ */

const css = `
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap");

.uc{
  --navy:#0b2a5b; --blue:#1769ff; --blue-dark:#0e56d9; --blue-soft:#eaf2ff; --ink:#1d2b44; --muted:#5d6b84;
  --line:#dde6f3; --bg:#f5f8fd; --orange:#ff8a1f;
  font-family:"Plus Jakarta Sans","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--ink); background:var(--bg); padding:0 0 56px; min-height:100vh; overflow-x:clip;
}
.uc *{box-sizing:border-box}
.uc button{font:inherit;cursor:pointer}
.uc :focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.uc img{display:block;width:100%;height:100%;object-fit:cover}
.uc-fallback{width:100%;height:100%;background:linear-gradient(135deg,#cfe0fb,#eaf2ff 55%,#bcd4fa)}
.uc-wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,32px)}

/* eyebrow / script */
.uc-eyebrow{display:inline-flex;align-items:center;gap:10px;margin:0 0 12px;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy)}
.uc-eyebrow::before{content:"";width:22px;height:2px;background:var(--orange);border-radius:2px}
.uc-script{font-family:"Caveat","Segoe Script","Brush Script MT",cursive;font-weight:700;line-height:1.05;margin:0}
.uc-script svg{display:block;margin-top:2px}

/* hero */
.uc-hero{position:relative;isolation:isolate;padding-top:88px;background:var(--navy);overflow:hidden}
.uc-hero-img{position:absolute;inset:0;object-fit:cover;opacity:.35;z-index:0}
.uc-hero::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,.45);pointer-events:none;z-index:1}
.uc-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr;gap:clamp(24px,5vw,48px);padding:clamp(32px,6vw,64px) clamp(16px,4vw,32px);max-width:1200px;margin:0 auto}
@media(min-width:900px){
  .uc-hero-inner{grid-template-columns:1.1fr .9fr;align-items:center}
}
.uc-hero-text{color:#fff}
.uc-hero-text h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:900;line-height:1.1;margin:0 0 20px;letter-spacing:-.02em}
.uc-hero-text h1 span{color:#FF7A1A}
.uc-hero-copy{font-size:1.05rem;line-height:1.6;margin:0 0 28px;color:rgba(255,255,255,.9);max-width:500px}
.uc-perks{display:flex;flex-wrap:wrap;gap:20px 28px;margin:0;padding:0;list-style:none}
.uc-perks li{display:flex;align-items:center;gap:12px}
.uc-perk-icon{display:flex;align-items:center;justify-content:center;width:42px;height:42px;background:rgba(255,255,255,.1);border-radius:50%;color:var(--orange)}
.uc-perks strong{display:block;font-size:.9rem;margin-bottom:2px}
.uc-perks small{font-size:.8rem;color:rgba(255,255,255,.7)}
.uc-hero-media{display:flex;flex-direction:column;align-items:flex-start;gap:16px;color:#fff}
.uc-script-hero{font-size:2.5rem;margin:0}
.uc-watch{display:flex;align-items:center;gap:14px;padding:14px 24px;background:var(--orange);color:#fff;border-radius:999px;font-weight:600;font-size:1rem;border:none;transition:transform .2s}
.uc-watch:hover{transform:scale(1.05)}
.uc-watch-btn{display:flex;align-items:center;justify-content:center;width:42px;height:42px;background:#fff;border-radius:50%;color:var(--orange)}

/* cards */
.uc-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin:clamp(40px,6vw,64px) auto}
.uc-card{display:flex;align-items:center;gap:16px;padding:20px;background:#fff;border-radius:16px;box-shadow:0 2px 12px rgba(11,42,91,.06);text-decoration:none;color:inherit;transition:box-shadow .2s,transform .2s}
.uc-card:hover{box-shadow:0 4px 20px rgba(11,42,91,.12);transform:translateY(-2px)}
.uc-card-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;flex-shrink:0}
.uc-card-icon.is-blue{background:var(--blue-soft);color:var(--blue)}
.uc-card-icon.is-orange{background:rgba(255,138,31,.12);color:var(--orange)}
.uc-card-text{flex:1}
.uc-card-text strong{display:block;font-size:1rem;font-weight:700;margin-bottom:4px}
.uc-card-sub{display:block;font-size:.85rem;color:var(--muted)}
.uc-card-main{display:block;font-size:.95rem;font-weight:600;color:var(--navy)}
.uc-go{flex-shrink:0;color:var(--blue)}

/* form + map */
.uc-main{display:grid;grid-template-columns:1fr;gap:clamp(32px,5vw,48px);margin-bottom:clamp(48px,7vw,72px)}
@media(min-width:900px){
  .uc-main{grid-template-columns:1.2fr .8fr}
}
.uc-form-card{background:#fff;border-radius:20px;padding:clamp(24px,4vw,40px);box-shadow:0 4px 24px rgba(11,42,91,.08)}
.uc-form-sub{color:var(--muted);margin:0 0 28px;font-size:.95rem;line-height:1.6}
.uc-row{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:16px}
@media(min-width:600px){
  .uc-row{grid-template-columns:1fr 1fr}
}
.uc-form-card label{display:block;margin-bottom:16px}
.uc-form-card label strong{display:block;font-size:.85rem;font-weight:600;margin-bottom:6px;color:var(--navy)}
.uc-form-card label i{color:var(--orange)}
.uc-form-card label em{color:var(--muted);font-size:.8rem}
.uc-form-card input,.uc-form-card select,.uc-form-card textarea{width:100%;padding:12px 16px;border:1.5px solid var(--line);border-radius:10px;font-size:.95rem;font-family:inherit;transition:border-color .2s}
.uc-form-card input:focus,.uc-form-card select:focus,.uc-form-card textarea:focus{outline:none;border-color:var(--blue)}
.uc-form-card textarea{resize:vertical}
.uc-form-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:24px;flex-wrap:wrap}
.uc-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:var(--blue);color:#fff;border-radius:999px;font-weight:600;font-size:1rem;border:none;transition:background .2s}
.uc-btn:hover:not(:disabled){background:var(--blue-dark)}
.uc-btn:disabled{opacity:.6;cursor:not-allowed}
.uc-btn-sm{padding:10px 20px;font-size:.9rem}
.uc-secure{display:flex;align-items:center;gap:10px;font-size:.85rem;color:var(--muted)}
.uc-secure svg{color:var(--blue)}
.uc-err{padding:12px 16px;background:rgba(255,0,0,.08);color:#d32f2f;border-radius:10px;font-size:.9rem;margin-bottom:16px}
.uc-ok{text-align:center;padding:40px 20px}
.uc-tick{display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;background:#4caf50;color:#fff;border-radius:50%;font-size:2rem;font-weight:700;margin-bottom:20px}
.uc-ok h2{margin:0 0 12px;color:var(--navy)}
.uc-ok p{color:var(--muted);margin:0 0 24px}

/* side */
.uc-side{display:flex;flex-direction:column;gap:24px}
.uc-map{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:16/10}
.uc-map iframe{width:100%;height:100%;border:none}
.uc-map-pop{position:absolute;bottom:16px;left:16px;background:#fff;padding:16px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.15);max-width:280px}
.uc-map-pin{display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:var(--orange);color:#fff;border-radius:50%;margin-bottom:10px}
.uc-map-pop strong{display:block;font-size:.9rem;margin-bottom:4px}
.uc-map-pop p{margin:0 0 10px;font-size:.85rem;color:var(--muted)}
.uc-office{display:grid;grid-template-columns:1fr;gap:16px;border-radius:16px;overflow:hidden;background:#fff}
@media(min-width:600px){
  .uc-office{grid-template-columns:1.2fr .8fr}
}
.uc-office-img{border-radius:16px}
.uc-office-text{padding:20px;display:flex;flex-direction:column;justify-content:center}
.uc-office-text h3{margin:0 0 8px;font-size:1.1rem;color:var(--navy)}
.uc-office-text p{margin:0 0 16px;font-size:.9rem;color:var(--muted)}

/* strip */
.uc-strip{text-align:center;padding:clamp(40px,6vw,64px) 0}
.uc-strip ul{display:flex;flex-wrap:wrap;justify-content:center;gap:32px 48px;margin:24px 0 0;padding:0;list-style:none}
.uc-strip li{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
.uc-strip-icon{display:flex;align-items:center;justify-content:center;width:52px;height:52px;background:var(--blue-soft);color:var(--blue);border-radius:12px}
.uc-strip strong{display:block;font-size:1rem;font-weight:700;color:var(--navy)}
.uc-strip small{font-size:.85rem;color:var(--muted)}
.uc-script-strip{font-size:2.2rem;margin:0}

/* video */
.uc-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;padding:20px}
.uc-video{position:relative;background:#000;border-radius:16px;overflow:hidden;max-width:900px;width:100%;aspect-ratio:16/9}
.uc-video video{width:100%;height:100%}
.uc-video-x{position:absolute;top:12px;right:12px;width:40px;height:40px;background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s}
.uc-video-x:hover{background:rgba(255,255,255,.3)}
`;
