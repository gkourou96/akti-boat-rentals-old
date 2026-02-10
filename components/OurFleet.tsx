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

// Import the new Modal Component
import FleetModal, { Boat } from "./FleetModal";

const boats: Boat[] = [
  {
    id: 1,
    name: "Name of vehicle",
    category: "Category etc here",
    capacity: 10,
    length: "9.8m",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam mattis sollicitudin diam. At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper. Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.",
    description2:
      "At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.",
    image: "/images/boat-1.png",
    thumbnails: [
      "/images/boat-3.png",
      "/images/boat-1.png",
      "/images/boat-3.png",
    ],
  },
  {
    id: 2,
    name: "Speed Cruiser XL",
    category: "Luxury Line",
    capacity: 8,
    length: "12.5m",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam mattis sollicitudin diam. At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper. Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.",
    description2:
      "At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.",
    image: "/images/boat-2.png",
    thumbnails: ["/images/boat-4.png"],
  },
  {
    id: 3,
    name: "Aegean Phantom",
    category: "Sport Series",
    capacity: 6,
    length: "8.5m",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam mattis sollicitudin diam. At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper. Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.",
    description2:
      "At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.",
    image: "/images/boat-3.png",
    thumbnails: [
      "/images/boat-3.png",
      "/images/boat-1.png",
      "/images/boat-3.png",
    ],
  },
  {
    id: 4,
    name: "Poseidon’s Choice",
    category: "Family Comfort",
    capacity: 12,
    length: "14.2m",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam mattis sollicitudin diam. At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper. Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.",
    description2:
      "At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.",
    image: "/images/boat-4.png",
    thumbnails: ["/images/boat-4.png"],
  },
];

export default function OurFleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);

  const handleOpenModal = (boat: Boat) => {
    setSelectedBoat(boat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <div className="w-full xl:flex xl:justify-center mb-8 xl:mb-16">
          <div className="relative inline-block">
            <h2 className="font-ubuntu text-[30px] leading-tight xl:text-[44px] font-bold text-[#0D4168] relative z-10 p-2.5">
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
              <div className="relative grid h-full w-full grid-cols-1 gap-8 xl:grid-cols-[500px_1fr] xl:gap-16">
                {/* Boat Image */}
                <div
                  className="relative w-full xl:w-125 cursor-pointer"
                  onClick={() => handleOpenModal(boat)}
                >
                  <div className="relative h-64 xl:h-125 w-full overflow-hidden rounded-[20px] bg-gray-200">
                    <Image
                      src={boat.image}
                      alt={boat.name}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 ease-out [.swiper-slide-active_&,.swiper-slide-next_&]:opacity-100"
                    />
                  </div>
                </div>

                {/* Boat Details Column */}
                {/* CHANGED: Removed xl:pt-22 so text starts flush at the top. Kept h-125 to fill height. */}
                <div className="flex flex-col h-auto pt-0 xl:h-125">
                  <h3 className="font-ubuntu text-2xl xl:text-[32px] font-bold text-[#0D4168]">
                    {boat.name}
                  </h3>
                  <span className="font-ubuntu text-lg xl:text-[24px] mt-1 font-normal text-[#F2992F]">
                    {boat.category}
                  </span>

                  <div className="mt-4 xl:mt-6 flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/icons/group.svg"
                        alt="Capacity"
                        width={40}
                        height={40}
                        className="w-8 h-8 xl:w-10 xl:h-10"
                      />
                      <span className="font-ubuntu text-lg xl:text-[24px] font-normal text-[#0D4168]">
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
                      <span className="font-ubuntu text-lg xl:text-[24px] font-normal text-[#0D4168]">
                        {boat.length}
                      </span>
                    </div>
                  </div>
                  <p className="font-open mt-6 max-w-112.75 text-[18px] font-normal tracking-normal text-[#144B51]">
                    {boat.description}
                  </p>

                  {/* ADDED: "See More" Button */}
                  {/* Size: 185x46px | Font: Ubuntu 24px Normal | Color: #144B51 */}
                  <button
                    onClick={() => handleOpenModal(boat)}
                    className="mt-6 flex h-11.5 w-46.25 items-center justify-center gap-2 rounded-full bg-[#144B51] text-white transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    <span className="font-ubuntu text-[24px] font-normal leading-none pb-1">
                      See More
                    </span>
                    <svg
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5"
                    >
                      <path
                        d="M1 6H17M17 6L12 1M17 6L12 11"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Thumbnails */}
                  {/* Preserved xl:mt-auto to ensure they sit flush at the bottom of the container */}
                  <div className="mt-8 xl:mt-auto flex gap-4">
                    {boat.thumbnails.map((thumbSrc, index) => (
                      <div
                        key={index}
                        className="relative h-16 w-16 xl:h-20.25 xl:w-20.25 mt-0 xl:mt-6 rounded-2xl xl:rounded-[20px] bg-gray-200 overflow-hidden"
                      >
                        <Image
                          src={thumbSrc}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover opacity-0 transition-opacity duration-1200 ease-in-out [.swiper-slide-active_&,.swiper-slide-next_&]:opacity-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Slide Arrow Button */}
                <button className="custom-next-button absolute right-4 top-32 xl:right-18.25 xl:top-1/2 z-10 flex h-10 w-10 xl:h-12 xl:w-12 -translate-y-1/2 items-center justify-center rounded-full text-[#0D4168] cursor-pointer bg-white/80 xl:bg-transparent shadow-sm xl:shadow-none backdrop-blur-sm xl:backdrop-blur-none">
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
              <div className="mt-8 h-1.25 w-full bg-[#FFFFFF]">
                <div
                  className="slide-progress-bar h-full bg-[#D9D9D9]"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- EXPLORE ALL BUTTON --- */}
        <div className="w-full flex justify-center mt-8">
          <Link
            href="/fleet"
            className="flex h-11.5 items-center justify-center rounded-full border border-[#0D4168] px-6 xl:px-8 font-ubuntu text-lg xl:text-[24px] font-normal text-[#0D4168] transition-colors hover:bg-[#0D4168] hover:text-white cursor-pointer whitespace-nowrap"
          >
            Explore our entire Fleet →
          </Link>
        </div>

        <FleetModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          boat={selectedBoat}
        />
      </section>
    </div>
  );
}
