"use client";

import React from "react";
import Image from "next/image";

// 1. Data Array
const experiencesData = [
  {
    id: 1,
    icon: "/icons/inflatable-boat-rental.svg",
    title: (
      <>
        Inflatable <br /> Boat Rental
      </>
    ),
    // Updated to match the "Designer Choice" wrap
    subtitle: (
      <>
        Rental of inflatable <br /> boats for every <br /> need
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
    subtitle: "Experienced captains for safe entertainment",
  },
  {
    id: 3,
    icon: "/icons/support.svg",
    title: (
      <>
        Snorkeling <br /> Exploration
      </>
    ),
    subtitle: "Discover the underwater world",
  },
  {
    id: 4,
    icon: "/icons/celebration.svg",
    title: (
      <>
        Special <br /> Occasions
      </>
    ),
    subtitle: "Organization of special events",
  },
  {
    id: 5,
    icon: "/icons/roofing.svg",
    title: (
      <>
        Villa <br /> Tenders
      </>
    ),
    subtitle: "Transportation to and from your villas",
  },
  {
    id: 6,
    icon: "/icons/explore.svg",
    title: (
      <>
        Daily <br /> Excursions
      </>
    ),
    subtitle: "Organized sea excursions",
  },
];

// Reusable Card Component
const ExperienceCard = ({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) => (
  <div className="flex h-[275.5px] w-[282px] shrink-0 flex-col justify-center rounded-[20px] bg-[#FFFFFFE5] px-[32px]">
    {/* Icon Container: 48x48px */}
    <div className="relative h-[48px] w-[48px]">
      <Image src={icon} alt="icon" fill className="object-contain" />
    </div>

    {/* Title: Ubuntu 700 32px #0D4168 - PT 10px */}
    <h3 className="pt-[10px] font-ubuntu text-[32px] font-bold leading-tight text-[#0D4168]">
      {title}
    </h3>

    {/* Subtitle: Ubuntu 400 24px #F2992F - PT 10px */}
    <div className="pt-[10px] font-ubuntu text-[24px] font-normal leading-tight text-[#F2992F] break-words">
      {subtitle}
    </div>
  </div>
);

export default function Experiences() {
  // Helper to split data for the layout
  const topCards = experiencesData.slice(0, 2);
  const bottomCards = experiencesData.slice(2, 6);

  return (
    <section className="relative w-full h-[883px] overflow-hidden">
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
          className="absolute inset-0 bg-[#0D4168E5]"
          style={{ mixBlendMode: "multiply" }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto h-full max-w-[1440px]">
        {/* Main Wrapper with Padding */}
        <div className="pt-[144px] pl-[120px]">
          {/* --- TOP ROW: Left Content Column + 2 Cards --- */}
          <div className="flex items-start gap-[24px]">
            {/* LEFT BLOCK: Width 588px */}
            <div className="w-[588px] shrink-0">
              {/* 1. Header Container: Fixed 71px Height (from Screenshot 1.jpg) */}
              <div className="h-[71px] w-full flex items-center">
                <div className="relative inline-block">
                  <h2 className="relative z-10 font-ubuntu text-[44px] font-bold leading-none tracking-normal text-[#FFFFFF] p-2.5">
                    Experiences
                  </h2>
                  {/* Accent Icon */}
                  <div className="absolute -bottom-[9px] -right-[19px] w-[149px] h-[32px] -z-10">
                    <Image
                      src="/icons/experiences-orange-accent.svg"
                      alt="accent"
                      width={149}
                      height={32}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Text Container: Fixed 181px Height with 32px Margin Top (from Screenshot 2.jpg) */}
              <div className="mt-[32px] h-[181px] w-full">
                {/* H3 Title */}
                <h3 className="font-ubuntu text-[32px] font-bold italic text-[#F2992F] leading-tight">
                  The Most Comprehensive Offer
                </h3>

                {/* Paragraph: 12px Top Padding (from Screenshot 3.jpg) */}
                <p className="font-open pt-[12px] text-[24px] font-semibold italic text-[#FFFFFF] leading-tight">
                  Best boat tour in Athens! The captain was knowledgeable and
                  made sure we had a great time. The stops were perfect, and the
                  swimming spots were beautiful.
                </p>
              </div>
            </div>

            {/* RIGHT BLOCK: Top 2 Cards */}
            {topCards.map((card) => (
              <ExperienceCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>

          {/* --- BOTTOM ROW: 4 Cards (Margin Top 44px) --- */}
          <div className="mt-[44px] flex gap-[24px]">
            {bottomCards.map((card) => (
              <ExperienceCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
