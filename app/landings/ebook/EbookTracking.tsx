"use client";

import { useEffect } from "react";
import {
  META_CURRENCY,
  trackMetaEventWhenReady,
} from "@/lib/meta-pixel";

const ebookEventData = {
  content_name: "Un espacio para volver a ti",
  content_category: "Ebook",
  content_type: "product",
  content_ids: ["A106633240D"],
  value: 57,
  currency: META_CURRENCY,
};

let viewContentTracked = false;

export function EbookTracking() {
  useEffect(() => {
    const cancelViewContentTracking = viewContentTracked
      ? () => {}
      : trackMetaEventWhenReady("ViewContent", ebookEventData, {
          onTracked: () => {
            viewContentTracked = true;
          },
        });

    const checkoutLinks = document.querySelectorAll<HTMLAnchorElement>(
      'a[data-meta-checkout="ebook"]',
    );

    let navigationTimeoutId: number | undefined;
    let cancelCheckoutTracking: (() => void) | undefined;
    let navigationPending = false;

    const trackCheckout = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const isRegularClick =
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey;

      cancelCheckoutTracking = trackMetaEventWhenReady(
        "InitiateCheckout",
        ebookEventData,
        {
          intervalMs: 50,
          maxAttempts: 6,
        },
      );

      if (!isRegularClick) return;

      event.preventDefault();

      if (navigationPending) return;
      navigationPending = true;

      navigationTimeoutId = window.setTimeout(() => {
        window.location.assign(link.href);
      }, 300);
    };

    checkoutLinks.forEach((link) => {
      link.addEventListener("click", trackCheckout);
    });

    return () => {
      cancelViewContentTracking();
      cancelCheckoutTracking?.();

      if (navigationTimeoutId) {
        window.clearTimeout(navigationTimeoutId);
      }

      checkoutLinks.forEach((link) => {
        link.removeEventListener("click", trackCheckout);
      });
    };
  }, []);

  return null;
}
