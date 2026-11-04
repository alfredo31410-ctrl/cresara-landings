import type { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "Cómo poner límites sin culpa | Clase gratuita en vivo Cressara",
  description:
    "Aprende a comunicar tus límites con claridad, firmeza y sin sentir culpa. Clase gratuita en vivo de Cressara.",
  openGraph: {
    title: "Cómo poner límites sin culpa | Cressara",
    description: "Clase gratuita en vivo · Lunes 9 de noviembre · 11:00 AM (Hora CDMX)",
    type: "website",
    images: [
      {
        url: "https://cresara-landings.vercel.app/landings/aprender-a-poner-limites/og-limites-v1.png",
        width: 1536,
        height: 864,
        alt: "Cómo poner límites sin culpa — clase gratuita en vivo de Cressara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cómo poner límites sin culpa | Cressara",
    description: "Clase gratuita en vivo · Lunes 9 de noviembre · 11:00 AM (Hora CDMX)",
    images: [
      "https://cresara-landings.vercel.app/landings/aprender-a-poner-limites/og-limites-v1.png",
    ],
  },
};

export default async function AprenderAPonerLimitesPage({
  searchParams,
}: {
  searchParams: Promise<{ registro?: string }>;
}) {
  const params = await searchParams;

  return <LandingClient showRegistrationNotice={params.registro === "requerido"} />;
}
