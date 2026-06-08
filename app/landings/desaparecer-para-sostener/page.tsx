import { LandingPage } from "@/app/components/LandingPage";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("desaparecer-para-sostener");

export default function DesaparecerParaSostenerPage() {
  return (
    <>
      <MetaPixel id="meta-pixel-desaparecer-para-sostener" />
      <LandingPage campaign={campaign} />
    </>
  );
}
