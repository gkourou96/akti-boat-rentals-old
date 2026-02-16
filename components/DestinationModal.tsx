"use client";

import React from "react";
import Image from "next/image";

// 1. Define the shape of a single detail (Label + Value)
export interface DestinationDetail {
  label: string;
  value: string;
}

// 2. Update the Props Interface
interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name: string;
    image: string;
    // Added 'details' as an optional array to prevent crashes
    details?: DestinationDetail[];
  } | null;
}

export default function DestinationModal({
  isOpen,
  onClose,
  destination,
}: DestinationModalProps) {
  if (!destination) return null;

  // 3. SAFETY CHECK: If details are missing, default to an empty array
  const details = destination.details || [];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-[90%] max-w-md xl:max-w-none h-auto max-h-[85vh] xl:h-169.5 xl:w-300 overflow-hidden rounded-[20px] xl:rounded-[14.83px] bg-white shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MOBILE VIEW ================= */}
        <div className="block xl:hidden h-full flex-col">
          <div className="relative h-60 w-full shrink-0 overflow-hidden">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className={`object-cover transition-transform duration-2000 ease-out ${
                isOpen ? "scale-110" : "scale-100"
              }`}
            />
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm"
            >
              <Image src="/icons/reply.svg" alt="Back" width={24} height={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
            <h2 className="font-ubuntu text-[32px] font-bold leading-tight text-[#0D4168]">
              {destination.name}
            </h2>

            {/* DYNAMIC DETAILS GRID */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className="flex flex-col border-l-4 border-[#F2992F] pl-3"
                >
                  <span className="font-ubuntu text-[16px] font-bold text-[#0D4168] leading-none mb-1">
                    {detail.label}
                  </span>
                  <span className="font-open text-[14px] font-normal text-gray-600 leading-tight">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden xl:block h-full w-full relative">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className={`object-cover transition-transform duration-2000 ease-out ${
                isOpen ? "scale-110" : "scale-100"
              }`}
            />
          </div>

          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(270deg, rgba(255, 255, 255, 0.95) 56.24%, rgba(255, 255, 255, 0) 56.25%)",
            }}
          >
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

              {/* DYNAMIC DETAILS GRID (Desktop) */}
              <div className="mt-10 grid grid-cols-2 gap-x-12 gap-y-10 max-w-112.75">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex flex-col border-l-[5px] border-[#F2992F] pl-5"
                  >
                    <span className="font-ubuntu text-[20px] font-bold text-[#0D4168] mb-1.5 leading-none">
                      {detail.label}
                    </span>
                    <span className="font-open text-[18px] font-normal text-[#5A6C7C] leading-tight">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
