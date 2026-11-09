import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, BookOpen, Clock, X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { getWhatsAppLink } from '../lib/constants';

const ARTICLES = [
  {
    slug: 'dpiit-recognition-guide',
    title: 'Comprehensive Guide to DPIIT Recognition for Startups',
    category: 'Startup',
    read: '6 min read',
    excerpt: 'Detailed breakdown of the statutory eligibility criteria, required documentation, and step-by-step filing on the National Single Window System.',
    content: `
DPIIT (Department for Promotion of Industry and Internal Trade) recognition is the foundational sovereign credential for Indian startups. Established under the Startup India action plan, it officially certifies an entity as an innovative startup in India.

### Statutory Eligibility Benchmarks
1. **Entity Structure:** Must be incorporated as a Private Limited Company, Limited Liability Partnership (LLP), or Registered Partnership Firm. Sole proprietorships and unregistered entities cannot apply.
2. **Entity Age:** The entity must not have exceeded 10 years from the exact date of incorporation.
3. **Turnover Cap:** Turnover must not have exceeded ₹200 Crore in any financial year since incorporation.
4. **Innovation Focus:** The entity must be working towards innovation, development or improvement of products or processes or services, or have a scalable business model with high potential of employment generation or wealth creation.
5. **Fresh Entity:** The entity must not be formed by splitting up or reconstruction of an existing business.

### Key Benefits Unlocked
- **Self-Certification:** Self-certification compliance under 3 environmental and 6 labour laws for 3 to 5 years.
- **Section 80-IAC Eligibility:** Prerequisite to apply for the 3-year 100% income tax exemption.
- **Angel Tax Protection:** Exemption under Section 56(2)(viib) on share premium investments.
- **Government Tendering:** Relaxations on prior experience, turnover criteria, and EMD exemption on the GeM portal.
- **IPR Subsidies:** Fast-tracked patent examination and up to 80% rebate on government patent fees.
    `,
  },
  {
    slug: 'section-80-iac-overview',
    title: 'Section 80-IAC Tax Exemption: Complete Framework & IMB Process',
    category: 'Tax Incentives',
    read: '8 min read',
    excerpt: 'How eligible startups can claim a 100% tax deduction on corporate profits for 3 consecutive years under the Inter-Ministerial Board.',
    content: `
Section 80-IAC of the Income Tax Act, 1961 provides a 100% tax holiday to eligible startups for three consecutive assessment years out of their first ten years of incorporation.

### Statutory Prerequisites
1. **DPIIT Recognition:** Must hold an active Certificate of Recognition from DPIIT.
2. **Corporate Structure:** Private Limited Company or LLP only.
3. **Incorporation Date:** Incorporated on or after April 1, 2016.
4. **Turnover Ceiling:** Turnover must not have exceeded ₹200 Crore in any previous financial year.

### The Inter-Ministerial Board (IMB) Evaluation
Securing Section 80-IAC is one of the most rigorous regulatory approvals in India, with an approval rate historically under 3%. The Inter-Ministerial Board, comprising representatives from DPIIT, DST, and DBT, evaluates:
- Technological novelty and proprietary IP.
- Demonstration of high barriers to entry / moat.
- Potential for scalable domestic and international economic impact.
- Supporting patents filed, published research, or customer validation.
    `,
  },
  {
    slug: 'udyam-registration-benefits',
    title: 'Udyam Registration: Unlocking Banking & Statutory MSME Benefits',
    category: 'MSME',
    read: '5 min read',
    excerpt: 'Why every micro, small, and medium enterprise must register on Udyam to access priority sector lending, collateral-free loans, and subsidies.',
    content: `
Udyam Registration is the government's official statutory identity for Micro, Small, and Medium Enterprises in India under the MSMED Act, 2006.

### Composite Classification Criteria
- **Micro Enterprise:** Investment in Plant & Machinery < ₹1 Crore AND Turnover < ₹5 Crore.
- **Small Enterprise:** Investment < ₹10 Crore AND Turnover < ₹50 Crore.
- **Medium Enterprise:** Investment < ₹50 Crore AND Turnover < ₹250 Crore.

### Core Statutory Advantages
1. **Priority Sector Lending (PSL):** Mandated lower interest rates and prioritized credit allocation from commercial banks.
2. **CGTMSE Cover:** Eligibility for collateral-free credit facilities up to ₹5 Crore.
3. **Delayed Payment Protection:** Statutory protection under MSMED Act Section 15-18 requiring buyers to pay compound interest at 3x bank rate for delays past 45 days.
4. **Subsidized Certifications:** Up to 80% subsidy on ZED and ISO quality certifications.
    `,
  },
  {
    slug: 'iso-certification-basics',
    title: 'ISO 9001 & ISO 27001 Certification: Standards & Tendering Impact',
    category: 'Certification',
    read: '6 min read',
    excerpt: 'A practical roadmap for Indian businesses to implement Quality and Information Security Management Systems.',
    content: `
International Organization for Standardization (ISO) accreditations are vital commercial credentials for businesses seeking government tenders, corporate enterprise accounts, and global export contracts.

### Essential Standards for Growing Enterprises
- **ISO 9001:2015 (Quality Management System):** Validates organizational consistency in product and service delivery, customer satisfaction, and continuous process improvement.
- **ISO 27001:2022 (Information Security Management):** Crucial for SaaS, FinTech, and IT service providers managing client data, cloud architecture, and confidential intellectual assets.
- **ISO 14001:2015 (Environmental Management):** Required for industrial manufacturing and sustainable procurement bids.

### Implementation Lifecycle
1. Gap analysis against current operational workflows.
2. Drafting mandatory policy manuals, SOPs, and risk registries.
3. Conducting internal audits and corrective actions.
4. Stage 1 & Stage 2 certification audits by an accredited registrar (NABCB/IAF).
    `,
  },
  {
    slug: 'government-scheme-discovery',
    title: 'Strategic Approaches to Government Scheme Discovery & Grants',
    category: 'Government Schemes',
    read: '7 min read',
    excerpt: 'How early-stage founders can systematically identify and apply for non-dilutive sovereign funding like NIDHI, BIRAC, and CGSS.',
    content: `
Navigating central and state funding schemes in India requires structured research, rigorous compliance alignment, and meticulous timing.

### Multi-Tier Scheme Landscape
1. **Prototype & Tech Grants:** DST NIDHI-PRAYAS (up to ₹10 Lakhs for hardware prototypes) and BIRAC BIG (up to ₹50 Lakhs for biotech/healthtech).
2. **Growth Debt Facilities:** Credit Guarantee Scheme for Startups (CGSS) enabling up to ₹10 Crore collateral-free debt from commercial lenders.
3. **State Innovation Policies:** Programs like the Gujarat Student Startup & Innovation Policy (SSIP) and i-Hub offering up to ₹30 Lakhs project grants and monthly sustenance allowances.
    `,
  },
  {
    slug: 'business-compliance-calendar',
    title: 'Annual Business Compliance Calendar for Indian Startups & LLPs',
    category: 'Compliance',
    read: '6 min read',
    excerpt: 'Essential statutory milestones for MCA, ROC, GST, Income Tax, and TDS filings to avoid disqualifications and hefty late penalties.',
    content: `
Maintaining flawless statutory compliance is essential for preserving good standing with regulators, angel investors, and venture capital funds during due diligence.

### Key Statutory Deadlines for Private Limited Companies
- **AOC-4 (Financial Statements):** Within 30 days of Annual General Meeting (typically by October 30).
- **MGT-7/7A (Annual Return):** Within 60 days of AGM (typically by November 29).
- **DIR-3 KYC:** Mandatory annual Director KYC filing by September 30.
- **DPT-3 (Return of Deposits):** Annual return of deposits and loan disclosure by June 30.
- **Income Tax Returns (ITR-6):** Corporate tax return filing by October 31 (for audit cases).
    `,
  },
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <>
      <Helmet>
        <title>Advisory Knowledge Hub & Regulatory Guides — CertWinX</title>
        <meta
          name="description"
          content="In-depth regulatory intelligence, government scheme guides, DPIIT frameworks, Section 80-IAC walkthroughs, and business compliance insights."
        />
      </Helmet>

      {/* Header */}
      <section className="pt-36 lg:pt-44 pb-14 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Knowledge & Intelligence Hub"
            title="Regulatory guides & compliance insights."
            subtitle="Verified, gazette-aligned intelligence on government schemes, startup recognitions, tax holidays, and statutory procedures."
            align="center"
          />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <RevealOnScroll key={a.slug} delay={i * 0.04}>
                <article
                  onClick={() => setSelectedArticle(a)}
                  className="group h-full bg-white border border-line rounded-3xl overflow-hidden hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Card Banner (Clean Blue/Sky gradient, zero gold) */}
                  <div className="h-40 bg-gradient-to-br from-blue/15 via-sky/30 to-deepblue/10 p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 border border-line text-[10px] font-bold text-blue uppercase tracking-wider">
                        {a.category}
                      </span>
                      <span className="text-[10px] font-semibold text-graphite flex items-center gap-1">
                        <Clock size={11} /> {a.read}
                      </span>
                    </div>
                    <BookOpen size={28} className="text-blue/30 self-end" />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-ink mb-2 leading-snug group-hover:text-blue transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-xs text-graphite leading-relaxed line-clamp-3 mb-6">
                        {a.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-blue">
                      <span>Read Intelligence Guide</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-3xl border border-line max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-line flex items-center justify-between bg-canvas/40">
              <div>
                <span className="text-[10px] font-bold text-blue tracking-wider uppercase mb-1 block">
                  {selectedArticle.category} · {selectedArticle.read}
                </span>
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-canvas border border-line flex items-center justify-center text-graphite hover:text-ink hover:bg-line transition-colors shrink-0 ml-4"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-graphite leading-relaxed">
              {selectedArticle.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={i} className="font-display text-base font-bold text-ink pt-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-line bg-canvas/40 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted">
                Need bespoke guidance on this framework?
              </span>
              <div className="flex gap-2">
                <MagneticButton to="/eligibility" variant="primary" size="sm">
                  Check Eligibility <ArrowRight size={13} />
                </MagneticButton>
                <MagneticButton
                  href={getWhatsAppLink(selectedArticle.title)}
                  variant="whatsapp"
                  size="sm"
                >
                  WhatsApp Us
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
