const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "campaign_id", "adset_id", "ad_id", "placement"] as const;
export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number] | "landing_slug", string>>;
export function captureAttribution(url: URL, slug: string): Attribution { const output: Attribution = { landing_slug: slug }; for (const key of ATTRIBUTION_KEYS) { const value = url.searchParams.get(key)?.trim(); if (value && /^[\w .:@%+\-/]{1,160}$/.test(value)) output[key] = value; } return output; }
