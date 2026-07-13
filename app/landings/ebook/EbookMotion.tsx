"use client";

import { useEffect } from "react";

const revealGroups = [
  ".ebook-problem__intro, .ebook-problem__cards",
  ".problem-card",
  ".ebook-section-heading",
  ".benefit-item",
  ".ebook-mid-cta__icon, .ebook-mid-cta__copy, .ebook-mid-cta__action",
  ".content-card",
  ".ebook-product__visual, .ebook-product__content",
  ".testimonial-card",
  ".ebook-final-cta__content, .ebook-final-cta__action",
];

export function EbookMotion() {
  useEffect(() => {
    const elements: HTMLElement[] = [];

    revealGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.reveal = "";
        element.style.setProperty("--reveal-delay", `${(index % 5) * 85}ms`);
        elements.push(element);
      });
    });

    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("ebook-motion-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));

      return () => {
        root.classList.remove("ebook-motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("ebook-motion-ready");
    };
  }, []);

  return null;
}
