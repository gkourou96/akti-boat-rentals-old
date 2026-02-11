"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// --- Interfaces & Data ---

interface BoatImage {
  src: string;
  alt: string;
  // Unique description for this specific image slide
  description: string;
}

interface BoatData {
  id: number;
  name: string;
  category: string;
  capacity: number;
  length: string;
  images: BoatImage[];
}

const loremIpsum =
  "Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam mattis sollicitudin diam. At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper. Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.";

// Dummy Data (Premium Fleet - 6 Boats)
const fleetData: BoatData[] = [
  {
    id: 1,
    name: "Name of vehicle",
    category: "Category etc here",
    capacity: 10,
    length: "9.8m",
    images: [
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 1 View A",
        description: loremIpsum,
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 1 View B",
        description:
          "At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.",
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 1 View C",
        description:
          "Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.",
      },
    ],
  },
  {
    id: 2,
    name: "Speed Cruiser",
    category: "Luxury Class",
    capacity: 8,
    length: "12.5m",
    images: [
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 2 View A",
        description: loremIpsum,
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 2 View B",
        description: "Variation of description for the second slide.",
      },
    ],
  },
  {
    id: 3,
    name: "Family Pontoon",
    category: "Leisure",
    capacity: 12,
    length: "10m",
    images: [
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 3 View A",
        description: loremIpsum,
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 3 View B",
        description: "Another description variation.",
      },
    ],
  },
  {
    id: 4,
    name: "Ocean Runner",
    category: "Sport",
    capacity: 6,
    length: "11m",
    images: [
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 4 View A",
        description: loremIpsum,
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 4 View B",
        description: "Short description here.",
      },
    ],
  },
  {
    id: 5,
    name: "Classic Yacht",
    category: "Premium",
    capacity: 14,
    length: "15m",
    images: [
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 5 View A",
        description: loremIpsum,
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 5 View B",
        description: "Interior view description.",
      },
    ],
  },
  {
    id: 6,
    name: "Fishing Pro",
    category: "Utility",
    capacity: 4,
    length: "8m",
    images: [
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 6 View A",
        description: loremIpsum,
      },
      {
        src: "/images/boat-3.jpg",
        alt: "Boat 6 View B",
        description: "Rear deck description.",
      },
    ],
  },
];

// Sail Boats Data (3 Boats -> 1 Row)
const sailBoatsData: BoatData[] = fleetData.slice(0, 3).map((boat) => ({
  ...boat,
  id: boat.id + 10, // Unique IDs
}));

