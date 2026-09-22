import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileStickyNav from './components/layout/MobileStickyNav';
import CustomCursor from './components/motion/CustomCursor';
import ScrollProgress from './components/motion/ScrollProgress';
import Preloader from './components/ui/Preloader';
import LeadPopup from './components/ui/LeadPopup';
import LiveBanner from './components/ui/LiveBanner';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollTrigger } from './lib/gsap';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Startup = lazy(() => import('./pages/Startup'));
const MSME = lazy(() => import('./pages/MSME'));
const Funding = lazy(() => import('./pages/Funding'));
const Schemes = lazy(() => import('./pages/Schemes'));
const SchemeDetail = lazy(() => import('./pages/SchemeDetail'));
const Eligibility = lazy(() => import('./pages/Eligibility'));
const Eligibility80IAC = lazy(() => import('./pages/Eligibility80IAC'));
const EligibilityResults = lazy(() => import('./pages/EligibilityResults'));
const Consultation = lazy(() => import('./pages/Consultation'));
const Resources = lazy(() => import('./pages/Resources'));
const Blog = lazy(() => import('./pages/Blog'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const Disclaimer = lazy(() => import('./pages/legal/Disclaimer'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Page error:', error, info);
  }
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.routeKey !== this.props.routeKey) {
      this.setState({ hasError: false, error: null });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center bg-canvas px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-2xl font-bold text-ink mb-3">
              Page ran into an issue
            </h1>
            <p className="text-sm text-graphite mb-6">
              Please refresh or go back home.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm font-medium"
              >
                Refresh Page
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink/15 text-ink text-sm font-medium"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary routeKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/startup" element={<Startup />} />
        <Route path="/msme" element={<MSME />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/schemes/:slug" element={<SchemeDetail />} />
        <Route path="/eligibility/80-iac" element={<Eligibility80IAC />} />
        <Route path="/eligibility/results" element={<EligibilityResults />} />
        <Route path="/eligibility" element={<Eligibility />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

/* ============================================================
   APP SHELL — Renders global components conditionally.
   On /admin, Header, Footer, LeadPopup, Preloader, LiveBanner,
   MobileStickyNav, CustomCursor, ScrollProgress are ALL hidden.
   ============================================================ */
function AppShell() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  useSmoothScroll();

  return (
    <>
      {/* Preloader — only on public site */}
      {!isAdmin && !preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Lead Popup — only on public site */}
      {!isAdmin && preloaderDone && <LeadPopup delay={4000} force={true} />}

      <div
        className={`grain relative min-h-screen text-ink ${
          isAdmin ? 'bg-[#0A0F1F]' : 'bg-canvas'
        }`}
      >
        {/* Custom cursor — only on public site */}
        {!isAdmin && <CustomCursor />}

        {/* Scroll progress bar — only on public site */}
        {!isAdmin && <ScrollProgress />}

        {/* Header — only on public site */}
        {!isAdmin && <Header onMenuToggle={setMobileMenuOpen} />}

        {/* Main content (all routes) */}
        <main className="relative z-10">
          <Suspense fallback={<LoadingScreen />}>
            <AppRoutes />
          </Suspense>
        </main>

        {/* Footer — only on public site */}
        {!isAdmin && <Footer />}

        {/* Live banner (bottom) — only on public site */}
        {!isAdmin && <LiveBanner hidden={mobileMenuOpen} />}

        {/* Mobile sticky nav — only on public site */}
        {!isAdmin && <MobileStickyNav hidden={mobileMenuOpen} />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollReset />
        <AppShell />
      </Router>
    </HelmetProvider>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#1683FF] border-t-transparent animate-spin" />
        <span className="text-xs tracking-[0.3em] text-white/50">CERTWINX</span>
      </div>
    </div>
  );
}