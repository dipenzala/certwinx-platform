import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  BadgeCheck,
  Search,
  Landmark,
  Rocket,
  ClipboardCheck,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import RevealOnScroll from '../motion/RevealOnScroll';
import { gsap } from '../../lib/gsap';

const NEEDS = [
  {
    icon: Building2,
    title: 'Register My Business',
    desc: 'Company, LLP, OPC or proprietorship registration assistance.',
    path: '/services',
  },
  {
    icon: BadgeCheck,
    title: 'Get Government Certification',
    desc: 'ISO, ZED, NSIC, FSSAI and more.',
    path: '/certifications',
  },
  {
    icon: Search,
    title: 'Find a Government Scheme',
    desc: 'Discover schemes relevant to your profile.',
    path: '/schemes',
  },
  {
    icon: Landmark,
    title: 'Explore Funding',
    desc: 'Grants, loans, subsidies and credit guarantee.',
    path: '/funding',
  },
  {
    icon: Rocket,
    title: 'Get Startup Benefits',
    desc: 'DPIIT, 80-IAC, seed fund and startup schemes.',
    path: '/startup',
  },
  {
    icon: ClipboardCheck,
    title: 'Improve Business Compliance',
    desc: 'Ongoing compliance, filings and documentation.',
    path: '/services',
  },
];

/**
 * Card — navy base, white on hover (color inversion).
 */
function NeedCard({ need, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);
  const Icon = need.icon;

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const icon = iconRef.current;
    if (!card || !glow || !icon) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const setGlowX = gsap.quickTo(glow, 'x', { duration: 0.7, ease: 'power3.out' });
    const setGlowY = gsap.quickTo(glow, 'y', { duration: 0.7, ease: 'power3.out' });
    const setCardRotX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const setCardRotY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });

    gsap.set(card, { transformPerspective: 1000 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setGlowX(x - 80);
      setGlowY(y - 80);

      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      setCardRotY(px * 6);
      setCardRotX(-py * 5);
    };

    const onEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.5 });
      gsap.to(card, { scale: 1.02, duration: 0.5, ease: 'power2.out' });
      gsap.to(icon, { rotate: -8, scale: 1.08, duration: 0.5, ease: 'back.out(1.7)' });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.5 });
      gsap.to(card, { scale: 1, duration: 0.5 });
      setCardRotX(0);
      setCardRotY(0);
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
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
    <Link to={need.path} className="block h-full group">
      <div
        ref={cardRef}
        className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          // Navy base → white on hover
          background: '#0F172A',
          boxShadow: '0 20px 40px -20px rgba(15, 23, 42, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.boxShadow = '0 30px 60px -20px rgba(23,105,255,0.35)';
          e.currentTarget.style.border = '1px solid rgba(23,105,255,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0F172A';
          e.currentTarget.style.boxShadow = '0 20px 40px -20px rgba(15, 23, 42, 0.3)';
          e.currentTarget.style.border = '1px solid transparent';
        }}
      >
        {/* ============ CURSOR-FOLLOW GLOW ============ */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-[160px] h-[160px] rounded-full opacity-0 will-change-transform"
          style={{
            background:
              'radial-gradient(circle, rgba(23,105,255,0.35), rgba(23,105,255,0.15) 50%, transparent 75%)',
            filter: 'blur(20px)',
          }}
          aria-hidden="true"
        />

        {/* ============ GRID PATTERN (subtle) ============ */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`card-grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#card-grid-${index})`} />
        </svg>

        {/* ============ CONTENT ============ */}
        <div className="relative p-7 lg:p-9 z-10">

          {/* Icon + Arrow row */}
          <div className="flex items-start justify-between mb-12">

            {/* Icon container */}
            <div
              ref={iconRef}
              className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 will-change-transform
                bg-white/10 border-white/15
                group-hover:bg-blue group-hover:border-blue"
            >
              <Icon
                size={20}
                strokeWidth={2.2}
                className="text-white group-hover:text-white transition-colors duration-500"
              />
            </div>

            {/* Arrow */}
            <ArrowUpRight
              size={18}
              strokeWidth={2.2}
              className="text-white/60 group-hover:text-blue transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>

          {/* Title */}
          <h3 className="font-display text-xl lg:text-2xl font-bold leading-tight mb-3 text-white group-hover:text-ink transition-colors duration-500">
            {need.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed max-w-xs text-white/60 group-hover:text-graphite transition-colors duration-500">
            {need.desc}
          </p>
        </div>

        {/* ============ BOTTOM ACCENT LINE (on hover) ============ */}
        <span className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 bg-gradient-to-r from-blue to-gold" />
      </div>
    </Link>
  );
}

export default function BusinessNeeds() {
  return (
    <section className="relative py-20 lg:py-28 bg-canvas">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Get Started"
          title="What are you looking for?"
          subtitle="Choose a path and we will guide you through the relevant services, schemes and requirements."
          align="center"
        />

        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {NEEDS.map((need, i) => (
            <RevealOnScroll key={need.title} delay={i * 0.06}>
              <NeedCard need={need} index={i} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}