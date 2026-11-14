import React from 'react';
import { 
  Flame, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  BookOpen, 
  Zap,
  Gamepad2,
  Heart,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ 
  score, 
  streak, 
  lives = 3,
  currentQuestionIndex,
  totalQuestions,
  soundEnabled, 
  onToggleSound, 
  darkMode, 
  onToggleTheme,
  onOpenLeaderboard,
  onOpenHelp,
  onResetQuiz
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black/80 bg-[#FAF7EE] dark:bg-[#12141A] dark:border-codedex-borderDark transition-colors">
      <div className="flex h-16 w-full items-center justify-between px-3 sm:px-6">
        
        {/* Lado Esquerdo: Logo & Breadcrumbs estilo Codédex */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Logo Principal */}
          <div 
            onClick={onResetQuiz}
            className="flex cursor-pointer items-center gap-2.5 transition active:scale-95 group"
            title="Página Inicial do Curso"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FFE600] text-black shadow-neo-sm group-hover:rotate-6 transition">
              <Gamepad2 className="h-5 w-5" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-pixel text-xs lg:text-sm font-bold text-black dark:text-white tracking-tight">
                  CODÉDEX
                </span>
                <span className="rounded bg-[#00E599] px-1.5 py-0.2 font-pixel text-[9px] font-bold text-black border border-black shadow-[1px_1px_0px_#000]">
                  DSA '26
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Provão Paulista 2026
              </p>
            </div>
          </div>

          {/* Breadcrumbs de Navegação do Curso */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold border-l-2 border-black/10 pl-4 dark:border-codedex-borderDark text-slate-600 dark:text-slate-400">
            <span>JavaScript Journey</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold text-black dark:text-white">
              Quest {currentQuestionIndex + 1} de {totalQuestions}
            </span>
          </div>
        </div>

        {/* Lado Direito: Gamificação (Streak, XP, Vidas, Ações) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Vidas / HP (Hearts) */}
          <div className="flex items-center gap-1 rounded-xl border-2 border-black bg-white px-2.5 py-1 text-xs font-bold shadow-neo-sm dark:bg-[#181A20] dark:border-codedex-borderDark">
            {[1, 2, 3].map((heartIndex) => (
              <Heart 
                key={heartIndex} 
                className={`h-4 w-4 ${
                  heartIndex <= lives 
                    ? 'fill-[#FF4343] text-[#FF4343] animate-pulse-subtle' 
                    : 'text-slate-300 dark:text-slate-600 fill-transparent'
                }`} 
              />
            ))}
          </div>

          {/* Streak Flame */}
          {streak > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#FF0080] px-2.5 py-1 text-[11px] font-pixel font-bold text-white shadow-neo-sm animate-bounce">
              <Flame className="h-3.5 w-3.5 fill-white text-white" />
              <span>{streak}x COMBO</span>
            </div>
          )}

          {/* XP Pill Codédex */}
          <div className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#FFE600] px-3 py-1 font-pixel text-xs font-bold text-black shadow-neo-sm">
            <Zap className="h-4 w-4 fill-black text-black" />
            <span>{score} XP</span>
          </div>

          {/* Botão Placar / Ranking */}
          <button
            onClick={onOpenLeaderboard}
            className="neo-btn flex h-9 items-center gap-1.5 rounded-xl bg-white px-3 text-xs font-bold text-black shadow-neo-sm dark:bg-[#181A20] dark:text-white dark:border-codedex-borderDark"
            title="Placar de Líderes"
          >
            <Trophy className="h-4 w-4 text-[#FFAA00]" />
            <span className="hidden lg:inline font-pixel text-[10px]">RANKING</span>
          </button>

          {/* Botão Guia do Aluno / Copilot */}
          <button
            onClick={onOpenHelp}
            className="neo-btn flex h-9 items-center gap-1.5 rounded-xl bg-white px-3 text-xs font-bold text-black shadow-neo-sm dark:bg-[#181A20] dark:text-white dark:border-codedex-borderDark"
            title="Guia Acadêmico e Explicação do Código"
          >
            <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
            <span className="hidden lg:inline font-pixel text-[10px]">CÓDIGO & GUIA</span>
          </button>

          {/* Botão Som Chiptune */}
          <button
            onClick={onToggleSound}
            className="neo-btn flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-neo-sm dark:bg-[#181A20] dark:text-white dark:border-codedex-borderDark"
            title={soundEnabled ? "Desativar áudio 8-bit" : "Ativar áudio 8-bit"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[#00E599]" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Botão Tema Dark/Light */}
          <button
            onClick={onToggleTheme}
            className="neo-btn flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-neo-sm dark:bg-[#181A20] dark:text-white dark:border-codedex-borderDark"
            title="Alternar Modo Escuro / Claro"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-[#FFE600]" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
