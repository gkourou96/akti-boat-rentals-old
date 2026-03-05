"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import DestinationModal from "./DestinationModal";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface DestinationDetail {
  label: string;
  value: string;
}

const destinations = [
  // --- ROW 1 ---
  {
    id: 1,
    name: "Aegina",
    width: 261,
    height: 305,
    image: "/images/destinations/aegina.png",
    details: [
      { label: "Distance", value: "18 Nautical Miles" },
      { label: "Duration", value: "35 - 45 Minutes" },
    ],
  },
  {
    id: 2,
    name: "Patroklos",
    width: 226,
    height: 305,
    image: "/images/destinations/patroklos.png",
    details: [
      { label: "Distance", value: "19 Nautical Miles" },
      { label: "Duration", value: "40 - 50 Minutes" },
    ],
  },
  {
    id: 3,
    name: "Moni",
    width: 379,
    height: 128,
    image: "/images/destinations/moni.png",
    details: [
      { label: "Distance", value: "22 Nautical Miles" },
      { label: "Duration", value: "45 - 50 Minutes" },
    ],
  },
  {
    id: 4,
    name: "Sounio",
    width: 379,
    height: 165,
    image: "/images/destinations/sounio.png",
    details: [
      { label: "Distance", value: "23 Nautical Miles" },
      { label: "Duration", value: "50 - 60 Minutes" },
    ],
  },

  // --- ROW 2 ---
  {
    id: 5,
    name: "Poros",
    width: 353,
    height: 361,
    image: "/images/destinations/poros.jpeg",
    details: [
      { label: "Distance", value: "27 Nautical Miles" },
      { label: "Duration", value: "60 - 70 Minutes" },
    ],
  },
  {
    id: 6,
    name: "Hydra",
    width: 265,
    height: 148,
    image: "/images/destinations/hydra.jpeg",
    details: [
      { label: "Distance", value: "33 Nautical Miles" },
      { label: "Duration", value: "70 - 80 Minutes" },
    ],
  },
  {
    id: 7,
    name: "Athenian Riviera",
    width: 265,
    height: 201,
    image: "/images/destinations/athenian-riviera.png",
    details: [
      { label: "Distance", value: "5-10 Nautical Miles" },
      { label: "Duration", value: "0" },
    ],
  },
  {
    id: 8,
    name: "Ydroussa - katramonisi",
    width: 248,
    height: 361,
    image: "/images/destinations/ydroussa.jpeg",
    details: [
      { label: "Distance", value: "5 Nautical Miles" },
      { label: "Duration", value: "10 - 20 Minutes" },
    ],
  },

  // --- RIGHT COLUMN ---
  {
    id: 9,
    name: "Agistri",
    width: 298,
    height: 444,
    image: "/images/destinations/agistri.jpeg",
    details: [
      { label: "Distance", value: "22 Nautical Miles" },
      { label: "Duration", value: "50 - 60 Minutes" },
    ],
  },
  {
    id: 10,
    name: "Arsida",
    width: 298,
    height: 222,
    image: "/images/destinations/arsida.png",
    details: [
      { label: "Distance", value: "15 Nautical Miles" },
      { label: "Duration", value: "30 - 40 Minutes" },
    ],
  },
];

const DestinationCard = ({
  width,
  height,
  name,
  image,
  details,
  onClick,
  className = "",
}: {
  width: number;
  height: number;
  name: string;
  image: string;
  details: DestinationDetail[];
  onClick: () => void;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isFirstEnter = useRef(true);

  // Parse and format data exactly for the design
  const durationRaw = details?.find((d) => d.label === "Duration")?.value || "";
  const distanceRaw = details?.find((d) => d.label === "Distance")?.value || "";

  const durationText =
    durationRaw === "Half Day"
      ? durationRaw
      : durationRaw.replace(" Minutes", "'").replace(/\s*-\s*/g, "'-");
  const distanceText = distanceRaw.replace(" Nautical Miles", "NM");

  // 1. Mouse Tracking Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const getMousePos = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const pos = getMousePos(e);

    if (isFirstEnter.current) {
      x.jump(pos.x);
      y.jump(pos.y);
      mouseX.jump(pos.x);
      mouseY.jump(pos.y);
      isFirstEnter.current = false;
    } else {
      x.set(pos.x);
      y.set(pos.y);
      mouseX.set(pos.x);
      mouseY.set(pos.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const pos = getMousePos(e);
    x.set(pos.x);
    y.set(pos.y);
  };

  const handleMouseLeave = () => {
    isFirstEnter.current = true;
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative shrink-0 overflow-hidden rounded-[15px] bg-gray-300 cursor-none ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover z-0 transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(20, 75, 81, 0) 49.04%, #1E6F73 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* 2. Custom "VIEW" Cursor Follower */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        className="pointer-events-none absolute left-0 top-0 z-30 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2992F] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span className="flex h-full w-full items-center justify-center font-ubuntu text-sm font-bold uppercase leading-none tracking-widest text-white">
          View
        </span>
      </motion.div>

      {/* 3. Content Container (Title & Specs) */}
      {/* MOBILE: 10px padding | DESKTOP: px-8 pt-8 pb-24px */}
      <div className="absolute bottom-0 left-0 w-full p-2.5 xl:px-8 xl:pt-8 xl:pb-6 z-20">
        <div className="overflow-hidden">
          <motion.h3 className="font-ubuntu text-[24px] font-bold capitalize text-white">
            {name}
          </motion.h3>
        </div>

        {/* --- NEW SPECS ROW --- */}
        {/* MOBILE: tighter gap, wrap if needed | DESKTOP: 16px gap, no wrap */}
        <div className="mt-1 xl:mt-2.5 flex flex-wrap xl:flex-nowrap items-center gap-2 xl:gap-4">
          {/* Time */}
          <div className="flex items-center gap-1">
            <Image
              src="/icons/schedule.svg"
              alt="Schedule"
              width={24}
              height={24}
              className="shrink-0"
            />
            {/* MOBILE: 16px font | DESKTOP: 24px font */}
            <span className="font-ubuntu text-[16px] xl:text-[20px] font-normal text-white leading-none">
              {durationText}
            </span>
          </div>

          {/* Distance */}
          <div className="flex items-center gap-1">
            <Image
              src="/icons/sailing.svg"
              alt="Sailing"
              width={24}
              height={24}
              className="shrink-0"
            />
            {/* MOBILE: 16px font | DESKTOP: 24px font */}
            <span className="font-ubuntu text-[16px] xl:text-[20px] font-normal text-white leading-none">
              {distanceText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
                src="/icons/accent_orange.svg"
                alt="accent"
                width={149}
                height={32}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW: 2-COLUMN GRID (Visible < xl) --- */}
        <div className="grid xl:hidden grid-cols-2 gap-4 w-full mt-10 px-6">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              {...dest}
              // !w-full and !h-[260px] forcefully override the inline style width/height for mobile only
              className="w-full! h-65!"
              onClick={() => handleCardClick(dest)}
            />
          ))}
        </div>

        {/* --- DESKTOP VIEW: ORIGINAL GRID (Visible >= xl) --- */}
        <div className="hidden xl:flex mt-16 w-full justify-center">
          <div className="flex h-169.5 w-300 gap-3">
            <div className="flex flex-col gap-3">
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
