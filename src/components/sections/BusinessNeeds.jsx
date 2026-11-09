import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, Building2, BadgeCheck, Search, Landmark, Rocket, ClipboardCheck, Sparkles,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import RevealOnScroll from '../motion/RevealOnScroll';
import { gsap } from '../../lib/gsap';

const NEEDS = [
  {
    icon: Building2,
    title: 'Company & LLP Registration',
    desc: 'Incorporate Private Limited, LLP, OPC or Partnership with ROC compliance and statutory registrations.',
    path: '/services',
    tag: 'Foundation',
  },
  {
    icon: Rocket,
    title: 'Startup India & DPIIT',
    desc: 'DPIIT recognition certificate, IPR fee rebates, tender exemptions and fast-tracked statutory benefits.',
    path: '/startup',
    tag: 'Recognition',
  },
  {
    icon: Landmark,
    title: 'Section 80-IAC Tax Exemption',
    desc: '3-year 100% tax holiday dossier preparation and coordination before the Inter-Ministerial Board.',
    path: '/services/section-80-iac',
    tag: 'Tax Holiday',
  },
  {
    icon: Search,
    title: 'Government Schemes Discovery',
    desc: 'Intelligent mapping of 16+ Central & State grant, subsidy and collateral-free loan programs.',
    path: '/schemes',
    tag: 'Intelligence',
  },
  {
    icon: Landmark,
    title: 'Grants & Credit Guarantees',
    desc: 'DST NIDHI prototyping grants, credit guarantees (CGSS up to ₹10 Cr), and institutional debt.',
    path: '/funding',
    tag: 'Capital',
  },
  {
    icon: BadgeCheck,
    title: 'MSME & Quality Certifications',
    desc: 'Udyam MSME, ISO 9001/27001, MSME ZED Certification, GeM Portal seller onboarding and compliance.',
    path: '/certifications',
    tag: 'Accreditation',
  },
];

function NeedCard({ need }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const Icon = need.icon;

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onEnter = () => {
      gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { rotate: -6, scale: 1.08, duration: 0.3, ease: 'back.out(2)' });
    };

    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3, ease: 'power3.out' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Link to={need.path} className="block h-full group">
      <div
        ref={cardRef}
        className="relative h-full rounded-3xl bg-paper border border-line p-7 lg:p-8 shadow-card hover:shadow-card-hover hover:border-blue/30 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Top Row: Icon + Tag + Arrow */}
          <div className="flex items-start justify-between mb-8">
            <div
              ref={iconRef}
              className="w-12 h-12 rounded-2xl bg-blue-soft border border-blue/20 text-blue flex items-center justify-center transition-colors duration-300 group-hover:bg-blue group-hover:text-white shrink-0"
            >
              <Icon size={22} strokeWidth={2} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider text-muted uppercase bg-canvas px-2.5 py-1 rounded-full border border-line">
                {need.tag}
              </span>
              <div className="w-8 h-8 rounded-full bg-canvas border border-line flex items-center justify-center text-graphite group-hover:text-blue group-hover:border-blue/30 transition-all">
                <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-ink leading-snug mb-3 group-hover:text-blue transition-colors">
            {need.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-graphite leading-relaxed">
            {need.desc}
          </p>
        </div>

        {/* Bottom Accent */}
        <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-blue group-hover:translate-x-1 transition-transform">
          <span>Explore Advisory Scope</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
}

export default function BusinessNeeds() {
  return (
    <section className="relative py-20 lg:py-28 bg-canvas border-b border-line">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Services Explorer"
          title="Tailored Solutions For Every Growth Stage"
          subtitle="From initial incorporation to DPIIT recognition, 80-IAC tax exemption, and government capital grants."
          align="center"
        />

        <div className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEEDS.map((need, i) => (
            <RevealOnScroll key={need.title} delay={i * 0.05}>
              <NeedCard need={need} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
