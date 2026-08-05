"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getMetaPixelNoscriptUrl, getMetaPixelScript, META_PIXEL_ID } from "@/lib/meta-pixel";

let lastPageViewLocation = "";

export function MetaPixel() {
  const pathname = usePathname();
  const script = getMetaPixelScript();
  const noscriptUrl = getMetaPixelNoscriptUrl();

  useEffect(() => {
    if (!META_PIXEL_ID || !pathname) return;
    const location = `${pathname}${window.location.search}`;
    if (!lastPageViewLocation) {
      lastPageViewLocation = location;
      return;
    }
    if (location === lastPageViewLocation) return;
    let attempts = 0;
    const track = () => {
      if (typeof window.fbq === "function") {
        lastPageViewLocation = location;
        window.fbq("track", "PageView");
        return;
      }
      attempts += 1;
      if (attempts < 20) window.setTimeout(track, 250);
    };
    track();
  }, [pathname]);

  if (!META_PIXEL_ID || !script || !noscriptUrl) return null;
  return <>
    <Script id="meta-pixel-global" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />
    <noscript><img height="1" width="1" style={{ display: "none" }} src={noscriptUrl} alt="" /></noscript>
  </>;
}
