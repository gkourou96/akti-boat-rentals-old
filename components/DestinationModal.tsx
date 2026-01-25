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
      {/* Container: 1200x678px, Rounded 14.83px */}
      <div
        className={`relative h-169.5 w-300 overflow-hidden rounded-[14.83px] bg-white shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
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
        {/* CSS Gradient provided: 270deg (Right to Left), White until 56.24%, then Transparent */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(270deg, rgba(255, 255, 255, 0.95) 56.24%, rgba(255, 255, 255, 0) 56.25%)",
          }}
        >
          {/* 3. Content Container - Aligned to the Right */}
          {/* Padding: Top/Bottom/Right 17.8px. Estimated Left 80px based on visual balance. */}
          <div className="absolute right-0 top-0 flex h-full w-[56%] flex-col justify-center px-[17.8px] py-[17.8px] pl-12.5">
            {/* Back Arrow Icon (Visual placeholder based on screenshot) */}
            <div className="mb-6 cursor-pointer" onClick={onClose}>
              <Image src="/icons/reply.svg" alt="Back" width={40} height={40} />
            </div>

            {/* Title */}
            <h2 className="font-ubuntu text-[48px] font-bold leading-tight text-[#0D4168]">
              {destination.name}
            </h2>

            {/* Slogan */}
            <span className="mt-1 font-ubuntu text-[24px] font-normal text-[#F2992F]">
              Slogan or cool quote
            </span>

            {/* Description */}
            <p className="font-open mt-6 max-w-112.75 text-[18px] font-normal leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique
              nullam mattis sollicitudin diam. At bibendum tortor gravida eget
              feugiat. Velit morbi leo ac nunc feugiat mollis ac ullamcorper.
              Sed ipsum faucibus at felis enim malesuada. Lectus at ultricies
              pulvinar quis aliquet.
            </p>

            {/* Button */}
            <div className="mt-6">
              <button className="mt-6 flex h-11.5 w-auto items-center justify-center rounded-full border-2 border-[#0D4168] bg-transparent px-6">
                <div className="flex items-center gap-2">
                  <span className="font-ubuntu text-[24px] font-bold leading-none text-[#0D4168]">
                    Explore
                  </span>
                  {/* SVG Arrow: Centered perfectly, stroke-width 3 matches the bold text */}
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
  );
}
