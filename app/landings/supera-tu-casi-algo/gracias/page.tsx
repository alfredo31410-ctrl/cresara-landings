import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCampaignConfig } from "@/lib/campaigns";
import { readRegistrationSession } from "@/lib/landing-platform/campaign-session";
import CompleteRegistrationTracker from "../_components/CompleteRegistrationTracker";
import WhatsAppButton from "../_components/WhatsAppButton";
import styles from "./gracias.module.css";
export const metadata: Metadata = { title: "Registro confirmado | Cressara", robots: { index: false, follow: false } };
export default async function GraciasPage() { const config = getCampaignConfig("supera-tu-casi-algo")!; if (!(await readRegistrationSession(config.slug))) redirect(`/landings/${config.slug}?registro=requerido`); return <main className={styles.page}><CompleteRegistrationTracker campaignSlug={config.slug} contentName={config.tracking!.completeRegistrationContentName} activeCampaignFormId={config.activeCampaign.formId}/><section className={styles.card}><div className={styles.brand}><img src="/logos/cressara_letras_rosas.png" alt="Cressara"/><span>Transforma · Sana · Crece</span></div><p className={styles.eyebrow}>PASO 2 DE 2 · NO CIERRES ESTA PÁGINA</p><h1>¡Tu registro fue procesado correctamente!</h1><p className={styles.lead}>Solo falta entrar al grupo oficial de WhatsApp.</p><p>Tus datos ya fueron guardados. Entra al grupo para recibir el enlace de acceso, los recordatorios, los avisos importantes y los materiales del taller.</p><div className={styles.whatsappNote}>WhatsApp será el canal oficial del evento.</div><WhatsAppButton/><small>Cuando se abra WhatsApp, todavía debes tocar “Unirme al grupo” para terminar.</small></section></main>; }
