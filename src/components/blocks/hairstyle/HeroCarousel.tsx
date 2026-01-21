'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    // 下一张
    const nextSlide = useCallback(() => {
        setDirection('right');
        setCurrentSlide((prev) => (prev + 1) % MENS_HAIRSTYLES_SLIDES.length);
    }, []);

    // 上一张
    const prevSlide = useCallback(() => {
        setDirection('left');
        setCurrentSlide((prev) => (prev - 1 + MENS_HAIRSTYLES_SLIDES.length) % MENS_HAIRSTYLES_SLIDES.length);
    }, []);

    // 跳转到指定张
    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 'right' : 'left');
        setCurrentSlide(index);
    };

    // 自动播放
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % MENS_HAIRSTYLES_SLIDES.length);
        }, 5000); // 5秒切换

        return () => clearInterval(timer);
    }, [isAutoPlaying, currentSlide]); // 添加 currentSlide 确保每次切换后重新设置定时器


    const currentData = MENS_HAIRSTYLES_SLIDES[currentSlide];

    return (
        <div
            className={cn('relative', className)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* 外层磨砂玻璃卡片 */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[20px] p-4 md:p-6 shadow-[0_20px_80px_rgba(15,23,42,0.15)] relative group">
                {/* 装饰性背景光晕 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                {/* 主卡片容器 */}
                <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-5 overflow-hidden">

                    {/* 顶部标签 */}
                    <div className="mb-4 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-[10px] text-xs font-bold border border-indigo-100">
                            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                            AI 换发型效果演示
                        </div>
                        <div className="text-sm font-bold text-slate-600">
                            {currentSlide + 1} / {MENS_HAIRSTYLES_SLIDES.length}
                        </div>
                    </div>

                    {/* 轮播图片区域 */}
                    <div className="relative h-[420px] rounded-[16px] overflow-hidden bg-slate-100 group">
                        {/* 图片容器 - 使用绝对定位实现淡入淡出 */}
                        <div className="relative w-full h-full">
                            {MENS_HAIRSTYLES_SLIDES.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={cn(
                                        'absolute inset-0 w-full h-full transition-all duration-700 ease-in-out',
                                        index === currentSlide
                                            ? 'opacity-100 scale-100 z-10'
                                            : 'opacity-0 scale-105 z-0'
                                    )}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}

                            {/* 渐变遮罩 */}
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20" />
                        </div>

                        {/* 左右箭头 - 悬停时显示 */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200/50 rounded-[10px] flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-lg transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 z-30"
                            aria-label="上一张"
                        >
                            <ChevronLeft size={22} strokeWidth={2.5} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200/50 rounded-[10px] flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-lg transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 z-30"
                            aria-label="下一张"
                        >
                            <ChevronRight size={22} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* 底部信息卡片 - 一半悬浮在图片上 */}
                    <div className="relative px-4 -mt-14 z-50">
                        <div className="bg-white/70 backdrop-blur-xl rounded-[12px] p-3.5 shadow-xl border border-white/80">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-slate-900">{currentData.title}</h3>
                                <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-[6px] border border-emerald-200">
                                    BEST MATCH
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-2.5">
                                <span className="text-xs text-slate-500 font-medium">Face Shape:</span>
                                <span className="text-sm font-bold text-slate-700">{currentData.faceShape}</span>
                            </div>

                            <div className="flex gap-2">
                                {currentData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-[6px] border border-slate-200/50"
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
                                        ? 'w-10 bg-indigo-600'
                                        : 'w-2 bg-slate-300 hover:bg-slate-400 active:scale-90'
                                )}
                                aria-label={`跳转到第 ${index + 1} 张`}
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
        </div>
    );
}
