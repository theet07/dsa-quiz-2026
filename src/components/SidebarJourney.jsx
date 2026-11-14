import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  Sparkles, 
  Zap, 
  MapPin, 
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function SidebarJourney({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
  userAnswers,
  score,
  isCollapsed,
  onToggleCollapse
}) {
  const completedCount = userAnswers.length;
  const totalCount = questions.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Nível do jogador no estilo RPG Codédex
  const playerLevel = Math.floor(score / 200) + 1;
  const nextLevelXp = playerLevel * 200;
  const currentLevelProgress = Math.min(100, Math.round(((score % 200) / 200) * 100));

  const getRankName = (lvl) => {
    if (lvl >= 5) return 'DIAMOND RANK';
    if (lvl >= 4) return 'PLATINUM RANK';
    if (lvl >= 3) return 'GOLD RANK';
    if (lvl >= 2) return 'SILVER RANK';
    return 'BRONZE RANK';
  };

  return (
    <aside className={`transition-all duration-300 flex flex-col border-r-2 border-black/80 dark:border-codedex-borderDark bg-[#FAF7EE] dark:bg-[#12141A] shrink-0 ${
      isCollapsed ? 'w-16' : 'w-72 lg:w-80'
    }`}>
      
      {/* Topo do Sidebar */}
      <div className="p-4 border-b-2 border-black/10 dark:border-codedex-borderDark flex items-center justify-between">
        {!isCollapsed ? (
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-xs font-bold text-black dark:text-white">
                THE JS JOURNEY
              </span>
              <span className="rounded bg-[#00E599] px-1.5 py-0.2 font-pixel text-[8px] font-bold text-black border border-black">
                DSA '26
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Mapa das 10 Quests do Provão
            </p>
          </div>
        ) : (
          <div className="mx-auto font-pixel text-xs text-[#00E599] font-bold">
            🗺️
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="neo-btn rounded-lg bg-white p-1 text-black shadow-neo-sm dark:bg-[#181A20] dark:text-white hidden lg:flex"
          title={isCollapsed ? "Expandir Mapa" : "Recolher Mapa"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Progresso do Curso (Codédex XP Bar) */}
      {!isCollapsed && (
        <div className="p-3.5 border-b border-black/10 dark:border-codedex-borderDark bg-white/60 dark:bg-[#181A20]/50">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="font-pixel text-[10px] text-slate-600 dark:text-slate-300">
              PROGRESSO DO CURSO
            </span>
            <span className="font-pixel text-[10px] text-[#00E599]">
              {completedCount}/{totalCount} ({progressPercent}%)
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full border border-black bg-slate-200 overflow-hidden dark:bg-black/40">
            <div 
              className="h-full bg-gradient-to-r from-[#00E599] to-[#FFE600] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Lista de Quests / Capítulos */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const answer = userAnswers.find(a => a.questionId === q.id);
          const isAnswered = Boolean(answer);
          const isCorrect = answer?.isCorrect;

          let itemClass = "border border-black/20 bg-white/70 hover:bg-white text-slate-700 dark:border-codedex-borderDark dark:bg-[#181A20]/60 dark:text-slate-300 dark:hover:bg-[#1E2028]";
          
          if (isCurrent) {
            itemClass = "border-2 border-black bg-[#FFE600] text-black shadow-neo-sm ring-1 ring-black font-bold dark:bg-[#FFE600] dark:text-black";
          } else if (isAnswered) {
            if (isCorrect) {
              itemClass = "border border-black/40 bg-[#E8FDF3] text-emerald-950 dark:bg-[#064E3B]/30 dark:text-emerald-300";
            } else {
              itemClass = "border border-black/40 bg-[#FEF2F2] text-rose-950 dark:bg-[#7F1D1D]/30 dark:text-rose-300";
            }
          }

          if (isCollapsed) {
            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(idx)}
                className={`w-10 h-10 mx-auto flex items-center justify-center rounded-xl transition ${
                  isCurrent ? 'bg-[#FFE600] border-2 border-black font-bold text-black shadow-neo-sm' : 'border border-black/20 bg-white dark:bg-[#181A20]'
                }`}
                title={`Quest ${idx + 1}: ${q.category}`}
              >
                {isAnswered ? (
                  isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-[#00E599]" />
                  ) : (
                    <XCircle className="h-4 w-4 text-[#FF4343]" />
                  )
                ) : (
                  <span className="font-pixel text-[10px]">{idx + 1}</span>
                )}
              </button>
            );
          }

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition-all ${itemClass}`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                {/* Indicador de Status */}
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-pixel text-[10px] ${
                  isCurrent 
                    ? 'bg-black text-[#FFE600]' 
                    : isAnswered && isCorrect
                    ? 'bg-[#00E599] text-black font-bold'
                    : isAnswered && !isCorrect
                    ? 'bg-[#FF4343] text-white font-bold'
                    : 'bg-slate-200 text-slate-600 dark:bg-black/50 dark:text-slate-400'
                }`}>
                  {isAnswered ? (
                    isCorrect ? '✓' : '✕'
                  ) : (
                    idx + 1
                  )}
                </span>

                {/* Título da Quest */}
                <div className="truncate">
                  <p className="font-bold truncate text-[11px] leading-tight font-sans">
                    {q.category}
                  </p>
                  <span className="text-[10px] font-pixel text-slate-500 dark:text-slate-400">
                    QUEST {idx + 1} • {q.difficulty}
                  </span>
                </div>
              </div>

              {/* Tag de Recompensa */}
              <div className="shrink-0 ml-1">
                {isCurrent && (
                  <span className="inline-block h-2 w-2 rounded-full bg-black animate-ping" />
                )}
                {!isCurrent && isAnswered && (
                  <span className={`font-pixel text-[9px] font-bold ${isCorrect ? 'text-[#00E599]' : 'text-slate-400'}`}>
                    {isCorrect ? '+100 XP' : '0 XP'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Cartão do Jogador (Codédex Profile Card) */}
      {!isCollapsed && (
        <div className="p-3.5 border-t-2 border-black/10 dark:border-codedex-borderDark bg-white dark:bg-[#181A20]">
          <div className="flex items-center gap-3">
            {/* Avatar 8-bit */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-[#FFE600] text-black shadow-neo-sm font-pixel text-base font-bold">
              👾
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-pixel text-[11px] font-bold text-black dark:text-white truncate">
                  MATHEUS
                </p>
                <span className="rounded bg-[#7928CA] px-1.5 py-0.2 font-pixel text-[8px] font-bold text-white border border-black">
                  LVL {playerLevel}
                </span>
              </div>
              
              <p className="text-[10px] font-bold text-[#00E599] font-pixel mt-0.5">
                {getRankName(playerLevel)}
              </p>

              {/* Barra de XP para o próximo nível */}
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="h-1.5 flex-1 rounded-full border border-black bg-slate-200 overflow-hidden dark:bg-black/50">
                  <div 
                    className="h-full bg-[#00E599]" 
                    style={{ width: `${currentLevelProgress}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-slate-400">
                  {score} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
}
