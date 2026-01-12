'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { 
  ChevronsDown, 
  Camera, 
  ArrowRight, 
  UploadCloud, 
  History,
  ChevronDown,
  Check
} from 'lucide-react';

export interface HistoryRecord {
  id: string;
  createdAt: number;
  resultImageUrl: string;
  styleId: string;
  styleName: string;
}

interface StyleTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * 发型分类切换组件
 * 支持展开/收起功能，默认只显示一行，超出部分用"..."表示
 */
export const StyleTabs = ({ categories, activeCategory, onCategoryChange }: StyleTabsProps) => {
  const t = useTranslations('home.categories');
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(categories.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // 确保"全部"按钮在最前面
  const allCategories = categories.includes('All') 
    ? categories 
    : ['All', ...categories];

  /**
   * 计算一行能显示多少个按钮
   */
  useEffect(() => {
    if (isExpanded) {
      setVisibleCount(allCategories.length);
      return;
    }

    const calculateVisibleCount = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const gap = 6; // gap-1.5 = 6px
      let totalWidth = 0;
      let count = 0;

      // 测量每个按钮的宽度
      for (let i = 0; i < allCategories.length; i++) {
        const button = buttonsRef.current[i];
        if (!button) continue;

        const buttonWidth = button.offsetWidth || button.scrollWidth;
        const neededWidth = totalWidth + buttonWidth + (count > 0 ? gap : 0);

        // 需要为"..."按钮预留空间（约 50px）
        const ellipsisWidth = 50;
        if (neededWidth + ellipsisWidth > containerWidth && count > 0) {
          break;
        }

        totalWidth = neededWidth;
        count++;
      }

      // 至少显示第一个按钮
      setVisibleCount(Math.max(1, count));
    };

    // 延迟计算，确保 DOM 已渲染
    const timer = setTimeout(calculateVisibleCount, 50);
    
    // 监听窗口大小变化
    const handleResize = () => {
      clearTimeout(timer);
      setTimeout(calculateVisibleCount, 50);
    };

    window.addEventListener('resize', handleResize);
    
    // 使用 ResizeObserver 监听容器大小变化
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        clearTimeout(timer);
        setTimeout(calculateVisibleCount, 50);
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isExpanded, allCategories.length]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  const shouldShowEllipsis = !isExpanded && visibleCount < allCategories.length;
  const visibleCategories = isExpanded ? allCategories : allCategories.slice(0, visibleCount);

  return (
    <div className="w-full pb-2">
      {/* 隐藏的测量容器，用于计算按钮宽度 */}
      <div className="absolute invisible -z-10" style={{ top: '-9999px' }}>
        <div className="flex items-center gap-1.5 md:gap-2">
          {allCategories.map((category, index) => (
            <button
              key={`measure-${category}`}
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              className="h-7 px-3 rounded-[8px] text-[11px] font-semibold border whitespace-nowrap"
            >
              {t.has(category.toLowerCase()) ? t(category.toLowerCase()) : category}
            </button>
          ))}
        </div>
      </div>

      {/* 实际显示的容器 */}
      <div 
        ref={containerRef}
        className={cn(
          "flex items-center gap-1.5 md:gap-2",
          isExpanded ? "flex-wrap" : "flex-nowrap overflow-hidden"
        )}
      >
        {visibleCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={cn(
              "h-7 px-3 rounded-[8px] text-[11px] font-semibold transition-all border whitespace-nowrap shrink-0",
              activeCategory === category
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white/70 text-slate-600 border-slate-200/70 hover:bg-white hover:text-slate-900"
            )}
          >
            {t.has(category.toLowerCase()) ? t(category.toLowerCase()) : category}
          </button>
        ))}
        
        {shouldShowEllipsis && (
          <button
            onClick={handleToggleExpand}
            className="h-7 px-3 rounded-[8px] text-[11px] font-semibold transition-all border bg-white/70 text-slate-600 border-slate-200/70 hover:bg-white hover:text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>...</span>
            <ChevronDown size={12} className="transition-transform" />
          </button>
        )}

        {isExpanded && (
          <button
            onClick={handleToggleExpand}
            className="h-7 px-3 rounded-[8px] text-[11px] font-semibold transition-all border bg-white/70 text-slate-600 border-slate-200/70 hover:bg-white hover:text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>收起</span>
            <ChevronDown size={12} className="rotate-180 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

interface Hairstyle {
  id: string;
  name: string;
  preview: string;
  badge?: 'BEST MATCH' | 'RECOMMENDED' | 'TRENDING' | 'NEW';
}

interface HairstyleGridProps {
  styles: Hairstyle[];
  selectedStyleId: string | null;
  onStyleSelect: (id: string) => void;
}

/**
 * 发型网格组件（密集布局）
 * 
 * @param styles - 发型列表，会自动按 ID 去重
 * @param selectedStyleId - 当前选中的发型 ID
 * @param onStyleSelect - 发型选中时的回调
 */
export const HairstyleGrid = ({ styles, selectedStyleId, onStyleSelect }: HairstyleGridProps) => {
  // 1）开发环境下对 styles 的 id 做重复检测
  if (process.env.NODE_ENV !== 'production') {
    const ids = styles.map(s => s.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      const uniqueDuplicateIds = Array.from(new Set(duplicates));
      console.warn(
        `[HairstyleGrid] Encountered duplicate style IDs: ${uniqueDuplicateIds.join(', ')}`,
        {
          duplicateIds: uniqueDuplicateIds,
          duplicateItems: styles.filter(s => uniqueDuplicateIds.includes(s.id)),
          allStyles: styles
        }
      );
    }
  }

  // 2）根治：使用 Map 按 id 去重（保留第一条），确保 React key 唯一
  const uniqueStyles = Array.from(
    styles.reduce((map, style) => {
      if (!map.has(style.id)) {
        map.set(style.id, style);
      }
      return map;
    }, new Map<string, Hairstyle>()).values()
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-1.5 lg:gap-2">
      {uniqueStyles.map((style) => (
        <div
          key={style.id}
          onClick={() => onStyleSelect(style.id)}
          className={cn(
            "group flex flex-col rounded-[8px] bg-white shadow-sm border border-slate-100 transition-all duration-300 cursor-pointer",
            selectedStyleId === style.id ? "ring-2 ring-indigo-500" : "hover:-translate-y-1 hover:shadow-md"
          )}
        >
          {/* 1) 图片区域 - 顶部圆角 8px */}
          <div className="relative w-full aspect-[4/3] max-h-[170px] min-h-[130px] rounded-t-[8px] overflow-hidden bg-slate-100">
            <Image 
              src={style.preview} 
              alt={style.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 2) 标签条 - 直角 */}
          {style.badge && (
            <div className={cn(
              "w-full h-5 flex items-center justify-center text-white text-[8px] font-black uppercase tracking-widest pointer-events-none whitespace-nowrap shrink-0",
              style.badge === 'BEST MATCH' && "bg-indigo-600",
              style.badge === 'RECOMMENDED' && "bg-blue-500",
              style.badge === 'TRENDING' && "bg-orange-500",
              style.badge === 'NEW' && "bg-emerald-500",
              style.badge === 'HOT' && "bg-rose-500"
            )}>
              {style.badge}
            </div>
          )}

          {/* 3) 信息区 - 底部圆角 8px */}
          <div className="p-1.5 md:p-2 shrink-0 bg-white rounded-b-[8px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-700 truncate">{style.name || '时尚发型'}</span>
              <div className={cn(
                "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                selectedStyleId === style.id
                  ? "bg-indigo-600 border-indigo-600"
                  : "border-slate-300 bg-white"
              )}>
                {selectedStyleId === style.id && (
                  <Check size={8} className="text-white stroke-[3]" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface StyleActionPanelProps {
  onUpload?: () => void;
  onCamera?: () => void;
  history?: HistoryRecord[];
  onHistoryClick?: (record: HistoryRecord) => void;
  onViewAllHistory?: () => void;
  previewUrl?: string | null;
}

/**
 * 右侧固定操作面板
 */
export const StyleActionPanel = ({ 
  onUpload, 
  onCamera, 
  history = [], 
  onHistoryClick,
  onViewAllHistory,
  previewUrl
}: StyleActionPanelProps) => {
  const t = useTranslations('home');
  return (
    <div className="
      flex flex-col gap-5 p-5 md:p-6 bg-white rounded-xl border border-indigo-100
      shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      sticky top-24 relative group/panel h-fit
      overflow-y-auto max-h-[calc(100vh-120px)]
      shrink-0 w-full lg:w-[380px] lg:min-w-[360px] lg:max-w-[420px]
    ">
      {/* 装饰性背景 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 blur-3xl rounded-full -mr-16 -mt-16 transition-colors group-hover/panel:bg-indigo-100/50 pointer-events-none" />
      
      <div className="space-y-1 relative z-10 min-w-0">
        <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight break-words whitespace-normal line-clamp-2">{t('cta.recommend')}</h4>
        <p className="text-[10px] md:text-xs text-slate-500 font-medium break-words whitespace-normal">{t('hero.subtitle')}</p>
      </div>
      
      <div className="flex flex-col gap-3 relative z-10">
        {previewUrl ? (
          <div className="upload-preview relative aspect-[4/5] max-h-[260px] overflow-hidden rounded-md border border-slate-100 bg-slate-50 flex items-center justify-center">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <button 
            onClick={onCamera}
            className="flex items-center gap-3 px-4 h-14 bg-slate-50 hover:bg-white hover:shadow-md hover:border-indigo-200 rounded-md border border-slate-100 transition-all group duration-300 min-w-0"
          >
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0 border border-slate-100">
              <Camera className="text-slate-600 group-hover:text-indigo-600 transition-colors" size={18} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-[12px] font-black text-slate-800 leading-tight break-words whitespace-normal line-clamp-1">{t('camera_title')}</p>
              <p className="text-[9px] text-slate-400 font-medium leading-tight break-words whitespace-normal line-clamp-1">{t('camera_subtitle')}</p>
            </div>
            <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
          </button>
        )}

        <button 
          onClick={onUpload}
          className="flex items-center gap-3 px-4 h-14 bg-indigo-50/30 hover:bg-white hover:shadow-md hover:border-indigo-200 rounded-md border border-indigo-100/30 transition-all group duration-300 min-w-0"
        >
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0 border border-indigo-50">
            <UploadCloud className="text-indigo-600" size={18} />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-[12px] font-black text-slate-800 leading-tight break-words whitespace-normal line-clamp-1">{t('upload_title')}</p>
            <p className="text-[9px] text-slate-400 font-medium leading-tight break-words whitespace-normal line-clamp-1">{t('upload_subtitle')}</p>
          </div>
          <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
        </button>
      </div>

      {/* 历史记录区域 */}
      {history.length > 0 && (
        <div className="pt-5 border-t border-slate-100 relative z-10 space-y-3 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <History size={16} className="text-slate-400 shrink-0" />
              <h5 className="text-sm font-black text-slate-800 leading-tight break-words whitespace-normal line-clamp-1">{t('history_title')}</h5>
            </div>
            <button 
              onClick={onViewAllHistory}
              className="shrink-0 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors whitespace-nowrap"
            >
              {t('history_view_all')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {history.slice(0, 6).map((record) => (
              <button
                key={record.id}
                onClick={() => onHistoryClick?.(record)}
                className="group/item relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 hover:border-indigo-300 transition-all flex-none"
              >
                <img 
                  src={record.resultImageUrl} 
                  alt={record.styleName} 
                  className="w-full h-full object-contain transition-transform" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <span className="text-[8px] font-black text-white bg-indigo-600/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm">{t('history_view')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-slate-100 relative z-10">
        <div className="flex items-start gap-2.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100 min-w-0">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-1.5 animate-pulse" />
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed break-words whitespace-normal">
            {t('upload_tip')}
          </p>
        </div>
      </div>
    </div>
  );
};

interface HairstyleCandidatePoolProps {
  styles: Hairstyle[];
  selectedStyleId: string | null;
  onStyleSelect: (id: string) => void;
  onUpload?: () => void;
  onCamera?: () => void;
  history?: HistoryRecord[];
  onHistoryClick?: (record: HistoryRecord) => void;
  onViewAllHistory?: () => void;
  previewUrl?: string | null;
}

/**
 * 整合布局：左侧候选池 + 右侧固定操作区
 */
export const HairstyleCandidatePool = ({ 
  styles, 
  selectedStyleId, 
  onStyleSelect, 
  onUpload, 
  onCamera,
  history = [],
  onHistoryClick,
  onViewAllHistory,
  previewUrl
}: HairstyleCandidatePoolProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* 左侧：发型候选池 (7) - 确保 xl 仍保持 4 列 */}
      <div className="flex-1 min-w-0 order-2 lg:order-1 w-full">
        <HairstyleGrid 
          styles={styles} 
          selectedStyleId={selectedStyleId} 
          onStyleSelect={onStyleSelect} 
        />
      </div>

      {/* 右侧：固定操作区 (3) - 增强宽度至 380-420px */}
      <div className="shrink-0 order-1 lg:order-2">
        <StyleActionPanel 
          onUpload={onUpload} 
          onCamera={onCamera} 
          history={history}
          onHistoryClick={onHistoryClick}
          onViewAllHistory={onViewAllHistory}
          previewUrl={previewUrl}
        />
      </div>
    </div>
  );
};

