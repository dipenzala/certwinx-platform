// ============================================================
// Complete Supabase Replacement + Mail Sender + Local Storage
// Auto-generated - All-in-one file
//
// Features:
//  - submitLead: form se email + localStorage me save
//  - getLeads / deleteLead / updateLead: Admin panel ke liye
//  - signIn / signOut / getSession: Authentication
//  - supabase object: Dummy client (crash prevention)
// ============================================================

console.log('📧 Mail sender + Local Lead Storage active');

const emptyResponse = { data: [], error: null, count: 0 };
const nullResponse  = { data: null, error: null };

// ============================================================
// LOCAL STORAGE HELPERS (leads ko browser me save karta hai)
// ============================================================
const LEADS_KEY = 'certwinx_leads';

function loadLeads() {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to save leads:', err);
  }
}

// ============================================================
// EMAIL SENDER
// ============================================================
async function sendEmail(payload) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to send enquiry');
      return { success: true, data: result };
    }
    if (response.ok) {
      return { success: true, data: { status: 'ok' } };
    }
    throw new Error(`Enquiry service responded with status: ${response.status}`);
  } catch (err) {
    console.warn('ℹ️ Email dispatch notice:', err.message);
    return { success: false, error: err.message };
  }
}

// ============================================================
// ⭐ LEAD SUBMISSION (LeadForm, LeadPopup, Consultation use karte hain)
// ============================================================
export async function submitLead(formData = {}) {
  console.log('📤 Submitting lead to CertWinX:', formData);

  const name = formData.name || formData.fullName || formData.username || formData.contactName || 'Valued Entrepreneur';
  const phone = formData.phone || formData.mobile || formData.contact || formData.whatsapp || '';
  const email = formData.email || '';
  const company = formData.company || formData.businessName || formData.firmName || formData.startupName || '';
  const city = formData.city || formData.state || formData.location || '';
  const service = formData.service || formData.subject || formData.inquiryType || 'Startup & Tax Exemption Advisory';
  const message = formData.message || formData.requirement || formData.details || formData.notes || `Advisory inquiry for ${service}`;
  const source = formData.source || (typeof window !== 'undefined' ? window.location.pathname : 'CertWinX Web App');

  const lead = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
    name,
    email,
    phone,
    company,
    city,
    service,
    subject: service,
    message,
    source,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  // 1. LocalStorage me save karo (Persistent local record)
  const leads = loadLeads();
  leads.unshift(lead);
  saveLeads(leads);

  // 2. Email / Backend API bhejo (Destination: info@certwinx.com)
  const emailResult = await sendEmail({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    city: lead.city,
    service: lead.service,
    subject: lead.subject,
    message: lead.message,
    source: lead.source,
  });

  return {
    success: true,
    data: lead,
    emailSent: emailResult.success,
    emailError: emailResult.error || null,
  };
}

// ============================================================
// ⭐ LEADS MANAGEMENT (Admin panel ke liye)
// ============================================================
export async function getLeads() {
  console.log('📋 getLeads called');
  const leads = loadLeads();
  return { success: true, data: leads, error: null };
}

export async function addLead(data) {
  return submitLead(data);
}

export async function updateLead(id, updates) {
  console.log('✏️ updateLead:', id, updates);
  const leads = loadLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return { success: false, error: 'Lead not found' };
  leads[idx] = { ...leads[idx], ...updates, updatedAt: new Date().toISOString() };
  saveLeads(leads);
  return { success: true, data: leads[idx] };
}

export async function deleteLead(id) {
  console.log('🗑️ deleteLead:', id);
  const leads = loadLeads();
  const filtered = leads.filter((l) => l.id !== id);
  saveLeads(filtered);
  return { success: true };
}

export async function clearAllLeads() {
  saveLeads([]);
  return { success: true };
}

// ============================================================
// CONTACTS (agar aur code use karta hai)
// ============================================================
export async function getContacts() {
  const leads = loadLeads();
  return { success: true, data: leads, error: null };
}

export async function deleteContact(id) {
  return deleteLead(id);
}

// ============================================================
// ⭐ AUTH FUNCTIONS
// ============================================================
export async function signIn(email, password) {
  console.log('🔐 Sign in attempt:', email);

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@certwinx.com';
  const ADMIN_PASS  = import.meta.env.VITE_ADMIN_PASS  || 'admin123';

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const session = {
      user: { email, role: 'admin' },
      expires: Date.now() + 86400000,
    };
    localStorage.setItem('admin_session', JSON.stringify(session));
    return { success: true, data: session };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function signOut() {
  console.log('🔓 Sign out');
  localStorage.removeItem('admin_session');
  return { success: true };
}

export async function getSession() {
  try {
    const raw = localStorage.getItem('admin_session');
    if (!raw) return { success: false, session: null };
    const session = JSON.parse(raw);
    if (session.expires && session.expires < Date.now()) {
      localStorage.removeItem('admin_session');
      return { success: false, session: null };
    }
    return { success: true, session };
  } catch {
    return { success: false, session: null };
  }
}

export async function getCurrentUser() {
  const { session } = await getSession();
  return session?.user || null;
}

// ============================================================
// DUMMY QUERY BUILDER (crash prevention)
// ============================================================
const createQueryBuilder = () => {
  const builder = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    upsert: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    lt: () => builder,
    gte: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    in: () => builder,
    is: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: async () => nullResponse,
    maybeSingle: async () => nullResponse,
    then: (resolve) => resolve(emptyResponse),
    catch: () => builder,
  };
  return builder;
};

// ============================================================
// MAIN SUPABASE OBJECT
// ============================================================
export const supabase = {
  from: () => createQueryBuilder(),

  auth: {
    getUser: async () => {
      const user = await getCurrentUser();
      return { data: { user }, error: null };
    },
    getSession: async () => {
      const { session } = await getSession();
      return { data: { session }, error: null };
    },
    signIn: signIn,
    signInWithPassword: async ({ email, password }) => signIn(email, password),
    signUp: async () => ({ data: null, error: { message: 'Signup disabled' } }),
    signOut: signOut,
    onAuthStateChange: (callback) => {
      getSession().then(({ session }) =>
        callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session)
      );
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },

  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: { message: 'Storage disabled' } }),
      download: async () => ({ data: null, error: { message: 'Storage disabled' } }),
      remove: async () => ({ data: null, error: { message: 'Storage disabled' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      list: async () => ({ data: [], error: null }),
    }),
  },

  channel: () => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    subscribe: () => ({ unsubscribe: () => {} }),
    unsubscribe: () => {},
  }),
  removeChannel: () => {},

  rpc: async () => ({ data: null, error: { message: 'RPC disabled' } }),
};

// Aliases
export const supabaseClient = supabase;
export default supabase;
