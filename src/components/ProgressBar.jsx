import React from 'react';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round(((current) / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between font-pixel text-[11px] text-black dark:text-slate-300">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="inline-block h-2 w-2 bg-[#FFE600] border border-black" />
          FASE {current + 1} DE {total}
        </span>
        <span className="font-bold text-[#7928CA] dark:text-[#00DFD8]">
          {percentage}% CARREGADO
        </span>
      </div>

      {/* Barra de Vida / XP Neo-Brutalist */}
      <div className="h-4 w-full overflow-hidden rounded-lg border-2 border-black bg-white p-0.5 shadow-neo-sm dark:bg-[#1F2024] dark:border-black">
        <div 
          className="h-full rounded-sm bg-gradient-to-r from-[#FFE600] via-[#00DFD8] to-[#22C55E] border border-black/40 transition-all duration-300 ease-out"
          style={{ width: `${Math.max(percentage, 5)}%` }}
        />
      </div>
    </div>
  );
}
