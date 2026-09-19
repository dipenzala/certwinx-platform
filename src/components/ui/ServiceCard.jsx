import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '../motion/TiltCard';

export default function ServiceCard({ service, index = 0 }) {
  return (
    <Link to={`/services/${service.slug}`} className="block h-full group">
      <TiltCard className="h-full bg-paper border border-line rounded-3xl p-7 hover:border-ink/25 transition-colors duration-500 flex flex-col">
        <div className="flex items-start justify-between mb-10">
          <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
            {service.category}
          </span>
          <ArrowUpRight
            size={17}
            className="text-muted group-hover:text-ink transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink mb-2 leading-tight">
          {service.name}
        </h3>
        <p className="text-sm text-graphite leading-relaxed">{service.short}</p>
      </TiltCard>
    </Link>
  );
}