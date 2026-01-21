import React from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 磨砂玻璃效果卡片组件
 * bg-white/60 + backdrop-blur-md + border + soft shadow
 * 圆角样式由外部className控制
 * 输入：children (ReactNode), className (string)
 * 输出：带有玻璃质感的容器组件
 */
export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={cn(
      "bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] relative before:absolute before:inset-0 before:border-t before:border-white/40 before:pointer-events-none",
      className
    )}>
      {children}
    </div>
  );
};

