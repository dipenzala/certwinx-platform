import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X, ArrowRight, CheckCircle2, Loader2,
  User, Phone, Mail, Building2, Zap, ClipboardCheck,
  Sparkles, ShieldCheck,
} from 'lucide-react';
import { SITE } from '../../lib/constants';
import { submitLead } from '../../lib/supabase';
import Logo from './Logo';

const STORAGE_KEY = 'certwinx_popup_shown';
const DELAY_MS = 12000;

export default function LeadPopup({ delay = DELAY_MS, force = false }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('quick');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', mobile: '', email: '', company: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!force && sessionStorage.getItem(STORAGE_KEY) === '1') return;
    const timer = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(timer);
  }, [delay, force]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (!force) sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, '')))
      e.mobile = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);

    const params = new URLSearchParams(window.location.search);

    const { success, error } = await submitLead({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      company: form.company,
      source: 'lead-popup',
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
    });

    if (!success) {
      setErrors({ submit: error || 'Failed to submit inquiry' });
      setLoading(false);
      return;
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'lead_popup_submitted', ...form });
    }

    await new Promise((r) => setTimeout(r, 400));

    const msg = `Hi CertWinX Team,\n\n*Name:* ${form.name}\n*Mobile:* ${form.mobile}\n${form.email ? `*Email:* ${form.email}\n` : ''}${form.company ? `*Company:* ${form.company}\n` : ''}\nI am requesting advisory guidance regarding government schemes and business compliance.`;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    setLoading(false);
    setSubmitted(true);
    if (!force) sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setOpen(false), 3000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 lg:p-6 py-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
          onClick={close}
        />

        {/* Modal Card */}
        <div
          className="relative w-full max-w-md rounded-3xl bg-white border border-line shadow-2xl overflow-hidden my-auto animate-fade-up"
          style={{ maxHeight: 'calc(100vh - 32px)' }}
        >
          {/* Top blue accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue via-sky to-deepblue" />

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-canvas border border-line flex items-center justify-center text-graphite hover:text-ink hover:bg-paper transition-all"
            aria-label="Close"
          >
            <X size={15} />
          </button>

          {!submitted ? (
            <div className="p-6 sm:p-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
              {/* Header */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Logo size="sm" link={false} />
                  <span className="text-[10px] font-semibold text-blue uppercase tracking-wider">
                    Official Advisory
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink leading-tight mb-2">
                  Accelerate Your Startup With Government Schemes.
                </h3>
                <p className="text-xs text-graphite leading-relaxed">
                  Connect directly with CertWinX advisors for DPIIT recognition, 80-IAC tax exemption, and funding schemes.
                </p>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-canvas border border-line mb-5">
                <button
                  type="button"
                  onClick={() => setTab('quick')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    tab === 'quick'
                      ? 'bg-white text-blue shadow-sm'
                      : 'text-graphite hover:text-ink'
                  }`}
                >
                  <Zap size={13} />
                  Quick Contact
                </button>
                <button
                  type="button"
                  onClick={() => setTab('eligibility')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    tab === 'eligibility'
                      ? 'bg-white text-blue shadow-sm'
                      : 'text-graphite hover:text-ink'
                  }`}
                >
                  <ClipboardCheck size={13} />
                  Full Eligibility
                </button>
              </div>

              {/* Tab 1: Quick Contact */}
              {tab === 'quick' && (
                <form onSubmit={submit} className="space-y-3">
                  <div>
                    <label htmlFor="popup-name" className="sr-only">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                      <input
                        id="popup-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full Name *"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-canvas border ${
                          errors.name ? 'border-red-400' : 'border-line'
                        } text-ink text-xs placeholder-muted focus:bg-white focus:outline-none focus:border-blue transition-all`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="popup-mobile" className="sr-only">Mobile Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                      <input
                        id="popup-mobile"
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        placeholder="10-Digit Mobile Number *"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-canvas border ${
                          errors.mobile ? 'border-red-400' : 'border-line'
                        } text-ink text-xs placeholder-muted focus:bg-white focus:outline-none focus:border-blue transition-all`}
                      />
                    </div>
                    {errors.mobile && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label htmlFor="popup-email" className="sr-only">Email Address</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                      <input
                        id="popup-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email Address (optional)"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-canvas border border-line text-ink text-xs placeholder-muted focus:bg-white focus:outline-none focus:border-blue transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="popup-company" className="sr-only">Company / Startup Name</label>
                    <div className="relative">
                      <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                      <input
                        id="popup-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company or Startup Name"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-canvas border border-line text-ink text-xs placeholder-muted focus:bg-white focus:outline-none focus:border-blue transition-all"
                      />
                    </div>
                  </div>

                  {errors.submit && (
                    <p className="text-[11px] text-red-500 text-center">{errors.submit}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-blue hover:bg-blue-hover text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Submitting Details...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Free Advisory Call</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-3 text-[10px] text-muted font-medium">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={11} className="text-emerald-500" />
                      Strict Confidentiality
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Sparkles size={11} className="text-blue" />
                      100% Transparent
                    </span>
                  </div>
                </form>
              )}

              {/* Tab 2: Full Eligibility Direct Link */}
              {tab === 'eligibility' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-soft border border-blue/15 text-xs text-graphite leading-relaxed">
                    <div className="flex items-center gap-2 mb-2 font-semibold text-blue-deep">
                      <ClipboardCheck size={16} className="text-blue" />
                      Interactive Scheme Intelligence Engine
                    </div>
                    <p className="mb-3">
                      Complete our 3-step structured assessment to map your venture against 16+ active Central & State government schemes, including DPIIT, DST Grants, CGSS, and Section 80-IAC.
                    </p>
                    <ul className="space-y-1.5 text-ink font-medium pl-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>Entity age and turnover evaluation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>Non-dilutive grant mapping</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>Customized documentation checklist</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    to="/eligibility"
                    onClick={close}
                    className="w-full py-3 px-4 rounded-xl bg-blue hover:bg-blue-hover text-white text-xs font-semibold shadow-md inline-flex items-center justify-center gap-2"
                  >
                    <span>Launch Eligibility Engine</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center animate-fade-up">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="font-display text-lg font-bold text-ink mb-1">
                Thank You for Reaching Out
              </h4>
              <p className="text-xs text-graphite leading-relaxed max-w-xs mx-auto">
                Your enquiry has been received. Our advisory team will review your venture profile and connect with you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
