import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '../motion/TiltCard';

export default function SchemeCard({ scheme, index = 0 }) {
  return (
    <Link to={`/schemes/${scheme.slug}`} className="block h-full group">
      <TiltCard className="h-full bg-paper border border-line rounded-3xl p-7 hover:border-ink/25 transition-colors duration-500 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-soft text-blue-deep border border-blue/20 text-[10px] font-medium uppercase tracking-wide">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gold-soft text-gold-deep border border-gold/25 text-[10px] font-medium uppercase tracking-wide">
              {scheme.supportType}
            </span>
          </div>
          <ArrowUpRight
            size={17}
            className="text-muted group-hover:text-ink transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink mb-2 leading-tight">
          {scheme.name}
        </h3>
        <p className="text-sm text-graphite leading-relaxed line-clamp-3 mb-6">
          {scheme.description}
        </p>
        <div className="mt-auto pt-4 border-t border-line flex items-center justify-between text-[10px] text-muted">
          <span className="tabular">{scheme.lastVerified}</span>
          <span className="tracking-[0.15em] uppercase">Last Verified</span>
        </div>
      </TiltCard>
    </Link>
  );
}