import { LandingPage } from "@/app/components/LandingPage";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "./campaign.config";

const campaign = getCampaign("lo-que-sigue");

export default function LoQueSiguePage() {
  return (
    <LandingPage campaign={campaign} formId={campaignConfig.activeCampaign.formId} />
  );
}
