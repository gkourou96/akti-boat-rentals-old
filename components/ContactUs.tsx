"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";

export default function ContactUs() {
  return (
    // FIXED: Added id="contact-us" so the anchor link works
    <section
      id="contact-us"
      className="mx-auto h-auto xl:h-175 max-w-360 bg-white relative px-6 py-16 xl:px-30 xl:pt-22 xl:pb-0"
    >
      <div className="relative flex flex-col xl:flex-row h-auto mb-10 xl:mb-0 xl:h-17.75 w-full xl:w-62.25 items-start xl:items-center justify-start">
        <div className="relative inline-block">
          <h2 className="relative z-10 py-2.5 pl-0 pr-2.5 xl:p-2.5 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#0D4168] text-left">
            Contact Us
          </h2>
          <div className="absolute -bottom-1 -right-4 xl:-bottom-1.75 xl:-right-10.5 z-0 h-6 w-24 xl:h-8 xl:w-37.25">
            <Image
              src="/icons/no-license-accent.svg"
              alt="accent"
              width={149}
              height={32}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="mt-0 xl:mt-16 flex flex-col xl:flex-row w-full xl:w-300 items-start gap-12 xl:gap-6">
        <ContactForm />
        <div className="flex h-auto xl:h-88.25 w-full xl:w-100 flex-col gap-10 xl:gap-0 xl:justify-between">
          <div className="flex flex-col gap-6 items-start text-left">
            <h3 className="font-ubuntu text-[28px] xl:text-[32px] font-bold text-[#0D4168]">
              Contact Information
            </h3>
            <div className="flex flex-col gap-4 items-start">
              <div className="flex items-start gap-4 xl:gap-6">
                <Image
                  src="/icons/phone.svg"
                  alt="Phone"
                  width={24}
                  height={24}
                  className="mt-1 shrink-0"
                />
                <div className="flex flex-col font-open text-[16px] xl:text-[18px] text-[#0D4168]">
                  <span>+30 695 782 3809</span>
                  <span>+30 697 038 2346</span>
                </div>
              </div>

              <div className="flex items-center gap-4 xl:gap-6">
                <Image
                  src="/icons/mail.svg"
                  alt="Email"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <span className="font-open text-[16px] xl:text-[18px] text-[#0D4168]">
                  info@aktiboatrentals.com
                </span>
              </div>
            </div>
            <div className="flex gap-6 mt-2">
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={29}
                height={29}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              <Image
                src="/icons/x.svg"
                alt="X"
                width={29}
                height={29}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={29}
                height={29}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={29}
                height={29}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start text-left">
            <h3 className="font-ubuntu text-[28px] xl:text-[32px] font-bold text-[#0D4168]">
              Opening Hours
            </h3>

            <div className="flex flex-col font-open text-[16px] xl:text-[18px] text-[#0D4168]">
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
