import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';
import { SITE, getWhatsAppLink } from '../../lib/constants';

export default function MobileStickyNav({ hidden = false }) {
  const location = useLocation();
  if (hidden) return null;
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-[65] lg:hidden bg-white/95 backdrop-blur-md border-t border-line shadow-[0_-4px_20px_-2px_rgba(22,58,138,0.08)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Quick Action Bar"
    >
      <div className="grid grid-cols-4 divide-x divide-line">
        <a
          href={`tel:${SITE.phone}`}
          className="flex flex-col items-center justify-center gap-1 py-2 min-h-[50px] text-graphite hover:text-ink active:bg-canvas transition-colors"
          aria-label="Call CertWinX Advisory"
        >
          <Phone size={15} className="text-blue" />
          <span className="text-[9.5px] font-bold tracking-wider uppercase">Call</span>
        </a>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2 min-h-[50px] text-emerald-700 hover:text-emerald-800 active:bg-canvas transition-colors"
          aria-label="WhatsApp Advisory Support"
        >
          <MessageCircle size={15} className="text-emerald-600" />
          <span className="text-[9.5px] font-bold tracking-wider uppercase">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => window.openLeadPopup?.('Mobile Sticky Bar Enquiry')}
          className="flex flex-col items-center justify-center gap-1 py-2 min-h-[50px] text-blue hover:text-blue-hover active:bg-canvas transition-colors cursor-pointer bg-blue-50/50"
          aria-label="Open Lead Enquiry Form"
        >
          <Sparkles size={15} className="text-blue animate-pulse" />
          <span className="text-[9.5px] font-bold tracking-wider uppercase">Enquiry</span>
        </button>
        <Link
          to="/eligibility"
          className="flex flex-col items-center justify-center gap-1 py-2 min-h-[50px] text-slate-700 hover:text-blue active:bg-canvas transition-colors"
          aria-label="Check Scheme Eligibility"
        >
          <CheckCircle size={15} className="text-slate-600" />
          <span className="text-[9.5px] font-bold tracking-wider uppercase">Eligibility</span>
        </Link>
      </div>
    </aside>
  );
}
