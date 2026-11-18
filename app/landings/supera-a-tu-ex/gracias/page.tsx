import { redirect } from "next/navigation";
import { getCampaignConfig } from "@/lib/campaigns";
import { readRegistrationSession } from "@/lib/landing-platform/campaign-session";
import CompleteRegistrationTracker from "@/app/components/landing-core/CompleteRegistrationTracker";
import WhatsAppButton from "@/app/components/landing-core/WhatsAppButton";
import styles from "../landing.module.css";

export default async function GraciasPage() {
  const config = getCampaignConfig("taller-grupal-supera-a-tu-ex")!;
  if (!(await readRegistrationSession(config.slug)))
    redirect(`/landings/${config.slug}?registro=requerido`);
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.kicker}>REGISTRO CONFIRMADO</p>
          <h1>
            Ya empezaste a dejar <em>el pasado atrás.</em>
          </h1>
          <p className={styles.lead}>
            Tu lugar está reservado. Entra al grupo oficial para recibir el
            acceso, los avisos y el acompañamiento antes del taller.
          </p>
        </div>
        <aside className={styles.formCard}>
          <p className={styles.step}>PASO 2 DE 2 · ÚLTIMO PASO</p>
          <h2>Elige avanzar</h2>
          <p>
            El grupo de WhatsApp será el canal para acompañarte antes y durante
            el taller.
          </p>
          <WhatsAppButton
            campaignSlug={config.slug}
            className={styles.whatsapp}
          />
          <small>
            Cuando se abra WhatsApp, toca “Unirme al grupo” para terminar tu
            registro.
          </small>
        </aside>
      </section>
      <CompleteRegistrationTracker
        campaignSlug={config.slug}
        contentName={config.tracking!.completeRegistrationContentName}
        activeCampaignFormId={config.activeCampaign.formId}
      />
    </main>
  );
}
