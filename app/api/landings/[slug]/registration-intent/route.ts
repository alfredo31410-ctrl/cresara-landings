import { NextResponse } from "next/server";
import { getCampaignConfig } from "@/lib/campaigns";
import { captureAttribution } from "@/lib/landing-platform/attribution";
import { createRegistrationIntent } from "@/lib/landing-platform/campaign-session";
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const config = getCampaignConfig(slug); if (!config) return NextResponse.json({ ok: false }, { status: 404 }); await createRegistrationIntent(config, captureAttribution(new URL(request.url), slug)); return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } }); }
