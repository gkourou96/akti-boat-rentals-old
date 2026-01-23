"use client";

import React from "react";
import Image from "next/image";

// 1. Data Array
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

// Reusable component
const DestinationCard = ({
  width,
  height,
  name,
  image,
}: {
  width: number;
  height: number;
  name: string;
  image: string;
}) => (
  <div
    className="relative shrink-0 overflow-hidden rounded-[15px] bg-gray-300"
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    {/* Real Image Render */}
    <Image src={image} alt={name} fill className="object-cover z-0" />

    {/* Custom Gradient Overlay with Multiply Blend Mode */}
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(180deg, rgba(13, 65, 104, 0) 49.04%, #0D4168 100%)",
        mixBlendMode: "multiply",
      }}
    />

    {/* Title Container (z-20 to ensure text sits above the overlay) */}
    <div className="absolute bottom-0 left-0 p-[18px] w-full z-20">
      <h3 className="font-ubuntu text-[24px] font-bold leading-tight text-white break-words">
        {name}
      </h3>
    </div>
  </div>
);

export default function IdealDestinations() {
  return (
    <section className="mx-auto h-[1025px] max-w-[1440px] bg-white">
      {/* Header Container */}
      <div className="pt-[88px] pl-[120px]">
        <div className="relative inline-block">
          <h2 className="relative z-10 font-ubuntu text-[44px] font-bold leading-none tracking-normal text-[#0D4168] p-2.5">
            Ideal Destinations
          </h2>
          <div className="absolute -right-[5px] -bottom-[9px] w-37.25 h-8">
            <Image
              src="/icons/no-license-boats-accent.svg"
              alt="accent"
              width={149}
              height={32}
            />
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="mt-[64px] pl-[120px]">
        <div className="flex h-[678px] w-[1200px] gap-[12px]">
          {/* --- LEFT BLOCK --- */}
          <div className="flex flex-col gap-[12px]">
            {/* ROW 1 */}
            <div className="flex gap-[12px]">
              <DestinationCard {...destinations[0]} />
              <DestinationCard {...destinations[1]} />

              <div className="flex flex-col gap-[12px]">
                <DestinationCard {...destinations[2]} />
                <DestinationCard {...destinations[3]} />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="flex gap-[12px]">
              <DestinationCard {...destinations[4]} />

              <div className="flex flex-col gap-[12px]">
                <DestinationCard {...destinations[5]} />
                <DestinationCard {...destinations[6]} />
              </div>

              <DestinationCard {...destinations[7]} />
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col gap-[12px]">
            <DestinationCard {...destinations[8]} />
            <DestinationCard {...destinations[9]} />
          </div>
        </div>
      </div>
    </section>
  );
}
