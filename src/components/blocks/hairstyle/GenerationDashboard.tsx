'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Camera, 
  Check, 
  Plus, 
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HistoryRecord } from './StyleSelector';

interface Hairstyle {
  id: string;
  name: string;
  preview: string;
  badge?: 'BEST MATCH' | 'RECOMMENDED' | 'TRENDING' | 'NEW' | 'HOT';
}

interface GenerationDashboardProps {
  styles: Hairstyle[];
  selectedStyleId: string | null;
  onStyleSelect: (id: string) => void;
  onUpload: () => void;
  onCamera: () => void;
  history: HistoryRecord[];
  onHistoryClick: (record: HistoryRecord) => void;
  onGenerate: () => void;
}

/**
 * GenerationDashboard: 发型生成工作台
 * 具备专业交互感的重型组件
 */
export const GenerationDashboard = ({
  styles,
  selectedStyleId,
  onStyleSelect,
  onUpload,
  onCamera,
  history,
  onHistoryClick,
  onGenerate,
}: GenerationDashboardProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(styles.length / itemsPerPage);
  
  const currentStyles = styles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
      
      {/* 1. 左侧展示区 (Main Area) */}
      <main className="flex-1 flex flex-col justify-start min-w-0 bg-white">
        
        {/* 发型多行网格展示区 - 紧凑布局 */}
        <div className="shrink-0 flex flex-col items-center py-6 px-6 md:px-10 relative group/main">
          
          <div className="w-full max-w-[860px] shrink-0 flex flex-col items-center">
            {/* 纯 Grid 容器 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-center">
              {currentStyles.map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <div 
                    key={style.id}
                    onClick={() => onStyleSelect(style.id)}
                    className={cn(
                      "group relative w-full max-w-[160px] flex flex-col rounded overflow-hidden cursor-pointer transition-all duration-500 group/card bg-white shadow-sm border border-slate-100",
                      isSelected 
                        ? "ring-4 ring-indigo-600 shadow-2xl shadow-indigo-100 scale-[0.98]" 
                        : "hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200"
                    )}
                  >
                    <div className="relative w-full aspect-[4/3] max-h-[180px] min-h-[140px] overflow-hidden rounded-t rounded-b-none bg-slate-100">
                      <Image 
                        src={style.preview} 
                        alt={style.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />

                      {/* 核心功能 - 状态标签 (Tags) - 移入图片内部底部 */}
                      {style.badge && (
                        <div className={cn(
                          "absolute bottom-0 left-0 right-0 z-20 h-6 flex items-center justify-center text-[8px] font-black uppercase tracking-[0.15em] text-white",
                          "!opacity-100 !visible outline-red", // 调试要求
                          style.badge === 'BEST MATCH' && "bg-blue-500/90 backdrop-blur-sm",
                          style.badge === 'RECOMMENDED' && "bg-indigo-600/90 backdrop-blur-sm",
                          style.badge === 'TRENDING' && "bg-purple-600/90 backdrop-blur-sm",
                          style.badge === 'NEW' && "bg-emerald-500/90 backdrop-blur-sm",
                          style.badge === 'HOT' && "bg-red-500/90 backdrop-blur-sm"
                        )}>
                          {style.badge}
                        </div>
                      )}

                      {/* 选中交互 - 蓝色 Check 标记 - 移入图片容器以防与顶部标签冲突 */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-30 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      )}

                      {/* 底部文案渐变遮罩 - 加深遮罩保证文字清晰 - 增加 pointer-events-none */}
                      <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none">
                        <p className="text-white text-[11px] font-black tracking-tight line-clamp-1 mb-2">{style.name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 分页 / 加载更多区域 */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      currentPage === i + 1 
                        ? "w-6 bg-indigo-600" 
                        : "bg-slate-200 hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. 底部行动条 */}
        <footer className="shrink-0 p-6 mt-6 border-t border-slate-50 bg-slate-50/20">
          <button 
            onClick={onGenerate}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-lg shadow-xl shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
          >
            立即生成 AI 新发型
          </button>
        </footer>
      </main>

      {/* 2. 右侧工具栏 (Sidebar - 增加宽度) */}
      <aside className="w-full lg:w-[440px] xl:w-[500px] lg:max-w-[500px] border-l border-slate-100 flex flex-col p-6 space-y-4 bg-white shrink-0">
        
        {/* 上传控件 */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-indigo-100 rounded-[2.5rem] p-6 flex flex-col items-center justify-center space-y-4 bg-indigo-50/5 hover:bg-indigo-50/10 transition-all group relative min-h-[300px]">
            <div className="text-indigo-500 group-hover:scale-110 transition-transform">
              <Upload size={64} strokeWidth={1.5} />
            </div>
            <p className="text-base font-bold text-slate-500">拖放图片或点击选择。</p>
            
            <div className="flex gap-4 w-full px-4">
              <button 
                onClick={onUpload}
                className="flex-1 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-black shadow-lg shadow-indigo-100 transition-all"
              >
                选择文件
              </button>
              <button 
                onClick={onCamera}
                className="flex-1 h-14 bg-white border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded-lg flex items-center justify-center gap-2 text-sm font-black transition-all"
              >
                <Camera size={18} className="text-indigo-500" />
                拍照
              </button>
            </div>

            <p className="text-[11px] text-slate-300 font-medium text-center leading-relaxed">
              支持 JPG、JPEG、PNG 或 WebP<br />格式 (20MB)
            </p>
          </div>
        </div>

        {/* 历史记录 */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-slate-800 tracking-tight">最近试戴</h3>
            <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-indigo-500 transition-colors">
              <HelpCircle size={14} />
              照片要求
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {/* 展示前 6 个或占位符 */}
            {[...Array(6)].map((_, i) => {
              const record = history[i];
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => record && onHistoryClick(record)}
                    disabled={!record}
                    className={cn(
                      "aspect-[4/3] w-full rounded-lg overflow-hidden flex flex-col items-center justify-center transition-all group/hist border",
                      record 
                        ? "bg-white border-slate-100 hover:border-indigo-400 shadow-sm" 
                        : "bg-slate-50/80 border-transparent"
                    )}
                  >
                    {record ? (
                      <img src={record.resultImageUrl} alt="History" className="w-full h-full object-cover group-hover/hist:scale-110 transition-transform" />
                    ) : (
                      <Plus size={20} className="text-slate-200" />
                    )}
                  </button>
                  <span className="text-[10px] font-bold text-slate-400">
                    {record ? record.styleName : `结果 ${i + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
};

