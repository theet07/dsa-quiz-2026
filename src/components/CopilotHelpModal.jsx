import React, { useState } from 'react';
import { BookOpen, X, Code2, Layers, Cpu, Cloud, Check } from 'lucide-react';

export default function CopilotHelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('components');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Topo */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Guia Acadêmico & Explicação do Código
              </h2>
              <p className="text-xs text-slate-400">
                Apoio para avaliação DSA 2026 e defesa da aplicação
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

        {/* Abas */}
        <div className="flex border-b border-slate-100 pt-3 dark:border-slate-800 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('components')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'components'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Componentes & Props</span>
          </button>

          <button
            onClick={() => setActiveTab('hooks')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'hooks'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>useState & useEffect</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'deploy'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Cloud className="h-3.5 w-3.5" />
            <span>Publicação na Vercel</span>
          </button>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="flex-1 overflow-y-auto py-4 text-xs sm:text-sm space-y-4 text-slate-600 dark:text-slate-300 pr-1 leading-relaxed">
          
          {activeTab === 'components' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Como os componentes foram organizados e quais dados recebem (Props):
              </h3>
              <ul className="space-y-2.5">
                <li className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <strong className="text-brand-600 dark:text-brand-400">1. Navbar:</strong> Recebe pontuação (`score`), combo (`streak`), estado de áudio (`soundEnabled`) e callbacks de tema/modais. Fica fixo no topo.
                </li>
                <li className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <strong className="text-brand-600 dark:text-brand-400">2. QuestionCard:</strong> Recebe o objeto da questão (`question`), a opção selecionada (`selectedOption`) e os handlers de ação. Contém os botões acessíveis e o feedback explicativo.
                </li>
                <li className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <strong className="text-brand-600 dark:text-brand-400">3. ProgressBar:</strong> Recebe o índice atual e o total para calcular a barra dinâmica com interpolação suave.
                </li>
                <li className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <strong className="text-brand-600 dark:text-brand-400">4. ResultScreen:</strong> Apresenta as estatísticas consolidadas, ranking com medalhas e acordeom de revisão com todas as respostas corretas.
                </li>
                <li className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <strong className="text-brand-600 dark:text-brand-400">5. Leaderboard:</strong> Gerencia o ranking salvo localmente no `localStorage`.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'hooks' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Implementação dos Hooks ReactJS (Requisito 3):
              </h3>
              
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                <h4 className="font-bold text-brand-600 dark:text-brand-400 mb-1">
                  1. Hook useState
                </h4>
                <p>
                  Utilizado para reatividade visual imediata:
                </p>
                <code className="block my-2 rounded bg-slate-900 p-2 font-mono text-xs text-brand-300">
                  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);<br />
                  const [score, setScore] = useState(0);<br />
                  const [selectedOption, setSelectedOption] = useState(null);<br />
                  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
                </code>
                <p className="text-xs text-slate-500">
                  Ao confirmar uma resposta, `setScore` recalcula a pontuação com base no bônus de combo e atualiza a interface sem recarregar a página.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                <h4 className="font-bold text-brand-600 dark:text-brand-400 mb-1">
                  2. Hook useEffect
                </h4>
                <p>
                  Utilizado para sincronização de efeitos colaterais:
                </p>
                <ul className="mt-1 list-disc list-inside space-y-1 text-xs">
                  <li><strong>Persistência no localStorage:</strong> Salva o progresso do aluno a cada resposta e restaura automaticamente caso o aluno feche a aba.</li>
                  <li><strong>Cronômetro da questão:</strong> Um `setInterval` de 30 segundos com função de limpeza (`clearInterval`) para prevenir vazamento de memória.</li>
                  <li><strong>Atalhos de teclado acessíveis:</strong> `window.addEventListener('keydown')` para permitir responder com as teclas 1, 2, 3, 4 e Enter.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Como publicar o projeto na Vercel (Requisito 5):
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  <strong>Subir para o GitHub:</strong> O projeto já possui repositório Git inicializado. Basta criar um repositório no GitHub e rodar `git push origin main`.
                </li>
                <li>
                  <strong>Importar na Vercel:</strong> Acesse <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-brand-600 underline">vercel.com/new</a>, conecte sua conta do GitHub e selecione o repositório `dsa-quiz-2026`.
                </li>
                <li>
                  <strong>Configurações do Build:</strong> A Vercel detecta o framework <strong>Vite</strong> automaticamente. Basta clicar em <strong>Deploy</strong>.
                </li>
                <li>
                  <strong>Testar em Janela Anônima:</strong> Abra a URL pública gerada (ex: `https://dsa-quiz-2026.vercel.app`) em uma janela anônima e teste responder às questões.
                </li>
              </ol>
            </div>
          )}

        </div>

        {/* Rodapé */}
        <div className="border-t border-slate-100 pt-3 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-700"
          >
            Entendi, voltar ao Quiz
          </button>
        </div>

      </div>
    </div>
  );
}
