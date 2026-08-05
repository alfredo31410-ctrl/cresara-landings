import { ThankYouPage } from "@/app/components/ThankYouPage";
import { getCampaign } from "@/lib/landings";

const campaign = getCampaign("cuesta-soltar");

export default function GraciasCuestaSoltarPage() {
  return (
    <ThankYouPage campaign={campaign} />
  );
}
