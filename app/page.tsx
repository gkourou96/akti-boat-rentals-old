import ContactUs from "@/components/ContactUs";
import Experiences from "@/components/Experiences";
import IdealDestinations from "@/components/IdealDestinations";
import InteractiveBanner from "@/components/InteractiveBanner";
import NoLicenseBoats from "@/components/NoLicenseBoats";
import OurFleet from "@/components/OurFleet";
import OurLocation from "@/components/OurLocation";
import Testimonials from "@/components/Testimonials";

export default function Landing() {
  return (
    <main>
      <InteractiveBanner />
      <OurFleet />
      {/* <NoLicenseBoats />
      <IdealDestinations />
      <Experiences />
      <Testimonials />
      <OurLocation />
      <ContactUs /> */}
    </main>
  );
}
