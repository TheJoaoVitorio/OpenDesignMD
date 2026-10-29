import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Copy,
  Check,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import { Company, Category } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface PlatformDashboardProps {
  companies: Company[];
  onShowToast: (message: string) => void;
}

export const PlatformDashboard: React.FC<PlatformDashboardProps> = ({
  companies,
  onShowToast
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const categories: Category[] = [
    'All',
    'DevTools & AI',
    'Fintech',
    'Design',
    'SaaS',
    'Cloud'
  ];

  const getCategoryLabel = (cat: Category): string => {
    switch (cat) {
      case 'All': return t.dashboard.categories.all;
      case 'DevTools & AI': return t.dashboard.categories.devtools;
      case 'Fintech': return t.dashboard.categories.fintech;
      case 'Design': return t.dashboard.categories.design;
      case 'SaaS': return t.dashboard.categories.saas;
      case 'Cloud': return t.dashboard.categories.cloud;
      default: return cat;
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Category filter
      if (selectedCategory !== 'All' && company.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = company.name.toLowerCase().includes(q);
      const matchDomain = company.domain.toLowerCase().includes(q);
      const matchTagline = company.tagline.toLowerCase().includes(q);
      const matchTags = company.tags.some((t) => t.toLowerCase().includes(q));
      const matchFont = (company.typography?.fontFamily || '').toLowerCase().includes(q);
      const matchColors = (company.colorTokens || []).some(
        (c) => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q)
      );

      return matchName || matchDomain || matchTagline || matchTags || matchFont || matchColors;
    });
  }, [companies, selectedCategory, searchQuery]);

  const handleCopyHex = (e: React.MouseEvent, hex: string, tokenName: string) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onShowToast(`${t.dashboard.copiedHex}: ${hex} (${tokenName})`);
    setTimeout(() => {
      setCopiedHex(null);
    }, 1500);
  };

  const handleCopyTokens = (e: React.MouseEvent, company: Company) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(company.rawYaml);
    onShowToast(`${company.name} - ${t.detail.yamlCopied}`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E8EAED] dark:border-[#26282E]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] dark:text-[#4285F4] text-xs font-mono font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Google Labs Standard Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-medium text-[#121317] dark:text-white tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-sm sm:text-base text-[#5F6368] dark:text-[#9AA0A6] mt-1 max-w-2xl">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Quick Action Button: Navigate to /extract */}
        <div className="flex-shrink-0">
          <Link
            to="/extract"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform font-medium text-sm shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#1A73E8]" />
            <span>{t.dashboard.extractNewNow}</span>
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Real-time Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#5F6368] dark:text-[#9AA0A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.dashboard.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] text-sm text-[#121317] dark:text-white placeholder-[#5F6368]/60 dark:placeholder-[#9AA0A6]/60 focus:outline-none focus:border-[#1A73E8] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white"
            >
              {t.dashboard.clearSearch}
            </button>
          )}
        </div>

        {/* Category Filter Pills (Mobbin / designmd.co style) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-sm'
                    : 'bg-white dark:bg-[#16181D] text-[#5F6368] dark:text-[#9AA0A6] border border-[#E8EAED] dark:border-[#26282E] hover:border-[#121317]/30 dark:hover:border-white/30'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#5F6368] dark:text-[#9AA0A6] font-mono">
        <span>
          {t.dashboard.showingCount} <strong className="text-[#121317] dark:text-white">{filteredCompanies.length}</strong> {t.dashboard.verifiedSystems}
        </span>
        <span className="hidden sm:inline">
          {t.dashboard.dtcgWcagInfo}
        </span>
      </div>

      {/* Grid of Company Cards (Mobbin Style) */}
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-8">
          <p className="text-base text-[#121317] dark:text-white font-medium mb-2">{t.dashboard.noResultsTitle}</p>
          <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mb-6">
            {t.dashboard.noResultsDesc}
          </p>
          <Link
            to="/extract"
            className="px-5 py-2.5 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] text-xs font-medium inline-flex items-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ {t.landing.extractBtn} "{searchQuery || 'URL'}"</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => navigate(`/system/${company.id}`)}
              className="group cursor-pointer rounded-2xl sm:rounded-[24px] bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] hover:border-[#1A73E8]/50 dark:hover:border-[#1A73E8]/50 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Browser Window Frame Header with Real Site Screenshot */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#121317] border-b border-[#E8EAED]/50 dark:border-[#26282E]">
                  {/* Browser Chrome Header Bar */}
                  <div className="absolute top-0 left-0 right-0 z-20 h-7 px-3 bg-[#1A1C23]/90 dark:bg-[#0D0E12]/95 backdrop-blur-md flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]/80" />
                    </div>

                    <div className="px-2.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono text-white/70 max-w-[140px] truncate border border-white/5">
                      {company.domain}
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium bg-white/10 text-white/90 border border-white/15">
                      {company.category}
                    </span>
                  </div>

                  {/* Real Site Screenshot Capture */}
                  {company.screenshotUrl ? (
                    <img
                      src={company.screenshotUrl}
                      alt={`${company.name} website capture`}
                      className="object-cover object-top w-full h-full pt-7 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallbackEl = e.currentTarget.parentElement?.querySelector('.fallback-gradient');
                        if (fallbackEl) (fallbackEl as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback container if screenshot is not yet available */}
                  <div
                    className={`fallback-gradient w-full h-full pt-7 p-4 flex flex-col justify-between relative overflow-hidden ${
                      company.screenshotUrl ? 'hidden' : 'flex'
                    }`}
                    style={{ background: company.heroGradient }}
                  >
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    <div className="z-10 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 shadow-lg mt-auto">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono font-semibold text-white truncate max-w-[140px]">
                          {company.name}
                        </span>
                        <span className="text-[9px] font-mono text-white/70">
                          {company.metrics.contrastScore.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Brand Monogram Badge */}
                  <div
                    className="absolute bottom-2.5 right-2.5 z-20 w-7 h-7 rounded-lg shadow-md border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold font-mono"
                    style={{ background: company.accentColor }}
                    title={company.name}
                  >
                    {company.name.charAt(0)}
                  </div>
                </div>

                {/* Company Details Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-sans font-medium text-lg text-[#121317] dark:text-white group-hover:text-[#1A73E8] dark:group-hover:text-[#4285F4] transition-colors flex items-center space-x-1.5">
                        <span>{company.name}</span>
                        {company.verifiedStandard && (
                          <CheckCircle2 className="w-4 h-4 text-[#1A73E8] inline flex-shrink-0" />
                        )}
                      </h3>
                      <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                        {company.domain}
                      </span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed line-clamp-2 mt-2 mb-4">
                    {company.tagline}
                  </p>

                  {/* Interactive Color Palette with Click-to-Copy */}
                  <div className="mb-4">
                    <div className="text-[10px] font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase mb-1.5 flex items-center justify-between">
                      <span>{t.dashboard.paletteClickToCopy}</span>
                      <span className="text-[9px] lowercase">{t.dashboard.hexUnit}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {(company.colorTokens || []).slice(0, 5).map((tok) => {
                        const isThisCopied = copiedHex === tok.hex;
                        return (
                          <button
                            key={tok.name}
                            type="button"
                            onClick={(e) => handleCopyHex(e, tok.hex, tok.name)}
                            className="relative group/swatch w-7 h-7 rounded-full border border-black/10 dark:border-white/10 shadow-2xs hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                            style={{ backgroundColor: tok.hex }}
                            title={`${tok.name}: ${tok.hex}`}
                          >
                            {isThisCopied && (
                              <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                            )}
                          </button>
                        );
                      })}
                      {(company.colorTokens || []).length > 5 && (
                        <span className="text-[10px] font-mono text-[#5F6368] dark:text-[#9AA0A6] pl-1">
                          +{(company.colorTokens || []).length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Font metadata & Token stats */}
                  <div className="pt-3 border-t border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                    <span className="truncate max-w-[160px]" title={company.typography.fontFamily}>
                      {company.typography.fontFamily.split(',')[0].replace(/['"]/g, '')}
                    </span>
                    <span>{company.metrics.tokenCount} {t.detail.tokensUnit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-5 pb-5 pt-0 flex items-center space-x-2">
                <Link
                  to={`/system/${company.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 px-3 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:bg-black/85 dark:hover:bg-white/90 transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.landing.viewDesignMd}</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => handleCopyTokens(e, company)}
                  className="py-2 px-3 rounded-full text-xs font-medium bg-[#FAF9F6] dark:bg-[#1E2128] border border-[#E8EAED] dark:border-[#26282E] text-[#121317] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#26282E] transition-all flex items-center space-x-1"
                  title={t.detail.copyYaml}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">YAML</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
