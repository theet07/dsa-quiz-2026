import React from 'react';
import { Clock, Zap, Target } from 'lucide-react';

export default function StatsBar({ timeRemaining, streak, currentScore, totalQuestions, currentQuestionIndex }) {
  const isTimeCritical = timeRemaining <= 10;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-[2.5px] border-black bg-white p-3 shadow-neo-sm dark:bg-[#1F2024] dark:border-black text-xs">
      
      {/* Tempo com estilo Arcade */}
      <div className={`flex items-center gap-1.5 font-bold ${
        isTimeCritical 
          ? 'text-[#FF4343] animate-pulse bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded border border-[#FF4343]' 
          : 'text-black dark:text-white'
      }`}>
        <Clock className={`h-4 w-4 ${isTimeCritical ? 'text-[#FF4343]' : 'text-slate-600 dark:text-slate-300'}`} />
        <span className="font-pixel text-[11px]">
          TEMPO: <strong className="font-mono text-sm">{timeRemaining}s</strong>
        </span>
      </div>

      {/* Bônus de Streak / XP */}
      <div className="flex items-center gap-1.5 font-bold text-black dark:text-white">
        <Zap className="h-4 w-4 text-[#FFE600] fill-[#FFE600]" />
        <span className="font-pixel text-[10px]">
          RECOMPENSA: <strong className="text-[#7928CA] dark:text-[#FFE600]">{streak > 1 ? `+${streak * 20 + 100} XP` : '100 XP'}</strong>
        </span>
      </div>

      {/* Nível da Fase */}
      <div className="flex items-center gap-1.5 font-bold text-black dark:text-white">
        <Target className="h-4 w-4 text-[#00DFD8]" />
        <span className="font-pixel text-[10px]">
          ETAPA: <strong>{currentQuestionIndex + 1}/{totalQuestions}</strong>
        </span>
      </div>

    </div>
  );
}
