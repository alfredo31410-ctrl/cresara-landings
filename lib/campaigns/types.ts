export interface CampaignConfig {
  slug: string;
  displayName: string;
  activeCampaign: { formId: number };
  tracking?: { completeRegistrationContentName: string; joinGroupContentName: string };
  whatsapp?: { environmentVariable?: string; url?: string };
}
