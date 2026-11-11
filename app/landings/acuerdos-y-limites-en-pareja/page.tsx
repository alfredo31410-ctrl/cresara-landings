import type { Metadata } from "next";
import PrivacyLanding from "./PrivacyLanding";

export const metadata: Metadata = {
  title: "Acuerdos y limites en pareja | Clase gratuita en vivo | Cressara",
  description: "Una clase gratuita y en vivo con Mariel Medina para construir acuerdos y limites sanos en pareja.",
};

export default function AcuerdosYLimitesEnParejaPage() {
  return <PrivacyLanding />;
}
