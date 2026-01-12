'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, ImageIcon } from 'lucide-react';

interface ComparisonSectionProps {
  className?: string;
}

/**
 * 案例展示区组件
 * 采用胶囊形切换开关和 4 列阵列布局展示拍摄示例
 */
export const ComparisonSection = ({ className }: ComparisonSectionProps) => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'avoid'>('recommended');

  const recommendedExamples = [
    { id: 1, label: "正脸+光线好", img: "/imgs/examples/good-example.png" },
    { id: 2, label: "轮廓清晰", img: "https://placehold.co/300x400/f8fafc/64748b?text=轮廓清晰" },
    { id: 3, label: "平视镜头", img: "https://placehold.co/300x400/f8fafc/64748b?text=平视镜头" },
    { id: 4, label: "背景干净", img: "https://placehold.co/300x400/f8fafc/64748b?text=背景干净" },
  ];

  const avoidExamples = [
    { id: 1, label: "侧脸遮挡", img: "https://placehold.co/300x400/f8fafc/64748b?text=侧脸遮挡" },
    { id: 2, label: "光线过暗", img: "https://placehold.co/300x400/f8fafc/64748b?text=光线过暗" },
    { id: 3, label: "五官遮挡", img: "https://placehold.co/300x400/f8fafc/64748b?text=五官遮挡" },
    { id: 4, label: "画面模糊", img: "https://placehold.co/300x400/f8fafc/64748b?text=画面模糊" },
  ];

  const currentExamples = activeTab === 'recommended' ? recommendedExamples : avoidExamples;

  return (
    <section className={cn("space-y-6", className)}>
      {/* 胶囊形切换开关 */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-[#F1F5F9] rounded-full transition-all duration-300 shadow-inner">
          <button
            onClick={() => setActiveTab('recommended')}
            className={cn(
              "px-8 py-2.5 rounded-full text-[13px] font-black transition-all duration-500",
              activeTab === 'recommended' 
                ? "bg-white text-[#5B49F9] shadow-[0_4px_12px_rgba(0,0,0,0.08)] scale-[1.02]" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            正确拍法
          </button>
          <button
            onClick={() => setActiveTab('avoid')}
            className={cn(
              "px-8 py-2.5 rounded-full text-[13px] font-black transition-all duration-500",
              activeTab === 'avoid' 
                ? "bg-white text-amber-600 shadow-[0_4px_12px_rgba(0,0,0,0.08)] scale-[1.02]" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            需避免
          </button>
        </div>
      </div>

      {/* 4列阵列网格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {currentExamples.map((item) => (
          <div 
            key={item.id} 
            className="group relative flex flex-col items-center space-y-4 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative aspect-[3/4] w-full rounded-[20px] overflow-hidden bg-[#F1F5F9] border border-slate-200/40 shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-500 flex items-center justify-center">
              {/* 占位背景装饰 (类似截图中的网格感) */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '20px 20px, 40px 40px, 40px 40px' }} />
              
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              
              {/* 兜底图标 */}
              <ImageIcon className="absolute w-8 h-8 text-slate-300 z-0" />
              
              {/* 状态标签 */}
              <div className={cn(
                "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black backdrop-blur-md border shadow-sm z-20",
                activeTab === 'recommended'
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-600"
              )}>
                {activeTab === 'recommended' ? 'Correct' : 'Avoid'}
              </div>
            </div>
            
            {/* 底部信息 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full shadow-sm",
                  activeTab === 'recommended' ? "bg-emerald-500" : "bg-amber-500"
                )} />
                <span className="text-[12px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

