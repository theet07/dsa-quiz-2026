import React from 'react';
import { 
  Flame, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';

export default function Navbar({ 
  score, 
  streak, 
  soundEnabled, 
  onToggleSound, 
  darkMode, 
  onToggleTheme,
  onOpenLeaderboard,
  onOpenHelp,
  onResetQuiz
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo & Marca Acadêmica */}
        <div 
          onClick={onResetQuiz}
          className="flex cursor-pointer items-center gap-2.5 transition hover:opacity-90"
          title="Clique para ir à página inicial do Quiz"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md shadow-brand-500/25">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                DSA 2026
              </span>
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-950/80 dark:text-brand-300">
                Provão Paulista
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Revisão Web em ReactJS
            </p>
          </div>
        </div>

        {/* Indicadores de Desempenho e Ações */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Streak de Acertos (Combo) */}
          {streak > 1 && (
            <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 animate-pulse-subtle border border-amber-500/20">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>{streak}x Combo!</span>
            </div>
          )}

          {/* Pontuação */}
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <span className="text-slate-400 font-normal">Pontos:</span>
            <span className="text-brand-600 dark:text-brand-400 text-sm font-extrabold">{score}</span>
          </div>

          {/* Botão Ranking */}
          <button
            onClick={onOpenLeaderboard}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            title="Ver Ranking dos Alunos"
          >
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="hidden sm:inline">Ranking</span>
          </button>

          {/* Botão Guia do Aluno / Copilot */}
          <button
            onClick={onOpenHelp}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            title="Explicação do Código e Componentes (Para Apresentação)"
          >
            <BookOpen className="h-4 w-4 text-indigo-500" />
            <span className="hidden sm:inline">Código & Dicas</span>
          </button>

          {/* Alternador de Áudio */}
          <button
            onClick={onToggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            title={soundEnabled ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros"}
            aria-label="Controle de Áudio"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Alternador de Tema (Claro / Escuro) */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            title={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            aria-label="Alternar Tema"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
