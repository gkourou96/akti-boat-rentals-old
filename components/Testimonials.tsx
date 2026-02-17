"use client";

import React, { useState } from "react"; // 1. Import useState
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialsData = [
  {
    id: 1,
    name: "Maria K.",
    text: "Amazing experience! The boat trip was fantastic, and the crew was very professional and friendly. The views were breathtaking, and the service was top-notch. Highly recommend!",
  },
  {
    id: 2,
    name: "John D.",
    text: "Best boat tour in Athens! The captain was knowledgeable and made sure we had a great time. The stops were perfect, and the swimming spots were beautiful.",
  },
  {
    id: 3,
    name: "Sophia M.",
    text: "Incredible day on the water! The boat was clean and comfortable, and the staff went above and beyond to make our experience memorable. Will definitely come back!",
  },
  {
    id: 4,
    name: "Alex P.",
    text: "Perfect day trip! The organization was excellent, and the crew was very attentive. The views of the coastline were stunning, and the swimming spots were amazing.",
  },
  {
    id: 5,
    name: "Elena T.",
    text: "Wonderful experience! The boat was modern and well-maintained, and the crew was professional and friendly. The tour was well-planned and the views were spectacular.",
  },
];

export default function Testimonials() {
  // 2. Create state to hold the pagination element
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  return (
    <div className="bg-[#F2EAD680]">
      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #144b51;
          opacity: 0.4;
          transition: all 0.3s ease;
          margin: 0 6px !important; /* Force spacing */
          display: inline-block;
          border-radius: 50%;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          width: 12px;
          height: 12px;
          background-color: #f2992f;
          opacity: 1;
        }
      `}</style>

      <section className="mx-auto w-full h-auto py-16 xl:py-0 xl:h-160 max-w-360 xl:pt-22 overflow-hidden">
        {/* 1. TITLE CONTAINER */}
        <div className="mx-auto relative flex flex-col items-center justify-center mb-8 xl:mb-0 xl:h-17.75 xl:w-71.5">
          <div className="relative z-10 inline-block">
            <h2 className="relative z-20 font-ubuntu text-[32px] xl:text-[44px] font-bold leading-none text-[#144B51] text-center">
              Testimonials
            </h2>
            <div className="absolute -bottom-3.5 right-0.5 xl:-bottom-4.5 xl:-right-4 -z-10 h-6 w-24 xl:h-8 xl:w-37.25">
              <Image
                src="/icons/accent_orange.svg"
                alt="accent"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 2. CONTENT CONTAINER */}
        <div className="mx-auto w-full px-6 xl:px-0 xl:w-300 h-auto xl:h-auto xl:pt-8 relative flex flex-col items-center">
          {/* Left Arrow */}
          <div className="hidden xl:block swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-20 hover:opacity-70 transition-opacity">
            <Image
              src="/icons/arrow_back_ios.svg"
              alt="Previous"
              width={24}
              height={44}
            />
          </div>

          {/* Right Arrow */}
          <div className="hidden xl:block swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-20 hover:opacity-70 transition-opacity">
            <Image
              src="/icons/arrow_forward_ios.svg"
              alt="Next"
              width={24}
              height={44}
            />
          </div>

          {/* SWIPER */}
          <Swiper
            modules={[Navigation, Pagination]}
            grabCursor={true}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            // 3. Pass the state element to Swiper
            pagination={{
              el: paginationEl,
              clickable: true,
            }}
            loop={true}
            className="w-full"
          >
            {testimonialsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6 xl:mb-5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="relative h-8 w-8 xl:h-10.5 xl:w-10.5"
                      >
                        <Image
                          src="/icons/star.svg"
                          alt="star"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Text */}
                  <div className="w-full xl:w-173 text-center min-h-25 xl:min-h-19.75 flex items-center justify-center">
                    <p className="font-open text-[18px] xl:text-[24px] font-normal text-[#144B51] leading-snug xl:leading-tight">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Name */}
                  <div className="mt-6 xl:mt-5 text-center">
                    <span className="font-open text-[20px] xl:text-[24px] font-extrabold leading-none text-[#144B51]">
                      {item.name}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 4. PAGINATION CONTAINER (External) */}
          {/* We use 'ref' here to capture the element and set it to state */}
          <div
            ref={(node) => setPaginationEl(node)}
            className="flex justify-center items-center gap-2 mt-8 mb-8 xl:mt-10 xl:mb-10 z-10 relative min-h-3"
          >
            {/* Swiper will inject the bullets here automatically */}
          </div>

          {/* Button */}
          <div className="flex justify-center relative z-10 w-full">
            <a
              href="https://maps.app.goo.gl/bM9BD7yCVcdDE8vSA"
              target="_blank"
              className="w-full xl:w-auto flex justify-center"
            >
              <button className="flex h-12 xl:h-11.5 w-full max-w-sm xl:w-83.25 items-center justify-center rounded-full bg-[#00C6DB] px-6 hover:bg-[#00C6DB66] transition-colors duration-300 cursor-pointer">
                <span className="font-ubuntu text-[20px] xl:text-[24px] font-medium leading-none text-white pb-0.5 text-center">
                  See all reviews on Google
                </span>
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
