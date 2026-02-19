"use client";

import React, { useState } from "react";
import Image from "next/image";
// 1. Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Import the new Modal Component
import LocationModal from "./LocationModal";

// Define images here to use in the mobile swiper
const locationImages = [
  "/images/locations-frame-1.png",
  "/images/locations-frame-2.png",
  "/images/locations-frame-3.png",
  "/images/locations-frame-4.png",
];

export default function OurLocation() {
  // SETTINGS:
  const locationQuery = "Akti Boat Rentals";
  const zoomLevel = 16;

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        id="our-location"
        className="relative w-full h-auto xl:h-auto xl:pb-14 bg-[#F2EAD6] overflow-hidden"
      >
        {/* Background Accent */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-0 select-none opacity-30 xl:opacity-100 w-full xl:w-auto">
          <Image
            src="/icons/light-brown-accent.svg"
            alt="Location decoration"
            width={1440}
            height={200}
            className="object-cover xl:object-contain w-full h-full"
          />
        </div>

        {/* Main Content Wrapper */}
        {/* CHANGED: Removed xl:px-30, changed xl:justify-between to xl:justify-center, added xl:gap-[26px] */}
        <div className="relative z-10 mx-auto h-full max-w-360 px-6 py-16 xl:py-0 flex flex-col xl:flex-row justify-between xl:justify-center xl:items-start xl:gap-6.5">
          {/* Left Container */}
          <div className="relative h-auto w-full xl:w-172.5 xl:pt-[50.5px]">
            {/* --- TITLE CONTAINER --- */}
            <div className="relative flex h-auto mb-6 xl:mb-0 xl:h-17.75 w-auto xl:w-70.25 items-center justify-start">
              <h2 className="relative z-10 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#144B51]">
                Our location
              </h2>
              {/* Accent */}
              <div className="absolute -bottom-3.5 left-24 xl:left-32 xl:-bottom-1.25 z-0 h-6 w-24 xl:h-8 xl:w-37.25">
                <Image
                  src="/icons/experiences-orange-accent.svg"
                  alt="accent"
                  width={149}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Text Container */}
            <div className="w-full xl:w-2xl h-auto xl:h-auto mb-8 xl:pt-8 xl:mb-8">
              <p className="text-[16px] xl:text-[18px] font-sans font-normal text-[#144B51] mb-6">
                From Sea Breeze to Sunset Spritz…
              </p>
              <p className="text-[16px] xl:text-[18px] font-sans font-normal text-[#144B51]">
                Based at Akti tou Iliou in Alimos, we offer more than just boat
                rentals — we create a complete sea experience from the moment
                you arrive. Departing from a private beach resort with easy
                parking, beach bars, and seaside restaurants, your day flows
                effortlessly from shore to open water.
              </p>
            </div>

            {/* MAP CONTAINER */}
            <div className="w-full h-75 xl:w-172.5 xl:h-111.5 xl:pt-8 rounded-[20px] xl:rounded-none overflow-hidden xl:overflow-visible">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="AktiBoat Location"
                className="rounded-[20px] xl:rounded-none"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  locationQuery,
                )}&t=m&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>

            {/* LOCATION DETAILS CONTAINER */}
            <div className="w-full xl:w-2xl h-auto xl:h-8.25 pt-6 xl:pt-3 flex items-start xl:items-center gap-2">
              <div className="shrink-0 pt-1 xl:pt-0">
                <Image
                  src="/icons/explore_nearby.svg"
                  alt="Location Pin"
                  width={24}
                  height={24}
                />
              </div>
              <span className="font-open text-[18px] xl:text-[24px] font-extrabold leading-tight xl:leading-none text-[#0D4168]">
                Akti tou Iliou (Costa del Sol), Alimos
              </span>
            </div>
          </div>

          {/* --- MOBILE ONLY SWIPER --- */}
          <div className="w-full mt-8 block xl:hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="w-full h-80 rounded-[20px] overflow-hidden"
            >
              {locationImages.map((src, index) => (
                <SwiperSlide key={index} className="relative w-full h-full">
                  {/* ADDED onClick to open modal */}
                  <div
                    className="relative w-full h-full rounded-[20px] overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={src}
                      alt={`Location View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* --- RIGHT SIDE IMAGE GRID --- */}
          {/* CHANGED: Added shrink-0 so the images hold their exact width */}
          <div className="hidden xl:flex gap-3.5 xl:pt-6.25 shrink-0">
            {/* Column 1 */}
            <div className="flex flex-col">
              {/* Image 1 */}
              <div
                className="relative -mt-6 h-[362.5px] w-[234.79px] overflow-hidden rounded-b-[14.83px] cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(0)} // Index 0
              >
                <Image
                  src="/images/locations-frame-1.png"
                  alt="Location View 1"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Image 2 */}
              <div
                className="relative mt-3 h-[362.5px] w-[234.79px] overflow-hidden rounded-[14.83px] cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(1)} // Index 1
              >
                <Image
                  src="/images/locations-frame-2.png"
                  alt="Location View 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              {/* Image 3 */}
              <div
                className="relative mt-[158.61px] h-[351.2px] w-[235.21px] overflow-hidden rounded-[14.83px] cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(2)} // Index 2
              >
                <Image
                  src="/images/locations-frame-3.png"
                  alt="Location View 3"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Image 4 */}
              <div
                className="relative mt-3 -mb-16.75 h-[351.2px] w-[235.21px] overflow-hidden rounded-[14.83px] cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(3)} // Index 3
              >
                <Image
                  src="/images/locations-frame-4.png"
                  alt="Location View 4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RENDER THE MODAL */}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={currentImageIndex}
        images={locationImages}
      />
    </>
  );
}
