import { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  Filter,
  ExternalLink,
  Coins,
  Percent,
  Landmark,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../motion/RevealOnScroll';
import MagneticButton from '../motion/MagneticButton';
import { getWhatsAppLink } from '../../lib/constants';

const SCHEMES_COMPARE = [
  {
    id: 'sisfs',
    name: 'Startup India Seed Fund (SISFS)',
    type: 'Non-Dilutive Grant / Soft Debt',
    typeCategory: 'Grant',
    quantum: 'Up to ₹20L Grant / ₹50L Debt',
    dilution: '0% Equity Dilution',
    collateral: 'Zero Collateral Required',
    eligibleStage: 'Proof of Concept, Prototyping & Early Trials',
    entityRequirement: 'DPIIT Recognised Pvt Ltd / LLP (< 2 Yrs Old)',
    ministry: 'DPIIT, Ministry of Commerce & Industry',
    timeline: '60–120 Days via Empanelled Incubators',
    officialUrl: 'https://seedfund.startupindia.gov.in',
    slug: 'startup-india-seed-fund',
  },
  {
    id: 'cgss',
    name: 'Credit Guarantee Scheme (CGSS)',
    type: 'Collateral-Free Sovereign Credit',
    typeCategory: 'Debt',
    quantum: 'Up to ₹10 Crore Facility',
    dilution: '0% Equity Dilution',
    collateral: 'Sovereign Guarantee Cover (NCGTC)',
    eligibleStage: 'Early Traction, Growth & Working Capital Scale',
    entityRequirement: 'DPIIT Recognised Startup with Revenue/Traction',
    ministry: 'Department for Promotion of Industry and Internal Trade',
    timeline: '30–90 Days via Member Scheduled Commercial Banks',
    officialUrl: 'https://www.startupindia.gov.in',
    slug: 'cgss',
  },
  {
    id: '80iac',
    name: 'Section 80-IAC Tax Exemption',
    type: 'Statutory Profit Tax Holiday',
    typeCategory: 'Tax',
    quantum: '100% Tax Relief for 3 Consecutive Years',
    dilution: '0% Equity Dilution',
    collateral: 'Statutory CBDT / IMB Sanction Order',
    eligibleStage: 'Profitable or High-Growth Scalable Ventures',
    entityRequirement: 'DPIIT Recognized Pvt Ltd / LLP (Inc: 2016–2026)',
    ministry: 'Inter-Ministerial Board (IMB) & CBDT',
    timeline: '90–180 Days (subject to IMB board calendar)',
    officialUrl: 'https://www.startupindia.gov.in',
    slug: 'section-80-iac',
  },
  {
    id: 'pmegp',
    name: 'PMEGP MSME Scheme',
    type: 'Government Margin Money Subsidy',
    typeCategory: 'Subsidy',
    quantum: '15%–35% Project Subsidy (Up to ₹50L project)',
    dilution: '0% Equity Dilution',
    collateral: 'Project-Linked Asset Security',
    eligibleStage: 'New Enterprise Setup (Manufacturing & Service)',
    entityRequirement: 'Individuals, Proprietorship, Self-Help Groups, MSME',
    ministry: 'KVIC, Ministry of MSME',
    timeline: '45–90 Days via Empanelled Public Banks',
    officialUrl: 'https://www.kviconline.gov.in/pmegp',
    slug: 'pmegp',
  },
  {
    id: 'zed',
    name: 'MSME ZED Certification Scheme',
    type: 'Quality Assessment & Fee Subsidy',
    typeCategory: 'Subsidy',
    quantum: 'Up to 80% Govt Subsidy on Certification Fees',
    dilution: '0% Equity Dilution',
    collateral: 'Zero Collateral Required',
    eligibleStage: 'Operational MSME Manufacturing Facilities',
    entityRequirement: 'Active Udyam Registration (Manufacturing)',
    ministry: 'Ministry of Micro, Small & Medium Enterprises',
    timeline: '15–30 Days (Self-assessment & QCI audit)',
    officialUrl: 'https://zed.msme.gov.in',
    slug: 'msme-zed',
  },
  {
    id: 'mudra',
    name: 'MUDRA Yojana (Tarun Plus)',
    type: 'Institutional Term Loan / Working Capital',
    typeCategory: 'Debt',
    quantum: 'Up to ₹20 Lakhs Concessionary Loan',
    dilution: '0% Equity Dilution',
    collateral: 'Nil Collateral up to statutory limits',
    eligibleStage: 'Operational Small Business & Enterprise Scale',
    entityRequirement: 'Non-Corporate, Non-Farm Small/Micro Enterprises',
    ministry: 'Department of Financial Services, Ministry of Finance',
    timeline: '15–45 Days through Public & Private Sector Banks',
    officialUrl: 'https://www.mudra.org.in',
    slug: 'mudra-yojana',
  },
];

export default function SchemeComparisonTable() {
  const [filterType, setFilterType] = useState('All');

  const filteredSchemes = SCHEMES_COMPARE.filter((s) => {
    if (filterType === 'All') return true;
    return s.typeCategory === filterType;
  });

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-line overflow-hidden" id="scheme-comparison-table">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-3">
              <Sparkles size={11} className="text-blue" />
              Side-by-Side Scheme Intelligence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              Compare India’s Flagship Sovereign Programs
            </h2>
            <p className="text-xs sm:text-sm text-graphite mt-3 leading-relaxed">
              Evaluate funding instruments, dilution terms, collateral requirements, and turnaround times side-by-side to determine the optimal capital pathway for your venture.
            </p>
          </div>
        </RevealOnScroll>

        {/* Filter Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1 rounded-full bg-canvas border border-line">
            {['All', 'Grant', 'Debt', 'Tax', 'Subsidy'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterType === type
                    ? 'bg-blue text-white shadow-xs'
                    : 'text-graphite hover:text-ink'
                }`}
              >
                {type === 'All' ? 'All Schemes (6)' : `${type} Programs`}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Comparison Table Container */}
        <div className="bg-canvas border border-line rounded-3xl p-4 sm:p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="border-b border-line bg-white">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted w-[220px]">
                  Scheme & Ministry
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted w-[160px]">
                  Capital Quantum
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted w-[150px]">
                  Equity / Collateral
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted w-[200px]">
                  Eligible Venture Stage
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted w-[150px]">
                  Turnaround Cycle
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted text-right w-[140px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {filteredSchemes.map((s) => (
                <tr key={s.id} className="hover:bg-white/80 transition-colors">
                  {/* Name & Ministry */}
                  <td className="p-4">
                    <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                      {s.type}
                    </span>
                    <Link
                      to={`/schemes/${s.slug}`}
                      className="font-display text-sm font-bold text-ink hover:text-blue transition-colors leading-snug block"
                    >
                      {s.name}
                    </Link>
                    <span className="text-[11px] text-muted block mt-1">
                      {s.ministry}
                    </span>
                  </td>

                  {/* Quantum */}
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-blue-soft border border-blue/20 text-xs font-bold text-deepblue">
                      {s.quantum}
                    </span>
                  </td>

                  {/* Dilution & Collateral */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={13} className="shrink-0" />
                        <span>{s.dilution}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-graphite">
                        <ShieldCheck size={13} className="text-blue shrink-0" />
                        <span>{s.collateral}</span>
                      </div>
                    </div>
                  </td>

                  {/* Stage & Prerequisites */}
                  <td className="p-4">
                    <p className="text-xs font-semibold text-ink leading-snug">
                      {s.eligibleStage}
                    </p>
                    <span className="text-[11px] text-muted block mt-1">
                      {s.entityRequirement}
                    </span>
                  </td>

                  {/* Timeline */}
                  <td className="p-4">
                    <span className="text-xs text-graphite font-medium">
                      {s.timeline}
                    </span>
                  </td>

                  {/* Action Link */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/schemes/${s.slug}`}
                        className="p-2 rounded-xl bg-white border border-line text-blue hover:bg-blue hover:text-white transition-colors"
                        title="Read Complete Scheme Dossier"
                      >
                        <ArrowUpRight size={14} />
                      </Link>
                      <a
                        href={s.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-canvas border border-line text-muted hover:text-ink transition-colors"
                        title="Official Ministry Portal"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Guarantee Note & Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-graphite">
          <p>
            *Statutory Note: Sanction of grants, loans, and tax exemptions is governed strictly by official ministry guidelines and subject to evaluation committee decisions. CertWinX provides documentation structuring and advisory assistance.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton to="/eligibility" variant="primary" size="sm">
              Assess Venture Eligibility <ArrowUpRight size={14} />
            </MagneticButton>
            <MagneticButton href={getWhatsAppLink('scheme comparison')} variant="outline" size="sm">
              WhatsApp Desk
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
