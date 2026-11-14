// Utilitário de persistência no localStorage e sincronização com Supabase (Requisitos 3 e 4)
import { 
  fetchSupabaseLeaderboard, 
  insertScoreToSupabase, 
  isSupabaseActive 
} from './supabaseClient';

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

// Mock inicial para visualização antes de qualquer inserção
const DEFAULT_LEADERBOARD = [
  { id: '1', name: 'Alana Silva (DSA)', score: 900, accuracy: 90, totalTime: 120, date: '12/11/2026' },
  { id: '2', name: 'Lucas Dev (React)', score: 800, accuracy: 80, totalTime: 145, date: '11/11/2026' },
  { id: '3', name: 'Beatriz Costa', score: 700, accuracy: 70, totalTime: 160, date: '10/11/2026' },
];

// Recupera o histórico do ranking (Prioriza Supabase se configurado, com fallback para localStorage)
export async function getLeaderboardAsync() {
  if (isSupabaseActive()) {
    const cloudData = await fetchSupabaseLeaderboard();
    if (cloudData && cloudData.length > 0) {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(cloudData));
      return cloudData;
    }
  }

  return getLocalLeaderboard();
}

// Leitura síncrona do cache local
export function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(DEFAULT_LEADERBOARD));
      return DEFAULT_LEADERBOARD;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao carregar leaderboard local:', e);
    return DEFAULT_LEADERBOARD;
  }
}

// Adiciona uma nova pontuação (Salva na nuvem Supabase e/ou localmente)
export async function saveScore(entry) {
  const newEntry = {
    id: Date.now().toString(),
    name: entry.name || 'Estudante DSA',
    score: entry.score || 0,
    accuracy: entry.accuracy || 0,
    totalTime: entry.totalTime || 0,
    date: new Date().toLocaleDateString('pt-BR'),
  };

  // Se o Supabase estiver conectado, insere na tabela do banco
  if (isSupabaseActive()) {
    await insertScoreToSupabase(newEntry);
  }

  // Atualiza também o cache do localStorage
  try {
    const current = getLocalLeaderboard();
    const updated = [newEntry, ...current.filter(item => item.id !== newEntry.id)]
      .sort((a, b) => b.score - a.score || a.totalTime - b.totalTime)
      .slice(0, 15);

    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Erro ao salvar no leaderboard local:', e);
    return [];
  }
}

// Configurações do usuário
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
