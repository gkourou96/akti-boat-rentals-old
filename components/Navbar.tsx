"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Our Fleet", href: "#our-fleet" },
    { name: "No License Boats", href: "#no-license-boats" },
    { name: "Destinations", href: "#destinations" },
    { name: "Experiences", href: "#experiences" },
    { name: "Our Location", href: "#our-location" },
    { name: "Contact Us", href: "#contact-us" },
  ];

  // NEW: Handle smooth scroll with dynamic offset
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();

    // Extract the ID from the href (e.g., "#our-fleet" -> "our-fleet")
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);

    if (elem) {
      // Check if viewport is desktop (xl breakpoint is usually 1280px in Tailwind)
      // If width >= 1280, use 123.98px offset, otherwise use 80px
      const isDesktop = window.innerWidth >= 1280;
      const offset = isDesktop ? 123.98 : 80;

      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Always close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  return (
    // NAVBAR WRAPPER
    // fixed top-0: Stays sticky on top.
    // flex-col: Allows mobile menu to stack below.
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pt-0 pointer-events-none">
      {/* INNER CONTAINER
          ------------------------------------------------------------
          MOBILE (Default):
          - w-full: Full width bar.
          - px-6 py-4: Standard mobile header padding.
          - rounded-none: Rectangular bar (no pill shape).
          - bg-white: White background.
          
          DESKTOP (xl: prefix):
          - xl:max-w-[1200px]: Restricts width to pill size.
          - xl:rounded-b-[60px]: Adds the large rounded bottom corners.
          - xl:px-4 xl:py-[22px] xl:pr-[55px] xl:pl-[22px]: Specific Figma padding restored strictly for desktop.
          ------------------------------------------------------------
      */}
      <div className="pointer-events-auto relative flex w-full items-center justify-between bg-white shadow-[0_4px_4px_rgba(0,0,0,0.1)] px-6 py-4 xl:max-w-300 xl:rounded-b-[60px] xl:rounded-t-none xl:px-4 xl:py-5.5 xl:pr-13.75 xl:pl-5.5">
        {/* Logo Section */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Akti Boat Rentals"
            width={180}
            height={60}
            // CHANGED: h-10 -> h-12 to increase mobile size without affecting desktop (xl:h-auto)
            className="h-12 w-auto xl:h-auto xl:w-auto xl:max-h-20"
            priority
          />
        </Link>

        {/* Desktop Navigation - STRICTLY UNTOUCHED (Hidden on Mobile) */}
        <div className="hidden h-full items-center gap-5.5 xl:flex mt-3">
          {navLinks.map((link) => {
            const isContact = link.name === "Contact Us";
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`text-lg font-medium transition-opacity hover:opacity-75 ${
                  isContact
                    ? "rounded-full bg-[#EA9708] px-6 py-2 text-white"
                    : "text-[#0D4168]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle Button (Visible only on Mobile) */}
        {/* CHANGED: Added 'flex items-center' to ensure the icon sits perfectly in the middle vertically */}
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

      {/* MOBILE MENU DROPDOWN
          - Renders below the white bar.
          - Full width or slightly inset depending on preference (Currently inset for style).
      */}
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
