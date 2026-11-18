"use client";
import { useState } from "react";

type WhatsAppButtonProps = {
  campaignSlug: string;
  className?: string;
  directGroupUrl?: string;
  contentName?: string;
};

export default function WhatsAppButton({
  campaignSlug,
  className,
  directGroupUrl,
  contentName,
}: WhatsAppButtonProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (directGroupUrl) {
    return (
      <a
        className={className}
        href={directGroupUrl}
        onClick={() => {
          if (typeof window.fbq === "function") {
            window.fbq("trackCustom", "JoinGroup", {
              content_name: contentName ?? campaignSlug,
              landing_slug: campaignSlug,
              destination: "whatsapp_group",
            });
          }
        }}
      >
        ENTRAR AL GRUPO DE WHATSAPP <span aria-hidden="true">↗</span>
      </a>
    );
  }

  const click = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `/api/landings/${campaignSlug}/whatsapp/intent`,
        { method: "POST" },
      );
      if (!response.ok) throw new Error();
      window.location.assign(`/landings/${campaignSlug}/unirse-whatsapp`);
    } catch {
      setError("No pudimos preparar tu acceso. Inténtalo de nuevo.");
      setBusy(false);
    }
  };

  return (
    <>
      <button className={className} onClick={click} disabled={busy}>
        {busy ? "PREPARANDO TU ACCESO…" : "COMPLETAR MI ACCESO EN WHATSAPP"}
        <span aria-hidden="true">↗</span>
      </button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
