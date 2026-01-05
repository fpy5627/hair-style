import React from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { Button3D } from '@/components/ui/Button3D';
import { 
  IntentCards, 
  QuickStartSteps, 
  FAQAccordion, 
  RelatedLinks 
} from '@/components/blocks/hairstyle/LandingComponents';
import { Link } from '@/i18n/navigation';
import { Sparkles } from 'lucide-react';

/**
 * AI Hairstyle Hub 入口页面
 * 作为权重中心，强链到各个子工具页
 */
export default function HairstyleHubPage() {
  const t = useTranslations('hairstyle');

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HairstyleHeader />
      
      <main className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in">
            <Sparkles size={14} />
            <span>Most Realistic AI Hair Stylist</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/ai-hairstyle-changer">
              <Button3D variant="primary" className="px-10 py-4 text-base">
                {t('hero.start')}
              </Button3D>
            </Link>
            <Link href="/ai-hairstyle-changer-free">
              <Button3D variant="outline" className="px-10 py-4 text-base">
                {t('nav.free')}
              </Button3D>
            </Link>
          </div>
        </section>

        {/* 核心入口 (Intent Cards) */}
        <section id="features">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Choose Your Tool</h2>
          </div>
          <IntentCards />
        </section>

        {/* 快速开始步骤 */}
        <QuickStartSteps />

        {/* FAQ 模块 */}
        <FAQAccordion />

        {/* 相关链接模块 */}
        <RelatedLinks />
      </main>

      <Footer />
    </div>
  );
}

