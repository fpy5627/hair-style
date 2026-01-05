'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { ResultCard } from '@/components/blocks/hairstyle/ResultCard';
import { HairstyleGrid } from '@/components/blocks/hairstyle/StyleSelector';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Sparkles, User } from 'lucide-react';
import { RelatedLinks } from '@/components/blocks/hairstyle/LandingComponents';

const MOCK_FEMALE_STYLES = [
  { id: 'f1', name: 'Long Waves', category: 'Long', preview: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop' },
  { id: 'f2', name: 'Curly Bob', category: 'Curly', preview: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=200&h=200&fit=crop' },
  { id: 'f3', name: 'Sleek Ponytail', category: 'Classic', preview: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200&h=200&fit=crop' },
  { id: 'f4', name: 'French Braid', category: 'Trendy', preview: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=200&h=200&fit=crop' },
  { id: 'f5', name: 'Pixie Cut', category: 'Short', preview: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=200&h=200&fit=crop' },
  { id: 'f6', name: 'Balayage', category: 'Trendy', preview: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=200&h=200&fit=crop' },
];

/**
 * 女士发型页
 */
export default function HairstyleFemalePage() {
  const t = useTranslations('hairstyle');
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HairstyleHeader />
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <ToolShell 
          title={t('nav.female')} 
          subtitle="Discover elegant and trendy hairstyles for women. Find your perfect look for any occasion."
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
                  <User size={18} className="text-purple-600" />
                  <h3 className="font-bold text-slate-900">Women's Style Gallery</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <HairstyleGrid 
                    styles={MOCK_FEMALE_STYLES} 
                    selectedStyleId={selectedStyle} 
                    onStyleSelect={setSelectedStyle} 
                  />
                </div>
                <Button3D 
                  variant="primary" 
                  className="w-full bg-gradient-to-b from-purple-500 to-purple-600 shadow-[0_4px_0_0_#7e22ce] hover:shadow-[0_6px_0_0_#7e22ce]"
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

