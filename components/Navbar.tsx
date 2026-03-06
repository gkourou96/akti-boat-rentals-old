"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const navLinks = [
    // CHANGED: href points to the separate page "/fleet"
    { name: "Our Fleet", href: "/fleet" },
    { name: "No License Boats", href: "/#no-license-boats" },
    { name: "Destinations", href: "/#destinations" },
    { name: "Services", href: "/#services" },
    { name: "Our Location", href: "/#our-location" },
    { name: "Contact Us", href: "/#contact-us" },
  ];

  // --- SCROLL DIRECTION DETECTION ---
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Show if at top OR scrolling up
        // Hide if scrolling down AND not at the very top
        if (currentScrollY === 0 || currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Helper to handle the actual window scrolling
  const scrollToElement = (elem: HTMLElement, isSmooth: boolean) => {
    const isDesktop = window.innerWidth >= 1280;
    const offset = isDesktop ? 128.65 : 80;

    const elementPosition = elem.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: isSmooth ? "smooth" : "instant",
    });
  };

  // 1. ARRIVAL LOGIC
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const elem = document.getElementById(targetId);

      if (elem) {
        requestAnimationFrame(() => {
          scrollToElement(elem, false);
        });
      }
    }
  }, [pathname]);

  // 2. SAME-PAGE CLICK LOGIC
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    // UPDATED CHECK: Only intercept if on homepage AND the link is a hash link (contains #)
    // This allows "/fleet" to navigate normally.
    if (pathname === "/" && href.includes("#")) {
      e.preventDefault();
      const targetId = href.replace(/.*\#/, "");
      const elem = document.getElementById(targetId);

      if (elem) {
        scrollToElement(elem, true);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pt-0 pointer-events-none transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* UPDATED: Replaced the inset orange borders with shadow-[0px_4px_4px_0px_#0000001A] */}
      <div className="pointer-events-auto relative flex w-full items-center justify-between bg-[#F9F5EB] shadow-[0px_4px_4px_0px_#0000001A] px-6 py-4 xl:max-w-300 rounded-b-[30px] xl:rounded-b-[60px] rounded-t-none xl:px-4 xl:py-5.5 xl:pr-13.75 xl:pl-5.5">
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
                // UPDATED: Added 'font-ubuntu' and 'font-normal' (400)
                className={`relative group text-xl font-ubuntu transition-all duration-300 ${
                  isContact
                    ? "rounded-full bg-[#E3891F] px-6 h-8.75 flex items-center text-white hover:bg-[#F2992F80] font-normal"
                    : "text-[#144B51] hover:text-[#144B51]"
                }`}
              >
                <span className="relative z-10 inline-grid justify-items-center overflow-hidden">
                  <span className="col-start-1 row-start-1 font-bold opacity-0 invisible pointer-events-none">
                    {link.name}
                  </span>
                  <span
                    // UPDATED: Changed 'font-medium' to 'font-normal'
                    className={`col-start-1 row-start-1 ${
                      isContact
                        ? "font-normal"
                        : "font-normal group-hover:font-bold"
                    }`}
                  >
                    {link.name}
                  </span>
                </span>

                {!isContact && (
                  <Image
                    src="/icons/accent_orange.svg"
                    alt=""
                    width={63}
                    height={14}
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
            className="text-[#1E6F73] focus:outline-none"
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
                  // UPDATED: Added 'font-ubuntu' and 'font-normal' (400)
                  className={`text-lg font-ubuntu font-normal transition-opacity hover:opacity-75 ${
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
