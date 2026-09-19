import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const variants = {
  primary: 'bg-ink text-canvas hover:bg-graphite',
  outline: 'bg-transparent border border-ink/15 text-ink hover:border-ink/40',
  gold: 'bg-gold text-ink hover:bg-gold-deep hover:text-canvas',
  blue: 'bg-blue text-white hover:bg-blue-deep',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1FB855]',
  ghost: 'text-ink hover:bg-ink/5',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  icon = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const base = `group inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-500 tracking-wide ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </>
  );

  if (to) return <Link to={to} className={base} {...rest}>{content}</Link>;
  if (href) return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={base} {...rest}>{content}</a>;
  return <button type={type} onClick={onClick} className={base} {...rest}>{content}</button>;
}