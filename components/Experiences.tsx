"use client";

import React from "react";
import Image from "next/image";
// 1. Swiper Imports for Mobile Responsiveness
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const experiencesData = [
  {
    id: 1,
    icon: "/icons/inflatable-boat-rental.svg",
    title: (
      <>
        Inflatable <br /> Boat Rental
      </>
    ),
  },
  {
    id: 2,
    icon: "/icons/anchor.svg",
    title: (
      <>
        Skippered <br /> Charter
      </>
    ),
  },
  {
    id: 3,
    icon: "/icons/support.svg",
    title: (
      <>
        Snorkeling <br /> Exploration
      </>
    ),
  },
  {
    id: 4,
    icon: "/icons/celebration.svg",
    title: (
      <>
        Special <br /> Occasions
      </>
    ),
  },
  {
    id: 5,
    icon: "/icons/roofing.svg",
    title: (
      <>
        Villa <br /> Tenders
      </>
    ),
  },
  {
    id: 6,
    icon: "/icons/explore.svg",
    title: (
      <>
        Daily <br /> Excursions
      </>
    ),
  },
];

// Reusable Card Component
// UPDATED: Fully responsive width/height classes
const ExperienceCard = ({
  icon,
  title,
}: {
  icon: string;
  title: React.ReactNode;
}) => (
  // Mobile: w-full, h-auto aspect-square or fixed height
  // Desktop: w-[282px], h-[285.5px]
  <div className="flex h-70 w-full xl:h-[285.5px] xl:w-70.5 shrink-0 flex-col justify-center rounded-[20px] bg-[#FFFFFFE5] px-8 xl:px-8 items-center xl:items-start text-center xl:text-left">
    {/* Icon Container: 80x80px (Preserved your change) */}
    <div className="relative h-20 w-20 mb-4 xl:mb-0">
      <Image src={icon} alt="icon" fill className="object-contain" />
    </div>

    {/* Title */}
    <h3 className="pt-2.5 font-ubuntu text-[28px] xl:text-[32px] font-bold leading-tight text-[#0D4168]">
      {title}
    </h3>
  </div>
);

export default function Experiences() {
  // Helper to split data for the Desktop layout
  const topCards = experiencesData.slice(0, 2);
  const bottomCards = experiencesData.slice(2, 6);

  return (
    // CHANGED: h-auto on mobile, fixed height on desktop
    <section
      className="relative w-full h-auto xl:h-220.75 overflow-hidden bg-[#0D4168]"
      id="experiences"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/experiences/experiences-bg.jpg"
          alt="Experiences Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#0000008C]"
          style={{ mixBlendMode: "multiply" }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto h-full max-w-360">
        {/* Main Wrapper with Padding */}
        {/* Mobile: pt-16 px-6 | Desktop: pt-[144px] pl-[120px] */}
        <div className="pt-16 px-6 pb-16 xl:pb-0 xl:pt-36 xl:pl-30 xl:pr-0">
          {/* --- DESKTOP LAYOUT (Hidden on Mobile) --- */}
          <div className="hidden xl:block">
            {/* TOP ROW */}
            <div className="flex items-start gap-6">
              {/* LEFT TEXT BLOCK */}
              <div className="w-147 shrink-0">
                {/* Header */}
                <div className="h-17.75 w-full flex items-center">
                  <div className="relative inline-block">
                    <h2 className="relative z-10 font-ubuntu text-[44px] font-bold leading-none tracking-normal text-[#FFFFFF] p-2.5">
                      Experiences
                    </h2>
                    {/* Accent Icon */}
                    <div className="absolute -bottom-2.25 -right-4.75 w-37.25 h-8 -z-10">
                      <Image
                        src="/icons/experiences-orange-accent.svg"
                        alt="accent"
                        width={149}
                        height={32}
                      />
                    </div>
                  </div>
                </div>

                {/* Text Body */}
                <div className="mt-8 h-45.25 w-full">
                  <h3 className="font-ubuntu text-[32px] font-bold italic text-[#F2992F] leading-tight">
                    The Most Comprehensive Offer
                  </h3>
                  <p className="font-open pt-3 text-[24px] font-semibold italic text-[#FFFFFF] leading-tight">
                    Best boat tour in Athens! The captain was knowledgeable and
                    made sure we had a great time. The stops were perfect, and
                    the swimming spots were beautiful.
                  </p>
                </div>
              </div>

              {/* RIGHT CARDS (Top 2) */}
              {topCards.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>

            {/* BOTTOM ROW (Bottom 4) */}
            <div className="mt-11 flex gap-6">
              {bottomCards.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>
          </div>

          {/* --- MOBILE LAYOUT (Visible on Mobile) --- */}
          <div className="block xl:hidden w-full">
            {/* 1. Header (Left-aligned on Mobile) */}
            {/* CHANGED: flex justify-center -> flex justify-start */}
            <div className="flex justify-start mb-8">
              <div className="relative inline-block">
                <h2 className="relative z-10 font-ubuntu text-[32px] font-bold leading-none tracking-normal text-[#FFFFFF] p-2.5 pl-0">
                  Experiences
                </h2>
                {/* Accent Icon - Adjusted position for left alignment */}
                <div className="absolute -bottom-1 -right-4 w-30 h-6.5 -z-10">
                  <Image
                    src="/icons/experiences-orange-accent.svg"
                    alt="accent"
                    width={149}
                    height={32}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* 2. Text Content (Left-aligned on Mobile) */}
            {/* CHANGED: text-center -> text-left */}
            <div className="mb-10 text-left">
              <h3 className="font-ubuntu text-[24px] font-bold italic text-[#F2992F] leading-tight mb-4">
                The Most Comprehensive Offer
              </h3>
              <p className="font-open text-[18px] font-semibold italic text-[#FFFFFF] leading-tight opacity-90">
                Best boat tour in Athens! The captain was knowledgeable and made
                sure we had a great time.
              </p>
            </div>

            {/* 3. Mobile Swiper for Cards */}
            <Swiper
              spaceBetween={20}
              slidesPerView={1.15}
              centeredSlides={true}
              loop={true}
              className="w-full overflow-visible!"
            >
              {experiencesData.map((card) => (
                <SwiperSlide key={card.id}>
                  <ExperienceCard icon={card.icon} title={card.title} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
