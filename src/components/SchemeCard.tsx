"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { MatchResult } from "@/lib/types";
import { ExternalLink, ArrowRight } from "lucide-react";

interface SchemeCardProps {
  result: MatchResult;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ result }) => {
  const { scheme, score, matchedRules } = result;
  const { language } = useLanguage();

  const hasVerifiedAppUrl = Boolean(
    scheme.official_application_url &&
    scheme.official_application_url.startsWith("http") &&
    scheme.official_application_url !== "unverified"
  );

  // Take 1 or 2 important reasons as requested
  const topReasons = matchedRules.slice(0, 2);

  return (
    <div className="rounded-xl bg-white border border-[#DCE5EC] hover:border-[#0056A6] p-5 sm:p-6 shadow-2xs transition-all space-y-4">
      {/* Top Row: Title (Telugu first, English second) & Match Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <span className="inline-block text-xs font-semibold text-[#0056A6] bg-[#EAF4FB] px-2.5 py-0.5 rounded mb-1">
            {scheme.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#12304A] font-telugu leading-snug">
            {scheme.name_te}
          </h3>
          <p className="text-sm font-medium text-[#5F6B76]">
            {scheme.name_en}
          </p>
        </div>

        {/* 92% Match Badge */}
        <div className="shrink-0 self-start sm:self-auto">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold border ${
              score >= 75
                ? "bg-[#EAF6EC] border-[#2E7D32]/30 text-[#2E7D32]"
                : score >= 50
                ? "bg-[#FFF3E8] border-[#F58220]/30 text-[#F58220]"
                : "bg-[#F7F9FC] border-[#E1E7ED] text-[#5F6B76]"
            }`}
          >
            <span className="font-mono font-black">{score}%</span>
            <span>{score >= 75 ? "Match" : "Pending Info"}</span>
          </span>
        </div>
      </div>

      {/* One short description */}
      <p className="text-sm text-[#1F2937] leading-relaxed">
        {language === "te" ? scheme.benefit_te : scheme.benefit_en}
      </p>

      {/* One or two important reasons */}
      {topReasons.length > 0 && (
        <div className="space-y-1 pt-1 text-xs sm:text-sm">
          {topReasons.map((mr, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[#2E7D32] font-medium">
              <span>✓</span>
              <span>
                {language === "te" ? mr.rule.description_te : mr.rule.description_en}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Actions: View Details & Apply Officially */}
      <div className="pt-3 border-t border-[#E1E7ED] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-[#5F6B76]">
          {scheme.department}
        </span>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/schemes/${scheme.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#E1E7ED] text-[#1F2937] hover:bg-[#EAF4FB] hover:text-[#0056A6] hover:border-[#0056A6] transition-colors"
          >
            <span>{language === "te" ? "వివరాలు చూడండి" : "View Details"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {hasVerifiedAppUrl ? (
            <a
              href={scheme.official_application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#0056A6] hover:bg-[#003B73] text-white shadow-2xs transition-colors"
            >
              <span>
                {scheme.official_application_url.includes("government-initiatives")
                  ? language === "te"
                    ? "అధికారిక సమాచారం"
                    : "Official Information"
                  : language === "te"
                  ? "అధికారికంగా దరఖాస్తు చేయండి"
                  : "Apply Officially"}
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a
              href={scheme.official_source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#F7F9FC] hover:bg-[#EAF4FB] text-[#0056A6] border border-[#E1E7ED] transition-colors"
            >
              <span>{language === "te" ? "అధికారిక సమాచారం" : "Official Information"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

