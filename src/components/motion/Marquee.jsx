export default function Marquee({ items = [], speed = 40, className = '' }) {
  const duplicated = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex gap-16 whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite`, width: 'max-content' }}
      >
        {duplicated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm text-muted">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}