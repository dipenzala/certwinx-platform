import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import LeadForm from '../components/ui/LeadForm';
import { SITE, getWhatsAppLink } from '../lib/constants';

/* ============ CONTACT METHODS ============ */
const CONTACT_METHODS = [
  {
    icon: Phone,
    label: 'Direct Phone',
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
    description: 'Monday to Saturday, 9:00 AM – 6:00 PM IST',
    tone: 'blue',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Advisory Desk',
    value: '+91 88496 54137',
    href: getWhatsAppLink('direct contact enquiry'),
    description: 'Fastest response · Connect directly with advisors',
    tone: 'green',
    live: true,
  },
  {
    icon: Mail,
    label: 'Official Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    description: 'Formal advisory inquiry · SLA <24 hours',
    tone: 'blue',
  },
];

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: 'Mon–Sat', label: 'Working Days' },
  { value: '9:00–18:00', label: 'Business Hours (IST)' },
  { value: '<24 hrs', label: 'Inquiry Response SLA' },
  { value: 'Ahmedabad', label: 'HQ & Operations' },
];

/* ============ QUICK TOPICS ============ */
const TOPICS = [
  'Startup India / DPIIT',
  'Section 80-IAC Tax Exemption',
  'Startup Seed Fund (SISFS)',
  'CGSS / CGTMSE Credit Guarantees',
  'MSME ZED Certification',
  'ISO 9001/27001 Compliance',
  'Company / LLP Registration',
  'Statutory Annual Compliance',
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact CertWinX Private Limited — Ahmedabad Advisory Desk</title>
        <meta
          name="description"
          content="Get in touch with CertWinX Private Limited in Ahmedabad, Gujarat. Reach our regulatory advisory team for DPIIT recognition, 80-IAC, funding schemes, and certifications."
        />
      </Helmet>

      {/* ============ HERO (Enterprise Light-Blue) ============ */}
      <section className="relative pt-36 lg:pt-44 pb-16 bg-canvas overflow-hidden border-b border-line">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">

            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                Advisory & Client Engagement Desk
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                Connect directly with our regulatory advisory team.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
                Whether you need statutory guidance on Section 80-IAC, DPIIT recognition, seed funding, or MSME certifications — we're here to assist.
              </p>
            </RevealOnScroll>

            {/* Metrics */}
            <RevealOnScroll delay={0.3}>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white border border-line shadow-sm">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="font-display text-base font-bold text-ink tabular">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase">
                      {s.label}
                    </span>
                    {i < HERO_STATS.length - 1 && (
                      <span className="w-px h-4 bg-line ml-3 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* ============ CONTACT METHODS ============ */}
      <section className="py-12 bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTACT_METHODS.map((m, i) => (
              <RevealOnScroll key={i} delay={i * 0.04}>
                <a
                  href={m.href}
                  target={m.label.includes('WhatsApp') ? '_blank' : undefined}
                  rel={m.label.includes('WhatsApp') ? 'noopener noreferrer' : undefined}
                  className="group block h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center">
                      <m.icon size={20} className="text-blue" />
                    </div>
                    {m.live && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online Now
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-bold tracking-wider text-muted uppercase mb-1">
                    {m.label}
                  </p>
                  <h3 className="font-display text-base font-bold text-ink mb-1 group-hover:text-blue transition-colors">
                    {m.value}
                  </h3>
                  <p className="text-xs text-graphite">{m.description}</p>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MAIN: FORM + OFFICE ============ */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            {/* LEFT: Lead form */}
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                    <span className="w-5 h-px bg-blue" />
                    Direct Inquiry Form
                  </span>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight mb-2">
                    Request an Advisory Consultation
                  </h2>
                  <p className="text-sm text-graphite">
                    Share your venture details and our Ahmedabad advisory desk will reply within 24 hours.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <LeadForm />
              </RevealOnScroll>
            </div>

            {/* RIGHT: Office + Topics */}
            <div className="lg:col-span-5 space-y-6">
              <RevealOnScroll delay={0.2}>
                {/* Office card (Enterprise Deep Blue) */}
                <div className="bg-gradient-to-br from-deepblue to-[#0e275c] text-white rounded-3xl p-7 relative overflow-hidden shadow-md">
                  <div className="flex items-start gap-3.5 mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Building2 size={20} className="text-sky" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.25em] text-sky uppercase mb-0.5">
                        Registered Headquarters
                      </p>
                      <h3 className="font-display text-base font-bold text-white">
                        CertWinX Private Limited
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed mb-6">
                    {SITE.address}
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-white/80">
                    <div className="flex items-center gap-2.5">
                      <Clock size={13} className="text-sky shrink-0" />
                      <span>{SITE.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={13} className="text-sky shrink-0" />
                      <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">
                        {SITE.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail size={13} className="text-sky shrink-0" />
                      <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Quick Topics */}
              <div className="bg-white border border-line rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-3">
                  Advisory Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-canvas border border-line text-[11px] font-semibold text-graphite hover:border-blue/40 hover:text-blue transition-colors cursor-default"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Response SLA Note */}
              <div className="bg-white border border-line rounded-3xl p-6 shadow-sm flex items-start gap-3">
                <ShieldCheck size={20} className="text-blue mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-display text-sm font-bold text-ink mb-1">
                    Direct Operational SLA
                  </h4>
                  <p className="text-xs text-graphite leading-relaxed">
                    Every inquiry is reviewed by our regulatory specialists. We do not use automated marketing bots or cold sales calls.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
