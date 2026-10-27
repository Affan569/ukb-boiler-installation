"use client";

import React, { useEffect, useState } from "react";


const ORANGE = "#F8681D";
const BLUE = "#0B2A5B"; // brand blue – footer background
const BLUE_DEEP = "#071E45"; // slightly deeper shade used for the gradient / card
const BLUE_BRIGHT = "#0B84FF"; // bright accent used for highlighted text
const WHITE = "#FFFFFF";
const MUTED = "#D5DEEE";

const css = `
.ukbf, .ukbf * { box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; }
.ukbf { background: linear-gradient(180deg, ${BLUE} 0%, ${BLUE_DEEP} 100%); color: ${WHITE}; width: 100%; position: relative; overflow: hidden; }
.ukbf a { color: inherit; text-decoration: none; }
.ukbf a:focus-visible, .ukbf button:focus-visible, .ukbf input:focus-visible { outline: 3px solid ${BLUE_BRIGHT}; outline-offset: 3px; }

.ukbf-inner { max-width: 1426px; margin: 0 auto; padding: 36px 36px 0; }
.ukbf-grid { display: grid; grid-template-columns: 1.25fr 0.8fr 1fr 1fr; align-items: start; padding-bottom: 20px; gap: 40px; }

/* ---------- brand column ---------- */
.ukbf-logo { min-height: 100px; display: flex; align-items: center; }
.ukbf-logo img, .ukbf-logo svg { height: 100px; width: auto; max-width: 100%; object-fit: contain; display: block; }
.ukbf-bar { width: 48px; height: 4px; background: ${ORANGE}; border-radius: 2px; }
.ukbf-brand .ukbf-bar { margin: 18px 0 20px; }
.ukbf-tagline { margin: 0 0 18px; font-size: 26px; line-height: 1.2; font-weight: 700; letter-spacing: -0.3px; }
.ukbf-tagline span { display: block; color: ${BLUE_BRIGHT}; }
.ukbf-about { margin: 0 0 26px; max-width: 340px; font-size: 14px; line-height: 1.45; color: ${WHITE}; }

.ukbf-badges { display: flex; align-items: center; }
.ukbf-badge { display: flex; align-items: center; gap: 10px; padding: 0 12px; border-left: 1px solid rgba(255,255,255,.14); }
.ukbf-badge:first-child { padding-left: 0; border-left: 0; }
.ukbf-badge .ring { width: 42px; height: 42px; border-radius: 50%; border: 2px solid ${ORANGE}; display: grid; place-items: center; flex: none; }
.ukbf-badge .t { font-size: 12px; line-height: 1.3; color: ${MUTED}; }

/* ---------- link columns ---------- */
.ukbf-title { margin: 0; font-size: 20px; line-height: 1.2; font-weight: 700; }
.ukbf-col .ukbf-bar { margin: 18px 0 24px; width: 48px; }
.ukbf-col .ukbf-title { padding-top: 0; }

.ukbf-links { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.ukbf-links a { display: inline-flex; align-items: center; gap: 12px; font-size: 15.5px; transition: color .15s ease; }
.ukbf-links a:hover { color: ${ORANGE}; }

.ukbf-contact { list-style: none; margin: 0; padding: 0; display: grid; gap: 26px; }
.ukbf-contact li { display: flex; gap: 16px; align-items: flex-start; }
.ukbf-contact .ico { width: 48px; height: 48px; border-radius: 50%; background: ${ORANGE}; display: grid; place-items: center; flex: none; }
.ukbf-contact .l { font-size: 15px; line-height: 1.3; }
.ukbf-contact .v { font-size: 14px; line-height: 1.35; font-weight: 700; }
.ukbf-contact .s { font-size: 13.5px; line-height: 1.5; color: ${MUTED}; margin-top: 4px; }

/* ---------- newsletter card ---------- */
.ukbf-card {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, rgba(255,255,255,.05), rgba(255,255,255,.015)), ${BLUE_DEEP};
  border: 1px solid rgba(248,104,29,.45); border-radius: 26px; padding: 20px 14px 20px;
  box-shadow: 0 18px 40px rgba(0,0,0,.25);
  min-width: 300px;
  width: 100%;
}
.ukbf-card::after {
  content: ""; position: absolute; top: -1px; right: -1px; width: 96px; height: 96px;
  background: linear-gradient(135deg, ${ORANGE} 0 28%, rgba(248,104,29,.45) 28% 58%, transparent 58%);
  clip-path: polygon(30% 0, 100% 0, 100% 70%);
  opacity: .9;
}
.ukbf-card .ukbf-bar { width: 48px; height: 4px; margin-bottom: 22px; }
.ukbf-card h3 { margin: 0 0 14px; font-size: 10px; line-height: 1.2; font-weight: 700; }
.ukbf-card h3 span { display: block; color: ${BLUE_BRIGHT}; }
.ukbf-card p { margin: 0 0 24px; font-size: 13px; line-height: 1.5; color: ${WHITE}; }

.ukbf-input {
  display: flex; align-items: center; gap: 12px; height: 54px; padding: 0 10px;
  background: rgba(11,42,91,.9); border: 1px solid rgba(255,255,255,.14); border-radius: 999px; margin-bottom: 16px;
}
.ukbf-input input { flex: 1; min-width: 0; background: transparent; border: 0; outline: none; color: ${WHITE}; font-size: 15px; }
.ukbf-input input::placeholder { color: #9FB0CE; }
.ukbf-input:focus-within { border-color: ${ORANGE}; }
.ukbf-sub {
  width: 100%; height: 56px; border: 0; border-radius: 999px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  background: linear-gradient(90deg, #FF9A1F 0%, ${ORANGE} 100%); color: ${WHITE};
  font-size: 16px; font-weight: 700; box-shadow: 0 10px 24px rgba(248,104,29,.35);
  transition: transform .15s ease, box-shadow .15s ease;
}
.ukbf-sub:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(248,104,29,.45); }
.ukbf-thanks { margin-top: 12px; font-size: 13.5px; color: #FFD2B8; }

/* ---------- bottom bar ---------- */
.ukbf-bottom { border-top: 1px solid rgba(255,255,255,.1); }
.ukbf-bottom-inner { max-width: 1426px; margin: 0 auto; padding: 24px 36px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.ukbf-copy { font-size: 12px; color: ${WHITE}; display: flex; align-items: center;  }
.ukbf-copy .vline { width: 2px; height: 22px; background: ${BLUE_BRIGHT}; opacity: .7; flex: none; margin-left: auto; }
.ukbf-legal { display: flex; align-items: center; gap: 16px; font-size: 14px; flex: 2 1 auto; }
.ukbf-legal .sep { width: 1px; height: 16px; background: rgba(255,255,255,.7); }
.ukbf-legal a:hover { color: ${ORANGE}; }
.ukbf-follow { display: flex; align-items: center; gap: 14px; margin-left: auto; font-size: 14px; }
.ukbf-follow .icons { display: flex; gap: 12px; }
.ukbf-soc { width: 36px; height: 36px; border-radius: 50%; background: #123C7E; display: grid; place-items: center; transition: background .15s ease, transform .15s ease; }
.ukbf-soc:hover { background: ${ORANGE}; transform: translateY(-1px); }

/* ---------- responsive ---------- */
@media (max-width: 1100px) {
  .ukbf-grid { grid-template-columns: 1fr 1fr; gap: 48px 40px; }
  .ukbf-col:nth-child(4), .ukbf-col:nth-child(5) { grid-column: span 2; }
}
@media (max-width: 640px) {
  .ukbf-inner { padding: 28px 10px 0; }
  .ukbf-grid { grid-template-columns: 1fr; padding-bottom: 40px; }
  .ukbf-badges { flex-wrap: wrap; row-gap: 14px; }
  .ukbf-bottom-inner { padding: 20px; flex-direction: column; align-items: flex-start; }
  .ukbf-copy { flex-direction: column; align-items: flex-start; gap: 8px; }
  .ukbf-copy .vline { display: none; }
  .ukbf-legal { flex-wrap: wrap; }
  .ukbf-follow { margin-left: 0; }
  .ukbf-col:nth-child(4), .ukbf-col:nth-child(5) { grid-column: span 1; }
}
`;

