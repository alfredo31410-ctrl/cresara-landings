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

const SLUG = "supera-a-tu-ex";
const FORM_ID = 398;
const redirectTo = (url: URL) => {
  const response = NextResponse.redirect(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
};

export async function GET(request: NextRequest) {
  const successUrl = new URL(`/landings/${SLUG}/gracias`, request.url);
  const failureUrl = new URL(
    `/landings/${SLUG}?registro=requerido`,
    request.url,
  );
  const config = getCampaignConfig(SLUG);
  const intent = readRegistrationIntentToken(
    SLUG,
    request.cookies.get(getRegistrationIntentCookieName(SLUG))?.value,
  );
  if (
    !config ||
    !intent ||
    intent.formId !== FORM_ID ||
    intent.campaignSlug !== SLUG
  )
    return redirectTo(failureUrl);
  try {
    const response = redirectTo(successUrl);
    response.cookies.set(
      getRegistrationCookieName(SLUG),
      encodeRegistrationSession(createRegistrationSessionPayload(config)),
      getRegistrationSessionCookieOptions(),
    );
    response.cookies.delete(getRegistrationIntentCookieName(SLUG));
    return response;
  } catch {
    return redirectTo(failureUrl);
  }
}
