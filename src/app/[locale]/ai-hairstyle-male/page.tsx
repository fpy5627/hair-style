'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { ResultCard } from '@/components/blocks/hairstyle/ResultCard';
import { HairstyleGrid, StyleTabs } from '@/components/blocks/hairstyle/StyleSelector';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Sparkles, User } from 'lucide-react';
import { RelatedLinks } from '@/components/blocks/hairstyle/LandingComponents';

const MOCK_MALE_STYLES = [
  { id: 'm1', name: 'Buzz Cut', category: 'Short', preview: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop' },
  { id: 'm2', name: 'Pompadour', category: 'Classic', preview: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=200&h=200&fit=crop' },
  { id: 'm3', name: 'Side Part', category: 'Trendy', preview: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop' },
  { id: 'm4', name: 'Mullet', category: 'Trendy', preview: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=200&h=200&fit=crop' },
  { id: 'm5', name: 'Undercut', category: 'Trendy', preview: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=200&h=200&fit=crop' },
  { id: 'm6', name: 'Man Bun', category: 'Long', preview: 'https://images.unsplash.com/photo-1519085185750-7407a27503ca?w=200&h=200&fit=crop' },
];

/**
 * 男士发型页
 */
export default function HairstyleMalePage() {
  const t = useTranslations('hairstyle');
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HairstyleHeader />
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <ToolShell 
          title={t('nav.male')} 
          subtitle="Explore the best hairstyles for men. From classic buzz cuts to modern pompadours."
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <UploadCard 
                preview={preview} 
                onUpload={(f) => {
                  const r = new FileReader();
                  r.onload = (e) => setPreview(e.target?.result as string);
                  r.readAsDataURL(f);
                  setStatus('ready');
                }} 
                onClear={() => { setPreview(null); setStatus('idle'); }} 
              />
              <GlassCard className="p-6 flex flex-col space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">Men's Style Gallery</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <HairstyleGrid 
                    styles={MOCK_MALE_STYLES} 
                    selectedStyleId={selectedStyle} 
                    onStyleSelect={setSelectedStyle} 
                  />
                </div>
                <Button3D 
                  variant="primary" 
                  className="w-full"
                  disabled={status === 'loading' || !preview || !selectedStyle}
                  onClick={() => {
                    setStatus('loading');
                    setTimeout(() => setStatus('success'), 2000);
                  }}
                >
                  <Sparkles size={18} />
                  <span>{t('tool.generate')}</span>
                </Button3D>
              </GlassCard>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ResultCard status={status} originalImage={preview} resultImage={preview} onReset={() => setStatus('ready')} />
          </div>
        </ToolShell>
        <RelatedLinks />
      </main>
      <Footer />
    </div>
  );
}

