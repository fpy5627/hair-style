'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Upload, X, ImageIcon } from 'lucide-react';

interface UploadCardProps {
  onUpload: (file: File) => void;
  onClear: () => void;
  preview: string | null;
}

/**
 * 照片上传组件
 * 支持拖拽、点击上传和预览显示
 */
export const UploadCard = ({ onUpload, onClear, preview }: UploadCardProps) => {
  const t = useTranslations('hairstyle.tool');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <GlassCard className="h-full flex flex-col items-center justify-center p-8 min-h-[400px] relative group">
      {preview ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={preview} 
            alt="Upload Preview" 
            className="max-h-[340px] rounded-xl object-contain shadow-md"
          />
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 shadow-sm transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="p-4 bg-blue-50 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-slate-700">{t('upload')}</p>
            <p className="text-xs text-slate-400 mt-1">{t('upload_tip')}</p>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

