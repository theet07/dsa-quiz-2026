import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Lightbulb 
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
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all sm:p-7 dark:border-slate-800 dark:bg-slate-900">
      
      {/* Cabeçalho da Questão */}
      <div className="mb-4 flex items-center justify-between">
        <CategoryBadge 
          category={question.category} 
          difficulty={question.difficulty} 
        />
        <span className="text-xs font-semibold text-slate-400">
          ID #{question.id}
        </span>
      </div>

      {/* Enunciado */}
      <h2 className="text-base font-bold leading-relaxed text-slate-900 sm:text-lg dark:text-slate-100">
        {question.question}
      </h2>

      {/* Bloco de Código (se houver) */}
      {question.code && (
        <CodeBlock code={question.code} />
      )}

      {/* Lista de Alternativas */}
      <div className="mt-5 space-y-3" role="radiogroup" aria-label="Opções de resposta">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isThisCorrect = index === question.correctAnswer;

          let optionStyle = "border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-200 dark:hover:bg-slate-800/80";

          if (isAnswerSubmitted) {
            if (isThisCorrect) {
              optionStyle = "border-emerald-500 bg-emerald-50/90 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-200 ring-2 ring-emerald-500/30";
            } else if (isSelected && !isThisCorrect) {
              optionStyle = "border-rose-500 bg-rose-50/90 text-rose-900 dark:border-rose-600 dark:bg-rose-950/60 dark:text-rose-200 ring-2 ring-rose-500/30";
            } else {
              optionStyle = "border-slate-200 opacity-50 dark:border-slate-800 dark:opacity-40 text-slate-500";
            }
          } else if (isSelected) {
            optionStyle = "border-brand-600 bg-brand-50/80 text-brand-900 ring-2 ring-brand-500/30 dark:border-brand-500 dark:bg-brand-950/50 dark:text-brand-100";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswerSubmitted && onSelectOption(index)}
              disabled={isAnswerSubmitted}
              className={`group relative flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-medium transition-all duration-150 sm:p-4 ${optionStyle} ${
                !isAnswerSubmitted ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rótulo de Tecla / Letra */}
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                  isSelected && !isAnswerSubmitted
                    ? 'bg-brand-600 text-white dark:bg-brand-500'
                    : isAnswerSubmitted && isThisCorrect
                    ? 'bg-emerald-600 text-white'
                    : isAnswerSubmitted && isSelected && !isThisCorrect
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {letters[index]}
                </span>

                <span className="leading-snug">
                  {option}
                </span>
              </div>

              {/* Ícones de Validação */}
              {isAnswerSubmitted && (
                <div className="ml-2 shrink-0">
                  {isThisCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  ) : isSelected ? (
                    <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Caixa de Feedback Didático Explicativo */}
      {isAnswerSubmitted && (
        <div className={`mt-5 rounded-xl border p-4 transition-all duration-300 ${
          isCorrect 
            ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200'
            : 'border-rose-200 bg-rose-50/70 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200'
        }`}>
          <div className="flex items-start gap-2.5">
            {isCorrect ? (
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            )}
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="font-bold">
                {isCorrect ? 'Excelente! Resposta Correta.' : 'Ops! Resposta Incorreta.'}
              </p>
              <p className="leading-relaxed opacity-90">
                {question.explanation}
              </p>
              {question.tip && (
                <div className="mt-2 flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span className="text-[11px] sm:text-xs">
                    <strong>Dica para o Provão:</strong> {question.tip}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botões de Ação Principais (Rótulos Claros & Responsivos) */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
        <p className="text-xs text-slate-400 hidden sm:block">
          {!isAnswerSubmitted ? "Pressione 1-4 no teclado para escolher e Enter para confirmar" : "Pressione Enter para ir à próxima"}
        </p>

        <div className="flex items-center justify-end w-full sm:w-auto">
          {!isAnswerSubmitted ? (
            <button
              onClick={onConfirmAnswer}
              disabled={selectedOption === null}
              className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-md transition-all ${
                selectedOption !== null
                  ? 'bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98] shadow-brand-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600 shadow-none'
              }`}
            >
              <span>Confirmar Resposta</span>
              <Check className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/25 transition-all hover:from-brand-700 hover:to-indigo-700 active:scale-[0.98]"
            >
              <span>{isLastQuestion ? 'Ver Desempenho Final' : 'Próxima Questão'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
