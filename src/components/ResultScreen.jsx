import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Clock, 
  Target, 
  Share2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CodeBlock from './CodeBlock';

export default function ResultScreen({
  score,
  userAnswers,
  questions,
  totalTime,
  onRestart,
  onSaveScore,
  onViewLeaderboard
}) {
  const [studentName, setStudentName] = useState('');
  const [saved, setSaved] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalQuestions = questions.length;
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Efeito de celebração com confetes
  useEffect(() => {
    if (accuracy >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [accuracy]);

  const getRankBadge = () => {
    if (accuracy >= 90) {
      return {
        title: "Mestre do JavaScript DSA",
        badge: "Ouro",
        color: "from-amber-400 to-yellow-600 text-amber-950",
        desc: "Excelente domínio de estruturas lógicas, condicionais e React!"
      };
    }
    if (accuracy >= 70) {
      return {
        title: "Desenvolvedor Fluente",
        badge: "Prata",
        color: "from-slate-300 to-slate-500 text-slate-900",
        desc: "Ótimo desempenho! Pronto para o Provão Paulista."
      };
    }
    if (accuracy >= 50) {
      return {
        title: "Em Desenvolvimento",
        badge: "Bronze",
        color: "from-amber-600 to-amber-800 text-amber-100",
        desc: "Bom início, revise os tópicos onde houve dúvidas."
      };
    }
    return {
      title: "Hora da Revisão",
      badge: "Iniciante",
      color: "from-brand-500 to-indigo-700 text-white",
      desc: "Pratique mais os métodos de array e o ciclo de hooks do React."
    };
  };

  const rank = getRankBadge();

  const handleSave = (e) => {
    e.preventDefault();
    if (!studentName.trim() || saved) return;
    onSaveScore({
      name: studentName.trim(),
      score,
      accuracy,
      totalTime
    });
    setSaved(true);
  };

  const handleShare = () => {
    const text = `🎯 Fiz o Quiz de Revisão DSA 2026 (Provão Paulista)!\nPontuação: ${score} pts | Acurácia: ${accuracy}% (${correctCount}/${totalQuestions})\nNível: ${rank.title} (${rank.badge})!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      
      {/* Cartão de Parabéns & Medalha */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
        
        {/* Ícone de Medalha */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-xl shadow-brand-500/20">
          <Trophy className="h-10 w-10 text-amber-300 animate-bounce" />
        </div>

        <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${rank.color} px-4 py-1 text-xs font-black uppercase tracking-wider shadow-sm`}>
          <Sparkles className="h-3.5 w-3.5" />
          Medalha {rank.badge}
        </span>

        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {rank.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {rank.desc}
        </p>

        {/* Métricas Principais */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400">Pontuação</span>
            <p className="mt-1 font-mono text-xl font-black text-brand-600 dark:text-brand-400">
              {score}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400">Acurácia</span>
            <p className="mt-1 font-mono text-xl font-black text-emerald-600 dark:text-emerald-400">
              {accuracy}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400">Acertos</span>
            <p className="mt-1 font-mono text-xl font-black text-indigo-600 dark:text-indigo-400">
              {correctCount}/{totalQuestions}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400">Tempo Total</span>
            <p className="mt-1 font-mono text-xl font-black text-slate-700 dark:text-slate-300">
              {totalTime}s
            </p>
          </div>

        </div>

        {/* Formulário de Registro no Ranking Local */}
        {!saved ? (
          <form onSubmit={handleSave} className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-900/60 dark:bg-brand-950/20">
            <label className="block text-xs font-semibold text-brand-900 dark:text-brand-300 text-left mb-2">
              Salvar sua pontuação no Ranking de DSA:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Digite seu nome ou apelido..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                maxLength={25}
                required
                className="flex-1 rounded-xl border border-brand-200 bg-white px-3.5 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 dark:border-brand-900 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="submit"
                className="rounded-xl bg-brand-600 px-5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-brand-700 active:scale-95"
              >
                Salvar no Placar
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>Resultado salvo no Placar de Líderes com sucesso!</span>
            <button
              onClick={onViewLeaderboard}
              className="ml-2 underline text-emerald-900 dark:text-emerald-200 hover:text-emerald-700"
            >
              Ver Placar
            </button>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-700 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Refazer Quiz</span>
          </button>

          <button
            onClick={() => setShowReview(!showReview)}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {showReview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span>{showReview ? 'Ocultar Revisão' : 'Revisar Todas as Respostas'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Share2 className="h-4 w-4 text-brand-500" />
            <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
          </button>
        </div>

      </div>

      {/* Seção Acordeom de Revisão Detalhada */}
      {showReview && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Revisão Completa das Questões ({totalQuestions})
          </h2>

          {questions.map((q, idx) => {
            const answer = userAnswers.find(a => a.questionId === q.id);
            const isAnswerCorrect = answer?.isCorrect;
            const chosenIndex = answer?.selectedOption;

            return (
              <div 
                key={q.id}
                className={`rounded-2xl border p-5 shadow-sm transition-all ${
                  isAnswerCorrect 
                    ? 'border-emerald-200/80 bg-white dark:border-emerald-900/40 dark:bg-slate-900' 
                    : 'border-rose-200/80 bg-white dark:border-rose-900/40 dark:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {isAnswerCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-400">
                      Questão {idx + 1} • {q.category}
                    </span>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isAnswerCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {isAnswerCorrect ? 'Acertou' : 'Errou'}
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>

                {q.code && (
                  <CodeBlock code={q.code} />
                )}

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Sua resposta:</span>
                    <span className={isAnswerCorrect ? 'text-emerald-600 font-bold dark:text-emerald-400' : 'text-rose-600 font-bold dark:text-rose-400'}>
                      {chosenIndex !== undefined && chosenIndex !== null ? q.options[chosenIndex] : 'Tempo esgotado / Não respondida'}
                    </span>
                  </div>

                  {!isAnswerCorrect && (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <span className="font-semibold">Resposta correta:</span>
                      <span className="font-bold">{q.options[q.correctAnswer]}</span>
                    </div>
                  )}

                  <p className="mt-2 rounded-lg bg-slate-50 p-2.5 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300 leading-relaxed">
                    <strong>Explicação:</strong> {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
