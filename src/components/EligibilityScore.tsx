"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

interface EligibilityScoreProps {
  score: number;
  status: "excellent" | "good" | "possible" | "unlikely";
  size?: "sm" | "md" | "lg";
}

export const EligibilityScore: React.FC<EligibilityScoreProps> = ({
  score,
  status,
  size = "md",
}) => {
  const { language } = useLanguage();

  const getStatusMeta = () => {
    if (score >= 75) {
      return {
        labelEn: "Eligible / Strong Match",
        labelTe: "అర్హులు / బలమైన సరిపోలిక",
        badgeBg: "bg-[#EAF6EC] border-[#2E7D32]/30 text-[#2E7D32]",
        ringColor: "stroke-[#2E7D32]",
        textColor: "text-[#2E7D32]",
      };
    }
    if (score >= 50) {
      return {
        labelEn: "More Info Needed",
        labelTe: "మరింత సమాచారం అవసరం",
        badgeBg: "bg-[#FFF3E8] border-[#F58220]/30 text-[#F58220]",
        ringColor: "stroke-[#F58220]",
        textColor: "text-[#F58220]",
      };
    }
    return {
      labelEn: "Unlikely Match",
      labelTe: "సరిపోలడం లేదు",
      badgeBg: "bg-[#F7F9FC] border-[#E1E7ED] text-[#5F6B76]",
      ringColor: "stroke-[#7A8793]",
      textColor: "text-[#5F6B76]",
    };
  };

  const meta = getStatusMeta();

  if (size === "sm") {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${meta.badgeBg}`}>
        <span>{score}%</span>
        <span className="text-[11px] font-medium opacity-90">
          • {language === "te" ? meta.labelTe : meta.labelEn}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <div className={`px-3 py-1.5 rounded-lg border font-bold text-sm sm:text-base flex items-center gap-1.5 ${meta.badgeBg}`}>
        <span className="font-mono text-base font-black">{score}%</span>
        <span className="text-xs font-semibold">
          {language === "te" ? meta.labelTe : meta.labelEn}
        </span>
      </div>
    </div>
  );
};

