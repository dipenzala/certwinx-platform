import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Briefcase, Clock, Target } from 'lucide-react';
import MagneticButton from '../components/motion/MagneticButton';

const STEPS = [
  {
    id: 'businessType',
    icon: Briefcase,
    question: 'What is your business type?',
    subtitle: 'Choose the one that best matches you.',
    field: 'businessType',
    options: [
      { value: 'private-limited', label: 'Private Limited Company' },
      { value: 'llp', label: 'LLP' },
      { value: 'partnership', label: 'Partnership Firm' },
      { value: 'proprietorship', label: 'Proprietorship' },
      { value: 'not-registered', label: 'Not registered yet' },
    ],
  },
  {
    id: 'businessAge',
    icon: Clock,
    question: 'How old is your business?',
    subtitle: 'Approximate is fine.',
    field: 'businessAge',
    options: [
      { value: 'not-registered', label: 'Not started yet' },
      { value: 'less-than-2', label: 'Less than 2 years' },
      { value: '2-5', label: '2 – 5 years' },
      { value: '5-plus', label: '5 years or more' },
    ],
  },
  {
    id: 'support',
    icon: Target,
    question: 'What do you need help with?',
    subtitle: 'You can pick more than one.',
    field: 'support',
    multi: true,
    options: [
      { value: 'dpiit', label: 'DPIIT / Startup India recognition' },
      { value: '80-iac', label: 'Section 80-IAC tax benefit' },
      { value: 'funding', label: 'Government funding / schemes' },
      { value: 'certification', label: 'Certifications (ISO, ZED, etc.)' },
      { value: 'registration', label: 'Business registration (GST, Udyam)' },
      { value: 'not-sure', label: 'Not sure — need guidance' },
    ],
  },
];

export default function Eligibility() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelect, setMultiSelect] = useState([]);

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => {
    if (current.multi) return multiSelect.length > 0;
    return !!answers[current.field];
  };

  const handleSelect = (value) => {
    if (current.multi) {
      setMultiSelect((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setAnswers({ ...answers, [current.field]: value });
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const final = { ...answers, support: multiSelect };
      sessionStorage.setItem('certwinx_eligibility', JSON.stringify(final));
      nav('/eligibility/results');
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const isSelected = (value) => {
    if (current.multi) return multiSelect.includes(value);
    return answers[current.field] === value;
  };

  return (
    <>
      <Helmet>
        <title>Eligibility Checker — CertWinX</title>
        <meta
          name="description"
          content="Answer 3 simple questions and discover potential schemes and services relevant to your business."
        />
      </Helmet>

      <section className="relative min-h-screen pt-32 pb-20 bg-canvas overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-blue/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-gold/10 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-10">

          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-blue uppercase">
                Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-muted font-medium">
                ~60 seconds
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue to-deepblue rounded-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Icon + Question */}
          <div key={step} className="animate-[fadeUp_0.6s_cubic-bezier(0.19,1,0.22,1)]">
            <div className="w-14 h-14 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-6">
              <current.icon size={22} className="text-blue" />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.1] mb-3">
              {current.question}
            </h1>
            <p className="text-base text-graphite mb-10">{current.subtitle}</p>

            {/* Options */}
            <div className="space-y-3">
              {current.options.map((opt) => {
                const selected = isSelected(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border text-[15px] font-semibold min-h-[60px] transition-all duration-300 flex items-center justify-between gap-4 group ${
                      selected
                        ? 'border-blue bg-blue text-white shadow-[0_15px_30px_-12px_rgba(23,105,255,0.5)]'
                        : 'border-line bg-white text-ink hover:border-blue/40 hover:bg-blue/5'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selected ? 'border-white bg-white' : 'border-line group-hover:border-blue/40'
                      }`}
                    >
                      {selected && <Check size={14} className="text-blue" strokeWidth={3} />}
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
              variant="primary"
              size="lg"
              disabled={!canProceed()}
              className={!canProceed() ? 'opacity-40 pointer-events-none' : ''}
            >
              {step === STEPS.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight size={15} />
            </MagneticButton>
          </div>

          {/* Alternative: 80-IAC flow */}
          <div className="mt-12 pt-8 border-t border-line text-center">
            <p className="text-xs text-muted mb-3">Looking specifically for Section 80-IAC?</p>
            <a
              href="/eligibility/80-iac"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-deepblue transition-colors"
            >
              80-IAC Eligibility Check <ArrowRight size={13} />
            </a>
          </div>
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