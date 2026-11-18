import { redirect } from "next/navigation";
import { getCampaignConfig, getWhatsAppGroupUrl } from "@/lib/campaigns";
import { readRegistrationSession, readWhatsAppIntent } from "@/lib/landing-platform/campaign-session";
import WhatsAppRedirectClient from "@/app/components/landing-core/WhatsAppRedirectClient";
import styles from "../landing.module.css";

export default async function JoinPage() {
  const config = getCampaignConfig("supera-a-tu-ex")!;
  if (!(await readRegistrationSession(config.slug))) redirect(`/landings/${config.slug}`);
  if (!(await readWhatsAppIntent(config.slug))) redirect(`/landings/${config.slug}/gracias`);
  return <main className={styles.page}><section className={styles.hero}><div className={styles.intro}><p className={styles.kicker}>ÚLTIMO PASO</p><h1>Abriendo tu grupo de <em>WhatsApp…</em></h1></div><aside className={styles.formCard}><WhatsAppRedirectClient campaignSlug={config.slug} contentName={config.tracking!.joinGroupContentName} groupUrl={getWhatsAppGroupUrl(config)} /></aside></section></main>;
}
