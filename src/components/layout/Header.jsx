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
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';
import GlobalSearchModal from './GlobalSearchModal';
import BrochureModal from '../ui/BrochureModal';

/* ============================================================
   TWO-PANEL MEGA-MENU TAXONOMY (CorporateMart Benchmark Depth)
   ============================================================ */

/* 1. BUSINESS REGISTRATION MEGA-MENU (Two-Panel) */
const BUSINESS_REG_DATA = [
  {
    id: 'incorporation',
    category: 'Company Incorporation',
    icon: Building2,
    badge: null,
    items: [
      { title: 'Private Limited Company', desc: "India's gold standard corporate structure for venture funding & DPIIT", href: '/services/private-limited-company', icon: Building2 },
      { title: 'Limited Liability Partnership (LLP)', desc: 'Limited liability protection with lower statutory audit overhead', href: '/services/llp-registration', icon: Users },
      { title: 'One Person Company (OPC)', desc: 'Single-promoter limited liability corporate entity for solo innovators', href: '/services/one-person-company', icon: Building2 },
      { title: 'Section 8 Non-Profit Company', desc: 'Central corporate registration for philanthropic & CSR projects', href: '/services/section-8-company', icon: Award },
    ],
  },
  {
    id: 'ngo',
    category: 'NGO & Philanthropy',
    icon: Landmark,
    badge: null,
    items: [
      { title: 'NGO DARPAN Registration', desc: 'NITI Aayog portal onboarding mandatory for central ministry grants', href: '/services/ngo-darpan', icon: Landmark },
      { title: '12A & 80G Tax Exemption', desc: '100% tax exemption on NGO surplus + 50% tax rebate for corporate donors', href: '/services/12a-80g-registration', icon: Percent },
      { title: 'Trust & Society Registration', desc: 'State registrar registration for charitable trusts & social foundations', href: '/services/trust-society-registration', icon: FileCheck },
    ],
  },
  {
    id: 'packages',
    category: 'Startup Launch Packages',
    icon: Rocket,
    badge: 'POPULAR ✨',
    items: [
      { title: 'Startup All-in-One Incorporation', desc: 'MCA SPICe+, DIN, DSC, PAN, TAN, GST, PF, ESIC & Statutory Bank Account', href: '/services/private-limited-company', icon: Rocket },
      { title: 'Entity Structure Comparison', desc: 'Compare Pvt Ltd vs LLP vs OPC vs Partnership side by side', href: '/tools/structure-comparison', icon: Scale },
    ],
  },
];

/* 2. TAX & COMPLIANCE MEGA-MENU (Two-Panel) */
const TAX_COMPLIANCE_DATA = [
  {
    id: 'gst',
    category: 'Goods & Service Tax (GST)',
    icon: Receipt,
    badge: null,
    items: [
      { title: 'GST Registration', desc: 'Fast-track GSTIN allotment with ARN generation and bank link', href: '/services/gst-registration', icon: Receipt },
      { title: 'GST Return Filing (GSTR-1 & 3B)', desc: 'Monthly ITC reconciliation, GSTR-2B matching, and zero-defect filing', href: '/services/gst-filing', icon: ReceiptText },
      { title: 'Annual GST Audit (GSTR-9 & 9C)', desc: 'Statutory annual return synthesis and turnover reconciliation', href: '/services/gst-filing', icon: ClipboardCheck },
    ],
  },
  {
    id: 'income-tax',
    category: 'Direct Tax & Corporate ITR',
    icon: Landmark,
    badge: null,
    items: [
      { title: 'Corporate ITR-6 Filing', desc: 'Statutory income tax returns aligned with audited financial statements', href: '/services/corporate-itr', icon: Landmark },
      { title: 'TDS & TCS Quarterly Filings', desc: 'Form 24Q, 26Q, and 27Q filings with Form 16/16A certificate generation', href: '/services/corporate-itr', icon: ReceiptText },
      { title: 'Income Tax Scrutiny Reply', desc: 'Legal rejoinders and responses for faceless assessment notices', href: '/services/corporate-itr', icon: Scale },
    ],
  },
  {
    id: 'roc',
    category: 'Corporate Secretarial & ROC',
    icon: ClipboardCheck,
    badge: null,
    items: [
      { title: 'Pvt Ltd Annual Compliance', desc: 'MCA filings AOC-4, MGT-7, ADT-1, Director Report, and AGM minutes', href: '/services/pvt-ltd-annual-compliance', icon: ClipboardCheck },
      { title: 'Director KYC (DIR-3 KYC)', desc: 'Annual statutory DIN reactivation preventing MCA director disqualification', href: '/services/director-kyc', icon: ShieldCheck },
      { title: 'Event-Based ROC Filings', desc: 'Director addition, registered office shift, capital increase, MOA changes', href: '/services/pvt-ltd-annual-compliance', icon: Building2 },
    ],
  },
  {
    id: 'tax-exemption',
    category: 'Startup Tax Exemption',
    icon: Percent,
    badge: 'POPULAR ✨',
    items: [
      { title: 'Section 80-IAC 100% Tax Holiday', desc: '100% deduction on corporate profits for 3 consecutive years out of 10', href: '/services/section-80-iac', icon: Percent },
      { title: 'Section 56 Angel Tax Exemption', desc: 'Exemption from tax scrutiny on premium equity investments by VCs/Angels', href: '/services/dpiit-recognition', icon: ShieldCheck },
    ],
  },
];

