"use client";

import { useEffect } from "react";
import type { LandingCampaign } from "@/lib/landings";
import { META_CURRENCY, trackMetaCustomEvent, trackMetaEvent } from "@/lib/meta-pixel";

type ThankYouPageProps = {
  campaign: LandingCampaign;
};

export function ThankYouPage({ campaign }: ThankYouPageProps) {
  useEffect(() => {
    document.title = `Gracias | ${campaign.title}`;
    trackMetaEvent("CompleteRegistration", {
      content_name: campaign.title,
      content_category: "Curso gratuito",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, [campaign.title]);

  const handleWhatsappClick = () => {
    trackMetaCustomEvent("ClickWhatsappGroup", {
      content_name: campaign.title,
      content_category: "Grupo de WhatsApp",
      status: "whatsapp_group_click",
      value: 0,
      currency: META_CURRENCY,
    });
  };

  return (
    <main className={`thanks-page thanks-page--${campaign.variant}`}>
      {campaign.backgroundUrl ? (
        <img className="thanks-page__background" src={campaign.backgroundUrl} alt="" />
      ) : null}

      <section className="thanks-page__content" aria-labelledby="thanks-title">
        <div className="brand brand--thanks">
          <span className="brand__mark"></span>
          <span className="brand__name">Cressara</span>
          <span className="brand__tagline">Transforma - Sana - Crece</span>
        </div>

        <div className="progress-pill">Registro 80% completado</div>

        <h1 id="thanks-title">
          Falta entrar
          <span>al grupo</span>
        </h1>
        <div className="whatsapp-card">
          <div className="progress-box">
            <div className="progress-box__label">
              <span>Registro casi listo</span>
              <strong>80%</strong>
            </div>
            <div className="progress-box__track">
              <span></span>
            </div>
            <p>El ultimo 20% es entrar al grupo de WhatsApp.</p>
          </div>

          <a
            className="whatsapp-cta"
            href={campaign.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
          >
            Entrar al grupo de WhatsApp
          </a>

          <p className="whatsapp-note">
            Sin este paso podrias perder el acceso y los recordatorios.
          </p>
        </div>
        <p className="thanks-lead">
          Tu registro al curso gratuito de Cressara ya quedo casi listo.
        </p>
 <div className="thanks-date">
          <span>Fecha del curso</span>
          <strong>
            {campaign.date} - {campaign.time}
          </strong>
        </div>
        <p className="thanks-text">
          Para completar tu registro, entra ahora al grupo de WhatsApp. Ahi
          compartiremos el acceso, recordatorios y avisos importantes de la
          sesion.
        </p>

       


      </section>
    </main>
  );
}
