import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
  Copy,
  ExternalLink,
  Code2,
  ChevronRight,
  Globe,
  Compass
} from 'lucide-react';
import { Company } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { FragmentedLogo } from './FragmentedLogo';
import { ParticleLogoCanvas } from './ParticleLogoCanvas';

interface LandingPageProps {
  featuredCompanies: Company[];
  onShowToast: (message: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  featuredCompanies,
  onShowToast
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inputUrl, setInputUrl] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleExtractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = inputUrl.trim() || 'https://antigravity.google';
    let normalized = target;
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    navigate(`/extract?url=${encodeURIComponent(normalized)}`);
  };

  const handleQuickUrl = (url: string) => {
    navigate(`/extract?url=${encodeURIComponent(url)}`);
  };

  const copySampleYaml = () => {
    const snippet = `---
name: OpenDesignMD (Google Antigravity Theme)
version: alpha
colors:
  primary: "#121317"
  secondary: "#5F6368"
  tertiary: "#1A73E8"
  neutral: "#FAF9F6"
  surface: "#FFFFFF"
typography:
  fontFamily: "Google Sans, Inter, sans-serif"
  h1:
    fontSize: 3.5rem
    letterSpacing: "-0.035em"
---`;
    navigator.clipboard.writeText(snippet);
    setCopiedNotification(true);
    onShowToast('Copied Antigravity YAML tokens');
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const antigravityCompany = featuredCompanies.find((c) => c.id === 'google-antigravity') || featuredCompanies[0];

  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Antigravity Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] gravity-glow pointer-events-none opacity-80" />

      {/* Hero Section with Interactive Antigravity Particle Shards */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Explanations & Quick Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">        
            {/* Colossal Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-sans font-medium text-[#121317] dark:text-white leading-[1.1] tracking-[-0.035em] mb-4">
              {t.landing.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#121317] via-[#1A73E8] to-[#121317] dark:from-white dark:via-[#4285F4] dark:to-white">
                {t.landing.heroTitle2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-[#5F6368] dark:text-[#9AA0A6] font-normal leading-relaxed max-w-xl mb-6">
              {t.landing.heroSubtitle}
            </p>

            {/* Interactive URL Input Bar */}
            <div className="w-full max-w-xl bg-white dark:bg-[#16181D] rounded-full p-1.5 sm:p-2 border border-[#E8EAED] dark:border-[#26282E] shadow-xl shadow-black/[0.03] mb-3">
              <form onSubmit={handleExtractSubmit} className="flex items-center space-x-2">
                <div className="flex-1 flex items-center pl-3 sm:pl-4 pr-1">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#5F6368] dark:text-[#9AA0A6] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder={t.landing.inputPlaceholder}
                    className="w-full bg-transparent text-xs sm:text-sm font-mono text-[#121317] dark:text-white placeholder-[#5F6368]/50 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] font-medium text-xs sm:text-sm hover:scale-[0.98] transition-transform flex items-center space-x-1.5 shadow-sm flex-shrink-0 cursor-pointer"
                >
                  <span>{t.landing.extractBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Quick Pre-fill URLs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5F6368] dark:text-[#9AA0A6] font-mono mb-6">
              <span className="mr-1">{t.extract.recentExtractions}</span>
              {[
                { label: 'Antigravity', url: 'https://antigravity.google' },
                { label: 'Linear', url: 'https://linear.app' },
                { label: 'Stripe', url: 'https://stripe.com' },
                { label: 'Vercel', url: 'https://vercel.com' }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleQuickUrl(item.url)}
                  className="px-2.5 py-0.5 rounded-full bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] hover:border-[#1A73E8] hover:text-[#121317] dark:hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to="/explore"
                className="px-5 py-2.5 rounded-full bg-[#121317] dark:bg-white text-white dark:text-[#121317] text-xs font-semibold hover:opacity-90 transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105 active:scale-95"
              >
                <span>{t.landing.exploreBtn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/extract"
                className="px-5 py-2.5 rounded-full bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] text-xs font-semibold text-[#121317] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center space-x-1.5 shadow-2xs hover:scale-105 active:scale-95"
              >
                <Compass className="w-3.5 h-3.5 text-[#1A73E8]" />
                <span>{t.navbar.extract}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Particle Fragment Canvas */}
          <div className="lg:col-span-5 relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
            <ParticleLogoCanvas className="w-full h-full" height="100%" showButton={true} scaleFactor={1.1} />
          </div>

        </div>
      </section>

      {/* Interactive Spec Showcase Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-6 sm:p-10 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Code Spec Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
                  <div className="w-3 h-3 rounded-full bg-[#FBBC05]" />
                  <div className="w-3 h-3 rounded-full bg-[#34A853]" />
                  <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] pl-2 font-medium">
                    {t.landing.snippetHeader}
                  </span>
                </div>
                <button
                  onClick={copySampleYaml}
                  className="flex items-center space-x-1 text-xs font-mono text-[#1A73E8] hover:underline cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedNotification ? t.landing.copiedSnippet : t.landing.copySnippet}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#121317] text-white/90 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner border border-white/5">
                <span className="text-white/40">---</span><br />
                <span className="text-[#4285F4]">name:</span> OpenDesignMD (Google Antigravity Theme)<br />
                <span className="text-[#4285F4]">version:</span> alpha<br />
                <span className="text-[#4285F4]">colors:</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">primary:</span> <span className="text-[#FBBC05]">"#121317"</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">secondary:</span> <span className="text-[#FBBC05]">"#5F6368"</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">tertiary:</span> <span className="text-[#FBBC05]">"#1A73E8"</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">neutral:</span> <span className="text-[#FBBC05]">"#FAF9F6"</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">surface:</span> <span className="text-[#FBBC05]">"#FFFFFF"</span><br />
                <span className="text-[#4285F4]">typography:</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">fontFamily:</span> "Google Sans, Inter, sans-serif"<br />
                &nbsp;&nbsp;<span className="text-[#34A853]">h1:</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#34A853]">fontSize:</span> 3.5rem<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#34A853]">letterSpacing:</span> "-0.035em"<br />
                <span className="text-[#4285F4]">rounded:</span><br />
                &nbsp;&nbsp;<span className="text-[#34A853]">full:</span> 9999px<br />
                <span className="text-white/40">---</span><br /><br />
                <span className="text-white/70 font-semibold">## Overview</span><br />
                <span className="text-white/50">Architectural calm and deliberate negative space...</span>
              </div>
            </div>

            {/* Right: Rendered Components Preview */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.landing.guaranteeBadge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-[#121317] dark:text-white tracking-tight">
                {t.landing.aiAgentsTitle}
              </h3>

              <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">
                {t.landing.aiAgentsDesc}
              </p>

              {/* Component Mock Preview */}
              <div className="p-6 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                    {t.landing.componentTest}
                  </span>
                  <span className="text-xs font-mono text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-full">
                    WCAG AA 15.8:1
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-5 py-2.5 rounded-full bg-[#121317] text-white text-xs font-medium hover:scale-[0.98] transition-transform shadow-xs">
                    {t.landing.primaryCta}
                  </button>
                  <button className="px-5 py-2.5 rounded-full bg-white dark:bg-[#1E2128] border border-[#E8EAED] dark:border-[#26282E] text-xs font-medium text-[#121317] dark:text-white">
                    {t.landing.secondaryPill}
                  </button>
                  <span className="px-3 py-1 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] text-xs font-mono font-medium">
                    #1A73E8
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/system/${antigravityCompany.id}`}
                  className="inline-flex items-center space-x-2 text-sm font-medium text-[#1A73E8] hover:underline"
                >
                  <span>{t.landing.inspectAntigravity}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies Showcase Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#1A73E8] mb-1">
              {t.landing.canonicalTag}
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-medium text-[#121317] dark:text-white tracking-tight">
              {t.landing.canonicalTitle}
            </h2>
            <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6] mt-1">
              {t.landing.canonicalSubtitle}
            </p>
          </div>

          <Link
            to="/explore"
            className="self-start md:self-auto px-5 py-2 rounded-full border border-[#E8EAED] dark:border-[#26282E] text-xs font-medium text-[#121317] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center space-x-2"
          >
            <span>{t.landing.viewAllSystems} ({featuredCompanies.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(featuredCompanies || []).slice(0, 4).map((company) => (
            <Link
              key={company.id}
              to={`/system/${company.id}`}
              className="group rounded-3xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] hover:border-[#1A73E8]/50 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Browser Window Frame Header with Real Site Screenshot */}
                <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-[#121317] border-b border-[#E8EAED]/50 dark:border-[#26282E]">
                  {/* Browser Chrome Bar */}
                  <div className="absolute top-0 left-0 right-0 z-20 h-6 px-3 bg-[#1A1C23]/90 dark:bg-[#0D0E12]/95 backdrop-blur-md flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#EA4335]/80" />
                      <span className="w-2 h-2 rounded-full bg-[#FBBC05]/80" />
                      <span className="w-2 h-2 rounded-full bg-[#34A853]/80" />
                    </div>
                    <span className="text-[9px] font-mono text-white/70 truncate max-w-[120px]">
                      {company.domain}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-white/10 text-white/90">
                      {company.category}
                    </span>
                  </div>

                  {/* Real Screenshot */}
                  {company.screenshotUrl ? (
                    <img
                      src={company.screenshotUrl}
                      alt={`${company.name} capture`}
                      className="object-cover object-top w-full h-full pt-6 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallbackEl = e.currentTarget.parentElement?.querySelector('.fallback-landing-grad');
                        if (fallbackEl) (fallbackEl as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback Gradient */}
                  <div
                    className={`fallback-landing-grad w-full h-full pt-6 p-4 flex flex-col justify-end relative overflow-hidden ${
                      company.screenshotUrl ? 'hidden' : 'flex'
                    }`}
                    style={{ background: company.heroGradient || '#121317' }}
                  >
                    <div className="z-10 text-white font-mono font-semibold text-base drop-shadow-sm">
                      {company.name}
                    </div>
                  </div>

                  {/* Brand Monogram */}
                  <div
                    className="absolute bottom-2 right-2 z-20 w-6 h-6 rounded-md shadow-md border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-[10px] font-bold font-mono"
                    style={{ background: company.accentColor }}
                  >
                    {company.name.charAt(0)}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] line-clamp-2 mb-4">
                    {company.tagline}
                  </p>

                  {/* Swatches */}
                  <div className="flex items-center space-x-1.5 mb-3">
                    {(company.colorTokens || []).slice(0, 4).map((tok) => (
                      <div
                        key={tok.name}
                        className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10"
                        style={{ backgroundColor: tok.hex }}
                        title={`${tok.name}: ${tok.hex}`}
                      />
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] truncate">
                    {(company.typography?.fontFamily || 'Inter').split(',')[0].replace(/['"]/g, '')}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <span className="w-full py-2 rounded-full text-xs font-medium bg-[#FAF9F6] dark:bg-[#1E2128] text-[#121317] dark:text-white border border-[#E8EAED] dark:border-[#26282E] group-hover:bg-[#121317] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#121317] transition-all flex items-center justify-center space-x-1">
                  <span>{t.landing.viewDesignMd}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Pillars Grid */}
      <section id="features-section" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-28 border-t border-[#E8EAED] dark:border-[#26282E] pt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-[#121317] dark:text-white mb-3">
            {t.landing.pillarsTitle}
          </h2>
          <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">
            {t.landing.pillarsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1A73E8]/10 text-[#1A73E8] flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-[#121317] dark:text-white">
              {t.landing.pillar1Title}
            </h3>
            <p className="text-xs leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
              {t.landing.pillar1Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-[#121317] dark:text-white">
              {t.landing.pillar2Title}
            </h3>
            <p className="text-xs leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
              {t.landing.pillar2Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FBBC05]/10 text-[#FBBC05] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#121317] dark:text-[#FBBC05]" />
            </div>
            <h3 className="text-lg font-medium text-[#121317] dark:text-white">
              {t.landing.pillar3Title}
            </h3>
            <p className="text-xs leading-relaxed text-[#5F6368] dark:text-[#9AA0A6]">
              {t.landing.pillar3Desc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
