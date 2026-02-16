"use client";

import React from "react";
import Image from "next/image";
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
  // --- NEW CARD (Resort Packages) ---
  {
    id: 7,
    // Icon: Lucide 'Palmtree' (Resort vibe)
    // Color: Orange (#F2992F) to match the theme
    // Size: ViewBox adjusted for scaling
    icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23F2992F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4'/%3e%3cpath d='M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3'/%3e%3cpath d='M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.81-7.42.35z'/%3e%3cpath d='M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14'/%3e%3c/svg%3e",
    title: (
      <>
        Resort <br /> Packages
      </>
    ),
  },
];

const ExperienceCard = ({
  icon,
  title,
}: {
  icon: string;
  title: React.ReactNode;
}) => (
  <div className="flex h-70 w-full xl:h-[285.5px] xl:w-70.5 shrink-0 flex-col justify-center rounded-[20px] bg-[#FFF9ECE5] px-8 xl:px-8 items-center xl:items-start text-center xl:text-left">
    {/* Icon Container: Fixed 80x80px */}
    <div className="relative h-20 w-20 mb-4 xl:mb-0">
      <Image src={icon} alt="icon" fill className="object-contain" />
    </div>

    <h3 className="pt-2.5 font-ubuntu text-[28px] xl:text-[32px] font-bold leading-tight text-[#0D4168]">
      {title}
    </h3>
  </div>
);

export default function Experiences() {
  // 1. Top Row: Text + First 2 cards
  const topCards = experiencesData.slice(0, 2);
  // 2. Middle Row: Next 4 cards (Standard Grid)
  const middleCards = experiencesData.slice(2, 6);
  // 3. Bottom Row: The new "Resort Packages" card
  const bottomCards = experiencesData.slice(6, 7);

  return (
    // UPDATED: Removed fixed height 'xl:h-220.75' and replaced with 'xl:h-auto pb-16 xl:pb-32'
    // This allows the section to grow naturally with the new row.
    <section
      className="relative w-full h-auto overflow-hidden bg-[#0D4168]"
      id="services"
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
        <div
          className="absolute inset-0 bg-[#0000008C]"
          style={{ mixBlendMode: "multiply" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto h-full max-w-360">
        {/* Added extra padding bottom (xl:pb-36) to accommodate the new row */}
        <div className="pt-16 px-6 pb-16 xl:pt-36 xl:pl-30 xl:pr-0 xl:pb-36">
          {/* --- DESKTOP LAYOUT --- */}
          <div className="hidden xl:block">
            {/* ROW 1: Text + 2 Cards */}
            <div className="flex items-start gap-6">
              <div className="w-147 shrink-0">
                {/* Header */}
                <div className="h-17.75 w-full flex items-center">
                  <div className="relative inline-block">
                    <h2 className="relative z-10 font-ubuntu text-[44px] font-bold leading-none tracking-normal text-[#FFFFFF] p-2.5">
                      Services
                    </h2>
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
                    From island excursions and snorkeling to private charters
                    and special occasions, every experience is crafted to match
                    your perfect day at sea.
                  </p>
                </div>
              </div>

              {topCards.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>

            {/* ROW 2: 4 Cards */}
            <div className="mt-11 flex gap-6">
              {middleCards.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>

            {/* ROW 3: New "Resort Packages" Card (Left Aligned) */}
            {/* Added 'mt-6' or 'mt-11' for consistent spacing. Using mt-6 to keep it tighter, or mt-11 for uniform gap. Let's use mt-6. */}
            <div className="mt-6 flex gap-6">
              {bottomCards.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>
          </div>

          {/* --- MOBILE LAYOUT --- */}
          <div className="block xl:hidden w-full">
            <div className="flex justify-start mb-8">
              <div className="relative inline-block">
                <h2 className="relative z-10 font-ubuntu text-[32px] font-bold leading-none tracking-normal text-[#FFFFFF] p-2.5 pl-0">
                  Experiences
                </h2>
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

            <div className="mb-10 text-left">
              <h3 className="font-ubuntu text-[24px] font-bold italic text-[#F2992F] leading-tight mb-4">
                The Most Comprehensive Offer
              </h3>
              <p className="font-open text-[18px] font-semibold italic text-[#FFFFFF] leading-tight opacity-90">
                From island excursions and snorkeling to private charters and
                special occasions, every experience is crafted to match your
                perfect day at sea.
              </p>
            </div>

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
