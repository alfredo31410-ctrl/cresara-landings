import { MetaPixel } from "@/app/components/MetaPixel";
import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("cuesta-soltar");

export default function GraciasCuestaSoltarPage() {
  return (
    <>
      <MetaPixel
        id="meta-pixel-cuesta-soltar-thankyou"
        noscriptEvent="CompleteRegistration"
      />
      <ThankYouPage campaign={campaign} />
    </>
  );
}
