import { useEffect, useRef, useState } from 'react';
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
import { gsap } from '../lib/gsap';
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
  const rootRef = useRef(null);

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  ).slice(0, 4);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-glow]').forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=30' : '-=30',
          y: i % 2 === 0 ? '-=20' : '+=20',
          duration: 14 + i * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 10,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('[data-live-dot]', {
        scale: 1.6,
        opacity: 0.4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray('[data-particle]').forEach((p, i) => {
        gsap.to(p, {
          y: () => gsap.utils.random(-25, 25),
          x: () => gsap.utils.random(-20, 20),
          opacity: () => gsap.utils.random(0.2, 0.6),
          duration: 6 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>{service.name} — CertWinX</title>
        <meta name="description" content={service.short} />
      </Helmet>

      {/* ============ HERO (Navy) ============ */}
      <section
        ref={rootRef}
        className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 bg-[#0A0F1F] text-white overflow-hidden"
      >
        <div
          data-grid-shimmer
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(22,131,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '200% 100%, 64px 64px, 64px 64px',
          }}
        />

        <div
          data-glow
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none"
        />
        <div
          data-glow
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none"
        />

        {[
          { top: '25%', left: '8%', size: 3 },
          { top: '45%', left: '92%', size: 2 },
          { top: '75%', left: '88%', size: 3 },
          { top: '60%', left: '5%', size: 2 },
        ].map((p, i) => (
          <span
            key={i}
            data-particle
            className="absolute rounded-full bg-blue pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: `0 0 ${p.size * 4}px rgba(22,131,255,0.6)`,
            }}
          />
        ))}

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-8">
              <BackButton label="Back" />
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT — Content */}
            <div className="lg:col-span-8">
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                  <span className="relative flex items-center justify-center w-2.5 h-2.5">
                    <span data-live-dot className="absolute inset-0 rounded-full bg-green-400/60" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                  </span>
                  {service.category}
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                  {service.name}
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-3xl mb-8">
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
                    <MessageCircle size={15} /> WhatsApp
                  </MagneticButton>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <QuickFact
                    icon={Clock}
                    label="Timeline"
                    value={service.timeline.split('(')[0].trim()}
                  />
                  <QuickFact
                    icon={FileCheck}
                    label="Documents"
                    value={`${service.documents.length} Required`}
                  />
                  <QuickFact
                    icon={TrendingUp}
                    label="Process Steps"
                    value={`${service.process.length} Steps`}
                  />
                </div>
              </RevealOnScroll>

              {/* ============ BY THE NUMBERS — Stats ============ */}
              <RevealOnScroll delay={0.5}>
                <div className="mt-12 pt-10 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">
                      By The Numbers
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    <StatBlock
                      value="250+"
                      label="Services Offered"
                      sub="From registration to funding"
                    />
                    <StatBlock
                      value="160+"
                      label="Schemes Mapped"
                      sub="Central & state schemes"
                      highlight
                    />
                    <StatBlock
                      value="8,927+"
                      label="Clients Served"
                      sub="Trusted across India"
                    />
                    <StatBlock
                      value="99%"
                      label="Success Ratio"
                      sub="Consistent outcomes"
                      highlight
                    />
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT — Trust card */}
            <div className="lg:col-span-4">
              <RevealOnScroll delay={0.3}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-6 pb-5 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                      Service At A Glance
                    </span>
                  </div>

                  <div className="space-y-4">
                    <Row label="Category" value={service.category} />
                    <Row
                      label="Timeline"
                      value={service.timeline.split('(')[0].trim()}
                    />
                    <Row
                      label="Documents"
                      value={`${service.documents.length} items`}
                    />
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                    {[
                      'Transparent Process',
                      'Dedicated Support',
                      'Documentation Assistance',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-white/75"
                      >
                        <Check
                          size={12}
                          className="text-blue shrink-0"
                          strokeWidth={3}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-blue/8 border border-blue/20">
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      <strong className="text-blue font-semibold">Note:</strong>{' '}
                      CertWinX provides professional assistance only. Approvals are at
                      the sole discretion of the relevant authorities.
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
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* LEFT — Main Content */}
            <div className="lg:col-span-8 space-y-14">
              <ContentBlock
                icon={Users}
                eyebrow="Audience"
                title="Who is it for?"
                items={service.whoIsItFor}
              />

              <ContentBlock
                icon={ShieldCheck}
                eyebrow="Requirements"
                title="Eligibility"
                items={service.eligibility}
              />

              <ContentBlock
                icon={Award}
                eyebrow="Advantages"
                title="Benefits"
                items={service.benefits}
                tone="green"
              />

              {/* Documents Required */}
              <div>
                <RevealOnScroll>
                  <div className="mb-7">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                      <span className="w-6 h-px bg-blue" />
                      Preparation
                    </span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight flex items-center gap-3">
                      <FileCheck size={24} className="text-blue" />
                      Documents Required
                    </h2>
                  </div>
                </RevealOnScroll>

                <div className="grid sm:grid-cols-2 gap-3">
                  {service.documents.map((doc, i) => (
                    <RevealOnScroll key={i} delay={i * 0.05}>
                      <div className="group flex items-start gap-3 bg-white border border-line rounded-2xl p-4 hover:border-blue/30 hover:shadow-[0_15px_30px_-15px_rgba(23,105,255,0.25)] transition-all duration-500">
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center text-[10px] font-bold text-blue tabular">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-graphite leading-relaxed pt-1">
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
                  <div className="mb-7">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                      <span className="w-6 h-px bg-blue" />
                      Workflow
                    </span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight flex items-center gap-3">
                      <TrendingUp size={24} className="text-blue" />
                      Our Process
                    </h2>
                  </div>
                </RevealOnScroll>

                <div className="space-y-3">
                  {service.process.map((step, i) => (
                    <RevealOnScroll key={i} delay={i * 0.05}>
                      <div className="group flex items-start gap-4 bg-white border border-line rounded-2xl p-5 hover:border-blue/30 hover:shadow-[0_15px_30px_-15px_rgba(23,105,255,0.25)] transition-all duration-500">
                        <span className="shrink-0 font-display text-2xl font-bold text-blue/25 group-hover:text-blue/50 transition-colors tabular">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm lg:text-base text-graphite leading-relaxed pt-1">
                          {step}
                        </span>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              {/* Timeline card */}
              <RevealOnScroll>
                <div className="bg-[#0A0F1F] rounded-3xl p-6 lg:p-7 relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue/20 blur-[60px]" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-blue" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                        Estimated Timeline
                      </p>
                      <p className="text-base lg:text-lg font-bold text-white">
                        {service.timeline}
                      </p>
                      <p className="mt-2 text-xs text-white/50 leading-relaxed">
                        Actual timelines may vary based on authority processing and
                        completeness of documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* FAQ */}
              {service.faq?.length > 0 && (
                <div>
                  <RevealOnScroll>
                    <div className="mb-7">
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                        <span className="w-6 h-px bg-blue" />
                        Common Questions
                      </span>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
                        Frequently Asked Questions
                      </h2>
                    </div>
                  </RevealOnScroll>

                  <div className="space-y-3">
                    {service.faq.map((f, i) => (
                      <RevealOnScroll key={i} delay={i * 0.05}>
                        <div className="bg-white border border-line rounded-2xl overflow-hidden hover:border-blue/30 transition-colors duration-500">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                          >
                            <span className="font-display text-sm lg:text-base font-bold text-ink group-hover:text-blue transition-colors">
                              {f.q}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-muted shrink-0 transition-all duration-500 ${
                                openFaq === i ? 'rotate-180 text-blue' : ''
                              }`}
                            />
                          </button>
                          {openFaq === i && (
                            <div className="px-5 pb-5 text-sm text-graphite leading-relaxed border-t border-line pt-4">
                              {f.a}
                            </div>
                          )}
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <RevealOnScroll>
                <div className="bg-white border border-line rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue/8 border border-blue/20 flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} className="text-blue" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-2">
                        Important Disclaimer
                      </p>
                      <p className="text-xs text-graphite leading-relaxed">
                        CertWinX provides professional assistance and consultancy
                        services. Registrations, certifications, approvals and outcomes
                        are subject to applicable eligibility criteria, documentation,
                        government rules and decisions of the relevant authorities.
                        Information provided is for general informational purposes and
                        may change.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT — Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <LeadForm context={service.name} compact />

                {related.length > 0 && (
                  <RevealOnScroll>
                    <div className="bg-[#0A0F1F] rounded-3xl p-6 overflow-hidden relative">
                      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue/15 blur-[60px]" />
                      <div className="relative">
                        <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
                          Related Services
                        </p>
                        <ul className="space-y-2">
                          {related.map((r) => (
                            <li key={r.slug}>
                              <Link
                                to={`/services/${r.slug}`}
                                className="group flex items-center justify-between gap-3 py-3 border-b border-white/10 last:border-0 hover:border-blue/30 transition-colors"
                              >
                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                                  {r.name}
                                </span>
                                <ArrowUpRight
                                  size={14}
                                  className="text-white/40 group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </RevealOnScroll>
                )}

                <RevealOnScroll>
                  <div className="bg-white border border-line rounded-3xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue/8 border border-blue/20 flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-blue" strokeWidth={2.2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-1">
                          Not sure?
                        </p>
                        <h3 className="font-display text-base font-bold text-ink leading-tight">
                          Take a quick eligibility check
                        </h3>
                      </div>
                    </div>
                    <Link
                      to="/eligibility"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue to-deepblue text-white font-semibold text-sm inline-flex items-center justify-center gap-2 group"
                    >
                      Start Eligibility Check
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </RevealOnScroll>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="bg-[#0A0F1F] rounded-3xl p-8 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/20 blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/15 blur-[80px]" />

              <div className="relative">
                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to get started with {service.name}?
                </h3>
                <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
                  Talk to our team for personalised guidance, documents checklist and
                  process timeline.
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton to="/consultation" variant="primary" size="lg">
                    Book a Consultation <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton
                    href={getWhatsAppLink(service.name)}
                    variant="whatsapp"
                    size="lg"
                  >
                    <MessageCircle size={15} /> WhatsApp Us
                  </MagneticButton>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/* ============ QUICK FACT ============ */
function QuickFact({ icon: Icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} className="text-blue" strokeWidth={2.5} />
        <span className="text-[9px] font-bold tracking-[0.15em] text-white/50 uppercase">
          {label}
        </span>
      </div>
      <p className="font-display text-sm font-bold text-white">{value}</p>
    </div>
  );
}

/* ============ ROW ============ */
function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs text-white/50">{label}</span>
      <span className="text-xs font-bold text-blue text-right ml-3">{value}</span>
    </div>
  );
}

/* ============ STAT BLOCK ============ */
function StatBlock({ value, label, sub, highlight }) {
  return (
    <div className="relative pr-6">
      <p
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tabular tracking-tight ${
          highlight ? 'text-blue' : 'text-white'
        }`}
      >
        {value}
      </p>
      <p className="mt-3 text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-xs text-white/40 leading-relaxed">
        {sub}
      </p>
      <span className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-white/10" />
    </div>
  );
}

/* ============ CONTENT BLOCK ============ */
function ContentBlock({ icon: Icon, eyebrow, title, items, tone = 'blue' }) {
  return (
    <div>
      <RevealOnScroll>
        <div className="mb-7">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
            <span className="w-6 h-px bg-blue" />
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
          <RevealOnScroll key={i} delay={i * 0.05}>
            <div className="group flex items-start gap-3 bg-white border border-line rounded-2xl p-4 hover:border-blue/30 hover:shadow-[0_15px_30px_-15px_rgba(23,105,255,0.25)] hover:-translate-y-0.5 transition-all duration-500">
              <CheckCircle2
                size={16}
                className={`mt-0.5 shrink-0 ${
                  tone === 'green' ? 'text-green-600' : 'text-blue'
                }`}
              />
              <span className="text-sm text-graphite leading-relaxed">{item}</span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}