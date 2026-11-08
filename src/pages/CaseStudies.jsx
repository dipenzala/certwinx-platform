import { Helmet } from 'react-helmet-async';
import { FileCheck, ShieldCheck, TrendingUp, Award, ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { getWhatsAppLink } from '../lib/constants';

const CASE_FRAMEWORKS = [
  {
    tag: 'Section 80-IAC & DPIIT',
    title: 'Enterprise SaaS Startup: 3-Year 100% Corporate Tax Holiday Approval',
    sector: 'Cloud Software & B2B SaaS',
    challenge: 'High corporate tax burden on recurring ARR profits with complex cross-border patent disclosures needing presentation before the Inter-Ministerial Board.',
    solution: 'Structured a 45-page technical novelty dossier, filed patent-pending defense documentation, and prepared executive walkthroughs addressing IMB scrutiny benchmarks.',
    outcome: 'Successful gazette certification under Section 80-IAC, enabling 100% operational tax exemption across 3 fiscal years.',
  },
  {
    tag: 'Startup Seed Fund (SISFS)',
    title: 'CleanTech IoT Hardware: ₹20 Lakhs Prototype Grant & Incubator Induction',
    sector: 'Smart Energy & IoT Hardware',
    challenge: 'Early-stage pre-revenue hardware venture requiring non-dilutive capital for laboratory fabrication, sensor trials, and pilot field deployments.',
    solution: 'Aligned component Bill of Materials (BOM), structured incubator pitch narrative, and prepared candidate for ISMC committee due diligence.',
    outcome: 'Secured admission into Tier-1 DST-backed incubator and ₹20 Lakhs non-dilutive prototype grant tranche.',
  },
  {
    tag: 'MSME ZED & CGTMSE',
    title: 'Precision Auto Components: MSME ZED Gold Certification & ₹3 Crore Debt Facility',
    sector: 'Automotive Engineering & Precision Manufacturing',
    challenge: 'Tier-2 automotive supplier required lower borrowing costs and mandatory ESG credentials to qualify for global OEM export procurement.',
    solution: 'Implemented shop-floor 5S and waste reduction protocols to achieve MSME ZED Gold tier, and structured a comprehensive Detailed Project Report (DPR).',
    outcome: 'Obtained 0.50% interest concession on commercial bank borrowings and collateral-free loan sanction under CGTMSE.',
  },
];

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>Advisory Case Studies & Execution Frameworks — CertWinX</title>
        <meta
          name="description"
          content="Explore anonymized regulatory advisory case frameworks across Section 80-IAC tax exemptions, Startup India Seed Fund, and MSME ZED accreditations."
        />
      </Helmet>

      <section className="pt-36 lg:pt-44 pb-14 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Advisory Engagements"
            title="Verified execution frameworks & case studies."
            subtitle="Transparent case outlines showing how regulatory intelligence and documentation structuring unlock tangible sovereign benefits."
            align="center"
          />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {CASE_FRAMEWORKS.map((c, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <div className="h-full bg-white border border-line rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:border-blue/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold uppercase tracking-wider">
                        {c.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-muted">
                        {c.sector}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-ink mb-4 leading-snug">
                      {c.title}
                    </h3>

                    <div className="space-y-3 mb-6 text-xs text-graphite">
                      <div className="p-3 bg-canvas rounded-xl border border-line/60">
                        <strong className="text-ink font-semibold block mb-0.5">Operational Challenge:</strong>
                        {c.challenge}
                      </div>
                      <div className="p-3 bg-canvas rounded-xl border border-line/60">
                        <strong className="text-blue font-semibold block mb-0.5">Advisory Execution:</strong>
                        {c.solution}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex items-start gap-2.5 text-xs text-emerald-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
                    <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
                    <div>
                      <strong className="block font-semibold">Verified Outcome:</strong>
                      {c.outcome}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Consultation CTA */}
          <div className="bg-gradient-to-br from-deepblue to-[#0e275c] text-white rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto shadow-md">
            <h3 className="font-display text-2xl font-bold mb-3">
              Explore your venture's statutory roadmap with our team.
            </h3>
            <p className="text-sm text-white/80 max-w-lg mx-auto mb-8">
              Every business engagement starts with a confidential regulatory diagnostic. No fabricated outcomes, strict procedural guidance.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <MagneticButton to="/eligibility" variant="primary">
                Run Diagnostic <ArrowUpRight size={14} />
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink('case studies discussion')} variant="outline">
                WhatsApp Advisory Desk
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
