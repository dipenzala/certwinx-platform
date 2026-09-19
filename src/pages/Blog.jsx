import { Helmet } from 'react-helmet-async';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import RevealOnScroll from '../components/motion/RevealOnScroll';

const ARTICLES = [
  { slug: 'dpiit-recognition-guide', title: 'Understanding DPIIT Recognition for Startups', category: 'Startup', read: '5 min', excerpt: 'A general overview of what DPIIT recognition involves and why it matters.' },
  { slug: 'section-80-iac-overview', title: 'Section 80-IAC: A General Overview', category: 'Tax', read: '6 min', excerpt: 'The general framework of Section 80-IAC and its relevance for eligible startups.' },
  { slug: 'udyam-registration-benefits', title: 'Udyam Registration: What It Means for MSMEs', category: 'MSME', read: '4 min', excerpt: 'An overview of Udyam registration and associated benefits.' },
  { slug: 'iso-certification-basics', title: 'ISO Certification: The Basics', category: 'Certification', read: '5 min', excerpt: 'Introduction to ISO certification and business credibility.' },
  { slug: 'government-scheme-discovery', title: 'How to Approach Government Scheme Discovery', category: 'Government Schemes', read: '7 min', excerpt: 'Practical considerations when exploring schemes.' },
  { slug: 'business-compliance-calendar', title: 'Building a Business Compliance Calendar', category: 'Compliance', read: '5 min', excerpt: 'A general framework for organizing compliance requirements.' },
];

export default function Blog() {
  return (
    <>
      <Helmet><title>Blog — CertWinX</title></Helmet>
      <section className="pt-40 pb-16 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Blog" title="Articles and guides." subtitle="General informational articles about schemes, services and business topics." align="center" />
        </div>
      </section>
      <section className="pb-section bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARTICLES.map((a, i) => (
              <RevealOnScroll key={a.slug} delay={i * 0.05}>
                <article className="group h-full bg-paper border border-line rounded-3xl overflow-hidden hover:border-ink/25 transition-colors">
                  <div className="h-44 bg-gradient-to-br from-blue-soft to-gold-soft" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-blue-soft text-blue-deep border border-blue/20 text-[10px] font-medium uppercase tracking-wide">{a.category}</span>
                      <span className="text-[10px] text-muted">{a.read}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-ink mb-2 leading-tight">{a.title}</h3>
                    <p className="text-xs text-graphite leading-relaxed line-clamp-3">{a.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-medium text-graphite group-hover:text-ink transition-colors">
                      Read More <ArrowUpRight size={12} />
                    </span>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}