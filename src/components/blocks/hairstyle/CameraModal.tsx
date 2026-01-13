'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button3D } from '@/components/ui/Button3D';
import { Camera, RefreshCw, Check, X, ShieldAlert, Loader2, AlertCircle, FlipHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

type CameraStatus = 'permission' | 'loading' | 'preview' | 'captured' | 'error';
type CameraErrorType = 'timeout' | 'denied' | 'notfound' | 'busy' | 'constraint' | 'other';

/**
 * CameraModal: 优化后的专业级 Web Camera 组件
 */
export const CameraModal = ({ isOpen, onClose, onCapture }: CameraModalProps) => {
  const t = useTranslations('hairstyle.tool');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<CameraStatus>('permission');
  const [errorType, setErrorType] = useState<CameraErrorType | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string>('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);

  // 获取摄像头列表
  const updateDevices = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(d => d.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !currentDeviceId) {
        setCurrentDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error listing devices:', err);
    }
  };

  // 开启摄像头逻辑
  const startCamera = async (deviceId?: string) => {
    stopCamera();
    setStatus('loading');
    setErrorType(null);

    // 设置 5 秒超时检查
    timeoutRef.current = setTimeout(() => {
      if (status !== 'preview') {
        setStatus('error');
        setErrorType('timeout');
      }
    }, 5000);

    try {
      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setStatus('preview');
          videoRef.current?.play().catch(e => console.error("Play error:", e));
        };
      }

      await updateDevices();
    } catch (err: any) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // 1) 详细记录错误信息
      console.error('Camera Access Error Detailed:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        code: err.code
      });

      // 2) 根据错误名称进行分类：权限拒绝进入 permission 状态，硬件错误进入 error 状态
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        // 权限被拒绝不是错误，而是用户选择，进入 permission 状态
        setStatus('permission');
        setErrorType(null);
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        // 硬件错误：无摄像头设备
        setStatus('error');
        setErrorType('notfound');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        // 硬件错误：摄像头被占用
        setStatus('error');
        setErrorType('busy');
      } else if (err.name === 'OverconstrainedError') {
        // 硬件错误：约束条件不满足
        setStatus('error');
        setErrorType('constraint');
      } else {
        // 其他硬件错误
        setStatus('error');
        setErrorType('other');
      }
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // 切换摄像头
  const toggleCamera = () => {
    if (devices.length < 2) return;
    const currentIndex = devices.findIndex(d => d.deviceId === currentDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    const nextDevice = devices[nextIndex];
    setCurrentDeviceId(nextDevice.deviceId);
    startCamera(nextDevice.deviceId);
  };

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      setStatus('permission'); // 先显示授权引导
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);
        setStatus('captured');
        stopCamera();
      }
    }
  };

  const handleUsePhoto = () => {
    if (capturedImage) {
      fetch(capturedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onCapture(file);
          onClose();
        });
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const getActionBtnConfig = () => {
    if (status === 'captured') return { text: t('use_photo'), disabled: false };
    if (status === 'preview') return { text: t('take_photo'), disabled: false };
    if (status === 'permission') return { text: '我已开启权限，刷新重试', disabled: true };
    if (status === 'loading') return { text: t('btn_loading'), disabled: true };
    if (status === 'error') return { text: t('btn_error'), disabled: true };
    return { text: t('take_photo'), disabled: true };
  };

  const btnConfig = getActionBtnConfig();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[560px] bg-white rounded-2xl p-0 overflow-hidden border border-slate-100 shadow-2xl">
        <DialogHeader className="p-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <DialogTitle className="text-lg font-black text-slate-900">{t('camera_modal_title')}</DialogTitle>
            {status !== 'error' && (
              <Badge variant="secondary" className={cn(
                "rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                status === 'preview' && "bg-emerald-50 text-emerald-600 border-emerald-100",
                status === 'loading' && "bg-amber-50 text-amber-600 border-amber-100",
                status === 'permission' && "bg-orange-50 text-orange-600 border-orange-100",
                status === 'captured' && "bg-indigo-50 text-indigo-600 border-indigo-100",
              )}>
                {t(`status_${status}`)}
              </Badge>
            )}
          </div>
          <DialogDescription className="text-xs text-slate-500">
            {t('camera_modal_desc')}
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-[4/3] bg-slate-50 mt-4 mx-5 rounded-xl overflow-hidden border border-slate-100 shadow-inner group">
          {/* 1. Permission / Guide - Google Material Design 3.0 Style */}
          {status === 'permission' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 backdrop-blur-sm p-8 text-center animate-in fade-in duration-700">
              {/* Frosted Glass Icon Container */}
              <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center mb-6 group/icon">
                {/* Glass background with blur */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(251,146,60,0.2),inset_0_1px_0_rgba(255,255,255,0.8)]"></div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-orange-500/10 rounded-3xl"></div>
                {/* Inner glow */}
                <div className="absolute inset-[2px] bg-gradient-to-br from-white/50 to-transparent rounded-3xl opacity-60"></div>
                {/* Icon */}
                <ShieldAlert size={36} className="relative z-10 text-orange-500 drop-shadow-sm" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">摄像头权限请求</h4>
              <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed mb-6">
                {t('guide_permission')}
              </p>
              <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-slate-200/50 shadow-sm max-w-[300px]">
                <p className="text-xs text-slate-500 leading-relaxed text-left">
                  {t('guide_permission_steps')}
                </p>
              </div>
            </div>
          )}

          {/* 2. Loading */}
          {status === 'loading' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
              <div className="relative">
                <Loader2 size={40} className="animate-spin text-indigo-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={16} className="text-indigo-500" />
                </div>
              </div>
              <p className="mt-3 text-xs font-bold text-slate-600 animate-pulse">{t('guide_loading')}</p>
            </div>
          )}

          {/* 3. Error */}
          {status === 'error' && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white p-6 text-center animate-in zoom-in-95">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-3 ring-2 ring-red-100">
                <AlertCircle size={28} className="text-red-500" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-2">{t('status_error')}</h4>
              <p className="text-xs text-slate-500 mb-6 max-w-[320px] leading-relaxed">
                {errorType === 'denied' && t('guide_error_denied')}
                {errorType === 'notfound' && t('guide_error_notfound')}
                {errorType === 'busy' && t('guide_error_readable')}
                {errorType === 'timeout' && t('guide_error_timeout')}
                {errorType === 'other' && t('guide_error_default')}
                {errorType === 'constraint' && t('guide_error_default')}
              </p>
              <div className="flex gap-2.5">
                <Button3D onClick={() => startCamera(currentDeviceId)} variant="gradient" className="px-5 h-10 text-sm">
                  {t('retry_connect')}
                </Button3D>
                <Button3D onClick={onClose} variant="outline" className="px-5 h-10 text-sm border-slate-200">
                  {t('use_upload_instead')}
                </Button3D>
              </div>
            </div>
          )}

          {/* Video Preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "w-full h-full object-cover scale-x-[-1] transition-all duration-700",
              status === 'preview' ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
          />

          {/* Captured Image */}
          {status === 'captured' && capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className="absolute inset-0 z-40 w-full h-full object-cover animate-in fade-in zoom-in-95 duration-300"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <DialogFooter className="p-5 pt-4 bg-slate-50/30 border-t border-slate-100">
          {/* Preview/Captured state: Three-column layout */}
          {(status === 'preview' || status === 'captured') && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              {/* Left: Switch Camera */}
              <div className="flex-1 w-full sm:w-auto">
                {devices.length > 1 && status === 'preview' && (
                  <button
                    onClick={toggleCamera}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow"
                  >
                    <FlipHorizontal size={12} />
                    {t('switch_camera')}
                  </button>
                )}
              </div>

              {/* Center: Action */}
              <div className="flex-none order-first sm:order-none w-full sm:w-auto">
                {status !== 'captured' ? (
                  <Button3D
                    onClick={() => {
                      if (btnConfig.disabled) {
                        triggerShake();
                      } else {
                        capturePhoto();
                      }
                    }}
                    disabled={btnConfig.disabled}
                    variant="gradient"
                    className={cn(
                      "w-full sm:w-48 h-12 flex items-center justify-center gap-2.5 text-base",
                      isShaking && "animate-[shake_0.5s_ease-in-out]"
                    )}
                  >
                    <div className={cn(
                      "w-3 h-3 rounded-full border-2 border-white",
                      status === 'preview' ? "bg-white animate-pulse shadow-[0_0_8px_white]" : "bg-transparent opacity-30"
                    )} />
                    {btnConfig.text}
                  </Button3D>
                ) : (
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button3D
                      onClick={() => startCamera(currentDeviceId)}
                      variant="outline"
                      className="flex-1 sm:flex-none sm:w-28 h-12 text-sm border-slate-200 bg-white"
                    >
                      <RefreshCw size={18} className="mr-1.5" />
                      {t('retake')}
                    </Button3D>
                    <Button3D
                      onClick={handleUsePhoto}
                      variant="gradient"
                      className="flex-1 sm:flex-none sm:w-40 h-12 text-sm"
                    >
                      <Check size={18} className="mr-1.5" />
                      {btnConfig.text}
                    </Button3D>
                  </div>
                )}
              </div>

              {/* Right: Placeholder */}
              <div className="flex-1 w-full sm:w-auto"></div>
            </div>
          )}

          {/* Permission/Loading/Error state: Centered layout */}
          {(status === 'permission' || status === 'loading' || status === 'error') && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button3D
                onClick={() => {
                  if (btnConfig.disabled) {
                    triggerShake();
                  } else {
                    // This button is only active for 'preview' and 'captured' states in the other layout.
                    // For permission/loading/error, it's disabled and serves as a prompt.
                    // The actual action for 'error' is handled by the retry button in the error overlay.
                    // For 'permission' and 'loading', it's just a disabled placeholder.
                  }
                }}
                disabled={btnConfig.disabled}
                variant="gradient"
                className={cn(
                  "w-full sm:w-auto sm:min-w-[240px] h-12 flex items-center justify-center gap-2.5 text-base whitespace-nowrap px-6",
                  isShaking && "animate-[shake_0.5s_ease-in-out]"
                )}
              >
                <RefreshCw size={18} className="opacity-90" />
                {btnConfig.text}
              </Button3D>

              <button
                type="button"
                onClick={() => {
                  setIsUploadClicked(true);
                  setTimeout(() => {
                    onClose();
                    setIsUploadClicked(false);
                  }, 150);
                }}
                onMouseEnter={() => setIsUploadHovered(true)}
                onMouseLeave={() => setIsUploadHovered(false)}
                className="w-full sm:w-48 !transition-all !duration-200 !select-none !cursor-pointer"
                style={{
                  height: '48px',
                  padding: '0 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  border: '2px solid',
                  borderColor: (isUploadClicked || isUploadHovered) ? '#6366f1' : '#cbd5e1',
                  color: (isUploadClicked || isUploadHovered) ? '#4f46e5' : '#94a3b8',
                  backgroundColor: (isUploadClicked || isUploadHovered) ? 'rgba(238, 242, 255, 0.3)' : 'transparent',
                  boxShadow: 'none',
                  transition: 'all 200ms ease'
                }}
              >
                {t('use_upload_instead')}
              </button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
