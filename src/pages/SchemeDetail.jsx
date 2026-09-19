import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, MessageCircle, AlertCircle } from 'lucide-react';
import SplitTextReveal from '../components/motion/SplitTextReveal';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import LeadForm from '../components/ui/LeadForm';
import { getSchemeBySlug, SCHEMES } from '../data/schemes';
import { getWhatsAppLink } from '../lib/constants';

export default function SchemeDetail() {
  const { slug } = useParams();
  const s = getSchemeBySlug(slug);
  if (!s) return <Navigate to="/schemes" replace />;
  const related = SCHEMES.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{s.name} — CertWinX</title>
        <meta name="description" content={s.description} />
      </Helmet>

      <section className="pt-40 pb-16 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <Link to="/schemes" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink transition-colors mb-8">
            <ArrowLeft size={14} /> Back to schemes
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-blue-soft text-blue-deep border border-blue/20 text-[10px] font-medium tracking-wide uppercase">
              {s.category}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gold-soft text-gold-deep border border-gold/25 text-[10px] font-medium tracking-wide uppercase">
              {s.supportType}
            </span>
          </div>
          <SplitTextReveal
            as="h1"
            trigger="mount"
            className="font-display text-display-lg font-semibold text-ink leading-[1.02] max-w-4xl text-balance"
          >
            {s.name}
          </SplitTextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="mt-6 text-sm text-graphite">{s.ministry}</p>
            <p className="mt-6 text-lg text-graphite leading-relaxed max-w-3xl">{s.description}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Check My Eligibility <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton to="/consultation" variant="outline" size="lg">
                Request Expert Review
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink(s.name)} variant="whatsapp" size="lg">
                <MessageCircle size={15} /> WhatsApp
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-section bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-14">
            <Block title="Who may be eligible" items={s.whoMayBeEligible} />
            <Block title="Key benefits" items={s.keyBenefits} tone="green" />

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink mb-5">Eligibility criteria</h2>
              <div className="bg-paper border border-line rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-canvas">
                    <tr>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-[0.15em]">Parameter</th>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted uppercase tracking-[0.15em]">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.eligibility.map((e, i) => (
                      <tr key={i} className="border-t border-line">
                        <td className="px-5 py-3 text-graphite">{e.parameter}</td>
                        <td className="px-5 py-3 text-ink">{e.requirement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink mb-5">Documents required</h2>
              <ol className="space-y-3">
                {s.documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-4 bg-paper border border-line rounded-2xl p-5">
                    <span className="font-display text-sm text-muted shrink-0 tabular">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-graphite">{d}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink mb-5">Application process</h2>
              <ol className="space-y-3">
                {s.process.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 bg-paper border border-line rounded-2xl p-5">
                    <span className="font-display text-sm text-muted shrink-0 tabular">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-graphite">{p}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-paper border border-line rounded-2xl p-6">
              <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-2">Estimated timeline</p>
              <p className="text-sm text-ink">{s.timeline}</p>
            </div>

            <div className="bg-gold-soft/60 border border-gold/25 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle size={18} className="text-gold-deep mt-0.5 shrink-0" />
                <h3 className="font-display text-lg font-semibold text-ink">Important notes</h3>
              </div>
              <ul className="space-y-2 pl-7">
                {s.importantNotes.map((n, i) => (
                  <li key={i} className="text-sm text-graphite leading-relaxed">{n}</li>
                ))}
              </ul>
            </div>

            <div className="bg-paper border border-line rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-1">Official source</p>
                <p className="text-sm text-ink">{s.officialSource}</p>
                <p className="text-xs text-muted mt-1">Last verified: {s.lastVerified}</p>
              </div>
              <a
                href={s.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-ink hover:text-blue transition-colors"
              >
                Visit official site <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <LeadForm context={s.name} compact />
              {related.length > 0 && (
                <div className="bg-paper border border-line rounded-2xl p-6">
                  <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-4">Related schemes</p>
                  <ul className="space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link to={`/schemes/${r.slug}`} className="text-sm text-graphite hover:text-ink transition-colors">
                          → {r.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Block({ title, items, tone }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-5">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((x, i) => (
          <div key={i} className="flex items-start gap-3 bg-paper border border-line rounded-2xl p-5">
            <CheckCircle2 size={15} className={tone === 'green' ? 'text-green-600 mt-0.5 shrink-0' : 'text-blue mt-0.5 shrink-0'} />
            <span className="text-sm text-graphite">{x}</span>
          </div>
        ))}
      </div>
    </div>
  );
}