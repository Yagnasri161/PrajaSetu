"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Scheme, MatchResult, CitizenProfile } from "@/lib/types";
import { evaluateSchemeEligibility } from "@/lib/eligibility";
import { EligibilityScore } from "@/components/EligibilityScore";
import { EligibilityExplanation } from "@/components/EligibilityExplanation";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { ApplicationSteps } from "@/components/ApplicationSteps";
import { OfficialSourceCard } from "@/components/OfficialSourceCard";
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Landmark,
  FileCheck2,
  Gift,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export default function SchemeDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const id = params.id as string;

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScheme() {
      setLoading(true);
      try {
        const res = await fetch(`/api/schemes?id=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (data.scheme) {
          setScheme(data.scheme);
          let currentProfile: CitizenProfile = {
            raw_input: "",
            language: "te",
            age: 38,
            gender: "female",
            category: "BC",
            annual_income: 95000,
            state: "Telangana",
            district: "Warangal",
            occupation: "Farmer",
            land_holding_acres: 2.5,
            is_farmer: true,
            has_white_ration_card: true,
            disability_status: false,
            student_status: false,
            marital_status: "married",
            housing_status: "kutcha",
            documents_held: ["Aadhaar", "White Ration Card"],
          };

          try {
            const saved = localStorage.getItem("praja_citizen_profile");
            if (saved) {
              const parsed = JSON.parse(saved);
              if (parsed && typeof parsed === "object") {
                currentProfile = { ...currentProfile, ...parsed };
              }
            }
          } catch {
            // fallback
          }

          const evaluated = evaluateSchemeEligibility(currentProfile, data.scheme);
          setMatchResult(evaluated);
        }
      } catch (err) {
        console.error("Failed to fetch scheme:", err);
      } finally {
        setLoading(false);
      }
    }
    loadScheme();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#0056A6] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#5F6B76]">
          {language === "te" ? "పథకం వివరాలు లోడ్ అవుతున్నాయి..." : "Loading scheme details..."}
        </p>
      </div>
    );
  }

  if (!scheme || !matchResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#12304A]">
          {language === "te" ? "పథకం కనుగొనబడలేదు" : "Scheme Not Found"}
        </h2>
        <Link
          href="/schemes"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#0056A6] text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "te" ? "పథకాల జాబితాకు తిరిగి వెళ్లండి" : "Back to Schemes"}</span>
        </Link>
      </div>
    );
  }

  const hasApplicationUrl = Boolean(
    scheme.official_application_url && scheme.official_application_url.startsWith("http")
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back to Schemes button */}
      <Link
        href="/schemes"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0056A6] hover:underline transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === "te" ? "అన్ని పథకాలకు తిరిగి వెళ్లండి" : "Back to All Schemes"}</span>
      </Link>

      {/* TOP HEADER CARD */}
      <div className="rounded-xl bg-white border border-[#E1E7ED] p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E1E7ED] pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#EAF4FB] text-[#0056A6]">
              {scheme.category}
            </span>
            <span className="text-xs text-[#5F6B76] flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5" />
              <span>{scheme.department}</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs text-[#2E7D32] font-semibold bg-[#EAF6EC] px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Last verified: {scheme.last_verified}</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] font-telugu leading-tight">
            {scheme.name_te}
          </h1>
          <p className="text-base text-[#5F6B76] mt-0.5">
            {scheme.name_en}
          </p>
        </div>

        {/* Eligibility Match Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <EligibilityScore score={matchResult.score} status={matchResult.status} size="md" />

          {hasApplicationUrl && (
            <a
              href={scheme.official_application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[#0056A6] hover:bg-[#003B73] text-white shadow-2xs transition-colors"
            >
              <span>{language === "te" ? "అధికారికంగా దరఖాస్తు చేయండి" : "Apply Officially"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* SECTION 1: పథకం గురించి (About) */}
      <section className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-2">
        <h2 className="text-base sm:text-lg font-bold text-[#12304A] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#0056A6]" />
          <span>{language === "te" ? "పథకం గురించి" : "About the Scheme"}</span>
        </h2>
        <p className="text-sm text-[#1F2937] leading-relaxed">
          {language === "te" ? scheme.short_description_te : scheme.short_description_en}
        </p>
      </section>

      {/* SECTION 2: ప్రయోజనాలు (Benefits) */}
      <section className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-2">
        <h2 className="text-base sm:text-lg font-bold text-[#12304A] flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#F58220]" />
          <span>{language === "te" ? "ప్రయోజనాలు" : "Benefits"}</span>
        </h2>
        <div className="p-4 rounded-lg bg-[#FFF3E8] border border-[#F58220]/20">
          <p className="text-sm font-semibold text-[#1F2937] leading-relaxed">
            {language === "te" ? scheme.benefit_te : scheme.benefit_en}
          </p>
        </div>
      </section>

      {/* SECTION 3: అర్హత (Eligibility) */}
      <section className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#12304A] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
          <span>{language === "te" ? "అర్హత" : "Eligibility"}</span>
        </h2>
        <p className="text-sm text-[#1F2937] leading-relaxed p-4 rounded-lg bg-[#F7F9FC] border border-[#E1E7ED]">
          {language === "te" ? scheme.eligibility_summary_te : scheme.eligibility_summary_en}
        </p>

        {/* Explainable rules summary */}
        <EligibilityExplanation result={matchResult} />
      </section>

      {/* SECTION 4: అవసరమైన పత్రాలు (Documents) */}
      <section className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#12304A] flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#0056A6]" />
          <span>{language === "te" ? "అవసరమైన పత్రాలు" : "Required Documents"}</span>
        </h2>
        <DocumentChecklist documents={scheme.documents || []} />
      </section>

      {/* SECTION 5: ఎలా దరఖాస్తు చేయాలి (How to Apply) */}
      <section className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#12304A]">
          {language === "te" ? "ఎలా దరఖాస్తు చేయాలి" : "How to Apply"}
        </h2>
        <ApplicationSteps scheme={scheme} />
      </section>

      {/* SECTION 6: అధికారిక వెబ్సైట్ (Official Website) */}
      <section className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#12304A]">
          {language === "te" ? "అధికారిక వెబ్సైట్" : "Official Website"}
        </h2>
        <OfficialSourceCard scheme={scheme} />
      </section>
    </div>
  );
}

