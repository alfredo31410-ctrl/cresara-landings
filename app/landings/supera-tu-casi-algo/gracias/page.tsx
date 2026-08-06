import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCampaignConfig } from "@/lib/campaigns";
import { readRegistrationSession } from "@/lib/landing-platform/campaign-session";
import CompleteRegistrationTracker from "../_components/CompleteRegistrationTracker";
import WhatsAppButton from "../_components/WhatsAppButton";
import styles from "./gracias.module.css";

export const metadata: Metadata = {
  title: "Registro confirmado | Cressara",
  robots: { index: false, follow: false },
};

export default async function GraciasPage() {
  const config = getCampaignConfig("supera-tu-casi-algo")!;
  if (!(await readRegistrationSession(config.slug))) {
    redirect(`/landings/${config.slug}?registro=requerido`);
  }

  return (
    <main className={styles.page}>
      <CompleteRegistrationTracker
        campaignSlug={config.slug}
        contentName={config.tracking!.completeRegistrationContentName}
        activeCampaignFormId={config.activeCampaign.formId}
      />

      <section className={styles.layout}>
        <div className={styles.card}>
          <header className={styles.brand}>
            <img
              src="/logos/cressara_letras_rosas.png"
              alt="Cressara"
              width={132}
              height={52}
            />
            <span>Transforma · Sana · Crece</span>
          </header>

          <p className={styles.eyebrow}>PASO 2 DE 2 · NO CIERRES ESTA PÁGINA</p>
          <p className={styles.confirmation}>Tu registro fue procesado correctamente</p>
          <h1>Solo falta entrar al grupo oficial de WhatsApp</h1>
          <p className={styles.lead}>
            Tus datos ya fueron guardados. Entra ahora al grupo oficial para recibir
            el enlace de acceso, los recordatorios, los avisos importantes y los
            materiales del taller.
          </p>

          <div className={styles.whatsappNote}>
            <strong>Tu proceso todavía no está completo.</strong>
            <span>WhatsApp será el canal oficial del evento.</span>
          </div>

          <WhatsAppButton />
          <p className={styles.instruction}>
            Cuando se abra WhatsApp, todavía debes tocar “Unirme al grupo” para
            terminar.
          </p>

          <ul className={styles.benefits}>
            <li>Enlace de acceso al taller.</li>
            <li>Recordatorios de cada sesión.</li>
            <li>Avisos importantes.</li>
            <li>Materiales y recursos del evento.</li>
          </ul>

          <p className={styles.closing}>
            Cuando hayas entrado al grupo, podrás cerrar esta página.
          </p>
        </div>

        <aside className={styles.visual} aria-label="Ilustración conceptual de calma">
          <div className={styles.visualHalo} />
          <Image
            src="/landings/supera-tu-casi-algo/hero-bienestar.webp"
            alt="Ilustración conceptual de una mujer en calma entre formas orgánicas"
            width={1536}
            height={1024}
            sizes="(max-width: 800px) 0px, 35vw"
            className={styles.visualImage}
          />
        </aside>
      </section>
    </main>
  );
}
