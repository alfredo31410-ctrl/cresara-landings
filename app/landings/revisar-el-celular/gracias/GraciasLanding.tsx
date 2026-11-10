"use client";

import { useEffect } from "react";
import { getCampaign } from "@/lib/landings";
import { META_CURRENCY, trackMetaCustomEventWhenReady, trackMetaEventWhenReady } from "@/lib/meta-pixel";
import styles from "./gracias.module.css";

const campaign = getCampaign("privacidad-o-confianza");

export default function GraciasLanding() {
  useEffect(() => {
    document.title = "Registro confirmado | Cressara";
    return trackMetaEventWhenReady("CompleteRegistration", { content_name: campaign.title, content_category: "Clase gratuita", status: "completed", value: 0, currency: META_CURRENCY });
  }, []);

  const hasGroup = Boolean(campaign.whatsappUrl);
  const handleWhatsApp = () => trackMetaCustomEventWhenReady("WhatsAppGroupClick", { content_name: campaign.title, content_category: "Grupo de WhatsApp", status: "whatsapp_group_click", value: 0, currency: META_CURRENCY });

  return <main className={styles.page}>
    <div className={styles.photo} aria-hidden="true" /><div className={styles.wash} aria-hidden="true" />
    <header className={styles.brand}><img src="/logos/cressara_blanco.png" alt="Cressara" /></header>
    <section className={styles.card} aria-labelledby="thanks-title">
      <span className={styles.success} aria-hidden="true">✓</span><p className={styles.eyebrow}>Registro confirmado</p>
      <h1 id="thanks-title">Tu lugar está <em>reservado.</em></h1>
      <p className={styles.lead}>Gracias por registrarte. Estás por recibir una conversación que puede ayudarte a mirar la privacidad y la confianza desde otro lugar.</p>
      <div className={styles.event}><span>Tu clase en vivo</span><strong>¿Privacidad o confianza?</strong><p>Lunes 16 de noviembre · 11:00 AM · Hora CDMX</p><small>Con Mariel Medina</small></div>
      <div className={styles.nextStep}><p><b>Último paso:</b> entra al grupo para recibir el acceso y los recordatorios.</p>
        <a className={`${styles.whatsapp} ${hasGroup ? "" : styles.disabled}`} href={hasGroup ? campaign.whatsappUrl : "#"} target={hasGroup ? "_blank" : undefined} rel={hasGroup ? "noopener noreferrer" : undefined} onClick={(event) => { if (!hasGroup) event.preventDefault(); else handleWhatsApp(); }}>
          {hasGroup ? "Entrar al grupo de WhatsApp" : "Grupo de WhatsApp disponible pronto"}<span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  </main>;
}
