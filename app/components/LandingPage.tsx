"use client";

import { useEffect, useState } from "react";
import type { LandingCampaign } from "@/lib/landings";
import { trackMetaCustomEvent, trackMetaEvent } from "@/lib/meta-pixel";

type LandingPageProps = {
  campaign: LandingCampaign;
};

export function LandingPage({ campaign }: LandingPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formClass = campaign.formId ? `_form_${campaign.formId}` : "";

  useEffect(() => {
    document.title = campaign.title;
    trackMetaEvent("ViewContent", {
      content_name: campaign.title,
      content_category: "Curso gratuito",
    });
  }, [campaign.title]);

  useEffect(() => {
    if (!isModalOpen || !campaign.formId) return;

    const oldScript = document.getElementById("activecampaign-form-loader");
    if (oldScript) oldScript.remove();

    const formRoot = document.querySelector(`.${formClass}`);
    if (formRoot) formRoot.innerHTML = "";

    const script = document.createElement("script");
    script.id = "activecampaign-form-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${campaign.formId}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  }, [campaign.formId, formClass, isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    trackMetaCustomEvent("OpenRegistrationModal", {
      content_name: campaign.title,
      content_category: "Curso gratuito",
    });
  };

  return (
    <main className={`landing-page landing-page--${campaign.variant}`}>
      <section className="landing-hero" aria-labelledby="landing-title">
        {campaign.backgroundUrl ? (
          <img className="landing-hero__background" src={campaign.backgroundUrl} alt="" />
        ) : null}

        {campaign.mobileBackgroundUrl ? (
          <img
            className="landing-hero__mobile-background"
            src={campaign.mobileBackgroundUrl}
            alt=""
          />
        ) : null}

        <div className="landing-hero__visual" aria-hidden="true">
          <div className="brand brand--visual">
            {campaign.logoUrl ? (
              <img className="brand__logo" src={campaign.logoUrl} alt="" />
            ) : (
              <>
                <span className="brand__mark"></span>
                <span className="brand__name">Cressara</span>
                <span className="brand__tagline">Transforma - Sana - Crece</span>
              </>
            )}
          </div>
          <img src={campaign.imageUrl} alt="" />
        </div>

        <div className="landing-hero__content">
          <p className="quote-mark">"</p>
          <p className="campaign-badge">{campaign.badge}</p>

          <h1 id="landing-title">
            {campaign.headline}
            {campaign.highlightedHeadline ? (
              <span>{campaign.highlightedHeadline}</span>
            ) : null}
            {campaign.remainingHeadline ? (
              <em>{campaign.remainingHeadline}</em>
            ) : null}
          </h1>

          <p className="landing-intro">{campaign.intro}</p>

          <p className="teacher">
            {campaign.teacherLabel}
            <strong>{campaign.teacherName}</strong>
          </p>

          <div className="event-meta">
            <strong>{campaign.date}</strong>
            <span>{campaign.time}</span>
          </div>

          <button className="primary-link" type="button" onClick={openModal}>
            Quiero mi acceso gratuito
          </button>
        </div>
      </section>

      <button className="floating-cta" type="button" onClick={openModal}>
        Registrarme gratis
      </button>

      {isModalOpen ? (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            className="modal__backdrop"
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Cerrar registro"
          />

          <section className="modal__panel" tabIndex={-1}>
            <button
              className="modal__close"
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar"
            >
              x
            </button>

            <div className="modal__intro">
              <span>Curso gratuito online</span>
              <h2 id="modal-title">Reserva tu lugar</h2>
              <p>Completa tus datos para recibir el acceso a la clase.</p>
            </div>

            <div className="activecampaign-form">
              {campaign.formId ? (
                <div className={formClass}></div>
              ) : (
                <p className="pending-integration">
                  El formulario de registro estara disponible muy pronto.
                </p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
