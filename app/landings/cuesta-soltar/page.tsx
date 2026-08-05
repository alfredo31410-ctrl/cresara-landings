import { LandingPage } from "@/app/components/LandingPage";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "./campaign.config";

const campaign = getCampaign("cuesta-soltar");

export default function CuestaSoltarPage() {
  return (
    <LandingPage campaign={campaign} formId={campaignConfig.activeCampaign.formId} />
  );
}
