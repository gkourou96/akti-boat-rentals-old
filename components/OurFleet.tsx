"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// 1. Import EffectCreative
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
// 2. Import Creative Effect CSS
import "swiper/css/effect-creative";

const boats = [
  {
    id: 1,
    name: "Name of vehicle",
    category: "Category etc here",
    capacity: 10,
    length: "9.8m",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam mattis sollicitudin diam. At bibendum tortor gravida eget feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper. Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies pulvinar quis aliquet.",
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
    image: "/images/boat-4.png",
    thumbnails: ["/images/boat-4.png"],
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
    <section className="h-221 mx-auto max-w-360 bg-white pt-22 xl:ps-30">
      <div className="mb-16 relative inline-block">
        <h2 className="font-ubuntu text-[44px] font-bold text-[#0D4168] relative z-10">
          Our Fleet
        </h2>
        <div className="absolute left-18.75 -bottom-2.25 w-full h-auto">
          <Image
            src="/icons/accent.svg"
            alt="decoration"
            width={149}
            height={32}
          />
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, EffectCreative]} // Ensure EffectCreative is here
        effect="creative" // Activate Creative Effect
        creativeEffect={{
          limitProgress: 2, // Important: Allows the next slide to be visible (the peek)
          prev: {
            shadow: false,
            // [0,0,-1] means: Don't move X or Y, just sit behind (Z -1)
            translate: [0, 0, -1],
            // Fade out the previous slide
            opacity: 0,
          },
          next: {
            // ['100%', 0, 0] means: Start 100% to the right, then slide in to 0
            translate: ["100%", 0, 0],
          },
        }}
        spaceBetween={28}
        slidesPerView={1.1}
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
          <SwiperSlide key={boat.id} className="bg-white">
            {/* Added bg-white to slide to ensure clean layering during transition */}
            <div className="relative grid h-full w-full grid-cols-1 items-start gap-10 xl:grid-cols-[500px_1fr] xl:gap-16">
              {/* LEFT: Main Image Container */}
              <div className="relative w-full xl:w-125">
                <div className="relative h-125 w-full overflow-hidden rounded-[20px] bg-gray-200">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    fill
                    // Kept your internal fade logic, compatible with the new slide effect
                    className="object-cover opacity-0 transition-opacity duration-500 ease-out [.swiper-slide-active_&,_.swiper-slide-next_&]:opacity-100"
                  />
                </div>
              </div>

              {/* RIGHT: Content */}
              <div className="flex flex-col">
                <h3 className="font-ubuntu text-[32px] font-bold text-[#0D4168]">
                  {boat.name}
                </h3>

                <span className="font-ubuntu text-[24px] mt-1 font-normal text-[#F2992F]">
                  {boat.category}
                </span>

                <div className="mt-6 flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/group.svg"
                      alt="Capacity"
                      width={40}
                      height={40}
                    />
                    <span className="font-ubuntu text-[24px] font-normal text-[#0D4168]">
                      {boat.capacity}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/straighten.svg"
                      alt="Length"
                      width={40}
                      height={40}
                    />
                    <span className="font-ubuntu text-[24px] font-normal text-[#0D4168]">
                      {boat.length}
                    </span>
                  </div>
                </div>

                <p className="font-open mt-6 max-w-112.75 text-[18px] font-normal leading-none tracking-normal text-gray-600">
                  {boat.description}
                </p>

                <div className="mt-10 flex items-center justify-between xl:justify-start xl:gap-20">
                  <button className="flex h-11.5 w-40.5 items-center justify-center rounded-full border border-[#0D4168] font-ubuntu text-[24px] font-normal text-[#0D4168] transition hover:bg-[#0D4168] hover:text-white">
                    Explore →
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="mt-10 flex gap-4">
                  {boat.thumbnails.map((thumbSrc, index) => (
                    <div
                      key={index}
                      className="relative h-20.25 w-20.25 mt-6 rounded-[20px] bg-gray-200 overflow-hidden"
                    >
                      <Image
                        src={thumbSrc}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-1200 ease-in-out [.swiper-slide-active_&,_.swiper-slide-next_&]:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow Button */}
              <button className="custom-next-button absolute right-18.25 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-[#0D4168] cursor-pointer">
                <Image
                  src="/icons/arrow_forward_ios.svg"
                  alt="Next slide"
                  width={21}
                  height={39}
                />
              </button>
            </div>

            <div className="mt-8 h-1.25 w-full bg-[#FFFFFF]">
              <div
                className="slide-progress-bar h-full bg-[#D9D9D9]"
                style={{ width: "0%" }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
