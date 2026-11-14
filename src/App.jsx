import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SidebarJourney from './components/SidebarJourney';
import ProgressBar from './components/ProgressBar';
import StatsBar from './components/StatsBar';
import QuestionCard from './components/QuestionCard';
import StartScreen from './components/StartScreen';
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
  
  // Controle de layout Codédex (Sidebar Journey)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  // Seleção direta de questão via Sidebar Journey
  const handleSelectQuestionFromSidebar = (index) => {
    if (index === currentQuestionIndex) return;
    sound.playClick();
    setCurrentQuestionIndex(index);
    // Recupera resposta se já tiver sido respondida anteriormente
    const prevAnswer = userAnswers.find(a => a.questionId === QUIZ_QUESTIONS[index].id);
    if (prevAnswer) {
      setSelectedOption(prevAnswer.selectedOption);
      setIsAnswerSubmitted(true);
    } else {
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setTimeRemaining(QUESTION_TIME_LIMIT);
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
    <div className="flex min-h-screen flex-col bg-[#FAF7EE] text-[#12141A] bg-codedex-grid transition-colors duration-200 dark:bg-[#0D0E12] dark:text-[#F3F4F6]">
      
      {/* Barra de Navegação Superior Codédex (Largura Total Widescreen) */}
      <Navbar
        score={score}
        streak={streak}
        lives={lives}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={QUIZ_QUESTIONS.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(v => !v)}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(v => !v)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onResetQuiz={() => setQuizState('start')}
      />

      {/* ÁREA CENTRAL DO APLICATIVO */}
      {quizState === 'quiz' ? (
        // MODO WIDESCREEN CODÉDEX COM SIDEBAR JOURNEY + WORKSPACE DE 2 COLUNAS
        <div className="flex flex-1 w-full overflow-hidden">
          
          {/* Sidebar do Mapa do Curso (The JS Journey) */}
          <SidebarJourney
            questions={QUIZ_QUESTIONS}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={handleSelectQuestionFromSidebar}
            userAnswers={userAnswers}
            score={score}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(v => !v)}
          />

          {/* Área de Trabalho Principal (Espaçosa e Aberta) */}
          <div className="flex-1 flex flex-col overflow-y-auto px-4 lg:px-8 py-5">
            <div className="w-full max-w-[1360px] mx-auto space-y-4 flex-1 flex flex-col justify-between">
              
              {/* Barra de Status e Progresso Superior */}
              <div className="space-y-3">
                <ProgressBar
                  current={currentQuestionIndex}
                  total={QUIZ_QUESTIONS.length}
                />
                <StatsBar
                  timeRemaining={timeRemaining}
                  streak={streak}
                  currentScore={score}
                  totalQuestions={QUIZ_QUESTIONS.length}
                  currentQuestionIndex={currentQuestionIndex}
                />
              </div>

              {/* Cartão de 2 Colunas (Enunciado + Editor de Código / Alternativas + Ação) */}
              <div className="my-2 flex-1 flex flex-col">
                <QuestionCard
                  question={QUIZ_QUESTIONS[currentQuestionIndex]}
                  selectedOption={selectedOption}
                  onSelectOption={handleSelectOption}
                  onConfirmAnswer={handleConfirmAnswer}
                  onNextQuestion={handleNextQuestion}
                  isAnswerSubmitted={isAnswerSubmitted}
                  isLastQuestion={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
                  timeRemaining={timeRemaining}
                />
              </div>

            </div>
          </div>

        </div>
      ) : (
        // OUTRAS TELAS (Início do Curso ou Fim de Jogo)
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          
          {/* TELA 1: Boas-vindas Espaçosa estilo Codédex */}
          {quizState === 'start' && (
            <StartScreen
              questions={QUIZ_QUESTIONS}
              savedSession={savedSession}
              onResumeSaved={handleResumeSavedSession}
              onDiscardSaved={() => {
                clearActiveSession();
                setSavedSession(null);
              }}
              onStartNew={handleStartNewQuiz}
              onOpenHelp={() => setIsHelpOpen(true)}
              onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            />
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
      )}

      {/* Rodapé Retrô Codédex */}
      <footer className="border-t-2 border-black/80 bg-white py-3 px-4 text-center font-pixel text-[10px] text-black dark:border-codedex-borderDark dark:bg-[#12141A] dark:text-slate-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-full px-4">
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 bg-[#00E599] border border-black" />
            CODÉDEX PLATFORM • DSA 2026 PROVÃO PAULISTA QUEST
          </p>
          <div className="flex items-center gap-4 text-[9px]">
            <span className="text-[#00E599] font-bold">
              ● VERCEL READY
            </span>
            <span className="font-bold text-[#8B5CF6] dark:text-[#FFE600]">
              AUTOR: MATHEUS
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
