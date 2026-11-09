import { useEffect, useRef, useState, useCallback } from 'react';
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
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';
import GlobalSearchModal from './GlobalSearchModal';
import BrochureModal from '../ui/BrochureModal';

/* ============================================================
   TWO-PANEL MEGA-MENU TAXONOMY (CorporateMart Benchmark Depth)
   ============================================================ */

/* 1. SERVICES MEGA-MENU (6 Verticals - Two-Panel Architecture) */
const SERVICES_MEGA_DATA = [
  {
    id: 'incorporation',
    category: 'Company Incorporation',
    icon: Building2,
    badge: 'POPULAR ✨',
    desc: 'Statutory legal structures for venture growth',
    items: [
      { title: 'Private Limited Company', desc: "India's gold standard corporate structure for venture funding & DPIIT", href: '/services/private-limited-company', icon: Building2 },
      { title: 'Limited Liability Partnership (LLP)', desc: 'Limited liability protection with lower statutory audit overhead', href: '/services/llp-registration', icon: Users },
      { title: 'One Person Company (OPC)', desc: 'Single-promoter limited liability corporate entity for solo innovators', href: '/services/one-person-company', icon: Building2 },
      { title: 'Section 8 Non-Profit Company', desc: 'Central corporate registration for philanthropic & CSR projects', href: '/services/section-8-company', icon: Award },
      { title: 'Startup All-in-One SPICe+ Package', desc: 'MCA SPICe+, DIN, DSC, PAN, TAN, GST, PF, ESIC & Statutory Bank Account', href: '/services/private-limited-company', icon: Rocket },
      { title: 'Entity Structure Comparison', desc: 'Compare Pvt Ltd vs LLP vs OPC vs Partnership side by side', href: '/tools/structure-comparison', icon: Scale },
    ],
  },
  {
    id: 'tax',
    category: 'Tax & Compliance',
    icon: Receipt,
    badge: null,
    desc: 'Statutory GST, ITR, and corporate MCA secretarial',
    items: [
      { title: 'GST Registration', desc: 'Fast-track GSTIN allotment with ARN generation and bank link', href: '/services/gst-registration', icon: Receipt },
      { title: 'GST Return Filing (GSTR-1 & 3B)', desc: 'Monthly ITC reconciliation, GSTR-2B matching, and zero-defect filing', href: '/services/gst-filing', icon: ReceiptText },
      { title: 'Corporate ITR-6 Filing', desc: 'Statutory income tax returns aligned with audited financial statements', href: '/services/corporate-itr', icon: Landmark },
      { title: 'Pvt Ltd Annual MCA Compliance', desc: 'MCA filings AOC-4, MGT-7, ADT-1, Director Report, and AGM minutes', href: '/services/pvt-ltd-annual-compliance', icon: ClipboardCheck },
      { title: 'Director KYC (DIR-3 KYC)', desc: 'Annual statutory DIN reactivation preventing MCA director disqualification', href: '/services/director-kyc', icon: ShieldCheck },
      { title: 'Section 80-IAC 100% Tax Holiday', desc: '100% deduction on corporate profits for 3 consecutive years out of 10', href: '/eligibility/80-iac', icon: Percent },
    ],
  },
  {
    id: 'msme',
    category: 'MSME & Accreditations',
    icon: Award,
    badge: 'POPULAR ✨',
    desc: 'Sovereign MSME privileges and subsidies',
    items: [
      { title: 'MSME Udyam Registration', desc: 'Permanent sovereign MSME certificate with QR code for priority bank credit', href: '/services/udyam-registration', icon: Award },
      { title: 'MSME ZED Certification', desc: 'Zero Defect Zero Effect (Bronze, Silver, Gold) with up to 80% subsidy', href: '/services/msme-zed', icon: Leaf },
      { title: 'MSME Samadhaan Filing', desc: 'Delayed commercial payment recovery portal filing under MSMED Act Section 18', href: '/msme', icon: Scale },
      { title: 'GeM Portal Registration', desc: 'Government e-Marketplace vendor onboarding for public tenders', href: '/services/gem-registration', icon: Globe },
    ],
  },
  {
    id: 'licenses',
    category: 'Licenses & Trade',
    icon: Globe,
    badge: null,
    desc: 'State, municipal, and international trade authorizations',
    items: [
      { title: 'FSSAI Food Business License', desc: 'Mandatory 14-digit central/state license for cloud kitchens & F&B', href: '/services/fssai-license', icon: ShieldCheck },
      { title: 'Import Export Code (IEC)', desc: '10-digit DGFT trade identifier mandatory for all international exports', href: '/services/iec-code', icon: Globe },
      { title: 'Shop & Establishment License', desc: 'State municipal commercial premises license with local authority', href: '/services/trade-license', icon: Building2 },
      { title: 'ISO 9001:2015 Certification', desc: 'Quality Management System required for institutional & GeM tenders', href: '/services/iso-9001', icon: ShieldCheck },
    ],
  },
  {
    id: 'startup-incentives',
    category: 'Startup & Exemptions',
    icon: Rocket,
    badge: 'HIGH VALUE 🔥',
    desc: 'DPIIT, Angel Tax, and IMB Tax Holidays',
    items: [
      { title: 'Startup India DPIIT Recognition', desc: 'Official DPIIT sovereign certificate for patent rebates and NSWS access', href: '/services/dpiit-recognition', icon: Rocket },
      { title: 'Section 80-IAC Tax Exemption', desc: '100% corporate tax holiday for 3 consecutive years approved by IMB', href: '/eligibility/80-iac', icon: Percent },
      { title: 'Section 56 Angel Tax Exemption', desc: 'Exemption from tax scrutiny on premium equity funding from angels/VCs', href: '/startup', icon: ShieldCheck },
      { title: 'Startup India Seed Fund (SISFS)', desc: 'Early-stage prototype validation and commercialization grant up to ₹50L', href: '/schemes/startup-india-seed-fund', icon: Coins },
    ],
  },
  {
    id: 'ngo',
    category: 'NGO & Philanthropy',
    icon: Landmark,
    badge: null,
    desc: 'Charitable entities and donor tax exemptions',
    items: [
      { title: 'NGO DARPAN Registration', desc: 'NITI Aayog portal onboarding mandatory for central ministry grants', href: '/services/ngo-darpan', icon: Landmark },
      { title: '12A & 80G Tax Exemption', desc: '100% tax exemption on NGO surplus + 50% tax rebate for corporate donors', href: '/services/12a-80g-registration', icon: Percent },
      { title: 'Trust & Society Registration', desc: 'State registrar registration for charitable trusts & social foundations', href: '/services/trust-society-registration', icon: FileCheck },
    ],
  },
];

