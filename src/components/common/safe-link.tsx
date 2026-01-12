'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface SafeLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string | null;
  children: React.ReactNode;
  className?: string;
}

/**
 * SafeLink 组件：增强 Next.js Link 的安全性，防止 href 为空字符串引起的 Console Error。
 * 
 * 逻辑：
 * 1. href 为非空字符串 (trim 后长度 > 0) -> 渲染 <Link href={href}>
 * 2. 否则 -> 渲染 <span aria-disabled="true">，并应用 pointer-events-none。
 * 
 * 解决水合差异：
 * 该组件为 'use client'，确保在客户端环境下渲染逻辑一致。
 */
export const SafeLink = ({ href, children, className, ...props }: SafeLinkProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isValidHref = typeof href === 'string' && href.trim() !== '';

  // 处理水合差异：在挂载前，如果依赖客户端状态，则先渲染占位
  // 但对于静态 href，我们可以直接渲染。
  // 如果 href 来源于动态变量，且可能存在水合差异，这里做一个保护。
  
  if (!isValidHref) {
    return (
      <span 
        className={cn("cursor-default pointer-events-none", className)} 
        aria-disabled="true"
        {...(props as any)}
      >
        {children}
      </span>
    );
  }

  // 如果没有挂载，且 href 可能是动态的（这里假设所有 SafeLink 都可能涉及水合），则先不渲染 Link。
  // 注意：这可能会稍微影响 SEO，但对于内部链接通常不是问题。
  // 如果追求极致 SEO 且确保 href 在 SSR 阶段就确定，可以移除此判断。
  if (!mounted) {
    return (
      <span 
        className={cn("cursor-default", className)} 
        aria-disabled="true"
        {...(props as any)}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href as string} legacyBehavior>
      <a className={cn(className)} {...(props as any)}>
        {children}
      </a>
    </Link>
  );
};

