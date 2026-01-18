import React from 'react';
import { useTranslations } from 'next-intl';
import SafeLink from '@/components/common/safe-link';
import { GlassCard } from '../ui/GlassCard';

export const Footer = () => {
  const t = useTranslations('hairstyle');

  const FRIEND_LINKS = [
    { name: t('footer.friend_links.l1'), url: 'https://example.com/ai-image' },
    { name: t('footer.friend_links.l2'), url: 'https://example.com/face-swap' },
    { name: t('footer.friend_links.l3'), url: 'https://example.com/bg-remove' },
    { name: t('footer.friend_links.l4'), url: 'https://example.com/headshot' },
  ];

  const RECENT_POSTS = [
    { title: t('footer.blog_posts.p1'), id: 'round-face-2026' },
    { title: t('footer.blog_posts.p2'), id: 'ai-salon-revolution' },
    { title: t('footer.blog_posts.p3'), id: 'male-summer-haircuts' },
  ];

  return (
    <footer className="mt-20 pb-10 px-4 border-t border-slate-100 bg-white/30">
      <div className="max-w-7xl mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <SafeLink href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6A5CFF] via-[#8B7BFF] to-[#FF7FC8] drop-shadow-[0_1px_1px_rgba(106,92,255,0.05)]">
              Hairnova AI
            </SafeLink>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* 产品入口 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {t('nav.changer')}
            </h3>
            <ul className="space-y-2">
              <li>
                <SafeLink href="/ai-hairstyle-changer" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('nav.changer')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/ai-hairstyle-changer-free" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('nav.free')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/ai-hairstyle-male" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('nav.male')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/ai-hairstyle-female" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('nav.female')}
                </SafeLink>
              </li>
            </ul>
          </div>

          {/* 博客模块 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {t('footer.blog')}
            </h3>
            <ul className="space-y-2">
              {RECENT_POSTS.map((post) => (
                <li key={post.id}>
                  <SafeLink href={`/blog/${post.id}`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                    {post.title}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 友情链接 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {t('footer.friends')}
            </h3>
            <ul className="space-y-2">
              {FRIEND_LINKS.map((link) => (
                <li key={link.url}>
                  <SafeLink
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 支持与合规 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {t('footer.support_legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <SafeLink href="/help" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.help_center')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/faq" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.faq')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/contact" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.contact_us')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/privacy" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.privacy')}
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/terms" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.terms')}
                </SafeLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© 2026 {t('title')}. All rights reserved.</p>
            <div className="hidden md:block w-px h-3 bg-slate-200" />
            <div className="flex gap-4">
              <SafeLink href="/privacy" className="hover:text-slate-600 transition-colors">
                {t('footer.privacy')}
              </SafeLink>
              <SafeLink href="/terms" className="hover:text-slate-600 transition-colors">
                {t('footer.terms')}
              </SafeLink>
            </div>
          </div>
          <div className="flex gap-6">
            <SafeLink href="/what-hairstyle-suits-me" className="hover:text-slate-600 transition-colors">
              {t('nav.suits_me')}
            </SafeLink>
            <SafeLink href="/ai-hairstyle-male" className="hover:text-slate-600 transition-colors">
              {t('nav.male')}
            </SafeLink>
            <SafeLink href="/ai-hairstyle-female" className="hover:text-slate-600 transition-colors">
              {t('nav.female')}
            </SafeLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
