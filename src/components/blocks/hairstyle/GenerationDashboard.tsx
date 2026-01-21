'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
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

  const t = useTranslations('hairstyle.dashboard');

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
                      "group relative w-full max-w-[160px] flex flex-col rounded-[8px] cursor-pointer transition-all duration-500 group/card bg-white shadow-sm border border-slate-100",
                      isSelected
                        ? "ring-4 ring-indigo-600 shadow-2xl shadow-indigo-100 scale-[0.98]"
                        : "hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200"
                    )}
                  >
                    {/* 1) 图片区域 - 顶部圆角 8px */}
                    <div className={cn(
                      "relative w-full aspect-[4/3] max-h-[170px] min-h-[130px] rounded-t-[8px] overflow-hidden bg-slate-100",
                      !style.badge && "rounded-b-[8px]"
                    )}>
                      <Image
                        src={style.preview}
                        alt={style.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />

                      {/* 选中交互 - 蓝色 Check 标记 */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-30 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      )}

                      {/* 底部文案渐变遮罩 - 仅用于图片上的名字显示 */}
                      <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none">
                        <p className="text-white text-[10px] font-medium tracking-tight line-clamp-1">{style.name}</p>
                      </div>
                    </div>

                    {/* 2) 标签条 - 直角，如果有标签则底部圆角 8px */}
                    {style.badge && (
                      <div className={cn(
                        "w-full h-5 flex items-center justify-start px-2 text-[8px] font-medium uppercase tracking-[0.15em] text-white shrink-0 rounded-b-[8px]",
                        style.badge === 'BEST MATCH' && "bg-blue-500",
                        style.badge === 'RECOMMENDED' && "bg-indigo-600",
                        style.badge === 'TRENDING' && "bg-purple-600",
                        style.badge === 'NEW' && "bg-emerald-500",
                        style.badge === 'HOT' && "bg-rose-500"
                      )}>
                        {style.badge}
                      </div>
                    )}
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
            {t('generate_button')}
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
            <p className="text-base font-bold text-slate-500">{t('upload_title')}</p>

            <div className="flex gap-3 w-full">
              <button
                onClick={onUpload}
                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 px-2"
              >
                {t('select_file')}
              </button>
              <button
                onClick={onCamera}
                className="flex-1 h-12 bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 hover:shadow-md rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ease-out px-2"
              >
                <Camera size={18} className="text-indigo-500" />
                {t('take_photo')}
              </button>
            </div>

            <p className="text-[11px] text-slate-300 font-medium text-center leading-relaxed" dangerouslySetInnerHTML={{ __html: t('file_tip') }} />
          </div>
        </div>

        {/* 历史记录 */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-slate-800 tracking-tight">{t('history_title')}</h3>
            <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-indigo-500 transition-colors">
              <HelpCircle size={14} />
              {t('photo_requirements')}
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
                    {record ? record.styleName : t('result_placeholder', { index: i + 1 })}
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


