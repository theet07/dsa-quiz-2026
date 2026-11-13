import React from 'react';
import { Clock, Zap, Target } from 'lucide-react';

export default function StatsBar({ timeRemaining, streak, currentScore, totalQuestions, currentQuestionIndex }) {
  const isTimeCritical = timeRemaining <= 10;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/60 p-2.5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-300">
      
      {/* Tempo Restante */}
      <div className={`flex items-center gap-1.5 font-medium ${isTimeCritical ? 'text-rose-600 dark:text-rose-400 font-bold animate-pulse' : ''}`}>
        <Clock className={`h-4 w-4 ${isTimeCritical ? 'text-rose-500' : 'text-slate-400'}`} />
        <span>Tempo: <strong className="font-mono text-sm">{timeRemaining}s</strong></span>
      </div>

      {/* Multiplicador de Combo */}
      <div className="flex items-center gap-1.5">
        <Zap className="h-4 w-4 text-amber-500" />
        <span>Bônus: <strong className="text-amber-600 dark:text-amber-400">{streak > 1 ? `+${streak * 20} pts` : 'Padrão (100 pts)'}</strong></span>
      </div>

      {/* Posição no Quiz */}
      <div className="flex items-center gap-1.5">
        <Target className="h-4 w-4 text-brand-500" />
        <span>Progresso: <strong>{currentQuestionIndex + 1}/{totalQuestions}</strong></span>
      </div>

    </div>
  );
}
