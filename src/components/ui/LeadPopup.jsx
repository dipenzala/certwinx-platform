import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X, ArrowRight, CheckCircle2, Loader2,
  User, Phone, Mail, Building2, Zap, ClipboardCheck,
  Sparkles, ShieldCheck,
} from 'lucide-react';
import { SITE } from '../../lib/constants';
import { submitLead } from '../../lib/supabase';

const STORAGE_KEY = 'certwinx_popup_shown';
const DELAY_MS = 4000;

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
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.mobile.trim()) e.mobile = 'Mobile is required';
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
      utm_content: params.get('utm_content'),
    });

    if (!success) {
      console.error('Popup lead failed:', error);
      setErrors({ submit: `Error: ${error || 'Please try again'}` });
      setLoading(false);
      return;
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'lead_popup_submitted', ...form });
    }

    await new Promise((r) => setTimeout(r, 600));

    const msg = `Hi CertWinX Team,\n\n*Name:* ${form.name}\n*Mobile:* ${form.mobile}\n${form.email ? `*Email:* ${form.email}\n` : ''}${form.company ? `*Company:* ${form.company}\n` : ''}\nPlease contact me.`;
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
      {/* Wrapper */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 lg:p-6 py-6">

        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#05080E]/75 backdrop-blur-xl"
          onClick={close}
          style={{ animation: 'fadeIn 0.4s ease-out' }}
        />

        {/* Main Card */}
        <div
          className="relative w-full max-w-md rounded-3xl overflow-hidden my-auto"
          style={{
            animation: 'popIn 0.55s cubic-bezier(0.19, 1, 0.22, 1)',
            background: 'linear-gradient(135deg, #0A0F1F 0%, #0D1428 50%, #0A0F1F 100%)',
            border: '1px solid rgba(45, 156, 255, 0.2)',
            boxShadow:
              '0 40px 100px -30px rgba(0,0,0,0.9), 0 0 60px -10px rgba(45,156,255,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            maxHeight: 'calc(100vh - 32px)',
          }}
        >
          {/* Ambient glow blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(45,156,255,0.6), transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(204,171,110,0.5), transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #2D9CFF 25%, #CCAB6E 50%, #2D9CFF 75%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 6s linear infinite',
            }}
          />

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            aria-label="Close"
          >
            <X size={14} strokeWidth={2.2} />
          </button>

          {/* Content */}
          {!submitted ? (
            <div
              className="relative p-5 sm:p-6 lg:p-7 overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 32px)' }}
            >
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto] gap-3 mb-5">
                {/* Left */}
                <div className="min-w-0">
                  {/* Logo + Tagline */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="relative shrink-0">
                      <div
                        className="absolute -inset-1.5 rounded-full opacity-60"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(45,156,255,0.5), transparent 70%)',
                          filter: 'blur(10px)',
                        }}
                      />
                      <img
                        src="/certwinx-logo.png"
                        alt="CertWinX"
                        style={{ height: '32px', width: 'auto' }}
                        className="relative object-contain drop-shadow-[0_0_12px_rgba(45,156,255,0.4)]"
                        draggable={false}
                      />
                    </div>
                    <div className="flex flex-col leading-tight min-w-0">
                      <span className="text-[7px] font-bold tracking-[0.2em] text-gold uppercase mb-0.5">
                        Aapki Tarakki Ka Saathi
                      </span>
                      <span className="text-[9px] italic text-blue-200/80 truncate">
                        Bharosa Aapka, Jimmedari Humari
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue/10 border border-blue/30 mb-3">
                    <Sparkles size={8} className="text-blue" />
                    <span className="text-[8px] font-bold tracking-[0.2em] text-blue uppercase">
                      Free Consultation
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="font-display text-[1.25rem] sm:text-[1.4rem] font-bold leading-[1.15] mb-2">
                    <span
                      style={{
                        background:
                          'linear-gradient(90deg, #FFFFFF 0%, #F6E9C9 50%, #FFFFFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Let's talk about
                    </span>
                    <br />
                    <span className="text-blue">your business.</span>
                  </h3>

                  <p className="text-[11px] text-white/55 leading-relaxed">
                    Share your details — we'll reach out within 24 hours.
                  </p>
                </div>

                {/* Right — Mini Stats */}
                <div className="relative shrink-0">
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-50 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(45,156,255,0.4), rgba(204,171,110,0.2))',
                      filter: 'blur(10px)',
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="relative w-[85px] sm:w-[95px] rounded-2xl p-2.5 overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(45,156,255,0.08) 0%, rgba(10,15,31,0.9) 50%, rgba(204,171,110,0.08) 100%)',
                      border: '1px solid rgba(45,156,255,0.25)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.05] pointer-events-none"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    <div className="relative space-y-2">
                      {/* Top stat */}
                      <div className="pb-2 border-b border-white/10">
                        <span
                          className="font-display text-base font-bold tabular block"
                          style={{
                            background: 'linear-gradient(90deg, #FFFFFF, #2D9CFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          150+
                        </span>
                        <p className="text-[7px] font-bold tracking-[0.1em] text-white/50 uppercase leading-tight mt-0.5">
                          80-IAC
                          <br />
                          Recognised
                        </p>
                      </div>

                      {/* Middle stat */}
                      <div className="pb-2 border-b border-white/10">
                        <span
                          className="font-display text-base font-bold tabular block"
                          style={{
                            background: 'linear-gradient(90deg, #FFFFFF, #CCAB6E)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          99%
                        </span>
                        <p className="text-[7px] font-bold tracking-[0.1em] text-white/50 uppercase leading-tight mt-0.5">
                          Success
                          <br />
                          Ratio
                        </p>
                      </div>

                      {/* Live */}
                      <div className="flex items-center gap-1">
                        <span className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0">
                          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                          <span className="relative w-1 h-1 rounded-full bg-green-400" />
                        </span>
                        <span className="text-[7px] font-bold tracking-[0.1em] text-green-400 uppercase">
                          Live
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="relative grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/5 mb-4">
                <div
                  className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-lg transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    left: tab === 'quick' ? '0.25rem' : 'calc(50% + 0.125rem)',
                    background:
                      'linear-gradient(135deg, rgba(45,156,255,0.2), rgba(10,95,204,0.15))',
                    border: '1px solid rgba(45,156,255,0.35)',
                    boxShadow: '0 0 20px rgba(45,156,255,0.15)',
                  }}
                />
                <button
                  onClick={() => setTab('quick')}
                  className={`relative z-10 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                    tab === 'quick' ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Zap size={11} strokeWidth={2.5} />
                  Quick Contact
                </button>
                <button
                  onClick={() => setTab('eligibility')}
                  className={`relative z-10 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                    tab === 'eligibility' ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <ClipboardCheck size={11} strokeWidth={2.5} />
                  Full Eligibility
                </button>
              </div>

              {/* Tab: Quick Contact */}
              {tab === 'quick' && (
                <form onSubmit={submit} className="space-y-2.5">
                  {/* Name */}
                  <div className="relative">
                    <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue/60 pointer-events-none" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.name ? 'border-red-400/50' : 'border-white/10'
                      } text-white text-[12px] placeholder-white/35 focus:outline-none focus:border-blue focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(45,156,255,0.15)] transition-all duration-300`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-400 ml-1 -mt-1">{errors.name}</p>}

                  {/* Mobile */}
                  <div className="relative">
                    <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue/60 pointer-events-none" />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="Mobile number"
                      className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.mobile ? 'border-red-400/50' : 'border-white/10'
                      } text-white text-[12px] placeholder-white/35 focus:outline-none focus:border-blue focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(45,156,255,0.15)] transition-all duration-300`}
                    />
                  </div>
                  {errors.mobile && <p className="text-[10px] text-red-400 ml-1 -mt-1">{errors.mobile}</p>}

                  {/* Email */}
                  <div className="relative">
                    <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue/60 pointer-events-none" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Email (optional)"
                      className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.email ? 'border-red-400/50' : 'border-white/10'
                      } text-white text-[12px] placeholder-white/35 focus:outline-none focus:border-blue focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(45,156,255,0.15)] transition-all duration-300`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-400 ml-1 -mt-1">{errors.email}</p>}

                  {/* Company */}
                  <div className="relative">
                    <Building2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue/60 pointer-events-none" />
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Company (optional)"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[12px] placeholder-white/35 focus:outline-none focus:border-blue focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(45,156,255,0.15)] transition-all duration-300"
                    />
                  </div>

                  {errors.submit && (
                    <p className="text-[10px] text-red-400 text-center">{errors.submit}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full mt-1 py-3 rounded-xl overflow-hidden transition-all duration-500 disabled:opacity-60"
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(135deg, #2D9CFF 0%, #1683FF 50%, #0A5FCC 100%)',
                      }}
                    />
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shine 2s ease-in-out infinite',
                      }}
                    />
                    <span
                      className="absolute -inset-1 rounded-xl opacity-40 group-hover:opacity-70 blur-md transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, #2D9CFF, #CCAB6E)' }}
                    />
                    <span className="relative flex items-center justify-center gap-2 text-white text-[12px] font-bold tracking-wide uppercase">
                      {loading ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Free Consultation
                          <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Trust hints */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="flex items-center gap-1">
                      <ShieldCheck size={9} className="text-green-400" />
                      <span className="text-[8px] font-medium tracking-wide text-white/40 uppercase">
                        Transparent
                      </span>
                    </div>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                    <div className="flex items-center gap-1">
                      <Sparkles size={9} className="text-gold" />
                      <span className="text-[8px] font-medium tracking-wide text-white/40 uppercase">
                        No Advance Fees*
                      </span>
                    </div>
                  </div>
                </form>
              )}

              {/* Tab: Eligibility */}
              {tab === 'eligibility' && (
                <div className="space-y-4">
                  <div className="relative rounded-2xl p-4 overflow-hidden bg-white/[0.03] border border-white/10">
                    <div
                      className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-40"
                      style={{
                        background: 'radial-gradient(circle, rgba(45,156,255,0.5), transparent 70%)',
                        filter: 'blur(40px)',
                      }}
                    />
                    <div className="relative flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                        <ClipboardCheck size={14} className="text-blue" strokeWidth={2.2} />
                      </div>
                      <div>
                        <h4 className="font-display text-[13px] font-bold text-white leading-tight mb-1">
                          3-Step Eligibility Check
                        </h4>
                        <p className="text-[10px] text-white/50 leading-relaxed">
                          Answer a few questions and discover relevant schemes.
                        </p>
                      </div>
                    </div>
                    <ul className="relative space-y-1.5 pl-1">
                      {['Business type & age', 'Support needed', 'Personalised recommendations'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-white/70">
                          <CheckCircle2 size={10} className="text-blue mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/eligibility"
                    onClick={close}
                    className="group relative w-full py-3 rounded-xl overflow-hidden transition-all duration-500 inline-flex items-center justify-center"
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, #2D9CFF 0%, #1683FF 50%, #0A5FCC 100%)',
                      }}
                    />
                    <span
                      className="absolute -inset-1 rounded-xl opacity-40 group-hover:opacity-70 blur-md transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, #2D9CFF, #CCAB6E)' }}
                    />
                    <span className="relative flex items-center gap-2 text-white text-[12px] font-bold tracking-wide uppercase">
                      Start Full Eligibility Check
                      <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>

                  <p className="text-[9px] text-white/35 text-center">
                    Takes ~60 seconds · No advance professional fees*
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative p-6 sm:p-8 text-center overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 32px)' }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(34,197,94,0.6), transparent 70%)',
                  filter: 'blur(50px)',
                }}
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={24} className="text-green-400" strokeWidth={2.5} />
                </div>
                <h3
                  className="font-display text-lg font-bold mb-2"
                  style={{
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #F6E9C9 50%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Thank you!
                </h3>
                <p className="text-[12px] text-white/60 leading-relaxed max-w-xs mx-auto">
                  We've received your details. Our team will reach out within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(20px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}