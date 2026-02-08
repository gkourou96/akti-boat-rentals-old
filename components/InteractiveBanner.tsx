export default function InteractiveBanner() {
  return (
    <section className="flex h-[669px] w-full flex-col items-center text-center justify-center bg-[#144B51]">
      {/* Top Text: Ubuntu 400, 24px, Black */}
      <div className="max-w-360">
        <span className="text-2xl font-normal text-white">
          Interactive banner
        </span>

        {/* Main Text: Ubuntu 700, 32px, #0D4168 */}
        {/* Added 'italic' because it appears italicized in the design screenshot */}
        <h2 className="mt-2.5 text-[32px] font-bold italic text-white">
          Rent a boat 15min from Athens
        </h2>
      </div>
    </section>
  );
}
