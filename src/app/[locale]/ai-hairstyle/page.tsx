'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { Button3D } from '@/components/ui/Button3D';
import { 
  QuickStartSteps, 
  FAQSection, 
  RelatedLinks,
  ExplainerModule,
  CanDoModule,
  ScenariosModule,
  WhyChooseUs,
  BottomCTA,
  ColorTryOnCard,
  SuitsMeSection,
  PopularStylesGrid,
  SeoTextBlock
} from '@/components/blocks/hairstyle/LandingComponents';
import { PreviewDemo, HeroDemo } from '@/components/blocks/hairstyle/PreviewDemo';
import { SafeLink } from '@/components/common/safe-link';
import { Sparkles, Check } from 'lucide-react';

/**
 * Hairnova AI Hub 入口页面
 * 经过功能级增强设计，对标行业领先竞品
 */
export default function HairstyleHubPage() {
  const t = useTranslations('hairstyle');

  const sellingPoints = [
    t('selling_points.point1'),
    t('selling_points.point2'),
    t('selling_points.point3')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff]">
      <HairstyleHeader />
      
      <main className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center px-6 pt-8 md:pt-12 pb-12">
          <div className="flex flex-col items-start text-left space-y-8 md:space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} />
                <span>{t('hero.tagline')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {t('hero.title')}
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 max-w-xl font-medium">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className="space-y-10 w-full">
              <div className="flex flex-wrap gap-5 w-full">
                <SafeLink href="/ai-hairstyle-changer">
                  <Button3D variant="primary" className="px-12 h-14 text-lg font-bold">
                    {t('hero.start')}
                  </Button3D>
                </SafeLink>
                <SafeLink href="/ai-hairstyle-changer-free">
                  <Button3D variant="outline" className="px-12 h-14 text-lg font-bold bg-white/80 border-slate-100 shadow-none">
                    {t('nav.free')}
                  </Button3D>
                </SafeLink>
              </div>

              {/* 极简卖点 */}
              <div className="flex flex-col gap-3.5 pt-2">
                {sellingPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-base md:text-lg text-slate-500 font-semibold tracking-tight">
                    <div className="flex items-center justify-center w-6 h-6 bg-green-50 rounded-full">
                      <Check size={14} className="text-green-500 stroke-[3px]" />
                    </div>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full lg:justify-end">
            <HeroDemo />
          </div>
        </section>

        {/* 2.1 发色试戴功能入口 (新增) */}
        <ColorTryOnCard />

        {/* 2.2 脸型分析 & 发型推荐模块 (新增) */}
        <SuitsMeSection />

        {/* 3) 基础解释模块 */}
        <ExplainerModule />

        {/* 4) 功能拆解模块 */}
        <CanDoModule />

        {/* 2.3 热门风格类别卡片 (新增，SEO + 转化) */}
        <PopularStylesGrid />

        {/* 6) 使用场景模块 */}
        <ScenariosModule />

        {/* 7) 为什么选择我们 */}
        <WhyChooseUs />

        {/* 8) 示例展示 */}
        <PreviewDemo />

        {/* 2.4 更丰富的 SEO 解释文本 (新增) */}
        <SeoTextBlock />

        {/* 10) 简单 3 步 */}
        <QuickStartSteps />

        {/* 11) FAQ 模块 (已扩充至 8 条) */}
        <FAQSection />

        {/* 13) 最终 CTA */}
        <BottomCTA />

        {/* 14) 相关链接 */}
        <RelatedLinks />
      </main>

      <Footer />
    </div>
  );
}
