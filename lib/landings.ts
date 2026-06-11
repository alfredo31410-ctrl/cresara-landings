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
  formId?: number;
  whatsappUrl?: string;
  imageUrl: string;
  backgroundUrl?: string;
  mobileBackgroundUrl?: string;
  variant: "pink" | "coral" | "magenta";
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
    whatsappUrl: "https://chat.whatsapp.com/KnlDhb4GDEb54Pzz0TiRb4",
    imageUrl: "/landings/cuesta-soltar/sonia-korey.png",
    backgroundUrl: "/landings/cuesta-soltar/cuesta-soltar-banner.png",
    mobileBackgroundUrl: "/landings/cuesta-soltar/korei-moviles.png",
    variant: "coral",
  },
  "lo-que-sigue": {
    slug: "lo-que-sigue",
    title: "Cressara | Lo que sigue tambien es tuyo",
    headline: "Lo que sigue",
    highlightedHeadline: "tambien es tuyo.",
    intro:
      "Una clase para comprender los cambios de esta etapa, reconectar con tu fuerza y descubrir nuevas formas de elegirte.",
    teacherLabel: "Impartido por:",
    teacherName: "Martha Velasco",
    date: "17 de junio",
    time: "10:00 AM (Hora CDMX)",
    badge: "Curso gratuito - 100% en linea",
    imageUrl: "/landings/lo-que-sigue/martha-velasco.png",
    variant: "magenta",
  },
} satisfies Record<string, LandingCampaign>;

export const getCampaign = (slug: keyof typeof campaigns) => campaigns[slug];
