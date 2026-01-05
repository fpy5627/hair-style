import React from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button3D } from '@/components/ui/Button3D';
import { ArrowRight, Sparkles, User, UserCheck, HelpCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/**
 * 意图引导卡片组件
 */
export const IntentCards = () => {
  const t = useTranslations('hairstyle.nav');
  
  const intents = [
    { title: t('changer'), icon: <Sparkles />, href: '/ai-hairstyle-changer', desc: 'Try on any hairstyle instantly.' },
    { title: t('suits_me'), icon: <UserCheck />, href: '/what-hairstyle-suits-me', desc: 'Get expert recommendations.' },
    { title: t('male'), icon: <User />, href: '/ai-hairstyle-male', desc: 'Classic and modern cuts for men.' },
    { title: t('female'), icon: <User />, href: '/ai-hairstyle-female', desc: 'Elegant and trendy styles for women.' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
      {intents.map((intent) => (
        <Link key={intent.href} href={intent.href}>
          <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform cursor-pointer group">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {intent.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{intent.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{intent.desc}</p>
            <div className="flex items-center text-xs font-bold text-blue-600 gap-1 uppercase tracking-wider">
              Try it now <ArrowRight size={14} />
            </div>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
};

/**
 * 快速开始步骤组件
 */
export const QuickStartSteps = () => {
  const t = useTranslations('hairstyle.recommend');
  const steps = [
    { title: t('step1'), desc: 'Upload a clear face photo.' },
    { title: t('step2'), desc: 'AI analyzes your face shape and hair.' },
    { title: t('step3'), desc: 'Choose your favorite style and download.' },
  ];

  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-12">3 Simple Steps to a New You</h2>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 space-y-4 relative">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg shadow-blue-200">
              {idx + 1}
            </div>
            <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-slate-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * FAQ 手风琴组件
 */
export const FAQAccordion = () => {
  const faqs = [
    { q: 'Is the AI hairstyle changer free?', a: 'Yes, we offer a free trial plan for everyone to try out the core features.' },
    { q: 'What photo works best?', a: 'A clear, front-facing photo with good lighting and no hair covering your face works best.' },
    { q: 'Can I use it for professional styling?', a: 'Absolutely! Our AI results are highly realistic and used by professionals for visualization.' },
  ];

  return (
    <div className="py-20 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <HelpCircle className="text-blue-600" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <GlassCard key={idx} className="p-6">
            <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
            <p className="text-sm text-slate-500">{faq.a}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

/**
 * 相关链接模块
 */
export const RelatedLinks = () => {
  const links = [
    { title: 'Hairstyles for Oval Faces', href: '#' },
    { title: 'Best 2026 Short Haircuts', href: '#' },
    { title: 'Curly Hair Care Tips', href: '#' },
    { title: 'Face Shape Analysis Guide', href: '#' },
  ];

  return (
    <div className="py-12 border-t border-slate-100">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Explore More</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className="text-sm text-slate-600 hover:text-blue-600 px-4 py-2 bg-slate-50 rounded-full transition-colors">
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

/**
 * 免费 vs 专业版对比表组件
 */
export const ComparisonTable = () => {
  const features = [
    { name: 'Daily Generations', free: '3', pro: 'Unlimited' },
    { name: 'Hairstyle Library', free: 'Basic (50+)', pro: 'Premium (500+)' },
    { name: 'Image Resolution', free: 'Standard', pro: '4K Ultra HD' },
    { name: 'Watermark', free: 'Yes', pro: 'No' },
    { name: 'Processing Speed', free: 'Normal', pro: 'Instant' },
    { name: 'Commercial Use', free: 'No', pro: 'Yes' },
  ];

  return (
    <div className="py-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Free vs Pro</h2>
        <p className="text-sm text-slate-500">Choose the plan that fits your style needs.</p>
      </div>
      <GlassCard className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-4 md:p-6 text-sm font-bold text-slate-900 border-b border-slate-100">Feature</th>
              <th className="p-4 md:p-6 text-sm font-bold text-slate-900 border-b border-slate-100 text-center">Free</th>
              <th className="p-4 md:p-6 text-sm font-bold text-blue-600 border-b border-slate-100 text-center">Pro</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, idx) => (
              <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                <td className="p-4 md:p-6 text-sm text-slate-600 border-b border-slate-100">{f.name}</td>
                <td className="p-4 md:p-6 text-sm text-slate-500 border-b border-slate-100 text-center">{f.free}</td>
                <td className="p-4 md:p-6 text-sm font-medium text-slate-900 border-b border-slate-100 text-center">{f.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 bg-blue-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-800 font-medium">Want to unlock everything?</p>
          <Button3D variant="primary" className="w-full md:w-auto">Upgrade to Pro Now</Button3D>
        </div>
      </GlassCard>
    </div>
  );
};

