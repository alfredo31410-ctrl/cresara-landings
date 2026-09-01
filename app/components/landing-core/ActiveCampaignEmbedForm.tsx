"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ACTIVE_CAMPAIGN_EMBED_HOST = "cefincapacitacion.activehosted.com";

type ActiveCampaignEmbedFormProps = {
  formId: number;
  campaignSlug: string;
  wrapperClassName?: string;
  loadingMessage?: string;
  errorMessage?: string;
};

type EmbedStatus = "loading" | "loaded" | "error";

export function ActiveCampaignEmbedForm({
  formId,
  campaignSlug,
  wrapperClassName,
  loadingMessage = "Cargando formulario…",
  errorMessage = "No pudimos cargar el formulario.",
}: ActiveCampaignEmbedFormProps) {
  const embedHostRef = useRef<HTMLDivElement>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [status, setStatus] = useState<EmbedStatus>("loading");
  const allowSubmitRef = useRef(false);

  const handleRetry = useCallback(() => {
    embedHostRef.current?.replaceChildren();
    setStatus("loading");
    setRetryKey((value) => value + 1);
  }, []);

  useEffect(() => {
    const host = embedHostRef.current;
    if (!host) return;

    let cancelled = false;
    let loaded = false;
    allowSubmitRef.current = false;

    const markLoaded = () => {
      if (cancelled || loaded) return;
      loaded = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      setStatus("loaded");
    };

    const submitHandler = async (event: Event) => {
      if (allowSubmitRef.current || cancelled) return;
      event.preventDefault();
      event.stopImmediatePropagation();

      const form = event.target as HTMLFormElement;
      try {
        const response = await fetch(
          `/api/landings/${encodeURIComponent(campaignSlug)}/registration-intent`,
          {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          },
        );
        if (!response.ok) throw new Error("intent");
        if (cancelled) return;
        allowSubmitRef.current = true;
        form.requestSubmit();
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    const removeDuplicateEmbeds = () => {
      const selector = `._form_${formId}`;
      const containers = Array.from(host.children).filter(
        (element) => element instanceof HTMLElement && element.matches(selector),
      );

      containers.slice(1).forEach((container) => container.remove());

      const forms = Array.from(host.querySelectorAll("form"));
      forms.slice(1).forEach((form) => form.remove());

      const scripts = Array.from(
        host.querySelectorAll<HTMLScriptElement>(
          `script[data-active-campaign-form="${formId}"]`,
        ),
      );
      scripts.slice(1).forEach((script) => script.remove());

      return forms[0] ?? null;
    };

    const attachSubmitHandler = () => {
      const form = removeDuplicateEmbeds() ?? host.querySelector("form");
      if (!form) return false;
      if (form.dataset.registrationIntentAttached !== "true") {
        form.dataset.registrationIntentAttached = "true";
        form.addEventListener("submit", submitHandler, true);
      }
      return true;
    };

    const observer = new MutationObserver(() => {
      if (host.querySelector("form, ._form-content, ._form_element")) {
        attachSubmitHandler();
        markLoaded();
      }
    });

    const existingContainer = Array.from(host.children).find(
      (element) =>
        element instanceof HTMLElement &&
        element.classList.contains(`_form_${formId}`),
    );

    if (!existingContainer) {
      const formContainer = document.createElement("div");
      formContainer.className = `_form_${formId}`;
      host.appendChild(formContainer);
    }

    let script = host.querySelector<HTMLScriptElement>(
      `script[data-active-campaign-form="${formId}"]`,
    );

    const handleScriptError = () => {
      if (!cancelled && !loaded) {
        window.clearTimeout(timeout);
        observer.disconnect();
        setStatus("error");
      }
    };

    observer.observe(host, { childList: true, subtree: true });

    if (!script) {
      script = document.createElement("script");
      script.src = `https://${ACTIVE_CAMPAIGN_EMBED_HOST}/f/embed.php?id=${formId}`;
      script.async = true;
      script.charset = "utf-8";
      script.dataset.activeCampaignForm = String(formId);
      script.addEventListener("error", handleScriptError, { once: true });
      host.appendChild(script);
    }

    const timeout = window.setTimeout(() => {
      if (!cancelled && !loaded && !attachSubmitHandler()) {
        observer.disconnect();
        setStatus("error");
      }
    }, 10000);

    if (attachSubmitHandler()) markLoaded();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      script?.removeEventListener("error", handleScriptError);
      host.querySelectorAll("form").forEach((form) => {
        form.removeEventListener("submit", submitHandler, true);
        delete form.dataset.registrationIntentAttached;
      });
    };
  }, [campaignSlug, formId, retryKey]);

  return (
    <div className={wrapperClassName}>
      {status === "loading" && (
        <p role="status" aria-live="polite">
          {loadingMessage}
        </p>
      )}

      {status === "error" && (
        <div role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={handleRetry}>
            Volver a intentar
          </button>
        </div>
      )}

      <div ref={embedHostRef} aria-busy={status === "loading"} />
    </div>
  );
}
