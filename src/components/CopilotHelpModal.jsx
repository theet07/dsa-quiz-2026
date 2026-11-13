import React, { useState } from 'react';
import { BookOpen, X, Code2, Layers, Cpu, Cloud, Database, Check, Gamepad2 } from 'lucide-react';

export default function CopilotHelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('components');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border-[3px] border-black bg-[#FDFBF7] p-6 shadow-neo-lg dark:bg-[#1F2024] dark:border-black max-h-[90vh] flex flex-col">
        
        {/* Topo estilo Codédex */}
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black bg-[#FFE600] text-black shadow-neo-sm">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-pixel text-sm sm:text-base font-bold text-black dark:text-white uppercase">
                GUIA DA QUEST • CODÉDEX DSA
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Arquitetura do ReactJS, Props e Hooks para apresentação
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neo-btn rounded-lg bg-white p-2 text-black shadow-neo-sm dark:bg-[#121316] dark:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Abas com botões Neo-Brutalist */}
        <div className="flex flex-wrap border-b-2 border-black/10 pt-3 dark:border-white/10 gap-2 font-pixel text-[10px]">
          <button
            onClick={() => setActiveTab('components')}
            className={`neo-btn rounded-lg px-3 py-1.5 transition ${
              activeTab === 'components'
                ? 'bg-[#FFE600] text-black'
                : 'bg-white text-slate-700 dark:bg-[#16161A] dark:text-slate-300'
            }`}
          >
            COMPONENTES & PROPS
          </button>

          <button
            onClick={() => setActiveTab('hooks')}
            className={`neo-btn rounded-lg px-3 py-1.5 transition ${
              activeTab === 'hooks'
                ? 'bg-[#00DFD8] text-black'
                : 'bg-white text-slate-700 dark:bg-[#16161A] dark:text-slate-300'
            }`}
          >
            USESTATE & USEEFFECT
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`neo-btn rounded-lg px-3 py-1.5 transition ${
              activeTab === 'database'
                ? 'bg-[#22C55E] text-white'
                : 'bg-white text-slate-700 dark:bg-[#16161A] dark:text-slate-300'
            }`}
          >
            SUPABASE & BANCO
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`neo-btn rounded-lg px-3 py-1.5 transition ${
              activeTab === 'deploy'
                ? 'bg-[#FF0080] text-white'
                : 'bg-white text-slate-700 dark:bg-[#16161A] dark:text-slate-300'
            }`}
          >
            VERCEL DEPLOY
          </button>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="flex-1 overflow-y-auto py-4 text-xs sm:text-sm space-y-4 text-slate-800 dark:text-slate-200 pr-1 leading-relaxed font-sans">
          
          {activeTab === 'components' && (
            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-black dark:text-white uppercase">
                Arquitetura Modular em Componentes React:
              </h3>
              <ul className="space-y-2.5">
                <li className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <strong className="font-pixel text-[11px] text-[#7928CA] dark:text-[#FFE600]">1. Navbar:</strong> Cabeçalho com telemetria gamificada (XP acumulado, vidas ❤️, combo streak e controles de áudio 8-bit).
                </li>
                <li className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <strong className="font-pixel text-[11px] text-[#00DFD8]">2. QuestionCard:</strong> Cartão principal com enunciado, bloco de código com botões CRT e alternativas táteis com atalhos 1-4.
                </li>
                <li className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <strong className="font-pixel text-[11px] text-[#22C55E]">3. ProgressBar:</strong> Barra de XP e progresso dinâmico (Fase X de Y).
                </li>
                <li className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <strong className="font-pixel text-[11px] text-[#FF0080]">4. ResultScreen:</strong> Ficha de vitória com medalhas e acordeom de revisão com explicação de cada questão.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'hooks' && (
            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-black dark:text-white uppercase">
                Implementação dos Hooks (Requisito 3):
              </h3>
              
              <div className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                <h4 className="font-pixel text-[11px] text-[#7928CA] dark:text-[#FFE600] mb-1">
                  1. Hook useState
                </h4>
                <p className="text-xs">
                  Armazena a reatividade instantânea da interface:
                </p>
                <code className="block my-2 rounded-lg border border-black bg-[#16161A] p-2 font-mono text-[11px] text-[#FFE600]">
                  const [score, setScore] = useState(0); // XP acumulado<br />
                  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);<br />
                  const [selectedOption, setSelectedOption] = useState(null);
                </code>
              </div>

              <div className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                <h4 className="font-pixel text-[11px] text-[#00DFD8] mb-1">
                  2. Hook useEffect
                </h4>
                <ul className="mt-1 list-disc list-inside space-y-1 text-xs">
                  <li><strong>Persistência no localStorage:</strong> Salva o progresso e recupera se a página for fechada.</li>
                  <li><strong>Cronômetro:</strong> Contagem regressiva de 30s por fase com <code>clearInterval</code>.</li>
                  <li><strong>Teclado:</strong> Listener de atalhos numéricos <code>1, 2, 3, 4</code> e <code>Enter</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-black dark:text-white uppercase">
                Banco de Dados & Supabase (Requisito 4):
              </h3>
              <div className="rounded-xl border-2 border-black bg-white p-3 shadow-neo-sm dark:bg-[#16161A]">
                <h4 className="font-pixel text-[11px] text-[#22C55E] mb-1">
                  Arquitetura Híbrida Nuvem + Fallback
                </h4>
                <p className="text-xs">
                  Conectado à nuvem pelo pacote oficial <code>@supabase/supabase-js</code>. Se configurado, alimenta o ranking global da turma no PostgreSQL; caso contrário, opera localmente no <code>localStorage</code> sem quebras.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-3">
              <h3 className="font-pixel text-xs text-black dark:text-white uppercase">
                Publicação na Vercel (Requisito 5):
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-xs">
                <li>Suba o projeto para o GitHub: <code>git push origin main</code>.</li>
                <li>Importe no <strong>vercel.com/new</strong> e clique em <strong>Deploy</strong>.</li>
                <li>Teste a URL pública gerada em janela anônima e envie no Provão Paulista!</li>
              </ol>
            </div>
          )}

        </div>

        {/* Rodapé */}
        <div className="border-t-2 border-black/10 pt-3 dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="neo-btn rounded-xl bg-[#FFE600] px-5 py-2 font-pixel text-xs font-bold text-black uppercase cursor-pointer"
          >
            VOLTAR AO JOGO
          </button>
        </div>

      </div>
    </div>
  );
}
