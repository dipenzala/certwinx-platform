import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Briefcase, Clock, Target, Layers, ShieldCheck } from 'lucide-react';
import MagneticButton from '../components/motion/MagneticButton';
import EligibilityLeadForm from '../components/eligibility/EligibilityLeadForm';

const STEPS = [
  {
    id: 'businessType',
    icon: Briefcase,
    question: 'What is your legal entity structure?',
    subtitle: 'Government schemes and tax holidays specify strict entity requirements.',
    field: 'businessType',
    options: [
      { value: 'private-limited', label: 'Private Limited Company (Pvt Ltd)', desc: 'Eligible for all DPIIT, 80-IAC, and institutional venture schemes' },
      { value: 'llp', label: 'Limited Liability Partnership (LLP)', desc: 'Eligible for DPIIT recognition, 80-IAC, and MSME benefits' },
      { value: 'partnership', label: 'Registered Partnership Firm', desc: 'Eligible for MSME, PMEGP, and select DPIIT recognitions' },
      { value: 'proprietorship', label: 'Sole Proprietorship', desc: 'Eligible for MSME Udyam, PMEGP, Mudra, and CGTMSE' },
      { value: 'not-registered', label: 'Not incorporated yet (Idea / Pre-seed)', desc: 'Eligible for NIDHI-PRAYAS, NIDHI-EIR, and PMEGP new units' },
    ],
  },
  {
    id: 'businessAge',
    icon: Clock,
    question: 'How long has your venture been incorporated?',
    subtitle: 'Age determines eligibility for startup status (up to 10 years) and seed grants (<2 years).',
    field: 'businessAge',
    options: [
      { value: 'not-registered', label: 'Idea Stage / Pre-incorporation', desc: 'Planning to incorporate or seeking incubation fellowship' },
      { value: 'less-than-2', label: 'Early Stage (Less than 2 years)', desc: 'Prime window for Startup India Seed Fund & prototype grants' },
      { value: '2-5', label: 'Growth Stage (2 to 5 years)', desc: 'Eligible for 80-IAC tax holiday, CGSS credit guarantee, and scaling' },
      { value: '5-plus', label: 'Mature / Established (5 to 10+ years)', desc: 'Eligible for CGTMSE, MSME ZED, and debt expansion facilities' },
    ],
  },
  {
    id: 'industry',
    icon: Layers,
    question: 'Which sector best describes your primary activity?',
    subtitle: 'Helps identify ministry-specific grant programs (DST, MeitY, BIRAC, MSME, Agri).',
    field: 'industry',
    options: [
      { value: 'technology', label: 'Software, SaaS, AI, FinTech & IT', desc: 'MeitY SAMRIDH, TIDE 2.0, DST NIDHI' },
      { value: 'manufacturing', label: 'Manufacturing, Hardware & Engineering', desc: 'NIDHI-PRAYAS, PMEGP, ZED Certification, CGTMSE' },
      { value: 'healthcare', label: 'Healthcare, MedTech & BioTech', desc: 'BIRAC BIG, DST Bio-incubators, NIDHI' },
      { value: 'agriculture', label: 'AgriTech, Food Processing & Rural', desc: 'RKVY-RAFTAAR, MoFPI, NABARD, PMEGP' },
      { value: 'cross-sector', label: 'Consumer, Services & Other Sectors', desc: 'Startup India, Section 80-IAC, Stand-Up India' },
    ],
  },
  {
    id: 'dpiit',
    icon: ShieldCheck,
    question: 'What is your DPIIT / Startup India status?',
    subtitle: 'DPIIT recognition is the foundational passport for startup tax holidays and grants.',
    field: 'dpiit',
    options: [
      { value: 'yes', label: 'Yes, actively recognised by DPIIT', desc: 'Hold official DPIIT DIPP number and certificate' },
      { value: 'in-progress', label: 'Application in progress / Under review', desc: 'Filing submitted on Startup India portal' },
      { value: 'planning', label: 'Not recognized yet, want to apply', desc: 'CertWinX assists in end-to-end documentation & filing' },
      { value: 'not-applicable', label: 'Not applicable (Traditional MSME / Sole Proprietor)', desc: 'Directly access MSME Udyam and bank guarantee schemes' },
    ],
  },
  {
    id: 'support',
    icon: Target,
    question: 'What are your primary business goals right now?',
    subtitle: 'Select all areas where you require specialized intelligence or execution support.',
    field: 'support',
    multi: true,
    options: [
      { value: 'dpiit', label: 'DPIIT / Startup India Recognition', desc: 'Official government certification and sovereign validation' },
      { value: '80-iac', label: 'Section 80-IAC 3-Year Tax Exemption', desc: '100% tax holiday on corporate profits via IMB board' },
      { value: 'funding', label: 'Government Grants & Seed Funding', desc: 'SISFS (₹20L-₹50L), NIDHI, BIRAC, and equity matching' },
      { value: 'credit', label: 'Collateral-Free Credit & Debt Guarantee', desc: 'CGSS (up to ₹10 Cr) and CGTMSE (up to ₹5 Cr)' },
      { value: 'certification', label: 'Quality & Tendering Certifications', desc: 'ISO 9001/27001, MSME ZED Bronze/Silver/Gold, NSIC' },
      { value: 'registration', label: 'Business Incorporation & Statutory Compliance', desc: 'Pvt Ltd, LLP, GST, Udyam, Trademark, and MCA filings' },
    ],
  },
];

