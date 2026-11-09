import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { Check } from 'lucide-react';

/* ============================================================
   MULTIPLE DIVERSE ADVISORY CONVERSATIONS
   Right Side = Client (Founder / Entrepreneur)
   Left Side  = CertWinX Consultant (Advisor)
   ============================================================ */
const CONVERSATIONS = [
  {
    topic: 'Startup India & DPIIT',
    clientTop: 'Hi! Where should I start?',
    clientBottom: 'Need DPIIT + ₹50L seed grant.',
    certwinxTop: 'Free eligibility diagnostic first.',
    certwinxBottom: 'Are you registered yet? We file on NSWS.',
  },
  {
    topic: 'Section 80-IAC Tax Exemption',
    clientTop: 'Can we get 100% corporate tax exemption?',
    clientBottom: 'Our Pvt Ltd is in its 2nd year.',
    certwinxTop: '100% Tax Holiday for 3 consecutive years!',
    certwinxBottom: 'We prepare the 40-page IMB novelty presentation.',
  },
  {
    topic: 'Collateral-Free MSME Credit',
    clientTop: 'Collateral-free credit without property pledge?',
    clientBottom: 'Expanding our production capacity.',
    certwinxTop: 'CGTMSE guarantee covers up to ₹5 Crore!',
    certwinxBottom: 'Udyam classification opens priority sector credit.',
  },
  {
    topic: 'Company Incorporation',
    clientTop: 'Private Limited or LLP for institutional VC?',
    clientBottom: 'We are 2 co-founders raising angel funds.',
    certwinxTop: 'Pvt Ltd is mandatory for DPIIT & VC equity.',
    certwinxBottom: 'Fast-track SPICe+ setup with PAN, TAN & GST.',
  },
  {
    topic: 'Patent & IPR Concessions',
    clientTop: 'How much government rebate on patent filing?',
    clientBottom: 'Filing our proprietary AI software patent.',
    certwinxTop: '80% statutory rebate on all patent fees!',
    certwinxBottom: 'Fast-track examination under Startup India scheme.',
  },
  {
    topic: 'State Capital Subsidies',
    clientTop: 'Are there state capital subsidies for tech units?',
    clientBottom: 'Operating across Gujarat & Maharashtra.',
    certwinxTop: 'Up to 50% capital & power tariff subsidies!',
    certwinxBottom: 'Direct portal coordination with state DIC.',
  },
  {
    topic: 'GeM Public Procurement',
    clientTop: 'Can early startups bid on government tenders?',
    clientBottom: 'We do not meet 3-year turnover criteria.',
    certwinxTop: '100% EMD & prior turnover waiver on GeM!',
    certwinxBottom: 'Direct sovereign vendor onboarding on GeM.',
  },
];

