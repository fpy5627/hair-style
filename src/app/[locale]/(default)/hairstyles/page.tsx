'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import SafeLink from '@/components/common/safe-link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FAQSection } from '@/components/blocks/hairstyle/LandingComponents';
import { HairstyleModal } from '@/components/hairstyle/HairstyleModal';

// Mock数据 - 500+发型库
const MOCK_BASE_DATA = [
    {
        id: 1,
        name: '空气刘海短发',
        category: 'short',
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
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop',
        popular: false,
        tags: ['浪漫', '优雅'],
        suitableFaceShapes: ['椭圆脸', '长脸', '菱形脸']
    },
    {
        id: 4,
        name: '寸头',
        category: 'short',
        gender: 'male',
        image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop',
        popular: true,
        tags: ['利落', '精神'],
        suitableFaceShapes: ['方脸', '椭圆脸']
    },
    {
        id: 5,
        name: '高马尾',
        category: 'long',
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=400&h=500&fit=crop',
        popular: false,
        tags: ['活力', '运动'],
        suitableFaceShapes: ['所有脸型']
    },
    {
        id: 6,
        name: '中分锁骨发',
        category: 'medium',
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop',
        popular: true,
        tags: ['清新', '知性'],
        suitableFaceShapes: ['鹅蛋脸', '长脸', '方脸']
    },
    {
        id: 7,
        name: '复古卷发',
        category: 'medium',
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400&h=500&fit=crop',
        popular: false,
        tags: ['复古', '优雅'],
        suitableFaceShapes: ['鹅蛋脸', '心形脸']
    },
    {
        id: 8,
        name: '背头',
        category: 'short',
        gender: 'male',
        image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop',
        popular: false,
        tags: ['型男', '杂志'],
        suitableFaceShapes: ['长脸', '方脸']
    },
    {
        id: 9,
        name: '齐肩波波头',
        category: 'medium',
        gender: 'female',
        image: 'https://images.unsplash.com/photo-1629114346-3e86f75e4b30?w=400&h=500&fit=crop',
        popular: true,
        tags: ['可爱', '甜美'],
        suitableFaceShapes: ['圆脸', '方脸', '鹅蛋脸']
    }
];

// 生成 504 个数据 (24 * 21)
const HAIRSTYLES_DATA = Array.from({ length: 504 }).map((_, index) => {
    const base = MOCK_BASE_DATA[index % MOCK_BASE_DATA.length];
    return {
        ...base,
        id: index + 1,
        // 稍微随机化热门程度
        popular: index % 7 === 0 || base.popular
    };
});

