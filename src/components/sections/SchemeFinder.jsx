import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowUpRight, Landmark, MapPin,
  ShieldCheck, CheckCircle2, ChevronRight, Award, Layers
} from 'lucide-react';
import MagneticButton from '../motion/MagneticButton';

/* ============ STATE-SPECIFIC INTELLIGENCE DATA ============ */
const STATE_POLICIES = [
  {
    id: 'gujarat',
    state: 'Gujarat',
    short: 'GJ',
    nodal: 'i-Hub / Industries Commissionerate',
    policy: 'Student Startup & Innovation Policy (SSIP 2.0)',
    grant: 'Up to ₹30 Lakhs Project Grant',
    sustenance: '₹20,000/mo Sustenance (₹25k for Women Founders)',
    highlights: ['i-Hub Ahmedabad Incubation', '100% Patent Reimbursement up to ₹10L', 'Subsidized Co-working'],
    link: '/schemes/gujarat-startup-policy',
  },
  {
    id: 'maharashtra',
    state: 'Maharashtra',
    short: 'MH',
    nodal: 'Maharashtra State Innovation Society (MSInS)',
    policy: 'Maharashtra Innovative Startup Policy',
    grant: 'Up to ₹15 Lakhs Work Order Financial Assistance',
    sustenance: 'Quality Certification Reimbursement (80%)',
    highlights: ['Direct Government Pilot Orders', 'Patent Filing Reimbursement', 'Maharashtra FinTech Sandbox'],
    link: '/schemes',
  },
  {
    id: 'karnataka',
    state: 'Karnataka',
    short: 'KA',
    nodal: 'Department of Electronics, IT & Bt (KITS)',
    policy: 'Karnataka Startup Policy / ELEVATE 100',
    grant: 'Up to ₹50 Lakhs Idea2PoC Grant-in-Aid',
    sustenance: 'Incubation & Venture Funding Access',
    highlights: ['ELEVATE 100 Annual Pitch Competition', 'BioTech & DeepTech Centres of Excellence', 'Patent Cost Subsidy'],
    link: '/schemes',
  },
  {
    id: 'delhi',
    state: 'Delhi NCR',
    short: 'DL',
    nodal: 'Delhi Startup Policy Task Force',
    policy: 'Delhi Comprehensive Startup Policy',
    grant: 'Collateral-Free Seed Capital Assistance',
    sustenance: 'Subsidized Co-working & Fabrication Labs',
    highlights: ['Higher Education Incubation Network', 'IPR Filing Support', 'CleanTech & Urban Mobility Priority'],
    link: '/schemes',
  },
  {
    id: 'tamilnadu',
    state: 'Tamil Nadu',
    short: 'TN',
    nodal: 'StartupTN (TANSIM)',
    policy: 'Tamil Nadu Startup & Innovation Policy',
    grant: 'Up to ₹15 Lakhs TANSEED Seed Grant',
    sustenance: 'Smart Cards for Incubator Infrastructure',
    highlights: ['TANSEED Rolling Application Cycles', 'Regional Hubs across Tier-2/3 Cities', 'GreenTech & Social Impact Focus'],
    link: '/schemes',
  },
  {
    id: 'telangana',
    state: 'Telangana',
    short: 'TS',
    nodal: 'Telangana Innovation Cell / T-Hub',
    policy: 'Telangana Innovation & Startup Policy',
    grant: 'Matching Grants & Seed Capital Subsidies',
    sustenance: 'World-Class T-Hub & WE-Hub Acceleration',
    highlights: ['T-Hub 2.0 World Largest Incubation Campus', 'WE-Hub Women Incubation', 'TSIC Rural Innovation Grants'],
    link: '/schemes',
  },
];

export default function SchemeFinder() {
  const [selectedState, setSelectedState] = useState('gujarat');
  const currentState = STATE_POLICIES.find((s) => s.id === selectedState) || STATE_POLICIES[0];

  return (
    <section className="relative py-20 lg:py-28 bg-canvas border-b border-line overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky/20 blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue/5 blur-[120px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT: VALUE PROPOSITION */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-blue font-bold text-[11px] tracking-wider uppercase">
              <Sparkles size={13} className="text-blue" />
              Government Schemes Explorer
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ink leading-[1.08] tracking-tight text-balance">
              Not sure which <span className="text-blue">government scheme</span> fits your venture?
            </h2>

            <p className="text-base sm:text-lg text-graphite leading-relaxed">
              Central and State governments offer substantial non-dilutive grants, subsidies, 100% tax holidays, and credit guarantees. Our schemes intelligence platform maps your startup to verified opportunities across India.
            </p>

            {/* Feature Pills */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-ink">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Central Government Priority Schemes (SISFS, 80-IAC, CGSS, PMEGP)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-ink">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>State Innovation Policies with Sustenance Allowances & Incubator Grants</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-ink">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>100% Free Assessment with Rule-Based Criteria Validation</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Find My Schemes <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton to="/schemes" variant="outline" size="lg">
                Browse 18+ Directory
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE INDIA STATE & SCHEMES EXPLORER */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm">

              {/* Header: Selector Title */}
              <div className="flex items-center justify-between pb-5 border-b border-line mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue/10 flex items-center justify-center text-blue">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      State Startup Policies Explorer
                    </h3>
                    <p className="text-xs text-muted">
                      Select your operational state to view nodal policy benefits
                    </p>
                  </div>
                </div>

                <Link
                  to="/schemes"
                  className="text-xs font-bold text-blue hover:text-deepblue hidden sm:flex items-center gap-1"
                >
                  All States <ChevronRight size={14} />
                </Link>
              </div>

              {/* State Pills Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {STATE_POLICIES.map((s) => {
                  const active = selectedState === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedState(s.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-blue text-white shadow-[0_6px_15px_-3px_rgba(28,131,243,0.5)]'
                          : 'bg-canvas border border-line text-graphite hover:border-blue/40 hover:text-ink'
                      }`}
                    >
                      <span>{s.state}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active State Intelligence Card */}
              <div className="bg-canvas rounded-2xl border border-line/80 p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-line/70">
                  <div>
                    <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-0.5">
                      {currentState.nodal}
                    </span>
                    <h4 className="font-display text-lg font-bold text-ink">
                      {currentState.policy}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase">
                    Active Rolling Policy
                  </span>
                </div>

                {/* Key Financial Grants */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-line/60">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-0.5">
                      Capital Grant Scope
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-deepblue">
                      {currentState.grant}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-line/60">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-0.5">
                      Founder Support
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      {currentState.sustenance}
                    </p>
                  </div>
                </div>

                {/* Policy Highlights */}
                <div>
                  <span className="text-[11px] font-bold text-graphite uppercase tracking-wider block mb-2">
                    Key Policy Incentives:
                  </span>
                  <div className="space-y-1.5">
                    {currentState.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-graphite">
                        <CheckCircle2 size={13} className="text-blue shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    to={currentState.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue hover:text-deepblue"
                  >
                    <span>View Full {currentState.state} Policy Guidelines</span>
                    <ArrowUpRight size={13} />
                  </Link>

                  <span className="text-[11px] text-muted hidden sm:inline">
                    Indexed from Official Gazette
                  </span>
                </div>
              </div>

              {/* Bottom Central vs State Separation Note */}
              <div className="mt-5 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <Landmark size={14} className="text-blue" />
                  <span>Central Government schemes apply pan-India across all 28 states</span>
                </span>
                <Link to="/schemes" className="font-semibold text-ink hover:text-blue">
                  Compare Central vs State →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
