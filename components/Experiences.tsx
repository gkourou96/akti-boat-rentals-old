"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

const experiencesData = [
  {
    id: 1,
    icon: "/icons/inflatable-boat-rental.svg",
    title: (
      <>
        {/* ADDED: hidden xl:block to <br/> so the text flows naturally side-by-side on mobile */}
        Inflatable <br className="hidden xl:block" /> Boat Rental
      </>
    ),
  },
  {
    id: 2,
    icon: "/icons/anchor.svg",
    title: (
      <>
        Skippered <br className="hidden xl:block" /> Charter
      </>
    ),
  },
  {
    id: 3,
    icon: "/icons/support.svg",
    title: (
      <>
        Snorkeling <br className="hidden xl:block" /> Exploration
      </>
    ),
  },
  {
    id: 4,
    icon: "/icons/celebration.svg",
    title: (
      <>
        Special <br className="hidden xl:block" /> Occasions
      </>
    ),
  },
  {
    id: 5,
    icon: "/icons/roofing.svg",
    title: (
      <>
        Villa <br className="hidden xl:block" /> Tenders
      </>
    ),
  },
  {
    id: 6,
    icon: "/icons/explore.svg",
    title: (
      <>
        Daily <br className="hidden xl:block" /> Excursions
      </>
    ),
  },
  {
    id: 7,
    icon: "/icons/beach_access.svg",
    title: (
      <>
        Resort <br className="hidden xl:block" /> Packages
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
  <motion.div
    initial="rest"
    whileHover="hover"
    animate="rest"
    // REVERTED: Changed w-[372px] back to w-full for full mobile responsiveness
    className="flex h-23 w-full shrink-0 cursor-pointer flex-row items-center gap-2.5 rounded-[20px] bg-[#FFF9ECE5] p-6 xl:h-[261.33px] xl:w-[384px] xl:flex-col xl:items-start xl:justify-center xl:gap-0 xl:px-8 xl:py-8"
  >
    {/* Icon Container: Mobile 44x44px | Desktop 80x80px */}
    <div className="relative h-11 w-11 shrink-0 xl:mb-4 xl:h-20 xl:w-20">
      <Image src={icon} alt="icon" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
    </div>

    <div className="flex flex-col items-start text-left">
      <h3 className="font-ubuntu text-[24px] font-bold leading-tight text-[#0D4168] xl:pt-2.5 xl:text-[32px]">
        {title}
      </h3>

      {/* Underline: Hidden on mobile to preserve the tight 92px height horizontal layout */}
      <motion.div
        variants={{
          rest: { width: 0, opacity: 0 },
          hover: { width: 64, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden h-0.75 rounded-full bg-[#F2992F] mt-3 xl:block"
      />
    </div>
  </motion.div>
);

export default function Experiences() {
  // 1. Top Row: Text + 1 card (Right aligned)
  const topCard = experiencesData.slice(0, 1);
  // 2. Middle Row: Next 3 cards
  const middleCards = experiencesData.slice(1, 4);
  // 3. Bottom Row: Last 3 cards
  const bottomCards = experiencesData.slice(4, 7);

  return (
    <section
      className="relative h-auto w-full overflow-hidden bg-[#0D4168]"
      id="services"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/experiences/experiences-bg.jpg"
          alt="Experiences Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-[#0000008C]"
          style={{ mixBlendMode: "multiply" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto h-full max-w-360">
        <div className="px-6 pb-11 pt-11 xl:pb-36 xl:pl-30 xl:pr-0 xl:pt-36">
          {/* --- DESKTOP LAYOUT --- */}
          <div className="hidden xl:block">
            {/* ROW 1: Text block + 1 Card */}
            {/* FIX: Added xl:w-300 (1200px) and justify-between to push the card to the far right edge of the grid */}
            <div className="flex items-start gap-6 xl:w-300 xl:justify-between">
              <div className="w-147 shrink-0">
                {/* Header */}
                <div className="flex h-17.75 w-full items-center">
                  <div className="relative inline-block">
                    <h2 className="relative z-10 p-2.5 font-ubuntu text-[44px] font-bold leading-none tracking-normal text-[#FFFFFF]">
                      Services
                    </h2>
                    <div className="absolute -bottom-2.25 -right-4.75 -z-10 h-8 w-37.25">
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
                  <h3 className="font-ubuntu text-[32px] font-bold italic leading-tight text-[#E3891F]">
                    The Most Comprehensive Offer
                  </h3>
                  <p className="pt-3 font-open text-[24px] font-semibold italic leading-tight text-[#FFFFFF]">
                    From island excursions and snorkeling to private charters
                    and special occasions, every experience is crafted to match
                    your perfect day at sea.
                  </p>
                </div>
              </div>

              {topCard.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>

            {/* ROW 2: 3 Cards */}
            <div className="mt-6 flex gap-6">
              {middleCards.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>

            {/* ROW 3: 3 Cards */}
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
          <div className="block w-full xl:hidden">
            <div className="mb-6 rounded-[20px] bg-[#004C55E5] p-6">
              <div className="mb-8 flex justify-start">
                <div className="relative inline-block">
                  <h2 className="relative z-10 p-2.5 pl-0 font-ubuntu text-[32px] font-bold leading-none tracking-normal text-[#FFFFFF]">
                    Services
                  </h2>
                  <div className="absolute -bottom-1.5 -right-7.5 z-0 h-6.5 w-30">
                    <Image
                      src="/icons/experiences-orange-accent.svg"
                      alt="accent"
                      width={149}
                      height={32}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="text-left">
                <h3 className="mb-4 font-ubuntu text-[32px] font-bold italic leading-tight text-[#F2992F]">
                  The Most <br></br>Comprehensive Offer
                </h3>
                <p className="font-open text-[24px] font-semibold italic leading-tight text-[#FFFFFF]">
                  From island excursions and snorkeling to private charters and
                  special occasions, every experience is crafted to match your
                  perfect day at sea.
                </p>
              </div>
            </div>

            {/* Mobile Cards Column */}
            {/* REVERTED: Removed items-center */}
            <div className="flex flex-col gap-6">
              {experiencesData.map((card) => (
                <ExperienceCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
