"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export const CitizenCarousel: React.FC = () => {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const citizenCards = [
    {
      id: "farmers",
      image: "/images/card-farmer.jpg",
      titleTe: "రైతుల కోసం",
      titleEn: "For Farmers",
      tagTe: "రైతు భరోసా & సాగు సహాయం",
      tagEn: "Investment & Crop Support",
      href: "/schemes?category=Agriculture",
    },
    {
      id: "students",
      image: "/images/card-students.jpg",
      titleTe: "విద్యార్థుల కోసం",
      titleEn: "For Students",
      tagTe: "స్కాలర్‌షిప్‌లు & ఫీజు రీయింబర్స్‌మెంట్",
      tagEn: "Scholarships & Fee Reimbursement",
      href: "/schemes?category=Education",
    },
    {
      id: "women",
      image: "/images/card-women.jpg",
      titleTe: "మహిళల కోసం",
      titleEn: "For Women",
      tagTe: "మహాలక్ష్మి & స్వయం సహాయక బృందాలు",
      tagEn: "Maha Lakshmi & SHG Support",
      href: "/schemes?category=Women%20%26%20Child",
    },
    {
      id: "families",
      image: "/images/card-family.jpg",
      titleTe: "కుటుంబాలు & గృహాల కోసం",
      titleEn: "For Housing & Families",
      tagTe: "ఇందిరమ్మ ఇండ్లు & గృహ జ్యోతి",
      tagEn: "Indiramma Housing & Free Power",
      href: "/schemes?category=Housing",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] font-telugu">
            {language === "te" ? "ప్రజల కోసం సంక్షేమ పథకాలు" : "Welfare for Every Citizen"}
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6B76]">
            {language === "te"
              ? "వివిధ వర్గాల పౌరులకు ఉద్దేశించిన ప్రత్యేక ప్రభుత్వ పథకాలు"
              : "Dedicated schemes tailored for specific citizen groups"}
          </p>
        </div>

        {/* Desktop Carousel Arrow Controls (myScheme Government Green) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous citizen story"
            className="w-8 h-8 rounded-full bg-[#2E7D32] hover:bg-[#256629] text-white flex items-center justify-center shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next citizen story"
            className="w-8 h-8 rounded-full bg-[#2E7D32] hover:bg-[#256629] text-white flex items-center justify-center shadow-xs transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto scrollbar-none pb-2 pt-1 snap-x snap-mandatory"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {citizenCards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group flex-none w-[280px] sm:w-[320px] md:w-[340px] bg-white border border-[#E1E7ED] hover:border-[#0056A6] rounded-xl overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-200 snap-start flex flex-col"
          >
            {/* Citizen Image Container (75% height) */}
            <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
              <Image
                src={card.image}
                alt={language === "te" ? card.titleTe : card.titleEn}
                fill
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover group-hover:scale-103 transition-transform duration-300"
              />
              {/* Subtle top badge */}
              <div className="absolute top-2.5 left-2.5 bg-[#003B73]/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                {language === "te" ? card.tagTe : card.tagEn}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-3.5 flex items-center justify-between bg-white border-t border-[#E1E7ED]">
              <div className="min-w-0 pr-2">
                <h3 className="text-base font-bold text-[#12304A] group-hover:text-[#0056A6] transition-colors truncate font-telugu">
                  {language === "te" ? card.titleTe : card.titleEn}
                </h3>
                <p className="text-xs text-[#5F6B76] truncate">
                  {language === "te" ? card.titleEn : card.titleTe}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#EAF4FB] text-[#0056A6] flex items-center justify-center shrink-0 group-hover:bg-[#0056A6] group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
