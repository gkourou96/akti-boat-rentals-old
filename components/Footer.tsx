"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const navLinks = [
    { name: "Our Fleet", href: "#our-fleet" },
    { name: "No License Boats", href: "#no-license-boats" },
    { name: "Destinations", href: "#destinations" },
    { name: "Our Location", href: "#our-location" },
    { name: "Experiences", href: "#experiences" },
    { name: "Contact Us", href: "#contact-us" },
  ];

  // UPDATED: Logic to handle smooth scrolling with Navbar Offset
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      // Determine offset based on screen width (assuming xl/1280px is the desktop breakpoint)
      // Mobile height: 80px | Desktop height: 123.98px
      const offset = window.innerWidth >= 1280 ? 123.98 : 80;

      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#144B51] text-white">
      {/* 1. MAIN FOOTER BODY */}
      <div className="relative h-auto w-full pb-16 xl:h-122.5 xl:pb-0">
        {/* ABSOLUTE VECTOR IMAGE */}
        <div className="absolute -right-20 -top-10 z-0 opacity-20 xl:top-15.5 xl:-right-17.5 xl:opacity-100">
          <Image
            src="/icons/footer-vector.svg"
            alt="footer design element"
            width={368}
            height={366}
            className="h-80 w-80 xl:h-91.5 xl:w-92"
          />
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="mx-auto h-full max-w-360 px-6 pt-16 relative z-10 flex flex-col items-start xl:flex-row xl:justify-between xl:px-30 xl:pt-0">
          {/* LEFT COLUMN */}
          <div className="flex h-auto w-full flex-col py-0 xl:h-84.75 xl:w-85.75 xl:py-[75.47px]">
            {/* LOGO */}
            <div className="pb-8 xl:pb-11">
              <Image
                src="/images/footer-logo.svg"
                alt="Akti Boat Rentals"
                width={226}
                height={85}
                className="h-auto w-56.5 object-contain xl:w-auto"
              />
            </div>

            {/* ADDRESS/INFO CONTAINER */}
            <div className="flex h-auto w-full flex-col gap-4 justify-start xl:h-31 xl:w-85.75">
              <div className="flex items-center gap-6">
                <Image
                  src="/icons/distance.svg"
                  alt="Location"
                  width={24}
                  height={24}
                />
                <p className="font-open text-[18px] leading-none text-white">
                  Akti tou Iliou (Costa del Sol), Alimos
                </p>
              </div>

              <div className="flex h-auto w-full items-center gap-6 xl:h-12.5 xl:w-49">
                <Image
                  src="/icons/phone.svg"
                  alt="Phone"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col font-open text-[18px] leading-tight text-white">
                  <span>+30 695 782 3809</span>
                  <span>+30 697 038 2346</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Image
                  src="/icons/mail.svg"
                  alt="Email"
                  width={24}
                  height={24}
                />
                <p className="font-open text-[18px] leading-none text-white">
                  info@aktiboatrentals.com
                </p>
              </div>
            </div>

            {/* SOCIAL ICONS CONTAINER */}
            <div className="mt-10 mb-12 flex h-[29.05px] w-[188.21px] items-center gap-6 xl:my-0 xl:mt-11">
              <Link href="#">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={29}
                  height={29}
                />
              </Link>
              <Link href="#">
                <Image src="/icons/x.svg" alt="X" width={29} height={29} />
              </Link>
              <Link href="#">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={29}
                  height={29}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={29}
                  height={29}
                />
              </Link>
            </div>
          </div>

          {/* MIDDLE COLUMN: INDEX */}
          <div className="flex flex-col h-auto w-full py-0 xl:h-59.5 xl:w-35.25 xl:py-31.5 xl:mr-58.25">
            <h3 className="font-ubuntu text-[24px] font-bold text-[#F2994A] mb-6">
              Index
            </h3>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="font-open text-[18px] font-medium text-white transition-opacity hover:opacity-75"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 2. ADDITIONAL DECORATIVE STRIP */}
      <div className="w-full h-auto py-4 bg-[#0B282C] xl:h-8.5 xl:py-0">
        <div className="mx-auto flex h-full max-w-360 flex-col items-center justify-between px-6 text-[12px] xl:text-[12px] font-normal text-white/80 xl:flex-row xl:px-30">
          {/* Left: Copyright */}
          <div className="mb-2 text-center xl:mb-0 xl:text-left">
            <span>
              All rights reserved © Designed by{" "}
              <a href="#" className="text-[#47C2CF]">
                Lookumation Studio
              </a>
            </span>
          </div>

          {/* Right: Legal Links */}
          <div className="flex items-center gap-4 xl:gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              GDPR
            </Link>
          </div>
        </div>
      </div>{" "}
    </footer>
  );
}
