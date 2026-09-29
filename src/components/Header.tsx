"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth-context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, User, LogOut } from "lucide-react";

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simple, clean navigation as requested
  const navLinks = [
    { href: "/", label: language === "te" ? "హోమ్" : "Home" },
    { href: "/schemes", label: language === "te" ? "పథకాలు" : "Schemes" },
    { href: "/how-it-works", label: language === "te" ? "ఇది ఎలా పనిచేస్తుంది" : "How It Works" },
    { href: "/about", label: language === "te" ? "మా గురించి" : "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#DCE5EC] shadow-2xs">
      {/* Subtle Indian Theme Accent Strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#F58220] via-white to-[#2E7D32]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: PrajaSetu / ప్రజాసేతు with dark blue government branding & subtle emblem mark */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#003B73] flex items-center justify-center text-white font-bold text-sm shadow-xs relative overflow-hidden border border-[#DCE5EC]">
            <span className="text-[#F58220] font-black mr-0.5">P</span>
            <span className="text-white font-black">S</span>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[#2E7D32]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#003B73] tracking-tight">
                PrajaSetu
              </span>
              <span className="text-xs font-semibold text-[#5F6B76] font-telugu bg-[#F7F9FC] px-1.5 py-0.5 rounded border border-[#DCE5EC]">
                ప్రజాసేతు
              </span>
            </div>
            <span className="text-[10px] text-[#7A8793] font-medium hidden sm:inline">
              తెలంగాణ ప్రభుత్వ సంక్షేమ వారధి
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#EAF4FB] text-[#0056A6] font-bold"
                    : "text-[#12304A] hover:text-[#0056A6] hover:bg-[#F7F9FC]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Telugu | English & myScheme-style Green Sign In */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          <div className="h-4 w-px bg-[#E1E7ED] mx-1" />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/profile"
                    ? "bg-[#003B73] text-white"
                    : "text-[#1F2937] hover:bg-[#EAF4FB] hover:text-[#0056A6]"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{language === "te" ? "ప్రొఫైల్" : "Profile"}</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs text-[#5F6B76] hover:text-[#1F2937] hover:bg-[#F7F9FC]"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === "te" ? "లాగ్ అవుట్" : "Sign Out"}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#2E7D32] hover:bg-[#256629] text-white shadow-xs transition-colors"
              >
                <span>{language === "te" ? "లాగిన్" : "Sign In"}</span>
                <span className="font-bold">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#1F2937] hover:bg-[#F7F9FC]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E1E7ED] bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#EAF4FB] hover:text-[#0056A6]"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#E1E7ED] space-y-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#EAF4FB]"
                >
                  <User className="w-4 h-4" />
                  <span>{language === "te" ? "నా ప్రొఫైల్" : "My Profile"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#5F6B76] hover:bg-[#F7F9FC]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{language === "te" ? "లాగ్ అవుట్" : "Sign Out"}</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg text-xs font-semibold border border-[#E1E7ED] text-[#1F2937] hover:bg-[#F7F9FC]"
                >
                  {language === "te" ? "లాగిన్" : "Sign In"}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg text-xs font-semibold bg-[#0056A6] text-white"
                >
                  {language === "te" ? "ప్రొఫైల్ సృష్టించండి" : "Create Profile"}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

