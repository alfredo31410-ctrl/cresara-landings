import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getCampaignConfig } from "@/lib/campaigns";
import type { CampaignConfig } from "@/lib/campaigns/types";
export type RegistrationSession = { campaignSlug: string; registrationId: string; emailHash: string; expiresAt: number; completeRegistrationClaimed: boolean; joinGroupClaimed: boolean; };
export type WhatsAppIntent = { campaignSlug: string; registrationId: string; expiresAt: number; };
export type RegistrationIntent = { campaignSlug: string; formId: number; attribution: Record<string, string>; createdAt: number; expiresAt: number; };
const TTL = 86400; const INTENT_TTL = 120; const REGISTRATION_INTENT_TTL = 900;
const secret = () => { if (!process.env.REGISTRATION_SESSION_SECRET && process.env.NODE_ENV === "production") throw new Error("REGISTRATION_SESSION_SECRET_NOT_CONFIGURED"); return process.env.REGISTRATION_SESSION_SECRET || "development-only-change-me"; };
const sign = (value: string) => crypto.createHmac("sha256", secret()).update(value).digest("base64url");
const encode = (payload: object) => { const value = Buffer.from(JSON.stringify(payload)).toString("base64url"); return `${value}.${sign(value)}`; };
function decode<T>(token: string | undefined): T | null { if (!token) return null; const [value, signature] = token.split("."); const expected = value ? sign(value) : ""; if (!value || !signature || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null; try { return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as T; } catch { return null; } }
const valid = (expiresAt: number) => Number.isFinite(expiresAt) && expiresAt > Date.now();
const options = (maxAge: number) => ({ httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge });
function requireConfig(slug: string) { const config = getCampaignConfig(slug); if (!config) throw new Error("CAMPAIGN_NOT_CONFIGURED"); return config; }
export const getRegistrationCookieName = (slug: string) => `cresara_registration_${requireConfig(slug).slug}`;
export const getWhatsAppIntentCookieName = (slug: string) => `cresara_whatsapp_intent_${requireConfig(slug).slug}`;
export const getRegistrationIntentCookieName = (slug: string) => `cresara_registration_intent_${requireConfig(slug).slug}`;
export const hashEmail = (email: string) => crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
export async function createRegistrationSession(config: CampaignConfig) { const payload: RegistrationSession = { campaignSlug: config.slug, registrationId: crypto.randomUUID(), emailHash: "", expiresAt: Date.now() + TTL * 1000, completeRegistrationClaimed: false, joinGroupClaimed: false }; (await cookies()).set(getRegistrationCookieName(config.slug), encode(payload), options(TTL)); return payload; }
export async function readRegistrationSession(slug: string) { const payload = decode<RegistrationSession>((await cookies()).get(getRegistrationCookieName(slug))?.value); const config = getCampaignConfig(slug); return config && payload?.campaignSlug === config.slug && valid(payload.expiresAt) ? payload : null; }
export async function updateRegistrationSession(session: RegistrationSession) { const seconds = Math.max(1, Math.floor((session.expiresAt - Date.now()) / 1000)); (await cookies()).set(getRegistrationCookieName(session.campaignSlug), encode(session), options(seconds)); }
export async function createWhatsAppIntent(config: CampaignConfig, session: RegistrationSession) { const payload: WhatsAppIntent = { campaignSlug: config.slug, registrationId: session.registrationId, expiresAt: Date.now() + INTENT_TTL * 1000 }; (await cookies()).set(getWhatsAppIntentCookieName(config.slug), encode(payload), options(INTENT_TTL)); }
export async function readWhatsAppIntent(slug: string) { const payload = decode<WhatsAppIntent>((await cookies()).get(getWhatsAppIntentCookieName(slug))?.value); return payload?.campaignSlug === slug && valid(payload.expiresAt) ? payload : null; }
export async function consumeWhatsAppIntent(slug: string) { (await cookies()).delete(getWhatsAppIntentCookieName(slug)); }
export async function createRegistrationIntent(config: CampaignConfig, attribution: Record<string, string>) { const payload: RegistrationIntent = { campaignSlug: config.slug, formId: config.activeCampaign.formId, attribution, createdAt: Date.now(), expiresAt: Date.now() + REGISTRATION_INTENT_TTL * 1000 }; (await cookies()).set(getRegistrationIntentCookieName(config.slug), encode(payload), options(REGISTRATION_INTENT_TTL)); }
export async function readRegistrationIntent(slug: string) { const payload = decode<RegistrationIntent>((await cookies()).get(getRegistrationIntentCookieName(slug))?.value); const config = getCampaignConfig(slug); return config && payload?.campaignSlug === slug && payload.formId === config.activeCampaign.formId && valid(payload.expiresAt) ? payload : null; }
export async function consumeRegistrationIntent(slug: string) { (await cookies()).delete(getRegistrationIntentCookieName(slug)); }
