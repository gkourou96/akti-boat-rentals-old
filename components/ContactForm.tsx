"use client";

import React from "react";

export default function ContactForm() {
  return (
    <div className="flex w-[791px] flex-col items-start gap-8">
      {/* FORM CONTAINER */}
      {/* Background: #0D41680D */}
      {/* Shadow: 0px 4px 4px 0px #00000040 */}
      {/* Padding: 43px top, 24px sides/bottom */}
      <div className="flex w-full flex-col rounded-[14.83px] bg-[#0D41680D] px-[24px] pb-[24px] pt-[43px] shadow-[0px_4px_4px_0px_#00000040]">
        {/* ROW 1: Full Name & Preferred Date */}
        <div className="flex w-full gap-5">
          {/* Full Name */}
          <div className="flex w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Full Name <span className="text-[#F2994A]">*</span>
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="h-[38px] w-full rounded-[6px] bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#00C6DB]"
            />
          </div>

          {/* Preferred Date */}
          <div className="flex w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Preferred Date
            </label>
            <input
              type="text"
              placeholder="Enter Date"
              className="h-[38px] w-full rounded-[6px] bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#00C6DB]"
            />
          </div>
        </div>

        {/* ROW 2: Email & Phone */}
        {/* Gap-y 24px between input rows */}
        <div className="mt-6 flex w-full gap-5">
          {/* Email */}
          <div className="flex w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Email <span className="text-[#F2994A]">*</span>
            </label>
            <input
              type="email"
              placeholder="Your email address"
              className="h-[38px] w-full rounded-[6px] bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#00C6DB]"
            />
          </div>

          {/* Phone */}
          <div className="flex w-1/2 flex-col gap-2">
            <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
              Phone <span className="text-[#F2994A]">*</span>
            </label>
            <input
              type="tel"
              placeholder="Your phone number"
              className="h-[38px] w-full rounded-[6px] bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#00C6DB]"
            />
          </div>
        </div>

        {/* ROW 3: Messages */}
        {/* Margin top 32px */}
        <div className="mt-8 flex w-full flex-col gap-2">
          <label className="font-ubuntu text-[14px] font-medium text-[#0D4168]">
            Messages <span className="text-[#F2994A]">*</span>
          </label>
          <textarea
            placeholder="Tell us about your requirements, preferred boat type, number of guests, or any special requests..."
            className="h-[70px] w-full resize-none rounded-[6px] bg-white p-2 px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#00C6DB]"
          ></textarea>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button className="flex h-[54px] w-[217px] items-center justify-center rounded-full bg-[#00C6DB] px-8 transition-opacity duration-300 hover:opacity-90 cursor-pointer">
        <span className="pb-0.5 font-ubuntu text-[20px] font-medium text-white">
          Send Message
        </span>
      </button>
    </div>
  );
}
