// Utilitário de persistência no localStorage (Requisitos 3 e 4)

const STORAGE_KEYS = {
  ACTIVE_SESSION: 'dsa_quiz_2026_session',
  LEADERBOARD: 'dsa_quiz_2026_leaderboard',
  SETTINGS: 'dsa_quiz_2026_settings',
};

// Salva a sessão ativa (progresso do quiz atual)
export function saveActiveSession(sessionData) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify({
      ...sessionData,
      updatedAt: new Date().toISOString(),
    }));
  } catch (e) {
    console.error('Erro ao salvar sessão no localStorage:', e);
  }
}

// Recupera a sessão ativa do quiz
export function loadActiveSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao carregar sessão do localStorage:', e);
    return null;
  }
}

// Limpa a sessão ativa (após conclusão ou reinício)
export function clearActiveSession() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  } catch (e) {
    console.error('Erro ao limpar sessão:', e);
  }
}

// Recupera o histórico do ranking local
export function getLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!raw) {
      // Mock inicial pedagógico para motivar o aluno a bater o recorde
      const defaultBoard = [
        { id: '1', name: 'Alana Silva (DSA)', score: 900, accuracy: 90, totalTime: 120, date: '12/11/2026' },
        { id: '2', name: 'Lucas Dev (Provão)', score: 800, accuracy: 80, totalTime: 145, date: '11/11/2026' },
        { id: '3', name: 'Beatriz Costa', score: 700, accuracy: 70, totalTime: 160, date: '10/11/2026' },
      ];
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(defaultBoard));
      return defaultBoard;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao carregar leaderboard:', e);
    return [];
  }
}

// Adiciona uma nova pontuação ao ranking
export function saveScoreToLeaderboard(entry) {
  try {
    const current = getLeaderboard();
    const newEntry = {
      id: Date.now().toString(),
      name: entry.name || 'Estudante DSA',
      score: entry.score || 0,
      accuracy: entry.accuracy || 0,
      totalTime: entry.totalTime || 0,
      date: new Date().toLocaleDateString('pt-BR'),
    };

    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score || a.totalTime - b.totalTime)
      .slice(0, 10); // Mantém os top 10

    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Erro ao salvar no leaderboard:', e);
    return [];
  }
}

// Configurações do usuário (Tema escuro, som ativado)
export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return { darkMode: true, soundEnabled: true };
    return JSON.parse(raw);
  } catch {
    return { darkMode: true, soundEnabled: true };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Erro ao salvar configurações:', e);
  }
}
