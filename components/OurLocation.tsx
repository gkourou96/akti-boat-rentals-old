"use client";

import React from "react";
import Image from "next/image";

export default function OurLocation() {
  // SETTINGS:
  // "q" parameter automatically places a Red Pin at this location
  const locationQuery = "Akti Boat Rentals";

  // 2. Zoom Level (1-21). 18 is very close (Street View level).
  const zoomLevel = 17;

  return (
    <section className="relative w-full h-201.5 bg-[#00C6DB0D] overflow-hidden">
      {/* Background Accent - Centered & Buried */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 select-none">
        <Image
          src="/icons/our-location-accent.svg"
          alt="Location decoration"
          width={1440}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Main Content Wrapper - ADDED flex to align left content and right images */}
      <div className="relative z-10 mx-auto h-full max-w-360 px-30 flex justify-between">
        {/* Left Container - UNTOUCHED */}
        <div className="relative h-167.25 w-172.5 pt-[50.5px]">
          {/* Title Container */}
          <div className="relative flex h-17.75 w-70.25 items-center">
            <h2 className="relative z-10 font-ubuntu text-[44px] font-bold leading-none text-[#0D4168]">
              Our location
            </h2>
            <div className="absolute -bottom-1 left-32 z-0 h-8 w-37.25">
              <Image
                src="/icons/accent.svg"
                alt="accent"
                width={149}
                height={32}
                className="object-contain"
              />
            </div>
          </div>

          {/* Text Container - UNTOUCHED */}
          <div className="w-2xl h-18.75 pt-8 mb-8!">
            <p className="text-[18px] font-sans font-normal">
              AktiBoat operates at the impressive Akti tou iliou / Costa Del sol
              an organized, private beach in Athens. Enjoy crystal clear waters,
              beach bars, and a complete summer experience before or after your
              boat ride.
            </p>
          </div>

          {/* MAP CONTAINER - UNTOUCHED */}
          <div className="w-172.5 h-111.5 pt-8">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="AktiBoat Location"
              className="rounded-none"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                locationQuery,
              )}&t=m&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>

          {/* LOCATION DETAILS CONTAINER - UNTOUCHED */}
          <div className="w-2xl h-8.25 pt-3 flex items-center gap-2">
            <Image
              src="/icons/explore_nearby.svg"
              alt="Location Pin"
              width={24}
              height={24}
            />
            <span className="font-open text-[24px] font-extrabold leading-none text-[#0D4168]">
              Akti tou Iliou (Costa del Sol), Alimos
            </span>
          </div>
        </div>

        {/* --- RIGHT SIDE IMAGE GRID (NEW) --- */}
        <div className="flex gap-3.5">
          {/* Column 1 */}
          <div className="flex flex-col">
            {/* Image 1: 234.79x362.5px, -mt-24, rounded-b-14.83 */}
            <div className="relative -mt-6 h-[362.5px] w-[234.79px] overflow-hidden rounded-b-[14.83px]">
              <Image
                src="/images/locations-frame-1.png"
                alt="Location View 1"
                fill
                className="object-cover"
              />
            </div>
            {/* Image 2: 234.79x362.5px, mt-12, rounded-14.83 */}
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
            {/* Image 3: 235.21x351.2px, mt-158.61, rounded-14.83 */}
            <div className="relative mt-[158.61px] h-[351.2px] w-[235.21px] overflow-hidden rounded-[14.83px]">
              <Image
                src="/images/locations-frame-3.png"
                alt="Location View 3"
                fill
                className="object-cover"
              />
            </div>
            {/* Image 4: 235.21x351.2px, mt-12, rounded-14.83 */}
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
