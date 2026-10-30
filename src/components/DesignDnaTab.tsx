import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Maximize2,
  Terminal,
  Settings,
  Shield,
  Copy,
  Download,
  Check,
  Code2,
  ChevronDown,
  ChevronUp,
  Server,
  Zap,
  Globe,
  HelpCircle,
  Palette
} from 'lucide-react';
import { Company, DesignDna, AIProviderType, AIProviderConfig, AdaptDesignResponse } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface DesignDnaTabProps {
  company: Company;
  onShowToast: (message: string) => void;
}

export const DesignDnaTab: React.FC<DesignDnaTabProps> = ({ company, onShowToast }) => {
  const { language } = useTranslation();
  const dna: DesignDna = company.dna || {
    archetype: 'Modern Engineered Minimalist',
    visualAtmosphere:
      'Immersive digital environment balancing high typographic contrast, structural 1px borders, subtle focal highlights, and strict mathematical spatial rhythm.',
    spatialRhythm: {
      density: 'balanced',
      whitespaceStrategy: 'Disciplined 8px/16px baseline grid ensuring clear visual hierarchy without sparse emptiness.',
      containerMaxWidth: '1280px',
    },
    sectionBlueprints: [
      {
        name: 'Hero Section',
        layoutType: 'Centered High-Impact Typography with Floating Interactive Viewport',
        density: 'balanced',
        keyVisualElements: ['1px border glass container', 'Subtle status tag badge', 'Dual action buttons'],
        typographyHierarchy: 'H1 Display with tight letter-spacing leading to 2-sentence value proposition',
        designRule: 'Showcase the real application interface running inside the hero viewport.',
      },
      {
        name: 'Feature Showcase',
        layoutType: 'Asymmetric Bento Grid',
        density: 'balanced',
        keyVisualElements: ['Multi-column modular tiles', 'Hover state elevation', 'Embedded preview controls'],
        typographyHierarchy: 'H3 tile title with monospace tag and muted description',
        designRule: 'Each tile must demonstrate an explicit workflow capability.',
      },
      {
        name: 'Social Proof',
        layoutType: 'Monochromatic Logo Ribbon & Metrics',
        density: 'compact',
        keyVisualElements: ['Normalized grayscale logos', 'Scale statistics counters'],
        typographyHierarchy: 'Single muted labelCaps lead text',
        designRule: 'Normalize all partner logos to equal optical balance.',
      },
      {
        name: 'CTA & Closing',
        layoutType: 'High-Contrast Radial Spotlight Surface',
        density: 'balanced',
        keyVisualElements: ['Single high-contrast primary button', 'Inner border highlight'],
        typographyHierarchy: 'H2 action prompt followed by instant onboarding trigger',
        designRule: 'Zero distraction; single focal conversion button.',
      },
    ],
    invariants: {
      always: [
        'Always use 1px border with subtle opacity (8-12%) for structural containers.',
        'Always maintain WCAG AA contrast ratio >= 4.5:1 for body and heading typography.',
        'Always provide instant visual feedback on interactive hover states.',
      ],
      never: [
        'Never use diffuse blurry drop shadows larger than 20px.',
        'Never mix discordant border radiuses on adjacent containers.',
        'Never use low-contrast gray text on dark backgrounds.',
      ],
    },
    adaptationGuidance:
      'When adapting to other client domains, apply this layout rhythm and 1px border discipline while recalibrating brand accent colors and industry terminology.',
  };

  // State for AI Context Transfer
  const [clientContext, setClientContext] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<AIProviderType>('heuristic');
  const [apiKey, setApiKey] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('http://localhost:11434/v1');
  const [modelName, setModelName] = useState<string>('llama3.2-vision');
  const [showConfigDetails, setShowConfigDetails] = useState<boolean>(false);
  const [isAdapting, setIsAdapting] = useState<boolean>(false);
  const [adaptationResult, setAdaptationResult] = useState<AdaptDesignResponse | null>(null);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedProvider = localStorage.getItem('opendesignmd_ai_provider') as AIProviderType | null;
    if (savedProvider) setSelectedProvider(savedProvider);

    const savedKey = localStorage.getItem(`opendesignmd_ai_key_${savedProvider || 'gemini'}`);
    if (savedKey) setApiKey(savedKey);

    const savedUrl = localStorage.getItem('opendesignmd_ai_baseurl');
    if (savedUrl) setBaseUrl(savedUrl);

    const savedModel = localStorage.getItem('opendesignmd_ai_model');
    if (savedModel) setModelName(savedModel);
  }, []);

  const handleProviderChange = (provider: AIProviderType) => {
    setSelectedProvider(provider);
    localStorage.setItem('opendesignmd_ai_provider', provider);

    const savedKey = localStorage.getItem(`opendesignmd_ai_key_${provider}`) || '';
    setApiKey(savedKey);

    if (provider === 'local') {
      setBaseUrl(localStorage.getItem('opendesignmd_ai_baseurl') || 'http://localhost:11434/v1');
      setModelName(localStorage.getItem('opendesignmd_ai_model') || 'llama3.2-vision');
    } else if (provider === 'gemini') {
      setModelName('gemini-2.0-flash');
    } else if (provider === 'openai') {
      setBaseUrl('https://api.openai.com/v1');
      setModelName('gpt-4o');
    } else if (provider === 'claude') {
      setModelName('claude-3-5-sonnet-20241022');
    }
  };

  const handleRunAdaptation = async () => {
    if (!clientContext.trim()) {
      onShowToast(language === 'pt' ? 'Por favor, descreva o projeto do cliente.' : 'Please describe the client project.');
      return;
    }

    // Save inputs
    if (apiKey) localStorage.setItem(`opendesignmd_ai_key_${selectedProvider}`, apiKey);
    if (baseUrl) localStorage.setItem('opendesignmd_ai_baseurl', baseUrl);
    if (modelName) localStorage.setItem('opendesignmd_ai_model', modelName);

    setIsAdapting(true);
    setAdaptationResult(null);

    try {
      const providerConfig: AIProviderConfig = {
        provider: selectedProvider,
        apiKey: apiKey.trim() || undefined,
        baseUrl: selectedProvider === 'local' || selectedProvider === 'openai' ? baseUrl.trim() : undefined,
        model: modelName.trim() || undefined,
      };

      const resp = await fetch('/api/ai/adapt-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: company.id,
          brandName: company.name,
          designDna: dna,
          designTokens: {
            colors: company.colors || {},
            typography: company.typography || {},
          },
          clientProjectContext: clientContext.trim(),
          clientName: clientName.trim() || undefined,
          providerConfig,
        }),
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(errJson.error || `Erro HTTP ${resp.status}`);
      }

      const result: AdaptDesignResponse = await resp.json();
      setAdaptationResult(result);
      onShowToast(
        language === 'pt'
          ? `DESIGN.MD adaptado com sucesso para ${clientName || 'o cliente'}!`
          : `DESIGN.MD successfully synthesized for ${clientName || 'the client'}!`
      );
    } catch (err: any) {
      console.error('Adaptation failed:', err);
      onShowToast(`Erro: ${err?.message || 'Falha ao adaptar com IA.'}`);
    } finally {
      setIsAdapting(false);
    }
  };

  const handleCopyAdaptedMd = () => {
    if (!adaptationResult) return;
    navigator.clipboard.writeText(adaptationResult.adaptedDesignMd);
    setCopiedAction('adapted-md');
    onShowToast(language === 'pt' ? 'DESIGN.MD adaptado copiado!' : 'Adapted DESIGN.MD copied!');
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const handleDownloadAdaptedMd = () => {
    if (!adaptationResult) return;
    const blob = new Blob([adaptationResult.adaptedDesignMd], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const slug = (clientName || 'client-project').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    link.href = url;
    link.setAttribute('download', `${slug}-DESIGN.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`Downloaded ${slug}-DESIGN.md`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Archetype & Visual Philosophy Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#1A73E8]/10 via-[#8AB4F8]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1A73E8]/10 text-[#1A73E8] dark:text-[#4285F4] border border-[#1A73E8]/20 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{language === 'pt' ? 'Arquétipo Visual' : 'Visual Archetype'}</span>
              </span>
              <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
                {company.name} Design DNA
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 uppercase tracking-wider text-[#121317] dark:text-white font-semibold">
                {dna.spatialRhythm.density} density
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#121317] dark:text-white tracking-tight">
            {dna.archetype}
          </h2>

          <p className="text-sm sm:text-base text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed max-w-4xl">
            {dna.visualAtmosphere}
          </p>

          {/* Spatial Rhythm Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8EAED] dark:border-[#26282E]">
            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#1A1C23] border border-[#E8EAED] dark:border-[#26282E]">
              <div className="text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider mb-1">
                {language === 'pt' ? 'Densidade Espacial' : 'Spatial Density'}
              </div>
              <div className="text-sm font-semibold text-[#121317] dark:text-white capitalize">
                {dna.spatialRhythm.density}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#1A1C23] border border-[#E8EAED] dark:border-[#26282E]">
              <div className="text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider mb-1">
                {language === 'pt' ? 'Largura do Container' : 'Max Container Width'}
              </div>
              <div className="text-sm font-semibold text-[#121317] dark:text-white font-mono">
                {dna.spatialRhythm.containerMaxWidth}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#1A1C23] border border-[#E8EAED] dark:border-[#26282E]">
              <div className="text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider mb-1">
                {language === 'pt' ? 'Estratégia de Respiro' : 'Whitespace Strategy'}
              </div>
              <div className="text-xs text-[#121317] dark:text-white line-clamp-2 leading-relaxed">
                {dna.spatialRhythm.whitespaceStrategy}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Section Blueprints (Anatomia das Seções) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#121317] dark:text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#1A73E8]" />
              <span>{language === 'pt' ? 'Arquitetura e Blueprints de Seções' : 'Section Blueprints & Architecture'}</span>
            </h3>
            <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-0.5">
              {language === 'pt'
                ? 'Como os designers desta empresa compõem o ritmo visual e a hierarquia funcional de cada bloco da página.'
                : 'How designers of this brand compose the visual rhythm and functional hierarchy of each block.'}
            </p>
          </div>
          <span className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
            {dna.sectionBlueprints.length} {language === 'pt' ? 'seções mapeadas' : 'sections mapped'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dna.sectionBlueprints.map((section, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] shadow-2xs hover:border-[#1A73E8]/40 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#1A73E8] dark:text-[#4285F4]">
                    #{idx + 1} {section.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 uppercase text-[#5F6368] dark:text-[#9AA0A6]">
                    {section.density}
                  </span>
                </div>

                <h4 className="text-sm font-medium text-[#121317] dark:text-white">
                  {section.layoutType}
                </h4>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {section.keyVisualElements.map((elem, eIdx) => (
                    <span
                      key={eIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF9F6] dark:bg-[#1E2128] text-[#5F6368] dark:text-[#9AA0A6] border border-[#E8EAED] dark:border-[#26282E]"
                    >
                      {elem}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EAED] dark:border-[#26282E] text-xs">
                <div className="text-[10px] font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider mb-1">
                  {language === 'pt' ? 'Regra de Design dos Criadores:' : "Designers' Concrete Invariant:"}
                </div>
                <div className="text-xs italic text-[#121317] dark:text-[#E2E8F0] leading-relaxed bg-[#FAF9F6] dark:bg-[#121317] p-2.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E]">
                  "{section.designRule}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Invariantes dos Designers (Dos & Don'ts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positives (Always) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16181D] border border-[#34A853]/20 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 text-[#34A853]">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <h4 className="text-sm font-medium text-[#121317] dark:text-white uppercase tracking-wider text-xs font-mono">
              {language === 'pt' ? 'O que os Designers SEMPRE fazem' : "What Designers ALWAYS Do"}
            </h4>
          </div>

          <ul className="space-y-2.5">
            {dna.invariants.always.map((rule, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] mt-1.5 flex-shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negatives (Never / Anti-patterns) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16181D] border border-[#EA4335]/20 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 text-[#EA4335]">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <h4 className="text-sm font-medium text-[#121317] dark:text-white uppercase tracking-wider text-xs font-mono">
              {language === 'pt' ? 'O que os Designers NUNCA fariam (Anti-Padrões)' : "What Designers NEVER Do"}
            </h4>
          </div>

          <ul className="space-y-2.5">
            {dna.invariants.never.map((rule, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] mt-1.5 flex-shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Validation Spotlight for AbacatePay / General Test */}
      <div className="p-6 rounded-3xl bg-[#1F4647] text-white border-2 border-[#9EEA6C] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9EEA6C] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9EEA6C]">
              Caso de Teste em Produção: NutriFlui
            </span>
          </div>
          <h4 className="text-base font-bold text-white">
            Landing Page Completa gerada a partir do Design DNA de AbacatePay!
          </h4>
          <p className="text-xs text-white/80 max-w-xl leading-relaxed">
            Testamos o transplante da estética botanical neo-organic e pílulas arredondadas de AbacatePay para uma plataforma de nutrição clínica (NutriFlui).
          </p>
        </div>
        <Link
          to="/preview/nutriflui"
          className="px-6 py-2.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-xs hover:scale-105 active:scale-95 transition-transform shadow-md flex items-center space-x-2 whitespace-nowrap flex-shrink-0"
        >
          <span>Ver Landing Page NutriFlui</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4. Interactive AI Context Adaptation Engine */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white via-white to-[#FAF9F6] dark:from-[#16181D] dark:via-[#16181D] dark:to-[#121317] border-2 border-[#1A73E8]/30 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A73E8]/10 text-[#1A73E8] dark:text-[#4285F4] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#121317] dark:text-white">
                {language === 'pt'
                  ? `Transplante de Estilo: Adaptar ${company.name} para seu Cliente`
                  : `Aesthetic Transfer: Adapt ${company.name} to Client Project`}
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                {language === 'pt'
                  ? `A IA aplica a arte, os blueprints de seções e as regras invioláveis de ${company.name} ao domínio de negócio do seu cliente.`
                  : `AI maps the art, section blueprints, and design invariants of ${company.name} to your client's business.`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowConfigDetails(!showConfigDetails)}
            className="self-start sm:self-auto text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#E8EAED] dark:border-[#26282E]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{language === 'pt' ? 'Configurar Provedor de IA' : 'AI Provider Settings'}</span>
            {showConfigDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* AI Provider Selector Pill Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider block">
            {language === 'pt' ? 'Escolha o Motor de Inteligência Artificial:' : 'Select AI Intelligence Engine:'}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'heuristic', name: 'Heurístico', sub: 'Zero-config • Offline', badge: 'Recomendado' },
              { id: 'local', name: 'IA Local (Ollama)', sub: 'llama3.2-vision', badge: '100% Privado' },
              { id: 'gemini', name: 'Google Gemini', sub: 'Gemini 2.0 Flash', badge: 'Multimodal' },
              { id: 'openai', name: 'OpenAI', sub: 'GPT-4o Vision', badge: 'Cloud' },
              { id: 'claude', name: 'Claude', sub: '3.5 Sonnet', badge: 'Arquitetura' },
            ].map((prov) => {
              const isSelected = selectedProvider === prov.id;
              return (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => handleProviderChange(prov.id as AIProviderType)}
                  className={`p-3 rounded-2xl text-left border transition-all relative ${
                    isSelected
                      ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] border-transparent shadow-sm'
                      : 'bg-white dark:bg-[#1A1C23] border-[#E8EAED] dark:border-[#26282E] text-[#121317] dark:text-white hover:border-[#1A73E8]/50'
                  }`}
                >
                  <div className="text-xs font-semibold">{prov.name}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'opacity-80' : 'text-[#5F6368] dark:text-[#9AA0A6]'}`}>
                    {prov.sub}
                  </div>
                  {prov.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded mt-1.5 inline-block ${
                      isSelected ? 'bg-white/20 text-white dark:bg-black/20 dark:text-[#121317]' : 'bg-black/5 dark:bg-white/10 text-[#5F6368] dark:text-[#9AA0A6]'
                    }`}>
                      {prov.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Provider Settings Drawer (if expanded) */}
        {showConfigDetails && (
          <div className="p-4 rounded-2xl bg-[#FAF9F6] dark:bg-[#121317] border border-[#E8EAED] dark:border-[#26282E] space-y-3 text-xs">
            <div className="font-mono text-xs font-semibold text-[#121317] dark:text-white flex items-center space-x-1.5">
              <Server className="w-3.5 h-3.5 text-[#1A73E8]" />
              <span>
                {language === 'pt' ? 'Parâmetros de Conexão do Provedor' : 'Provider Connection Parameters'}
              </span>
            </div>

            {selectedProvider === 'local' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] mb-1">
                    Endpoint OpenAI-Compatible (Ollama / LM Studio):
                  </label>
                  <input
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="http://localhost:11434/v1"
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] bg-white dark:bg-[#16181D] text-[#121317] dark:text-white font-mono text-xs"
                  />
                  <span className="text-[10px] text-[#5F6368] dark:text-[#9AA0A6] mt-0.5 block">
                    Execute no terminal: <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">ollama run llama3.2-vision</code>
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] mb-1">
                    Nome do Modelo:
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="llama3.2-vision"
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] bg-white dark:bg-[#16181D] text-[#121317] dark:text-white font-mono text-xs"
                  />
                </div>
              </div>
            )}

            {(selectedProvider === 'gemini' || selectedProvider === 'openai' || selectedProvider === 'claude') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] mb-1">
                    {selectedProvider.toUpperCase()} API Key:
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Insira sua chave ${selectedProvider.toUpperCase()}...`}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] bg-white dark:bg-[#16181D] text-[#121317] dark:text-white font-mono text-xs"
                  />
                  <span className="text-[10px] text-[#5F6368] dark:text-[#9AA0A6] mt-0.5 block">
                    Salva apenas no navegador local ({selectedProvider}).
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6] mb-1">
                    Modelo Customizado:
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder={
                      selectedProvider === 'gemini'
                        ? 'gemini-2.0-flash'
                        : selectedProvider === 'openai'
                        ? 'gpt-4o'
                        : 'claude-3-5-sonnet-20241022'
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] bg-white dark:bg-[#16181D] text-[#121317] dark:text-white font-mono text-xs"
                  />
                </div>
              </div>
            )}

            {selectedProvider === 'heuristic' && (
              <div className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                O motor heurístico analisa as regras matemáticas de contraste, tipografia e os invariantes pré-calibrados sem consumir tokens externos ou requisições na nuvem.
              </div>
            )}
          </div>
        )}

        {/* Input Form for Client Context */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] mb-1">
                {language === 'pt' ? 'Nome do Cliente / Projeto:' : 'Client Project Name:'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={language === 'pt' ? 'ex: Hospital Vitalis ou FluxoPay' : 'e.g. Vitalis Health or FluxoPay'}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E8EAED] dark:border-[#26282E] bg-white dark:bg-[#16181D] text-[#121317] dark:text-white text-xs font-medium focus:outline-none focus:border-[#1A73E8]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] mb-1">
                {language === 'pt' ? 'Descreva o Negócio & Fluxos do Cliente:' : "Describe Client's Business & Workflows:"}
              </label>
              <textarea
                rows={2}
                value={clientContext}
                onChange={(e) => setClientContext(e.target.value)}
                placeholder={
                  language === 'pt'
                    ? 'ex: Plataforma de monitoramento cardiológico em tempo real para UTIs hospitalares com visualização de ECG e alertas de arritmia'
                    : 'e.g. Real-time cardiology monitoring ICU platform with live ECG visualization and arrhythmia alert dispatch'
                }
                className="w-full px-3.5 py-2 rounded-2xl border border-[#E8EAED] dark:border-[#26282E] bg-white dark:bg-[#16181D] text-[#121317] dark:text-white text-xs leading-relaxed focus:outline-none focus:border-[#1A73E8]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-[#5F6368] dark:text-[#9AA0A6] flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-[#34A853]" />
              <span>
                {language === 'pt'
                  ? 'Gera especificação normativa compatível com Cursor, Windsurf e Google Labs.'
                  : 'Synthesizes normative spec compatible with Cursor, Windsurf & Google Labs.'}
              </span>
            </div>

            <button
              onClick={handleRunAdaptation}
              disabled={isAdapting || !clientContext.trim()}
              className="px-6 py-2.5 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform text-xs font-medium flex items-center space-x-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdapting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'pt' ? 'Sintetizando com IA...' : 'Synthesizing with AI...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
                  <span>
                    {language === 'pt'
                      ? `Adaptar Estilo de ${company.name} para este Projeto`
                      : `Transfer ${company.name} Style to Project`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5. Rendered Adapted Result */}
        {adaptationResult && (
          <div className="mt-6 pt-6 border-t-2 border-[#1A73E8]/20 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#34A853]/10 border border-[#34A853]/20">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#121317] dark:text-white">
                    {language === 'pt'
                      ? `DESIGN.MD Adaptado com Sucesso para ${clientName || 'o Cliente'}!`
                      : `DESIGN.MD Successfully Tailored for ${clientName || 'the Client'}!`}
                  </div>
                  <div className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-0.5">
                    {adaptationResult.rationale}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <button
                  onClick={handleCopyAdaptedMd}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] text-[#121317] dark:text-white hover:bg-[#F1F3F4] transition-colors flex items-center space-x-1.5"
                >
                  {copiedAction === 'adapted-md' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34A853]" />
                      <span>{language === 'pt' ? 'Copiado!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'pt' ? 'Copiar DESIGN.MD' : 'Copy DESIGN.MD'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadAdaptedMd}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? 'Baixar .MD' : 'Download .MD'}</span>
                </button>
              </div>
            </div>

            {/* Suggested Semantic Color Swatches */}
            {adaptationResult.suggestedTokens && (
              <div className="p-4 rounded-2xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] space-y-2">
                <div className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#1A73E8]" />
                  <span>
                    {language === 'pt'
                      ? 'Paleta Semântica Recalibrada para o Nicho do Cliente'
                      : 'Semantic Palette Recalibrated for Client Niche'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                  {Object.entries(adaptationResult.suggestedTokens).map(([role, hex]) => (
                    <div
                      key={role}
                      className="p-2.5 rounded-xl border border-[#E8EAED] dark:border-[#26282E] bg-[#FAF9F6] dark:bg-[#1A1C23] flex items-center space-x-2.5"
                    >
                      <span
                        className="w-6 h-6 rounded-lg shadow-2xs border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: hex }}
                      />
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase">
                          {role}
                        </div>
                        <div className="text-xs font-mono font-semibold text-[#121317] dark:text-white truncate">
                          {hex}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Adapted Section Blueprints */}
            {adaptationResult.adaptedSections && adaptationResult.adaptedSections.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">
                  {language === 'pt'
                    ? 'Reinterpretação das Seções para o Negócio do Cliente:'
                    : 'Reinterpreted Sections for Client Domain:'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {adaptationResult.adaptedSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] text-xs space-y-1.5"
                    >
                      <div className="font-semibold text-[#121317] dark:text-white flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
                        <span>{sec.name}</span>
                      </div>
                      <p className="text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">{sec.description}</p>
                      <div className="text-[11px] font-mono text-[#1A73E8] dark:text-[#4285F4] pt-1">
                        Regra: {sec.dnaRuleApplied}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw Adapted DESIGN.MD Preview */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">
                {language === 'pt' ? 'Prévia do DESIGN.MD Gerado:' : 'Generated DESIGN.MD Preview:'}
              </div>

              <pre className="p-4 rounded-2xl bg-[#121317] text-[#E2E8F0] font-mono text-xs overflow-x-auto max-h-96 leading-relaxed border border-[#26282E]">
                {adaptationResult.adaptedDesignMd}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
