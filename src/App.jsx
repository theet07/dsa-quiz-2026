import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import StatsBar from './components/StatsBar';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import Leaderboard from './components/Leaderboard';
import CopilotHelpModal from './components/CopilotHelpModal';
import { QUIZ_QUESTIONS } from './data/questions';
import { sound } from './utils/audio';
import { 
  saveActiveSession, 
  loadActiveSession, 
  clearActiveSession, 
  getLeaderboard, 
  saveScoreToLeaderboard, 
  loadSettings, 
  saveSettings 
} from './utils/storage';
import { 
  Play, 
  RotateCcw, 
  Code, 
  CheckCircle, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

export default function App() {
  // Configurações e preferências persistidas
  const initialSettings = loadSettings();
  const [darkMode, setDarkMode] = useState(initialSettings.darkMode);
  const [soundEnabled, setSoundEnabled] = useState(initialSettings.soundEnabled);

  // Estados principais do Quiz (Requisito 3: useState)
  const [quizState, setQuizState] = useState('start'); // 'start' | 'quiz' | 'finished'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  
  // Cronômetros
  const QUESTION_TIME_LIMIT = 30; // 30 segundos por questão
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);

  // Modais
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard());

  // Verificação de sessão salva anterior no localStorage
  const [savedSession, setSavedSession] = useState(null);

  // -------------------------------------------------------------
  // EFEITOS COLATERAIS (Requisito 3: useEffect)
  // -------------------------------------------------------------

  // 1. Sincronização de tema (Dark / Light) com a tag <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveSettings({ darkMode, soundEnabled });
  }, [darkMode, soundEnabled]);

  // 2. Sincronização do estado de áudio com a Web Audio API
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // 3. Verificação de sessão ativa salva ao inicializar a aplicação
  useEffect(() => {
    const session = loadActiveSession();
    if (session && session.quizState === 'quiz') {
      setSavedSession(session);
    }
  }, []);

  // 4. Salvar progresso no localStorage sempre que o aluno avança (Requisito 3)
  useEffect(() => {
    if (quizState === 'quiz') {
      saveActiveSession({
        quizState: 'quiz',
        currentQuestionIndex,
        score,
        streak,
        userAnswers,
        totalTime
      });
    } else if (quizState === 'finished') {
      clearActiveSession();
    }
  }, [quizState, currentQuestionIndex, score, streak, userAnswers, totalTime]);

  // 5. Cronômetro da questão atual com limpeza de intervalo
  useEffect(() => {
    if (quizState !== 'quiz' || isAnswerSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Tempo esgotado: auto-submete como incorreta
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
      setTotalTime(t => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, isAnswerSubmitted, currentQuestionIndex]);

  // -------------------------------------------------------------
  // LÓGICA DE NEGÓCIO E CONTROLE DO QUIZ
  // -------------------------------------------------------------

  // Iniciar um novo quiz do zero
  const handleStartNewQuiz = () => {
    sound.playClick();
    clearActiveSession();
    setSavedSession(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setTimeRemaining(QUESTION_TIME_LIMIT);
    setTotalTime(0);
    setQuizState('quiz');
  };

  // Restaurar sessão anterior salva no localStorage (Requisito 3)
  const handleResumeSavedSession = () => {
    if (!savedSession) return;
    sound.playClick();
    setCurrentQuestionIndex(savedSession.currentQuestionIndex || 0);
    setScore(savedSession.score || 0);
    setStreak(savedSession.streak || 0);
    setUserAnswers(savedSession.userAnswers || []);
    setTotalTime(savedSession.totalTime || 0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setTimeRemaining(QUESTION_TIME_LIMIT);
    setQuizState('quiz');
    setSavedSession(null);
  };

  // Selecionar uma opção de resposta
  const handleSelectOption = (index) => {
    sound.playClick();
    setSelectedOption(index);
  };

  // Confirmar resposta da questão atual
  const handleConfirmAnswer = useCallback(() => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      // Pontuação com bônus de combo
      const gainedScore = 100 + (newStreak > 1 ? newStreak * 20 : 0);
      setScore(s => s + gainedScore);
    } else {
      sound.playError();
      setStreak(0);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
        timeRemaining
      }
    ]);
  }, [selectedOption, isAnswerSubmitted, currentQuestionIndex, streak, timeRemaining]);

  // Tempo esgotado
  const handleTimeExpired = useCallback(() => {
    if (isAnswerSubmitted) return;
    sound.playError();
    setIsAnswerSubmitted(true);
    setStreak(0);

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: null,
        isCorrect: false,
        timeRemaining: 0
      }
    ]);
  }, [isAnswerSubmitted, currentQuestionIndex]);

  // Avançar para a próxima questão ou finalizar
  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setTimeRemaining(QUESTION_TIME_LIMIT);
    } else {
      // Final do Quiz!
      clearActiveSession();
      setQuizState('finished');
      sound.playFanfare();
    }
  };

  // 6. Listener de Atalhos de Teclado Globais (Acessibilidade Desktop)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (quizState !== 'quiz') return;

      if (!isAnswerSubmitted) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          handleSelectOption(optIdx);
        } else if (e.key === 'Enter' && selectedOption !== null) {
          handleConfirmAnswer();
        }
      } else {
        if (e.key === 'Enter') {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quizState, isAnswerSubmitted, selectedOption, handleConfirmAnswer]);

  // Salvar no ranking e atualizar estado local
  const handleSaveScore = (entry) => {
    const updated = saveScoreToLeaderboard(entry);
    setLeaderboard(updated);
  };

  const handleClearLeaderboard = () => {
    localStorage.removeItem('dsa_quiz_2026_leaderboard');
    setLeaderboard([]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Barra de Navegação Superior */}
      <Navbar
        score={score}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(v => !v)}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(v => !v)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onResetQuiz={() => setQuizState('start')}
      />

      {/* Conteúdo Principal Centralizado */}
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* TELA 1: Boas-vindas / Início do Quiz */}
        {quizState === 'start' && (
          <div className="w-full max-w-2xl space-y-6 animate-fadeIn">
            
            {/* Banner de Sessão Salva Anteriormente */}
            {savedSession && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-brand-300 bg-brand-50 p-4 shadow-sm dark:border-brand-900 dark:bg-brand-950/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-900 dark:text-brand-200">
                      Progresso recuperado do localStorage!
                    </h3>
                    <p className="text-xs text-brand-700 dark:text-brand-400">
                      Você estava na questão {savedSession.currentQuestionIndex + 1} com {savedSession.score} pontos.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleResumeSavedSession}
                    className="flex-1 sm:flex-none rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-brand-700"
                  >
                    Continuar
                  </button>
                  <button
                    onClick={() => {
                      clearActiveSession();
                      setSavedSession(null);
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    Descartar
                  </button>
                </div>
              </div>
            )}

            {/* Cartão de Apresentação Hero */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
              
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg shadow-brand-500/25">
                <GraduationCap className="h-8 w-8" />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  DSA 2026 • Provão Paulista
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  ReactJS + JavaScript
                </span>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Quiz de Revisão Interativo
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Teste e aprimore seus conhecimentos em <strong>Variáveis</strong>, <strong>Condicionais</strong>, <strong>Laços de Repetição</strong>, <strong>Métodos de Array</strong> e nos hooks <strong>useState / useEffect</strong> do ReactJS.
              </p>

              {/* Grade de Tópicos Avaliados */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 text-left">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">Tópico 1</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Variáveis & Tipos</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">Tópico 2</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Condicionais & Lógica</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">Tópico 3</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Repetições & Arrays</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">Tópico 4</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Funções & Escopo</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">Tópico 5</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">DOM & Eventos</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">Tópico 6</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">React Hooks</p>
                </div>
              </div>

              {/* Botão Principal de Iniciar */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleStartNewQuiz}
                  className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-500/25 transition-all hover:from-brand-700 hover:to-indigo-700 hover:shadow-brand-500/35 active:scale-95"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Iniciar Revisão Agora</span>
                </button>

                <button
                  onClick={() => setIsHelpOpen(true)}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <Code className="h-4 w-4 text-indigo-500" />
                  <span>Explicar Código (Guia)</span>
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Salva no navegador
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-amber-500" />
                  30s por questão
                </span>
              </div>

            </div>

          </div>
        )}

        {/* TELA 2: Execução do Quiz */}
        {quizState === 'quiz' && (
          <div className="w-full max-w-2xl space-y-4 animate-fadeIn">
            
            {/* Barra de Progresso Superior */}
            <ProgressBar
              current={currentQuestionIndex}
              total={QUIZ_QUESTIONS.length}
            />

            {/* Painel de Status (Tempo, Combo, etc.) */}
            <StatsBar
              timeRemaining={timeRemaining}
              streak={streak}
              currentScore={score}
              totalQuestions={QUIZ_QUESTIONS.length}
              currentQuestionIndex={currentQuestionIndex}
            />

            {/* Cartão da Questão */}
            <QuestionCard
              question={QUIZ_QUESTIONS[currentQuestionIndex]}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onConfirmAnswer={handleConfirmAnswer}
              onNextQuestion={handleNextQuestion}
              isAnswerSubmitted={isAnswerSubmitted}
              isLastQuestion={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
            />

          </div>
        )}

        {/* TELA 3: Tela de Resultados Finais */}
        {quizState === 'finished' && (
          <ResultScreen
            score={score}
            userAnswers={userAnswers}
            questions={QUIZ_QUESTIONS}
            totalTime={totalTime}
            onRestart={handleStartNewQuiz}
            onSaveScore={handleSaveScore}
            onViewLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}

      </main>

      {/* Rodapé Informativo Acadêmico */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-4 text-center text-xs text-slate-500 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center justify-between px-4 gap-2">
          <p>
            Desenvolvido para <strong>DSA 2026</strong> — Provão Paulista com ReactJS e Tailwind CSS
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              ● Pronto para Publicação na Vercel
            </span>
            <span>Matheus</span>
          </div>
        </div>
      </footer>

      {/* Modais Globais */}
      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboard={leaderboard}
        onClearLeaderboard={handleClearLeaderboard}
      />

      <CopilotHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

    </div>
  );
}
