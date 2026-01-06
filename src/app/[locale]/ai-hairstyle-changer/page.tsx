'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { ResultCard } from '@/components/blocks/hairstyle/ResultCard';
import { StyleSelector, HairstyleGrid, StyleTabs } from '@/components/blocks/hairstyle/StyleSelector';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Sparkles, Info } from 'lucide-react';
import { RelatedLinks } from '@/components/blocks/hairstyle/LandingComponents';

/**
 * Hairnova AI 换发型核心工具页
 */
export default function HairstyleChangerPage() {
  const t = useTranslations('hairstyle');
  const tc = useTranslations('hairstyle.categories');
  const ts = useTranslations('hairstyle.styles');

  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const STYLE_CATEGORIES = ['All', 'Trendy', 'Short', 'Long', 'Curly', 'Classic'];
  const CATEGORY_MAP: any = {
    'All': tc('all'),
    'Trendy': tc('trendy'),
    'Short': tc('short'),
    'Long': tc('long'),
    'Curly': tc('curly'),
    'Classic': tc('classic'),
  };

  const MOCK_STYLES = [
    { id: '1', name: ts('buzz_cut'), category: 'Short', preview: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop' },
    { id: '2', name: ts('long_waves'), category: 'Long', preview: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop' },
    { id: '3', name: ts('pompadour'), category: 'Classic', preview: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=200&h=200&fit=crop' },
    { id: '4', name: ts('curly_bob'), category: 'Curly', preview: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=200&h=200&fit=crop' },
    { id: '5', name: ts('side_part'), category: 'Trendy', preview: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop' },
    { id: '6', name: ts('mullet'), category: 'Trendy', preview: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=200&h=200&fit=crop' },
  ];

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setStatus('ready');
  };

  const handleGenerate = () => {
    if (!preview || !selectedStyle) return;
    setStatus('loading');
    
    // 模拟 AI 处理过程
    setTimeout(() => {
      setResult(preview); // Mock: 结果暂时设为原图
      setStatus('success');
    }, 3000);
  };

  const filteredStyles = activeCategory === 'All' 
    ? MOCK_STYLES 
    : MOCK_STYLES.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff]">
      <HairstyleHeader />
      
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <ToolShell 
          title={t('hero.title')} 
          subtitle={t('hero.subtitle')}
        >
          {/* 左侧：上传与样式选择 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <UploadCard 
                preview={preview} 
                onUpload={handleUpload} 
                onClear={() => { setPreview(null); setStatus('idle'); }} 
              />
              
              <GlassCard className="p-6 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">{t('tool.styles')}</h3>
                </div>
                
                <StyleTabs 
                  categories={STYLE_CATEGORIES.map(c => CATEGORY_MAP[c])} 
                  activeCategory={CATEGORY_MAP[activeCategory]} 
                  onCategoryChange={(translated) => {
                    const original = STYLE_CATEGORIES.find(c => CATEGORY_MAP[c] === translated);
                    if (original) setActiveCategory(original);
                  }} 
                />
                
                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-[200px]">
                  <HairstyleGrid 
                    styles={filteredStyles} 
                    selectedStyleId={selectedStyle} 
                    onStyleSelect={setSelectedStyle} 
                  />
                </div>

                <Button3D 
                  variant="primary" 
                  className="w-full py-4 mt-2"
                  disabled={status === 'loading' || !preview || !selectedStyle}
                  onClick={handleGenerate}
                >
                  <Sparkles size={18} />
                  <span>{t('tool.generate')}</span>
                </Button3D>
              </GlassCard>
            </div>
          </div>

          {/* 右侧：结果展示 */}
          <div className="lg:col-span-5">
            <ResultCard 
              status={status} 
              originalImage={preview} 
              resultImage={result} 
              onReset={() => { setStatus('ready'); setResult(null); }}
            />
          </div>
        </ToolShell>

        {/* 补充说明 / Free vs Pro */}
        <div className="mt-12">
          <GlassCard className="p-6 border-blue-100 shadow-blue-500/5">
            <div className="flex gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit border border-blue-200">
                <Info size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">{t('tool.tips_title')}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('tool.tips_desc')}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        <RelatedLinks />
      </main>

      <Footer />
    </div>
  );
}

