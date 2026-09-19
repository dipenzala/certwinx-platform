import { Helmet } from 'react-helmet-async';
import { FileCheck } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/motion/MagneticButton';

export default function CaseStudies() {
  return (
    <>
      <Helmet><title>Case Studies — CertWinX</title></Helmet>
      <section className="pt-40 pb-16 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Case Studies" title="Verified case studies." subtitle="We publish only genuine, verified case studies. No fabricated stories." align="center" />
        </div>
      </section>
      <section className="pb-section bg-canvas">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="bg-paper border border-line rounded-3xl p-10 lg:p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-canvas border border-line flex items-center justify-center mx-auto mb-6">
              <FileCheck size={22} className="text-ink" />
            </div>
            <h3 className="font-display text-xl font-semibold text-ink mb-3">Case studies coming soon</h3>
            <p className="text-sm text-graphite max-w-lg mx-auto mb-8">
              We only publish verified case studies. As we complete engagements and obtain client consent, we'll add them here.
            </p>
            <MagneticButton to="/contact" variant="primary">Talk to Us</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}