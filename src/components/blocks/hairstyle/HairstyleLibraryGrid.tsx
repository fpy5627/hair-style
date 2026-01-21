'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import SafeLink from '@/components/common/safe-link';
import { HairstyleModal } from '@/components/hairstyle/HairstyleModal';
import { cn } from '@/lib/utils';

interface Hairstyle {
    id: number;
    name: string;
    category: string;
    gender: string;
    image: string;
    popular: boolean;
    tags: string[];
    suitableFaceShapes: string[];
    hairType?: string;
}

interface HairstyleLibraryGridProps {
    initialGender?: 'all' | 'male' | 'female';
    initialLength?: 'all' | 'short' | 'medium' | 'long';
    initialHairType?: 'all' | 'curly' | 'straight' | 'wavy';
    title?: string;
    description?: string;
    hideFilters?: boolean;
}

// Mock数据生成逻辑 (从原 page.tsx 移植)
const MOCK_BASE_DATA = [
    {
        id: 1,
        name: '空气刘海短发',
        category: 'short',
        hairType: 'straight',
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop',
        popular: true,
        tags: ['时尚', '甜美'],
        suitableFaceShapes: ['鹅蛋脸', '圆脸', '心形脸']
    },
    {
        id: 2,
        name: '侧分油头',
        category: 'short',
        hairType: 'straight',
        gender: 'male',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop',
        popular: true,
        tags: ['经典', '商务'],
        suitableFaceShapes: ['方脸', '长脸']
    },
    {
        id: 3,
        name: '波浪长发',
        category: 'long',
        hairType: 'wavy',
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop',
        popular: false,
        tags: ['浪漫', '优雅'],
        suitableFaceShapes: ['椭圆脸', '长脸', '菱形脸']
    },
    {
        id: 4,
        name: '卷发短发',
        category: 'short',
        hairType: 'curly',
        gender: 'male',
        image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=400&h=500&fit=crop',
        popular: true,
        tags: ['利落', '精神'],
        suitableFaceShapes: ['方脸', '椭圆脸']
    },
    {
        id: 5,
        name: '中长卷发',
        category: 'medium',
        hairType: 'curly',
        gender: 'male',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop',
        popular: true,
        tags: ['个性', '时尚'],
        suitableFaceShapes: ['长脸', '菱形脸']
    }
];

const HAIRSTYLES_DATA = Array.from({ length: 200 }).map((_, index) => {
    const base = MOCK_BASE_DATA[index % MOCK_BASE_DATA.length];
    return {
        ...base,
        id: index + 1,
        popular: index % 7 === 0 || base.popular
    };
});

export const HairstyleLibraryGrid = ({
    initialGender = 'all',
    initialLength = 'all',
    initialHairType = 'all',
    title,
    description,
    hideFilters = false
}: HairstyleLibraryGridProps) => {
    const [selectedGender, setSelectedGender] = useState(initialGender);
    const [selectedLength, setSelectedLength] = useState(initialLength);
    const [selectedHairType, setSelectedHairType] = useState(initialHairType);
    const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHairstyle, setSelectedHairstyle] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const t = useTranslations('hairstyle.library');

    const handleHairstyleClick = (hairstyle: any) => {
        setSelectedHairstyle(hairstyle);
        setIsModalOpen(true);
    };

    const filteredHairstyles = HAIRSTYLES_DATA.filter(item => {
        if (selectedGender !== 'all' && item.gender !== selectedGender) return false;
        if (selectedLength !== 'all' && item.category !== selectedLength) return false;
        if (selectedHairType !== 'all' && item.hairType !== selectedHairType) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'popular') {
            return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        }
        return b.id - a.id;
    });

    const totalPages = Math.ceil(filteredHairstyles.length / itemsPerPage);
    const currentItems = filteredHairstyles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGender, selectedLength, selectedHairType, sortBy]);

    return (
        <section className="py-12">
            {(title || description) && (
                <div className="mb-12 text-center">
                    {title && <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{title}</h2>}
                    {description && <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>}
                </div>
            )}

            {!hideFilters && (
                <div className="mb-12 flex flex-wrap gap-6 items-center justify-center lg:justify-start">
                    {/* 性别筛选 */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('filter_gender')}</span>
                        <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                            {['all', 'male', 'female'].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setSelectedGender(g as any)}
                                    className={cn(
                                        "px-4 py-2 text-xs font-semibold rounded-md transition-all",
                                        selectedGender === g
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                                    )}
                                >
                                    {g === 'all' ? t('gender_all') : (g === 'male' ? t('gender_male') : t('gender_female'))}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 长度筛选 */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('filter_length')}</span>
                        <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                            {['all', 'short', 'medium', 'long'].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setSelectedLength(l as any)}
                                    className={cn(
                                        "px-4 py-2 text-xs font-semibold rounded-md transition-all",
                                        selectedLength === l
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                                    )}
                                >
                                    {l === 'all' ? t('length_all') : (l === 'short' ? t('length_short') : (l === 'medium' ? t('length_medium') : t('length_long')))}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 发质筛选 */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('filter_type')}</span>
                        <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                            {['all', 'straight', 'wavy', 'curly'].map((hairType) => (
                                <button
                                    key={hairType}
                                    onClick={() => setSelectedHairType(hairType as any)}
                                    className={cn(
                                        "px-4 py-2 text-xs font-semibold rounded-md transition-all",
                                        selectedHairType === hairType
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                                    )}
                                >
                                    {hairType === 'all' ? t('type_all') : (hairType === 'straight' ? t('type_straight') : (hairType === 'wavy' ? t('type_wavy') : t('type_curly')))}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {currentItems.map((hairstyle) => (
                    <div
                        key={hairstyle.id}
                        onClick={() => handleHairstyleClick(hairstyle)}
                        className="cursor-pointer group"
                    >
                        <GlassCard className="rounded-[16px] overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-white/40">
                            <div className="aspect-[3/4] overflow-hidden relative bg-slate-100">
                                <img
                                    src={hairstyle.image}
                                    alt={hairstyle.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <SafeLink href="/ai-hairstyle-changer">
                                        <button className="px-6 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            {t('try_now')}
                                        </button>
                                    </SafeLink>
                                </div>
                                {hairstyle.popular && (
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-indigo-600 text-white text-[9px] font-black rounded uppercase tracking-wider shadow-lg flex items-center gap-1">
                                        <Sparkles size={10} />
                                        {t('badge_hot')}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-white/10 backdrop-blur-md">
                                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                                    {hairstyle.name}
                                </h3>
                                <p className="text-[11px] text-slate-500 uppercase font-bold tracking-tight">
                                    {hairstyle.gender} · {hairstyle.category} · {hairstyle.hairType}
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                        {t('pagination_previous')}
                    </button>
                    <div className="text-sm font-medium text-slate-500">
                        {t('pagination_page', { current: currentPage, total: totalPages })}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                        {t('pagination_next')}
                    </button>
                </div>
            )}

            <HairstyleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hairstyle={selectedHairstyle}
            />
        </section>
    );
};