/* ---------- icons ---------- */

const Chevron = () => (
  <svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m2 1.5 5 5.5-5 5.5" />
  </svg>
);

const Shield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12.2 2.2 2.2 4.2-4.4" />
  </svg>
);

const Wrench = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.6 17.1a1.8 1.8 0 0 0 2.5 2.5l5.7-5.7a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.1-.5-.5-2.1 2.5-2.6Z" />
  </svg>
);

const Home = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3.5 11 12 3.8 20.5 11" />
    <path d="M5.8 9.6V20h12.4V9.6" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);

const Phone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 5 5l1.4-2.2L19 14.2V17.7A2.3 2.3 0 0 1 16.7 20C9.7 19.6 4.4 14.3 4 7.3A2.3 2.3 0 0 1 5 4Z" />
    <path d="M14 4.5a5.5 5.5 0 0 1 5.5 5.5M14 7.8a2.2 2.2 0 0 1 2.2 2.2" />
  </svg>
);

const Mail = ({ color = WHITE, size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>
);

const Pin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

const Arrow = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1 7h19M14 1l6 6-6 6" />
  </svg>
);

const Facebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={WHITE} aria-hidden>
    <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-1 .4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.7H7.6v3.3h2.8V22h3.1Z" />
  </svg>
);

const Instagram = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill={WHITE} stroke="none" />
  </svg>
);

const LinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={WHITE} aria-hidden>
    <path d="M4.5 9h3.8v11H4.5V9Zm1.9-5.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM10.6 9h3.6v1.5h.1c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.7V20h-3.8v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20h-3.8V9Z" />
  </svg>
);

const YouTube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={WHITE} aria-hidden>
    <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);


