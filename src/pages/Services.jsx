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
  Receipt,
  ShieldCheck,
  Scale,
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
  Tax: Receipt,
  Startup: Rocket,
  Licensing: ShieldCheck,
  IP: Scale,
  'Government Registration': FileCheck,
  Certification: Award,
  Funding: Landmark,
  Compliance: FileCheck,
};

/* ============ AUTHENTIC OPERATIONAL METRICS ============ */
const HERO_STATS = [
  { value: '25+', label: 'Service Verticals' },
  { value: '100+', label: 'Statutory Procedures' },
  { value: '100%', label: 'Procedural Transparency' },
  { value: '24h', label: 'Inquiry Response SLA' },
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

  // Animate card grid on filter change
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const grid = document.querySelector('[data-services-grid]');
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
      }
    );
  }, [query, category]);

  return (
    <>
      <Helmet>
        <title>Advisory & Compliance Services Directory — CertWinX</title>
        <meta
          name="description"
          content="Comprehensive business services directory covering business registration, DPIIT recognition, ISO & ZED certifications, government funding, and corporate compliance."
        />
      </Helmet>

      {/* ============ HERO SECTION (Enterprise Light-Blue) ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-16 bg-canvas overflow-hidden border-b border-line"
      >
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Service Directory Badge */}
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-6">
                <span className="relative flex items-center justify-center w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-blue animate-ping" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-blue" />
                </span>
                Corporate Advisory & Compliance Services
              </span>
            </RevealOnScroll>

            {/* Heading */}
            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                Specialized execution for registrations, certifications & growth.
              </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
                From company incorporation and DPIIT startup recognition to ISO standards, MSME ZED certifications, and corporate compliance — delivered with institutional precision.
              </p>
            </RevealOnScroll>

            {/* Operational Stats Strip */}
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
              placeholder="Search services by keyword, category, or requirement..."
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

          {/* Category filter chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SERVICE_CATEGORIES.map((cat) => {
              const active = category === cat;
              const Icon = CATEGORY_ICONS[cat] || FileCheck;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
                    active
                      ? 'bg-blue text-white shadow-sm'
                      : 'bg-white border border-line text-graphite hover:border-blue/40 hover:text-ink'
                  }`}
                >
                  <Icon size={13} />
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted">
              Displaying <span className="text-ink font-bold">{filtered.length}</span> services
              {category !== 'All' && <span> in <strong className="text-blue">{category}</strong></span>}
            </p>
          </div>

        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {filtered.length > 0 ? (
            <div
              data-services-grid
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-line max-w-lg mx-auto">
              <Search size={32} className="text-muted mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-ink mb-2">No services found</h3>
              <p className="text-xs text-graphite mb-6 px-6">
                Try searching with different terms or reset your filters.
              </p>
              <button
                onClick={() => { setQuery(''); setCategory('All'); }}
                className="px-5 py-2.5 rounded-full bg-blue text-white text-xs font-bold hover:bg-deepblue transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Advisory Callout */}
          <div className="mt-16 bg-white border border-line rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">
              Need assistance identifying the right compliance roadmap?
            </h3>
            <p className="text-sm text-graphite max-w-xl mx-auto mb-8">
              Speak directly with our Ahmedabad regulatory advisory team to assess your startup or MSME requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Check Scheme Eligibility <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink('services guidance')} variant="outline" size="lg">
                WhatsApp Advisory Desk
              </MagneticButton>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ============ SERVICE CARD COMPONENT ============ */
function ServiceCard({ service, index }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block h-full bg-white border border-line rounded-3xl p-7 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(28,131,243,0.18)] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top row: index + arrow */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase tabular">
            {String(index + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
          </span>
          <span className="shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all duration-300">
            <ArrowUpRight size={14} />
          </span>
        </div>

        {/* Category badge */}
        <span className="inline-block px-2.5 py-1 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-wider text-blue uppercase mb-3">
          {service.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-blue transition-colors">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-graphite leading-relaxed line-clamp-3 mb-6">
          {service.short}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-blue">
        <span>View Full Service Scope</span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </Link>
  );
}
