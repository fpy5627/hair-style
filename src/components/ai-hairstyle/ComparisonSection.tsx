'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface ComparisonSectionProps {
  className?: string;
}

export const ComparisonSection = ({ className }: ComparisonSectionProps) => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'avoid'>('recommended');

  const recommendedExamples = [
    {
      id: 1,
      label: "正脸 + 光线好",
      badge: "GOOD",
      img: "C:/Users/lyx/.gemini/antigravity/brain/e7edc9ba-58b8-42a2-b921-31928030ff93/rec_front_face_1768654700378.png"
    },
    {
      id: 2,
      label: "自然清晰",
      badge: "GOOD",
      img: "C:/Users/lyx/.gemini/antigravity/brain/e7edc9ba-58b8-42a2-b921-31928030ff93/rec_natural_clear_1768654713635.png"
    },
    {
      id: 3,
      label: "背景简洁",
      badge: "GOOD",
      img: "C:/Users/lyx/.gemini/antigravity/brain/e7edc9ba-58b8-42a2-b921-31928030ff93/rec_simple_bg_1768654726739.png"
    },
    {
      id: 4,
      label: "动漫人物",
      badge: "GOOD",
      img: "C:/Users/lyx/.gemini/antigravity/brain/e7edc9ba-58b8-42a2-b921-31928030ff93/rec_anime_char_1768654744061.png"
    },
  ];

  const avoidExamples = [
    {
      id: 1,
      label: "过于模糊",
      badge: "AVOID",
      img: "C:/Users/lyx/.gemini/antigravity/brain/e7edc9ba-58b8-42a2-b921-31928030ff93/void_blurry_1768654757616.png"
    },
    {
      id: 2,
      label: "光线过暗",
      badge: "AVOID",
      img: "https://images.unsplash.com/photo-1549416873-19ca35f11844?w=400&h=500&fit=crop"
    },
    {
      id: 3,
      label: "视角偏差",
      badge: "AVOID",
      img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      label: "面部遮挡",
      badge: "AVOID",
      img: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=400&h=500&fit=crop"
    },
  ];

  const currentExamples = activeTab === 'recommended' ? recommendedExamples : avoidExamples;

  return (
    <section className={cn("space-y-8", className)}>
      {/* 矩形微圆角切换开关 (SaaS 风格分段控件) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-50/80 backdrop-blur-sm rounded-[12px] border border-slate-200/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] gap-1">
          <button
            onClick={() => setActiveTab('recommended')}
            className={cn(
              "px-10 h-10 rounded-[10px] text-[13px] font-bold transition-all duration-300 flex items-center justify-center active:scale-[0.98] relative",
              activeTab === 'recommended'
                ? "bg-white text-indigo-600 shadow-[0_2px_12px_-2px_rgba(91,73,249,0.12),0_4px_4px_-2px_rgba(0,0,0,0.02)] border border-indigo-100/50"
                : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/40"
            )}
          >
            {activeTab === 'recommended' && (
              <div className="absolute inset-0 rounded-[10px] bg-indigo-50/30 -z-10" />
            )}
            推荐
          </button>
          <button
            onClick={() => setActiveTab('avoid')}
            className={cn(
              "px-10 h-10 rounded-[10px] text-[13px] font-bold transition-all duration-300 flex items-center justify-center active:scale-[0.98] relative",
              activeTab === 'avoid'
                ? "bg-white text-indigo-600 shadow-[0_2px_12px_-2px_rgba(91,73,249,0.12),0_4px_4px_-2px_rgba(0,0,0,0.02)] border border-indigo-100/50"
                : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/40"
            )}
          >
            {activeTab === 'avoid' && (
              <div className="absolute inset-0 rounded-[10px] bg-indigo-50/30 -z-10" />
            )}
            需避免
          </button>
        </div>
      </div>

      {/* 4列网格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        {currentExamples.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col gap-3"
          >
            <div className="relative aspect-[3/4] w-full rounded-[12px] overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm group-hover:shadow-md transition-all duration-500">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Top Badge */}
              <div className="absolute top-2.5 left-2.5">
                <div className={cn(
                  "px-2 py-0.5 rounded-md text-[9px] font-black flex items-center gap-1 backdrop-blur-md shadow-sm border",
                  activeTab === 'recommended'
                    ? "bg-emerald-500/90 border-emerald-400/30 text-white"
                    : "bg-orange-500/90 border-orange-400/30 text-white"
                )}>
                  {activeTab === 'recommended' ? (
                    <>
                      <CheckCircle2 size={10} strokeWidth={3} />
                      GOOD
                    </>
                  ) : (
                    <>
                      <XCircle size={10} strokeWidth={3} />
                      AVOID
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="flex items-center justify-center gap-2">
              <div className={cn(
                "w-1 h-1 rounded-full",
                activeTab === 'recommended' ? "bg-emerald-500" : "bg-orange-500"
              )} />
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

