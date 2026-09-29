"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Disclaimer } from "@/components/Disclaimer";
import {
  ShieldCheck,
  Heart,
  Globe2,
  Lock,
  Landmark,
  Scale,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Title Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold uppercase tracking-wider">
          <Globe2 className="w-3.5 h-3.5" />
          <span>CIVIC-TECH FOR TELANGANA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {language === "te" ? "ప్రజాసేతు గురించి" : "About PrajaSetu"}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {language === "te"
            ? "తెలంగాణ పౌరులను ప్రభుత్వ సంక్షేమ పథకాలకు అనుసంధానించే మేధో వారధి."
            : "Building the digital bridge connecting citizens of Telangana with their rightful government benefits."}
        </p>
      </div>

      {/* Mission & Problem Statement */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <Landmark className="w-5 h-5 text-amber-500" />
          <span>{language === "te" ? "మా లక్ష్యం (Our Mission)" : "Our Mission"}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {language === "te"
            ? "ప్రభుత్వాలు అద్భుతమైన సంక్షేమ పథకాలను ప్రవేశపెట్టినప్పటికీ, చాలా మంది పౌరులు సమాచార లోపం, సంక్లిష్టమైన జీవోలు, ఏ పత్రాలు కావాలో తెలియకపోవడం వల్ల ప్రయోజనాలను అందుకోలేకపోతున్నారు. ప్రజాసేతు ఈ అంతరాన్ని అధిగమించడానికి ఒక సరళమైన, వివరణాత్మక సివిక్-టెక్ వేదికను అందిస్తుంది."
            : "Every year, state and central governments release vital welfare programs. Yet thousands of eligible citizens miss out due to bureaucratic jargon, buried PDF guidelines, or lack of clarity on document readiness. PrajaSetu removes these barriers with conversational intelligence, instant bilingual accessibility, and transparent eligibility logic."}
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Deterministic Transparency */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Deterministic Transparency</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            AI is used solely for natural language parsing. Scheme eligibility decisions are strictly calculated by deterministic mathematical rules aligned with verified government orders.
          </p>
        </div>

        {/* Pillar 2: Privacy First */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Privacy-First Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We never collect or store Aadhaar numbers, biometric data, or sensitive financial instruments. All queries are evaluated anonymously without persistent personal profiling.
          </p>
        </div>

        {/* Pillar 3: Official Verification */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Official Government Sources</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every scheme includes the nodal ministry, the date of last policy verification, and direct outbound links to official application portals (Praja Palana, MeeSeva, Dharani, PM-Kisan).
          </p>
        </div>

        {/* Pillar 4: Telugu Native Experience */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Authentic Telugu Inclusion</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            PrajaSetu provides a first-class Telugu experience — from voice recognition (te-IN) and conversational text extraction to localized scheme terminology and application steps.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Experience PrajaSetu</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Test our citizen intelligence system with your own situation or browse verified welfare schemes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/schemes"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            <span>Explore Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
          >
            Go to Search
          </Link>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
