'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button3D } from '@/components/ui/Button3D';
import { SafeLink } from '@/components/common/safe-link';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HairstyleItem {
    id: number;
    name: string;
    badge: 'BEST MATCH' | 'AI RECOMMENDED' | 'TRENDING' | 'NEW';
    badgeColor: 'blue' | 'indigo' | 'purple' | 'emerald';
    image: string;
}

const DISPLAY_ITEMS: HairstyleItem[] = [
    { id: 1, name: '空气刘海短发', badge: 'BEST MATCH', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop' },
    { id: 2, name: '侧分油头', badge: 'AI RECOMMENDED', badgeColor: 'indigo', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop' },
    { id: 3, name: '波浪长发', badge: 'TRENDING', badgeColor: 'purple', image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop' },
    { id: 4, name: '寸头', badge: 'BEST MATCH', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop' },
    { id: 5, name: '高马尾', badge: 'NEW', badgeColor: 'emerald', image: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=400&h=500&fit=crop' },
    { id: 6, name: '中分锁骨发', badge: 'AI RECOMMENDED', badgeColor: 'indigo', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop' },
    { id: 7, name: '复古卷发', badge: 'TRENDING', badgeColor: 'purple', image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400&h=500&fit=crop' },
    { id: 8, name: '背头', badge: 'AI RECOMMENDED', badgeColor: 'indigo', image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop' },
    { id: 9, name: '齐肩波波头', badge: 'BEST MATCH', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1629114346-3e86f75e4b30?w=400&h=500&fit=crop' },
    { id: 10, name: 'Undercut', badge: 'TRENDING', badgeColor: 'purple', image: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=500&fit=crop' },
    { id: 11, name: '法式慵懒卷', badge: 'NEW', badgeColor: 'emerald', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=500&fit=crop' },
    { id: 12, name: '飞机头', badge: 'AI RECOMMENDED', badgeColor: 'indigo', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop' }
];

export const HomeHairstyleShowcase = React.forwardRef<HTMLDivElement>((_, ref) => {
    const t = useTranslations('hairstyle.home_showcase');

    return (
        <section ref={ref} className="py-24 bg-white border-t border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                            {t('title')}
                            <Sparkles className="text-indigo-500 animate-pulse hidden md:block" size={32} />
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                    <SafeLink href="/hairstyles" className="shrink-0 flex justify-center">
                        <Button3D variant="outlinePrimary" radius="xl" className="h-14 px-10 font-bold text-sm shadow-sm hover:shadow-xl transition-all group">
                            {t('view_all')}
                            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button3D>
                    </SafeLink>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {DISPLAY_ITEMS.map((hairstyle) => (
                        <div
                            key={hairstyle.id}
                            className="group cursor-pointer rounded-[14px] overflow-hidden bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="aspect-[3/4] overflow-hidden relative bg-slate-50 rounded-t-[14px]">
                                <img
                                    src={hairstyle.image}
                                    alt={hairstyle.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Left Top Badge */}
                                <div className={cn(
                                    "absolute top-4 left-4 px-2.5 py-1 rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-lg z-10",
                                    hairstyle.badgeColor === 'blue' && "bg-blue-500 text-white",
                                    hairstyle.badgeColor === 'indigo' && "bg-indigo-600 text-white",
                                    hairstyle.badgeColor === 'purple' && "bg-purple-600 text-white",
                                    hairstyle.badgeColor === 'emerald' && "bg-emerald-500 text-white"
                                )}>
                                    {hairstyle.badge}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Action Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <SafeLink href="/ai-hairstyle-changer">
                                        <button className="px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-900 font-bold text-[12px] !rounded-[12px] shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300">
                                            {t('try_now')}
                                        </button>
                                    </SafeLink>
                                </div>
                            </div>
                            <div className="p-4 md:p-5">
                                <h4 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-indigo-600 transition-colors truncate">
                                    {hairstyle.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

HomeHairstyleShowcase.displayName = 'HomeHairstyleShowcase';
