import { useState, useMemo } from 'react';
import {
  MapPin,
  Building2,
  Sparkles,
  ArrowUpRight,
  Search,
  ExternalLink,
  Coins,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Compass,
  Layers,
  X,
} from 'lucide-react';
import RevealOnScroll from '../motion/RevealOnScroll';
import MagneticButton from '../motion/MagneticButton';
import { getWhatsAppLink } from '../../lib/constants';

/* ============================================================
   STATE INTELLIGENCE DATA (Central vs State Policies)
   ============================================================ */
const STATE_DATA = {
  gujarat: {
    name: 'Gujarat',
    code: 'GJ',
    capital: 'Gandhinagar / Ahmedabad',
    policy: 'Gujarat Startup Policy (2022–2027)',
    nodalAgency: 'Industries Commissionerate & i-Hub',
    portalUrl: 'https://startup.gujarat.gov.in',
    highlights: [
      { label: 'Seed Grant Assistance', value: 'Up to ₹30 Lakhs per startup for prototype & commercialization' },
      { label: 'Founder Sustenance Allowance', value: '₹20,000/month for 1 year (₹25,000/month for women/social founders)' },
      { label: 'Patent Filing Reimbursement', value: '75% of actual cost up to ₹2 Lakhs (domestic) / ₹5 Lakhs (international)' },
      { label: 'Electricity & Capital Subsidy', value: '100% electricity duty exemption for 5 years for eligible units' },
    ],
    prioritySectors: ['Fintech & GIFT City', 'Chemicals & Petrochemicals', 'Renewable Energy & Solar', 'Agritech', 'Textile & Advanced Materials'],
    keyIncubators: ['i-Hub Gujarat (KCG)', 'iCreate (International Centre for Entrepreneurship)', 'CIIE.CO (IIM Ahmedabad)', 'PDEU Innovation Hub'],
    centralLinkage: 'Eligible for CGSS credit guarantee, DST NIDHI grants, and Section 80-IAC central tax holiday concurrently.',
  },
  karnataka: {
    name: 'Karnataka',
    code: 'KA',
    capital: 'Bengaluru',
    policy: 'Karnataka Startup Policy (2022–2027)',
    nodalAgency: 'KITS (Karnataka Innovation & Tech Society)',
    portalUrl: 'https://startup.karnataka.gov.in',
    highlights: [
      { label: 'IDEA2PoC (ELEWATE) Grant', value: 'Up to ₹50 Lakhs non-dilutive grant for high-tech innovative startups' },
      { label: 'Beyond Bengaluru Incentive', value: 'Direct subsidy packages for startups setting up in Mysuru, Mangaluru, Hubballi' },
      { label: 'Patent Cost Reimbursement', value: 'Up to ₹2 Lakhs for Indian patents and up to ₹10 Lakhs for foreign patents' },
      { label: 'State GST Reimbursement', value: '100% reimbursement of state GST for early-stage recognized startups' },
    ],
    prioritySectors: ['Enterprise SaaS & Cloud', 'Artificial Intelligence & DeepTech', 'Biotechnology & MedTech', 'Aerospace & SpaceTech', 'EV & Clean Energy'],
    keyIncubators: ['NSRCEL (IIM Bangalore)', 'C-CAMP (Biotech)', 'DERBI Foundation', 'IISc SID (Society for Innovation & Development)'],
    centralLinkage: 'Integrated with Startup India NSWS portal with fast-track DPIIT certification pipeline.',
  },
  maharashtra: {
    name: 'Maharashtra',
    code: 'MH',
    capital: 'Mumbai / Pune',
    policy: 'Maharashtra State Innovative Startup Policy',
    nodalAgency: 'Maharashtra State Innovation Society (MSInS)',
    portalUrl: 'https://msins.in',
    highlights: [
      { label: 'Quality Testing & Cert Grant', value: '80% fee reimbursement up to ₹2 Lakhs for accredited lab tests' },
      { label: 'Patent Support Scheme', value: 'Financial assistance up to ₹2 Lakhs (domestic) and ₹10 Lakhs (international)' },
      { label: 'State Procurement Preference', value: 'Relaxation of prior turnover and experience in government departmental tenders' },
      { label: 'Women Entrepreneur Cell', value: 'Special innovation grant pool and dedicated incubation support' },
    ],
    prioritySectors: ['BFSI & Financial Technology', 'Automotive & Industrial Engineering', 'Logistics & Supply Chain', 'Digital Media & Gaming', 'CleanTech'],
    keyIncubators: ['SINE (IIT Bombay)', 'Venture Center (NCL Pune)', 'CoEP Bhau Institute', 'AIC-NMIMS'],
    centralLinkage: 'Direct linkage with CGTMSE credit guarantee for Mumbai/Pune industrial and services clusters.',
  },
  telangana: {
    name: 'Telangana',
    code: 'TS',
    capital: 'Hyderabad',
    policy: 'Telangana Innovation & Startup Policy',
    nodalAgency: 'IT, E&C Department & T-Hub',
    portalUrl: 'https://startup.telangana.gov.in',
    highlights: [
      { label: 'T-Fund Seed Allocations', value: 'Seed investments ranging from ₹25 Lakhs to ₹1 Crore via state partner funds' },
      { label: 'T-Hub & WE Hub Access', value: 'Direct incubation, wet lab access, and sovereign investor matchmaking' },
      { label: 'Patent & Exhibition Reimbursement', value: 'Up to ₹2 Lakhs for IP registration and 50% stall fee rebate in international expos' },
      { label: 'Cloud & Tool Credits', value: 'Subsidized access to cloud compute, prototyping tools, and digital platforms' },
    ],
    prioritySectors: ['Pharmaceuticals & Life Sciences', 'MedTech & Diagnostics', 'Defense & Aerospace', 'Enterprise AI', 'Agritech'],
    keyIncubators: ['T-Hub (World\'s largest innovation campus)', 'WE Hub (Women entrepreneurs)', 'CCMB BioNEST', 'AIC-CCMB'],
    centralLinkage: 'Co-partner in BIRAC Biotechnology Ignition Grants and MeitY TIDE 2.0 schemes.',
  },
  delhi: {
    name: 'Delhi NCR',
    code: 'DL',
    capital: 'New Delhi / Gurugram / Noida',
    policy: 'Delhi Startup Policy 2022',
    nodalAgency: 'Delhi Innovation & Incubation Council',
    portalUrl: 'https://delhi.gov.in',
    highlights: [
      { label: 'Collateral-Free Loan Subvention', value: 'Financial subvention on collateral-free loans for early ventures' },
      { label: 'Procurement Preference', value: 'Direct access to Delhi Government departmental tenders with EMD exemptions' },
      { label: 'Incubation Space Subsidy', value: '50% rent subsidy on coworking desks in empanelled Delhi government incubators' },
      { label: 'IPR Filing Reimbursement', value: 'Up to 80% reimbursement on trademark and patent government fees' },
    ],
    prioritySectors: ['E-Commerce & Quick Commerce', 'D2C Consumer Brands', 'Logistics & Fleet Tech', 'EdTech & Digital Media', 'GovTech & Civic Services'],
    keyIncubators: ['IIT Delhi FITT', 'DTU Innovation & Incubation Foundation', 'IIIT-Delhi Incubation Centre', 'NSUT IIF'],
    centralLinkage: 'Immediate physical proximity to DPIIT, Central Ministries, MCA headquarters, and CBDT.',
  },
  tamilnadu: {
    name: 'Tamil Nadu',
    code: 'TN',
    capital: 'Chennai / Coimbatore',
    policy: 'Tamil Nadu Startup & Innovation Policy (TANSIM)',
    nodalAgency: 'StartupTN',
    portalUrl: 'https://startuptn.in',
    highlights: [
      { label: 'TANSEED Equity Grant', value: '₹10 Lakhs seed grant per startup across multiple innovation cohorts' },
      { label: 'SC/ST Startup Fund', value: 'Dedicated ₹30 Crore special equity/debt fund for marginalized founders' },
      { label: 'Regional Startup Hubs', value: 'Direct incubation hubs across Madurai, Tirunelveli, Erode, Salem, Cuddalore' },
      { label: 'Smart Card Procurement Perks', value: 'Green channel for government procurement up to ₹50 Lakhs without tender' },
    ],
    prioritySectors: ['Automotive & EV Components', 'Deep Engineering & SaaS', 'Hardware & Electronic System Design (ESDM)', 'Textile & Sustainable Apparel', 'AgriTech'],
    keyIncubators: ['IIT Madras Research Park', 'AIC-AU Incubation Foundation', 'Villgro Innovations', 'Forge Academy & Labs'],
    centralLinkage: 'Fully aligned with Startup India DPIIT and MSME Champions schemes.',
  },
  rajasthan: {
    name: 'Rajasthan',
    code: 'RJ',
    capital: 'Jaipur',
    policy: 'iStart Rajasthan Startup Policy',
    nodalAgency: 'Department of Information Technology & Communication (DoITC)',
    portalUrl: 'https://istart.rajasthan.gov.in',
    highlights: [
      { label: 'iStart Seed Grant', value: 'Viability grants up to ₹5 Lakhs for ideation and up to ₹25 Lakhs for seed stage' },
      { label: 'Bhamashah Techno Hub', value: 'Free high-tech coworking, mentorship, and prototyping lab in Jaipur' },
      { label: 'Challenge for Change', value: 'Direct work orders up to ₹25 Lakhs from government departments without tender' },
      { label: 'Sustenance Allowance', value: 'Monthly stipend of ₹20,000 for verified innovative student and early founders' },
    ],
    prioritySectors: ['D2C Brands & Handicrafts', 'Tourism & Hospitality Tech', 'Solar & Renewable Energy', 'Mining & Minerals Tech', 'Fintech'],
    keyIncubators: ['Techno Hub Jaipur', 'MNIT Innovation Centre', 'BITS Pilani TBI', 'iStart Nests across Kota, Udaipur, Jodhpur'],
    centralLinkage: 'Integrated with MSME PMEGP margin money and CGTMSE guarantee schemes.',
  },
  kerala: {
    name: 'Kerala',
    code: 'KL',
    capital: 'Thiruvananthapuram / Kochi',
    policy: 'Kerala Startup Mission (KSUM) Policy',
    nodalAgency: 'Kerala Startup Mission (KSUM)',
    portalUrl: 'https://startupmission.kerala.gov.in',
    highlights: [
      { label: 'KSUM Idea Grant', value: 'Product grant up to ₹12 Lakhs for hardware, software, and deeptech prototypes' },
      { label: 'Scaleup Loan Facility', value: 'Soft loan up to ₹15 Lakhs at concessionary interest rate of 6%' },
      { label: 'Super Fab Lab Access', value: 'Direct access to Asia\'s first MIT Super Fab Lab for digital hardware fabrication' },
      { label: 'Government as a Customer', value: 'Direct government department pilot orders up to ₹50 Lakhs' },
    ],
    prioritySectors: ['Hardware & Digital Fabrication', 'Maritime & Blue Economy', 'Biotechnology & Health Informatics', 'Web3 & Cyber Security', 'EdTech'],
    keyIncubators: ['Kerala Startup Mission Kochi', 'Maker Village (Hardware IoT)', 'BioNEST Kochi', 'Technopark TBI'],
    centralLinkage: 'Partner with DST NIDHI PRAYAS and BIRAC BIG for deeptech innovation grants.',
  },
};

