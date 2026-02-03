import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navLinks = [
    { name: "Our Fleet", href: "#our-fleet" },
    { name: "No License Boats", href: "#no-license-boats" },
    { name: "Destinations", href: "#destinations" },
    { name: "Experiences", href: "#experiences" },
    { name: "Our Location", href: "#our-location" },
    { name: "Contact Us", href: "#contact-us" },
  ];

  return (
    <nav className="w-full bg-white">
      {/* Parent Container: 
        - h-[123px]: Fixed height
        - items-center: Vertically centers the LOGO (default behavior)
      */}
      <div className="mx-auto flex h-30.75 w-full max-w-360 items-center justify-between px-4 xl:px-13.75">
        {/* Logo Section - Stays vertically centered */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Akti Boat Rentals"
            width={180}
            height={60}
            className="h-auto w-auto max-h-20"
            priority
          />
        </Link>

        {/* Desktop Navigation 
          - h-full: Takes up full 123px height
          - items-start: Align text to top (instead of center)
          - pt-[70px]: Pushes text down to exact 70px mark from top (matching redline)
          - gap-6: Updated spacing
        */}
        <div className="hidden h-full items-start gap-6 pt-17.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-[#0D4168] hover:opacity-75 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="xl:hidden">
          <button className="text-[#0D4168] font-bold uppercase">Menu</button>
        </div>
      </div>
    </nav>
  );
}
