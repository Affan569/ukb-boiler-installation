"use client";

import QuoteButton from "./QuoteButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CTASection() {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <section ref={sectionRef} className="cta-wrapper">
      <style>{css}</style>
      <div className="cta-container">
        <div className="cta-content">
          <div className={`scroll-animate cta-badge ${sectionVisible ? 'is-visible' : ''}`}>Expert Heating Services</div>
          <h2 className={`scroll-animate-delay-1 cta-title ${sectionVisible ? 'is-visible' : ''}`}>
            Ready to upgrade your heating?
          </h2>
          <p className={`scroll-animate-delay-2 cta-subtitle ${sectionVisible ? 'is-visible' : ''}`}>
            Get a free, no-obligation quote from our Gas Safe registered engineers today.
          </p>
          <div className={`scroll-animate-delay-3 cta-actions ${sectionVisible ? 'is-visible' : ''}`}>
            <QuoteButton 
              className="cta-button"
              defaultIssue="New boiler installation"
            >
              Get a Free Quote
            </QuoteButton>
            <a href="tel:+923142078089" className="cta-phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
              </svg>
              <span className="cta-phone-number">+44 9219379218</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.cta-wrapper {
  background-color: #ffffff;
  padding: 40px 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}

.cta-container {
  width: 70%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  background-color: #f1f5f9;
  border-radius: 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 40px 20px;
}

/* Subtle decorative ambient lighting inside the grey box */
.cta-container::before {
  content: "";
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(11, 124, 240, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-badge {
  display: inline-block;
  background-color: rgba(10, 42, 107, 0.08);
  color: #0a2a6b;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 6px 16px;
  border-radius: 99px;
  margin-bottom: 20px;
}

.cta-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.cta-subtitle {
  font-size: clamp(14px, 1.8vw, 16px);
  color: #475569;
  margin: 0 0 36px 0;
  max-width: 580px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.cta-button {
  background: #0a2a6b;
  color: #ffffff;
  padding: 16px 30px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(10, 42, 107, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(249, 115, 22, 0.4);
  background: #f97316;
  color: #ffffff;
}

.cta-phone {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0a2a6b;
  text-decoration: none;
  padding: 15px 28px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.cta-phone:hover {
  background: #0a2a6b;
  color: #ffffff;
  border-color: #0a2a6b;
  transform: translateY(-2px);
}

.cta-phone-number {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

@media (min-width: 768px) {
  .cta-actions {
    flex-direction: row;
    gap: 20px;
    width: auto;
  }
  
  .cta-container {
    padding: 30px 20px;
  }
}

@media (max-width: 768px) {
  .cta-container {
    width: 92%;
    padding: 40px 20px;
  }
  
  .cta-button, .cta-phone {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
}
`;