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
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SCHEMES } from '../data/schemes';
import { getWhatsAppLink } from '../lib/constants';

/* ============ GENUINE OPERATIONAL METRICS ============ */
const HERO_STATS = [
  { value: '₹50 Lakhs', label: 'Max SISFS Grant/Debt' },
  { value: '₹10 Crore', label: 'Max CGSS Guarantee' },
  { value: '₹5 Crore', label: 'Max CGTMSE Facility' },
  { value: '100%', label: 'Non-Dilutive Scope' },
];

/* ============ FUNDING TYPES ============ */
const FUNDING_TYPES = [
  { value: 'All', label: 'All Funding Categories', icon: Filter },
  { value: 'Grant', label: 'Non-Dilutive Grants', icon: Award },
  { value: 'Credit Guarantee', label: 'Collateral-Free Debt', icon: ShieldCheck },
  { value: 'Subsidy', label: 'MSME Capital Subsidies', icon: TrendingUp },
  { value: 'Equity / Venture Capital', label: 'Venture Capital / FFS', icon: Briefcase },
];

/* ============ HIGHLIGHT SCHEMES ============ */
const HIGHLIGHT_SLUGS = [
  'startup-india-seed-fund',
  'cgss',
  'pmegp',
];

export default function Funding() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');

  // Filter only funding-related schemes
  const fundingSchemes = useMemo(() => {
    return SCHEMES.filter((s) => {
      const isFunding =
        s.category === 'Funding' ||
        s.supportType.includes('Grant') ||
        s.supportType.includes('Credit Guarantee') ||
        s.supportType.includes('Subsidy') ||
        s.supportType.includes('Loan') ||
        s.supportType.includes('Equity');
      return isFunding;
    });
  }, []);

  const filtered = useMemo(() => {
    return fundingSchemes.filter((s) => {
      if (type !== 'All' && !s.supportType.toLowerCase().includes(type.toLowerCase())) {
        return false;
      }
      if (query) {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q) ||
          (s.quantum && s.quantum.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [fundingSchemes, query, type]);

  const highlights = useMemo(() => {
    return SCHEMES.filter((s) => HIGHLIGHT_SLUGS.includes(s.slug));
  }, []);

  return (
    <>
      <Helmet>
        <title>Government Funding, Grants & Credit Guarantee Schemes — CertWinX</title>
        <meta
          name="description"
          content="Explore non-dilutive government grants, Startup India Seed Fund, CGSS credit guarantees up to ₹10 Crore, and MSME capital subsidies."
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
                Sovereign Grants & Capital Support
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                Access non-dilutive grants & collateral-free credit.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
                Structured advisory for Startup India Seed Fund (SISFS), CGSS loan guarantees up to ₹10 Crore, DST NIDHI grants, and MSME PMEGP capital subsidies.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Check Funding Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton href={getWhatsAppLink('funding schemes')} variant="whatsapp" size="lg">
                  WhatsApp Funding Desk
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

      {/* ============ SEARCH & FILTERS SECTION ============ */}
      <section className="py-8 bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search funding schemes, ministries, grant quantums, or keywords..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-line text-ink placeholder-muted focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all text-sm shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-canvas hover:bg-line flex items-center justify-center text-graphite hover:text-ink transition-colors"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FUNDING_TYPES.map((t) => {
              const active = type === t.value;
              const Icon = t.icon;
              return (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
                    active
                      ? 'bg-blue text-white shadow-sm'
                      : 'bg-white border border-line text-graphite hover:border-blue/40 hover:text-ink'
                  }`}
                >
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted">
              Displaying <span className="text-ink font-bold">{filtered.length}</span> funding opportunities
              {type !== 'All' && <span> under <strong className="text-blue">{type}</strong></span>}
            </p>
          </div>

        </div>
      </section>

      {/* ============ HIGHLIGHT SCHEMES ============ */}
      {query === '' && type === 'All' && (
        <section className="py-16 bg-canvas border-b border-line">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <RevealOnScroll>
              <div className="mb-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                  <span className="w-5 h-px bg-blue" />
                  High Priority
                </span>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight mb-2">
                  Flagship Sovereign Funding Programs
                </h2>
                <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                  High-allocation central government schemes with active rolling application windows.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((s) => (
                <Link
                  key={s.slug}
                  to={`/schemes/${s.slug}`}
                  className="group block h-full bg-white border border-line rounded-3xl p-7 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(28,131,243,0.18)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold uppercase">
                        {s.supportType}
                      </span>
                      <ArrowUpRight size={15} className="text-muted group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink mb-2 leading-snug group-hover:text-blue transition-colors">
                      {s.name}
                    </h3>
                    {s.quantum && (
                      <div className="inline-block px-3 py-1 rounded-xl bg-sky/30 border border-sky/40 text-[11px] font-bold text-deepblue mb-3">
                        {s.quantum}
                      </div>
                    )}
                    <p className="text-xs text-graphite line-clamp-3 leading-relaxed mb-4">
                      {s.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-line/60 text-xs font-bold text-blue">
                    Inspect Criteria & Application Process →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ ALL FILTERED FUNDING SCHEMES ============ */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          <div className="mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
              All Funding Schemes ({filtered.length})
            </h2>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <Link
                  key={s.slug}
                  to={`/schemes/${s.slug}`}
                  className="group block h-full bg-white border border-line rounded-3xl p-7 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(28,131,243,0.18)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold uppercase">
                        {s.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-canvas text-graphite border border-line text-[10px] font-semibold uppercase">
                        {s.supportType}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Landmark size={12} className="text-blue" />
                      {s.ministry}
                    </p>

                    <h3 className="font-display text-lg font-bold text-ink mb-2 leading-snug group-hover:text-blue transition-colors">
                      {s.name}
                    </h3>

                    {s.quantum && (
                      <div className="inline-block px-3 py-1 rounded-xl bg-sky/30 border border-sky/40 text-[11px] font-bold text-deepblue mb-3">
                        {s.quantum}
                      </div>
                    )}

                    <p className="text-xs text-graphite line-clamp-3 leading-relaxed mb-6">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-blue">
                    <span>View Scheme Dossier</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-line max-w-lg mx-auto">
              <Search size={32} className="text-muted mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-ink mb-2">No matching funding schemes</h3>
              <p className="text-xs text-graphite mb-6 px-6">
                Try searching for different terms or reset your filters.
              </p>
              <button
                onClick={() => { setQuery(''); setType('All'); }}
                className="px-5 py-2.5 rounded-full bg-blue text-white text-xs font-bold hover:bg-deepblue transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
