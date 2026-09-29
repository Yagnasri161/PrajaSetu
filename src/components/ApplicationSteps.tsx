"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Scheme } from "@/lib/types";
import { ExternalLink, CheckCircle2, FileText, AlertCircle, Send } from "lucide-react";

interface ApplicationStepsProps {
  scheme: Scheme;
}

export const ApplicationSteps: React.FC<ApplicationStepsProps> = ({ scheme }) => {
  const { language, t } = useLanguage();

  const actionSteps = [
    {
      step: 1,
      titleEn: "Confirm eligibility",
      titleTe: "అర్హతను నిర్ధారించుకోండి",
      descEn: "Review the matched criteria and guidelines above to ensure your family meets all departmental requirements.",
      descTe: "పై సమాచారం ఆధారంగా మీ కుటుంబ వివరాలు ప్రభుత్వ నిబంధనలకు సరిపోలుతున్నాయో నిర్ధారించుకోండి.",
      icon: CheckCircle2,
    },
    {
      step: 2,
      titleEn: "Prepare documents",
      titleTe: "పత్రాలను సిద్ధం చేయండి",
      descEn: "Gather verified copies of your required documents (Aadhaar, Ration Card, Bank Passbook, Land Records).",
      descTe: "అవసరమైన ధృవీకరణ పత్రాలు (ఆధార్, రేషన్ కార్డు, బ్యాంక్ ఖాతా వివరాలు) ఒక దగ్గర ఉంచుకోండి.",
      icon: FileText,
    },
    {
      step: 3,
      titleEn: "Resolve missing information",
      titleTe: "లోపించిన సమాచారాన్ని పూర్తి చేయండి",
      descEn: "If income or caste certificates are pending, apply at MeeSeva or update citizen records beforehand.",
      descTe: "ఆదాయ లేదా కుల ధృవీకరణ పత్రాలు లేకపోతే మీ సమీప మీసేవలో ముందుగా దరఖాస్తు చేసుకోండి.",
      icon: AlertCircle,
    },
    {
      step: 4,
      titleEn: "Apply through official government source",
      titleTe: "అధికారిక ప్రభుత్వ మూలం ద్వారా దరఖాస్తు చేయండి",
      descEn: scheme.application_process_en || "Submit your application through the official government portal or local Praja Palana / MeeSeva center.",
      descTe: scheme.application_process_te || "అధికారిక ప్రభుత్వ పోర్టల్ లేదా మీసేవ / ప్రజా పాలన కేంద్రం ద్వారా మీ దరఖాస్తును సమర్పించండి.",
      icon: Send,
    },
  ];

  const hasApplicationUrl = Boolean(
    scheme.official_application_url &&
    scheme.official_application_url.startsWith("http")
  );

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {language === "te" ? "మీ ప్రజాసేతు కార్యాచరణ ప్రణాళిక" : "Your PrajaSetu Action Plan"}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {language === "te"
            ? "ప్రభుత్వ సంక్షేమ పథకానికి దరఖాస్తు చేయడానికి అనుసరించవలసిన 4 దశల ప్రణాళిక"
            : "Follow these 4 clear steps to complete your application smoothly"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actionSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0 font-bold text-xs">
                {step.step}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{language === "te" ? step.titleTe : step.titleEn}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "te" ? step.descTe : step.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          {hasApplicationUrl
            ? language === "te"
              ? "అధికారిక ప్రభుత్వ పోర్టల్‌లో దరఖాస్తు చేసుకోవడానికి లింక్ సిద్ధంగా ఉంది"
              : "Official application portal verified and ready"
            : language === "te"
              ? "అధికారిక దరఖాస్తు లింక్ ధృవీకరించబడలేదు"
              : "Application link not currently verified"}
        </span>

        {hasApplicationUrl ? (
          <a
            href={scheme.official_application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
          >
            <span>{language === "te" ? "అధికారికంగా దరఖాస్తు చేయండి →" : "Apply officially →"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <a
            href={scheme.official_source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <span>{language === "te" ? "అధికారిక సమాచారాన్ని చూడండి →" : "Open official source →"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
