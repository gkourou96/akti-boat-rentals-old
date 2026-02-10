import type { Metadata } from "next";
import ContactUs from "@/components/ContactUs";
import Experiences from "@/components/Experiences";
import IdealDestinations from "@/components/IdealDestinations";
import InteractiveBanner from "@/components/InteractiveBanner";
import NoLicenseBoats from "@/components/NoLicenseBoats";
import OurFleet from "@/components/OurFleet";
import OurLocation from "@/components/OurLocation";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  metadataBase: new URL("https://aktiboatrentals.com"),
  title: "Boat Rentals in Athens | AktiBoatRentals",
  description:
    "Rent boats for unforgettable sea experiences. Professional service and safety by AktiBoatRentals.",
  openGraph: {
    siteName: "aktiboatrentals.com",
    type: "website",
    url: "https://aktiboatrentals.com",
    title: "Boat Rentals in Athens | AktiBoatRentals",
    description:
      "Rent boats for unforgettable sea experiences. Professional service and safety by AktiBoatRentals.",
    images: [
      {
        url: "/images/logo.svg",
        alt: "AktiBoatRentals Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aktiboatrentals",
    title: "Boat Rentals in Athens | AktiBoatRentals",
    description:
      "Rent boats for unforgettable sea experiences. Professional service and safety by AktiBoatRentals.",
    images: ["/images/logo.svg"],
  },
  icons: {
    icon: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
  },
};

export default function Landing() {
  return (
    <main>
      <InteractiveBanner />
      <OurFleet />
      <NoLicenseBoats />
      <IdealDestinations />
      <Experiences />
      <Testimonials />
      <OurLocation />
      <ContactUs />
    </main>
  );
}
