"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Our Fleet", href: "/#our-fleet" },
    { name: "No License Boats", href: "/#no-license-boats" },
    { name: "Destinations", href: "/#destinations" },
    { name: "Experiences", href: "/#experiences" },
    { name: "Our Location", href: "/#our-location" },
    { name: "Contact Us", href: "/#contact-us" },
  ];

  // Helper to handle the actual window scrolling
  const scrollToElement = (elem: HTMLElement, isSmooth: boolean) => {
    // Desktop: 128.65px | Mobile: 80px (Exactly matches h-12 logo + py-4 padding)
    const isDesktop = window.innerWidth >= 1280;
    const offset = isDesktop ? 128.65 : 80;

    const elementPosition = elem.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      // "instant" forces a 0-delay jump for cross-page arrival
      // "smooth" uses the browser's smooth scroller for same-page clicks
      behavior: isSmooth ? "smooth" : "instant",
    });
  };

  // 1. ARRIVAL LOGIC (Cross-Page Navigation)
  // This runs when you land on the page with a #hash (e.g., coming from /fleet)
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const elem = document.getElementById(targetId);

      if (elem) {
        // requestAnimationFrame fires before the next repaint, making the jump imperceptible.
        requestAnimationFrame(() => {
          scrollToElement(elem, false); // false = INSTANT jump
        });
      }
    }
  }, [pathname]);

  // 2. SAME-PAGE CLICK LOGIC
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    // Only intercept if we are ALREADY on the home page
    if (pathname === "/") {
      e.preventDefault();
      const targetId = href.replace(/.*\#/, "");
      const elem = document.getElementById(targetId);

      if (elem) {
        // True = Smooth scroll for same-page navigation
        scrollToElement(elem, true);
      }
    }
    // If not on home page, allow default navigation.
    // The useEffect above will handle the landing (instantly).

    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pt-0 pointer-events-none">
      <div className="pointer-events-auto relative flex w-full items-center justify-between bg-[#F2EAD6] xl:shadow-[0_4px_4px_rgba(0,0,0,0.1)] px-6 py-4 xl:max-w-300 xl:rounded-b-[60px] xl:rounded-t-none xl:px-4 xl:py-5.5 xl:pr-13.75 xl:pl-5.5">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Akti Boat Rentals"
            width={180}
            height={60}
            className="h-12 w-auto xl:h-[84.65px] xl:w-auto"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden h-full items-center gap-5.5 xl:flex mt-3">
          {navLinks.map((link) => {
            const isContact = link.name === "Contact Us";

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`relative group text-lg transition-all duration-300 ${
                  isContact
                    ? "rounded-full bg-[#EA9708] px-6 h-8.75 flex items-center text-white hover:bg-[#F2992F80] font-medium"
                    : "text-[#0D4168] hover:text-[#1E6F73]" // Removed font-medium/bold from here, handled inside
                }`}
              >
                {/* LAYOUT FIX: "inline-grid" stacks two spans on top of each other.
                  Span 1 (Invisible): Always Bold. It pushes the width open.
                  Span 2 (Visible): Medium -> Bold. It sits centered in that space.
                */}
                <span className="relative z-10 inline-grid justify-items-center overflow-hidden">
                  {/* 1. The Invisible Spacer (Always Bold to reserve width) */}
                  <span className="col-start-1 row-start-1 font-bold opacity-0 invisible pointer-events-none">
                    {link.name}
                  </span>

                  {/* 2. The Visible Text (Changes weight on hover) */}
                  <span
                    className={`col-start-1 row-start-1 ${isContact ? "font-medium" : "font-medium group-hover:font-bold"}`}
                  >
                    {link.name}
                  </span>
                </span>

                {/* Accent Image: Appears on hover for all non-contact links */}
                {!isContact && (
                  <Image
                    src="/icons/accent.svg"
                    alt=""
                    width={63}
                    height={14}
                    // z-0 ensures it sits BEHIND the text
                    // opacity-0 by default, opacity-100 on group-hover
                    className="absolute top-4.5 right-0 pointer-events-none select-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="xl:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#0D4168] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={32} strokeWidth={2.5} />
            ) : (
              <Menu size={32} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="pointer-events-auto mt-0 w-full bg-white px-6 py-6 shadow-xl xl:hidden animate-in fade-in slide-in-from-top-5 duration-200 border-t border-gray-100">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isContact = link.name === "Contact Us";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`text-lg font-medium transition-opacity hover:opacity-75 ${
                    isContact
                      ? "inline-block w-full text-center rounded-full bg-[#EA9708] px-6 py-3 text-white shadow-sm"
                      : "text-[#0D4168] py-2"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
