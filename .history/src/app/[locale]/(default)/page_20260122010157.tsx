'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Sparkles,
  Check,
  ArrowRight,
  Scissors,
  Camera,
  Palette,
  Target,
  RefreshCw,
  Zap,
  ShieldCheck,
  X,
  Download,
  RotateCcw,
  History,
  Plus,
  HelpCircle,
  Info,
  User,
  UserRound,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Upload,
  Eye,
  ShieldAlert,
  Loader2,
  AlertCircle
} from 'lucide-react';

import { Button3D } from '@/components/ui/Button3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeLink } from '@/components/common/safe-link';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { safeSetHistoryToLocalStorage, safeGetHistoryFromLocalStorage } from '@/lib/safeStorage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Reuse existing components
import {
  FAQSection,
  RelatedLinks,
  SeoTextBlock,
  BottomCTA,
  SEOEducationSection
} from '@/components/blocks/hairstyle/LandingComponents';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { StyleTabs, HairstyleCandidatePool, HistoryRecord, HairstyleGrid } from '@/components/blocks/hairstyle/StyleSelector';
import { GenerationDashboard } from '@/components/blocks/hairstyle/GenerationDashboard';
import { ResultCard } from '@/components/blocks/hairstyle/ResultCard';
import { HairstyleGuideModal } from '@/components/ai-hairstyle/HairstyleGuideModal';
import { RecommendationResultPanel } from '@/components/blocks/hairstyle/RecommendationResultPanel';
import { HeroCarousel } from '@/components/blocks/hairstyle/HeroCarousel';

import { HomeHairstyleShowcase } from '@/components/blocks/hairstyle/HomeHairstyleShowcase';

const SHOW_BIG_CARD = false;

// --- 辅助工具：图片转 Base64 (DataURL) ---
const fileToDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

// --- 辅助工具：压缩图片以节省 LocalStorage 空间，由于用户要求高像素，我们将基准提高并保持高质量 ---
const compressImage = (dataUrl: string, maxWidth = 1200, quality = 0.9): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
};

// Import data
import {
  MOCK_HAIRSTYLES,
  HAIR_COLORS,
  USE_CASES,
  WHY_REASONS,
  GALLERY_ITEMS,
  HERO_PREVIEW_DATA,
  type HairColor
} from '@/lib/homeSectionsData';

/**
 * 历史记录预览 Modal
 */
