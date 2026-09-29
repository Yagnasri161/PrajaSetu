"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { ShieldAlert } from "lucide-react";

export const Disclaimer: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { language, t } = useLanguage();

  return (
    <div className={`p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-3.5 shadow-sm ${className}`}>
      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold text-slate-900 mb-1">
          {language === "te" ? "ప్రజాసేతు అధికారిక నిరాకరణ (Civic Notice):" : "PrajaSetu Platform Notice:"}
        </h4>
        <p className="text-slate-600">
          {t.disclaimerText}
        </p>
      </div>
    </div>
  );
};
