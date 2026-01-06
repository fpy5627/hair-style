'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, localeShortNames } from '@/i18n/locale';
import { Globe, ChevronDown } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

/**
 * 语言切换器组件
 * 支持 PC 下拉显示和移动端展示
 * 输入：className (可选)
 * 输出：带有玻璃质感的语言切换按钮和菜单
 */
export const LocaleSwitcher = ({ 
  className, 
  buttonClassName,
}: { 
  className?: string, 
  buttonClassName?: string,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn("relative w-fit", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 h-9 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors bg-white/40 backdrop-blur-sm border border-white/20",
          buttonClassName
        )}
      >
        <Globe size={14} />
        <span>{localeShortNames[locale]}</span>
        <ChevronDown size={12} className={cn("transition-transform opacity-50", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          {/* 点击外部关闭 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          <GlassCard className="absolute right-0 mt-2 w-32 z-50 p-1 py-1.5 border-white/40 shadow-2xl animate-in fade-in zoom-in duration-200 origin-top-right">
            {locales.map((cur) => (
              <button
                key={cur}
                onClick={() => handleLocaleChange(cur)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors",
                  locale === cur 
                    ? "bg-blue-50 text-blue-600 font-bold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {localeNames[cur]}
              </button>
            ))}
          </GlassCard>
        </>
      )}
    </div>
  );
};

