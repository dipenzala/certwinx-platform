import { useEffect, useRef } from 'react';
import {
  Users,
  FileCheck,
  Target,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import RevealOnScroll from '../motion/RevealOnScroll';
import { gsap } from '../../lib/gsap';

const ITEMS = [
  { icon: Users, title: 'Expert Assistance', desc: 'Professional guidance from experienced consultants.' },
  { icon: FileCheck, title: 'Documentation Support', desc: 'End-to-end preparation and review.' },
  { icon: Target, title: 'Eligibility Assessment', desc: 'Structured assessment against scheme criteria.' },
  { icon: ClipboardCheck, title: 'Application Guidance', desc: 'Support throughout the application process.' },
  { icon: Handshake, title: 'Dedicated Support', desc: 'A single point of contact for your requirements.' },
  { icon: ShieldCheck, title: 'Transparent Process', desc: 'Clear communication. No hidden surprises.' },
];

function WhyCard({ item, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);
  const Icon = item.icon;

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
    <RevealOnScroll delay={index * 0.05} className="h-full">
      <div
        ref={cardRef}
        className="group relative h-full rounded-3xl overflow-hidden transition-all duration-500 will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          background: '#0F172A',
          boxShadow: '0 20px 40px -20px rgba(15, 23, 42, 0.25)',
          padding: '1px', // for border effect
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.boxShadow = '0 30px 60px -20px rgba(23,105,255,0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0F172A';
          e.currentTarget.style.boxShadow = '0 20px 40px -20px rgba(15, 23, 42, 0.25)';
        }}
      >
        {/* Inner container — keeps rounded corners with border */}
        <div
          className="relative h-full rounded-[calc(1.5rem-1px)] overflow-hidden p-7 lg:p-9"
          style={{ background: 'inherit' }}
        >
          {/* Cursor-follow glow */}
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

          {/* Grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id={`why-grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#why-grid-${index})`} />
          </svg>

          {/* Icon */}
          <div
            ref={iconRef}
            className="relative w-11 h-11 rounded-2xl flex items-center justify-center border mb-6 transition-all duration-500 will-change-transform
              bg-white/10 border-white/15
              group-hover:bg-blue group-hover:border-blue"
          >
            <Icon
              size={18}
              strokeWidth={2.2}
              className="text-white group-hover:text-white transition-colors duration-500"
            />
          </div>

          {/* Title */}
          <h3 className="relative font-display text-lg font-bold leading-tight mb-2 transition-colors duration-500 text-white group-hover:text-ink">
            {item.title}
          </h3>

          {/* Description */}
          <p className="relative text-sm leading-relaxed transition-colors duration-500 text-white/60 group-hover:text-graphite">
            {item.desc}
          </p>

          {/* Bottom accent line */}
          <span className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 bg-gradient-to-r from-blue to-gold" />
        </div>
      </div>
    </RevealOnScroll>
  );
}

export default function WhyCertWinX() {
  return (
    <section className="relative py-20 lg:py-28 bg-paper border-y border-line overflow-hidden">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why CertWinX"
          title="Professional guidance. Transparent engagement."
          subtitle="We focus on clear communication, structured processes and genuine assistance."
          align="center"
        />

        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {ITEMS.map((item, i) => (
            <WhyCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Bottom USP ribbon */}
        <RevealOnScroll>
          <div className="mt-14 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-line shadow-[0_15px_30px_-15px_rgba(23,105,255,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <p className="text-sm font-bold text-ink">
                NO ADVANCE PROFESSIONAL FEES<span className="text-gold">*</span>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}