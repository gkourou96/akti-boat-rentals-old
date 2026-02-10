"use client";

import React from "react";
import Image from "next/image";

export default function OurLocation() {
  // SETTINGS:
  // "q" parameter automatically places a Red Pin at this location
  const locationQuery = "Akti Boat Rentals";

  // 2. Zoom Level (1-21). 18 is very close (Street View level).
  const zoomLevel = 16;

  return (
    // CHANGED: h-auto on mobile, fixed h-201.5 on desktop
    <section
      id="our-location"
      className="relative w-full h-auto xl:h-201.5 bg-[#F2EAD6] overflow-hidden"
    >
      {/* Background Accent - Centered & Buried */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-0 select-none opacity-30 xl:opacity-100 w-full xl:w-auto">
        <Image
          src="/icons/light-brown-accent.svg"
          alt="Location decoration"
          width={1440}
          height={200}
          className="object-cover xl:object-contain w-full h-full"
        />
      </div>

      {/* Main Content Wrapper */}
      {/* CHANGED: Flex direction column (mobile) -> row (desktop), Padding px-6 (mobile) -> px-30 (desktop) */}
      <div className="relative z-10 mx-auto h-full max-w-360 px-6 py-16 xl:py-0 xl:px-30 flex flex-col xl:flex-row justify-between xl:items-start">
        {/* Left Container */}
        <div className="relative h-auto w-full xl:h-167.25 xl:w-172.5 xl:pt-[50.5px]">
          {/* --- TITLE CONTAINER (STRICTLY PRESERVED FROM YOUR SNIPPET) --- */}
          <div className="relative flex h-auto mb-6 xl:mb-0 xl:h-17.75 w-auto xl:w-70.25 items-center justify-start">
            <h2 className="relative z-10 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#0D4168]">
              Our location
            </h2>
            {/* Accent - Repositioned for mobile text size */}
            <div className="absolute -bottom-3.5 left-24 xl:left-32 xl:-bottom-1.25 z-0 h-6 w-24 xl:h-8 xl:w-37.25">
              <Image
                src="/icons/experiences-orange-accent.svg"
                alt="accent"
                width={149}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
          {/* ----------------------------------------------------------- */}

          {/* Text Container */}
          <div className="w-full xl:w-2xl h-auto xl:h-18.75 mb-8 xl:pt-8 xl:mb-8!">
            <p className="text-[16px] xl:text-[18px] font-sans font-normal text-[#0D4168]">
              AktiBoat operates at the impressive Akti tou iliou / Costa Del sol
              an organized, private beach in Athens. Enjoy crystal clear waters,
              beach bars, and a complete summer experience before or after your
              boat ride.
            </p>
          </div>

          {/* MAP CONTAINER */}
          {/* Mobile: h-[300px] | Desktop: Fixed dimensions */}
          <div className="w-full h-75 xl:w-172.5 xl:h-111.5 xl:pt-8 rounded-[20px] xl:rounded-none overflow-hidden xl:overflow-visible">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="AktiBoat Location"
              className="rounded-[20px] xl:rounded-none"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&t=m&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>

          {/* LOCATION DETAILS CONTAINER */}
          <div className="w-full xl:w-2xl h-auto xl:h-8.25 pt-6 xl:pt-3 flex items-start xl:items-center gap-2">
            <div className="shrink-0 pt-1 xl:pt-0">
              <Image
                src="/icons/explore_nearby.svg"
                alt="Location Pin"
                width={24}
                height={24}
              />
            </div>
            <span className="font-open text-[18px] xl:text-[24px] font-extrabold leading-tight xl:leading-none text-[#0D4168]">
              Akti tou Iliou (Costa del Sol), Alimos
            </span>
          </div>
        </div>

        {/* --- RIGHT SIDE IMAGE GRID --- */}
        {/* Hidden on Mobile (xl:flex) to prevent layout shift/scroll issues on small screens */}
        <div className="hidden xl:flex gap-3.5">
          {/* Column 1 */}
          <div className="flex flex-col">
            {/* Image 1 */}
            <div className="relative -mt-6 h-[362.5px] w-[234.79px] overflow-hidden rounded-b-[14.83px]">
              <Image
                src="/images/locations-frame-1.png"
                alt="Location View 1"
                fill
                className="object-cover"
              />
            </div>
            {/* Image 2 */}
            <div className="relative mt-3 h-[362.5px] w-[234.79px] overflow-hidden rounded-[14.83px]">
              <Image
                src="/images/locations-frame-2.png"
                alt="Location View 2"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            {/* Image 3 */}
            <div className="relative mt-[158.61px] h-[351.2px] w-[235.21px] overflow-hidden rounded-[14.83px]">
              <Image
                src="/images/locations-frame-3.png"
                alt="Location View 3"
                fill
                className="object-cover"
              />
            </div>
            {/* Image 4 */}
            <div className="relative mt-3 -mb-16.75 h-[351.2px] w-[235.21px] overflow-hidden rounded-[14.83px]">
              <Image
                src="/images/locations-frame-4.png"
                alt="Location View 4"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
