import { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Building2,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  PieChart,
  Percent,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../motion/RevealOnScroll';
import MagneticButton from '../motion/MagneticButton';
import { getWhatsAppLink } from '../../lib/constants';

const PILLARS = [
  {
    id: 'grants',
    name: 'Non-Dilutive Grants',
    category: 'Proof of Concept & Validation',
    dilution: '0% Equity Dilution',
    collateral: 'Zero Collateral Required',
    quantum: '₹10 Lakhs — ₹50 Lakhs',
    flagship: 'DST NIDHI PRAYAS & BIRAC Innovation Grants',
    desc: 'Government capital awarded directly to verified founders for prototype development, product trials, and market validation without giving away equity or taking on debt.',
    icon: Award,
    tone: 'blue',
    schemes: [
      { name: 'NIDHI PRAYAS (DST)', grant: 'Up to ₹10L Prototype Grant', slug: 'nidhi-prayas' },
      { name: 'MeitY TIDE 2.0 Tech Grant', grant: 'Up to ₹7L–₹30L Grant', slug: 'tide-2' },
      { name: 'BIRAC BIG (Biotech)', grant: 'Up to ₹50L Non-dilutive Grant', slug: 'birac-big' },
    ],
  },
  {
    id: 'guarantees',
    name: 'Credit Guarantees',
    category: 'Collateral-Free Debt',
    dilution: '0% Equity Dilution',
    collateral: 'Sovereign Guarantee Backing',
    quantum: 'Up to ₹10 Crore',
    flagship: 'Credit Guarantee Scheme for Startups (CGSS)',
    desc: 'Central government guarantees scheduled commercial banks and NBFCs against default, enabling DPIIT-recognised startups to secure large-scale debt without pledging personal collateral.',
    icon: ShieldCheck,
    tone: 'emerald',
    schemes: [
      { name: 'Credit Guarantee Scheme for Startups (CGSS)', grant: 'Up to ₹10 Cr Collateral-Free', slug: 'cgss' },
      { name: 'CGTMSE (MSME Credit Facility)', grant: 'Up to ₹5 Cr Guarantee Cover', slug: 'cgtmse' },
    ],
  },
  {
    id: 'subsidies',
    name: 'Capital & Margin Subsidies',
    category: 'Capex & Project Subsidies',
    dilution: '0% Equity Dilution',
    collateral: 'Project-Linked Asset Security',
    quantum: '15% — 35% Margin Subsidy',
    flagship: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    desc: 'Direct reimbursement and financial subsidies credited toward project plant, machinery, industrial premises, or certification expenditures.',
    icon: TrendingUp,
    tone: 'indigo',
    schemes: [
      { name: 'PMEGP Capital Subsidy', grant: 'Up to 35% Govt Margin Money', slug: 'pmegp' },
      { name: 'MSME ZED Certification Subsidy', grant: 'Up to 80% Subsidy on Audit Fees', slug: 'msme-zed' },
    ],
  },
  {
    id: 'tax',
    name: 'Tax Holidays & Fiscal Relief',
    category: 'Statutory Profit Exemption',
    dilution: '0% Equity Dilution',
    collateral: 'Statutory IMB Order',
    quantum: '100% Tax Exemption for 3 Yrs',
    flagship: 'Section 80-IAC (Income Tax Act)',
    desc: 'Statutory 100% exemption from corporate income tax for three consecutive assessment years out of ten, creating substantial non-dilutive liquidity to fuel scaling.',
    icon: Percent,
    tone: 'blue',
    schemes: [
      { name: 'Section 80-IAC Exemption', grant: '3-Year 100% Tax Relief', slug: 'section-80-iac' },
      { name: 'Angel Tax Exemption (Sec 56(2))', grant: 'Full Relief on Premium Share Capital', slug: 'startup-india-recognition' },
    ],
  },
  {
    id: 'loans',
    name: 'Institutional Term Loans',
    category: 'Concessionary Bank Debt',
    dilution: '0% Equity Dilution',
    collateral: 'Nil up to ₹20L under MUDRA',
    quantum: '₹50,000 — ₹20 Lakhs',
    flagship: 'Pradhan Mantri MUDRA Yojana (Tarun / Plus)',
    desc: 'Low-interest institutional debt backed by nationalized commercial banks and SIDBI for working capital, equipment acquisition, and business expansion.',
    icon: Landmark,
    tone: 'slate',
    schemes: [
      { name: 'MUDRA Yojana (Tarun Plus)', grant: 'Up to ₹20 Lakhs Term Loan', slug: 'mudra-yojana' },
      { name: 'Stand-Up India Scheme', grant: '₹10L to ₹1 Cr for SC/ST/Women', slug: 'stand-up-india' },
    ],
  },
  {
    id: 'incubation',
    name: 'Incubation & Lab Support',
    category: 'Physical Infrastructure & Seed',
    dilution: '0% — 3% Incubation Equity',
    collateral: 'Zero Collateral Required',
    quantum: 'Shared Labs, Cloud & Seed',
    flagship: 'Atal Incubation Mission (AIM) & DST TBIs',
    desc: 'Access to government-funded Technology Business Incubators (TBIs), wet labs, rapid prototyping facilities, cloud credits, and mentor networks across premier institutions.',
    icon: Building2,
    tone: 'teal',
    schemes: [
      { name: 'Atal Incubation Centers (AIM)', grant: 'Coworking, Mentorship & Grants', slug: 'startup-india-seed-fund' },
      { name: 'MeitY TIDE 2.0 Incubation', grant: 'Tech Seed Support up to ₹7L', slug: 'meity-tide-2' },
    ],
  },
];

export default function FundingEcosystem() {
  const [selectedPillarId, setSelectedPillarId] = useState('grants');
  const currentPillar = PILLARS.find((p) => p.id === selectedPillarId) || PILLARS[0];

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-line overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-3">
              <Sparkles size={11} className="text-blue" />
              Comprehensive Capital Architecture
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              India's Sovereign Funding Ecosystem, Visualized
            </h2>
            <p className="text-xs sm:text-sm text-graphite mt-3 leading-relaxed">
              Government capital is structured across distinct instruments. Understanding the difference between grants, collateral-free credit guarantees, capital subsidies, and statutory tax holidays is crucial for optimal capital efficiency.
            </p>
          </div>
        </RevealOnScroll>

        {/* The 6 Instrument Cards (Selector Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {PILLARS.map((p) => {
            const isSelected = p.id === selectedPillarId;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillarId(p.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue text-white border-blue shadow-md scale-102'
                    : 'bg-canvas text-ink border-line hover:border-blue/40 hover:bg-blue-soft/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-soft text-blue'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                  </div>
                  <h3 className="font-display text-xs sm:text-sm font-bold leading-tight mb-1">
                    {p.name}
                  </h3>
                  <p
                    className={`text-[10px] font-medium leading-tight ${
                      isSelected ? 'text-sky' : 'text-muted'
                    }`}
                  >
                    {p.category}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-current/20">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-white' : 'text-blue'
                    }`}
                  >
                    {p.quantum}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Instrument Intelligence Card */}
        <div className="bg-canvas border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Overview */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-blue uppercase tracking-wider bg-blue-soft px-3 py-1 rounded-full border border-blue/20">
                  {currentPillar.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {currentPillar.dilution}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
                {currentPillar.name}
              </h3>

              <p className="text-xs sm:text-sm text-graphite leading-relaxed mb-6">
                {currentPillar.desc}
              </p>

              {/* Key Parameters */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-white border border-line rounded-xl p-3.5 shadow-xs">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Capital Quantum</span>
                  <p className="text-xs sm:text-sm font-bold text-ink mt-0.5">{currentPillar.quantum}</p>
                </div>
                <div className="bg-white border border-line rounded-xl p-3.5 shadow-xs">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Collateral Requirement</span>
                  <p className="text-xs sm:text-sm font-bold text-ink mt-0.5">{currentPillar.collateral}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="md">
                  Check Eligibility for {currentPillar.name} <ArrowUpRight size={14} />
                </MagneticButton>
                <MagneticButton href={getWhatsAppLink(currentPillar.name)} variant="outline" size="md">
                  Discuss with Funding Advisor
                </MagneticButton>
              </div>
            </div>

            {/* Right Mapped Schemes List */}
            <div className="lg:col-span-5 bg-white border border-line rounded-2xl p-5 shadow-xs">
              <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Mapped Active Schemes</span>
                <span className="text-[11px] font-semibold text-blue">{currentPillar.schemes.length} Programs</span>
              </h4>

              <div className="space-y-3">
                {currentPillar.schemes.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/schemes/${s.slug}`}
                    className="group block p-3.5 rounded-xl bg-canvas border border-line/80 hover:border-blue/40 hover:bg-blue-soft/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-ink group-hover:text-blue transition-colors">
                        {s.name}
                      </span>
                      <ArrowUpRight size={14} className="text-muted group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </div>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-deepblue">
                      {s.grant}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 text-center">
                <Link to="/schemes" className="text-xs font-bold text-blue hover:underline">
                  Browse All 18+ Central & State Schemes →
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
