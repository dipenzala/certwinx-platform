import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { SITE, getWhatsAppLink } from '../../lib/constants';

export default function MobileStickyNav({ hidden = false }) {
  const location = useLocation();
  if (hidden) return null;
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[65] lg:hidden glass-strong border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={`tel:${SITE.phone}`}
          className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] text-graphite active:bg-white/5 transition-colors"
          aria-label="Call CertWinX"
        >
          <Phone size={16} />
          <span className="text-[9px] font-medium tracking-wide">CALL</span>
        </a>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] text-[#25D366] active:bg-white/5 transition-colors"
          aria-label="WhatsApp CertWinX"
        >
          <MessageCircle size={16} />
          <span className="text-[9px] font-medium tracking-wide">WHATSAPP</span>
        </a>
        <Link
          to="/eligibility"
          className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px] text-blue active:bg-white/5 transition-colors"
          aria-label="Check eligibility"
        >
          <CheckCircle size={16} />
          <span className="text-[9px] font-medium tracking-wide">ELIGIBILITY</span>
        </Link>
      </div>
    </div>
  );
}