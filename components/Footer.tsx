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

  return (
    <footer className="relative w-full overflow-hidden bg-[#0D4168] text-white">
      {/* 1. MAIN FOOTER BODY (490px) */}
      <div className="relative h-122.5 w-full">
        {/* ABSOLUTE VECTOR IMAGE */}
        <div className="absolute top-15.5 -right-17.5 z-0">
          <Image
            src="/icons/footer-vector.svg"
            alt="footer design element"
            width={368}
            height={366}
            className="h-91.5 w-92"
          />
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="mx-auto h-full max-w-360 px-30 relative z-10 flex items-start justify-between">
          {/* LEFT COLUMN: 343x339px Container */}
          <div className="flex h-84.75 w-85.75 flex-col py-[75.47px]">
            {/* LOGO-FOOTER.SVG */}
            <div className="pb-11">
              <Image
                src="/images/logo-footer.svg"
                alt="Akti Boat Rentals"
                width={245}
                height={75}
                className="h-auto w-auto object-contain"
              />
            </div>

            {/* ADDRESS/INFO CONTAINER */}
            <div className="h-31 w-85.75 flex flex-col gap-4 justify-start">
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

              <div className="flex h-12.5 w-49 items-center gap-6">
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
            <div className="mt-11 flex h-[29.05px] w-[188.21px] items-center gap-6">
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

          {/* MIDDLE COLUMN: INDEX (140x238px) */}
          {/* REVISED: mr-[233px] distance from the right-hand vector element */}
          <div className="flex flex-col h-59.5 w-35.25 py-31.5 mr-58.25">
            <h3 className="font-ubuntu text-[24px] font-bold text-[#F2994A] mb-6">
              Index
            </h3>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-open text-[18px] font-medium text-white transition-opacity hover:opacity-75"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. ADDITIONAL DECORATIVE STRIP (34px) */}
      <div className="w-full h-8.5 bg-[#00C6DB]" />
    </footer>
  );
}
