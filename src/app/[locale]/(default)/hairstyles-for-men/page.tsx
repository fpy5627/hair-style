import React from 'react';
import { Metadata } from 'next';
import { HAIR_TYPES, HAIR_LENGTHS, HAIR_TYPE_LABELS, HAIR_LENGTH_LABELS } from '@/data/mens-hairstyles-p-seo';
import { HairstyleLibraryGrid } from '@/components/blocks/hairstyle/HairstyleLibraryGrid';
import { Sparkles, ArrowRight } from 'lucide-react';
import SafeLink from '@/components/common/safe-link';
import { Button3D } from '@/components/ui/Button3D';

export const metadata: Metadata = {
    title: 'Hairstyles for Men - AI Guided Library | Hairnova AI',
    description: 'Explore thousands of hairstyles for men. Filter by hair type, length, and face shape. AI recommends the best look for you.',
};

export default function MensHairstyleHub() {
    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Mens Hairstyle</span> Hub
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        From fades to curls, find the perfect cut analyzed by AI specifically for your face shape.
                    </p>

                    {/* Category Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                                Browse by Hair Type
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {HAIR_TYPES.map(type => (
                                    <SafeLink key={type} href={`/hairstyles-for-men/${type}`}>
                                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:border-indigo-600 hover:text-indigo-600 transition-all">
                                            {HAIR_TYPE_LABELS[type].en}
                                        </button>
                                    </SafeLink>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-600 rounded-full" />
                                Browse by Length
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {HAIR_LENGTHS.map(length => (
                                    <SafeLink key={length} href={`/hairstyles-for-men/${length}`}>
                                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-all">
                                            {HAIR_LENGTH_LABELS[length].en}
                                        </button>
                                    </SafeLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <HairstyleLibraryGrid
                    initialGender="male"
                    title="All Men's Hairstyles"
                    description="Explore our full library of 500+ hairstyles."
                />

                {/* AI CTA */}
                <div className="mt-20 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[30px] text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles size={200} />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Unsure what suits you?</h2>
                    <p className="text-indigo-100 mb-8 max-w-xl mx-auto italic">
                        "The AI analysis was a game changer. I never thought a buzz cut would suit my square face until I saw the preview."
                    </p>
                    <SafeLink href="/ai-hairstyle-changer">
                        <Button3D variant="primary" className="bg-white text-indigo-600 border-white hover:bg-slate-50 px-10 h-14 font-bold">
                            Get Your Personal AI Recommendation
                        </Button3D>
                    </SafeLink>
                </div>
            </main>
        </div>
    );
}
