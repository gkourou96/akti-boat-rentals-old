"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// --- Interfaces & Data ---

interface BoatImage {
  src: string;
  alt: string;
}

interface BoatData {
  id: number;
  slug: string;
  name: string;
  category: string;
  // THE FIX: Added an optional property for the charter text
  charterOptions?: string;
  capacity: number;
  length: string;
  // Unique description for the entire boat
  description: string;
  images: BoatImage[];
}

const loremIpsum =
  "Our easy-to-drive boats that do not require a boat license are perfect for couples, families, or groups of friends. These self-drive boats let you explore three beautiful islands along the coast, swim in crystal-clear waters, relax under the sun, and discover hidden beaches at your own pace.";

// Dummy Data (Premium Fleet - 6 Boats)
const fleetData: BoatData[] = [
  {
    id: 1,
    slug: "deus-ribco-28",
    name: "DEUS - Ribco 28",
    category: "Day Cruise",
    // THE FIX: Defined for the first boat
    charterOptions: "| With skipper / Bareboat",
    capacity: 8,
    length: "8.5m",
    description:
      "The dynamic and stylish RIBCO 28 powered with a 300hp Mercury Verado, designed to deliver an exceptional boating experience across the Saronic Gulf and the surrounding Greek coastline. Combining performance, comfort, and elegant design, this premium vessel offers the perfect balance between speed, safety, and relaxation at sea. Perfect for Private boat tours, Saronic Gulf island hopping, VIP sea transfers, Private day cruises in Athens Riviera.",
    images: [
      {
        src: "/images/boats/ribco1-nabeiproti.jpg",
        alt: "Boat 1 View A",
      },
      {
        src: "/images/boats/ribco2.jpg",
        alt: "Boat 1 View B",
      },
      {
        src: "/images/boats/ribco3.jpg",
        alt: "Boat 1 View C",
      },
    ],
  },
  {
    id: 2,
    slug: "filippos-blade-7-rib",
    name: "FILIPPOS – Blade 7 RIB",
    category: "Day Cruise",
    // THE FIX: Defined for the second boat
    charterOptions: "| With skipper / Bareboat",
    capacity: 8,
    length: "7m",
    description:
      "Enjoy a private boat tour from Athens and discover hidden beaches, crystal clear waters and beautiful islands with FILIPPOS, a powerful and modern Blade 7 RIB boat powered with a Suzuki DF200 APX - 200 HP, designed for fast, comfortable, and stylish cruising in the Saronic Gulf. FILIPPOS comfortably accommodates up to 8 guests, making it ideal for couples, families, or small groups seeking a private boat rental experience in Greece ensures excellent stability, safety, and comfort even during high-speed navigation. Perfect for Private boat tours, Saronic Gulf island hopping, VIP sea transfers, Private day cruises in Athens Riviera.",
    images: [
      {
        src: "/images/boats/filipos.jpg",
        alt: "Boat 2 View A",
      },
    ],
  },
  {
    id: 3,
    slug: "axopar-28-cabin",
    name: "AXOPAR 28 CABIN",
    category: "Day Cruise",
    capacity: 10,
    length: "9m",
    // THE FIX: Omitted here
    description:
      "Discover the perfect combination of comfort, performance, and modern Scandinavian design aboard our Axopar 28 Cabin ideal for private cruises, transfers and unforgettable sea experiences in the Saronic Gulf. The Axopar 28 Cabin is ideal for exploring nearby islands such as Aegina, Agistri, Poros, and Hydra, as well as discovering hidden beaches and crystal-clear swimming spots along the Greek coastline. Whether you are planning a luxury day cruise, a private boat tour from Athens, or a relaxing sea escape, this modern cabin boat offers the perfect balance of speed, comfort, and style.",
    images: [
      {
        src: "/images/boats/apoxar1.jpg",
        alt: "Boat 3 View A",
      },
      {
        src: "/images/boats/apoxar2.jpg",
        alt: "Boat 3 View B",
      },
      {
        src: "/images/boats/apoxar3.jpg",
        alt: "Boat 3 View C",
      },
    ],
  },
  {
    id: 4,
    slug: "sea-wolf-seafighter-shadow-40",
    name: "Sea Wolf - Seafighter Shadow 40",
    category: "Day Cruise",
    capacity: 12,
    length: "12m",
    // THE FIX: Omitted here
    description:
      "Experience the ultimate combination of performance, elegance and style. Board the Seafighter Shadow 40, powered with 2 400hp Mercury v10, a premium RIB designed for unforgettable sea adventures in the Aegean Sea. Features large sunbathing areas, spacious seating zones, and a modern deck layout designed for relaxation and socializing while enjoying the spectacular scenery with smooth cruising, and exceptional stability, allowing guests to travel quickly and comfortably between some of the most beautiful greek islands. Whether you are looking for a luxury private cruise, a VIP island transfer, or an exciting day exploring hidden beaches and crystal-clear waters, the Shadow 40 offers a premium boating experience that combines performance, comfort, and style.",
    images: [
      {
        src: "/images/boats/sea-lion.png",
        alt: "Boat 4 View A",
      },
      {
        src: "/images/boats/sea-lion2.png",
        alt: "Boat 4 View B",
      },
      {
        src: "/images/boats/sea-lion3.png",
        alt: "Boat 4 View C",
      },
      {
        src: "/images/boats/sea-lion4.png",
        alt: "Boat 4 View D",
      },
      {
        src: "/images/boats/sea-lion5.png",
        alt: "Boat 4 View E",
      },
    ],
  },
  {
    id: 5,
    slug: "nimbus-t11",
    name: "NIMBUS T11",
    category: "Day Cruise",
    capacity: 11,
    length: "12m",
    // THE FIX: Omitted here
    description:
      "Experience the perfect blend of Scandinavian design, luxury, and performance aboard the Nimbus T11, a premium day cruiser designed for unforgettable sea experiences in the Saronic Gulf. Powered by high-performance outboard engines, 2x300HP V8 Verado, the Nimbus T11 delivers smooth cruising, impressive speed, and outstanding stability, allowing guests to explore the Saronic Gulf islands comfortably and efficiently. This luxury day cruiser is perfect for discovering beautiful destinations near Athens such as Aegina, Agistri, Poros, and Hydra, as well as hidden beaches and crystal-clear swimming spots along the coast. Whether you are looking for a luxury private cruise, a VIP boat experience, or an exclusive island hopping adventure, the Nimbus T11 offers an exceptional boating experience that combines comfort, performance, and style.",
    images: [
      {
        src: "/images/boats/nimbus2nabeiproti.jpg",
        alt: "Boat 5 View A",
      },
      {
        src: "/images/boats/nimbus3.jpg",
        alt: "Boat 5 View B",
      },
      {
        src: "/images/boats/nimbus1.jpg",
        alt: "Boat 5 View C",
      },
    ],
  },
];

