import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../motion/MagneticButton';
import { SERVICES } from '../../data/services';
import { gsap } from '../../lib/gsap';

const FEATURED = SERVICES.filter((s) =>
  [
    'private-limited-company',
    'llp-registration',
    'startup-india-dpiit',
    'section-80-iac',
    'udyam-msme',
    'gst-registration',
    'fssai-registration',
    'iso-certification',
  ].includes(s.slug)
);

/* ============ COLOR MAP ============ */
const COLOR_MAP = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-600',   glow: 'rgba(37,99,235,0.25)' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', glow: 'rgba(147,51,234,0.25)' },
  green:  { bg: 'bg-green-50',  text: 'text-green-600',  glow: 'rgba(22,163,74,0.25)' },
  gold:   { bg: 'bg-amber-50',  text: 'text-amber-600',  glow: 'rgba(217,119,6,0.25)' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', glow: 'rgba(234,88,12,0.25)' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', glow: 'rgba(79,70,229,0.25)' },
  red:    { bg: 'bg-red-50',    text: 'text-red-600',    glow: 'rgba(220,38,38,0.25)' },
  teal:   { bg: 'bg-teal-50',   text: 'text-teal-600',   glow: 'rgba(13,148,136,0.25)' },
};

/* ============ SINGLE CARD ============ */
function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);

  const Icon = service.icon;
  const colors = COLOR_MAP[service.color] || COLOR_MAP.blue;

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const icon = iconRef.current;
    if (!card || !glow || !icon) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const setGlowX = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3.out' });
    const setGlowY = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3.out' });
    const setRotX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3.out' });
    const setRotY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3.out' });

    gsap.set(card, { transformPerspective: 1200 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGlowX(x - 60);
      setGlowY(y - 60);
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      setRotY(px * 6);
      setRotX(-py * 5);
    };

    const onEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(card, { y: -6, scale: 1.015, duration: 0.4, ease: 'power3.out' });
      gsap.to(icon, { rotate: 45, scale: 1.1, duration: 0.5, ease: 'back.out(2)' });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
      gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
      setRotX(0);
      setRotY(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block h-full"
      data-fcard
    >
      <div
        ref={cardRef}
        className="relative h-full bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(23,105,255,0.25)] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cursor-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-[120px] h-[120px] rounded-full opacity-0 will-change-transform"
          style={{
            background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue/0 via-blue/0 to-gold/0 group-hover:from-blue/5 group-hover:to-gold/5 transition-all duration-700 rounded-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Top row: ICON + INDEX + ARROW */}
          <div className="flex items-start justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5">
              {/* Icon-as-logo */}
              <div
                className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
              >
                {Icon && <Icon size={18} strokeWidth={2} />}
              </div>

              {/* Index */}
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase tabular">
                {String(index + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
              </span>
            </div>

            {/* Arrow */}
            <span
              ref={iconRef}
              className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-colors duration-500 will-change-transform"
            >
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue transition-colors duration-500">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-[12px] sm:text-[13px] text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
            {service.short}
          </p>

          {/* Category pill */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-gray-100 group-hover:bg-blue/10 group-hover:text-blue border border-transparent group-hover:border-blue/20 text-[9px] font-bold tracking-[0.15em] text-gray-600 uppercase transition-all duration-500">
              {service.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============ MAIN SECTION ============ */
export default function FeaturedServices() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-fcard]', {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('[data-heading]', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-white py-14 sm:py-18 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div data-heading className="flex flex-wrap items-end justify-between gap-6 mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="Signature Services"
            title="Assistance, structured end-to-end."
            subtitle="Registrations, certifications, startup benefits, funding and compliance — one partner, one process."
          />
          <MagneticButton to="/services" variant="outline" size="md">
            View All Services <ArrowUpRight size={14} />
          </MagneticButton>
        </div>

        {/* GRID — Chhota + Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          {FEATURED.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}