/* 2. SCHEMES DROPDOWN DATA */
const SCHEMES_MENU = [
  { title: 'Startup India Seed Fund (SISFS)', desc: 'Early-stage prototype grant up to ₹20L / ₹50L debt', href: '/schemes/startup-india-seed-fund', tag: 'DPIIT Grant' },
  { title: 'Section 80-IAC Corporate Tax Exemption', desc: '3 consecutive years 100% tax holiday approved by IMB', href: '/eligibility/80-iac', tag: 'Tax Holiday' },
  { title: 'Credit Guarantee Scheme for Startups (CGSS)', desc: 'Collateral-free loans up to ₹10 Crore with sovereign cover', href: '/schemes/cgss', tag: 'Debt Facility' },
  { title: 'PMEGP MSME Capital Subsidy', desc: 'Up to 35% margin money subsidy on project costs up to ₹50L', href: '/schemes/pmegp', tag: 'MSME Subsidy' },
  { title: 'BIRAC Biotechnology Ignition Grant (BIG)', desc: 'Up to ₹50 Lakhs non-dilutive grant for bio-innovators', href: '/schemes/birac-big', tag: 'Biotech Grant' },
  { title: 'Gujarat State Startup Scheme (i-Hub)', desc: 'Up to ₹30 Lakhs seed support + monthly founder sustenance', href: '/schemes/gujarat-startup-policy', tag: 'State Policy' },
  { title: 'Explore All 18+ Central & State Schemes', desc: 'Interactive state directory, comparison matrix, and filters', href: '/schemes', tag: 'Directory' },
];

