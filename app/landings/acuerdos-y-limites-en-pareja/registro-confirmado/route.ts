import { NextRequest, NextResponse } from "next/server";
import { getCampaignConfig } from "@/lib/campaigns";
import { createRegistrationSessionPayload, encodeRegistrationSession, getRegistrationCookieName, getRegistrationIntentCookieName, getRegistrationSessionCookieOptions, readRegistrationIntentToken } from "@/lib/landing-platform/campaign-session";

const SLUG = "acuerdos-y-limites-en-pareja";
const redirectTo = (url: URL) => {
  const response = NextResponse.redirect(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
};

export async function GET(request: NextRequest) {
  const successUrl = new URL("/landings/acuerdos-y-limites-en-pareja/gracias", request.url);
  const failureUrl = new URL("/landings/acuerdos-y-limites-en-pareja?registro=requerido", request.url);
  const config = getCampaignConfig(SLUG);
  if (!config) return redirectTo(failureUrl);
  const intent = readRegistrationIntentToken(SLUG, request.cookies.get(getRegistrationIntentCookieName(SLUG))?.value);
  if (!intent || intent.formId !== config.activeCampaign.formId || intent.campaignSlug !== SLUG) return redirectTo(failureUrl);
  try {
    const session = createRegistrationSessionPayload(config);
    const response = redirectTo(successUrl);
    response.cookies.set(getRegistrationCookieName(SLUG), encodeRegistrationSession(session), getRegistrationSessionCookieOptions());
    response.cookies.delete(getRegistrationIntentCookieName(SLUG));
    return response;
  } catch { return redirectTo(failureUrl); }
}
