import { createClient } from '@supabase/supabase-js';

// Chaves podem vir do .env (Vite) ou do localStorage (configurável pelo próprio usuário na interface)
const STORAGE_SUPABASE_CONFIG = 'dsa_quiz_2026_supabase_config';

export function getStoredSupabaseConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_SUPABASE_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Erro ao ler configuração do Supabase:', e);
  }
  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  };
}

export function saveStoredSupabaseConfig(url, anonKey) {
  try {
    localStorage.setItem(STORAGE_SUPABASE_CONFIG, JSON.stringify({ url, anonKey }));
  } catch (e) {
    console.error('Erro ao salvar configuração do Supabase:', e);
  }
}

export function clearStoredSupabaseConfig() {
  try {
    localStorage.removeItem(STORAGE_SUPABASE_CONFIG);
  } catch (e) {
    console.error('Erro ao remover configuração do Supabase:', e);
  }
}

// Cria a instância do cliente Supabase se as credenciais forem válidas
let cachedClient = null;
let lastUsedConfig = null;

export function getSupabase() {
  const config = getStoredSupabaseConfig();
  const isValid = Boolean(
    config.url && 
    config.url.startsWith('https://') && 
    config.anonKey && 
    config.anonKey.length > 20
  );

  if (!isValid) return null;

  if (
    cachedClient && 
    lastUsedConfig && 
    lastUsedConfig.url === config.url && 
    lastUsedConfig.anonKey === config.anonKey
  ) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    lastUsedConfig = config;
    return cachedClient;
  } catch (err) {
    console.error('Erro ao inicializar Supabase:', err);
    return null;
  }
}

export function isSupabaseActive() {
  return getSupabase() !== null;
}

// Busca os top 15 resultados do ranking no Supabase
export async function fetchSupabaseLeaderboard() {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('total_time', { ascending: true })
      .limit(15);

    if (error) {
      console.warn('Erro ao consultar Supabase leaderboard:', error.message);
      return null;
    }

    // Mapeia para o formato interno do aplicativo
    return (data || []).map(row => ({
      id: row.id.toString(),
      name: row.name,
      score: row.score,
      accuracy: row.accuracy,
      totalTime: row.total_time,
      date: new Date(row.created_at).toLocaleDateString('pt-BR'),
    }));
  } catch (e) {
    console.warn('Falha na requisição ao Supabase:', e);
    return null;
  }
}

// Salva uma nova pontuação no Supabase
export async function insertScoreToSupabase(entry) {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('leaderboard')
      .insert([
        {
          name: entry.name,
          score: entry.score,
          accuracy: entry.accuracy,
          total_time: entry.totalTime,
        }
      ]);

    if (error) {
      console.error('Erro ao inserir pontuação no Supabase:', error.message);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Exceção ao inserir no Supabase:', e);
    return false;
  }
}
