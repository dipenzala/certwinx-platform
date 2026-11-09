import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
  Building2,
  ShieldCheck,
  Award,
  FileText,
  Sparkles,
  Rocket,
  Landmark,
  Scale,
  Coins,
  Globe,
  Leaf,
  Percent,
} from 'lucide-react';
import { SITE, getWhatsAppLink } from '../../lib/constants';
import Logo from '../ui/Logo';

/* ============================================================
   10 ADVISORY SOLUTIONS (Verified Existing Routes)
   ============================================================ */
const ADVISORY_SOLUTIONS = [
  { label: 'Business Incorporation', path: '/services/private-limited-company', icon: Building2 },
  { label: 'Startup India & DPIIT', path: '/services/dpiit-recognition', icon: Rocket },
  { label: 'Section 80-IAC Tax Exemption', path: '/services/section-80-iac', icon: Percent },
  { label: 'Government Schemes Explorer', path: '/schemes', icon: Landmark },
  { label: 'Startup Funding & Seed Grants', path: '/funding', icon: Coins },
  { label: 'MSME & Udyam Services', path: '/msme', icon: Award },
  { label: 'Tax & Corporate Compliance', path: '/services/pvt-ltd-annual-compliance', icon: Scale },
  { label: 'Business Certifications & ISO', path: '/services/iso-9001', icon: ShieldCheck },
  { label: 'Intellectual Property (IP)', path: '/services/trademark-registration', icon: Globe },
  { label: 'Founder Tools & Calculators', path: '/tools', icon: Sparkles },
];

/* ============================================================
   COMPANY & RESOURCES (Verified Existing Routes)
   ============================================================ */
