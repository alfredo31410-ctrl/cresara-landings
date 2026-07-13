import Image from "next/image";
import { MetaPixel } from "@/app/components/MetaPixel";
import { EbookMotion } from "./EbookMotion";
import { EbookTracking } from "./EbookTracking";
import "./ebook.css";

const ASSET_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://cresara-landings.vercel.app"
    : "";

const assetUrl = (path: string) => `${ASSET_ORIGIN}${path}`;

export default function EbookLandingPage() {
  return (
    <>
      <MetaPixel id="meta-pixel-ebook" />

      <main className="ebook-page">
        <EbookMotion />
        <EbookTracking />

      <section className="ebook-hero" aria-labelledby="ebook-title">
        <Image
          className="ebook-hero__background"
          src={assetUrl("/landings/ebook/hero.png")}
          alt="Mujer reconectando consigo misma junto al ebook Un espacio para volver a ti"
          fill
          sizes="100vw"
          priority
        />

        <div className="ebook-hero__content">
          <Image
            className="ebook-logo"
            src={assetUrl("/logos/cressara_logo_normal.png")}
            alt="Cressara — Transforma, sana, crece"
            width={190}
            height={76}
            priority
          />

          <p className="ebook-eyebrow">Un espacio creado para ti</p>

          <h1 id="ebook-title" className="ebook-title">
            Tal vez no extrañas un lugar…
            <span>tal vez te extrañas a ti.</span>
          </h1>

          <p className="ebook-description">
            Un ebook para reconectar contigo, sanar desde adentro y volver a
            elegirte con amor.
          </p>

          <div className="ebook-offer">
            <div className="ebook-price" aria-label="Precio: 57 pesos">
              <small>Por solo</small>
              <strong>$57</strong>
            </div>

            <a
              className="ebook-cta"
              href="https://pay.hotmart.com/A106633240D?off=bzllkqlr&checkoutMode=10&bid=1783970041714"
              data-meta-checkout="ebook"
            >
              <span aria-hidden="true">♡</span>
              Quiero volver a mí
            </a>
          </div>

          <ul className="ebook-features" aria-label="Beneficios de compra">
            <li>Acceso inmediato</li>
            <li>Descarga digital</li>
            <li>Lee a tu ritmo</li>
          </ul>
        </div>
      </section>
      <section className="ebook-problem" aria-labelledby="problem-title">
        <div className="ebook-problem__intro">
          <p className="ebook-problem__eyebrow">Es momento de volver a ti</p>

          <h2 id="problem-title">¿Te has estado dejando para después?</h2>

          <p>
            No estás sola. A veces la vida avanza tan rápido que, sin darnos
            cuenta, dejamos de escuchar lo más importante:
          </p>

          <strong>a nosotras mismas.</strong>
        </div>

        <div className="ebook-problem__cards">
          <article className="problem-card">
            <span aria-hidden="true">✿</span>
            <h3>Mente saturada</h3>
            <p>
              Demasiados pensamientos, pendientes y preocupaciones que no te
              dejan descansar.
            </p>
          </article>

          <article className="problem-card">
            <span aria-hidden="true">◷</span>
            <h3>Sin tiempo para ti</h3>
            <p>
              Siempre hay algo más urgente y tus propias necesidades quedan al
              final.
            </p>
          </article>

          <article className="problem-card">
            <span aria-hidden="true">♡</span>
            <h3>Desconectada de ti</h3>
            <p>
              Ya no sabes con claridad qué sientes, qué necesitas o qué deseas.
            </p>
          </article>

          <article className="problem-card">
            <span aria-hidden="true">♨</span>
            <h3>Necesitas una pausa</h3>
            <p>
              Tu cuerpo y tu corazón te están pidiendo detenerte, respirar y
              volver a ti.
            </p>
          </article>
        </div>
      </section>

      <section className="ebook-mid-cta" aria-labelledby="mid-cta-title">
        <div className="ebook-mid-cta__icon" aria-hidden="true">
          ♡
        </div>

        <div className="ebook-mid-cta__copy">
          <p>No tienes que seguir dejándote para después</p>
          <h2 id="mid-cta-title">Hoy también puedes elegirte a ti</h2>
          <span>
            Da el primer paso hacia una relación más amorosa contigo misma.
          </span>
        </div>

        <div className="ebook-mid-cta__action">
          <a
            href="https://pay.hotmart.com/A106633240D?off=bzllkqlr&checkoutMode=10&bid=1783970041714"
            data-meta-checkout="ebook"
          >
            Quiero comenzar ahora
            <span aria-hidden="true">♡</span>
          </a>
          <small>Acceso inmediato · Descarga digital</small>
        </div>
      </section>

      <section className="ebook-benefits" aria-labelledby="benefits-title">
        <div className="ebook-section-heading">
          <p>Lo que comenzarás a transformar</p>

          <h2 id="benefits-title">
            Lo que este ebook puede ayudarte a cultivar
          </h2>

          <span aria-hidden="true">♡</span>
        </div>

        <div className="ebook-benefits__grid">
          <article className="benefit-item">
            <span className="benefit-item__icon" aria-hidden="true">
              ♡
            </span>

            <h3>Más amor propio</h3>

            <p>Aprende a valorarte, cuidarte y tratarte con amor cada día.</p>
          </article>

          <article className="benefit-item">
            <span className="benefit-item__icon" aria-hidden="true">
              ❀
            </span>

            <h3>Más paz mental</h3>

            <p>Reduce el ruido mental y recupera la calma en tu interior.</p>
          </article>

          <article className="benefit-item">
            <span className="benefit-item__icon" aria-hidden="true">
              ◷
            </span>

            <h3>Más tiempo para ti</h3>

            <p>Organiza tus días para priorizar lo que realmente importa.</p>
          </article>

          <article className="benefit-item">
            <span className="benefit-item__icon" aria-hidden="true">
              ☀
            </span>

            <h3>Más energía y bienestar</h3>

            <p>
              Incorpora hábitos sencillos para sentirte con mayor vitalidad.
            </p>
          </article>

          <article className="benefit-item">
            <span className="benefit-item__icon" aria-hidden="true">
              ♡
            </span>

            <h3>Más conexión contigo</h3>

            <p>Vuelve a escuchar tu corazón y a confiar en tu intuición.</p>
          </article>
        </div>
      </section>


      <section className="ebook-contents" aria-labelledby="contents-title">
        <div className="ebook-section-heading">
          <p>Un camino de regreso hacia ti</p>

          <h2 id="contents-title">Lo que encontrarás dentro</h2>

          <span aria-hidden="true">♡</span>
        </div>

        <div className="ebook-contents__grid">
          <article className="content-card">
            <span className="content-card__number">1</span>
            <span className="content-card__icon" aria-hidden="true">
              🌷
            </span>

            <h3>Reconocer que te has dejado al final</h3>

            <p>El primer paso para escucharte y comenzar a volver a ti.</p>
          </article>

          <article className="content-card">
            <span className="content-card__number">2</span>
            <span className="content-card__icon" aria-hidden="true">
              ♡
            </span>

            <h3>Soltar la culpa de priorizarte</h3>

            <p>
              Deja atrás las creencias que te impiden elegirte sin sentir culpa.
            </p>
          </article>

          <article className="content-card">
            <span className="content-card__number">3</span>
            <span className="content-card__icon" aria-hidden="true">
              ✿
            </span>

            <h3>Volver a escuchar tus necesidades</h3>

            <p>Reconecta con tu voz interior, tu cuerpo y tus emociones.</p>
          </article>

          <article className="content-card">
            <span className="content-card__number">4</span>
            <span className="content-card__icon" aria-hidden="true">
              🕯
            </span>

            <h3>Crear pequeños rituales de reconexión</h3>

            <p>
              Hábitos amorosos que transformarán la forma en que vives tus días.
            </p>
          </article>

          <article className="content-card">
            <span className="content-card__number">5</span>
            <span className="content-card__icon" aria-hidden="true">
              ❀
            </span>

            <h3>Elegirte con más amor</h3>

            <p>
              Toma decisiones conscientes para construir la vida que mereces.
            </p>
          </article>
        </div>
      </section>

      <section
        id="comprar"
        className="ebook-product"
        aria-labelledby="product-title"
      >
        <div className="ebook-product__visual" aria-hidden="true">
          <Image
            className="ebook-product__image"
            src={assetUrl("/landings/ebook/product-showcase.png")}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />

          <span className="ebook-product__badge">
            Acceso
            <strong>inmediato</strong>
            ↓
          </span>
        </div>

        <div className="ebook-product__content">
          <p className="ebook-product__eyebrow">Tu momento también importa</p>

          <h2 id="product-title">Un espacio para volver a ti</h2>

          <p className="ebook-product__description">
            Un ebook cálido y transformador con reflexiones, ejercicios y
            herramientas prácticas para reconectar contigo, sanar desde
            adentro y volver a elegirte.
          </p>

          <div className="ebook-product__features">
            <div>
              <span aria-hidden="true">▤</span>
              <p>
                <strong>Más de 50 páginas</strong>
                de contenido
              </p>
            </div>

            <div>
              <span aria-hidden="true">✎</span>
              <p>
                <strong>Ejercicios</strong>
                prácticos
              </p>
            </div>

            <div>
              <span aria-hidden="true">♡</span>
              <p>
                <strong>Lectura</strong>
                guiada
              </p>
            </div>
          </div>

          <div className="ebook-product__offer">
            <div className="ebook-product__price">
              <small>Por solo</small>
              <strong>$57</strong>
            </div>

            <a
              className="ebook-product__cta"
              href="https://pay.hotmart.com/A106633240D?off=bzllkqlr&checkoutMode=10&bid=1783970041714"
              data-meta-checkout="ebook"
            >
              <span aria-hidden="true">▤</span>
              Adquirir mi ebook
              <span aria-hidden="true">♡</span>
            </a>
          </div>

          <ul className="ebook-product__trust" aria-label="Garantías de compra">
            <li>Pago seguro</li>
            <li>Descarga inmediata</li>
            <li>Acceso de por vida</li>
          </ul>
        </div>
      </section>

      <section className="ebook-final-cta" aria-labelledby="final-title">
        <div className="ebook-final-cta__content">
          <p>Hoy puede ser el comienzo</p>
          <h2 id="final-title">
            Tu bienestar no es un lujo.
            <span>Es una necesidad.</span>
          </h2>

          <p className="ebook-final-cta__description">
            Regálate un espacio para escucharte, cuidarte y volver a elegirte
            con amor. Tú también mereces ser una prioridad.
          </p>
        </div>

        <div className="ebook-final-cta__action">
          <a
            href="https://pay.hotmart.com/A106633240D?off=bzllkqlr&checkoutMode=10&bid=1783970041714"
            data-meta-checkout="ebook"
          >
            <span aria-hidden="true">▤</span>
            Adquiere hoy tu ebook
            <span aria-hidden="true">♡</span>
          </a>

          <ul>
            <li>Acceso inmediato</li>
            <li>Descarga digital</li>
            <li>Para siempre</li>
          </ul>
        </div>
      </section>

      <footer className="ebook-footer">
        <Image
          src={assetUrl("/logos/cressara_logo_normal.png")}
          alt="Cressara"
          width={130}
          height={52}
        />
        <p>Con amor, para ti. ♡</p>
        <small>© 2026 Cressara. Todos los derechos reservados.</small>
        </footer>
      </main>
    </>
  );
}
