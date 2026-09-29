"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth-context";
import { CitizenProfile } from "@/lib/types";
import {
  User,
  ShieldCheck,
  Save,
  CheckCircle2,
  Bookmark,
  MapPin,
  Briefcase,
  IndianRupee,
  LogOut,
  ArrowRight,
} from "lucide-react";

export default function ProfilePage() {
  const { language } = useLanguage();
  const { user, loading, updateProfile, signOut } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<CitizenProfile>({
    age: 35,
    gender: "male",
    state: "Telangana",
    district: "Medak",
    occupation: "farmer",
    annual_income: 150000,
    category: "BC",
    farmer_status: true,
    student_status: false,
    disability: false,
    owns_house: false,
    land_acres: 2,
    has_ration_card: true,
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user?.profile) {
      setForm((prev) => ({ ...prev, ...user.profile }));
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#12355B] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500">Checking citizen profile session...</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    const res = await updateProfile(form);
    setSaving(false);
    if (!res.error) {
      setSuccessMessage(
        language === "te"
          ? "మీ ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!"
          : "Your personal profile has been updated successfully!"
      );
      setTimeout(() => setSuccessMessage(null), 3500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#F59E0B] block mb-1">
            {language === "te" ? "పౌర గుర్తింపు వివరాలు" : "CITIZEN PROFILE DASHBOARD"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#12355B]">
            {language === "te" ? "నా ప్రజాసేతు ప్రొఫైల్" : "My PrajaSetu Profile"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <strong className="text-slate-700">{user.email}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/schemes"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-sm transition-colors"
          >
            {language === "te" ? "నా పథకాలను చూడండి" : "Check My Schemes →"}
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details Card */}
        <div className="civic-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#12355B] flex items-center gap-2 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-[#F59E0B]" />
            <span>{language === "te" ? "వ్యక్తిగత సమాచారం" : "Personal Information"}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "వయస్సు (Age)" : "Age"}
              </label>
              <input
                type="number"
                value={form.age || ""}
                onChange={(e) => setForm({ ...form, age: Number(e.target.value) || null })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
                placeholder="e.g. 35"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "లింగం (Gender)" : "Gender"}
              </label>
              <select
                value={form.gender || "male"}
                onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
              >
                <option value="male">Male (పురుషుడు)</option>
                <option value="female">Female (మహిళ)</option>
                <option value="other">Other / Transgender</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "రాష్ట్రం (State)" : "State"}
              </label>
              <input
                type="text"
                value={form.state || "Telangana"}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "జిల్లా (District)" : "District"}
              </label>
              <input
                type="text"
                value={form.district || ""}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
                placeholder="e.g. Medak, Warangal, etc."
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "వృత్తి (Occupation)" : "Occupation"}
              </label>
              <select
                value={form.occupation || "farmer"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    occupation: e.target.value,
                    farmer_status: e.target.value === "farmer",
                    student_status: e.target.value === "student",
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
              >
                <option value="farmer">Farmer (రైతు)</option>
                <option value="student">Student (విద్యార్థి)</option>
                <option value="homemaker">Homemaker (గృహిణి)</option>
                <option value="daily_wage">Daily Wage Laborer (కూలీ)</option>
                <option value="self_employed">Self Employed</option>
                <option value="unemployed">Unemployed (నిరుద్యోగి)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "వార్షిక ఆదాయం (Annual Income ₹)" : "Annual Income (₹)"}
              </label>
              <input
                type="number"
                value={form.annual_income || ""}
                onChange={(e) => setForm({ ...form, annual_income: Number(e.target.value) || null })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
                placeholder="e.g. 120000"
              />
            </div>
          </div>
        </div>

        {/* Eligibility Information Card */}
        <div className="civic-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#12355B] flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-[#16803A]" />
            <span>{language === "te" ? "అర్హత ప్రమాణాలు" : "Eligibility Information"}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "సామాజిక వర్గం (Category)" : "Social Category"}
              </label>
              <select
                value={form.category || "BC"}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
              >
                <option value="SC">SC (షెడ్యూల్డ్ కులం)</option>
                <option value="ST">ST (షెడ్యూల్డ్ తెగ)</option>
                <option value="BC">BC (వెనుకబడిన తరగతి)</option>
                <option value="EBC">EBC (ఆర్థికంగా వెనుకబడిన)</option>
                <option value="Minority">Minority (మైనారిటీ)</option>
                <option value="General">General / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "సాగు భూమి (Land in Acres)" : "Land Holding (Acres)"}
              </label>
              <input
                type="number"
                step="0.1"
                value={form.land_acres ?? ""}
                onChange={(e) => setForm({ ...form, land_acres: Number(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === "te" ? "విద్యుత్ వినియోగం (Units/Mo)" : "Electricity Consumption (Units/Mo)"}
              </label>
              <input
                type="number"
                value={form.electricity_units ?? ""}
                onChange={(e) => setForm({ ...form, electricity_units: Number(e.target.value) || null })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#12355B] focus:bg-white"
                placeholder="e.g. 120"
              />
            </div>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.has_ration_card)}
                onChange={(e) => setForm({ ...form, has_ration_card: e.target.checked })}
                className="rounded border-slate-300 text-[#12355B] focus:ring-[#12355B]"
              />
              <span className="text-slate-700 font-medium">White Ration Card Holder</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.owns_house)}
                onChange={(e) => setForm({ ...form, owns_house: e.target.checked })}
                className="rounded border-slate-300 text-[#12355B] focus:ring-[#12355B]"
              />
              <span className="text-slate-700 font-medium">Owns a Pucca House</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.disability)}
                onChange={(e) => setForm({ ...form, disability: e.target.checked })}
                className="rounded border-slate-300 text-[#12355B] focus:ring-[#12355B]"
              />
              <span className="text-slate-700 font-medium">Person with Disability (SADAREM)</span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#12355B] hover:bg-[#0B2545] text-white shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : language === "te" ? "ప్రొఫైల్‌ను భద్రపరచండి" : "Save Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
