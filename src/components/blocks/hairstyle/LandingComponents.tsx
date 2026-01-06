'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { SafeLink } from '@/components/common/safe-link';
import { 
  ArrowRight, 
  Sparkles, 
  User, 
  UserCheck, 
  HelpCircle, 
  Zap, 
  ShieldCheck, 
  Target, 
  Camera, 
  Heart, 
  Scissors, 
  Palette, 
  Layers, 
  MousePointer2,
  Brain,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 2.1 发色试戴功能卡片 (ColorTryOnCard)
 */
export const ColorTryOnCard = () => {
  const t = useTranslations('hairstyle.landing.color_tryon');
  
  const colors = [
    { name: t('colors.black'), color: 'bg-slate-900' },
    { name: t('colors.brown'), color: 'bg-[#4a3728]' },
    { name: t('colors.blonde'), color: 'bg-[#faf0be]' },
    { name: t('colors.red'), color: 'bg-[#8b0000]' },
    { name: t('colors.silver'), color: 'bg-[#c0c0c0]' },
    { name: t('colors.colorful'), color: 'bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500' },
  ];

  return (
    <section className="py-16 px-4">
      <GlassCard className="max-w-6xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 左侧文案 */}
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border border-indigo-100">
              <Palette size={12} />
              Hot Feature
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {t('title')}
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              {t('description')}
            </p>
            
            <div className="pt-4">
              <SafeLink href="/ai-hairstyle-changer?tab=color">
                <Button3D variant="primary" className="h-12 px-8">
                  {t('cta')} <ArrowRight size={18} />
                </Button3D>
              </SafeLink>
            </div>
            
            <p className="text-[10px] text-slate-400 font-medium">
              {t('disclaimer')}
            </p>
          </div>

          {/* 右侧色卡示意 */}
          <div className="p-8 md:p-12 border-l border-white/20 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-sm">
              {colors.map((c, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group">
                  <div className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-2xl shadow-lg border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                    c.color
                  )} />
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

/**
 * 2.2 脸型分析 & 发型推荐模块 (SuitsMeSection)
 */
export const SuitsMeSection = () => {
  const t = useTranslations('hairstyle.landing.face_shape');
  
  const steps = [
    { title: t('step1'), desc: t('step1_desc'), icon: <Camera size={24} /> },
    { title: t('step2'), desc: t('step2_desc'), icon: <Brain size={24} /> },
    { title: t('step3'), desc: t('step3_desc'), icon: <CheckCircle2 size={24} /> },
  ];

  const faceShapes = [t('f1'), t('f2'), t('f3'), t('f4'), t('f5')];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{t('title')}</h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <GlassCard key={idx} className="p-8 flex flex-col items-center text-center space-y-4 group transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 border border-blue-100 shadow-sm">
                {step.icon}
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-lg">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed px-4">{step.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8">
          <SafeLink href="/what-hairstyle-suits-me">
            <Button3D variant="secondary" className="h-14 px-12 font-bold text-lg">
              {t('cta')} <Sparkles size={20} />
            </Button3D>
          </SafeLink>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('supported_faces')}</span>
            {faceShapes.map((f, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/80 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 2.3 热门风格类别卡片 (PopularStylesGrid)
 */
export const PopularStylesGrid = () => {
  const t = useTranslations('hairstyle.landing.popular_styles');
  
  const categories = [
    { 
      title: t('m_title'), 
      desc: t('m_desc'), 
      href: '/ai-hairstyle-changer?gender=male', 
      tag: t('tag_hot'),
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop' 
    },
    { 
      title: t('f_title'), 
      desc: t('f_desc'), 
      href: '/ai-hairstyle-changer?gender=female', 
      tag: t('tag_hot'),
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop' 
    },
    { 
      title: t('c_title'), 
      desc: t('c_desc'), 
      href: '/ai-hairstyle-changer?texture=curly', 
      tag: t('tag_new'),
      image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop' 
    },
    { 
      title: t('v_title'), 
      desc: t('v_desc'), 
      href: '/ai-hairstyle-changer?tab=color', 
      tag: t('tag_new'),
      image: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=400&h=500&fit=crop' 
    },
    { 
      title: t('t_title'), 
      desc: t('t_desc'), 
      href: '/ai-hairstyle-changer?sort=trending', 
      tag: 'HOT',
      image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop' 
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight text-center">{t('title')}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, idx) => (
            <SafeLink key={idx} href={c.href}>
              <GlassCard className="group h-full overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={c.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={c.title} />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-[9px] font-black rounded uppercase tracking-tighter shadow-lg">
                    {c.tag}
                  </div>
                </div>
                <div className="p-6 space-y-2 bg-white/40 backdrop-blur-md border-t border-white/20">
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{c.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{c.desc}</p>
                  <div className="pt-2 flex items-center text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    Try This Category <MousePointer2 size={10} className="ml-1" />
                  </div>
                </div>
              </GlassCard>
            </SafeLink>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 2.4 SEO 解释文本 (SeoTextBlock)
 */
export const SeoTextBlock = () => {
  const t = useTranslations('hairstyle.landing.seo_block');

  return (
    <section className="py-24 px-4 border-t border-slate-100">
      <div className="max-w-4xl mx-auto space-y-10 text-center">
        <div className="space-y-3">
          <p className="text-base md:text-lg text-slate-900 leading-relaxed font-black tracking-tight">
            Hairnova AI 会自动识别你的脸型与比例，
          </p>
          <p className="text-base md:text-lg text-indigo-600 leading-relaxed font-black tracking-tight">
            并基于脸型结构推荐更适合你的发型和发色，
          </p>
          <p className="text-base md:text-lg text-slate-900 leading-relaxed font-black tracking-tight">
            帮你在真正改变之前，提前看到结果。
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest">
            无需下载 · 无需注册
          </p>
          <p className="text-xs md:text-sm text-indigo-400/80 font-bold tracking-wide">
            上传照片即可开始体验
          </p>
        </div>

        <div className="flex justify-center gap-8 opacity-20 grayscale contrast-200 h-6 pt-6">
          <div className="font-black text-[10px] md:text-xs uppercase tracking-widest text-slate-900">Accuracy</div>
          <div className="font-black text-[10px] md:text-xs uppercase tracking-widest text-slate-900">Privacy</div>
          <div className="font-black text-[10px] md:text-xs uppercase tracking-widest text-slate-900">Global Styles</div>
        </div>
      </div>
    </section>
  );
};

/**
 * FAQ 手风琴组件 (FAQSection) - 首页精简版 (5条)
 */
export const FAQSection = () => {
  const t = useTranslations('hairstyle.landing.faq');
  
  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q8'), a: t('a8') },
  ];

  return (
    <div className="py-24 max-w-3xl mx-auto px-4">
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
          <HelpCircle size={28} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{t('title')}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, idx) => (
          <GlassCard key={idx} className="p-6 transition-all duration-300 group">
            <h4 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
              <span className="text-blue-500 font-black mt-0.5 shrink-0">Q.</span>
              {faq.q}
            </h4>
            <div className="flex items-start gap-3 text-sm text-slate-500 leading-relaxed">
              <span className="text-slate-300 font-black mt-0.5 shrink-0">A.</span>
              <p>{faq.a}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-10 text-center">
        <SafeLink href="/faq">
          <Button3D variant="outline" className="px-8 h-12 text-sm font-bold bg-white/50">
            查看全部常见问题 <ArrowRight size={16} className="ml-2" />
          </Button3D>
        </SafeLink>
      </div>
    </div>
  );
};

/**
 * 快速开始步骤组件
 */
export const QuickStartSteps = () => {
  const tl = useTranslations('hairstyle.landing.steps');
  const steps = [
    { title: tl('step1'), desc: tl('step1_desc') },
    { title: tl('step2'), desc: tl('step2_desc') },
    { title: tl('step3'), desc: tl('step3_desc') },
  ];

  return (
    <div className="py-20 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12">{tl('title')}</h2>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 space-y-4 relative">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4338ca] to-[#6d28d9] text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg shadow-blue-200/50">
              {idx + 1}
            </div>
            <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-slate-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 底部强 CTA 区块
 */
export const BottomCTA = () => {
  const tl = useTranslations('hairstyle.landing.bottom_cta');

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="p-12 md:p-20 space-y-8 relative overflow-hidden group rounded-[3rem] bg-indigo-50/50">
          {/* 3D 增强背景光晕 */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 blur-[120px] rounded-full -mr-48 -mt-48 transition-all duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 blur-[120px] rounded-full -ml-48 -mb-48 transition-all duration-700 group-hover:scale-110" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{tl('title')}</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">{tl('subtitle')}</p>
            <div className="pt-4">
              <SafeLink href="/ai-hairstyle-changer">
                <Button3D variant="primary" className="px-12 h-16 text-lg mx-auto">
                  {tl('button')} <ArrowRight size={20} />
                </Button3D>
              </SafeLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 信任型模块 - 为什么选择我们
 */
export const WhyChooseUs = () => {
  const tl = useTranslations('hairstyle.landing.why_us');
  const reasons = [tl('reason1'), tl('reason2'), tl('reason3'), tl('reason4')];

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <GlassCard className="p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-white/60 to-blue-50/20">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{tl('title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((r, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Sparkles size={10} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-[#4338ca] to-[#6d28d9] rounded-full flex items-center justify-center shadow-2xl shadow-blue-200/50">
            <Sparkles size={60} className="text-white animate-pulse" />
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

/**
 * 核心对比表 (ComparisonTable) - 用于免费页
 */
export const ComparisonTable = () => {
  const t = useTranslations('hairstyle.comparison');
  const features = ['f1', 'f2', 'f3', 'f4', 'f5'];

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">{t('title')}</h2>
        </div>
        <GlassCard className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-4 md:p-6 text-sm font-bold text-slate-900">{t('feature')}</th>
                <th className="p-4 md:p-6 text-sm font-bold text-blue-600 text-center bg-blue-50/30">{t('free')}</th>
                <th className="p-4 md:p-6 text-sm font-bold text-purple-600 text-center">{t('pro')}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, idx) => (
                <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-white/40 transition-colors">
                  <td className="p-4 md:p-6 text-sm text-slate-600 font-medium">{t(`${f}.name`)}</td>
                  <td className="p-4 md:p-6 text-sm text-slate-500 text-center bg-blue-50/30">
                    {t(`${f}.free`)}
                  </td>
                  <td className="p-4 md:p-6 text-sm text-slate-900 font-bold text-center">
                    {t(`${f}.pro`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 bg-slate-50/50 flex justify-center">
            <Button3D variant="primary" className="px-8 h-12">
              {t('upgrade_cta')}
            </Button3D>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

/**
 * 相关链接模块
 */
export const RelatedLinks = () => {
  const tl = useTranslations('hairstyle.landing');
  const links = [
    { title: tl('related_links.l1'), href: '#' },
    { title: tl('related_links.l2'), href: '#' },
    { title: tl('related_links.l3'), href: '#' },
    { title: tl('related_links.l4'), href: '#' },
  ];

  return (
    <div className="py-12 border-t border-slate-100 px-4">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">{tl('explore_more')}</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link, idx) => (
          <SafeLink key={idx} href={link.href} className="text-sm text-slate-600 hover:text-blue-600 px-4 py-2 bg-slate-50 rounded-full transition-colors border border-slate-100">
            {link.title}
          </SafeLink>
        ))}
      </div>
    </div>
  );
};

/**
 * 基础解释模块 (保留自旧版)
 */
export const ExplainerModule = () => {
  const tl = useTranslations('hairstyle.landing.what_is');
  
  const cards = [
    { title: tl('card1_title'), icon: <Zap className="text-amber-500" /> },
    { title: tl('card2_title'), icon: <ShieldCheck className="text-blue-500" /> },
    { title: tl('card3_title'), icon: <Scissors className="text-purple-500" /> },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{tl('title')}</h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">{tl('description')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, idx) => (
          <GlassCard key={idx} className="p-8 text-center space-y-4 group hover:scale-[1.02] transition-transform flex flex-col items-center justify-center border border-white/40 shadow-blue-500/5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-sm mb-2 border border-slate-100">
              {card.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug">{card.title}</h4>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

/**
 * 功能拆解模块 (保留自旧版)
 */
export const CanDoModule = () => {
  const tl = useTranslations('hairstyle.landing.can_do');
  const features = [
    { title: tl('f1_title'), desc: tl('f1_desc'), icon: <Scissors className="text-blue-500" /> },
    { title: tl('f2_title'), desc: tl('f2_desc'), icon: <Palette className="text-indigo-500" /> },
    { title: tl('f3_title'), desc: tl('f3_desc'), icon: <User className="text-purple-500" /> },
    { title: tl('f4_title'), desc: tl('f4_desc'), icon: <Sparkles className="text-amber-500" /> },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{tl('title')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((f, idx) => (
          <GlassCard key={idx} className="p-6 space-y-3 hover:border-blue-200 transition-colors border border-white/40 shadow-blue-500/5">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
              {f.icon}
            </div>
            <h4 className="font-bold text-slate-900">{f.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

/**
 * 使用场景模块 (保留自旧版)
 */
export const ScenariosModule = () => {
  const tl = useTranslations('hairstyle.landing.scenarios');
  const scenarios = [
    { title: tl('s1_title'), desc: tl('s1_desc'), icon: <Target className="text-red-500" /> },
    { title: tl('s2_title'), desc: tl('s2_desc'), icon: <Camera className="text-purple-500" /> },
    { title: tl('s3_title'), desc: tl('s3_desc'), icon: <Heart className="text-pink-500" /> },
    { title: tl('s4_title'), desc: tl('s4_desc'), icon: <Palette className="text-indigo-500" /> },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{tl('title')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {scenarios.map((s, idx) => (
          <GlassCard key={idx} className="p-6 space-y-4 hover:border-blue-200 transition-colors border border-white/40 shadow-blue-500/5">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
              {s.icon}
            </div>
            <h4 className="font-bold text-slate-900">{s.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
