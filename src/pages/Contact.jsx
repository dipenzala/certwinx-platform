import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import LeadForm from '../components/ui/LeadForm';
import { SITE, getWhatsAppLink } from '../lib/constants';

/* ============ CONTACT METHODS ============ */
const CONTACT_METHODS = [
  {
    icon: Phone,
    label: 'Phone',
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
    description: 'Mon–Sat, 9:00 AM – 6:00 PM',
    tone: 'blue',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with our team',
    href: getWhatsAppLink(),
    description: 'Fastest response · Instant reply',
    tone: 'green',
    live: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    description: 'Response within 24 hours',
    tone: 'blue',
  },
];

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: 'Mon–Sat', label: 'Working Days' },
  { value: '9–6', label: 'Business Hours' },
  { value: '<24 hrs', label: 'Response Time' },
  { value: 'Pan-India', label: 'Service Area' },
];

/* ============ QUICK TOPICS ============ */
const TOPICS = [
  'Business Registration',
  'DPIIT / Startup India',
  'Section 80-IAC',
  'Government Schemes',
  'Funding Assistance',
  'Certifications',
  'Compliance',
  'General Enquiry',
];

export default function Contact() {
  const rootRef = useRef(null);

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

  return (
    <>
      <Helmet>
        <title>Contact — CertWinX</title>
        <meta
          name="description"
          content="Get in touch with CertWinX for assistance with registrations, certifications, government schemes, funding or compliance."
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
                We're Here to Help
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                Get in <span className="text-blue">touch.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                Reach out for assistance with registrations, certifications, schemes, funding or
                compliance — our team responds within 24 hours.
              </p>
            </RevealOnScroll>

            {/* Stats */}
            <RevealOnScroll delay={0.3}>
              <div className="inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-display text-lg font-bold text-white tabular">
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

      {/* ============ CONTACT METHODS ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          <RevealOnScroll>
            <div className="mb-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                <span className="w-6 h-px bg-blue" />
                Ways to Reach Us
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
                Choose how you'd like to connect.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTACT_METHODS.map((m, i) => (
              <ContactCard key={i} method={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ MAIN: FORM + OFFICE ============ */}
      <section className="relative py-16 lg:py-20 bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">

            {/* LEFT: Lead form */}
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                    <span className="w-6 h-px bg-blue" />
                    Send us a message
                  </span>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight mb-2">
                    Request Expert Review
                  </h2>
                  <p className="text-sm text-graphite">
                    Share your details and our team will get back to you within 24 hours.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <LeadForm />
              </RevealOnScroll>
            </div>

            {/* RIGHT: Office + Quick topics */}
            <div className="lg:col-span-5">
              <RevealOnScroll delay={0.2}>
                <div className="space-y-6">

                  {/* Office card */}
                  <div className="bg-[#0A0F1F] rounded-3xl p-7 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue/20 blur-[60px]" />
                    <div className="relative">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                          <MapPin size={20} className="text-blue" strokeWidth={2.2} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-1">
                            Office Address
                          </p>
                          <h3 className="font-display text-base font-bold text-white leading-tight">
                            CertWinX Private Limited
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed mb-6">
                        {SITE.address}
                      </p>

                      <div className="pt-5 border-t border-white/10 space-y-3">
                        <div className="flex items-center gap-3">
                          <Clock size={14} className="text-blue shrink-0" />
                          <span className="text-xs text-white/80">{SITE.hours}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone size={14} className="text-blue shrink-0" />
                          <a
                            href={`tel:${SITE.phone}`}
                            className="text-xs text-white/80 hover:text-white transition-colors"
                          >
                            {SITE.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail size={14} className="text-blue shrink-0" />
                          <a
                            href={`mailto:${SITE.email}`}
                            className="text-xs text-white/80 hover:text-white transition-colors break-all"
                          >
                            {SITE.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick topics */}
                  <div className="bg-white border border-line rounded-3xl p-6">
                    <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
                      Quick Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-blue/8 border border-blue/20 text-[11px] font-bold tracking-wide text-blue uppercase cursor-pointer hover:bg-blue hover:text-white transition-all duration-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Response guarantee */}
                  <div className="bg-white border border-line rounded-3xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                        <ShieldCheck size={16} className="text-green-600" strokeWidth={2.2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-green-600 uppercase mb-1">
                          24-Hour Response
                        </p>
                        <h3 className="font-display text-sm font-bold text-ink leading-tight">
                          We respond within 24 hours, on business days
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-graphite leading-relaxed">
                      Every enquiry is reviewed by our team and assigned to the right consultant
                      based on your requirement.
                    </p>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-gradient-to-br from-[#25D366] to-[#1FB855] rounded-3xl p-6 hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.5)] transition-all duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                          <MessageCircle size={22} className="text-white" strokeWidth={2.2} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-1">
                            Fastest Response
                          </p>
                          <p className="font-display text-base font-bold text-white">
                            WhatsApp Us Now
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="bg-[#0A0F1F] rounded-3xl p-8 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/20 blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/15 blur-[80px]" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                  <Sparkles size={11} className="text-blue" />
                  Or Start with Eligibility
                </span>

                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
                  Not sure what you need yet?
                </h3>
                <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
                  Take a 60-second eligibility check and get personalised recommendations.
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check My Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton to="/consultation" variant="outline" size="lg">
                    Book Consultation
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

/* ============ CONTACT CARD ============ */
function ContactCard({ method, index }) {
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

  const Icon = method.icon;
  const isGreen = method.tone === 'green';

  return (
    <a
      href={method.href}
      target={method.href.startsWith('http') ? '_blank' : undefined}
      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group block h-full will-change-transform"
    >
      <div
        ref={cardRef}
        className="relative h-full bg-white border border-line rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(23,105,255,0.35)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top gradient on hover */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue/0 to-blue/0 group-hover:from-blue/8 transition-colors duration-500 pointer-events-none" />

        <div className="relative">
          {/* Icon + arrow */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${
                isGreen
                  ? 'bg-green-500/10 border-green-500/20 group-hover:bg-green-500 group-hover:border-green-500'
                  : 'bg-blue/8 border-blue/20 group-hover:bg-blue group-hover:border-blue'
              }`}
            >
              <Icon
                size={20}
                strokeWidth={2.2}
                className={`transition-colors duration-500 ${
                  isGreen
                    ? 'text-green-600 group-hover:text-white'
                    : 'text-blue group-hover:text-white'
                }`}
              />
            </div>
            <span className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 group-hover:rotate-45">
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </span>
          </div>

          {/* Label */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
              {method.label}
            </p>
            {method.live && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold tracking-wide text-green-600 uppercase">
                  Live
                </span>
              </span>
            )}
          </div>

          {/* Value */}
          <h3 className="font-display text-lg font-bold text-ink leading-tight mb-3 group-hover:text-blue transition-colors duration-500 break-all">
            {method.value}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted leading-relaxed">
            {method.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <span
          className={`absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ${
            isGreen
              ? 'bg-gradient-to-r from-green-500 to-green-500/40'
              : 'bg-gradient-to-r from-blue to-gold'
          }`}
        />
      </div>
    </a>
  );
}