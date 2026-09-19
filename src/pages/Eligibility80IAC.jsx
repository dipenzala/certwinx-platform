import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import MagneticButton from '../components/motion/MagneticButton';

const STEPS = [
  {
    id: 'dpiit',
    icon: ShieldCheck,
    question: 'Is your startup DPIIT recognised?',
    subtitle: 'Section 80-IAC requires DPIIT recognition as a prerequisite.',
    field: 'dpiit',
    options: [
      { value: 'yes', label: 'Yes, already recognised' },
      { value: 'no', label: 'No' },
      { value: 'not-sure', label: 'Not sure' },
    ],
  },
  {
    id: 'entityAge',
    icon: Clock,
    question: 'How old is your entity?',
    subtitle: 'Incorporation date matters for 80-IAC eligibility.',
    field: 'entityAge',
    options: [
      { value: 'less-than-10', label: 'Less than 10 years' },
      { value: 'more-than-10', label: 'More than 10 years' },
    ],
  },
  {
    id: 'turnover',
    icon: TrendingUp,
    question: 'Annual turnover in any financial year?',
    subtitle: 'The scheme has a turnover threshold of ₹200 crore.',
    field: 'turnover',
    options: [
      { value: 'below-200cr', label: 'Below ₹200 crore' },
      { value: 'above-200cr', label: 'Above ₹200 crore' },
    ],
  },
];

export default function Eligibility80IAC() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => !!answers[current.field];

  const handleSelect = (value) => setAnswers({ ...answers, [current.field]: value });

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      sessionStorage.setItem(
        'certwinx_eligibility',
        JSON.stringify({ ...answers, _flow: '80-iac' })
      );
      nav('/eligibility/results');
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <>
      <Helmet>
        <title>Section 80-IAC Eligibility — CertWinX</title>
        <meta
          name="description"
          content="Quick 3-step Section 80-IAC eligibility check for DPIIT-recognised startups."
        />
      </Helmet>

      <section className="relative min-h-screen pt-32 pb-20 bg-canvas overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-gold/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-blue/10 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-10">

          {/* Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-line text-[10px] font-bold tracking-[0.2em] text-ink/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Section 80-IAC · Tax Benefit
            </span>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-gold-deep uppercase">
                Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-muted font-medium">~45 seconds</span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-[#B8974F] rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Icon + Question */}
          <div key={step} className="animate-[fadeUp_0.6s_cubic-bezier(0.19,1,0.22,1)]">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/25 flex items-center justify-center mb-6">
              <current.icon size={22} className="text-gold-deep" />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.1] mb-3">
              {current.question}
            </h1>
            <p className="text-base text-graphite mb-10">{current.subtitle}</p>

            {/* Options */}
            <div className="space-y-3">
              {current.options.map((opt) => {
                const selected = answers[current.field] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border text-[15px] font-semibold min-h-[60px] transition-all duration-300 flex items-center justify-between gap-4 group ${
                      selected
                        ? 'border-gold bg-gradient-to-r from-gold to-[#B8974F] text-ink shadow-[0_15px_30px_-12px_rgba(215,173,99,0.5)]'
                        : 'border-line bg-white text-ink hover:border-gold/40 hover:bg-gold/5'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selected ? 'border-ink bg-ink' : 'border-line group-hover:border-gold/40'
                      }`}
                    >
                      {selected && <Check size={14} className="text-gold" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={back}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                step === 0
                  ? 'text-muted cursor-not-allowed'
                  : 'text-graphite hover:text-ink hover:bg-ink/5'
              }`}
            >
              <ArrowLeft size={15} /> Back
            </button>

            <MagneticButton
              onClick={next}
              variant="gold"
              size="lg"
              disabled={!canProceed()}
              className={!canProceed() ? 'opacity-40 pointer-events-none' : ''}
            >
              {step === STEPS.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight size={15} />
            </MagneticButton>
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-xs text-muted leading-relaxed text-center max-w-lg mx-auto">
            Approval for 80-IAC is subject to Inter-Ministerial Board review. CertWinX
            provides professional assistance only.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </>
  );
}