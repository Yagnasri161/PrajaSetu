"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { SchemeDocument } from "@/lib/types";
import { CheckCircle2, AlertTriangle, FileCheck2 } from "lucide-react";

interface DocumentChecklistProps {
  documents: SchemeDocument[];
  initialHeldDocs?: string[];
  onReadinessChange?: (percentage: number, readyCount: number) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  documents,
  initialHeldDocs = [],
  onReadinessChange,
}) => {
  const { language, t } = useLanguage();

  // State of checked document IDs
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    const heldLower = initialHeldDocs.map((d) => d.toLowerCase());

    documents.forEach((doc) => {
      const name = doc.document_name_en.toLowerCase();
      // Match against held docs
      const match = heldLower.some((h) => name.includes(h) || h.includes(name));
      map[doc.id] = match;
    });
    return map;
  });

  const total = documents.length;
  const readyCount = documents.filter((d) => checkedIds[d.id]).length;
  const percentage = total > 0 ? Math.round((readyCount / total) * 100) : 0;

  const toggleDocument = (id: string) => {
    const next = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(next);
    const newReady = documents.filter((d) => next[d.id]).length;
    const newPct = total > 0 ? Math.round((newReady / total) * 100) : 0;
    if (onReadinessChange) {
      onReadinessChange(newPct, newReady);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Top Header & Percentage */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-700">
              {language === "te" ? "మీ దరఖాస్తు సంసిద్ధత" : "YOUR APPLICATION READINESS"}
            </h3>
          </div>
          <span className="text-2xl font-black text-slate-900">{percentage}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 mt-3">
          <div
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              percentage >= 75
                ? "bg-emerald-600"
                : percentage >= 50
                ? "bg-amber-500"
                : "bg-slate-400"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {language === "te"
            ? `${readyCount} / ${total} పత్రాలు సిద్ధంగా ఉన్నాయి. మార్చడానికి పత్రంపై క్లిక్ చేయండి.`
            : `${readyCount} of ${total} documents ready. Click to check or uncheck documents you hold.`}
        </p>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2.5">
        {documents.map((doc) => {
          const isChecked = Boolean(checkedIds[doc.id]);

          return (
            <div
              key={doc.id}
              onClick={() => toggleDocument(doc.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                isChecked
                  ? "bg-emerald-50/50 border-emerald-300 text-slate-900"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-base font-bold shrink-0 ${isChecked ? "text-emerald-600" : "text-amber-500"}`}>
                  {isChecked ? "✓" : "⚠"}
                </span>

                <div>
                  <p className={`text-sm font-semibold ${isChecked ? "text-slate-900" : "text-slate-700"}`}>
                    {language === "te" ? doc.document_name_te : doc.document_name_en}
                  </p>
                  <p className="text-xs text-slate-500">
                    {language === "te" ? doc.document_name_en : doc.document_name_te}
                  </p>
                </div>
              </div>

              <div className="shrink-0 ml-3">
                {isChecked ? (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {language === "te" ? "సిద్ధంగా ఉంది" : "Ready"}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {language === "te" ? "అవసరం" : "Needed"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MeeSeva note */}
      {percentage < 100 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">
              {language === "te" ? "పత్రాల సహాయం (MeeSeva / ప్రజా పాలన):" : "Need missing documents?"}
            </span>
            <span>
              {language === "te"
                ? "ఆదాయ, కుల ధృవీకరణ పత్రాలు మరియు ఆహార భద్రత కార్డు సవరణల కోసం మీ సమీప మీసేవ (MeeSeva) లేదా ప్రజా పాలన సేవా కేంద్రాన్ని సంప్రదించండి."
                : "Obtain missing certificates (Income, Caste, Residence) at your local MeeSeva center or Ward / Grama Sachivalayam."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