/* 3. CERTIFICATIONS & LICENSES MEGA-MENU (Two-Panel) */
const CERTIFICATIONS_DATA = [
  {
    id: 'msme',
    category: 'MSME Accreditations',
    icon: Award,
    badge: 'POPULAR ✨',
    items: [
      { title: 'MSME Udyam Registration', desc: 'Permanent sovereign MSME certificate with QR code for priority bank credit', href: '/services/udyam-registration', icon: Award },
      { title: 'MSME ZED Certification', desc: 'Zero Defect Zero Effect (Bronze, Silver, Gold) with up to 80% subsidy', href: '/services/msme-zed', icon: Leaf },
      { title: 'MSME Samadhaan Filing', desc: 'Delayed commercial payment recovery portal filing under MSMED Act Section 18', href: '/msme', icon: Scale },
    ],
  },
  {
    id: 'iso',
    category: 'Quality & Security Standards',
    icon: ShieldCheck,
    badge: null,
    items: [
      { title: 'ISO 9001:2015 (QMS)', desc: 'Quality Management System required for institutional & GeM tenders', href: '/services/iso-9001', icon: ShieldCheck },
      { title: 'ISO 27001 (ISMS)', desc: 'Information Security Management System mandatory for enterprise SaaS', href: '/services/iso-9001', icon: Shield },
      { title: 'ISO 14001 (EMS)', desc: 'Environmental Management System for clean manufacturing & green audits', href: '/services/iso-9001', icon: Leaf },
    ],
  },
  {
    id: 'licenses',
    category: 'Business & Municipal Licenses',
    icon: Globe,
    badge: null,
    items: [
      { title: 'FSSAI Food Business License', desc: 'Mandatory 14-digit central/state license for cloud kitchens & F&B', href: '/services/fssai-license', icon: ShieldCheck },
      { title: 'Import Export Code (IEC)', desc: '10-digit DGFT trade identifier mandatory for all international exports', href: '/services/iec-code', icon: Globe },
      { title: 'Shop & Establishment License', desc: 'State municipal commercial premises license with local authority', href: '/services/trade-license', icon: Building2 },
    ],
  },
];

