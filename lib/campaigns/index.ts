import { superaTuCasiAlgoConfig } from "./supera-tu-casi-algo";
import { campaignConfig as desaparecer } from "@/app/landings/desaparecer-para-sostener/campaign.config";
import { campaignConfig as cuesta } from "@/app/landings/cuesta-soltar/campaign.config";
import { campaignConfig as loQueSigue } from "@/app/landings/lo-que-sigue/campaign.config";
import { campaignConfig as demasiado } from "@/app/landings/demasiado-tiempo/campaign.config";
import { campaignConfig as migajas } from "@/app/landings/ya-no-mas-migajas/campaign.config";
import { campaignConfig as limites } from "@/app/landings/aprender-a-poner-limites/campaign.config";
import type { CampaignConfig } from "./types";

const campaigns: Record<string, CampaignConfig> = {
  [superaTuCasiAlgoConfig.slug]: superaTuCasiAlgoConfig,
  [desaparecer.slug]: desaparecer,
  [cuesta.slug]: cuesta,
  [loQueSigue.slug]: loQueSigue,
  [demasiado.slug]: demasiado,
  [migajas.slug]: migajas,
  [limites.slug]: limites,
};
export function getCampaignConfig(slug: string): CampaignConfig | null { return campaigns[slug] || null; }
export function getWhatsAppGroupUrl(config: CampaignConfig) {
  if (!config.whatsapp) return undefined;
  if (config.whatsapp.url) return config.whatsapp.url;
  return config.whatsapp.environmentVariable
    ? process.env[config.whatsapp.environmentVariable]
    : undefined;
}
