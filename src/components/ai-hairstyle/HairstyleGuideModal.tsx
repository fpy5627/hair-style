'use client';

import React from 'react';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  CheckCircle,
  AlertCircle,
  Info,
  Camera,
  Lightbulb
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ComparisonSection } from './ComparisonSection';
import { useTranslations } from 'next-intl';

interface HairstyleGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * AI 发型拍照指南模态框
 * 采用现代轻量化设计，具有高度限制和内部滚动机制
 */
export const HairstyleGuideModal = ({ open, onOpenChange }: HairstyleGuideModalProps) => {
  const t = useTranslations('hairstyle.guide');

  const correctRules = [
    t('correct_1'),
    t('correct_2'),
    t('correct_3'),
    t('correct_4')
  ];

  const avoidRules = [
    t('avoid_1'),
    t('avoid_2'),
    t('avoid_3'),
    t('avoid_4')
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[85vh] p-0 overflow-hidden border-[#F1F5F9] bg-[#FCFDFF] shadow-[0_40px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] sm:rounded-[32px] flex flex-col focus:outline-none">
        {/* 无障碍标题 */}
        <VisuallyHidden>
          <DialogTitle>{t('modal_title')}</DialogTitle>
        </VisuallyHidden>

        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-200/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300/50 transition-colors [scrollbar-width:thin] [scrollbar-color:rgba(226,232,240,0.5)_transparent]">
          {/* 头部标题 - Sticky 悬浮效果 */}
          <div className="text-center space-y-2 sticky top-0 bg-[#FCFDFF]/90 backdrop-blur-md z-10 -mt-2 pt-2 pb-6 border-b border-transparent transition-all duration-300">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <Camera className="w-6 h-6 text-[#5B49F9]" />
              {t('modal_title')}
            </h2>
            <p className="text-[13px] text-slate-500 font-medium">
              {t('modal_subtitle')}
            </p>
          </div>

          {/* 规则部分 */}
          <div className="space-y-6 max-w-[720px] mx-auto w-full px-4">
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-8 h-8 rounded-[10px] bg-amber-50 flex items-center justify-center border border-amber-100/50">
                <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500/10" />
              </div>
              <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">{t('rules_title')}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* 正确拍法 */}
              <div className="flex flex-col rounded-[12px] bg-gradient-to-b from-emerald-50/40 to-white/20 border border-slate-200/40 p-6 space-y-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[12px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-emerald-800 tracking-tight leading-none">{t('correct_title')}</span>
                  </div>
                </div>
                <ul className="space-y-3 pl-1">
                  {correctRules.map((item, i) => (
                    <li key={i} className="text-[12px] text-slate-500 leading-relaxed flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 shrink-0 mt-[6px]" />
                      <span className="flex-1" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* 需避免 */}
              <div className="flex flex-col rounded-[12px] bg-gradient-to-b from-amber-50/40 to-white/20 border border-slate-200/40 p-6 space-y-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[12px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-amber-800 tracking-tight leading-none">{t('avoid_title')}</span>
                  </div>
                </div>
                <ul className="space-y-3 pl-1">
                  {avoidRules.map((item, i) => (
                    <li key={i} className="text-[12px] text-slate-500 leading-relaxed flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/30 shrink-0 mt-[6px]" />
                      <span className="flex-1" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 提示条 (Professional Info Banner) */}
          <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-indigo-50/60 to-blue-50/40 border border-indigo-100/50 rounded-[12px] max-w-[720px] mx-auto w-full shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div className="w-10 h-10 rounded-[12px] bg-indigo-600 flex items-center justify-center shrink-0 shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)]">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[13px] leading-relaxed text-slate-600">
                <span className="font-bold text-indigo-700">{t('tip_title')}</span> {t('tip_content')}
              </p>
            </div>
          </div>

          {/* 案例对比 */}
          <div className="space-y-6 max-w-[600px] mx-auto w-full">
            <div className="flex items-center gap-3">
              <div className="h-5 w-1.5 bg-[#5B49F9] rounded-full shadow-[0_0_10px_rgba(91,73,249,0.3)]" />
              <h3 className="text-[16px] font-black text-slate-900">{t('comparison_title')}</h3>
            </div>
            <ComparisonSection />
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="px-10 py-8 border-t border-slate-100/60 flex justify-center bg-white/80 backdrop-blur-xl">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full max-w-md h-14 bg-[#5B49F9] hover:bg-[#4A39D9] text-white rounded-[12px] font-black text-[16px] shadow-[0_12px_24px_-8px_rgba(91,73,249,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] ring-offset-2 hover:ring-2 hover:ring-[#5B49F9]/20"
          >
            {t('close_button')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
