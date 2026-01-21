import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HAIR_TYPES, HAIR_LENGTHS, getCombinationSEO, HairType, HairLength } from '@/data/mens-hairstyles-p-seo';
import { HairstyleLibraryGrid } from '@/components/blocks/hairstyle/HairstyleLibraryGrid';
import { FAQSection } from '@/components/blocks/hairstyle/LandingComponents';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import SafeLink from '@/components/common/safe-link';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';

import { CategoryTryOnHeader } from '@/components/blocks/hairstyle/CategoryTryOnHeader';

interface Props {
    params: {
        locale: string;
        segment: string;
        length: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { segment, length, locale } = params;

    if (!HAIR_TYPES.includes(segment as any) || !HAIR_LENGTHS.includes(length as any)) {
        return { title: 'Page Not Found' };
    }

    const seo = getCombinationSEO(segment as HairType, length as HairLength);

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: `/${locale}/hairstyles-for-men/${segment}/${length}`,
        }
    };
}

export async function generateStaticParams() {
    const params: any[] = [];
    HAIR_TYPES.forEach(segment => {
        HAIR_LENGTHS.forEach(length => {
            params.push({ segment, length });
        });
    });
    return params;
}

export default function HairstyleCombinationPage({ params }: Props) {
    const { segment, length } = params;

    const isTypeValid = HAIR_TYPES.includes(segment as any);
    const isLengthValid = HAIR_LENGTHS.includes(length as any);

    if (!isTypeValid || !isLengthValid) {
        notFound();
    }

    const seo = getCombinationSEO(segment as HairType, length as HairLength);
    const label = `${length.charAt(0).toUpperCase() + length.slice(1)} ${segment.charAt(0).toUpperCase() + segment.slice(1)}`;

    return (
        <div className="min-h-screen bg-white">
            <CategoryTryOnHeader
                title={seo.h1}
                description={seo.intro}
                categoryLabel={label}
                categoryType="type" // Both are active
                segment={`${segment}/${length}`}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hairstyle Grid with Pre-applied Filters */}
                <HairstyleLibraryGrid
                    initialGender="male"
                    initialHairType={segment as any}
                    initialLength={length as any}
                    title="Hand-picked Styles for You"
                    description={`Discover the most popular ${length} ${segment} hairstyles for men, curated by our AI system.`}
                />

                {/* FAQ Section */}
                <section className="py-20 border-t border-slate-100">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-12">
                            FAQs for {segment} {length} Hair
                        </h2>
                        <div className="space-y-6">
                            {seo.faqs.map((faq, i) => (
                                <GlassCard key={i} className="p-6 border-white/40 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Internal Linking Hub */}
                <section className="py-20 border-t border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Browse Similar Collections</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Same Type, Different Lengths */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Same Texture, Other Lengths</h3>
                            <div className="flex flex-wrap gap-2">
                                {HAIR_LENGTHS.filter(l => l !== length).map(l => (
                                    <SafeLink key={l} href={`/hairstyles-for-men/${segment}/${l}`}>
                                        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                                            {l.charAt(0).toUpperCase() + l.slice(1)} {segment} Hair
                                        </button>
                                    </SafeLink>
                                ))}
                            </div>
                        </div>
                        {/* Same Length, Different Types */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Same Length, Other Textures</h3>
                            <div className="flex flex-wrap gap-2">
                                {HAIR_TYPES.filter(t => t !== segment).map(t => (
                                    <SafeLink key={t} href={`/hairstyles-for-men/${t}/${length}`}>
                                        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                                            {length.charAt(0).toUpperCase() + length.slice(1)} {t} Hair
                                        </button>
                                    </SafeLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
