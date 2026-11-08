import { useEffect, useRef } from 'react';
import {
  Users, FileCheck, Target, ClipboardCheck, Handshake, ShieldCheck, Sparkles, CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import RevealOnScroll from '../motion/RevealOnScroll';
import { gsap } from '../../lib/gsap';

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Transparent Advisory',
    desc: 'Upfront feasibility evaluation before filing. We clearly explain eligibility hurdles, document gaps, and realistic timelines.',
  },
  {
    icon: FileCheck,
    title: 'Dossier & IP Preparation',
    desc: 'End-to-end documentation drafting, including business model scalability memos, IMB pitch decks, and ROC registers.',
  },
  {
    icon: Target,
    title: 'Multi-Scheme Intelligence',
    desc: 'Simultaneous evaluation across Startup India, DPIIT, Section 80-IAC, MSME Champions, and state subsidies.',
  },
  {
    icon: ClipboardCheck,
    title: 'Direct Portal Coordination',
    desc: 'Full assistance submitting through official government portals (Startup India, NSWS, Udyam, MCA21, IMB).',
  },
  {
    icon: Users,
    title: 'Dedicated Startup Consultants',
    desc: 'A single point of contact with domain expertise in corporate taxation, intellectual property, and government compliance.',
  },
  {
    icon: Handshake,
    title: 'Post-Recognition Support',
    desc: 'Ongoing advisory for annual ROC compliance, statutory audits, GeM onboarding, and certification renewals.',
  },
];

function WhyCard({ item }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const Icon = item.icon;

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onEnter = () => {
      gsap.to(card, { y: -3, duration: 0.25, ease: 'power2.out' });
      gsap.to(icon, { scale: 1.1, duration: 0.25, ease: 'back.out(2)' });
    };

    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' });
      gsap.to(icon, { scale: 1, duration: 0.25, ease: 'power3.out' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative h-full rounded-3xl bg-paper border border-line p-7 lg:p-8 shadow-card hover:shadow-card-hover hover:border-blue/30 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div
          ref={iconRef}
          className="w-12 h-12 rounded-2xl bg-blue-soft border border-blue/15 text-blue flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-blue group-hover:text-white shrink-0"
        >
          <Icon size={22} strokeWidth={2} />
        </div>

        <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-blue transition-colors">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-graphite leading-relaxed">
          {item.desc}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-1.5 text-xs text-blue font-medium">
        <CheckCircle2 size={13} className="text-emerald-500" />
        <span>Enterprise Standard Protocol</span>
      </div>
    </div>
  );
}

export default function WhyCertWinX() {
  return (
    <section className="relative py-20 lg:py-28 bg-paper border-b border-line overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why CertWinX"
          title="Professional Rigor. Transparent Engagement."
          subtitle="We eliminate bureaucracy and confusion with structured documentation, honest feasibility assessments, and dedicated specialist support."
          align="center"
        />

        <div className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.05}>
              <WhyCard item={item} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Advisory Assurance Banner */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-14 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-blue-soft border border-blue/20 shadow-sm text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs sm:text-sm font-bold text-blue-deep">
                NO ADVANCE PROFESSIONAL FEES FOR INITIAL ELIGIBILITY ASSESSMENT
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
