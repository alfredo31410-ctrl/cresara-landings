import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("demasiado-tiempo");

export default function DemasiadoTiempoPage() {
  return (
    <ThankYouPage campaign={campaign} />
  );
}
