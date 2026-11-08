import { useEffect, useRef, useState } from 'react';
import Logo from '../ui/Logo';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Building2,
  Users,
  Rocket,
  Award,
  Landmark,
  ShieldCheck,
  Shield,
  FileCheck,
  Search,
  Scale,
  Percent,
  Receipt,
  ReceiptText,
  ClipboardCheck,
  FileText,
  Coins,
  Globe,
  Leaf,
  Phone,
  Wrench,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';
import GlobalSearchModal from './GlobalSearchModal';

/* ============================================================
   MEGA-MENU DATA STRUCTURES (CorporateMart & Benchmark Depth)
   ============================================================ */

/* 1. BUSINESS REGISTRATION MEGA-MENU */
const BUSINESS_REG_MENU = {
  title: 'Business Registration',
  badge: 'Entity Setup',
  sections: [
    {
      heading: 'Company Incorporation',
      items: [
        { title: 'Private Limited Company', desc: 'India\'s gold standard venture corporate structure', href: '/services/private-limited-company', icon: Building2 },
        { title: 'Limited Liability Partnership', desc: 'Limited liability with lower annual ROC compliance', href: '/services/llp-registration', icon: Users },
        { title: 'One Person Company (OPC)', desc: '100% control for solo innovators & consultants', href: '/services/one-person-company', icon: Building2 },
        { title: 'Section 8 Non-Profit Company', desc: 'High-credibility corporate structure for NGOs & CSR', href: '/services/section-8-company', icon: Award },
      ],
    },
    {
      heading: 'NGO & Philanthropy',
      items: [
        { title: 'NGO DARPAN Registration', desc: 'NITI Aayog portal onboarding for central ministry grants', href: '/services/ngo-darpan', icon: Landmark },
        { title: '12A & 80G Tax Exemption', desc: 'Tax exemption on surplus & 50% deduction for donors', href: '/services/12a-80g-registration', icon: Percent },
        { title: 'Trust & Society Advisory', desc: 'State registrar registration for non-profit entities', href: '/services/trust-society-registration', icon: FileCheck },
      ],
    },
    {
      heading: 'Founder Agreements',
      items: [
        { title: 'Entity Structure Comparison', desc: 'Compare Pvt Ltd vs LLP vs OPC vs Proprietorship', href: '/tools/structure-comparison', icon: Scale },
        { title: 'Startup Incorporation Package', desc: 'End-to-end COI, PAN, TAN, GST, PF, ESIC & Bank setup', href: '/services/private-limited-company', icon: Rocket },
      ],
    },
  ],
};

/* 2. TAX & COMPLIANCE MEGA-MENU */
const TAX_COMPLIANCE_MENU = {
  title: 'Tax & Compliance',
  badge: 'Statutory Rigor',
  sections: [
    {
      heading: 'Goods & Services Tax (GST)',
      items: [
        { title: 'GST Registration', desc: 'Fast-track GSTIN allotment with ARN generation', href: '/services/gst-registration', icon: Receipt },
        { title: 'GST Return Filing (GSTR-1, 3B, 9)', desc: 'Monthly ITC reconciliation and statutory filing', href: '/services/gst-filing', icon: ReceiptText },
      ],
    },
    {
      heading: 'Direct Tax & Income Tax',
      items: [
        { title: 'Corporate ITR Filing (ITR-6)', desc: 'Direct corporate tax filing with tax audit alignment', href: '/services/corporate-itr', icon: Landmark },
        { title: 'Section 80-IAC Tax Exemption', desc: '100% tax holiday on corporate profits for 3 years', href: '/services/section-80-iac', icon: Percent },
      ],
    },
    {
      heading: 'Corporate Secretarial (ROC)',
      items: [
        { title: 'Pvt Ltd Annual Compliance', desc: 'Filing AOC-4, MGT-7, ADT-1, and AGM resolutions', href: '/services/pvt-ltd-annual-compliance', icon: ClipboardCheck },
        { title: 'Director KYC (DIR-3 KYC)', desc: 'Annual DIN reactivation preventing MCA disqualification', href: '/services/director-kyc', icon: ShieldCheck },
      ],
    },
  ],
};

