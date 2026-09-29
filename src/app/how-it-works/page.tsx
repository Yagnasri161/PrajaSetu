"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Disclaimer } from "@/components/Disclaimer";
import {
  Mic,
  Cpu,
  Award,
  FileCheck2,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function HowItWorksPage() {
  const { language, t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Mic,
      titleEn: "Tell Us Your Situation (Voice or Text)",
      titleTe: "మీ పరిస్థితిని తెలియజేయండి (వాయిస్ లేదా టెక్స్ట్)",
      descEn:
        "Speak naturally in Telugu or type in English. PrajaSetu uses the browser Web Speech API for voice recognition without external dependencies.",
      descTe:
        "మీ సాధారణ తెలుగు లేదా ఇంగ్లీషులో మాట్లాడండి లేదా టైప్ చేయండి. ఆధునిక బ్రౌజర్ స్పీచ్ రికగ్నిషన్ ద్వారా మీ వాయిస్‌ని నేరుగా స్వీకరిస్తుంది.",
      highlightEn: "Supported in te-IN & en-IN",
      highlightTe: "తెలుగు (te-IN) & ఇంగ్లీష్ (en-IN) మద్దతు",
    },
    {
      num: "02",
      icon: Cpu,
      titleEn: "AI Profile Extraction without Assumptions",
      titleTe: "ఏఐ సమాచార సంగ్రహణ (కల్పితాలు లేకుండా)",
      descEn:
        "PrajaSetu extracts structured citizen facts: Age, Annual Income, Land Holding, Category, State, and District. It strictly preserves unknown values as null and NEVER invents missing information.",
      descTe:
        "వయస్సు, వార్షిక ఆదాయం, భూమి విస్తీర్ణం, కుల వర్గం వంటి వివరాలను ఖచ్చితంగా గుర్తిస్తుంది. తెలియని సమాచారాన్ని దానంతటదే ఊహించదు.",
      highlightEn: "Strict Zero-Hallucination Policy",
      highlightTe: "కాల్పనిక వివరాలు లేని విధానం",
    },
    {
      num: "03",
      icon: Award,
      titleEn: "Deterministic Rule Evaluation Engine",
      titleTe: "నిర్దిష్ట నిబంధనల ఆధారిత అర్హత గణన",
      descEn:
        "Eligibility is NOT decided by probabilistic AI. A deterministic engine verifies government criteria with transparent scoring: 100% for all satisfied required rules, 90-99% very strong, and 50-74% for pending information.",
      descTe:
        "అర్హతను ఏఐ ఊహించదు. ప్రభుత్వ నిబంధనల ప్రకారం నిర్దిష్ట రూల్ ఇంజిన్ ద్వారా 100%, 90% లేదా 75% వంటి పారదర్శక స్కోరు లెక్కించబడుతుంది.",
      highlightEn: "100% Explainable Matching",
      highlightTe: "100% వివరణాత్మక సరిపోలిక",
    },
    {
      num: "04",
      icon: FileCheck2,
      titleEn: "Document Readiness & Official Application",
      titleTe: "పత్రాల సంసిద్ధత & అధికారిక దరఖాస్తు",
      descEn:
        "Check off which documents you have (Aadhaar, White Ration Card, Land Passbook). See your instant readiness percentage, then click through directly to official portals like Praja Palana or MeeSeva.",
      descTe:
        "మీ వద్ద ఉన్న పత్రాలను సరిచూసుకొని సంసిద్ధత శాతాన్ని తెలుసుకోండి. అనంతరం అధికారిక ప్రజా పాలన లేదా మీసేవ పోర్టల్ ద్వారా దరఖాస్తు చేసుకోండి.",
      highlightEn: "Zero Intermediaries — Official Portals",
      highlightTe: "దళారులు లేని అధికారిక మార్గం",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>CIVIC-TECH ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {t.hiwTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t.hiwSubtitle}
        </p>
      </div>

      {/* 4 Steps Detailed Roadmap */}
      <div className="space-y-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy/10 text-navy flex flex-col items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-mono font-bold mt-1">{step.num}</span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {language === "te" ? step.titleTe : step.titleEn}
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {language === "te" ? step.highlightTe : step.highlightEn}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === "te" ? step.descTe : step.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scoring Transparency Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-slate-900">
          {language === "te" ? "పారదర్శక స్కోరింగ్ విధానం (Scoring Rules)" : "Transparent Scoring Logic"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          PrajaSetu strictly segregates required and non-required government criteria:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-xl font-bold text-emerald-700 block">100%</span>
            <span className="font-semibold text-slate-900 block">Excellent Match</span>
            <p className="text-slate-600 text-[11px]">All required criteria satisfied with complete information.</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <span className="text-xl font-bold text-blue-700 block">90% – 99%</span>
            <span className="font-semibold text-slate-900 block">Very Strong Match</span>
            <p className="text-slate-600 text-[11px]">All core criteria satisfied; 1 minor secondary detail pending.</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <span className="text-xl font-bold text-amber-700 block">50% – 74%</span>
            <span className="font-semibold text-slate-900 block">Possible / More Info</span>
            <p className="text-slate-600 text-[11px]">Applicant may qualify, but required data points were unstated.</p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <span className="text-xl font-bold text-rose-700 block">&lt; 50%</span>
            <span className="font-semibold text-slate-900 block">Unlikely Match</span>
            <p className="text-slate-600 text-[11px]">Disqualified on mandatory criteria (e.g. state or income ceiling).</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          {language === "te" ? "మీ స్వంత పరిస్థితిని పరీక్షించండి" : "Ready to discover your benefits?"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          {language === "te"
            ? "మీ పరిస్థితిని టైప్ చేయండి లేదా మాట్లాడండి, తక్షణమే అర్హతలను తెలుసుకోండి."
            : "Describe your situation in Telugu or English and let PrajaSetu map your government roadmap."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all"
        >
          <span>{language === "te" ? "శోధన ప్రారంభించండి" : "Start Citizen Discovery"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Disclaimer />
    </div>
  );
}
