"use client";

import LeadTracker from "@/app/components/landing-core/LeadTracker";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "../campaign.config";
import styles from "./gracias.module.css";

const campaign = getCampaign("acuerdos-y-limites-en-pareja");

export default function GraciasLanding() {
  const hasGroup = Boolean(campaign.whatsappUrl);
  return <main className={styles.page}>
    <LeadTracker campaignSlug={campaignConfig.slug} contentName={campaign.title} activeCampaignFormId={campaignConfig.activeCampaign.formId} />
    <div className={styles.photo} aria-hidden="true" /><div className={styles.wash} aria-hidden="true" />
    <header className={styles.brand}><img src="/logos/cressara_blanco.png" alt="Cressara" /></header>
    <section className={styles.card} aria-labelledby="thanks-title">
      <span className={styles.success} aria-hidden="true">OK</span><p className={styles.eyebrow}>Registro confirmado</p>
      <h1 id="thanks-title">Tu lugar esta <em>reservado.</em></h1>
      <div className={styles.nextStep}>
        <p className={styles.almostThere}>Tu registro esta <b>casi completo.</b></p>
        <p>Solo falta entrar al grupo de WhatsApp. Ahi recibiras el enlace de la clase y los recordatorios para no perder tu lugar.</p>
        <a className={`${styles.whatsapp} ${hasGroup ? "" : styles.disabled}`} href={hasGroup ? campaign.whatsappUrl : "#"} target={hasGroup ? "_blank" : undefined} rel={hasGroup ? "noopener noreferrer" : undefined} onClick={(event) => { if (!hasGroup) event.preventDefault(); }}>{hasGroup ? "Unirme al grupo de WhatsApp" : "Grupo de WhatsApp disponible pronto"}<span aria-hidden="true">-&gt;</span></a>
      </div>
      <p className={styles.lead}>Gracias por registrarte. Prepararemos una conversacion para construir acuerdos claros y limites que cuiden su relacion.</p>
      <div className={styles.event}><span>Tu clase en vivo</span><strong>Acuerdos y limites en pareja</strong><p>Lunes 16 de noviembre - 11:00 AM - Hora CDMX</p><small>Con Mariel Medina</small></div>
    </section>
  </main>;
}
