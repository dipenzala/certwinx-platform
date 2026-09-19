import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('⚠️ Supabase credentials missing in .env');
}

console.log('[Supabase] URL:', SUPABASE_URL);
console.log('[Supabase] Key prefix:', SUPABASE_KEY.substring(0, 25));
console.log('[Supabase] Key length:', SUPABASE_KEY.length);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ==================== LEAD HELPERS ==================== */
export async function submitLead(leadData) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ ...leadData, source: leadData.source || 'website' }])
      .select();

    if (error) {
      console.error('[submitLead] Error:', error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error('[submitLead] Caught:', error);
    return { success: false, error: error.message || JSON.stringify(error) };
  }
}

export async function getLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get leads error:', error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function updateLead(id, updates) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update lead error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteLead(id) {
  try {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete lead error:', error);
    return { success: false, error: error.message };
  }
}

/* ==================== AUTH HELPERS ==================== */
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}