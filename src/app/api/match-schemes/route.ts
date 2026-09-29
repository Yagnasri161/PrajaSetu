import { NextRequest, NextResponse } from "next/server";
import { getSchemes, saveSearchSession } from "@/lib/supabase";
import { matchAllSchemes } from "@/lib/eligibility";
import { CitizenProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profile, language = "en", query = "" } = body;

    if (!profile) {
      return NextResponse.json(
        { error: "Profile is required" },
        { status: 400 }
      );
    }

    const schemes = await getSchemes();
    const rankedResults = matchAllSchemes(profile as CitizenProfile, schemes);

    // Save anonymous search session (no sensitive PII)
    await saveSearchSession(query, language, profile, {
      totalMatches: rankedResults.length,
      topScheme: rankedResults[0]?.scheme?.name_en || null,
      topScore: rankedResults[0]?.score || 0,
    });

    return NextResponse.json({
      results: rankedResults,
      total: rankedResults.length,
    });
  } catch (error: any) {
    console.error("Error in /api/match-schemes:", error);
    return NextResponse.json(
      { error: "Internal matching error", details: error.message },
      { status: 500 }
    );
  }
}
