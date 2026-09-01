import type { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "Aprender a poner límites | Clase gratuita Cressara",
  description:
    "Aprende a comunicar tus límites con claridad, firmeza y sin sentir culpa. Clase gratuita en vivo de Cressara.",
  openGraph: {
    title: "Aprender a poner límites | Cressara",
    description: "Clase gratuita en vivo · 14 de septiembre · 8:00 PM (Hora CDMX)",
    type: "website",
    images: [
      {
        url: "https://cresara-landings.vercel.app/landings/aprender-a-poner-limites/og-limites-v1.png",
        width: 1536,
        height: 864,
        alt: "Aprender a poner límites — clase gratuita en vivo de Cressara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aprender a poner límites | Cressara",
    description: "Clase gratuita en vivo · 14 de septiembre · 8:00 PM (Hora CDMX)",
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
