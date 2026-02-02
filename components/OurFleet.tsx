"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Ubuntu, Open_Sans } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  Ruler,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

// Import Modal
import FleetModal, { Boat } from "./FleetModal";

// --- FONTS ---
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open",
});

// --- DATA ---
const boats: Boat[] = [
  {
    id: 1,
    name: "The Obsidian",
    category: "Super Sport",
    capacity: 10,
    length: "9.8m",
    description:
      "Designed for those who refuse to compromise. The Obsidian cuts through waves with surgical precision, offering an adrenaline-fueled experience.",
    description2: "",
    image: "/images/boat-1.png",
    thumbnails: ["/images/boat-3.png", "/images/boat-1.png"],
  },
  {
    id: 2,
    name: "Speed Cruiser XL",
    category: "Luxury Line",
    capacity: 8,
    length: "12.5m",
    description:
      "A floating palace designed for intimate gatherings. With Italian leather interiors and a silent propulsion system.",
    description2: "",
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
      "Agile, fierce, and stunningly beautiful. The Phantom is perfect for island hopping and reaching secluded bays.",
    description2: "",
    image: "/images/boat-3.png",
    thumbnails: ["/images/boat-3.png"],
  },
  {
    id: 4,
    name: "Poseidon’s Choice",
    category: "Family Comfort",
    capacity: 12,
    length: "14.2m",
    description:
      "The crown jewel of stability and space. Featuring a wide beam and extended sun deck for ultimate comfort.",
    description2: "",
    image: "/images/boat-4.png",
    thumbnails: ["/images/boat-4.png"],
  },
];

