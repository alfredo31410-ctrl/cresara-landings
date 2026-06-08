import Script from "next/script";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_PIXEL_ID,
} from "@/lib/meta-pixel";

type MetaPixelProps = {
  id: string;
  noscriptEvent?: string;
};

export function MetaPixel({ id, noscriptEvent = "PageView" }: MetaPixelProps) {
  const script = getMetaPixelScript();
  const noscriptUrl = getMetaPixelNoscriptUrl(noscriptEvent);

  if (!META_PIXEL_ID || !script || !noscriptUrl) return null;

  return (
    <>
      <Script
        id={id}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: script }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={noscriptUrl}
          alt=""
        />
      </noscript>
    </>
  );
}
