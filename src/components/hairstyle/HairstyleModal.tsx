'use client';

import React from 'react';
import { X, Sparkles } from 'lucide-react';
import SafeLink from '@/components/common/safe-link';

interface HairstyleModalProps {
    isOpen: boolean;
    onClose: () => void;
    hairstyle: {
        id: number;
        name: string;
        image: string;
        gender: string;
        category: string;
        tags?: string[];
        suitableFaceShapes?: string[];
    } | null;
}

export const HairstyleModal: React.FC<HairstyleModalProps> = ({ isOpen, onClose, hairstyle }) => {
    if (!isOpen || !hairstyle) return null;

    // 准备两张图片（这里暂时用同一张图，实际应该来自数据）
    const images = [hairstyle.image, hairstyle.image];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 模态框内容 */}
            <div className="relative bg-white rounded-[32px] shadow-2xl max-w-4xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
                {/* 关闭按钮 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all hover:scale-110"
                >
                    <X size={20} />
                </button>

                {/* 图片区域 - 两张图片并排 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {images.map((img, index) => (
                        <div key={index} className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                            <img
                                src={img}
                                alt={`${hairstyle.name} - ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* 顶部渐变遮罩 */}
                            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

                            {/* 风格标签 - 只在第一张图显示 */}
                            {index === 0 && hairstyle.tags && hairstyle.tags.length > 0 && (
                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                                    <Sparkles size={12} />
                                    {hairstyle.tags[0]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 立即试戴按钮 - 横跨两张图片中央 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <SafeLink href="/ai-hairstyle-changer">
                        <button className="px-10 py-4 bg-white/70 backdrop-blur-xl text-slate-900 font-bold text-sm !rounded-[10px] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 pointer-events-auto">
                            立即试戴
                        </button>
                    </SafeLink>
                </div>

                {/* 信息区域 - 浅灰蓝背景 */}
                <div className="bg-slate-100/90 backdrop-blur-sm px-6 py-5">
                    {/* 发型名称 */}
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                        {hairstyle.name}
                    </h3>

                    {/* 适用脸型信息 */}
                    {hairstyle.suitableFaceShapes && hairstyle.suitableFaceShapes.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-slate-500 font-medium">适用：</span>
                            {hairstyle.suitableFaceShapes.map((shape, idx) => (
                                <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-white/70 text-slate-600 text-xs font-medium rounded-md"
                                >
                                    {shape}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