/* ============================================================
   INDIA BUSINESS ECOSYSTEM HUBS DATA
   ============================================================ */
const ECOSYSTEM_HUBS = [
  {
    id: 'ahmedabad',
    name: 'Ahmedabad / GIFT City',
    state: 'Gujarat',
    role: 'Fintech, Chemicals & MSME Capital',
    coords: { x: 26, y: 48 },
    desc: 'India\'s premier industrial manufacturing and international financial services gateway (GIFT City IFSC). Leading center for chemicals, pharma, solar energy, and textile engineering.',
    sectors: ['Fintech & IFSC Banking', 'Specialty Chemicals', 'Renewable Energy', 'Pharma Formulation', 'Textiles'],
    stats: { activeEntities: '8,500+ MSMEs', sovereignFund: 'GIFT IFSC Global Access', keyAnchor: 'iCreate & i-Hub' },
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    role: 'SaaS, DeepTech & AI Capital',
    coords: { x: 38, y: 74 },
    desc: 'India\'s Silicon Valley housing over 40% of the nation\'s venture-backed unicorns. Global hub for enterprise SaaS, generative AI, SpaceTech, and semiconductor design.',
    sectors: ['Enterprise SaaS', 'Artificial Intelligence', 'Aerospace & Defense', 'Biotechnology', 'Fintech'],
    stats: { activeEntities: '14,000+ Startups', sovereignFund: 'KITS ELEWATE Grants', keyAnchor: 'IIT-B, IISc & NSRCEL' },
  },
  {
    id: 'mumbai',
    name: 'Mumbai / Pune',
    state: 'Maharashtra',
    role: 'BFSI, Automotive & Industrial Tech',
    coords: { x: 30, y: 58 },
    desc: 'The financial engine of India combining premier commercial banking, stock exchanges, and venture funds with the massive automotive and heavy engineering corridor of Pune.',
    sectors: ['Commercial Banking & BFSI', 'Automotive & EV Tech', 'Logistics & Shipping', 'Media & Entertainment', 'CleanTech'],
    stats: { activeEntities: '12,500+ Companies', sovereignFund: 'MSInS Innovation Fund', keyAnchor: 'SINE IIT Bombay & Venture Center' },
  },
  {
    id: 'delhi',
    name: 'Delhi NCR (Gurugram / Noida)',
    state: 'Delhi NCR',
    role: 'E-Commerce, D2C & Policy Nexus',
    coords: { x: 36, y: 28 },
    desc: 'The political and consumer capital with the largest domestic consumption footprint. Dominates Indian e-commerce, foodtech, D2C retail, and strategic government affairs.',
    sectors: ['E-Commerce & Quick Commerce', 'D2C Consumer Brands', 'Logistics Infrastructure', 'Fintech & Payments', 'EdTech'],
    stats: { activeEntities: '13,000+ Startups', sovereignFund: 'Delhi Innovation Council', keyAnchor: 'IIT Delhi FITT' },
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    role: 'Life Sciences, MedTech & T-Hub',
    coords: { x: 42, y: 62 },
    desc: 'The vaccine and pharmaceutical capital of India, housing the world\'s largest standalone innovation campus (T-Hub) and Genome Valley with premier clinical R&D.',
    sectors: ['Pharma & Therapeutics', 'Medical Devices', 'Defense & Aerospace', 'Enterprise Cloud', 'DeepTech'],
    stats: { activeEntities: '7,800+ Ventures', sovereignFund: 'T-Fund Allocations', keyAnchor: 'T-Hub & WE Hub' },
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    role: 'Automotive, Deep Engineering & SaaS',
    coords: { x: 46, y: 78 },
    desc: 'The Detroit of South Asia combining heavy vehicle manufacturing and electronic hardware with a formidable enterprise B2B SaaS ecosystem anchored by IIT Madras.',
    sectors: ['Automotive & EV Clusters', 'B2B Enterprise SaaS', 'Hardware & Electronics', 'Renewable Tech', 'Maritime Logistics'],
    stats: { activeEntities: '6,200+ Startups', sovereignFund: 'TANSEED Grants', keyAnchor: 'IIT Madras Research Park' },
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    role: 'D2C, Heritage & Clean Energy',
    coords: { x: 32, y: 34 },
    desc: 'Rapidly emerging tier-2 powerhouse dominating Indian direct-to-consumer lifestyle brands, gems, artisanal commerce, and vast solar clean energy generation.',
    sectors: ['D2C Lifestyle & Apparel', 'Solar & Clean Power', 'Tourism & Hospitality Tech', 'Handicrafts Export', 'Agritech'],
    stats: { activeEntities: '3,800+ Enterprises', sovereignFund: 'iStart Viability Grants', keyAnchor: 'Techno Hub Jaipur' },
  },
  {
    id: 'kochi',
    name: 'Kochi / Thiruvananthapuram',
    state: 'Kerala',
    role: 'Maritime, Hardware IoT & Web3',
    coords: { x: 36, y: 86 },
    desc: 'Premier destination for hardware fabrication, digital prototyping, and deep coastal economy. Hosts Asia\'s premier Super Fab Lab and thriving electronics development clusters.',
    sectors: ['Hardware & IoT', 'Maritime & Marine Tech', 'Health Informatics', 'Web3 & Cyber Security', 'Agritech'],
    stats: { activeEntities: '3,200+ Startups', sovereignFund: 'KSUM Idea Grants', keyAnchor: 'Maker Village & KSUM' },
  },
];

