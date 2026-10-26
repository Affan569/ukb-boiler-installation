"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type Item = { title: string; text: string; icon: ReactNode; bg: string };

const ICON = "h-9 w-9";

const ITEMS: Item[] = [
  {
    title: "Gas Safe Registered",
    text: "All our engineers are Gas Safe registered, so you’re in safe hands.",
    bg: "from-[#fff7e6] to-[#f3f3f3]",
    // Put your Gas Safe logo at /public/images/gas-safe.png
    icon: (
      <Image src="/images/gassafe.png" alt="Gas Safe Register" width={56} height={56} className="h-12 w-12 object-contain" />
    ),
  },
  {
    title: "24/7 Support",
    text: "We’re always here when you need us — day or night, for peace of mind.",
    bg: "from-[#eaf3ff] to-[#f1f5fb]",
    icon: (
      <svg viewBox="0 0 48 48" className={ICON} fill="none" stroke="#0a2a6b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 28v-4a16 16 0 0 1 32 0v4" />
        <rect x="5" y="26" width="6" height="10" rx="2" />
        <rect x="37" y="26" width="6" height="10" rx="2" />
        <path d="M40 36c0 4-4 6-9 6h-3" />
        <text x="24" y="29" fontSize="11" fontWeight="800" fill="#0b7cf0" stroke="none" textAnchor="middle">24/7</text>
      </svg>
    ),
  },
  {
    title: "Fixed Prices",
    text: "No hidden costs. Just honest, upfront pricing — every time.",
    bg: "from-[#fff1e3] to-[#f6f3ef]",
    icon: (
      <svg viewBox="0 0 48 48" className={ICON} fill="none" stroke="#f28a1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="18" cy="12" rx="11" ry="5" />
        <path d="M7 12v8c0 2.8 5 5 11 5M7 20v8c0 2.8 5 5 11 5" />
        <circle cx="31" cy="33" r="10" fill="#f28a1c" stroke="none" />
        <text x="31" y="38" fontSize="14" fontWeight="800" fill="#fff" stroke="none" textAnchor="middle">£</text>
      </svg>
    ),
  },
  {
    title: "Warranty Included",
    text: "All our work comes with a full warranty for added confidence and long-term value.",
    bg: "from-[#e6f1ff] to-[#eef3fa]",
    icon: (
      <svg viewBox="0 0 48 48" className={ICON} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4 8 10v12c0 10 7 17 16 21 9-4 16-11 16-21V10L24 4Z" fill="#0b7cf0" stroke="#0a2a6b" strokeWidth="3" />
        <path d="m16 24 6 6 11-12" stroke="#0a2a6b" strokeWidth="3.5" />
      </svg>
    ),
  },
  {
    title: "Tidy Work",
    text: "We respect your home and always leave everything clean, smart and tidy.",
    bg: "from-[#eaf3ff] to-[#f1f5fb]",
    icon: (
      <svg viewBox="0 0 48 48" className={ICON} fill="none" stroke="#0a2a6b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24 22 9l16 15" />
        <path d="M11 21v19h22V21" />
        <rect x="18" y="26" width="3.5" height="3.5" fill="#0b7cf0" stroke="none" />
        <rect x="23.5" y="26" width="3.5" height="3.5" fill="#0b7cf0" stroke="none" />
        <rect x="18" y="31.5" width="3.5" height="3.5" fill="#0b7cf0" stroke="none" />
        <rect x="23.5" y="31.5" width="3.5" height="3.5" fill="#0b7cf0" stroke="none" />
        <path d="M38 6v8M34 10h8" stroke="#f28a1c" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <>
      <style>{`@media (min-width: 1024px) { .why-choose-us-section { padding-top: 30px !important; padding-bottom: 30px !important; } } @media (max-width: 768px) { .why-choose-us-heading { font-size: 30px !important; } }`}</style>
      <section ref={sectionRef} className="relative overflow-hidden bg-white why-choose-us-section" style={{paddingTop: '64px', paddingBottom: '30px'}}>
      {/* Right: boiler image in a rounded circle with an orange arc */}
      <div className="pointer-events-none absolute -top-16 right-[-60px] hidden h-[500px] w-[500px] lg:block xl:right-[2%] xl:h-[540px] xl:w-[540px]">
        {/* soft glow behind the circle */}
        <div className="absolute inset-4 rounded-full bg-[#dbe8fb]/60 blur-2xl" />

        {/* orange arc around the circle */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-[35deg]" fill="none">
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="#f28a1c"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeDasharray="70 238"
          />
        </svg>

        {/* the image, perfectly round */}
        <div className="absolute inset-[18px] overflow-hidden rounded-full bg-[#eef2f8] shadow-[0_20px_60px_rgba(10,42,107,0.18)] ring-[6px] ring-white">
          {/* Put your image at /public/images/boiler.jpg */}
          <Image
            src="/images/boiler.jpg"
            alt="Worcester boiler installation"
            fill
            priority
            quality={90}
            sizes="540px"
            className="object-cover object-[55%_55%] scale-[1.03]"
          />
          {/* subtle inner edge so it blends nicely */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(10,42,107,0.12)]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Heading */}
        <div className="max-w-[560px]">
          <p className={`scroll-animate text-[14px] font-semibold uppercase tracking-[0.35em] text-[#0a2a6b] ${sectionVisible ? 'is-visible' : ''}`}>
            Why Choose Us?
          </p>
          <div className={`scroll-animate-delay-1 mt-2 h-[3px] w-[130px] rounded-full bg-gradient-to-r from-[#f28a1c] to-[#e4e7ec] ${sectionVisible ? 'is-visible' : ''}`} />

          <h2 className={`scroll-animate-delay-2 mt-6 text-[40px] font-black leading-[1.08] tracking-tight why-choose-us-heading ${sectionVisible ? 'is-visible' : ''}`}>
            <span className="block text-[#0a2a6b]">Your Comfort,</span>
            <span className="block text-[#0b7cf0]">Our Commitment</span>
          </h2>

          <p className="mt-5 max-w-[470px] text-sm leading-6 text-[#3a4b73] sm:text-base sm:leading-7">
            We’re more than just boiler installers — we’re your trusted local experts. Here’s why
            thousands of homeowners choose us.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`scroll-animate scroll-animate-delay-${i + 4} flex flex-col items-center rounded-2xl bg-white/90 px-5 py-7 text-center shadow-[0_10px_35px_rgba(10,42,107,0.08)] ring-1 ring-[#e8eef8] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,42,107,0.14)] ${sectionVisible ? 'is-visible' : ''}`}
            >
              <div
                className={`flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br ${item.bg} shadow-[inset_0_0_0_1px_rgba(10,42,107,0.06),0_4px_12px_rgba(10,42,107,0.08)]`}
              >
                {item.icon}
              </div>
              <h3 className="mt-4 text-[17px] font-bold leading-tight text-[#0a2a6b]">
                {item.title}
              </h3>
              <div className="mt-3 h-[3px] w-9 rounded-full bg-[#f28a1c]" />
              <p className="mt-3 text-[13.5px] leading-[1.6] text-[#3a4b73]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

     
    </section>
    </>
  );
}