// --- 3D TILT CARD ---
const TiltCard = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative w-full h-full perspective-1000 cursor-pointer group z-20"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0D4168]/20 to-[#F2992F]/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 scale-110" />
      {children}
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function OurFleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleOpenModal = (boat: Boat) => {
    setSelectedBoat(boat);
    setIsModalOpen(true);
  };

  const onAutoplayTimeLeft = (
    s: SwiperType,
    time: number,
    progress: number,
  ) => {
    setProgress(1 - progress);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
    exit: { opacity: 0 },
  };

  return (
    <section
      className={`relative w-full bg-[#FFFFFF] overflow-hidden py-12 lg:py-20 flex justify-center ${ubuntu.variable} ${openSans.variable}`}
    >
      {/* Texture & Gradients */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply z-0 pointer-events-none" />

      {/* FRAME CONTAINER */}
      <div className="relative w-full max-w-[1440px] h-auto lg:h-[884px] z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 px-4 lg:px-16 items-center">
        {/* --- LEFT: CONTENT --- */}
        <div className="lg:col-span-5 flex flex-col justify-center h-auto lg:h-full relative z-20 order-2 lg:order-1 pt-8 lg:pt-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            loop={true}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="w-full h-auto"
            autoHeight={true}
            allowTouchMove={false}
          >
            {boats.map((boat) => (
              <SwiperSlide key={boat.id} className="h-auto">
                {({ isActive }) => (
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col text-left relative pb-20 lg:pb-0"
                      >
                        {/* WATERMARK */}
                        <div className="absolute top-2 lg:top-0 -left-1 text-[12vw] lg:text-[6rem] leading-none font-bold text-[#0D4168] opacity-10 pointer-events-none select-none uppercase font-ubuntu whitespace-nowrap z-0">
                          {boat.category.split(" ")[0]}
                        </div>

                        {/* Category Tag */}
                        <motion.div
                          variants={textVariants}
                          className="relative z-10 flex items-center gap-3 mb-4 lg:mb-8 mt-4 lg:mt-0"
                        >
                          <div className="w-10 h-[2px] bg-[#F2992F]" />
                          <span className="font-ubuntu text-[#F2992F] text-xs lg:text-sm font-bold tracking-[0.25em] uppercase">
                            {boat.category}
                          </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                          variants={textVariants}
                          className="relative z-10 font-ubuntu text-4xl lg:text-7xl font-bold text-[#0D4168] mb-6 lg:mb-10 leading-[1.1]"
                        >
                          {boat.name}
                        </motion.h2>

                        {/* Specs */}
                        <motion.div
                          variants={textVariants}
                          className="relative z-10 flex flex-wrap gap-4 lg:gap-6 mb-8 lg:mb-12"
                        >
                          <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0D4168]/10 p-4 lg:p-5 min-w-[120px] lg:min-w-[130px]">
                            <div className="flex items-center gap-2 text-[#F2992F] mb-2">
                              <Users size={16} />
                              <span className="font-ubuntu text-[10px] lg:text-xs font-bold uppercase tracking-wider text-[#0D4168]/60">
                                Capacity
                              </span>
                            </div>
                            <span className="font-open text-xl lg:text-2xl text-[#0D4168] font-semibold">
                              {boat.capacity}
                            </span>
                          </div>
                          <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0D4168]/10 p-4 lg:p-5 min-w-[120px] lg:min-w-[130px]">
                            <div className="flex items-center gap-2 text-[#F2992F] mb-2">
                              <Ruler size={16} />
                              <span className="font-ubuntu text-[10px] lg:text-xs font-bold uppercase tracking-wider text-[#0D4168]/60">
                                Length
                              </span>
                            </div>
                            <span className="font-open text-xl lg:text-2xl text-[#0D4168] font-semibold">
                              {boat.length}
                            </span>
                          </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                          variants={textVariants}
                          className="relative z-10 font-open text-gray-600 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12 max-w-xl pl-4 lg:pl-6 border-l-2 border-[#F2992F]/30"
                        >
                          {boat.description}
                        </motion.p>

                        {/* Button */}
                        <motion.div
                          variants={textVariants}
                          className="relative z-10"
                        >
                          <button
                            onClick={() => handleOpenModal(boat)}
                            className="group relative px-8 lg:px-10 py-3 lg:py-4 bg-transparent border-2 border-[#0D4168] overflow-hidden rounded-full w-full lg:w-auto"
                          >
                            <div className="absolute inset-0 w-full h-full bg-[#0D4168] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.25, 0.46, 0.45, 0.94]" />
                            <span className="relative z-10 flex items-center justify-center gap-3 font-ubuntu text-[#0D4168] group-hover:text-white font-bold uppercase tracking-widest text-xs lg:text-sm transition-colors">
                              Explore Vessel
                              <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </span>
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controls - FIXED: lg:bottom-24 moves it upwards on desktop */}
          <div className="absolute bottom-0 lg:bottom-16 left-0 flex items-center gap-6 lg:gap-8 pt-8 w-full z-20">
            <div className="flex gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-[#0D4168]/20 text-[#0D4168] flex items-center justify-center hover:border-[#0D4168] hover:bg-[#0D4168] hover:text-white transition-all duration-300 group active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 lg:w-14 lg:h-14 bg-[#0D4168] text-white flex items-center justify-center shadow-lg shadow-[#0D4168]/20 hover:bg-[#082a44] transition-all duration-300 group active:scale-95"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="flex-1 lg:flex-none lg:w-48 h-[3px] bg-[#0D4168]/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#F2992F]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT: IMAGE --- */}
        <div className="lg:col-span-7 w-full relative flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative w-full h-[350px] lg:h-[750px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={boats[activeIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-full"
              >
                <TiltCard onClick={() => handleOpenModal(boats[activeIndex])}>
                  <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-[#0D4168]/10 bg-white rounded-[20px]">
                    <Image
                      src={boats[activeIndex].image}
                      alt="Boat"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D4168]/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#0D4168]/20 to-transparent">
        <div className="absolute inset-0 blur-md bg-[#F2992F]/10" />
      </div>

      <FleetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boat={selectedBoat}
      />
    </section>
  );
}
