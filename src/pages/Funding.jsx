import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUpRight,
  Sparkles,
  X,
  Filter,
  Award,
  Building2,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Landmark,
  Percent,
  Coins,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import CounterNumber from '../components/motion/CounterNumber';
import FundingEcosystem from '../components/sections/FundingEcosystem';
import { SCHEMES } from '../data/schemes';
import { getWhatsAppLink, PHONE_NUMBER } from '../lib/constants';

/* ============ DIRECTORY STATS (Live Count-Up Animation) ============ */
const STAT_METRICS = [
  { num: 39, prefix: '', suffix: '+', label: 'Active Schemes Tracked' },
  { num: 200, prefix: '₹', suffix: '+ Cr', label: 'Cumulative Capital Pool' },
  { staticText: '0% Equity', label: 'Non-Dilutive Grants' },
  { num: 100, prefix: '', suffix: '+', label: 'Active Advisory Engagements' },
];

/* ============ QUICK FILTER PILLS (CorporateMart Reference) ============ */
const QUICK_FILTERS = [
  { id: 'all', label: 'All Opportunities' },
  { id: 'grant', label: 'Grants (Non-Dilutive)' },
  { id: 'loan', label: 'Business Loans' },
  { id: 'debt', label: 'Debt Funds & Guarantees' },
  { id: 'equity', label: 'Equity Programs' },
];

/* ============ STAGES ============ */
const STAGE_OPTIONS = [
  { id: 'idea', label: 'Idea / Proof of Concept' },
  { id: 'prototype', label: 'Prototype & Validation' },
  { id: 'revenue', label: 'Early Traction / Revenue' },
  { id: 'scaling', label: 'Scaling & Growth' },
];

/* ============ QUANTUM RANGES ============ */
const QUANTUM_RANGES = [
  { id: 'under20l', label: 'Under ₹20 Lakhs' },
  { id: '20to50l', label: '₹20L – ₹50 Lakhs' },
  { id: '50lto5cr', label: '₹50L – ₹5 Crore' },
  { id: 'above5cr', label: 'Above ₹5 Crore' },
];

