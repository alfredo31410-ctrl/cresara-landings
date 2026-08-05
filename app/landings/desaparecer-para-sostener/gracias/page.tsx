import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("desaparecer-para-sostener");

export default function GraciasDesaparecerParaSostenerPage() {
  return (
    <ThankYouPage campaign={campaign} />
  );
}