/* 3. CERTIFICATIONS & LICENSES DROPDOWN DATA */
const CERTIFICATIONS_MENU = [
  { title: 'MSME Udyam Registration', desc: 'Permanent sovereign MSME certificate with QR code for priority credit', href: '/services/udyam-registration', icon: Award, tag: 'Sovereign' },
  { title: 'MSME ZED Certification', desc: 'Zero Defect Zero Effect (Bronze, Silver, Gold) with up to 80% subsidy', href: '/services/msme-zed', icon: Leaf, tag: '80% Subsidy' },
  { title: 'ISO 9001:2015 (QMS)', desc: 'Quality Management System required for institutional & GeM tenders', href: '/services/iso-9001', icon: ShieldCheck, tag: 'Quality' },
  { title: 'ISO 27001 (ISMS)', desc: 'Information Security Management System mandatory for enterprise SaaS', href: '/services/iso-9001', icon: Shield, tag: 'Security' },
  { title: 'FSSAI Food Business License', desc: '14-digit mandatory food license for cloud kitchens, restaurants & FMCG', href: '/services/fssai-license', icon: FileCheck, tag: 'Food' },
  { title: 'Import Export Code (IEC)', desc: 'DGFT 10-digit international trade code for global export-import', href: '/services/iec-code', icon: Globe, tag: 'Trade' },
];

/* 4. FUNDING & CAPITAL DROPDOWN DATA */
const FUNDING_MENU = [
  { title: 'Non-Dilutive Capital Grants', desc: 'SISFS, DST NIDHI PRAYAS, BIRAC BIG with 0% equity dilution', href: '/funding', icon: Coins, tag: '0% Equity' },
  { title: 'Collateral-Free Credit Guarantees', desc: 'CGSS up to ₹10 Cr and CGTMSE up to ₹5 Cr without personal security', href: '/funding', icon: ShieldCheck, tag: 'Collateral-Free' },
  { title: 'Capital & Margin Subsidies', desc: 'PMEGP 15%–35% margin money & ZED certification fee reimbursements', href: '/funding', icon: Award, tag: 'Government' },
  { title: 'Institutional Term Loans & MUDRA', desc: 'Concessionary bank debt up to ₹20 Lakhs under MUDRA Tarun Plus', href: '/funding', icon: Landmark, tag: 'Banking' },
];

