"use client";

import React from "react";
import Image from "next/image";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name: string;
    image: string;
  } | null;
}

export default function DestinationModal({
  isOpen,
  onClose,
  destination,
}: DestinationModalProps) {
  if (!destination) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        // RESPONSIVE CONTAINER:
        // Mobile: w-[90%] max-w-md, h-auto (max 85vh)
        // Desktop: w-300 h-169.5 (Fixed as before)
        className={`relative w-[90%] max-w-md xl:max-w-none h-auto max-h-[85vh] xl:h-169.5 xl:w-300 overflow-hidden rounded-[20px] xl:rounded-[14.83px] bg-white shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================
            MOBILE VIEW (Visible only on < xl)
           ========================================= */}
        <div className="block xl:hidden h-full flex-col">
          {/* 1. Mobile Image (Top 35%) */}
          <div className="relative h-60 w-full shrink-0">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
            />
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm"
            >
              <Image src="/icons/reply.svg" alt="Back" width={24} height={24} />
            </button>
          </div>

          {/* 2. Mobile Content (Bottom 65% - Scrollable) */}
          <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
            <h2 className="font-ubuntu text-[32px] font-bold leading-tight text-[#0D4168]">
              {destination.name}
            </h2>
            <span className="mt-1 block font-ubuntu text-[18px] font-normal text-[#F2992F]">
              Slogan or cool quote
            </span>
            <p className="font-open mt-4 text-[16px] font-normal leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique
              nullam mattis sollicitudin diam. At bibendum tortor gravida eget
              feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.
              Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies
              pulvinar quis aliquet.
            </p>

            <div className="mt-8 pb-4">
              <button className="flex h-12 w-full items-center justify-center rounded-full border-2 border-[#0D4168] bg-transparent">
                <div className="flex items-center gap-2">
                  <span className="font-ubuntu text-[20px] font-bold leading-none text-[#0D4168]">
                    Explore
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D4168"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            DESKTOP VIEW (Visible only on xl)
            *Strictly Untouched*
           ========================================= */}
        <div className="hidden xl:block h-full w-full relative">
          {/* 1. Full Size Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
            />
          </div>

          {/* 2. Right Side Gradient Overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(270deg, rgba(255, 255, 255, 0.95) 56.24%, rgba(255, 255, 255, 0) 56.25%)",
            }}
          >
            {/* 3. Content Container */}
            <div className="absolute right-0 top-0 flex h-full w-[56%] flex-col justify-center px-[17.8px] py-[17.8px] pl-12.5">
              <div className="mb-6 cursor-pointer" onClick={onClose}>
                <Image
                  src="/icons/reply.svg"
                  alt="Back"
                  width={40}
                  height={40}
                />
              </div>

              <h2 className="font-ubuntu text-[48px] font-bold leading-tight text-[#0D4168]">
                {destination.name}
              </h2>

              <span className="mt-1 font-ubuntu text-[24px] font-normal text-[#F2992F]">
                Slogan or cool quote
              </span>

              <p className="font-open mt-6 max-w-112.75 text-[18px] font-normal leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique
                nullam mattis sollicitudin diam. At bibendum tortor gravida eget
                feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.
                Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies
                pulvinar quis aliquet.
              </p>

              <div className="mt-6">
                <button className="mt-6 flex h-11.5 w-auto items-center justify-center rounded-full border-2 border-[#0D4168] bg-transparent px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-ubuntu text-[24px] font-bold leading-none text-[#0D4168]">
                      Explore
                    </span>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D4168"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
