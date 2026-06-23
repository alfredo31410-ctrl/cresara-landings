import { LandingPage } from "@/app/components/LandingPage";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";
import { notFound } from "next/navigation";

export default function DemasiadoTiempoPage() {
  const campaign = getCampaign("demasiado-tiempo");

  if (!campaign) {
    notFound();
  }

  return (
    <>
      <MetaPixel id="meta-pixel-demasiado-tiempo" />
      <LandingPage campaign={campaign} />
    </>
  );
}