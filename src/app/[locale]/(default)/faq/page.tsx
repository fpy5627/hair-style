'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import SafeLink from '@/components/common/safe-link';
import { Button3D } from '@/components/ui/Button3D';

/**
 * 独立 FAQ 页面 - 展示完整的问题列表 (8条+)
 */
export default function FAQPage() {
  const t = useTranslations('hairstyle.landing.faq');

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
    { q: t('q8'), a: t('a8') },
  ];

  return (
    <div className="bg-[#f8faff]">
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <SafeLink href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8">
            <ArrowLeft size={18} />
            <span className="font-bold text-sm">返回首页</span>
          </SafeLink>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
              <HelpCircle size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-slate-500 max-w-xl font-medium">
              在这里找到关于 Hairnova AI 发型顾问的所有答案。如果您还有其他问题，请随时联系我们。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, idx) => (
            <GlassCard key={idx} className="p-8 group hover:border-indigo-100 transition-all duration-300">
              <div className="flex gap-4">
                <span className="text-indigo-500 font-black text-xl shrink-0 mt-1">Q.</span>
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {faq.q}
                  </h3>
                  <div className="flex gap-4">
                    <span className="text-slate-200 font-black text-xl shrink-0">A.</span>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* 底部引导 */}
        <div className="mt-20 p-12 rounded-3xl bg-indigo-600 text-white text-center space-y-6 shadow-2xl shadow-indigo-200">
          <h2 className="text-2xl font-black">准备好尝试您的新发型了吗？</h2>
          <p className="opacity-90 max-w-md mx-auto text-sm font-medium">
            立即上传照片，AI 将在几秒钟内为您生成个性化推荐。
          </p>
          <div className="pt-4">
            <SafeLink href="/ai-hairstyle-changer">
              <Button3D variant="outline" className="px-10 h-14 text-indigo-600 bg-white border-transparent mx-auto">
                立即开始体验
              </Button3D>
            </SafeLink>
          </div>
        </div>
      </main>
    </div>
  );
}

