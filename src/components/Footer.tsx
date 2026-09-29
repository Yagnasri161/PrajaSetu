"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { ExternalLink, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full bg-[#003B73] border-t border-[#002D59] text-[#EAF4FB] text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About PrajaSetu */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-[#003B73] flex items-center justify-center font-bold text-sm shadow-xs">
                <span className="text-[#F58220] font-black mr-0.5">P</span>S
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {language === "te" ? "ప్రజాసేతు" : "PrajaSetu"}
              </span>
            </div>
            <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed max-w-lg">
              {language === "te"
                ? "ప్రజాసేతు అనేది తెలంగాణ పౌరుల కోసం తెలుగు మరియు ఆంగ్లంలో ప్రభుత్వ పథకాల అర్హతలను తెలుసుకోవడానికి మరియు దరఖాస్తు చేసుకోవడానికి రూపొందించబడిన స్వతంత్ర సివిక్-టెక్ వేదిక."
                : "PrajaSetu is an independent civic-tech platform bridging citizens and verified government welfare initiatives in Telangana through transparent eligibility criteria."}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#EAF6EC]">
              <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
              <span className="font-medium text-white/90">100% Privacy Focused — No Aadhaar numbers stored.</span>
            </div>
          </div>

          {/* Col 2: Official Telangana Portals */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              {language === "te" ? "అధికారిక పోర్టల్స్" : "Official Portals"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAF4FB] hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Government of Telangana <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://rythubharosa.telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAF4FB] hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Rythu Bharosa <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://indirammaindlu.telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAF4FB] hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Indiramma Indlu <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://myscheme.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAF4FB] hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  National myScheme <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              {language === "te" ? "త్వరిత లింకులు" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-[#EAF4FB] hover:text-white transition-colors">
                  {language === "te" ? "హోమ్" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-[#EAF4FB] hover:text-white transition-colors">
                  {t.navFindSchemes}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[#EAF4FB] hover:text-white transition-colors">
                  {t.navHowItWorks}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#EAF4FB] hover:text-white transition-colors">
                  {t.navAbout}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-lg bg-[#002D59]/80 border border-[#004B8D] text-xs text-[#CBD5E1] leading-relaxed mb-6">
          <p className="font-bold text-[#F58220] mb-1">
            {language === "te" ? "అధికారిక నిరాకరణ ప్రకటన (Disclaimer):" : "Civic Disclaimer:"}
          </p>
          <p>{t.disclaimerText}</p>
        </div>

        {/* Bottom line */}
        <div className="border-t border-[#002D59] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} {t.footerCopyright}</p>
          <p className="text-[11px]">
            PrajaSetu — Civic Technology for Citizens of Telangana.
          </p>
        </div>
      </div>
    </footer>
  );
};

