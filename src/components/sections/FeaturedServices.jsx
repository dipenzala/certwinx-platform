import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import HorizontalScroll from '../motion/HorizontalScroll';
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

/**
 * Single card with cursor-follow glow + hover effects.
 */
function ServiceCardMotion({ service, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const icon = iconRef.current;
    if (!card || !glow || !icon) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Smooth cursor follow
    const setGlowX = gsap.quickTo(glow, 'x', { duration: 0.7, ease: 'power3.out' });
    const setGlowY = gsap.quickTo(glow, 'y', { duration: 0.7, ease: 'power3.out' });

    const setCardRotX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const setCardRotY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });

    gsap.set(card, { transformPerspective: 1000 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Glow follows cursor
      setGlowX(x - 60);
      setGlowY(y - 60);

      // Subtle 3D tilt
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      setCardRotY(px * 6);
      setCardRotX(-py * 5);
    };

    const onEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.to(card, { scale: 1.015, duration: 0.5, ease: 'power2.out' });
      gsap.to(icon, { rotate: 45, duration: 0.6, ease: 'back.out(1.7)' });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.5 });
      gsap.to(card, { scale: 1, duration: 0.5 });
      setCardRotX(0);
      setCardRotY(0);
      gsap.to(icon, { rotate: 0, duration: 0.6, ease: 'power3.out' });
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
      className="group shrink-0 w-[78vw] sm:w-[420px] lg:w-[460px] block"
    >
      <div
        ref={cardRef}
        className="relative bg-canvas border border-line rounded-3xl p-8 lg:p-10 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-blue/40 hover:shadow-[0_30px_60px_-25px_rgba(23,105,255,0.35)] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ============ CURSOR-FOLLOW GLOW ============ */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-[120px] h-[120px] rounded-full opacity-0 will-change-transform"
          style={{
            background:
              'radial-gradient(circle, rgba(23,105,255,0.22), rgba(204,171,110,0.12) 50%, transparent 70%)',
            filter: 'blur(18px)',
          }}
          aria-hidden="true"
        />

        {/* Subtle gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue/0 via-blue/0 to-gold/0 group-hover:from-blue/5 group-hover:to-gold/5 transition-all duration-700" />

        {/* ============ CONTENT ============ */}
        <div className="relative z-10">
          {/* Top row — index + arrow */}
          <div className="flex items-start justify-between mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase tabular">
              {String(index + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
            </span>

            <span
              ref={iconRef}
              className="shrink-0 w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-colors duration-500 will-change-transform"
            >
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-4 leading-tight group-hover:text-blue transition-colors duration-500">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-graphite leading-relaxed mb-8 max-w-md">
            {service.short}
          </p>

          {/* Category pill */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-ink/5 group-hover:bg-blue/10 group-hover:text-blue border border-transparent group-hover:border-blue/20 text-[10px] font-bold tracking-[0.15em] text-graphite uppercase transition-all duration-500">
              {service.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedServices() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Card reveal on scroll
      gsap.from('[data-fcard]', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Signature Services"
            title="Assistance, structured end-to-end."
            subtitle="Registrations, certifications, startup benefits, funding and compliance — one partner, one process."
          />
          <MagneticButton to="/services" variant="outline" size="md">
            View All Services <ArrowUpRight size={14} />
          </MagneticButton>
        </div>
      </div>

      <HorizontalScroll className="pb-20 lg:pb-24">
        <div className="w-[6vw] shrink-0" />
        {FEATURED.map((s, i) => (
          <div key={s.slug} data-fcard>
            <ServiceCardMotion service={s} index={i} />
          </div>
        ))}
        <div className="w-[6vw] shrink-0" />
      </HorizontalScroll>
    </section>
  );
}