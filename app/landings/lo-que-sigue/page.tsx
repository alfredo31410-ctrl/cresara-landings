import { LandingPage } from "@/app/components/LandingPage";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("lo-que-sigue");

export default function LoQueSiguePage() {
  return (
    <>
      <MetaPixel id="meta-pixel-lo-que-sigue" />
      <LandingPage campaign={campaign} />
    </>
  );
}
