import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Landmark, Award, Receipt, FileText, ClipboardCheck, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import RevealOnScroll from '../components/motion/RevealOnScroll';

const CATS = [
  { icon: TrendingUp, label: 'Startup', desc: 'DPIIT, 80-IAC, seed fund and startup schemes.' },
  { icon: Shield, label: 'MSME', desc: 'Udyam, MSME schemes and support programs.' },
  { icon: Landmark, label: 'Government Schemes', desc: 'Central and state scheme discovery.' },
  { icon: TrendingUp, label: 'Funding', desc: 'Grants, loans, subsidies, credit guarantee.' },
  { icon: Award, label: 'Certification', desc: 'ISO, ZED, NSIC and other certifications.' },
  { icon: Receipt, label: 'Tax', desc: 'Tax benefits and compliance.' },
  { icon: FileText, label: 'Business Registration', desc: 'Company, LLP and other registrations.' },
  { icon: ClipboardCheck, label: 'Compliance', desc: 'Ongoing compliance and filings.' },
];

export default function Resources() {
  return (
    <>
      <Helmet><title>Resources — CertWinX</title></Helmet>
      <section className="pt-40 pb-16 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Resources" title="Guides, articles and resources." subtitle="Information to help you understand schemes, services and business requirements." align="center" />
        </div>
      </section>
      <section className="pb-section bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATS.map((c, i) => (
              <RevealOnScroll key={c.label} delay={i * 0.04}>
                <Link to="/blog" className="block h-full group bg-paper border border-line rounded-3xl p-7 hover:border-ink/25 transition-colors">
                  <div className="w-11 h-11 rounded-2xl bg-canvas border border-line flex items-center justify-center mb-6">
                    <c.icon size={17} className="text-ink" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink mb-2">{c.label}</h3>
                  <p className="text-xs text-graphite leading-relaxed mb-4">{c.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-graphite group-hover:text-ink transition-colors">
                    Browse <ArrowUpRight size={12} />
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}