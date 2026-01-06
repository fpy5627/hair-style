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
import { Sparkles, Scissors, Wand2 } from 'lucide-react';
import { RelatedLinks } from '@/components/blocks/hairstyle/LandingComponents';

export default function HairDesignPage() {
  const t = useTranslations('hairstyle');
  const t_tool = useTranslations('hairstyle.tool');
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success'>('idle');
  const [preview, setPreview] = useState<string | null>(null);

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
          title={useTranslations('hairstyle.landing.more_tools')('hair_design')}
          subtitle="Unleash your creativity with AI-powered custom hair design."
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <UploadCard 
                preview={preview} 
                onUpload={handleUpload} 
                onClear={() => { setPreview(null); setStatus('idle'); }} 
              />
              <GlassCard className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Wand2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">AI Design Prompt</h3>
                  <p className="text-sm text-slate-500">Describe your dream hairstyle and let AI create it for you.</p>
                </div>
                <textarea 
                  className="w-full h-32 p-4 bg-slate-100/50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="e.g. A futuristic cyber-punk neon blue bob with sharp edges..."
                />
                <Button3D 
                  variant="primary" 
                  className="w-full py-4"
                  disabled={status === 'loading' || !preview}
                  onClick={() => {
                    setStatus('loading');
                    setTimeout(() => setStatus('success'), 3000);
                  }}
                >
                  <Sparkles size={18} />
                  <span>{t_tool('generate')}</span>
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

