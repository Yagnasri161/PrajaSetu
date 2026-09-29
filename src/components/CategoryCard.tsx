"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import {
  Tractor,
  GraduationCap,
  Home,
  HeartPulse,
  HeartHandshake,
  Briefcase,
  LucideIcon,
} from "lucide-react";

export type SchemeCategoryType =
  | "Agriculture"
  | "Education"
  | "Housing"
  | "Health"
  | "Women & Child"
  | "Employment";

interface CategoryCardProps {
  category: SchemeCategoryType;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { language } = useLanguage();

  const meta: Record<
    SchemeCategoryType,
    { labelTe: string; labelEn: string; icon: LucideIcon }
  > = {
    Agriculture: {
      labelTe: "వ్యవసాయం",
      labelEn: "Agriculture",
      icon: Tractor,
    },
    Education: {
      labelTe: "విద్య",
      labelEn: "Education",
      icon: GraduationCap,
    },
    Housing: {
      labelTe: "ఇల్లు",
      labelEn: "Housing",
      icon: Home,
    },
    Health: {
      labelTe: "ఆరోగ్యం",
      labelEn: "Health",
      icon: HeartPulse,
    },
    "Women & Child": {
      labelTe: "మహిళలు & పిల్లలు",
      labelEn: "Women & Children",
      icon: HeartHandshake,
    },
    Employment: {
      labelTe: "ఉపాధి",
      labelEn: "Employment",
      icon: Briefcase,
    },
  };

  const item = meta[category] || meta.Agriculture;
  const Icon = item.icon;

  // Map category to existing database category value if needed (Health -> Healthcare)
  const queryCat = category === "Health" ? "Healthcare" : category;

  return (
    <Link
      href={`/schemes?category=${encodeURIComponent(queryCat)}`}
      className="group flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-[#E1E7ED] hover:border-[#0056A6] hover:bg-[#EAF4FB] transition-all text-center shadow-2xs"
    >
      <div className="w-12 h-12 rounded-xl bg-[#EAF4FB] text-[#0056A6] group-hover:bg-[#0056A6] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#12304A] group-hover:text-[#0056A6] transition-colors leading-snug">
        {item.labelTe}
      </h3>
      <p className="text-xs sm:text-sm font-medium text-[#5F6B76] mt-0.5">
        {item.labelEn}
      </p>
    </Link>
  );
};

