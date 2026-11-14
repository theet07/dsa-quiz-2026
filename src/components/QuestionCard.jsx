import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Lightbulb, 
  Terminal, 
  Sparkles,
  Flame,
  Key
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
  isLastQuestion,
  timeRemaining
}) {
  const [showHint, setShowHint] = useState(false);
  const letters = ['1', '2', '3', '4'];
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      
      {/* Container Widescreen de 2 Colunas estilo Codédex Split-Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        
        {/* COLUNA ESQUERDA (6 de 12 colunas): Instruções, Enunciado e Código no Editor */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Card de Enunciado e Teoria */}
          <div className="rounded-2xl border-2 border-black bg-white p-5 lg:p-6 shadow-neo dark:bg-[#181A20] dark:border-codedex-borderDark">
            
            {/* Topo do Enunciado */}
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-3 dark:border-white/10">
              <CategoryBadge 
                category={question.category} 
                difficulty={question.difficulty} 
              />
              <span className="font-pixel text-[11px] font-bold text-slate-500 dark:text-slate-400">
                FASE #{question.id.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Enunciado Principal */}
            <h2 className="text-lg lg:text-xl font-bold leading-relaxed text-black dark:text-white font-sans">
              {question.question}
            </h2>

            {/* Bloco de Código no Editor VS Code / Codédex */}
            {question.code && (
              <div className="mt-4">
                <CodeBlock code={question.code} />
              </div>
            )}

            {/* Dica de Código */}
            {question.tip && (
              <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
                {!showHint ? (
                  <button
                    onClick={() => setShowHint(true)}
                    className="flex items-center gap-1.5 font-pixel text-[10px] text-[#7928CA] dark:text-[#FFE600] font-bold hover:underline"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>PRECISA DE UMA DICA? [VER DICA DE CÓDIGO]</span>
                  </button>
                ) : (
                  <div className="rounded-xl border border-black/20 bg-[#FFFBEA] p-3 text-xs font-semibold text-amber-950 dark:bg-amber-950/30 dark:text-amber-200 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-pixel text-[10px] text-amber-800 dark:text-amber-400 mb-1">
                      <Lightbulb className="h-3.5 w-3.5" />
                      DICA DE CÓDIGO:
                    </div>
                    <p className="font-sans leading-normal font-medium">{question.tip}</p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Terminal / Console de Saída Codédex (Aparece ao Submeter a Resposta) */}
          {isAnswerSubmitted && (
            <div className={`rounded-2xl border-2 border-black p-4 lg:p-5 shadow-neo animate-fadeIn ${
              isCorrect 
                ? 'bg-[#00E599]/10 border-black dark:bg-[#00E599]/15 dark:border-[#00E599]' 
                : 'bg-[#FF4343]/10 border-black dark:bg-[#FF4343]/15 dark:border-[#FF4343]'
            }`}>
              <div className="flex items-center gap-2 border-b border-black/10 pb-2 mb-2 dark:border-white/10">
                <Terminal className="h-4 w-4 text-black dark:text-white" />
                <span className="font-pixel text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">
                  TERMINAL OUTPUT // TEST EXECUTION
                </span>
                <span className={`ml-auto font-pixel text-[10px] font-bold px-2 py-0.5 rounded border border-black ${
                  isCorrect ? 'bg-[#00E599] text-black' : 'bg-[#FF4343] text-white'
                }`}>
                  {isCorrect ? 'PASSED (+100 XP)' : 'FAILED (ERRO)'}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <p className={`font-bold ${isCorrect ? 'text-emerald-700 dark:text-[#00E599]' : 'text-rose-700 dark:text-[#FF4343]'}`}>
                  {isCorrect ? '✓ Test passed: Resposta correta!' : '✕ Test failed: Resposta incorreta!'}
                </p>
                <div className="text-slate-800 dark:text-slate-200 font-sans leading-relaxed text-xs sm:text-sm">
                  <strong>Explicação Didática:</strong> {question.explanation}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* COLUNA DIREITA (6 de 12 colunas): Seleção de Alternativas & Ação de Resposta */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          
          {/* Card das Alternativas */}
          <div className="rounded-2xl border-2 border-black bg-white p-5 lg:p-6 shadow-neo dark:bg-[#181A20] dark:border-codedex-borderDark">
            
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-4 dark:border-white/10">
              <span className="font-pixel text-xs font-bold text-black dark:text-white uppercase flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-[#00E599]" />
                ESCOLHA SUA RESPOSTA:
              </span>
              <span className="font-mono text-xs text-slate-400 font-semibold hidden sm:inline">
                Atalhos: 1, 2, 3, 4
              </span>
            </div>

            {/* Lista das 4 Alternativas */}
            <div className="space-y-3" role="radiogroup" aria-label="Opções de resposta">
              {question.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isThisCorrect = index === question.correctAnswer;

                let cardStyle = "border-2 border-black bg-[#FAF7EE] text-black shadow-neo-sm hover:bg-[#FFE600]/20 dark:bg-[#12141A] dark:text-white dark:border-codedex-borderDark dark:hover:border-white";
                let keycapStyle = "border border-black bg-white text-black dark:bg-[#1E2028] dark:text-white";

                if (isAnswerSubmitted) {
                  if (isThisCorrect) {
                    cardStyle = "border-2 border-black bg-[#00E599] text-black shadow-neo font-bold";
                    keycapStyle = "border border-black bg-black text-[#00E599]";
                  } else if (isSelected && !isThisCorrect) {
                    cardStyle = "border-2 border-black bg-[#FF4343] text-white shadow-neo font-bold";
                    keycapStyle = "border border-black bg-white text-black";
                  } else {
                    cardStyle = "border border-slate-300 opacity-40 bg-slate-100 text-slate-500 dark:border-slate-800 dark:bg-black/30";
                  }
                } else if (isSelected) {
                  cardStyle = "border-2 border-black bg-[#FFE600] text-black shadow-neo translate-x-[-1px] translate-y-[-1px] font-bold";
                  keycapStyle = "border border-black bg-black text-[#FFE600]";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !isAnswerSubmitted && onSelectOption(index)}
                    disabled={isAnswerSubmitted}
                    className={`group flex w-full items-center justify-between rounded-xl p-4 text-left text-sm lg:text-base font-semibold transition-all ${cardStyle} ${
                      !isAnswerSubmitted ? 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Tecla / Keycap Numérica */}
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-pixel text-xs font-bold ${keycapStyle}`}>
                        {letters[index]}
                      </span>

                      <span className="leading-snug font-sans">
                        {option}
                      </span>
                    </div>

                    {/* Ícone de feedback pós-submissão */}
                    {isAnswerSubmitted && (
                      <div className="ml-2 shrink-0">
                        {isThisCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-black drop-shadow" />
                        ) : isSelected ? (
                          <XCircle className="h-6 w-6 text-white drop-shadow" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Barra de Ação Codédex na Base da Coluna Direita */}
          <div className="rounded-2xl border-2 border-black bg-white p-4 shadow-neo flex flex-col sm:flex-row items-center justify-between gap-3 dark:bg-[#181A20] dark:border-codedex-borderDark">
            
            <div className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              {!isAnswerSubmitted ? (
                <span>Escolha uma opção e clique no botão ou pressione <strong>Enter</strong></span>
              ) : (
                <span>Questão verificada! Clique para avançar para a próxima fase</span>
              )}
            </div>

            <div className="w-full sm:w-auto">
              {!isAnswerSubmitted ? (
                <button
                  onClick={onConfirmAnswer}
                  disabled={selectedOption === null}
                  className={`btn-codedex-mint w-full sm:w-auto px-8 py-3.5 rounded-xl font-pixel text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${
                    selectedOption !== null 
                      ? 'cursor-pointer opacity-100' 
                      : 'opacity-40 cursor-not-allowed bg-slate-300 border-slate-400 shadow-none'
                  }`}
                >
                  <span>CONFIRMAR RESPOSTA</span>
                  <Check className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={onNextQuestion}
                  className="btn-codedex-yellow w-full sm:w-auto px-8 py-3.5 rounded-xl font-pixel text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isLastQuestion ? 'VER RESULTADO FINAL' : 'PRÓXIMA QUEST'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
