import { useEffect, useRef } from 'react';
import { Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { gsap } from '../../lib/gsap';

/* ============ REAL COMPANIES THAT GOT 80-IAC ============ */
const COMPANIES = [
  'ASCEND BIZCAP PRIVATE LIMITED',
  '40 MINUS30 PRIVATE LIMITED',
  'WEBKORPS SERVICES INDIA PRIVATE LIMITED',
  'RNT HEALTH INSIGHTS PRIVATE LIMITED',
  'TROY CONSULTING PRIVATE LIMITED',
  'GENEBIO HEALTHCARE PRIVATE LIMITED',
  'BHANU PV SOLAR PRIVATE LIMITED',
  'CURLY TALES DIGITAL MEDIA PRIVATE LIMITED',
  'WONDERPAY TECHNOLOGIES PRIVATE LIMITED',
  'INSTRON TECHNOLOGIES LLP',
  'BILI LIFE SCIENCE LLP',
  'BLUEKEI SOLUTIONS PRIVATE LIMITED',
  'PROMPT INNOVATIONS PRIVATE LIMITED',
  'MSAF BIO ORGANICS PRIVATE LIMITED',
  'CEQU LABS PRIVATE LIMITED',
  'AMATECH INNOVATION (OPC) PRIVATE LIMITED',
  'SOUDARSHINI VALVE PRIVATE LIMITED',
  'DELGADO COATING & TECHNOLOGY SOLUTIONS PRIVATE LIMITED',
  'PLUS91LABS LLP',
  'LITPAX TECHNOLOGY PRIVATE LIMITED',
  'SHUBHANKARI ENGINEERING SOLUTIONS LLP',
  'SQUAD SYNERGY PRIVATE LIMITED',
  'SUNCORE TILES PRIVATE LIMITED',
  'CARDAN ENGINEERING PROJECTS LLP',
  'AMPLE SEMICONDUCTORS PRIVATE LIMITED',
  'MASTERLY SOLUTIONS PRIVATE LIMITED',
  'SERVSOFT TECHNOLOGIES PRIVATE LIMITED',
  'COMPETITIVE CRACKER PRIVATE LIMITED',
  'PRORELIX SERVICES LLP',
  'PROPTECH CLEARDEALS PRIVATE LIMITED',
  'ALRESCHAA LIFE SCIENCES LLP',
  'PRODUCTSQUADS TECHNOLABS LLP',
  'MICHEZO SPORTS INFRASTRUCTURE PRIVATE LIMITED',
  'DIGIGRAIN SOLUTIONS PRIVATE LIMITED',
  'ADBREW SOFTWARE PRIVATE LIMITED',
  'EDRIFT ELECTRIC PRIVATE LIMITED',
  'DIVINE EMPIRE INDIA PRIVATE LIMITED',
  'RREN CONSULTANTS & CONTRACTORS PRIVATE LIMITED',
  'SKEWB ANALYTICS PRIVATE LIMITED',
  'MUTESEAL ACOUSTICS PRIVATE LIMITED',
  'GREEN RIDER TECHNOLOGY LLP',
  'SHELLCODE PRIVATE LIMITED',
  'SPELLBEE INTERNATIONAL PRIVATE LIMITED',
  'SRILIN ELECTRONICS PRIVATE LIMITED',
  'MAKE YOUR OWN PERFUME (MYOP) LLP',
  'SOLITUDE FLAME PRIVATE LIMITED',
  'KYARI INNOVATIONS PRIVATE LIMITED',
  'ANABLADE PRIVATE LIMITED',
  'AUXOBIT AEROSPACE PRIVATE LIMITED',
  'CERO SMART MOBILITY PRIVATE LIMITED',
  'TRIPLE ELEPHANT CORPORATION LLP',
  'ALLAHABADHEART CENTRE LLP',
  'FOG TECHNOLOGIES PRIVATE LIMITED',
  'RASS HEAVY ELECTRICALS PRIVATE LIMITED',
  'TAPAMS ADVANCED MANAGEMENT AND INDUSTRIES PRIVATE LIMITED',
  'IMZ CORPORATE PRIVATE LIMITED',
  'WIRE INJECTION TECHNOLOGIES PRIVATE LIMITED',
  'CODEFYU TECHNOLOGIES PRIVATE LIMITED',
  'EXICOM TECHNOLOGIES INDIA PRIVATE LIMITED',
  'NEEV FLUIDEX PRIVATE LIMITED',
  '5D VDC SERVICES LLP',
  'ASSURE BIOVENTION PRIVATE LIMITED',
  'INTOZI TECH PRIVATE LIMITED',
  'MAYURVAN FOODS PRIVATE LIMITED',
  'TATVAMASI ENGINEERING PRIVATE LIMITED',
  'RITHUS IN28MINUTES TECHNOLOGY SOLUTIONS PRIVATE LIMITED',
  'PROPLEGIT GLOBAL PRIVATE LIMITED',
  'FACTOR H IT SERVICES PRIVATE LIMITED',
  'AGRONIC FOOD PRIVATE LIMITED',
  'LIGHTMARKS INFRA PRIVATE LIMITED',
  'THINK SCHOOL PRIVATE LIMITED',
  'SIRI SAMPADA INFRASTRUCTURE PRIVATE LIMITED',
  'EVAMP TECHNOLOGIES PRIVATE LIMITED',
  'BJK DESIGNS PRIVATE LIMITED',
  'BOT CONSULTING PRIVATE LIMITED',
  'HECTA PROPTECH PRIVATE LIMITED',
  'TECHINTELLI SOLUTIONS PRIVATE LIMITED',
  'BELLCURVE BROKING PRIVATE LIMITED',
  'ADAPTIS PHARMA PRIVATE LIMITED',
  'AVFX SOLUTIONS PRIVATE LIMITED',
  'NEOWINN BIOTECH PRIVATE LIMITED',
  'YES GERMANY EDUCATION PRIVATE LIMITED',
  'JEH AEROSPACE PRIVATE LIMITED',
  'GREENOVOC SPECIALTY COATINGS PRIVATE LIMITED',
  'DIATECH PLATFORMS PRIVATE LIMITED',
  'MOBILOGI TECHNOLOGIES PRIVATE LIMITED',
  'FLOYDEE INFOTECH PRIVATE LIMITED',
  'GREENLINE ECO PRODUCT PRIVATE LIMITED',
  'CHASEOUT TECHNOLOGIES PRIVATE LIMITED',
  'FUTURIQ SYSTEMS PRIVATE LIMITED',
  'IMMENSITY COMMERCE PRIVATE LIMITED',
  'SHRI BARSANA E-VEHICLES PRIVATE LIMITED',
  'KIWI CONTENT PRIVATE LIMITED',
  'GLADIOS PRODUCTS PRIVATE LIMITED',
  'OFIS SPACES PRIVATE LIMITED',
  'H&F FASHION PRIVATE LIMITED',
  'RED & WHITE EDUCATION PRIVATE LIMITED',
  'MAHAVEERER FABS PRIVATE LIMITED',
  'SARVOCHHGYAN EDUTECH PRIVATE LIMITED',
  'VISIONEXCELLENCE CONSULTING PRIVATE LIMITED',
  'XOQOVO PRIVATE LIMITED',
  'SVN LASER TECH PRIVATE LIMITED',
];

export default function CertificateTicker() {
  const rootRef = useRef(null);
  const track1Ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          x: '-50%',
          duration: 1200,
          ease: 'none',
          repeat: -1,
        });
      }

      gsap.to('[data-cert-dot]', {
        scale: 1.4,
        opacity: 0.4,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('[data-ticker-shimmer]', {
        backgroundPosition: '-200% 0',
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const renderRow = (items) => (
    <div className="flex items-center gap-4 sm:gap-6 lg:gap-10 shrink-0 pr-4 sm:pr-6 lg:pr-10">
      {items.map((company, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
            <CheckCircle2 size={8} className="sm:hidden text-gold" strokeWidth={2.5} />
            <CheckCircle2 size={10} className="hidden sm:block text-gold" strokeWidth={2.5} />
          </span>

          <span className="text-[10px] sm:text-[12px] lg:text-[13px] font-semibold tracking-wide text-white/85 whitespace-nowrap uppercase">
            {company}
          </span>

          <span className="text-[7px] sm:text-[9px] lg:text-[10px] font-medium tracking-[0.15em] text-blue/80 whitespace-nowrap uppercase ml-0.5 sm:ml-1">
            GOT 80-IAC CERTIFICATE FROM IMB COMMITTEE
          </span>

          <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0 ml-2 sm:ml-3" />
        </div>
      ))}
    </div>
  );

  const loopItems = [...COMPANIES, ...COMPANIES];

  return (
    <section
      ref={rootRef}
      className="relative bg-[#0A0F1F] border-y border-blue/15 overflow-hidden py-2 sm:py-2.5 lg:py-3.5"
      aria-label="Certified companies ticker"
    >
      {/* Shimmer top line */}
      <div
        data-ticker-shimmer
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.7) 30%, rgba(204,171,110,0.9) 50%, rgba(45,156,255,0.7) 70%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(45,156,255,0.08), transparent 70%)',
        }}
      />

      {/* ============ EK ROW: Badge left, Ticker right ============ */}
      <div className="relative flex items-center gap-1.5 sm:gap-2 lg:gap-4">

        {/* ============ LEFT BADGE — 2 LINES ============ */}
        <div className="shrink-0 pl-2 sm:pl-3 lg:pl-6 z-10">
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute -inset-0.5 sm:-inset-1 rounded-lg opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(204,171,110,0.35), transparent 70%)',
                filter: 'blur(8px)',
              }}
              aria-hidden="true"
            />

            {/* Main badge — 2 LINES */}
            <div
              className="relative flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(204,171,110,0.15) 0%, rgba(10,15,31,0.9) 50%, rgba(45,156,255,0.12) 100%)',
                border: '1px solid rgba(204,171,110,0.35)',
                boxShadow:
                  'inset 0 0 12px rgba(204,171,110,0.08), 0 0 12px rgba(45,156,255,0.1)',
              }}
            >
              {/* Shimmer sweep */}
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(120deg, transparent 30%, rgba(204,171,110,0.15) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'badgeShimmer 4s ease-in-out infinite',
                }}
                aria-hidden="true"
              />

              {/* Gold left accent bar */}
              <span
                className="relative w-[1px] sm:w-[1.5px] h-5 sm:h-6 rounded-full shrink-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent, #CCAB6E 30%, #CCAB6E 70%, transparent)',
                }}
                aria-hidden="true"
              />

              {/* Text block — 2 LINES */}
              <div className="relative flex flex-col leading-none">
                {/* Line 1: CERTIFIED + green dot */}
                <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                  <span className="text-[5px] sm:text-[6px] font-bold tracking-[0.15em] text-gold/90 uppercase whitespace-nowrap">
                    Certified
                  </span>
                  <span className="relative flex items-center justify-center w-1 h-1 shrink-0">
                    <span
                      data-cert-dot
                      className="absolute inset-0 rounded-full bg-green-400"
                    />
                    <span className="relative w-0.5 h-0.5 rounded-full bg-green-400" />
                  </span>
                </div>

                {/* Line 2: 80-IAC Recognised */}
                <span
                  className="font-display text-[8px] sm:text-[9px] lg:text-[10px] font-bold tracking-tight whitespace-nowrap"
                  style={{
                    background:
                      'linear-gradient(90deg, #FFFFFF 0%, #F6E9C9 50%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  80-IAC Recognised
                </span>
              </div>

              {/* Checkmark circle — right side */}
              <div className="relative shrink-0 self-center">
                <span
                  className="flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(204,171,110,0.3), rgba(45,156,255,0.2))',
                    border: '1px solid rgba(204,171,110,0.5)',
                  }}
                >
                  <CheckCircle2
                    size={6}
                    className="text-gold"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px h-5 sm:h-6 lg:h-8 bg-gradient-to-b from-transparent via-blue/30 to-transparent shrink-0" />

        {/* ============ MARQUEE TICKER ============ */}
        <div className="flex-1 relative overflow-hidden min-w-0">
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0A0F1F] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 lg:w-20 z-10 pointer-events-none bg-gradient-to-l from-[#0A0F1F] to-transparent" />

          <div
            ref={track1Ref}
            className="flex will-change-transform"
            style={{ width: 'max-content' }}
          >
            {renderRow(loopItems)}
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px h-5 sm:h-6 lg:h-8 bg-gradient-to-b from-transparent via-blue/30 to-transparent shrink-0" />

        {/* ============ RIGHT LIVE COUNTER (sirf desktop) ============ */}
        <div className="hidden lg:flex shrink-0 pr-6 lg:pr-10 items-center gap-2 z-10">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={12} className="text-green-400" strokeWidth={2.5} />
            <span className="text-[11px] font-bold tracking-wide text-white tabular">
              150+
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-[0.15em] text-white/50 uppercase whitespace-nowrap">
            Startups Recognised
          </span>
        </div>
      </div>
    </section>
  );
}