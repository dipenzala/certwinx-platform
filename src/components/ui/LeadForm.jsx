import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { submitLead } from '../../lib/supabase';

export default function LeadForm({ context = '', compact = false }) {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
        >
          <CheckCircle2 size={32} className="text-green-400" />
        </motion.div>
        <h3 className="font-display text-xl font-semibold text-white mb-2">
          YOUR ENQUIRY HAS BEEN RECEIVED
        </h3>
        <p className="text-sm text-[#AAB4C3] max-w-md mx-auto">
          Our team will review the information provided and contact you regarding your requirement.
        </p>
      </motion.div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border ${
      errors[field] ? 'border-red-500/50' : 'border-white/10'
    } text-white placeholder-[#6B7685] focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-all text-sm`;

  return (
    <form onSubmit={handleSubmit} className={`glass rounded-2xl p-6 lg:p-8 ${compact ? '' : 'max-w-2xl'}`}>
      {!compact && (
        <div className="mb-6">
          <h3 className="font-display text-xl font-semibold text-white mb-1">
            Request Expert Review
          </h3>
          <p className="text-sm text-[#AAB4C3]">
            Share your details and our team will get back to you.
          </p>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="lead-name" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
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
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lead-mobile" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
            Mobile *
          </label>
          <input
            id="lead-mobile"
            type="tel"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="10-digit mobile"
            className={inputClass('mobile')}
          />
          {errors.mobile && <p className="text-xs text-red-400 mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
            Email
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-company" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
            Company Name
          </label>
          <input
            id="lead-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Your company"
            className={inputClass('company')}
          />
        </div>

        {!compact && (
          <>
            <div>
              <label htmlFor="lead-type" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
                Business Type
              </label>
              <select
                id="lead-type"
                value={form.businessType}
                onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                className={inputClass('businessType')}
              >
                <option value="">Select</option>
                <option>Private Limited</option>
                <option>LLP</option>
                <option>Partnership</option>
                <option>Proprietorship</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-industry" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
                Industry
              </label>
              <select
                id="lead-industry"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className={inputClass('industry')}
              >
                <option value="">Select</option>
                <option>Technology</option>
                <option>Manufacturing</option>
                <option>Agriculture</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>EV / Clean Energy</option>
                <option>Food</option>
                <option>FinTech</option>
                <option>Retail</option>
                <option>Services</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-city" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
                City
              </label>
              <input
                id="lead-city"
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Your city"
                className={inputClass('city')}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="lead-message" className="block text-xs font-medium text-[#AAB4C3] mb-1.5">
                Message
              </label>
              <textarea
                id="lead-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                placeholder="Tell us about your requirement"
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
          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-electric focus:ring-electric/30"
        />
        <label htmlFor="lead-consent" className="text-xs text-[#AAB4C3] leading-relaxed">
          I consent to being contacted by CertWinX regarding my enquiry.
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-400 mt-1">{errors.consent}</p>}

      {errors.submit && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-xs text-red-400 leading-relaxed">{errors.submit}</p>
        </div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue to-deepblue text-white font-semibold text-sm shadow-[0_15px_30px_-10px_rgba(23,105,255,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(23,105,255,0.7)] transition-all disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <><Loader2 size={15} className="animate-spin" /> Submitting...</>
          ) : (
            <><Send size={15} /> Submit Enquiry</>
          )}
        </button>
      </div>
    </form>
  );
}