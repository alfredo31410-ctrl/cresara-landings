"use client";

import { useEffect } from "react";
import {
  META_CURRENCY,
  trackMetaEvent,
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

    const trackCheckout = () => {
      trackMetaEvent("InitiateCheckout", ebookEventData);
    };

    checkoutLinks.forEach((link) => {
      link.addEventListener("click", trackCheckout);
    });

    return () => {
      cancelViewContentTracking();
      checkoutLinks.forEach((link) => {
        link.removeEventListener("click", trackCheckout);
      });
    };
  }, []);

  return null;
}
