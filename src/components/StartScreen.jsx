import React from 'react';
import { 
  Play, 
  Code, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Gamepad2, 
  Zap, 
  Trophy, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function StartScreen({
  questions,
  savedSession,
  onResumeSaved,
  onDiscardSaved,
  onStartNew,
  onOpenHelp,
  onOpenLeaderboard
}) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fadeIn py-4">
      
      {/* Banner de Jogo Salvo (Se existir sessão pendente) */}
      {savedSession && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border-2 border-black bg-[#FFE600] p-5 shadow-neo text-black">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-white shadow-neo-sm font-pixel text-lg">
              💾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs font-bold uppercase">
                  SAVE GAME LOCALIZADO!
                </span>
                <span className="rounded bg-black text-[#FFE600] px-2 py-0.5 font-pixel text-[9px] font-bold">
                  FASE {savedSession.currentQuestionIndex + 1} DE {questions.length}
                </span>
              </div>
              <p className="text-sm font-semibold font-sans mt-0.5">
                Você já acumulou <strong>{savedSession.score} XP</strong>. Deseja continuar de onde parou?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onResumeSaved}
              className="neo-btn flex-1 sm:flex-none rounded-xl bg-black px-6 py-2.5 font-pixel text-xs font-bold text-[#00E599] uppercase cursor-pointer"
            >
              CONTINUAR JOGO
            </button>
            <button
              onClick={onDiscardSaved}
              className="neo-btn rounded-xl bg-white px-4 py-2.5 font-pixel text-xs font-bold text-black uppercase cursor-pointer"
            >
              DESCARTAR
            </button>
          </div>
        </div>
      )}

      {/* Hero Banner Espaçoso e Imersivo estilo Codédex */}
      <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-10 lg:p-12 shadow-neo-xl dark:bg-[#181A20] dark:border-codedex-borderDark text-left relative overflow-hidden">
        
        {/* Fundo com Elementos Gráficos */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#00E599]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 opacity-10 dark:opacity-5 text-[180px] font-pixel pointer-events-none select-none">
          JS
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          
          {/* Badges de Destaque */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border-2 border-black bg-[#FFE600] px-3 py-1 font-pixel text-[10px] font-bold text-black uppercase shadow-neo-sm">
              DSA 2026 • QUEST
            </span>
            <span className="rounded-lg border-2 border-black bg-[#00E599] px-3 py-1 font-pixel text-[10px] font-bold text-black uppercase shadow-neo-sm">
              PROVÃO PAULISTA
            </span>
            <span className="rounded-lg border-2 border-black bg-[#8B5CF6] px-3 py-1 font-pixel text-[10px] font-bold text-white uppercase shadow-neo-sm">
              REACT + JAVASCRIPT
            </span>
          </div>

          <h1 className="font-pixel text-2xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white uppercase tracking-tight leading-tight">
            THE JAVASCRIPT JOURNEY
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
            Uma aventura interativa desenvolvida em <strong>ReactJS</strong> para revisar todos os conteúdos de JavaScript estudados em <strong>DSA durante 2026</strong>. Enfrente 10 desafios, ganhe XP, conquiste medalhas e lidere o placar da turma!
          </p>

          {/* Botões Principais de Início */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStartNew}
              className="btn-codedex-mint px-8 py-4 rounded-2xl font-pixel text-sm uppercase flex items-center justify-center gap-3 cursor-pointer shadow-neo"
            >
              <Play className="h-5 w-5 fill-black text-black" />
              <span>INICIAR JORNADA [START]</span>
            </button>

            <button
              onClick={onOpenHelp}
              className="neo-btn rounded-2xl bg-white px-6 py-4 font-pixel text-xs sm:text-sm font-bold text-black uppercase cursor-pointer dark:bg-[#12141A] dark:text-white dark:border-codedex-borderDark flex items-center justify-center gap-2"
            >
              <Code className="h-4 w-4 text-[#8B5CF6]" />
              <span>EXPLICAR CÓDIGO (GUIA)</span>
            </button>

            <button
              onClick={onOpenLeaderboard}
              className="neo-btn rounded-2xl bg-white px-6 py-4 font-pixel text-xs sm:text-sm font-bold text-black uppercase cursor-pointer dark:bg-[#12141A] dark:text-white dark:border-codedex-borderDark flex items-center justify-center gap-2"
            >
              <Trophy className="h-4 w-4 text-[#FFAA00]" />
              <span>VER RANKING</span>
            </button>
          </div>

          {/* Micro-telemetria */}
          <div className="pt-3 flex flex-wrap items-center gap-6 font-pixel text-[10px] text-slate-500 dark:text-slate-400 uppercase">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#FFE600] fill-[#FFE600]" />
              1.000+ XP DISPONÍVEIS
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#00E599]" />
              30S POR QUESTÃO
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#8B5CF6]" />
              SALVAMENTO LOCAL + SUPABASE
            </span>
          </div>

        </div>

      </div>

      {/* Grade de Capítulos do Curso estilo Codédex Curriculum */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-pixel text-base sm:text-lg font-bold text-black dark:text-white uppercase">
              CONTEÚDOS PEDAGÓGICOS DA JORNADA
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              As 10 etapas cobrem exatamente o currículo de DSA 2026 para o Provão Paulista
            </p>
          </div>
          <span className="font-pixel text-xs font-bold text-[#00E599] hidden sm:inline">
            10 CAPÍTULOS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border-2 border-black bg-white p-4 shadow-neo-sm hover:shadow-neo transition-all dark:bg-[#181A20] dark:border-codedex-borderDark flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-[10px] font-bold text-[#7928CA] dark:text-[#FFE600] uppercase">
                    CAPÍTULO {idx + 1}
                  </span>
                  <span className="rounded border border-black bg-[#FAF7EE] px-2 py-0.5 font-pixel text-[8px] font-bold uppercase dark:bg-black/40 text-black dark:text-white">
                    {q.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-black dark:text-white font-sans line-clamp-1">
                  {q.category}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1 line-clamp-2">
                  {q.question}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-pixel text-[9px] text-slate-500">
                <span>+100 XP RECOMPENSA</span>
                <span className="text-[#00E599] font-bold">READY →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
