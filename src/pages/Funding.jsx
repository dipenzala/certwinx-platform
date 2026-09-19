import { useEffect, useRef, useState, useMemo } from 'react';
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
  Users,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SCHEMES } from '../data/schemes';
import { getWhatsAppLink } from '../lib/constants';

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: '160+', label: 'Funding Schemes' },
  { value: '₹500Cr+', label: 'Facilitated*' },
  { value: '8,927+', label: 'Businesses Helped' },
  { value: '99%', label: 'Success Ratio' },
];

/* ============ FUNDING TYPES ============ */
const FUNDING_TYPES = [
  { value: 'All', label: 'All Types', icon: Filter },
  { value: 'Grant', label: 'Grant', icon: Award },
  { value: 'Loan', label: 'Loan', icon: Building2 },
  { value: 'Credit Guarantee', label: 'Credit Guarantee', icon: ShieldCheck },
  { value: 'Subsidy', label: 'Subsidy', icon: TrendingUp },
  { value: 'Seed Funding', label: 'Seed Funding', icon: Sparkles },
  { value: 'Equity', label: 'Equity', icon: Briefcase },
];

/* ============ FUNDING TYPES THAT APPEAR ON FUNDING PAGE ============ */
const FUNDING_SUPPORT_TYPES = ['Grant', 'Loan', 'Credit Guarantee', 'Subsidy'];

/* ============ HIGHLIGHT SCHEMES ============ */
const HIGHLIGHT_SLUGS = [
  'startup-india-seed-fund',
  'cgss',
  'pmegp',
];

