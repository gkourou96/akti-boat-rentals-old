"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

export interface Boat {
  id: number;
  slug: string;
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
    slug: "deus-ribco-28",
    name: "DEUS - Ribco 28",
    category: "Day Cruise",
    capacity: 8,
    length: "8.5m",
    shortDescription:
      "The dynamic and stylish RIBCO 28 powered with a 300hp Mercury Verado, designed to deliver an exceptional boating experience.",
    description:
      "The dynamic and stylish RIBCO 28 powered with a 300hp Mercury Verado, designed to deliver an exceptional boating experience across the Saronic Gulf and the surrounding Greek coastline. Combining performance, comfort, and elegant design, this premium vessel offers the perfect balance between speed, safety, and relaxation at sea. Perfect for Private boat tours, Saronic Gulf island hopping, VIP sea transfers, Private day cruises in Athens Riviera.",
    image: "/images/boats/ribco1-nabeiproti.jpg",
  },
  {
    id: 2,
    slug: "filippos-blade-7-rib",
    name: "FILIPPOS – Blade 7 RIB",
    category: "Day Cruise",
    capacity: 8,
    length: "7m",
    shortDescription:
      "Enjoy a private boat tour from Athens and discover hidden beaches, crystal clear waters and beautiful islands with FILIPPOS.",
    description:
      "Enjoy a private boat tour from Athens and discover hidden beaches, crystal clear waters and beautiful islands with FILIPPOS, a powerful and modern Blade 7 RIB boat powered with a Suzuki DF200 APX - 200 HP, designed for fast, comfortable, and stylish cruising in the Saronic Gulf. FILIPPOS comfortably accommodates up to 8 guests, making it ideal for couples, families, or small groups seeking a private boat rental experience in Greece ensures excellent stability, safety, and comfort even during high-speed navigation. Perfect for Private boat tours, Saronic Gulf island hopping, VIP sea transfers, Private day cruises in Athens Riviera.",
    image: "/images/boats/filipos.jpg",
  },
  {
    id: 3,
    slug: "axopar-28-cabin",
    name: "AXOPAR 28 CABIN",
    category: "Day Cruise",
    capacity: 10,
    length: "9m",
    shortDescription:
      "Discover the perfect combination of comfort, performance, and modern Scandinavian designaboard our Axopar 28 Cabin.",
    description:
      "Discover the perfect combination of comfort, performance, and modern Scandinavian design aboard our Axopar 28 Cabin ideal for private cruises, transfers and unforgettable sea experiences in the Saronic Gulf. The Axopar 28 Cabin is ideal for exploring nearby islands such as Aegina, Agistri, Poros, and Hydra, as well as discovering hidden beaches and crystal-clear swimming spots along the Greek coastline. Whether you are planning a luxury day cruise, a private boat tour from Athens, or a relaxing sea escape, this modern cabin boat offers the perfect balance of speed, comfort, and style.",
    image: "/images/boats/apoxar1.jpg",
  },
  {
    id: 4,
    slug: "sea-wolf-seafighter-shadow-40",
    name: "Sea Wolf - Seafighter Shadow 40",
    category: "Day Cruise",
    capacity: 12,
    length: "12m",
    shortDescription:
      "Experience the ultimate combination of performance, elegance and style. Board the Seafighter Shadow 40.",
    description:
      "Experience the ultimate combination of performance, elegance and style. Board the Seafighter Shadow 40, powered with 2 400hp Mercury v10, a premium RIB designed for unforgettable sea adventures in the Aegean Sea. Features large sunbathing areas, spacious seating zones, and a modern deck layout designed for relaxation and socializing while enjoying the spectacular scenery with smooth cruising, and exceptional stability, allowing guests to travel quickly and comfortably between some of the most beautiful greek islands. Whether you are looking for a luxury private cruise, a VIP island transfer, or an exciting day exploring hidden beaches and crystal-clear waters, the Shadow 40 offers a premium boating experience that combines performance, comfort, and style.",
    image: "/images/boats/sea-lion.png",
  },
  {
    id: 5,
    slug: "nimbus-t11",
    name: "NIMBUS T11",
    category: "Day Cruise",
    capacity: 11,
    length: "12m",
    shortDescription:
      "Experience the perfect blend of Scandinavian design, luxury, and performance aboard the Nimbus T11.",
    description:
      "Experience the perfect blend of Scandinavian design, luxury, and performance aboard the Nimbus T11, a premium day cruiser designed for unforgettable sea experiences in the Saronic Gulf. Powered by high-performance outboard engines, 2x300HP V8 Verado, the Nimbus T11 delivers smooth cruising, impressive speed, and outstanding stability, allowing guests to explore the Saronic Gulf islands comfortably and efficiently. This luxury day cruiser is perfect for discovering beautiful destinations near Athens such as Aegina, Agistri, Poros, and Hydra, as well as hidden beaches and crystal-clear swimming spots along the coast. Whether you are looking for a luxury private cruise, a VIP boat experience, or an exclusive island hopping adventure, the Nimbus T11 offers an exceptional boating experience that combines comfort, performance, and style.",
    image: "/images/boats/nimbus2nabeiproti.jpg",
  },
];

