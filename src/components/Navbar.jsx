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
  Heart,
  ChevronRight,
  Code2
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
    <header className="sticky top-0 z-50 w-full border-b border-[#1C1E24] bg-[#0A0B0E] text-white">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-8">
        
        {/* Lado Esquerdo: Moeda Dourada Pixelada + DSA 2026 */}
        <div className="flex items-center gap-4 lg:gap-8">
          
          {/* Logo Principal */}
          <div 
            onClick={onResetQuiz}
            className="flex cursor-pointer items-center gap-2.5 transition active:scale-95 group"
            title="Página Inicial da Jornada"
          >
            {/* Moeda Dourada Pixelada igual ao Screenshot */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] font-pixel text-sm font-bold group-hover:rotate-6 transition">
              DSA
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-sm sm:text-base font-bold tracking-tight text-white">
                DSA 2026
              </span>
              <span className="rounded bg-[#00E599] px-1.5 py-0.2 font-pixel text-[8px] font-bold text-black border border-black shadow-[1px_1px_0px_#000]">
                QUEST
              </span>
            </div>
          </div>

          {/* Links de Navegação estilo Codédex Navbar */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-sans font-semibold text-slate-300">
            <button 
              onClick={onResetQuiz}
              className="hover:text-white transition cursor-pointer"
            >
              Jornada
            </button>
            <button 
              onClick={onOpenLeaderboard}
              className="hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              Ranking
            </button>
            <button 
              onClick={onOpenHelp}
              className="hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              Código & Guia
            </button>
          </nav>
        </div>

        {/* Lado Direito: Gamificação (Streak, XP, Vidas, Ações) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Vidas / HP (Hearts) */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-[#12141A] px-2.5 py-1 text-xs font-bold">
            {[1, 2, 3].map((heartIndex) => (
              <Heart 
                key={heartIndex} 
                className={`h-3.5 w-3.5 ${
                  heartIndex <= lives 
                    ? 'fill-[#FF4343] text-[#FF4343]' 
                    : 'text-slate-600 fill-transparent'
                }`} 
              />
            ))}
          </div>

          {/* Streak Flame */}
          {streak > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-black bg-[#FF0080] px-2.5 py-1 text-[11px] font-pixel font-bold text-white shadow-[2px_2px_0px_#000] animate-bounce">
              <Flame className="h-3.5 w-3.5 fill-white text-white" />
              <span>{streak}x COMBO</span>
            </div>
          )}

          {/* XP Pill Dourado */}
          <div className="flex items-center gap-1.5 rounded-xl border border-black bg-[#FFE600] px-3 py-1 font-pixel text-xs font-bold text-black shadow-[2px_2px_0px_#000]">
            <Zap className="h-3.5 w-3.5 fill-black text-black" />
            <span>{score} XP</span>
          </div>

          {/* Botão Ranking */}
          <button
            onClick={onOpenLeaderboard}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-800 bg-[#12141A] px-3 text-xs font-bold text-slate-200 hover:border-slate-600 hover:text-white transition"
            title="Placar de Líderes"
          >
            <Trophy className="h-4 w-4 text-[#FFAA00]" />
            <span className="hidden lg:inline font-pixel text-[10px]">RANK</span>
          </button>

          {/* Botão Guia / Código */}
          <button
            onClick={onOpenHelp}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-800 bg-[#12141A] px-3 text-xs font-bold text-slate-200 hover:border-slate-600 hover:text-white transition"
            title="Guia do Projeto & Explicação do Código"
          >
            <BookOpen className="h-4 w-4 text-[#00E599]" />
            <span className="hidden lg:inline font-pixel text-[10px]">GUIA</span>
          </button>

          {/* Botão Som Chiptune */}
          <button
            onClick={onToggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#12141A] text-slate-300 hover:text-white transition"
            title={soundEnabled ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[#00E599]" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-500" />
            )}
          </button>

          {/* Botão Amarelo de Ação estilo "Sign up / Começar" */}
          <button
            onClick={onResetQuiz}
            className="px-4 py-1.5 rounded-xl bg-[#FFE600] hover:bg-[#FFD000] text-black font-pixel text-[11px] font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer hidden sm:block"
          >
            REINICIAR
          </button>

        </div>
      </div>
    </header>
  );
}
