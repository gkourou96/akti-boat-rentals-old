"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";

export default function ContactUs() {
  return (
    <section className="mx-auto h-[700px] max-w-[1440px] bg-white relative px-[120px] pt-[88px]">
      {/* 1. TITLE CONTAINER: 249x71px */}
      <div className="relative flex h-[71px] w-[249px] items-center">
        {/* H2: Contact Us */}
        <h2 className="relative z-10 p-2.5 font-ubuntu text-[44px] font-bold leading-none text-[#0D4168]">
          Contact Us
        </h2>

        {/* Accent */}
        <div className="absolute -bottom-1 -right-[38px] -z-0 h-[32px] w-[149px]">
          <Image
            src="/icons/accent.svg"
            alt="accent"
            width={149}
            height={32}
            className="object-contain"
          />
        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER: 1200x353px */}
      <div className="mt-[64px] flex w-[1200px] items-start gap-[24px]">
        {/* LEFT: Contact Form (Existing Component) */}
        {/* This component is approx 791px wide */}
        <ContactForm />

        {/* RIGHT: Contact Information Container (400x353px) */}
        <div className="flex h-[353px] w-[400px] flex-col justify-between">
          {/* Top Section: Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="font-ubuntu text-[32px] font-bold text-[#0D4168]">
              Contact Information
            </h3>

            <div className="flex flex-col gap-4">
              {/* Phone */}
              <div className="flex items-start gap-6">
                <Image
                  src="/icons/phone.svg"
                  alt="Phone"
                  width={24}
                  height={24}
                  className="mt-1"
                />
                <div className="flex flex-col font-open text-[18px] text-[#0D4168]">
                  <span>+30 695 782 3809</span>
                  <span>+30 697 038 2346</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-6">
                <Image
                  src="/icons/mail.svg"
                  alt="Email"
                  width={24}
                  height={24}
                />
                <span className="font-open text-[18px] text-[#0D4168]">
                  info@aktiboatrentals.com
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6">
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={29}
                height={29}
              />
              <Image src="/icons/x.svg" alt="X" width={29} height={29} />
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={29}
                height={29}
              />
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={29}
                height={29}
              />
            </div>
          </div>

          {/* Bottom Section: Opening Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="font-ubuntu text-[32px] font-bold text-[#0D4168]">
              Opening Hours
            </h3>

            <div className="flex flex-col font-open text-[18px] text-[#0D4168]">
              <p>
                <span className="font-bold">Monday - Friday:</span> 8:00 AM -
                8:00 PM
              </p>
              <p>
                <span className="font-bold">Saturday - Sunday:</span> 8:00 AM -
                8:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
