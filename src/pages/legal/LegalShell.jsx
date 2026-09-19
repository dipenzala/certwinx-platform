import RevealOnScroll from '../../components/motion/RevealOnScroll';

export default function LegalShell({ title, children }) {
  return (
    <section className="pt-40 pb-section bg-canvas">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <RevealOnScroll>
          <span className="text-[10px] tracking-[0.25em] text-muted uppercase">Legal</span>
          <h1 className="mt-5 font-display text-display-md font-semibold text-ink mb-3">
            {title}
          </h1>
          <p className="text-xs text-muted mb-12">Last updated: [Date to be inserted]</p>
        </RevealOnScroll>
        <div className="space-y-6 text-sm text-graphite leading-relaxed [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:pt-4">
          {children}
        </div>
      </div>
    </section>
  );
}