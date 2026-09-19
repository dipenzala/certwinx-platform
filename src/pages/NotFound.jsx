import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import SplitTextReveal from '../components/motion/SplitTextReveal';

export default function NotFound() {
  return (
    <>
      <Helmet><title>Page Not Found — CertWinX</title></Helmet>
      <section className="min-h-[100svh] flex items-center justify-center bg-canvas px-6">
        <div className="text-center">
          <p className="font-display text-[120px] lg:text-[180px] font-semibold leading-none text-ink/10 tabular">404</p>
          <SplitTextReveal as="h1" trigger="mount" className="font-display text-2xl lg:text-3xl font-semibold text-ink -mt-6 mb-5">
            Page not found.
          </SplitTextReveal>
          <p className="text-sm text-graphite mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm font-medium hover:bg-graphite transition-colors">
            <ArrowLeft size={15} /> Go Home
          </Link>
        </div>
      </section>
    </>
  );
}