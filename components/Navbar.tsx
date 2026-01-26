"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection ONLY for Shadow depth (Size remains CONSTANT)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Fleet", href: "#our-fleet" },
    { name: "No License Boats", href: "#no-license-boats" },
    { name: "Destinations", href: "#destinations" },
    { name: "Experiences", href: "#experiences" },
    { name: "Our Location", href: "#our-location" },
    { name: "Contact Us", href: "#contact-us", isButton: true },
  ];

  return (
    // PARENT: Fixed position, floating from top
    <header className="fixed left-0 top-0 z-50 flex w-full justify-center px-6 pt-6">
      {/* THE MILLION DOLLAR WHITE PILL */}
      <nav
        className={`
          flex w-full max-w-360 items-center justify-between 
          rounded-full bg-white px-10 transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          h-25 /* FIXED HEIGHT - NEVER SHRINKS */
          ${scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)]" : "shadow-[0_8px_30px_rgba(0,0,0,0.04)]"}
        `}
      >
        {/* LOGO SECTION - BIGGER & FIXED */}
        <Link
          href="/"
          className="shrink-0 transition-transform duration-300 hover:scale-105 hover:opacity-90"
        >
          <Image
            src="/images/logo.svg"
            alt="Akti Boat Rentals"
            width={240} // Increased width for better resolution
            height={80} // Increased height
            // FORCE SIZE: Locked to 65px height (was 40-55px before)
            className="h-auto w-auto max-h-16.25 object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden h-full items-center gap-2 xl:flex">
          {navLinks.map((link) => (
            <React.Fragment key={link.name}>
              {link.isButton ? (
                // PRIMARY CTA
                <Link
                  href={link.href}
                  className="ml-6 flex h-13.5 items-center justify-center rounded-full bg-[#0D4168] px-9 font-ubuntu text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#00C6DB] hover:scale-105"
                >
                  {link.name}
                </Link>
              ) : (
                // STANDARD LINKS
                <Link
                  href={link.href}
                  className="rounded-full px-6 py-3 font-ubuntu text-[16px] font-medium text-[#0D4168] transition-all duration-300 hover:bg-[#F5F8FA] hover:text-[#00C6DB]"
                >
                  {link.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* MOBILE BURGER */}
        <div className="xl:hidden">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F8FA] text-[#0D4168] transition-colors hover:bg-[#E1E8ED]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