export default function HairstylesPage() {
    const t = useTranslations('hairstyle');

    const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
    const [selectedLength, setSelectedLength] = useState<'all' | 'short' | 'medium' | 'long'>('all');
    const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'newest'>('recommended');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHairstyle, setSelectedHairstyle] = useState<typeof HAIRSTYLES_DATA[0] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const handleHairstyleClick = (hairstyle: typeof HAIRSTYLES_DATA[0]) => {
        setSelectedHairstyle(hairstyle);
        setIsModalOpen(true);
    };

    // 筛选逻辑
    const filteredHairstyles = HAIRSTYLES_DATA.filter(item => {
        if (selectedGender !== 'all' && item.gender !== selectedGender) return false;
        if (selectedLength !== 'all' && item.category !== selectedLength) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'recommended') {
            // 推荐逻辑：热门且 ID 较新的排在前面
            return ((b.popular ? 1 : 0) - (a.popular ? 1 : 0)) || (b.id - a.id);
        }
        if (sortBy === 'popular') {
            return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        }
        return b.id - a.id;
    });

    const totalPages = Math.ceil(filteredHairstyles.length / itemsPerPage);
    const currentItems = filteredHairstyles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 筛选变动时重置页码
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedGender, selectedLength, sortBy]);

    // 分页页码生成逻辑
    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* 标题区 */}
                <div className="mb-16 text-center">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                        发型库｜探索 500+ 发型灵感
                    </h1>
                    <p className="text-sm md:text-base text-slate-500 font-medium mb-4">
                        从经典到潮流，找到最适合你的发型风格
                    </p>

                    {/* C) 二级入口链接 (弱化，用于 SEO) */}
                    <div className="flex justify-center items-center gap-6 mt-4 pb-4 border-b border-slate-100 max-w-lg mx-auto">
                        <SafeLink href="/hairstyles-for-men" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1.5 grayscale hover:grayscale-0">
                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                            男士发型库
                        </SafeLink>
                        <SafeLink href="/ai-hairstyle-female" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1.5 grayscale hover:grayscale-0">
                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                            女士发型库
                        </SafeLink>
                    </div>
                </div>

                {/* 筛选工具栏 */}
                <div className="mb-12 flex flex-wrap gap-6 items-center">
                    {/* 性别筛选 */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-400">性别:</span>
                        <div className="flex items-center gap-1 p-1 bg-slate-50/50 rounded-md">
                            <button
                                type="button"
                                onClick={() => setSelectedGender('all')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedGender === 'all'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                全部
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedGender('female')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedGender === 'female'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                女生
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedGender('male')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedGender === 'male'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                男生
                            </button>
                        </div>
                    </div>

                    {/* 长度筛选 */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-400">长度:</span>
                        <div className="flex items-center gap-1 p-1 bg-slate-50/50 rounded-md">
                            <button
                                type="button"
                                onClick={() => setSelectedLength('all')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedLength === 'all'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                所有
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedLength('short')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedLength === 'short'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                短发
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedLength('medium')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedLength === 'medium'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                中发
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedLength('long')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${selectedLength === 'long'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                长发
                            </button>
                        </div>
                    </div>

                    {/* 排序 */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-400">排序:</span>
                        <div className="flex items-center gap-1 p-1 bg-slate-50/50 rounded-md">
                            <button
                                type="button"
                                onClick={() => setSortBy('recommended')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${sortBy === 'recommended'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                推荐
                            </button>
                            <button
                                type="button"
                                onClick={() => setSortBy('popular')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${sortBy === 'popular'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                热门
                            </button>
                            <button
                                type="button"
                                onClick={() => setSortBy('newest')}
                                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-[8px] border transition-all ${sortBy === 'newest'
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-300'
                                    }`}
                            >
                                最新
                            </button>
                        </div>
                    </div>
                </div>

                {/* 发型网格 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-24">
                    {currentItems.map((hairstyle) => (
                        <div
                            key={hairstyle.id}
                            onClick={() => handleHairstyleClick(hairstyle)}
                            className="cursor-pointer"
                        >
                            <GlassCard className="rounded-[12px] group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                                {/* 图片容器 */}
                                <div className="aspect-[3/4] overflow-hidden relative bg-slate-100 rounded-t-[12px]">
                                    <img
                                        src={hairstyle.image}
                                        alt={hairstyle.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* 悬停遮罩层 */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    {/* 立即试戴按钮 - 悬停时显示 */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <SafeLink href="/ai-hairstyle-changer">
                                            <button className="px-5 py-2.5 bg-white/70 backdrop-blur-xl text-slate-900 font-bold text-[11px] !rounded-[10px] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 pointer-events-auto">
                                                立即试戴
                                            </button>
                                        </SafeLink>
                                    </div>

                                    {hairstyle.popular && (
                                        <div className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white text-[9px] font-black rounded uppercase tracking-wider shadow-lg flex items-center gap-1">
                                            <Sparkles size={10} />
                                            HOT
                                        </div>
                                    )}
                                </div>

                                {/* 发型信息 */}
                                <div className="p-4 bg-white/90 backdrop-blur-sm">
                                    <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                                        {hairstyle.name}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {hairstyle.gender === 'male' ? '男生' : '女生'} · {
                                            hairstyle.category === 'short' ? '短发' :
                                                hairstyle.category === 'medium' ? '中发' : '长发'
                                        }
                                    </p>
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* 分页组件 */}
                <div className="flex justify-center items-center gap-1.5 mb-32 select-none">
                    <button
                        onClick={() => {
                            setCurrentPage(prev => Math.max(1, prev - 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:text-slate-300 transition-colors"
                    >
                        上一页
                    </button>

                    <div className="flex items-center gap-1.5 mx-1">
                        {getPageNumbers().map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="w-9 h-9 flex items-center justify-center text-slate-400">...</span>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setCurrentPage(page as number);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`w-9 h-9 flex items-center justify-center text-sm font-bold rounded-[8px] transition-all duration-200 ${currentPage === page
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-slate-500 hover:bg-slate-100 hover:text-indigo-600'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setCurrentPage(prev => Math.min(totalPages, prev + 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:text-slate-300 transition-colors"
                    >
                        下一页
                    </button>
                </div>

                {/* 底部 CTA */}
                <div className="mb-24">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[20px] p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                            找到心仪的发型了吗？
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl mx-auto">
                            上传你的照片，立即查看这些发型在你脸上的效果
                        </p>
                        <div className="flex justify-center">
                            <SafeLink href="/ai-hairstyle-changer">
                                <Button3D variant="primary" className="px-12 h-14 text-lg font-bold">
                                    立即试发型 <ArrowRight size={20} />
                                </Button3D>
                            </SafeLink>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <FAQSection />
            </main>

            {/* 发型详情弹窗 */}
            <HairstyleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hairstyle={selectedHairstyle}
            />
        </div>
    );
}
