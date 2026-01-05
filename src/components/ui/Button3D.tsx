import React from 'react';
import { cn } from "@/lib/utils";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * 3D 立体按钮组件
 * hover 阴影增强，active 下压特效
 * 输入：children (ReactNode), variant (样式类型), className
 * 输出：具有 3D 点击感的交互按钮
 */
export const Button3D = ({ children, className, variant = 'primary', ...props }: Button3DProps) => {
  const variants = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] hover:shadow-[0_6px_0_0_#1d4ed8] active:shadow-none active:translate-y-[4px]",
    secondary: "bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-[0_4px_0_0_#7e22ce] hover:shadow-[0_6px_0_0_#7e22ce] active:shadow-none active:translate-y-[4px]",
    outline: "bg-white/80 border border-slate-200 text-slate-800 shadow-[0_4px_0_0_#e2e8f0] hover:shadow-[0_6px_0_0_#e2e8f0] active:shadow-none active:translate-y-[4px]"
  };

  return (
    <button 
      className={cn(
        "px-6 py-2.5 rounded-xl font-medium transition-all duration-75 flex items-center justify-center gap-2 select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

