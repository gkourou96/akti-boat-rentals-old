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
    // Force a reflow to ensure transition fires on mobile
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      // Small delay to ensure browser paints the closed state first
      requestAnimationFrame(() => {
        setActiveCard(index);
      });
    }
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
      // Added transform-gpu to force hardware acceleration for smoother mobile transitions
      className="group relative w-70.5 h-98.5 overflow-hidden rounded-[20px] bg-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 shrink-0 transform-gpu"
    >
      {/* Boat Image */}
      <Image src={boat.image} alt={boat.name} fill className="object-cover" />

      {/* --- IDLE ELEMENTS --- */}

      {/* Idle Gradient: Fades out when active */}
      <div
        className={`absolute bottom-0 h-1/2 w-full bg-linear-to-t from-black/60 to-transparent transition-opacity duration-500 ease-in-out ${
          isActive ? "opacity-0" : "opacity-100 xl:group-hover:opacity-0"
        }`}
      />

      {/* Idle Title: Fades out and moves up when active */}
      <div
        className={`absolute bottom-6 left-6 z-10 transition-all duration-500 ease-in-out ${
          isActive
            ? "opacity-0 -translate-y-10"
            : "opacity-100 translate-y-0 xl:group-hover:opacity-0 xl:group-hover:-translate-y-10"
        }`}
      >
        <h3 className="font-ubuntu text-[28px] xl:text-[32px] font-medium leading-none tracking-normal text-white">
          {boat.name}
        </h3>
      </div>

      {/* HOVER STATE: Full Blue Overlay with Blend Mode */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0 xl:group-hover:opacity-100"
        }`}
        style={{
          backgroundColor: "#0D4168E5",
          mixBlendMode: "multiply",
        }}
      />

      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end p-6 transition-transform duration-500 ease-in-out transform-gpu will-change-transform ${
          isActive
            ? "translate-y-0"
            : "translate-y-full xl:group-hover:translate-y-0"
        }`}
      >
        {/* OVERLAY CONTENT */}
        <div className="flex flex-col">
          {/* TITLE (Inside Overlay) */}
          <h3 className="font-ubuntu text-[28px] xl:text-[32px] font-medium leading-none tracking-normal text-white shrink-0 -translate-y-2">
            {boat.name}
          </h3>

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
  );

  return (
    <section
      id="no-license-boats"
      className="relative w-full h-auto bg-[#F2EAD6] overflow-hidden py-16 xl:py-24"
    >
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-0 select-none opacity-50 xl:opacity-100">
        <svg
          width="927"
          height="139"
          viewBox="0 0 927 139"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[150%] max-w-none xl:w-auto xl:max-w-full hidden xl:block"
        >
          <path
            d="M92.2558 0.832707C68.0317 2.18738 43.3303 5.37565 18.0322 10.8354C11.9463 12.149 5.94001 13.7089 0 15.3783C2.02862 23.3148 4.22961 31.1828 6.62948 38.9688C32.1795 34.9869 58.6046 33.9332 84.5789 36.0952C86.6473 36.2458 92.6005 36.8205 92.2426 39.2014C67.1831 43.5254 39.9492 51.7082 14.6511 62.915C18.6421 73.9576 23.0043 84.8224 27.7112 95.4819C122.34 67.6222 235.864 139.16 319.13 166.171C419.394 198.67 554.251 211.491 658.891 184.015C661.953 183.194 669.551 181.606 670.532 179.034C597.767 172.383 530.663 146.193 470.547 115.227C459.993 109.836 438.513 99.6691 430.518 93.4567C427.23 90.9116 426.116 91.3494 430.465 88.5991C493.591 112.627 557.088 137.34 626.141 149.956C729.866 168.867 822.678 155.019 903.73 119.921C912.455 102.72 920.238 84.9455 927.026 66.6506C793.164 108.933 654.144 107.77 514.328 79.8826C375.268 52.1187 248.672 -3.79234 106.933 0.203263L92.2558 0.832707Z"
            fill="white"
          />
          <path
            d="M92.2558 0.832707C68.0317 2.18738 43.3303 5.37565 18.0322 10.8354C11.9463 12.149 5.94001 13.7089 0 15.3783C2.02862 23.3148 4.22961 31.1828 6.62948 38.9688C32.1795 34.9869 58.6046 33.9332 84.5789 36.0952C86.6473 36.2458 92.6005 36.8205 92.2426 39.2014C67.1831 43.5254 39.9492 51.7082 14.6511 62.915C18.6421 73.9576 23.0043 84.8224 27.7112 95.4819C122.34 67.6222 235.864 139.16 319.13 166.171C419.394 198.67 554.251 211.491 658.891 184.015C661.953 183.194 669.551 181.606 670.532 179.034C597.767 172.383 530.663 146.193 470.547 115.227C459.993 109.836 438.513 99.6691 430.518 93.4567C427.23 90.9116 426.116 91.3494 430.465 88.5991C493.591 112.627 557.088 137.34 626.141 149.956C729.866 168.867 822.678 155.019 903.73 119.921C912.455 102.72 920.238 84.9455 927.026 66.6506C793.164 108.933 654.144 107.77 514.328 79.8826C375.268 52.1187 248.672 -3.79234 106.933 0.203263L92.2558 0.832707Z"
            fill="#F2EAD6"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-300 px-6 xl:px-0">
        {/* HEADER */}
        <div className="w-full flex justify-start xl:justify-center mb-12 xl:mb-16">
          <div className="relative inline-block">
            <h2 className="font-ubuntu z-10 text-[32px] xl:text-[44px] font-bold leading-none tracking-normal text-[#0D4168] p-2.5 relative">
              No license boats
            </h2>
            <div className="absolute -right-2 -bottom-1 xl:-right-5.5 xl:-bottom-2.25 w-32 xl:w-37.25 h-auto -z-10">
              <Image
                src="/icons/accent_orange.svg"
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
            slidesPerView={"auto"}
            centeredSlides={false}
            loop={true}
            // FIX: Negative margin to pull swiper to screen edges
            // FIX: slidesOffsetBefore ensures first slide starts after 24px padding
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            className="w-[calc(100%+48px)] -ml-6 overflow-visible!"
          >
            {boats.map((boat, index) => (
              <SwiperSlide key={index} className="w-auto! first:ml-0">
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
        <div className="hidden xl:flex w-full justify-between gap-6">
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