/* 4. SCHEMES DROPDOWN */
const SCHEMES_MENU = [
  { title: 'Startup India Seed Fund (SISFS)', desc: 'Early-stage prototype validation and commercialization grant up to ₹20L / ₹50L', href: '/schemes/startup-india-seed-fund', tag: 'DPIIT Grant' },
  { title: 'Section 80-IAC Corporate Tax Exemption', desc: '3 consecutive years 100% deduction on operational profits via IMB Board', href: '/schemes/section-80-iac', tag: 'Tax Holiday' },
  { title: 'Credit Guarantee Scheme for Startups (CGSS)', desc: 'Collateral-free loans up to ₹10 Crore with sovereign credit coverage', href: '/schemes/cgss', tag: 'Debt Facility' },
  { title: 'PMEGP MSME Capital Subsidy', desc: 'Up to 35% margin money subsidy on project costs up to ₹50 Lakhs', href: '/schemes/pmegp', tag: 'MSME Subsidy' },
  { title: 'BIRAC Biotechnology Ignition Grant (BIG)', desc: 'Up to ₹50 Lakhs non-dilutive grant for bio-innovators and MedTech', href: '/schemes/birac-big', tag: 'Biotech Grant' },
  { title: 'Gujarat State Startup Scheme (i-Hub)', desc: 'Up to ₹30 Lakhs seed support + monthly founder sustenance allowance', href: '/schemes/gujarat-startup-policy', tag: 'State Policy' },
  { title: 'Explore All 18+ Central & State Schemes', desc: 'Interactive state directory, comparison matrix, and search filters', href: '/schemes', tag: 'Directory' },
];

/* 5. FUNDING & CAPITAL DROPDOWN */
const FUNDING_MENU = [
  { title: 'Non-Dilutive Capital Grants', desc: 'SISFS, DST NIDHI PRAYAS, BIRAC BIG with 0% equity dilution', href: '/funding', icon: Coins },
  { title: 'Collateral-Free Credit Guarantees', desc: 'CGSS up to ₹10 Cr and CGTMSE up to ₹5 Cr without personal security', href: '/funding', icon: ShieldCheck },
  { title: 'Capital & Margin Subsidies', desc: 'PMEGP 15%–35% margin money & ZED certification fee reimbursements', href: '/funding', icon: Award },
  { title: 'Institutional Term Loans & MUDRA', desc: 'Concessionary bank debt up to ₹20 Lakhs under MUDRA Tarun Plus', href: '/funding', icon: Landmark },
];

