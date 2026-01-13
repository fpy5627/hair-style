
import React, { useState } from 'react';
import { Sparkles, Download, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HAIR_COLORS } from '@/lib/homeSectionsData';

/**
 * AI 推荐结果面板 - 高端顾问式展示
 */
export const RecommendationResultPanel = ({
    resultImage,
    faceShape,
    onBack,
    gender,
    onGenderChange,
    selectedColor,
    onColorChange,
    similarStyles,
    isMobile
}: {
    resultImage: string;
    faceShape: string;
    onBack: () => void;
    gender: 'male' | 'female';
    onGenderChange: (g: 'male' | 'female') => void;
    selectedColor: string;
    onColorChange: (c: string) => void;
    similarStyles: any[];
    isMobile: boolean;
}) => {
    const [showColorPanel, setShowColorPanel] = useState(false);

    return (
        <div className="relative overflow-visible animate-in fade-in slide-in-from-right duration-500">
            {/* Glow Effects */}
            <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 bg-purple-200/40 blur-[60px] rounded-full mix-blend-multiply" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 bg-indigo-200/40 blur-[60px] rounded-full mix-blend-multiply" />

            {/* Main Card */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/60 overflow-hidden relative z-10 transition-all">

                {/* 1. Header Area - 极简高雅的结论展示 */}
                <div className="pt-8 px-8 pb-6 text-center space-y-2">
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100/50 mb-2 shadow-sm">
                        <Sparkles size={12} className="text-indigo-500" />
                        <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest">AI Analysis Complete</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        Here is your look
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                        Based on your <span className="text-indigo-600 font-semibold border-b border-indigo-200 pb-0.5">{faceShape}</span> face shape
                    </p>
                </div>

                {/* 2. Main Result - 视觉焦点 */}
                <div className="px-6 pb-6">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-slate-100 group">
                        <img
                            src={resultImage}
                            alt="Best Match"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Best Match Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-lg text-white text-[10px] font-bold tracking-widest flex items-center gap-1.5 shadow-xl border border-white/10">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            BEST MATCH
                        </div>

                        {/* Subtle Controls Overlay - 仅在 Hover 时显示操作，保持画面纯净 */}
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent flex justify-center pb-6">
                            <button className="px-5 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                                <Download size={14} />
                                Save Image
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Secondary Recommendations - 弱化展示 */}
                <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">You might also like</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {similarStyles.map((style, idx) => (
                            <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-slate-100 hover:border-indigo-300 transition-colors relative group cursor-pointer">
                                <img src={style.preview} className="w-full h-full object-cover" alt="Alt" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-[10px] text-white font-medium border border-white/50 px-2 py-1 rounded backdrop-blur-sm">View</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Controls Area - 底部控制台 */}
                <div className="bg-slate-50/80 backdrop-blur-md border-t border-slate-100 p-6 space-y-5">

                    {/* Gender Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Model Gender</span>
                        <div className="flex bg-slate-200/50 p-1 rounded-lg">
                            <button
                                onClick={() => onGenderChange('female')}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-[10px] font-bold transition-all",
                                    gender === 'female' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Women
                            </button>
                            <button
                                onClick={() => onGenderChange('male')}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-[10px] font-bold transition-all",
                                    gender === 'male' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Men
                            </button>
                        </div>
                    </div>

                    {/* Color Picker */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">Hair Color</span>
                            <button
                                onClick={() => setShowColorPanel(!showColorPanel)}
                                className="text-[10px] text-indigo-600 font-bold hover:underline"
                            >
                                {showColorPanel ? 'Hide Options' : 'Edit Color'}
                            </button>
                        </div>

                        {/* Preview of current color or expanded list */}
                        <div className={cn("grid gap-3 transition-all", showColorPanel ? "grid-cols-5" : "grid-cols-5")}>
                            {(showColorPanel ? HAIR_COLORS.basic : HAIR_COLORS.basic.slice(0, 5)).map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => onColorChange(color.id)}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-all mx-auto",
                                        selectedColor === color.id
                                            ? "border-indigo-500 scale-110 shadow-md ring-2 ring-indigo-100 ring-offset-1"
                                            : "border-transparent hover:scale-105 hover:border-slate-200"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                    aria-label={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                        <button
                            onClick={onBack}
                            className="flex-1 h-11 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors hover:shadow-sm"
                        >
                            Start Over
                        </button>
                        <button className="flex-1 h-11 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                            <Download size={14} />
                            Download
                        </button>
                    </div>
                </div>
            </div>

            {/* Try with your photo CTA */}
            <div className="mt-6 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                    Not satisfied? <button onClick={onBack} className="text-indigo-500 hover:underline">Try uploading a different photo</button>
                </p>
            </div>

        </div>
    );
};
