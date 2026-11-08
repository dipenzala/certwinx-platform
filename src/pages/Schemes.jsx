import { useEffect, useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUpRight,
  Sparkles,
  X,
  Filter,
  Building2,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Award,
  Briefcase,
  Users,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SCHEMES } from '../data/schemes';
import { getWhatsAppLink } from '../lib/constants';

/* ============ GENUINE OPERATIONAL METRICS ============ */
const HERO_STATS = [
  { value: '18+', label: 'Verified Priority Schemes' },
  { value: '28+', label: 'States & UTs Covered' },
  { value: '100%', label: 'Gazette-Indexed Criteria' },
  { value: '24h', label: 'Advisory Scrutiny SLA' },
];

/* ============ SUPPORT TYPE FILTERS ============ */
const SUPPORT_TYPES = [
  { value: 'All', label: 'All Schemes' },
  { value: 'Grant', label: 'Grants' },
  { value: 'Tax Incentive', label: 'Tax Holidays (80-IAC)' },
  { value: 'Credit Guarantee', label: 'Credit Guarantee' },
  { value: 'Subsidy', label: 'MSME Subsidies' },
  { value: 'Equity / Venture Capital', label: 'Venture Capital / FFS' },
];

/* ============ FEATURED SCHEMES ============ */
const FEATURED_SLUGS = [
  'startup-india-seed-fund',
  'section-80-iac',
  'cgss',
];

export default function Schemes() {
  const [query, setQuery] = useState('');
  const [supportType, setSupportType] = useState('All');
  const rootRef = useRef(null);

  // Filter schemes
  const filtered = useMemo(() => {
    return SCHEMES.filter((s) => {
      if (supportType !== 'All' && !s.supportType.toLowerCase().includes(supportType.toLowerCase())) {
        return false;
      }
      if (query) {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q) ||
          (s.quantum && s.quantum.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [query, supportType]);

  // Featured schemes
  const featured = useMemo(() => {
    return SCHEMES.filter((s) => FEATURED_SLUGS.includes(s.slug));
  }, []);

  // GSAP animation on filter change
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const grid = document.querySelector('[data-schemes-grid]');
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
    );
  }, [query, supportType]);

  return (
    <>
      <Helmet>
        <title>Government Schemes & Incentives Intelligence Directory — CertWinX</title>
        <meta
          name="description"
          content="Searchable intelligence directory of central and state government schemes, grants, subsidies, and Section 80-IAC tax incentives for Indian startups and MSMEs."
        />
      </Helmet>

      {/* ============ HERO SECTION (Enterprise Light-Blue) ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-16 bg-canvas overflow-hidden border-b border-line"
      >
        {/* Soft atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Live verified badge */}
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-6">
                <span className="relative flex items-center justify-center w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-blue animate-ping" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-blue" />
                </span>
                Government Schemes Intelligence Directory
              </span>
            </RevealOnScroll>

            {/* Heading */}
            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                Verified intelligence on grants, incentives & funding.
              </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
                Explore sovereign grants, Section 80-IAC tax exemptions, collateral-free credit guarantees, and state startup subsidies indexed directly from official statutory gazettes.
              </p>
            </RevealOnScroll>

            {/* Operational Metrics Strip */}
            <RevealOnScroll delay={0.3}>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white border border-line shadow-sm">
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
              placeholder="Search by scheme name, ministry, grant quantum, or keyword..."
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
            {SUPPORT_TYPES.map((t) => {
              const active = supportType === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setSupportType(t.value)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
                    active
                      ? 'bg-blue text-white shadow-sm'
                      : 'bg-white border border-line text-graphite hover:border-blue/40 hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted">
              Displaying <span className="text-ink font-bold">{filtered.length}</span> verified schemes
              {supportType !== 'All' && <span> under <strong className="text-blue">{supportType}</strong></span>}
            </p>
          </div>

        </div>
      </section>

      {/* ============ SCHEMES DIRECTORY GRID ============ */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {filtered.length > 0 ? (
            <div
              data-schemes-grid
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((s, i) => (
                <Link
                  key={s.slug}
                  to={`/schemes/${s.slug}`}
                  className="group block h-full bg-white border border-line rounded-3xl p-7 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(28,131,243,0.18)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category + Support Type */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold tracking-wide uppercase">
                        {s.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-canvas text-graphite border border-line text-[10px] font-semibold uppercase">
                        {s.supportType}
                      </span>
                    </div>

                    {/* Ministry */}
                    <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Landmark size={12} className="text-blue" />
                      {s.ministry}
                    </p>

                    {/* Name */}
                    <h3 className="font-display text-lg font-bold text-ink mb-2 leading-snug group-hover:text-blue transition-colors">
                      {s.name}
                    </h3>

                    {/* Quantum Pill */}
                    {s.quantum && (
                      <div className="inline-block px-3 py-1 rounded-xl bg-sky/30 border border-sky/40 text-[11px] font-bold text-deepblue mb-3">
                        {s.quantum}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-graphite line-clamp-3 leading-relaxed mb-6">
                      {s.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-blue">
                    <span>Inspect Full Criteria & Process</span>
                    <ArrowUpRight
                      size={15}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-line max-w-lg mx-auto">
              <Search size={32} className="text-muted mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-ink mb-2">No matching schemes found</h3>
              <p className="text-xs text-graphite mb-6 px-6">
                Try searching for different terms or clear the filters to view all 18 priority schemes.
              </p>
              <button
                onClick={() => { setQuery(''); setSupportType('All'); }}
                className="px-5 py-2.5 rounded-full bg-blue text-white text-xs font-bold hover:bg-deepblue transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Advisory Callout */}
          <div className="mt-16 bg-white border border-line rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">
              Unsure which government scheme fits your venture?
            </h3>
            <p className="text-sm text-graphite max-w-xl mx-auto mb-8">
              Answer our 90-second eligibility diagnostic to assess your venture against statutory thresholds, documentation requirements, and timeline expectations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Run Automated Eligibility Diagnostic <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink('government schemes assistance')} variant="outline" size="lg">
                Talk to a Schemes Advisor
              </MagneticButton>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
