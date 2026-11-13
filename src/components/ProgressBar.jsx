import React from 'react';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round(((current) / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>Questão {current + 1} de {total}</span>
        <span className="text-brand-600 dark:text-brand-400 font-bold">{percentage}% concluído</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${Math.max(percentage, 5)}%` }}
        />
      </div>
    </div>
  );
}
