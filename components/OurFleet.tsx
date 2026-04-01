"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

// Define the standalone Boat interface now that FleetModal is removed
export interface Boat {
  id: number;
  slug: string; // THE FIX: Added slug property
  name: string;
  category: string;
  capacity: number;
  length: string;
  description: string;
  shortDescription?: string;
  image: string;
  thumbnails?: { src: string; alt: string }[];
}

const boats: Boat[] = [
  {
    id: 1,
    slug: "deus-ribco-28", // THE FIX: Clean SEO ID
    name: "DEUS - Ribco 28",
    category: "Day Cruise",
    capacity: 8,
    length: "8.5m",
    shortDescription:
      "The dynamic and stylish RIBCO 28 powered with a 300hp Mercury Verado, designed to deliver an exceptional boating experience across the Saronic Gulf and the surrounding Greek coastline.",
    description:
      "The dynamic and stylish RIBCO 28 powered with a 300hp Mercury Verado, designed to deliver an exceptional boating experience across the Saronic Gulf and the surrounding Greek coastline. Combining performance, comfort, and elegant design, this premium vessel offers the perfect balance between speed, safety, and relaxation at sea. Perfect for Private boat tours, Saronic Gulf island hopping, VIP sea transfers, Private day cruises in Athens Riviera.",
    image: "/images/boats/ribco1-nabeiproti.jpg",
    thumbnails: [
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
    slug: "filippos-blade-7-rib", // THE FIX: Clean SEO ID
    name: "FILIPPOS – Blade 7 RIB",
    category: "Day Cruise",
    capacity: 8,
    length: "7m",
    shortDescription:
      "Enjoy a private boat tour from Athens and discover hidden beaches, crystal clear waters and beautiful islands with FILIPPOS, a powerful and modern Blade 7 RIB boat powered with a Suzuki DF200 APX - 200 HP, designed for fast, comfortable, and stylish cruising in the Saronic Gulf.",
    description:
      "Enjoy a private boat tour from Athens and discover hidden beaches, crystal clear waters and beautiful islands with FILIPPOS, a powerful and modern Blade 7 RIB boat powered with a Suzuki DF200 APX - 200 HP, designed for fast, comfortable, and stylish cruising in the Saronic Gulf. FILIPPOS comfortably accommodates up to 8 guests, making it ideal for couples, families, or small groups seeking a private boat rental experience in Greece ensures excellent stability, safety, and comfort even during high-speed navigation. Perfect for Private boat tours, Saronic Gulf island hopping, VIP sea transfers, Private day cruises in Athens Riviera.",
    image: "/images/boats/filipos.jpg",
  },
  {
    id: 3,
    slug: "axopar-28-cabin", // THE FIX: Clean SEO ID
    name: "AXOPAR 28 CABIN",
    category: "Day Cruise",
    capacity: 10,
    length: "9m",
    shortDescription:
      "Discover the perfect combination of comfort, performance, and modern Scandinavian design aboard our Axopar 28 Cabin ideal for private cruises, transfers and unforgettable sea experiences in the Saronic Gulf.",
    description:
      "Discover the perfect combination of comfort, performance, and modern Scandinavian design aboard our Axopar 28 Cabin ideal for private cruises, transfers and unforgettable sea experiences in the Saronic Gulf. The Axopar 28 Cabin is ideal for exploring nearby islands such as Aegina, Agistri, Poros, and Hydra, as well as discovering hidden beaches and crystal-clear swimming spots along the Greek coastline. Whether you are planning a luxury day cruise, a private boat tour from Athens, or a relaxing sea escape, this modern cabin boat offers the perfect balance of speed, comfort, and style.",
    image: "/images/boats/apoxar1.jpg",
    thumbnails: [
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
    shortDescription:
      "Experience the ultimate combination of performance, elegance and style. Board the Seafighter Shadow 40, powered with 2 400hp Mercury v10, a premium RIB designed for unforgettable sea adventures in the Aegean Sea.",
    description:
      "Experience the ultimate combination of performance, elegance and style. Board the Seafighter Shadow 40, powered with 2 400hp Mercury v10, a premium RIB designed for unforgettable sea adventures in the Aegean Sea. Features large sunbathing areas, spacious seating zones, and a modern deck layout designed for relaxation and socializing while enjoying the spectacular scenery with smooth cruising, and exceptional stability, allowing guests to travel quickly and comfortably between some of the most beautiful greek islands. Whether you are looking for a luxury private cruise, a VIP island transfer, or an exciting day exploring hidden beaches and crystal-clear waters, the Shadow 40 offers a premium boating experience that combines performance, comfort, and style.",
    image: "/images/boats/sea-lion.png",
    thumbnails: [
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
    id: 5,
    slug: "nimbus-t11",
    name: "NIMBUS T11",
    category: "Day Cruise",
    capacity: 11,
    length: "12m",
    shortDescription:
      "Experience the perfect blend of Scandinavian design, luxury, and performance aboard the Nimbus T11, a premium day cruiser designed for unforgettable sea experiences in the Saronic Gulf.",
    description:
      "Experience the perfect blend of Scandinavian design, luxury, and performance aboard the Nimbus T11, a premium day cruiser designed for unforgettable sea experiences in the Saronic Gulf. Powered by high-performance outboard engines, 2x300HP V8 Verado, the Nimbus T11 delivers smooth cruising, impressive speed, and outstanding stability, allowing guests to explore the Saronic Gulf islands comfortably and efficiently. This luxury day cruiser is perfect for discovering beautiful destinations near Athens such as Aegina, Agistri, Poros, and Hydra, as well as hidden beaches and crystal-clear swimming spots along the coast. Whether you are looking for a luxury private cruise, a VIP boat experience, or an exclusive island hopping adventure, the Nimbus T11 offers an exceptional boating experience that combines comfort, performance, and style.",
    image: "/images/boats/nimbus2nabeiproti.jpg",
    thumbnails: [
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
];

export default function OurFleet() {
  const onAutoplayTimeLeft = (
    s: SwiperType,
    time: number,
    progress: number,
  ) => {
    const activeSlide = s.slides[s.activeIndex];
    if (activeSlide) {
      const progressBar = activeSlide.querySelector(
        ".slide-progress-bar",
      ) as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${(1 - progress) * 100}%`;
      }
    }
  };

  const onSlideChange = (s: SwiperType) => {
    s.slides.forEach((slide) => {
      const bar = slide.querySelector(".slide-progress-bar") as HTMLElement;
      if (bar) bar.style.width = "0%";
    });
  };

  return (
    <div className="bg-[#F2EAD680]">
      <section
        id="our-fleet"
        // Preserved container styling
        className=" mx-auto max-w-360 px-4 pt-10 pb-10 xl:pl-30 xl:pr-0 xl:pt-22 xl:pb-20 relative"
      >
        {/* UPDATED HEADER SECTION */}
        <div className="w-full flex flex-col items-start xl:items-center mb-8 xl:mb-16">
          <div className="relative inline-block">
            <h2 className="font-ubuntu text-[30px] leading-tight xl:text-[44px] font-bold text-[#144B51] relative z-10 p-2.5">
              Our Fleet
            </h2>
            <div className="absolute left-2 top-8 w-25 xl:w-auto xl:left-21.25 xl:top-12.75 h-auto">
              <Image
                src="/icons/accent_orange.svg"
                alt="decoration"
                width={149}
                height={32}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* NEW SUBTITLE */}
          <p className="mt-6 max-w-3xl text-left xl:text-center text-lg xl:text-xl text-[#144B51] leading-relaxed px-2.5 font-ubuntu">
            Depart from the most easily accessible private beach resort in
            Athens - Costa Del Sol and experience the ultimate sea adventure.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, EffectCreative]}
          effect="creative"
          creativeEffect={{
            limitProgress: 2,
            prev: {
              shadow: false,
              translate: [0, 0, -1],
              opacity: 0,
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 1.07,
              spaceBetween: 28,
            },
          }}
          grabCursor={true}
          loop={true}
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={onSlideChange}
          navigation={{
            nextEl: ".custom-next-button",
          }}
          className="h-auto w-full"
        >
          {boats.map((boat, index) => (
            <SwiperSlide key={`${boat.id}-${index}`} className="bg-transparent">
              {" "}
              <div className="relative grid h-full w-full grid-cols-1 gap-8 xl:grid-cols-[500px_1fr] xl:gap-16">
                {/* Boat Image -> Clicks disabled to prevent Swiper clone routing bugs */}
                <div className="relative block w-full xl:w-125">
                  <div className="relative h-64 xl:h-125 w-full overflow-hidden rounded-[20px] bg-gray-200">
                    <div
                      className="absolute inset-0 z-10 hidden xl:block pointer-events-none transition-opacity duration-500 ease-out opacity-0 in-[.swiper-slide-next]:opacity-100"
                      style={{
                        boxShadow: "inset -520px 0px 70px -20px #f8f4ea",
                      }}
                    />

                    <Image
                      src={boat.image}
                      alt={boat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={
                        boat.image === "/images/boats/ribco1-nabeiproti.jpg"
                      }
                      className="object-cover opacity-0 transition-opacity duration-500 ease-out [.swiper-slide-active_&,.swiper-slide-next_&]:opacity-100"
                    />
                  </div>
                </div>

                {/* Boat Details Column */}
                <div className="flex flex-col h-full pt-0">
                  <h3 className="font-ubuntu text-2xl xl:text-[32px] font-bold text-[#144B51]">
                    {boat.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-ubuntu text-lg xl:text-[24px] font-normal text-[#E3891F]">
                      {boat.category}
                    </span>
                    <span className="font-ubuntu text-sm xl:text-[18px] font-normal text-[#8A9A9C]">
                      | With skipper / Bareboat
                    </span>
                  </div>

                  <div className="mt-4 xl:mt-6 flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/icons/group.svg"
                        alt="Capacity"
                        width={40}
                        height={40}
                        className="w-8 h-8 xl:w-10 xl:h-10"
                      />
                      <span className="font-open text-lg xl:text-[24px] font-normal text-[#0D4168]">
                        {boat.capacity}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/icons/straighten.svg"
                        alt="Length"
                        width={40}
                        height={40}
                        className="w-8 h-8 xl:w-10 xl:h-10"
                      />
                      <span className="font-open text-lg xl:text-[24px] font-normal text-[#0D4168]">
                        {boat.length}
                      </span>
                    </div>
                  </div>

                  <p className="font-open mt-6 max-w-112.75 h-auto text-[18px] font-normal tracking-normal text-[#144B51]">
                    {boat.shortDescription || boat.description}
                  </p>
                </div>

                {/* Next Slide Arrow Button */}
                <button className="custom-next-button absolute right-4 top-32 xl:right-18.25 xl:top-1/2 z-50 flex h-10 w-10 xl:h-12 xl:w-12 -translate-y-1/2 items-center justify-center rounded-full text-[#0D4168] cursor-pointer bg-white/80 xl:bg-transparent shadow-sm xl:shadow-none backdrop-blur-sm xl:backdrop-blur-none">
                  <Image
                    src="/icons/arrow_forward_ios.svg"
                    alt="Next slide"
                    width={21}
                    height={39}
                    className="w-4 h-8 xl:w-5.25 xl:h-9.75"
                  />
                </button>
              </div>
              {/* Progress Bar */}
              <div className="mt-8 h-1.25 w-full bg-[#F2EAD633]">
                <div
                  className="slide-progress-bar h-full bg-[#D9D9D9]"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- EXPLORE ALL BUTTON --- */}
        <div className="w-full flex justify-center mt-8 xl:-translate-x-15">
          <Link
            href="/fleet"
            className="flex h-11.5 items-center justify-center rounded-full bg-[#E3891F] px-6 xl:px-8 font-ubuntu text-lg xl:text-[24px] font-normal text-white transition-colors transition-duration-300 hover:bg-[#F2992F80] cursor-pointer whitespace-nowrap"
          >
            Explore our entire Fleet →
          </Link>
        </div>
      </section>
    </div>
  );
}
