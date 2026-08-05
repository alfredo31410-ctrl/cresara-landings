import { NextResponse } from "next/server";
import { getCampaignConfig } from "@/lib/campaigns";
import { createWhatsAppIntent, readRegistrationSession } from "@/lib/landing-platform/campaign-session";
export async function POST(_: Request, { params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const config = getCampaignConfig(slug); if (!config) return NextResponse.json({ ok: false }, { status: 404 }); const session = await readRegistrationSession(slug); if (!session) return NextResponse.json({ ok: false }, { status: 401 }); await createWhatsAppIntent(config, session); return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } }); }
