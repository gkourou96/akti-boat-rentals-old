"use client";

import React, { useState } from "react";
import Image from "next/image";
import DestinationModal from "./DestinationModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const destinations = [
  // --- ROW 1 ---
  {
    id: 1,
    name: "Aegina",
    width: 261,
    height: 305,
    image: "/images/destinations/aegina.png",
  },
  {
    id: 2,
    name: "Patroklos",
    width: 226,
    height: 305,
    image: "/images/destinations/patroklos.png",
  },
  {
    id: 3,
    name: "Moni",
    width: 379,
    height: 128,
    image: "/images/destinations/moni.png",
  },
  {
    id: 4,
    name: "Sounio",
    width: 379,
    height: 165,
    image: "/images/destinations/sounio.png",
  },

  // --- ROW 2 ---
  {
    id: 5,
    name: "Monemvasia - Kyparissi",
    width: 353,
    height: 361,
    image: "/images/destinations/monemvasia.png",
  },
  {
    id: 6,
    name: "Leonidio",
    width: 265,
    height: 148,
    image: "/images/destinations/leonidio.png",
  },
  {
    id: 7,
    name: "Athenian Riviera",
    width: 265,
    height: 201,
    image: "/images/destinations/athenian-riviera.png",
  },
  {
    id: 8,
    name: "Ydroussa - katramonisi",
    width: 248,
    height: 361,
    image: "/images/destinations/ydroussa.png",
  },

  // --- RIGHT COLUMN ---
  {
    id: 9,
    name: "Agistri",
    width: 298,
    height: 444,
    image: "/images/destinations/agistri.png",
  },
  {
    id: 10,
    name: "Arsida",
    width: 298,
    height: 222,
    image: "/images/destinations/arsida.png",
  },
];

const DestinationCard = ({
  width,
  height,
  name,
  image,
  onClick,
  className = "",
}: {
  width: number;
  height: number;
  name: string;
  image: string;
  onClick: () => void;
  className?: string;
}) => (
  <div
    onClick={onClick}
    className={`relative shrink-0 overflow-hidden rounded-[15px] bg-gray-300 cursor-pointer group ${className}`}
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    <Image
      src={image}
      alt={name}
      fill
      className="object-cover z-0 transition-transform"
    />

    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(180deg, rgba(13, 65, 104, 0) 49.04%, #0D4168 100%)",
        mixBlendMode: "multiply",
      }}
    />

    <div className="absolute bottom-0 left-0 p-4.5 w-full z-20">
      <h3 className="font-ubuntu text-[24px] font-bold leading-tight text-white wrap-break-word">
        {name}
      </h3>
    </div>
  </div>
);

export default function IdealDestinations() {
  const [selectedDestination, setSelectedDestination] = useState<
    (typeof destinations)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (dest: (typeof destinations)[0]) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#F2EAD680]">
      <section
        className="mx-auto h-auto xl:h-256.25 max-w-360 py-16 xl:py-0"
        id="destinations"
      >
        <div className="px-6 xl:px-0 xl:pt-22 xl:pl-0 w-full flex justify-start xl:justify-center">
          <div className="relative inline-block">
            <h2 className="relative z-10 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none tracking-normal text-[#0D4168] p-2.5">
              Ideal Destinations
            </h2>
            <div className="absolute -right-1.25 -bottom-2.25 w-32 xl:w-37.25 h-auto">
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

        {/* --- MOBILE VIEW: SWIPER (Visible < xl) --- */}
        {/* FIXED: Added 'overflow-hidden' here to prevent the Swiper from causing layout shifts/scrollbars */}
        <div className="block xl:hidden w-full mt-10 px-0 overflow-hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            className="w-full overflow-visible!"
          >
            {destinations.map((dest) => (
              <SwiperSlide key={dest.id}>
                <DestinationCard
                  {...dest}
                  className="w-full! h-100!"
                  onClick={() => handleCardClick(dest)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- DESKTOP VIEW: ORIGINAL GRID (Visible >= xl) --- */}
        <div className="hidden xl:block mt-16 pl-30">
          <div className="flex h-169.5 w-300 gap-3">
            {/* --- LEFT BLOCK --- */}
            <div className="flex flex-col gap-3">
              {/* ROW 1 */}
              <div className="flex gap-3">
                <DestinationCard
                  {...destinations[0]}
                  onClick={() => handleCardClick(destinations[0])}
                />
                <DestinationCard
                  {...destinations[1]}
                  onClick={() => handleCardClick(destinations[1])}
                />

                <div className="flex flex-col gap-3">
                  <DestinationCard
                    {...destinations[2]}
                    onClick={() => handleCardClick(destinations[2])}
                  />
                  <DestinationCard
                    {...destinations[3]}
                    onClick={() => handleCardClick(destinations[3])}
                  />
                </div>
              </div>

              {/* ROW 2 */}
              <div className="flex gap-3">
                <DestinationCard
                  {...destinations[4]}
                  onClick={() => handleCardClick(destinations[4])}
                />

                <div className="flex flex-col gap-3">
                  <DestinationCard
                    {...destinations[5]}
                    onClick={() => handleCardClick(destinations[5])}
                  />
                  <DestinationCard
                    {...destinations[6]}
                    onClick={() => handleCardClick(destinations[6])}
                  />
                </div>

                <DestinationCard
                  {...destinations[7]}
                  onClick={() => handleCardClick(destinations[7])}
                />
              </div>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="flex flex-col gap-3">
              <DestinationCard
                {...destinations[8]}
                onClick={() => handleCardClick(destinations[8])}
              />
              <DestinationCard
                {...destinations[9]}
                onClick={() => handleCardClick(destinations[9])}
              />
            </div>
          </div>
        </div>

        <DestinationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          destination={selectedDestination}
        />
      </section>
    </div>
  );
}
