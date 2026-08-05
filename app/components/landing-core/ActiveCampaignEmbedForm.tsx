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

export function ActiveCampaignEmbedForm({ formId, campaignSlug, wrapperClassName, loadingMessage = "Cargando formulario…", errorMessage = "No pudimos cargar el formulario." }: ActiveCampaignEmbedFormProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const retry = useCallback(() => { setLoaded(false); setError(false); setAttempt((value) => value + 1); }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const containerClassName = `_form_${formId}`;
    const scriptId = `activecampaign-embed-${campaignSlug}-${formId}`;
    const scriptUrl = `https://${ACTIVE_CAMPAIGN_EMBED_HOST}/f/embed.php?id=${formId}`;
    wrapper.innerHTML = `<div class="${containerClassName}"></div>`;
    let allowSubmit = false;
    let disposed = false;
    const submitHandler = async (event: Event) => {
      if (allowSubmit) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const form = event.target as HTMLFormElement;
      try {
        const response = await fetch(`/api/landings/${campaignSlug}/registration-intent${window.location.search}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
        if (!response.ok) throw new Error("intent");
        allowSubmit = true;
        form.requestSubmit();
      } catch { setError(true); }
    };
    const observer = new MutationObserver(() => {
      const form = wrapper.querySelector("form");
      if (form && form.dataset.registrationIntentAttached !== "true") { form.dataset.registrationIntentAttached = "true"; form.addEventListener("submit", submitHandler, true); setLoaded(true); }
    });
    observer.observe(wrapper, { childList: true, subtree: true });
    const existing = document.getElementById(scriptId);
    const script = (existing as HTMLScriptElement | null) || document.createElement("script");
    if (!existing) {
      script.id = scriptId;
      script.src = scriptUrl;
      script.async = true;
      script.charset = "utf-8";
      script.addEventListener("error", () => { if (!disposed) setError(true); }, { once: true });
      document.body.appendChild(script);
    }
    const timeout = window.setTimeout(() => { if (!disposed && !wrapper.querySelector("form")) setError(true); }, 10000);
    return () => { disposed = true; window.clearTimeout(timeout); observer.disconnect(); wrapper.querySelector("form")?.removeEventListener("submit", submitHandler, true); wrapper.replaceChildren(); script.remove(); };
  }, [attempt, campaignSlug, formId]);

  return <div className={wrapperClassName} ref={wrapperRef} data-activecampaign-form={formId}>
    {!loaded && !error && <p aria-live="polite">{loadingMessage}</p>}
    {error && <div role="alert"><p>{errorMessage}</p><button type="button" onClick={retry}>Volver a intentar</button></div>}
  </div>;
}