/* 3. STARTUP INDIA DROPDOWN */
const STARTUP_INDIA_MENU = [
  { title: 'DPIIT Recognition Certificate', desc: 'Official sovereign recognition unlocking priority schemes & IPR rebates', href: '/services/dpiit-recognition', icon: Rocket },
  { title: 'Section 80-IAC Tax Exemption', desc: '100% tax holiday for 3 consecutive years out of 10 via IMB Board', href: '/services/section-80-iac', icon: Percent },
  { title: 'Startup India Seed Fund (SISFS)', desc: 'Non-dilutive grants up to ₹20 Lakhs and debt up to ₹50 Lakhs', href: '/schemes/startup-india-seed-fund', icon: Sparkles },
  { title: 'Credit Guarantee Scheme (CGSS)', desc: 'Collateral-free loans up to ₹10 Crore with sovereign risk coverage', href: '/schemes/cgss', icon: ShieldCheck },
];

/* 4. GOVERNMENT SCHEMES DROPDOWN */
const SCHEMES_MENU = [
  { title: 'Startup India Seed Fund (SISFS)', desc: 'Early-stage prototype validation and commercialization grant', href: '/schemes/startup-india-seed-fund', tag: 'DPIIT Grant' },
  { title: 'Section 80-IAC Corporate Tax Exemption', desc: '3 consecutive years 100% deduction on operational profits', href: '/schemes/section-80-iac', tag: 'Tax Holiday' },
  { title: 'Credit Guarantee Scheme for Startups (CGSS)', desc: 'Collateral-free loans up to ₹10 Crore from scheduled commercial banks', href: '/schemes/cgss', tag: 'Debt Facility' },
  { title: 'PMEGP MSME Capital Subsidy', desc: 'Up to 35% margin money subsidy on project costs up to ₹50 Lakhs', href: '/schemes/pmegp', tag: 'MSME Subsidy' },
  { title: 'BIRAC Biotechnology Ignition Grant (BIG)', desc: 'Up to ₹50 Lakhs non-dilutive grant for bio-innovators and MedTech', href: '/schemes/birac-big', tag: 'Biotech Grant' },
  { title: 'Gujarat State Startup Scheme (i-Hub)', desc: 'Up to ₹30 Lakhs seed support + monthly founder sustenance allowance', href: '/schemes/gujarat-startup-policy', tag: 'State Policy' },
  { title: 'Explore All 18+ Central & State Schemes', desc: 'Interactive state directory, comparison matrix, and filters', href: '/schemes', tag: 'Directory' },
];

/* 5. FUNDING & CAPITAL DROPDOWN */
const FUNDING_MENU = [
  { title: 'Non-Dilutive Capital Grants', desc: 'SISFS, DST NIDHI PRAYAS, BIRAC BIG with 0% equity dilution', href: '/funding', icon: Coins },
  { title: 'Collateral-Free Credit Guarantees', desc: 'CGSS up to ₹10 Cr and CGTMSE up to ₹5 Cr without personal security', href: '/funding', icon: ShieldCheck },
  { title: 'Capital & Margin Subsidies', desc: 'PMEGP 15%–35% margin money & ZED certification fee reimbursements', href: '/funding', icon: Award },
  { title: 'Institutional Term Loans & MUDRA', desc: 'Concessionary bank debt up to ₹20 Lakhs under MUDRA Tarun Plus', href: '/funding', icon: Landmark },
];

