"use client";

import React from "react";
import Image from "next/image";

export default function ContactForm() {
  return (
    // CONTAINER:
    // Mobile: w-full (Responsive)
    // Desktop: w-[791px] (Fixed, preserved)
    <div className="flex w-full xl:w-197.75 flex-col items-start gap-8">
      {/* FORM CONTAINER */}
      {/* Background: #E3891F1A */}
      {/* SIZE: Mobile h-auto | Desktop h-[353px] (EXACT SIZE ENFORCED) */}
      <div className="flex w-full flex-col rounded-[14.83px] bg-[#E3891F1A] px-6 pb-6 pt-6 h-auto xl:h-88.25">
        {/* ROW 1: Full Name & Preferred Date */}
        {/* Mobile: flex-col | Desktop: flex-row */}
        <div className="flex w-full flex-col xl:flex-row gap-5">
          {/* Full Name */}
          <div className="flex w-full xl:w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Full Name <span className="text-[#F2994A]">*</span>
            </label>
            <input
              type="text"
              placeholder="Your full name"
              // Focus ring updated to match new orange theme
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>

          {/* Preferred Date */}
          <div className="flex w-full xl:w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Preferred Date
            </label>
            <input
              type="text"
              placeholder="Enter Date"
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>
        </div>

        {/* ROW 2: Email & Phone */}
        {/* Mobile: flex-col | Desktop: flex-row */}
        <div className="mt-4 flex w-full flex-col xl:flex-row gap-5">
          {/* Email */}
          <div className="flex w-full xl:w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Email <span className="text-[#F2994A]">*</span>
            </label>
            <input
              type="email"
              placeholder="Your email address"
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>

          {/* Phone */}
          <div className="flex w-full xl:w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Phone <span className="text-[#F2994A]">*</span>
            </label>
            <input
              type="tel"
              placeholder="Your phone number"
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>
        </div>

        {/* ROW 3: Messages */}
        <div className="mt-4 flex w-full flex-col gap-2">
          <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
            Messages <span className="text-[#F2994A]">*</span>
          </label>
          <textarea
            placeholder="Tell us about your requirements, preferred boat type, number of guests, or any special requests..."
            className="h-17.5 w-full resize-none rounded-md bg-white p-2 px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-4 flex w-full justify-end">
          <button className="flex h-8.75 w-35 items-center justify-center gap-2 rounded-full bg-[#E3891F] hover:bg-[#F2992F80] transition-colors duration-300 cursor-pointer px-6">
            <span className="font-ubuntu text-[18px] font-normal text-white leading-none">
              Submit
            </span>
            <Image
              src="/icons/contact-arrow.svg"
              alt="Arrow icon"
              width={18}
              height={8}
              className="block ml-2.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
