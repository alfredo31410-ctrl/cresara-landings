import { MetaPixel } from "@/app/components/MetaPixel";
import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("ya-no-mas-migajas");

export default function GraciasYaNoMasMigajasPage() {
  return (
    <>
      <MetaPixel
        id="meta-pixel-ya-no-mas-migajas-thankyou"
        noscriptEvent="CompleteRegistration"
      />
      <ThankYouPage campaign={campaign} />
    </>
  );
}
