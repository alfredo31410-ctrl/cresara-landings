import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import CompleteRegistrationTracker from "@/app/components/landing-core/CompleteRegistrationTracker";
import { getCampaignConfig, getWhatsAppGroupUrl } from "@/lib/campaigns";
import { readRegistrationSession } from "@/lib/landing-platform/campaign-session";
import styles from "./gracias.module.css";

export const metadata: Metadata = {
  title: "Registro confirmado | Aprender a poner límites",
  description: "Tu lugar fue reservado. Entra al grupo oficial de WhatsApp para completar tu registro.",
  robots: { index: false, follow: false },
};

export default async function GraciasPage() {
  const config = getCampaignConfig("aprender-a-poner-limites")!;

  if (!(await readRegistrationSession(config.slug))) {
    redirect(`/landings/${config.slug}?registro=requerido`);
  }

  const whatsappUrl = getWhatsAppGroupUrl(config);

  return (
    <main className={styles.page}>
      <CompleteRegistrationTracker
        campaignSlug={config.slug}
        contentName={config.tracking!.completeRegistrationContentName}
        activeCampaignFormId={config.activeCampaign.formId}
      />

      <span className={`${styles.wash} ${styles.washOne}`} aria-hidden="true" />
      <span className={`${styles.wash} ${styles.washTwo}`} aria-hidden="true" />

      <section className={styles.layout}>
        <article className={styles.card}>
          <Image
            src="/logos/cressara_logo_normal.png"
            alt="Cressara — Transforma, sana, crece"
            width={420}
            height={190}
            className={styles.logo}
            priority
          />

          <div className={styles.success} aria-hidden="true">✓</div>
          <p className={styles.eyebrow}>TUS DATOS FUERON REGISTRADOS</p>

          <h1>
            ¡Tu lugar está reservado!
            <span>Falta un último paso.</span>
          </h1>

          <p className={styles.lead}>
            Para completar tu registro, es necesario que entres al grupo oficial
            de WhatsApp. Ahí recibirás el enlace de acceso, recordatorios y avisos
            importantes de la clase.
          </p>

          <div className={styles.step}>
            <span>1</span>
            <div>
              <strong>Abre el grupo oficial</strong>
              <p>Presiona el botón de abajo para continuar en WhatsApp.</p>
            </div>
          </div>

          <div className={styles.step}>
            <span>2</span>
            <div>
              <strong>Confirma que quieres unirte</strong>
              <p>En WhatsApp, toca “Unirme al grupo” para terminar.</p>
            </div>
          </div>

          {whatsappUrl ? (
            <a
              className={styles.whatsapp}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Completar mi registro en WhatsApp
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <div className={styles.pending} role="status">
              El enlace del grupo estará disponible próximamente.
            </div>
          )}

          <p className={styles.warning}>
            No cierres esta página hasta confirmar que ya entraste al grupo.
          </p>

          <div className={styles.event}>
            <span>CLASE GRATUITA EN VIVO</span>
            <strong>Aprender a poner límites</strong>
            <p>14 de septiembre · 8:00 PM · Hora CDMX</p>
          </div>
        </article>

        <aside className={styles.visual} aria-hidden="true">
          <p>Elegirte también es cuidarte.</p>
          <Image
            src="/landings/aprender-a-poner-limites/hero-limites-v1.png"
            alt=""
            width={1114}
            height={1402}
            sizes="(max-width: 850px) 88vw, 42vw"
            className={styles.image}
            priority
          />
        </aside>
      </section>
    </main>
  );
}