/* 6. FOUNDER TOOLS DROPDOWN */
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubcatReg, setActiveSubcatReg] = useState(0);
  const [activeSubcatTax, setActiveSubcatTax] = useState(0);
  const [activeSubcatCert, setActiveSubcatCert] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const headerRef = useRef(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    }, 180);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-400 transition-all duration-300"
      >
        {/* ============ TOP UTILITY BAR (CorporateMart Benchmark) ============ */}
        <div className={`hidden lg:block bg-deepblue text-white/90 text-xs border-b border-white/10 transition-all duration-300 ${scrolled ? 'py-1 opacity-95' : 'py-1.5'}`}>
          <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left: Phone & Support */}
            <div className="flex items-center gap-6">
              <a 
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} 
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
              >
                <Phone size={12} className="text-sky" />
                <span>For Support: <strong className="text-white">+91 81289 31029</strong></span>
              </a>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white/70 text-[11px]">Sovereign Schemes & Startup Advisory Desk</span>
            </div>

            {/* Right: Brochure, Need Help, Portal */}
            <div className="flex items-center gap-4 text-[11px]">
              {/* Brochure Download / Modal */}
              <button 
                onClick={() => setBrochureModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <FileText size={12} className="text-sky" />
                <span>Brochure 2026</span>
              </button>

              <span className="w-1 h-1 rounded-full bg-white/30" />

              {/* Need Help Dropdown */}
              <div className="relative group">
                <button className="inline-flex items-center gap-1 text-white/80 group-hover:text-white transition-colors cursor-pointer">
                  <span>Need Help?</span>
                  <ChevronDown size={11} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-line p-2 text-ink hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-150">
                  <a 
                    href={getWhatsAppLink('Helpdesk')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-canvas transition-colors text-xs font-semibold"
                  >
                    <MessageCircle size={14} className="text-emerald-600" />
                    <span>Instant WhatsApp Desk</span>
                  </a>
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-canvas transition-colors text-xs font-semibold text-graphite hover:text-ink"
                  >
                    <Users size={14} className="text-blue" />
                    <span>Book 1:1 Consultation</span>
                  </Link>
                  <Link 
                    to="/eligibility/80-iac" 
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-canvas transition-colors text-xs font-semibold text-graphite hover:text-ink"
                  >
                    <Percent size={14} className="text-blue" />
                    <span>80-IAC Tax Exemption Desk</span>
                  </Link>
                </div>
              </div>

              <span className="w-1 h-1 rounded-full bg-white/30" />

              {/* Client Portal Button */}
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue hover:bg-white hover:text-deepblue text-white font-bold transition-all shadow-sm"
              >
                <ShieldCheck size={11} />
                <span>Client Portal</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-400 text-deepblue font-black uppercase">LIVE</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ============ MAIN NAVIGATION BAR ============ */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-canvas/95 backdrop-blur-md border-b border-line shadow-sm py-2 sm:py-2.5'
              : 'bg-canvas/85 backdrop-blur-sm border-b border-line/60 py-2.5 sm:py-3.5'
          }`}
        >
          <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              
              {/* BRAND LOGO */}
              <div className="shrink-0 flex items-center">
                <Logo size="md" link={true} className="transition-transform hover:scale-102" />
              </div>

              {/* DESKTOP PRIMARY NAVIGATION (Two-Panel Mega-Menus) */}
              <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5" aria-label="Main Navigation">
                
                {/* 1. Incorporation / Registration (Two-Panel Mega-Menu) */}
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
                    <span>Incorporation</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'registration' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>

                  {activeDropdown === 'registration' && (
                    <div className="absolute top-full left-0 mt-2 w-[760px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      {/* Left Sidebar Subcategories */}
                      <div className="w-[260px] bg-canvas/70 border-r border-line p-3 space-y-1 shrink-0">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 py-1.5 block">
                          Incorporation Scope
                        </span>
                        {BUSINESS_REG_DATA.map((sub, idx) => {
                          const active = activeSubcatReg === idx;
                          const SubIcon = sub.icon;
                          return (
                            <button
                              key={sub.id}
                              onMouseEnter={() => setActiveSubcatReg(idx)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                                active
                                  ? 'bg-blue text-white shadow-sm'
                                  : 'text-graphite hover:text-ink hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <SubIcon size={14} className={active ? 'text-white' : 'text-blue'} />
                                <span className="truncate">{sub.category}</span>
                              </div>
                              <ChevronRight size={13} className={active ? 'text-white' : 'text-muted'} />
                            </button>
                          );
                        })}
                      </div>

                      {/* Right Panel: Services Grid */}
                      <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
                            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-1.5">
                              <span>{BUSINESS_REG_DATA[activeSubcatReg].category}</span>
                              <ChevronRight size={14} className="text-blue" />
                            </h4>
                            <span className="text-[11px] font-semibold text-blue">
                              {BUSINESS_REG_DATA[activeSubcatReg].items.length} Statutory Services
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {BUSINESS_REG_DATA[activeSubcatReg].items.map((item) => (
                              <Link
                                key={item.title}
                                to={item.href}
                                className="group p-3 rounded-2xl border border-line/60 hover:border-blue/40 hover:bg-canvas transition-all"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform shrink-0" />
                                  <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors leading-tight">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="text-[11px] text-graphite line-clamp-2 pl-5.5 leading-snug">
                                  {item.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Assistance Banner */}
                        <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                          <span>Need help selecting an entity structure?</span>
                          <Link to="/tools/structure-comparison" className="font-bold text-blue hover:text-deepblue flex items-center gap-1">
                            <span>Compare Structures</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Tax & Compliance (Two-Panel Mega-Menu) */}
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
                    <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      {/* Left Sidebar Subcategories */}
                      <div className="w-[280px] bg-canvas/70 border-r border-line p-3 space-y-1 shrink-0">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 py-1.5 block">
                          Statutory Tax Verticals
                        </span>
                        {TAX_COMPLIANCE_DATA.map((sub, idx) => {
                          const active = activeSubcatTax === idx;
                          const SubIcon = sub.icon;
                          return (
                            <button
                              key={sub.id}
                              onMouseEnter={() => setActiveSubcatTax(idx)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                                active
                                  ? 'bg-blue text-white shadow-sm'
                                  : 'text-graphite hover:text-ink hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <SubIcon size={14} className={active ? 'text-white' : 'text-blue'} />
                                <span className="truncate">{sub.category}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {sub.badge && (
                                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${active ? 'bg-white/20 text-white' : 'bg-blue/10 text-blue'}`}>
                                    POPULAR
                                  </span>
                                )}
                                <ChevronRight size={13} className={active ? 'text-white' : 'text-muted'} />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Right Panel: Services Grid */}
                      <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
                            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-1.5">
                              <span>{TAX_COMPLIANCE_DATA[activeSubcatTax].category}</span>
                              <ChevronRight size={14} className="text-blue" />
                            </h4>
                            <span className="text-[11px] font-semibold text-blue">
                              Statutory Advisory
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {TAX_COMPLIANCE_DATA[activeSubcatTax].items.map((item) => (
                              <Link
                                key={item.title}
                                to={item.href}
                                className="group p-3 rounded-2xl border border-line/60 hover:border-blue/40 hover:bg-canvas transition-all"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform shrink-0" />
                                  <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors leading-tight">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="text-[11px] text-graphite line-clamp-2 pl-5.5 leading-snug">
                                  {item.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Assistance Banner */}
                        <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                          <span>Facing an MCA or GST statutory notice?</span>
                          <a href={getWhatsAppLink('Statutory Notice Advisory')} className="font-bold text-blue hover:text-deepblue flex items-center gap-1">
                            <span>Statutory Advisory Desk</span>
                            <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Certifications & Licenses (Two-Panel Mega-Menu) */}
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
                    <span>Licenses</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'certifications' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>

                  {activeDropdown === 'certifications' && (
                    <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      {/* Left Sidebar Subcategories */}
                      <div className="w-[280px] bg-canvas/70 border-r border-line p-3 space-y-1 shrink-0">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 py-1.5 block">
                          Accreditation & Trade
                        </span>
                        {CERTIFICATIONS_DATA.map((sub, idx) => {
                          const active = activeSubcatCert === idx;
                          const SubIcon = sub.icon;
                          return (
                            <button
                              key={sub.id}
                              onMouseEnter={() => setActiveSubcatCert(idx)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                                active
                                  ? 'bg-blue text-white shadow-sm'
                                  : 'text-graphite hover:text-ink hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <SubIcon size={14} className={active ? 'text-white' : 'text-blue'} />
                                <span className="truncate">{sub.category}</span>
                              </div>
                              <ChevronRight size={13} className={active ? 'text-white' : 'text-muted'} />
                            </button>
                          );
                        })}
                      </div>

                      {/* Right Panel: Services Grid */}
                      <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
                            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-1.5">
                              <span>{CERTIFICATIONS_DATA[activeSubcatCert].category}</span>
                              <ChevronRight size={14} className="text-blue" />
                            </h4>
                            <span className="text-[11px] font-semibold text-blue">
                              Official Accreditations
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {CERTIFICATIONS_DATA[activeSubcatCert].items.map((item) => (
                              <Link
                                key={item.title}
                                to={item.href}
                                className="group p-3 rounded-2xl border border-line/60 hover:border-blue/40 hover:bg-canvas transition-all"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <item.icon size={14} className="text-blue group-hover:scale-110 transition-transform shrink-0" />
                                  <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors leading-tight">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="text-[11px] text-graphite line-clamp-2 pl-5.5 leading-snug">
                                  {item.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Assistance Banner */}
                        <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                          <span>Evaluate your sovereign MSME tier</span>
                          <Link to="/tools/msme-checker" className="font-bold text-blue hover:text-deepblue flex items-center gap-1">
                            <span>Launch MSME Checker</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Fundraising & Capital (Dropdown) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('funding')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/funding"
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      location.pathname === '/funding' || activeDropdown === 'funding' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                    }`}
                  >
                    <span>Fundraising</span>
                    <Sparkles size={11} className="text-sky animate-pulse" />
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'funding' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </Link>

                  {activeDropdown === 'funding' && (
                    <div className="absolute top-full left-0 mt-2 w-[360px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
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

                {/* 5. Schemes (Dropdown) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('schemes')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/schemes"
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      location.pathname === '/schemes' || activeDropdown === 'schemes' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                    }`}
                  >
                    <span>Schemes</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'schemes' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </Link>

                  {activeDropdown === 'schemes' && (
                    <div className="absolute top-full left-0 mt-2 w-[390px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
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

                {/* 6. Section 80-IAC Direct */}
                <Link
                  to="/eligibility/80-iac"
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    location.pathname === '/eligibility/80-iac' ? 'text-blue font-bold' : 'text-graphite hover:text-ink'
                  }`}
                >
                  80-IAC Exemption
                </Link>

                {/* 7. Tools (Dropdown) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('tools')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/tools"
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      location.pathname.startsWith('/tools') || activeDropdown === 'tools' ? 'text-blue bg-blue-soft/50' : 'text-graphite hover:text-ink'
                    }`}
                  >
                    <span>Tools</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'tools' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </Link>

                  {activeDropdown === 'tools' && (
                    <div className="absolute top-full left-0 mt-2 w-[360px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
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

                {/* 8. Contact */}
                <Link
                  to="/contact"
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    location.pathname === '/contact' ? 'text-blue font-bold' : 'text-graphite hover:text-ink'
                  }`}
                >
                  Contact
                </Link>

              </nav>

              {/* ACTIONS RIGHT: Search, WhatsApp, CTA */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Global Search Bar / Trigger */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-xs font-medium text-graphite hover:text-ink hover:border-blue/40 hover:bg-canvas transition-all shadow-xs cursor-pointer"
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
        </div>
      </header>

      {/* GLOBAL SEARCH MODAL */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* BROCHURE MODAL */}
      <BrochureModal isOpen={brochureModalOpen} onClose={() => setBrochureModalOpen(false)} />

      {/* MOBILE DRAWER (< xl) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-500 xl:hidden">
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
                <Logo size="sm" link={true} />
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

                {/* Incorporation Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'reg' ? null : 'reg')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas"
                  >
                    <span>Incorporation</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'reg' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>
                  {mobileAccordion === 'reg' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {BUSINESS_REG_DATA.flatMap((s) => s.items).map((item) => (
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

                {/* Tax & Compliance Accordion */}
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
                      {TAX_COMPLIANCE_DATA.flatMap((s) => s.items).map((item) => (
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

                {/* Licenses Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'licenses' ? null : 'licenses')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas"
                  >
                    <span>Licenses & Certifications</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'licenses' ? 'rotate-180 text-blue' : 'text-muted'}`} />
                  </button>
                  {mobileAccordion === 'licenses' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {CERTIFICATIONS_DATA.flatMap((s) => s.items).map((item) => (
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

                {/* Funding */}
                <Link
                  to="/funding"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Fundraising & Grants
                </Link>

                {/* Schemes */}
                <Link
                  to="/schemes"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Government Schemes
                </Link>

                {/* 80-IAC */}
                <Link
                  to="/eligibility/80-iac"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-blue hover:bg-canvas transition-colors"
                >
                  Section 80-IAC Tax Exemption
                </Link>

                {/* Tools */}
                <Link
                  to="/tools"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Founder Tools Suite
                </Link>

                {/* Contact */}
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-canvas transition-colors"
                >
                  Contact & Advisory
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-line space-y-3 bg-canvas/30">
              <a
                href={getWhatsAppLink('mobile menu')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Advisory Desk</span>
              </a>

              <Link
                to="/eligibility"
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-blue text-white text-xs font-bold shadow-md hover:bg-deepblue transition-colors"
              >
                <span>Check Eligibility</span>
                <ArrowUpRight size={14} />
              </Link>

              <div className="text-center pt-2">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="text-xs font-bold text-ink hover:text-blue"
                >
                  Direct Support: {PHONE_NUMBER}
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
