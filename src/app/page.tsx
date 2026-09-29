"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { HeroSearch } from "@/components/HeroSearch";
import { CitizenCarousel } from "@/components/CitizenCarousel";
import { CategoryCard, SchemeCategoryType } from "@/components/CategoryCard";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Search,
  Send,
  ShieldCheck,
  Lock,
  Landmark,
} from "lucide-react";

export default function HomePage() {
  const { language } = useLanguage();

  // Exactly 6 major categories
  const categories: SchemeCategoryType[] = [
    "Agriculture",
    "Education",
    "Housing",
    "Health",
    "Women & Child",
    "Employment",
  ];

  // Exactly 4 featured schemes with verified official details
  const featuredSchemes = [
    {
      id: "ts-rythu-bharosa",
      nameTe: "రైతు భరోసా",
      nameEn: "Rythu Bharosa",
      descTe: "రైతులకు సాగు పెట్టుబడి సహాయం అందించే వ్యవసాయ సంక్షేమ పథకం.",
      descEn: "Agricultural investment support for cultivating farmers.",
      matchScore: 92,
      officialApplyUrl: "https://rythubharosa.telangana.gov.in/",
      isDirectApp: true,
    },
    {
      id: "ts-indiramma-indlu",
      nameTe: "ఇందిరమ్మ ఇండ్లు",
      nameEn: "Indiramma Indlu",
      descTe: "సొంత స్థలం ఉన్న పేద కుటుంబాలకు ₹5,00,000 గృహ నిర్మాణ సాయం.",
      descEn: "Housing grant of ₹5 Lakh for eligible homeless and BPL families.",
      matchScore: 88,
      officialApplyUrl: "https://indirammaindlu.telangana.gov.in/",
      isDirectApp: true,
    },
    {
      id: "ts-maha-lakshmi",
      nameTe: "మహాలక్ష్మి పథకం",
      nameEn: "Maha Lakshmi Scheme",
      descTe: "మహిళలకు ఉచిత బస్సు ప్రయాణం మరియు ₹2,500 నెలవారీ సహాయం.",
      descEn: "Free RTC bus travel and financial aid for women in Telangana.",
      matchScore: 95,
      officialApplyUrl: "https://www.telangana.gov.in/government-initiatives/",
      isDirectApp: false,
    },
    {
      id: "ts-gruha-jyothi",
      nameTe: "గృహ జ్యోతి పథకం",
      nameEn: "Gruha Jyothi Scheme",
      descTe: "నెలవారీ గృహ వినియోగానికి 200 యూనిట్ల వరకు ఉచిత విద్యుత్.",
      descEn: "Zero electricity bill for domestic consumption up to 200 units/month.",
      matchScore: 90,
      officialApplyUrl: "https://www.telangana.gov.in/government-initiatives/",
      isDirectApp: false,
    },
  ];

  // Exactly 3 simple steps
  const steps = [
    {
      num: "01",
      icon: FileText,
      titleTe: "వివరాలు చెప్పండి",
      titleEn: "Tell us",
      descTe: "మీ గురించి సాధారణ మాటల్లో మాట్లాడండి లేదా రాయండి.",
      descEn: "Share your situation in your own words using voice or text.",
    },
    {
      num: "02",
      icon: Search,
      titleTe: "పథకాలను కనుగొనండి",
      titleEn: "Find schemes",
      descTe: "మీ అర్హతలను నిబంధనలతో సరిపోల్చి తగిన పథకాలను చూపిస్తుంది.",
      descEn: "Matches transparent rules to find exact schemes you qualify for.",
    },
    {
      num: "03",
      icon: Send,
      titleTe: "దరఖాస్తు చేయండి",
      titleEn: "Apply",
      descTe: "అవసరమైన పత్రాలను తెలుసుకొని అధికారిక పోర్టల్ ద్వారా దరఖాస్తు చేయండి.",
      descEn: "Check required documents and apply directly on verified portals.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. HERO / FIND SCHEMES SECTION (Clean White) */}
      <section className="w-full bg-white border-b border-[#DCE5EC] py-10 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          {/* Telugu-First Primary Heading & Subtitle */}
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-bold text-[#12304A] leading-tight font-telugu tracking-tight">
              మీకు సరిపోయే ప్రభుత్వ పథకాలను కనుగొనండి
            </h1>
            <p className="text-lg sm:text-2xl text-[#5F6B76] font-medium">
              Find government schemes for you
            </p>
            <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed max-w-2xl mx-auto font-telugu pt-1">
              మీ గురించి చెప్పండి. మీకు సరిపోయే పథకాలను మేము కనుగొంటాము.
            </p>
          </div>

          {/* Clean Conversational Search Input */}
          <div className="max-w-3xl mx-auto text-left">
            <HeroSearch />
          </div>

          {/* Large Authentic Indian Citizens Hero Banner */}
          <div className="max-w-5xl mx-auto pt-2">
            <div className="relative w-full rounded-2xl border border-[#DCE5EC] bg-white shadow-sm overflow-hidden">
              {/* Banner Image Container */}
              <div className="relative h-56 sm:h-80 md:h-[400px] w-full bg-slate-100">
                <Image
                  src="/images/hero-citizens.jpg"
                  alt="Real Indian citizens benefitting from welfare schemes - farmers, students, women, and elderly"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-center"
                />

                {/* Bottom Subtle Gradient for Content Integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* In-Image Tag */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-left space-y-1">
                  <span className="inline-block bg-[#003B73]/90 backdrop-blur-xs text-xs sm:text-sm font-semibold px-3 py-1 rounded-md shadow-xs">
                    {language === "te"
                      ? "ప్రజా సంక్షేమం — ప్రతి పౌరుడికి చేరువలో"
                      : "Citizen Welfare — Empowering Every Household"}
                  </span>
                </div>
              </div>

              {/* Saffron Accent Bar */}
              <div className="h-2 bg-[#F58220] w-full" />
            </div>

            {/* Official Hashtag / Motto Strip */}
            <div className="text-center pt-3 text-xs sm:text-sm font-semibold tracking-wide text-[#5F6B76]">
              #GOVERNMENTSCHEMES &nbsp;/&nbsp; #SCHEMESFORYOU &nbsp;•&nbsp; #PRAJASETU
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMAGE CAROUSEL / FEATURED CITIZEN STORIES (Clean White #FFFFFF) */}
      <section className="w-full bg-white border-b border-[#DCE5EC] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CitizenCarousel />
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES (Clean White #FFFFFF) */}
      <section className="w-full bg-white border-b border-[#DCE5EC] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#DCE5EC] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] font-telugu">
                {language === "te" ? "ప్రధాన విభాగాలు" : "Popular Categories"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6B76]">
                {language === "te"
                  ? "విభాగం ఆధారంగా పథకాలను అన్వేషించండి"
                  : "Explore welfare schemes by sector"}
              </p>
            </div>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0056A6] hover:text-[#003B73] hover:underline"
            >
              <span>{language === "te" ? "అన్ని పథకాలు" : "All Schemes"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SCHEMES (Clean White) */}
      <section className="w-full bg-white border-b border-[#DCE5EC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#DCE5EC] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] font-telugu">
                {language === "te" ? "ముఖ్యమైన పథకాలు" : "Featured Schemes"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6B76]">
                {language === "te"
                  ? "ప్రజల కోసం ప్రభుత్వం అందిస్తున్న ప్రముఖ సంక్షేమ పథకాలు"
                  : "High-impact government welfare initiatives"}
              </p>
            </div>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0056A6] hover:text-[#003B73] hover:underline"
            >
              <span>{language === "te" ? "మరిన్ని చూడండి" : "View More"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Clean Scheme Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white border border-[#DCE5EC] rounded-xl p-5 shadow-2xs hover:border-[#0056A6] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  {/* Scheme Names */}
                  <div>
                    <h3 className="text-lg font-bold text-[#12304A] font-telugu leading-snug">
                      {scheme.nameTe}
                    </h3>
                    <p className="text-xs font-semibold text-[#5F6B76]">
                      {scheme.nameEn}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed line-clamp-2">
                    {language === "te" ? scheme.descTe : scheme.descEn}
                  </p>

                  {/* Eligibility Match Badge (Green only) */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EAF6EC] text-[#2E7D32] border border-[#2E7D32]/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {language === "te" ? "✓ అర్హత ఉంది" : "✓ Eligible"} • {scheme.matchScore}% Match
                      </span>
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2 border-t border-[#DCE5EC]">
                  <Link
                    href={`/schemes/${scheme.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0056A6] hover:bg-[#003B73] text-white shadow-xs transition-colors"
                  >
                    <span>{language === "te" ? "వివరాలు చూడండి" : "View Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={scheme.officialApplyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#0056A6] hover:text-[#003B73] hover:bg-[#EAF4FB] transition-colors"
                  >
                    <span>
                      {scheme.isDirectApp
                        ? language === "te"
                          ? "అధికారికంగా దరఖాస్తు చేయండి"
                          : "Apply Officially"
                        : language === "te"
                        ? "అధికారిక సమాచారం"
                        : "Official Information"}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (Clean White) */}
      <section className="w-full bg-white border-b border-[#DCE5EC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] font-telugu">
              {language === "te" ? "ఎలా పనిచేస్తుంది?" : "How It Works"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6B76]">
              {language === "te" ? "3 సులభమైన దశల్లో మీ ప్రయోజనాలు" : "3 simple steps to your benefits"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#DCE5EC] rounded-xl p-6 space-y-3 shadow-2xs hover:border-[#0056A6] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#0056A6] font-mono">
                      {s.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#EAF4FB] text-[#0056A6] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#12304A] leading-snug font-telugu">
                    {language === "te" ? s.titleTe : s.titleEn}
                  </h3>
                  <p className="text-xs text-[#5F6B76] font-medium">
                    {language === "te" ? s.titleEn : s.titleTe}
                  </p>
                  <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed">
                    {language === "te" ? s.descTe : s.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TRUST / CITIZEN ASSURANCE STRIP (Clean White) */}
      <section className="w-full bg-white border-b border-[#DCE5EC] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#DCE5EC] shadow-2xs">
              <Landmark className="w-5 h-5 text-[#0056A6] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#12304A]">
                  {language === "te" ? "అధికారిక సమాచారం" : "Verified Portals"}
                </h4>
                <p className="text-xs text-[#5F6B76] mt-0.5">
                  {language === "te" ? "ప్రభుత్వ పోర్టల్స్ ద్వారా మాత్రమే" : "Direct state & central gov links"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#DCE5EC] shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#12304A]">
                  {language === "te" ? "పారదర్శక సరిపోలిక" : "Transparent Matching"}
                </h4>
                <p className="text-xs text-[#5F6B76] mt-0.5">
                  {language === "te" ? "స్పష్టమైన అర్హత నిబంధనలు" : "Deterministic rule explanations"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#DCE5EC] shadow-2xs">
              <Lock className="w-5 h-5 text-[#003B73] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#12304A]">
                  {language === "te" ? "గోప్యతా రక్షణ" : "100% Private"}
                </h4>
                <p className="text-xs text-[#5F6B76] mt-0.5">
                  {language === "te" ? "ఆధార్ నంబర్లు భద్రపరచబడవు" : "No Aadhaar numbers stored"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#DCE5EC] shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#12304A]">
                  {language === "te" ? "తెలుగు ప్రాధాన్యత" : "Telugu-First"}
                </h4>
                <p className="text-xs text-[#5F6B76] mt-0.5">
                  {language === "te" ? "సాధారణ పౌరులకు సులభం" : "Accessible for every citizen"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
