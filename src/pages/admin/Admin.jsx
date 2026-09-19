import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Lock, LogOut, Users, BarChart3, FileText, LayoutDashboard,
  Search, X, Eye, Phone, Mail, Building2, MapPin, Calendar,
  MessageCircle, CheckCircle2, Loader2, Trash2,
} from 'lucide-react';
import {
  signIn, signOut, getSession,
  getLeads, updateLead, deleteLead,
} from '../../lib/supabase';

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'documents_pending', label: 'Docs Pending' },
  { value: 'in_process', label: 'In Process' },
  { value: 'completed', label: 'Completed' },
  { value: 'not_eligible', label: 'Not Eligible' },
  { value: 'closed', label: 'Closed' },
];

/* ==================== LOGIN ==================== */
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { success, error: err } = await signIn(email, password);
    setLoading(false);
    if (success) onLogin();
    else setError(err || 'Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-canvas">
      <div className="bg-white border border-line rounded-3xl p-8 w-full max-w-sm shadow-[0_20px_60px_-20px_rgba(23,105,255,0.2)]">
        <div className="w-12 h-12 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-5 mx-auto">
          <Lock size={20} className="text-blue" />
        </div>
        <h1 className="font-display text-xl font-bold text-ink text-center mb-2">
          Admin Login
        </h1>
        <p className="text-xs text-muted text-center mb-6">
          Sign in with your CertWinX admin account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@certwinx.com"
              className="w-full px-4 py-3 rounded-xl bg-canvas border border-line text-ink focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-canvas border border-line text-ink focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all text-sm"
              required
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue to-deepblue text-white font-semibold text-sm shadow-[0_15px_30px_-10px_rgba(23,105,255,0.5)] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==================== DASHBOARD ==================== */
function Dashboard({ leads }) {
  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users },
    { label: 'New', value: leads.filter((l) => l.status === 'new').length, icon: BarChart3 },
    { label: 'In Process', value: leads.filter((l) => l.status === 'in_process').length, icon: FileText },
    { label: 'Completed', value: leads.filter((l) => l.status === 'completed').length, icon: CheckCircle2 },
  ];

  const bySource = leads.reduce((acc, l) => {
    const key = l.source || 'website';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-line rounded-2xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center mb-3">
              <s.icon size={18} className="text-blue" />
            </div>
            <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-1">
              {s.label}
            </p>
            <p className="font-display text-2xl font-bold text-ink">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-line rounded-2xl p-6">
        <h2 className="font-display font-bold text-ink mb-4">Leads by Source</h2>
        <div className="space-y-3">
          {Object.entries(bySource)
            .sort((a, b) => b[1] - a[1])
            .map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-sm text-graphite capitalize">{source}</span>
                <span className="text-sm font-bold text-blue">{count}</span>
              </div>
            ))}
          {Object.keys(bySource).length === 0 && (
            <p className="text-sm text-muted">No leads yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==================== LEADS LIST ==================== */
function LeadsList({ leads, onRefresh }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const filtered = leads.filter((l) => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name?.toLowerCase().includes(q) ||
        l.mobile?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Leads</h1>
        <button
          onClick={onRefresh}
          className="text-xs font-semibold text-blue hover:text-deepblue"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-line text-ink focus:outline-none focus:border-blue transition-all text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-line text-ink text-sm focus:outline-none focus:border-blue"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-line rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted">No leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-canvas border-b border-line">
                <tr>
                  {['Name', 'Contact', 'Source', 'Status', 'Date', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-bold tracking-[0.15em] text-muted uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-line last:border-0 hover:bg-canvas/50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{lead.name}</p>
                      {lead.company && <p className="text-xs text-muted">{lead.company}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-ink">{lead.mobile}</p>
                      {lead.email && <p className="text-xs text-muted">{lead.email}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-graphite capitalize">{lead.source || 'website'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-blue/10 text-blue border border-blue/20">
                        {STATUSES.find((s) => s.value === lead.status)?.label || lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-deepblue"
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={() => { onRefresh(); setSelectedLead(null); }}
        />
      )}
    </div>
  );
}

/* ==================== LEAD MODAL ==================== */
function LeadModal({ lead, onClose, onUpdate }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { success } = await updateLead(lead.id, { status, notes });
    setSaving(false);
    if (success) onUpdate();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this lead permanently?')) return;
    const { success } = await deleteLead(lead.id);
    if (success) onUpdate();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-line px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase mb-0.5">Lead Detail</p>
            <h2 className="font-display text-lg font-bold text-ink">{lead.name}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-canvas hover:bg-line/50 border border-line flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow icon={Phone} label="Mobile" value={lead.mobile} />
            <InfoRow icon={Mail} label="Email" value={lead.email || '—'} />
            <InfoRow icon={Building2} label="Company" value={lead.company || '—'} />
            <InfoRow icon={MapPin} label="City" value={lead.city || '—'} />
            <InfoRow icon={Calendar} label="Received" value={new Date(lead.created_at).toLocaleString('en-IN')} />
            <InfoRow icon={MessageCircle} label="Source" value={lead.source || '—'} />
          </div>

          {lead.message && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-2">Message</p>
              <p className="text-sm text-graphite bg-canvas rounded-xl p-4 leading-relaxed">{lead.message}</p>
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-2 block">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas border border-line text-ink text-sm focus:outline-none focus:border-blue"
            >
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-2 block">Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about this lead..."
              className="w-full px-4 py-3 rounded-xl bg-canvas border border-line text-ink text-sm focus:outline-none focus:border-blue resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-line">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue to-deepblue text-white font-semibold text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 font-semibold text-sm hover:bg-red-500/20 inline-flex items-center gap-2"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="bg-canvas rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={12} className="text-blue" />
        <span className="text-[9px] font-bold tracking-[0.15em] text-muted uppercase">{label}</span>
      </div>
      <p className="text-sm text-ink break-all">{value}</p>
    </div>
  );
}

/* ==================== MAIN ==================== */
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    getSession().then((session) => {
      setAuthed(!!session);
      setLoading(false);
    });
  }, []);

  const loadLeads = async () => {
    const { success, data } = await getLeads();
    if (success) setLeads(data);
  };

  useEffect(() => {
    if (authed) loadLeads();
  }, [authed]);

  const handleLogout = async () => {
    await signOut();
    setAuthed(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <Loader2 size={32} className="animate-spin text-blue" />
      </div>
    );
  }

  if (!authed) {
    return (
      <>
        <Helmet><title>Admin — CertWinX</title><meta name="robots" content="noindex" /></Helmet>
        <Login onLogin={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin — CertWinX</title><meta name="robots" content="noindex" /></Helmet>
      <div className="min-h-screen bg-canvas pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase">CertWinX</p>
              <h1 className="font-display text-2xl font-bold text-ink">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-line text-sm text-graphite hover:text-ink hover:border-blue/40"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>

          <div className="flex gap-1 p-1 bg-white border border-line rounded-2xl mb-8 w-fit">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'leads', label: 'Leads', icon: Users },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  tab === t.id ? 'bg-ink text-canvas' : 'text-graphite hover:text-ink'
                }`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'dashboard' && <Dashboard leads={leads} />}
          {tab === 'leads' && <LeadsList leads={leads} onRefresh={loadLeads} />}
        </div>
      </div>
    </>
  );
}