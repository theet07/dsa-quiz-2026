import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

export default function CategoryBadge({ category, difficulty }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Fácil':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Médio':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Avançado':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-300">
        <Tag className="h-3 w-3" />
        {category}
      </span>
      {difficulty && (
        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${getDifficultyColor(difficulty)}`}>
          <Sparkles className="h-2.5 w-2.5" />
          {difficulty}
        </span>
      )}
    </div>
  );
}
