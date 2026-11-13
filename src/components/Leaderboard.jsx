import React from 'react';
import { Trophy, Medal, Clock, Target, X, Trash2 } from 'lucide-react';

export default function Leaderboard({ isOpen, onClose, leaderboard, onClearLeaderboard }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Placar de Líderes DSA
              </h2>
              <p className="text-xs text-slate-400">
                Top desempenhos salvos no navegador (localStorage)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lista de Ranking */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5 pr-1">
          {leaderboard.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-400">
              Nenhuma pontuação registrada ainda. Complete um quiz para entrar no placar!
            </div>
          ) : (
            leaderboard.map((item, index) => {
              const isTop3 = index < 3;
              const medals = ['🥇', '🥈', '🥉'];

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-2xl border p-3.5 transition ${
                    index === 0
                      ? 'border-amber-300/80 bg-amber-50/40 dark:border-amber-900/50 dark:bg-amber-950/20'
                      : 'border-slate-100 bg-slate-50/60 dark:border-slate-800/80 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center text-sm font-bold text-slate-500">
                      {isTop3 ? medals[index] : `#${index + 1}`}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-emerald-500" />
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
                    <span className="font-mono text-base font-extrabold text-brand-600 dark:text-brand-400">
                      {item.score}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800 text-xs">
          <button
            onClick={onClearLeaderboard}
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Limpar Ranking</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-brand-600 px-4 py-2 font-bold text-white transition hover:bg-brand-700"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
