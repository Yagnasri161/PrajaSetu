"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { DEMO_PROFILES } from "@/lib/demo-profiles";
import { DemoProfile } from "@/lib/types";
import {
  Tractor,
  HeartHandshake,
  GraduationCap,
  Home,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

interface DemoProfileSelectorProps {
  onSelect?: (profile: DemoProfile) => void;
  layout?: "grid" | "dropdown";
}

export const DemoProfileSelector: React.FC<DemoProfileSelectorProps> = ({
  onSelect,
  layout = "grid",
}) => {
  const { language, t } = useLanguage();
  const router = useRouter();

  const iconMap: Record<string, any> = {
    Tractor,
    HeartHandshake,
    GraduationCap,
    Home,
    Sparkles,
  };

  const handleSelect = (dp: DemoProfile) => {
    if (onSelect) {
      onSelect(dp);
    } else {
      const query = language === "te" ? dp.queryTe : dp.queryEn;
      router.push(`/schemes?demo=${dp.id}&lang=${language}&q=${encodeURIComponent(query)}`);
    }
  };

  if (layout === "dropdown") {
    return (
      <div className="relative inline-block text-left">
        <select
          onChange={(e) => {
            const found = DEMO_PROFILES.find((p) => p.id === e.target.value);
            if (found) handleSelect(found);
          }}
          className="bg-slate-900 border border-orange-500/40 text-orange-400 text-xs rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>
            {language === "te" ? "⚡ నమూనా ప్రొఫైల్‌ను ఎంచుకోండి" : "⚡ Select Demo Citizen"}
          </option>
          {DEMO_PROFILES.map((dp) => (
            <option key={dp.id} value={dp.id} className="bg-slate-950 text-white">
              {language === "te" ? dp.titleTe : dp.titleEn} ({language === "te" ? dp.nameTe : dp.nameEn})
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {DEMO_PROFILES.map((dp) => {
        const Icon = iconMap[dp.icon] || UserCheck;
        return (
          <div
            key={dp.id}
            onClick={() => handleSelect(dp)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                {language === "te" ? dp.titleTe : dp.titleEn}
              </h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {language === "te" ? dp.nameTe : dp.nameEn}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {language === "te" ? dp.queryTe : dp.queryEn}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-orange-400 font-semibold group-hover:text-orange-300">
              <span>{language === "te" ? "ప్రొఫైల్ లోడ్ చేయి" : "Test Persona"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