export default function Funding() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const rootRef = useRef(null);

  // Filter only funding-related schemes
  const fundingSchemes = useMemo(() => {
    return SCHEMES.filter((s) =>
      FUNDING_SUPPORT_TYPES.includes(s.supportType)
    );
  }, []);

  // Apply user filters
  const filtered = useMemo(() => {
    return fundingSchemes.filter((s) => {
      if (type !== 'All' && s.supportType !== type) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [fundingSchemes, query, type]);

  // Highlight cards
  const highlights = useMemo(
    () => SCHEMES.filter((s) => HIGHLIGHT_SLUGS.includes(s.slug)),
    []
  );

  // GSAP animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-glow]').forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=40' : '-=40',
          y: i % 2 === 0 ? '-=30' : '+=30',
          duration: 12 + i * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 10,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('[data-live-dot]', {
        scale: 1.6,
        opacity: 0.4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray('[data-particle]').forEach((p, i) => {
        gsap.to(p, {
          y: () => gsap.utils.random(-25, 25),
          x: () => gsap.utils.random(-20, 20),
          opacity: () => gsap.utils.random(0.2, 0.6),
          duration: 6 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Re-animate cards on filter
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const grid = document.querySelector('[data-funding-grid]');
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'expo.out' }
    );
  }, [query, type]);

  return (
    <>
      <Helmet>
        <title>Funding — CertWinX</title>
        <meta
          name="description"
          content="Explore funding opportunities — grants, loans, credit guarantee, subsidies and seed funding for Indian businesses."
        />
      </Helmet>

      {/* ============ HERO ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 bg-[#0A0F1F] text-white overflow-hidden"
      >
        <div
          data-grid-shimmer
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(22,131,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '200% 100%, 64px 64px, 64px 64px',
          }}
        />

        <div
          data-glow
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none"
        />
        <div
          data-glow
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none"
        />

        {[
          { top: '20%', left: '8%', size: 3 },
          { top: '35%', left: '92%', size: 2 },
          { top: '60%', left: '5%', size: 2 },
          { top: '80%', left: '88%', size: 3 },
          { top: '25%', left: '50%', size: 2 },
        ].map((p, i) => (
          <span
            key={i}
            data-particle
            className="absolute rounded-full bg-blue pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: `0 0 ${p.size * 4}px rgba(22,131,255,0.6)`,
            }}
          />
        ))}

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">

            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                <span className="relative flex items-center justify-center w-2.5 h-2.5">
                  <span data-live-dot className="absolute inset-0 rounded-full bg-green-400/60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                Government Funding Platform
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                Explore funding opportunities for{' '}
                <span className="text-blue">your business.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                Grants, loans, credit guarantee, subsidies and seed funding — mapped to your
                business profile.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Find Funding Options <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton to="/contact" variant="outline" size="lg">
                  Talk to Expert
                </MagneticButton>
              </div>
            </RevealOnScroll>

            {/* Stats */}
            <RevealOnScroll delay={0.4}>
              <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-display text-xl font-bold text-white tabular">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
                      {s.label}
                    </span>
                    {i < HERO_STATS.length - 1 && (
                      <span className="w-px h-4 bg-white/15 ml-4 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ SEARCH + FILTERS ============ */}
      <section className="relative py-10 lg:py-14 bg-[#0A0F1F] border-t border-blue/15">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Search */}
          <RevealOnScroll>
            <div className="relative max-w-2xl mx-auto">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue/60 pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search funding schemes, ministry, or keyword..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-blue focus:bg-white/8 transition-all text-sm backdrop-blur-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </RevealOnScroll>

          {/* Filters */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {FUNDING_TYPES.map((t) => {
                const active = type === t.value;
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold tracking-wide uppercase transition-all duration-300 ${
                      active
                        ? 'bg-blue text-white border border-blue shadow-[0_10px_25px_-8px_rgba(22,131,255,0.6)]'
                        : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-blue/40'
                    }`}
                  >
                    <Icon size={12} strokeWidth={2.5} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Count */}
          <RevealOnScroll delay={0.2}>
            <div className="mt-6 text-center">
              <p className="text-xs text-white/50">
                Showing{' '}
                <span className="text-white font-bold">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'scheme' : 'schemes'}
                {type !== 'All' && (
                  <>
                    {' '}
                    of type <span className="text-blue font-bold">{type}</span>
                  </>
                )}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ HIGHLIGHT CARDS ============ */}
      {query === '' && type === 'All' && (
        <section className="relative py-16 lg:py-20 bg-canvas">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                  <span className="w-6 h-px bg-blue" />
                  Most Popular
                </span>
                <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                  Funding schemes that drive growth.
                </h2>
                <p className="text-base text-graphite leading-relaxed">
                  High-impact central government schemes with proven track records.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {highlights.map((s, i) => (
                <HighlightCard key={s.slug} scheme={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ ALL FUNDING OPTIONS ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/4 blur-[100px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          {(query !== '' || type !== 'All') && (
            <RevealOnScroll>
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                  <span className="w-6 h-px bg-blue" />
                  Filtered Results
                </span>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
                  {filtered.length} matching scheme{filtered.length === 1 ? '' : 's'}
                </h2>
              </div>
            </RevealOnScroll>
          )}

          {filtered.length > 0 ? (
            <div
              data-funding-grid
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((s, i) => (
                <FundingCard key={s.slug} scheme={s} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-blue" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                No funding schemes found
              </h3>
              <p className="text-sm text-graphite mb-6 max-w-md mx-auto">
                Try a different search term or clear the filters.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setType('All');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm font-semibold hover:bg-graphite transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          <RevealOnScroll>
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="bg-white border border-line rounded-2xl p-6 text-center">
                <p className="text-[12px] text-muted leading-relaxed">
                  <strong className="text-graphite font-semibold">Important:</strong> Funding is
                  subject to scheme criteria, evaluation, lender assessment and government
                  decisions. CertWinX provides professional assistance only. Always refer to the
                  official source for the latest information.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="bg-[#0A0F1F] rounded-3xl p-8 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/20 blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/15 blur-[80px]" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                  <Sparkles size={11} className="text-blue" />
                  Free Eligibility Check
                </span>

                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
                  Not sure which funding fits your business?
                </h3>
                <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
                  Answer 3 quick questions and get personalised funding recommendations.
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check My Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton href={getWhatsAppLink()} variant="outline" size="lg">
                    WhatsApp Us
                  </MagneticButton>
                </div>

                <p className="mt-6 text-xs text-white/40">
                  Takes ~60 seconds · No advance professional fees*
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/* ============ HIGHLIGHT CARD (Navy) ============ */
function HighlightCard({ scheme, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const setRotX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const setRotY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 1000 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRotY(px * 5);
      setRotX(-py * 4);
    };
    const onLeave = () => {
      setRotX(0);
      setRotY(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Link
      to={`/schemes/${scheme.slug}`}
      className="group block h-full will-change-transform"
    >
      <div
        ref={cardRef}
        className="relative h-full bg-[#0A0F1F] rounded-3xl p-7 overflow-hidden border border-blue/20 hover:border-blue/50 transition-all duration-500 hover:shadow-[0_30px_60px_-25px_rgba(23,105,255,0.5)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue/20 border border-blue/40 text-[9px] font-bold tracking-[0.15em] text-blue uppercase">
            <Sparkles size={9} />
            Popular
          </span>
        </div>

        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue/20 blur-[60px] pointer-events-none group-hover:bg-blue/30 transition-colors duration-500" />

        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-wide text-white/90 uppercase">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue/15 border border-blue/30 text-[10px] font-bold tracking-wide text-blue uppercase">
              {scheme.supportType}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-white leading-tight mb-3 group-hover:text-blue transition-colors duration-500">
            {scheme.name}
          </h3>

          <div className="flex items-start gap-2 mb-5">
            <Landmark size={12} className="text-blue/60 mt-0.5 shrink-0" />
            <p className="text-[11px] text-white/60 line-clamp-1">{scheme.ministry}</p>
          </div>

          <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mb-6">
            {scheme.description}
          </p>

          {scheme.keyBenefits?.[0] && (
            <div className="mb-6 p-3 rounded-xl bg-blue/8 border border-blue/20">
              <p className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase mb-1">
                Key Benefit
              </p>
              <p className="text-xs text-white/85 leading-relaxed line-clamp-1">
                {scheme.keyBenefits[0]}
              </p>
            </div>
          )}

          <div className="pt-5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/40 tabular">{scheme.lastVerified}</span>
              {scheme.status === 'Active' && (
                <span className="flex items-center gap-1 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </span>
              )}
            </div>
            <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={14} strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============ FUNDING CARD (Navy flip to white on hover) ============ */
function FundingCard({ scheme, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const setRotX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const setRotY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 1000 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRotY(px * 6);
      setRotX(-py * 5);
    };
    const onLeave = () => {
      setRotX(0);
      setRotY(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Link
      to={`/schemes/${scheme.slug}`}
      className="group block h-full will-change-transform"
    >
      <div
        ref={cardRef}
        className="relative h-full rounded-3xl p-6 overflow-hidden transition-all duration-500 will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          background: '#0F172A',
          boxShadow: '0 20px 40px -20px rgba(15, 23, 42, 0.35)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.boxShadow = '0 30px 60px -20px rgba(23,105,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0F172A';
          e.currentTarget.style.boxShadow = '0 20px 40px -20px rgba(15, 23, 42, 0.35)';
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`fund-grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#fund-grid-${index})`} />
        </svg>

        <div className="relative">

          {/* Tags */}
          <div className="flex flex-wrap items-start gap-2 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-blue/15 border border-blue/30 text-[10px] font-bold tracking-wide text-blue uppercase">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-wide text-white/90 uppercase group-hover:bg-ink/5 group-hover:border-ink/10 group-hover:text-graphite transition-colors duration-500">
              {scheme.supportType}
            </span>
            {scheme.status === 'Active' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-[10px] font-bold tracking-wide text-green-400 uppercase ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold leading-tight mb-3 text-white group-hover:text-ink transition-colors duration-500">
            {scheme.name}
          </h3>

          {/* Ministry */}
          <div className="flex items-start gap-2 mb-5">
            <Landmark size={12} className="text-white/50 group-hover:text-muted mt-0.5 shrink-0 transition-colors duration-500" />
            <p className="text-[11px] text-white/60 group-hover:text-muted line-clamp-1 transition-colors duration-500">
              {scheme.ministry}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed line-clamp-3 mb-6 text-white/60 group-hover:text-graphite transition-colors duration-500">
            {scheme.description}
          </p>

          {/* Footer */}
          <div className="pt-5 border-t border-white/10 group-hover:border-line transition-colors duration-500 flex items-center justify-between">
            <span className="text-[10px] tabular text-white/40 group-hover:text-muted transition-colors duration-500">
              Last verified: {scheme.lastVerified}
            </span>
            <span className="shrink-0 w-9 h-9 rounded-full border border-white/15 group-hover:border-blue group-hover:bg-blue flex items-center justify-center text-white/60 group-hover:text-white transition-all duration-500 group-hover:rotate-45">
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue to-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </Link>
  );
}