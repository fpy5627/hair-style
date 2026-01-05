'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button3D } from '@/components/ui/Button3D';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

/**
 * AI Hairstyle 专用 Header 组件
 */
export const HairstyleHeader = () => {
  const t = useTranslations('hairstyle');
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/ai-hairstyle-changer', label: t('nav.changer') },
    { href: '/ai-hairstyle-changer-free', label: t('nav.free') },
    { href: '/ai-hairstyle-male', label: t('nav.male') },
    { href: '/ai-hairstyle-female', label: t('nav.female') },
    { href: '/what-hairstyle-suits-me', label: t('nav.suits_me') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/ai-hairstyle" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <span>{t('title')}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/ai-hairstyle-changer">
            <Button3D variant="primary" className="px-5 py-1.5 text-sm">
              {t('hero.start')}
            </Button3D>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b p-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-600 py-2 border-b border-slate-50 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/ai-hairstyle-changer" onClick={() => setIsOpen(false)}>
            <Button3D variant="primary" className="w-full mt-4">
              {t('hero.start')}
            </Button3D>
          </Link>
        </div>
      )}
    </header>
  );
};

