'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StyleTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * 发型分类切换组件
 */
export const StyleTabs = ({ categories, activeCategory, onCategoryChange }: StyleTabsProps) => {
  return (
    <div className="flex gap-2 p-1 bg-slate-100/50 backdrop-blur-sm rounded-xl overflow-x-auto no-scrollbar border border-slate-200/50">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
            activeCategory === category
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

interface HairstyleGridProps {
  styles: Array<{ id: string; name: string; preview: string }>;
  selectedStyleId: string | null;
  onStyleSelect: (id: string) => void;
}

/**
 * 发型选择网格组件
 */
export const HairstyleGrid = ({ styles, selectedStyleId, onStyleSelect }: HairstyleGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {styles.map((style) => (
        <div
          key={style.id}
          onClick={() => onStyleSelect(style.id)}
          className={cn(
            "group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all",
            selectedStyleId === style.id
              ? "border-blue-500 shadow-md ring-2 ring-blue-500/20"
              : "border-transparent hover:border-slate-200"
          )}
        >
          <img 
            src={style.preview} 
            alt={style.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
          <div className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
            selectedStyleId === style.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            <div className="text-white text-center p-2">
              <p className="text-[10px] uppercase font-bold tracking-wider">{style.name}</p>
            </div>
          </div>
          {selectedStyleId === style.id && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

