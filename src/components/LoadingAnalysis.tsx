"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Sparkles, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface LoadingAnalysisProps {
  onComplete?: () => void;
  activeStage?: number;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({
  activeStage: propStage,
}) => {
  const { language } = useLanguage();
  const [stage, setStage] = useState(0);

  const steps = [
    {
      en: "Understanding your situation...",
      te: "అవగాహన చేసుకుంటున్నాం...",
      detailEn: "Extracting facts, age, income, and welfare indicators.",
      detailTe: "వయస్సు, ఆదాయం, భూమి మరియు సంక్షేమ వివరాలను గుర్తిస్తున్నాం.",
    },
    {
      en: "Checking eligibility...",
      te: "అర్హతలను పరిశీలిస్తున్నాం...",
      detailEn: "Running deterministic rules across 12+ official schemes.",
      detailTe: "ప్రభుత్వ అధికారిక నిబంధనలతో ఖచ్చితంగా పోల్చి చూస్తున్నాం.",
    },
    {
      en: "Finding relevant schemes...",
      te: "సంబంధిత పథకాలను కనుగొంటున్నాం...",
      detailEn: "Ranking welfare opportunities by match percentage.",
      detailTe: "అర్హత సరిపోలిక శాతం ప్రకారం వరుస క్రమంలో అమర్చుతున్నాం.",
    },
    {
      en: "Preparing your action plan...",
      te: "మీ తదుపరి చర్యలను సిద్ధం చేస్తున్నాం...",
      detailEn: "Assembling document checklist and MeeSeva application steps.",
      detailTe: "కావలసిన పత్రాల జాబితా మరియు దరఖాస్తు మార్గదర్శకాలను సిద్ధం చేస్తున్నాం.",
    },
  ];

  useEffect(() => {
    if (propStage !== undefined) {
      setStage(propStage);
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 600);
    const timer2 = setTimeout(() => setStage(2), 1400);
    const timer3 = setTimeout(() => setStage(3), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [propStage]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-orange-500/30 shadow-2xl backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">
            {language === "te" ? "ప్రజాసేతు మేధో విశ్లేషణ" : "PrajaSetu Citizen Intelligence"}
          </h3>
          <p className="text-xs text-slate-400">
            {language === "te" ? "నిబంధనల ఆధారిత అర్హత గణన జరుగుతోంది" : "Deterministic Rule-Based Processing"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((stage + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((s, idx) => {
          const isDone = stage > idx;
          const isCurrent = stage === idx;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? "bg-slate-800/80 border border-orange-500/30 text-white"
                  : isDone
                  ? "bg-slate-900/40 text-slate-300"
                  : "text-slate-500 opacity-60"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {language === "te" ? s.te : s.en}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === "te" ? s.detailTe : s.detailEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
