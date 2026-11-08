import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, MessageCircle, ArrowUpRight,
  ChevronRight, Building2, ShieldCheck, Award, FileText,
} from 'lucide-react';
import { SITE, getWhatsAppLink } from '../../lib/constants';
import Logo from '../ui/Logo';
import { gsap } from '../../lib/gsap';

const EXPLORE_LINKS = [
  { label: 'About CertWinX', path: '/about' },
  { label: 'All Services Directory', path: '/services' },
  { label: 'Government Schemes', path: '/schemes' },
  { label: 'Startup India Advisory', path: '/startup' },
  { label: 'Section 80-IAC Exemption', path: '/services/section-80-iac' },
  { label: 'Funding & Seed Grants', path: '/funding' },
  { label: 'MSME & Udyam Services', path: '/msme' },
  { label: 'Business Certifications', path: '/certifications' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Statutory Disclaimer', path: '/disclaimer' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = footerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-footer-block]', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 92%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-deepblue text-white overflow-hidden">
      {/* Subtle radial ambient blue highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(28, 131, 243, 0.4), transparent 60%), radial-gradient(ellipse 50% 60% at 85% 90%, rgba(169, 210, 241, 0.25), transparent 60%)',
        }}
      />

      {/* ============ PRE-FOOTER CONSULTATION BANNER ============ */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sky text-[11px] font-semibold tracking-wider uppercase mb-4">
                <ShieldCheck size={13} className="text-sky" />
                Advisory & Intelligence Partner
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Unlock Government Opportunities.
                <br />
                <span className="text-sky">Accelerate Business Growth.</span>
              </h2>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                Discover startup recognition, tax incentives, government funding, certifications and business compliance solutions with CertWinX.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/eligibility"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue hover:bg-blue-hover text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span>Check Eligibility</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all duration-200"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Talk to Advisor on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MAIN 4-COLUMN FOOTER ============ */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* COLUMN 1: BRAND & MISSION (5 cols) */}
          <div data-footer-block className="lg:col-span-5 flex flex-col">
            <div className="mb-6">
              <Logo size="lg" link={true} />
            </div>

            <div className="mb-6">
              <p className="font-display text-xs font-bold tracking-wider text-sky uppercase leading-relaxed">
                AAPKI TARAKKI KA SAATHI
              </p>
              <p className="text-sm font-semibold text-white/90">
                BHAROSHA APKA, JIMMEDARI HUMARI
              </p>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-6 max-w-md">
              CertWinX is India’s dedicated startup advisory and government scheme intelligence platform, helping ambitious entrepreneurs, MSMEs, and high-growth ventures unlock capital, incentives, and certifications.
            </p>

            <div className="mt-auto space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>CIN / Registration: CertWinX Private Limited</span>
              </div>
              <p>Headquartered in Ahmedabad, Gujarat · Operating Pan-India</p>
            </div>
          </div>

          {/* COLUMN 2: SERVICES & ADVISORY (3 cols) */}
          <div data-footer-block className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
              <Building2 size={14} className="text-sky" />
              Advisory Solutions
            </h3>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 text-xs text-white/75 hover:text-white transition-colors"
                  >
                    <ChevronRight size={12} className="text-sky/60 group-hover:text-sky transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT & HEADQUARTERS (4 cols) */}
          <div data-footer-block className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold tracking-wider uppercase text-white pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
              <Phone size={14} className="text-sky" />
              Direct Advisory Office
            </h3>
            
            <ul className="space-y-3.5 text-xs text-white/75">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-sky mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {SITE.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-sky shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors font-semibold">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-sky shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={15} className="text-emerald-400 shrink-0" />
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 transition-colors font-medium">
                  WhatsApp Support (Mon–Sat, 9AM–6PM IST)
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[11px] font-medium text-white/90 mb-1">
                Need Fast Advisory?
              </p>
              <p className="text-[11px] text-white/60 mb-3">
                Connect with our team to verify your startup eligibility and required documentation.
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky hover:underline"
              >
                Schedule an Advisory Call <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* ============ STATUTORY DISCLAIMER ============ */}
        <div data-footer-block className="mt-12 pt-8 border-t border-white/10">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-[11px] text-white/60 leading-relaxed">
            <span className="font-semibold text-white/80 block mb-1">Statutory Notice & Regulatory Compliance:</span>
            CertWinX Private Limited is an independent startup advisory, documentation assistance, and business compliance consulting firm. We are not a government agency, department, or affiliated government body of DPIIT, Ministry of Commerce, Ministry of Finance, or MSME. All government schemes, subsidies, seed grants, and Section 80-IAC approvals are granted strictly at the sole discretion of the respective statutory authorities and evaluation boards. CertWinX provides end-to-end advisory, eligibility assessment, and application preparation assistance.
          </div>
        </div>

        {/* ============ BOTTOM LEGAL BAR ============ */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} CertWinX Private Limited. All rights reserved.</p>

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
