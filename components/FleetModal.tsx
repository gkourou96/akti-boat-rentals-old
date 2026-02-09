"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Define the shape of the boat object
export interface Boat {
  id: number;
  name: string;
  category: string;
  capacity: number;
  length: string;
  description: string;
  description2?: string;
  image: string;
  thumbnails: string[];
}

interface FleetModalProps {
  isOpen: boolean;
  onClose: () => void;
  boat: Boat | null;
}

export default function FleetModal({ isOpen, onClose, boat }: FleetModalProps) {
  // 1. STATE: Track the currently displayed main image
  const [currentImage, setCurrentImage] = useState<string>("");

  // 2. EFFECT: Reset the current image whenever a new boat is opened
  useEffect(() => {
    if (boat) {
      setCurrentImage(boat.image);
    }
  }, [boat]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ backgroundColor: "#00C6DB1A" }}
      onClick={onClose}
    >
      {/* MODAL CONTENT */}
      {/* Mobile: w-[90%], h-auto, max-h-[90vh], scrollable */}
      {/* Desktop: w-[1047px], h-[669px], fixed, no scroll */}
      <div
        className={`relative w-[90%] h-auto max-h-[90vh] overflow-y-auto xl:overflow-visible xl:h-167.25 xl:w-261.75 rounded-3xl xl:rounded-[52px] bg-white p-6 xl:p-8 shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[100vh] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {boat && (
          // Layout: Flex Column on Mobile, Row on Desktop
          <div className="relative flex flex-col xl:flex-row h-full w-full gap-6 xl:gap-8">
            {/* --- MOBILE ONLY CLOSE BUTTON --- */}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 z-50 flex xl:hidden h-8 w-8 items-center justify-center rounded-full bg-gray-100"
            >
              <div className="relative h-3 w-3">
                <Image
                  src="/icons/close-x.svg"
                  alt="Close"
                  fill
                  className="object-contain"
                />
              </div>
            </button>

            {/* LEFT COLUMN */}
            {/* Mobile: w-full | Desktop: w-[500px] */}
            <div className="flex w-full xl:w-125 flex-col gap-4 xl:gap-6 shrink-0">
              {/* Main Image */}
              {/* Mobile: h-[250px] | Desktop: h-[500px] */}
              <div className="relative h-62.5 xl:h-125 w-full shrink-0 overflow-hidden rounded-[20px] bg-gray-100">
                <Image
                  // CHANGED: Use currentImage state instead of boat.image directly
                  src={currentImage || boat.image}
                  alt={boat.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0">
                {boat.thumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentImage(thumb)}
                    // CHANGED: Removed ring and hover:opacity logic. Kept cursor-pointer.
                    className="relative h-15 w-15 xl:h-20.25 xl:w-20.25 shrink-0 overflow-hidden rounded-xl xl:rounded-2xl bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={thumb}
                      alt={`thumb-${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN CONTAINER */}
            <div className="relative h-auto w-full xl:h-151.25 xl:w-112.75">
              {/* DESKTOP CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="hidden xl:flex absolute right-0 top-0 z-50 h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              >
                <div className="relative h-[21.55px] w-[21.53px] cursor-pointer">
                  <Image
                    src="/icons/close-x.svg"
                    alt="Close"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>

              {/* CONTENT WRAPPER */}
              <div className="flex h-full flex-col pt-0 xl:pt-6">
                {/* 1. HEADER GROUP */}
                <div>
                  <h3 className="font-ubuntu text-[24px] xl:text-[32px] font-bold leading-none text-[#0D4168]">
                    {boat.name}
                  </h3>
                  <div className="mt-2 font-ubuntu text-[18px] xl:text-[24px] font-normal leading-none text-[#F2992F]">
                    {boat.category}
                  </div>
                </div>

                {/* 2. DESCRIPTION 1 */}
                <p className="mt-4 xl:mt-6 w-full xl:w-103 h-auto xl:h-37.5 font-open font-normal text-[16px] xl:text-[18px] tracking-normal text-[#0D4168]">
                  {boat.description}
                </p>

                {/* 3. SPECS ROW */}
                <div className="mt-4 xl:mt-6 flex h-10 w-full xl:w-103 items-center justify-start gap-6">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/icons/group.svg"
                      alt="Capacity"
                      width={40}
                      height={40}
                      className="w-8 h-8 xl:w-10 xl:h-10"
                    />
                    <span className="font-ubuntu text-[20px] xl:text-[24px] text-[#0D4168]">
                      {boat.capacity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/straighten.svg"
                      alt="Length"
                      width={40}
                      height={40}
                      className="w-8 h-8 xl:w-10 xl:h-10"
                    />
                    <span className="font-ubuntu text-[20px] xl:text-[24px] text-[#0D4168]">
                      {boat.length}
                    </span>
                  </div>
                </div>

                {/* 4. DESCRIPTION 2 */}
                <p className="mt-4 xl:mt-6 w-full xl:w-103 font-open text-[16px] xl:text-[18px] font-normal leading-[100%] text-[#0D4168]">
                  {boat.description2}
                </p>

                {/* 5. USEFUL INFO */}
                <div className="mt-4 xl:mt-6 pb-6 xl:pb-0">
                  <span className="font-ubuntu text-[20px] xl:text-[24px] font-normal text-[#F2992F]">
                    Useful Info here
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
