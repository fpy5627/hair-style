'use client';

import React, { useState } from 'react';
import { UploadCard } from './UploadCard';
import { Camera, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Button3D } from '@/components/ui/Button3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import SafeLink from '@/components/common/safe-link';
import { useTranslations } from 'next-intl';

interface CategoryTryOnHeaderProps {
    title: string;
    description: string;
    categoryLabel: string;
    categoryType: 'type' | 'length';
    segment: string;
}

export const CategoryTryOnHeader = ({
    title,
    description,
    categoryLabel,
    segment
}: CategoryTryOnHeaderProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [done, setDone] = useState(false);

    const handleUpload = (file: File) => {
        const url = URL.createObjectURL(file);
        setPreview(url);
        setIsAnalyzing(true);
        setDone(false);

        // Simulate AI analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setDone(true);
        }, 2000);
    };

    const handleClear = () => {
        setPreview(null);
        setIsAnalyzing(false);
        setDone(false);
    };

    const t = useTranslations('hairstyle.category_header');

    return (
        <div className="w-full bg-gradient-to-b from-indigo-50/50 via-white to-transparent py-16 md:py-24 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: SEO Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={14} />
                            {t('badge')}
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                                {title}
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                {description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <SafeLink href="/ai-hairstyle-changer">
                                <Button3D variant="primary" className="h-14 px-8 font-bold">
                                    <Camera className="mr-2" size={20} />
                                    {t('virtual_tryon')}
                                </Button3D>
                            </SafeLink>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {t('styles_available')}
                            </div>
                        </div>
                    </div>

                    {/* Right: Lite Upload Experience */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
                        <GlassCard className="relative overflow-hidden border-white/60 shadow-2xl shadow-indigo-500/10">
                            <div className="flex flex-col">
                                <div className="p-4 border-b border-slate-100/50 bg-white/50 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('tryon_experience')}</span>
                                    {preview && (
                                        <div className="flex items-center gap-2">
                                            {isAnalyzing ? (
                                                <div className="flex items-center gap-1.5 text-indigo-600">
                                                    <Loader2 size={12} className="animate-spin" />
                                                    <span className="text-[10px] font-bold">{t('ai_analyzing')}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-emerald-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    <span className="text-[10px] font-bold">{t('analysis_ready')}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="aspect-[4/3] relative">
                                    {!preview ? (
                                        <UploadCard
                                            onUpload={handleUpload}
                                            onClear={handleClear}
                                            preview={preview}
                                        />
                                    ) : (
                                        <div className="w-full h-full p-4 relative bg-slate-50/50">
                                            <div className="w-full h-full rounded-lg overflow-hidden ring-1 ring-slate-200 relative group">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className={cn(
                                                        "w-full h-full object-cover transition-all duration-700",
                                                        isAnalyzing ? "blur-sm grayscale" : "blur-0 grayscale-0"
                                                    )}
                                                />

                                                {isAnalyzing && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                                                        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden mb-4">
                                                            <div className="h-full bg-indigo-600 animate-[loading_2s_ease-in-out_infinite]" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-800 tracking-tighter uppercase">{t('scanning_face')}</span>
                                                    </div>
                                                )}

                                                {done && (
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                                                        <h4 className="text-white font-black mb-2">{t('ready_for', { category: categoryLabel })}</h4>
                                                        <p className="text-white/80 text-xs mb-6">{t('analyzed_for', { segment })}</p>
                                                        <SafeLink href="/ai-hairstyle-changer">
                                                            <Button3D variant="primary" className="w-full h-11 text-xs">
                                                                {t('see_results')}
                                                                <ArrowRight size={14} className="ml-2" />
                                                            </Button3D>
                                                        </SafeLink>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={handleClear}
                                                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-slate-600 shadow-lg hover:text-red-500 transition-colors z-20"
                                                >
                                                    <ArrowRight className="rotate-180" size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 bg-indigo-50/30 border-t border-slate-100/50">
                                    <p className="text-[10px] text-slate-500 text-center leading-tight">
                                        {t('privacy_notice')}
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};
