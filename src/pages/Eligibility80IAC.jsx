import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Clock, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import MagneticButton from '../components/motion/MagneticButton';
import EligibilityLeadForm from '../components/eligibility/EligibilityLeadForm';

const STEPS = [
  {
    id: 'dpiit',
    icon: ShieldCheck,
    question: 'Is your startup recognized by DPIIT?',
    subtitle: 'Section 80-IAC statutory tax deduction strictly requires a valid DPIIT Certificate of Recognition.',
    field: 'dpiit',
    options: [
      { value: 'yes', label: 'Yes, actively recognised by DPIIT', desc: 'Hold official DPIIT certificate with DIPP number' },
      { value: 'in-progress', label: 'Application submitted / In progress', desc: 'Awaiting final scrutiny clearance from Startup India' },
      { value: 'no', label: 'No, not recognized yet', desc: 'CertWinX assists in securing DPIIT recognition prior to 80-IAC filing' },
    ],
  },
  {
    id: 'entityType',
    icon: Building2,
    question: 'What is your corporate entity structure?',
    subtitle: 'Under Section 80-IAC of the Income Tax Act, 1961, only specific entity types qualify.',
    field: 'entityType',
    options: [
      { value: 'private-limited', label: 'Private Limited Company (Pvt Ltd)', desc: 'Fully eligible under Section 80-IAC provisions' },
      { value: 'llp', label: 'Limited Liability Partnership (LLP)', desc: 'Fully eligible under Section 80-IAC provisions' },
      { value: 'proprietorship-partnership', label: 'Partnership Firm or Sole Proprietorship', desc: 'Statutorily ineligible (must convert to Pvt Ltd/LLP to claim)' },
    ],
  },
  {
    id: 'entityAge',
    icon: Clock,
    question: 'When was your entity incorporated?',
    subtitle: 'Must be incorporated on or after 1st April 2016 and within 10 years of operations.',
    field: 'entityAge',
    options: [
      { value: 'after-2016', label: 'Incorporated on or after 1st April 2016 (Under 10 years)', desc: 'Compliant with statutory incorporation window' },
      { value: 'before-2016', label: 'Incorporated before 1st April 2016', desc: 'Outside statutory window for Section 80-IAC' },
      { value: 'older-than-10', label: 'More than 10 years since incorporation', desc: 'Ceases to be a startup under DPIIT gazette notification' },
    ],
  },
  {
    id: 'turnover',
    icon: TrendingUp,
    question: 'What is your total annual turnover?',
    subtitle: 'Aggregate annual turnover must not have exceeded ₹200 Crore in any financial year since incorporation.',
    field: 'turnover',
    options: [
      { value: 'below-200cr', label: 'Below ₹200 Crore in all prior financial years', desc: 'Fully compliant with Section 80-IAC statutory ceiling' },
      { value: 'above-200cr', label: 'Exceeded ₹200 Crore in any financial year', desc: 'Exceeds statutory turnover cap' },
    ],
  },
  {
    id: 'innovation',
    icon: Sparkles,
    question: 'Does your business have demonstrable innovation or scalability?',
    subtitle: 'The Inter-Ministerial Board (IMB) evaluates whether your product/service has technical differentiation, IP, or employment potential.',
    field: 'innovation',
    options: [
      { value: 'patented-tech', label: 'Patented technology / Proprietary software IP', desc: 'Highest probability of IMB board approval' },
      { value: 'innovative-process', label: 'Innovative business model with scalable software', desc: 'Requires structured technical justification dossier' },
      { value: 'traditional', label: 'Standard commercial or trading operations', desc: 'Requires strategic repositioning around technology' },
    ],
  },
];

export default function Eligibility80IAC() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showForm, setShowForm] = useState(false);

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => !!answers[current.field];

  const handleSelect = (value) => setAnswers({ ...answers, [current.field]: value });

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      sessionStorage.setItem('certwinx_80iac_answers', JSON.stringify(answers));
      setShowForm(true);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFormSuccess = () => {
    nav('/eligibility/results');
  };

  const handleFormBack = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <>
        <Helmet>
          <title>Section 80-IAC Assessment Report — CertWinX</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <EligibilityLeadForm
          eligibilityData={{
            type: answers.entityType === 'private-limited' ? 'Private Limited Company' : 'LLP',
            age: answers.entityAge,
            support: 'Section 80-IAC 100% Tax Holiday Audit',
            turnover: answers.turnover,
            dpiit: answers.dpiit,
            innovation: answers.innovation,
          }}
          onSuccess={handleFormSuccess}
          onBack={handleFormBack}
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Section 80-IAC Tax Exemption Audit — CertWinX</title>
        <meta
          name="description"
          content="Assess your startup's eligibility for 3-Year 100% Corporate Income Tax Exemption under Section 80-IAC with CertWinX."
        />
      </Helmet>

      <section className="relative min-h-screen pt-32 pb-20 bg-canvas overflow-hidden">
        {/* Soft enterprise glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-line text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              Statutory Tax Incentive · Section 80-IAC
            </span>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-blue uppercase">
                Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-muted font-medium">~60 seconds audit</span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue to-deepblue rounded-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Icon + Question */}
          <div key={step} className="animate-[fadeUp_0.5s_cubic-bezier(0.19,1,0.22,1)]">
            <div className="w-14 h-14 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-6">
              <current.icon size={22} className="text-blue" />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.1] mb-3">
              {current.question}
            </h1>
            <p className="text-base text-graphite mb-8">{current.subtitle}</p>

            {/* Options */}
            <div className="space-y-3">
              {current.options.map((opt) => {
                const selected = answers[current.field] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 group ${
                      selected
                        ? 'border-blue bg-blue text-white shadow-[0_15px_30px_-12px_rgba(28,131,243,0.4)]'
                        : 'border-line bg-white text-ink hover:border-blue/40 hover:bg-blue/5'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="font-semibold text-[15px] leading-tight mb-1">{opt.label}</div>
                      {opt.desc && (
                        <div className={`text-xs ${selected ? 'text-white/80' : 'text-graphite'}`}>
                          {opt.desc}
                        </div>
                      )}
                    </div>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selected ? 'border-white bg-white text-blue' : 'border-line group-hover:border-blue/40'
                      }`}
                    >
                      {selected && <Check size={14} className="text-blue" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={back}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                step === 0 ? 'text-muted cursor-not-allowed opacity-50' : 'text-graphite hover:text-ink hover:bg-ink/5'
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
              {step === STEPS.length - 1 ? 'Unlock Tax Audit Results' : 'Next Step'}
              <ArrowRight size={15} />
            </MagneticButton>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
