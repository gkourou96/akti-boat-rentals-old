"use client";

import React from "react";
import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center xl:bottom-10 xl:right-10">
      {/* Pulsing Effect */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75 duration-1000"></span>

      {/* Standard <a> tag for external links */}
      <a
        href="https://wa.me/+306989234169"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] xl:h-16 xl:w-16"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative h-9 w-9 xl:h-10 xl:w-10">
          <Image
            src="/icons/whatsapp.svg"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </div>
      </a>
    </div>
  );
}
