import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

let cachedClient = null;

export function getSupabase() {
  if (cachedClient) return cachedClient;

  if (
    supabaseUrl && 
    supabaseUrl.startsWith('https://') && 
    supabaseAnonKey && 
    supabaseAnonKey.length > 20
  ) {
    try {
      cachedClient = createClient(supabaseUrl, supabaseAnonKey);
      return cachedClient;
    } catch (err) {
      console.error('Erro ao inicializar Supabase:', err);
    }
  }
  return null;
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