export default function IndiaMapExplorer() {
  const [viewMode, setViewMode] = useState('policies'); // 'policies' | 'hubs'
  const [selectedStateKey, setSelectedStateKey] = useState('gujarat');
  const [selectedHubId, setSelectedHubId] = useState('ahmedabad');
  const [searchState, setSearchState] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('All');

  const currentState = STATE_DATA[selectedStateKey] || STATE_DATA.gujarat;
  const currentHub = ECOSYSTEM_HUBS.find((h) => h.id === selectedHubId) || ECOSYSTEM_HUBS[0];

  // Filter states based on search query
  const stateKeys = Object.keys(STATE_DATA);
  const filteredStateKeys = useMemo(() => {
    if (!searchState.trim()) return stateKeys;
    const q = searchState.toLowerCase();
    return stateKeys.filter((k) =>
      STATE_DATA[k].name.toLowerCase().includes(q) ||
      STATE_DATA[k].capital.toLowerCase().includes(q)
    );
  }, [searchState, stateKeys]);

  return (
    <section className="py-20 lg:py-28 bg-canvas border-b border-line overflow-hidden" id="india-map-explorer">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-3">
              <Compass size={12} className="text-blue" />
              Pan-India Startup Intelligence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              Interactive India Opportunities & Ecosystem Map
            </h2>
            <p className="text-xs sm:text-sm text-graphite mt-3 leading-relaxed">
              Explore state startup policies, sovereign capital grants, and industrial innovation hubs across India. Compare state-level subsidies against central flagship schemes.
            </p>
          </div>
        </RevealOnScroll>

        {/* View Mode Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1.5 rounded-full bg-white border border-line shadow-sm">
            <button
              onClick={() => setViewMode('policies')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                viewMode === 'policies'
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              <Landmark size={14} />
              <span>State Startup Policies & Subsidies</span>
            </button>
            <button
              onClick={() => setViewMode('hubs')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                viewMode === 'hubs'
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              <Building2 size={14} />
              <span>India Business Ecosystem Hubs</span>
            </button>
          </div>
        </div>

        {/* Main Map + Intelligence Console Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: INTERACTIVE MAP CANVAS (7 COLS) ================= */}
          <div className="lg:col-span-6 xl:col-span-6 bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between min-h-[580px]">
            
            {/* Top Bar inside Map Card */}
            <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue uppercase">
                  {viewMode === 'policies' ? 'Click Any State to Inspect' : 'Click Hub Pins to Explore'}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-ink">
                  {viewMode === 'policies' ? 'Sovereign States & UTs' : 'Major Industrial Growth Hubs'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-soft border border-blue/20 text-[10px] font-bold text-blue uppercase">
                {viewMode === 'policies' ? `${stateKeys.length} Priority States Mapped` : `${ECOSYSTEM_HUBS.length} Industrial Hubs`}
              </span>
            </div>

            {/* State Search Input (for accessibility & fast mobile navigation) */}
            {viewMode === 'policies' && (
              <div className="relative mb-4">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  placeholder="Type to filter states (e.g. Gujarat, Karnataka, Delhi, Maharashtra)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-canvas border border-line text-xs text-ink placeholder-muted focus:outline-none focus:border-blue"
                />
                {searchState && (
                  <button
                    onClick={() => setSearchState('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* Quick State Selector Pills */}
            {viewMode === 'policies' && (
              <div className="flex flex-wrap gap-1.5 mb-5 max-h-[76px] overflow-y-auto pr-1">
                {filteredStateKeys.map((key) => {
                  const state = STATE_DATA[key];
                  const isSelected = selectedStateKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedStateKey(key)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-blue text-white shadow-xs'
                          : 'bg-canvas text-graphite border border-line hover:border-blue/30 hover:text-ink'
                      }`}
                    >
                      {state.name}
                    </button>
                  );
                })}
              </div>
            )}

            {/* SVG Visual Canvas */}
            <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center my-auto bg-canvas/30 rounded-2xl border border-line/60 overflow-hidden p-2">
              
              {/* Background Geographic Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#1C83F3_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

              {/* View 1: States Polygonal Interactive Representation */}
              {viewMode === 'policies' ? (
                <div className="relative w-full h-full flex flex-col justify-between p-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-auto">
                    {stateKeys.map((k) => {
                      const s = STATE_DATA[k];
                      const isSelected = selectedStateKey === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setSelectedStateKey(k)}
                          className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-blue text-white border-blue shadow-md scale-102 ring-2 ring-blue/20'
                              : 'bg-white text-ink border-line hover:border-blue/40 hover:bg-blue-soft/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-sky' : 'text-blue'}`}>
                              {s.code}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <h4 className="font-display text-xs font-bold leading-tight">
                            {s.name}
                          </h4>
                          <span className={`text-[9px] mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-muted'}`}>
                            {s.capital.split('/')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-center text-muted font-medium mt-2">
                    Select any state above to inspect verified capital subsidies and nodal incubators.
                  </p>
                </div>
              ) : (
                /* View 2: India Ecosystem Hubs Interactive Canvas */
                <div className="relative w-full h-full flex flex-col justify-between p-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-auto">
                    {ECOSYSTEM_HUBS.map((hub) => {
                      const isSelected = selectedHubId === hub.id;
                      return (
                        <button
                          key={hub.id}
                          onClick={() => setSelectedHubId(hub.id)}
                          className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-deepblue text-white border-deepblue shadow-md scale-102 ring-2 ring-blue/20'
                              : 'bg-white text-ink border-line hover:border-blue/40 hover:bg-blue-soft/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <MapPin size={13} className={isSelected ? 'text-sky' : 'text-blue'} />
                            <span className={`text-[9px] font-bold ${isSelected ? 'text-sky' : 'text-muted'}`}>
                              {hub.state}
                            </span>
                          </div>
                          <h4 className="font-display text-xs font-bold leading-tight mt-0.5">
                            {hub.name.split('/')[0]}
                          </h4>
                          <span className={`text-[9px] mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-muted'}`}>
                            {hub.role}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-center text-muted font-medium mt-2">
                    Click any industrial hub above to inspect key anchors, active entities, and capital focus.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Map Note */}
            <div className="pt-4 border-t border-line flex items-center justify-between text-[11px] text-muted">
              <span>Verified Government Gazette Data</span>
              <span className="font-semibold text-blue">28 States & UTs Covered</span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: STATE / HUB INTELLIGENCE DOSSIER (5 COLS) ================= */}
          <div className="lg:col-span-6 xl:col-span-6">
            
            {viewMode === 'policies' ? (
              /* State Policy Intelligence Card */
              <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-blue uppercase tracking-wider bg-blue-soft px-2.5 py-0.5 rounded-full border border-blue/20">
                          {currentState.code} State Policy
                        </span>
                        <span className="text-[10px] font-semibold text-muted">
                          Capital: {currentState.capital}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-ink">
                        {currentState.name}
                      </h3>
                      <p className="text-xs font-semibold text-deepblue mt-0.5">
                        {currentState.policy}
                      </p>
                    </div>

                    <a
                      href={currentState.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-canvas border border-line text-blue hover:bg-blue hover:text-white transition-colors"
                      title="Visit Official State Portal"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* Highlights Grid */}
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Coins size={14} className="text-blue" />
                    Verified State Capital Grants & Incentives
                  </h4>
                  <div className="space-y-2.5 mb-6">
                    {currentState.highlights.map((h) => (
                      <div key={h.label} className="p-3 rounded-xl bg-canvas border border-line/80">
                        <span className="text-[10px] font-bold text-blue uppercase tracking-wider block">
                          {h.label}
                        </span>
                        <p className="text-xs font-semibold text-ink mt-0.5 leading-snug">
                          {h.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Priority Sectors */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
                      Priority Growth Sectors in {currentState.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentState.prioritySectors.map((sector) => (
                        <span
                          key={sector}
                          className="px-2.5 py-1 rounded-lg bg-blue-soft/50 border border-blue/20 text-[11px] font-semibold text-ink"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Nodal Incubators */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
                      Nodal Innovation Hubs & Incubators
                    </span>
                    <ul className="space-y-1">
                      {currentState.keyIncubators.map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-xs text-graphite">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Central vs State Linkage */}
                  <div className="p-3.5 rounded-2xl bg-blue-soft/40 border border-blue/20 mb-6">
                    <span className="text-[10px] font-bold text-blue uppercase tracking-wider block mb-1">
                      Central + State Co-Financing Scope
                    </span>
                    <p className="text-xs text-graphite leading-relaxed">
                      {currentState.centralLinkage}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-line flex flex-wrap items-center gap-3">
                  <MagneticButton to="/eligibility" variant="primary" size="md">
                    Check Eligibility in {currentState.name} <ArrowUpRight size={14} />
                  </MagneticButton>
                  <MagneticButton
                    href={getWhatsAppLink(`${currentState.name} Startup Policy`)}
                    variant="outline"
                    size="md"
                  >
                    Consult {currentState.name} Desk
                  </MagneticButton>
                </div>
              </div>
            ) : (
              /* Hub Economic Intelligence Card */
              <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-deepblue uppercase tracking-wider bg-sky/30 px-2.5 py-0.5 rounded-full border border-sky/40">
                          {currentHub.state} Hub
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-ink">
                        {currentHub.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue mt-0.5">
                        {currentHub.role}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-blue-soft text-blue flex items-center justify-center">
                      <Building2 size={20} />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-graphite leading-relaxed mb-6">
                    {currentHub.desc}
                  </p>

                  {/* Key Ecosystem Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-canvas border border-line">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Ecosystem Scale</span>
                      <p className="text-sm font-bold text-ink mt-0.5">{currentHub.stats.activeEntities}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-canvas border border-line">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider">State Capital Anchor</span>
                      <p className="text-sm font-bold text-ink mt-0.5">{currentHub.stats.sovereignFund}</p>
                    </div>
                  </div>

                  {/* Sectors */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
                      Leading Industry Clusters
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentHub.sectors.map((sec) => (
                        <span
                          key={sec}
                          className="px-2.5 py-1 rounded-lg bg-canvas border border-line text-[11px] font-semibold text-ink"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Anchor Institution */}
                  <div className="p-3.5 rounded-2xl bg-canvas border border-line mb-6">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                      Premier Institutional Anchors
                    </span>
                    <p className="text-xs font-bold text-ink">
                      {currentHub.stats.keyAnchor}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-line flex flex-wrap items-center gap-3">
                  <MagneticButton to="/consultation" variant="primary" size="md">
                    Connect With {currentHub.name.split('/')[0]} Advisory Desk <ArrowUpRight size={14} />
                  </MagneticButton>
                  <MagneticButton
                    href={getWhatsAppLink(`${currentHub.name} business setup`)}
                    variant="outline"
                    size="md"
                  >
                    WhatsApp Advisory
                  </MagneticButton>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
