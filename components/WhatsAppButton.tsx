"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/+306957823809"
      target="_blank"
      rel="noopener noreferrer"
      // Container size remains the same (h-14 mobile / h-16 desktop)
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] xl:bottom-10 xl:right-10 xl:h-16 xl:w-16"
      aria-label="Chat on WhatsApp"
    >
      {/* CHANGED: Slightly reduced icon height/width to create more padding inside the circle */}
      <div className="relative h-7 w-7 xl:h-8.5 xl:w-8.5">
        <Image
          src="/icons/whatsapp.svg"
          alt="WhatsApp"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}