export default function HeroOrbit3D() {
  const rootRef = useRef(null);

  // Active scenario index (0 to CONVERSATIONS.length - 1)
  const [convIndex, setConvIndex] = useState(0);

  // Live typed strings
  const [clientTopDisplay, setClientTopDisplay] = useState('');
  const [clientBottomDisplay, setClientBottomDisplay] = useState('');
  const [certwinxTopDisplay, setCertwinxTopDisplay] = useState('');
  const [certwinxBottomDisplay, setCertwinxBottomDisplay] = useState('');

  // Active typing cursor indicators
  const [activeTyping, setActiveTyping] = useState(null); // 'ct' | 'cb' | 'zt' | 'zb' | null
  const [bubbleOpacity, setBubbleOpacity] = useState(1);

  const activeConv = CONVERSATIONS[convIndex];

  // ============================================================
  // LIVE TYPEWRITER ORCHESTRATION ENGINE
  // Cycles through scenarios: Client speaks (Right) -> CertWinX responds (Left)
  // ============================================================
  useEffect(() => {
    let isCancelled = false;
    let timeouts = [];

    const sleep = (ms) =>
      new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        timeouts.push(id);
      });

    const typeString = async (fullText, setDisplay, typingKey, speed = 26) => {
      if (isCancelled) return;
      setActiveTyping(typingKey);
      for (let i = 1; i <= fullText.length; i++) {
        if (isCancelled) return;
        setDisplay(fullText.slice(0, i));
        await sleep(speed);
      }
      setActiveTyping(null);
    };

    const runScenario = async () => {
      // 1. Reset text & show bubbles
      setBubbleOpacity(1);
      setClientTopDisplay('');
      setClientBottomDisplay('');
      setCertwinxTopDisplay('');
      setCertwinxBottomDisplay('');

      await sleep(250);

      // 2. Client speaks first (Right character: Founder inquiry)
      await typeString(activeConv.clientTop, setClientTopDisplay, 'ct', 24);
      await sleep(180);
      await typeString(activeConv.clientBottom, setClientBottomDisplay, 'cb', 24);

      await sleep(300);

      // 3. CertWinX responds (Left character: Advisor guidance)
      await typeString(activeConv.certwinxTop, setCertwinxTopDisplay, 'zt', 22);
      await sleep(180);
      await typeString(activeConv.certwinxBottom, setCertwinxBottomDisplay, 'zb', 22);

      // 4. Comfortable reading duration so the founder can read both solutions
      await sleep(4200);

      if (isCancelled) return;

      // 5. Smooth fade out
      setBubbleOpacity(0);
      await sleep(350);

      if (isCancelled) return;

      // 6. Advance to next conversation
      setConvIndex((prev) => (prev + 1) % CONVERSATIONS.length);
    };

    runScenario();

    return () => {
      isCancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [convIndex]);

  // Gentle character breathing micro-motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-image]', {
        y: -5,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      const onMove = (e) => {
        const rect = root.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to('[data-image]', {
          rotateY: x * 3.5,
          rotateX: -y * 2.5,
          duration: 1.2,
          ease: 'power3.out',
          transformPerspective: 1200,
        });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full max-w-full overflow-hidden sm:overflow-visible">
      {/* Mobile Layout (< lg) */}
      <div className="lg:hidden flex flex-col gap-2 py-1">
        {/* Dynamic Speech Bubbles on Mobile (Above Characters, Zero Overlap) */}
        <div
          className="flex flex-col gap-2 mb-2 px-1 transition-opacity duration-300"
          style={{ opacity: bubbleOpacity }}
        >
          {/* Client Query (Right aligned) */}
          <div className="self-end max-w-[88%] bg-white rounded-2xl rounded-br-xs shadow-xs border border-line px-3.5 py-2">
            <p className="text-[10px] font-bold text-[#1C83F3] uppercase tracking-wider mb-0.5">
              Client Inquiry
            </p>
            <p className="text-xs font-semibold leading-snug text-ink min-h-[18px]">
              {clientTopDisplay}
              {activeTyping === 'ct' && <span className="inline-block w-1.5 h-3 bg-[#1C83F3] ml-0.5 animate-pulse" />}
            </p>
          </div>

          {/* CertWinX Answer (Left aligned) */}
          <div className="self-start max-w-[88%] bg-gradient-to-r from-[#1C83F3] to-[#0A47CC] text-white rounded-2xl rounded-bl-xs shadow-xs px-3.5 py-2">
            <p className="text-[10px] font-bold text-sky uppercase tracking-wider mb-0.5">
              CertWinX Advisory
            </p>
            <p className="text-xs font-medium leading-snug min-h-[18px]">
              {certwinxTopDisplay}
              {activeTyping === 'zt' && <span className="inline-block w-1.5 h-3 bg-white ml-0.5 animate-pulse" />}
            </p>
          </div>
        </div>

        {/* Character Image */}
        <div data-image className="relative will-change-transform max-w-[340px] sm:max-w-[400px] mx-auto">
          <picture>
            <source srcSet="/hero-characters.webp" type="image/webp" />
            <img
              src="/hero-characters.png"
              alt="CertWinX consultant guiding an entrepreneur"
              className="w-full h-auto rounded-2xl max-h-[260px] object-contain mx-auto"
              loading="eager"
              style={{ filter: 'drop-shadow(0 15px 30px rgba(28,131,243,0.14))' }}
            />
          </picture>
        </div>
      </div>

      {/* Desktop Layout (lg+) — ZERO OVERLAP & LIVE DYNAMIC TYPEWRITER */}
      <div className="hidden lg:block relative w-full h-[510px]">
        {/* Ambient Backing Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#1C83F3]/10 blur-[100px]" />
          <div className="absolute top-[20%] left-[10%] w-[180px] h-[180px] rounded-full bg-sky/20 blur-[80px]" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center pb-2">
          <div className="relative w-full max-w-[620px] mx-auto">

            {/* Character 3D illustration — Sitting comfortably lower so heads are strictly below speech bubbles */}
            <div data-image className="relative z-10 will-change-transform pt-20 xl:pt-24">
              <picture>
                <source srcSet="/hero-characters.webp" type="image/webp" />
                <img
                  src="/hero-characters.png"
                  alt="CertWinX consultant guiding an entrepreneur"
                  className="w-full h-auto rounded-3xl max-h-[385px] object-contain mx-auto"
                  loading="eager"
                  style={{ filter: 'drop-shadow(0 20px 45px rgba(22,58,138,0.14))' }}
                />
              </picture>
            </div>

            {/* =======================================================
                LEFT SIDE: CERTWINX CONSULTANT (Advisory Solutions)
                Character has CertWinX badge, laptop & mug.
                Bubble 1: Golden / Amber Status Badge (with Check)
                Bubble 2: Royal Blue Gradient Guidance Card
                Directional tail points DOWN-RIGHT to CertWinX consultant.
               ======================================================= */}
            <div
              className="absolute top-0 left-0 xl:-left-3 z-20 flex flex-col gap-2 max-w-[215px] transition-opacity duration-300"
              style={{ opacity: bubbleOpacity }}
            >
              {/* Bubble 1: CertWinX Top (Golden Badge with Checkmark) */}
              <div
                className={`relative bg-[#E8C582]/40 border border-[#D4A373]/55 rounded-2xl rounded-br-xs shadow-[0_10px_25px_-5px_rgba(180,120,40,0.18)] px-3.5 py-2 transition-all duration-300 min-h-[40px] flex items-center ${
                  activeTyping === 'zt' ? 'ring-2 ring-[#C69255]/50 scale-[1.02]' : ''
                }`}
              >
                <div className="flex items-start gap-1.5 w-full">
                  <Check size={13} className="text-[#7A531C] mt-0.5 shrink-0" strokeWidth={3} />
                  <p className="text-xs font-bold leading-snug text-[#5A3C0E]">
                    {certwinxTopDisplay}
                    {activeTyping === 'zt' && (
                      <span className="inline-block w-1.5 h-3.5 bg-[#7A531C] ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
                {/* Speech tail pointing toward CertWinX consultant */}
                <span className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-[#E8C582]/50 border-r border-b border-[#D4A373]/55 rotate-45" />
              </div>

              {/* Bubble 2: CertWinX Bottom (Royal Blue Guidance Card) */}
              <div
                className={`relative bg-gradient-to-r from-[#1C83F3] to-[#0A47CC] text-white rounded-2xl rounded-br-xs shadow-[0_10px_25px_-5px_rgba(28,131,243,0.35)] px-3.5 py-2 transition-all duration-300 min-h-[42px] flex items-center ${
                  activeTyping === 'zb' ? 'ring-2 ring-white/50 scale-[1.02]' : ''
                }`}
              >
                <p className="text-xs font-medium leading-snug w-full">
                  {certwinxBottomDisplay}
                  {activeTyping === 'zb' && (
                    <span className="inline-block w-1.5 h-3.5 bg-white ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
                {/* Speech tail pointing toward CertWinX consultant */}
                <span className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-[#0A47CC] rotate-45" />
              </div>
            </div>

            {/* =======================================================
                RIGHT SIDE: CLIENT / FOUNDER (Entrepreneur Inquiries)
                Character has "Client" acrylic nameplate & diary.
                Bubble 1: Crisp White Card with Blue Accent
                Bubble 2: Crisp White Card
                Directional tail points DOWN-LEFT to Client founder.
               ======================================================= */}
            <div
              className="absolute top-0 right-0 xl:-right-3 z-20 flex flex-col gap-2 max-w-[215px] transition-opacity duration-300"
              style={{ opacity: bubbleOpacity }}
            >
              {/* Bubble 1: Client Top (Founder Query with Blue Accent) */}
              <div
                className={`relative bg-white/98 backdrop-blur-sm rounded-2xl rounded-bl-xs shadow-[0_10px_25px_-5px_rgba(22,58,138,0.15)] border border-line/80 px-3.5 py-2 transition-all duration-300 min-h-[40px] flex items-center ${
                  activeTyping === 'ct' ? 'border-[#1C83F3] ring-2 ring-[#1C83F3]/25 scale-[1.02]' : ''
                }`}
              >
                <p className="text-xs font-semibold leading-snug text-ink w-full">
                  {clientTopDisplay}
                  {activeTyping === 'ct' && (
                    <span className="inline-block w-1.5 h-3.5 bg-[#1C83F3] ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
                {/* Speech tail pointing toward Client founder */}
                <span className="absolute -bottom-1.5 left-6 w-2.5 h-2.5 bg-white border-r border-b border-line/80 rotate-45" />
              </div>

              {/* Bubble 2: Client Bottom (Founder Stage Inquiry) */}
              <div
                className={`relative bg-white/98 backdrop-blur-sm rounded-2xl rounded-bl-xs shadow-[0_10px_25px_-5px_rgba(22,58,138,0.15)] border border-line/80 px-3.5 py-2 transition-all duration-300 min-h-[40px] flex items-center ${
                  activeTyping === 'cb' ? 'border-[#1C83F3] ring-2 ring-[#1C83F3]/25 scale-[1.02]' : ''
                }`}
              >
                <p className="text-xs font-semibold leading-snug text-ink w-full">
                  {clientBottomDisplay}
                  {activeTyping === 'cb' && (
                    <span className="inline-block w-1.5 h-3.5 bg-[#1C83F3] ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
                {/* Speech tail pointing toward Client founder */}
                <span className="absolute -bottom-1.5 left-6 w-2.5 h-2.5 bg-white border-r border-b border-line/80 rotate-45" />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Baseline Trust Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted/75 whitespace-nowrap">
            RIGHT GUIDANCE · REAL OPPORTUNITIES · LONG-TERM PARTNERSHIP
          </p>
        </div>
      </div>
    </div>
  );
}
