"use client";

import Image from "next/image";

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
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      // CHANGED: Replaced bg-black/60 backdrop-blur-sm with your specific hex color
      style={{ backgroundColor: "#00C6DB1A" }}
      onClick={onClose} // Close on backdrop click
    >
      {/* MODAL CONTENT: 1047x669px */}
      <div
        className={`relative h-[669px] w-[1047px] rounded-[52px] bg-white p-[32px] shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[100vh] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {boat && (
          <div className="relative flex h-full w-full gap-8">
            {/* LEFT COLUMN: 500px width */}
            <div className="flex w-[500px] flex-col gap-6">
              {/* Main Image: Fixed height 500px */}
              {/* Added shrink-0 to guarantee it stays 500px */}
              <div className="relative h-[500px] w-full shrink-0 overflow-hidden rounded-[20px] bg-gray-100">
                <Image
                  src={boat.image}
                  alt={boat.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2">
                {boat.thumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    // h-[81px] to fit the 605px available vertical space perfectly
                    className="relative h-[81px] w-[81px] overflow-hidden rounded-[16px] bg-gray-100"
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

            {/* RIGHT COLUMN CONTAINER: 451px width x 605px height (Fill) */}
            <div className="relative h-[605px] w-[451px]">
              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute right-0 top-0 z-50 flex h-[48px] w-[48px] items-center justify-center rounded-full transition-opacity hover:opacity-70"
              >
                {/* SAVED CHANGE: Added cursor-pointer */}
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
              <div className="flex h-full flex-col pt-6">
                {/* 1. HEADER GROUP */}
                <div>
                  <h3 className="font-ubuntu text-[32px] font-bold leading-none text-[#0D4168]">
                    {boat.name}
                  </h3>
                  <div className="mt-2 font-ubuntu text-[24px] font-normal leading-none text-[#F2992F]">
                    {boat.category}
                  </div>
                </div>

                {/* 2. DESCRIPTION 1 */}
                <p className="mt-6 w-[412px] h-[150px] font-open font-normal text-[18px] tracking-normal text-[#0D4168]">
                  {boat.description}
                </p>

                {/* 3. SPECS ROW */}
                {/* SAVED CHANGE: justify-start gap-6 */}
                <div className="mt-6 flex h-[40px] w-[412px] items-center justify-start gap-6">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/icons/group.svg"
                      alt="Capacity"
                      width={40}
                      height={40}
                    />
                    <span className="font-ubuntu text-[24px] text-[#0D4168]">
                      {boat.capacity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/straighten.svg"
                      alt="Length"
                      width={40}
                      height={40}
                    />
                    <span className="font-ubuntu text-[24px] text-[#0D4168]">
                      {boat.length}
                    </span>
                  </div>
                </div>

                {/* 4. DESCRIPTION 2 */}
                <p className="mt-6 w-[412px] font-open text-[18px] font-normal leading-[100%] text-[#0D4168]">
                  {boat.description2}
                </p>

                {/* 5. USEFUL INFO */}
                <div className="mt-6">
                  <span className="font-ubuntu text-[24px] font-normal text-[#F2992F]">
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
