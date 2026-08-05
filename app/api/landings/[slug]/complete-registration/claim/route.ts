import { NextResponse } from "next/server";
import { claimCompleteRegistration } from "@/lib/landing-platform/event-claims";
import { getCampaignConfig } from "@/lib/campaigns";
export async function POST(_: Request, { params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!getCampaignConfig(slug)) return NextResponse.json({ shouldTrack: false }, { status: 404 }); const result = await claimCompleteRegistration(slug); return NextResponse.json(result.status === 401 ? { shouldTrack: false } : { shouldTrack: result.shouldTrack, ...(result.eventId ? { eventId: result.eventId } : {}) }, { status: result.status, headers: { "Cache-Control": "no-store" } }); }
