"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const boats = [
  { name: "Nireus 150", image: "/images/boat-1.png" },
  { name: "Skipper 160", image: "/images/boat-2.png" },
  { name: "Nireus 150", image: "/images/boat-3.png" },
  { name: "Skipper 160", image: "/images/boat-4.png" },
];

export default function NoLicenseBoats() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  // EXTRACTED: Card Component
  const BoatCard = ({
    boat,
    index,
    isActive,
    onClick,
  }: {
    boat: (typeof boats)[0];
    index: number;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="group relative w-full aspect-3/4 xl:h-100 overflow-hidden rounded-[20px] bg-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Boat Image */}
      <Image src={boat.image} alt={boat.name} fill className="object-cover" />

      {/* IDLE STATE: Bottom Gradient */}
      <div
        // CHANGED: duration-1000 -> duration-500
        className={`absolute bottom-0 h-1/2 w-full bg-linear-to-t from-black/60 to-transparent transition-opacity duration-500 ease-in-out ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* ACTIVE STATE: Blue Overlay */}
      <div
        // CHANGED: duration-1000 -> duration-500
        className={`absolute inset-0 z-10 transition-opacity duration-500 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#0D4168E5",
          mixBlendMode: "multiply",
        }}
      />

      {/* CONTENT WRAPPER */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        {/* TITLE */}
        <h3
          // CHANGED: duration-1000 -> duration-500
          className={`font-ubuntu text-[28px] xl:text-[32px] font-medium leading-none tracking-normal text-white shrink-0 transition-all duration-500 ease-in-out ${
            isActive ? "-translate-y-2" : "translate-y-0"
          }`}
        >
          {boat.name}
        </h3>

        {/* CSS GRID TRANSITION */}
        <div
          // CHANGED: duration-1000 -> duration-500
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {/* Inner content container */}
            <div className="flex flex-col pt-4">
              {/* ICONS */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/group.svg"
                    alt="people"
                    width={40}
                    height={40}
                    className="w-8 h-8"
                  />
                  <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal text-white">
                    5
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/straighten.svg"
                    alt="length"
                    width={40}
                    height={40}
                    className="w-8 h-8"
                  />
                  <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal text-white">
                    5m
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-4 font-open text-[16px] xl:text-[18px] text-white leading-tight">
                Flexible and economical, perfect for quick trips and fishing.
              </p>

              {/* PRICING */}
              <div className="mt-6 mb-2">
                <div className="flex justify-between w-full">
                  <span className="font-ubuntu text-[18px] xl:text-[20px] text-white">
                    190€ – 5h
                  </span>
                  <span className="font-ubuntu text-[18px] xl:text-[20px] text-white">
                    290€ – FULL
                  </span>
                </div>
                <div className="mt-2.5 font-ubuntu font-light text-[18px] xl:text-[20px] text-[#F2992F]">
                  Guarantee needed
                </div>
              </div>

              {/* BUTTON */}
              <button className="mt-4 flex h-12 w-full xl:w-47 items-center justify-center rounded-full border border-white bg-transparent transition-colors hover:bg-white/10 cursor-pointer">
                <span className="font-ubuntu text-[18px] xl:text-[20px] text-white pb-0.5">
                  Book Now →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="no-license-boats"
      className="relative w-full h-auto bg-[#F2EAD6] overflow-hidden py-16 xl:py-24"
    >
      {/* Background Accent */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-0 select-none opacity-50 xl:opacity-100">
        <Image
          src="/icons/no-license-boats-bg-accent.svg"
          alt="Background decoration"
          width={927}
          height={199}
          className="w-[150%] max-w-none xl:w-auto xl:max-w-full"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-310 px-6 xl:px-0">
        {/* HEADER */}
        <div className="w-full flex justify-start xl:justify-center mb-12 xl:mb-16">
          <div className="relative inline-block">
            <h2 className="font-ubuntu z-10 text-[32px] xl:text-[44px] font-bold leading-none tracking-normal text-[#0D4168] p-2.5 relative">
              No license boats
            </h2>
            <div className="absolute -right-2 -bottom-1 xl:-right-5.5 xl:-bottom-2.25 w-32 xl:w-37.25 h-auto -z-10">
              <Image
                src="/icons/no-license-accent.svg"
                alt="accent"
                width={149}
                height={32}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* 1. MOBILE VIEW: SWIPER */}
        <div className="block xl:hidden w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            loop={true}
            className="w-full overflow-visible!"
          >
            {boats.map((boat, index) => (
              <SwiperSlide key={index}>
                <BoatCard
                  boat={boat}
                  index={index}
                  isActive={activeCard === index}
                  onClick={() => handleCardClick(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 2. DESKTOP VIEW: GRID */}
        <div className="hidden xl:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {boats.map((boat, index) => (
            <BoatCard
              key={index}
              boat={boat}
              index={index}
              isActive={activeCard === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
