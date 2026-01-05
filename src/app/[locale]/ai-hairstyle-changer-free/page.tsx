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
import { Sparkles, Info, Gift } from 'lucide-react';
import { RelatedLinks, ComparisonTable } from '@/components/blocks/hairstyle/LandingComponents';

const STYLE_CATEGORIES = ['All', 'Trendy', 'Short', 'Long'];
const MOCK_STYLES = [
  { id: '1', name: 'Buzz Cut', category: 'Short', preview: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop' },
  { id: '2', name: 'Long Waves', category: 'Long', preview: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop' },
  { id: '5', name: 'Side Part', category: 'Trendy', preview: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop' },
];

/**
 * 免费换发型页面
 * 包含基础工具和 Free vs Pro 对比
 */
export default function HairstyleChangerFreePage() {
  const t = useTranslations('hairstyle');
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setStatus('ready');
  };

  const handleGenerate = () => {
    if (!preview || !selectedStyle) return;
    setStatus('loading');
    setTimeout(() => {
      setResult(preview);
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HairstyleHeader />
      
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <ToolShell 
          title={`${t('nav.free')} - ${t('hero.title')}`} 
          subtitle="Try our basic AI hairstyle changer for free. Experience the magic of AI styling without any cost."
        >
          {/* 工具部分 */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
              <div className="flex items-center gap-3">
                <Gift className="text-blue-600" size={20} />
                <p className="text-sm font-medium text-slate-700">You have 3 free generations left today!</p>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <UploadCard 
                preview={preview} 
                onUpload={handleUpload} 
                onClear={() => { setPreview(null); setStatus('idle'); }} 
              />
              
              <GlassCard className="p-6 flex flex-col space-y-4">
                <h3 className="font-bold text-slate-900">Select Free Style</h3>
                <StyleTabs 
                  categories={STYLE_CATEGORIES} 
                  activeCategory={activeCategory} 
                  onCategoryChange={setActiveCategory} 
                />
                <div className="flex-1 overflow-y-auto min-h-[200px]">
                  <HairstyleGrid 
                    styles={MOCK_STYLES} 
                    selectedStyleId={selectedStyle} 
                    onStyleSelect={setSelectedStyle} 
                  />
                </div>
                <Button3D 
                  variant="primary" 
                  className="w-full"
                  disabled={status === 'loading' || !preview || !selectedStyle}
                  onClick={handleGenerate}
                >
                  <Sparkles size={18} />
                  <span>{t('tool.generate')}</span>
                </Button3D>
              </GlassCard>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ResultCard 
              status={status} 
              originalImage={preview} 
              resultImage={result} 
              onReset={() => { setStatus('ready'); setResult(null); }}
            />
          </div>
        </ToolShell>

        {/* 核心对比表 */}
        <ComparisonTable />

        <RelatedLinks />
      </main>

      <Footer />
    </div>
  );
}

