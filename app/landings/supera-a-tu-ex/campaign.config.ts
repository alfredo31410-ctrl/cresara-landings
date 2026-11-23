export const campaignConfig = {
  slug: "supera-a-tu-ex",
  displayName: "Taller Grupal: Supera a tu Ex",
  // Conserva el mismo formulario y canal de WhatsApp de la configuración base.
  activeCampaign: { formId: 398 },
  tracking: {
    completeRegistrationContentName: "Taller Grupal: Supera a tu Ex",
    joinGroupContentName: "Taller Grupal: Supera a tu Ex",
  },
  whatsapp: { url: "https://chat.whatsapp.com/BwJ7Jf3YDL891r0wCSWMlc" },
} as const;
