import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Landmark, Award, Receipt, FileText, ClipboardCheck, ArrowUpRight, BookOpen } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import RevealOnScroll from '../components/motion/RevealOnScroll';

const CATS = [
  { icon: TrendingUp, label: 'Startup India & DPIIT', desc: 'DPIIT criteria, Section 80-IAC tax holiday, CGSS credit guarantees, and IPR rebates.', href: '/startup' },
  { icon: Shield, label: 'MSME Programs & Subsidies', desc: 'Udyam registration, PMEGP capital subsidies, and CGTMSE credit guarantee.', href: '/msme' },
  { icon: Landmark, label: 'Government Schemes Directory', desc: 'Searchable central and state scheme intelligence across 18+ priority programs.', href: '/schemes' },
  { icon: TrendingUp, label: 'Grants & Funding Schemes', desc: 'Non-dilutive prototype grants, debt guarantees up to ₹10 Crore, and SIDBI FFS.', href: '/funding' },
  { icon: Award, label: 'Quality & Tendering Certifications', desc: 'ISO 9001/27001, MSME ZED Bronze/Silver/Gold, NSIC, and GeM onboarding.', href: '/certifications' },
  { icon: Receipt, label: 'Section 80-IAC Tax Exemption', desc: '100% deduction on operational profits for 3 consecutive years via IMB board.', href: '/eligibility/80-iac' },
  { icon: FileText, label: 'Entity Incorporation', desc: 'Private Limited Company, LLP, and partnership registration frameworks.', href: '/services' },
  { icon: ClipboardCheck, label: 'Corporate Statutory Compliance', desc: 'ROC filings, annual Director KYC, GST returns, and corporate secretarial calendars.', href: '/services' },
];

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Regulatory Resources & Advisory Frameworks — CertWinX</title>
        <meta
          name="description"
          content="Central directory of government scheme frameworks, startup recognition guides, certification roadmaps, and compliance resources."
        />
      </Helmet>

      <section className="pt-36 lg:pt-44 pb-14 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Resource Directory"
            title="Regulatory frameworks & guides."
            subtitle="Centralized access to intelligence dossiers, statutory checklists, and scheme pathways for Indian enterprises."
            align="center"
          />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATS.map((c, i) => (
              <RevealOnScroll key={c.label} delay={i * 0.04}>
                <Link
                  to={c.href}
                  className="block h-full group bg-white border border-line rounded-3xl p-7 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-6 group-hover:bg-blue group-hover:text-white transition-colors duration-300">
                      <c.icon size={20} className="text-blue group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2 group-hover:text-blue transition-colors">
                      {c.label}
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed mb-6">
                      {c.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-blue">
                    <span>Explore Resource Path</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
