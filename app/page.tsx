import Experiences from "@/components/Experiences";
import IdealDestinations from "@/components/IdealDestinations";
import InteractiveBanner from "@/components/InteractiveBanner";
import NoLicenseBoats from "@/components/NoLicenseBoats";
import OurFleet from "@/components/OurFleet";
import Testimonials from "@/components/Testimonials";

export default function Landing() {
  return (
    <main>
      <InteractiveBanner />
      <OurFleet />
      <NoLicenseBoats />
      <IdealDestinations />
      <Experiences />
      <Testimonials />
    </main>
  );
}
