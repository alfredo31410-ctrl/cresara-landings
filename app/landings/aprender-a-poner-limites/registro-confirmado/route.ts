import { NextRequest, NextResponse } from "next/server";
import { getCampaignConfig } from "@/lib/campaigns";
import {
  createRegistrationSessionPayload,
  encodeRegistrationSession,
  getRegistrationCookieName,
  getRegistrationIntentCookieName,
  getRegistrationSessionCookieOptions,
  readRegistrationIntentToken,
} from "@/lib/landing-platform/campaign-session";

const SLUG = "aprender-a-poner-limites";

function redirectTo(url: URL) {
  const response = NextResponse.redirect(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: NextRequest) {
  const successUrl = new URL(`/landings/${SLUG}/gracias`, request.url);
  const failureUrl = new URL(`/landings/${SLUG}?registro=requerido`, request.url);
  const config = getCampaignConfig(SLUG);

  if (!config) return redirectTo(failureUrl);

  const intent = readRegistrationIntentToken(
    SLUG,
    request.cookies.get(getRegistrationIntentCookieName(SLUG))?.value,
  );

  if (
    !intent ||
    intent.formId !== config.activeCampaign.formId ||
    intent.campaignSlug !== SLUG
  ) {
    return redirectTo(failureUrl);
  }

  try {
    const session = createRegistrationSessionPayload(config);
    const response = redirectTo(successUrl);
    response.cookies.set(
      getRegistrationCookieName(SLUG),
      encodeRegistrationSession(session),
      getRegistrationSessionCookieOptions(),
    );
    response.cookies.delete(getRegistrationIntentCookieName(SLUG));
    return response;
  } catch (error) {
    console.error(
      "Registration session creation failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return redirectTo(failureUrl);
  }
}