export default function Header({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubcatIndex, setActiveSubcatIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const headerRef = useRef(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  // Sync mobile open state with parent (AppShell)
  useEffect(() => {
    onMenuToggle?.(mobileOpen);
  }, [mobileOpen, onMenuToggle]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K for search, ESC to close menus
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

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = useCallback((key) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  }, []);

  const toggleDropdown = (key) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[500] transition-all duration-300"
      >
        {/* ============ TOP UTILITY BAR (Live Enterprise Sovereign Desk) ============ */}
        <div className="hidden lg:block bg-[#040816]/95 border-b border-white/8 text-white py-1.5 text-[11px] backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left: Phone Support & Desk Notice */}
            <div className="flex items-center gap-4 xl:gap-6">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
              >
                <Phone size={11} className="text-[#1C83F3]" />
                <span>For Support: <strong className="text-white font-bold">+91 81289 31029</strong></span>
              </a>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/60 text-[11px]">Ahmedabad, Gujarat · Sovereign Schemes & Advisory Desk</span>
            </div>

            {/* Right: Brochure 2026, Need Help Dropdown */}
            <div className="flex items-center gap-4 text-[11px]">
              {/* Brochure Download / Modal */}
              <button
                onClick={() => setBrochureModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <FileText size={11} className="text-[#1C83F3]" />
                <span>Brochure 2026</span>
              </button>

              <span className="w-1 h-1 rounded-full bg-white/20" />

              {/* Need Help Dropdown */}
              <div className="relative group">
                <button className="inline-flex items-center gap-1 text-white/80 group-hover:text-white transition-colors cursor-pointer">
                  <span>Need Help?</span>
                  <ChevronDown size={11} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-[600]">
                  <div className="w-64 bg-[#0B132B] rounded-2xl shadow-2xl border border-white/15 p-2 text-white animate-in fade-in zoom-in-95 duration-150">
                    <a
                      href={getWhatsAppLink('Helpdesk')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-xs font-semibold text-white"
                    >
                      <MessageCircle size={14} className="text-emerald-400" />
                      <span>Instant WhatsApp Desk</span>
                    </a>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-xs font-semibold text-white/80 hover:text-white"
                    >
                      <Users size={14} className="text-[#1C83F3]" />
                      <span>Book 1:1 Consultation</span>
                    </Link>
                    <Link
                      to="/eligibility/80-iac"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-xs font-semibold text-white/80 hover:text-white"
                    >
                      <Percent size={14} className="text-[#1C83F3]" />
                      <span>80-IAC Tax Exemption Desk</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ MAIN NAVIGATION BAR (Deep Navy Glassmorphic Live Site Aesthetics) ============ */}
        <div
          className={`transition-all duration-300 bg-[#060D24]/95 backdrop-blur-md border-b border-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${
            scrolled ? 'py-2 sm:py-2.5' : 'py-2.5 sm:py-3.5'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 xl:gap-4">

              {/* BRAND LOGO */}
              <div className="shrink-0 flex items-center">
                <Logo size="md" link={true} className="transition-transform hover:scale-102" />
              </div>

              {/* DESKTOP PRIMARY NAVIGATION */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs" aria-label="Main Navigation">

                {/* 1. About */}
                <Link
                  to="/about"
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    location.pathname === '/about' ? 'text-[#1C83F3] font-bold bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  About
                </Link>

                {/* 2. Services (Two-Panel Mega-Menu - CorporateMart Depth) */}
                <div
                  className="relative shrink-0"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown('services')}
                    className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activeDropdown === 'services' || location.pathname.startsWith('/services')
                        ? 'text-[#1C83F3] font-bold bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    aria-expanded={activeDropdown === 'services'}
                  >
                    <span>Services</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>

                  {/* Mega-Menu Panel with Zero-Gap Wrapper */}
                  {activeDropdown === 'services' && (
                    <div
                      className="absolute top-full left-[-80px] xl:left-0 pt-2 z-[600] pointer-events-auto"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[840px] bg-white rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] border border-line overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150 text-ink">
                        
                        {/* Left Sidebar Verticals */}
                        <div className="w-[280px] bg-[#F7F9FC] border-r border-line p-3.5 space-y-1 shrink-0">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 py-1 block">
                            Service Verticals
                          </span>
                          {SERVICES_MEGA_DATA.map((sub, idx) => {
                            const active = activeSubcatIndex === idx;
                            const SubIcon = sub.icon;
                            return (
                              <button
                                key={sub.id}
                                onMouseEnter={() => setActiveSubcatIndex(idx)}
                                onClick={() => setActiveSubcatIndex(idx)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                                  active
                                    ? 'bg-[#1C83F3] text-white shadow-md'
                                    : 'text-graphite hover:text-ink hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <SubIcon size={15} className={active ? 'text-white' : 'text-[#1C83F3]'} />
                                  <span className="truncate">{sub.category}</span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  {sub.badge && (
                                    <span className={`text-[8px] font-black px-1.5 py-0.2 rounded ${active ? 'bg-white/20 text-white' : 'bg-[#1C83F3]/10 text-[#1C83F3]'}`}>
                                      HOT
                                    </span>
                                  )}
                                  <ChevronRight size={13} className={active ? 'text-white' : 'text-muted'} />
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Right Panel: Service Cards Grid */}
                        <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
                              <div>
                                <h4 className="font-display text-sm font-bold text-ink flex items-center gap-1.5">
                                  <span>{SERVICES_MEGA_DATA[activeSubcatIndex].category}</span>
                                  <ChevronRight size={14} className="text-[#1C83F3]" />
                                </h4>
                                <p className="text-[11px] text-graphite mt-0.5">
                                  {SERVICES_MEGA_DATA[activeSubcatIndex].desc}
                                </p>
                              </div>
                              <span className="text-[11px] font-bold text-[#1C83F3] bg-[#1C83F3]/10 px-2.5 py-0.5 rounded-full">
                                {SERVICES_MEGA_DATA[activeSubcatIndex].items.length} Services
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {SERVICES_MEGA_DATA[activeSubcatIndex].items.map((item) => (
                                <Link
                                  key={item.title}
                                  to={item.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group p-3 rounded-2xl border border-line/60 hover:border-[#1C83F3]/40 hover:bg-[#F7F9FC] transition-all"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <item.icon size={15} className="text-[#1C83F3] group-hover:scale-110 transition-transform shrink-0" />
                                    <span className="text-xs font-bold text-ink group-hover:text-[#1C83F3] transition-colors leading-tight">
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
                            <span>Need guidance selecting statutory compliance?</span>
                            <a
                              href={getWhatsAppLink('Service guidance')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-[#1C83F3] hover:text-[#0A1128] flex items-center gap-1"
                            >
                              <span>Talk to an Advisor</span>
                              <ArrowUpRight size={12} />
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Schemes (Dropdown) */}
                <div
                  className="relative shrink-0"
                  onMouseEnter={() => handleMouseEnter('schemes')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown('schemes')}
                    className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activeDropdown === 'schemes' || location.pathname.startsWith('/schemes')
                        ? 'text-[#1C83F3] font-bold bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    aria-expanded={activeDropdown === 'schemes'}
                  >
                    <span>Schemes</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'schemes' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>

                  {activeDropdown === 'schemes' && (
                    <div
                      className="absolute top-full left-0 pt-2 z-[600] pointer-events-auto"
                      onMouseEnter={() => handleMouseEnter('schemes')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[420px] bg-white rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 text-ink">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-line px-1">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            Central & State Schemes
                          </span>
                          <Link to="/schemes" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-[#1C83F3] hover:underline flex items-center gap-0.5">
                            <span>View All</span>
                            <ArrowUpRight size={11} />
                          </Link>
                        </div>
                        <div className="space-y-1.5">
                          {SCHEMES_MENU.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group block p-2.5 rounded-2xl hover:bg-[#F7F9FC] transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-ink group-hover:text-[#1C83F3] transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[9px] font-bold text-[#1C83F3] bg-[#1C83F3]/10 px-2 py-0.5 rounded-full border border-[#1C83F3]/20 shrink-0">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-graphite line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Certifications (Dropdown) */}
                <div
                  className="relative shrink-0"
                  onMouseEnter={() => handleMouseEnter('certifications')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown('certifications')}
                    className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activeDropdown === 'certifications' || location.pathname.startsWith('/certifications')
                        ? 'text-[#1C83F3] font-bold bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    aria-expanded={activeDropdown === 'certifications'}
                  >
                    <span>Certifications</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'certifications' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>

                  {activeDropdown === 'certifications' && (
                    <div
                      className="absolute top-full left-0 pt-2 z-[600] pointer-events-auto"
                      onMouseEnter={() => handleMouseEnter('certifications')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[420px] bg-white rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 text-ink">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-line px-1">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            Accreditations & Quality Standards
                          </span>
                          <Link to="/certifications" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-[#1C83F3] hover:underline flex items-center gap-0.5">
                            <span>Overview</span>
                            <ArrowUpRight size={11} />
                          </Link>
                        </div>
                        <div className="space-y-1.5">
                          {CERTIFICATIONS_MENU.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group block p-2.5 rounded-2xl hover:bg-[#F7F9FC] transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <item.icon size={15} className="text-[#1C83F3] group-hover:scale-110 transition-transform" />
                                  <span className="text-xs font-bold text-ink group-hover:text-[#1C83F3] transition-colors">
                                    {item.title}
                                  </span>
                                </div>
                                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-graphite line-clamp-1 mt-0.5 pl-5.5">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Funding (Dropdown) */}
                <div
                  className="relative shrink-0"
                  onMouseEnter={() => handleMouseEnter('funding')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown('funding')}
                    className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activeDropdown === 'funding' || location.pathname.startsWith('/funding')
                        ? 'text-[#1C83F3] font-bold bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    aria-expanded={activeDropdown === 'funding'}
                  >
                    <span>Funding</span>
                    <Sparkles size={11} className="text-sky animate-pulse" />
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'funding' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>

                  {activeDropdown === 'funding' && (
                    <div
                      className="absolute top-full left-0 pt-2 z-[600] pointer-events-auto"
                      onMouseEnter={() => handleMouseEnter('funding')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[390px] bg-white rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] border border-line p-4 animate-in fade-in slide-in-from-top-2 duration-150 text-ink">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-line px-1">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            Institutional Capital & Grants
                          </span>
                          <Link to="/funding" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-[#1C83F3] hover:underline flex items-center gap-0.5">
                            <span>Directory</span>
                            <ArrowUpRight size={11} />
                          </Link>
                        </div>
                        <div className="space-y-1.5">
                          {FUNDING_MENU.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group block p-2.5 rounded-2xl hover:bg-[#F7F9FC] transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <item.icon size={15} className="text-[#1C83F3] group-hover:scale-110 transition-transform" />
                                  <span className="text-xs font-bold text-ink group-hover:text-[#1C83F3] transition-colors">
                                    {item.title}
                                  </span>
                                </div>
                                <span className="text-[9px] font-bold text-[#1C83F3] bg-[#1C83F3]/10 px-2 py-0.5 rounded-full border border-[#1C83F3]/20 shrink-0">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-graphite line-clamp-1 mt-0.5 pl-5.5">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Startup India (DPIIT) */}
                <Link
                  to="/startup"
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    location.pathname === '/startup' ? 'text-[#1C83F3] font-bold bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Startup India
                </Link>

                {/* 7. 80-IAC (Tax Holiday Pill with Glowing Badge) */}
                <Link
                  to="/eligibility/80-iac"
                  className={`inline-flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    location.pathname === '/eligibility/80-iac'
                      ? 'text-[#1C83F3] font-bold bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="whitespace-nowrap">80-IAC</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#1C83F3]/25 border border-[#1C83F3]/50 text-sky shadow-[0_0_10px_rgba(28,131,243,0.35)] leading-none whitespace-nowrap">
                    100% Tax Holiday
                  </span>
                </Link>

                {/* 8. Contact */}
                <Link
                  to="/contact"
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    location.pathname === '/contact' ? 'text-[#1C83F3] font-bold bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Contact
                </Link>

              </nav>

              {/* ACTIONS RIGHT: Metric Capsule, Search, WhatsApp Desk, Check Eligibility CTA, Mobile Hamburger */}
              <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">

                {/* LIVE METRIC CAPSULE (Visible on 2XL wide screens 1536px+ so standard laptops never overflow) */}
                <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131E3D] border border-white/15 text-xs text-white shadow-inner shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-semibold text-[11px] text-white/90 whitespace-nowrap">99% Success</span>
                  <span className="text-[11px] text-[#A9D2F1] font-bold flex items-center gap-0.5 whitespace-nowrap">
                    <ArrowUpRight size={11} />
                    <span>+2.1%</span>
                  </span>
                </div>

                {/* GLOBAL SEARCH TRIGGER */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden lg:flex items-center gap-1.5 p-1.5 xl:px-2.5 xl:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer text-xs shrink-0"
                  aria-label="Search CertWinX services"
                >
                  <Search size={13} className="text-[#1C83F3]" />
                  <span className="hidden 2xl:inline text-[11px] whitespace-nowrap">Search</span>
                  <kbd className="hidden 2xl:inline-block px-1 py-0.2 rounded text-[9px] bg-white/10 text-white/60 font-mono">⌘K</kbd>
                </button>

                {/* WhatsApp Advisory Desk (Live Site Style) */}
                <a
                  href={getWhatsAppLink('Website Header Enquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/25 text-xs font-bold whitespace-nowrap transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)] shrink-0"
                  aria-label="Contact CertWinX on WhatsApp"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <MessageCircle size={13} className="text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                {/* Primary CTA: CHECK ELIGIBILITY (Guaranteed inside screen bounds with zero clipping) */}
                <Link
                  to="/eligibility"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#1C83F3] to-[#0A47CC] hover:from-[#2B92FF] hover:to-[#1656E8] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-[0_4px_20px_rgba(28,131,243,0.4)] hover:shadow-[0_6px_25px_rgba(28,131,243,0.6)] hover:scale-102 transition-all shrink-0 mr-1 sm:mr-3"
                >
                  <span>CHECK ELIGIBILITY</span>
                  <ArrowUpRight size={13} />
                </Link>

                {/* Mobile Hamburger Button */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
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

      {/* MOBILE DRAWER (< lg) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[600] lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#040814]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-[#070E22] text-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-white/10">
            {/* Header */}
            <div>
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/30">
                <Logo size="sm" link={true} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar in Mobile Menu */}
              <div className="p-4 border-b border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 hover:text-white transition-colors"
                >
                  <Search size={15} className="text-[#1C83F3]" />
                  <span>Search 40+ services & schemes...</span>
                </button>
              </div>

              {/* Mobile Navigation List with Accordions */}
              <div className="p-4 space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  About CertWinX
                </Link>

                {/* Services Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10"
                  >
                    <span>All Services ({SERVICES_MEGA_DATA.length} Verticals)</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'services' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>
                  {mobileAccordion === 'services' && (
                    <div className="pl-4 pr-2 py-1 space-y-2">
                      {SERVICES_MEGA_DATA.map((cat) => (
                        <div key={cat.id} className="pt-1">
                          <span className="text-[10px] font-bold text-[#1C83F3] uppercase tracking-wider block mb-1">
                            {cat.category}
                          </span>
                          <div className="space-y-1">
                            {cat.items.map((item) => (
                              <Link
                                key={item.title}
                                to={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-2.5 py-1 rounded-lg text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Schemes Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'schemes' ? null : 'schemes')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10"
                  >
                    <span>Government Schemes</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'schemes' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>
                  {mobileAccordion === 'schemes' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {SCHEMES_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Certifications Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'certs' ? null : 'certs')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10"
                  >
                    <span>Certifications & Licenses</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'certs' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>
                  {mobileAccordion === 'certs' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {CERTIFICATIONS_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Funding Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'funding' ? null : 'funding')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10"
                  >
                    <span>Fundraising & Grants</span>
                    <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'funding' ? 'rotate-180 text-[#1C83F3]' : 'text-white/50'}`} />
                  </button>
                  {mobileAccordion === 'funding' && (
                    <div className="pl-4 pr-2 py-1 space-y-1">
                      {FUNDING_MENU.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Startup India */}
                <Link
                  to="/startup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Startup India & DPIIT
                </Link>

                {/* 80-IAC */}
                <Link
                  to="/eligibility/80-iac"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-[#1C83F3] hover:bg-white/10 transition-colors"
                >
                  Section 80-IAC (100% Tax Holiday)
                </Link>

                {/* Tools */}
                <Link
                  to="/tools"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Founder Tools Suite
                </Link>

                {/* Contact */}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Contact & Advisory
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/10 space-y-3 bg-black/40">
              <a
                href={getWhatsAppLink('mobile menu')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Advisory Desk</span>
              </a>

              <Link
                to="/eligibility"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-[#1C83F3] to-[#0E60D2] text-white text-xs font-bold shadow-lg hover:brightness-110 transition-colors"
              >
                <span>Check Eligibility</span>
                <ArrowUpRight size={14} />
              </Link>

              <div className="text-center pt-2">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="text-xs font-bold text-white/80 hover:text-[#1C83F3]"
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
