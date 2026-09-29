"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { User, Cpu, Award, Landmark, ArrowDown, Check, Zap } from "lucide-react";

export const HeroVisual: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Subtle background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-60"></div>

      <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-xl space-y-4">
        {/* Step 1: Citizen Profile */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-orange-400">
                01. {language === "te" ? "పౌరుడి వివరాలు" : "Citizen Profile"}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Input: Natural Voice/Text</span>
            </div>
            <p className="text-xs text-slate-200 truncate mt-0.5 font-medium">
              {language === "te" ? "రైతు, 2 ఎకరాల భూమి, తెల్ల రేషన్ కార్డు" : "Farmer, 2 Acres Land, White Ration Card"}
            </p>
          </div>
        </div>

        {/* Down Arrow 1 */}
        <div className="flex justify-center -my-2 text-slate-600">
          <ArrowDown className="w-4 h-4 animate-bounce text-orange-400" />
        </div>

        {/* Step 2: AI Analysis */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-blue-400">
                02. {language === "te" ? "ఏఐ విశ్లేషణ" : "AI Extraction"}
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Structured
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="px-2 py-0.5 text-[10px] rounded bg-slate-900 border border-slate-700 text-slate-300">
                Land: 2.0 Ac
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded bg-slate-900 border border-slate-700 text-slate-300">
                BPL Card: Yes
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded bg-slate-900 border border-slate-700 text-slate-300">
                State: TS
              </span>
            </div>
          </div>
        </div>

        {/* Down Arrow 2 */}
        <div className="flex justify-center -my-2 text-slate-600">
          <ArrowDown className="w-4 h-4 animate-bounce text-blue-400" />
        </div>

        {/* Step 3: Deterministic Eligibility Score */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400">
                03. {language === "te" ? "అర్హత స్కోరు" : "Eligibility Engine"}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                94% Match
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>3 / 3 Required criteria satisfied</span>
            </p>
          </div>
        </div>

        {/* Down Arrow 3 */}
        <div className="flex justify-center -my-2 text-slate-600">
          <ArrowDown className="w-4 h-4 animate-bounce text-emerald-400" />
        </div>

        {/* Step 4: Government Schemes */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-orange-950/40 via-slate-800/80 to-emerald-950/40 border border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-300 shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-white">
                04. {language === "te" ? "ప్రభుత్వ పథకాలు" : "Official Schemes"}
              </span>
              <span className="text-[10px] text-orange-300 font-medium">Verified Source</span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 font-medium truncate">
              {language === "te" ? "రైతు భరోసా & గృహ జ్యోతి" : "Rythu Bharosa & Gruha Jyothi"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
