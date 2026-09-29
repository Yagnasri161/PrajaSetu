"use client";

import React from "react";
import { Scheme } from "@/lib/types";
import { ShieldCheck, ExternalLink, Calendar, Landmark, AlertCircle } from "lucide-react";

interface OfficialSourceCardProps {
  scheme: Scheme;
}

export const OfficialSourceCard: React.FC<OfficialSourceCardProps> = ({ scheme }) => {
  const hasVerifiedAppUrl = Boolean(
    scheme.official_application_url &&
    scheme.official_application_url.startsWith("http") &&
    scheme.official_application_url !== "unverified"
  );

  return (
    <div className="rounded-xl bg-white border border-[#E1E7ED] p-6 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E1E7ED] pb-3">
        <div className="flex items-center gap-2 text-[#2E7D32]">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-bold">
            Official Government Source
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#5F6B76]">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last verified: <strong className="text-[#1F2937] font-mono">{scheme.last_verified}</strong></span>
        </div>
      </div>

      <div className="space-y-3 text-xs text-[#5F6B76]">
        <div className="flex items-start gap-2.5">
          <Landmark className="w-4 h-4 text-[#5F6B76] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#7A8793] block text-[11px]">Nodal Department / Ministry</span>
            <span className="font-semibold text-[#1F2937]">{scheme.department}</span>
          </div>
        </div>

        {/* Source link card */}
        <div className="p-3.5 rounded-lg bg-[#F7F9FC] border border-[#E1E7ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="truncate">
            <span className="text-[11px] text-[#7A8793] font-medium block">అధికారిక సమాచారం (Official Information)</span>
            <span className="text-xs text-[#1F2937] font-mono truncate block">{scheme.official_source_url}</span>
          </div>
          <a
            href={scheme.official_source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0056A6] hover:bg-[#003B73] text-white shadow-2xs transition-colors shrink-0"
          >
            <span>అధికారిక సమాచారం →</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Application Portal status */}
        <div className="pt-1">
          {hasVerifiedAppUrl ? (
            <div className="p-3.5 rounded-lg bg-[#EAF6EC] border border-[#2E7D32]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-[#2E7D32] font-semibold block">
                  {scheme.official_application_url.includes("government-initiatives")
                    ? "అధికారిక సమాచార పోర్టల్ (Official Portal)"
                    : "అధికారిక దరఖాస్తు పోర్టల్ (Verified Application Portal)"}
                </span>
                <span className="text-xs text-[#1F2937] font-mono truncate block">{scheme.official_application_url}</span>
              </div>
              <a
                href={scheme.official_application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#2E7D32] hover:bg-[#256628] text-white shadow-2xs transition-colors shrink-0"
              >
                <span>
                  {scheme.official_application_url.includes("government-initiatives")
                    ? "అధికారిక సమాచారం →"
                    : "అధికారికంగా దరఖాస్తు చేయండి →"}
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-[#FFF3E8] border border-[#F58220]/20 text-[#1F2937] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#F58220] shrink-0" />
              <span className="text-xs font-medium">అధికారిక సమాచారం కోసం పై లింక్‌ను చూడండి.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

