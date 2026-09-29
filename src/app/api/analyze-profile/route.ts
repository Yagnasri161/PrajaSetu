import { NextRequest, NextResponse } from "next/server";
import { parseNaturalLanguageProfile } from "@/lib/nlp-parser";
import { CitizenProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, language = "en" } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query string is required" },
        { status: 400 }
      );
    }

    const aiApiKey = process.env.AI_API_KEY;

    // Optional LLM enhancement if key is provided
    if (aiApiKey && aiApiKey !== "your_ai_api_key" && !aiApiKey.includes("placeholder")) {
      try {
        // Attempt OpenAI / standard LLM endpoint if configured
        const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            temperature: 0.1,
            messages: [
              {
                role: "system",
                content: `You are PrajaSetu Profile Extractor. Extract citizen details from user input in English or Telugu.
CRITICAL RULES:
- ONLY extract information actually stated.
- NEVER invent or assume missing values.
- Unknown fields MUST be null.
Return valid JSON with:
{
  "age": number or null,
  "gender": "male" | "female" | null,
  "state": string or "Telangana",
  "district": string or null,
  "annual_income": number or null,
  "occupation": string or null,
  "category": "SC" | "ST" | "BC" | "EBC" | "Minority" | null,
  "marital_status": string or null,
  "student_status": boolean or null,
  "farmer_status": boolean or null,
  "land_acres": number or null,
  "owns_house": boolean or null,
  "electricity_units": number or null,
  "has_ration_card": boolean or null,
  "has_aadhaar": boolean or null,
  "has_income_certificate": boolean or null,
  "disability": boolean or null,
  "children": number or null,
  "senior_citizen": boolean or null,
  "seeking_marriage_aid": boolean or null
}`,
              },
              {
                role: "user",
                content: query,
              },
            ],
          }),
        });

        if (aiResponse.ok) {
          const json = await aiResponse.json();
          const parsed = JSON.parse(json.choices[0].message.content);
          return NextResponse.json({
            profile: parsed,
            source: "ai_model",
          });
        }
      } catch (aiErr) {
        console.warn("AI API invocation failed, falling back to deterministic parser:", aiErr);
      }
    }

    // Deterministic fallback parser supporting English and Telugu
    const deterministicProfile = parseNaturalLanguageProfile(query, language as "en" | "te");

    return NextResponse.json({
      profile: deterministicProfile,
      source: "deterministic_parser",
    });
  } catch (error: any) {
    console.error("Error in /api/analyze-profile:", error);
    return NextResponse.json(
      { error: "Internal analysis error", details: error.message },
      { status: 500 }
    );
  }
}
