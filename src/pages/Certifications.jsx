import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Award,
  ShieldCheck,
  Building2,
  Globe,
  Leaf,
  FileCheck,
  BadgeCheck,
  Database,
  CheckCircle2,
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SERVICES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

/* ============ CERTIFICATIONS DATA ============ */
const CERT_SLUGS = [
  'iso-certification',
  'zed-certification',
  'nsic-spr',
  'duns-drs-plus',
  'fssai-registration',
  'iec-code',
  'udyam-msme',
  'gem-registration',
];

/* ============ CARD META ============ */
const CARD_META = {
  'iso-certification': { icon: Award, tone: 'blue', tagline: 'Quality Management (ISO 9001/27001)' },
  'zed-certification': { icon: Leaf, tone: 'blue', tagline: 'Zero Defect · Zero Effect (QCI)' },
  'nsic-spr': { icon: FileCheck, tone: 'blue', tagline: 'Single Point Registration (Tendering)' },
  'duns-drs-plus': { icon: Database, tone: 'blue', tagline: 'Global D&B Identity & Credit Rating' },
  'fssai-registration': { icon: ShieldCheck, tone: 'blue', tagline: 'Food Safety Authority License' },
  'iec-code': { icon: Globe, tone: 'blue', tagline: 'Directorate General of Foreign Trade' },
  'udyam-msme': { icon: Building2, tone: 'blue', tagline: 'Statutory MSME Sovereign Identity' },
  'gem-registration': { icon: BadgeCheck, tone: 'blue', tagline: 'Government e-Marketplace Vendor' },
};

/* ============ AUTHENTIC OPERATIONAL METRICS ============ */
const HERO_STATS = [
  { value: '8+', label: 'Accredited Frameworks' },
  { value: '15-30', label: 'Days Avg Turnaround' },
  { value: '100%', label: 'Procedural Compliance' },
  { value: 'Pan-India', label: 'Execution Reach' },
];

/* ============ BENEFITS ============ */
const BENEFITS = [
  { icon: ShieldCheck, title: 'Enhanced Institutional Trust', desc: 'Accredited certifications establish verification and credibility for institutional buyers.' },
  { icon: Globe, title: 'Government & Global Tenders', desc: 'Unlock mandatory tender qualifications across GeM, defense, and international export buyers.' },
  { icon: BadgeCheck, title: 'Statutory Concessions', desc: 'Enjoy bank interest subsidies (up to 0.5%) and fee waivers under ZED and NSIC programs.' },
  { icon: Award, title: 'Quality Assurance', desc: 'Standardize shop-floor processes, minimize defects, and meet ISO 9001 audit standards.' },
];

export default function Certifications() {
  const certifications = SERVICES.filter((s) => CERT_SLUGS.includes(s.slug));

  return (
    <>
      <Helmet>
        <title>Business Certifications & Quality Accreditations — CertWinX</title>
        <meta
          name="description"
          content="Professional assistance for ISO 9001/27001, MSME ZED Certification, NSIC Single Point Registration, DUNS, FSSAI, IEC and GeM registration."
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
                Accredited Statutory & Quality Certifications
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                Accredit your enterprise for tenders, exports & quality.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
                End-to-end documentation, audit coordination, and filing for ISO, MSME ZED, NSIC Single Point Registration, DUNS, FSSAI, IEC, and GeM portals.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Check Certification Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton href={getWhatsAppLink('certifications advisory')} variant="whatsapp" size="lg">
                  WhatsApp Certification Desk
                </MagneticButton>
              </div>
            </RevealOnScroll>

            {/* Metrics */}
            <RevealOnScroll delay={0.4}>
              <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white border border-line shadow-sm">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="font-display text-xl font-bold text-ink tabular">
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

      {/* ============ BENEFITS STRIP ============ */}
      <section className="py-12 bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <RevealOnScroll key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center shrink-0">
                    <b.icon size={18} className="text-blue" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-ink mb-1">
                      {b.title}
                    </p>
                    <p className="text-xs text-graphite leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS DIRECTORY GRID ============ */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Accreditation Portfolio
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                Key Business & Government Certifications
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                Explore statutory compliance and accreditation pathways across quality, manufacturing, and trade.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certifications.map((c, i) => {
              const meta = CARD_META[c.slug] || { icon: Award, tagline: 'Certification' };
              const Icon = meta.icon;
              return (
                <Link
                  key={c.slug}
                  to={`/services/${c.slug}`}
                  className="group block h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(28,131,243,0.18)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-5 group-hover:bg-blue group-hover:text-white transition-colors duration-300">
                      <Icon size={22} className="text-blue group-hover:text-white transition-colors" />
                    </div>

                    <span className="text-[10px] font-bold tracking-wider text-muted uppercase block mb-1">
                      {meta.tagline}
                    </span>

                    <h3 className="font-display text-base font-bold text-ink mb-2 leading-snug group-hover:text-blue transition-colors">
                      {c.name}
                    </h3>

                    <p className="text-xs text-graphite line-clamp-3 leading-relaxed mb-6">
                      {c.short}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-blue">
                    <span>View Filing Checklist</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============ WHY CERTIFICATIONS MATTER (Enterprise Deep Blue) ============ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-deepblue via-[#12316e] to-[#0d224d] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-7">
              <RevealOnScroll>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-[0.2em] text-sky uppercase mb-4">
                  Institutional Value
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-6">
                  Verified credentials unlock tenders and contracts that stay closed otherwise.
                </h2>
                <ul className="space-y-3.5">
                  {[
                    'Government e-Marketplace (GeM) tenders require verified Udyam and NSIC registration',
                    'International supply chain buyers mandate ISO 9001 and verified D&B DUNS numbers',
                    'Manufacturing MSMEs achieve up to 80% certification subsidies and lower bank interest under ZED',
                    'FSSAI manufacturing/state licenses are legally mandatory for commercial food operators',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                      <CheckCircle2 size={16} className="text-sky mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-5">
              <RevealOnScroll delay={0.2}>
                <div className="bg-white/10 border border-white/15 rounded-3xl p-8 backdrop-blur-sm shadow-xl text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={20} className="text-sky" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    Unsure which certifications apply to your enterprise?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-6">
                    Our compliance advisory desk reviews your business activity, turnover, and client requirements to propose an optimal roadmap.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <MagneticButton to="/eligibility" variant="primary" size="md">
                      Assess Eligibility <ArrowUpRight size={14} />
                    </MagneticButton>
                    <MagneticButton href={getWhatsAppLink('certifications enquiry')} variant="outline" size="md">
                      WhatsApp Advisory Desk
                    </MagneticButton>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
