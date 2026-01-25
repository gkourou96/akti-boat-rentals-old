"use client";

import React from "react";
import Image from "next/image";

const boats = [
  { name: "Nireus 150", image: "/images/boat-1.png" },
  { name: "Skipper 160", image: "/images/boat-2.png" },
  { name: "Nireus 150", image: "/images/boat-3.png" },
  { name: "Skipper 160", image: "/images/boat-4.png" },
];

export default function NoLicenseBoats() {
  return (
    <section className="relative w-full h-195.75 bg-[#00C6DB0D] overflow-hidden">
      {/* Background Accent - Centered & Buried */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0  z-0 select-none">
        <Image
          src="/icons/no-license-boats-bg-accent.svg"
          alt="Background decoration"
          width={927}
          height={199}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto h-full max-w-360 pt-15 pl-30">
        {/* Wrapper for H2 and its accent to keep them positioned together */}
        <div className="relative inline-block">
          <h2 className="font-ubuntu z-10 text-[44px] font-bold leading-none tracking-normal text-[#0D4168] p-2.5">
            No license boats
          </h2>
          {/* Accent Icon */}
          <div className="absolute -right-5.5 -bottom-2.25 w-37.25 h-8 -z-10">
            <Image
              src="/icons/no-license-boats-accent.svg"
              alt="accent"
              width={149}
              height={32}
            />
          </div>
        </div>

        {/* Boats Grid Container: 1200x394 */}
        <div className="mt-11 flex h-98.5 w-300 gap-6">
          {boats.map((boat, index) => (
            <div
              key={index}
              className="group relative h-full w-70.5 overflow-hidden rounded-[20px] bg-gray-200 cursor-pointer"
            >
              {/* Boat Image */}
              <Image
                src={boat.image}
                alt={boat.name}
                fill
                className="object-cover"
              />

              {/* IDLE STATE: Bottom Gradient (Fades out on hover) */}
              <div className="absolute bottom-0 h-1/3 w-full bg-linear-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

              {/* HOVER STATE: Full Blue Overlay with Blend Mode */}
              <div
                className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundColor: "#0D4168E5",
                  mixBlendMode: "multiply",
                }}
              />

              {/* CONTENT WRAPPER */}
              {/* FIXED: Changed translate-y-[326px] to translate-y-[310px] to restore the 24px bottom spacing */}
              <div className="absolute inset-0 z-20 flex flex-col p-6 transition-transform duration-500 ease-in-out translate-y-[310px] group-hover:translate-y-0">
                {/* 1. TITLE */}
                <h3 className="font-ubuntu text-[32px] pt-[14px] font-medium leading-none tracking-normal text-white shrink-0">
                  {boat.name}
                </h3>

                {/* HIDDEN ELEMENTS (Reveal on Hover/Slide Up) */}
                <div className="flex flex-col h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 delay-100">
                  {/* 2. ICONS ROW */}
                  <div className="mt-2.5 flex items-center gap-6">
                    {/* Capacity */}
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/group.svg"
                        alt="people"
                        width={40}
                        height={40}
                      />
                      <span className="font-ubuntu text-[24px] font-normal text-white">
                        5
                      </span>
                    </div>
                    {/* Length */}
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/straighten.svg"
                        alt="length"
                        width={40}
                        height={40}
                      />
                      <span className="font-ubuntu text-[24px] font-normal text-white">
                        5m
                      </span>
                    </div>
                  </div>

                  {/* 3. DESCRIPTION */}
                  <p className="mt-2.5 font-open text-[18px] text-white leading-tight">
                    Flexible and economical, perfect for quick trips and
                    fishing.
                  </p>

                  {/* 4. PRICING & GUARANTEE */}
                  <div className="my-[32px]">
                    <div className="flex justify-between w-full">
                      <span className="font-ubuntu text-[20px] text-white">
                        190€ – 5h
                      </span>
                      <span className="font-ubuntu text-[20px] text-white">
                        290€ – FULL
                      </span>
                    </div>
                    <div className="mt-2.5 font-ubuntu font-light text-[20px] text-[#F2992F]">
                      Guarantee needed
                    </div>
                  </div>

                  {/* 5. BUTTON */}
                  <button className="mb-[24px] flex h-[46px] w-[188px] items-center justify-center rounded-full border border-white bg-transparent transition-colors hover:bg-white/10 cursor-pointer">
                    <span className="font-ubuntu text-[20px] text-white pb-0.5">
                      Book Now →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Container */}
        <div className="mt-11 flex h-11.5 w-300 items-center justify-end">
          <span className="mr-2.5 font-ubuntu text-[24px] font-normal leading-none tracking-normal text-[#0D4168]">
            Already rented your boat?
          </span>
          <button className="group flex h-11.5 w-51 items-center justify-center rounded-full border-2 border-[#0D4168] bg-transparent transition-opacity duration-300 ease-out active:opacity-50 cursor-pointer">
            <span className="font-ubuntu text-[24px] font-normal leading-none text-[#0D4168] pb-0.5">
              Get Started →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
