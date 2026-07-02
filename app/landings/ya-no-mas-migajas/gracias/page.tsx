"use client";

import { useEffect } from "react";
import { MetaPixel } from "@/app/components/MetaPixel";
import { getCampaign } from "@/lib/landings";
import {
  trackMetaCustomEventWhenReady,
  trackMetaEventWhenReady,
} from "@/lib/meta-pixel";

const campaign = getCampaign("ya-no-mas-migajas");

const CRESSARA_LOGO = "/logos/cressara_logo_normal.png";
const WHATSAPP_URL = campaign.whatsappUrl;
const PUBLIC_ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cresara-landings.vercel.app"
    : "";

const publicAsset = (path: string) =>
  path.startsWith("/") ? `${PUBLIC_ASSET_BASE}${path}` : path;

export default function GraciasYaNoMasMigajasPage() {
  useEffect(() => {
    document.title = "¡Registro confirmado! | Ya no más migajas";

    return trackMetaEventWhenReady("CompleteRegistration", {
      content_name: "Ya no más migajas",
      content_category: "Terapia grupal gratuita",
      status: "completed",
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaCustomEventWhenReady("WhatsAppGroupClick", {
      content_name: "Ya no más migajas",
      content_category: "Terapia grupal gratuita",
      funnel_step: "whatsapp_group_click",
      status: "redirected_to_whatsapp",
    });
  };

  return (
    <>
      <MetaPixel
        id="meta-pixel-ya-no-mas-migajas-thankyou"
        noscriptEvent="CompleteRegistration"
      />

      <main className="migajas-thankyou-page">
        <span className="thank-heart thank-heart-one" aria-hidden="true">
          ♥
        </span>
        <span className="thank-heart thank-heart-two" aria-hidden="true">
          ♥
        </span>
        <span className="thank-heart thank-heart-three" aria-hidden="true">
          ♥
        </span>
        <span className="thank-heart thank-heart-four" aria-hidden="true">
          ♥
        </span>
        <span className="thank-heart thank-heart-five" aria-hidden="true">
          ♥
        </span>

        <section className="thankyou-shell">
          <article className="thankyou-card">
            <div className="thankyou-brand">
              <img src={publicAsset(CRESSARA_LOGO)} alt="Cressara" />
            </div>

            <h1>
              ¡No dejes tu registro
              <span> a medias!</span>
            </h1>

            <p className="thankyou-intro">
              Para completar tu acceso a <strong>“Ya no más migajas”</strong>{" "}
              necesitas entrar al grupo privado de WhatsApp.
            </p>

            <div className="thankyou-steps">
              <div className="thankyou-step">
                <span className="thankyou-step-number">1</span>

                <div>
                  <strong>Entra al grupo privado de WhatsApp</strong>
                  <p>
                    Ahí recibirás el enlace de acceso, recordatorios y
                    materiales importantes.
                  </p>
                </div>
              </div>

              {WHATSAPP_URL ? (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="thankyou-whatsapp-cta"
                  onClick={handleWhatsAppClick}
                >
                  <span className="thankyou-whatsapp-icon" aria-hidden="true">
                    ◔
                  </span>

                  <span>Entrar al grupo de WhatsApp</span>

                  <span className="thankyou-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ) : (
                <p className="thankyou-whatsapp-unavailable">
                  El grupo de WhatsApp estará disponible muy pronto.
                </p>
              )}
              <br />
              <div className="thankyou-step">
                <span className="thankyou-step-number">2</span>

                <div>
                  <strong>Activa las notificaciones</strong>
                  <p>
                    Así no te perderás la sesión ni las instrucciones previas.
                  </p>
                </div>
              </div>
            </div>

            <p className="thankyou-warning">
              No cierres esta página hasta confirmar que ya entraste al grupo.
            </p>

            <div className="thankyou-event-card">
              <span className="thankyou-event-label">TU SESIÓN</span>

              <strong>Ya no más migajas</strong>

              <p>
                {campaign.date}
                <span>·</span>
                {campaign.time}
              </p>
            </div>
          </article>

          <div className="thankyou-portrait-wrap">
            <div className="thankyou-portrait-glow" aria-hidden="true" />

            <div className="thankyou-photo-label">
              <span>Impartido por la psicóloga</span>
              <strong>Sonia Korey González Juárez</strong>
            </div>

            <img
              src={publicAsset(campaign.imageUrl)}
              alt="Psicóloga Sonia Korey González Juárez"
              className="thankyou-portrait"
              width={285}
              height={593}
            />
          </div>
        </section>

        <style jsx global>{`
          :root {
            --thank-pink: #ed5599;
            --thank-pink-dark: #c63174;
            --thank-blue: #225ec9;
            --thank-red: #c92e42;
            --thank-black: #151018;
            --thank-mint: #c9f7e4;
            --thank-green: #20b866;
            --thank-green-dark: #138447;
          }

          .migajas-thankyou-page {
            position: relative;
            min-height: 100svh;
            overflow: hidden;
            color: var(--thank-black);
            background:
              radial-gradient(
                circle at 20% 15%,
                rgba(255, 255, 255, 0.21),
                transparent 21%
              ),
              radial-gradient(
                circle at 79% 72%,
                rgba(175, 18, 76, 0.3),
                transparent 31%
              ),
              repeating-linear-gradient(
                125deg,
                rgba(255, 255, 255, 0.045) 0,
                rgba(255, 255, 255, 0.045) 1px,
                transparent 1px,
                transparent 18px
              ),
              linear-gradient(135deg, #f35fa6 0%, #e94d93 48%, #da3e84 100%);
          }

          .migajas-thankyou-page::before {
            position: absolute;
            z-index: 0;
            inset: 0;
            content: "";
            pointer-events: none;
            background:
              linear-gradient(
                130deg,
                transparent 0 44%,
                rgba(139, 11, 53, 0.08) 44% 47%,
                transparent 47% 100%
              ),
              linear-gradient(
                22deg,
                transparent 0 70%,
                rgba(255, 255, 255, 0.09) 70% 72%,
                transparent 72% 100%
              );
          }

          .thankyou-shell {
            position: relative;
            z-index: 2;
            display: grid;
            width: min(100%, 1450px);
            min-height: 100svh;
            grid-template-columns: minmax(430px, 0.95fr) minmax(360px, 0.75fr);
            align-items: center;
            gap: clamp(20px, 5vw, 90px);
            margin: 0 auto;
            padding: clamp(32px, 5vw, 74px) clamp(22px, 5vw, 82px);
          }

          .thankyou-card {
            position: relative;
            width: 100%;
            max-width: 680px;
            padding: clamp(28px, 3.5vw, 52px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            border-radius: clamp(28px, 3vw, 40px);
            background: rgba(255, 253, 253, 0.97);
            box-shadow: 0 28px 70px rgba(110, 13, 55, 0.25);
            animation: thank-card-enter 700ms cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .thankyou-brand {
            display: inline-flex;
            margin-bottom: 20px;
          }

          .thankyou-brand img {
            display: block;
            width: 145px;
            height: auto;
            object-fit: contain;
          }

          .thankyou-success-icon {
            display: grid;
            width: 54px;
            height: 54px;
            place-items: center;
            border-radius: 50%;
            background: var(--thank-mint);
            color: var(--thank-blue);
            box-shadow: 0 10px 22px rgba(34, 94, 201, 0.13);
            font-size: 31px;
            font-weight: 900;
          }

          .thankyou-eyebrow {
            margin: 17px 0 0;
            color: var(--thank-blue);
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.14em;
          }

          .thankyou-card h1 {
            max-width: 560px;
            margin: 10px 0 0;
            color: var(--thank-black);
            font-family: Arial, Helvetica, sans-serif;
            font-size: clamp(44px, 4.4vw, 72px);
            font-weight: 900;
            letter-spacing: -0.075em;
            line-height: 0.88;
          }

          .thankyou-card h1 span {
            display: block;
            color: var(--thank-pink);
          }

          .thankyou-intro {
            max-width: 550px;
            margin: 20px 0 0;
            color: #473740;
            font-size: clamp(14px, 1.08vw, 18px);
            font-weight: 650;
            line-height: 1.48;
          }

          .thankyou-intro strong {
            color: var(--thank-pink-dark);
          }

          .thankyou-steps {
            display: grid;
            gap: 13px;
            margin-top: 23px;
          }

          .thankyou-step {
            display: grid;
            grid-template-columns: 38px 1fr;
            align-items: start;
            gap: 12px;
            padding: 14px 15px;
            border: 1px solid rgba(34, 94, 201, 0.1);
            border-radius: 18px;
            background: rgba(237, 245, 255, 0.58);
          }

          .thankyou-step-number {
            display: grid;
            width: 33px;
            height: 33px;
            place-items: center;
            border-radius: 50%;
            background: var(--thank-blue);
            color: white;
            font-size: 15px;
            font-weight: 900;
          }

          .thankyou-step strong {
            color: var(--thank-black);
            font-size: clamp(14px, 1vw, 17px);
            font-weight: 900;
          }

          .thankyou-step p {
            margin: 4px 0 0;
            color: #66545f;
            font-size: clamp(12px, 0.87vw, 14px);
            font-weight: 600;
            line-height: 1.35;
          }

          .thankyou-whatsapp-cta {
            display: flex;
            width: 100%;
            min-height: 64px;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 22px;
            padding: 0 20px;
            border-radius: 999px;
            background: linear-gradient(
              135deg,
              #2bc978 0%,
              var(--thank-green) 100%
            );
            color: white;
            text-decoration: none;
            font-size: clamp(14px, 1.12vw, 18px);
            font-weight: 900;
            letter-spacing: 0.005em;
            text-transform: uppercase;
            box-shadow:
              0 7px 0 var(--thank-green-dark),
              0 17px 30px rgba(18, 119, 63, 0.25);
            transition:
              transform 180ms ease,
              box-shadow 180ms ease,
              filter 180ms ease;
          }

          .thankyou-whatsapp-cta:hover {
            filter: brightness(1.04);
            transform: translateY(-2px);
            box-shadow:
              0 9px 0 var(--thank-green-dark),
              0 22px 35px rgba(18, 119, 63, 0.3);
          }

          .thankyou-whatsapp-icon {
            display: grid;
            width: 34px;
            height: 34px;
            place-items: center;
            border-radius: 50%;
            background: white;
            color: var(--thank-green);
            font-size: 22px;
            font-weight: 900;
          }

          .thankyou-arrow {
            font-size: 24px;
            line-height: 1;
          }

          .thankyou-warning {
            margin: 14px 0 0;
            color: #80636f;
            font-size: 12px;
            font-weight: 700;
            text-align: center;
          }

          .thankyou-whatsapp-unavailable {
            margin: 22px 0 0;
            padding: 15px;
            border-radius: 16px;
            background: #fff0f5;
            color: var(--thank-pink-dark);
            font-weight: 800;
            text-align: center;
          }

          .thankyou-event-card {
            display: flex;
            flex-direction: column;
            margin-top: 22px;
            padding: 15px 17px;
            border-top: 1px solid rgba(34, 94, 201, 0.14);
            color: var(--thank-blue);
          }

          .thankyou-event-label {
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.14em;
          }

          .thankyou-event-card strong {
            margin-top: 5px;
            color: var(--thank-pink);
            font-size: clamp(17px, 1.2vw, 21px);
            font-weight: 900;
          }

          .thankyou-event-card p {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 6px 0 0;
            font-size: 14px;
            font-weight: 800;
          }

          .thankyou-portrait-wrap {
            position: relative;
            display: flex;
            min-height: min(87svh, 790px);
            align-items: flex-end;
            justify-content: center;
            align-self: end;
          }

          .thankyou-portrait-glow {
            position: absolute;
            right: 50%;
            bottom: 6%;
            width: min(34vw, 480px);
            height: min(34vw, 480px);
            border-radius: 50%;
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.29),
              rgba(255, 255, 255, 0.04) 50%,
              transparent 70%
            );
            filter: blur(8px);
            transform: translateX(50%);
          }

          .thankyou-photo-label {
            position: absolute;
            z-index: 4;
            right: clamp(0px, 1vw, 16px);
            bottom: clamp(28px, 5vw, 72px);
            max-width: 250px;
            padding: 14px 16px;
            border-radius: 18px;
            background: rgba(255, 253, 253, 0.94);
            box-shadow: 0 14px 30px rgba(112, 10, 50, 0.18);
          }

          .thankyou-photo-label span {
            display: block;
            color: var(--thank-blue);
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .thankyou-photo-label strong {
            display: block;
            margin-top: 5px;
            color: var(--thank-pink);
            font-size: 16px;
            font-weight: 900;
            line-height: 1.1;
          }

          .thankyou-portrait {
            position: relative;
            z-index: 3;
            display: block;
            width: min(36vw, 525px);
            max-height: min(87svh, 780px);
            object-fit: contain;
            object-position: bottom center;
            filter: drop-shadow(4px 0 0 #ffffff) drop-shadow(-4px 0 0 #ffffff)
              drop-shadow(0 4px 0 #ffffff) drop-shadow(0 -4px 0 #ffffff)
              drop-shadow(0 24px 36px rgba(96, 7, 43, 0.31));
            animation: thank-photo-enter 780ms cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .thank-heart {
            position: absolute;
            z-index: 1;
            color: var(--thank-red);
            font-size: 90px;
            line-height: 1;
            opacity: 0.58;
            pointer-events: none;
            text-shadow: 0 17px 25px rgba(111, 4, 36, 0.18);
          }

          .thank-heart-one {
            top: 7%;
            left: 4%;
            font-size: 115px;
            transform: rotate(-22deg);
          }

          .thank-heart-two {
            top: 34%;
            left: -1%;
            font-size: 78px;
            opacity: 0.45;
            transform: rotate(18deg);
          }

          .thank-heart-three {
            right: 6%;
            bottom: 9%;
            font-size: 104px;
            transform: rotate(14deg);
          }

          .thank-heart-four {
            top: 10%;
            right: 5%;
            font-size: 74px;
            opacity: 0.52;
            transform: rotate(-16deg);
          }

          .thank-heart-five {
            bottom: 11%;
            left: 37%;
            font-size: 63px;
            opacity: 0.35;
            transform: rotate(28deg);
          }

          @keyframes thank-card-enter {
            from {
              opacity: 0;
              transform: translateY(24px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes thank-photo-enter {
            from {
              opacity: 0;
              transform: translateY(26px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (max-width: 1050px) and (min-width: 901px) {
            .thankyou-shell {
              grid-template-columns: minmax(390px, 1fr) minmax(300px, 0.7fr);
              gap: 15px;
              padding: 35px 28px;
            }

            .thankyou-card {
              max-width: 610px;
              padding: 31px;
            }

            .thankyou-card h1 {
              font-size: clamp(40px, 4.4vw, 57px);
            }

            .thankyou-portrait {
              width: min(38vw, 455px);
            }
          }

          @media (max-width: 900px) {
            .migajas-thankyou-page {
              min-height: 100svh;
              overflow: visible;
              padding-bottom: 30px;
            }

            .thank-heart {
              opacity: 0.28;
            }

            .thank-heart-one {
              top: 2%;
              left: -4%;
              font-size: 75px;
            }

            .thank-heart-two {
              display: none;
            }

            .thank-heart-three {
              right: -4%;
              bottom: 12%;
              font-size: 70px;
            }

            .thank-heart-four {
              top: 8%;
              right: -3%;
              font-size: 58px;
            }

            .thank-heart-five {
              bottom: 42%;
              left: 2%;
              font-size: 45px;
            }

            .thankyou-shell {
              display: flex;
              min-height: auto;
              flex-direction: column-reverse;
              gap: 0;
              padding: 0 14px 20px;
            }

            .thankyou-portrait-wrap {
              width: 100%;
              min-height: 238px;
              align-items: flex-end;
              margin: 0;
            }

            .thankyou-portrait-glow {
              right: auto;
              bottom: -3%;
              left: 50%;
              width: 290px;
              height: 240px;
              transform: translateX(-50%);
            }

            .thankyou-photo-label {
              right: 14px;
              bottom: 15px;
              max-width: 170px;
              padding: 10px 12px;
              border-radius: 14px;
            }

            .thankyou-photo-label span {
              font-size: 8px;
            }

            .thankyou-photo-label strong {
              font-size: 12px;
            }

            .thankyou-portrait {
              width: min(73vw, 300px);
              max-height: 292px;
            }

            .thankyou-card {
              max-width: 620px;
              margin: -7px auto 0;
              padding: 24px 19px 27px;
              border-radius: 28px;
              box-shadow: 0 18px 42px rgba(106, 13, 50, 0.22);
            }

            .thankyou-brand {
              margin-bottom: 15px;
            }

            .thankyou-brand img {
              width: 124px;
            }

            .thankyou-success-icon {
              width: 47px;
              height: 47px;
              font-size: 27px;
            }

            .thankyou-eyebrow {
              margin-top: 14px;
              font-size: 10px;
            }

            .thankyou-card h1 {
              margin-top: 8px;
              font-size: clamp(39px, 10.6vw, 48px);
              line-height: 0.88;
            }

            .thankyou-intro {
              margin-top: 16px;
              font-size: 14px;
              line-height: 1.42;
            }

            .thankyou-steps {
              gap: 10px;
              margin-top: 18px;
            }

            .thankyou-step {
              grid-template-columns: 33px 1fr;
              gap: 10px;
              padding: 12px;
              border-radius: 15px;
            }

            .thankyou-step-number {
              width: 29px;
              height: 29px;
              font-size: 13px;
            }

            .thankyou-step strong {
              font-size: 14px;
            }

            .thankyou-step p {
              font-size: 12px;
            }

            .thankyou-whatsapp-cta {
              min-height: 57px;
              margin-top: 19px;
              padding: 0 14px;
              border-radius: 17px;
              font-size: 13px;
              text-align: center;
            }

            .thankyou-warning {
              font-size: 11px;
            }

            .thankyou-event-card {
              margin-top: 18px;
              padding: 14px 2px 0;
            }

            .thankyou-event-card strong {
              font-size: 17px;
            }

            .thankyou-event-card p {
              font-size: 13px;
            }
          }

          @media (max-width: 390px) {
            .thankyou-portrait-wrap {
              min-height: 214px;
            }

            .thankyou-portrait {
              width: min(70vw, 272px);
              max-height: 264px;
            }

            .thankyou-card {
              padding: 21px 17px 25px;
            }

            .thankyou-card h1 {
              font-size: 38px;
            }

            .thankyou-intro {
              font-size: 13px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .thankyou-card,
            .thankyou-portrait {
              animation: none !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}
