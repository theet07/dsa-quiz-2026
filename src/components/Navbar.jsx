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
  Heart
} from 'lucide-react';

export default function Navbar({ 
  score, 
  streak, 
  lives = 3,
  soundEnabled, 
  onToggleSound, 
  darkMode, 
  onToggleTheme,
  onOpenLeaderboard,
  onOpenHelp,
  onResetQuiz
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-[3px] border-black bg-[#FDFBF7] dark:bg-[#121316] dark:border-black transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2.5 sm:px-6">
        
        {/* Logo Codédex Style */}
        <div 
          onClick={onResetQuiz}
          className="flex cursor-pointer items-center gap-2.5 transition active:scale-95"
          title="Reiniciar Quest"
        >
          {/* Caixa de Ícone Neo-brutalist */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-neo-sm">
            <Gamepad2 className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-sm tracking-tight text-black dark:text-white font-bold">
                DSA.DEX
              </span>
              <span className="rounded border border-black bg-[#00DFD8] px-1.5 py-0.2 text-[9px] font-pixel font-bold text-black uppercase shadow-[1px_1px_0px_#000]">
                2026
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Provão Paulista Quest
            </p>
          </div>
        </div>

        {/* Indicadores de XP, Vidas e Ações */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Vidas / HP (Hearts) */}
          <div className="hidden sm:flex items-center gap-1 rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-bold shadow-neo-sm dark:bg-[#1F2024] dark:border-black">
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

          {/* Combo Streak */}
          {streak > 1 && (
            <div className="flex items-center gap-1 rounded-lg border-2 border-black bg-[#FF0080] px-2.5 py-1 text-[11px] font-pixel font-bold text-white shadow-neo-sm animate-bounce">
              <Flame className="h-3.5 w-3.5 fill-white text-white" />
              <span>{streak}x</span>
            </div>
          )}

          {/* XP Badge Codédex */}
          <div className="flex items-center gap-1.5 rounded-lg border-2 border-black bg-[#FFE600] px-3 py-1 text-xs font-pixel font-bold text-black shadow-neo-sm">
            <Zap className="h-4 w-4 fill-black text-black" />
            <span>{score} XP</span>
          </div>

          {/* Botão Ranking */}
          <button
            onClick={onOpenLeaderboard}
            className="neo-btn flex h-9 items-center gap-1.5 rounded-lg bg-white px-2.5 text-xs font-bold text-black shadow-neo-sm dark:bg-[#1F2024] dark:text-white"
            title="Ver Placar de Líderes"
          >
            <Trophy className="h-4 w-4 text-[#FFAA00]" />
            <span className="hidden md:inline font-pixel text-[10px]">Rank</span>
          </button>

          {/* Botão Guia do Aluno / Copilot */}
          <button
            onClick={onOpenHelp}
            className="neo-btn flex h-9 items-center gap-1.5 rounded-lg bg-white px-2.5 text-xs font-bold text-black shadow-neo-sm dark:bg-[#1F2024] dark:text-white"
            title="Guia do Aluno & Código"
          >
            <BookOpen className="h-4 w-4 text-[#7928CA]" />
            <span className="hidden md:inline font-pixel text-[10px]">Guia</span>
          </button>

          {/* Botão Som Chiptune */}
          <button
            onClick={onToggleSound}
            className="neo-btn flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black shadow-neo-sm dark:bg-[#1F2024] dark:text-white"
            title={soundEnabled ? "Desativar áudio 8-bit" : "Ativar áudio 8-bit"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[#22C55E]" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Botão Tema */}
          <button
            onClick={onToggleTheme}
            className="neo-btn flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black shadow-neo-sm dark:bg-[#1F2024] dark:text-white"
            title="Alternar Tema"
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
