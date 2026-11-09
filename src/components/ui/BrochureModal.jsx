import { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';

export default function BrochureModal({ isOpen, onClose }) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Trigger download of a rich summary / prospectus
    const content = `=====================================================
CERTWINX ENTERPRISE ADVISORY & STATUTORY COMPENDIUM 2026
Aapki Tarakki Ka Saathi — Bharosha Apka, Jimmedari Humari
=====================================================

Phone Support: ${PHONE_NUMBER}
Email: info@certwinx.com
Official Portal: https://certwinx.com
Headquarters: Ahmedabad, Gujarat, India - 380015 (Pan-India Scope)

1. STATUTORY INCORPORATION & STRUCTURING
   - Private Limited Company (SPICe+ MCA, DIN, DSC, PAN, TAN, Bank Acc)
   - Limited Liability Partnership (LLP Agreement, FiLLiP)
   - One Person Company (OPC) & Section 8 Non-Profit
   - NGO DARPAN & 12A/80G Tax Exemption Filings

2. STARTUP INDIA & FISCAL EXEMPTIONS
   - DPIIT Sovereign Recognition (Fast-track patent fee 80% rebate)
   - Section 56 Angel Tax Exemption
   - Section 80-IAC 100% Tax Holiday for 3 Consecutive Years
   - Comprehensive 40+ Page Technical Novelty Dossier Preparation

3. CENTRAL GOVERNMENT GRANTS & SEED CAPITAL
   - DST NIDHI-PRAYAS: Up to ₹10 Lakhs Proof-of-Concept Grant (0% Dilution)
   - BIRAC BIG: Up to ₹50 Lakhs Biotechnology & MedTech Grant
   - Credit Guarantee Scheme for Startups (CGSS): Up to ₹10 Cr Collateral-Free

4. MSME SOVEREIGN PRIVILEGES
   - Udyam Permanent Registration with QR Verification
   - PMEGP Margin Money Capital Subsidy (Up to 35% on ₹50L project)
   - MSME ZED Certification (Bronze, Silver, Gold with 80% subsidy)
   - CGTMSE Credit Facility up to ₹5 Crore without collateral

5. STATUTORY TAX & CORPORATE COMPLIANCE
   - GST Registration & Monthly Reconciliation (GSTR-1, 3B, 9)
   - Corporate Annual MCA Filings (AOC-4, MGT-7, ADT-1)
   - Director DIN Reactivation & DIR-3 KYC
   - ISO 9001:2015 & ISO 27001 Quality & Security Frameworks

To schedule a 1:1 advisory consultation with our Senior Statutory Analysts:
WhatsApp: https://wa.me/918128931029?text=Hello%20CertWinX,%20I%20downloaded%20the%202026%20Brochure
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CertWinX_Sovereign_Advisory_Compendium_2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-line overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-deepblue to-[#0e275c] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-sky uppercase tracking-wider mb-2">
            <ShieldCheck size={12} />
            Official Sovereign Advisory Compendium
          </span>

          <h3 className="font-display text-2xl font-bold leading-tight">
            CertWinX Advisory Brochure 2026
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Complete institutional roadmap covering DPIIT, Section 80-IAC, CGSS, NIDHI, and MSME frameworks.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-graphite leading-relaxed">
                <strong className="text-ink">Central & State Scheme Matrices:</strong> Eligibility parameters, grant caps, and nodal ministries across 18+ programs.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-graphite leading-relaxed">
                <strong className="text-ink">Section 80-IAC Dossier Architecture:</strong> Mandatory 40+ page novelty requirements evaluated by the Inter-Ministerial Board.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-graphite leading-relaxed">
                <strong className="text-ink">Collateral-Free Capital Facilities:</strong> Detailed CGSS (up to ₹10 Cr) and CGTMSE (up to ₹5 Cr) lending structures.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-graphite leading-relaxed">
                <strong className="text-ink">Annual Corporate Compliance Calendar:</strong> Statutory due dates for ROC, GST, ITR, and DIR-3 KYC governance.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue text-white text-xs font-bold shadow-md hover:bg-deepblue transition-all"
            >
              <Download size={14} />
              <span>{downloaded ? 'Brochure Downloaded ✓' : 'Download Complete Brochure'}</span>
            </button>

            <a
              href={getWhatsAppLink('Request 2026 Brochure on WhatsApp')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle size={14} className="text-emerald-600" />
              <span>Get via WhatsApp</span>
            </a>
          </div>

          <p className="text-[10px] text-center text-muted">
            Direct statutory advisory desk available at {PHONE_NUMBER} · Operating Pan-India
          </p>
        </div>

      </div>
    </div>
  );
}
