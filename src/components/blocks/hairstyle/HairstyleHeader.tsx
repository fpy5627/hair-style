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
import { Menu, X, ChevronDown, User, ArrowRight } from 'lucide-react';
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

  // 发型库下拉菜单 - SEO Hub 结构
  const hairstyleLibraryMenu = {
    mensHairstyles: {
      title: t('nav.hub.men_title'),
      groups: [
        {
          title: t('nav.hub.by_length'),
          links: [
            { href: '/hairstyles-for-men/short', label: t('nav.hub.short') },
            { href: '/hairstyles-for-men/medium', label: t('nav.hub.medium') },
            { href: '/hairstyles-for-men/long', label: t('nav.hub.long') },
          ]
        },
        {
          title: t('nav.hub.by_hair_type'),
          links: [
            { href: '/hairstyles-for-men/curly', label: t('nav.hub.curly') },
            { href: '/hairstyles-for-men/straight', label: t('nav.hub.straight') },
            { href: '/hairstyles-for-men/wavy', label: t('nav.hub.wavy') },
          ]
        },
        {
          title: t('nav.hub.by_style'),
          links: [
            { href: '/hairstyles-for-men/wavy', label: t('nav.hub.low_maintenance') },
            { href: '/hairstyles-for-men/fade', label: t('nav.hub.fade') },
            { href: '/hairstyles-for-men/buzz-cut', label: t('nav.hub.buzz_cut') },
            { href: '/hairstyles-for-men/braids', label: t('nav.hub.braids') },
          ]
        }
      ]
    },
    womensHairstyles: {
      title: t('nav.hub.women_title'),
      links: [
        { href: '/ai-hairstyle-female', label: t('nav.hub.women_styles'), icon: <User size={14} /> }
      ]
    }
  };

  const pricingLink = { href: '/pricing', label: t('nav.pricing') };

  const [activeId, setActiveId] = useState<string | null>(null);

  // 检查是否激活 - 增强版逻辑
  const isActive = (href: string, label?: string) => {
    if (activeId === label || activeId === href) return true;
    return pathname === href;
  };

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


            {/* Hairstyle Library Dropdown - SEO Hub */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "relative flex items-center gap-1 text-sm font-medium px-4 h-10 outline-none transition-colors duration-200 tracking-tight text-slate-700 hover:text-indigo-600"
              )}>
                {t('nav.explore')}
                <ChevronDown size={14} className="opacity-40" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-[560px] bg-white/75 backdrop-blur-[18px] border border-white/40 rounded-[14px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-50 overflow-hidden"
              >
                <div className="relative z-10">
                  {/* Section Title: Men's Hairstyles */}
                  <div className="flex items-center gap-3 mb-5 px-1">
                    <span className="text-[14px] font-semibold text-slate-800 tracking-tight">
                      {hairstyleLibraryMenu.mensHairstyles.title}
                    </span>
                    <div className="h-[1px] flex-1 bg-slate-200/50" />
                  </div>

                  {/* Men's Grouped Content Block */}
                  <div className="grid grid-cols-3 gap-8 bg-white/30 border border-white/20 rounded-[10px] p-4 mb-6 relative">
                    {hairstyleLibraryMenu.mensHairstyles.groups.map((group) => (
                      <div key={group.title} className="space-y-3">
                        {/* Group Category Title */}
                        <div className="px-1 text-[10px] font-medium text-slate-400 uppercase tracking-[0.08em]">
                          {group.title}
                        </div>
                        <div className="flex flex-col gap-1">
                          {group.links.map((link) => {
                            const isSelected = isActive(link.href, link.label);
                            return (
                              <DropdownMenuItem
                                key={link.label}
                                asChild
                                className="p-0 focus:bg-transparent"
                              >
                                <SafeLink
                                  href={link.href}
                                  onClick={(e) => {
                                    if (link.href.startsWith('#')) {
                                      e.preventDefault();
                                    }
                                    setActiveId(link.label);
                                  }}
                                  data-selected={isSelected}
                                  className={cn(
                                    "group relative flex items-center w-full min-h-[38px] px-3 py-1.5 text-[13px] rounded-[6px] border border-transparent transition-all duration-150 ease-out cursor-pointer pointer-events-auto z-20",
                                    "active:scale-[0.98] outline-hidden",
                                    // Default State
                                    "text-slate-600",
                                    // Hover state synchronized with selected state
                                    "hover:bg-indigo-600/5 hover:border-indigo-600/10 hover:text-indigo-600",
                                    // Premium Selected State
                                    "data-[selected=true]:bg-indigo-600/5 data-[selected=true]:border-indigo-600/10 data-[selected=true]:text-indigo-600 data-[selected=true]:font-medium data-[selected=true]:shadow-none"
                                  )}
                                >
                                  {/* Left selection indicator bar - visible on hover or selected */}
                                  <div className={cn(
                                    "absolute left-0 w-[2px] h-[14px] bg-indigo-500/60 rounded-full transition-all duration-300 opacity-0 scale-y-0",
                                    "group-hover:opacity-100 group-hover:scale-y-100",
                                    isSelected && "opacity-100 scale-y-100"
                                  )} />
                                  <span className={cn(
                                    "transition-transform duration-200",
                                    isSelected ? "translate-x-2" : "group-hover:translate-x-2"
                                  )}>
                                    {link.label}
                                  </span>
                                </SafeLink>
                              </DropdownMenuItem>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section Title: Women's Hairstyles */}
                  <div className="flex items-center gap-3 mb-4 px-1">
                    <span className="text-[14px] font-semibold text-slate-800 tracking-tight">
                      {hairstyleLibraryMenu.womensHairstyles.title}
                    </span>
                    <div className="h-[1px] flex-1 bg-slate-200/50" />
                  </div>

                  <div className="grid grid-cols-1">
                    {hairstyleLibraryMenu.womensHairstyles.links.map((link) => {
                      const isSelected = isActive(link.href, link.label);
                      return (
                        <DropdownMenuItem key={link.href} asChild className="p-0 focus:bg-transparent">
                          <SafeLink
                            href={link.href}
                            onClick={() => setActiveId(link.label)}
                            data-selected={isSelected}
                            className={cn(
                              // Base Card Style: Rectangle with micro-rounded corners
                              "group flex items-center gap-4 w-full min-h-[52px] px-4 py-3 rounded-[12px] border transition-all duration-300 ease-out active:scale-[0.98] z-20 pointer-events-auto cursor-pointer",
                              // Default State: Sandblasted/Frosted background
                              "bg-white/40 border-slate-200/40 text-slate-600 shadow-sm",
                              // Hover State: Subtle brightness & text color shift
                              "hover:bg-white/60 hover:border-indigo-200/50 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-500/5",
                              // Active/Selected State: Refined highlight (No vertical bar)
                              "data-[selected=true]:bg-indigo-50/50 data-[selected=true]:border-indigo-200/60 data-[selected=true]:text-indigo-600 data-[selected=true]:font-semibold data-[selected=true]:shadow-none"
                            )}
                          >
                            <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-[8px] transition-all duration-300",
                              isSelected
                                ? "bg-gradient-to-br from-indigo-500 via-purple-400 to-cyan-300 text-white shadow-lg shadow-indigo-500/20"
                                : "bg-white/80 border border-slate-100 text-slate-400 group-hover:bg-gradient-to-br group-hover:from-indigo-500/80 group-hover:to-purple-400/80 group-hover:text-white group-hover:border-transparent"
                            )}>
                              {link.icon}
                            </div>

                            <span className="text-[14px] tracking-tight">{link.label}</span>

                            <div className="ml-auto flex items-center justify-center">
                              <ArrowRight
                                size={15}
                                className={cn(
                                  "transition-all duration-300 ease-out",
                                  isSelected
                                    ? "text-indigo-600 translate-x-0 opacity-100"
                                    : "text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-indigo-400"
                                )}
                              />
                            </div>
                          </SafeLink>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </div>
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
          {/* 主导航 */}
          {[...mainLinks, pricingLink, { href: '/#men-hairstyles-library', label: t('nav.hub.men_title') }, { href: '/ai-hairstyle-female', label: t('nav.hub.women_styles') }]
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
