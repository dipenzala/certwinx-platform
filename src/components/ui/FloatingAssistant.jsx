import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle, X, ChevronRight, Sparkles, Building2,
  Percent, Landmark, ShieldCheck, ArrowUpRight, CheckCircle2,
  Phone, HelpCircle
} from 'lucide-react';
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';

const ASSISTANT_OPTIONS = [
  {
    id: 'incorp',
    title: 'Company Incorporation',
    short: 'Pvt Ltd & LLP Setup',
    authority: 'Ministry of Corporate Affairs (MCA)',
    timeline: '3–5 Business Days',
    desc: 'Determining optimal legal entity, name reservation on SPICe+, DIN/DSC, PAN, TAN & corporate bank account.',
    link: '/services/private-limited-company',
    whatsappQuery: 'I want guidance on Company Incorporation (Pvt Ltd / LLP)',
  },
  {
    id: '80iac',
    title: 'Section 80-IAC Tax Holiday',
    short: '100% Tax Exemption',
    authority: 'Inter-Ministerial Board (IMB / DPIIT)',
    timeline: '3–6 Months',
    desc: 'Preparation of 40+ page technical novelty dossier and innovation defense for 100% corporate tax deduction.',
    link: '/eligibility/80-iac',
    whatsappQuery: 'I need guidance on Section 80-IAC Tax Exemption eligibility',
  },
  {
    id: 'grants',
    title: 'Sovereign Startup Grants',
    short: 'SISFS & Central Grants',
    authority: 'DPIIT, DST & MeitY',
    timeline: '30–60 Days',
    desc: 'Non-dilutive seed capital up to ₹20L grant / ₹50L debt under SISFS, NIDHI-PRAYAS, and state seed funds.',
    link: '/funding',
    whatsappQuery: 'I need assistance applying for Startup India Seed Fund (SISFS) grants',
  },
  {
    id: 'msme',
    title: 'MSME Udyam & Credit Guarantee',
    short: 'Udyam & CGTMSE Loans',
    authority: 'Ministry of MSME',
    timeline: '24–48 Hours',
    desc: 'Permanent sovereign MSME status, collateral-free priority bank lending up to ₹5 Cr, and PMEGP capital subsidies.',
    link: '/msme',
    whatsappQuery: 'I want guidance on MSME Udyam and CGTMSE credit guarantee loans',
  },
  {
    id: 'gst',
    title: 'GST & Statutory Compliance',
    short: 'GST, ROC & ITR Governance',
    authority: 'CBIC & MCA',
    timeline: 'Ongoing Filing',
    desc: 'Monthly ITC reconciliation, GSTR-1/3B, Annual AOC-4/MGT-7 MCA corporate governance, and DIR-3 KYC.',
    link: '/services/gst-registration',
    whatsappQuery: 'I need compliance advisory for GST and ROC annual filings',
  },
];

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('incorp');

  const selected = ASSISTANT_OPTIONS.find((o) => o.id === selectedId) || ASSISTANT_OPTIONS[0];

  return (
    <div className="fixed bottom-5 right-5 z-350 flex flex-col items-end">
      
      {/* Expanded Flyout Card */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-line overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-deepblue to-[#0e275c] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue/20 border border-blue/40 flex items-center justify-center text-sky">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold leading-tight">
                  CertWinX Statutory Desk
                </h4>
                <p className="text-[10px] text-white/70">
                  Instant Sovereign Guidance & Eligibility
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5">
            <div>
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
                What does your venture need guidance on?
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {ASSISTANT_OPTIONS.map((opt) => {
                  const active = opt.id === selectedId;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedId(opt.id)}
                      className={`p-2 rounded-xl text-left border transition-all text-xs font-semibold leading-tight ${
                        active
                          ? 'bg-blue text-white border-blue shadow-sm'
                          : 'bg-canvas border-line text-graphite hover:border-blue/40 hover:text-ink'
                      }`}
                    >
                      {opt.short}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Option Details */}
            <div className="p-3.5 bg-canvas rounded-2xl border border-line/80 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-display text-xs font-bold text-ink">
                  {selected.title}
                </h5>
                <span className="text-[9px] font-bold text-blue bg-blue/10 px-2 py-0.5 rounded-full border border-blue/20">
                  {selected.timeline}
                </span>
              </div>

              <p className="text-[11px] text-graphite leading-relaxed">
                {selected.desc}
              </p>

              <div className="text-[10px] text-muted flex items-center gap-1.5 pt-1 border-t border-line/60">
                <ShieldCheck size={12} className="text-blue shrink-0" />
                <span>Nodal: {selected.authority}</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="space-y-2 pt-1">
              <a
                href={getWhatsAppLink(selected.whatsappQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <MessageCircle size={14} />
                <span>Chat on WhatsApp (+91 81289 31029)</span>
              </a>

              <div className="flex items-center gap-2">
                <Link
                  to={selected.link}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-white border border-line hover:border-blue/40 text-xs font-semibold text-graphite hover:text-ink transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to="/eligibility"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-blue/10 border border-blue/20 hover:bg-blue/20 text-xs font-bold text-blue transition-colors flex items-center justify-center gap-1"
                >
                  <span>Check Eligibility</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-canvas border-t border-line text-[10px] text-center text-muted">
            Direct Phone: <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="font-bold text-ink hover:text-blue">{PHONE_NUMBER}</a>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-deepblue text-white shadow-xl hover:bg-blue hover:shadow-2xl hover:scale-103 transition-all duration-200 border border-white/20 cursor-pointer"
        aria-label="Toggle Guided Advisory Assistant"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky" />
        </span>
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? 'Close Advisory Desk' : 'Need Help? Advisory Desk'}
        </span>
        <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
          <MessageCircle size={12} className="text-sky" />
        </div>
      </button>

    </div>
  );
}
