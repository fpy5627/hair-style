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

interface HairstyleGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * AI 发型拍照指南模态框
 * 采用现代轻量化设计，具有高度限制和内部滚动机制
 */
export const HairstyleGuideModal = ({ open, onOpenChange }: HairstyleGuideModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[85vh] p-0 overflow-hidden border-[#F1F5F9] bg-[#FCFDFF] shadow-[0_40px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] sm:rounded-[32px] flex flex-col focus:outline-none">
        {/* 无障碍标题 */}
        <VisuallyHidden>
          <DialogTitle>AI 发型拍照指南</DialogTitle>
        </VisuallyHidden>
        
        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-200/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300/50 transition-colors [scrollbar-width:thin] [scrollbar-color:rgba(226,232,240,0.5)_transparent]">
          {/* 头部标题 - Sticky 悬浮效果 */}
          <div className="text-center space-y-2 sticky top-0 bg-[#FCFDFF]/90 backdrop-blur-md z-10 -mt-2 pt-2 pb-6 border-b border-transparent transition-all duration-300">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <Camera className="w-6 h-6 text-[#5B49F9]" />
              AI 发型拍照指南
            </h2>
            <p className="text-[13px] text-slate-500 font-medium">
              清晰正脸 + 光线均匀，会让发型效果更逼真
            </p>
          </div>

          {/* 规则部分 */}
          <div className="space-y-6 max-w-[760px] mx-auto w-full px-4">
            <div className="flex items-center gap-2 px-2">
              <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500/10" />
              <h3 className="text-[14px] font-bold text-slate-800">更容易识别的照片规则</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-items-center">
               {/* 正确拍法 */}
               <div className="p-4 rounded-[24px] bg-[#F0FDF4] border border-emerald-100/50 space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-emerald-500/5 flex flex-col items-center w-full max-w-[280px]">
                 <div className="flex items-center justify-center gap-2.5 text-emerald-700 w-full">
                   <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                     <CheckCircle className="w-4 h-4 text-emerald-600" />
                   </div>
                   <span className="text-[14px] font-bold">正确拍法</span>
                 </div>
                 <ul className="space-y-2 w-full flex flex-col items-center">
                   {[
                     "**面向镜头**，眼睛平视",
                     "**均匀光照**，避免阴影",
                     "**背景干净**，白墙尤佳"
                   ].map((item, i) => (
                     <li key={i} className="text-[12px] text-[#64748B] leading-[1.4] flex items-center justify-center gap-2 text-center">
                       <div className="w-1 h-1 rounded-full bg-emerald-500/50 shrink-0" />
                       <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                     </li>
                   ))}
                 </ul>
               </div>

               {/* 需避免 */}
               <div className="p-4 rounded-[24px] bg-[#FFFBEB] border border-amber-100/50 space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-amber-500/5 flex flex-col items-center w-full max-w-[280px]">
                 <div className="flex items-center justify-center gap-2.5 text-amber-700 w-full">
                   <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                     <AlertCircle className="w-4 h-4 text-amber-600" />
                   </div>
                   <span className="text-[14px] font-bold">需避免</span>
                 </div>
                 <ul className="space-y-2 w-full flex flex-col items-center">
                   {[
                     "**侧脸、低头**或仰头拍摄",
                     "戴**帽子、口罩**遮挡面部",
                     "**模糊、过暗**或多人干扰"
                   ].map((item, i) => (
                     <li key={i} className="text-[12px] text-[#64748B] leading-[1.4] flex items-center justify-center gap-2 text-center">
                       <div className="w-1 h-1 rounded-full bg-amber-500/50 shrink-0" />
                       <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>

          {/* 提示条 */}
          <div className="flex items-center gap-5 p-5 bg-[#EEF2FF] border border-indigo-100/50 rounded-[24px] max-w-[600px] mx-auto w-full">
            <div className="w-10 h-10 rounded-full bg-[#4338CA] flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <Info className="w-5 h-5 text-white" />
            </div>
            <p className="text-[13px] text-[#4338CA] leading-relaxed">
              <span className="font-bold">专业小提示：</span> 建议露出发际线与耳朵附近轮廓。这能让 AI 更精准地为您匹配发型比例，生成的衔接感更自然。
            </p>
          </div>

          {/* 案例对比 */}
          <div className="space-y-6 max-w-[600px] mx-auto w-full">
            <div className="flex items-center gap-3">
              <div className="h-5 w-1.5 bg-[#5B49F9] rounded-full shadow-[0_0_10px_rgba(91,73,249,0.3)]" />
              <h3 className="text-[16px] font-black text-slate-900">效果对比示例</h3>
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
            知道了，去上传
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
