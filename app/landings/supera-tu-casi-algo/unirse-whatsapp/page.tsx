import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCampaignConfig, getWhatsAppGroupUrl } from "@/lib/campaigns";
import { readRegistrationSession, readWhatsAppIntent } from "@/lib/landing-platform/campaign-session";
import WhatsAppRedirectClient from "../_components/WhatsAppRedirectClient";
import styles from "./redirect.module.css";
export const metadata: Metadata = { title: "Abriendo WhatsApp | Cressara", robots: { index: false, follow: false } };
export default async function JoinPage() { const config = getCampaignConfig("supera-tu-casi-algo")!; if (!(await readRegistrationSession(config.slug))) redirect(`/landings/${config.slug}`); if (!(await readWhatsAppIntent(config.slug))) redirect(`/landings/${config.slug}/gracias`); return <main className={styles.page}><section className={styles.card}><div className={styles.brand}><img src="/logos/cressara_letras_rosas.png" alt="Cressara"/><span>Transforma · Sana · Crece</span></div><WhatsAppRedirectClient campaignSlug={config.slug} contentName={config.tracking!.joinGroupContentName} groupUrl={getWhatsAppGroupUrl(config)} classNames={{ redirect: styles.redirect, missing: styles.missing, spinner: styles.spinner, secondary: styles.secondary }}/></section></main>; }
