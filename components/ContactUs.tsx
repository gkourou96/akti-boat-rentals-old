"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";

export default function ContactUs() {
  return (
    <div className="bg-[#F2EAD680]">
      <section
        id="contact-us"
        className="mx-auto h-auto xl:h-175 max-w-360 relative px-6 py-16 xl:px-30 xl:pt-22 xl:pb-0"
      >
        <div className="relative flex flex-col xl:flex-row h-auto mb-10 xl:mb-0 xl:h-17.75 w-full xl:w-62.25 items-start xl:items-center justify-start">
          <div className="relative inline-block">
            <h2 className="relative z-10 py-2.5 pl-0 pr-2.5 xl:p-2.5 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#144B51] text-left">
              Contact Us
            </h2>
            <div className="absolute -bottom-1 -right-4 xl:-bottom-1.75 xl:-right-10.5 z-0 h-6 w-24 xl:h-8 xl:w-37.25">
              <Image
                src="/icons/accent_orange.svg"
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

          {/* CONTAINER RESTORED: Locked to exactly 400x353px */}
          <div className="flex flex-col w-full xl:w-100 xl:h-88.25 shrink-0 xl:justify-between">
            {/* --- TOP BLOCK: CONTACT INFORMATION --- */}
            <div className="flex flex-col items-start text-left">
              <h3 className="font-ubuntu text-[28px] xl:text-[32px] font-bold text-[#0D4168] leading-none">
                Contact Information
              </h3>

              <div className="mt-6 flex flex-col gap-3.75 items-start">
                {/* FIX: Changed items-start to items-center */}
                <div className="flex items-center gap-4 xl:gap-6">
                  <Image
                    src="/icons/phone.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                    // FIX: Removed mt-1 so flexbox centers it perfectly
                    className="shrink-0"
                  />
                  <div className="flex flex-col font-open text-[16px] xl:text-[18px] text-[#0D4168] leading-6">
                    <a
                      href="tel:+306957823809"
                      className="hover:opacity-75 transition-opacity"
                    >
                      +30 695 782 3809
                    </a>

                    <a
                      href="https://wa.me/+306989234169"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-75 transition-opacity"
                    >
                      +30 698 923 4169
                    </a>
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
                  <span className="font-open text-[16px] xl:text-[18px] text-[#0D4168] leading-6">
                    info@aktiboatrentals.com
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-6">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                <Image
                  src="/icons/x.svg"
                  alt="X"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            </div>

            {/* --- BOTTOM BLOCK: OPENING HOURS --- */}
            <div className="mt-10 xl:mt-0 flex flex-col items-start text-left">
              <h3 className="font-ubuntu text-[28px] xl:text-[32px] font-bold text-[#0D4168] leading-none">
                Opening Hours
              </h3>

              <div className="mt-6 flex flex-col font-open text-[16px] xl:text-[18px] text-[#0D4168] leading-6.25">
                <p>
                  <span className="font-bold">Monday - Friday:</span> 8:00 AM -
                  8:00 PM
                </p>
                <p>
                  <span className="font-bold">Saturday - Sunday:</span> 8:00 AM
                  - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
