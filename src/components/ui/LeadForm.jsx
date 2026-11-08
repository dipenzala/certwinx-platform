import { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { submitLead } from '../../lib/supabase';

export default function LeadForm({ context = '', compact = false, dark = false }) {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    company: '',
    businessType: '',
    industry: '',
    city: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.mobile.trim()) errs.mobile = 'Mobile is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, '')))
      errs.mobile = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email';
    if (!form.consent) errs.consent = 'Please accept the consent';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('submitting');

    const params = new URLSearchParams(window.location.search);

    const { success, error } = await submitLead({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      company: form.company,
      business_type: form.businessType,
      industry: form.industry,
      city: form.city,
      message: form.message,
      source: context || 'contact-form',
      service: context,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
    });

    if (!success) {
      console.error('Lead submit failed:', error);
      setErrors({ submit: `Error: ${error || 'Something went wrong'}` });
      setStatus('idle');
      return;
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'lead_submitted', context });
    }

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div
        className={`rounded-2xl p-8 text-center transition-all duration-500 animate-fade-up ${
          dark
            ? 'bg-white/5 border border-white/10 text-white'
            : 'bg-paper border border-line shadow-sm text-ink'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight mb-2">
          Your Enquiry Has Been Received
        </h3>
        <p className={`text-sm max-w-md mx-auto leading-relaxed ${dark ? 'text-white/70' : 'text-graphite'}`}>
          Our startup and compliance advisory team will review your requirements and reach out within 24 business hours.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({
              name: '',
              mobile: '',
              email: '',
              company: '',
              businessType: '',
              industry: '',
              city: '',
              message: '',
              consent: false,
            });
          }}
          className="mt-6 text-xs font-semibold text-blue hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  const inputClass = (field) => {
    if (dark) {
      return `w-full px-4 py-3 rounded-xl bg-white/5 border ${
        errors[field] ? 'border-red-500/60' : 'border-white/15'
      } text-white placeholder-white/40 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue/30 transition-all text-sm`;
    }
    return `w-full px-4 py-3 rounded-xl bg-canvas border ${
      errors[field] ? 'border-red-500/70 focus:border-red-500' : 'border-line focus:border-blue'
    } text-ink placeholder-muted/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/15 transition-all text-sm`;
  };

  const labelClass = `block text-xs font-medium mb-1.5 ${dark ? 'text-white/80' : 'text-graphite'}`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-6 lg:p-8 transition-all ${
        dark
          ? 'bg-white/5 border border-white/10'
          : 'bg-paper border border-line shadow-sm'
      } ${compact ? '' : 'max-w-2xl'}`}
    >
      {!compact && (
        <div className="mb-6">
          <h3 className={`font-display text-xl font-bold tracking-tight mb-1 ${dark ? 'text-white' : 'text-ink'}`}>
            Request Expert Review
          </h3>
          <p className={`text-sm ${dark ? 'text-white/70' : 'text-graphite'}`}>
            Share your startup or business details for structured guidance from our specialists.
          </p>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="lead-name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="lead-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className={inputClass('name')}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lead-mobile" className={labelClass}>
            Mobile Number *
          </label>
          <input
            id="lead-mobile"
            type="tel"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="10-digit mobile"
            className={inputClass('mobile')}
          />
          {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className={labelClass}>
            Email Address
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-company" className={labelClass}>
            Company / Entity Name
          </label>
          <input
            id="lead-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Your enterprise or venture"
            className={inputClass('company')}
          />
        </div>

        {!compact && (
          <>
            <div>
              <label htmlFor="lead-type" className={labelClass}>
                Business Type
              </label>
              <select
                id="lead-type"
                value={form.businessType}
                onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                className={inputClass('businessType')}
              >
                <option value="">Select entity structure</option>
                <option>Private Limited Company</option>
                <option>Limited Liability Partnership (LLP)</option>
                <option>One Person Company (OPC)</option>
                <option>Partnership Firm</option>
                <option>Proprietorship</option>
                <option>Not Registered Yet</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-industry" className={labelClass}>
                Industry / Sector
              </label>
              <select
                id="lead-industry"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className={inputClass('industry')}
              >
                <option value="">Select primary sector</option>
                <option>Technology & Software</option>
                <option>Fintech & Financial Services</option>
                <option>Healthcare & Biotech</option>
                <option>CleanTech & EV</option>
                <option>Manufacturing & Engineering</option>
                <option>Agriculture & AgriTech</option>
                <option>Food Processing & F&B</option>
                <option>Education & EdTech</option>
                <option>Retail & E-commerce</option>
                <option>Professional Services</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-city" className={labelClass}>
                City / State
              </label>
              <input
                id="lead-city"
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. Ahmedabad, Mumbai, Bengaluru"
                className={inputClass('city')}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="lead-message" className={labelClass}>
                Requirements / Queries
              </label>
              <textarea
                id="lead-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                placeholder="Describe your current status, target scheme, or service requirement..."
                className={inputClass('message') + ' resize-none'}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="lead-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 w-4 h-4 rounded border-line text-blue focus:ring-blue/30 cursor-pointer"
        />
        <label htmlFor="lead-consent" className={`text-xs leading-relaxed cursor-pointer ${dark ? 'text-white/70' : 'text-graphite'}`}>
          I authorize CertWinX advisors to contact me regarding my enquiry. We treat your information with strict confidentiality.
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}

      {errors.submit && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-600 leading-relaxed">{errors.submit}</p>
        </div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue hover:bg-blue-hover text-white font-semibold text-sm shadow-[0_10px_25px_-5px_rgba(28,131,243,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(28,131,243,0.5)] transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Submitting Inquiry...
            </>
          ) : (
            <>
              <Send size={15} /> Submit Advisory Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}
