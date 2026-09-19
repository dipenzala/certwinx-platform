import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/motion/MagneticButton';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import { SERVICES } from '../data/services';

export default function Consultation() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', business: '', service: '', date: '', time: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Required';
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, ''))) err.mobile = 'Enter a valid 10-digit mobile';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Invalid email';
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 1000));
    if (window.dataLayer) window.dataLayer.push({ event: 'consultation_booked' });
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section className="min-h-[70svh] pt-40 pb-20 flex items-center justify-center bg-canvas">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-blue-soft border border-blue/25 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={28} className="text-blue" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-ink mb-3">Consultation request received</h2>
          <p className="text-sm text-graphite">Our team will review and contact you to confirm.</p>
        </div>
      </section>
    );
  }

  const input = (k) => `w-full px-5 py-4 rounded-2xl bg-paper border ${errors[k] ? 'border-red-400' : 'border-line'} text-ink focus:outline-none focus:border-ink/50`;

  return (
    <>
      <Helmet><title>Book a Consultation — CertWinX</title></Helmet>

      <section className="pt-40 pb-16 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Consultation"
            title="Talk to a CertWinX expert."
            subtitle="Share your details and preferred time. Our team will get in touch to confirm."
            align="center"
          />
        </div>
      </section>

      <section className="pb-section bg-canvas">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <form onSubmit={submit} className="bg-paper border border-line rounded-3xl p-8 lg:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name *" error={errors.name}><input className={input('name')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
                <Field label="Mobile *" error={errors.mobile}><input className={input('mobile')} value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></Field>
                <Field label="Email" error={errors.email}><input className={input('email')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
                <Field label="Business Name"><input className={input('business')} value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} /></Field>
                <div className="sm:col-span-2">
                  <Field label="Service">
                    <select className={input('service')} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select</option>
                      {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Preferred Date"><input type="date" className={input('date')} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
                <Field label="Preferred Time"><input type="time" className={input('time')} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></Field>
                <div className="sm:col-span-2">
                  <Field label="Message">
                    <textarea rows={3} className={input('message') + ' resize-none'} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </Field>
                </div>
              </div>
              <MagneticButton type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Booking...' : 'Book Consultation'}
              </MagneticButton>
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
      <label className="block text-[10px] tracking-[0.15em] text-muted uppercase mb-2">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}