import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, CheckCircle2, ShieldCheck, Building2, Award, Landmark, TrendingUp } from 'lucide-react';
import SplitTextReveal from '../components/motion/SplitTextReveal';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SERVICES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

const SLUGS = [
  'udyam-msme',
  'nsic-spr',
  'zed-certification',
  'gem-registration',
  'government-funding',
  'project-reports',
];

const AREAS = [
  { title: 'Udyam Registration', desc: 'Mandatory MSME sovereign identity unlocking banking priority sector lending.' },
  { title: 'PMEGP Capital Subsidy', desc: 'Up to 35% margin money subsidy on projects up to ₹50 Lakhs.' },
  { title: 'CGTMSE Credit Guarantee', desc: 'Collateral-free business loans up to ₹5 Crore with sovereign cover.' },
  { title: 'ZED Quality Certification', desc: 'Up to 80% certification subsidy and 0.5% lower bank loan interest.' },
  { title: 'NSIC Single Point Registration', desc: 'Exemption from tender fees and Earnest Money Deposit (EMD).' },
  { title: 'GeM Portal Procurement', desc: 'Direct onboarding for 25% mandatory government procurement quotas.' },
];

export default function MSME() {
  const list = SERVICES.filter((s) => SLUGS.includes(s.slug));

  return (
    <>
      <Helmet>
        <title>MSME Support, Schemes & Certifications — CertWinX</title>
        <meta
          name="description"
          content="Empowering Indian MSMEs with Udyam registration, PMEGP subsidies, CGTMSE collateral-free loans, ZED certifications, and GeM procurement access."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 lg:pt-44 pb-16 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-4">
            <Building2 size={13} className="text-blue" />
            Micro, Small & Medium Enterprises Desk
          </span>

          <SplitTextReveal
            as="h1"
            trigger="mount"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.08] max-w-4xl text-balance"
          >
            MSME subsidies, certifications & credit facilities, structured.
          </SplitTextReveal>

          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-graphite max-w-2xl leading-relaxed">
              From Udyam registration and PMEGP capital subsidies to CGTMSE collateral-free loans, ZED certifications, and GeM tender onboarding.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Assess MSME Opportunities <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink('MSME advisory')} variant="whatsapp" size="lg">
                <MessageCircle size={15} /> WhatsApp MSME Desk
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Core Support Areas */}
      <section className="py-16 lg:py-24 bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
              <span className="w-5 h-px bg-blue" />
              Core Capabilities
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
              Priority MSME Schemes & Registrations
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((a, i) => (
              <RevealOnScroll key={a.title} delay={i * 0.04}>
                <div className="bg-white border border-line rounded-3xl p-6 h-full shadow-sm hover:border-blue/40 transition-colors">
                  <CheckCircle2 size={18} className="text-blue mb-3" />
                  <h3 className="font-display text-base font-bold text-ink mb-1.5">{a.title}</h3>
                  <p className="text-xs text-graphite leading-relaxed">{a.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Execution Services
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink">
                Related Advisory Services for MSMEs
              </h2>
            </div>
            <MagneticButton to="/services" variant="outline" size="md">
              Browse All Services <ArrowUpRight size={14} />
            </MagneticButton>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((s, i) => (
              <RevealOnScroll key={s.slug} delay={i * 0.04}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group block h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold uppercase">
                        {s.category}
                      </span>
                      <ArrowUpRight size={15} className="text-muted group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2 group-hover:text-blue transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed line-clamp-3 mb-4">
                      {s.short}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-line/60 text-xs font-bold text-blue">
                    View Requirements & Process →
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
