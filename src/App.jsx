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
  getLocalLeaderboard, 
  getLeaderboardAsync, 
  saveScore, 
  loadSettings, 
  saveSettings 
} from './utils/storage';
import { 
  Play, 
  Code, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Gamepad2,
  Terminal,
  Zap,
  Flame,
  Layers,
  Cpu
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
  const [lives, setLives] = useState(3);
  const [userAnswers, setUserAnswers] = useState([]);
  
  // Cronômetros
  const QUESTION_TIME_LIMIT = 30; // 30 segundos por questão
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);

  // Modais
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState(getLocalLeaderboard());

  // Verificação de sessão salva anterior no localStorage e sincronização do Leaderboard
  const [savedSession, setSavedSession] = useState(null);

  useEffect(() => {
    // Carrega dados mais recentes da nuvem (Supabase) se disponíveis
    getLeaderboardAsync().then(data => {
      if (data) setLeaderboard(data);
    });
  }, []);

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
        lives,
        userAnswers,
        totalTime
      });
    } else if (quizState === 'finished') {
      clearActiveSession();
    }
  }, [quizState, currentQuestionIndex, score, streak, lives, userAnswers, totalTime]);

  // 5. Cronômetro da questão atual com limpeza de intervalo
  useEffect(() => {
    if (quizState !== 'quiz' || isAnswerSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Tempo esgotado
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
    setLives(3);
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
    setLives(savedSession.lives ?? 3);
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
      setLives(l => Math.max(0, l - 1));
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
    setLives(l => Math.max(0, l - 1));

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

  // Salvar no ranking (Nuvem Supabase + Local) e atualizar estado da tela
  const handleSaveScore = async (entry) => {
    const updated = await saveScore(entry);
    setLeaderboard(updated);
  };

  const handleRefreshLeaderboard = async () => {
    const fresh = await getLeaderboardAsync();
    if (fresh) setLeaderboard(fresh);
  };

  const handleClearLeaderboard = () => {
    localStorage.removeItem('dsa_quiz_2026_leaderboard');
    setLeaderboard([]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] text-[#16161A] bg-codedex-grid transition-colors duration-200 dark:bg-[#121316] dark:text-[#F3F4F6]">
      
      {/* Barra de Navegação Superior Codédex */}
      <Navbar
        score={score}
        streak={streak}
        lives={lives}
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
        
        {/* TELA 1: Boas-vindas / Início do Jogo (Codédex Hero Style) */}
        {quizState === 'start' && (
          <div className="w-full max-w-2xl space-y-6 animate-fadeIn">
            
            {/* Banner de Jogo Salvo no Navegador */}
            {savedSession && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border-[2.5px] border-black bg-[#FFE600] p-4 shadow-neo text-black">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white shadow-neo-sm">
                    <Sparkles className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-pixel text-xs font-bold uppercase">
                      SAVE GAME ENCONTRADO!
                    </h3>
                    <p className="text-xs font-bold font-sans">
                      Você estava na Fase {savedSession.currentQuestionIndex + 1} com {savedSession.score} XP acumulados.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleResumeSavedSession}
                    className="neo-btn flex-1 sm:flex-none rounded-xl bg-black px-4 py-2 font-pixel text-[11px] font-bold text-[#FFE600] uppercase cursor-pointer"
                  >
                    CONTINUAR
                  </button>
                  <button
                    onClick={() => {
                      clearActiveSession();
                      setSavedSession(null);
                    }}
                    className="neo-btn rounded-xl bg-white px-3 py-2 font-pixel text-[10px] font-bold text-black uppercase cursor-pointer"
                  >
                    DESCARTAR
                  </button>
                </div>
              </div>
            )}

            {/* Cartão Hero Neo-Brutalist Codédex */}
            <div className="overflow-hidden rounded-3xl border-[3px] border-black bg-white p-6 sm:p-10 text-center shadow-neo-xl dark:bg-[#1F2024] dark:border-black">
              
              {/* Mascote / Ícone de Arcade */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-[3px] border-black bg-[#FFE600] text-black shadow-neo">
                <Gamepad2 className="h-10 w-10 animate-pulse-subtle" />
              </div>

              {/* Badges de Topo */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-lg border-2 border-black bg-[#FFE600] px-3 py-1 font-pixel text-[10px] font-bold text-black uppercase shadow-neo-sm">
                  DSA 2026 • QUEST
                </span>
                <span className="rounded-lg border-2 border-black bg-[#00DFD8] px-3 py-1 font-pixel text-[10px] font-bold text-black uppercase shadow-neo-sm">
                  PROVÃO PAULISTA
                </span>
                <span className="rounded-lg border-2 border-black bg-[#FF0080] px-3 py-1 font-pixel text-[10px] font-bold text-white uppercase shadow-neo-sm">
                  REACT + JAVASCRIPT
                </span>
              </div>

              <h1 className="mt-4 font-pixel text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-black dark:text-white uppercase leading-snug">
                REVISÃO INTERATIVA DSA
              </h1>

              <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 max-w-lg mx-auto font-sans">
                Embarque na jornada gamificada de DSA: enfrente <strong>10 quests</strong> de JavaScript, acumule <strong>XP</strong>, suba no <strong>Ranking da Turma</strong> e domine o Provão Paulista!
              </p>

              {/* Tópicos em estilo RPG Quests */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 text-left">
                <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <span className="font-pixel text-[9px] text-[#7928CA] dark:text-[#FFE600] uppercase font-bold">QUEST 01</span>
                  <p className="text-xs font-bold text-black dark:text-white mt-0.5">Variáveis & Tipos</p>
                </div>
                <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <span className="font-pixel text-[9px] text-[#00DFD8] uppercase font-bold">QUEST 02</span>
                  <p className="text-xs font-bold text-black dark:text-white mt-0.5">Condicionais & if</p>
                </div>
                <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <span className="font-pixel text-[9px] text-[#22C55E] uppercase font-bold">QUEST 03</span>
                  <p className="text-xs font-bold text-black dark:text-white mt-0.5">Map & Filter</p>
                </div>
                <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <span className="font-pixel text-[9px] text-[#FF0080] uppercase font-bold">QUEST 04</span>
                  <p className="text-xs font-bold text-black dark:text-white mt-0.5">Funções & Escopo</p>
                </div>
                <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <span className="font-pixel text-[9px] text-[#FFE600] uppercase font-bold">QUEST 05</span>
                  <p className="text-xs font-bold text-black dark:text-white mt-0.5">DOM & Eventos</p>
                </div>
                <div className="rounded-xl border-2 border-black bg-[#FDFBF7] p-3 shadow-neo-sm dark:bg-[#16161A]">
                  <span className="font-pixel text-[9px] text-[#7928CA] dark:text-[#00DFD8] uppercase font-bold">QUEST 06</span>
                  <p className="text-xs font-bold text-black dark:text-white mt-0.5">useState & useEffect</p>
                </div>
              </div>

              {/* Botões de Início */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={handleStartNewQuiz}
                  className="neo-btn flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-[#FFE600] px-8 py-4 font-pixel text-xs sm:text-sm font-bold text-black uppercase cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-black text-black" />
                  <span>INICIAR QUEST [START]</span>
                </button>

                <button
                  onClick={() => setIsHelpOpen(true)}
                  className="neo-btn flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-pixel text-xs sm:text-sm font-bold text-black uppercase cursor-pointer dark:bg-[#16161A] dark:text-white"
                >
                  <Code className="h-4 w-4 text-[#7928CA] dark:text-[#00DFD8]" />
                  <span>GUIA DO ALUNO</span>
                </button>
              </div>

              {/* Badges de Rodapé */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-5 font-pixel text-[9px] text-slate-500 uppercase">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
                  SALVAMENTO AUTOMÁTICO
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#FFE600]" />
                  30s POR QUESTÃO
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#FF0080]" />
                  COMBO STREAKS
                </span>
              </div>

            </div>

          </div>
        )}

        {/* TELA 2: Execução da Quest */}
        {quizState === 'quiz' && (
          <div className="w-full max-w-2xl space-y-4 animate-fadeIn">
            
            {/* Barra de Progresso Codédex */}
            <ProgressBar
              current={currentQuestionIndex}
              total={QUIZ_QUESTIONS.length}
            />

            {/* Painel de Status */}
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

      {/* Rodapé Retrô Codédex */}
      <footer className="border-t-[3px] border-black bg-white py-4 text-center font-pixel text-[10px] text-black dark:border-black dark:bg-[#121316] dark:text-slate-300">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center justify-between px-4 gap-2">
          <p className="flex items-center justify-center gap-1.5">
            <span className="inline-block h-2 w-2 bg-[#FFE600] border border-black" />
            DSA.DEX 2026 • ESTILO CODÉDEX • PROVÃO PAULISTA
          </p>
          <div className="flex items-center gap-4 text-[9px]">
            <span className="text-[#22C55E] font-bold">
              ● READY FOR VERCEL
            </span>
            <span className="font-bold text-[#7928CA] dark:text-[#00DFD8]">
              DEVELOPED BY MATHEUS
            </span>
          </div>
        </div>
      </footer>

      {/* Modais Globais */}
      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboard={leaderboard}
        onRefresh={handleRefreshLeaderboard}
        onClearLeaderboard={handleClearLeaderboard}
      />

      <CopilotHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

    </div>
  );
}
