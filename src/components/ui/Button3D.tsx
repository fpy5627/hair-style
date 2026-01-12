import React from 'react';
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'brand' | 'gradient';
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
  ...props 
}: Button3DProps) => {
  const Comp = asChild ? Slot : "button";

  const variants = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] hover:shadow-[0_6px_0_0_#1d4ed8] active:shadow-none active:translate-y-[4px]",
    secondary: "bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-[0_4px_0_0_#7e22ce] hover:shadow-[0_6px_0_0_#7e22ce] active:shadow-none active:translate-y-[4px]",
    gradient: "bg-gradient-to-br from-[#6366f1] via-[#7c3aed] to-[#a855f7] text-white shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(99,102,241,0.6)] transition-all duration-500 active:scale-[0.98] ring-1 ring-white/30",
    brand: "bg-gradient-to-r from-violet-500 to-sky-400 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] active:translate-y-0 ring-1 ring-white/20",
    outline: "bg-white/80 border border-slate-200 text-slate-800 shadow-[0_4px_0_0_#e2e8f0] hover:shadow-[0_6px_0_0_#e2e8f0] active:shadow-none active:translate-y-[4px]"
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

