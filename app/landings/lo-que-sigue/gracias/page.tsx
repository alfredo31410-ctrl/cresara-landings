import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("lo-que-sigue");

export default function GraciasLoQueSiguePage() {
  return (
    <ThankYouPage campaign={campaign} />
  );
}
