'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface SafeLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string | null;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * SafeLink 组件：增强 Next.js Link 的安全性，防止 href 为空字符串引起的 Console Error。
 * 
 * React 19 兼容：ref 现在是普通 prop，不再需要 forwardRef。
 * 
 * 逻辑：
 * 1. href 为非空字符串 (trim 后长度 > 0) -> 渲染 <Link href={href}>
 * 2. 否则 -> 渲染 <span aria-disabled="true">，并应用 pointer-events-none。
 */
function SafeLink({ href, children, className, ref, ...props }: SafeLinkProps) {
  const isValidHref = typeof href === 'string' && href.trim() !== '';

  if (!isValidHref) {
    return (
      <span
        ref={ref as unknown as React.Ref<HTMLSpanElement>}
        className={cn("cursor-default pointer-events-none", className)}
        aria-disabled="true"
        {...(props as any)}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href as string}
      ref={ref}
      className={cn(className)}
      {...(props as any)}
    >
      {children}
    </Link>
  );
}

SafeLink.displayName = 'SafeLink';

export { SafeLink };
export default SafeLink;


