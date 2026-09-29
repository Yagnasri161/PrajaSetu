"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth-context";
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const { language } = useLanguage();
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        {/* Logo and Welcome */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#12355B] flex items-center justify-center mx-auto p-2 shadow-sm">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <circle cx="12" cy="30" r="3.5" fill="#F59E0B" />
              <path d="M8 39c0-2.8 2-5 4-5s4 2.2 4 5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <rect x="32" y="16" width="8" height="8" rx="2" fill="#16803A" />
              <path d="M36 12l-4 4h8l-4-4z" fill="#16803A"/>
              <path d="M14 28 C 18 16, 30 14, 34 20" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M8 35h32" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#12355B]">
            {language === "te" ? "మళ్లీ స్వాగతం" : "Welcome back"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "te"
              ? "మీ ప్రజాసేతు వ్యక్తిగత ప్రొఫైల్‌ను యాక్సెస్ చేయడానికి లాగిన్ చేయండి"
              : "Sign in to access and manage your PrajaSetu personal profile"}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {language === "te" ? "ఈమెయిల్ చిరునామా" : "Email address"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#12355B] focus:bg-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {language === "te" ? "పాస్‌వర్డ్" : "Password"}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#12355B] focus:bg-white text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#12355B] hover:bg-[#0B2545] text-white shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>{language === "te" ? "లాగిన్ అవుతోంది..." : "Signing in..."}</span>
            ) : (
              <>
                <span>{language === "te" ? "లాగిన్ చేయండి" : "Sign In"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
          <span>{language === "te" ? "ఖాతా లేదా? " : "Don't have an account? "}</span>
          <Link href="/signup" className="text-[#F59E0B] hover:underline font-bold">
            {language === "te" ? "ప్రొఫైల్ సృష్టించండి" : "Create Profile"}
          </Link>
        </div>
      </div>
    </div>
  );
}
