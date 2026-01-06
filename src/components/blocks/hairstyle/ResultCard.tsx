'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Check, Download, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { Button3D } from '@/components/ui/Button3D';

interface ResultCardProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  originalImage: string | null;
  resultImage: string | null;
  onReset: () => void;
}

/**
 * 结果展示组件
 * 展示 Before/After 对比效果、加载状态及下载按钮
 */
export const ResultCard = ({ status, originalImage, resultImage, onReset }: ResultCardProps) => {
  const t = useTranslations('hairstyle.tool');

  if (status === 'idle' || !originalImage) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-3 opacity-40">
          <ImageIcon size={48} className="mx-auto text-slate-400" />
          <p className="text-sm text-slate-500">{t('result')}</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="h-full flex flex-col p-6 space-y-6">
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Before */}
        <div className="flex-1 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('before')}</p>
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 relative">
            <img src={originalImage} alt="Before" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* After / Processing */}
        <div className="flex-1 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('after')}</p>
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 relative flex items-center justify-center">
            {status === 'loading' ? (
              <div className="text-center space-y-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-blue-600 font-medium animate-pulse">{t('processing')}</p>
              </div>
            ) : (
              <img src={resultImage || originalImage} alt="After" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      {status === 'success' && (
        <div className="flex gap-4">
          <Button3D 
            variant="outline" 
            className="flex-1"
            onClick={onReset}
          >
            <RotateCcw size={18} />
            <span className="text-sm">{t('try_another')}</span>
          </Button3D>
          <Button3D 
            variant="primary" 
            className="flex-1"
            onClick={() => window.open(resultImage || '', '_blank')}
          >
            <Download size={18} />
            <span className="text-sm">{t('download')}</span>
          </Button3D>
        </div>
      )}
    </GlassCard>
  );
};

