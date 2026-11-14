import React, { useState } from 'react';
import PixelLandscapeHero from './PixelLandscapeHero';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Gamepad2, 
  Zap, 
  Trophy, 
  CheckCircle2, 
  Search,
  ArrowRight,
  RotateCcw,
  Terminal,
  BookOpen
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Variáveis & Tipos', 'Estruturas Condicionais', 'Estruturas de Repetição', 'Funções & Escopo', 'React Hooks'];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || q.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col bg-[#08090E] text-[#F3F4F6] select-none">
      
      {/* 1. HERO COM CENÁRIO PIXEL ART 100% WIDESCREEN (IDENTICO AO SCREENSHOT) */}
      <PixelLandscapeHero
        onStart={onStartNew}
        onOpenHelp={onOpenHelp}
        onOpenLeaderboard={onOpenLeaderboard}
      />

      {/* 2. SEÇÃO ESCURA INFERIOR (#08090E) - CATÁLOGO DAS FASES */}
      <section className="w-full py-12 px-4 sm:px-8 lg:px-16 space-y-8 bg-[#08090E]">
        
        {/* Banner de Sessão Salva (Se existir progresso no localStorage) */}
        {savedSession && (
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border-2 border-black bg-[#FFE600] p-5 shadow-[4px_4px_0px_#000] text-black">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-white shadow-neo-sm font-pixel text-lg">
                💾
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-xs font-bold uppercase">
                    SAVE GAME DETECTADO!
                  </span>
                  <span className="rounded bg-black text-[#FFE600] px-2 py-0.5 font-pixel text-[9px] font-bold">
                    FASE {savedSession.currentQuestionIndex + 1} DE {questions.length}
                  </span>
                </div>
                <p className="text-sm font-semibold font-sans mt-0.5">
                  Você já possui <strong>{savedSession.score} XP</strong> salvos. Deseja retomar a partida?
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onResumeSaved}
                className="px-6 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-[#00E599] font-pixel text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
              >
                CONTINUAR JOGO
              </button>
              <button
                onClick={onDiscardSaved}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-black font-pixel text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
              >
                DESCARTAR
              </button>
            </div>
          </div>
        )}

        {/* Título da Seção (Como no Screenshot) */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="font-pixel text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Explore as 10 fases interativas de programação
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-400 font-sans">
            Aprenda e revise código com desafios práticos criados para testar sua lógica, condicionais e React.
          </p>
        </div>

        {/* Barra de Pesquisa e Filtros de Categoria estilo Codédex */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-3 pt-2">
          
          {/* Campo de Busca */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar fase ou tópico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#12141A] pl-10 pr-4 py-2 text-xs font-sans text-white placeholder:text-slate-500 outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition"
            />
          </div>

          {/* Filtros em Pill */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap transition border ${
                    isActive 
                      ? 'bg-[#00E599] text-black border-[#00E599] shadow-sm font-bold' 
                      : 'bg-[#12141A] text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Grid Widescreen de Cards das Fases estilo Codédex */}
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-4">
          {filteredQuestions.map((q, idx) => {
            // Cores de capa temáticas para cada categoria
            const bgGradients = [
              'from-[#2A6E94] to-[#1A4259]',
              'from-[#7928CA] to-[#4C1885]',
              'from-[#00A86B] to-[#005B3A]',
              'from-[#D97706] to-[#92400E]',
              'from-[#C026D3] to-[#701A75]',
              'from-[#0284C7] to-[#0369A1]',
            ];
            const gradient = bgGradients[idx % bgGradients.length];

            return (
              <div
                key={q.id}
                onClick={onStartNew}
                className="group rounded-2xl border-2 border-black bg-[#12141A] overflow-hidden shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#00E599] transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Banner Gráfico da Fase */}
                <div className={`h-28 bg-gradient-to-tr ${gradient} p-4 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute right-2 bottom-0 opacity-20 font-pixel text-6xl pointer-events-none select-none">
                    #{q.id}
                  </div>
                  
                  <div className="flex items-center justify-between z-10">
                    <span className="font-pixel text-[9px] font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/20 uppercase">
                      FASE {q.id.toString().padStart(2, '0')}
                    </span>
                    <span className="font-pixel text-[9px] font-bold text-[#FFE600] bg-black/50 px-2 py-0.5 rounded border border-black">
                      +100 XP
                    </span>
                  </div>

                  <span className="font-pixel text-[11px] font-bold text-white z-10 drop-shadow">
                    {q.category}
                  </span>
                </div>

                {/* Corpo do Card com Enunciado */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#12141A]">
                  <div>
                    <h3 className="font-bold text-sm text-white font-sans line-clamp-2 leading-snug group-hover:text-[#00E599] transition">
                      {q.question}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-pixel text-[9px] text-slate-400">
                      NÍVEL: {q.difficulty.toUpperCase()}
                    </span>
                    <span className="font-pixel text-[9px] text-[#00E599] flex items-center gap-1 group-hover:translate-x-1 transition font-bold">
                      JOGAR <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
