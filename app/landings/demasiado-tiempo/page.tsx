import { LandingPage } from "@/app/components/LandingPage";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("demasiado-tiempo");

export default function DemasiadoTiempoPage() {
  return (
    <>
      <MetaPixel id="meta-pixel-demasiado-tiempo" />
      <LandingPage campaign={campaign} />
    </>
  );
}