export default function OurFleet() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="bg-[#F2EAD680] overflow-hidden">
      <section
        id="our-fleet"
        className="mx-auto max-w-400 px-4 pt-10 pb-10 xl:px-12 xl:pt-22 xl:pb-20 relative"
      >
        {/* HEADER SECTION */}
        <div className="w-full flex flex-col items-start xl:items-center mb-10 xl:mb-16">
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

          <p className="mt-6 max-w-3xl text-left xl:text-center text-lg xl:text-xl text-[#144B51] leading-relaxed px-2.5 font-ubuntu">
            Depart from the most easily accessible private beach resort in
            Athens - Costa Del Sol and experience the ultimate sea adventure.
          </p>
        </div>

        {/* THE SWIPER LAYOUT */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, FreeMode, Pagination, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1.1}
            spaceBetween={20}
            freeMode={true}
            grabCursor={true}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            breakpoints={{
              640: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 32 },
              1400: { slidesPerView: 3.5, spaceBetween: 32 },
            }}
            className="pb-12 xl:pb-16 overflow-visible! flex items-stretch"
          >
            {boats.map((boat, idx) => {
              const isDarkCard = idx % 2 === 0;

              return (
                <SwiperSlide key={boat.id} className="h-auto">
                  {/* THE FIX: Entire card is wrapped in a Link, just like the saved services component */}
                  <Link href={`/fleet#${boat.slug}`} className="block h-full">
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`
                        group relative h-full flex flex-col rounded-[2.5rem] border transition-all duration-500 overflow-hidden cursor-pointer
                        ${
                          isDarkCard
                            ? "bg-[#144B51] border-[#1E6F73] text-white shadow-2xl shadow-[#144B51]/20"
                            : "bg-[#F9F5EB] border-[#F9F5EB] text-[#144B51] shadow-xl hover:shadow-2xl hover:shadow-[#144B51]/10"
                        }
                      `}
                    >
                      {/* Decorative Background Gradient */}
                      <div
                        className={`
                          absolute inset-0 opacity-0 transition-opacity duration-500 bg-linear-to-br pointer-events-none z-0
                          ${
                            isDarkCard
                              ? "from-[#0D4168] via-[#144B51] to-[#1E6F73] group-hover:opacity-100"
                              : "from-white via-[#F2EAD6] to-[#F9F5EB] group-hover:opacity-100"
                          }
                        `}
                      />

                      {/* Card Image Header */}
                      <div className="relative h-64 w-full shrink-0 z-10 border-b-4 border-transparent group-hover:border-[#E3891F] transition-colors duration-500">
                        <Image
                          src={boat.image}
                          alt={boat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Card Content Body */}
                      <div className="relative z-10 flex flex-col gap-5 p-6 md:p-8 grow">
                        {/* Headers */}
                        <div>
                          <h3 className="font-ubuntu text-[24px] xl:text-[28px] font-bold leading-tight tracking-normal">
                            {boat.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="font-ubuntu text-[16px] xl:text-[18px] font-normal text-[#E3891F]">
                              {boat.category}
                            </span>
                            <span
                              className={`font-ubuntu text-[14px] xl:text-[16px] font-normal ${isDarkCard ? "text-[#8A9A9C]" : "text-gray-400"}`}
                            >
                              | With skipper / Bareboat
                            </span>
                          </div>
                        </div>

                        {/* Specs Row */}
                        <div className="flex items-center gap-6 py-2">
                          <div className="flex items-center gap-2">
                            <Image
                              src="/icons/group.svg"
                              alt="Capacity"
                              width={32}
                              height={32}
                              className={`w-8 h-8 ${isDarkCard ? "brightness-0 invert" : ""}`}
                            />
                            <span className="font-open text-[20px] font-normal">
                              {boat.capacity}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/icons/straighten.svg"
                              alt="Length"
                              width={32}
                              height={32}
                              className={`w-8 h-8 ${isDarkCard ? "brightness-0 invert" : ""}`}
                            />
                            <span className="font-open text-[20px] font-normal">
                              {boat.length}
                            </span>
                          </div>
                        </div>

                        {/* Description text */}
                        <p
                          className={`font-open text-[16px] xl:text-[18px] leading-relaxed mt-auto ${isDarkCard ? "text-gray-200" : "text-[#144B51]"}`}
                        >
                          {boat.shortDescription}
                        </p>

                        {/* RESTORED: Inner Card Link Footer */}
                        <div
                          className={`pt-6 flex items-center mt-4 border-t ${isDarkCard ? "border-white/10" : "border-[#144B51]/10"}`}
                        >
                          <div
                            className={`flex items-center gap-3 group/link w-fit font-ubuntu uppercase tracking-wider text-sm font-bold transition-colors ${
                              isDarkCard
                                ? "text-[#E3891F] group-hover:text-white"
                                : "text-[#144B51] group-hover:text-[#E3891F]"
                            }`}
                          >
                            <span>View Details</span>
                            <div
                              className={`p-2 rounded-full border transition-all duration-300 ${
                                isDarkCard
                                  ? "border-[#E3891F]/30 group-hover:border-white"
                                  : "border-[#144B51]/30 group-hover:border-[#E3891F]"
                              }`}
                            >
                              {isDarkCard ? (
                                <Image
                                  src="/icons/trending_flat.svg"
                                  alt="arrow"
                                  width={16}
                                  height={16}
                                  className="transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert"
                                />
                              ) : (
                                <div
                                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                  style={{
                                    backgroundColor: "#E3891F",
                                    maskImage:
                                      "url('/icons/trending_flat.svg')",
                                    maskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* --- EXPLORE ALL BUTTON --- */}
        <div className="w-full flex justify-center mt-4 xl:mt-8 relative z-10">
          <Link
            href="/fleet"
            className="flex h-14 items-center justify-center rounded-full bg-[#E3891F] px-8 xl:px-12 font-ubuntu text-xl xl:text-[24px] font-bold text-white transition-all duration-300 hover:bg-[#F2992F] hover:shadow-xl hover:shadow-[#E3891F]/30 hover:-translate-y-1 cursor-pointer whitespace-nowrap"
          >
            Explore our entire Fleet →
          </Link>
        </div>
      </section>
    </div>
  );
}
