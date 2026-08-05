import { LandingPage } from "@/app/components/LandingPage";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "./campaign.config";

const campaign = getCampaign("desaparecer-para-sostener");

export default function DesaparecerParaSostenerPage() {
  return (
    <LandingPage campaign={campaign} formId={campaignConfig.activeCampaign.formId} />
  );
}
