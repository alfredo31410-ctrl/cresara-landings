"use client";

import CompleteRegistrationTracker from "@/app/components/landing-core/CompleteRegistrationTracker";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "../campaign.config";
import styles from "./gracias.module.css";

const campaign = getCampaign("acuerdos-y-limites-en-pareja");

export default function GraciasLanding() {
  const hasGroup = Boolean(campaign.whatsappUrl);
  return <main className={styles.page}>
    <CompleteRegistrationTracker campaignSlug={campaignConfig.slug} contentName={campaign.title} activeCampaignFormId={campaignConfig.activeCampaign.formId} />
    <div className={styles.photo} aria-hidden="true" /><div className={styles.wash} aria-hidden="true" />
    <header className={styles.brand}><img src="/logos/cressara_blanco.png" alt="Cressara" /></header>
    <section className={styles.card} aria-labelledby="thanks-title">
      <span className={styles.success} aria-hidden="true">OK</span><p className={styles.eyebrow}>Registro confirmado</p>
      <h1 id="thanks-title">Tu lugar esta <em>reservado.</em></h1>
      <p className={styles.lead}>Gracias por registrarte. Estas por recibir una conversacion para construir acuerdos claros y limites que cuiden su relacion.</p>
      <div className={styles.event}><span>Tu clase en vivo</span><strong>Acuerdos y limites en pareja</strong><p>Lunes 16 de noviembre - 11:00 AM - Hora CDMX</p><small>Con Mariel Medina</small></div>
      <div className={styles.nextStep}><p><b>Ultimo paso:</b> entra al grupo para recibir el acceso y los recordatorios.</p><a className={`${styles.whatsapp} ${hasGroup ? "" : styles.disabled}`} href={hasGroup ? campaign.whatsappUrl : "#"} target={hasGroup ? "_blank" : undefined} rel={hasGroup ? "noopener noreferrer" : undefined} onClick={(event) => { if (!hasGroup) event.preventDefault(); }}>{hasGroup ? "Entrar al grupo de WhatsApp" : "Grupo de WhatsApp disponible pronto"}<span aria-hidden="true">-&gt;</span></a></div>
    </section>
  </main>;
}
