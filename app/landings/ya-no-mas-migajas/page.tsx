"use client";

import { useEffect, useState } from "react";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";
import { trackMetaCustomEvent, trackMetaEvent } from "@/lib/meta-pixel";

const campaign = getCampaign("ya-no-mas-migajas");

const ACTIVE_CAMPAIGN_FORM_ID = campaign.formId;
const FORM_CLASS = ACTIVE_CAMPAIGN_FORM_ID
  ? `_form_${ACTIVE_CAMPAIGN_FORM_ID}`
  : "";

const CRESSARA_LOGO = "/logos/cressara_logo_normal.png";
const PUBLIC_ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cresara-landings.vercel.app"
    : "";

const publicAsset = (path: string) =>
  path.startsWith("/") ? `${PUBLIC_ASSET_BASE}${path}` : path;

export default function YaNoMasMigajasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = campaign.title;

    const timer = window.setTimeout(() => {
      trackMetaEvent("ViewContent", {
        content_name: "Ya no más migajas",
        content_category: "Terapia grupal gratuita",
      });
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

useEffect(() => {
  if (!isModalOpen || !ACTIVE_CAMPAIGN_FORM_ID || !FORM_CLASS) return;

  const scriptId = "active-campaign-migajas-form";

  /*
    Esperamos un instante para que el modal ya exista por completo
    antes de pedirle a ActiveCampaign que inyecte el formulario.
    Esto evita cargas duplicadas o trabadas en desarrollo.
  */
  const loadFormTimer = window.setTimeout(() => {
    const formContainer = document.getElementById(
      "migajas-activecampaign-form",
    );

    if (!formContainer) return;

    document.getElementById(scriptId)?.remove();

    formContainer.innerHTML = `<div class="${FORM_CLASS}"></div>`;

    const script = document.createElement("script");

    script.id = scriptId;
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;

    document.body.appendChild(script);
  }, 80);

  return () => {
    window.clearTimeout(loadFormTimer);

    document.getElementById(scriptId)?.remove();

    const formContainer = document.getElementById(
      "migajas-activecampaign-form",
    );

    if (formContainer) {
      formContainer.innerHTML = "";
    }
  };
}, [isModalOpen]);

  const openRegistrationModal = (source: "hero" | "mobile_sticky") => {
    trackMetaCustomEvent("OpenRegistrationModal", {
      content_name: "Ya no más migajas",
      content_category: "Terapia grupal gratuita",
      funnel_step: "registration_modal_open",
      lead_stage: "registration_intent",
      source,
    });

    setIsModalOpen(true);
  };

  return (
    <>
      <MetaPixel id="meta-pixel-ya-no-mas-migajas" />

      <main className="migajas-page">
        <span className="migajas-heart heart-one" aria-hidden="true" />
        <span className="migajas-heart heart-two" aria-hidden="true" />
        <span className="migajas-heart heart-three" aria-hidden="true" />
        <span className="migajas-heart heart-four" aria-hidden="true" />
        <span className="migajas-heart heart-five" aria-hidden="true" />
        <span className="migajas-heart heart-six" aria-hidden="true" />
        <span className="migajas-heart heart-seven" aria-hidden="true" />
        <span className="migajas-heart heart-eight" aria-hidden="true" />

        <section className="migajas-hero">
          <article className="migajas-card">
            <div className="migajas-brand" aria-label="Cressara">
              <img src={publicAsset(CRESSARA_LOGO)} alt="Cressara" />
            </div>

            <p className="migajas-badge">{campaign.badge}</p>

            <h1 className="migajas-title">
              <span className="migajas-title-pink">Ya no más migajas:</span>

              <span className="migajas-title-line">
                <span className="migajas-title-blue">Terapia grupal</span>{" "}
                <span className="migajas-title-black">para</span>
              </span>

              <span className="migajas-title-black">dejar de conformarte</span>

              <span className="migajas-title-black">con un amor a medias</span>
            </h1>

            <div className="migajas-date">
              <span className="migajas-date-icon" aria-hidden="true">
                ◷
              </span>

              <p>
                <strong>{campaign.date}</strong>
                <span>{campaign.time}</span>
              </p>
            </div>

            <div className="migajas-teacher">
              <span>{campaign.teacherLabel}</span>
              <strong>{campaign.teacherName}</strong>
            </div>

            <p className="migajas-support-copy">
              Una terapia grupal para dejar de normalizar relaciones a medias y
              empezar a elegir vínculos más sanos para ti.
            </p>

            <button
              type="button"
              className="migajas-primary-cta"
              onClick={() => openRegistrationModal("hero")}
            >
              <span className="migajas-cta-arrow" aria-hidden="true">
                →
              </span>
              Quiero mi acceso gratuito
            </button>
          </article>

          <div className="migajas-portrait-wrap">
            <div className="migajas-portrait-glow" aria-hidden="true" />

            <img
              src={publicAsset(campaign.imageUrl)}
              alt="Psicóloga Sonia Korey González Juárez"
              className="migajas-portrait"
              width={285}
              height={593}
            />
          </div>
        </section>

        <button
          type="button"
          className="migajas-mobile-cta"
          onClick={() => openRegistrationModal("mobile_sticky")}
        >
          Quiero mi acceso gratuito
        </button>

        {isModalOpen && (
          <div
            className="migajas-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="migajas-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <div className="migajas-modal">
              <button
                type="button"
                className="migajas-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar formulario"
              >
                ×
              </button>

              <div className="migajas-modal-heading">
                <span>TERAPIA GRUPAL GRATUITA</span>

                <h2 id="migajas-modal-title">Ya no más migajas</h2>

                <p>
                  Regístrate para reservar tu lugar del{" "}
                  <strong>
                    {campaign.date} · {campaign.time}
                  </strong>
                </p>
              </div>

              <div
                id="migajas-activecampaign-form"
                className="migajas-form-container"
              >
                {!ACTIVE_CAMPAIGN_FORM_ID && (
                  <p className="migajas-form-unavailable">
                    El formulario estará disponible muy pronto.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          :root {
            --migajas-pink: #ed5599;
            --migajas-pink-dark: #c63174;
            --migajas-blue: #225ec9;
            --migajas-red: #c92e42;
            --migajas-red-deep: #9d1730;
            --migajas-mint: #c9f7e4;
            --migajas-black: #151018;
            --migajas-paper: #fffdfd;
          }

          .migajas-page {
            position: relative;
            min-height: 100svh;
            overflow: hidden;
            color: var(--migajas-black);
            background:
              radial-gradient(
                circle at 18% 20%,
                rgba(255, 255, 255, 0.22),
                transparent 20%
              ),
              radial-gradient(
                circle at 78% 72%,
                rgba(185, 17, 84, 0.36),
                transparent 30%
              ),
              repeating-linear-gradient(
                125deg,
                rgba(255, 255, 255, 0.045) 0,
                rgba(255, 255, 255, 0.045) 1px,
                transparent 1px,
                transparent 17px
              ),
              linear-gradient(135deg, #f35ca5 0%, #e84d93 48%, #da3f84 100%);
          }

          .migajas-page::before {
            position: absolute;
            z-index: 0;
            inset: 0;
            content: "";
            opacity: 0.72;
            pointer-events: none;
            background:
              linear-gradient(
                130deg,
                transparent 0 46%,
                rgba(158, 17, 62, 0.1) 46% 48%,
                transparent 48% 100%
              ),
              linear-gradient(
                20deg,
                transparent 0 67%,
                rgba(255, 255, 255, 0.1) 67% 69%,
                transparent 69% 100%
              );
          }

          .migajas-hero {
            position: relative;
            z-index: 2;
            display: grid;
            width: min(100%, 1540px);
            min-height: 100svh;
            grid-template-columns: minmax(0, 1.18fr) minmax(380px, 0.82fr);
            align-items: center;
            gap: clamp(8px, 2vw, 40px);
            margin: 0 auto;
            padding: clamp(38px, 5vw, 82px) clamp(24px, 5vw, 84px);
          }

          .migajas-card {
            position: relative;
            z-index: 3;
            width: 100%;
            max-width: 780px;
            padding: clamp(28px, 3.4vw, 54px);
            border: 1px solid rgba(255, 255, 255, 0.92);
            border-radius: clamp(28px, 3vw, 42px);
            background: rgba(255, 253, 253, 0.97);
            box-shadow: 0 26px 70px rgba(110, 13, 55, 0.26);
            animation: migajas-card-enter 700ms cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .migajas-brand {
            display: inline-flex;
            align-items: center;
            gap: 16px;
          }

          .migajas-brand img {
            display: block;
            width: 148px;
            height: auto;
            object-fit: contain;
          }

          .migajas-badge {
            display: inline-flex;
            min-height: 42px;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0 19px;
            border-radius: 999px;
            background: var(--migajas-mint);
            color: var(--migajas-blue);
            font-size: clamp(12px, 1vw, 16px);
            font-weight: 900;
            letter-spacing: 0.01em;
          }

          .migajas-title {
            max-width: 700px;
            margin: 22px 0 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: clamp(42px, 4.7vw, 78px);
            font-weight: 900;
            letter-spacing: -0.075em;
            line-height: 0.87;
          }

          .migajas-title > span {
            display: block;
          }

          .migajas-title-pink {
            color: var(--migajas-pink);
          }

          .migajas-title-blue {
            color: var(--migajas-blue);
          }

          .migajas-title-black {
            color: var(--migajas-black);
          }

          .migajas-title-line {
            white-space: nowrap;
          }

          .migajas-support-copy {
            max-width: 590px;
            margin: 20px 0 0;
            color: #453640;
            font-size: clamp(14px, 1.1vw, 18px);
            font-weight: 700;
            line-height: 1.45;
          }

          .migajas-teacher {
            display: flex;
            width: fit-content;
            max-width: 100%;
            flex-direction: column;
            margin-top: 20px;
            padding: 13px 18px;
            border-radius: 20px;
            background: var(--migajas-pink);
            color: white;
            font-size: clamp(14px, 1.1vw, 18px);
            line-height: 1.16;
          }

          .migajas-teacher span {
            font-weight: 500;
          }

          .migajas-teacher strong {
            margin-top: 4px;
            font-weight: 900;
          }

          .migajas-date {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 20px;
            color: var(--migajas-blue);
          }

          .migajas-date-icon {
            display: grid;
            width: 42px;
            height: 42px;
            place-items: center;
            border-radius: 50%;
            background: #e8f0ff;
            font-size: 25px;
            font-weight: 900;
          }

          .migajas-date p {
            display: flex;
            flex-direction: column;
            margin: 0;
            font-size: clamp(14px, 1.15vw, 19px);
            line-height: 1.18;
          }

          .migajas-date strong {
            font-weight: 900;
          }

          .migajas-date span:last-child {
            margin-top: 3px;
            font-weight: 800;
          }

          .migajas-primary-cta {
            display: inline-flex;
            width: min(100%, 555px);
            min-height: 64px;
            align-items: center;
            justify-content: center;
            gap: 14px;
            margin-top: 24px;
            padding: 0 24px;
            border: 0;
            border-radius: 999px;
            background: var(--migajas-blue);
            color: white;
            cursor: pointer;
            font-size: clamp(14px, 1.2vw, 20px);
            font-weight: 900;
            letter-spacing: 0.005em;
            text-transform: uppercase;
            box-shadow:
              0 7px 0 #154596,
              0 18px 30px rgba(20, 56, 132, 0.25);
            transition:
              transform 180ms ease,
              box-shadow 180ms ease,
              background 180ms ease;
            animation: migajas-cta-pulse 3.5s ease-in-out 1.2s infinite;
          }

          .migajas-primary-cta:hover {
            background: #2e6ee3;
            transform: translateY(-2px);
            box-shadow:
              0 9px 0 #154596,
              0 22px 36px rgba(20, 56, 132, 0.3);
          }

          .migajas-primary-cta:active {
            transform: translateY(2px);
            box-shadow:
              0 4px 0 #154596,
              0 10px 20px rgba(20, 56, 132, 0.22);
          }

          .migajas-cta-arrow {
            display: grid;
            width: 34px;
            height: 34px;
            place-items: center;
            border-radius: 50%;
            background: white;
            color: var(--migajas-blue);
            font-size: 25px;
            line-height: 1;
          }

          .migajas-portrait-wrap {
            position: relative;
            z-index: 2;
            display: flex;
            min-height: min(88svh, 820px);
            align-items: flex-end;
            justify-content: flex-end;
            align-self: end;
          }

          .migajas-portrait-glow {
            position: absolute;
            right: 4%;
            bottom: 6%;
            width: min(35vw, 500px);
            height: min(35vw, 500px);
            border-radius: 50%;
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.28),
              rgba(255, 255, 255, 0.04) 48%,
              transparent 70%
            );
            filter: blur(8px);
          }

          .migajas-portrait {
            position: relative;
            z-index: 2;
            display: block;
            width: min(38vw, 570px);
            max-height: min(88svh, 810px);
            object-fit: contain;
            object-position: bottom center;
            filter: drop-shadow(4px 0 0 #ffffff) drop-shadow(-4px 0 0 #ffffff)
              drop-shadow(0 4px 0 #ffffff) drop-shadow(0 -4px 0 #ffffff)
              drop-shadow(0 25px 36px rgba(99, 10, 45, 0.32));
            animation: migajas-photo-enter 800ms cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .migajas-heart {
            position: absolute;
            z-index: 1;
            width: 70px;
            height: 70px;
            border-radius: 10px 0 12px 0;
            opacity: 0.8;
            pointer-events: none;
            transform: rotate(-45deg);
            background:
              linear-gradient(
                130deg,
                rgba(255, 118, 118, 0.3),
                transparent 45%
              ),
              var(--migajas-red);
            box-shadow:
              inset 7px 4px 14px rgba(255, 255, 255, 0.16),
              0 15px 27px rgba(115, 5, 33, 0.18);
          }

          .migajas-heart::before,
          .migajas-heart::after {
            position: absolute;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            content: "";
            background: inherit;
          }

          .migajas-heart::before {
            top: -35px;
            left: 0;
          }

          .migajas-heart::after {
            top: 0;
            left: 35px;
          }

          .heart-one {
            top: 6%;
            left: 3%;
            transform: rotate(-28deg) scale(1.22);
          }

          .heart-two {
            top: 28%;
            left: 1%;
            opacity: 0.62;
            transform: rotate(-62deg) scale(0.74);
          }

          .heart-three {
            bottom: 8%;
            left: 7%;
            transform: rotate(-12deg) scale(1.05);
          }

          .heart-four {
            top: 8%;
            right: 5%;
            transform: rotate(-36deg) scale(0.92);
          }

          .heart-five {
            top: 35%;
            right: 1%;
            opacity: 0.58;
            transform: rotate(-58deg) scale(1.1);
          }

          .heart-six {
            right: 12%;
            bottom: 8%;
            transform: rotate(-15deg) scale(0.65);
          }

          .heart-seven {
            top: 16%;
            left: 50%;
            opacity: 0.36;
            transform: rotate(-52deg) scale(0.48);
          }

          .heart-eight {
            bottom: 19%;
            left: 45%;
            opacity: 0.4;
            transform: rotate(-26deg) scale(0.6);
          }

          .migajas-mobile-cta {
            display: none;
          }

          .migajas-modal-backdrop {
            position: fixed;
            z-index: 100;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            background: rgba(52, 5, 30, 0.82);
            backdrop-filter: blur(9px);
          }

          .migajas-modal {
            position: relative;
            display: flex;
            width: min(100%, 560px);
            max-height: min(92svh, 850px);
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.72);
            border-top: 7px solid var(--migajas-pink);
            border-radius: 22px;
            background: white;
            box-shadow: 0 30px 100px rgba(0, 0, 0, 0.45);
            animation: migajas-modal-enter 240ms ease-out both;
          }

          .migajas-modal-close {
            position: absolute;
            z-index: 3;
            top: 15px;
            right: 17px;
            display: grid;
            width: 35px;
            height: 35px;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: #f7e8ef;
            color: #843359;
            cursor: pointer;
            font-size: 27px;
            font-weight: 300;
            line-height: 1;
          }

          .migajas-modal-heading {
            padding: 31px 55px 18px 28px;
          }

          .migajas-modal-heading > span {
            color: var(--migajas-blue);
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.15em;
          }

          .migajas-modal-heading h2 {
            margin: 8px 0 0;
            color: var(--migajas-pink);
            font-size: clamp(31px, 6vw, 42px);
            font-weight: 900;
            letter-spacing: -0.07em;
            line-height: 0.92;
          }

          .migajas-modal-heading p {
            margin: 12px 0 0;
            color: #6b5864;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.45;
          }

          .migajas-modal-heading p strong {
            color: var(--migajas-blue);
          }

          .migajas-form-container {
            min-height: 0;
            flex: 1;
            overflow-y: auto;
            padding: 0 16px 26px;
          }

          .migajas-form-unavailable {
            margin: 24px 0;
            color: #725b67;
            text-align: center;
          }

          @keyframes migajas-card-enter {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes migajas-photo-enter {
            from {
              opacity: 0;
              transform: translateY(28px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes migajas-cta-pulse {
            0%,
            100% {
              box-shadow:
                0 7px 0 #154596,
                0 18px 30px rgba(20, 56, 132, 0.25),
                0 0 0 0 rgba(34, 94, 201, 0.16);
            }

            50% {
              box-shadow:
                0 8px 0 #154596,
                0 21px 36px rgba(20, 56, 132, 0.3),
                0 0 0 9px rgba(34, 94, 201, 0);
            }
          }

          @keyframes migajas-modal-enter {
            from {
              opacity: 0;
              transform: translateY(14px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (max-width: 1100px) and (min-width: 901px) {
            .migajas-hero {
              grid-template-columns: minmax(390px, 1.15fr) minmax(330px, 0.85fr);
              padding: 38px 28px;
            }

            .migajas-card {
              max-width: 620px;
              padding: 31px;
            }

            .migajas-title {
              font-size: clamp(39px, 4.4vw, 57px);
            }

            .migajas-portrait {
              width: min(39vw, 470px);
            }
          }

          @media (max-width: 900px) {
            .migajas-page {
              min-height: 100svh;
              overflow: visible;
              padding-bottom: 116px;
            }

            .migajas-page::before {
              opacity: 0.5;
            }

            .migajas-heart {
              opacity: 0.34;
            }

            .heart-one {
              top: 5%;
              left: -4%;
              transform: rotate(-28deg) scale(0.78);
            }

            .heart-two {
              display: none;
            }

            .heart-three {
              bottom: 16%;
              left: -5%;
              transform: rotate(-12deg) scale(0.6);
            }

            .heart-four {
              top: 6%;
              right: 0;
              transform: rotate(-36deg) scale(0.63);
            }

            .heart-five {
              display: none;
            }

            .heart-six {
              right: -3%;
              bottom: 25%;
              transform: rotate(-15deg) scale(0.44);
            }

            .heart-seven {
              display: none;
            }

            .heart-eight {
              bottom: 48%;
              left: 5%;
              transform: rotate(-26deg) scale(0.4);
            }

            .migajas-hero {
              display: flex;
              min-height: auto;
              flex-direction: column-reverse;
              gap: 0;
              padding: 0 12px 30px;
            }

            .migajas-portrait-wrap {
              display: flex;
              width: 100%;
              min-height: 218px;
              align-items: flex-end;
              justify-content: center;
              margin: 0;
            }

            .migajas-portrait-glow {
              right: auto;
              bottom: -4%;
              left: 50%;
              width: 290px;
              height: 250px;
              transform: translateX(-50%);
            }

            .migajas-portrait {
              width: min(68vw, 282px);
              max-height: 266px;
            }

            .migajas-card {
              width: 100%;
              max-width: 620px;
              margin: -16px auto 0;
              padding: 22px 18px 26px;
              border-radius: 27px;
              box-shadow: 0 8px 42px rgba(106, 13, 50, 0.2);
            }

            .migajas-brand {
              margin-bottom: 12px;
            }

            .migajas-brand img {
              width: 126px;
            }

            .migajas-brand-mark {
              width: 27px;
              height: 27px;
              border-width: 3px;
              font-size: 25px;
            }

            .migajas-brand-text strong {
              font-size: 19px;
            }

            .migajas-brand-text small {
              font-size: 7px;
            }

            .migajas-badge {
              display: flex;
              width: 100%;
              min-height: 38px;
              padding: 0 12px;
              font-size: 10px;
            }

            .migajas-title {
              margin-top: 16px;
              font-size: clamp(34px, 9.4vw, 41px);
              line-height: 0.88;
              letter-spacing: -0.07em;
            }

            .migajas-title-line {
              white-space: normal;
            }

            .migajas-support-copy {
              margin-top: 14px;
              font-size: 13px;
              line-height: 1.4;
            }

            .migajas-teacher {
              width: 100%;
              margin-top: 15px;
              padding: 10px 13px;
              border-radius: 16px;
              font-size: 14px;
            }

            .migajas-date {
              gap: 9px;
              margin-top: 15px;
              padding-top: 14px;
              border-top: 1px solid rgba(34, 94, 201, 0.16);
            }

            .migajas-date-icon {
              width: 32px;
              height: 32px;
              flex: 0 0 32px;
              font-size: 19px;
            }

            .migajas-date p {
              display: flex;
              flex: 1;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              gap: 4px 6px;
              font-size: 13px;
              line-height: 1.25;
            }

            .migajas-date p strong::after {
              content: "·";
            }

            .migajas-date span:last-child {
              margin-top: 0;
            }

            .migajas-primary-cta {
              display: none;
            }

            .migajas-mobile-cta {
              position: fixed;
              z-index: 50;
              right: 12px;
              bottom: calc(12px + env(safe-area-inset-bottom));
              left: 12px;

              display: flex;
              min-height: 58px;
              align-items: center;
              justify-content: center;

              padding: 0 18px;
              border: 0;
              border-radius: 18px;

              background: linear-gradient(135deg, #2c6fe1 0%, #225ec9 100%);
              color: white;
              cursor: pointer;

              font-size: 13px;
              font-weight: 900;
              letter-spacing: 0.01em;
              text-transform: uppercase;

              box-shadow:
                0 6px 0 #154596,
                0 18px 34px rgba(20, 56, 132, 0.34);
            }

            .migajas-modal-backdrop {
              padding: 10px;
            }

            .migajas-modal-heading {
              padding: 29px 52px 17px 22px;
            }

            .migajas-form-container {
              padding: 0 10px 20px;
            }
          }

          @media (max-width: 390px) {
            .migajas-portrait-wrap {
              min-height: 220px;
            }

            .migajas-portrait {
              width: min(74vw, 280px);
              max-height: 265px;
            }

            .migajas-card {
              padding: 22px 17px 27px;
            }

            .migajas-title {
              font-size: 36px;
            }

            .migajas-support-copy {
              font-size: 13px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .migajas-card,
            .migajas-portrait,
            .migajas-primary-cta,
            .migajas-modal {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}
