import Image from "next/image";
import type { Metadata } from "next";
import RegistrationForm from "./RegistrationForm";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "Taller Grupal: Supera a tu Ex | Cressara",
  description:
    "Un espacio grupal para comprender tu ruptura, recuperar tu centro y volver a elegirte.",
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
        <div className={styles.intro}>
          <header className={styles.brand}>
            <Image
              src="/logos/cressara_letras_rosas.png"
              alt="Cressara"
              width={132}
              height={54}
              priority
            />
            <span>Transforma · Sana · Crece</span>
          </header>

          <p className={styles.kicker}>UN ESPACIO PARA CERRAR EL CICLO</p>
          <h1>
            Taller Grupal: <em>Supera a tu Ex</em>
          </h1>
          <p className={styles.lead}>
            Deja de vivir pendiente de un mensaje, una señal o un regreso.
            Aprende a cerrar el capítulo, soltar el vínculo y avanzar sin dejarte
            atrás.
          </p>

          <div className={styles.path} aria-label="Ruta del taller">
            <span>Cierra el ciclo</span>
            <i aria-hidden="true" />
            <span>Recupera tu voz</span>
            <i aria-hidden="true" />
            <span>Avanza</span>
          </div>
        </div>

        <aside className={styles.formCard}>
          <p className={styles.step}>PASO 1 DE 2 · RESERVA TU LUGAR</p>
          <h2>Deja de volver atrás</h2>
          <p>
            Reserva tu lugar y recibe el acceso al taller y al grupo oficial de
            WhatsApp.
          </p>
          <RegistrationForm />
          <small>
            Al registrarte pasarás al último paso: entrar al grupo oficial para
            recibir los avisos y el acceso al taller.
          </small>
        </aside>

        <div className={styles.visual}>
          <div className={styles.orbit} aria-hidden="true" />
          <Image
            src="/landings/supera-a-tu-ex/hero-supera-ex.png"
            alt="Mujer caminando hacia un nuevo comienzo después de una ruptura"
            width={1536}
            height={1024}
            sizes="(max-width: 760px) calc(100vw - 40px), 46vw"
            className={styles.visualImage}
          />
          <p>Mirar hacia adelante también es sanar.</p>
        </div>

        <section className={styles.details} aria-labelledby="details-title">
          <p className={styles.sectionLabel}>EN ESTE TALLER PODRÁS</p>
          <h2 id="details-title">Dejar de extrañarlo no es olvidarte de ti</h2>
          <div className={styles.cards}>
            <article>
              <b>✦</b>
              <h3>Rompe el ciclo</h3>
              <p>Entiende por qué sigues buscando señales y cómo salir de ese patrón.</p>
            </article>
            <article>
              <b>✦</b>
              <h3>Despídete con claridad</h3>
              <p>Reconoce qué te toca soltar para cerrar la relación desde la paz.</p>
            </article>
            <article>
              <b>✦</b>
              <h3>Vuelve a avanzar</h3>
              <p>Recupera tu energía, tus planes y la vida que también es tuya.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
