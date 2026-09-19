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

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: '160+', label: 'Schemes Mapped' },
  { value: '28+', label: 'States Covered' },
  { value: '₹500Cr+', label: 'Facilitated*' },
  { value: '99%', label: 'Success Ratio' },
];

/* ============ SUPPORT TYPE FILTERS ============ */
const SUPPORT_TYPES = [
  { value: 'All', label: 'All Types', icon: Filter },
  { value: 'Grant', label: 'Grant', icon: Award },
  { value: 'Loan', label: 'Loan', icon: Building2 },
  { value: 'Subsidy', label: 'Subsidy', icon: TrendingUp },
  { value: 'Credit Guarantee', label: 'Credit Guarantee', icon: ShieldCheck },
  { value: 'Seed Funding', label: 'Seed Funding', icon: Sparkles },
];

/* ============ FEATURED SCHEMES (top 3 for highlight) ============ */
const FEATURED_SLUGS = [
  'startup-india-seed-fund',
  'cgss',
  'pmegp',
];

export default function Schemes() {
  const [query, setQuery] = useState('');
  const [supportType, setSupportType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const rootRef = useRef(null);

  // Filter schemes
  const filtered = useMemo(() => {
    return SCHEMES.filter((s) => {
      if (supportType !== 'All' && s.supportType !== supportType) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q) ||
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

  // Animate cards on filter
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const grid = document.querySelector('[data-schemes-grid]');
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'expo.out' }
    );
  }, [query, supportType]);

  return (
    <>
      <Helmet>
        <title>Government Schemes — CertWinX</title>
        <meta
          name="description"
          content="Discover schemes, grants, subsidies, credit support and funding opportunities that may fit your business profile."
        />
      </Helmet>

      {/* ============ HERO ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 bg-[#0A0F1F] text-white overflow-hidden"
      >
        {/* Grid shimmer */}
        <div
          data-grid-shimmer
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(22,131,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '200% 100%, 64px 64px, 64px 64px',
          }}
        />

        {/* Glow blobs */}
        <div
          data-glow
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none"
        />
        <div
          data-glow
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none"
        />

        {/* Particles */}
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
                Live Government Scheme Directory
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                Discover schemes that may{' '}
                <span className="text-blue">fit your business.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                Search grants, loans, subsidies and credit support relevant to your business
                profile — verified against official sources.
              </p>
            </RevealOnScroll>

            {/* Stats strip */}
            <RevealOnScroll delay={0.3}>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-white tabular">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
                      {s.label}
                    </span>
                    {i < HERO_STATS.length - 1 && (
                      <span className="w-px h-5 bg-white/15 ml-4 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ SEARCH & FILTERS ============ */}
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
                placeholder="Search scheme, ministry, benefit, or keyword..."
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

          {/* Filter chips */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {SUPPORT_TYPES.map((t) => {
                const active = supportType === t.value;
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => setSupportType(t.value)}
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
                {supportType !== 'All' && (
                  <>
                    {' '}
                    of type <span className="text-blue font-bold">{supportType}</span>
                  </>
                )}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ FEATURED SCHEMES ============ */}
      {query === '' && supportType === 'All' && (
        <section className="relative py-16 lg:py-20 bg-canvas">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

            <RevealOnScroll>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                    <span className="w-6 h-px bg-blue" />
                    Most Relevant
                  </span>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
                    Featured schemes
                  </h2>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {featured.map((s, i) => (
                <FeaturedSchemeCard key={s.slug} scheme={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ ALL SCHEMES GRID ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/4 blur-[100px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section header (only when filters active) */}
          {(query !== '' || supportType !== 'All') && (
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
              data-schemes-grid
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((s, i) => (
                <SchemeCard key={s.slug} scheme={s} index={i} />
              ))}
            </div>
          ) : (
            /* Empty */
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-blue" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                No schemes found
              </h3>
              <p className="text-sm text-graphite mb-6 max-w-md mx-auto">
                Try a different search term or clear the filters.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSupportType('All');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm font-semibold hover:bg-graphite transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <RevealOnScroll>
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="bg-white border border-line rounded-2xl p-6 text-center">
                <p className="text-[12px] text-muted leading-relaxed">
                  <strong className="text-graphite font-semibold">Important:</strong> Scheme
                  information is provided for general informational purposes and is subject to
                  change. CertWinX provides professional assistance only. Final eligibility and
                  approval are determined by the relevant government authorities. Always refer to
                  the official source for the latest information.
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
                  Not sure which scheme fits your business?
                </h3>
                <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
                  Answer 3 quick questions and get personalised scheme recommendations.
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

/* ============ FEATURED SCHEME CARD ============ */
function FeaturedSchemeCard({ scheme, index }) {
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
        {/* Featured badge */}
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue/20 border border-blue/40 text-[9px] font-bold tracking-[0.15em] text-blue uppercase">
            <Sparkles size={9} />
            Featured
          </span>
        </div>

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue/20 blur-[60px] pointer-events-none group-hover:bg-blue/30 transition-colors duration-500" />

        <div className="relative">
          {/* Category + support type */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-wide text-white/90 uppercase">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue/15 border border-blue/30 text-[10px] font-bold tracking-wide text-blue uppercase">
              {scheme.supportType}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-white leading-tight mb-3 group-hover:text-blue transition-colors duration-500">
            {scheme.name}
          </h3>

          {/* Ministry */}
          <div className="flex items-start gap-2 mb-5">
            <Landmark size={12} className="text-blue/60 mt-0.5 shrink-0" />
            <p className="text-[11px] text-white/60 line-clamp-1">{scheme.ministry}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mb-6">
            {scheme.description}
          </p>

          {/* Key benefit */}
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

          {/* Footer */}
          <div className="pt-5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/40 tabular">
                {scheme.lastVerified}
              </span>
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

/* ============ REGULAR SCHEME CARD ============ */
function SchemeCard({ scheme, index }) {
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
        className="relative h-full bg-white border border-line rounded-3xl p-7 overflow-hidden transition-all duration-500 hover:border-blue/40 hover:shadow-[0_30px_60px_-25px_rgba(23,105,255,0.35)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top gradient on hover */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue/0 to-blue/0 group-hover:from-blue/8 transition-colors duration-500 pointer-events-none" />

        <div className="relative">

          {/* Tags row */}
          <div className="flex flex-wrap items-start gap-2 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-blue/8 border border-blue/20 text-[10px] font-bold tracking-wide text-blue uppercase">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-bold tracking-wide text-graphite uppercase">
              {scheme.supportType}
            </span>
            {scheme.status === 'Active' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold tracking-wide text-green-600 uppercase ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-ink leading-tight mb-3 group-hover:text-blue transition-colors duration-500">
            {scheme.name}
          </h3>

          {/* Ministry */}
          <div className="flex items-start gap-2 mb-5">
            <Landmark size={12} className="text-muted mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted line-clamp-1">{scheme.ministry}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-graphite leading-relaxed line-clamp-3 mb-6">
            {scheme.description}
          </p>

          {/* Footer */}
          <div className="pt-5 border-t border-line flex items-center justify-between">
            <span className="text-[10px] text-muted tabular">
              Last verified: {scheme.lastVerified}
            </span>
            <span className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 group-hover:rotate-45">
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue to-blue/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </Link>
  );
}