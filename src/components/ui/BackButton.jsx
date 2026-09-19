import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = 'Back', className = '' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-all duration-300 ${className}`}
      aria-label="Go back"
    >
      <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 flex items-center justify-center transition-all">
        <ArrowLeft size={14} strokeWidth={2.2} className="group-hover:-translate-x-0.5 transition-transform" />
      </span>
      {label}
    </button>
  );
}