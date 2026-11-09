import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  ArrowRight,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  Mail,
  Building2,
  Zap,
  ClipboardCheck,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowUpRight,
  Headphones,
  Lock,
} from 'lucide-react';
import { SITE, PHONE_NUMBER, getWhatsAppLink } from '../../lib/constants';
import { submitLead } from '../../lib/supabase';
import Logo from './Logo';

const SERVICE_OPTIONS = [
  'Section 80-IAC Tax Exemption (100% Tax Holiday)',
  'Startup India & DPIIT Recognition',
  'DST NIDHI-PRAYAS / Technology Grants',
  'CGSS Collateral-Free Credit (Up to ₹10 Cr)',
  'Private Limited / LLP Company Setup',
  'MSME Udyam & ZED Certification (80% Subsidy)',
  'Corporate Statutory & Tax Compliance',
  'General Enterprise Advisory Assessment',
];

export default function LeadPopup({ delay = 4000, force = false }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('quick');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    company: '',
    service: SERVICE_OPTIONS[0],
  });
  const [errors, setErrors] = useState({});

  // ============================================================
  // MULTI-TRIGGER LISTENER (Global Event + Window Function + Auto-Timer)
  // ============================================================
  useEffect(() => {
    // 1. Expose global window function
    window.openLeadPopup = (prefillService) => {
      try {
        sessionStorage.removeItem('certwinx_popup_dismissed_at');
      } catch (e) {
        // Safe fallback
      }
      if (prefillService && typeof prefillService === 'string') {
        const matched = SERVICE_OPTIONS.find((s) =>
          s.toLowerCase().includes(prefillService.toLowerCase())
        );
        setForm((prev) => ({ ...prev, service: matched || prefillService }));
      }
      setOpen(true);
    };

    // 2. Custom event listener
    const handleCustomEvent = (e) => {
      try {
        sessionStorage.removeItem('certwinx_popup_dismissed_at');
      } catch (err) {}
      const service = e.detail?.service;
      if (service && typeof service === 'string') {
        setForm((prev) => ({ ...prev, service }));
      }
      setOpen(true);
    };
    window.addEventListener('open-lead-popup', handleCustomEvent);

    // 3. Delegate click handler for any element with data-open-enquiry
    const handleDocumentClick = (e) => {
      const trigger = e.target.closest(
        '[data-open-enquiry], [href="#enquiry"], [href="#lead-popup"], [data-enquiry-trigger]'
      );
      if (trigger) {
        e.preventDefault();
        const service =
          trigger.getAttribute('data-service') ||
          trigger.getAttribute('data-category') ||
          trigger.getAttribute('data-topic');
        window.openLeadPopup(service);
      }
    };
    document.addEventListener('click', handleDocumentClick);

    // 4. Automatic Timer (3.5s delay, polite 15-second debounce)
    let timer = null;
    if (typeof window !== 'undefined') {
      const lastDismissed = sessionStorage.getItem('certwinx_popup_dismissed_at');

      let canAutoPop = true;
      if (lastDismissed && !force) {
        const elapsed = Date.now() - parseInt(lastDismissed, 10);
        if (elapsed < 15 * 1000) {
          canAutoPop = false; // brief 15s debounce
        }
      }

      if (canAutoPop || force) {
        timer = setTimeout(() => {
          setOpen(true);
        }, delay || 3500);
      }

      // 5. Exit Intent (Mouse moves towards address bar)
      const handleMouseLeave = (e) => {
        if (
          e.clientY <= 15 &&
          !sessionStorage.getItem('certwinx_lead_submitted') &&
          !sessionStorage.getItem('certwinx_popup_dismissed_at')
        ) {
          setOpen(true);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (timer) clearTimeout(timer);
        delete window.openLeadPopup;
        window.removeEventListener('open-lead-popup', handleCustomEvent);
        document.removeEventListener('click', handleDocumentClick);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [delay, force]);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('certwinx_popup_dismissed_at', Date.now().toString());
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, '')))
      e.mobile = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
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
      service: form.service,
      subject: `Advisory Enquiry: ${form.service}`,
      message: `Entrepreneur inquiry from website lead popup modal for: ${form.service}`,
      source: 'lead-popup-modal',
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
    });

    if (!success) {
      setErrors({ submit: error || 'Failed to submit inquiry. Please try again.' });
      setLoading(false);
      return;
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'lead_popup_submitted', ...form });
    }

    sessionStorage.setItem('certwinx_lead_submitted', '1');

    // Open WhatsApp in background with complete structured parameters
    const whatsappMsg = `Hi CertWinX Regulatory Desk,\n\n*Name:* ${form.name}\n*Mobile:* ${form.mobile}\n${form.email ? `*Email:* ${form.email}\n` : ''}${form.company ? `*Company:* ${form.company}\n` : ''}*Requirement:* ${form.service}\n\nI have requested an advisory consultation via CertWinX website.`;
    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

    try {
      window.open(whatsappUrl, '_blank');
    } catch (e) {
      // Ignored if popup blocked
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 lg:p-6 py-6">
        {/* Deep Backdrop */}
        <div
          className="fixed inset-0 bg-[#020617]/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={close}
        />

        {/* ============================================================
            ULTRA-MEGA-LEVEL LUXURY ADVISORY MODAL
            - Desktop: 2-Column Sovereign Navy Pillar + Executive Form
            - Mobile: Streamlined High-Conversion Form First with Compact Trust Badges
           ============================================================ */}
        <div
          className="relative w-full max-w-lg md:max-w-4xl rounded-2xl md:rounded-3xl bg-white border border-white/20 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.65)] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
          style={{ maxHeight: 'calc(100vh - 32px)' }}
        >
          {/* Top Multi-Color Electric Accent Ribbon */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1C83F3] via-sky to-[#0A47CC]" />

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-3.5 right-3.5 md:top-4 md:right-4 z-30 w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs hover:scale-105 transition-all cursor-pointer"
            aria-label="Close Enquiry Modal"
          >
            <X size={16} />
          </button>

          {!submitted ? (
            <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
              
              {/* ============================================================
                  LEFT COLUMN: SOVEREIGN ADVISORY CREST & TRUST PILLARS
                  (Desktop/Tablet md+ only - hidden on mobile to show form first)
                 ============================================================ */}
              <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#060D24] via-[#091538] to-[#040816] text-white p-6 sm:p-8 flex-col justify-between relative overflow-hidden">
                {/* Ambient Radial Mesh Lighting */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#1C83F3]/25 blur-[70px]" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sky/20 blur-[80px]" />
                </div>

                <div className="relative z-10">
                  {/* Brand Header & Live Advisory Status */}
                  <div className="flex items-center justify-between mb-6">
                    <Logo size="sm" link={false} />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ADVISORY ACTIVE
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-white mb-3 text-balance">
                    Fast-Track Your Regulatory & Tax Exemption Approvals.
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed mb-6">
                    Direct representation before the Inter-Ministerial Board (IMB), DPIIT NSWS portal, and national credit guarantee windows.
                  </p>

                  {/* 3 Sovereign Credential Cards */}
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#1C83F3]/20 border border-[#1C83F3]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-[#1C83F3]" strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">100% Tax Exemption</h4>
                        <p className="text-[11px] text-white/60 leading-snug">3-year holiday under Section 80-IAC</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#1C83F3]/20 border border-[#1C83F3]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-[#1C83F3]" strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">DPIIT Recognition</h4>
                        <p className="text-[11px] text-white/60 leading-snug">Turnover cap up to ₹200 Crore · 10 Yrs validity</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#1C83F3]/20 border border-[#1C83F3]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-[#1C83F3]" strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">CGSS Credit Guarantees</h4>
                        <p className="text-[11px] text-white/60 leading-snug">Up to ₹10 Crore collateral-free debt cover</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Direct Contact Capsule */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Headphones size={13} className="text-[#1C83F3]" />
                      Direct Advisory Line:
                    </span>
                    <strong className="text-white font-bold">{PHONE_NUMBER}</strong>
                  </div>
                  <p className="text-[9.5px] font-semibold text-white/50 tracking-wider uppercase mt-2">
                    AAPKI TARAKKI KA SAATHI · BHAROSHA APKA, JIMMEDARI HUMARI
                  </p>
                </div>
              </div>

              {/* ============================================================
                  RIGHT COLUMN: EXECUTIVE LEAD INQUIRY FORM
                  (Full width on mobile, 7 cols on md+)
                 ============================================================ */}
              <div className="col-span-1 md:col-span-7 p-4 sm:p-6 md:p-8 bg-white flex flex-col justify-between">
                <div>
                  {/* Mobile-Only Header Brand Bar */}
                  <div className="md:hidden flex items-center justify-between mb-3 pb-3 border-b border-slate-100 pr-9">
                    <Logo size="sm" link={false} />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Advisory Desk
                    </span>
                  </div>

                  {/* Form Header */}
                  <div className="mb-4 sm:mb-5">
                    <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-bold text-[#1C83F3] uppercase tracking-wider mb-2">
                      <Sparkles size={11} className="text-[#1C83F3]" />
                      Official Advisory Desk
                    </div>
                    <h4 className="font-display text-lg sm:text-2xl font-bold text-slate-900 leading-tight">
                      Schedule Confidential Advisory Call
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
                      Fill out your details below. An assigned regulatory specialist will review your profile and connect within 2 hours.
                    </p>

                    {/* Mobile Compact Credential Badges */}
                    <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar mt-2">
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-blue-50 text-[#1C83F3] border border-blue-200/80 text-[10px] font-bold">
                        ✓ 80-IAC 100% Tax Holiday
                      </span>
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold">
                        ✓ DPIIT ₹200 Cr
                      </span>
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10px] font-bold">
                        ✓ CGSS ₹10 Cr Debt
                      </span>
                    </div>
                  </div>

                  {/* Mode Tabs */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-5">
                    <button
                      type="button"
                      onClick={() => setTab('quick')}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tab === 'quick'
                          ? 'bg-white text-[#1C83F3] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Zap size={13} className={tab === 'quick' ? 'text-[#1C83F3]' : 'text-slate-400'} />
                      <span>Quick Callback</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('eligibility')}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tab === 'eligibility'
                          ? 'bg-white text-[#1C83F3] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ClipboardCheck size={13} className={tab === 'eligibility' ? 'text-[#1C83F3]' : 'text-slate-400'} />
                      <span>Full Assessment</span>
                    </button>
                  </div>

                  {/* Tab 1: Direct Form */}
                  {tab === 'quick' && (
                    <form onSubmit={submit} className="space-y-3.5">
                      
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter your full name"
                            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border ${
                              errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                            } text-slate-900 text-xs placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1C83F3] focus:ring-3 focus:ring-[#1C83F3]/15 transition-all`}
                          />
                        </div>
                        {errors.name && <p className="text-[10px] text-red-500 font-semibold mt-1 ml-1">{errors.name}</p>}
                      </div>

                      {/* Phone Number with +91 badge */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold select-none">
                            🇮🇳 +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '') })}
                            placeholder="10-digit mobile number"
                            className={`w-full px-3.5 py-2.5 rounded-r-xl bg-slate-50 border ${
                              errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                            } text-slate-900 text-xs placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1C83F3] focus:ring-3 focus:ring-[#1C83F3]/15 transition-all`}
                          />
                        </div>
                        {errors.mobile && <p className="text-[10px] text-red-500 font-semibold mt-1 ml-1">{errors.mobile}</p>}
                      </div>

                      {/* Email & Company (Two-Column on sm+) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Official Email
                          </label>
                          <div className="relative">
                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="name@company.com"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1C83F3] focus:ring-3 focus:ring-[#1C83F3]/15 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Startup / Entity Name
                          </label>
                          <div className="relative">
                            <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              value={form.company}
                              onChange={(e) => setForm({ ...form, company: e.target.value })}
                              placeholder="Entity / Brand name"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1C83F3] focus:ring-3 focus:ring-[#1C83F3]/15 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Advisory Requirement Selector */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Advisory Service Vertical
                        </label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-[#1C83F3] focus:ring-3 focus:ring-[#1C83F3]/15 transition-all cursor-pointer font-medium"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {errors.submit && (
                        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-600 text-center font-medium">
                          {errors.submit}
                        </div>
                      )}

                      {/* Submit CTA Button with Live Gradient Glow */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1C83F3] via-[#0E60D2] to-[#0A47CC] hover:from-[#2B92FF] hover:to-[#1656E8] text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(28,131,243,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(28,131,243,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Dispatching Advisory Dossier...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Senior Advisory Callback</span>
                            <ArrowRight size={15} />
                          </>
                        )}
                      </button>

                      {/* Security Trust Strip */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2 text-[10px] text-slate-600 font-semibold flex-wrap">
                        <span className="flex items-center gap-1">
                          <Lock size={11} className="text-emerald-600" />
                          256-Bit SSL Encrypted
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <ShieldCheck size={11} className="text-[#1C83F3]" />
                          Direct CA/CS Review
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={11} className="text-emerald-600" />
                          Zero Spam
                        </span>
                      </div>

                      {/* Mobile Direct Helpline Strip */}
                      <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <a
                          href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#1C83F3]"
                        >
                          <Headphones size={13} className="text-[#1C83F3]" />
                          <span>Call: {PHONE_NUMBER}</span>
                        </a>
                        <a
                          href={getWhatsAppLink('Direct Mobile Advisory Enquiry')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-emerald-600"
                        >
                          <span>WhatsApp</span>
                          <ArrowUpRight size={12} />
                        </a>
                      </div>
                    </form>
                  )}

                  {/* Tab 2: Interactive Eligibility Link */}
                  {tab === 'eligibility' && (
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-sky-50/50 border border-blue-200/80 text-xs text-slate-700 leading-relaxed">
                        <div className="flex items-center gap-2 mb-2 font-bold text-[#0A163B] text-sm">
                          <ClipboardCheck size={18} className="text-[#1C83F3]" />
                          Interactive Scheme Intelligence Diagnostic
                        </div>
                        <p className="mb-3 text-slate-600">
                          Complete our 3-step structured assessment to map your venture against 16+ active Central & State government schemes, including DPIIT, Section 80-IAC, DST NIDHI Grants, and CGSS.
                        </p>
                        <ul className="space-y-2 text-slate-800 font-semibold pl-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span>Entity age and ₹200 Cr turnover criteria evaluation</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span>Non-dilutive grant mapping & state subsidy check</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span>Customized statutory documentation checklist</span>
                          </li>
                        </ul>
                      </div>

                      <Link
                        to="/eligibility"
                        onClick={close}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1C83F3] to-[#0A47CC] hover:from-[#2B92FF] hover:to-[#1656E8] text-white text-xs font-bold uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(28,131,243,0.45)] inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                      >
                        <span>Launch Automated Eligibility Diagnostic</span>
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* ============================================================
               SUCCESS VIEW: LUXURY ACKNOWLEDGEMENT SHOWCASE
               ============================================================ */
            <div className="p-8 sm:p-12 text-center bg-white animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                <CheckCircle2 size={34} />
              </div>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-3">
                Advisory Dossier Transmitted
              </div>

              <h4 className="font-display text-2xl font-bold text-slate-900 mb-2">
                Thank You, {form.name || 'Valued Entrepreneur'}!
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                Your enquiry regarding <strong className="text-slate-900">{form.service}</strong> has been transmitted directly to our Senior Advisory Team at <span className="font-bold text-[#1C83F3]">info@certwinx.com</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={getWhatsAppLink('Instant Enquiry Follow-up')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:scale-[1.02] transition-all"
                >
                  <span>Chat on WhatsApp Directly</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  onClick={close}
                  className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
