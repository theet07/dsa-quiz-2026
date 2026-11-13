import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Zap,
  Clock,
  Target,
  Crown
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
    if (accuracy >= 60) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [accuracy]);

  const getRankBadge = () => {
    if (accuracy >= 90) {
      return {
        title: "MESTRE DO JAVASCRIPT",
        level: "LVL. 99 • OURO",
        bg: "bg-[#FFE600] text-black",
        desc: "Domínio lendário! Você destruiu o Provão Paulista!"
      };
    }
    if (accuracy >= 70) {
      return {
        title: "DEV FLUENTE DSA",
        level: "LVL. 50 • PRATA",
        bg: "bg-[#00DFD8] text-black",
        desc: "Excelente execução! Você está pronto para o Provão."
      };
    }
    if (accuracy >= 50) {
      return {
        title: "APRENDIZ DE CÓDIGO",
        level: "LVL. 25 • BRONZE",
        bg: "bg-[#FF0080] text-white",
        desc: "Bom progresso! Pratique mais repetições e closures."
      };
    }
    return {
      title: "INICIANTE DA GUILDA",
      level: "LVL. 01 • TREINO",
      bg: "bg-slate-300 text-black",
      desc: "Revisite os conceitos fundamentais e tente novamente!"
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
    const text = `🎮 Completei a Quest DSA.DEX 2026 (Provão Paulista)!\n⚡ XP Total: ${score} XP | 🎯 Acurácia: ${accuracy}%\n🏆 Rank: ${rank.title} [${rank.level}]!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      
      {/* Cartão de Fim de Quest estilo Codédex */}
      <div className="overflow-hidden rounded-3xl border-[3px] border-black bg-white p-6 sm:p-9 text-center shadow-neo-lg dark:bg-[#1F2024] dark:border-black">
        
        {/* Banner Pixel */}
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE600] shadow-neo text-black animate-bounce">
          <Crown className="h-8 w-8" />
        </div>

        <span className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-black px-4 py-1 font-pixel text-xs font-bold uppercase shadow-neo-sm ${rank.bg}`}>
          <Sparkles className="h-3.5 w-3.5" />
          {rank.level}
        </span>

        <h1 className="mt-3 font-pixel text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
          {rank.title}
        </h1>
        <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300 font-sans">
          {rank.desc}
        </p>

        {/* Ficha RPG de Estatísticas */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
          
          <div className="rounded-xl border-2 border-black bg-[#FFFBEA] p-3 shadow-neo-sm dark:bg-[#2A2B30]">
            <span className="font-pixel text-[9px] text-slate-500 uppercase">XP OBTIDO</span>
            <p className="mt-1 font-pixel text-lg font-bold text-black dark:text-[#FFE600]">
              {score}
            </p>
          </div>

          <div className="rounded-xl border-2 border-black bg-[#ECFDF5] p-3 shadow-neo-sm dark:bg-[#2A2B30]">
            <span className="font-pixel text-[9px] text-slate-500 uppercase">ACURÁCIA</span>
            <p className="mt-1 font-pixel text-lg font-bold text-[#22C55E]">
              {accuracy}%
            </p>
          </div>

          <div className="rounded-xl border-2 border-black bg-[#EFF6FF] p-3 shadow-neo-sm dark:bg-[#2A2B30]">
            <span className="font-pixel text-[9px] text-slate-500 uppercase">ACERTOS</span>
            <p className="mt-1 font-pixel text-lg font-bold text-[#7928CA] dark:text-[#00DFD8]">
              {correctCount}/{totalQuestions}
            </p>
          </div>

          <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#2A2B30]">
            <span className="font-pixel text-[9px] text-slate-500 uppercase">TEMPO GASTO</span>
            <p className="mt-1 font-pixel text-lg font-bold text-black dark:text-white">
              {totalTime}s
            </p>
          </div>

        </div>

        {/* Formulário de Registro no Ranking */}
        {!saved ? (
          <form onSubmit={handleSave} className="mt-6 rounded-2xl border-2 border-black bg-[#FDFBF7] p-4 text-left shadow-neo-sm dark:bg-[#16161A]">
            <label className="block font-pixel text-[10px] font-bold text-black dark:text-white uppercase mb-2">
              GRAVE SEU NOME NO PLACAR DE LÍDERES:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="SEU APELIDO / NOME..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                maxLength={25}
                required
                className="flex-1 rounded-xl border-2 border-black bg-white px-3.5 py-2 font-mono text-sm text-black outline-none shadow-neo-sm dark:bg-[#1F2024] dark:text-white"
              />
              <button
                type="submit"
                className="neo-btn rounded-xl bg-[#FFE600] px-5 py-2 font-pixel text-xs font-bold text-black uppercase cursor-pointer"
              >
                SALVAR NO RANKING
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#22C55E] p-3 font-pixel text-xs font-bold text-white shadow-neo-sm">
            <CheckCircle2 className="h-5 w-5" />
            <span>PONTUAÇÃO SALVA COM SUCESSO!</span>
            <button
              onClick={onViewLeaderboard}
              className="ml-3 underline text-black bg-white px-2 py-0.5 rounded border border-black hover:bg-[#FFE600]"
            >
              VER PLACAR
            </button>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="neo-btn flex items-center gap-2 rounded-xl bg-[#FFE600] px-6 py-3 font-pixel text-xs font-bold text-black uppercase cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>JOGAR NOVAMENTE</span>
          </button>

          <button
            onClick={() => setShowReview(!showReview)}
            className="neo-btn flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-pixel text-xs font-bold text-black uppercase cursor-pointer dark:bg-[#1F2024] dark:text-white"
          >
            {showReview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span>{showReview ? 'OCULTAR RESPOSTAS' : 'REVISAR FASES'}</span>
          </button>

          <button
            onClick={handleShare}
            className="neo-btn flex items-center gap-2 rounded-xl bg-[#00DFD8] px-6 py-3 font-pixel text-xs font-bold text-black uppercase cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>{copied ? 'COPIADO!' : 'COMPARTILHAR'}</span>
          </button>
        </div>

      </div>

      {/* Revisão Detalhada das Fases */}
      {showReview && (
        <div className="space-y-4 animate-fadeIn">
          <h2 className="font-pixel text-sm font-bold text-black dark:text-white uppercase">
            REGISTRO DE TODAS AS QUESTS ({totalQuestions})
          </h2>

          {questions.map((q, idx) => {
            const answer = userAnswers.find(a => a.questionId === q.id);
            const isAnswerCorrect = answer?.isCorrect;
            const chosenIndex = answer?.selectedOption;

            return (
              <div 
                key={q.id}
                className={`rounded-2xl border-[2.5px] border-black p-5 shadow-neo-sm ${
                  isAnswerCorrect 
                    ? 'bg-[#F0FDF4] dark:bg-[#064E3B]/40' 
                    : 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {isAnswerCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-[#22C55E] shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-[#FF4343] shrink-0" />
                    )}
                    <span className="font-pixel text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                      FASE {idx + 1} • {q.category}
                    </span>
                  </div>
                  <span className={`rounded-md border border-black px-2 py-0.5 font-pixel text-[9px] font-bold uppercase ${
                    isAnswerCorrect ? 'bg-[#22C55E] text-white' : 'bg-[#FF4343] text-white'
                  }`}>
                    {isAnswerCorrect ? 'ACERTOU' : 'ERROU'}
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-black dark:text-white font-sans">
                  {q.question}
                </p>

                {q.code && (
                  <CodeBlock code={q.code} />
                )}

                <div className="mt-3 space-y-1.5 text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Sua resposta:</span>
                    <span className={isAnswerCorrect ? 'text-[#22C55E] font-bold' : 'text-[#FF4343] font-bold'}>
                      {chosenIndex !== undefined && chosenIndex !== null ? q.options[chosenIndex] : 'Tempo Esgotado'}
                    </span>
                  </div>

                  {!isAnswerCorrect && (
                    <div className="flex items-center gap-2 text-[#065F46] dark:text-[#A7F3D0]">
                      <span className="font-bold">Resposta correta:</span>
                      <span className="font-bold">{q.options[q.correctAnswer]}</span>
                    </div>
                  )}

                  <p className="mt-2 rounded-xl border border-black/20 bg-white/80 p-3 text-slate-800 dark:bg-black/40 dark:text-slate-200 leading-relaxed">
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
