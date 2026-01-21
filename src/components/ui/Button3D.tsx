import React from 'react';
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'brand' | 'gradient' | 'glass' | 'outlinePrimary';
  radius?: 'md' | 'lg' | 'xl' | '2xl' | 'full';
  asChild?: boolean;
}

/**
 * 3D 立体按钮组件
 * hover 阴影增强，active 下压特效
 * 输入：children (ReactNode), variant (样式类型), className, asChild (是否作为子组件渲染)
 * 输出：具有 3D 点击感的交互按钮
 */
export const Button3D = ({
  children,
  className,
  variant = 'primary',
  radius = 'lg',
  asChild = false,
  ref,
  ...props
}: Button3DProps) => {
  const Comp = asChild ? Slot : "button";

  const variants = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] hover:shadow-[0_6px_0_0_#1d4ed8] active:shadow-none active:translate-y-[4px]",
    secondary: "bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-[0_4px_0_0_#7e22ce] hover:shadow-[0_6px_0_0_#7e22ce] active:shadow-none active:translate-y-[4px]",
    gradient: "relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] text-white shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.5)] hover:bg-[position:100%_0] transition-all duration-500 active:scale-[0.98] before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    glass: "relative bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:border-white/30 transition-all duration-300 active:scale-[0.97] before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/40 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
    brand: "bg-gradient-to-r from-violet-500 to-sky-400 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] active:translate-y-0 ring-1 ring-white/20",
    outline: "bg-white/80 border border-slate-200 text-slate-800 shadow-[0_4px_0_0_#e2e8f0] hover:shadow-[0_6px_0_0_#e2e8f0] active:shadow-none active:translate-y-[4px]",
    outlinePrimary: "bg-transparent border border-slate-200 text-slate-500 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-600/5 active:bg-purple-600 active:border-purple-600 active:text-white transition-all duration-200"
  };

  const radiusMap = {
    md: "rounded-[6px]",
    lg: "rounded-[8px]",
    xl: "rounded-[12px]",
    '2xl': "rounded-[16px]",
    full: "rounded-full"
  };

  return (
    <Comp
      ref={ref}
      className={cn(
        "px-6 py-2.5 font-medium transition-all duration-75 flex items-center justify-center gap-2 select-none",
        radiusMap[radius],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

Button3D.displayName = 'Button3D';

