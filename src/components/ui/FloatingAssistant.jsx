import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  X,
  ChevronRight,
  Sparkles,
  Building2,
  Percent,
  Landmark,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Rocket,
  Coins,
  Scale,
  Award,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';

/* 9 Standardized Consultation Services */
const SERVICES = [
  {
    id: 'incorp',
    title: 'Company Incorporation',
    short: 'Pvt Ltd & LLP Setup',
    icon: Building2,
    authority: 'Ministry of Corporate Affairs (MCA)',
    timeline: '3–5 Business Days',
    desc: 'Determining optimal legal entity (Pvt Ltd / LLP / OPC), name reservation via SPICe+, DIN/DSC, PAN, TAN & corporate bank account.',
    checklist: ['Director PAN & Aadhaar KYC', 'Registered Office Electricity Bill', 'NOC from Property Owner', 'Digital Signature Certificates (DSC)'],
    benefit: 'Sovereign Corporate Identity & Full Limited Liability Protection',
    link: '/services/private-limited-company',
  },
  {
    id: 'dpiit',
    title: 'Startup India & DPIIT',
    short: 'DPIIT Sovereign Recognition',
    icon: Rocket,
    authority: 'Department for Promotion of Industry and Internal Trade',
    timeline: '5–10 Business Days',
    desc: 'Structuring innovation scalability dossiers and filing on Startup India NSWS portal to secure official DPIIT Certificate.',
    checklist: ['Certificate of Incorporation', 'Pitch Deck / Business Model Description', 'Proof of Innovation / Scalability', 'Director Profile & Website/App Link'],
    benefit: '80% Patent Fee Rebate, Self-Certification under Labour Laws, GeM Tender Relaxations',
    link: '/services/dpiit-recognition',
  },
  {
    id: '80iac',
    title: 'Section 80-IAC Tax Holiday',
    short: '100% Tax Exemption',
    icon: Percent,
    authority: 'Inter-Ministerial Board (IMB / DPIIT)',
    timeline: '3–6 Months',
    desc: 'Preparation of 40+ page technical novelty dossier and innovation defense for 100% deduction on operational profits for 3 consecutive years.',
    checklist: ['Audited Financial Statements (up to 3 yrs)', 'Video Pitch Walkthrough (Novelty Demo)', '40+ Page Technical Architecture Dossier', 'IMB Board Questionnaire Response'],
    benefit: 'Zero Corporate Income Tax for 3 Out of 10 Consecutive Years',
    link: '/eligibility/80-iac',
  },
  {
    id: 'grants',
    title: 'Government Grants',
    short: 'NIDHI & Technology Grants',
    icon: Sparkles,
    authority: 'DST, MeitY & BIRAC',
    timeline: '30–60 Days',
    desc: 'Filing for central technology grants including DST NIDHI-PRAYAS (up to ₹10L prototype grant), BIRAC BIG, and MeitY TIDE 2.0.',
    checklist: ['DPIIT Recognition Certificate', 'Detailed Project Report (DPR)', 'Proof of Concept / Prototype Demo', 'Incubator Presentation Deck'],
    benefit: '100% Non-Dilutive Capital (0% Equity Dilution)',
    link: '/funding',
  },
  {
    id: 'seed-funding',
    title: 'Credit Guarantees (CGSS & CGTMSE)',
    short: 'CGSS Collateral-Free Loans',
    icon: Coins,
    authority: 'National Credit Guarantee Trustee Company (NCGTC)',
    timeline: '45–90 Days',
    desc: 'Collateral-free venture lending up to ₹10 Crore under Credit Guarantee Scheme for Startups (CGSS) backed by sovereign risk cover.',
    checklist: ['DPIIT Certificate', 'Audited Balance Sheets', 'Bank CMA Data & Project Projections', 'Sanction Letter from Scheduled Bank / AIF'],
    benefit: 'Up to ₹10 Crore Loan Without Pledging Personal Real Estate',
    link: '/funding',
  },
  {
    id: 'msme',
    title: 'MSME & Udyam Registration',
    short: 'Udyam & ZED Subsidies',
    icon: Award,
    authority: 'Ministry of MSME',
    timeline: '24–48 Hours',
    desc: 'Permanent sovereign MSME status, collateral-free priority bank credit under CGTMSE up to ₹5 Cr, and PMEGP capital subsidies.',
    checklist: ['Enterprise PAN', 'Aadhaar of Authorized Signatory', 'GSTIN (if applicable)', 'Bank Account Details'],
    benefit: 'Priority Lending, Protection from Delayed Payments, 80% ZED Subsidy',
    link: '/msme',
  },
  {
    id: 'gst',
    title: 'GST & Corporate Compliance',
    short: 'GST, ROC & ITR Filings',
    icon: Scale,
    authority: 'CBIC & MCA',
    timeline: 'Monthly & Annual Schedules',
    desc: 'Monthly ITC reconciliation, GSTR-1 & 3B, Annual AOC-4 / MGT-7 secretarial governance, and Director DIR-3 KYC.',
    checklist: ['Bank Statements', 'Sales & Purchase Invoices', 'GSTR-2B ITC Data', 'Board Meeting & AGM Resolutions'],
    benefit: '100% Clean Due Diligence for Venture Capital Audits',
    link: '/services/pvt-ltd-annual-compliance',
  },
  {
    id: 'certifications',
    title: 'Business Certifications',
    short: 'ISO 9001, 27001 & FSSAI',
    icon: ShieldCheck,
    authority: 'NABCB / BIS / FSSAI',
    timeline: '7–14 Business Days',
    desc: 'Statutory quality, information security, and food safety certifications mandatory for government procurement and global SaaS clients.',
    checklist: ['Company Registration Proof', 'Process Flowchart / Scope Document', 'Premises Lease Agreement', 'Food Safety Plan (if FSSAI)'],
    benefit: 'Mandatory Tender Eligibility on Government e-Marketplace (GeM)',
    link: '/services/iso-9001',
  },
  {
    id: 'other',
    title: 'Other Strategic Advisory',
    short: 'Custom Statutory Consultation',
    icon: Landmark,
    authority: 'State & Central Government Bodies',
    timeline: 'Custom Scope',
    desc: 'Comprehensive diagnostic covering state industrial subsidies, GIFT City IFSCA structuring, cross-border IEC, and IPR rejoinders.',
    checklist: ['Current Statutory Profile', 'Problem Statement / Statutory Notice', 'Previous Filings (if any)', 'Key Strategic Objective'],
    benefit: 'Dedicated 1:1 Senior Statutory Counsel Alignment',
    link: '/contact',
  },
];