const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Boiler Installation", href: "/boiler-installation" },
  { label: "Boiler Servicing", href: "/boiler-servicing" },
  { label: "Boiler Repair", href: "/boiler-repair" },
  { label: "Our Work", href: "/our-work" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

/* ---------- component ---------- */

export interface UKBFooterProps {
  /** Path or URL of your own logo image, e.g. "/images/ukb-logo.png". Default: "/logo.png". */
  logoSrc?: string;
  /** Optional: pass a full custom element instead (e.g. Next.js <Image />). Overrides logoSrc. */
  logo?: React.ReactNode;
  phone?: string;
  email?: string;
  /** Called with the entered email when the newsletter form is submitted. */
  onSubscribe?: (email: string) => void | Promise<void>;
  className?: string;
}

export default function UKBFooter({
  logoSrc = "/images/logo1.png",
  logo,
  phone = "07988530358",
  email = "info@ukbboilerinstallation.co.uk",
  onSubscribe,
  className,
}: UKBFooterProps) {
  const [value, setValue] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value.trim(), type: "newsletter" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Subscription failed. Please try again.");
      await onSubscribe?.(value.trim());
      setDone(true);
      setValue("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      alert("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className={`ukbf ${className ?? ""}`}>
      <style>{css}</style>

      <div className="ukbf-inner">
        <div className="ukbf-grid">
          {/* ===== brand ===== */}
          <div className="ukbf-brand">
            <div className="ukbf-logo">
              {logo ?? <img src={logoSrc} alt="UKB Boiler Installs" />}
            </div>
            <div className="ukbf-bar" />
            <h2 className="ukbf-tagline">
              Reliable Boiler Solutions
              <span>for a Warmer Home.</span>
            </h2>
            <p className="ukbf-about">
              UKB Boiler Installs provides expert boiler installation, servicing
              and repairs across the UK. We’re committed to delivering safe,
              efficient and long-lasting heating solutions for your home.
            </p>
            <div className="ukbf-badges">
              <div className="ukbf-badge">
                <span className="ring"><Shield /></span>
                <span className="t">Trusted<br />&amp; Certified</span>
              </div>
              <div className="ukbf-badge">
                <span className="ring"><Wrench /></span>
                <span className="t">Professional<br />Installers</span>
              </div>
              <div className="ukbf-badge">
                <span className="ring"><Home /></span>
                <span className="t">Local<br />&amp; Reliable</span>
              </div>
            </div>
          </div>

          {/* ===== quick links ===== */}
          <nav className="ukbf-col" aria-label="Quick links">
            <h3 className="ukbf-title">Quick Links</h3>
            <div className="ukbf-bar" />
            <ul className="ukbf-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>
                    <Chevron />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== get in touch ===== */}
          <div className="ukbf-col">
            <h3 className="ukbf-title">Get In Touch</h3>
            <div className="ukbf-bar" />
            <ul className="ukbf-contact">
              <li>
                <span className="ico"><Phone /></span>
                <div>
                  <div className="l">Call Us</div>
                  <a className="v" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                  <div className="s">Mon – Sat, 8am – 6pm</div>
                </div>
              </li>
              <li>
                <span className="ico"><Mail /></span>
                <div>
                  <div className="l">Email Us</div>
                  <a className="v" href={`mailto:${email}`}>{email}</a>
                  <div className="s">We’ll reply within 24 hours</div>
                </div>
              </li>
              <li>
                <span className="ico"><Pin /></span>
                <div>
                  <div className="l">Service Area</div>
                  <div className="v">London &amp; Surrounding Areas</div>
                  <div className="s">We cover all major areas in the UK</div>
                </div>
              </li>
            </ul>
          </div>

          {/* ===== newsletter ===== */}
          <div className="ukbf-card">
            <div className="ukbf-bar" />
            <h3>
              Stay Updated
              <span>with Our Latest Offers</span>
            </h3>
            <p>
              Get expert tips, exclusive offers and heating advice straight to
              your inbox.
            </p>
            <form onSubmit={submit}>
              <label className="ukbf-input">
                <Mail color="#C9D5EC" size={22} />
                <input
                  type="email"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                />
              </label>
              <button className="ukbf-sub" type="submit">
                Subscribe <Arrow />
              </button>
              {done && <div className="ukbf-thanks" role="status">Thanks – you’re subscribed.</div>}
            </form>
          </div>
        </div>
      </div>

      {/* ===== bottom bar ===== */}
    <div className="ukbf-bottom">
  <div className="ukbf-bottom-inner">
    <div className="ukbf-copy">
      <span>© {year} UKB Boiler Installs. All rights reserved.</span>
    
      <span className="vline" aria-hidden="true" style={{marginLeft: '20px'}} />
        <span>
        Created by{' '}
        <a 
          href="https://tacreatives.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          TACreatives
        </a>
      </span>
    </div>


          

          <div className="ukbf-follow">
            <div className="ukbf-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <span className="sep" aria-hidden />
            <a href="/cookie-policy">Cookie Policy</a>
            <span className="sep" aria-hidden />
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}