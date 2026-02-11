import Image from "next/image";

export default function GetStartedPage() {
  return (
    // 1. HEIGHT: Changed to 'min-h-[75dvh]'
    // 2. PADDING: Kept the specific top padding for fixed navbar (168px mobile / 216.64px desktop)
    <section className="w-full min-h-[75dvh] bg-[#0D41680D] flex flex-col items-center pt-42 xl:pt-[216.64px]">
      {/* Main Container */}
      {/* Added 'px-4' to prevent content touching edges on small mobile screens */}
      <div className="w-full max-w-360 flex flex-col items-center px-4">
        {/* 1. Title Container */}
        {/* Removed fixed width, allowing it to fit content naturally */}
        <div className="relative mb-8 shrink-0">
          {/* Responsive Text: 36px on mobile, 44px on desktop */}
          <h1 className="font-ubuntu font-bold text-[36px] md:text-[44px] text-[#0D4168] p-2.5 relative z-10 leading-none whitespace-nowrap">
            Get Started
          </h1>

          {/* Accent SVG */}
          {/* Position adjusted slightly for the smaller mobile font if needed */}
          <div className="absolute -bottom-2 -right-7 z-0">
            <Image
              src="/icons/accent.svg"
              alt="accent"
              width={149}
              height={32}
              className="object-contain w-30 md:w-37.25" // Slightly smaller accent on mobile
            />
          </div>
        </div>

        {/* 2. Content Container */}
        {/* CHANGED: 'w-[613px]' -> 'w-full max-w-[613px]' for mobile safety */}
        <div className="w-full max-w-153.25 flex flex-col items-center">
          {/* Text Paragraph */}
          {/* Responsive Text: 16px mobile, 18px desktop */}
          <p className="font-open font-normal text-[16px] md:text-[18px] text-[#0D4168] text-center mb-8 leading-snug">
            Lorem ipsum dolor sit amet consectetur. Nunc lectus tristique nullam
            mattis sollicitudin diam. At bibendum tortor gravida eget feugiat.
          </p>

          {/* Input Field Container */}
          {/* CHANGED: 'w-[342.5px]' -> 'w-full max-w-[342.5px]' so it shrinks on tiny screens */}
          <div className="w-full max-w-[342.5px] mb-8">
            <input
              type="text"
              placeholder="Enter code"
              className="w-full h-9.5 px-4 rounded-[5px] bg-white text-[#0D4168] placeholder:text-gray-400 outline-none border-none ring-0 shadow-none text-sm md:text-base"
            />
          </div>

          {/* Button */}
          {/* Kept fixed size as it fits easily on all screens */}
          <button className="w-33.5 h-8.5 rounded-full border border-[#0D4168] flex items-center justify-center bg-transparent hover:bg-[#0D41680D] transition-colors cursor-pointer">
            <span className="font-open text-[16px] text-[#0D4168]">
              Enter Portal
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
