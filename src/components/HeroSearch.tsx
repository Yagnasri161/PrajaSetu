"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { VoiceInput } from "./VoiceInput";
import { ArrowRight, Search } from "lucide-react";

export const HeroSearch: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Minimal examples as requested: రైతు, విద్యార్థి, ఇల్లు కావాలి
  const chips = [
    {
      labelTe: "రైతు",
      labelEn: "Farmer",
      queryTe: "నేను రైతును. నాకు వ్యవసాయ పెట్టుబడి సాయం అవసరం.",
      queryEn: "I am a farmer looking for agricultural assistance.",
    },
    {
      labelTe: "విద్యార్థి",
      labelEn: "Student",
      queryTe: "నేను కళాశాల విద్యార్థిని. విద్యా స్కాలర్‌షిప్ పథకాలు కావాలి.",
      queryEn: "I am a student looking for educational scholarships.",
    },
    {
      labelTe: "ఇల్లు కావాలి",
      labelEn: "Housing Need",
      queryTe: "సొంత ఇల్లు లేని పేద కుటుంబం. గృహ నిర్మాణ పథకం కావాలి.",
      queryEn: "Need housing assistance and financial support for home construction.",
    },
  ];

  const handleSearch = (searchQuery?: string) => {
    const textToSearch = searchQuery !== undefined ? searchQuery : query;
    if (!textToSearch.trim()) return;

    setLoading(true);
    const encoded = encodeURIComponent(textToSearch.trim());
    router.push(`/schemes?q=${encoded}&lang=${language}`);
  };

  const handleChipClick = (chip: typeof chips[0]) => {
    const selectedText = language === "te" ? chip.queryTe : chip.queryEn;
    setQuery(selectedText);
    handleSearch(selectedText);
  };

  // Direct replacement without appending into itself, preventing repeated words
  const handleVoiceTranscript = (transcript: string) => {
    if (transcript && transcript.trim()) {
      setQuery(transcript.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Clean White Government Search Card */}
      <div className="bg-white border-2 border-[#DCE5EC] focus-within:border-[#0056A6] rounded-2xl shadow-xs p-4 sm:p-5 transition-all">
        <textarea
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder={
            language === "te"
              ? "మీ గురించి చెప్పండి... (Tell us about yourself...)"
              : "Tell us about yourself... (మీ గురించి చెప్పండి...)"
          }
          className="w-full bg-transparent text-[#1F2937] placeholder-[#7A8793] text-base sm:text-lg focus:outline-none resize-none leading-relaxed"
          aria-label={language === "te" ? "మీ పరిస్థితిని టైప్ చేయండి లేదా మాట్లాడండి" : "Describe your situation"}
        />

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#DCE5EC]">
          <VoiceInput onTranscript={handleVoiceTranscript} />

          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              !query.trim() || loading
                ? "bg-[#DCE5EC] text-[#7A8793] cursor-not-allowed"
                : "bg-[#0056A6] hover:bg-[#003B73] text-white"
            }`}
          >
            {loading ? (
              <span>{language === "te" ? "శోధిస్తోంది..." : "Finding Schemes..."}</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{language === "te" ? "పథకాలను కనుగొనండి" : "Find Schemes"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimal Examples: రైతు, విద్యార్థి, ఇల్లు కావాలి */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
        <span className="text-[#5F6B76] font-medium">
          {language === "te" ? "ఉదాహరణలు:" : "Examples:"}
        </span>
        {chips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="px-3 py-1 rounded-full bg-white border border-[#DCE5EC] text-[#0056A6] hover:bg-[#EAF4FB] hover:border-[#0056A6] font-medium transition-colors"
          >
            {language === "te" ? chip.labelTe : chip.labelEn}
          </button>
        ))}
      </div>
    </div>
  );
};

