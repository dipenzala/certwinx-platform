import { ArrowUpRight, MessageCircle } from 'lucide-react';
import SplitTextReveal from '../motion/SplitTextReveal';
import MagneticButton from '../motion/MagneticButton';
import RevealOnScroll from '../motion/RevealOnScroll';
import { getWhatsAppLink } from '../../lib/constants';

export default function FinalCTA() {
  return (
    <section className="relative py-section bg-canvas overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[420px] bg-gradient-to-r from-transparent via-blue/8 to-transparent blur-3xl pointer-events-none" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
        <RevealOnScroll>
          <span className="inline-block text-[10px] tracking-[0.3em] text-muted uppercase mb-6">
            Ready When You Are
          </span>
        </RevealOnScroll>

        <SplitTextReveal
          as="h2"
          className="font-display text-display-lg font-semibold text-ink leading-[1.02] text-balance max-w-4xl mx-auto"
        >
          Let's find out what your business may be eligible for.
        </SplitTextReveal>

        <RevealOnScroll delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton to="/eligibility" variant="primary" size="lg">
              Check My Eligibility <ArrowUpRight size={15} />
            </MagneticButton>
            <MagneticButton to="/consultation" variant="outline" size="lg">
              Talk to an Expert
            </MagneticButton>
            <MagneticButton href={getWhatsAppLink()} variant="whatsapp" size="lg">
              <MessageCircle size={15} /> WhatsApp
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}