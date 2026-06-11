import { MetaPixel } from "@/app/components/MetaPixel";
import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("lo-que-sigue");

export default function GraciasLoQueSiguePage() {
  return (
    <>
      <MetaPixel
        id="meta-pixel-lo-que-sigue-thankyou"
        noscriptEvent="CompleteRegistration"
      />
      <ThankYouPage campaign={campaign} />
    </>
  );
}