// --- BoatCard Component ---
const BoatCard = ({ boat }: { boat: BoatData }) => {
  // State to track the currently active slide index
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Get the data for the current slide to display below
  const activeImageData = boat.images[activeIndex];

  return (
    // Column Container:
    // Mobile: w-full h-auto (Responsive)
    // Desktop: w-96.5 h-186.25 (Fixed)
    <div className="flex w-full h-auto xl:h-186.25 xl:w-96.5 flex-col items-center xl:items-start">
      {/* Swiper Container */}
      {/* Mobile: w-full h-[300px] or aspect square */}
      {/* Desktop: h-96.25 w-96.5 */}
      <div className="group relative w-full h-87.5 xl:h-96.25 xl:w-96.5 overflow-hidden rounded-[20px]">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {boat.images.map((img, index) => (
            <SwiperSlide key={index} className="relative h-full w-full">
              {/* Main Boat Image Placeholder */}
              <div className="relative h-full w-full bg-gray-300">
                {/* Replace src with your actual image paths */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows (Inside Slide) */}
        {boat.images.length > 1 && (
          <>
            {/* Prev Arrow: 48x48 */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
              aria-label="Previous Image"
            >
              <div className="relative">
                <Image
                  src="/icons/arrow_left_ios.svg" // REPLACE WITH YOUR ICON
                  alt="Prev"
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 xl:w-12 xl:h-12"
                />
              </div>
            </button>

            {/* Next Arrow: 48x48 */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
              aria-label="Next Image"
            >
              <div className="relative">
                <Image
                  src="/icons/arrow_right_ios.svg" // REPLACE WITH YOUR ICON
                  alt="Next"
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 xl:w-12 xl:h-12"
                />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Info Block */}
      {/* Mobile: w-full px-0 */}
      {/* Desktop: px-3 */}
      <div className="flex w-full flex-col px-0 xl:px-3 pb-3 pt-6 xl:pt-8">
        {/* Title */}
        <h2 className="font-ubuntu text-[24px] xl:text-[28px] font-bold leading-tight text-[#0D4168]">
          {boat.name}
        </h2>
        {/* Category */}
        <span className="mt-1 font-ubuntu text-[20px] xl:text-[24px] text-[#E3891F]">
          {boat.category}
        </span>

        {/* Specs Row */}
        <div className="mt-4 flex items-center gap-6">
          {/* Capacity */}
          <div className="flex items-center gap-2 text-[#0D4168]">
            {/* Icon Placeholder */}
            <div className="relative h-8 w-8 xl:h-10 xl:w-10">
              <Image
                src="/icons/group.svg" // REPLACE WITH YOUR ICON
                alt="Capacity"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal">
              {boat.capacity}
            </span>
          </div>

          {/* Length */}
          <div className="flex items-center gap-2 text-[#0D4168]">
            {/* Icon Placeholder */}
            <div className="relative h-8 w-8 xl:h-10 xl:w-10">
              <Image
                src="/icons/straighten.svg" // REPLACE WITH YOUR ICON
                alt="Length"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal">
              {boat.length}
            </span>
          </div>
        </div>

        {/* Description - Changes based on active index */}
        <p className="mt-4 line-clamp-6 font-open text-[16px] xl:text-[18px] font-normal leading-[150%] text-[#0D4168]">
          {activeImageData.description}
        </p>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const FleetPage = () => {
  return (
    <main className="w-full">
      {/* =========================================
          SECTION 1: PREMIUM FLEET
          Background: #F2EAD6
          Rows: 2
          Desktop Top Padding: 217px (Clears Navbar)
         ========================================= */}
      <section className="w-full bg-[#F2EAD6]">
        <div className="mx-auto max-w-360">
          {/* CHANGED: Mobile top padding increased to pt-[144px] to match visual gap of "Sail Boats" + Navbar offset */}
          <div className="mx-auto w-full xl:w-360 px-6 pt-36 pb-16 xl:px-30 xl:pb-31 xl:pt-54.25">
            {/* Header */}
            <div className="relative mx-auto flex h-auto xl:h-17.75 w-full xl:w-82 items-center justify-center">
              <h1 className="relative z-10 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#0D4168] text-center">
                Premium Fleet
              </h1>
              <div className="absolute -bottom-2 xl:-bottom-2.5 xl:left-5 left-1/2 -translate-x-1/2 xl:translate-x-0 z-0 h-6 xl:h-7.5 w-32 xl:w-full">
                <Image
                  src="/icons/accent.svg"
                  alt="Decoration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="mt-12 xl:mt-22 w-full xl:w-300">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-12 xl:gap-y-16 justify-items-center">
                {fleetData.map((boat) => (
                  <BoatCard key={boat.id} boat={boat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SAIL BOATS
          Background: bg-white
          Rows: 1 (3 items)
          Desktop Top Padding: 88px (Standard spacing, no navbar clear needed)
         ========================================= */}
      <section className="w-full bg-[#F2EAD680]">
        <div className="mx-auto max-w-360">
          {/* Sail Boats Mobile Padding: py-16 (64px) */}
          <div className="mx-auto w-full xl:w-360 px-6 py-16 xl:px-30 xl:py-22">
            {/* Header */}
            <div className="relative mx-auto flex h-auto xl:h-17.75 w-full xl:w-82 items-center justify-center">
              <h1 className="relative z-10 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#0D4168] text-center">
                Sail Boats
              </h1>
              <div className="absolute -bottom-2 xl:-bottom-2.5 xl:left-5 left-1/2 -translate-x-1/2 xl:translate-x-0 z-0 h-6 xl:h-7.5 w-32 xl:w-full">
                <Image
                  src="/icons/accent.svg"
                  alt="Decoration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="mt-12 xl:mt-22 w-full xl:w-300">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-12 xl:gap-y-16 justify-items-center">
                {sailBoatsData.map((boat) => (
                  <BoatCard key={boat.id} boat={boat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FleetPage;
