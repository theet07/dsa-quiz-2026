import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Lightbulb,
  Gamepad2
} from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import CodeBlock from './CodeBlock';

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  onConfirmAnswer,
  onNextQuestion,
  isAnswerSubmitted,
  isLastQuestion
}) {
  const letters = ['1', '2', '3', '4'];
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="w-full rounded-2xl border-[3px] border-black bg-white p-5 shadow-neo-lg transition-all sm:p-7 dark:bg-[#1F2024] dark:border-black">
      
      {/* Topo da Questão */}
      <div className="mb-4 flex items-center justify-between border-b-2 border-black/10 pb-3 dark:border-white/10">
        <CategoryBadge 
          category={question.category} 
          difficulty={question.difficulty} 
        />
        <span className="font-pixel text-[10px] font-bold text-slate-500 dark:text-slate-400">
          QUEST #{question.id.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Enunciado */}
      <h2 className="text-base sm:text-lg font-bold leading-relaxed text-black dark:text-white">
        {question.question}
      </h2>

      {/* Bloco de Código Retrô (se houver) */}
      {question.code && (
        <CodeBlock code={question.code} />
      )}

      {/* Opções de Resposta Neo-Brutalist */}
      <div className="mt-5 space-y-3" role="radiogroup" aria-label="Opções de resposta">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isThisCorrect = index === question.correctAnswer;

          let btnClass = "border-[2.5px] border-black bg-[#FDFBF7] text-black shadow-neo-sm hover:bg-[#FFF8D6] dark:bg-[#16161A] dark:text-white dark:hover:bg-[#252830]";
          let keycapClass = "border border-black bg-[#E5E7EB] text-black dark:bg-[#2A2B30] dark:text-white";

          if (isAnswerSubmitted) {
            if (isThisCorrect) {
              btnClass = "border-[2.5px] border-black bg-[#22C55E] text-white shadow-neo ring-2 ring-black";
              keycapClass = "border border-black bg-white text-black";
            } else if (isSelected && !isThisCorrect) {
              btnClass = "border-[2.5px] border-black bg-[#FF4343] text-white shadow-neo ring-2 ring-black";
              keycapClass = "border border-black bg-white text-black";
            } else {
              btnClass = "border-[2px] border-slate-300 opacity-40 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-900";
            }
          } else if (isSelected) {
            btnClass = "border-[2.5px] border-black bg-[#FFE600] text-black shadow-neo translate-x-[-1px] translate-y-[-1px]";
            keycapClass = "border border-black bg-black text-[#FFE600]";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswerSubmitted && onSelectOption(index)}
              disabled={isAnswerSubmitted}
              className={`group flex w-full items-center justify-between rounded-xl p-3.5 text-left text-sm font-bold transition-all sm:p-4 ${btnClass} ${
                !isAnswerSubmitted ? 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Tecla / Rótulo Keycap */}
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-pixel text-xs font-bold ${keycapClass}`}>
                  {letters[index]}
                </span>

                <span className="leading-snug font-sans">
                  {option}
                </span>
              </div>

              {/* Ícones de Validação */}
              {isAnswerSubmitted && (
                <div className="ml-2 shrink-0">
                  {isThisCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-white drop-shadow" />
                  ) : isSelected ? (
                    <XCircle className="h-6 w-6 text-white drop-shadow" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Caixa de Diálogo Didática estilo RPG */}
      {isAnswerSubmitted && (
        <div className={`mt-5 rounded-xl border-[2.5px] border-black p-4 shadow-neo-sm animate-fadeIn ${
          isCorrect 
            ? 'bg-[#ECFDF5] text-[#065F46] dark:bg-[#064E3B] dark:text-[#D1FAE5]' 
            : 'bg-[#FEF2F2] text-[#991B1B] dark:bg-[#7F1D1D] dark:text-[#FEE2E2]'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black ${
              isCorrect ? 'bg-[#22C55E] text-white' : 'bg-[#FF4343] text-white'
            }`}>
              {isCorrect ? <Check className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
            </div>
            
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="font-pixel text-[11px] font-bold uppercase tracking-wider">
                {isCorrect ? '★ RESPOSTA CORRETA (+XP CONCEDIDO)' : '✕ RESPOSTA INCORRETA (HP REDUZIDO)'}
              </p>
              <p className="font-sans leading-relaxed font-medium">
                {question.explanation}
              </p>
              {question.tip && (
                <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-black/20 bg-white/70 p-2 text-black dark:bg-black/30 dark:text-white">
                  <Lightbulb className="h-4 w-4 text-[#FFE600] shrink-0 fill-[#FFE600]" />
                  <span className="text-[11px] font-bold">
                    <strong>Dica de Mestre:</strong> {question.tip}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botões de Ação Principais */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t-2 border-black/10 pt-5 dark:border-white/10">
        <p className="font-pixel text-[10px] text-slate-500 hidden sm:block">
          {!isAnswerSubmitted ? "PRESSIONE [1-4] PARA ESCOLHER • [ENTER] PARA CONFIRMAR" : "PRESSIONE [ENTER] PARA AVANÇAR"}
        </p>

        <div className="flex items-center justify-end w-full sm:w-auto">
          {!isAnswerSubmitted ? (
            <button
              onClick={onConfirmAnswer}
              disabled={selectedOption === null}
              className={`neo-btn flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-7 py-3 font-pixel text-xs font-bold uppercase tracking-wider ${
                selectedOption !== null
                  ? 'bg-[#FFE600] text-black cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300 shadow-none dark:bg-slate-800 dark:text-slate-600'
              }`}
            >
              <span>CONFIRMAR RESPOSTA</span>
              <Check className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="neo-btn flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#00DFD8] px-7 py-3 font-pixel text-xs font-bold text-black uppercase tracking-wider cursor-pointer"
            >
              <span>{isLastQuestion ? 'VER RESULTADO FINAL' : 'PRÓXIMA FASE'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
