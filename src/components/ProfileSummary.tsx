"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { CitizenProfile } from "@/lib/types";
import { User, Edit3, RotateCcw } from "lucide-react";

interface ProfileSummaryProps {
  profile: CitizenProfile;
  onUpdateProfile: (updated: CitizenProfile) => void;
  onReset: () => void;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  profile,
  onUpdateProfile,
  onReset,
}) => {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<CitizenProfile>({ ...profile });

  const formatIncome = (income?: number | null) => {
    if (!income) return null;
    if (income >= 100000) {
      return `₹${(income / 100000).toFixed(1)} Lakh`;
    }
    return `₹${income.toLocaleString("en-IN")}`;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#12355B]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#12355B]">
              {language === "te" ? "మీ ప్రొఫైల్ వివరాలు" : "YOUR SITUATION PROFILE"}
            </h3>
            <p className="text-[11px] text-slate-500">
              {language === "te"
                ? "మీ సంభాషణ నుండి సంగ్రహించబడిన వివరాలు"
                : "Extracted from your conversation"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setEditForm({ ...profile });
              setIsEditing(!isEditing);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isEditing ? (language === "te" ? "రద్దు చేయి" : "Cancel") : (language === "te" ? "సవరించండి" : "Edit Details")}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Reset Search"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === "te" ? "కొత్త శోధన" : "New Search"}</span>
          </button>
        </div>
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1">
          {/* Age */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Age</span>
            <span className="text-sm font-bold text-slate-800">
              {profile.age ? `${profile.age} Yrs` : "Not specified"}
            </span>
          </div>

          {/* Domicile / State */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">State</span>
            <span className="text-sm font-bold text-[#16803A]">
              {profile.district ? `${profile.district}, TS` : profile.state || "Telangana"}
            </span>
          </div>

          {/* Occupation */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Occupation</span>
            <span className="text-sm font-bold text-slate-800 capitalize">
              {profile.occupation ? profile.occupation.replace("_", " ") : "Citizen"}
            </span>
          </div>

          {/* Annual Income */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Annual Income</span>
            <span className="text-sm font-bold text-[#12355B]">
              {formatIncome(profile.annual_income) || "≤ ₹2.0 Lakh"}
            </span>
          </div>

          {/* Land Holding */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Land</span>
            <span className="text-sm font-bold text-slate-800">
              {profile.land_acres ? `${profile.land_acres} Acres` : "0 Acres"}
            </span>
          </div>

          {/* White Ration Card */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">White Ration Card</span>
            <span className={`text-sm font-bold ${profile.has_ration_card ? "text-[#16803A]" : "text-slate-500"}`}>
              {profile.has_ration_card ? "Active (Yes)" : "Not specified"}
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Age</label>
              <input
                type="number"
                value={editForm.age || ""}
                onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) || null })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#12355B]"
                placeholder="e.g. 35"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Annual Income (₹)</label>
              <input
                type="number"
                value={editForm.annual_income || ""}
                onChange={(e) => setEditForm({ ...editForm, annual_income: Number(e.target.value) || null })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#12355B]"
                placeholder="e.g. 150000"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Occupation</label>
              <select
                value={editForm.occupation || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    occupation: e.target.value,
                    farmer_status: e.target.value === "farmer",
                    student_status: e.target.value === "student",
                  })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#12355B]"
              >
                <option value="farmer">Farmer (రైతు)</option>
                <option value="student">Student (విద్యార్థి)</option>
                <option value="homemaker">Homemaker (గృహిణి)</option>
                <option value="daily_wage">Daily Wage (కూలీ)</option>
                <option value="unemployed">Unemployed (నిరుద్యోగి)</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Land (Acres)</label>
              <input
                type="number"
                step="0.1"
                value={editForm.land_acres ?? ""}
                onChange={(e) => setEditForm({ ...editForm, land_acres: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#12355B]"
                placeholder="e.g. 2.0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-lg text-xs font-bold bg-[#12355B] hover:bg-[#0B2545] text-white shadow-sm"
            >
              Recalculate Eligibility
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
