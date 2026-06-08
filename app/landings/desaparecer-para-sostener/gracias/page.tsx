import { MetaPixel } from "@/app/components/MetaPixel";
import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("desaparecer-para-sostener");

export default function GraciasDesaparecerParaSostenerPage() {
  return (
    <>
      <MetaPixel
        id="meta-pixel-desaparecer-para-sostener-thankyou"
        noscriptEvent="CompleteRegistration"
      />
      <ThankYouPage campaign={campaign} />
    </>
  );
}
