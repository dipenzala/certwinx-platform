export default function PageWrapper({ children, className = '' }) {
  return (
    <div className={`relative bg-canvas text-ink ${className}`}>
      {children}
    </div>
  );
}