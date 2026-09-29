"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth-context";
import { CitizenProfile, MatchResult } from "@/lib/types";
import { ProfileSummary } from "@/components/ProfileSummary";
import { SchemeCard } from "@/components/SchemeCard";
import { SchemeFilters } from "@/components/SchemeFilters";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { Disclaimer } from "@/components/Disclaimer";
import { ArrowLeft, Save, Bookmark, Sparkles } from "lucide-react";
import Link from "next/link";

function SchemesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { user, updateProfile } = useAuth();

  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All";

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<CitizenProfile | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchTerm, setSearchTerm] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Initialize and run matching
  useEffect(() => {
    let isCancelled = false;

    async function analyzeAndMatch() {
      setLoading(true);

      let targetProfile: CitizenProfile;

      // If user is logged in and has profile and no query is passed, use their saved profile
      if (user?.profile && !queryParam) {
        targetProfile = user.profile;
      } else if (queryParam) {
        // Call /api/analyze-profile
        try {
          const res = await fetch("/api/analyze-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: queryParam, language }),
          });
          const data = await res.json();
          targetProfile = data.profile;
        } catch (err) {
          console.warn("Failed to extract profile:", err);
          targetProfile = {
            state: "Telangana",
            annual_income: 150000,
            has_ration_card: true,
          };
        }
      } else {
        // Default general Telangana citizen profile
        targetProfile = {
          state: "Telangana",
          annual_income: 150000,
          has_ration_card: true,
        };
      }

      if (isCancelled) return;
      setProfile(targetProfile);

      // Call /api/match-schemes
      try {
        const matchRes = await fetch("/api/match-schemes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile: targetProfile,
            language,
            query: queryParam,
          }),
        });
        const matchData = await matchRes.json();
        if (!isCancelled) {
          setResults(matchData.results || []);
        }
      } catch (err) {
        console.error("Match error:", err);
      } finally {
        if (!isCancelled) {
          setTimeout(() => setLoading(false), 600);
        }
      }
    }

    analyzeAndMatch();

    return () => {
      isCancelled = true;
    };
  }, [queryParam, user, language]);

  // Recalculate when profile is edited inline
  const handleUpdateProfile = async (updated: CitizenProfile) => {
    setProfile(updated);
    try {
      const matchRes = await fetch("/api/match-schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: updated,
          language,
          query: "profile_updated",
        }),
      });
      const matchData = await matchRes.json();
      setResults(matchData.results || []);
    } catch (err) {
      console.error("Update match error:", err);
    }
  };

  // Save profile action (login required only to save)
  const handleSaveProfile = async () => {
    if (!profile) return;
    if (!user) {
      // If anonymous, redirect to signup
      router.push("/signup");
      return;
    }

    const res = await updateProfile(profile);
    if (!res.error) {
      setSaveStatus(language === "te" ? "ప్రొఫైల్ భద్రపరచబడింది!" : "Profile Saved!");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleReset = () => {
    router.push("/");
  };

  const filteredResults = results.filter((res) => {
    const s = res.scheme;
    const catMatch =
      selectedCategory === "All" || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const textMatch =
      !searchTerm.trim() ||
      s.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name_te.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase());
    const scoreMatch = res.score >= minScore;

    return catMatch && textMatch && scoreMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Link & Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0056A6] transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "te" ? "తిరిగి శోధన విభాగం" : "Back to Search"}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">
            {language === "te" ? "మీకు సరిపోయే ప్రభుత్వ పథకాలు" : "Schemes Matching Your Profile"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {language === "te"
              ? "మీ వివరాల ఆధారంగా అర్హత శాతం ప్రకారం అమర్చబడ్డాయి"
              : "Ranked by eligibility match percentage based on your situation."}
          </p>
        </div>

        {/* Save Profile Button */}
        {profile && (
          <button
            type="button"
            onClick={handleSaveProfile}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0056A6] hover:bg-[#003B73] text-white shadow-sm transition-colors self-start sm:self-auto"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#F58220]" />
            <span>
              {saveStatus || (user ? (language === "te" ? "ప్రొఫైల్ సేవ్ చేయి" : "Save Profile") : (language === "te" ? "ప్రొఫైల్ సృష్టించి సేవ్ చేయి" : "Create Profile to Save"))}
            </span>
          </button>
        )}
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="py-8">
          <LoadingAnalysis />
        </div>
      )}

      {/* Profile Summary Card with Edit Ability */}
      {!loading && profile && (
        <ProfileSummary
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onReset={handleReset}
        />
      )}

      {/* Filter and Search Bar */}
      {!loading && (
        <SchemeFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          minScore={minScore}
          onMinScoreChange={setMinScore}
        />
      )}

      {/* Schemes Results List */}
      {!loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              {language === "te" ? "కనుగొనబడిన పథకాలు" : "Discovered Schemes"}:{" "}
              <strong className="text-slate-800">{filteredResults.length}</strong>
            </span>
            <span>
              {language === "te" ? "అర్హత శాతం క్రమంలో అమర్చబడింది" : "Ranked by Match Percentage"}
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <SchemeCard key={result.scheme.id} result={result} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
              <p className="text-slate-700 text-sm font-medium">{t.noSchemesFound}</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setMinScore(0);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {language === "te" ? "ఫిల్టర్లను క్లియర్ చేయండి" : "Clear All Filters"}
              </button>
            </div>
          )}
        </div>
      )}

      <Disclaimer />
    </div>
  );
}

export default function SchemesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-8 h-8 border-2 border-[#12355B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 mt-3">Loading citizen intelligence...</p>
        </div>
      }
    >
      <SchemesContent />
    </Suspense>
  );
}
