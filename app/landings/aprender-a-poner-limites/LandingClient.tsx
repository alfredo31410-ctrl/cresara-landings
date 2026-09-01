"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ActiveCampaignEmbedForm } from "@/app/components/landing-core/ActiveCampaignEmbedForm";
import { campaignConfig } from "./campaign.config";
import styles from "./landing.module.css";

export default function LandingClient({
  showRegistrationNotice,
}: {
  showRegistrationNotice: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isModalOpen]);

  return (
    <main className={styles.page}>
      <span className={`${styles.wash} ${styles.washOne}`} aria-hidden="true" />
      <span className={`${styles.wash} ${styles.washTwo}`} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <header className={styles.brand}>
            <Image
              src="/logos/cressara_logo_normal.png"
              alt="Cressara — Transforma, sana, crece"
              width={420}
              height={190}
              priority
            />
          </header>

          {showRegistrationNotice && (
            <p className={styles.notice} role="alert">
              Para confirmar tu lugar, completa primero el formulario de registro.
            </p>
          )}

          <p className={styles.eyebrow}>CLASE GRATUITA · EN VIVO</p>

          <h1>
            Aprender a poner límites
            <span>sin sentir culpa</span>
          </h1>

          <p className={styles.lead}>
            Aprende a decir “no” con claridad, cuidar tu tiempo y expresar lo que
            necesitas sin sentir que estás decepcionando a los demás.
          </p>

          <div className={styles.promise}>
            <span aria-hidden="true">♡</span>
            <p>
              Poner un límite también es una forma de <strong>cuidarte.</strong>
            </p>
          </div>

          <dl className={styles.details} aria-label="Datos de la clase">
            <div>
              <dt>Fecha</dt>
              <dd>14 de septiembre</dd>
            </div>
            <div>
              <dt>Hora</dt>
              <dd>8:00 PM · CDMX</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>Gratis · En línea</dd>
            </div>
          </dl>

          <button
            type="button"
            className={styles.primaryCta}
            onClick={() => setIsModalOpen(true)}
          >
            Quiero aprender a poner límites
            <span aria-hidden="true">→</span>
          </button>

          <p className={styles.reassurance}>Registro gratuito · Cupo limitado</p>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualHalo} />
          <p className={`${styles.note} ${styles.noteTop}`}>Mi tranquilidad también importa.</p>
          <Image
            src="/landings/aprender-a-poner-limites/hero-limites-v1.png"
            alt=""
            width={1114}
            height={1402}
            sizes="(max-width: 860px) 88vw, 48vw"
            className={styles.heroImage}
            priority
          />
          <p className={`${styles.note} ${styles.noteBottom}`}>Decir “no” también puede ser amor.</p>
        </div>
      </section>

      <button
        type="button"
        className={styles.mobileCta}
        onClick={() => setIsModalOpen(true)}
      >
        Registrarme gratis
      </button>

      {isModalOpen && (
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="limites-form-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsModalOpen(false);
          }}
        >
          <section className={styles.modal}>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar formulario"
            >
              ×
            </button>

            <div className={styles.modalHeading}>
              <p>RESERVA TU LUGAR GRATIS</p>
              <h2 id="limites-form-title">Aprender a poner límites</h2>
              <span>14 de septiembre · 8:00 PM · Hora CDMX</span>
            </div>

            <ActiveCampaignEmbedForm
              formId={campaignConfig.activeCampaign.formId}
              campaignSlug={campaignConfig.slug}
              wrapperClassName={styles.form}
              loadingMessage="Cargando formulario seguro…"
              errorMessage="No pudimos cargar el formulario. Revisa tu conexión e inténtalo nuevamente."
            />
          </section>
        </div>
      )}
    </main>
  );
}
