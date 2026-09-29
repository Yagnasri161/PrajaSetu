"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { MatchResult } from "@/lib/types";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

interface EligibilityExplanationProps {
  result: MatchResult;
}

export const EligibilityExplanation: React.FC<EligibilityExplanationProps> = ({ result }) => {
  const { language } = useLanguage();
  const { matchedRules, failedRules, missingInformation, explanationEn, explanationTe } = result;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Overview Explanation Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            {language === "te" ? "ప్రజాసేతు అర్హత విశ్లేషణ సారాంశం" : "Eligibility Intelligence Summary"}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === "te" ? explanationTe : explanationEn}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Satisfied Criteria */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-700 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === "te" ? "సరిపోయిన అర్హతలు (Satisfied)" : "Satisfied Criteria"}</span>
          </h4>
          {matchedRules.length > 0 ? (
            <div className="space-y-2">
              {matchedRules.map((mr, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {language === "te" ? mr.rule.description_te : mr.rule.description_en}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {language === "te" ? mr.rule.description_en : mr.rule.description_te}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No specific conditions were verified yet.</p>
          )}
        </div>

        {/* Missing Information / Pending Confirmation */}
        {missingInformation.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-amber-700 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>
                {language === "te"
                  ? "మరింత సమాచారం అవసరం (More Information Needed)"
                  : "More Information Needed"}
              </span>
            </h4>
            <div className="space-y-2">
              {missingInformation.map((mi, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">⚠</span>
                  <div>
                    <p className="font-semibold text-amber-950">
                      {language === "te" ? mi.questionTe : mi.questionEn}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Required Field: <code className="text-amber-700 font-mono">{mi.field}</code>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Failed Criteria (if any) */}
        {failedRules.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-rose-700 mb-3 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>
                {language === "te" ? "సరిపోలని నిబంధనలు (Unmet Criteria)" : "Unmet Criteria"}
              </span>
            </h4>
            <div className="space-y-2">
              {failedRules.map((fr, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <span className="text-rose-600 font-bold shrink-0 mt-0.5">✕</span>
                  <div>
                    <p className="font-semibold text-rose-950">
                      {language === "te" ? fr.rule.description_te : fr.rule.description_en}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {language === "te" ? fr.rule.description_en : fr.rule.description_te}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
