export const META_PIXEL_ID = "1823119425334723";
export const META_CURRENCY = "MXN";

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

export const trackMetaEvent = (
  eventName: string,
  data?: Record<string, string | number | boolean>,
) => {
  if (typeof window === "undefined" || !META_PIXEL_ID || !window.fbq) return;

  window.fbq("track", eventName, data ?? {});
};

export const trackMetaCustomEvent = (
  eventName: string,
  data?: Record<string, string | number | boolean>,
) => {
  if (typeof window === "undefined" || !META_PIXEL_ID || !window.fbq) return;

  window.fbq("trackCustom", eventName, data ?? {});
};
