import { LandingPage } from "@/app/components/LandingPage";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("ya-no-mas-migajas");

export default function YaNoMasMigajasPage() {
  return (
    <>
      <MetaPixel id="meta-pixel-ya-no-mas-migajas" />
      <LandingPage campaign={campaign} />
    </>
  );
}
