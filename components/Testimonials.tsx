"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// UPDATED DATA: Added 'text' property to support unique reviews
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
  return (
    <section className="mx-auto h-150.75 max-w-360 bg-white pt-22 overflow-hidden">
      {/* 1. TITLE CONTAINER: 286x71px (Centered) */}
      <div className="mx-auto relative flex h-17.75 w-71.5 items-center justify-center">
        <h2 className="relative z-10 font-ubuntu text-[44px] font-bold leading-none text-[#0D4168]">
          Testimonials
        </h2>
        <div className="absolute -bottom-1 right-2 z-0 h-8 w-37.25">
          <Image
            src="/icons/accent.svg"
            alt="accent"
            width={149}
            height={32}
            className="object-contain"
          />
        </div>
      </div>

      {/* 2. CONTENT CONTAINER: 1200x292px */}
      <div className="mx-auto h-73 w-300 pt-8 relative">
        {/* Left Arrow (Custom Navigation) */}
        <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-20">
          <Image
            src="/icons/arrow_back_ios.svg"
            alt="Previous"
            width={24}
            height={44}
          />
        </div>

        {/* Right Arrow (Custom Navigation) */}
        <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-20">
          <Image
            src="/icons/arrow_forward_ios.svg"
            alt="Next"
            width={24}
            height={44}
          />
        </div>

        {/* SWIPER WRAPPER */}
        <Swiper
          modules={[Navigation]}
          grabCursor={true}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          loop={true}
          className="w-full"
        >
          {testimonialsData.map((item) => (
            <SwiperSlide key={item.id}>
              {/* 3. STARS CONTAINER: 246x42px */}
              <div className="mx-auto flex h-10.5 w-61.5 items-center justify-center gap-1 px-2.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="relative h-10.5 w-10.5">
                    <Image
                      src="/icons/star.svg"
                      alt="star"
                      width={42}
                      height={42}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* 4. TESTIMONIAL TEXT CONTAINER: 692x79px */}
              {/* Rendering item.text from the array */}
              <div className="mx-auto w-173 pt-5 text-center">
                <p className="font-open text-[24px] font-normal text-[#0D4168] leading-tight">
                  {item.text}
                </p>
              </div>

              {/* 5. NAME CONTAINER: 672x33px */}
              <div className="mx-auto w-2xl pt-5 text-center">
                <span className="font-open text-[24px] font-extrabold leading-none text-[#0D4168]">
                  {item.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 6. BUTTON: 333x46px (Static - Outside Swiper Loop) */}
        <div className="mt-8 flex justify-center relative z-10">
          <a href="https://maps.app.goo.gl/bM9BD7yCVcdDE8vSA" target="_blank">
            <button className="flex h-11.5 w-83.25 items-center justify-center rounded-full bg-[#00C6DB] px-6">
              <span className="font-ubuntu text-[24px] font-medium leading-none text-white pb-0.5">
                See all reviews on Google
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
