import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Building2,
  Landmark,
  Coins,
  Wrench,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES } from '../../data/services';
import { SCHEMES } from '../../data/schemes';

const TOOLS_INDEX = [
  {
    title: 'Business Structure Comparison',
    desc: 'Compare Pvt Ltd vs LLP vs OPC vs Sole Proprietorship',
    url: '/tools/structure-comparison',
    category: 'Tool',
    icon: Building2,
  },
  {
    title: 'MSME Classification Checker',
    desc: 'Check Micro, Small, or Medium status per 2020 Gazette',
    url: '/tools/msme-checker',
    category: 'Tool',
    icon: Landmark,
  },
  {
    title: 'Startup Eligibility Calculator',
    desc: 'Verify DPIIT & Section 80-IAC qualification criteria',
    url: '/eligibility',
    category: 'Tool',
    icon: Sparkles,
  },
  {
    title: 'Startup Runway Calculator',
    desc: 'Calculate months of runway from burn rate and cash',
    url: '/tools/runway-calculator',
    category: 'Tool',
    icon: Coins,
  },
  {
    title: 'Funding Requirement Planner',
    desc: 'Plan grant, equity, and debt capital allocation',
    url: '/tools/funding-planner',
    category: 'Tool',
    icon: Coins,
  },
  {
    title: 'Documentation Checklist Generator',
    desc: 'Generate service-specific mandatory documents checklist',
    url: '/tools/document-checklist',
    category: 'Tool',
    icon: FileText,
  },
];

const POPULAR_SEARCHES = [
  'DPIIT Recognition',
  'Section 80-IAC',
  'DST NIDHI Grant',
  'Private Limited Company',
  'Udyam Registration',
  'GST Registration',
  'Trademark Class Search',
  'MSME ZED Subsidy',
];

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable index
  const allResults = [];

  // Services
  SERVICES.forEach((s) => {
    allResults.push({
      id: `service-${s.slug}`,
      title: s.name,
      desc: s.short || s.description,
      category: 'Service',
      subCategory: s.category,
      url: `/services/${s.slug}`,
      icon: s.icon || Building2,
    });
  });

  // Schemes
  SCHEMES.forEach((s) => {
    allResults.push({
      id: `scheme-${s.slug}`,
      title: s.name,
      desc: s.description,
      category: 'Scheme',
      subCategory: s.supportType || s.category,
      url: `/schemes/${s.slug}`,
      icon: Landmark,
    });
  });

  // Tools
  TOOLS_INDEX.forEach((t) => {
    allResults.push({
      id: `tool-${t.url}`,
      title: t.title,
      desc: t.desc,
      category: 'Tool',
      subCategory: 'Calculator',
      url: t.url,
      icon: t.icon,
    });
  });

  // Filter based on query and category
  const filtered = allResults.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) {
      return false;
    }
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.subCategory?.toLowerCase().includes(q)
    );
  });

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(22,58,138,0.25)] border border-line overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Global Search"
      >
        {/* Search Header */}
        <div className="relative p-4 sm:p-5 border-b border-line flex items-center gap-3 bg-canvas/40">
          <Search size={20} className="text-blue shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search 40+ services, 18+ schemes, tools, or statutory guides..."
            className="w-full bg-transparent text-sm sm:text-base text-ink placeholder-muted focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-muted hover:text-ink hover:bg-line/50 transition-colors"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[11px] font-mono text-muted bg-white border border-line px-2 py-0.5 rounded-md shadow-2xs">
              ESC
            </span>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="px-5 py-2.5 bg-canvas/70 border-b border-line flex items-center gap-2 overflow-x-auto text-xs">
          {['All', 'Service', 'Scheme', 'Tool'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all text-[11px] uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-blue text-white shadow-xs'
                  : 'bg-white border border-line text-graphite hover:text-ink hover:border-blue/30'
              }`}
            >
              {cat === 'All' ? 'All Results' : `${cat}s`}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-muted hidden sm:inline">
            Use ↑↓ to navigate · Enter to select
          </span>
        </div>

        {/* Results / Empty / Initial State */}
        <div className="max-h-[380px] overflow-y-auto p-3 sm:p-4">
          {query.trim() === '' ? (
            /* Initial State — Popular Shortcuts */
            <div className="py-4 px-2">
              <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue" />
                Popular Service Shortcuts
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-xl bg-canvas border border-line text-xs font-semibold text-ink hover:border-blue/40 hover:bg-blue-soft/30 hover:text-blue transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Wrench size={13} className="text-blue" />
                Interactive Founder Tools
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {TOOLS_INDEX.slice(0, 4).map((tool) => (
                  <button
                    key={tool.title}
                    onClick={() => handleSelect(tool.url)}
                    className="text-left p-3 rounded-xl bg-canvas border border-line hover:border-blue/40 hover:bg-blue-soft/20 transition-all flex items-start gap-2.5 group"
                  >
                    <tool.icon size={15} className="text-blue mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink group-hover:text-blue truncate">
                        {tool.title}
                      </p>
                      <p className="text-[10px] text-graphite line-clamp-1">{tool.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            /* Search Results */
            <div className="space-y-1">
              {filtered.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-soft border border-blue/30 shadow-xs'
                        : 'bg-white border border-transparent hover:bg-canvas'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-blue text-white' : 'bg-canvas border border-line text-blue'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ink truncate">
                            {item.title}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              item.category === 'Service'
                                ? 'bg-blue/10 text-blue border border-blue/20'
                                : item.category === 'Scheme'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-graphite line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={15}
                      className={`shrink-0 ${
                        isSelected ? 'text-blue translate-x-0.5' : 'text-muted'
                      } transition-transform`}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-10 px-4">
              <Search size={32} className="text-muted mx-auto mb-3" />
              <p className="text-sm font-bold text-ink mb-1">No matching results found</p>
              <p className="text-xs text-graphite mb-4">
                We couldn't find anything matching "{query}". Try checking your spelling or search for popular categories.
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-4 py-2 rounded-xl bg-blue text-white text-xs font-bold hover:bg-deepblue transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-canvas/80 border-t border-line flex items-center justify-between text-xs text-muted px-5">
          <span>Official CertWinX Advisory Intelligence</span>
          <button
            onClick={onClose}
            className="text-graphite hover:text-ink font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
