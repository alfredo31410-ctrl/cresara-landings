export const META_PIXEL_ID = "1823119425334723";
export const META_CURRENCY = "MXN";

type MetaEventData = Record<string, string | number | boolean>;

type TrackWhenReadyOptions = {
  intervalMs?: number;
  maxAttempts?: number;
  onTracked?: () => void;
};

export const getMetaPixelScript = () => {
  if (!META_PIXEL_ID) return "";

  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
};

export const getMetaPixelNoscriptUrl = (eventName = "PageView") => {
  if (!META_PIXEL_ID) return "";

  return `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=${eventName}&noscript=1`;
};

export const trackMetaEvent = (eventName: string, data?: MetaEventData) => {
  if (typeof window === "undefined" || !META_PIXEL_ID || !window.fbq) {
    return false;
  }

  window.fbq("track", eventName, data ?? {});
  return true;
};

export const trackMetaCustomEvent = (
  eventName: string,
  data?: MetaEventData,
) => {
  if (typeof window === "undefined" || !META_PIXEL_ID || !window.fbq) {
    return false;
  }

  window.fbq("trackCustom", eventName, data ?? {});
  return true;
};

const trackWhenPixelIsReady = (
  tracker: () => boolean,
  options: TrackWhenReadyOptions = {},
) => {
  if (typeof window === "undefined") return () => {};

  const { intervalMs = 250, maxAttempts = 24, onTracked } = options;
  let attempts = 0;
  let timeoutId: number | undefined;

  const tryTrack = () => {
    if (tracker()) {
      onTracked?.();
      return;
    }

    attempts += 1;

    if (attempts < maxAttempts) {
      timeoutId = window.setTimeout(tryTrack, intervalMs);
    }
  };

  tryTrack();

  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  };
};

export const trackMetaEventWhenReady = (
  eventName: string,
  data?: MetaEventData,
  options?: TrackWhenReadyOptions,
) =>
  trackWhenPixelIsReady(() => trackMetaEvent(eventName, data), options);

export const trackMetaCustomEventWhenReady = (
  eventName: string,
  data?: MetaEventData,
  options?: TrackWhenReadyOptions,
) =>
  trackWhenPixelIsReady(() => trackMetaCustomEvent(eventName, data), options);
