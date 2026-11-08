import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Wrench,
  Scale,
  Award,
  Coins,
  FileText,
  Calendar,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  Calculator,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { getWhatsAppLink } from '../lib/constants';
import { SERVICES } from '../data/services';

/* ============================================================
   TOOL 1: BUSINESS STRUCTURE COMPARISON DATA
   ============================================================ */
const STRUCTURES = [
  {
    name: 'Private Limited',
    liability: 'Limited to unpaid share capital',
    minMembers: '2 Directors / 2 Shareholders',
    investorSuitability: 'Highest (Preferred by Angels & VCs)',
    taxRate: '22% + cess (new manufacturing 15%)',
    statutoryAudit: 'Mandatory for all turnover levels',
    annualROCCompliance: 'High (AOC-4, MGT-7, ADT-1, Board Meetings)',
    bestFor: 'Startups planning to raise equity capital and scale nationally',
  },
  {
    name: 'LLP',
    liability: 'Limited to agreed contribution',
    minMembers: '2 Designated Partners',
    investorSuitability: 'Moderate (Cannot issue equity shares or ESOPs)',
    taxRate: '30% + cess',
    statutoryAudit: 'Only if turnover > ₹40L or capital > ₹25L',
    annualROCCompliance: 'Moderate (Form 11 & Form 8)',
    bestFor: 'Professional consultancies, service agencies, and trading firms',
  },
  {
    name: 'One Person Company',
    liability: 'Limited to unpaid share capital',
    minMembers: '1 Director / 1 Shareholder + 1 Nominee',
    investorSuitability: 'Low (Solo ownership; convert to Pvt Ltd to raise)',
    taxRate: '22% + cess',
    statutoryAudit: 'Mandatory regardless of turnover',
    annualROCCompliance: 'Moderate (Relaxations for board meetings)',
    bestFor: 'Solo founders wanting corporate identity with limited liability',
  },
  {
    name: 'Sole Proprietorship',
    liability: 'Unlimited (Personal assets liable for debts)',
    minMembers: '1 Individual',
    investorSuitability: 'Zero (No separate corporate entity)',
    taxRate: 'Individual income tax slab rates',
    statutoryAudit: 'Only under Section 44AB tax audit limits',
    annualROCCompliance: 'Nil (No ROC filings; only GST/ITR as applicable)',
    bestFor: 'Hyper-local small shops, freelance consultants, and micro traders',
  },
];

/* ============================================================
   TOOL 6: COMPLIANCE CALENDAR DATES
   ============================================================ */
const COMPLIANCE_EVENTS = [
  { month: 'Every Month', day: '11th', title: 'GSTR-1 Monthly Return', desc: 'Outward supplies statement for regular taxpayers', auth: 'GSTN' },
  { month: 'Every Month', day: '20th', title: 'GSTR-3B Monthly Return', desc: 'Summary return and net tax liability payment', auth: 'GSTN' },
  { month: 'Every Quarter', day: '7th', title: 'TDS / TCS Deposit', desc: 'Tax deducted at source payment challan for preceding month', auth: 'Income Tax' },
  { month: 'May', day: '30th', title: 'LLP Form 11 Annual Return', desc: 'Mandatory annual return for all registered LLPs', auth: 'MCA' },
  { month: 'September', day: '30th', title: 'Director KYC (DIR-3 KYC)', desc: 'Annual DIN verification to prevent disqualification', auth: 'MCA' },
  { month: 'October', day: '30th', title: 'LLP Form 8 Statement', desc: 'Statement of Account & Solvency for LLPs', auth: 'MCA' },
  { month: 'October', day: '31st', title: 'Corporate ITR Filing (ITR-6)', desc: 'Annual income tax return for audited companies', auth: 'Income Tax' },
  { month: 'November', day: '30th', title: 'Form AOC-4 Financials', desc: 'Filing audited balance sheet & P&L with ROC', auth: 'MCA' },
  { month: 'December', day: '31st', title: 'Form MGT-7 Annual Return', desc: 'Filing annual return with ROC post-AGM', auth: 'MCA' },
];

