'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { Upload, X, ImageIcon, Camera } from 'lucide-react';
import { CameraModal } from './CameraModal';
import { cn } from "@/lib/utils";

interface UploadCardProps {
  onUpload: (file: File, source?: 'camera' | 'file') => void;
  onClear: () => void;
  onCamera?: () => void;
  onPhotoRequirementsClick?: () => void;
  preview: string | null;
}

/**
 * 照片上传组件
 * 支持拖拽、点击上传和预览显示
 */
export const UploadCard = ({
  onUpload,
  onClear,
  onCamera,
  onPhotoRequirementsClick,
  preview
}: UploadCardProps) => {
  const t = useTranslations('hairstyle.tool');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 检测是否为移动端
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isCamera = e.target.hasAttribute('capture');
    if (file) onUpload(file, isCamera ? 'camera' : 'file');
  };

  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCamera) {
      onCamera();
      return;
    }

    if (isMobile()) {
      // 移动端使用系统相机
      cameraInputRef.current?.click();
    } else {
      // 桌面端打开自定义相机 Modal
      setIsCameraModalOpen(true);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file, 'file');
    }
  };

  return (
    <>
      <div
        className={cn(
          "h-full w-full flex flex-col items-center justify-center p-4 min-h-0 relative rounded-lg transition-all duration-300 cursor-pointer",
          !preview && isDragging ? "bg-indigo-50/30" : "bg-transparent"
        )}
        onClick={() => !preview && fileInputRef.current?.click()}
        onDragOver={!preview ? onDragOver : undefined}
        onDragLeave={!preview ? onDragLeave : undefined}
        onDrop={!preview ? onDrop : undefined}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg" onClick={(e) => e.stopPropagation()}>
            <img
              src={preview}
              alt="Upload Preview"
              className="w-full h-full rounded-lg object-contain"
            />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 shadow-md transition-all z-10 hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div
            data-slot="upload-dropzone"
            className={cn(
              "w-full h-full flex flex-col items-center justify-center gap-3 transition-all duration-300 p-2",
            )}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            <input
              type="file"
              className="hidden"
              ref={cameraInputRef}
              accept="image/*"
              capture
              onChange={handleFileChange}
            />

            {/* 中心上传 Icon */}
            <div className={cn(
              "p-3 rounded-full bg-indigo-50/50 text-indigo-400/90 transition-all duration-300",
              "group-hover:bg-indigo-50/80 group-hover:text-indigo-500 group-hover:-translate-y-1",
              isDragging && "bg-indigo-100 text-indigo-600 scale-110 -translate-y-2"
            )}>
              <Upload size={24} className="stroke-[1.5]" />
            </div>

            <div className="text-center space-y-5 w-full max-w-[240px]">
              <p className={cn(
                "text-sm font-bold transition-colors duration-300 tracking-tight",
                isDragging ? "text-indigo-600" : "text-slate-800"
              )}>
                {t('upload')}
              </p>

              <div className="flex flex-row items-center justify-center gap-3 w-full px-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="flex-1 h-11 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-[8px] text-[13px] font-bold shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 px-4"
                >
                  <ImageIcon size={18} className="shrink-0" />
                  <span className="truncate">{t('select_file')}</span>
                </button>
                <button
                  onClick={handleCameraClick}
                  className="flex-1 h-11 bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-600 text-slate-700 rounded-[8px] flex items-center justify-center gap-2 text-[13px] font-bold shadow-sm transition-all duration-200 ease-out active:scale-[0.98] active:border-indigo-600 active:text-indigo-700 px-4 group"
                >
                  <Camera size={18} className="text-slate-400 shrink-0 group-hover:text-indigo-500 transition-colors" />
                  <span className="truncate">{t('camera')}</span>
                </button>
              </div>

              <div className="flex flex-col items-center gap-1 pt-1">
                <p className="text-[10px] text-slate-400/80 font-medium scale-90 origin-center">{t('upload_tip')}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPhotoRequirementsClick?.();
                  }}
                  className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 underline underline-offset-4 decoration-indigo-500/20 transition-all scale-90 origin-center"
                >
                  照片要求 / 拍照小贴士
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={(file) => onUpload(file, 'camera')}
      />
    </>
  );
};

