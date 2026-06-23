import { MetaPixel } from "@/app/components/MetaPixel";
import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("demasiado-tiempo");

export default function DemasiadoTiempoPage() {
  return (
    <>
      <MetaPixel
        id="meta-pixel-demasiado-tiempo-thankyou"
        noscriptEvent="CompleteRegistration"
      />
      <ThankYouPage campaign={campaign} />
    </>
  );
}