/* 6. CERTIFICATIONS & LICENSES MEGA-MENU */
const CERTIFICATIONS_MENU = {
  title: 'Certifications & Licenses',
  badge: 'Accreditation',
  sections: [
    {
      heading: 'MSME Accreditations',
      items: [
        { title: 'Udyam Registration', desc: 'Permanent MSME certificate unlocking CGTMSE & priority lending', href: '/services/udyam-registration', icon: Award },
        { title: 'MSME ZED Certification', desc: 'Up to 80% government subsidy on Bronze, Silver, Gold audits', href: '/services/msme-zed', icon: Leaf },
      ],
    },
    {
      heading: 'Quality & Security Standards',
      items: [
        { title: 'ISO 9001:2015 (QMS)', desc: 'Quality Management System required for government procurement', href: '/services/iso-9001', icon: ShieldCheck },
        { title: 'ISO 27001 (ISMS)', desc: 'Information Security Management System for tech & SaaS', href: '/services/iso-9001', icon: Shield },
      ],
    },
    {
      heading: 'Trade & Regulatory Licenses',
      items: [
        { title: 'FSSAI Food Business License', desc: 'Mandatory 14-digit license for cloud kitchens, F&B & packaged food', href: '/services/fssai-license', icon: ShieldCheck },
        { title: 'Import Export Code (IEC)', desc: '10-digit DGFT trade identifier for cross-border shipments', href: '/services/iec-code', icon: Globe },
      ],
    },
  ],
};

/* 7. INTELLECTUAL PROPERTY (IP) DROPDOWN */
const IP_MENU = [
  { title: 'Trademark Registration', desc: 'Pan-India brand name & logo protection with 50% MSME/DPIIT rebate', href: '/services/trademark-registration', icon: Shield },
  { title: 'Trademark Objection Reply', desc: 'Legal rejoinders to overcome Section 9 and Section 11 examiner reports', href: '/services/trademark-objection', icon: Scale },
  { title: 'Copyright Registration', desc: 'Statutory protection for software source code, literary & UI/UX designs', href: '/services/copyright-registration', icon: BookOpen },
  { title: 'Patent Application Guidance', desc: 'Prior-art patent search and fast-track examination support', href: '/services/trademark-registration', icon: Sparkles },
];

/* 8. FOUNDER TOOLS DROPDOWN */
const TOOLS_MENU = [
  { title: 'Entity Structure Comparison', desc: 'Compare Pvt Ltd, LLP, OPC, and Proprietorship side by side', href: '/tools/structure-comparison', icon: Scale },
  { title: 'MSME Classification Checker', desc: 'Evaluate investment and turnover to determine Micro, Small, Medium tier', href: '/tools/msme-checker', icon: Award },
  { title: 'Startup Eligibility Calculator', desc: 'Evaluate DPIIT recognition and Section 80-IAC criteria in 60 seconds', href: '/eligibility', icon: Sparkles },
  { title: 'Startup Runway Calculator', desc: 'Calculate exact survival runway from cash in bank and monthly burn', href: '/tools/runway-calculator', icon: Coins },
  { title: 'Funding Requirement Planner', desc: 'Structure non-dilutive grants, debt, and equity allocation', href: '/tools/funding-planner', icon: Landmark },
  { title: 'Document Checklist Generator', desc: 'Generate customized service-specific document packages', href: '/tools/document-checklist', icon: FileText },
];