const COMPANY_LINKS = [
  { label: 'About CertWinX', path: '/about' },
  { label: 'Startup Resources', path: '/resources' },
  { label: 'Advisory Blogs & Insights', path: '/blog' },
  { label: 'Case Studies & Frameworks', path: '/case-studies' },
  { label: 'Eligibility Diagnostic', path: '/eligibility' },
  { label: 'Contact Advisory Desk', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Statutory Disclaimer', path: '/disclaimer' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
];

export default function Footer() {
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);

  const toggleAccordion = (key) => {
    setOpenMobileAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <footer className="relative bg-gradient-to-b from-deepblue via-[#0d2860] to-[#07183d] text-white overflow-hidden border-t border-white/10">
      
      {/* Decorative SVG Ecosystem Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(169, 210, 241, 0.25)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Ambient Radial Soft Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-blue/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-sky/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ============ PRE-FOOTER CONSULTATION BANNER ============ */}
      <div className="relative border-b border-white/10 z-10">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-md">
            
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sky text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mb-3">
                <ShieldCheck size={13} className="text-sky" />
                <span>Sovereign Schemes & Advisory Intelligence Partner</span>
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Unlock Sovereign Opportunities.{' '}
                <span className="text-sky block sm:inline">Accelerate Enterprise Growth.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                Connect with our Senior Statutory Analysts in Ahmedabad for end-to-end guidance across DPIIT, Section 80-IAC, capital grants, and corporate compliance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                to="/eligibility"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue hover:bg-white hover:text-deepblue text-white text-xs font-bold shadow-md transition-all duration-200"
              >
                <span>Check Scheme Eligibility</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href={getWhatsAppLink('Footer Consultation')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold transition-all duration-200 shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ============ MAIN 4-COLUMN ENTERPRISE FOOTER ============ */}
      <div className="relative max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* COLUMN 1: BRAND IDENTITY (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo (No nested anchor) */}
              <div className="mb-4 inline-block">
                <Logo size="lg" link={true} />
              </div>

              {/* Tagline */}
              <div className="mb-4">
                <p className="font-display text-[11px] font-bold tracking-wider text-sky uppercase">
                  AAPKI TARAKKI KA SAATHI
                </p>
                <p className="text-xs font-bold text-white/90">
                  BHAROSHA APKA, JIMMEDARI HUMARI
                </p>
              </div>

              {/* Professional Introduction */}
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                CertWinX Private Limited is India’s premier startup advisory and government scheme intelligence platform. Headquartered in Ahmedabad, Gujarat, we assist high-growth founders, MSMEs, and enterprises nationwide to structure statutory compliance, unlock non-dilutive sovereign capital, and secure official accreditations.
              </p>
            </div>

            {/* Entity Accreditation Summary */}
            <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white/80">CertWinX Private Limited</span>
              </div>
              <p className="text-[11px]">Headquarters: Ahmedabad, Gujarat · Operating Pan-India</p>
            </div>
          </div>

          {/* COLUMN 2: ADVISORY SOLUTIONS (4 cols) — Desktop & Mobile Accordion */}
          <div className="lg:col-span-4">
            {/* Desktop Header */}
            <h3 className="hidden lg:flex font-display text-xs font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-4 items-center gap-2">
              <Building2 size={14} className="text-sky" />
              <span>Advisory Solutions</span>
            </h3>

            {/* Mobile Accordion Toggle */}
            <button
              onClick={() => toggleAccordion('solutions')}
              className="lg:hidden w-full flex items-center justify-between font-display text-xs font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-2"
            >
              <span className="flex items-center gap-2">
                <Building2 size={14} className="text-sky" />
                <span>Advisory Solutions (10 Categories)</span>
              </span>
              <ChevronDown size={14} className={`transition-transform ${openMobileAccordion === 'solutions' ? 'rotate-180 text-sky' : 'text-white/60'}`} />
            </button>

            {/* Links List */}
            <div className={`${openMobileAccordion === 'solutions' ? 'block' : 'hidden lg:block'} space-y-1`}>
              <ul className="grid sm:grid-cols-2 gap-x-3 gap-y-2">
                {ADVISORY_SOLUTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        className="group flex items-center gap-2 text-xs text-white/75 hover:text-white transition-colors py-1"
                      >
                        <Icon size={12} className="text-sky/70 group-hover:text-sky transition-colors shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* COLUMN 3: RESOURCES & COMPANY (2 cols) */}
          <div className="lg:col-span-2">
            {/* Desktop Header */}
            <h3 className="hidden lg:flex font-display text-xs font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-4 items-center gap-2">
              <FileText size={14} className="text-sky" />
              <span>Company</span>
            </h3>

            {/* Mobile Accordion Toggle */}
            <button
              onClick={() => toggleAccordion('company')}
              className="lg:hidden w-full flex items-center justify-between font-display text-xs font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-2"
            >
              <span className="flex items-center gap-2">
                <FileText size={14} className="text-sky" />
                <span>Company & Resources</span>
              </span>
              <ChevronDown size={14} className={`transition-transform ${openMobileAccordion === 'company' ? 'rotate-180 text-sky' : 'text-white/60'}`} />
            </button>

            {/* Links List */}
            <div className={`${openMobileAccordion === 'company' ? 'block' : 'hidden lg:block'} space-y-2`}>
              <ul className="space-y-1.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-1.5 text-xs text-white/75 hover:text-white transition-colors py-0.5"
                    >
                      <span className="text-sky/60 group-hover:text-sky transition-colors">›</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 4: DIRECT CONTACT DETAILS (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-xs font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
              <Phone size={14} className="text-sky" />
              <span>Direct Office</span>
            </h3>

            <ul className="space-y-3 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-sky mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {SITE.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-sky shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors font-bold text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-sky shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/918128931029?text=Hello%20CertWinX,%20I%20would%20like%20to%20inquire%20about%20advisory%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors font-semibold"
                >
                  WhatsApp: +91 81289 31029
                </a>
              </li>
            </ul>

            {/* Quick Action Pill */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-sky transition-colors"
              >
                <span>Schedule Advisory Call</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

        </div>

        {/* ============ STATUTORY REGULATORY NOTICE ============ */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="p-4 sm:p-5 rounded-2xl bg-black/25 border border-white/5 text-[11px] text-white/60 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-2 text-white/80 font-bold">
              <ShieldCheck size={14} className="text-sky shrink-0" />
              <span>Statutory Regulatory Disclosure & Autonomous Advisory Standard:</span>
            </div>
            <p>
              CertWinX Private Limited is an autonomous private corporate advisory, statutory documentation, and venture feasibility consulting organization registered under the Companies Act, 2013 in Ahmedabad, Gujarat. CertWinX is not a government department, ministry, or regulatory agency of DPIIT, the Ministry of Commerce & Industry, the Ministry of Finance, or the Ministry of MSME. All sovereign certifications, 80-IAC tax holidays, capital subsidies, and CGSS credit facilities are sanctioned strictly at the independent discretion of their respective evaluation committees and statutory boards.
            </p>
          </div>
        </div>

        {/* ============ BOTTOM LEGAL BAR ============ */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} CertWinX Private Limited. All rights reserved. Pan-India Advisory.</p>

          <div className="flex flex-wrap items-center gap-4">
            {LEGAL_LINKS.map((item) => (
              <Link key={item.path} to={item.path} className="hover:text-sky transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
