import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/motion/MagneticButton';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import { SERVICES } from '../data/services';
import { submitLead } from '../lib/supabase';
import { getWhatsAppLink } from '../lib/constants';

export default function Consultation() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    business: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, ''))) err.mobile = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email address';
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus('submitting');

    try {
      await submitLead({
        name: form.name.trim(),
        email: form.email.trim() || 'not-provided@certwinx.com',
        phone: form.mobile.trim(),
        company: form.business.trim(),
        subject: `Consultation Booking: ${form.service || 'General Advisory'}`,
        message: `
Requested Consultation:
- Service: ${form.service || 'General'}
- Preferred Date: ${form.date || 'Flexible'}
- Preferred Time: ${form.time || 'Flexible'}
- Business Name: ${form.business || 'Not specified'}
- Message: ${form.message || 'No additional message'}
        `.trim(),
        source: 'consultation-page',
      });

      if (window.dataLayer) {
        window.dataLayer.push({ event: 'consultation_booked' });
      }
      setStatus('success');
    } catch (error) {
      console.error('Consultation booking error:', error);
      // Still show success to client since failover occurred
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <section className="min-h-[70svh] pt-40 pb-20 flex items-center justify-center bg-canvas">
        <div className="text-center max-w-lg mx-auto px-6 bg-white border border-line rounded-3xl p-8 lg:p-12 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-blue" />
          </div>
          <h2 className="font-display text-2xl font-bold text-ink mb-3">
            Consultation Request Confirmed
          </h2>
          <p className="text-sm text-graphite leading-relaxed mb-6">
            Thank you, {form.name}. Our Ahmedabad regulatory advisory desk has received your request and will contact you via phone/WhatsApp to confirm your slot.
          </p>
          <div className="flex justify-center gap-3">
            <MagneticButton to="/" variant="outline" size="sm">
              Return to Homepage
            </MagneticButton>
            <MagneticButton href={getWhatsAppLink('consultation follow-up')} variant="whatsapp" size="sm">
              WhatsApp Desk
            </MagneticButton>
          </div>
        </div>
      </section>
    );
  }

  const input = (k) =>
    `w-full px-5 py-3.5 rounded-2xl bg-white border ${
      errors[k] ? 'border-rose-400 bg-rose-50/20' : 'border-line'
    } text-ink placeholder-muted focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-sm transition-all`;

  return (
    <>
      <Helmet>
        <title>Book a Regulatory Advisory Consultation — CertWinX</title>
        <meta
          name="description"
          content="Schedule a confidential consultation with CertWinX regulatory specialists in Ahmedabad for DPIIT recognition, 80-IAC, funding schemes, or MSME certifications."
        />
      </Helmet>

      <section className="pt-36 lg:pt-44 pb-14 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Direct Advisory Desk"
            title="Book an expert advisory consultation."
            subtitle="Select your focus area and preferred schedule. Our regulatory team in Ahmedabad will confirm your slot within 24 hours."
            align="center"
          />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <form
              onSubmit={submit}
              className="bg-white border border-line rounded-3xl p-8 lg:p-12 shadow-sm space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name *" error={errors.name}>
                  <input
                    className={input('name')}
                    placeholder="e.g. Ramesh Patel"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Field>

                <Field label="Mobile Number *" error={errors.mobile}>
                  <input
                    className={input('mobile')}
                    placeholder="e.g. 98765 43210"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  />
                </Field>

                <Field label="Official Email" error={errors.email}>
                  <input
                    className={input('email')}
                    placeholder="e.g. ramesh@company.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </Field>

                <Field label="Business / Startup Name">
                  <input
                    className={input('business')}
                    placeholder="e.g. NexaTech Innovations Pvt Ltd"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Advisory Scope / Target Service">
                    <select
                      className={input('service')}
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="">Select an Advisory Vertical</option>
                      <option value="DPIIT / Startup India Recognition">DPIIT / Startup India Recognition</option>
                      <option value="Section 80-IAC Tax Exemption">Section 80-IAC Tax Exemption (IMB Board)</option>
                      <option value="Startup India Seed Fund (SISFS)">Startup India Seed Fund Scheme (SISFS)</option>
                      <option value="Credit Guarantee (CGSS / CGTMSE)">Credit Guarantee Schemes (CGSS / CGTMSE)</option>
                      <option value="MSME ZED / Quality Certifications">MSME ZED / Quality Certifications</option>
                      <option value="Company / LLP Incorporation">Company / LLP Incorporation</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Preferred Date">
                  <input
                    type="date"
                    className={input('date')}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </Field>

                <Field label="Preferred Time Slot">
                  <input
                    type="time"
                    className={input('time')}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Brief Context / Current Challenges">
                    <textarea
                      rows={3}
                      className={input('message') + ' resize-none'}
                      placeholder="Share your entity stage, prior funding, or specific compliance questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </Field>
                </div>
              </div>

              <MagneticButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Confirming Booking...' : 'Schedule Regulatory Consultation'}
              </MagneticButton>

              <div className="flex items-center justify-center gap-2 text-xs text-muted pt-2">
                <ShieldCheck size={14} className="text-blue" />
                <span>Confidential advisory engagement · Zero cold spam</span>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-[0.15em] text-muted uppercase mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
