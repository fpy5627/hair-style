'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import SafeLink from '@/components/common/safe-link';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Header 规范化设计系统
 */
const navControlBase =
  "inline-flex items-center justify-center gap-2 cursor-pointer select-none " +
  "transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2";

const navControlTertiary = cn(
  navControlBase,
  "h-10 px-4 rounded-[10px] " +
  "bg-white/70 border border-slate-200/80 " +
  "text-slate-600 text-sm font-medium shadow-sm",
  "hover:bg-white hover:border-indigo-200 hover:text-indigo-600 hover:-translate-y-0.5 active:translate-y-0"
);

const navControlSecondary = cn(
  navControlBase,
  "h-10 px-4 rounded-[10px] " +
  "bg-indigo-50 border border-indigo-200/60 " +
  "text-indigo-600 text-sm font-medium",
  "hover:bg-indigo-100 hover:border-indigo-300/50 hover:text-indigo-700 hover:-translate-y-0.5 active:translate-y-0"
);

const navControlPrimary = cn(
  navControlBase,
  "h-10 px-5 rounded-[10px] text-white text-sm font-semibold shadow-sm",
  // 使用 !important 确保背景色不被覆盖，固定渐变颜色
  // 渐变颜色与"AI 发型顾问"文字一致：从深紫色/靛蓝到明亮的青色/天蓝色
  // 使用对角线渐变（从左上到右下）增加动感
  "!bg-gradient-to-br !from-indigo-600 !via-purple-500 !to-cyan-400",
  // hover 和 active 状态也使用固定颜色，不使用 brightness 避免颜色变化
  "hover:!bg-gradient-to-br hover:!from-indigo-700 hover:!via-purple-600 hover:!to-cyan-500 hover:-translate-y-0.5",
  "active:!bg-gradient-to-br active:!from-indigo-800 active:!via-purple-700 active:!to-cyan-600 active:translate-y-0",
  // 确保文字颜色始终为白色
  "!text-white hover:!text-white active:!text-white",
  // 禁用状态也保持颜色一致
  "disabled:!bg-gradient-to-br disabled:!from-indigo-400 disabled:!via-purple-300 disabled:!to-cyan-300 disabled:!text-white/70"
);

// 移动端专用尺寸
const mobileNavControlTertiary = cn(
  navControlTertiary,
  "h-11 rounded-[12px] px-3"
);

const mobileNavControlSecondary = cn(
  navControlSecondary,
  "h-11 rounded-[12px] px-3"
);

const mobileNavControlPrimary = cn(
  navControlPrimary,
  "h-11 rounded-[12px] w-full"
);

/**
 * Hairnova AI 优化后的 Header 组件
 */
export const HairstyleHeader = () => {
  const t = useTranslations('hairstyle');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 主入口导航
  const mainLinks = [
    { href: '/ai-hairstyle-changer', label: t('nav.changer') },
    { href: '/what-hairstyle-suits-me', label: t('nav.suits_me') },
  ];

  // 下拉菜单入口：男士、女士
  const exploreLinks = [
    { href: '/ai-hairstyle-male', label: t('nav.male'), icon: <User size={14} /> },
    { href: '/ai-hairstyle-female', label: t('nav.female'), icon: <User size={14} /> },
  ];

  const pricingLink = { href: '/pricing', label: t('nav.pricing') };

  // 检查是否激活
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo - 规范化字体 */}
        <SafeLink href="/" className="flex items-center gap-2.5 group shrink-0 relative z-30">
          <div className="w-8 h-8 relative group-hover:scale-105 transition-all duration-300 overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt={t('title')}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500 tracking-tight">
            Hairnova AI
          </span>
        </SafeLink>

        {/* Desktop Nav - 消除布局抖动 */}
        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center gap-1">
            {mainLinks
              ?.filter((link) => link.href && link.href.trim() !== "")
              .map((link) => (
                <SafeLink
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium px-4 h-10 flex items-center transition-colors duration-200 tracking-tight",
                    isActive(link.href)
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
                  )}
                </SafeLink>
              ))}

            {/* Explore Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "relative flex items-center gap-1 text-sm font-medium px-4 h-10 outline-none transition-colors duration-200 tracking-tight",
                exploreLinks.some(l => isActive(l.href))
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              )}>
                {t('nav.explore')}
                <ChevronDown size={14} className="opacity-40" />
                {exploreLinks.some(l => isActive(l.href)) && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-xl p-1 shadow-xl relative z-50">
                {exploreLinks
                  ?.filter((link) => link.href && link.href.trim() !== "")
                  .map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <SafeLink
                        href={link.href}
                        className={cn(
                          "flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer",
                          isActive(link.href) ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </SafeLink>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <SafeLink
              href={pricingLink.href}
              className={cn(
                "relative text-sm font-medium px-4 h-10 flex items-center transition-colors duration-200 tracking-tight",
                isActive(pricingLink.href)
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              )}
            >
              {pricingLink.label}
              {isActive(pricingLink.href) && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
              )}
            </SafeLink>
          </div>
        </nav>

        {/* Right Action Area - 规范化组件 */}
        <div className="flex items-center gap-3 relative z-30 ml-4">
          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher buttonClassName={navControlTertiary} />

            <SafeLink href="/auth/signin" className={navControlSecondary}>
              {t("nav.signin_register")}
            </SafeLink>

            <SafeLink href="/ai-hairstyle-changer-free" className="relative">
              <Button variant="cta" className="h-10 px-5 rounded-[10px] text-sm font-semibold relative">
                <span
                  className="pointer-events-none absolute inset-0 rounded-[10px]"
                  style={{
                    background: 'radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 60%)'
                  }}
                />
                <span className="relative z-10">{t('nav.free')}</span>
              </Button>
            </SafeLink>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleSwitcher buttonClassName={mobileNavControlTertiary} />

            <button
              className={cn(mobileNavControlTertiary, "p-0 w-11")}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200/60 p-4 space-y-1.5 animate-in slide-in-from-top-2 duration-300 origin-top relative z-40">
          {[...mainLinks, pricingLink, ...exploreLinks]
            ?.filter((link) => link.href && link.href.trim() !== "")
            .map((link) => (
              <SafeLink
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-100/50"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  {'icon' in link && (link.icon as React.ReactNode)}
                  {link.label}
                </div>
              </SafeLink>
            ))}
          <div className="pt-4 border-t border-slate-100 mt-2 space-y-3">
            <SafeLink
              href="/ai-hairstyle-changer-free"
              className="relative"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="cta" className="h-11 w-full rounded-[12px] text-sm font-semibold relative">
                <span
                  className="pointer-events-none absolute inset-0 rounded-[12px]"
                  style={{
                    background: 'radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 60%)'
                  }}
                />
                <span className="relative z-10">{t('nav.free')}</span>
              </Button>
            </SafeLink>
            <SafeLink
              href="/auth/signin"
              className={cn(mobileNavControlSecondary, "w-full")}
              onClick={() => setIsOpen(false)}
            >
              {t("nav.signin_register")}
            </SafeLink>
          </div>
        </div>
      )}
    </header>
  );
};
