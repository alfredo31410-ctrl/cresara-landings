import { LandingPage } from "@/app/components/LandingPage";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "./campaign.config";
import { notFound } from "next/navigation";

export default function DemasiadoTiempoPage() {
  const campaign = getCampaign("demasiado-tiempo");

  if (!campaign) {
    notFound();
  }

  return (
    <LandingPage campaign={campaign} formId={campaignConfig.activeCampaign.formId} />
  );
}
