import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Download,
  FileCode,
  Palette,
  FileText,
  Check,
  ExternalLink,
  ShieldCheck,
  Code2,
  Sparkles,
  Layers,
  ChevronRight,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { Company } from '../types';
import { mockCompanies } from '../data/mockCompanies';
import { useTranslation } from '../i18n/LanguageContext';

interface DesignSystemDetailPageProps {
  companies: Company[];
  onShowToast: (message: string) => void;
}

export const DesignSystemDetailPage: React.FC<DesignSystemDetailPageProps> = ({
  companies,
  onShowToast
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const [activeTab, setActiveTab] = useState<'spec' | 'yaml' | 'palette' | 'tailwind' | 'raw'>('spec');
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find company in props or mockCompanies
    const found = companies.find((c) => c.id.toLowerCase() === id?.toLowerCase()) ||
                  mockCompanies.find((c) => c.id.toLowerCase() === id?.toLowerCase());
    
    if (found) {
      setCompany(found);
      setLoading(false);
    } else {
      // Try to fetch from backend
      fetch(`/api/companies/${id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.company) {
            setCompany(data.company);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, companies]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#121317] dark:border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-[#5F6368] dark:text-[#9AA0A6]">
            {language === 'pt' ? 'Carregando especificação do Design System...' : 'Loading Design System spec...'}
          </span>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-3xl bg-[#F1F3F4] dark:bg-[#1E2128] flex items-center justify-center text-2xl mb-4">
          🔍
        </div>
        <h2 className="text-2xl font-sans font-medium text-[#121317] dark:text-white mb-2">
          {language === 'pt' ? 'Sistema de Design Não Encontrado' : 'Design System Not Found'}
        </h2>
        <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6] max-w-md mb-6">
          {language === 'pt'
            ? <>O sistema solicitado <code className="font-mono text-xs font-semibold px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">{id}</code> não pôde ser localizado no catálogo.</>
            : <>The requested system <code className="font-mono text-xs font-semibold px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">{id}</code> could not be located in the catalog.</>}
        </p>
        <Link
          to="/explore"
          className="px-6 py-2.5 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] text-sm font-medium hover:scale-[0.98] transition-transform flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar para Explorar Sistemas' : 'Back to Explore Systems'}</span>
        </Link>
      </div>
    );
  }

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(company.designMdContent);
    setCopiedAction('markdown');
    onShowToast(`${company.name} - ${t.detail.markdownCopied}`);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(company.rawYaml);
    setCopiedAction('yaml');
    onShowToast(`${company.name} - ${t.detail.yamlCopied}`);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const generateTailwindV4Export = () => {
    return `@import "tailwindcss";

@theme {
${(company.colorTokens || [])
  .map(
    (tok) =>
      `  --color-${tok.role}${tok.name !== tok.role ? '-' + tok.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : ''}: ${tok.hex};`
  )
  .join('\n')}

  --font-sans: ${company.typography?.fontFamily || 'Inter, sans-serif'};
  ${company.typography?.monoFamily ? `--font-mono: ${company.typography.monoFamily};` : ''}

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
}`;
  };

  const handleDownloadMd = () => {
    const blob = new Blob([company.designMdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${company.id.toLowerCase()}-DESIGN.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`Downloaded ${company.id}-DESIGN.md`);
  };

  const handleCopyTailwind = () => {
    const code = generateTailwindV4Export();
    navigator.clipboard.writeText(code);
    setCopiedAction('tailwind');
    onShowToast(t.detail.themeCopied);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${company.name} DESIGN.MD`,
        text: `Check out the design system for ${company.name} on OpenDesignMD`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast(language === 'pt' ? 'Link copiado para a área de transferência!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0D0E12] text-[#121317] dark:text-[#F3F4F6] pb-24 transition-colors">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#E8EAED] dark:border-[#1E2128] bg-white/50 dark:bg-[#121317]/50 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
            <Link
              to="/explore"
              className="hover:text-[#121317] dark:hover:text-white flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.detail.breadcrumbExplore}</span>
            </Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-[#121317] dark:text-white font-medium truncate max-w-[150px] sm:max-w-none">
              {company.name}
            </span>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-[#1A73E8]">{t.detail.breadcrumbDesignMd}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full border border-[#E8EAED] dark:border-[#26282E] text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white transition-colors text-xs"
              title={t.detail.share}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDownloadMd}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform flex items-center space-x-1.5 shadow-xs"
            >
              <Download className="w-3 h-3" />
              <span>{t.detail.downloadMd}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Header Section */}
        <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 sm:p-10 shadow-sm mb-8 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-3xl pointer-events-none rounded-full"
            style={{ background: company.heroGradient }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center space-x-4 sm:space-x-6">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white font-mono text-2xl font-bold shadow-md flex-shrink-0"
                style={{ background: company.heroGradient }}
              >
                {company.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-sans font-medium text-[#121317] dark:text-white tracking-tight">
                    {company.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#1A73E8]/10 text-[#1A73E8] dark:text-[#4285F4] border border-[#1A73E8]/20">
                    {t.detail.specTag}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-mono text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-full border border-[#34A853]/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t.detail.verifiedTag}</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#5F6368] dark:text-[#9AA0A6] max-w-2xl mt-1">
                  {company.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] mt-3">
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#121317] dark:hover:text-white flex items-center space-x-1 underline"
                  >
                    <span>{company.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <span>{t.detail.categoryLabel}: <strong className="text-[#121317] dark:text-white">{company.category}</strong></span>
                  <span>•</span>
                  <span>{t.detail.lastUpdatedLabel}: {company.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Actions Quick Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={handleCopyMarkdown}
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-[#FAF9F6] dark:bg-[#1E2128] border border-[#E8EAED] dark:border-[#26282E] text-[#121317] dark:text-white hover:bg-[#F1F3F4] transition-colors flex items-center space-x-1.5"
              >
                {copiedAction === 'markdown' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    <span>{t.dashboard.copiedHex}!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.detail.copyDesignMd}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyYaml}
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-[#FAF9F6] dark:bg-[#1E2128] border border-[#E8EAED] dark:border-[#26282E] text-[#121317] dark:text-white hover:bg-[#F1F3F4] transition-colors flex items-center space-x-1.5"
              >
                {copiedAction === 'yaml' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    <span>{t.detail.yamlCopied}</span>
                  </>
                ) : (
                  <>
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{t.detail.copyYaml}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyTailwind}
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-[#FAF9F6] dark:bg-[#1E2128] border border-[#E8EAED] dark:border-[#26282E] text-[#121317] dark:text-white hover:bg-[#F1F3F4] transition-colors flex items-center space-x-1.5"
              >
                {copiedAction === 'tailwind' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    <span>{t.detail.themeCopied}</span>
                  </>
                ) : (
                  <>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t.detail.tailwindV4}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Left Content & Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Left Content Area (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation Pill Bar */}
            <div className="flex items-center space-x-1 p-1 rounded-full bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] shadow-2xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('spec')}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'spec'
                    ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.detail.tabs.spec}</span>
              </button>

              <button
                onClick={() => setActiveTab('yaml')}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'yaml'
                    ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{t.detail.tabs.yaml}</span>
              </button>

              <button
                onClick={() => setActiveTab('palette')}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'palette'
                    ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{t.detail.tabs.palette} ({(company.colorTokens || []).length})</span>
              </button>

              <button
                onClick={() => setActiveTab('tailwind')}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'tailwind'
                    ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{t.detail.tabs.tailwind}</span>
              </button>

              <button
                onClick={() => setActiveTab('raw')}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'raw'
                    ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.detail.tabs.raw}</span>
              </button>
            </div>

            {/* Tab 1: Rendered Spec */}
            {activeTab === 'spec' && (
              <div className="space-y-6">
                {/* Website Visual Capture Banner */}
                {company.screenshotUrl && (
                  <div className="rounded-3xl border border-[#E8EAED] dark:border-[#26282E] overflow-hidden bg-white dark:bg-[#16181D] shadow-sm">
                    <div className="px-4 py-2.5 bg-[#FAF9F6] dark:bg-[#121317] border-b border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]/80" />
                        <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] pl-2 font-medium">
                          {t.detail.productionSource}: {company.domain}
                        </span>
                      </div>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#1A73E8] hover:underline flex items-center space-x-1"
                      >
                        <span>{t.detail.openSite}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="relative max-h-72 sm:max-h-80 overflow-hidden bg-[#121317]">
                      <img
                        src={company.screenshotUrl}
                        alt={`${company.name} website capture`}
                        className="w-full object-cover object-top"
                      />
                    </div>
                  </div>
                )}

                {/* Notice Card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#16181D] border border-[#1A73E8]/30 flex items-start space-x-3 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-[#1A73E8] flex-shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
                    <strong className="text-[#121317] dark:text-white">{t.detail.specNoticeTitle}</strong>{' '}
                    {t.detail.specNoticeDesc} <code className="font-mono text-xs px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">npx @google/design.md lint DESIGN.md</code>.
                  </div>
                </div>

                {/* Styled Markdown Body */}
                <div className="bg-white dark:bg-[#16181D] p-6 sm:p-10 rounded-3xl border border-[#E8EAED] dark:border-[#26282E] shadow-sm space-y-8">
                  <div className="border-b border-[#E8EAED] dark:border-[#26282E] pb-6">
                    <h2 className="text-3xl font-medium tracking-tight text-[#121317] dark:text-white">
                      {company.name} Visual Design Contract
                    </h2>
                    <p className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] mt-1">
                      Target location: <code className="text-[#1A73E8] font-semibold">/DESIGN.MD</code> in project root
                    </p>
                  </div>

                  {/* Section 1: Overview */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-[#121317] dark:text-white border-b border-[#E8EAED] dark:border-[#26282E] pb-2">
                      ## Overview
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
                      {company.tagline} The aesthetic prioritizes typographic clarity, deliberate hierarchy, and mathematical contrast ratios.
                    </p>
                  </div>

                  {/* Section 2: Colors */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-[#121317] dark:text-white border-b border-[#E8EAED] dark:border-[#26282E] pb-2">
                      ## Colors
                    </h3>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">
                      The palette is rooted in semantic roles defined in the YAML front matter. Never hardcode arbitrary hex codes.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {(company.colorTokens || []).map((tok) => (
                        <div
                          key={tok.name}
                          className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E]"
                        >
                          <div
                            className="w-10 h-10 rounded-xl border border-black/10 flex-shrink-0 shadow-2xs"
                            style={{ backgroundColor: tok.hex }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-[#121317] dark:text-white flex items-center justify-between">
                              <span className="truncate">{tok.name}</span>
                              <span className="font-mono text-xs text-[#1A73E8] font-bold">{tok.hex}</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                              role: <code className="text-[#121317] dark:text-white font-medium">{tok.role}</code>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Typography */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-[#121317] dark:text-white border-b border-[#E8EAED] dark:border-[#26282E] pb-2">
                      ## Typography
                    </h3>
                    <div className="p-5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] space-y-2.5 font-mono text-xs">
                      <div><strong className="text-[#121317] dark:text-white">fontFamily:</strong> "{company.typography.fontFamily}"</div>
                      {company.typography.monoFamily && (
                        <div><strong className="text-[#121317] dark:text-white">monoFamily:</strong> "{company.typography.monoFamily}"</div>
                      )}
                      <div><strong className="text-[#121317] dark:text-white">h1:</strong> fontSize: {company.typography.h1.fontSize}, fontWeight: {company.typography.h1.fontWeight}, tracking: {company.typography.h1.letterSpacing || '-0.03em'}</div>
                      <div><strong className="text-[#121317] dark:text-white">h2:</strong> fontSize: {company.typography.h2.fontSize}, fontWeight: {company.typography.h2.fontWeight}</div>
                      <div><strong className="text-[#121317] dark:text-white">body-md:</strong> fontSize: {company.typography.bodyMd.fontSize}, lineHeight: {company.typography.bodyMd.lineHeight}</div>
                    </div>
                  </div>

                  {/* Section 4: Layout & Spacing */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-[#121317] dark:text-white border-b border-[#E8EAED] dark:border-[#26282E] pb-2">
                      ## Layout &amp; Spacing
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
                      Operates on a strict <strong>4px/8px modular grid</strong>. Standard block gap is 32px (<code>{'{spacing.xl}'}</code>). Container margins maintain breathing room with fluid negative space.
                    </p>
                  </div>

                  {/* Section 5: Components */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-[#121317] dark:text-white border-b border-[#E8EAED] dark:border-[#26282E] pb-2">
                      ## Components
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
                      All primary call-to-actions, chips, and search inputs enforce full pill geometry (<code>{'{rounded.full}'} = 9999px</code>). Cards utilize generous corner radii (<code>20px - 28px</code>) with subtle borders.
                    </p>
                  </div>

                  {/* Section 6: Do's and Don'ts */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-[#121317] dark:text-white border-b border-[#E8EAED] dark:border-[#26282E] pb-2">
                      ## Do's and Don'ts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-5 rounded-2xl bg-[#34A853]/5 border border-[#34A853]/20 text-xs">
                        <strong className="text-[#34A853] block text-sm mb-2">✓ Do's:</strong>
                        <ul className="list-disc pl-4 space-y-1.5 text-[#5F6368] dark:text-[#9AA0A6]">
                          <li>Respect negative tracking on large display headings.</li>
                          <li>Maintain semantic contrast (primary text contrast &gt; 15:1).</li>
                          <li>Always use tokens defined in YAML front matter.</li>
                          <li>Keep button pills with rounded-full geometry.</li>
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#EA4335]/5 border border-[#EA4335]/20 text-xs">
                        <strong className="text-[#EA4335] block text-sm mb-2">✗ Don'ts:</strong>
                        <ul className="list-disc pl-4 space-y-1.5 text-[#5F6368] dark:text-[#9AA0A6]">
                          <li>Do not introduce arbitrary HEX color codes in UI code.</li>
                          <li>Do not mix sharp 0px borders inside curved containers.</li>
                          <li>Avoid heavy dark drop shadows.</li>
                          <li>Do not alter typography hierarchy between sessions.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: YAML Tokens */}
            {activeTab === 'yaml' && (
              <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                    {language === 'pt' ? 'Tokens Front Matter Legíveis por Máquina' : 'Machine-Readable Front Matter Tokens'}
                  </span>
                  <button
                    onClick={handleCopyYaml}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform flex items-center space-x-1.5"
                  >
                    {copiedAction === 'yaml' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#34A853]" />
                        <span>{t.detail.yamlCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.detail.copyYaml}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 rounded-2xl bg-[#121317] text-white/90 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner border border-white/5">
                  {company.rawYaml}
                </pre>
              </div>
            )}

            {/* Tab 3: Color Palette Grid */}
            {activeTab === 'palette' && (
              <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-[#121317] dark:text-white">
                    {language === 'pt' ? 'Arquitetura de Cores & Validação de Contraste' : 'Color Architecture & Contrast Validation'}
                  </h3>
                  <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-0.5">
                    {language === 'pt'
                      ? 'Clusterizado via espaço perceptual Delta-E CIELAB. Verificado contra critérios WCAG 2.2 AA/AAA.'
                      : 'Clustered via Delta-E CIELAB perceptual space. Checked against WCAG 2.2 AA/AAA guidelines.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(company.colorTokens || []).map((tok) => (
                    <div
                      key={tok.name}
                      className="p-5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] flex items-center space-x-4 shadow-2xs"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm flex-shrink-0 flex items-center justify-center relative group"
                        style={{ backgroundColor: tok.hex }}
                      >
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(tok.hex);
                            onShowToast(`${t.dashboard.copiedHex} ${tok.hex}`);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-black/60 text-white text-[10px] font-mono"
                        >
                          {language === 'pt' ? 'Copiar' : 'Copy'}
                        </button>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-[#121317] dark:text-white truncate">
                            {tok.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-[#1A73E8]">
                            {tok.hex}
                          </span>
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#F1F3F4] dark:bg-[#1E2128] text-[#5F6368] dark:text-[#9AA0A6] mb-1.5">
                          role: {tok.role}
                        </span>
                        {tok.description && (
                          <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] leading-snug line-clamp-2">
                            {tok.description}
                          </p>
                        )}
                        {tok.contrastOnWhite && (
                          <div className="mt-1 text-[10px] font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                            {t.detail.contrastOnWhite}: <strong>{tok.contrastOnWhite}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Tailwind v4 Theme */}
            {activeTab === 'tailwind' && (
              <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                    {language === 'pt' ? 'Bloco @theme Tailwind CSS v4 (Pronto para index.css)' : 'Tailwind CSS v4 @theme Block (Ready for index.css)'}
                  </span>
                  <button
                    onClick={handleCopyTailwind}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform flex items-center space-x-1.5"
                  >
                    {copiedAction === 'tailwind' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#34A853]" />
                        <span>{t.detail.themeCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.detail.copyThemeBlock}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 rounded-2xl bg-[#121317] text-white/90 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner border border-white/5">
                  {generateTailwindV4Export()}
                </pre>
              </div>
            )}

            {/* Tab 5: Raw Markdown */}
            {activeTab === 'raw' && (
              <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                    {language === 'pt' ? 'Texto Bruto Completo DESIGN.MD' : 'Full DESIGN.MD Raw Text'}
                  </span>
                  <button
                    onClick={handleCopyMarkdown}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform flex items-center space-x-1.5"
                  >
                    {copiedAction === 'markdown' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#34A853]" />
                        <span>{t.dashboard.copiedHex}!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.detail.copyRawMarkdown}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 rounded-2xl bg-[#121317] text-white/90 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner border border-white/5">
                  {company.designMdContent}
                </pre>
              </div>
            )}
          </div>

          {/* Right Sidebar Info & Diagnostics (1 Col) */}
          <div className="space-y-6">
            {/* Live Website Capture Preview Card */}
            {company.screenshotUrl && (
              <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]/80" />
                    <span className="text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] pl-2 font-medium">
                      {t.detail.siteCaptureHeader}
                    </span>
                  </div>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#1A73E8] hover:underline flex items-center space-x-1"
                  >
                    <span>{t.detail.visitLive}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative group overflow-hidden bg-[#121317]">
                  <img
                    src={company.screenshotUrl}
                    alt={`${company.name} real website preview`}
                    className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                </div>

                <div className="px-4 py-2.5 bg-[#FAF9F6] dark:bg-[#121317] border-t border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                  <span>{t.detail.viewportLabel}</span>
                  <span className="text-[#34A853] flex items-center space-x-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.detail.realCaptureLabel}</span>
                  </span>
                </div>
              </div>
            )}

            {/* System Card Metrics */}
            <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#5F6368] dark:text-[#9AA0A6]">
                {t.detail.systemMetrics}
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
                  <span className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">{t.detail.wcagContrast}</span>
                  <span className="text-xs font-mono font-medium text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-full">
                    {company.metrics.contrastScore}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
                  <span className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">{t.detail.totalTokens}</span>
                  <span className="text-xs font-mono font-medium text-[#121317] dark:text-white">
                    {company.metrics.tokenCount} {t.detail.tokensUnit}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
                  <span className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">{t.detail.agentReadiness}</span>
                  <span className="text-xs font-mono font-medium text-[#1A73E8]">
                    {company.metrics.agentReadyScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Export Formats */}
            <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 shadow-sm space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#5F6368] dark:text-[#9AA0A6]">
                {t.detail.exportPipeline}
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                {t.detail.exportDesc}
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href={`/api/export/${company.id}/tailwind-v4`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] hover:border-[#1A73E8] text-xs font-mono flex items-center justify-between transition-colors bg-[#FAF9F6] dark:bg-[#121317]"
                >
                  <span>tailwind-v4.css</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A73E8]" />
                </a>

                <a
                  href={`/api/export/${company.id}/tailwind-v3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] hover:border-[#1A73E8] text-xs font-mono flex items-center justify-between transition-colors bg-[#FAF9F6] dark:bg-[#121317]"
                >
                  <span>tailwind.config.json</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A73E8]" />
                </a>

                <a
                  href={`/api/export/${company.id}/dtcg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] hover:border-[#1A73E8] text-xs font-mono flex items-center justify-between transition-colors bg-[#FAF9F6] dark:bg-[#121317]"
                >
                  <span>tokens.dtcg.json</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A73E8]" />
                </a>
              </div>
            </div>

            {/* AI Agent Prompt Snippet */}
            <div className="bg-[#121317] text-white p-6 rounded-3xl border border-white/5 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#1A73E8]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Dica de Prompt para Agente' : 'Agent Prompt Tip'}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {language === 'pt'
                  ? <>Adicione <code className="text-[#34A853]">DESIGN.MD</code> na raiz do projeto e oriente o Claude, Cursor ou Codex:</>
                  : <>Add <code className="text-[#34A853]">DESIGN.MD</code> to your project root and tell Claude, Cursor, or Codex:</>}
              </p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-white/90">
                {language === 'pt'
                  ? '"Siga o DESIGN.MD estritamente. Use tokens semânticos para todas as cores e rounded-full para controles interativos."'
                  : '"Follow DESIGN.MD strictly. Use semantic tokens for all colors and rounded-full for interactive controls."'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
