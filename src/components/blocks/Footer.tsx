import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlassCard } from '../ui/GlassCard';

/**
 * 友情链接配置数组
 */
const FRIEND_LINKS = [
  { name: 'AI Image Generator', url: 'https://example.com/ai-image' },
  { name: 'Face Swap Online', url: 'https://example.com/face-swap' },
  { name: 'Background Remover', url: 'https://example.com/bg-remove' },
  { name: 'AI Headshot Pro', url: 'https://example.com/headshot' },
];

/**
 * 博客文章 Mock 数据
 */
const RECENT_POSTS = [
  { title: 'Best Hairstyles for Round Faces in 2026', id: 'round-face-2026' },
  { title: 'How AI is Revolutionizing Hair Salons', id: 'ai-salon-revolution' },
  { title: 'Top 10 Male Haircuts for Summer', id: 'male-summer-haircuts' },
];

/**
 * 全站 Footer 组件
 * 包含：品牌信息、博客列表、友情链接、法律条款
 * 输入：无
 * 输出：带有玻璃质感的响应式 Footer
 */
export const Footer = () => {
  const t = useTranslations('hairstyle');

  return (
    <footer className="mt-20 pb-10 px-4">
      <GlassCard className="max-w-7xl mx-auto p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <Link href="/ai-hairstyle" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t('title')}
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* 博客模块 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {t('footer.blog')}
            </h3>
            <ul className="space-y-2">
              {RECENT_POSTS.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.id}`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
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
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 快速链接 & 法律 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {t('nav.changer')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-hairstyle-changer" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('nav.changer')}
                </Link>
              </li>
              <li>
                <Link href="/ai-hairstyle-changer-free" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('nav.free')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © 2026 {t('title')}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/what-hairstyle-suits-me" className="text-xs text-slate-400 hover:text-slate-600">
              {t('nav.suits_me')}
            </Link>
            <Link href="/ai-hairstyle-male" className="text-xs text-slate-400 hover:text-slate-600">
              {t('nav.male')}
            </Link>
            <Link href="/ai-hairstyle-female" className="text-xs text-slate-400 hover:text-slate-600">
              {t('nav.female')}
            </Link>
          </div>
        </div>
      </GlassCard>
    </footer>
  );
};

