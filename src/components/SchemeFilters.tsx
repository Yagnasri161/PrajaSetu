"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Search, SlidersHorizontal } from "lucide-react";

interface SchemeFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  minScore: number;
  onMinScoreChange: (score: number) => void;
}

export const SchemeFilters: React.FC<SchemeFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  minScore,
  onMinScoreChange,
}) => {
  const { language } = useLanguage();

  const categories = [
    { key: "All", en: "All Categories", te: "అన్ని విభాగాలు" },
    { key: "Housing", en: "Housing", te: "గృహ నిర్మాణం" },
    { key: "Agriculture", en: "Agriculture", te: "వ్యవసాయం" },
    { key: "Women & Child", en: "Women & Child", te: "మహిళా & శిశు సంక్షేమం" },
    { key: "Energy", en: "Energy", te: "విద్యుత్ శక్తి" },
    { key: "Education", en: "Education", te: "విద్య" },
    { key: "Healthcare", en: "Healthcare", te: "వైద్య ఆరోగ్యం" },
    { key: "Social Security", en: "Social Security", te: "సామాజిక భద్రత" },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={language === "te" ? "పథకాల పేరుతో శోధించండి..." : "Filter by scheme name..."}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#12355B] focus:bg-white transition-colors"
          />
        </div>

        {/* Score Threshold Filters */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 mr-1" />
          <span className="text-slate-500 text-[11px] mr-1">Match:</span>
          {[0, 50, 75, 90].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => onMinScoreChange(score)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                minScore === score
                  ? "bg-[#0056A6] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              {score === 0 ? "All" : `${score}%+`}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onSelectCategory(cat.key)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#0056A6] text-white shadow-sm"
                  : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              {language === "te" ? cat.te : cat.en}
            </button>
          );
        })}
      </div>
    </div>
  );
};
