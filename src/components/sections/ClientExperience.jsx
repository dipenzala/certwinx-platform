import {
  ShieldCheck,
  Clock,
  Lock,
  Headphones,
  CheckCircle2,
  FileText,
  Building,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import RevealOnScroll from '../motion/RevealOnScroll';
import MagneticButton from '../motion/MagneticButton';
import { getWhatsAppLink } from '../../lib/constants';

/* 4 Core Service Commitments */
const COMMITMENTS = [
  {
    icon: FileText,
    title: 'Gazette-Aligned Dossier Structuring',
    desc: 'Every application dossier is authored strictly according to gazetted ministry guidelines, eliminating procedural rejections.',
  },
  {
    icon: Clock,
    title: 'Weekly Status & Direct Desk Access',
    desc: 'Structured weekly progress updates and dedicated WhatsApp advisory desk with direct access to senior consultants.',
  },
  {
    icon: Lock,
    title: 'Enterprise Data Confidentiality',
    desc: 'All cap tables, audited statements, proprietary algorithms, and patent filings are safeguarded under strict NDAs.',
  },
  {
    icon: ShieldCheck,
    title: 'Post-Sanction Execution Continuity',
    desc: 'Ongoing guidance to claim 100% tax benefits on Form 10-CCB, maintain annual ROC filings, and onboard onto GeM.',
  },
];

/* Verified Execution Case Frameworks (Genuine advisory blueprints) */
const CASE_FRAMEWORKS = [
  {
    sector: 'Agritech & Cold-Chain IoT',
    location: 'Ahmedabad, Gujarat',
    badge: 'Gujarat Startup Policy + DPIIT',
    title: 'Securing State Capital Subsidy & DPIIT Recognition',
    challenge: 'Early-stage hardware IoT startup needed state sustenance allowance and manufacturing capital support without equity dilution.',
    solution: 'CertWinX prepared the DPIIT innovation memorandum, audited asset valuation, and submitted under Gujarat State Scheme.',
    result: 'DPIIT recognized within 18 days; ₹15L capital subsidy and founder sustenance allowance unlocked.',
    timeframe: '85 Days Total Execution',
  },
  {
    sector: 'DeepTech & AI Vision',
    location: 'Bengaluru, Karnataka',
    badge: 'Section 80-IAC + CGSS',
    title: 'IMB Presentation Dossier for 100% Tax Exemption',
    challenge: 'AI-driven logistics enterprise required formal IMB scalability pitch and credit guarantee structuring.',
    solution: 'Drafted 32-page scalability memorandum, chartered accountant IP valuation, and represented query rejoinders before the IMB.',
    result: 'IMB approval gazetted for Section 80-IAC (3-year 100% tax relief) and ₹5 Crore collateral-free debt sanction under CGSS.',
    timeframe: '120 Days Total Execution',
  },
  {
    sector: 'MedTech Diagnostics',
    location: 'Hyderabad, Telangana',
    badge: 'BIRAC BIG + T-Hub Incubation',
    title: 'Non-Dilutive Biotech Grant Structuring',
    challenge: 'Clinical stage diagnostic startup required high-quantum validation capital for multi-center trials.',
    solution: 'Structured BIRAC Biotechnology Ignition Grant (BIG) proposal, technical milestones, and bio-incubator partner tie-up.',
    result: '₹50 Lakhs non-dilutive grant sanctioned with zero equity dilution and subsidized wet lab access.',
    timeframe: '110 Days Total Execution',
  },
];

export default function ClientExperience() {
  return (
    <section className="relative py-20 lg:py-28 bg-canvas border-b border-line overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Advisory Standards & Execution"
          title="The CertWinX Client Service Experience"
          subtitle="No opaque processes, no false promises. An institutional advisory workflow built on predictable milestones, verified documentation, and direct expert access."
          align="center"
        />

        {/* 4 Core Service Commitments */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <RevealOnScroll key={c.title} delay={i * 0.05}>
                <div className="h-full bg-white border border-line rounded-2xl p-6 shadow-xs hover:border-blue/30 hover:shadow-card transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-soft text-blue flex items-center justify-center mb-4">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-sm font-bold text-ink mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 size={13} />
                    <span>Guaranteed Standard</span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Execution Frameworks Case Studies */}
        <RevealOnScroll delay={0.2}>
          <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-line mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue uppercase">
                  Verified Execution Frameworks
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                  How We Structure Successful Government Applications
                </h3>
              </div>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue hover:text-deepblue transition-colors"
              >
                <span>Read Full Execution Archives</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CASE_FRAMEWORKS.map((cs) => (
                <div
                  key={cs.title}
                  className="bg-canvas border border-line rounded-2xl p-6 flex flex-col justify-between hover:border-blue/30 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue bg-blue-soft px-2.5 py-0.5 rounded-full border border-blue/20">
                        {cs.sector}
                      </span>
                      <span className="text-[10px] text-muted font-medium">
                        {cs.location}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-ink mb-2 leading-snug">
                      {cs.title}
                    </h4>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">The Challenge</span>
                        <p className="text-xs text-graphite leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">Advisory Intervention</span>
                        <p className="text-xs text-graphite leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line">
                    <div className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 mb-3">
                      <TrendingUp size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-emerald-900 leading-snug">
                        {cs.result}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-medium text-muted">
                      <span>Execution Window</span>
                      <span className="font-bold text-ink">{cs.timeframe}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Assurance Action */}
            <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-graphite">
                *All advisory cases are structured to ensure absolute compliance with official gazette rules. Client identities anonymized under NDAs.
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <MagneticButton to="/consultation" variant="primary" size="sm">
                  Schedule Initial Consultation <ArrowUpRight size={14} />
                </MagneticButton>
                <MagneticButton href={getWhatsAppLink('advisory standards')} variant="outline" size="sm">
                  WhatsApp Advisory
                </MagneticButton>
              </div>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
