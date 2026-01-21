'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeroCarouselProps {
    className?: string;
}

// 男士发型轮播图数据
const MENS_HAIRSTYLES_SLIDES = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=600&h=800&fit=crop',
        title: 'Buzz Cut',
        faceShape: 'Oval',
        tags: ['Short', 'Low Maintenance']
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&h=800&fit=crop',
        title: 'Fade',
        faceShape: 'Square',
        tags: ['Modern', 'Versatile']
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&h=800&fit=crop',
        title: 'Pompadour',
        faceShape: 'Diamond',
        tags: ['Classic', 'Formal']
    }
];

export function HeroCarousel({ className }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // 下一张
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % MENS_HAIRSTYLES_SLIDES.length);
    }, []);

    // 上一张
    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + MENS_HAIRSTYLES_SLIDES.length) % MENS_HAIRSTYLES_SLIDES.length);
    }, []);

    // 跳转到指定张
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // 自动播放
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 4000); // 4秒切换

        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    const currentData = MENS_HAIRSTYLES_SLIDES[currentSlide];

    return (
        <div
            className={cn('relative', className)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* 主卡片容器 */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 overflow-hidden">

                {/* 顶部标签 */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-[8px] text-xs font-medium border border-indigo-100">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                        AI 换发型效果演示
                    </div>
                    <div className="text-xs text-slate-500">
                        {currentSlide + 1} / {MENS_HAIRSTYLES_SLIDES.length}
                    </div>
                </div>

                {/* 轮播图片区域 */}
                <div className="relative h-[400px] rounded-[16px] overflow-hidden bg-slate-100">
                    {/* 图片 */}
                    <div className="relative w-full h-full">
                        <img
                            src={currentData.image}
                            alt={currentData.title}
                            className="w-full h-full object-cover transition-opacity duration-500"
                        />

                        {/* 渐变遮罩 */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* 左右箭头 */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200 rounded-[8px] flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-lg transition-all hover:scale-110 active:scale-95"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200 rounded-[8px] flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-lg transition-all hover:scale-110 active:scale-95"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* 底部信息卡片 - 一半悬浮在图片上 */}
                <div className="relative px-4 -mt-12">
                    <div className="bg-white/60 backdrop-blur-xl rounded-[10px] p-2.5 shadow-lg border border-white/40">
                        <div className="flex items-center justify-between mb-1.5">
                            <h3 className="text-base font-bold text-slate-900">{currentData.title}</h3>
                            <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-medium rounded-[4px] border border-emerald-200">
                                BEST MATCH
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-[10px] text-slate-500">Face Shape:</span>
                            <span className="text-[11px] font-medium text-slate-700">{currentData.faceShape}</span>
                        </div>

                        <div className="flex gap-1.5">
                            {currentData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-[4px]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 圆点指示器 */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {MENS_HAIRSTYLES_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                'h-2 rounded-full transition-all duration-300',
                                currentSlide === index
                                    ? 'w-8 bg-indigo-600'
                                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* 描述文字 */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500">
                        基于脸型分析生成的男士发型预览
                    </p>
                </div>
            </div>
        </div>
    );
}
