export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`bg-paper border border-line rounded-3xl ${
        hover ? 'hover:border-ink/25 transition-colors duration-500' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}