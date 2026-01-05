'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HairstyleHeader } from '@/components/blocks/hairstyle/HairstyleHeader';
import { Footer } from '@/components/blocks/Footer';
import { ToolShell } from '@/components/blocks/hairstyle/ToolShell';
import { UploadCard } from '@/components/blocks/hairstyle/UploadCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Sparkles, Brain, CheckCircle2, ArrowRight } from 'lucide-react';
import { RelatedLinks } from '@/components/blocks/hairstyle/LandingComponents';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

/**
 * 发型推荐页
 */
export default function SuitsMePage() {
  const t = useTranslations('hairstyle');
  const tr = useTranslations('hairstyle.recommend');
  
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{ shape: string; style: string } | null>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setStep(2);
    
    // 模拟分析过程
    setTimeout(() => {
      setAnalysis({
        shape: 'Oval',
        style: 'Side Part Pompadour'
      });
      setStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HairstyleHeader />
      
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <ToolShell 
          title={tr('title')} 
          subtitle="Our AI analyzes your unique facial features to recommend the most flattering hairstyles for you."
        >
          <div className="lg:col-span-12">
            {/* Step Indicator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                      step >= s ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-300 border border-slate-200"
                    )}>
                      {step > s ? <CheckCircle2 size={20} /> : s}
                    </div>
                    {s < 3 && <div className={cn("w-12 h-0.5", step > s ? "bg-blue-600" : "bg-slate-200")} />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {step === 1 && (
                <div className="space-y-6">
                  <UploadCard preview={preview} onUpload={handleUpload} onClear={() => setPreview(null)} />
                  <div className="text-center text-xs text-slate-400">
                    <p>Your photo is processed locally and never stored on our servers.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <GlassCard className="p-12 text-center space-y-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                      <Brain size={32} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{tr('analyze')}</h3>
                    <p className="text-sm text-slate-500">Detecting face shape, jawline, and forehead ratio...</p>
                  </div>
                  {preview && (
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl relative">
                      <img src={preview} className="w-full h-full object-cover" alt="Analyzing" />
                      <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                    </div>
                  )}
                </GlassCard>
              )}

              {step === 3 && analysis && (
                <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                  <GlassCard className="p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Sparkles size={120} className="text-blue-600" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                      <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3">
                        {preview && <img src={preview} className="w-full h-full object-cover" alt="Analyzed" />}
                      </div>
                      
                      <div className="flex-1 space-y-6 text-center md:text-left">
                        <div className="space-y-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">Analysis Result</span>
                          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                            {tr('result', { shape: analysis.shape, style: analysis.style })}
                          </h2>
                        </div>
                        
                        <p className="text-base text-slate-500 leading-relaxed">
                          Your <span className="text-slate-900 font-semibold">{analysis.shape}</span> face shape is best complemented by styles that add volume at the top while keeping the sides clean. The <span className="text-slate-900 font-semibold">{analysis.style}</span> will perfectly balance your features.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href="/ai-hairstyle-changer">
                            <Button3D variant="primary" className="w-full">
                              Try This Style Now <ArrowRight size={18} />
                            </Button3D>
                          </Link>
                          <Button3D variant="outline" onClick={() => setStep(1)} className="w-full">
                            Analyze Again
                          </Button3D>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Recommended styles grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <GlassCard key={i} className="aspect-[3/4] group cursor-pointer overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=300&h=400&fit=crop`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          alt="Recommended"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold uppercase tracking-wider">Alternative Style {i}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ToolShell>

        <RelatedLinks />
      </main>

      <Footer />
    </div>
  );
}

