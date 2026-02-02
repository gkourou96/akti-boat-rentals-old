"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Ubuntu, Open_Sans } from "next/font/google";
import { Users, Ruler, ArrowRight } from "lucide-react";

// --- FONTS ---
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open",
});

const boats = [
  {
    name: "Nireus 150",
    image: "/images/boat-1.png",
    capacity: 5,
    length: "5m",
    priceHalf: "190€",
    priceFull: "290€",
  },
  {
    name: "Skipper 160",
    image: "/images/boat-2.png",
    capacity: 6,
    length: "6m",
    priceHalf: "220€",
    priceFull: "340€",
  },
  {
    name: "Nireus 150",
    image: "/images/boat-3.png",
    capacity: 5,
    length: "5m",
    priceHalf: "190€",
    priceFull: "290€",
  },
  {
    name: "Skipper 160",
    image: "/images/boat-4.png",
    capacity: 6,
    length: "6m",
    priceHalf: "220€",
    priceFull: "340€",
  },
];

export default function NoLicenseBoats() {
  return (
    <>
      {/* Scrollbar Hider Utility */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* SECTION WRAPPER 
         Mobile: h-auto (Adapts to content, prevents cutting off)
         Desktop: h-[783px] (Strict constraint as requested)
      */}
      <section
        className={`relative w-full h-auto lg:h-[783px] bg-[#F4F8FA] overflow-hidden flex flex-col justify-center ${ubuntu.variable} ${openSans.variable}`}
      >
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply z-0 pointer-events-none" />

        {/* CONTENT CONTAINER 
           Mobile: Vertical padding (py-16), Stacked layout (gap-12)
           Desktop: Centered padding (py-12), Spaced layout (justify-between)
        */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 h-full flex flex-col gap-12 lg:gap-0 lg:justify-between py-16 lg:py-12">
          {/* --- HEADER --- */}
          <div className="relative shrink-0">
            {/* Watermark: Adjusted size and position to prevent clipping */}
            <div className="absolute -top-6 lg:-top-8 -left-4 lg:-left-6 text-[15vw] lg:text-[8rem] leading-none font-bold text-[#0D4168] opacity-[0.04] pointer-events-none select-none uppercase font-ubuntu whitespace-nowrap z-0">
              Self Drive
            </div>

            {/* Category Tag */}
            <div className="relative z-10 flex items-center gap-3 mb-4 pl-1">
              <div className="w-10 h-0.5 bg-[#F2992F]" />
              <span className="font-ubuntu text-[#F2992F] text-xs font-bold tracking-[0.25em] uppercase">
                Rent Without License
              </span>
            </div>

            {/* Main Title: Matches previous component size exactly */}
            <h2 className="relative z-10 font-ubuntu text-5xl lg:text-7xl font-bold text-[#0D4168] leading-[1.1]">
              No license boats
            </h2>
          </div>

          {/* --- BOATS CAROUSEL --- */}
          <div className="flex w-full gap-8 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory items-center h-[420px]">
            {boats.map((boat, index) => (
              <div
                key={index}
                // FIXED CARD WIDTH: 282px
                className="group relative h-[400px] w-[282px] min-w-[282px] shrink-0 overflow-hidden rounded-[20px] bg-white cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 ease-[0.23,1,0.32,1] snap-center"
              >
                {/* 1. Image Layer (Cinematic Zoom on Hover) */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 2. Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D4168] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-[#0D4168]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 3. Content Layer */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  {/* Floating Content Box */}
                  <div className="relative translate-y-[50px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1]">
                    {/* Title */}
                    <h3 className="font-ubuntu text-[28px] font-medium leading-none text-white drop-shadow-md mb-3">
                      {boat.name}
                    </h3>

                    {/* Decorative Line */}
                    <div className="w-10 h-0.5 bg-[#F2992F] mb-4" />

                    {/* Icons */}
                    <div className="flex items-center gap-6 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#F2992F]" />
                        <span className="font-ubuntu text-white text-lg">
                          {boat.capacity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-[#F2992F]" />
                        <span className="font-ubuntu text-white text-lg">
                          {boat.length}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex justify-between items-center border-t border-white/20 pt-3 mb-4">
                      <div className="flex flex-col">
                        <span className="font-ubuntu text-white text-xs">
                          <span className="text-[18px] font-bold">
                            {boat.priceHalf}
                          </span>{" "}
                          / 5h
                        </span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="font-ubuntu text-white text-xs">
                          <span className="text-[18px] font-bold">
                            {boat.priceFull}
                          </span>{" "}
                          / Full
                        </span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      <button className="w-full h-10 flex items-center justify-center gap-2 rounded-full bg-white text-[#0D4168] hover:bg-[#F2992F] hover:text-white transition-colors duration-300 shadow-xl">
                        <span className="font-ubuntu font-bold text-xs uppercase tracking-wide">
                          Book Now
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- EXPENSIVE BOTTOM ACTION --- */}
          <div className="shrink-0 border-t border-[#0D4168]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <div className="flex flex-col text-center md:text-left">
              <span className="font-ubuntu text-xs font-bold text-[#F2992F] uppercase tracking-[0.2em] mb-2">
                Have a license?
              </span>
              <h3 className="font-ubuntu text-3xl lg:text-4xl text-[#0D4168] font-medium leading-tight">
                Already rented your boat?
              </h3>
            </div>

            {/* Luxury Liquid Fill Button */}
            <button className="group relative h-14 w-full md:w-auto px-10 rounded-full border border-[#0D4168] overflow-hidden bg-transparent shadow-lg shadow-[#0D4168]/5 hover:shadow-[#0D4168]/20 transition-all duration-300">
              <div className="absolute inset-0 bg-[#0D4168] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1]" />
              <span className="relative z-10 flex items-center justify-center gap-3 font-ubuntu font-bold text-[#0D4168] group-hover:text-white uppercase tracking-widest text-sm transition-colors duration-300">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