const STAGES = [
  'Idea / Not Registered Yet',
  'Newly Incorporated (< 1 Year)',
  'Operating & Generating Revenue',
  'Established Enterprise (Scaling)',
];

const SECTORS = [
  'Tech / AI / SaaS',
  'Fintech / BFSI',
  'Healthcare & BioTech',
  'CleanTech & EV',
  'Agritech / Food',
  'Manufacturing & MSME',
  'D2C / E-Commerce',
  'Services / Consulting',
];

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Service, 2: Collect Details, 3: Summary & Action
  const [selectedServiceId, setSelectedServiceId] = useState('incorp');
  const [stage, setStage] = useState(STAGES[0]);
  const [sector, setSector] = useState(SECTORS[0]);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const resetForm = () => {
    setStep(1);
    setSelectedServiceId('incorp');
    setStage(STAGES[0]);
    setSector(SECTORS[0]);
  };

  const handleServiceSelect = (id) => {
    setSelectedServiceId(id);
    setStep(2);
  };

  // Generate WhatsApp message based on selections
  const generateWhatsAppMessage = () => {
    const text = `Hello CertWinX Team,
I would like advisory guidance for my venture:
• Service Required: ${selectedService.title}
• Current Venture Stage: ${stage}
• Industry Sector: ${sector}

Please connect me with a Senior Statutory Analyst.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed bottom-18 right-4 lg:bottom-6 lg:right-6 z-[80] flex flex-col items-end">
      
      {/* ============ MULTI-STEP ADVISORY PANEL (Expanded) ============ */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="CertWinX Interactive Advisory Consultation"
          className="w-full sm:w-[420px] max-w-[calc(100vw-32px)] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-line flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-deepblue via-[#0d2860] to-[#081a42] p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue/20 border border-blue/40 flex items-center justify-center text-sky shrink-0 shadow-sm">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-display text-sm sm:text-base font-bold leading-tight flex items-center gap-2">
                  <span>CertWinX Advisory Desk</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-white/70">
                  Step {step} of 3 · Statutory & Schemes Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous step"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Advisory Assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-line w-full shrink-0">
            <div
              className="h-full bg-blue transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Scrollable Body Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
            
            {/* STEP 1: SELECT STATUTORY SERVICE */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="border-b border-line pb-2.5">
                  <span className="text-[10px] font-bold text-blue uppercase tracking-wider block">
                    Step 1 · Diagnostic Scope
                  </span>
                  <h5 className="font-display text-sm font-bold text-ink mt-0.5">
                    What does your venture need guidance on?
                  </h5>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {SERVICES.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleServiceSelect(s.id)}
                        className="group w-full flex items-center justify-between p-3 rounded-2xl border border-line hover:border-blue/50 hover:bg-canvas transition-all text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-blue/10 group-hover:bg-blue group-hover:text-white text-blue flex items-center justify-center transition-colors shrink-0">
                            <Icon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-ink group-hover:text-blue transition-colors truncate">
                              {s.title}
                            </p>
                            <p className="text-[10px] text-muted truncate">
                              {s.authority}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-muted group-hover:text-blue group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: VENTURE DETAILS & PARAMETERS */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="border-b border-line pb-2.5">
                  <span className="text-[10px] font-bold text-blue uppercase tracking-wider block">
                    Step 2 · Venture Parameters
                  </span>
                  <h5 className="font-display text-sm font-bold text-ink mt-0.5">
                    {selectedService.title} Details
                  </h5>
                </div>

                {/* Question 1: Stage */}
                <div>
                  <label className="text-xs font-bold text-graphite block mb-2">
                    Current Entity Stage:
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {STAGES.map((st) => (
                      <button
                        key={st}
                        onClick={() => setStage(st)}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                          stage === st
                            ? 'bg-blue text-white border-blue shadow-xs'
                            : 'bg-canvas border-line text-graphite hover:border-blue/30'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2: Sector */}
                <div>
                  <label className="text-xs font-bold text-graphite block mb-2">
                    Primary Sector / Industry:
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-canvas border border-line text-xs font-semibold text-ink focus:outline-none focus:border-blue"
                  >
                    {SECTORS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => setStep(3)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue hover:bg-deepblue text-white text-xs font-bold shadow-md transition-all mt-4"
                >
                  <span>Generate Feasibility Brief</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* STEP 3: STATUTORY SUMMARY & ACTION */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="border-b border-line pb-2.5">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                    Step 3 · Statutory Advisory Brief
                  </span>
                  <h5 className="font-display text-base font-bold text-ink mt-0.5">
                    {selectedService.title}
                  </h5>
                </div>

                {/* Service Overview Box */}
                <div className="p-3.5 bg-canvas rounded-2xl border border-line/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted font-semibold">Expected Timeline:</span>
                    <span className="font-bold text-deepblue bg-blue/10 px-2.5 py-0.5 rounded-full border border-blue/20">
                      {selectedService.timeline}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted font-semibold">Nodal Authority:</span>
                    <span className="font-semibold text-ink text-right max-w-[200px] truncate">
                      {selectedService.authority}
                    </span>
                  </div>

                  <p className="text-[11px] text-graphite leading-relaxed pt-1 border-t border-line/60">
                    {selectedService.desc}
                  </p>
                </div>

                {/* Key Sovereign Benefit */}
                <div className="p-3 rounded-xl bg-sky/20 border border-sky/30">
                  <span className="text-[9px] font-bold text-deepblue uppercase tracking-wider block mb-1">
                    Key Statutory Privilege Unlocked:
                  </span>
                  <p className="text-xs font-bold text-ink leading-snug">
                    {selectedService.benefit}
                  </p>
                </div>

                {/* Mandatory Document Checklist Preview */}
                <div>
                  <span className="text-[10px] font-bold text-graphite uppercase tracking-wider block mb-2">
                    Key Required Documents Checklist:
                  </span>
                  <div className="space-y-1.5">
                    {selectedService.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-graphite bg-white p-2 rounded-xl border border-line/60">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/918128931029?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <MessageCircle size={15} />
                    <span>Connect on WhatsApp with Brief</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <Link
                      to={selectedService.link}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center py-2.5 px-3 rounded-xl bg-white border border-line hover:border-blue/40 text-xs font-semibold text-graphite hover:text-ink transition-colors"
                    >
                      Service Scope
                    </Link>
                    <Link
                      to="/eligibility"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center py-2.5 px-3 rounded-xl bg-blue text-white hover:bg-deepblue text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Full Audit</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Reset button */}
                <div className="text-center pt-1">
                  <button
                    onClick={resetForm}
                    className="text-[11px] font-semibold text-muted hover:text-blue inline-flex items-center gap-1"
                  >
                    <RotateCcw size={11} />
                    <span>Start New Inquiry</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Helpline */}
          <div className="px-4 py-2.5 bg-canvas border-t border-line text-[10px] text-center text-muted shrink-0 flex items-center justify-between">
            <span>Direct Phone: <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="font-bold text-ink hover:text-blue">{PHONE_NUMBER}</a></span>
            <span className="text-emerald-600 font-bold">Ahmedabad Head Office</span>
          </div>

        </div>
      )}

      {/* ============ FLOATING LAUNCHER BUTTON (Collapsed Default) ============ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-deepblue text-white shadow-xl hover:bg-blue hover:shadow-2xl hover:scale-103 transition-all duration-200 border border-white/20 cursor-pointer min-h-[44px]"
        aria-label="Toggle CertWinX Statutory Advisory Assistant"
        aria-expanded={isOpen}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky" />
        </span>
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? 'Close Advisory Desk' : 'Advisory Desk | Need Help?'}
        </span>
        <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
          <MessageCircle size={12} className="text-sky" />
        </div>
      </button>

    </div>
  );
}
