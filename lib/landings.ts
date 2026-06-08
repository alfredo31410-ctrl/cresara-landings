export type LandingCampaign = {
  slug: string;
  title: string;
  headline: string;
  highlightedHeadline?: string;
  remainingHeadline?: string;
  intro: string;
  teacherLabel: string;
  teacherName: string;
  date: string;
  time: string;
  badge: string;
  formId: number;
  whatsappUrl: string;
  imageUrl: string;
  backgroundUrl?: string;
  mobileBackgroundUrl?: string;
  variant: "pink" | "coral";
};

export const campaigns = {
  "desaparecer-para-sostener": {
    slug: "desaparecer-para-sostener",
    title: "Cressara | En que momento empezaste a desaparecer",
    headline: "En que momento empezaste a desaparecer para sostener",
    highlightedHeadline: "a todos?",
    intro:
      "Una clase gratuita para mujeres que han aprendido a sostenerlo todo, incluso cuando eso les cuesta desaparecer de si mismas.",
    teacherLabel: "Impartido por la psicologa:",
    teacherName: "Miriam Guadalupe Marquez Ordaz",
    date: "3 de junio",
    time: "10:00 AM (Hora CDMX)",
    badge: "Curso gratis online",
    formId: 219,
    whatsappUrl: "https://chat.whatsapp.com/KnlDhb4GDEb54Pzz0TiRb4",
    imageUrl: "/landings/desaparecer-para-sostener/miriam-landing.png",
    variant: "pink",
  },
  "cuesta-soltar": {
    slug: "cuesta-soltar",
    title: "Cressara | Quien mas te confunde, mas cuesta soltar",
    headline: "Quien mas te",
    highlightedHeadline: "confunde,",
    remainingHeadline: "mas cuesta soltar",
    intro:
      "Una clase gratuita para entender por que ciertos vinculos confunden tanto y como empezar a recuperar claridad para soltar.",
    teacherLabel: "Impartido por la psicologa:",
    teacherName: "Sonia Korey Gonzalez Juarez",
    date: "10 de junio",
    time: "10:00 AM (Hora CDMX)",
    badge: "Curso gratuito - 100% en linea",
    formId: 233,
    whatsappUrl: "https://chat.whatsapp.com/Gt22rhvGYMNJb0uU5iptQ4",
    imageUrl: "/landings/cuesta-soltar/sonia-korey.png",
    backgroundUrl: "/landings/cuesta-soltar/cuesta-soltar-banner.png",
    mobileBackgroundUrl: "/landings/cuesta-soltar/korei-moviles.png",
    variant: "coral",
  },
} satisfies Record<string, LandingCampaign>;

export const getCampaign = (slug: keyof typeof campaigns) => campaigns[slug];
