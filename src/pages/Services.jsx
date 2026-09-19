import { useEffect, useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUpRight,
  Sparkles,
  X,
  SlidersHorizontal,
  Building2,
  Rocket,
  Award,
  Landmark,
  FileCheck,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

/* ============ CATEGORY ICONS ============ */
const CATEGORY_ICONS = {
  All: SlidersHorizontal,
  Registration: Building2,
  'Government Registration': FileCheck,
  Startup: Rocket,
  Certification: Award,
  Funding: Landmark,
  Compliance: FileCheck,
};

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: '250+', label: 'Services' },
  { value: '160+', label: 'Schemes' },
  { value: '8,927+', label: 'Clients' },
  { value: '99%', label: 'Success' },
];

export default function Services() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const rootRef = useRef(null);

  // Filter services
  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      if (category !== 'All' && s.category !== category) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.short.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, category]);

  // GSAP animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Background glow drift
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

      // Grid shimmer
      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 10,
        ease: 'none',
        repeat: -1,
      });

      // Live pulse
      gsap.to('[data-live-dot]', {
        scale: 1.6,
        opacity: 0.4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Floating particles
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

  // Animate card grid on filter change
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const grid = document.querySelector('[data-services-grid]');
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: 'expo.out',
      }
    );
  }, [query, category]);

  return (
    <>
      <Helmet>
        <title>Services — CertWinX</title>
        <meta
          name="description"
          content="Explore CertWinX services across business registration, government registration, startup, certification, funding and compliance."
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

            {/* Badge */}
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                <span className="relative flex items-center justify-center w-2.5 h-2.5">
                  <span data-live-dot className="absolute inset-0 rounded-full bg-green-400/60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                Complete Service Directory
              </span>
            </RevealOnScroll>

            {/* Heading */}
            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                A directory of <span className="text-blue">assistance.</span>
              </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                Registrations, certifications, startup benefits, funding and compliance — structured
                for clarity across every stage of your business.
              </p>
            </RevealOnScroll>

            {/* Hero stats strip */}
            <RevealOnScroll delay={0.3}>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
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

          {/* Search bar */}
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
                placeholder="Search services, categories or keywords..."
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
              {SERVICE_CATEGORIES.map((cat) => {
                const active = category === cat;
                const Icon = CATEGORY_ICONS[cat] || FileCheck;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold tracking-wide uppercase transition-all duration-300 ${
                      active
                        ? 'bg-blue text-white border border-blue shadow-[0_10px_25px_-8px_rgba(22,131,255,0.6)]'
                        : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-blue/40'
                    }`}
                  >
                    <Icon size={12} strokeWidth={2.5} />
                    {cat}
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Results count */}
          <RevealOnScroll delay={0.2}>
            <div className="mt-6 text-center">
              <p className="text-xs text-white/50">
                Showing{' '}
                <span className="text-white font-bold">
                  {filtered.length}
                </span>{' '}
                {filtered.length === 1 ? 'service' : 'services'}
                {category !== 'All' && (
                  <>
                    {' '}
                    in <span className="text-blue font-bold">{category}</span>
                  </>
                )}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas overflow-hidden">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/4 blur-[100px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          {filtered.length > 0 ? (
            <div
              data-services-grid
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-blue" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                No services found
              </h3>
              <p className="text-sm text-graphite mb-6 max-w-md mx-auto">
                Try a different search term or clear the filters.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm font-semibold hover:bg-graphite transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="bg-white border border-line rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/10 blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/8 blur-[80px]" />

              <div className="relative">
                <Sparkles size={22} className="text-blue mx-auto mb-5" />
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-3">
                  Not sure which service you need?
                </h3>
                <p className="text-base text-graphite mb-7 max-w-xl mx-auto">
                  Take a 60-second eligibility check and get personalised recommendations.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check My Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton href={getWhatsAppLink()} variant="outline" size="lg">
                    WhatsApp Us
                  </MagneticButton>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/* ============ SERVICE CARD ============ */
function ServiceCard({ service, index }) {
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
      to={`/services/${service.slug}`}
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

          {/* Top row — index + arrow */}
          <div className="flex items-start justify-between mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase tabular">
              {String(index + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </span>
            <span className="shrink-0 w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 group-hover:rotate-45">
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </span>
          </div>

          {/* Category badge */}
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue/8 border border-blue/20 text-[10px] font-bold tracking-[0.15em] text-blue uppercase mb-4">
            {service.category}
          </span>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-ink leading-tight mb-3 group-hover:text-blue transition-colors duration-500">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-graphite leading-relaxed line-clamp-3 mb-6">
            {service.short}
          </p>

          {/* Bottom hint */}
          <div className="pt-5 border-t border-line flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.15em] text-muted uppercase group-hover:text-blue transition-colors">
              View Details
            </span>
            <ArrowUpRight
              size={14}
              className="text-muted group-hover:text-blue transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>

        {/* Bottom accent line */}
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue to-blue/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </Link>
  );
}