import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Target, 
  X, 
  Trash2, 
  Cloud, 
  Database, 
  Check, 
  RefreshCw, 
  Crown
} from 'lucide-react';
import { isSupabaseActive } from '../utils/supabaseClient';

export default function Leaderboard({ 
  isOpen, 
  onClose, 
  leaderboard, 
  onRefresh, 
  onClearLeaderboard 
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const isConnected = isSupabaseActive();

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl border-[3px] border-black bg-[#FDFBF7] p-6 shadow-neo-lg dark:bg-[#16161A] dark:border-black max-h-[92vh] flex flex-col">
        
        {/* Topo do Placar Arcade */}
        <div className="flex items-start justify-between border-b-2 border-black/10 pb-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE600] text-black shadow-neo-sm">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-base font-bold text-black dark:text-white uppercase">
                  HIGH SCORES
                </h2>
                {isConnected ? (
                  <span className="inline-flex items-center gap-1 rounded border border-black bg-[#22C55E] px-2 py-0.5 font-pixel text-[8px] font-bold text-white shadow-[1px_1px_0px_#000]">
                    <Cloud className="h-2.5 w-2.5" /> SUPABASE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded border border-black bg-slate-200 px-2 py-0.5 font-pixel text-[8px] font-bold text-black shadow-[1px_1px_0px_#000] dark:bg-slate-700 dark:text-white">
                    <Database className="h-2.5 w-2.5" /> LOCAL
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                {isConnected ? "Sincronizado na nuvem (todos os participantes)" : "Salvo localmente no seu navegador"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              className={`neo-btn rounded-lg bg-white p-2 text-black shadow-neo-sm dark:bg-[#1F2024] dark:text-white ${isRefreshing ? 'animate-spin' : ''}`}
              title="Recarregar Placar"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="neo-btn rounded-lg bg-white p-2 text-black shadow-neo-sm dark:bg-[#1F2024] dark:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Subcabeçalho de Contagem de Jogadores */}
        <div className="my-3 flex items-center justify-between text-xs border-b border-black/10 dark:border-white/10 pb-2">
          <span className="font-pixel text-[10px] text-slate-500 uppercase">
            {leaderboard.length} {leaderboard.length === 1 ? 'JOGADOR REGISTRADO' : 'JOGADORES NO PLACAR'}
          </span>
          {isConnected && (
            <span className="font-pixel text-[9px] text-[#22C55E] flex items-center gap-1">
              <Check className="h-3 w-3" /> NUVEM CONECTADA
            </span>
          )}
        </div>

        {/* Lista Arcade de Pontuações */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2 pr-1">
          {leaderboard.length === 0 ? (
            <div className="py-12 text-center font-pixel text-xs text-slate-400">
              NENHUM SCORE REGISTRADO AINDA.
            </div>
          ) : (
            leaderboard.map((item, index) => {
              const isTop3 = index < 3;
              const medals = ['🥇', '🥈', '🥉'];

              let cardBg = "bg-white border-black/80 dark:bg-[#1E1F24] dark:border-white/10";
              if (index === 0) cardBg = "bg-[#FFFDE7] border-black dark:bg-[#FFE600]/10 dark:border-[#FFE600]/40";
              else if (index === 1) cardBg = "bg-[#F0FDF4] border-black dark:bg-[#00DFD8]/10 dark:border-[#00DFD8]/40";
              else if (index === 2) cardBg = "bg-[#FDF2F8] border-black dark:bg-[#FF0080]/10 dark:border-[#FF0080]/40";

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-xl border-2 p-3 shadow-neo-sm ${cardBg}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center font-pixel text-xs font-bold">
                      {isTop3 ? medals[index] : `#${index + 1}`}
                    </span>
                    <div>
                      <p className="font-pixel text-xs font-bold text-black dark:text-white uppercase">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-sans">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-[#22C55E]" />
                          {item.accuracy}% acurácia
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {item.totalTime}s
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-pixel text-sm font-bold text-black dark:text-[#FFE600]">
                      {item.score} XP
                    </span>
                    <span className="block font-mono text-[9px] text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé do Placar */}
        <div className="flex items-center justify-between border-t-2 border-black/10 pt-4 dark:border-white/10 text-xs">
          <button
            onClick={onClearLeaderboard}
            className="flex items-center gap-1.5 font-pixel text-[9px] text-slate-500 hover:text-[#FF4343] transition uppercase"
          >
            <Trash2 className="h-3 w-3" />
            <span>LIMPAR LOCAL</span>
          </button>
          <button
            onClick={onClose}
            className="neo-btn rounded-xl bg-[#FFE600] px-6 py-2 font-pixel text-xs font-bold text-black uppercase cursor-pointer"
          >
            FECHAR
          </button>
        </div>

      </div>
    </div>
  );
}
