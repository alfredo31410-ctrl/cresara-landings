import Image from "next/image";
import type { Metadata } from "next";
import { campaignConfig } from "./campaign.config";
import RegistrationForm from "./_components/RegistrationForm";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "Supera a tu Casi Algo | Cressara",
  description: "Taller gratuito de 3 días para recuperar claridad emocional.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const required =
    params.registro === "requerido" || params.registro === "requerido=1";

  return (
    <main className={styles.page}>
      {required && (
        <p className={styles.accessAlert} role="alert">
          Primero completa tu registro para acceder al grupo oficial de WhatsApp.
        </p>
      )}

      <section className={styles.hero}>
        <div className={styles.copy}>
          <header className={styles.brand}>
            <Image
              src="/logos/cressara_letras_rosas.png"
              alt="Cressara"
              width={132}
              height={54}
            />
            <span>Transforma · Sana · Crece</span>
          </header>

          <div className={styles.badge}>TALLER GRATUITO EN VIVO · 3 DÍAS</div>

          <div className={styles.illustration}>
            <Image
              src="/landings/supera-tu-casi-algo/hero-bienestar.webp"
              alt="Ilustración de una mujer en calma, sentada en meditación entre formas orgánicas"
              width={1536}
              height={1024}
              sizes="(max-width: 800px) calc(100vw - 34px), 55vw"
              priority
              quality={82}
              className={styles.illustrationImage}
            />
          </div>

          <p className={styles.recognition}>
            SI APARECE JUSTO CUANDO EMPIEZAS A SOLTARLO Y VUELVE A CONFUNDIRTE,
            ESTE TALLER ES PARA TI.
          </p>
          <h1>
            Entiende por qué sigues enganchada a <em>ese casi algo</em> y empieza a
            recuperar tu paz.
          </h1>
          <p className={styles.subtitle}>
            En tres sesiones gratuitas y en vivo descubrirás por qué sus apariciones
            reactivan tu esperanza, qué te mantiene esperando y cómo comenzar a
            recuperar claridad emocional.
          </p>
        </div>

        <aside className={styles.formCard}>
          <p className={styles.pressure}>
            Seguir esperando también es una decisión. Reserva tu lugar y empieza a
            entender qué te mantiene en el mismo ciclo.
          </p>
          <p className={styles.eyebrow}>PASO 1 DE 2 · RESERVA TU LUGAR GRATIS</p>
          <h2>Reserva tu lugar gratis</h2>
          <p className={styles.formIntro}>Completa tus datos. Después pasarás al último paso: entrar al grupo oficial de WhatsApp para recibir el acceso y los recordatorios.</p>
          <RegistrationForm />
          <p className={styles.formMicrocopy}>
            Después de guardar tus datos pasarás al último paso: entrar al grupo
            oficial de WhatsApp para recibir el acceso, los avisos y los recordatorios
            del taller.
            <br />
            Tu registro es gratuito. Solo recibirás información relacionada con este evento.
          </p>
          <p className={styles.privacy}>
            Tus datos están protegidos. Consulta el aviso de privacidad.
          </p>
        </aside>

        <ul className={styles.benefits}>
          <li>Entiende por qué sus apariciones reactivan tu esperanza.</li>
          <li>Identifica el ciclo de cercanía y distancia que te mantiene esperando.</li>
          <li>Diferencia las señales reales de las expectativas que prolongan la confusión.</li>
          <li>Define un primer paso para recuperar claridad y volver a elegirte.</li>
        </ul>

        <div className={styles.eventInfo}>
          <strong>SUPERA A TU CASI ALGO</strong>
          <span>Taller gratuito de 3 días</span>
          <span>17, 18 y 19 de agosto de 2026</span>
          <span>10:00 a. m. — Hora CDMX</span>
          <span>1 hora diaria · En vivo</span>
        </div>

        <section className={styles.sessions} aria-labelledby="sessions-title">
          <h2 id="sessions-title">QUÉ TRABAJAREMOS DURANTE LOS 3 DÍAS</h2>
          <div className={styles.sessionList}>
            <article>
              <strong>Día 1 · Entiende por qué te cuesta soltar</strong>
              <p>Identifica cómo la intermitencia y las apariciones inesperadas mantienen activa la esperanza.</p>
            </article>
            <article>
              <strong>Día 2 · Reconoce el ciclo que te confunde</strong>
              <p>Distingue lo que realmente está ocurriendo de las expectativas que prolongan la espera.</p>
            </article>
            <article>
              <strong>Día 3 · Empieza a volver a elegirte</strong>
              <p>Define un primer paso para recuperar claridad emocional y dejar de alimentar el mismo ciclo.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
