'use client';

import React, { useState } from 'react';
import {
    ArrowRight,
    Check,
    X,
    Upload,
    ChevronDown,
    Sparkles,
    Camera
} from 'lucide-react';
import { Button3D } from '@/components/ui/Button3D';
import { GlassCard } from '@/components/ui/GlassCard';
import SafeLink from '@/components/common/safe-link';
import Link from 'next/link';

interface HairstyleDetailViewProps {
    hairstyle: any;
}

export default function HairstyleDetailView({ hairstyle }: HairstyleDetailViewProps) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-slate-500">
                    <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                    {' > '}
                    <SafeLink href="/hairstyles-for-men" className="hover:text-indigo-600 transition-colors">Hairstyles for Men</SafeLink>
                    {' > '}
                    <span className="text-slate-900 font-medium">{hairstyle.name}</span>
                </div>

                {/* H1 Section */}
                <section className="mb-16 text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6">
                        {hairstyle.h1}
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {hairstyle.intro}
                    </p>
                    <p className="text-sm text-slate-500 max-w-3xl mx-auto mt-3">
                        {hairstyle.introZh}
                    </p>
                </section>

                {/* CTA + Upload Section */}
                <section className="mb-20">
                    <GlassCard className="max-w-2xl mx-auto p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
                                <Sparkles size={16} />
                                AI Face Shape Analysis
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                                Upload Your Photo
                            </h2>
                            <p className="text-slate-600">
                                AI analyzes your face shape and shows how {hairstyle.name} looks on you
                            </p>
                        </div>

                        <div className="space-y-4">
                            {!uploadedImage ? (
                                <label className="block">
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                                        <Upload className="mx-auto mb-4 text-slate-400" size={48} />
                                        <p className="text-sm font-medium text-slate-700 mb-1">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            JPG, PNG or WebP (max. 10MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative rounded-xl overflow-hidden">
                                        <img
                                            src={uploadedImage}
                                            alt="Uploaded"
                                            className="w-full h-auto max-h-96 object-contain"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button3D
                                            variant="gradient"
                                            className="flex-1 h-12"
                                            onClick={() => {
                                                window.location.href = `/#try-now`;
                                            }}
                                        >
                                            Try {hairstyle.name} Now
                                            <ArrowRight size={18} className="ml-2" />
                                        </Button3D>
                                        <button
                                            onClick={() => setUploadedImage(null)}
                                            className="px-4 h-12 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
                                        >
                                            Change Photo
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </GlassCard>
                </section>

                {/* AI Recommendation Module */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter mb-4">
                            AI Face Shape Recommendation
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Our AI analyzes thousands of face-hairstyle combinations to determine compatibility
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <GlassCard className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                                    <Check size={24} className="text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    ✅ Best Fit For
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {hairstyle.suitableFaceShapes.map((shape: any) => (
                                    <div key={shape} className="flex items-center gap-3 text-slate-700">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        <span className="font-medium">{shape} Face</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                                    <X size={24} className="text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    ⚠️ May Not Suit
                                </h3>
                            </div>
                            {hairstyle.notSuitableFaceShapes.length > 0 ? (
                                <div className="space-y-3">
                                    {hairstyle.notSuitableFaceShapes.map((shape: any) => (
                                        <div key={shape} className="flex items-center gap-3 text-slate-700">
                                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                                            <span className="font-medium">{shape} Face</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 italic">
                                    This style is versatile and works for most face shapes!
                                </p>
                            )}
                        </GlassCard>
                    </div>
                </section>

                {/* FAQ and internal linking removed for brevity here, should be similar to combination page */}
                <section className="py-16">
                    <GlassCard className="max-w-4xl mx-auto p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            Ready to Try {hairstyle.name}?
                        </h2>
                        <Button3D
                            variant="gradient"
                            className="px-8 h-14 font-bold text-base"
                            onClick={() => window.location.href = '/#try-now'}
                        >
                            Upload Photo & Try It Now
                            <ArrowRight size={20} className="ml-2" />
                        </Button3D>
                    </GlassCard>
                </section>

            </main>
        </div>
    );
}
