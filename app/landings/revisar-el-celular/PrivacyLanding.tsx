"use client";

import { useEffect, useState } from "react";
import { ActiveCampaignEmbedForm } from "@/app/components/landing-core/ActiveCampaignEmbedForm";
import { trackMetaCustomEvent, trackMetaEvent } from "@/lib/meta-pixel";
import { campaignConfig } from "./campaign.config";
import styles from "./privacy.module.css";

const title = "¿Privacidad o confianza?";

export default function PrivacyLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: title,
      content_category: "Clase gratuita",
    });
  }, []);

  const openRegistration = () => {
    setIsModalOpen(true);
    trackMetaCustomEvent("OpenRegistrationModal", {
      content_name: title,
      content_category: "Clase gratuita",
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="privacy-title">
        <div className={styles.photo} aria-hidden="true" />
        <div className={styles.texture} aria-hidden="true" />

        <header className={styles.brand}>
          <img src="/logos/cressara_blanco.png" alt="Cressara" />
        </header>

        <div className={styles.copy}>
          <p className={styles.kicker}>Clase gratuita y en vivo</p>
          <h1 id="privacy-title">
            ¿Tener privacidad significa <em>esconder algo?</em>
          </h1>
          <p className={styles.question}>¿Privacidad o confianza?</p>
          <p className={styles.intro}>
            Una conversación para reconocer la diferencia entre cuidar tu intimidad
            y vivir con dudas dentro de tu relación.
          </p>

          <dl className={styles.details}>
            <div>
              <dt aria-hidden="true">▣</dt>
              <dd><strong>Este lunes 16 de noviembre</strong><span>Encuentro en vivo</span></dd>
            </div>
            <div>
              <dt aria-hidden="true">◷</dt>
              <dd><strong>11:00 de la mañana</strong><span>Hora CDMX</span></dd>
            </div>
          </dl>

          <p className={styles.teacher}>Con <strong>Mariel Medina</strong></p>
          <button className={styles.cta} type="button" onClick={openRegistration}>
            Regístrate gratis <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <button className={styles.mobileCta} type="button" onClick={openRegistration}>
        Regístrate gratis
      </button>

      {isModalOpen && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="registration-title">
          <button className={styles.backdrop} type="button" onClick={() => setIsModalOpen(false)} aria-label="Cerrar registro" />
          <section className={styles.panel}>
            <button className={styles.close} type="button" onClick={() => setIsModalOpen(false)} aria-label="Cerrar">×</button>
            <p>Clase gratuita y en vivo</p>
            <h2 id="registration-title">Reserva tu lugar</h2>
            <span>Completa tus datos para recibir el acceso.</span>
            <ActiveCampaignEmbedForm
              formId={campaignConfig.activeCampaign.formId}
              campaignSlug={campaignConfig.slug}
              wrapperClassName={styles.form}
              loadingMessage="Cargando formulario seguro…"
              errorMessage="No pudimos cargar el formulario. Inténtalo de nuevo."
            />
          </section>
        </div>
      )}
    </main>
  );
}
