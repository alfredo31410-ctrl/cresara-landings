"use client";
import { ActiveCampaignEmbedForm } from "@/app/components/landing-core/ActiveCampaignEmbedForm";
import { campaignConfig } from "../campaign.config";
import styles from "./RegistrationForm.module.css";
export default function RegistrationForm() { return <ActiveCampaignEmbedForm formId={campaignConfig.activeCampaign.formId} campaignSlug={campaignConfig.slug} wrapperClassName={styles.activeCampaignWrapper} loadingMessage="Cargando formulario seguro…" errorMessage="No pudimos cargar el formulario." />; }
