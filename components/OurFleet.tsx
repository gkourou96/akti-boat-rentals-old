"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

// Import the Modal Component, but alias the Boat interface
import FleetModal, { Boat as ModalBoat } from "./FleetModal";

// Locally override the Boat interface and make thumbnails OPTIONAL (?)
export interface Boat extends Omit<ModalBoat, "thumbnails"> {
  thumbnails?: { src: string; alt: string }[];
}

const boats: Boat[] = [
  {
    id: 1,
    name: "DEUS - Ribco 28",
    category: "Day Cruise",
    capacity: 8,
    length: "8.5m",
    description:
      "The dynamic and stylish RIBCO 28 powered with a 300hp Mercury Verado, designed to deliver an exceptional boating experience across the Saronic Gulf and the surrounding Greek coastline.",
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
    name: "FILIPPOS – Blade 7 RIB",
    category: "Day Cruise",
    capacity: 8,
    length: "7m",
    description:
      "Enjoy a private boat tour from Athens and discover hidden beaches, crystal clear waters and beautiful islands with FILIPPOS, a powerful and modern Blade 7 RIB boat powered with a Suzuki DF200 APX - 200 HP, designed for fast, comfortable, and stylish cruising in the Saronic Gulf.",
    image: "/images/boats/filipos.jpg",
  },
  {
    id: 3,
    name: "AXOPAR 28 CABIN",
    category: "Day Cruise",
    capacity: 10,
    length: "9m",
    description:
      "Discover the perfect combination of comfort, performance, and modern Scandinavian design aboard our Axopar 28 Cabin ideal for private cruises, transfers and unforgettable sea experiences in the Saronic Gulf.",
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
];

export default function OurFleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);

  const [activeImages, setActiveImages] = useState<Record<number, string>>({});

  const handleOpenModal = (boat: Boat) => {
    // We pass an empty array fallback so the modal doesn't crash if it looks for thumbnails
    setSelectedBoat({ ...boat, thumbnails: boat.thumbnails || [] });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleThumbnailClick = (boatId: number, src: string) => {
    setActiveImages((prev) => ({ ...prev, [boatId]: src }));
  };

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
          {boats.map((boat) => (
            <SwiperSlide key={boat.id} className="bg-transparent">
              {" "}
              <div className="relative grid h-full w-full grid-cols-1 gap-8 xl:grid-cols-[500px_1fr] xl:gap-16">
                {/* Boat Image */}
                <div
                  className="relative w-full xl:w-125 cursor-pointer"
                  onClick={() => handleOpenModal(boat)}
                >
                  <div className="relative h-64 xl:h-125 w-full overflow-hidden rounded-[20px] bg-gray-200">
                    <div
                      className="absolute inset-0 z-10 hidden xl:block pointer-events-none transition-opacity duration-500 ease-out opacity-0 in-[.swiper-slide-next]:opacity-100"
                      style={{
                        boxShadow: "inset -520px 0px 70px -20px #f8f4ea",
                      }}
                    />

                    <Image
                      src={activeImages[boat.id] || boat.image}
                      alt={boat.name}
                      fill
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

                  {/* THE FIX: Restored original description paragraph tag */}
                  <p className="font-open mt-6 max-w-112.75 h-auto text-[18px] font-normal tracking-normal text-[#144B51]">
                    {boat.description}
                  </p>

                  {/* "See More" Button */}
                  <button
                    onClick={() => handleOpenModal(boat)}
                    className="mt-6 flex h-11.5 w-46.25 shrink-0 items-center justify-center gap-2 rounded-full bg-[#144B51] text-white transition-opacity hover:bg-[#144B5180] cursor-pointer ps-6 py-2.25 pe-[11.4px]"
                  >
                    <span className="font-ubuntu text-[24px] font-normal leading-none">
                      See More
                    </span>
                    <Image
                      src="/icons/trending_flat.svg"
                      alt="arrow"
                      width={24}
                      height={24}
                    />
                  </button>

                  {/* Thumbnails */}
                  <div className="mt-8 xl:mt-auto flex gap-4">
                    {boat.thumbnails?.map((thumb, index) => (
                      <div
                        key={index}
                        onClick={() => handleThumbnailClick(boat.id, thumb.src)}
                        className="relative h-16 w-16 xl:h-20.25 xl:w-20.25 mt-0 xl:mt-6 rounded-2xl xl:rounded-[20px] bg-gray-200 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={thumb.src}
                          alt={thumb.alt}
                          fill
                          className="object-cover opacity-0 transition-opacity duration-1200 ease-in-out [.swiper-slide-active_&,.swiper-slide-next_&]:opacity-100"
                        />
                      </div>
                    ))}
                  </div>
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

        <FleetModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          boat={selectedBoat as any}
        />
      </section>
    </div>
  );
}
