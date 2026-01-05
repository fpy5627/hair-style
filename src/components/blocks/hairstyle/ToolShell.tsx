import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

interface ToolShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * 工具页面外壳组件
 * 提供统一的标题、副标题和布局容器
 */
export const ToolShell = ({ title, subtitle, children }: ToolShellProps) => {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10 space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {children}
      </div>
    </section>
  );
};

