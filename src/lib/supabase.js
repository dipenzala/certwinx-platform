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

/**
 * Public form submission — used by website contact/lead forms
 */
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

/**
 * Fetch all leads — used by admin panel
 */
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

/**
 * Fetch single lead by ID
 */
export async function getLeadById(id) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get lead by ID error:', error);
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Update existing lead
 */
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

/**
 * Delete single lead
 */
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

/* ==================== BULK OPERATIONS (Admin) ==================== */

/**
 * Create a single lead — used for bulk CSV import
 * Returns: { success, data } or { success: false, error }
 */
export async function createLead(leadData) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: leadData.name,
        mobile: leadData.mobile,
        email: leadData.email || null,
        company: leadData.company || null,
        city: leadData.city || null,
        source: leadData.source || 'import',
        status: leadData.status || 'new',
        message: leadData.message || null,
        created_at: leadData.created_at || new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('[createLead] Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Bulk create leads — for CSV import (efficient single insert)
 * Returns: { success, inserted, errors }
 */
export async function createLeadsBulk(leadsArray) {
  try {
    const payload = leadsArray.map((leadData) => ({
      name: leadData.name,
      mobile: leadData.mobile,
      email: leadData.email || null,
      company: leadData.company || null,
      city: leadData.city || null,
      source: leadData.source || 'import',
      status: leadData.status || 'new',
      message: leadData.message || null,
      created_at: leadData.created_at || new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('leads')
      .insert(payload)
      .select();

    if (error) throw error;
    return { success: true, inserted: data?.length || 0, data };
  } catch (error) {
    console.error('[createLeadsBulk] Error:', error);
    return { success: false, error: error.message, inserted: 0 };
  }
}

/**
 * Bulk update leads by IDs (e.g., change status of multiple leads)
 * Returns: { success, data }
 */
export async function bulkUpdateLeads(ids, updates) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .in('id', ids)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('[bulkUpdateLeads] Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Bulk delete leads by IDs
 * Returns: { success, deleted }
 */
export async function bulkDeleteLeads(ids) {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .in('id', ids);

    if (error) throw error;
    return { success: true, deleted: ids.length };
  } catch (error) {
    console.error('[bulkDeleteLeads] Error:', error);
    return { success: false, error: error.message, deleted: 0 };
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