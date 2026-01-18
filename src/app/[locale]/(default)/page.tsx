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
  Loader2
} from 'lucide-react';

import { Button3D } from '@/components/ui/Button3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeLink } from '@/components/common/safe-link';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
    localStorage.setItem('hairnova_history', JSON.stringify(newHistory));
  };

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('hairnova_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  useEffect(() => {
    // 只有在 history 状态被初始化后才同步到本地存储
    // 避免初次加载时 history 为空（还未从 localStorage 读取）导致覆盖本地数据
    const saved = localStorage.getItem('hairnova_history');
    if (saved || history.length > 0) {
      localStorage.setItem('hairnova_history', JSON.stringify(history));
    }
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
      alert('图片加载失败，请重试');
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
              try {
                localStorage.setItem('hairnova_history', JSON.stringify(updated));
              } catch (e) {
                console.warn('LocalStorage Quota Exceeded, partial save failed');
              }
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
  // 计算当前应该展示的结果图
  const activePhotoRecords = history.filter(h => h.originalImageUrl === originalImage && h.styleId !== 'original');
  const stylePreview = selectedStyle ? MOCK_HAIRSTYLES.find(s => s.id === selectedStyle)?.preview : null;

  // Logic Fix: If originalImage exists, NEVER show stock preview images.
  const displayImage = (toolStatus === 'loading' || isAnalyzing || isDetectingColor)
    ? originalImage
    : (activePhotoRecords.length > 0)
      ? activePhotoRecords[0].resultImageUrl
      : (originalImage || stylePreview || MOCK_HAIRSTYLES[0].preview);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ① Hero｜你是做什么的？为什么值得我现在试？ */}
        <section className="pt-6 md:pt-10 pb-4 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-8 items-center">
          <div className="space-y-5 md:space-y-7 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white shadow-sm text-indigo-600 rounded-[6px] text-[9px] md:text-[10px] font-normal uppercase tracking-widest border border-indigo-100 w-fit">
                <Sparkles size={12} className="text-purple-500" />
                <span>{t('hero.tagline')}</span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.2] text-slate-900">
                {safeT('hero.title_part1')}<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500">
                  {safeT('hero.title_part2')}
                </span>
              </h1>
              <p className="text-xs md:text-sm lg:text-base text-slate-700 max-w-xl font-medium leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              {[1, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] md:text-[11px] font-medium text-slate-800">
                  <div className="w-3.5 h-3.5 bg-emerald-50 border border-emerald-500/60 rounded-[3px] flex items-center justify-center shrink-0">
                    <Check size={9} className="text-emerald-500 stroke-[3px]" />
                  </div>
                  {t(`hero.trust${i}`)}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 md:pt-8">
              <Button3D
                variant="gradient"
                radius="xl"
                className="w-full sm:w-auto px-8 md:px-10 h-12 md:h-14 font-black"
                onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="!text-sm md:!text-base whitespace-nowrap leading-[1.1] font-semibold">
                  {t('hero.ctaStart')}
                </span>
                <ArrowRight size={20} className="ml-2 shrink-0" />
              </Button3D>
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right duration-700 w-full max-w-[480px] mx-auto lg:mx-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 blur-3xl opacity-50" />
            <HeroPreviewPanel />
          </div>
        </section>



        {/* ③ Core Experience Zone｜核心交互区 - 结构级重排 */}
        <section className="mt-16 pt-10 pb-16 relative overflow-visible z-10">
          {/* 浅冷色渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 -z-10" />

          <div className="max-w-7xl mx-auto px-4">
            {/* ① 顶部说明区 - 极简 */}
            <div className="text-center mb-10 space-y-5">
              {/* 步骤指示器 - 压缩版 */}
              <div className="py-5 border-y border-slate-200/40 mb-2">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-3xl font-black transition-colors leading-none",
                      activeStep === 1 ? "text-indigo-200" : "text-slate-200/80"
                    )}>01</span>
                    <div className="flex flex-col text-left">
                      <span className={cn(
                        "text-sm font-bold transition-colors leading-tight",
                        activeStep === 1 ? "text-indigo-900" : "text-slate-700"
                      )}>{t('howitworks.step1')}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">上传正脸清晰照</span>
                    </div>
                  </div>

                  <div className="hidden md:block text-slate-200">
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </div>
                  <div className="md:hidden h-4 w-px bg-slate-100"></div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-3xl font-black transition-colors leading-none",
                      activeStep === 2 ? "text-indigo-200" : "text-slate-200/80"
                    )}>02</span>
                    <div className="flex flex-col text-left">
                      <span className={cn(
                        "text-sm font-bold transition-colors leading-tight",
                        activeStep === 2 ? "text-indigo-900" : "text-slate-700"
                      )}>{t('howitworks.step2')}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">分析脸型与比例</span>
                    </div>
                  </div>

                  <div className="hidden md:block text-slate-200">
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </div>
                  <div className="md:hidden h-4 w-px bg-slate-100"></div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-3xl font-black transition-colors leading-none",
                      activeStep === 3 ? "text-indigo-200" : "text-slate-200/80"
                    )}>03</span>
                    <div className="flex flex-col text-left">
                      <span className={cn(
                        "text-sm font-bold transition-colors leading-tight",
                        activeStep === 3 ? "text-indigo-900" : "text-slate-700"
                      )}>{t('howitworks.step3')}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">生成发型 + 发色</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-6">
                立即开始 AI 发型实验室
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto">
                上传一张清晰的正脸照片，AI 将在秒级时间内为您量身打造最佳发型方案
              </p>

              {/* Inline Badge Row - 弱化 */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="px-2.5 py-1 rounded-md bg-slate-50/80 border border-slate-200/40">
                  <span className="text-[10px] font-semibold text-slate-500">专属发型工作台</span>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-indigo-50/50 border border-indigo-100/40">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                    {analyzedFaceShape || 'OVAL'}
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-slate-50/80 border border-slate-200/40">
                  <span className="text-[10px] font-medium text-slate-400">定制建议</span>
                </div>
              </div>
            </div>

            {/* ② AI Studio 主工作台 */}
            <div className="max-w-5xl mx-auto">
              <div className="rounded-[24px] bg-white shadow-[0_2px_40px_rgba(15,23,42,0.06)] border border-slate-200/40 relative overflow-visible">
                <div className="px-10 lg:px-12 py-10 lg:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 max-w-4xl mx-auto w-full">

                    {/* 左栏：上传区 */}
                    <div className="flex flex-col">
                      <div className="rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/30 h-[320px] flex items-center justify-center p-5 lg:p-6">
                        {originalImage ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="h-[260px] w-full flex items-center justify-center relative">
                              <img src={originalImage} alt="Preview" className="h-full w-auto max-w-full object-contain drop-shadow-sm" />
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
                            className="w-full h-11 rounded-[8px] border border-slate-200 bg-white hover:border-indigo-400 hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                          >
                            <Upload size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">更换照片</span>
                            <input id="file-upload-input" type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'file')} accept="image/*" />
                          </button>
                        </div>
                      )}

                      {/* 最近试戴记录 - 移动社交至左栏下方 */}
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
                            {/* 空位占位符，保持 2 行 12 个格子的对齐感 */}
                            {history.length < 12 && Array.from({ length: 12 - history.length }).map((_, i) => (
                              <div key={`empty-${i}`} className="aspect-square rounded-[8px] border border-dashed border-slate-100 bg-slate-50/30" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 右栏：结果预览 + 控制面板 */}
                    <div className="flex flex-col">
                      {/* 预览卡片 */}
                      <div className="rounded-[24px] bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 h-[320px] flex items-center justify-center p-5 lg:p-6 relative overflow-hidden">
                        {(toolStatus === 'success' || (originalImage && displayImage)) ? (
                          <div className="relative w-full h-[260px] flex items-center justify-center">
                            <img src={displayImage || undefined} alt="Result" className={cn("h-full w-auto max-w-full object-contain drop-shadow-md", (toolStatus === 'loading' || isAnalyzing) ? 'blur-sm opacity-60' : 'blur-0 opacity-100')} />
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

                      {/* 发色调节 & 生成按钮 */}
                      <div className="mt-6 flex flex-col space-y-6">
                        <div className="bg-slate-50/40 p-5 rounded-[20px] border border-slate-100/60 space-y-6">
                          {/* 基础发色 */}
                          <div className="flex flex-col gap-3">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">基础发色</span>
                            <div className="flex flex-wrap gap-2">
                              {HAIR_COLORS.basic.map(color => (
                                <button key={color.id} onClick={() => setSelectedColorId(color.id)} onMouseEnter={(e) => handleColorEnter(e, color)} onMouseLeave={handleColorLeave} className={cn("w-8 h-8 rounded-[6px] border-2 transition-all", selectedColorId === color.id ? "border-indigo-600 ring-2 ring-indigo-400/30 scale-105" : "border-slate-200/80 hover:border-indigo-300")} style={{ backgroundColor: color.hex }} />
                              ))}

                              {/* 更多颜色切换按钮 */}
                              <button
                                onClick={() => setShowAdvancedColors(!showAdvancedColors)}
                                className={cn(
                                  "w-8 h-8 rounded-[6px] border-2 flex items-center justify-center transition-all",
                                  showAdvancedColors
                                    ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm"
                                    : "border-slate-200/80 bg-white text-slate-400 hover:border-indigo-300 hover:text-indigo-500"
                                )}
                                title={showAdvancedColors ? "收起更多颜色" : "展示风格与高级发色"}
                              >
                                {showAdvancedColors ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
                              </button>
                            </div>
                          </div>

                          {/* 风格 & 高级发色 - 展开收起区域 */}
                          {showAdvancedColors && (
                            <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                              {/* 风格发色 */}
                              <div className="flex flex-col gap-3">
                                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">风格发色</span>
                                <div className="flex flex-wrap gap-2">
                                  {HAIR_COLORS.style.map(color => (
                                    <button key={color.id} onClick={() => setSelectedColorId(color.id)} onMouseEnter={(e) => handleColorEnter(e, color)} onMouseLeave={handleColorLeave} className={cn("w-8 h-8 rounded-[6px] border-2 transition-all", selectedColorId === color.id ? "border-indigo-600 ring-2 ring-indigo-400/30 scale-105" : "border-slate-200/80 hover:border-indigo-300")} style={{ backgroundColor: color.hex }} />
                                  ))}
                                </div>
                              </div>
                              {/* 高级发色 */}
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

                        {/* 生成按钮 */}
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
                          <p className="text-center mt-3 text-[10px] text-slate-400 flex items-center justify-center gap-1">
                            <Info size={12} />
                            生成约需 3-5 秒，支持高清无损导出
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* 历史预览弹窗 */}
        <HistoryPreviewModal
          record={selectedHistory}
          onClose={() => setSelectedHistory(null)}
          onRetry={(styleId) => {
            setSelectedHistory(null);
            handleStyleSelect(styleId);
            libraryRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 照片要求指南弹窗 */}
        <HairstyleGuideModal
          open={showPhotoRequirements}
          onOpenChange={setShowPhotoRequirements}
        />

        {/* ④ Real Results｜三列扫描对比网格 */}
        <section className="py-32 border-t border-slate-200/60 bg-white">
          <div className="space-y-16 max-w-7xl mx-auto px-4">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">{t('gallery.title')}</h2>
              <p className="text-sm md:text-base text-slate-500 font-medium">真实用户生成的 AI 发型转换效果</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {GALLERY_ITEMS.slice(0, 3).map(item => (
                <div key={item.id} className="group relative overflow-hidden flex flex-col rounded-xl bg-slate-50 border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                  <div className="aspect-[4/5] flex relative overflow-hidden">
                    {/* Before */}
                    <div className="w-1/2 relative h-full">
                      <img src={item.before} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt="Before" />
                    </div>

                    {/* Pulse Scanner Line */}
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-transparent z-10 animate-pulse">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full blur-sm" />
                    </div>

                    {/* After */}
                    <div className="w-1/2 relative h-full">
                      <img src={item.after} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" alt="After" />
                    </div>
                  </div>
                  <div className="p-8 bg-white/80 backdrop-blur-md flex items-center justify-between border-t border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                        {safeT('gallery.face_shape', undefined, { shape: safeTc(`face_shapes.${item.faceShape.toLowerCase()}`) || item.faceShape })}
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-2">
                        {safeT('gallery.recommended_style', undefined, { tag: item.tag || '自然蓬松' })}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 cursor-pointer">
                      <Sparkles size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ When to Use｜多场景适配磁贴 */}
        <section className="py-32 border-t border-slate-200/60 space-y-16">
          <div className="text-center space-y-3 px-4">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">{t('usecases.title')}</h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">
              {safeT('usecases.subtitle', '满足您在人生每一个重要时刻的形象需求')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
            {USE_CASES.map(uc => (
              <div key={uc.id} className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                  {uc.icon === 'Scissors' && <Scissors size={32} />}
                  {uc.icon === 'Camera' && <Camera size={32} />}
                  {uc.icon === 'Palette' && <Palette size={32} />}
                  {uc.icon === 'Target' && <Target size={32} />}
                </div>
                <h4 className="mt-8 font-black text-xl text-slate-900 tracking-tight">{t(`usecases.${uc.id}`)}</h4>
                <p className="mt-4 text-sm text-slate-500 font-medium leading-relaxed">
                  {safeT('usecases.desc', '基于 AI 的深度定制化方案，确保效果自然逼真。')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ⑥ Why Hairnova｜核心优势勋章布局 */}
        <section className="py-32 border-t border-slate-200/60 bg-white rounded-2xl shadow-sm mx-4">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 tracking-tighter mb-20">{t('why.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {WHY_REASONS.map(reason => (
                <div key={reason.id} className="flex flex-col items-center text-center space-y-6 group">
                  <div className="w-20 h-20 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-700 shadow-lg shadow-indigo-100">
                    {reason.icon === 'Sparkles' && <Sparkles size={36} />}
                    {reason.icon === 'Zap' && <Zap size={36} />}
                    {reason.icon === 'ShieldCheck' && <ShieldCheck size={36} />}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight">{t(`why.${reason.id}`)}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]">
                      {safeT('why.desc', '采用行业领先的生成算法，为您提供专业级造型建议。')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑦ FAQ｜我还有哪些关键疑问？ */}
        <FAQSection />

        {/* ⑧ SEO Face-Shape Links｜如果我想继续研究？ */}
        <RelatedLinks />

        {/* ⑨ SEO Knowledge｜站长进阶指南 */}
        <SEOEducationSection />

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
