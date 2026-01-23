import IdealDestinations from "@/components/IdealDestinations";
import InteractiveBanner from "@/components/InteractiveBanner";
import NoLicenseBoats from "@/components/NoLicenseBoats";
import OurFleet from "@/components/OurFleet";

export default function Landing() {
  return (
    <main>
      <InteractiveBanner />
      <OurFleet />
      <NoLicenseBoats />
      <IdealDestinations />
    </main>
  );
}
