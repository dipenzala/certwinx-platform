import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import SplitTextReveal from '../components/motion/SplitTextReveal';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SERVICES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

const SLUGS = ['udyam-msme', 'nsic-spr', 'zed-certification', 'gem-registration', 'government-funding', 'project-reports'];
const AREAS = ['Udyam Registration', 'MSME Opportunities', 'Government Schemes', 'Credit Support', 'Certification', 'Procurement', 'Funding'];

export default function MSME() {
  const list = SERVICES.filter((s) => SLUGS.includes(s.slug));
  return (
    <>
      <Helmet><title>MSME — CertWinX</title></Helmet>

      <section className="pt-40 pb-16 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <span className="text-[10px] tracking-[0.25em] text-gold-deep uppercase">MSME Support</span>
          <SplitTextReveal as="h1" trigger="mount" className="mt-6 font-display text-display-lg font-semibold text-ink leading-[1.02] max-w-4xl text-balance">
            MSME opportunities, simplified.
          </SplitTextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="mt-8 text-lg text-graphite max-w-2xl leading-relaxed">
              Udyam registration, schemes, credit support, certification and procurement — professional assistance for micro, small and medium enterprises.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">Check MSME Opportunities <ArrowUpRight size={15} /></MagneticButton>
              <MagneticButton href={getWhatsAppLink('MSME support')} variant="whatsapp" size="lg"><MessageCircle size={15} /> WhatsApp</MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-section bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map((a, i) => (
              <RevealOnScroll key={a} delay={i * 0.05}>
                <div className="bg-canvas border border-line rounded-3xl p-6 h-full">
                  <CheckCircle2 size={17} className="text-gold mb-4" />
                  <h3 className="font-display text-base font-semibold text-ink mb-2">{a}</h3>
                  <p className="text-xs text-graphite leading-relaxed">Structured assistance for this area.</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-display-md font-semibold text-ink mb-12 max-w-3xl">Related services.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((s, i) => (
              <RevealOnScroll key={s.slug} delay={i * 0.05}>
                <Link to={`/services/${s.slug}`} className="block h-full group bg-paper border border-line rounded-3xl p-7 hover:border-ink/25 transition-colors">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-[10px] tracking-[0.2em] text-muted uppercase">{s.category}</span>
                    <ArrowUpRight size={17} className="text-muted group-hover:text-ink transition-all" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">{s.name}</h3>
                  <p className="text-sm text-graphite leading-relaxed">{s.short}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}