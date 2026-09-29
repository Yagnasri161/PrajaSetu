"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 ${className}`}>
      <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-slate-500" />
      <button
        type="button"
        onClick={() => setLanguage("te")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
          language === "te"
            ? "bg-[#0056A6] text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
        aria-label="తెలుగు భాషను ఎంచుకోండి"
      >
        తెలుగు
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
          language === "en"
            ? "bg-[#0056A6] text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
        aria-label="Select English language"
      >
        English
      </button>
    </div>
  );
};
