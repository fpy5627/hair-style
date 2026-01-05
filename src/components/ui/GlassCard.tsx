import React from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 磨砂玻璃效果卡片组件
 * bg-white/60 + backdrop-blur-md + border + soft shadow + rounded-2xl
 * 输入：children (ReactNode), className (string)
 * 输出：带有玻璃质感的容器组件
 */
export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={cn(
      "bg-white/60 backdrop-blur-md border border-white/20 shadow-xl shadow-black/5 rounded-2xl overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
};

