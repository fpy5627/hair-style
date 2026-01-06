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
} from 'lucide-react';

import { Button3D } from '@/components/ui/Button3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeLink } from '@/components/common/safe-link';
import { cn } from '@/lib/utils';

// Reuse existing components
import { 
  FAQSection, 
  RelatedLinks,
  SeoTextBlock,
  BottomCTA
} from '@/components/blocks/hairstyle/LandingComponents';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { StyleTabs, HairstyleGrid } from '@/components/blocks/hairstyle/StyleSelector';
import { ResultCard } from '@/components/blocks/hairstyle/ResultCard';

// Import data
import { 
  MOCK_HAIRSTYLES, 
  MOCK_COLORS,
  USE_CASES, 
  WHY_REASONS, 
  GALLERY_ITEMS,
  HERO_PREVIEW_DATA
} from '@/lib/homeSectionsData';

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
  
  // 分组数据
  const maleItems = HERO_PREVIEW_DATA.filter(item => item.gender === 'male');
  const femaleItems = HERO_PREVIEW_DATA.filter(item => item.gender === 'female');
  
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female');
  const [step, setStep] = useState(0); 
  const [isRevealing, setIsRevealing] = useState(false);

  const currentItems = selectedGender === 'male' ? maleItems : femaleItems;
  const totalSteps = currentItems.length * 2;

  // 获取当前显示的条目数据
  const personIdx = Math.floor(step / 2);
  const currentPerson = currentItems[personIdx];
  const faceShapeLabel = currentPerson?.faceShape || 'Oval';

  // 获取当前显示的图片
  const getImg = (s: number) => {
    const total = totalSteps;
    const normalizedStep = (s + total) % total;
    const pIdx = Math.floor(normalizedStep / 2);
    const isAfter = normalizedStep % 2 !== 0;
    return isAfter ? currentItems[pIdx].after : currentItems[pIdx].before;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runSequence = () => {
      setIsRevealing(false);
      timer = setTimeout(() => {
        setIsRevealing(true);
        timer = setTimeout(() => {
          setStep((s) => (s + 1) % totalSteps);
          runSequence();
        }, 5000);
      }, 3000);
    };

    runSequence();
    return () => clearTimeout(timer);
  }, [selectedGender, totalSteps]);

  const handleGenderChange = (gender: 'male' | 'female') => {
    if (selectedGender !== gender) {
      setSelectedGender(gender);
      setStep(0);
      setIsRevealing(false);
    }
  };

  const backImg = getImg(step);
  const frontImg = getImg(step + 1);
  const isTargetAfter = (step + 1) % 2 !== 0;

  return (
    <div className="bg-white/32 backdrop-blur-xl border border-white/30 rounded-3xl p-4 md:p-5 shadow-[0_18px_60px_rgba(15,23,42,0.10)] relative group">
      {/* 装饰性光晕 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/5 to-sky-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      <div className="relative space-y-3">
        {/* 顶部标题行 - 增加脸型识别标签 */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              {t('preview.title')}
            </span>
            <div className="h-4 w-[1px] bg-slate-200 mx-1" />
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold border border-indigo-100/50">
              {t('hero.face_shape', { shape: safeTc(`face_shapes.${faceShapeLabel.toLowerCase()}`) || faceShapeLabel })}
            </span>
          </div>
          <div className="flex gap-1.5 items-center">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${isTargetAfter ? 'bg-violet-400/60 shadow-[0_0_8px_rgba(167,139,250,0.4)]' : 'bg-slate-200'}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${!isTargetAfter ? 'bg-sky-400/60 shadow-[0_0_8px_rgba(56,189,248,0.4)]' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* 图片展示区 - 增加 AI 轮廓线层 */}
        <div className="relative w-full h-[min(520px,calc(100svh-64px-180px))] [@media_(max-height:800px)]:h-[min(420px,calc(100svh-64px-160px))] aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/30 shadow-inner bg-slate-50">
          {/* Layer 1: 底图 */}
          <img 
            key={`back-${selectedGender}-${step}`}
            src={backImg} 
            alt="Current State" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* AI 轮廓线叠加层 (仅在 Before 状态下显示更明显) */}
          <div className={cn(
            "absolute inset-0 z-[5] pointer-events-none transition-opacity duration-1000",
            !isTargetAfter ? "opacity-40" : "opacity-10"
          )}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M50 20 C35 20 25 35 25 50 C25 75 35 85 50 85 C65 85 75 75 75 50 C75 35 65 20 50 20" 
                fill="none" 
                stroke="rgba(99, 102, 241, 0.4)" 
                strokeWidth="0.5" 
                strokeDasharray="2 2"
                className="animate-[dash_10s_linear_infinite]"
              />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.2" />
            </svg>
          </div>

          {/* Layer 2: 顶图 (无缝渐变覆盖) */}
          <div 
            key={`front-mask-${selectedGender}-${step}`}
            className="absolute inset-0"
            style={{ 
              zIndex: 10,
              transitionDuration: isRevealing ? '5000ms' : '0ms',
              transitionTimingFunction: 'linear',
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 33.3%, black 66.6%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 33.3%, black 66.6%, black 100%)',
              maskSize: '300% 100%',
              WebkitMaskSize: '300% 100%',
              maskPosition: isRevealing ? '100% 0%' : '0% 0%',
              WebkitMaskPosition: isRevealing ? '100% 0%' : '0% 0%',
              transitionProperty: 'mask-position, -webkit-mask-position'
            }}
          >
            <img 
              src={frontImg} 
              alt="Next State" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 交互按钮组 */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
            <button 
              onClick={() => handleGenderChange('female')}
              className={cn(
                "px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all duration-300 border backdrop-blur-md",
                selectedGender === 'female' 
                  ? "bg-white/80 text-violet-600 border-white/50 shadow-sm" 
                  : "bg-black/15 text-white/90 border-transparent hover:bg-black/25"
              )}
            >
              {safeTc('women')}
            </button>
            <button 
              onClick={() => handleGenderChange('male')}
              className={cn(
                "px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all duration-300 border backdrop-blur-md",
                selectedGender === 'male' 
                  ? "bg-white/80 text-sky-600 border-white/50 shadow-sm" 
                  : "bg-black/15 text-white/90 border-transparent hover:bg-black/25"
              )}
            >
              {safeTc('men')}
            </button>
          </div>

          {/* 状态指示器 */}
          <div className="absolute top-3 right-3 z-20">
            <div className="px-2 py-0.5 bg-black/25 backdrop-blur-sm rounded-full text-[10px] font-medium text-white/90 border border-white/10">
              {isRevealing ? (isTargetAfter ? safeTc('after') : safeTc('before')) : (step % 2 !== 0 ? safeTc('after') : safeTc('before'))}
            </div>
          </div>
        </div>

        {/* 底部信息条 - 增加分析说明 */}
        <div className="flex items-center justify-between px-1 mt-3">
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
            <Sparkles size={10} className="text-violet-400" />
            {t('hero.preview_desc')}
          </span>
          <span className="text-[10px] text-slate-300 font-medium uppercase tracking-tighter">
            Face Recognition · AI Rendering
          </span>
        </div>
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

  const safeTc =
    typeof tc === 'function'
      ? tc
      : (v: string) => v;
  
  // Core Tool States
  const [toolStatus, setToolStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSmartTag, setActiveSmartTag] = useState<'recommended' | 'try' | 'not_recommended'>('recommended');
  
  // Analysis States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedFaceShape, setAnalyzedFaceShape] = useState<string | null>(null);

  const libraryRef = useRef<HTMLDivElement>(null);

  // Tool Logic
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setToolStatus('ready');
      // Auto trigger analysis mock
      startAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalyzedFaceShape(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzedFaceShape(['Oval', 'Round', 'Square', 'Heart'][Math.floor(Math.random() * 4)]);
    }, 2000);
  };

  const handleStyleSelect = (id: string) => {
    setSelectedStyle(id);
    setToolStatus('loading');
    setTimeout(() => {
      setToolStatus('success');
    }, 1500);
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

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ① Hero｜你是做什么的？为什么值得我现在试？ */}
        <section className="min-h-[calc(100svh-64px)] pt-[clamp(16px,3vh,40px)] pb-[clamp(16px,3vh,40px)] grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-[clamp(16px,3vw,40px)] items-center">
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-indigo-100 w-fit">
                <Sparkles size={14} />
                <span>{t('hero.tagline')}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                {t('hero.title')}
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-slate-500 max-w-xl font-medium leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              {[1, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-400">
                  <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <Check size={12} className="text-green-500 stroke-[3px]" />
                  </div>
                  {t(`hero.trust${i}`)}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button3D variant="primary" className="w-full sm:w-auto px-8 md:px-10 h-12 md:h-14 text-sm md:text-base font-black" onClick={() => libraryRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                {t('hero.ctaStart')} <ArrowRight size={20} className="ml-2" />
              </Button3D>
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right duration-700 w-full max-w-[520px] mx-auto lg:mx-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 blur-3xl opacity-50" />
            <HeroPreviewPanel />
          </div>
        </section>

        {/* ② Hairstyle Candidates｜我可以试哪些发型？ */}
        <section className="py-24 border-t border-slate-100 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">500+ 发型候选库</h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">AI 已经根据脸型筛选出最适合您的候选风格</p>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <StyleTabs 
                categories={['All', 'Short', 'Medium', 'Long', 'Men', 'Women']} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
              <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
              <div className="flex gap-2">
                {['recommended', 'try'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold border border-indigo-100/50 uppercase">
                    {t(`howitworks.step2`)}: {tag}
                  </span>
                ))}
              </div>
            </div>

            <GlassCard className="p-6 bg-white/40">
              <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <HairstyleGrid 
                  styles={MOCK_HAIRSTYLES
                    .filter(s => activeCategory === 'All' || s.category === activeCategory || (activeCategory === 'Men' && s.gender === 'male') || (activeCategory === 'Women' && s.gender === 'female'))
                    .map((s, idx) => ({
                      ...s,
                      isMatch: idx < 2
                    }))
                  } 
                  selectedStyleId={selectedStyle} 
                  onStyleSelect={handleStyleSelect} 
                />
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ③ How Hairnova Works｜它是怎么帮我做决定的？ */}
        <section id="library" ref={libraryRef} className="py-24 border-t border-slate-100 space-y-16 bg-slate-50/50 rounded-[3rem]">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t('howitworks.title')}</h2>
            <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mx-auto">{t('howitworks.subtitle')}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ToolShell title="" subtitle="">
              <div className="lg:col-span-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left: Logic Flow */}
                  <div className="lg:col-span-7 space-y-10">
                    {/* Only place for 1-2-3 steps */}
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">{num}</span>
                            <span className="text-[11px] font-black uppercase text-slate-900">{t(`howitworks.step${num}`)}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium leading-tight">{t(`howitworks.step${num}_desc`)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      {isAnalyzing && (
                        <GlassCard className="p-4 border-indigo-100 bg-indigo-50/30 animate-pulse">
                          <div className="flex items-center gap-3 text-indigo-600">
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs font-bold">{t('howitworks.analyzing')}</span>
                          </div>
                        </GlassCard>
                      )}

                      {analyzedFaceShape && (
                        <GlassCard className="p-4 border-green-100 bg-green-50/30">
                          <div className="flex items-center gap-3 text-green-600">
                            <Check size={18} />
                            <span className="text-xs font-bold">
                              {t('howitworks.analysis_done', { shape: safeTc(`face_shapes.${analyzedFaceShape.toLowerCase()}`) || analyzedFaceShape })}
                            </span>
                          </div>
                        </GlassCard>
                      )}

                      {/* Advanced Color - Only here */}
                      <div className="p-6 rounded-2xl bg-white/60 border border-white/40 space-y-4">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Palette size={14} className="text-indigo-400" />
                          {t('howitworks.advanced_color')}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {MOCK_COLORS.map(color => (
                            <button key={color.id} className="group flex flex-col items-center gap-1">
                              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm transition-all group-hover:scale-110" style={{ backgroundColor: color.hex }} />
                              <span className="text-[8px] font-bold text-slate-400">{color.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actual Action Area */}
                  <div className="lg:col-span-5">
                    <div className="aspect-[3/4] relative">
                      {toolStatus === 'idle' ? (
                        <UploadCard preview={originalImage} onUpload={handleUpload} onClear={handleReset} />
                      ) : (
                        <ResultCard status={toolStatus} originalImage={originalImage} resultImage={originalImage} onReset={handleReset} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ToolShell>
          </div>
        </section>

        {/* ④ Real Results｜别人用完效果怎么样？ */}
        <section className="py-24 border-t border-slate-100">
          <div className="space-y-12 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 tracking-tight">{t('gallery.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {GALLERY_ITEMS.slice(0, 3).map(item => (
                <GlassCard key={item.id} className="group overflow-hidden flex flex-col border-white/40 shadow-blue-500/5">
                  <div className="aspect-square flex">
                    <div className="w-1/2 relative h-full">
                      <img src={item.before} className="w-full h-full object-cover" alt="Before" />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/40 text-white text-[8px] font-black uppercase rounded">Before</div>
                    </div>
                    <div className="w-1/2 relative h-full">
                      <img src={item.after} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="After" />
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase rounded">After</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/50 backdrop-blur-md">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                      {t('gallery.face_shape', { shape: safeTc(`face_shapes.${item.faceShape.toLowerCase()}`) || item.faceShape })}
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ When to Use｜什么时候我该用它？ */}
        <section className="py-24 border-t border-slate-100 space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 tracking-tight">{t('usecases.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map(uc => (
              <GlassCard key={uc.id} className="p-8 space-y-4 hover:border-blue-200 transition-colors group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  {uc.icon === 'Scissors' && <Scissors size={24} />}
                  {uc.icon === 'Camera' && <Camera size={24} />}
                  {uc.icon === 'Palette' && <Palette size={24} />}
                  {uc.icon === 'Target' && <Target size={24} />}
                </div>
                <h4 className="font-black text-slate-900">{t(`usecases.${uc.id}`)}</h4>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ⑥ Why Hairnova｜为什么选你而不是别人？ */}
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-12">{t('why.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHY_REASONS.map(reason => (
                <div key={reason.id} className="flex flex-col items-center text-center space-y-4 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    {reason.icon === 'Sparkles' && <Sparkles size={28} />}
                    {reason.icon === 'Zap' && <Zap size={28} />}
                    {reason.icon === 'ShieldCheck' && <ShieldCheck size={28} />}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 leading-tight">{t(`why.${reason.id}`)}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑦ FAQ｜我还有哪些关键疑问？ */}
        <FAQSection />

        {/* ⑧ SEO Face-Shape Links｜如果我想继续研究？ */}
        <RelatedLinks />

        {/* ⑨ Final CTA｜我准备好了，下一步？ */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="p-12 md:p-20 space-y-8 relative overflow-hidden group rounded-[3rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200">
              {/* 3D 增强背景光晕 */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -mr-48 -mt-48 transition-all duration-700 group-hover:scale-110" />
              
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  准备好发现真正适合您脸型的发型了吗？
                </h2>
                <div className="pt-4">
                  <SafeLink href="/ai-hairstyle-changer">
                    <Button3D variant="outline" className="px-12 h-16 text-lg mx-auto bg-white text-indigo-600 border-transparent hover:bg-slate-50 transition-all">
                      立即开始免费分析 <ArrowRight size={20} className="ml-2" />
                    </Button3D>
                  </SafeLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

