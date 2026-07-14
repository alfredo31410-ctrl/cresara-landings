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
  variant: "pink" | "coral" | "magenta" | "blackPink";
  logoUrl?: string;
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
    formId: 239,
    whatsappUrl: "https://chat.whatsapp.com/KnlDhb4GDEb54Pzz0TiRb4",

    imageUrl: "/landings/lo-que-sigue/martha-velasco.png",
    variant: "magenta",
  },
  "demasiado-tiempo": {
    slug: "demasiado-tiempo",
    title: "Cressara | Demasiado Tiempo para todos",
    logoUrl: "/logos/cressara_blanco.png",
    headline: "Demasiado tiempo",
    highlightedHeadline: "para todos...",
    remainingHeadline: "¿y para ti?",
    intro:
      "Una clase gratuita para reconocer cuanto has sostenido a los demas y empezar a recuperar espacio para ti.",
    teacherLabel: "Impartido por:",
    teacherName: "Miriam Guadalupe Marquez Ordaz",
    date: "Miercoles 1 de julio",
    time: "10:00 AM (Hora CDMX)",
    badge: "Curso gratuito - 100% en linea",
    formId: 257,
    whatsappUrl: "https://chat.whatsapp.com/DXzUbADP8qP98MFGy939Jt",

    imageUrl: "/landings/demasiado-tiempo/miriam.png",
    variant: "blackPink",
  },
  "ya-no-mas-migajas": {
    slug: "ya-no-mas-migajas",
    title: "Cressara | Ya no más migajas",
    logoUrl: "/logos/cressara_blanco.png",

    headline: "Ya no más migajas:",
    highlightedHeadline: "Terapia grupal",
    remainingHeadline: "para dejar de conformarte con un amor a medias",

    intro:
      "Una terapia grupal gratuita para identificar por qué sigues aceptando relaciones a medias y comenzar a construir vínculos más sanos contigo y con los demás.",

    teacherLabel: "Impartido por la psicóloga:",
    teacherName: "Sonia Korey González Juárez",

    date: "Miércoles 15 de julio",
    time: "10:00 AM (Hora CDMX)",
    badge: "GRATIS · 100% EN LÍNEA",

    formId: 271,
    whatsappUrl: "https://chat.whatsapp.com/GUaRWvOzBqSGIUu48miR56",

    imageUrl: "/landings/ya-no-mas-migajas/sonia-korey.png",  
  variant: "blackPink",
},
} satisfies Record<string, LandingCampaign>;

export const getCampaign = (slug: keyof typeof campaigns) => campaigns[slug];