export default function Header({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'registration' | 'tax' | 'startup' | 'schemes' | 'funding' | 'certifications' | 'ip' | 'tools'
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (onMenuToggle) onMenuToggle(mobileOpen);
  }, [mobileOpen, onMenuToggle]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to open search, ESC to close menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (key) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-400 transition-all duration-300 ${
          scrolled
            ? 'bg-canvas/92 backdrop-blur-md border-b border-line shadow-sm py-2 sm:py-2.5'
            : 'bg-canvas/75 backdrop-blur-sm border-b border-line/60 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO */}
            <div className="shrink-0 flex items-center">
              <Link to="/" className="inline-block group focus:outline-none" aria-label="CertWinX Home">
                <Logo height="h-10 sm:h-11" className="transition-transform group-hover:scale-102" />
              </Link>
            </div>

            {/* DESKTOP PRIMARY NAVIGATION (10 Anchors + Mega-Menus) */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5" aria-label="Main Navigation">
              
              {/* Home */}
              <Link
                to="/"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname === '/' ? 'text-blue font-bold' : 'text-graphite hover:text-ink hover:bg-canvas'
                }`}
              >
                Home
              </Link>

              {/* 1. Business Registration (Mega-Menu) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('registration')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'registration' ? null : 'registration')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'registration' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'registration'}
                >
                  <span>Registration</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'registration' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'registration' && (
                  <div className="absolute top-full left-0 mt-2 w-[720px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {BUSINESS_REG_MENU.sections.map((sec) => (
                      <div key={sec.heading}>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue mb-3 pb-1 border-b border-line">
                          {sec.heading}
                        </h4>
                        <div className="space-y-2">
                          {sec.items.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              className="group block p-2 rounded-xl hover:bg-canvas transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon size={13} className="text-blue group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-[10px] text-graphite line-clamp-1 mt-0.5 pl-5">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Tax & Compliance (Mega-Menu) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('tax')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'tax' ? null : 'tax')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'tax' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'tax'}
                >
                  <span>Tax & Compliance</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'tax' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'tax' && (
                  <div className="absolute top-full left-0 mt-2 w-[720px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {TAX_COMPLIANCE_MENU.sections.map((sec) => (
                      <div key={sec.heading}>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue mb-3 pb-1 border-b border-line">
                          {sec.heading}
                        </h4>
                        <div className="space-y-2">
                          {sec.items.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              className="group block p-2 rounded-xl hover:bg-canvas transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon size={13} className="text-blue group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-[10px] text-graphite line-clamp-1 mt-0.5 pl-5">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Startup India (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('startup')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'startup' ? null : 'startup')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'startup' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'startup'}
                >
                  <span>Startup India</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'startup' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'startup' && (
                  <div className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="space-y-2">
                      {STARTUP_INDIA_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group block p-2.5 rounded-2xl hover:bg-canvas transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-graphite line-clamp-1 mt-0.5 pl-5">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Schemes (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('schemes')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'schemes' ? null : 'schemes')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'schemes' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'schemes'}
                >
                  <span>Schemes</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'schemes' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'schemes' && (
                  <div className="absolute top-full left-0 mt-2 w-[380px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="space-y-2">
                      {SCHEMES_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group block p-2.5 rounded-2xl hover:bg-canvas transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-bold text-blue bg-blue-soft px-2 py-0.5 rounded-full border border-blue/20">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-graphite line-clamp-1 mt-1">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Funding (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('funding')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'funding' ? null : 'funding')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'funding' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'funding'}
                >
                  <span>Funding</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'funding' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'funding' && (
                  <div className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="space-y-2">
                      {FUNDING_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group block p-2.5 rounded-2xl hover:bg-canvas transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-graphite line-clamp-1 mt-0.5 pl-5">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Certifications & Licenses (Mega-Menu) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('certifications')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'certifications' ? null : 'certifications')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'certifications' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'certifications'}
                >
                  <span>Certifications</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'certifications' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'certifications' && (
                  <div className="absolute top-full left-0 mt-2 w-[720px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {CERTIFICATIONS_MENU.sections.map((sec) => (
                      <div key={sec.heading}>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue mb-3 pb-1 border-b border-line">
                          {sec.heading}
                        </h4>
                        <div className="space-y-2">
                          {sec.items.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              className="group block p-2 rounded-xl hover:bg-canvas transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon size={13} className="text-blue group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-[10px] text-graphite line-clamp-1 mt-0.5 pl-5">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. IP & Trademark (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('ip')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'ip' ? null : 'ip')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'ip' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'ip'}
                >
                  <span>IP & Legal</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'ip' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'ip' && (
                  <div className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="space-y-2">
                      {IP_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group block p-2.5 rounded-2xl hover:bg-canvas transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-graphite line-clamp-1 mt-0.5 pl-5">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 8. Founder Tools (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('tools')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeDropdown === 'tools' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                  }`}
                  aria-expanded={activeDropdown === 'tools'}
                >
                  <span>Tools</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'tools' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute top-full right-0 mt-2 w-[360px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.22)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="space-y-2">
                      {TOOLS_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group block p-2.5 rounded-2xl hover:bg-canvas transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-graphite line-clamp-1 mt-0.5 pl-5">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About Us */}
              <Link
                to="/about"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname === '/about' ? 'text-blue font-bold' : 'text-graphite hover:text-ink hover:bg-canvas'
                }`}
              >
                About
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname === '/contact' ? 'text-blue font-bold' : 'text-graphite hover:text-ink hover:bg-canvas'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* HEADER ACTIONS (RIGHT) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Global Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-xs font-medium text-graphite hover:text-ink hover:border-blue/40 hover:bg-canvas transition-all shadow-xs"
                aria-label="Open Global Search"
              >
                <Search size={14} className="text-blue" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-block text-[10px] font-mono text-muted bg-canvas border border-line px-1.5 py-0.5 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* WhatsApp Advisory Desk */}
              <a
                href={getWhatsAppLink('general enquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 text-xs font-bold transition-colors"
                aria-label="Contact CertWinX on WhatsApp"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <MessageCircle size={13} className="text-emerald-700" />
                <span>WhatsApp</span>
              </a>

              {/* Primary CTA: Check Eligibility */}
              <Link
                to="/eligibility"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-blue text-white text-xs font-bold shadow-sm shadow-blue/25 hover:bg-deepblue hover:shadow-md transition-all shrink-0"
              >
                <span>Check Eligibility</span>
                <ArrowUpRight size={13} />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-xl bg-white border border-line text-ink hover:bg-canvas transition-colors"
                aria-label="Toggle Mobile Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* GLOBAL SEARCH MODAL */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* MOBILE DRAWER (< xl) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-350 xl:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div>
              <div className="p-4 border-b border-line flex items-center justify-between bg-canvas/40">
                <Logo height="h-8" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-line/50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar in Mobile Menu */}
              <div className="p-4 border-b border-line">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-canvas border border-line text-xs text-muted hover:text-ink transition-colors"
                >
                  <Search size={15} className="text-blue" />
                  <span>Search 40+ services & schemes...</span>
                </button>
              </div>

              {/* Mobile Navigation List with Accordions */}
              <div className="p-4 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Home
                </Link>

                {/* Registration Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'reg' ? null : 'reg')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas"
                  >
                    <span>Business Registration</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'reg' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>
                  {mobileAccordion === 'reg' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {BUSINESS_REG_MENU.sections.flatMap((s) => s.items).map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-graphite hover:text-blue hover:bg-blue-soft/30"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tax Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'tax' ? null : 'tax')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas"
                  >
                    <span>Tax & Compliance</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'tax' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>
                  {mobileAccordion === 'tax' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {TAX_COMPLIANCE_MENU.sections.flatMap((s) => s.items).map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-graphite hover:text-blue hover:bg-blue-soft/30"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Startup India */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'startup' ? null : 'startup')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas"
                  >
                    <span>Startup India</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'startup' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>
                  {mobileAccordion === 'startup' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {STARTUP_INDIA_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-graphite hover:text-blue hover:bg-blue-soft/30"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Schemes */}
                <Link
                  to="/schemes"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Government Schemes
                </Link>

                {/* Funding */}
                <Link
                  to="/funding"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Funding & Capital
                </Link>

                {/* Certifications */}
                <Link
                  to="/certifications"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Certifications & Licenses
                </Link>

                {/* Tools Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'tools' ? null : 'tools')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas"
                  >
                    <span>Founder Tools</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'tools' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>
                  {mobileAccordion === 'tools' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {TOOLS_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-graphite hover:text-blue hover:bg-blue-soft/30"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Bottom Contacts */}
            <div className="p-4 border-t border-line bg-canvas/60 space-y-2">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-line text-xs font-bold text-ink hover:bg-canvas"
              >
                <Phone size={13} className="text-blue" />
                <span>Call: {PHONE_NUMBER}</span>
              </a>
              <a
                href={getWhatsAppLink('mobile menu')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
