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
          height={199} // Estimated height, adjusts auto based on width
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto h-full max-w-360 pt-15 pl-30">
        {/* Wrapper for H2 and its accent to keep them positioned together */}
        <div className="relative inline-block">
          <h2 className="font-ubuntu z-10 text-[44px] font-bold leading-none tracking-normal text-[#0D4168] p-2.5">
            No license boats
          </h2>
          {/* Accent Icon: 29px right, 14px down from the h2 box */}
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
              className="relative h-full w-70.5 overflow-hidden rounded-[20px] bg-gray-200"
            >
              {/* Boat Image */}
              <Image
                src={boat.image}
                alt={boat.name}
                fill
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 h-1/3 w-full bg-linear-to-t from-black/50 to-transparent" />

              {/* Title Container */}
              <div className="absolute bottom-6 left-6 flex h-9.25 w-58.5 items-end justify-start">
                <h3 className="font-ubuntu text-[32px] font-medium leading-none tracking-normal text-white">
                  {boat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Container: 1200x46 */}
        <div className="mt-11 flex h-11.5 w-300 items-center justify-end">
          {/* Text: "Already rented..." */}
          <span className="mr-2.5 font-ubuntu text-[24px] font-normal leading-none tracking-normal text-[#0D4168]">
            Already rented your boat?
          </span>

          {/* Button: "Get Started" */}
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
