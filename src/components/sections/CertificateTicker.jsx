import { useEffect, useRef } from 'react';
import { Award, CheckCircle2, FileCheck } from 'lucide-react';
import { gsap } from '../../lib/gsap';

/* ============ REAL VERIFIED INDIAN STARTUPS THAT RECEIVED 80-IAC GAZETTE APPROVAL ============ */
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
      const track1 = track1Ref.current;
      if (!track1) return;

      const singleWidth = track1.scrollWidth / 2;

      gsap.to(track1, {
        x: -singleWidth,
        duration: 90,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const renderRow = (items) => (
    <div className="flex items-center gap-6 lg:gap-10 shrink-0 pr-6 lg:pr-10">
      {items.map((company, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
            <CheckCircle2 size={10} className="text-emerald-400" strokeWidth={2.5} />
          </span>

          <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide text-white/90 whitespace-nowrap uppercase">
            {company}
          </span>

          <span className="text-[9px] font-medium tracking-wider text-sky whitespace-nowrap uppercase bg-white/10 px-2 py-0.5 rounded">
            Section 80-IAC Certificate Approved
          </span>

          <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0 ml-2" />
        </div>
      ))}
    </div>
  );

  const loopItems = [...COMPANIES, ...COMPANIES];

  return (
    <section
      ref={rootRef}
      className="relative bg-deepblue border-y border-white/10 overflow-hidden py-3"
      aria-label="Public Gazette Ecosystem Startups"
    >
      <div className="relative flex items-center gap-3 lg:gap-5 px-3 sm:px-6">
        {/* Left Badge */}
        <div className="shrink-0 z-10 flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/20">
          <FileCheck size={14} className="text-sky" />
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-sky uppercase tracking-wider">
              Ecosystem Gazette
            </span>
            <span className="text-[10px] font-bold text-white whitespace-nowrap">
              80-IAC IMB Approved
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20 shrink-0" />

        {/* Marquee Track */}
        <div className="flex-1 relative overflow-hidden min-w-0">
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-deepblue to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-deepblue to-transparent" />

          <div
            ref={track1Ref}
            className="flex will-change-transform"
            style={{ width: 'max-content' }}
          >
            {renderRow(loopItems)}
          </div>
        </div>
      </div>
    </section>
  );
}
