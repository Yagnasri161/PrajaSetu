"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Scheme } from "@/lib/types";
import {
  ShieldCheck,
  PlusCircle,
  Edit2,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Layers,
  Activity,
  AlertCircle,
  Save,
  X,
} from "lucide-react";

export default function AdminPage() {
  const { language } = useLanguage();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New scheme template
  const [newSchemeForm, setNewSchemeForm] = useState<Partial<Scheme>>({
    name_en: "",
    name_te: "",
    short_description_en: "",
    short_description_te: "",
    category: "Housing",
    department: "Government of Telangana",
    benefit_en: "",
    benefit_te: "",
    eligibility_summary_en: "",
    eligibility_summary_te: "",
    application_process_en: "Apply via Praja Palana or MeeSeva.",
    application_process_te: "ప్రజా పాలన లేదా మీసేవ ద్వారా దరఖాస్తు చేయండి.",
    official_source_url: "https://telangana.gov.in",
    official_application_url: "https://prajapalana.telangana.gov.in",
    last_verified: new Date().toISOString().split("T")[0],
    active: true,
  });

  const loadSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schemes?admin=true");
      const data = await res.json();
      if (data.schemes) {
        setSchemes(data.schemes);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  // Mark scheme verified as of today
  const handleMarkVerified = async (s: Scheme) => {
    const today = new Date().toISOString().split("T")[0];
    try {
      await fetch("/api/schemes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: s.id,
          last_verified: today,
        }),
      });
      setStatusMessage(`Verified ${s.name_en} as of ${today}!`);
      loadSchemes();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error("Verify error:", err);
    }
  };

  // Toggle active status
  const handleToggleActive = async (s: Scheme) => {
    try {
      await fetch("/api/schemes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: s.id,
          active: !s.active,
        }),
      });
      loadSchemes();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // Save edits
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme) return;
    try {
      await fetch("/api/schemes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingScheme),
      });
      setEditingScheme(null);
      setStatusMessage("Scheme updated successfully!");
      loadSchemes();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error("Save edit error:", err);
    }
  };

  // Add new scheme
  const handleAddScheme = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = `ts-custom-${Date.now()}`;
      await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSchemeForm, id }),
      });
      setShowAddModal(false);
      setStatusMessage("New scheme added successfully!");
      loadSchemes();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error("Add scheme error:", err);
    }
  };

  // Metrics
  const totalSchemes = schemes.length;
  const activeSchemes = schemes.filter((s) => s.active).length;
  const categoriesCount = new Set(schemes.map((s) => s.category)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-orange-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>CIVIC DATA MANAGEMENT PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Scheme Catalog & Policy Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain official Telangana and Central welfare database records, source links, and active verification dates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Scheme</span>
        </button>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" /> Total Schemes
          </span>
          <span className="text-2xl font-black text-white">{totalSchemes}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Active Schemes
          </span>
          <span className="text-2xl font-black text-emerald-400">{activeSchemes}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-purple-400" /> Categories
          </span>
          <span className="text-2xl font-black text-white">{categoriesCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-orange-400" /> Verification
          </span>
          <span className="text-xs font-semibold text-emerald-400 block pt-1">
            Official Govt Order
          </span>
        </div>
      </div>

      {/* Schemes Data Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Government Welfare Catalog</h3>
          <span className="text-xs text-slate-400">{schemes.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5">Scheme Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Nodal Department</th>
                <th className="p-3.5">Verified Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {schemes.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <p className="font-semibold text-white">{s.name_en}</p>
                    <p className="text-[11px] text-slate-400 font-telugu">{s.name_te}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-orange-400">
                      {s.category}
                    </span>
                  </td>
                  <td className="p-3.5 max-w-xs truncate text-slate-400">{s.department}</td>
                  <td className="p-3.5 font-mono text-[11px] text-emerald-400">{s.last_verified}</td>
                  <td className="p-3.5">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(s)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        s.active
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {s.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingScheme(s)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMarkVerified(s)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verify Today</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Scheme Modal */}
      {editingScheme && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Edit Scheme: {editingScheme.name_en}</h3>
              <button
                type="button"
                onClick={() => setEditingScheme(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Name (English)</label>
                  <input
                    type="text"
                    value={editingScheme.name_en}
                    onChange={(e) => setEditingScheme({ ...editingScheme, name_en: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Name (Telugu)</label>
                  <input
                    type="text"
                    value={editingScheme.name_te}
                    onChange={(e) => setEditingScheme({ ...editingScheme, name_te: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Official Source URL</label>
                  <input
                    type="url"
                    value={editingScheme.official_source_url}
                    onChange={(e) => setEditingScheme({ ...editingScheme, official_source_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Official Application URL</label>
                  <input
                    type="url"
                    value={editingScheme.official_application_url}
                    onChange={(e) => setEditingScheme({ ...editingScheme, official_application_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Benefit (English)</label>
                <textarea
                  rows={2}
                  value={editingScheme.benefit_en}
                  onChange={(e) => setEditingScheme({ ...editingScheme, benefit_en: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Application Process (English)</label>
                <textarea
                  rows={2}
                  value={editingScheme.application_process_en}
                  onChange={(e) => setEditingScheme({ ...editingScheme, application_process_en: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingScheme(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Scheme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add New Government Scheme</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddScheme} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Scheme Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={newSchemeForm.name_en}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, name_en: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    placeholder="e.g. Telangana Solar Subsidy"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Scheme Name (Telugu) *</label>
                  <input
                    type="text"
                    required
                    value={newSchemeForm.name_te}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, name_te: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    placeholder="e.g. సౌర విద్యుత్ సబ్సిడీ పథకం"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Category</label>
                  <select
                    value={newSchemeForm.category}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Housing">Housing</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Women & Child">Women & Child</option>
                    <option value="Energy">Energy</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Social Security">Social Security</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={newSchemeForm.department}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Benefit (English) *</label>
                <textarea
                  rows={2}
                  required
                  value={newSchemeForm.benefit_en}
                  onChange={(e) => setNewSchemeForm({ ...newSchemeForm, benefit_en: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  placeholder="e.g. 50% capital subsidy on residential rooftop solar panels."
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Benefit (Telugu) *</label>
                <textarea
                  rows={2}
                  required
                  value={newSchemeForm.benefit_te}
                  onChange={(e) => setNewSchemeForm({ ...newSchemeForm, benefit_te: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  placeholder="ఉదాహరణ: గృహ సోలార్ ప్యానెళ్లపై 50% సబ్సిడీ."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Official Source URL *</label>
                  <input
                    type="url"
                    required
                    value={newSchemeForm.official_source_url}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, official_source_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Official Application URL</label>
                  <input
                    type="url"
                    value={newSchemeForm.official_application_url}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, official_application_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                >
                  Create Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
