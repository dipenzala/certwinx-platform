import { useState } from 'react';
import BackButton from '../components/ui/BackButton';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileCheck,
  Clock,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Landmark,
  Building2,
  Award,
  TrendingUp,
  Percent,
  Users,
  Briefcase,
  MessageCircle,
  Check,
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import LeadForm from '../components/ui/LeadForm';
import CertificateTicker from '../components/sections/CertificateTicker';
import { SERVICES, getServiceBySlug } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  ).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{service.name} — Regulatory Execution Scope | CertWinX</title>
        <meta name="description" content={service.short} />
      </Helmet>

      {/* ============ HERO (Enterprise Light-Blue) ============ */}
      <section className="relative pt-36 lg:pt-44 pb-16 bg-canvas border-b border-line overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-6">
            <BackButton label="Back to Services Directory" />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT — Content */}
            <div className="lg:col-span-8">
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                  {service.category} Advisory
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink text-balance mb-6">
                  {service.name}
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-3xl mb-8">
                  {service.description}
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton
                    href={getWhatsAppLink(service.name)}
                    variant="whatsapp"
                    size="lg"
                  >
                    <MessageCircle size={15} /> WhatsApp Desk
                  </MagneticButton>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <QuickFact
                    icon={Clock}
                    label="Timeline"
                    value={service.timeline.split('(')[0].trim()}
                  />
                  <QuickFact
                    icon={FileCheck}
                    label="Documents"
                    value={`${service.documents.length} Items Checklist`}
                  />
                  <QuickFact
                    icon={TrendingUp}
                    label="Process Steps"
                    value={`${service.process.length} Execution Steps`}
                  />
                </div>
              </RevealOnScroll>

              {/* ============ GENUINE OPERATIONAL METRICS ============ */}
              <RevealOnScroll delay={0.5}>
                <div className="mt-10 pt-8 border-t border-line">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatBlock
                      value="100%"
                      label="Procedural Guidance"
                      sub="Step-by-step documentation"
                    />
                    <StatBlock
                      value="18+"
                      label="Mapped Schemes"
                      sub="Aligned opportunities"
                      highlight
                    />
                    <StatBlock
                      value="28+"
                      label="States Coverage"
                      sub="Pan-India operations"
                    />
                    <StatBlock
                      value="24h"
                      label="Inquiry SLA"
                      sub="Direct advisory desk"
                      highlight
                    />
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT — Service At A Glance card */}
            <div className="lg:col-span-4">
              <RevealOnScroll delay={0.3}>
                <div className="bg-white border border-line rounded-3xl p-6 lg:p-7 shadow-sm">
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-line">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
                      Service Scope At A Glance
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    <Row label="Category" value={service.category} />
                    <Row
                      label="Typical Timeline"
                      value={service.timeline.split('(')[0].trim()}
                    />
                    <Row
                      label="Required Documents"
                      value={`${service.documents.length} statutory files`}
                    />
                  </div>

                  <div className="mt-6 pt-5 border-t border-line space-y-2.5">
                    {[
                      'Transparent Regulatory Guidance',
                      'Dedicated Account Advisory',
                      'Scrutiny & Filing Audit Support',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-medium text-graphite"
                      >
                        <Check
                          size={13}
                          className="text-blue shrink-0"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-canvas border border-line">
                    <p className="text-[11px] text-graphite leading-relaxed">
                      <strong className="text-ink font-semibold">Statutory Note:</strong>{' '}
                      CertWinX provides professional documentation and filing assistance. Sanctions and approvals remain subject to relevant authority discretion.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATE TICKER — 80-IAC only ============ */}
      {slug === 'section-80-iac' && <CertificateTicker />}

      {/* ============ MAIN CONTENT ============ */}
      <section className="relative py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* LEFT — Main Content */}
            <div className="lg:col-span-8 space-y-12">
              <ContentBlock
                icon={Users}
                eyebrow="Target Audience"
                title="Who is this service designed for?"
                items={service.whoIsItFor}
              />

              <ContentBlock
                icon={ShieldCheck}
                eyebrow="Prerequisites"
                title="Eligibility & Baseline Requirements"
                items={service.eligibility}
              />

              <ContentBlock
                icon={Award}
                eyebrow="Deliverables"
                title="Key Deliverables & Business Value"
                items={service.benefits}
                tone="green"
              />

              {/* Documents Required */}
              <div>
                <RevealOnScroll>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                      <span className="w-5 h-px bg-blue" />
                      Preparation Checklist
                    </span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight flex items-center gap-3">
                      <FileCheck size={24} className="text-blue" />
                      Required Documentation
                    </h2>
                  </div>
                </RevealOnScroll>

                <div className="grid sm:grid-cols-2 gap-3">
                  {service.documents.map((doc, i) => (
                    <RevealOnScroll key={i} delay={i * 0.04}>
                      <div className="flex items-start gap-3 bg-white border border-line rounded-2xl p-4 shadow-sm">
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center text-[10px] font-bold text-blue tabular">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-medium text-graphite leading-relaxed pt-0.5">
                          {doc}
                        </span>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <RevealOnScroll>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                      <span className="w-5 h-px bg-blue" />
                      Workflow Architecture
                    </span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight flex items-center gap-3">
                      <TrendingUp size={24} className="text-blue" />
                      Our Advisory Execution Process
                    </h2>
                  </div>
                </RevealOnScroll>

                <div className="space-y-3">
                  {service.process.map((step, i) => (
                    <RevealOnScroll key={i} delay={i * 0.04}>
                      <div className="flex items-start gap-4 bg-white border border-line rounded-2xl p-5 shadow-sm">
                        <span className="shrink-0 font-display text-2xl font-bold text-blue/30 tabular">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-medium text-graphite leading-relaxed pt-1">
                          {step}
                        </span>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              {/* Timeline card (Enterprise Deep Blue) */}
              <RevealOnScroll>
                <div className="bg-gradient-to-br from-deepblue to-[#0e275c] text-white rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-md">
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Clock size={22} className="text-sky" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.25em] text-sky uppercase mb-1">
                        Estimated Statutory Timeline
                      </p>
                      <p className="text-lg font-bold text-white mb-2">
                        {service.timeline}
                      </p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Actual turnaround times may vary depending on ministry portal loads and applicant documentation completeness.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* FAQ */}
              {service.faq?.length > 0 && (
                <div>
                  <RevealOnScroll>
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                        <span className="w-5 h-px bg-blue" />
                        Common Questions
                      </span>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
                        Frequently Asked Questions
                      </h2>
                    </div>
                  </RevealOnScroll>

                  <div className="space-y-3">
                    {service.faq.map((f, i) => (
                      <RevealOnScroll key={i} delay={i * 0.04}>
                        <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                          >
                            <span className="font-display text-sm font-bold text-ink group-hover:text-blue transition-colors">
                              {f.q}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-muted shrink-0 transition-all duration-300 ${
                                openFaq === i ? 'rotate-180 text-blue' : ''
                              }`}
                            />
                          </button>
                          {openFaq === i && (
                            <div className="px-5 pb-5 pt-1 text-xs text-graphite leading-relaxed border-t border-line/60">
                              {f.a}
                            </div>
                          )}
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — Sticky Sidebar Lead Form */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <LeadForm context={`Service: ${service.name}`} compact />

                {related.length > 0 && (
                  <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] tracking-[0.2em] text-blue font-bold uppercase mb-4">
                      Related in {service.category}
                    </p>
                    <ul className="space-y-3">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            to={`/services/${r.slug}`}
                            className="text-xs font-semibold text-graphite hover:text-blue transition-colors block line-clamp-1"
                          >
                            → {r.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function QuickFact({ icon: Icon, label, value }) {
  return (
    <div className="p-3.5 bg-white border border-line rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-blue" />
        <span className="text-[10px] font-bold tracking-wider text-muted uppercase">
          {label}
        </span>
      </div>
      <p className="text-xs font-bold text-ink truncate">{value}</p>
    </div>
  );
}

function StatBlock({ value, label, sub, highlight }) {
  return (
    <div className={`p-4 rounded-2xl border ${highlight ? 'bg-blue/5 border-blue/20' : 'bg-white border-line'}`}>
      <span className={`font-display text-2xl font-bold block ${highlight ? 'text-blue' : 'text-ink'}`}>
        {value}
      </span>
      <span className="text-[10px] font-bold tracking-wider text-muted uppercase block mb-1">
        {label}
      </span>
      <span className="text-[11px] text-graphite block">{sub}</span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs py-1 border-b border-line/60">
      <span className="text-muted font-medium">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}

function ContentBlock({ icon: Icon, eyebrow, title, items, tone }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <RevealOnScroll>
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
            <span className="w-5 h-px bg-blue" />
            {eyebrow}
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight flex items-center gap-3">
            <Icon size={24} className="text-blue" />
            {title}
          </h2>
        </div>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <RevealOnScroll key={i} delay={i * 0.04}>
            <div className="flex items-start gap-3 bg-white border border-line rounded-2xl p-4 sm:p-5 shadow-sm">
              <CheckCircle2
                size={16}
                className={tone === 'green' ? 'text-emerald-600 mt-0.5 shrink-0' : 'text-blue mt-0.5 shrink-0'}
              />
              <span className="text-sm font-medium text-graphite leading-relaxed">{item}</span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
