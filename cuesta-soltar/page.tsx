import { LandingPage } from "@/app/components/LandingPage";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("cuesta-soltar");

export default function CuestaSoltarPage() {
  return (
    <>
      <MetaPixel id="meta-pixel-cuesta-soltar" />
      <LandingPage campaign={campaign} />
    </>
  );
}
