"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import QuoteModal from "./QuoteModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    dropdown: [
      { label: "Boiler Installation", href: "/boiler-installation" },
      { label: "Boiler Servicing", href: "/boiler-servicing" },
      { label: "Boiler Repair", href: "/boiler-repair" },
    ],
  },
  { label: "Blogs", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/contactus" },
];

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false); // true once user left the top
  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      if (y > lastY.current && y > 120) {
        setHidden(true); // scrolling down -> hide
        setMenuOpen(false);
      } else if (y < lastY.current) {
        setHidden(false); // scrolling up -> show
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || menuOpen
            ? "bg-white shadow-[0_4px_20px_rgba(10,42,107,0.12)]"
            : "bg-transparent shadow-none"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1488px] items-center justify-between px-6 transition-all duration-300 lg:px-12 ${
            scrolled ? "h-[64px]" : "h-[88px]"
          }`}
        >
          {/* LOGO — two images, exactly the same size/position; only the file differs */}
          <Link href="/" className="relative block h-[48px] w-[160px] shrink-0" aria-label="UKB Boiler Installs">
            {/* Logo at the top of the page */}
            <Image
              src="/images/logo1.png"
              alt="UKB Boiler Installs"
              fill
              priority
              sizes="160px"
              className={`object-contain object-left transition-opacity duration-300 ${
                scrolled || menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
            {/* Logo on the white scrolled header */}
            <Image
              src="/images/logo2.png"
              alt="UKB Boiler Installs"
              fill
              priority
              sizes="160px"
              className={`object-contain object-left transition-opacity duration-300 ${
                scrolled && !menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
            {/* Logo when the hamburger menu is open */}
            <Image
              src="/images/logo2.png"
              alt="UKB Boiler Installs"
              fill
              priority
              sizes="160px"
              className={`object-contain object-left transition-opacity duration-300 ${
                menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href ||
                             (link.href && link.href !== "/" && pathname.startsWith(link.href)) ||
                             (link.href === "/#about" && pathname === "/" && typeof window !== 'undefined' && window.location.hash === '#about');

              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button
                      className={`relative py-1.5 text-[13.5px] font-semibold transition-colors flex items-center gap-1 ${
                        pathname.startsWith('/boiler-')
                          ? "text-[#0a2a6b] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0a2a6b]"
                          : "text-[#0b7cf0] hover:text-[#0a2a6b]"
                      }`}
                    >
                      {link.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        {link.dropdown.map((dropdownLink) => {
                          const isDropdownActive = pathname === dropdownLink.href;
                          return (
                            <Link
                              key={dropdownLink.href}
                              href={dropdownLink.href}
                              className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                                isDropdownActive
                                  ? "text-[#0a2a6b] bg-blue-50"
                                  : "text-[#0b7cf0] hover:text-[#0a2a6b] hover:bg-gray-50"
                              }`}
                            >
                              {dropdownLink.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1.5 text-[13.5px] font-semibold transition-colors ${
                    isActive
                      ? "text-[#0a2a6b] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0a2a6b]"
                      : "text-[#0b7cf0] hover:text-[#0a2a6b]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <button
            type="button"
            onClick={() => setQuote(true)}
            className="hidden w-fit items-center gap-3 rounded-full bg-[#0a2a6b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#0b7cf0] lg:inline-flex"
          >
            Get a Free Quote
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden text-[#0b7cf0]"
            aria-label="Toggle menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-6 pb-6 lg:hidden">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href ||
                               (link.href && link.href !== "/" && pathname.startsWith(link.href)) ||
                               (link.href === "/#about" && pathname === "/" && typeof window !== 'undefined' && window.location.hash === '#about');

                if (link.dropdown) {
                  return (
                    <div key={link.label} className="border-b border-gray-100">
                      <button
                        onClick={() => setServicesDropdown(!servicesDropdown)}
                        className={`w-full py-3 font-semibold transition-colors flex items-center justify-between ${
                          pathname.startsWith('/boiler-') ? "text-[#0a2a6b]" : "text-[#0b7cf0]"
                        }`}
                      >
                        {link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {servicesDropdown && (
                        <div className="pl-4 pb-3">
                          {link.dropdown.map((dropdownLink) => {
                            const isDropdownActive = pathname === dropdownLink.href;
                            return (
                              <Link
                                key={dropdownLink.href}
                                href={dropdownLink.href}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setServicesDropdown(false);
                                }}
                                className={`block py-2 text-sm font-semibold transition-colors ${
                                  isDropdownActive ? "text-[#0a2a6b]" : "text-[#0b7cf0]"
                                }`}
                              >
                                {dropdownLink.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`border-b border-gray-100 py-3 font-semibold transition-colors ${
                      isActive ? "text-[#0a2a6b]" : "text-[#0b7cf0]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setQuote(true);
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0a2a6b] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#0b7cf0]"
            >
              Get a Free Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </header>

      {/* Header ke bahar rakha hai, warna header ke translate ki wajah se popup scroll par hide ho jata */}
      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </>
  );
}