export default function Tools() {
  const [activeTab, setActiveTab] = useState('structure'); // 'structure' | 'msme' | 'runway' | 'funding' | 'checklist' | 'calendar'

  /* --- MSME CHECKER STATE --- */
  const [investmentLakhs, setInvestmentLakhs] = useState(40);
  const [turnoverLakhs, setTurnoverLakhs] = useState(180);

  const msmeResult = useMemo(() => {
    const invCr = investmentLakhs / 100;
    const turnCr = turnoverLakhs / 100;

    if (invCr <= 1 && turnCr <= 5) {
      return {
        category: 'Micro Enterprise',
        badge: 'Micro Unit',
        desc: 'Investment in Plant & Machinery does not exceed ₹1 Crore and Annual Turnover does not exceed ₹5 Crores.',
        tone: 'emerald',
        benefits: ['Up to 80% subsidy on patent/ZED certifications', 'Collateral-free loans via CGTMSE', 'Priority procurement preferences'],
      };
    } else if (invCr <= 10 && turnCr <= 50) {
      return {
        category: 'Small Enterprise',
        badge: 'Small Unit',
        desc: 'Investment in Plant & Machinery does not exceed ₹10 Crores and Annual Turnover does not exceed ₹50 Crores.',
        tone: 'blue',
        benefits: ['Up to 60% subsidy on ZED certifications', 'Subsidies on trade fairs & technology upgrades', 'Concessions on bank interest'],
      };
    } else if (invCr <= 50 && turnCr <= 250) {
      return {
        category: 'Medium Enterprise',
        badge: 'Medium Unit',
        desc: 'Investment in Plant & Machinery does not exceed ₹50 Crores and Annual Turnover does not exceed ₹250 Crores.',
        tone: 'indigo',
        benefits: ['Up to 50% subsidy on ZED certifications', 'Access to export facilitation & industrial clusters', 'MSME Champions support'],
      };
    } else {
      return {
        category: 'Large / Non-MSME Enterprise',
        badge: 'Corporate Scale',
        desc: 'Investment exceeds ₹50 Crores or Annual Turnover exceeds ₹250 Crores. Classifies outside the MSMED statutory threshold.',
        tone: 'slate',
        benefits: ['Eligible for PLI schemes and Large Industry State Incentives'],
      };
    }
  }, [investmentLakhs, turnoverLakhs]);

  /* --- RUNWAY CALCULATOR STATE --- */
  const [cashBalance, setCashBalance] = useState(2500000); // 25L
  const [monthlyRevenue, setMonthlyRevenue] = useState(300000); // 3L
  const [monthlyExpenses, setMonthlyExpenses] = useState(650000); // 6.5L

  const runwayResult = useMemo(() => {
    const netBurn = Math.max(0, monthlyExpenses - monthlyRevenue);
    if (netBurn === 0) {
      return {
        months: 'Profitable / Infinite',
        burn: 0,
        status: 'Cash Flow Positive',
        recommendation: 'Your business generates more cash than it consumes. Focus on capital reinvestment and Section 80-IAC tax shielding.',
      };
    }
    const months = (cashBalance / netBurn).toFixed(1);
    let status = 'Healthy Runway';
    let recommendation = 'Maintain disciplined hiring and prepare non-dilutive grant/debt applications.';
    if (months < 6) {
      status = 'Critical Runway Alert (< 6 Months)';
      recommendation = 'Initiate immediate capital infusion: explore SISFS grants, CGSS collateral-free debt, or founder bridges.';
    } else if (months < 12) {
      status = 'Moderate Runway (6–12 Months)';
      recommendation = 'Begin investor conversations or government subsidy applications now to prevent cash crunch.';
    }
    return { months, burn: netBurn, status, recommendation };
  }, [cashBalance, monthlyRevenue, monthlyExpenses]);

  /* --- DOCUMENT CHECKLIST STATE --- */
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('private-limited-company');
  const [copied, setCopied] = useState(false);
  const selectedService = SERVICES.find((s) => s.slug === selectedServiceSlug) || SERVICES[0];

  const handleCopyChecklist = () => {
    const text = `Mandatory Document Checklist for ${selectedService.name}:\n` +
      selectedService.documents.map((d, i) => `${i + 1}. ${d}`).join('\n') +
      `\n\nGenerated via CertWinX Founder Tools (www.certwinx.com)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Founder Utilities & Interactive Compliance Tools — CertWinX</title>
        <meta
          name="description"
          content="Interactive business tools: Entity Structure Comparison, MSME Category Checker, Startup Runway Calculator, and Document Checklist Generator."
        />
      </Helmet>

      {/* ============ HERO ============ */}
      <section className="relative pt-36 lg:pt-44 pb-16 bg-canvas border-b border-line overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-6">
              <Wrench size={12} className="text-blue" />
              Interactive Venture Diagnostics
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance max-w-4xl mx-auto">
              Empowering Indian founders with working utility tools.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
              Calculate survival runway, classify MSME criteria under official gazette rules, compare corporate entity structures, and generate customized documentation packages.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ TOOLS CONSOLE ============ */}
      <section className="py-16 lg:py-24 bg-white border-b border-line">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Tool Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {[
              { id: 'structure', label: 'Structure Comparison', icon: Scale },
              { id: 'msme', label: 'MSME Classification', icon: Award },
              { id: 'runway', label: 'Runway Calculator', icon: Calculator },
              { id: 'checklist', label: 'Document Checklist', icon: FileText },
              { id: 'calendar', label: 'Compliance Calendar', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue text-white shadow-sm shadow-blue/20 scale-102'
                      : 'bg-canvas text-graphite border border-line hover:border-blue/40 hover:text-ink'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ================= TOOL 1: STRUCTURE COMPARISON ================= */}
          {activeTab === 'structure' && (
            <div className="bg-canvas border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="max-w-2xl mb-8">
                <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                  Entity Evaluation Matrix
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
                  Proprietorship vs Partnership vs LLP vs Private Limited
                </h3>
                <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                  Choosing the right entity structure defines your personal liability, statutory audit requirements, corporate taxation rate, and ability to raise institutional venture capital.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STRUCTURES.map((st) => (
                  <div
                    key={st.name}
                    className="bg-white border border-line rounded-2xl p-6 flex flex-col justify-between hover:border-blue/40 transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
                        <h4 className="font-display text-base font-bold text-ink">
                          {st.name}
                        </h4>
                        <Building2 size={16} className="text-blue" />
                      </div>

                      <div className="space-y-3.5 mb-6 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Personal Liability</span>
                          <p className="font-semibold text-ink mt-0.5">{st.liability}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Members & Directors</span>
                          <p className="font-semibold text-ink mt-0.5">{st.minMembers}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Investor Suitability</span>
                          <p className="font-semibold text-deepblue mt-0.5">{st.investorSuitability}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Statutory Audit</span>
                          <p className="font-semibold text-ink mt-0.5">{st.statutoryAudit}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Corporate Tax Rate</span>
                          <p className="font-semibold text-ink mt-0.5">{st.taxRate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-line">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Recommended For:</span>
                      <p className="text-[11px] text-graphite mb-4 leading-relaxed">{st.bestFor}</p>
                      <MagneticButton to="/contact" variant="outline" size="sm" className="w-full text-center">
                        Incorporate {st.name.split(' ')[0]}
                      </MagneticButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TOOL 2: MSME CATEGORY CHECKER ================= */}
          {activeTab === 'msme' && (
            <div className="bg-canvas border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                  Statutory Classification
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
                  MSME Category Checker (2020 Composite Criteria)
                </h3>
                <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                  Under the official Ministry of MSME composite criteria, enterprise classification is determined jointly by Investment in Plant & Machinery AND Annual Turnover.
                </p>
              </div>

              {/* Sliders Console */}
              <div className="grid sm:grid-cols-2 gap-6 bg-white border border-line rounded-2xl p-6 mb-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-ink">
                      Plant & Machinery Investment
                    </label>
                    <span className="font-mono text-sm font-bold text-blue">
                      ₹{investmentLakhs} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="5500"
                    step="25"
                    value={investmentLakhs}
                    onChange={(e) => setInvestmentLakhs(Number(e.target.value))}
                    className="w-full accent-blue"
                  />
                  <div className="flex justify-between text-[10px] text-muted mt-1 font-mono">
                    <span>₹5L</span>
                    <span>₹1 Cr (Micro)</span>
                    <span>₹10 Cr (Small)</span>
                    <span>₹50 Cr+</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-ink">
                      Annual Business Turnover
                    </label>
                    <span className="font-mono text-sm font-bold text-blue">
                      ₹{turnoverLakhs} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="26000"
                    step="50"
                    value={turnoverLakhs}
                    onChange={(e) => setTurnoverLakhs(Number(e.target.value))}
                    className="w-full accent-blue"
                  />
                  <div className="flex justify-between text-[10px] text-muted mt-1 font-mono">
                    <span>₹10L</span>
                    <span>₹5 Cr (Micro)</span>
                    <span>₹50 Cr (Small)</span>
                    <span>₹250 Cr+</span>
                  </div>
                </div>
              </div>

              {/* Result Dossier */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue uppercase tracking-wider block">Official Classification</span>
                    <h4 className="font-display text-2xl font-bold text-ink mt-0.5">{msmeResult.category}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase">
                    {msmeResult.badge}
                  </span>
                </div>

                <p className="text-xs text-graphite mb-6 leading-relaxed">
                  {msmeResult.desc}
                </p>

                <div className="mb-6">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
                    Applicable Statutory Perks & Subsidies:
                  </span>
                  <ul className="space-y-1.5">
                    {msmeResult.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-graphite">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-line flex flex-wrap items-center gap-3">
                  <MagneticButton to="/services/udyam-registration" variant="primary" size="sm">
                    Apply for Udyam Certificate <ArrowUpRight size={13} />
                  </MagneticButton>
                  <MagneticButton href={getWhatsAppLink('MSME classification')} variant="outline" size="sm">
                    Discuss with MSME Advisor
                  </MagneticButton>
                </div>
              </div>
            </div>
          )}

          {/* ================= TOOL 3: RUNWAY CALCULATOR ================= */}
          {activeTab === 'runway' && (
            <div className="bg-canvas border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                  Cash Flow Planning
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
                  Startup Runway & Net Burn Calculator
                </h3>
                <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                  Estimate your zero-cash date and determine how many months of operational runway remain based on current bank cash and net monthly burn.
                </p>
              </div>

              {/* Three Inputs */}
              <div className="grid sm:grid-cols-3 gap-4 bg-white border border-line rounded-2xl p-6 mb-8">
                <div>
                  <label className="text-xs font-bold text-ink block mb-2">Current Cash in Bank (₹)</label>
                  <input
                    type="number"
                    value={cashBalance}
                    onChange={(e) => setCashBalance(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-line text-sm font-bold text-ink focus:outline-none focus:border-blue"
                  />
                  <span className="text-[10px] text-muted mt-1 block">e.g. ₹25,00,000</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-ink block mb-2">Monthly Cash Inflows / Rev (₹)</label>
                  <input
                    type="number"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-line text-sm font-bold text-ink focus:outline-none focus:border-blue"
                  />
                  <span className="text-[10px] text-muted mt-1 block">e.g. ₹3,00,000</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-ink block mb-2">Monthly Cash Outflows (₹)</label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-line text-sm font-bold text-ink focus:outline-none focus:border-blue"
                  />
                  <span className="text-[10px] text-muted mt-1 block">Salaries, servers, rent</span>
                </div>
              </div>

              {/* Runway Result Card */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-6 items-center pb-6 border-b border-line mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-blue uppercase tracking-wider block">Estimated Survival Window</span>
                    <div className="font-display text-4xl sm:text-5xl font-bold text-ink mt-1">
                      {runwayResult.months} {typeof runwayResult.months === 'string' && runwayResult.months.includes('.') ? 'Months' : ''}
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 mt-1 block">
                      Status: {runwayResult.status}
                    </span>
                  </div>

                  <div className="bg-canvas border border-line rounded-xl p-4">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Monthly Net Burn Rate</span>
                    <p className="text-xl font-bold text-ink mt-0.5">
                      ₹{runwayResult.burn.toLocaleString('en-IN')} / month
                    </p>
                    <p className="text-[11px] text-graphite mt-1">
                      Cash drain computed after offsetting current revenues.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-soft/40 border border-blue/20 mb-6">
                  <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                    Advisory Strategy & Recommendation
                  </span>
                  <p className="text-xs text-graphite leading-relaxed">
                    {runwayResult.recommendation}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton to="/funding" variant="primary" size="sm">
                    Explore Non-Dilutive Capital Grants <ArrowUpRight size={13} />
                  </MagneticButton>
                  <MagneticButton href={getWhatsAppLink('runway planning')} variant="outline" size="sm">
                    Discuss Capital Plan
                  </MagneticButton>
                </div>
              </div>
            </div>
          )}

          {/* ================= TOOL 4: DOCUMENT CHECKLIST GENERATOR ================= */}
          {activeTab === 'checklist' && (
            <div className="bg-canvas border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                    Checklist Generator
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                    Service-Specific Document Packages
                  </h3>
                </div>

                {/* Service Selector Dropdown */}
                <select
                  value={selectedServiceSlug}
                  onChange={(e) => setSelectedServiceSlug(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-white border border-line text-xs font-bold text-ink focus:outline-none focus:border-blue shadow-xs"
                >
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checklist Output Card */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-blue uppercase tracking-wider block">
                      Mandatory Dossier Requirements
                    </span>
                    <h4 className="font-display text-lg font-bold text-ink mt-0.5">
                      {selectedService.name}
                    </h4>
                  </div>

                  <button
                    onClick={handleCopyChecklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas border border-line text-xs font-bold text-graphite hover:text-ink hover:border-blue/30 transition-all"
                  >
                    {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied!' : 'Copy Checklist'}</span>
                  </button>
                </div>

                <div className="space-y-3 mb-8">
                  {selectedService.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-canvas border border-line/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-blue-soft text-blue font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-ink">{doc}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 uppercase shrink-0">
                        Mandatory
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs text-graphite">
                  <span>Official Turnaround: <strong className="text-ink">{selectedService.timeline}</strong></span>
                  <MagneticButton to={`/services/${selectedService.slug}`} variant="primary" size="sm">
                    Read Complete Service Dossier <ArrowUpRight size={13} />
                  </MagneticButton>
                </div>
              </div>
            </div>
          )}

          {/* ================= TOOL 5: COMPLIANCE CALENDAR ================= */}
          {activeTab === 'calendar' && (
            <div className="bg-canvas border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                  Statutory Due Dates
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
                  Annual Corporate & Direct Tax Compliance Calendar
                </h3>
                <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                  Key recurring statutory due dates under the Companies Act 2013, Goods & Services Tax (GST), and Income Tax Act 1961.
                </p>
              </div>

              <div className="space-y-3">
                {COMPLIANCE_EVENTS.map((evt, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue/30 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-soft border border-blue/20 text-blue flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold uppercase">{evt.month.split(' ')[0]}</span>
                        <span className="font-display text-sm font-extrabold leading-tight">{evt.day}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-xs sm:text-sm font-bold text-ink">
                            {evt.title}
                          </h4>
                          <span className="text-[9px] font-bold text-deepblue bg-sky/30 px-2 py-0.5 rounded-full border border-sky/40">
                            {evt.auth}
                          </span>
                        </div>
                        <p className="text-xs text-graphite mt-0.5">{evt.desc}</p>
                      </div>
                    </div>

                    <MagneticButton href={getWhatsAppLink(`${evt.title} filing`)} variant="outline" size="sm" className="shrink-0">
                      File with CertWinX
                    </MagneticButton>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