export default function Eligibility() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelect, setMultiSelect] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
      const final = {
        ...answers,
        support: multiSelect,
      };
      sessionStorage.setItem('certwinx_eligibility', JSON.stringify(final));
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
    const supportLabels = {
      dpiit: 'DPIIT Recognition',
      '80-iac': 'Section 80-IAC Tax Exemption',
      funding: 'Government Grants & Seed Funding',
      credit: 'Collateral-Free Credit / Debt',
      certification: 'Certifications (ISO/ZED)',
      registration: 'Business Incorporation & Compliance',
    };

    const supportText = Array.isArray(multiSelect) && multiSelect.length > 0
      ? multiSelect.map((s) => supportLabels[s] || s).join(', ')
      : 'General Enterprise Advisory';

    const typeLabels = {
      'private-limited': 'Private Limited Company',
      llp: 'LLP',
      partnership: 'Partnership Firm',
      proprietorship: 'Proprietorship',
      'not-registered': 'Idea Stage / Unregistered',
    };

    const ageLabels = {
      'not-registered': 'Pre-incorporation / Idea',
      'less-than-2': 'Under 2 years',
      '2-5': '2 to 5 years',
      '5-plus': '5+ years',
    };

    return (
      <>
        <Helmet>
          <title>Access Your Eligibility Intelligence Report — CertWinX</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <EligibilityLeadForm
          eligibilityData={{
            type: typeLabels[answers.businessType] || answers.businessType || 'Not specified',
            age: ageLabels[answers.businessAge] || answers.businessAge || 'Not specified',
            support: supportText,
            businessType: answers.businessType,
            businessAge: answers.businessAge,
            industry: answers.industry,
            dpiit: answers.dpiit,
            supportList: multiSelect,
          }}
          onSuccess={handleFormSuccess}
          onBack={handleFormBack}
        />
      </>
    );
  }

  const isSelected = (value) => {
    if (current.multi) return multiSelect.includes(value);
    return answers[current.field] === value;
  };

  return (
    <>
      <Helmet>
        <title>Government Schemes & Tax Incentives Eligibility Checker — CertWinX</title>
        <meta
          name="description"
          content="Assess your enterprise eligibility across 18+ central and state schemes including Section 80-IAC, Startup India Seed Fund, and CGSS."
        />
      </Helmet>

      <section className="relative min-h-screen pt-32 pb-20 bg-canvas overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-10">

          {/* Progress Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-blue uppercase">
                Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-muted font-medium">
                ~90 seconds evaluation
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
                const selected = isSelected(opt.value);
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

          {/* Navigation Controls */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={back}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                step === 0
                  ? 'text-muted cursor-not-allowed opacity-50'
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
              {step === STEPS.length - 1 ? 'Analyze My Eligibility' : 'Next Step'}
              <ArrowRight size={15} />
            </MagneticButton>
          </div>

          {/* Dedicated Section 80-IAC Link */}
          <div className="mt-12 pt-8 border-t border-line text-center">
            <p className="text-xs text-muted mb-2">Looking exclusively for 3-Year 100% Tax Holiday?</p>
            <a
              href="/eligibility/80-iac"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-deepblue transition-colors"
            >
              Specialized Section 80-IAC Audit <ArrowRight size={13} />
            </a>
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
