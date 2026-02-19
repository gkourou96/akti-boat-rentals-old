"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { X } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
  images: string[];
}

export default function LocationModal({
  isOpen,
  onClose,
  initialIndex,
  images,
}: LocationModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // CHANGED:
    // 1. bg-black/95 -> bg-black/80 (More transparency)
    // 2. backdrop-blur-md -> backdrop-blur-xl (Stronger blur effect)
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/20 backdrop-blur-xl transition-all duration-300 animate-in fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 xl:right-8 xl:top-8 cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Main Swiper Container */}
      <div className="h-full w-full max-w-7xl px-4 py-20 xl:px-20">
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          initialSlide={initialIndex}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          keyboard={{ enabled: true }}
          loop={true}
          className="h-full w-full location-modal-swiper"
          style={
            {
              // Custom CSS vars for Swiper arrows to make them white/visible
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            } as React.CSSProperties
          }
        >
          {images.map((src, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`Location view ${index + 1}`}
                  fill
                  className="object-contain"
                  quality={100}
                  priority={index === initialIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
