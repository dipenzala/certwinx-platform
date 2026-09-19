import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BadgeCheck, AlertCircle, XCircle, RefreshCw, ArrowUpRight, MessageCircle } from 'lucide-react';
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
    if (!raw) { nav('/eligibility'); return; }
    const p = JSON.parse(raw);
    setProfile(p);
    setResults(evaluateEligibility(p));
  }, [nav]);

  if (!results || !profile) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-ink border-t-transparent animate-spin" />
      </div>
    );
  }

  const labels = {
    profile: 'Profile', businessType: 'Type', businessAge: 'Age', turnover: 'Turnover',
    industry: 'Industry', support: 'Support', state: 'State', city: 'City',
    dpiit: 'DPIIT', womanEntrepreneur: 'Woman-led',
  };

  return (
    <>
      <Helmet><title>Eligibility Results — CertWinX</title><meta name="robots" content="noindex" /></Helmet>

      <section className="pt-40 pb-16 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <span className="text-[10px] tracking-[0.25em] text-muted uppercase">
              Eligibility Assessment
            </span>
          </RevealOnScroll>
          <SplitTextReveal
            as="h1"
            trigger="mount"
            className="mt-5 font-display text-display-lg font-semibold text-ink leading-[1.02] max-w-4xl text-balance"
          >
            Potential opportunities for your business.
          </SplitTextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="mt-8 text-sm text-graphite max-w-3xl leading-relaxed">
              This is a preliminary assessment based on the information you provided. It is not an
              official government eligibility result. Final eligibility is subject to applicable
              criteria, documentation and decisions of relevant authorities.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="bg-paper border border-line rounded-3xl p-6 lg:p-8 mb-14">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] tracking-[0.25em] text-muted uppercase">Your profile</p>
              <Link to="/eligibility" className="inline-flex items-center gap-1.5 text-xs font-medium text-graphite hover:text-ink transition-colors">
                <RefreshCw size={12} /> Edit
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {Object.entries(labels).map(([k, l]) => {
                const v = profile[k];
                if (!v) return null;
                return (
                  <div key={k}>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">{l}</p>
                    <p className="text-sm text-ink capitalize">{String(v).replace(/-/g, ' ')}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <Group
            icon={BadgeCheck}
            tone="green"
            title="Potential Match"
            sub="Based on your profile, these may be relevant."
            items={results.potentialMatches.map((r) => r.scheme)}
          />
          <Group
            icon={AlertCircle}
            tone="gold"
            title="Needs More Information"
            sub="More details may be needed to assess these."
            items={results.needsMoreInfo.map((r) => r.scheme)}
          />
          <Group
            icon={XCircle}
            tone="red"
            title="Likely Not a Match Based on Provided Information"
            sub="Based on your profile, these may not be relevant. Conditions may change."
            items={results.likelyNotMatch.map((r) => r.scheme)}
            muted
          />

          <div className="mt-16 bg-ink text-canvas rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-3">
              Want an expert to review your profile?
            </h3>
            <p className="text-sm text-canvas/70 max-w-xl mx-auto mb-8">
              Our team can review your details and guide you on documentation, process and next steps.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <MagneticButton to="/consultation" variant="gold" size="lg">
                Request Expert Review <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink('my eligibility results')} variant="whatsapp" size="lg">
                <MessageCircle size={15} /> WhatsApp
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Group({ icon: Icon, tone, title, sub, items, muted }) {
  if (!items.length) return null;
  const tones = {
    green: 'bg-green-500/10 border-green-500/25 text-green-700',
    gold: 'bg-gold-soft border-gold/30 text-gold-deep',
    red: 'bg-red-500/10 border-red-500/25 text-red-700',
  };
  return (
    <div className={`mb-14 ${muted ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${tones[tone]}`}>
          <Icon size={18} />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
          <p className="text-xs text-graphite mt-1">{sub}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((s, i) => (
          <RevealOnScroll key={s.slug} delay={i * 0.04}>
            <Link to={`/schemes/${s.slug}`} className="block h-full bg-paper border border-line rounded-3xl p-6 hover:border-ink/30 transition-colors duration-500">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-2.5 py-1 rounded-full bg-blue-soft text-blue-deep border border-blue/20 text-[10px] font-medium uppercase tracking-wide">{s.category}</span>
                <span className="px-2.5 py-1 rounded-full bg-gold-soft text-gold-deep border border-gold/25 text-[10px] font-medium uppercase tracking-wide">{s.supportType}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-ink mb-2 leading-tight">{s.name}</h3>
              <p className="text-xs text-graphite line-clamp-3 leading-relaxed">{s.description}</p>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}