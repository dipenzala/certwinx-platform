import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, MessageCircle, AlertCircle, XCircle, FileCheck, Landmark, Clock, ShieldCheck } from 'lucide-react';
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
        <title>{s.name} — Regulatory Intelligence & Eligibility | CertWinX</title>
        <meta name="description" content={s.description} />
      </Helmet>

      {/* Header Section */}
      <section className="pt-36 lg:pt-44 pb-14 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-graphite hover:text-blue transition-colors mb-6 uppercase tracking-wider"
          >
            <ArrowLeft size={13} /> Back to Schemes Intelligence Directory
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="px-3 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold tracking-wider uppercase">
              {s.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-deepblue/10 text-deepblue border border-deepblue/20 text-[10px] font-bold tracking-wider uppercase">
              {s.supportType}
            </span>
            {s.state && (
              <span className="px-3 py-1 rounded-full bg-canvas text-graphite border border-line text-[10px] font-semibold tracking-wider uppercase">
                {s.state}
              </span>
            )}
          </div>

          <SplitTextReveal
            as="h1"
            trigger="mount"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.08] max-w-4xl text-balance"
          >
            {s.name}
          </SplitTextReveal>

          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
              <Landmark size={14} className="text-blue" />
              {s.ministry}
            </p>
            {s.quantum && (
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky/30 border border-sky/40 text-xs font-bold text-deepblue">
                <span>Statutory Benefit Quantum:</span> {s.quantum}
              </div>
            )}
            <p className="mt-5 text-base sm:text-lg text-graphite leading-relaxed max-w-3xl">
              {s.description}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Assess Venture Eligibility <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton to="/consultation" variant="outline" size="lg">
                Request Statutory Review
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink(s.name)} variant="whatsapp" size="lg">
                <MessageCircle size={15} /> WhatsApp Desk
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Intelligence Body */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Who May Be Eligible */}
            <Block title="Target Beneficiaries & Eligibility Scope" items={s.whoMayBeEligible} />

            {/* Key Benefits */}
            <Block title="Statutory Benefits & Financial Assistance" items={s.keyBenefits} tone="green" />

            {/* Eligibility Criteria Matrix */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
                <ShieldCheck size={22} className="text-blue" />
                Eligibility Parameters Matrix
              </h2>
              <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-canvas border-b border-line">
                    <tr>
                      <th className="text-left px-5 py-3.5 text-[11px] font-bold text-muted uppercase tracking-[0.15em]">
                        Evaluation Parameter
                      </th>
                      <th className="text-left px-5 py-3.5 text-[11px] font-bold text-muted uppercase tracking-[0.15em]">
                        Mandatory Statutory Requirement
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {s.eligibility.map((e, i) => (
                      <tr key={i} className="hover:bg-canvas/40 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-graphite">{e.parameter}</td>
                        <td className="px-5 py-3.5 font-semibold text-ink">{e.requirement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disqualifiers / Exclusions */}
            {s.disqualifiers && s.disqualifiers.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
                  <XCircle size={22} className="text-rose-500" />
                  Statutory Disqualifiers & Ineligibility Conditions
                </h2>
                <div className="space-y-2.5">
                  {s.disqualifiers.map((d, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-rose-200 rounded-xl p-4">
                      <XCircle size={16} className="text-rose-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-graphite leading-relaxed">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Checklist */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
                <FileCheck size={22} className="text-blue" />
                Required Documentation Checklist
              </h2>
              <ol className="space-y-3">
                {s.documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-4 bg-white border border-line rounded-2xl p-4 sm:p-5 shadow-sm">
                    <span className="font-display text-xs font-bold text-blue shrink-0 tabular bg-blue/10 w-7 h-7 rounded-full flex items-center justify-center">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-ink pt-0.5">{d}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Application Workflow */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
                <Clock size={22} className="text-blue" />
                Step-by-Step Filing & Approval Workflow
              </h2>
              <ol className="space-y-3">
                {s.process.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 bg-white border border-line rounded-2xl p-4 sm:p-5 shadow-sm">
                    <span className="font-display text-xs font-bold text-deepblue shrink-0 tabular bg-deepblue/10 w-7 h-7 rounded-full flex items-center justify-center">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-graphite leading-relaxed pt-0.5">{p}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted uppercase font-bold mb-1">Estimated Processing Timeline</p>
                <p className="text-sm font-semibold text-ink">{s.timeline}</p>
              </div>
              <Clock size={24} className="text-blue/40" />
            </div>

            {/* Important Advisory Notes (Clean Blue, Zero Gold) */}
            <div className="bg-blue/5 border border-blue/20 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle size={20} className="text-blue mt-0.5 shrink-0" />
                <h3 className="font-display text-lg font-bold text-ink">Important Statutory & Advisory Notes</h3>
              </div>
              <ul className="space-y-2 pl-8">
                {s.importantNotes.map((n, i) => (
                  <li key={i} className="text-sm text-graphite leading-relaxed list-disc">{n}</li>
                ))}
              </ul>
            </div>

            {/* Official Source & Verification Link */}
            <div className="bg-white border border-line rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted uppercase font-bold mb-1">Official Government Nodal Authority</p>
                <p className="text-sm font-semibold text-ink">{s.officialSource}</p>
                <p className="text-xs text-muted mt-0.5">Intelligence Audit Verified: {s.lastVerified}</p>
              </div>
              <a
                href={s.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-canvas border border-line text-xs font-bold text-ink hover:text-blue hover:border-blue/40 transition-all"
              >
                Visit Official Government Portal <ExternalLink size={13} />
              </a>
            </div>

          </div>

          {/* Sticky Advisory Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <LeadForm context={`Scheme: ${s.name}`} compact />

              {related.length > 0 && (
                <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
                  <p className="text-[10px] tracking-[0.2em] text-blue font-bold uppercase mb-4">
                    Related Schemes in this Sector
                  </p>
                  <ul className="space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          to={`/schemes/${r.slug}`}
                          className="text-xs font-semibold text-graphite hover:text-blue transition-colors block line-clamp-1"
                        >
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
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-ink mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((x, i) => (
          <div key={i} className="flex items-start gap-3 bg-white border border-line rounded-2xl p-4 sm:p-5 shadow-sm">
            <CheckCircle2
              size={16}
              className={tone === 'green' ? 'text-emerald-600 mt-0.5 shrink-0' : 'text-blue mt-0.5 shrink-0'}
            />
            <span className="text-sm font-medium text-graphite leading-relaxed">{x}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
