"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = { open: boolean; onClose: () => void; defaultIssue?: string };
type Status = "idle" | "sending" | "success" | "error";

const ISSUES = ["New boiler installation", "Boiler replacement", "Boiler repair", "No heating or hot water", "Boiler service", "Other"];

export default function QuoteModal({ open, onClose, defaultIssue = ISSUES[0] }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstRef.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "quote" }),
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

  const close = () => { setStatus("idle"); setError(""); onClose(); };

  return (
    <div className="qm-back" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <style>{css}</style>
      <div className="qm" role="dialog" aria-modal="true" aria-labelledby="qm-title">
        <button className="qm-x" onClick={close} aria-label="Close">×</button>

        {status === "success" ? (
          <div className="qm-ok">
            <span className="qm-tick">✓</span>
            <h3 id="qm-title">Thank you, we’ve got your details</h3>
            <p>One of our engineers will contact you shortly with your free quote.</p>
            <button className="qm-btn" onClick={close}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3 id="qm-title">Get your free quote</h3>
            <p className="qm-sub">Fill in a few details and we’ll get back to you with the best options for your home.</p>
            <div className="qm-row">
              <label>Name *<input ref={firstRef} name="name" required minLength={2} placeholder="Your full name" autoComplete="name" /></label>
              <label>Phone number *<input name="phone" type="tel" required minLength={7} placeholder="+44 7000 000000" autoComplete="tel" /></label>
            </div>
            <label>Email *<input name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></label>
            <label>Issue *
              <select name="issue" defaultValue={defaultIssue} required>
                {ISSUES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </label>
            <label>Tell us more about it
              <textarea name="message" rows={4} maxLength={2000} placeholder="Current boiler type, property size, anything we should know…" />
            </label>
            {/* honeypot: bots fill this, humans never see it */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
            {status === "error" && <p className="qm-err" role="alert">{error}</p>}
            <button className="qm-btn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Request a quote"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const css = `
.qm-back{position:fixed;inset:0;z-index:9999;background:rgba(7,27,68,.6);backdrop-filter:blur(4px);display:grid;place-items:center;padding:16px;overflow-y:auto;font-family:Manrope,system-ui,sans-serif}
.qm{position:relative;width:100%;max-width:560px;background:#fff;border-radius:24px;padding:30px;box-shadow:0 30px 70px rgba(4,20,70,.45);animation:qm-in .25s ease}
@keyframes qm-in{from{opacity:0;transform:translateY(14px) scale(.98)}}
.qm h3{font-family:'Bricolage Grotesque',sans-serif;font-size:26px;color:#0b2a63;margin:0 0 6px;letter-spacing:-.02em}
.qm-sub{color:#5d6b85;font-size:.9rem;margin:0 0 18px}
.qm form{display:grid;gap:14px}
.qm-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.qm label{display:grid;gap:6px;font-size:.8rem;font-weight:700;color:#0b2a63}
.qm input,.qm select,.qm textarea{font:inherit;font-weight:500;color:#16233f;padding:12px 14px;border-radius:14px;border:1.5px solid #d3e0f4;background:#f7faff;width:100%}
.qm textarea{resize:vertical}
.qm input:focus-visible,.qm select:focus-visible,.qm textarea:focus-visible,.qm-btn:focus-visible,.qm-x:focus-visible{outline:3px solid #8fb8ff;outline-offset:2px}
.qm-btn{font:inherit;font-weight:700;border:0;cursor:pointer;background:#1565f0;color:#fff;padding:15px 24px;border-radius:999px;box-shadow:0 10px 24px rgba(21,101,240,.35)}
.qm-btn:disabled{opacity:.6;cursor:wait}
.qm-x{position:absolute;right:14px;top:12px;width:36px;height:36px;border-radius:50%;border:0;background:#eaf2ff;color:#1565f0;font-size:24px;line-height:1;cursor:pointer}
.qm-err{color:#c0262d;font-size:.85rem;margin:0;font-weight:600}
.qm-ok{text-align:center;display:grid;gap:10px;justify-items:center;padding:12px 0}
.qm-ok p{color:#5d6b85;margin:0}
.qm-tick{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:#d9f5e6;color:#17a864;font-size:30px;font-weight:700}
@media (max-width:560px){.qm-row{grid-template-columns:1fr}.qm{padding:24px 18px}.qm h3{font-size:22px}}
@media (prefers-reduced-motion:reduce){.qm{animation:none}}
`; 