'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { SafeLink } from '@/components/common/safe-link';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, Upload, Palette, Scissors } from 'lucide-react';

/**
 * Hero 区右侧的工具预览卡 (Tool Preview Card)
 * 按截图界面修改
 */
export const HeroDemo = () => {
  const t = useTranslations('hairstyle.preview');
  const t_tool = useTranslations('hairstyle.tool');
  const ts = useTranslations('hairstyle.styles');
  const tc = useTranslations('hairstyle.categories');
  const [view, setView] = useState<'before' | 'after'>('after');
  
  const portrait = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop";

  const miniStyles = [
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1552046122-03184de85e08?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=200&h=200&fit=crop",
  ];

  return (
    <GlassCard className="w-full max-w-[460px] mx-auto aspect-[3/4] flex flex-col overflow-hidden p-1.5 transition-transform duration-500 hover:scale-[1.01]">
      <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-100 flex flex-col border border-white/40 shadow-inner">
        {/* 顶部工具条 */}
        <div className="flex items-center justify-between px-4 h-11 bg-white/70 backdrop-blur-md border-b border-white/20 z-20">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">{t_tool('upload_btn')}</span>
            <span className="text-[11px] font-bold text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">{t_tool('style_btn')}</span>
            <span className="text-[11px] font-bold text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">{t_tool('color_btn')}</span>
          </div>
          <div className="flex gap-1 p-0.5 bg-slate-200/40 rounded-lg border border-white/20">
            <button 
              onClick={() => setView('before')}
              className={cn(
                "px-3 py-1 text-[10px] font-bold rounded-md transition-all", 
                view === 'before' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
              )}
            >
              {t('before')}
            </button>
            <button 
              onClick={() => setView('after')}
              className={cn(
                "px-3 py-1 text-[10px] font-bold rounded-md transition-all", 
                view === 'after' ? "bg-blue-500 text-white shadow-sm" : "text-slate-500"
              )}
            >
              {t('after')}
            </button>
          </div>
        </div>

        {/* 主图片区域 */}
        <div className="flex-1 relative overflow-hidden">
          <img 
            src={portrait} 
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700",
              view === 'before' ? "brightness-110 saturate-100" : "brightness-105 saturate-110"
            )}
            alt="Hero Portrait" 
          />
          
          {/* 底部缩略图条 */}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 overflow-hidden bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-white/30">
            {miniStyles.map((src, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "w-12 h-14 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all",
                  idx === 2 ? "border-white shadow-lg scale-105" : "border-white/30 opacity-80"
                )}
              >
                <img src={src} className="w-full h-full object-cover" alt="mini style" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

/**
 * 首页第二屏的简化示例 Gallery
 */
export const PreviewDemo = () => {
  const t = useTranslations('hairstyle.preview');
  const ts = useTranslations('hairstyle.styles');
  const t_ex = useTranslations('hairstyle.landing.preview_examples');
  
  const EXAMPLES = [
    { name: ts('buzz_cut'), image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop' },
    { name: ts('long_waves'), image: 'https://images.unsplash.com/photo-1519085185750-7407a27503ca?w=400&h=500&fit=crop' },
    { name: ts('pixie_cut'), image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop' },
    { name: ts('pompadour'), image: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=400&h=500&fit=crop' },
    { name: ts('curly_bob'), image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop' },
    { name: ts('french_braid'), image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&h=500&fit=crop' },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{t_ex('title')}</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">{t_ex('note')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {EXAMPLES.map((item, idx) => (
          <GlassCard key={idx} className="group relative aspect-[4/5] overflow-hidden hover:shadow-2xl transition-all duration-500 border-white/20">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest">{item.name}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <SafeLink href="/ai-hairstyle-changer">
          <Button3D variant="primary" className="px-8">
            {t('explore_more')} <ArrowRight size={16} />
          </Button3D>
        </SafeLink>
      </div>
    </section>
  );
};