export default function Funding() {
  const [query, setQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedQuantum, setSelectedQuantum] = useState([]);

  // Base list of funding-related schemes
  const allFundingSchemes = useMemo(() => {
    return SCHEMES.filter((s) => {
      return (
        s.category === 'Funding' ||
        s.supportType.includes('Grant') ||
        s.supportType.includes('Credit Guarantee') ||
        s.supportType.includes('Subsidy') ||
        s.supportType.includes('Loan') ||
        s.supportType.includes('Equity')
      );
    });
  }, []);

  // Compute counts for left filter sidebar
  const counts = useMemo(() => {
    return {
      grant: allFundingSchemes.filter((s) => s.supportType.includes('Grant')).length,
      debt: allFundingSchemes.filter((s) => s.supportType.includes('Credit Guarantee') || s.supportType.includes('Debt')).length,
      equity: allFundingSchemes.filter((s) => s.supportType.includes('Equity') || s.supportType.includes('Venture')).length,
      subsidy: allFundingSchemes.filter((s) => s.supportType.includes('Subsidy')).length,
      loan: allFundingSchemes.filter((s) => s.supportType.includes('Loan') || s.supportType.includes('Credit')).length,
    };
  }, [allFundingSchemes]);

  // Handle Quick Filter Pill Clicks
  const handleQuickFilter = (id) => {
    setQuickFilter(id);
    if (id === 'all') {
      setSelectedTypes([]);
    } else if (id === 'grant') {
      setSelectedTypes(['Grant']);
    } else if (id === 'loan') {
      setSelectedTypes(['Loan']);
    } else if (id === 'debt') {
      setSelectedTypes(['Debt', 'Credit Guarantee']);
    } else if (id === 'equity') {
      setSelectedTypes(['Equity']);
    }
  };

  const toggleType = (t) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
    setQuickFilter('custom');
  };

  const toggleStage = (st) => {
    setSelectedStages((prev) =>
      prev.includes(st) ? prev.filter((item) => item !== st) : [...prev, st]
    );
  };

  const toggleQuantum = (q) => {
    setSelectedQuantum((prev) =>
      prev.includes(q) ? prev.filter((item) => item !== q) : [...prev, q]
    );
  };

  const handleResetFilters = () => {
    setQuery('');
    setQuickFilter('all');
    setSelectedTypes([]);
    setSelectedStages([]);
    setSelectedQuantum([]);
  };

  // Filtered scheme calculation
  const filtered = useMemo(() => {
    return allFundingSchemes.filter((s) => {
      // Type filter
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some((t) =>
          s.supportType.toLowerCase().includes(t.toLowerCase())
        );
        if (!matchesType) return false;
      }

      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesQuery =
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q) ||
          (s.quantum && s.quantum.toLowerCase().includes(q)) ||
          s.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [allFundingSchemes, selectedTypes, query]);

  return (
    <>
      <Helmet>
        <title>Discover Startup Grants & Government Funding Schemes 2026 — CertWinX</title>
        <meta
          name="description"
          content="Explore non-dilutive government grants, DST NIDHI prototyping grants, collateral-free credit guarantees up to ₹10 Crore, and MSME capital subsidies."
        />
      </Helmet>

      {/* ============ HERO SECTION (3D Depth & Gradient) ============ */}
      <section className="relative pt-36 lg:pt-42 pb-14 bg-canvas overflow-hidden border-b border-line">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[130px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/25 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-xs font-bold text-blue uppercase tracking-wider mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
              <span>Verified Govt & Institutional Grants Directory 2026</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-5 leading-[1.12]">
              Discover Startup Grants &{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C83F3] via-[#0E60D2] to-[#0A1128]">
                Government Funding Schemes
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-graphite leading-relaxed mb-8 max-w-3xl">
              Explore non-dilutive government grants, technology grants, collateral-free MSME credit, and institutional venture capital schemes. Filter verified funding programs by sector, stage, amount, founder eligibility, and mandatory registrations.
            </p>

            {/* 4 Metric Counter Boxes (Live Count-Up Starting from 0) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {STAT_METRICS.map((stat, i) => (
                <div key={i} className="bg-white/95 backdrop-blur-md border border-line rounded-2xl p-4 sm:p-5 shadow-[0_10px_25px_-10px_rgba(28,131,243,0.1)] hover:-translate-y-0.5 transition-all">
                  {stat.staticText ? (
                    <span className="font-display text-2xl sm:text-3xl font-bold text-deepblue block mb-1">
                      {stat.staticText}
                    </span>
                  ) : (
                    <CounterNumber
                      from={0}
                      to={stat.num}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.2}
                      className="font-display text-2xl sm:text-3xl font-bold text-deepblue block mb-1 tabular"
                    />
                  )}
                  <span className="text-[11px] font-semibold text-muted tracking-tight block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Filter Pills Row (CorporateMart Reference) */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-muted mr-1 uppercase tracking-wider">
                Quick filter:
              </span>
              {QUICK_FILTERS.map((qf) => {
                const active = quickFilter === qf.id;
                return (
                  <button
                    key={qf.id}
                    onClick={() => handleQuickFilter(qf.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      active
                        ? 'bg-blue text-white shadow-sm'
                        : 'bg-white border border-line text-graphite hover:border-blue/40 hover:text-ink'
                    }`}
                  >
                    {qf.label}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ============ MAIN DIRECTORY & FILTER SIDEBAR ============ */}
      <section className="py-12 lg:py-16 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* ============ LEFT FILTER SIDEBAR (CorporateMart Screenshots 6 & 7) ============ */}
            <aside className="lg:col-span-4 xl:col-span-3 bg-white rounded-3xl border border-line p-6 shadow-sm sticky top-28 space-y-6">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-blue" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                    Filter Schemes
                  </h3>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-blue hover:text-deepblue flex items-center gap-1 transition-colors"
                >
                  <RotateCcw size={11} />
                  <span>Reset All</span>
                </button>
              </div>

              <div className="text-xs text-muted">
                <strong className="text-ink font-bold">{filtered.length}</strong> Schemes Available
              </div>

              {/* Accordion Group 1: Funding Type */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink block">
                  Funding Type
                </span>
                <div className="space-y-2">
                  {[
                    { label: 'Grant (Non-Dilutive)', key: 'Grant', count: counts.grant },
                    { label: 'Credit Guarantee / Debt', key: 'Credit Guarantee', count: counts.debt },
                    { label: 'Equity / Venture Capital', key: 'Equity', count: counts.equity },
                    { label: 'MSME Capital Subsidy', key: 'Subsidy', count: counts.subsidy },
                    { label: 'Term Loan / MUDRA', key: 'Loan', count: counts.loan },
                  ].map((item) => {
                    const checked = selectedTypes.includes(item.key);
                    return (
                      <label
                        key={item.key}
                        className="flex items-center justify-between text-xs text-graphite hover:text-ink cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleType(item.key)}
                            className="w-4 h-4 rounded border-line text-blue focus:ring-blue/20 cursor-pointer"
                          />
                          <span className={checked ? 'font-bold text-ink' : ''}>
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-muted group-hover:text-ink">
                          {item.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Accordion Group 2: Startup Stage */}
              <div className="pt-4 border-t border-line space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink block">
                  Startup Stage
                </span>
                <div className="space-y-2">
                  {STAGE_OPTIONS.map((st) => {
                    const checked = selectedStages.includes(st.id);
                    return (
                      <label
                        key={st.id}
                        className="flex items-center justify-between text-xs text-graphite hover:text-ink cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleStage(st.id)}
                            className="w-4 h-4 rounded border-line text-blue focus:ring-blue/20 cursor-pointer"
                          />
                          <span className={checked ? 'font-bold text-ink' : ''}>
                            {st.label}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Accordion Group 3: Quantum Range */}
              <div className="pt-4 border-t border-line space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink block">
                  Quantum Scope
                </span>
                <div className="space-y-2">
                  {QUANTUM_RANGES.map((q) => {
                    const checked = selectedQuantum.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className="flex items-center justify-between text-xs text-graphite hover:text-ink cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleQuantum(q.id)}
                            className="w-4 h-4 rounded border-line text-blue focus:ring-blue/20 cursor-pointer"
                          />
                          <span className={checked ? 'font-bold text-ink' : ''}>
                            {q.label}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Helpline Callout in Sidebar */}
              <div className="pt-4 border-t border-line bg-canvas p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                  Need Scheme Matching Assistance?
                </span>
                <p className="text-[11px] text-graphite leading-relaxed mb-3">
                  Our Senior Statutory Analysts verify your eligibility against central & state scheme gazettes.
                </p>
                <a
                  href={getWhatsAppLink('Funding scheme matching assistance')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-deepblue hover:bg-blue text-white text-xs font-bold transition-colors"
                >
                  <span>Connect with Funding Desk</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

            </aside>

            {/* ============ RIGHT SCHEME CARDS GRID ============ */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* Search Bar & Active Status */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search schemes, ministries, grant quantums, or eligibility keywords..."
                    className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-line text-ink placeholder-muted focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all text-xs sm:text-sm shadow-xs"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-canvas hover:bg-line flex items-center justify-center text-graphite hover:text-ink transition-colors"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="text-xs text-muted shrink-0 text-right">
                  Showing <strong className="text-ink">{filtered.length}</strong> of{' '}
                  <strong>{allFundingSchemes.length}</strong> Verified Schemes
                </div>
              </div>

              {/* Scheme Cards Grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filtered.map((scheme) => (
                    <div
                      key={scheme.slug}
                      className="group bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_20px_45px_-15px_rgba(28,131,243,0.16)] transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Meta Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold uppercase tracking-wider">
                            {scheme.supportType}
                          </span>
                          <span className="text-[10px] font-semibold text-muted uppercase">
                            {scheme.category}
                          </span>
                        </div>

                        {/* Nodal Ministry */}
                        <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Landmark size={13} className="text-blue shrink-0" />
                          <span className="truncate">{scheme.ministry}</span>
                        </p>

                        {/* Scheme Title */}
                        <h3 className="font-display text-lg font-bold text-ink mb-2.5 leading-snug group-hover:text-blue transition-colors">
                          <Link to={`/schemes/${scheme.slug}`}>
                            {scheme.name}
                          </Link>
                        </h3>

                        {/* Quantum Badge */}
                        {scheme.quantum && (
                          <div className="inline-block px-3 py-1 rounded-xl bg-sky/30 border border-sky/40 text-xs font-bold text-deepblue mb-3">
                            {scheme.quantum}
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-xs text-graphite line-clamp-3 leading-relaxed mb-4">
                          {scheme.description}
                        </p>

                        {/* Sovereign Attributes Pill Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-4 pt-2 border-t border-line/60">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 size={10} />
                            0% Equity Dilution
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-deepblue bg-blue/5 px-2.5 py-0.5 rounded-full border border-blue/15">
                            <ShieldCheck size={10} />
                            Collateral-Free Cover
                          </span>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-4 border-t border-line/70 flex items-center justify-between gap-2">
                        <Link
                          to={`/schemes/${scheme.slug}`}
                          className="text-xs font-bold text-blue hover:text-deepblue inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                        >
                          <span>Detailed Dossier</span>
                          <ArrowRight size={13} />
                        </Link>

                        <Link
                          to="/eligibility"
                          className="px-3.5 py-1.5 rounded-xl bg-blue/10 hover:bg-blue hover:text-white text-xs font-bold text-blue transition-all"
                        >
                          Check Eligibility
                        </Link>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-line max-w-lg mx-auto">
                  <Search size={32} className="text-muted mx-auto mb-4" />
                  <h3 className="font-display text-lg font-bold text-ink mb-2">
                    No matching funding schemes found
                  </h3>
                  <p className="text-xs text-graphite mb-6 px-6">
                    Try clearing some filters or search for another funding type.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-full bg-blue text-white text-xs font-bold hover:bg-deepblue transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

            </main>

          </div>

        </div>
      </section>

      {/* ============ CAPITAL INSTRUMENTS ARCHITECTURE SECTION ============ */}
      <FundingEcosystem />

    </>
  );
}
