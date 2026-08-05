import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { campaignConfig } from "../campaign.config";
import { consumeRegistrationIntent, createRegistrationSession, readRegistrationIntent } from "@/lib/landing-platform/campaign-session";
export const metadata: Metadata = { title: "Registro confirmado | Cressara", robots: { index: false, follow: false } };
export default async function RegistroConfirmadoPage() { const intent = await readRegistrationIntent(campaignConfig.slug); if (!intent || intent.formId !== campaignConfig.activeCampaign.formId) redirect(`/landings/${campaignConfig.slug}?registro=requerido`); await consumeRegistrationIntent(campaignConfig.slug); await createRegistrationSession(campaignConfig); redirect(`/landings/${campaignConfig.slug}/gracias`); }
