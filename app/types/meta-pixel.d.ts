export {};

declare global {
  interface Window {
    fbq?: (
      action: "init" | "track" | "trackCustom",
      eventOrPixelId: string,
      data?: Record<string, string | number | boolean>,
    ) => void;
  }
}
