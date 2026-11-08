import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BadgeCheck, AlertCircle, XCircle, RefreshCw, ArrowUpRight, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import SplitTextReveal from '../components/motion/SplitTextReveal';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { evaluateEligibility } from '../data/eligibilityRules';
import { getWhatsAppLink } from '../lib/constants';

export default function EligibilityResults() {
  const nav = useNavigate();
  const [results, setResults] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('certwinx_eligibility');
    const raw80iac = sessionStorage.getItem('certwinx_80iac_answers');

    let p = null;
    if (raw) {
      try { p = JSON.parse(raw); } catch (e) { p = null; }
    } else if (raw80iac) {
      try {
        const a = JSON.parse(raw80iac);
        p = {
          businessType: a.entityType || 'private-limited',
          businessAge: a.entityAge === 'after-2016' ? 'less-than-2' : '5-plus',
          dpiit: a.dpiit || 'yes',
          support: ['80-iac'],
        };
      } catch (e) { p = null; }
    }

    if (!p) {
      nav('/eligibility');
      return;
    }

    setProfile(p);
    setResults(evaluateEligibility(p));
  }, [nav]);

  if (!results || !profile) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-canvas">
        <div className="w-8 h-8 rounded-full border-2 border-blue border-t-transparent animate-spin" />
      </div>
    );
  }

  const labels = {
    businessType: 'Structure',
    businessAge: 'Stage / Age',
    industry: 'Sector Focus',
    dpiit: 'DPIIT Status',
    turnover: 'Turnover',
    support: 'Objective',
  };

  return (
    <>
      <Helmet>
        <title>Your Scheme & Incentive Intelligence Assessment — CertWinX</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Header */}
      <section className="pt-36 lg:pt-44 pb-12 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
              <ShieldCheck size={13} className="text-blue" />
              Verified Regulatory Intelligence Report
            </span>
          </RevealOnScroll>
          <SplitTextReveal
            as="h1"
            trigger="mount"
            className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.08] max-w-4xl text-balance"
          >
            Schemes, grants & statutory incentives identified for your venture.
          </SplitTextReveal>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-sm sm:text-base text-graphite max-w-3xl leading-relaxed">
              Based on your reported operational parameters, we evaluated your profile across 18+ central and state schemes. This preliminary intelligence report outlines potential matches and actionable preparation requirements.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Results Content */}
      <section className="pb-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Profile Overview Card */}
          <div className="bg-white border border-line rounded-3xl p-6 lg:p-8 mb-12 shadow-sm">
            <div className="flex items-center justify-between mb-5 border-b border-line pb-4">
              <p className="text-[11px] font-bold tracking-[0.2em] text-blue uppercase">
                Evaluated Venture Profile
              </p>
              <Link
                to="/eligibility"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-deepblue transition-colors"
              >
                <RefreshCw size={12} /> Re-evaluate Parameters
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(labels).map(([k, l]) => {
                const v = profile[k];
                if (!v) return null;
                const displayVal = Array.isArray(v)
                  ? v.join(', ').replace(/-/g, ' ')
                  : String(v).replace(/-/g, ' ');
                return (
                  <div key={k} className="p-3 bg-canvas/60 rounded-xl border border-line/60">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-1">{l}</p>
                    <p className="text-xs font-semibold text-ink capitalize truncate" title={displayVal}>
                      {displayVal}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 1: High Potential Matches */}
          <Group
            icon={BadgeCheck}
            tone="green"
            title="High Probability Opportunities"
            sub="Your venture profile aligns directly with the core eligibility parameters of these schemes."
            items={results.potentialMatches.map((r) => r.scheme)}
          />

          {/* Group 2: Schemes Requiring Additional Documentation */}
          <Group
            icon={AlertCircle}
            tone="blue"
            title="Conditional / Needs Additional Information"
            sub="These schemes may apply depending on sector-specific innovation proof or financial audit documentation."
            items={results.needsMoreInfo.map((r) => r.scheme)}
          />

          {/* Group 3: Currently Ineligible / Alternative Pathways */}
          <Group
            icon={XCircle}
            tone="slate"
            title="Currently Ineligible (Alternative Pathways Available)"
            sub="Does not match standard criteria under current parameters (e.g. requires conversion to Pvt Ltd or age extension)."
            items={results.likelyNotMatch.map((r) => r.scheme)}
            muted
          />

          {/* Consultation CTA Banner */}
          <div className="mt-16 bg-gradient-to-br from-deepblue via-[#12316e] to-[#0d224d] text-white rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-sky">
                Next Operational Step
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Request an Expert Statutory Audit & Filing Strategy
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
                Government schemes and Section 80-IAC applications require precise documentation structuring, pitch preparation, and statutory alignment. Our Ahmedabad advisory team reviews your complete filing readiness with zero guesswork.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton to="/consultation" variant="primary" size="lg">
                  Schedule Advisory Review <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton
                  href={getWhatsAppLink('my scheme eligibility assessment')}
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle size={15} /> WhatsApp Advisory Desk
                </MagneticButton>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

function Group({ icon: Icon, tone, title, sub, items, muted }) {
  if (!items || !items.length) return null;

  const toneStyles = {
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    blue: 'bg-blue/10 border-blue/25 text-blue',
    slate: 'bg-slate-100 border-slate-200 text-slate-600',
  };

  return (
    <div className={`mb-14 ${muted ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${toneStyles[tone]}`}>
          <Icon size={20} />
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">{title}</h2>
          <p className="text-xs sm:text-sm text-graphite mt-1">{sub}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((s, i) => (
          <RevealOnScroll key={s.slug} delay={i * 0.04}>
            <Link
              to={`/schemes/${s.slug}`}
              className="block h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 text-[10px] font-bold uppercase tracking-wider">
                  {s.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-canvas text-graphite border border-line text-[10px] font-semibold uppercase tracking-wider">
                  {s.supportType}
                </span>
              </div>

              <h3 className="font-display text-base font-bold text-ink mb-2 leading-snug group-hover:text-blue transition-colors">
                {s.name}
              </h3>

              {s.quantum && (
                <div className="text-[11px] font-semibold text-deepblue bg-sky/30 rounded-lg px-2.5 py-1 mb-3 inline-block">
                  {s.quantum}
                </div>
              )}

              <p className="text-xs text-graphite line-clamp-3 leading-relaxed mb-4">
                {s.description}
              </p>

              <div className="pt-3 border-t border-line/60 flex items-center justify-between text-[11px] font-bold text-blue">
                <span>View Full Scheme Dossier</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
