"use client";

import { useState, type MouseEvent } from "react";
import LeadTracker from "@/app/components/landing-core/LeadTracker";
import { getCampaign } from "@/lib/landings";
import { campaignConfig } from "../campaign.config";
import styles from "./gracias.module.css";

const campaign = getCampaign("acuerdos-y-limites-en-pareja");

export default function GraciasLanding() {
  const hasGroup = Boolean(campaign.whatsappUrl);
  const [groupAccessStarted, setGroupAccessStarted] = useState(false);

  const handleGroupClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!hasGroup) {
      event.preventDefault();
      return;
    }
    setGroupAccessStarted(true);
    window.fbq?.("trackCustom", "JoinWhatsAppClick", {
      content_name: campaign.title,
      landing_slug: campaignConfig.slug,
      destination: "whatsapp_group",
    });
  };

  return <main className={styles.page}>
    <LeadTracker campaignSlug={campaignConfig.slug} contentName={campaign.title} activeCampaignFormId={campaignConfig.activeCampaign.formId} />
    <div className={styles.photo} aria-hidden="true" /><div className={styles.wash} aria-hidden="true" />
    <header className={styles.brand}><img src="/logos/cressara_blanco.png" alt="Cressara" /></header>
    <section className={styles.card} aria-labelledby="thanks-title">
      <span className={styles.success} aria-hidden="true">2/2</span><p className={styles.eyebrow}>Registro confirmado</p>
      <h1 id="thanks-title">Completa tu acceso <em>en WhatsApp.</em></h1>
      <div className={styles.nextStep}>
        <p className={styles.almostThere}>Estas a <b>un ultimo paso</b> de completar tu registro.</p>
        <p>Entra al grupo oficial para recibir el enlace de la clase, los recordatorios y todos los avisos importantes.</p>
        <a className={`${styles.whatsapp} ${hasGroup ? "" : styles.disabled}`} href={hasGroup ? campaign.whatsappUrl : "#"} target={hasGroup ? "_blank" : undefined} rel={hasGroup ? "noopener noreferrer" : undefined} onClick={handleGroupClick}>{hasGroup ? "Completar mi acceso en WhatsApp" : "Grupo de WhatsApp disponible pronto"}<span aria-hidden="true">-&gt;</span></a>
        <p className={styles.whatsappNote}>Cuando se abra WhatsApp, toca <b>“Unirme al grupo”</b> para terminar.</p>
      </div>
      {groupAccessStarted && <div className={styles.unlocked} aria-live="polite">
        <p className={styles.lead}>Tu acceso ya fue abierto. Cuando termines de unirte al grupo, aqui tienes los datos de tu clase.</p>
        <div className={styles.event}><span>Tu clase en vivo</span><strong>Acuerdos y limites en pareja</strong><p>Lunes 16 de noviembre - 11:00 AM - Hora CDMX</p><small>Con Mariel Medina</small></div>
      </div>}
    </section>
  </main>;
}
