'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { ResultCard } from '@/components/blocks/hairstyle/ResultCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Sparkles, Layers, Smile } from 'lucide-react';
import { RelatedLinks } from '@/components/blocks/hairstyle/LandingComponents';
import { cn } from '@/lib/utils';

export default function BeautyFiltersPage() {
  const t_tool = useTranslations('hairstyle.tool');
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = [
    { id: 'natural', name: 'Natural', icon: <Smile size={16} /> },
    { id: 'vivid', name: 'Vivid', icon: <Sparkles size={16} /> },
    { id: 'soft', name: 'Soft Glow', icon: <Layers size={16} /> },
    { id: 'glam', name: 'Glamour', icon: <Sparkles size={16} /> },
  ];

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setStatus('ready');
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HairstyleHeader />
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <ToolShell 
          title={useTranslations('hairstyle.landing.more_tools')('filters')}
          subtitle="Enhance your photos with professional AI beauty filters."
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <UploadCard 
                preview={preview} 
                onUpload={handleUpload} 
                onClear={() => { setPreview(null); setStatus('idle'); }} 
              />
              <GlassCard className="p-8 flex flex-col space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Select Filter</h3>
                  <p className="text-sm text-slate-500">Choose an AI filter to enhance your look.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                        selectedFilter === f.id ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm" : "border-slate-100 hover:border-blue-200 text-slate-600"
                      )}
                    >
                      {f.icon}
                      <span className="text-xs font-bold">{f.name}</span>
                    </button>
                  ))}
                </div>

                <Button3D 
                  variant="primary" 
                  className="w-full py-4 mt-auto"
                  disabled={status === 'loading' || !preview || !selectedFilter}
                  onClick={() => {
                    setStatus('loading');
                    setTimeout(() => setStatus('success'), 2000);
                  }}
                >
                  <Sparkles size={18} />
                  <span>Apply Filter</span>
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

