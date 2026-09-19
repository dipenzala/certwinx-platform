import SplitTextReveal from '../motion/SplitTextReveal';
import RevealOnScroll from '../motion/RevealOnScroll';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <RevealOnScroll>
          <span className="inline-block text-[10px] font-semibold tracking-[0.25em] text-muted uppercase mb-5">
            {eyebrow}
          </span>
        </RevealOnScroll>
      )}
      {title && (
        <SplitTextReveal
          as="h2"
          className="font-display text-display-md font-semibold text-ink leading-[1.05] text-balance"
        >
          {title}
        </SplitTextReveal>
      )}
      {subtitle && (
        <RevealOnScroll delay={0.15}>
          <p className="mt-6 text-base lg:text-lg text-graphite leading-relaxed">{subtitle}</p>
        </RevealOnScroll>
      )}
    </div>
  );
}