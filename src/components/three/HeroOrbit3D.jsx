import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import {
  Check,
  ShieldCheck,
  Sparkles,
  Rocket,
  Landmark,
  Coins,
  FileCheck,
  TrendingUp,
  ArrowUpRight,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* Ecosystem Nodes for the interactive graph view */
const ECOSYSTEM_NODES = [
  {
    id: 'startup',
    label: 'Startup India & DPIIT',
    tag: 'Foundation',
    metric: '10-Yr Recognition',
    desc: 'Self-certification, fast-track IP, tender exemptions',
    color: 'from-blue to-deepblue',
    icon: Rocket,
    link: '/services/dpiit-recognition',
    x: 50,
    y: 20,
  },
  {
    id: 'schemes',
    label: 'Central & State Schemes',
    tag: 'Intelligence',
    metric: '18+ Active Schemes',
    desc: 'State subsidies, capital support & market access',
    color: 'from-blue to-sky-deep',
    icon: Landmark,
    link: '/schemes',
    x: 85,
    y: 45,
  },
  {
    id: 'funding',
    label: 'Non-Dilutive Capital',
    tag: 'Liquidity',
    metric: '₹20L - ₹10 Cr Scope',
    desc: 'SISFS grants, CGSS credit guarantees, PMEGP',
    color: 'from-emerald-600 to-teal-700',
    icon: Coins,
    link: '/funding',
    x: 72,
    y: 82,
  },
  {
    id: 'compliance',
    label: 'Statutory Compliance',
    tag: 'Governance',
    metric: '100% Due Diligence',
    desc: 'ROC annual filing, MCA21, GST & MSME audits',
    color: 'from-slate-700 to-ink',
    icon: FileCheck,
    link: '/services',
    x: 28,
    y: 82,
  },
  {
    id: 'growth',
    label: 'Section 80-IAC Tax Exemption',
    tag: 'Growth Advantage',
    metric: '3-Yr 100% Tax Relief',
    desc: 'Inter-Ministerial Board presentation dossier',
    color: 'from-blue-deep to-blue',
    icon: TrendingUp,
    link: '/eligibility/80-iac',
    x: 15,
    y: 45,
  },
];

export default function HeroOrbit3D() {
  const rootRef = useRef(null);
  const [activeTab, setActiveTab] = useState('dialogue'); // 'dialogue' | 'ecosystem'
  const [activeNode, setActiveNode] = useState(ECOSYSTEM_NODES[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (activeTab === 'dialogue') {
        // Floating gentle breathing micro-motion for characters
        gsap.to('[data-image]', {
          y: -6,
          duration: 3.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        // Floating gentle pulse for dialogue bubbles (keeps them persistently visible like live site!)
        gsap.to('[data-bubble="1"], [data-bubble="3"]', {
          y: -3,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        gsap.to('[data-bubble="2"], [data-bubble="4"]', {
          y: 3,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.4,
        });

        // 3D parallax on mouse move
        const onMove = (e) => {
          const rect = root.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to('[data-image]', {
            rotateY: x * 4,
            rotateX: -y * 3,
            duration: 1.2,
            ease: 'power3.out',
            transformPerspective: 1200,
          });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      }
    }, root);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div ref={rootRef} className="relative w-full">
      {/* Sleek Mode Switcher Pill (Docked neatly without displacing the characters) */}
      <div className="flex items-center justify-center sm:justify-end gap-1.5 mb-3 sm:mb-2 z-30 relative">
        <div className="inline-flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md border border-line shadow-sm">
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dialogue'
                ? 'bg-[#1C83F3] text-white shadow-sm shadow-[#1C83F3]/25'
                : 'text-graphite hover:text-ink hover:bg-black/5'
            }`}
            aria-label="View Advisory Dialogue"
          >
            <MessageSquare size={12} />
            <span>Advisory View</span>
          </button>
          <button
            onClick={() => setActiveTab('ecosystem')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'ecosystem'
                ? 'bg-[#1C83F3] text-white shadow-sm shadow-[#1C83F3]/25'
                : 'text-graphite hover:text-ink hover:bg-black/5'
            }`}
            aria-label="View Connected Ecosystem Nodes"
          >
            <Layers size={12} />
            <span>Ecosystem Nodes</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: ADVISORY DIALOGUE (Matching Live certwinx.com Screenshot) ================= */}
      {activeTab === 'dialogue' && (
        <div className="relative">
          {/* Mobile Layout (< lg) */}
          <div className="lg:hidden flex flex-col gap-2 py-1">
            <div className="flex flex-col gap-2 mb-1">
              <div
                data-bubble="1"
                className="self-start max-w-[85%] bg-white rounded-2xl rounded-br-xs shadow-sm border border-line px-3 py-2"
              >
                <p className="text-[11px] leading-snug text-ink">
                  <span className="font-bold text-[#1C83F3]">Founder:</span> Need DPIIT + funding. Where should I start?
                </p>
              </div>

              <div
                data-bubble="4"
                className="self-end max-w-[88%] bg-[#E8F3FF] border border-[#1C83F3]/30 rounded-2xl rounded-bl-xs shadow-sm px-3 py-2"
              >
                <div className="flex items-start gap-1.5">
                  <Check size={12} className="text-[#1C83F3] mt-0.5 shrink-0" strokeWidth={3} />
                  <p className="text-[11px] leading-snug text-[#0A2566] font-semibold">
                    CertWinX maps DPIIT, SISFS & 80-IAC via 60s diagnostic.
                  </p>
                </div>
              </div>
            </div>

            <div data-image className="relative will-change-transform max-w-[340px] sm:max-w-[420px] mx-auto">
              <picture>
                <source srcSet="/hero-characters.webp" type="image/webp" />
                <img
                  src="/hero-characters.png"
                  alt="CertWinX consultant guiding an entrepreneur"
                  className="w-full h-auto rounded-2xl max-h-[270px] object-contain mx-auto"
                  loading="eager"
                  style={{ filter: 'drop-shadow(0 15px 30px rgba(28,131,243,0.15))' }}
                />
              </picture>
            </div>

            {/* Mobile Metric Badges */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-white border border-line rounded-xl p-2.5 shadow-xs text-center">
                <span className="text-[9px] font-bold text-[#1C83F3] uppercase tracking-wider block">DPIIT Recognition</span>
                <p className="text-xs font-bold text-ink mt-0.5">10-Year Validity Window</p>
              </div>
              <div className="bg-white border border-line rounded-xl p-2.5 shadow-xs text-center">
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block">Section 80-IAC</span>
                <p className="text-xs font-bold text-ink mt-0.5">100% Tax Relief (3 Yrs)</p>
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg+) — EXACT LIVE CERTWINX.COM ALIGNMENT */}
          <div className="hidden lg:block relative w-full h-[530px]">
            {/* Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full bg-[#1C83F3]/10 blur-[100px]" />
              <div className="absolute top-[25%] left-[10%] w-[200px] h-[200px] rounded-full bg-sky/20 blur-[80px]" />
            </div>

            <div className="relative w-full h-full flex items-center justify-center pb-6">
              <div className="relative w-full max-w-[680px] mx-auto px-2">
                
                {/* Character image */}
                <div data-image className="relative z-10 will-change-transform">
                  <picture>
                    <source srcSet="/hero-characters.webp" type="image/webp" />
                    <img
                      src="/hero-characters.png"
                      alt="CertWinX consultant guiding an entrepreneur"
                      className="w-full h-auto rounded-3xl"
                      loading="eager"
                      style={{ filter: 'drop-shadow(0 25px 50px rgba(22,58,138,0.14))' }}
                    />
                  </picture>
                </div>

                {/* CUSTOMER BUBBLES — TOP LEFT (Persistently Visible As Seen on Live certwinx.com) */}
                <div className="absolute -top-3 left-0 sm:-left-4 lg:-left-6 z-20 flex flex-col gap-2.5 w-[190px] sm:w-[210px]">
                  <div
                    data-bubble="3"
                    className="relative bg-white rounded-2xl rounded-br-sm shadow-[0_16px_36px_-12px_rgba(22,58,138,0.25)] border border-line px-3.5 py-2.5"
                  >
                    <p className="text-xs leading-snug text-ink">
                      Need <span className="font-bold text-[#1C83F3]">DPIIT + funding</span>.
                    </p>
                    <span className="absolute bottom-[-6px] right-5 w-2.5 h-2.5 bg-white border-r border-b border-line rotate-45" />
                  </div>

                  <div
                    data-bubble="1"
                    className="relative bg-white rounded-2xl rounded-br-sm shadow-[0_16px_36px_-12px_rgba(22,58,138,0.25)] border border-line px-3.5 py-2.5"
                  >
                    <p className="text-xs leading-snug text-ink">
                      <span className="font-bold text-[#1C83F3]">Hi!</span> Where should I start?
                    </p>
                    <span className="absolute bottom-[-6px] right-5 w-2.5 h-2.5 bg-white border-r border-b border-line rotate-45" />
                  </div>
                </div>

                {/* CERTWINX BUBBLES — TOP RIGHT (Persistently Visible As Seen on Live certwinx.com) */}
                <div className="absolute -top-3 right-0 sm:-right-4 lg:-right-6 z-20 flex flex-col gap-2.5 w-[200px] sm:w-[220px]">
                  <div
                    data-bubble="4"
                    className="relative bg-[#E8F3FF] border border-[#1C83F3]/30 rounded-2xl rounded-bl-sm shadow-[0_16px_36px_-12px_rgba(28,131,243,0.3)] px-3.5 py-2.5"
                  >
                    <div className="flex items-start gap-1.5">
                      <Check size={13} className="text-[#1C83F3] mt-0.5 shrink-0" strokeWidth={3} />
                      <p className="text-xs leading-snug text-[#0A2566] font-semibold">
                        Free eligibility first.
                      </p>
                    </div>
                    <span className="absolute bottom-[-6px] left-5 w-2.5 h-2.5 bg-[#E8F3FF] border-r border-b border-[#1C83F3]/30 rotate-45" />
                  </div>

                  <div
                    data-bubble="2"
                    className="relative bg-[#060D24] border border-white/10 rounded-2xl rounded-bl-sm shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5)] px-3.5 py-2.5"
                  >
                    <p className="text-xs leading-snug text-white">
                      Are you <span className="font-bold text-[#1C83F3]">registered</span> yet?
                    </p>
                    <span className="absolute bottom-[-6px] left-5 w-2.5 h-2.5 bg-[#060D24] rotate-45" />
                  </div>
                </div>

                {/* FLOATING VERIFIED ENTERPRISE METRIC BADGES (DESKTOP) */}
                <div className="absolute -bottom-2 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-line shadow-[0_15px_30px_-10px_rgba(22,58,138,0.18)] p-3 max-w-[210px] hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-[#1C83F3] uppercase tracking-wider">
                      DPIIT Recognition
                    </span>
                  </div>
                  <p className="text-xs font-bold text-ink mt-1">10-Year Validity Window</p>
                  <p className="text-[10px] text-graphite">Fast-track patent & tender exemptions</p>
                </div>

                <div className="absolute -bottom-2 -right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-line shadow-[0_15px_30px_-10px_rgba(22,58,138,0.18)] p-3 max-w-[210px] hidden sm:block">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={13} className="text-[#1C83F3]" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                      Section 80-IAC
                    </span>
                  </div>
                  <p className="text-xs font-bold text-ink mt-1">100% Tax Holiday</p>
                  <p className="text-[10px] text-graphite">Any 3 consecutive years out of 10</p>
                </div>

              </div>
            </div>

            {/* Bottom indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted whitespace-nowrap">
                Right Guidance · Real Opportunities · Long-Term Partnership
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: INTERACTIVE ECOSYSTEM NODES GRAPH ================= */}
      {activeTab === 'ecosystem' && (
        <div className="relative w-full rounded-3xl bg-white border border-line p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(22,58,138,0.15)] overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#1C83F3] uppercase">
                Interactive Architecture
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                Connected Startup Intelligence Ecosystem
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#1C83F3]/10 border border-[#1C83F3]/20 text-[10px] font-bold text-[#1C83F3] uppercase">
              5 Core Pillars
            </span>
          </div>

          {/* Connected SVG Graph Canvas */}
          <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center my-2">
            {/* SVG Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1C83F3" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0A2566" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <line x1="50" y1="50" x2="50" y2="20" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="85" y2="45" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="72" y2="82" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="28" y2="82" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="15" y2="45" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="#A9D2F1" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4,4" />
            </svg>

            {/* Central CertWinX Intelligence Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 rounded-full bg-[#060D24] text-white shadow-[0_10px_25px_-5px_rgba(22,58,138,0.5)] border-2 border-white flex flex-col items-center justify-center text-center p-1">
              <Sparkles size={16} className="text-[#1C83F3] mb-0.5" />
              <span className="font-display text-[10px] font-bold leading-tight">CertWinX</span>
              <span className="text-[8px] text-sky uppercase tracking-tighter">Core Hub</span>
            </div>

            {/* Interactive Nodes */}
            {ECOSYSTEM_NODES.map((node) => {
              const Icon = node.icon;
              const isSelected = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 cursor-pointer ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                  aria-label={node.label}
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#1C83F3] text-white ring-4 ring-[#1C83F3]/20 shadow-lg'
                        : 'bg-white text-graphite border border-line shadow-sm hover:border-[#1C83F3]/50 hover:text-[#1C83F3]'
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <span
                    className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#060D24] text-white border-transparent shadow-sm'
                        : 'bg-white/95 backdrop-blur-sm text-graphite border-line'
                    }`}
                  >
                    {node.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card */}
          <div className="bg-[#F7F9FC] border border-line rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#1C83F3]/10 border border-[#1C83F3]/20 text-[#1C83F3] flex items-center justify-center shrink-0">
                <activeNode.icon size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#1C83F3] uppercase tracking-wider">
                    {activeNode.tag}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-line" />
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {activeNode.metric}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-ink truncate mt-0.5">
                  {activeNode.label}
                </h4>
                <p className="text-xs text-graphite line-clamp-1">{activeNode.desc}</p>
              </div>
            </div>

            <Link
              to={nodeToUrl(activeNode)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C83F3] text-white text-xs font-bold hover:bg-[#0A2566] transition-colors shrink-0 shadow-sm"
            >
              <span>Explore Pillar</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function nodeToUrl(node) {
  return node.link || '/services';
}
