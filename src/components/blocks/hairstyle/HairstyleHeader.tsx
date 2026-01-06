'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { SafeLink } from '@/components/common/safe-link';
import { Button3D } from '@/components/ui/Button3D';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, X, Sparkles, ChevronDown, User, Gift } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Hairnova AI 优化后的 Header 组件
 * 严格遵守工具入口约束：男士发型、女士发型、免费版
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
    <header className="sticky top-0 z-50 w-full bg-white/55 backdrop-blur-xl border-b border-white/30 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-18 flex items-center justify-between">
        {/* Logo */}
        <SafeLink href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 relative group-hover:scale-105 transition-all duration-300 overflow-hidden rounded-lg">
            <Image 
              src="/logo.png" 
              alt={t('title')}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-sky-500 drop-shadow-[0_6px_18px_rgba(99,102,241,0.20)] tracking-tight">
            Hairnova AI
          </span>
        </SafeLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {mainLinks
            ?.filter((link) => link.href && link.href.trim() !== "")
            .map((link) => (
              <SafeLink 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "relative text-sm font-medium px-4 py-2 transition-all duration-300",
                  isActive(link.href)
                    ? "text-slate-900 after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-[2.5px] after:bg-gradient-to-r after:from-violet-500 after:to-sky-400 after:rounded-full after:shadow-[0_6px_18px_rgba(56,189,248,0.25)]"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {link.label}
              </SafeLink>
            ))}

          {/* Explore Dropdown - 发型库 */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "relative flex items-center gap-1 text-sm font-medium px-4 py-2 outline-none transition-all duration-300",
              exploreLinks.some(l => isActive(l.href))
                ? "text-slate-900 after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-[2.5px] after:bg-gradient-to-r after:from-violet-500 after:to-sky-400 after:rounded-full after:shadow-[0_6px_18px_rgba(56,189,248,0.25)]"
                : "text-slate-600 hover:text-slate-900"
            )}>
              {t('nav.explore')}
              <ChevronDown size={14} className="opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-white/80 backdrop-blur-xl border-white/20 rounded-2xl p-1.5 shadow-2xl">
              {exploreLinks
                ?.filter((link) => link.href && link.href.trim() !== "")
                .map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <SafeLink 
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm rounded-xl transition-all duration-200 cursor-pointer",
                        isActive(link.href) ? "bg-violet-50 text-violet-600 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </div>
                    </SafeLink>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <SafeLink 
            href={pricingLink.href} 
            className={cn(
              "relative text-sm font-medium px-4 py-2 transition-all duration-300",
              isActive(pricingLink.href)
                ? "text-slate-900 after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-[2.5px] after:bg-gradient-to-r after:from-violet-500 after:to-sky-400 after:rounded-full after:shadow-[0_6px_18px_rgba(56,189,248,0.25)]"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {pricingLink.label}
          </SafeLink>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-3 md:gap-4 ml-2">
          <div className="hidden md:flex items-center gap-4">
            <LocaleSwitcher 
              buttonClassName="!rounded-[10px] px-4 h-10 bg-white/45 border-white/40 backdrop-blur-md text-slate-700 hover:bg-white/60 transition-all duration-300" 
            />
            <SafeLink href="/auth/signin" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors px-2">
              {t('nav.signin_register')}
            </SafeLink>
            <div className="relative z-20">
              <Button3D 
                variant="brand" 
                asChild
                className="!rounded-[10px] px-6 h-10 text-sm font-black"
              >
                <SafeLink href="/ai-hairstyle-changer-free">
                  {t('nav.free')}
                </SafeLink>
              </Button3D>
            </div>
          </div>

          {/* Mobile Toggle & Locale */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="relative z-10">
              <LocaleSwitcher 
                buttonClassName="!rounded-[10px] px-3 h-9 bg-white/45 border-white/40 backdrop-blur-md text-slate-700 hover:bg-white/60 transition-all duration-300" 
              />
            </div>
            <div className="relative z-20">
              <button 
                className="p-2 text-slate-600 hover:bg-slate-50 !rounded-[10px] transition-colors" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-white/30 p-4 space-y-2 animate-in slide-in-from-top-4 duration-300 origin-top">
          {[...mainLinks, pricingLink, ...exploreLinks]
            ?.filter((link) => link.href && link.href.trim() !== "")
            .map((link) => (
              <SafeLink 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200",
                  isActive(link.href) 
                    ? "bg-violet-50 text-violet-600 border border-violet-100 shadow-sm" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  {('icon' in link) && link.icon}
                  {link.label}
                </div>
              </SafeLink>
            ))}
          <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
            <div className="relative z-20">
              <Button3D variant="brand" asChild className="!rounded-[10px] w-full h-12 text-sm font-black">
                <SafeLink href="/ai-hairstyle-changer-free" onClick={() => setIsOpen(false)}>
                  {t('nav.free')}
                </SafeLink>
              </Button3D>
            </div>
            <SafeLink href="/auth/signin" className="block text-center text-sm font-bold text-slate-500 py-2" onClick={() => setIsOpen(false)}>
              {t('nav.signin_register')}
            </SafeLink>
          </div>
        </div>
      )}
    </header>
  );
};
