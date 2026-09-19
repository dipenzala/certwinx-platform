export default function Badge({ children, variant = 'blue', className = '' }) {
  const variants = {
    blue: 'bg-blue-soft text-blue-deep border-blue/15',
    gold: 'bg-gold-soft text-gold-deep border-gold/20',
    ink: 'bg-ink/5 text-ink border-ink/10',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}