// Sail Boats Data (3 Boats -> 1 Row)
const sailBoatsData: BoatData[] = fleetData.slice(0, 3).map((boat) => ({
  ...boat,
  id: boat.id + 10, // Unique IDs
  slug: `${boat.slug}-sail`, // Ensure unique slug if duplicating
}));

// --- BoatCard Component ---
const BoatCard = ({ boat }: { boat: BoatData }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    // THE FIX: Replaced pt-24 -mt-24 with scroll-mt-36 xl:scroll-mt-48
    // This creates a dedicated scroll offset margin so the fixed header never overlaps it
    <div
      id={boat.slug}
      className="flex w-full h-auto xl:w-96.5 flex-col items-center xl:items-start scroll-mt-22.5"
    >
      {/* Swiper Container */}
      <div className="group relative w-full h-87.5 xl:h-96.25 xl:w-96.5 overflow-hidden rounded-[20px]">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-full w-full"
        >
          {boat.images.map((img, index) => (
            <SwiperSlide key={index} className="relative h-full w-full">
              <div className="relative h-full w-full bg-gray-300">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      <div className="flex w-full flex-col px-0 xl:px-3 pb-3 pt-6 xl:pt-8">
        {/* Title */}
        <h2 className="font-ubuntu text-[24px] xl:text-[28px] font-bold leading-tight text-[#144B51]">
          {boat.name}
        </h2>
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="font-ubuntu text-lg xl:text-[24px] font-normal text-[#E3891F]">
            {boat.category}
          </span>
          {/* THE FIX: Conditionally render the charter options if they exist in the data */}
          {boat.charterOptions && (
            <span className="font-ubuntu text-lg xl:text-[18px] font-normal text-[#8A9A9C]">
              {boat.charterOptions}
            </span>
          )}
        </div>

        {/* Specs Row */}
        <div className="mt-4 flex items-center gap-6">
          {/* Capacity */}
          <div className="flex items-center gap-2 text-[#144B51]">
            <div className="relative h-8 w-8 xl:h-10 xl:w-10">
              <Image
                src="/icons/group.svg" // REPLACE WITH YOUR ICON
                alt="Capacity"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal">
              {boat.capacity}
            </span>
          </div>

          {/* Length */}
          <div className="flex items-center gap-2 text-[#144B51]">
            <div className="relative h-8 w-8 xl:h-10 xl:w-10">
              <Image
                src="/icons/straighten.svg" // REPLACE WITH YOUR ICON
                alt="Length"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal">
              {boat.length}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 font-open text-[16px] xl:text-[18px] font-normal leading-[150%] text-[#144B51]">
          {boat.description}
        </p>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const FleetPage = () => {
  // THE FIX: Enforce smooth scrolling on the HTML document as soon as this page mounts
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
    return () => {
      document.documentElement.classList.remove("scroll-smooth");
    };
  }, []);

  return (
    <main className="w-full">
      <section className="w-full bg-[#F2EAD6]">
        <div className="mx-auto max-w-360">
          <div className="mx-auto w-full px-6 pt-36 pb-16 xl:px-0 xl:pb-31 xl:pt-54.25 flex flex-col items-center">
            {/* Header */}
            <div className="relative mx-auto flex h-auto w-full flex-col items-center justify-center">
              <div className="relative flex h-auto xl:h-17.75 w-full xl:w-full items-center justify-center">
                <h1 className="relative z-10 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#144B51] text-center">
                  Our Entire Fleet
                </h1>
                <div className="absolute -bottom-2 xl:-bottom-1.5 xl:left-5 left-1/2 -translate-x-1/2 xl:translate-x-0 z-0 h-6 xl:h-7.5 w-32 xl:w-full">
                  <Image
                    src="/icons/accent_orange.svg"
                    alt="Decoration"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="mt-6 w-full text-center font-open text-lg xl:text-xl text-[#144B51] leading-relaxed px-4">
                Your day on the water starts in comfort and ends with
                unforgettable memories.
              </p>
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
    </main>
  );
};

export default FleetPage;