const HistoryPreviewModal = ({
  record,
  onClose,
  onRetry
}: {
  record: HistoryRecord | null;
  onClose: () => void;
  onRetry: (styleId: string) => void;
}) => {
  const t = useTranslations('history');
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-800" />
        </button>

        <div className="aspect-[4/5] relative bg-slate-100">
          <img
            src={record.resultImageUrl}
            alt={record.styleName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">{t('title')}</h3>
              <p className="text-sm text-slate-500 font-medium">{t('style', { style: record.styleName })}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {new Date(record.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onRetry(record.styleId)}
              className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={18} />
              {t('retry')}
            </button>
            <button className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md flex items-center justify-center transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Hero 展示型预览面板 (支持性别切换与从右向左渐变拉开模式)
 * 增加脸型识别标签与 AI 轮廓线
 */
const HeroPreviewPanel = () => {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  const safeTc =
    typeof tc === 'function'
      ? tc
      : (v: string) => v;

  // 1) Helper for safe translation
  const safeT = (key: string, fallback?: string, values?: any) => {
    try {
      return t.has(key) ? t(key, values) : (fallback || key);
    } catch (e) {
      return fallback || key;
    }
  };

  // 分组数据
  const maleItems = HERO_PREVIEW_DATA.filter(item => item.gender === 'male');
  const femaleItems = HERO_PREVIEW_DATA.filter(item => item.gender === 'female');

  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female');
  const currentItems = selectedGender === 'male' ? maleItems : femaleItems;
  const totalSteps = currentItems.length * 2;

  // 获取图片路径的辅助函数
  const getImg = (s: number) => {
    const total = totalSteps;
    const normalizedStep = (s + total) % total;
    const pIdx = Math.floor(normalizedStep / 2);
    const isAfter = normalizedStep % 2 !== 0;
    return isAfter ? currentItems[pIdx].after : currentItems[pIdx].before;
  };

  // 1) 新增状态
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(getImg(0)); // 2) 初始化 currentSrc
  const [nextSrc, setNextSrc] = useState("");
  const [progress, setProgress] = useState(0); // 0~100
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl'); // 左右轮换方向

  // 3) 轮播触发 (setInterval)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating) return;

      // 检查 prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextIndex = (currentIndex + 1) % totalSteps;
      const targetImg = getImg(nextIndex);

      if (prefersReducedMotion) {
        // 7) 直接切换
        setCurrentSrc(targetImg);
        setCurrentIndex(nextIndex);
        return;
      }

      // 开始扫描动画
      setNextSrc(targetImg);
      setIsAnimating(true);
      setProgress(0);

      let start: number | null = null;
      const duration = 2500; // 2.5s 扫描 (调慢速度)

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const p = Math.min((elapsed / duration) * 100, 100);

        setProgress(p);

        if (p < 100) {
          requestAnimationFrame(animate);
        } else {
          // 5) 扫描完成，提交切换
          setCurrentSrc(targetImg);
          setCurrentIndex(nextIndex);
          setNextSrc("");
          setProgress(0);
          setIsAnimating(false);
          setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr'); // 切换下次方向
        }
      };

      requestAnimationFrame(animate);
    }, 7000); // 每 7 秒触发一次 (延长间隔)

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, totalSteps, selectedGender]);

  // 处理性别切换
  const handleGenderChange = (gender: 'male' | 'female') => {
    if (selectedGender !== gender) {
      setSelectedGender(gender);
      const newItems = gender === 'male' ? maleItems : femaleItems;
      const firstImg = newItems[0].before;
      setCurrentIndex(0);
      setCurrentSrc(firstImg);
      setNextSrc("");
      setProgress(0);
      setIsAnimating(false);
    }
  };

  // 获取当前人物的脸型标签
  const personIdx = Math.floor(currentIndex / 2);
  const currentPerson = currentItems[personIdx];
  const faceShapeLabel = currentPerson?.faceShape || 'Oval';

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-xl p-4 md:p-5 shadow-[0_20px_80px_rgba(15,23,42,0.15)] relative group">
      {/* 装饰性背景光晕 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      <div className="relative space-y-3">
        {/* 顶部状态标签 */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-indigo-50/80 backdrop-blur-sm rounded-[10px] flex items-center justify-center border border-indigo-200/30">
              <span className="text-[10px] md:text-[11px] font-normal text-indigo-800/90 whitespace-nowrap leading-none">
                {safeT('hero.preview_status_live')}
              </span>
            </div>
            <div className="px-3 py-1.5 bg-slate-50/80 backdrop-blur-sm rounded-[10px] flex items-center justify-center border border-slate-200/50">
              <span className="text-[10px] md:text-[11px] font-normal text-slate-600 whitespace-nowrap leading-none">
                {safeT('hero.face_shape', undefined, { shape: safeTc(`face_shapes.${faceShapeLabel.toLowerCase()}`) || faceShapeLabel })}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
            <div className="w-1 h-1 bg-indigo-300 rounded-full" />
            <div className="w-1 h-1 bg-indigo-100 rounded-full" />
          </div>
        </div>

        {/* 主展示区 - 相对定位容器 */}
        <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden ring-1 ring-white/50 shadow-inner bg-slate-100">
          {/* A) Layer 1: 底层图片 (currentSrc，完整铺满) */}
          <img
            src={currentSrc}
            className="absolute inset-0 w-full h-full object-cover"
            alt={safeTc('before')}
          />

          {/* A) Layer 2: 上层图片 (nextSrc，通过 clip-path 控制揭示) */}
          {isAnimating && nextSrc && (
            <img
              src={nextSrc}
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{
                clipPath: direction === 'rtl'
                  ? `inset(0 0 0 ${100 - progress}%)`
                  : `inset(0 ${100 - progress}% 0 0)`
              }}
              alt={safeTc('after')}
            />
          )}

          {/* 交互浮窗：性别切换 */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-40">
            <button
              onClick={() => handleGenderChange('female')}
              className={cn(
                "px-2.5 py-0.5 rounded-[6px] text-[9px] md:text-[10px] font-medium transition-all duration-300 border backdrop-blur-md shadow-lg flex items-center gap-1",
                selectedGender === 'female'
                  ? "bg-white/50 text-indigo-800/90 border-white/40"
                  : "bg-black/20 text-white border-white/10 hover:bg-black/40"
              )}
            >
              {safeTc('women')}
            </button>
            <button
              onClick={() => handleGenderChange('male')}
              className={cn(
                "px-2.5 py-0.5 rounded-[6px] text-[9px] md:text-[10px] font-medium transition-all duration-300 border backdrop-blur-md shadow-lg flex items-center gap-1",
                selectedGender === 'male'
                  ? "bg-white/50 text-indigo-800/90 border-white/40"
                  : "bg-black/20 text-white border-white/10 hover:bg-black/40"
              )}
            >
              {safeTc('men')}
            </button>
          </div>

          {/* 状态悬浮签 - 固定展示核心提示 */}
          <div className="absolute bottom-4 left-4 z-40 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/40 rounded-[6px] shadow-lg inline-flex flex-col justify-center items-start min-h-[44px] min-w-[220px]">
            <span className="text-[10px] font-bold text-indigo-600 leading-tight">
              {safeT('hero.preview_desc')}
            </span>
            <span className="text-[8px] font-medium text-slate-600 tracking-wider uppercase">
              {safeT('hero.preview_ai_rendering')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 发色选项组件，带 Tooltip 提示
 */
const ColorOption = ({
  color,
  isSelected,
  onSelect,
  isMobile
}: {
  color: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isMobile: boolean;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggleTooltip = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => {
          onSelect(color.id);
          if (isMobile) setShowTooltip(false);
        }}
        className="group relative flex flex-col items-center gap-2 transition-all active:scale-95"
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
      >
        <div className={cn(
          "w-11 h-11 rounded-full border-2 p-0.5 transition-all shadow-sm relative",
          isSelected
            ? "border-indigo-500 bg-indigo-50 shadow-indigo-100"
            : "border-white/80 hover:border-indigo-300"
        )}>
          <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />

          {/* Mobile Info Icon */}
          {isMobile && (
            <div
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white shadow-md rounded-full border border-slate-100 flex items-center justify-center text-slate-400 z-20 active:scale-110 transition-transform"
              onClick={handleToggleTooltip}
            >
              <Info size={11} strokeWidth={2.5} className={cn("transition-colors", showTooltip ? "text-indigo-600" : "text-slate-400")} />
            </div>
          )}
        </div>
        <span className={cn(
          "text-[9px] font-bold transition-colors truncate w-full text-center leading-none",
          isSelected ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-700"
        )}>
          {color.name}
        </span>
      </button>

      {/* Tooltip Content */}
      <div className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900/95 backdrop-blur-md text-white text-[10px] transition-all duration-300 z-[60] shadow-2xl min-w-[140px] max-w-[220px] border border-white/10 flex flex-col gap-1 pointer-events-none",
        showTooltip ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 translate-y-2 invisible scale-95",
        "!rounded-[14px]"
      )}>
        <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-0.5">
          <div className="w-2 h-2 rounded-full ring-1 ring-white/20" style={{ backgroundColor: color.hex }} />
          <span className="font-black text-[10px] tracking-tight">{color.name}</span>
        </div>
        <div className="space-y-1 leading-tight">
          <div className="flex items-baseline gap-1">
            <span className="text-white/40 font-medium shrink-0">适合：</span>
            <span className="text-slate-200">{color.skinTone || '所有肤色'}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-white/40 font-medium shrink-0">风格：</span>
            <span className="text-indigo-300 font-semibold">{color.style || '经典百搭'}</span>
          </div>
        </div>
        {/* 小箭头 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-slate-900/95" />
      </div>
    </div>
  );
};

/**
 * Hairnova AI 主首页 - 软件工具型布局
 */
export default function HomePage() {
  const t = useTranslations('home');
  const tt = useTranslations('hairstyle.tool');
  const tc = useTranslations('common');

  const isMobile = useIsMobile();

  const safeTc =
    typeof tc === 'function'
      ? tc
      : (v: string) => v;

  // Helper for safe translation
  const safeT = (key: string, fallback?: string, values?: any) => {
    try {
      return t.has(key) ? t(key, values) : (fallback || key);
    } catch (e) {
      return fallback || key;
    }
  };

  // Core Tool States
  const [toolStatus, setToolStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('natural-black');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSmartTag, setActiveSmartTag] = useState<'recommended' | 'try' | 'not_recommended'>('recommended');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female');
  const [uploadSource, setUploadSource] = useState<'camera' | 'file' | 'example' | null>(null);
  const [imageQuality, setImageQuality] = useState<{ isLow: boolean; width: number; height: number } | null>(null);
  const [highResImage, setHighResImage] = useState<string | null>(null);

  // 发色选择展开状态
  const [showStyleColors, setShowStyleColors] = useState(false);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  // Drag and drop state for secondary upload zones
  const [isDraggingZone, setIsDraggingZone] = useState(false);

  // 检测失败弹窗状态
  const [showDetectionFailed, setShowDetectionFailed] = useState(false);

  // Handle filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedGender]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // History States
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryRecord | null>(null);

  // Color Selection States
  const [selectedColorId, setSelectedColorId] = useState<string>('natural-black');
  const [hoveredColor, setHoveredColor] = useState<{ id: string; rect: DOMRect; data: HairColor } | null>(null);

  const handleColorEnter = (e: React.MouseEvent, color: HairColor) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredColor({ id: color.id, rect, data: color });
  };

  const handleColorLeave = () => {
    setHoveredColor(null);
  };


  // Memoized color hex for selected color
  const selectedColorHex = [
    ...HAIR_COLORS.basic,
    ...HAIR_COLORS.style,
    ...HAIR_COLORS.advanced
  ].find(c => c.id === selectedColorId)?.hex;

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    safeSetHistoryToLocalStorage(newHistory);
  };

  // Persistence
  useEffect(() => {
    const loaded = safeGetHistoryFromLocalStorage();
    setHistory(loaded);
  }, []);

  useEffect(() => {
    // 只有在 history 状态被初始化后才同步到本地存储
    // 避免初次加载时 history 为空（还未从 localStorage 读取）导致覆盖本地数据
    // 使用防抖避免频繁写入
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('hairnova_history');
      if (saved || history.length > 0) {
        safeSetHistoryToLocalStorage(history);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [history]);

  // Analysis States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedFaceShape, setAnalyzedFaceShape] = useState<string | null>(null);
  const [detectedColor, setDetectedColor] = useState<string>('#F3F4F6');
  const [detectedColorName, setDetectedColorName] = useState<string>('');
  const [isDetectingColor, setIsDetectingColor] = useState(false);
  const [isTransitioningColor, setIsTransitioningColor] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showPhotoRequirements, setShowPhotoRequirements] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const libraryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const el = document.querySelector('[data-cta="generate"]') as HTMLElement;
      if (el) {
        console.log('=== CTA Button Debug Info ===');
        console.log('1. Element:', el);
        console.log('2. ClassName:', el.className);
        console.log('3. ClassList:', Array.from(el.classList));
        const style = window.getComputedStyle(el);
        console.log('4. Computed Border Radius:', style.borderRadius);
        console.log('5. Computed Height:', style.height);
        console.log('6. Computed Width:', style.width);
        console.log('7. All border-radius related styles:');
        console.log('   - borderTopLeftRadius:', style.borderTopLeftRadius);
        console.log('   - borderTopRightRadius:', style.borderTopRightRadius);
        console.log('   - borderBottomLeftRadius:', style.borderBottomLeftRadius);
        console.log('   - borderBottomRightRadius:', style.borderBottomRightRadius);
        console.log('============================');
      } else {
        console.warn('CTA Button not found: [data-cta="generate"]');
      }
    }
  }, []);

  // Resolution Check Utility
  const checkImageQuality = (dataUrl: string): Promise<{ isLow: boolean; width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isLow = img.width < 800 || img.height < 800;
        resolve({ isLow, width: img.width, height: img.height });
      };
      img.src = dataUrl;
    });
  };

  // Tool Logic - Handle file upload (supports both File objects and URLs)
  // 人像检测（增强版）
  const detectPortrait = (dataUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          // 创建 canvas 进行基础分析
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(false); // 无法检测时不通过
            return;
          }

          // 缩小图片以加快检测（提高分辨率到300px）
          const scale = Math.min(300 / img.width, 300 / img.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 检查图片宽高比（人像通常是竖向或接近方形）
          const aspectRatio = img.width / img.height;

          // 如果是超宽的横向照片（风景照常见特征），直接判定为非人像
          if (aspectRatio > 1.8 || aspectRatio < 0.4) {
            console.log('[Portrait Detection] Failed: Invalid aspect ratio', aspectRatio);
            resolve(false);
            return;
          }

          // 获取多个区域的像素数据进行综合判断（头部、脸部、肩膀）
          const regions = [
            { x: 0.4, y: 0.3, w: 0.2, h: 0.3, weight: 3 },  // 中心（脸部）
            { x: 0.35, y: 0.2, w: 0.3, h: 0.2, weight: 2 }, // 上中（头部）
            { x: 0.3, y: 0.5, w: 0.4, h: 0.2, weight: 1 },  // 中下（肩膀）
          ];

          let totalSkinScore = 0;
          let totalWeight = 0;

          for (const region of regions) {
            const x = canvas.width * region.x;
            const y = canvas.height * region.y;
            const w = canvas.width * region.w;
            const h = canvas.height * region.h;

            const imageData = ctx.getImageData(x, y, w, h);
            const pixels = imageData.data;
            let skinToneCount = 0;
            let totalPixels = pixels.length / 4;

            // 改进的肤色检测算法（更严格）
            for (let i = 0; i < pixels.length; i += 4) {
              const r = pixels[i];
              const g = pixels[i + 1];
              const b = pixels[i + 2];

              // 更严格的肤色检测条件
              const isSkinTone = (
                r > 60 && g > 40 && b > 20 &&
                r < 255 && g < 230 && b < 200 &&
                r > g && r > b &&
                (r - g) > 10 && (r - g) < 80 &&
                (r - b) > 15 && (r - b) < 120 &&
                Math.abs(g - b) < 60
              );

              if (isSkinTone) {
                skinToneCount++;
              }
            }

            const skinRatio = skinToneCount / totalPixels;
            totalSkinScore += skinRatio * region.weight;
            totalWeight += region.weight;
          }

          const averageSkinScore = totalSkinScore / totalWeight;

          // 更严格的判断标准：加权平均肤色占比需要 > 25%
          const isPortrait = averageSkinScore > 0.25;

          console.log('[Portrait Detection]', {
            aspectRatio,
            averageSkinScore: (averageSkinScore * 100).toFixed(2) + '%',
            isPortrait
          });

          resolve(isPortrait);
        } catch (error) {
          console.warn('[Portrait Detection] Error:', error);
          resolve(false); // 检测失败时不通过（更安全）
        }
      };

      img.onerror = () => resolve(false);
      img.src = dataUrl;
    });
  };

  const handleUpload = async (fileOrUrl: File | string, source: 'camera' | 'file' | 'example' = 'file') => {
    try {
      setUploadSource(source);
      let rawDataUrl: string;

      if (typeof fileOrUrl === 'string') {
        const response = await fetch(fileOrUrl);
        const blob = await response.blob();
        rawDataUrl = await fileToDataUrl(blob);
      } else {
        rawDataUrl = await fileToDataUrl(fileOrUrl);
      }

      // 人像检测（只对用户上传的图片检测，示例图片跳过）
      if (source !== 'example') {
        const isPortrait = await detectPortrait(rawDataUrl);

        if (!isPortrait) {
          setShowDetectionFailed(true);
          return; // 阻止继续处理
        }
      }

      // Check quality
      const quality = await checkImageQuality(rawDataUrl);
      setImageQuality(quality);

      // Keep high res for generation, larger res for preview
      setHighResImage(rawDataUrl);
      const previewUrl = await compressImage(rawDataUrl, 1280, 0.9);
      setOriginalImage(previewUrl);

      setToolStatus('ready');
      setSelectedStyle(null);
      startAnalysis(previewUrl);
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('图片加载失败，请重试');
    }
  };

  const handleClear = () => {
    setOriginalImage(null);
    setToolStatus('idle');
    setAnalyzedFaceShape(null);
  };

  const startAnalysis = (imageDataUrl?: string) => {
    const targetImage = imageDataUrl || originalImage;
    if (!targetImage) return;

    setIsAnalyzing(true);
    setAnalyzedFaceShape(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setToolStatus('success');
      const shapes = ['Oval', 'Round', 'Square', 'Heart'];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      setAnalyzedFaceShape(randomShape);

      // Auto-select the first hairstyle as the "Best Match"
      if (MOCK_HAIRSTYLES.length > 0) {
        setSelectedStyle(MOCK_HAIRSTYLES[0].id);
      }
    }, 2000);
  };



  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingZone(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingZone(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingZone(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleUpload(file, 'file');
    }
  };

  const handleExampleClick = async (imageUrl: string) => {
    await handleUpload(imageUrl, 'example');
  };

  const handleStyleSelect = (id: string | null) => {
    setSelectedStyle(id);
  };

  const handleApplyStyle = () => {
    if (!selectedStyle || !highResImage) return;

    // Check if we should warn about low quality before generating
    if (imageQuality?.isLow) {
      if (!confirm(`检测到图片像素较低（${imageQuality.width}x${imageQuality.height}px）。AI 将尝试进行自动超清增强，但为了获得极致效果，建议上传更清晰的原图。是否继续？`)) {
        return;
      }
    }

    setToolStatus('loading');

    // Simulate generation success
    setIsDetectingColor(true);
    setTimeout(() => {
      // Step 1: Detect clothing color
      const themeColors = [
        { main: '#F1F5F9', accent: '#E2E8F0', name: '冷色调写实工作室' },
        { main: '#E5E7EB', accent: '#D1D5DB', name: '极简水泥灰背景' },
        { main: '#F3F4F6', accent: '#E5E7EB', name: '现代主义柔白' },
        { main: '#F5F5F4', accent: '#D6D3D1', name: '经典砂砾影棚' },
        { main: '#F9FAFB', accent: '#F3F4F6', name: '高光无影墙' },
        { main: '#E7E5E4', accent: '#D6D3D1', name: '暖调纪实影棚' }
      ];
      const selected = themeColors[Math.floor(Math.random() * themeColors.length)];
      setDetectedColor(selected.main);
      setDetectedColorName(selected.accent);

      setTimeout(() => {
        setIsDetectingColor(false);
        // 新增：AI 超清增强阶段
        setIsEnhancing(true);

        setTimeout(() => {
          setIsEnhancing(false);
          setToolStatus('success');

          // Add to history (ONLY at this success moment)
          const style = MOCK_HAIRSTYLES.find(s => s.id === selectedStyle);
          if (style) {
            const newRecord: HistoryRecord = {
              id: `${selectedStyle}-${selectedColorId}-${Date.now()}`,
              createdAt: Date.now(),
              resultImageUrl: highResImage || originalImage || style.preview,
              styleId: style.id,
              styleName: style.name,
              colorId: selectedColorId,
              originalImageUrl: highResImage || undefined,
              sourceThumb: originalImage || undefined,
              resultThumb: highResImage || originalImage || style.preview // 使用高像素图作为结果
            };

            setHistory(prev => {
              const filtered = prev.filter(r =>
                !(r.originalImageUrl === newRecord.originalImageUrl &&
                  r.styleId === newRecord.styleId &&
                  r.colorId === newRecord.colorId)
              );
              const updated = [newRecord, ...filtered].slice(0, 12);
              safeSetHistoryToLocalStorage(updated);
              return updated;
            });
          }
        }, 1200); // 增强过程稍微久一点，传达“正在处理像素”的感觉
      }, 1000);
    }, 800);
  };

  const handleRandomStyle = () => {
    const random = MOCK_HAIRSTYLES[Math.floor(Math.random() * MOCK_HAIRSTYLES.length)];
    handleStyleSelect(random.id);
  };

  const handleReset = () => {
    setToolStatus('idle');
    setOriginalImage(null);
    setSelectedStyle(null);
    setAnalyzedFaceShape(null);
  };

  const isDisabled = !originalImage || !selectedStyle;

  // 根据当前状态计算激活的步骤
  const activeStep = toolStatus === 'idle' ? 1
    : (toolStatus === 'loading' || isAnalyzing || isDetectingColor) ? 2
      : 3;

  // 计算当前是否已经为这张图生成过（不包括原始记录）
  const hasGeneratedForCurrent = originalImage ? history.some(h => h.originalImageUrl === originalImage && h.styleId !== 'original') : false;

  // 计算是否有未生成的变更（发型或颜色改变）
  const hasChanges = (originalImage && selectedStyle) ? (() => {
    const currentPhotoGenerated = history.filter(h => h.originalImageUrl === originalImage && h.styleId !== 'original');
    if (currentPhotoGenerated.length === 0) return true;
    const latest = currentPhotoGenerated[0];
    return latest.styleId !== selectedStyle || latest.colorId !== selectedColorId;
  })() : false;

  // 计算当前应该展示的结果图
  const activePhotoRecords = history.filter(h => h.originalImageUrl === originalImage && h.styleId !== 'original');
  const stylePreview = selectedStyle ? MOCK_HAIRSTYLES.find(s => s.id === selectedStyle)?.preview : null;

  // Logic Fix: If originalImage exists, NEVER show stock preview images.
  const displayImage = (toolStatus === 'loading' || isAnalyzing || isDetectingColor)
    ? originalImage
    : (activePhotoRecords.length > 0)
      ? activePhotoRecords[0].resultImageUrl
      : (originalImage || stylePreview || MOCK_HAIRSTYLES[0].preview);

  return (<div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
    <main className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* SECTION 1: Hero 首屏 */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-left duration-700 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                Hairstyles for Men
                <span className="block mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-600">
                  男士发型库 + AI 脸型匹配推荐
                </span>
              </h1>
              <p className="text-sm md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-tight">
                Upload your photo — AI recommends men's haircuts that fit your face shape.
                <span className="block mt-1 text-slate-500 text-sm">
                  上传照片，AI 根据脸型推荐最适合你的男士发型
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-center shrink-0">
                  <Check size={12} className="text-emerald-600" />
                </div>
                <span>AI 识别脸型与比例，推荐更适合的男士发型</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-center shrink-0">
                  <Check size={12} className="text-emerald-600" />
                </div>
                <span>不改变五官，只更换发型与发色（真实可信）</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-center shrink-0">
                  <Check size={12} className="text-emerald-600" />
                </div>
                <span>覆盖 500+ 男士发型：寸头/渐变/背头/侧分/卷发等</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center sm:items-start gap-3">
              <Button3D
                variant="gradient"
                className="w-full sm:w-auto px-8 h-14 font-bold text-base"
                onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                立即上传照片，开始男士发型推荐
                <ArrowRight size={20} className="ml-2" />
              </Button3D>
              <button
                onClick={() => {
                  const hairstylesSection = document.getElementById('men-hairstyles-library');
                  hairstylesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors underline-offset-4 hover:underline"
              >
                或浏览男士发型库
              </button>
              <p className="text-xs text-slate-400 text-center sm:text-left">
                无需注册 · 不改变五官 · 几秒即可生成效果
              </p>
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right duration-700 w-full max-w-[480px] mx-auto lg:mx-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 blur-3xl opacity-50" />
            <HeroCarousel />
          </div>
        </div>
      </section>



      {/* SECTION 2: 核心交互区 - AI 工作台（上移至此处） */}
      <section ref={libraryRef} id="try-now" className="py-20 relative overflow-visible z-10 border-t border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 -z-10" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">
              在线体验 AI 男士发型推荐
            </h2>
            <div className="space-y-2">
              <p className="text-sm md:text-base text-slate-600 font-bold">
                上传照片后即可实时预览适合你的男士发型与发色
              </p>
              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                Hairnova AI 仅模拟发型和发色，不会修改你的五官或面部结构
              </p>
            </div>
          </div>

          {/* AI Studio 主工作台 */}
          <div className="max-w-7xl mx-auto">
            <div className="rounded-[24px] bg-white shadow-[0_2px_40px_rgba(15,23,42,0.06)] border border-slate-200/40 relative overflow-visible">
              <div className="px-10 lg:px-12 py-10 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 max-w-6xl mx-auto w-full">

                  {/* 左栏：上传区 */}
                  <div className="flex flex-col">
                    <div className="rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/30 h-[320px] flex items-center justify-center p-5 lg:p-6">
                      {originalImage ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="h-[275px] w-full flex items-center justify-center relative">
                            <img src={originalImage} alt="Preview" className="h-full w-auto max-w-full object-contain object-top drop-shadow-sm" />
                          </div>
                          <button
                            onClick={handleClear}
                            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-slate-200 hover:border-red-300 flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all z-10"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <UploadCard onUpload={handleUpload} onClear={handleClear} preview={null} onPhotoRequirementsClick={() => setShowPhotoRequirements(true)} />
                      )}
                    </div>

                    {originalImage && (
                      <div className="mt-4">
                        <button
                          onClick={() => document.getElementById('file-upload-input')?.click()}
                          className={cn(
                            "w-full h-11 rounded-[8px] border border-slate-200 bg-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.96] group",
                            "hover:bg-indigo-50/80 hover:border-indigo-400/60 hover:shadow-sm hover:shadow-indigo-100/50",
                            "active:bg-indigo-100/80 active:border-indigo-500/80"
                          )}
                        >
                          <Upload size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                          <input id="file-upload-input" type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'file')} accept="image/*" />
                          <span className="text-[13px] font-bold text-slate-600 group-hover:text-indigo-600">更换照片</span>
                        </button>
                      </div>
                    )}

                    {/* 最近试戴记录 */}
                    {history.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">最近试戴</span>
                          <span className="text-[9px] text-slate-300">已保存 {history.length} 条</span>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {history.slice(0, 12).map((record, idx) => (
                            <div
                              key={record.id || idx}
                              onClick={() => record.resultImageUrl && setSelectedHistory(record)}
                              className={cn(
                                "aspect-square rounded-[8px] overflow-hidden border cursor-pointer hover:border-indigo-300 transition-all bg-white shadow-sm group relative",
                                selectedHistory?.id === record.id ? "border-indigo-500 ring-2 ring-indigo-200/20" : "border-slate-200/60"
                              )}
                            >
                              <img src={record.resultImageUrl || record.sourceThumb} className="w-full h-full object-cover object-top" alt="History" />
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                          {history.length < 12 && Array.from({ length: 12 - history.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square rounded-[8px] border border-dashed border-slate-100 bg-slate-50/30" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 右栏：结果预览 + 控制面板 */}
                  <div className="flex flex-col">
                    <div className="rounded-[24px] bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 h-[320px] flex items-center justify-center px-5 lg:px-6 py-2 relative overflow-hidden">
                      {(toolStatus === 'success' || (originalImage && displayImage)) ? (
                        <div className="relative w-full h-[285px] flex items-center justify-center">
                          <img src={displayImage || undefined} alt="Result" className={cn("h-full w-auto max-w-full object-contain object-top drop-shadow-md", (toolStatus === 'loading' || isAnalyzing) ? 'blur-sm opacity-60' : 'blur-0 opacity-100')} />
                          {selectedColorId && toolStatus !== 'loading' && (
                            <div className="absolute inset-0 rounded-[14px] mix-blend-soft-light pointer-events-none transition-all duration-500 mx-auto" style={{ backgroundColor: selectedColorHex, opacity: selectedColorId === 'natural-black' ? 0.45 : 0.25, width: 'fit-content' }} />
                          )}
                          {toolStatus === 'success' && (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 backdrop-blur-md rounded-[6px] border border-slate-200/60 flex items-center gap-1.5 animate-in fade-in zoom-in duration-500 shadow-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[9px] font-black text-slate-800 tracking-widest uppercase">AI HD Enhanced</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center space-y-3">
                          <div className="w-14 h-14 rounded-[12px] bg-white flex items-center justify-center text-slate-300 shadow-sm border border-slate-200/60">
                            <Plus size={24} strokeWidth={1.5} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-400">AI 即将生成您的造型</p>
                            <p className="text-[10px] text-slate-300">上传照片后在此查看效果</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex flex-col space-y-6">
                      <div className="bg-slate-50/40 p-5 rounded-[20px] border border-slate-100/60 space-y-6">
                        <div className="flex flex-col gap-3">
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">基础发色</span>
                          <div className="flex flex-wrap gap-2">
                            {HAIR_COLORS.basic.map(color => (
                              <button key={color.id} onClick={() => setSelectedColorId(color.id)} onMouseEnter={(e) => handleColorEnter(e, color)} onMouseLeave={handleColorLeave} className={cn("w-8 h-8 rounded-[6px] border-2 transition-all", selectedColorId === color.id ? "border-indigo-600 ring-2 ring-indigo-400/30 scale-105" : "border-slate-200/80 hover:border-indigo-300")} style={{ backgroundColor: color.hex }} />
                            ))}
                            <button
                              onClick={() => setShowAdvancedColors(!showAdvancedColors)}
                              className={cn(
                                "w-8 h-8 rounded-[6px] border-2 flex items-center justify-center transition-all",
                                showAdvancedColors ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm" : "border-slate-200/80 bg-white text-slate-400 hover:border-indigo-300 hover:text-indigo-500"
                              )}
                              title={showAdvancedColors ? "收起更多颜色" : "展示风格与高级发色"}
                            >
                              {showAdvancedColors ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
                            </button>
                          </div>
                        </div>

                        {showAdvancedColors && (
                          <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                            <div className="flex flex-col gap-3">
                              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">风格发色</span>
                              <div className="flex flex-wrap gap-2">
                                {HAIR_COLORS.style.map(color => (
                                  <button key={color.id} onClick={() => setSelectedColorId(color.id)} onMouseEnter={(e) => handleColorEnter(e, color)} onMouseLeave={handleColorLeave} className={cn("w-8 h-8 rounded-[6px] border-2 transition-all", selectedColorId === color.id ? "border-indigo-600 ring-2 ring-indigo-400/30 scale-105" : "border-slate-200/80 hover:border-indigo-300")} style={{ backgroundColor: color.hex }} />
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">高级发色</span>
                              <div className="flex flex-wrap gap-2">
                                {HAIR_COLORS.advanced.map(color => (
                                  <button key={color.id} onClick={() => setSelectedColorId(color.id)} onMouseEnter={(e) => handleColorEnter(e, color)} onMouseLeave={handleColorLeave} className={cn("w-8 h-8 rounded-[6px] border-2 transition-all", selectedColorId === color.id ? "border-indigo-600 ring-2 ring-indigo-400/30 scale-105" : "border-slate-200/80 hover:border-indigo-300")} style={{ backgroundColor: color.hex }} />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <Button3D
                          onClick={handleApplyStyle}
                          disabled={!originalImage || toolStatus === 'loading' || isAnalyzing}
                          variant="gradient"
                          className="w-full py-4 h-[56px] text-white"
                        >
                          <div className="flex items-center justify-center gap-3">
                            {(toolStatus === 'loading' || isAnalyzing) ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                            <span className="text-base font-bold tracking-wider">
                              {toolStatus === 'loading' ? (isEnhancing ? "AI 超清增强中..." : (isDetectingColor ? "分析色彩环境中..." : "由 AI 设计造型中...")) : "立即预览发型效果"}
                            </span>
                          </div>
                        </Button3D>

                        <p className="text-center mt-3 text-[10px] text-slate-400 flex flex-col items-center gap-1">
                          {toolStatus === 'loading' && (
                            <span className="flex items-center gap-1 animate-pulse">
                              <Info size={12} /> 生成约需 3-5 秒，请稍候...
                            </span>
                          )}
                          <span className="opacity-80">生成效果可用于发型参考，与发型师沟通更高效</span>
                        </p>

                        {/* 辅助操作区 */}
                        {(toolStatus === 'success' || (toolStatus === 'loading' && displayImage)) && (
                          <div className="flex flex-col gap-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 flex flex-col gap-2">
                                <button
                                  disabled={toolStatus === 'loading' || isDownloading}
                                  onClick={() => {
                                    if (displayImage) {
                                      setIsDownloading(true);
                                      setTimeout(() => {
                                        const link = document.createElement('a');
                                        link.href = displayImage;
                                        link.download = `hairnova-style-${Date.now()}.png`;
                                        link.click();
                                        setIsDownloading(false);
                                      }, 1000);
                                    }
                                  }}
                                  className={cn(
                                    "w-full h-9 flex items-center justify-center gap-2 rounded-[6px] border transition-all duration-200 text-[11px] font-bold group",
                                    isDownloading || toolStatus === 'loading' ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed" : "bg-white border-slate-200/60 text-slate-500 hover:bg-indigo-50/80 hover:border-indigo-400/60 hover:text-indigo-600 active:bg-indigo-100/80 active:border-indigo-500/80 active:scale-[0.96]"
                                  )}
                                >
                                  {isDownloading ? <Loader2 size={13} className="animate-spin text-indigo-500" /> : <Download size={13} className={cn("transition-colors", (isDownloading || toolStatus === 'loading') ? "text-slate-200" : "text-slate-400 group-hover:text-indigo-600")} />}
                                  <span>{isDownloading ? '正在准备下载...' : '下载图片'}</span>
                                </button>
                                <span className="text-[9px] text-slate-400 flex items-center justify-center gap-1 opacity-80 pl-1">
                                  <Check size={9} className="text-emerald-500" /> 支持高清无损导出
                                </span>
                              </div>

                              <button
                                disabled={toolStatus === 'loading' || isDownloading}
                                onClick={handleApplyStyle}
                                className={cn(
                                  "flex-1 h-9 self-start flex items-center justify-center gap-2 rounded-[6px] transition-all duration-200 text-[11px] font-bold group",
                                  toolStatus === 'loading' ? "bg-blue-50/50 text-blue-400 cursor-not-allowed" : isDownloading ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-slate-100/60 text-slate-500 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 active:scale-[0.97]"
                                )}
                              >
                                {toolStatus === 'loading' ? <RotateCcw size={13} className="animate-spin text-blue-400" /> : <RotateCcw size={13} className={cn("transition-colors", isDownloading ? "text-slate-200" : "text-slate-400 group-hover:text-blue-500")} />}
                                <span>{toolStatus === 'loading' ? '正在生成中...' : '重新生成'}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 首页展示发型推荐 (完全重写) */}
        </div>
      </section>

      {/* 首页展示发型推荐 (完全重写) */}
      <HomeHairstyleShowcase ref={libraryRef} />

      {/* SECTION 3: How It Works 使用流程（位置下移） */}
      <section className="py-32 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter text-center mb-4">
            AI 男士发型推荐只需 3 步
          </h2>
          <p className="text-sm text-slate-500 text-center mb-20">
            无需任何设计经验，上传照片即可开始体验
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <span className="text-2xl font-black">01</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">上传你的照片</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                上传一张清晰正脸照片，支持 JPG / PNG 格式。
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <span className="text-2xl font-black">02</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">AI 识别脸型与比例</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                系统自动分析额头、下颌线、发际线等男士关键特征，作为发型推荐依据。
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <span className="text-2xl font-black">03</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">推荐更适合的男士发型 + 支持试发色</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                基于分析结果推荐发型和发色，并生成真实可参考的效果预览。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: AI 核心功能矩阵（位置下移） */}
      <section className="py-32 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter text-center mb-20">
            Hairnova AI 可以为你做什么（AI 换发型与发型分析）
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-100 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">AI 脸型分析（Face Shape Analyzer）</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                自动识别你的脸型（圆脸、方脸、长脸等），并作为 AI 发型推荐的核心依据，帮助你避免不适合自己的发型。
              </p>
              <button
                onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                体验脸型分析 →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Scissors size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">AI 换发型（AI Hairstyle Changer）</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                在不改变五官的前提下，在线试戴不同发型，直观看到剪发前后的效果差异。
              </p>
              <button
                onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                在上方直接体验 →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                <Palette size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">AI 发色试戴（Hair Color Try-On）</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                尝试不同发色效果，提前预览染发后的真实外观，降低实际染发风险。
              </p>
              <button
                onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                试试发色 →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <User size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">男士 / 女士发型推荐</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                根据性别与脸型特征，推荐更符合审美与风格的发型方案。
              </p>
              <button
                onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                查看发型库 →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: 真实效果展示 */}
      <section className="py-32 border-t border-slate-200/60 bg-white">
        <div className="space-y-12 max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter mb-20">真实用户生成的 AI 发型效果展示</h2>
            <p className="text-sm text-slate-500 mt-3">以下效果均由真实用户上传照片并通过 AI 生成</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_ITEMS.slice(0, 3).map(item => (
              <div key={item.id} className="group relative overflow-hidden flex flex-col rounded-xl bg-slate-50 border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-[4/5] flex relative overflow-hidden">
                  <div className="w-1/2 relative h-full">
                    <img src={item.before} className="w-full h-full object-cover object-top" alt="换发型前" />
                  </div>
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-transparent z-10" />
                  <div className="w-1/2 relative h-full">
                    <img src={item.after} className="w-full h-full object-cover object-top" alt="换发型后" />
                  </div>
                </div>
                <div className="p-6 bg-white flex items-center justify-between border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                      {item.faceShape}
                    </span>
                    <p className="text-sm font-bold text-slate-900">{item.tag || '推荐发型'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: 使用场景 */}
      <section className="py-32 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">
              这些场景下，AI 男士发型推荐特别有用
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <User size={28} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3">面试 / 商务形象</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                在面试或重要商务场合前，选择更专业、得体的男士发型提升形象。
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Camera size={28} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3">约会 / 社交头像</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                在约会或更换社交头像时，快速找到更有魅力、更适合自己的发型风格。
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                <Scissors size={28} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3">理发前确认（避免翻车）</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                在理发前提前预览效果，避免剪完后悔，降低发型决策风险。
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Target size={28} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3">发际线 / 头型修饰</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                针对发际线高、头型偏平等男士常见问题，找到视觉修饰效果最好的发型。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: 为什么选择 Hairnova AI */}
      <section className="py-24 border-t border-slate-200/60 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 tracking-tighter mb-16">
            为什么选择 Hairnova AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">基于脸型推荐</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                基于脸型推荐，而非随机生成
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">效果真实可信</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                不改变五官，效果真实可信
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">减少试错成本</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                减少试错成本，避免剪完后悔
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ 常见问题 */}
      <section className="py-24 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter text-center mb-12">
            常见问题
          </h2>

          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">Hairstyles for men 怎么选最适合我的？</span>
                <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                上传你的照片后，AI 会自动分析你的脸型（如圆脸、方脸、长脸等）和面部比例，然后根据这些特征推荐最适合你的男士发型，包括寸头、渐变、背头、侧分、卷发等多种风格。
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">AI 会改变我的脸吗？</span>
                <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                不会。Hairnova AI 仅对发型和发色进行模拟，绝不会改变你的五官或面部结构。生成的效果真实可信，让你能准确预判理发后的样子。
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">适合发际线高/圆脸/方脸的男士发型有哪些？</span>
                <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                • 发际线高：建议尝试刘海覆盖或侧分发型来视觉修饰<br />
                • 圆脸：适合有层次感的侧分、渐变发型来拉长脸型<br />
                • 方脸：推荐柔和的卷发或蓬松的背头来柔化轮廓<br />
                上传照片后，AI 会自动为你筛选最合适的选项。
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">支持哪些男士发型？是否支持寸头/渐变/背头？</span>
                <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                支持 500+ 男士发型，包括但不限于：Buzz Cut（寸头）、Fade（渐变）、Taper Fade、Crew Cut、Undercut、Side Part（侧分）、Quiff、Pompadour（背头）、Curly Hair、Long Hair 等多种风格，持续更新中。
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">上传照片安全吗？</span>
                <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                绝对安全。你的照片仅用于生成发型效果，不会被公开、分享或用于其他用途。我们重视用户隐私保护。
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">AI 换发型适合男生还是女生？</span>
                <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                Hairnova AI 同时支持男士和女士发型推荐，会根据性别和脸型提供不同的发型方案。
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* SECTION 9: SEO 内链区 - 男士发型关键词集群 */}
      <section className="py-20 border-t border-slate-200/60 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
              热门男士发型搜索
            </h3>
            <p className="text-sm text-slate-500 text-center">
              Popular men hairstyles - 点击快速浏览
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {[
              { name: 'Buzz Cut', slug: 'buzz-cut', hasPage: true },
              { name: 'Fade', slug: 'fade', hasPage: true },
              { name: 'Taper Fade', slug: 'taper-fade', hasPage: false },
              { name: 'Crew Cut', slug: 'crew-cut', hasPage: false },
              { name: 'Undercut', slug: 'undercut', hasPage: true },
              { name: 'Side Part', slug: 'side-part', hasPage: true },
              { name: 'Quiff', slug: 'quiff', hasPage: false },
              { name: 'Pompadour', slug: 'pompadour', hasPage: true },
              { name: 'Curly Hair Men', slug: 'curly-hair-men', hasPage: false },
              { name: 'Long Hair Men', slug: 'long-hair-men', hasPage: false },
              { name: 'Mullet', slug: 'mullet', hasPage: false },
              { name: 'Textured Crop', slug: 'textured-crop', hasPage: false },
              { name: 'Ivy League', slug: 'ivy-league', hasPage: false },
              { name: 'Caesar Cut', slug: 'caesar-cut', hasPage: false },
              { name: 'Slick Back', slug: 'slick-back', hasPage: false }
            ].map((item) =>
              item.hasPage ? (
                <SafeLink key={item.slug} href={`/hairstyles-for-men/${item.slug}`}>
                  <button className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-[8px] hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
                    {item.name}
                  </button>
                </SafeLink>
              ) : (
                <button
                  key={item.slug}
                  onClick={() => {
                    const section = document.getElementById('men-hairstyles-library');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-[8px] hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                >
                  {item.name}
                </button>
              )
            )}
          </div>

          <div className="border-t border-slate-200 pt-12">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 text-center">
              按脸型查找男士发型
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                'Men hairstyles for oval face',
                'Men hairstyles for round face',
                'Men hairstyles for square face',
                'Men hairstyles for long face',
                'Men hairstyles for heart face',
                'Men hairstyles for diamond face'
              ].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    const section = document.getElementById('try-now');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 text-sm font-bold rounded-[10px] hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9B: SEO Hub - 3个新增区块 */}
      <section className="py-20 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4">

          {/* 区块 1: Popular Men's Hairstyles - 指向分类页 */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
              Popular Men's Hairstyles
            </h3>
            <p className="text-sm text-slate-500 text-center mb-8">
              Browse by hairstyle category - Each page includes AI try-on tool
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'Medium Length', filter: 'Medium', category: true },
                { name: 'Curly Hairstyles', filter: 'Curly', category: true },
                { name: 'Black Men', filter: 'all', category: true },
                { name: 'Low Maintenance', filter: 'Short', category: true },
                { name: 'Buzz Cut', slug: 'buzz-cut', category: false },
                { name: 'Fade', slug: 'fade', category: false },
                { name: 'Taper Fade', slug: 'taper-fade', category: false },
                { name: 'Long Hair Men', slug: 'long-hair-men', category: false }
              ].map((item) =>
                item.category ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      const section = document.getElementById('men-hairstyles-library');
                      section?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-[8px] hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    {item.name}
                  </button>
                ) : (
                  <SafeLink
                    key={item.slug}
                    href={`/hairstyles-for-men/${item.slug}`}
                  >
                    <button className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-[8px] hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
                      {item.name}
                    </button>
                  </SafeLink>
                )
              )}
            </div>
          </div>

          {/* 区块 2: Hairstyles by Face Shape */}
          <div className="mb-16 border-t border-slate-200 pt-12">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
              Hairstyles by Face Shape
            </h3>
            <p className="text-sm text-slate-500 text-center mb-8">
              AI recommends hairstyles that match your face shape
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                'Oval Face',
                'Round Face',
                'Square Face',
                'Long Face',
                'Heart Face',
                'Diamond Face'
              ].map((shape) => (
                <button
                  key={shape}
                  onClick={() => {
                    const section = document.getElementById('try-now');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-indigo-200 text-indigo-700 text-sm font-bold rounded-[10px] hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {/* 区块 3: Hairstyles by Hair Type */}
          <div className="border-t border-slate-200 pt-12">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
              Hairstyles by Hair Type
            </h3>
            <p className="text-sm text-slate-500 text-center mb-8">
              Find styles that work with your natural hair texture
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'Curly Hair', slug: 'curly' },
                { name: 'Straight Hair', slug: 'straight' },
                { name: 'Wavy Hair', slug: 'wavy' },
                { name: 'Thick Hair', slug: 'thick' },
                { name: 'Thin Hair', slug: 'thin' }
              ].map((type) => (
                <button
                  key={type.slug}
                  onClick={() => {
                    // 跳转到工具区，并带上发质筛选
                    const section = document.getElementById('men-hairstyles-library');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-4 py-2 bg-slate-100 border border-slate-300 text-slate-700 text-sm font-medium rounded-[8px] hover:bg-white hover:border-purple-600 hover:text-purple-600 transition-all duration-200"
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: 底部内容 */}
      <RelatedLinks />

      {/* ⑨ Final CTA｜极致暗黑科技感收尾 */}
      {
        SHOW_BIG_CARD && (
          <section className="py-32">
            <div className="max-w-6xl mx-auto px-4">
              <div className="relative p-12 md:p-24 overflow-hidden group rounded-2xl bg-slate-900 text-white shadow-2xl">
                {/* 装饰性渐变光圈 */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full -mr-64 -mt-64 transition-all duration-1000 group-hover:bg-indigo-500/30" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-48 -mb-48 transition-all duration-1000 group-hover:bg-purple-500/20" />

                <div className="relative z-10 text-center space-y-10">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight max-w-3xl mx-auto">
                    {safeT('cta.final_title', '准备好发现真正适合您的 AI 形象了吗？')}
                  </h2>
                  <div className="flex justify-center pt-4">
                    <SafeLink href="/ai-hairstyle-changer">
                      <button className="px-12 h-16 bg-white text-slate-900 text-lg font-black rounded-xl shadow-xl hover:scale-105 hover:shadow-white/10 active:scale-95 transition-all duration-300 flex items-center gap-3 group">
                        {safeT('cta.start_free', '立即开始免费体验')}
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </SafeLink>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">
                    {safeT('cta.features', '无需信用卡 · 实时 AI 生成 · 500+ 发型库')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      }

    </main >

    <HairstyleGuideModal
      open={showPhotoRequirements}
      onOpenChange={setShowPhotoRequirements}
    />
    <PortalTooltip
      data={hoveredColor?.data!}
      rect={hoveredColor?.rect || null}
      visible={!!hoveredColor}
    />

    {/* 检测失败弹窗 - 优化后的界面设计 */}
    <Dialog open={showDetectionFailed} onOpenChange={setShowDetectionFailed}>
      <DialogContent 
        overlayClassName="!bg-black/60 !backdrop-blur-[10px]"
        overlayStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        className="!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 !w-[95%] sm:!w-[85%] !max-w-[800px] !bg-slate-100/95 !backdrop-blur-[10px] !border !border-slate-200/60 !rounded !shadow-lg !p-8 focus:outline-none overflow-y-auto !m-0"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95%',
          maxWidth: '800px',
          backgroundColor: 'rgba(241, 245, 249, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '4px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          padding: '32px',
          zIndex: 9999,
          margin: 0,
        }}
      >
        <DialogHeader className="space-y-0">
          {/* 错误提示框头部 - 带红色警告图标 */}
          <div className="flex items-start gap-5 mb-6">
            {/* 警告图标 - 红色圆形标志带"！" */}
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-7 w-7 text-red-600" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              {/* 标题 - 18-20px 加粗 */}
              <DialogTitle className="text-[20px] sm:text-[18px] font-bold text-slate-900 leading-tight mb-4">
                检测失败：无法识别到人像
              </DialogTitle>
              {/* 错误信息 - 14-16px，深灰色 */}
              <DialogDescription className="text-[16px] sm:text-[15px] text-slate-700 leading-relaxed">
                请上传包含清晰正面或侧面的人像照片，以便 AI 为您推荐合适的发型。
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {/* 建议信息 - 25px 间距，14px 字体，使用淡蓝色增强视觉层次 */}
        <div className="border-t border-slate-200/60" style={{ marginTop: '25px', paddingTop: '25px' }}>
          <p className="text-[14px] text-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-900">建议：</span>
            <span className="text-blue-600 ml-2">
              使用正面或侧面人像照片；确保面部部位清晰可见；避免使用风景、物品等非人像照片。
            </span>
          </p>
        </div>
        
        {/* 确认按钮 - 底部留白 25px，高度50px，16px加粗字体，深蓝色 */}
        <div className="mt-6 flex justify-center" style={{ paddingBottom: '25px' }}>
          <button
            onClick={() => setShowDetectionFailed(false)}
            className="w-full sm:w-auto px-10 h-[50px] text-[16px] font-bold text-white bg-[#1e40af] hover:bg-[#1e3a8a] active:bg-[#1e3a8a] rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:ring-offset-2 border-none cursor-pointer min-w-[160px] sm:min-w-[180px]"
            style={{
              fontSize: '16px',
              fontWeight: 700,
              height: '50px',
            }}
          >
            确认
          </button>
        </div>
      </DialogContent>
    </Dialog>
  </div >
  );
}


// --- Components ---

function PortalTooltip({
  data,
  rect,
  visible
}: {
  data: HairColor;
  rect: DOMRect | null;
  visible: boolean;
}) {
  if (!rect || !visible || typeof document === 'undefined') return null;

  // Calculate position
  const tooltipWidth = 140; // Approx width
  const tooltipHeight = 80; // Approx height
  const gap = 8; // Gap between target and tooltip

  // Horizontal Center
  let left = rect.left + rect.width / 2 - tooltipWidth / 2;

  // Boundary Check (Left/Right)
  if (left < 10) left = 10;
  if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;

  // Vertical Flip Logic
  let top = rect.top - tooltipHeight - gap;
  let isFlipped = false;

  // If not enough space on top, show below?
  // User Requirement: "When space below is insufficient, auto flip to top".
  // Wait, default is usually TOP on desktop for tooltips.
  // Let's assume default is TOP. If top < 0, flip to bottom.
  if (top < 10) {
    top = rect.bottom + gap;
    isFlipped = true;
  }

  return createPortal(
    <div
      className="fixed z-[9999] pointer-events-none transition-all duration-200 ease-out flex flex-col items-center"
      style={{
        left,
        top,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0) scale(1)`
          : `translateY(${isFlipped ? '-4px' : '4px'}) scale(0.95)`,
      }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-200/60 p-3 text-left w-max min-w-[120px]">
        <div className="text-slate-800 font-bold text-[11px] mb-2 leading-none tracking-wide">
          {data.name}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-1.5 text-[10px] leading-tight text-slate-500">
            <span className="text-slate-400 shrink-0 font-medium">适合:</span>
            <span>{data.skinTone}</span>
          </div>
          <div className="flex items-start gap-1.5 text-[10px] leading-tight text-slate-500">
            <span className="text-slate-400 shrink-0 font-medium">风格:</span>
            <span>{data.style}</span>
          </div>
        </div>
      </div>
      {/* Arrow */}
      {/* If isFlipped (shown below), arrow should be on TOP of tooltip (pointing up to target) */}
      {/* If normal (shown above), arrow should be on BOTTOM of tooltip (pointing down to target) */}
      {/* Current styles apply to tooltip container. We need absolute arrow. */}
    </div>,
    document.body
  );
}
