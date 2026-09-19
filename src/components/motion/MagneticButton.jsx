import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { useEffect } from 'react';

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  strength = 0.25,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const setX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    const setY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setX(x * strength);
      setY(y * strength);
    };
    const onLeave = () => { setX(0); setY(0); };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  const variants = {
    primary: 'bg-ink text-canvas hover:bg-graphite',
    outline: 'bg-transparent border border-ink/15 text-ink hover:border-ink/40',
    gold: 'bg-gold text-ink hover:bg-gold-deep hover:text-canvas',
    blue: 'bg-blue text-white hover:bg-blue-deep',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1FB855]',
    ghost: 'text-ink hover:bg-ink/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs tracking-wide',
    md: 'px-6 py-3 text-sm tracking-wide',
    lg: 'px-8 py-4 text-sm tracking-wide',
  };

  const base = `group relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-500 will-change-transform ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 20px 40px -20px rgba(15,15,16,0.35)' }} />
    </>
  );

  if (to) return <Link ref={ref} to={to} className={base} {...rest}>{inner}</Link>;
  if (href) return <a ref={ref} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={base} {...rest}>{inner}</a>;
  return <button ref={ref} onClick={onClick} className={base} {...rest}>{inner}</button>;
}