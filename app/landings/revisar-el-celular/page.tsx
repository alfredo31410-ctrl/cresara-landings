import type { Metadata } from "next";
import PrivacyLanding from "./PrivacyLanding";

export const metadata: Metadata = {
  title: "¿Privacidad o confianza? | Clase gratuita en vivo | Cressara",
  description:
    "Una clase gratuita y en vivo con Mariel Medina para hablar de privacidad, confianza y límites en pareja.",
};

export default function PrivacidadOConfianzaPage() {
  return <PrivacyLanding />;
}
