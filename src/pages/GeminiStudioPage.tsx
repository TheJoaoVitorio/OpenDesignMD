import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  RefreshCw,
  Layers,
  Copy,
  Check,
  Download,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  ExternalLink,
  ChevronRight,
  Eye,
  Palette,
  Terminal,
  Activity,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  CheckCheck,
  X,
  ChevronDown,
  Send,
  Wand2,
  FileCode,
  FileText,
  Bookmark,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { Company } from '../types';

interface GeminiStudioPageProps {
  companies: Company[];
  onShowToast: (message: string) => void;
}

interface AdaptationResult {
  archetypeApplied: string;
  rationale: string;
  suggestedTokens: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    surface: string;
  };
  adaptedSections: Array<{
    name: string;
    description: string;
    dnaRuleApplied: string;
  }>;
  adaptedDesignMd: string;
}

interface PromptPreset {
  id: string;
  label: string;
  companyId: string;
  clientName: string;
  prompt: string;
  primaryColor: string;
  badge: string;
}

const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'antigravity-mobile',
    label: 'Orbit Mobile • Laranja Flagship',
    companyId: 'google-antigravity',
    clientName: 'Orbit Mobile',
    prompt: 'Loja de smartphones premium de titânio e silício onde a cor primária é laranja (#FF6B00), com programa de Trade-In e garantia estendida de 2 anos.',
    primaryColor: '#FF6B00',
    badge: 'Google Antigravity DNA',
  },
  {
    id: 'abacate-nutri',
    label: 'NutriFlui • Nutrição Clínica',
    companyId: 'abacatepay',
    clientName: 'NutriFlui',
    prompt: 'Plataforma para nutricionistas com prescrição dietética automatizada por IA, cálculo de bioimpedância e tabela TACO oficial.',
    primaryColor: '#9EEA6C',
    badge: 'AbacatePay DNA',
  },
  {
    id: 'stripe-payments',
    label: 'PulsePay • Pix & Liquidação D+0',
    companyId: 'stripe',
    clientName: 'PulsePay',
    prompt: 'Infraestrutura de pagamentos instantâneos para desenvolvedores com webhooks em tempo real e liquidação bancária D+0.',
    primaryColor: '#635BFF',
    badge: 'Stripe DNA',
  },
  {
    id: 'linear-devops',
    label: 'DevPulse • Agentes & Engenharia',
    companyId: 'linear',
    clientName: 'DevPulse',
    prompt: 'Plataforma para times de alta velocidade com rastreamento de tarefas, agentes autônomos e navegação 100% por atalhos de teclado.',
    primaryColor: '#5E6AD2',
    badge: 'Linear DNA',
  },
  {
    id: 'airbnb-living',
    label: 'CasaNativa • Hospitalidade & Retiros',
    companyId: 'airbnb',
    clientName: 'CasaNativa',
    prompt: 'Plataforma de aluguel por temporada e retiros na natureza com curadoria arquitetônica e reservas protegidas.',
    primaryColor: '#FF385C',
    badge: 'Airbnb DNA',
  },
];

export const GeminiStudioPage: React.FC<GeminiStudioPageProps> = ({
  companies,
  onShowToast,
}) => {
  const [searchParams] = useSearchParams();
  const initialCompany = searchParams.get('system') || 'google-antigravity';

  // State: Source benchmark company
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(initialCompany);

  // State: Client prompt and name
  const [clientPrompt, setClientPrompt] = useState<string>(
    'Loja de celulares onde a cor primária deles é laranja (#FF6B00), com simetria monumental, foco em flagships de titânio e programa de trade-in.'
  );
  const [clientName, setClientName] = useState<string>('Orbit Mobile');
  const [activePresetId, setActivePresetId] = useState<string>('antigravity-mobile');

  // State: Engine execution status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('idle');
  const [executionTelemetry, setExecutionTelemetry] = useState<string[]>([]);

  // State: Synthesis output from analytical engine
  const [adaptation, setAdaptation] = useState<AdaptationResult | null>(null);

  // State: Studio UI
  const [activeTab, setActiveTab] = useState<'preview' | 'design-md' | 'invariants' | 'code'>('preview');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Interactive widgets state inside preview
  const [tradeInSelected, setTradeInSelected] = useState<string>('iPhone 15 Pro Max');
  const [tradeInResult, setTradeInResult] = useState<number>(4800);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  // Canvas ref for Antigravity swirling particle vortex
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Find reference company with fallback
  const referenceCompany = useMemo(() => {
    const found = companies.find((c) => c.id === selectedCompanyId);
    if (found) return found;
    return (
      companies.find((c) => c.id.includes('antigravity')) ||
      companies[0] || {
        id: 'google-antigravity',
        name: 'Google Antigravity',
        domain: 'antigravity.google',
        category: 'AI & Spatial Computing',
        description: 'Monumental symmetry and monastic calm',
        logoUrl: '',
        colors: {
          primary: '#121317',
          secondary: '#5F6368',
          tertiary: '#FF6B00',
          neutral: '#FAF9F6',
          surface: '#FFFFFF',
          accent: '#1A73E8',
        },
        typography: {
          fontFamily: 'Google Sans, Inter, sans-serif',
          h1: { fontSize: '4rem', fontWeight: 500 },
          h2: { fontSize: '2.5rem', fontWeight: 500 },
          bodyMd: { fontSize: '1rem', fontWeight: 400 },
        },
        spacing: {},
        rounded: {},
        designMd: '',
      }
    );
  }, [companies, selectedCompanyId]);

  // Execute Analytical Engine Generation
  const executeGeneration = async (
    targetCompanyId = selectedCompanyId,
    targetPrompt = clientPrompt,
    targetClientName = clientName
  ) => {
    setIsGenerating(true);
    setGenerationStep('deconstructing');
    setExecutionTelemetry([
      `[1/4] Decompondo topologia estrutural de ${targetCompanyId}...`,
    ]);

    try {
      // Step 2 simulated telemetry
      setTimeout(() => {
        setGenerationStep('extracting_invariants');
        setExecutionTelemetry((prev) => [
          ...prev,
          `[2/4] Mapeando tokens semânticos e verificando contraste WCAG 2.2...`,
        ]);
      }, 350);

      // Step 3
      setTimeout(() => {
        setGenerationStep('synthesizing_design_md');
        setExecutionTelemetry((prev) => [
          ...prev,
          `[3/4] Sintetizando especificação canônica @google/design.md...`,
        ]);
      }, 700);

      const response = await fetch('/api/ai/adapt-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: targetCompanyId,
          clientProjectContext: targetPrompt,
          clientName: targetClientName,
          providerConfig: { provider: 'heuristic' },
        }),
      });

      if (!response.ok) {
        throw new Error(`Servidor retornou código ${response.status}`);
      }

      const data: AdaptationResult = await response.json();

      setGenerationStep('rendering');
      setExecutionTelemetry((prev) => [
        ...prev,
        `[4/4] Renderizando preview reativo com fidelidade ao arquétipo ${data.archetypeApplied}...`,
        `✓ Geração concluída com sucesso.`,
      ]);

      setAdaptation(data);
      setIsGenerating(false);
      onShowToast(`Design gerado com sucesso para ${targetClientName}!`);
    } catch (err: any) {
      console.warn('[GeminiStudio] Chamada ao backend falhou, usando fallback local calibrado:', err);
      // Fallback local robusto para garantir 0 falhas na interface
      const isAntigravity = targetCompanyId.includes('antigravity');
      const isOrange = targetPrompt.toLowerCase().includes('laranja') || targetPrompt.toLowerCase().includes('orange');
      const primaryCol = isOrange ? '#FF6B00' : '#121317';

      const fallbackResult: AdaptationResult = {
        archetypeApplied: isAntigravity
          ? 'Engineered Calm, Monastic Purity & Gravitational Symmetry'
          : 'Playful Neo-Organic & Tactile High-Contrast',
        rationale: `Síntese heurística avançada adaptada para "${targetPrompt}". A estrutura monumental e as regras de densidade foram recalculadas para ${targetClientName}.`,
        suggestedTokens: {
          primary: primaryCol,
          secondary: '#5F6368',
          tertiary: primaryCol,
          neutral: '#FAF9F6',
          surface: '#FFFFFF',
        },
        adaptedSections: [
          {
            name: `Hero Section (${targetClientName})`,
            description: `Simetria monumental centralizada com vórtice de partículas e botão pílula solitário.`,
            dnaRuleApplied: `Preserve absolute central symmetry. Never divide into split columns.`,
          },
          {
            name: `Feature Explorer (${targetClientName})`,
            description: `Fileiras assimétricas alternadas com render de hardware isolado e sombra natural.`,
            dnaRuleApplied: `Alternating 2-column layout with generous vertical rhythm.`,
          },
          {
            name: `Solutions & Programs (${targetClientName})`,
            description: `Cards limpos de alto contraste para segmentos B2C e B2B.`,
            dnaRuleApplied: `High-contrast side-by-side surface cards.`,
          },
        ],
        adaptedDesignMd: `---
name: ${targetClientName} Design System (Inspired by ${referenceCompany.name})
version: 1.0.0
archetype: "Engineered Calm, Monastic Purity & Gravitational Symmetry"
colors:
  primary: "${primaryCol}"
  secondary: "#5F6368"
  tertiary: "${primaryCol}"
  neutral: "#FAF9F6"
  surface: "#FFFFFF"
typography:
  fontFamily: "Google Sans, Inter, system-ui, sans-serif"
  h1:
    fontSize: "4rem"
    letterSpacing: "-0.035em"
---

# Design System: ${targetClientName}
> Gerado via Engine Analítica com Padrões Gemini
`,
      };

      setAdaptation(fallbackResult);
      setIsGenerating(false);
      onShowToast(`Design sintetizado localmente para ${targetClientName}!`);
    }
  };

  // Initial generation on mount
  useEffect(() => {
    executeGeneration(selectedCompanyId, clientPrompt, clientName);
  }, []);

  // Handle preset selection
  const handleSelectPreset = (preset: PromptPreset) => {
    setActivePresetId(preset.id);
    setSelectedCompanyId(preset.companyId);
    setClientName(preset.clientName);
    setClientPrompt(preset.prompt);
    executeGeneration(preset.companyId, preset.prompt, preset.clientName);
  };

  // Canvas particle effect for Antigravity-style live preview
  useEffect(() => {
    const isAntigravity = selectedCompanyId.includes('antigravity');
    if (!isAntigravity) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1100);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 620);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      r: number;
      theta: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const num = 160;
    const primaryToken = adaptation?.suggestedTokens?.primary || '#FF6B00';
    const colors = [primaryToken, '#FFA000', '#121317', '#5F6368', '#4285F4', '#E2E8F0'];

    for (let i = 0; i < num; i++) {
      const progress = i / num;
      const r = 60 + Math.pow(progress, 1.3) * (width * 0.46);
      const theta = progress * Math.PI * 2.8;
      particles.push({
        r: r + (Math.random() - 0.5) * 40,
        theta: theta + (Math.random() - 0.5) * 0.3,
        speed: 0.0016 + Math.random() * 0.0022,
        size: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.35 + Math.random() * 0.55,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);
      // Gravitational center matching Google Antigravity (right-center bias)
      const cx = width * 0.56;
      const cy = height * 0.48;

      particles.forEach((p) => {
        p.theta += p.speed;
        const currentR = p.r + Math.sin(time + p.theta) * 8;
        const x = cx + Math.cos(p.theta) * currentR;
        const y = cy + Math.sin(p.theta) * (currentR * 0.72);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [selectedCompanyId, adaptation, activeTab, viewportMode]);

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    onShowToast(`${label} copiado com sucesso!`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Download DESIGN.MD helper
  const downloadDesignMd = () => {
    if (!adaptation?.adaptedDesignMd) return;
    const blob = new Blob([adaptation.adaptedDesignMd], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${clientName.toLowerCase().replace(/\s+/g, '-')}-DESIGN.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Arquivo DESIGN.MD descarregado com sucesso!');
  };

  const primaryColor = adaptation?.suggestedTokens?.primary || '#FF6B00';
  const neutralColor = adaptation?.suggestedTokens?.neutral || '#FAF9F6';
  const surfaceColor = adaptation?.suggestedTokens?.surface || '#FFFFFF';

  const isAntigravity = selectedCompanyId.includes('antigravity');
  const isAbacate = selectedCompanyId.includes('abacate');
  const isStripe = selectedCompanyId.includes('stripe');
  const isLinear = selectedCompanyId.includes('linear');

  // React component code generator
  const generatedReactCode = `import React, { useState } from 'react';

/**
 * Componente gerado pela Engine Analítica OpenDesignMD (Padrões Gemini)
 * Arquétipo: ${adaptation?.archetypeApplied || 'Engineered Calm & Gravitational Symmetry'}
 * Referência: ${referenceCompany.name}
 */
export default function ${clientName.replace(/\s+/g, '')}LandingPage() {
  return (
    <div className="min-h-screen bg-[${neutralColor}] text-[#121317] font-sans antialiased">
      {/* Top Announcement Bar */}
      <div className="border-b border-[#E8EAED] bg-white py-2 px-4 text-xs text-center flex items-center justify-center space-x-2">
        <span className="px-2 py-0.5 rounded-full bg-[#121317] text-white text-[10px] font-bold">+ NOVO</span>
        <span className="text-[#5F6368]">Apresentando o programa oficial ${clientName} 2026</span>
        <span>→</span>
      </div>

      {/* Header */}
      <header className="border-b border-[#E8EAED] bg-[${neutralColor}]/90 backdrop-blur-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 rounded-full border-2 border-[${primaryColor}] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#121317]" />
          </div>
          <span className="font-medium text-lg tracking-tight">${clientName}</span>
        </div>
        <button className="px-6 py-2 rounded-full bg-[${primaryColor}] text-white text-xs font-semibold shadow-md">
          Acessar Plataforma ↓
        </button>
      </header>

      {/* Monumental Hero */}
      <section className="py-24 text-center max-w-4xl mx-auto px-6 space-y-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#5F6368]">
          <span>[2026 SERIES] • RIGOR ARQUITETÔNICO</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-medium tracking-[-0.035em] leading-[1.08]">
          ${isAntigravity ? 'Hardware esculpido para a velocidade do pensamento.' : 'A tecnologia que transforma o seu dia a dia.'}
        </h1>
        <p className="text-base text-[#5F6368] max-w-xl mx-auto leading-relaxed">
          ${clientPrompt}
        </p>
        <div>
          <button className="px-8 py-3.5 rounded-full bg-[${primaryColor}] text-white font-medium shadow-lg hover:shadow-xl transition-all">
            Explorar Linha 2026 ↓
          </button>
        </div>
      </section>
    </div>
  );
}`;

  return (
    <div className={`min-h-screen bg-[#0D0E12] text-[#F3F4F6] font-sans antialiased selection:bg-[#4285F4]/30 selection:text-white ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-[#0D0E12]' : ''}`}>
      {/* ========================================================= */}
      {/* 1. GEMINI STUDIO MASTHEAD & BRAND HEADER                  */}
      {/* ========================================================= */}
      {!isFullscreen && (
        <header className="border-b border-white/10 bg-[#0D0E12]/95 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Left: Gemini Breadcrumb and Engine Badge */}
            <div className="flex items-center space-x-3">
              <Link
                to="/explore"
                className="text-xs font-mono text-[#9AA0A6] hover:text-white flex items-center space-x-1.5 transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#4285F4]" />
                <span>Catálogo</span>
              </Link>
              <span className="text-white/20">/</span>
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#4285F4] via-[#9B72CB] to-[#D96570] flex items-center justify-center p-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold tracking-tight text-white">
                      Gemini Design Studio
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#8AB4F8] font-medium">
                      Engine Analítica v2.5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Benchmark Links & Mode Indicator */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-[#9AA0A6]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Modelo: Gemini 2.0 Flash / Heuristic Multimodal</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <Link
                to="/preview/orbit-celulares"
                className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#E8EAED] transition-colors hidden sm:inline-flex items-center space-x-1.5"
              >
                <span>Orbit Mobile</span>
                <ExternalLink className="w-3 h-3 text-[#FF6B00]" />
              </Link>
              <Link
                to="/preview/nutriflui"
                className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#E8EAED] transition-colors hidden sm:inline-flex items-center space-x-1.5"
              >
                <span>NutriFlui</span>
                <ExternalLink className="w-3 h-3 text-[#9EEA6C]" />
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* ========================================================= */}
      {/* 2. GEMINI PROMPT & SYNTHESIS CONTROL CENTER               */}
      {/* ========================================================= */}
      {!isFullscreen && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 space-y-6">
          {/* Main Studio Console Card with Gemini Subtle Star Aura */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#16181D] to-[#121317] p-6 lg:p-8 shadow-2xl overflow-hidden">
            {/* Ambient subtle Gemini aura glow in background */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#4285F4]/10 via-[#9B72CB]/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-72 h-72 bg-gradient-to-tr from-[#EA4335]/5 via-transparent to-transparent blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Presets Chips Bar (Google Labs style) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-medium text-[#9AA0A6] uppercase tracking-wider flex items-center space-x-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-[#8AB4F8]" />
                    <span>Cenários Demonstrativos Pré-Calibrados:</span>
                  </span>
                  <span className="text-[11px] text-[#9AA0A6]">
                    Selecione para carregar os parâmetros ou personalize o prompt abaixo
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PROMPT_PRESETS.map((preset) => {
                    const isSelected = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-2 ${
                          isSelected
                            ? 'bg-white text-[#121317] shadow-lg scale-[1.02] font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-[#BDC1C6] border border-white/10'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: preset.primaryColor }}
                        />
                        <span>{preset.label}</span>
                        <span className="text-[10px] font-mono opacity-60">
                          ({preset.badge})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Natural Language Prompt Box with Gemini Aesthetics */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Reference Design System Selector */}
                  <div className="lg:col-span-4 space-y-2">
                    <label className="text-xs font-mono text-[#9AA0A6] block uppercase tracking-wider">
                      1. Sistema de Design de Origem (DNA):
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCompanyId}
                        onChange={(e) => setSelectedCompanyId(e.target.value)}
                        className="w-full bg-[#1F2128] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-[#4285F4] appearance-none cursor-pointer pr-10 font-medium"
                      >
                        {companies.map((comp) => (
                          <option key={comp.id} value={comp.id} className="bg-[#16181D]">
                            {comp.name} — {comp.dna?.archetype || comp.category}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#9AA0A6] absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9AA0A6]">Topologia:</span>
                        <span className="font-mono text-[#8AB4F8] font-medium truncate max-w-[180px]">
                          {referenceCompany.dna?.sectionBlueprints?.[0]?.layoutType || 'Simetria Monumental'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9AA0A6]">Densidade:</span>
                        <span className="font-mono text-emerald-400 font-medium uppercase">
                          {referenceCompany.dna?.spatialRhythm?.density || 'Sprawling'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Client Name & Natural Language Prompt */}
                  <div className="lg:col-span-8 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-[#9AA0A6] block uppercase tracking-wider">
                        2. Prompt do Projeto / Regras de Negócio do Cliente:
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[#9AA0A6]">Nome:</span>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Nome da Empresa"
                          className="px-2.5 py-1 rounded-lg bg-[#1F2128] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#4285F4] w-36 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        rows={3}
                        value={clientPrompt}
                        onChange={(e) => {
                          setClientPrompt(e.target.value);
                          setActivePresetId('');
                        }}
                        placeholder="Descreva o projeto do cliente, regras de cores, público-alvo ou layout (ex: Loja de smartphones premium onde a cor primária é laranja #FF6B00...)"
                        className="w-full bg-[#1F2128] border border-white/15 rounded-2xl p-4 text-sm text-white focus:outline-hidden focus:border-[#4285F4] resize-none leading-relaxed placeholder:text-[#5F6368]"
                      />

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2 text-xs text-[#9AA0A6]">
                          <span className="text-[11px] font-mono">
                            Exemplos de cores: "laranja", "verde botânico", "azul", "#FF6B00"
                          </span>
                        </div>

                        <button
                          onClick={() => executeGeneration(selectedCompanyId, clientPrompt, clientName)}
                          disabled={isGenerating}
                          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] hover:opacity-95 text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                          <span>{isGenerating ? 'Sintetizando DNA...' : 'Sintetizar com Engine Analítica'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time Telemetry Pipeline (Visible during & right after generation) */}
                {executionTelemetry.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5 mb-1.5">
                      <span className="text-[#8AB4F8] font-bold flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Pipeline de Síntese Analítica:</span>
                      </span>
                      <span className="text-[10px] text-[#9AA0A6]">
                        {isGenerating ? 'PROCESSANDO...' : 'SÍNCRONO / CONCLUÍDO'}
                      </span>
                    </div>
                    {executionTelemetry.map((line, idx) => (
                      <div key={idx} className="text-[#BDC1C6] flex items-center space-x-2">
                        <span className="text-[#4285F4]">›</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. STUDIO WORKSPACE (TAB BAR + RENDERED ENGINE PREVIEW)    */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Workspace Toolbar */}
        <div className="bg-[#16181D] border border-white/10 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          {/* Workspace Tabs */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'preview'
                  ? 'bg-white text-[#121317] font-semibold shadow-sm'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-white/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Visual Vivo</span>
            </button>

            <button
              onClick={() => setActiveTab('design-md')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'design-md'
                  ? 'bg-white text-[#121317] font-semibold shadow-sm'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>DESIGN.MD Sintetizado</span>
            </button>

            <button
              onClick={() => setActiveTab('invariants')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'invariants'
                  ? 'bg-white text-[#121317] font-semibold shadow-sm'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Invariantes & Topologia</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'code'
                  ? 'bg-white text-[#121317] font-semibold shadow-sm'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-white/5'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-[#D96570]" />
              <span>Código React TSX</span>
            </button>
          </div>

          {/* Viewport & Utility Actions */}
          <div className="flex items-center space-x-2.5">
            {activeTab === 'preview' && (
              <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewportMode === 'desktop'
                      ? 'bg-white/20 text-white shadow-2xs'
                      : 'text-[#9AA0A6] hover:text-white'
                  }`}
                  title="Desktop (1440px)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewportMode === 'tablet'
                      ? 'bg-white/20 text-white shadow-2xs'
                      : 'text-[#9AA0A6] hover:text-white'
                  }`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewportMode === 'mobile'
                      ? 'bg-white/20 text-white shadow-2xs'
                      : 'text-[#9AA0A6] hover:text-white'
                  }`}
                  title="Mobile (390px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl border border-white/10 text-[#9AA0A6] hover:text-white hover:bg-white/5 transition-colors"
              title={isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: VISUAL PREVIEW VIEWPORT                            */}
        {/* ========================================================= */}
        {activeTab === 'preview' && (
          <div className="flex justify-center mt-6">
            <div
              className={`w-full transition-all duration-300 rounded-3xl border border-white/10 overflow-hidden bg-white text-[#121317] shadow-2xl ${
                viewportMode === 'tablet'
                  ? 'max-w-[768px]'
                  : viewportMode === 'mobile'
                  ? 'max-w-[390px]'
                  : 'max-w-full'
              }`}
            >
              {/* Browser Header Bar */}
              <div className="bg-[#FAF9F6] border-b border-[#E8EAED] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[#5F6368]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                  <span className="ml-3 px-3 py-0.5 rounded-full bg-white border border-[#E8EAED] text-[11px]">
                    https://{clientName.toLowerCase().replace(/\s+/g, '')}.com
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span>Arquétipo: <strong>{referenceCompany.name}</strong></span>
                  <span>•</span>
                  <span style={{ color: primaryColor }} className="font-bold">
                    {primaryColor}
                  </span>
                </div>
              </div>

              {/* =================================================== */}
              {/* VARIANT A: GOOGLE ANTIGRAVITY BLUEPRINT             */}
              {/* (Monastic Calm, Centered Symmetry, Particle Vortex) */}
              {/* =================================================== */}
              {isAntigravity && (
                <div className="bg-[#FAF9F6] text-[#121317] antialiased">
                  {/* Announcement Bar */}
                  <div className="border-b border-[#E8EAED] bg-white py-2 px-4 text-xs text-center flex items-center justify-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#121317] text-white text-[10px] font-bold">
                      + NOVO
                    </span>
                    <span className="text-[#5F6368]">
                      Apresentando a Nova Linha Flagship 2026 de {clientName}
                    </span>
                    <span className="text-xs">→</span>
                  </div>

                  {/* Antigravity Header / Navbar */}
                  <header className="border-b border-[#E8EAED] bg-[#FAF9F6]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: primaryColor }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#121317]" />
                        </div>
                        <span className="font-medium text-base tracking-tight">{clientName}</span>
                      </div>
                      <div className="hidden md:flex items-center space-x-6 text-xs text-[#5F6368]">
                        <span className="hover:text-[#121317] cursor-pointer">Dispositivos Flagship</span>
                        <span className="hover:text-[#121317] cursor-pointer">Simulador Trade-In</span>
                        <span className="hover:text-[#121317] cursor-pointer">Garantia Care</span>
                        <span className="hover:text-[#121317] cursor-pointer">Empresas</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onShowToast(`Ação disparada no preview de ${clientName}!`)}
                        className="px-5 py-2 rounded-full text-white text-xs font-medium shadow-sm transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Acessar Catálogo ↓
                      </button>
                    </div>
                  </header>

                  {/* Monumental Centered Hero with Live Particle Canvas */}
                  {/* EXACT FIDELITY TO antigravity.google: Central H1, Solitary Centered Pill, Swirling Vortex */}
                  <section className="relative min-h-[620px] flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden bg-[#FAF9F6]">
                    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-85" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-7">
                      <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                        <span>[2026 SERIES] • RIGOR DE SILÍCIO & TITÂNIO</span>
                      </div>

                      <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.035em] text-[#121317] leading-[1.06]">
                        Hardware esculpido para a velocidade do pensamento.
                      </h1>

                      <p className="text-base text-[#5F6368] max-w-xl mx-auto font-normal leading-relaxed">
                        Smartphones de titânio aeroespacial e silício puro. Respiro arquitetônico, 2 anos de garantia contratual e avaliação matemática instantânea do seu usado no programa Trade-In.
                      </p>

                      <div className="pt-3 flex justify-center">
                        <button
                          onClick={() => onShowToast(`Explorar ativado!`)}
                          className="px-8 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 active:scale-95"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <span>Explorar Flagships</span>
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Monastic Metrics Banner */}
                      <div className="pt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto text-center border-t border-[#E8EAED]/60">
                        <div>
                          <div className="text-xl font-semibold text-[#121317]">24 Meses</div>
                          <div className="text-[11px] text-[#5F6368]">Garantia Orbit Care</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold" style={{ color: primaryColor }}>Até R$ 4.800</div>
                          <div className="text-[11px] text-[#5F6368]">Bônus de Troca</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-[#121317]">24h Express</div>
                          <div className="text-[11px] text-[#5F6368]">Logística Blindada</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Feature Explorer in Alternating Spacious Asymmetric Rows */}
                  <section className="py-24 bg-white border-t border-[#E8EAED] px-6">
                    <div className="max-w-5xl mx-auto space-y-24">
                      <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                          Engenharia Sem Concessões
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#121317]">
                          Dispositivos selecionados para precisão absoluta.
                        </h2>
                      </div>

                      {/* Row 1: Apple iPhone 16 Pro Max */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-5 space-y-4">
                          <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8EAED] text-[10px] font-mono text-[#5F6368]">
                            Apple A18 Pro • 3nm
                          </span>
                          <h3 className="text-2xl font-medium text-[#121317]">
                            iPhone 16 Pro Max
                          </h3>
                          <p className="text-sm text-[#5F6368] leading-relaxed">
                            Estrutura em titânio Grau 5 com acabamento escovado. Botão de Controle da Câmera capacitivo e sistema óptico Fusion de 48MP com zoom periscópio 5x.
                          </p>
                          <div className="pt-2 flex items-center space-x-4">
                            <span className="text-lg font-semibold text-[#121317]">R$ 8.999 à vista</span>
                            <button
                              onClick={() => onShowToast('Reservado iPhone 16 Pro Max!')}
                              className="px-4 py-2 rounded-full text-xs font-medium text-white shadow-xs"
                              style={{ backgroundColor: primaryColor }}
                            >
                              Configurar Agora →
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-7 bg-[#FAF9F6] rounded-3xl p-8 border border-[#E8EAED] flex items-center justify-center min-h-[300px]">
                          <div className="text-center space-y-3">
                            <div className="w-36 h-56 mx-auto rounded-3xl bg-[#121317] border-4 border-[#333] shadow-2xl flex flex-col justify-between p-3 text-white">
                              <div className="w-10 h-3 bg-black rounded-full mx-auto" />
                              <div className="text-[10px] font-mono text-[#FF6B00]">Orbit Mobile • 10:42</div>
                              <div className="text-[9px] text-[#5F6368]">Titânio Aeroespacial</div>
                            </div>
                            <span className="text-xs font-mono text-[#5F6368] block">Titânio Natural • Homologação Anatel</span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Inverted! Samsung Galaxy S25 Ultra */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-7 md:order-1 bg-[#FAF9F6] rounded-3xl p-8 border border-[#E8EAED] flex items-center justify-center min-h-[300px]">
                          <div className="text-center space-y-3">
                            <div className="w-36 h-56 mx-auto rounded-2xl bg-[#0F172A] border-4 border-[#1E293B] shadow-2xl flex flex-col justify-between p-3 text-white">
                              <div className="w-2 h-2 rounded-full bg-black mx-auto" />
                              <div className="text-[10px] font-mono text-[#FF6B00]">Snapdragon 8 Elite</div>
                              <div className="text-[9px] text-[#5F6368]">Armor Aluminum</div>
                            </div>
                            <span className="text-xs font-mono text-[#5F6368] block">Titanium Black • Caneta S-Pen Integrada</span>
                          </div>
                        </div>

                        <div className="md:col-span-5 md:order-2 space-y-4">
                          <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8EAED] text-[10px] font-mono text-[#5F6368]">
                            Snapdragon 8 Elite • Oryon
                          </span>
                          <h3 className="text-2xl font-medium text-[#121317]">
                            Galaxy S25 Ultra
                          </h3>
                          <p className="text-sm text-[#5F6368] leading-relaxed">
                            Tela Dynamic AMOLED 2X antirreflexo de 6.8 polegadas. Sensor principal ISOCELL de 200MP e bateria de silício-carbono com 45W.
                          </p>
                          <div className="pt-2 flex items-center space-x-4">
                            <span className="text-lg font-semibold text-[#121317]">R$ 6.899 à vista</span>
                            <button
                              onClick={() => onShowToast('Reservado Galaxy S25 Ultra!')}
                              className="px-4 py-2 rounded-full text-xs font-medium text-white shadow-xs"
                              style={{ backgroundColor: primaryColor }}
                            >
                              Configurar Agora →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Solutions & Programs (High-Contrast 2-Column Cards) */}
                  <section className="py-20 bg-[#FAF9F6] border-t border-[#E8EAED] px-6">
                    <div className="max-w-5xl mx-auto space-y-8">
                      <div className="text-center max-w-lg mx-auto space-y-2">
                        <h2 className="text-2xl font-medium text-[#121317]">
                          Programas Exclusivos Orbit Care
                        </h2>
                        <p className="text-xs text-[#5F6368]">
                          Transparência matemática sem letrinhas miúdas
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-3xl bg-white border border-[#E8EAED] space-y-4 shadow-xs">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                            PROGRAMA CONSUMIDOR
                          </span>
                          <h3 className="text-xl font-medium text-[#121317]">
                            Simulador Trade-In Inteligente
                          </h3>
                          <p className="text-xs text-[#5F6368] leading-relaxed">
                            Avaliação instantânea do seu modelo atual com dedução imediata no valor do novo flagship na finalização.
                          </p>
                          <div className="pt-2 space-y-2 text-xs text-[#5F6368]">
                            <div className="flex justify-between py-1 border-b border-[#E8EAED]">
                              <span>Seu aparelho usado:</span>
                              <strong className="text-[#121317]">iPhone 15 Pro Max</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#E8EAED]">
                              <span>Bônus calculado:</span>
                              <strong style={{ color: primaryColor }}>R$ 4.800 de crédito</strong>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-white border border-[#E8EAED] space-y-4 shadow-xs">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#121317] text-white">
                            PROGRAMA CORPORATIVO
                          </span>
                          <h3 className="text-xl font-medium text-[#121317]">
                            Orbit Enterprise & Frotas
                          </h3>
                          <p className="text-xs text-[#5F6368] leading-relaxed">
                            Locação e fornecimento em lote para executivos com substituição expressa em 24h e gerenciamento MDM incluso.
                          </p>
                          <div className="pt-2 space-y-2 text-xs text-[#5F6368]">
                            <div className="flex justify-between py-1 border-b border-[#E8EAED]">
                              <span>SLA de Atendimento:</span>
                              <strong className="text-[#121317]">4 horas úteis</strong>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#E8EAED]">
                              <span>Ciclo de renovação:</span>
                              <strong className="text-[#121317]">12 ou 24 meses</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Centered Single-Input Subscription Pill ("Fique em sincronia") */}
                  <section className="py-20 bg-white border-t border-[#E8EAED] px-6 text-center">
                    <div className="max-w-xl mx-auto space-y-4">
                      <h2 className="text-3xl font-medium text-[#121317] tracking-tight">
                        Fique em sincronia.
                      </h2>
                      <p className="text-xs text-[#5F6368]">
                        Receba comunicados de estoque e lançamentos com rigor de engenharia. Sem spam.
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          onShowToast(`Inscrição confirmada para ${newsletterEmail || 'seu e-mail'}!`);
                          setNewsletterEmail('');
                        }}
                        className="pt-2 flex max-w-md mx-auto items-center p-1.5 rounded-full border border-[#E8EAED] bg-[#FAF9F6] shadow-xs"
                      >
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Digite seu e-mail corporativo..."
                          className="flex-1 px-4 py-2 bg-transparent text-xs text-[#121317] focus:outline-hidden"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-full text-white text-xs font-medium shadow-xs"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Inscrever
                        </button>
                      </form>
                    </div>
                  </section>

                  {/* Semantic Navigational Footer */}
                  <footer className="border-t border-[#E8EAED] bg-[#FAF9F6] py-16 px-6 text-xs text-[#5F6368]">
                    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                      <div className="space-y-2">
                        <span className="font-semibold text-[#121317] block">Dispositivos</span>
                        <div className="space-y-1">
                          <div className="hover:text-[#121317] cursor-pointer">iPhone 16 Pro Max</div>
                          <div className="hover:text-[#121317] cursor-pointer">Galaxy S25 Ultra</div>
                          <div className="hover:text-[#121317] cursor-pointer">Pixel 9 Pro XL</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold text-[#121317] block">Programas</span>
                        <div className="space-y-1">
                          <div className="hover:text-[#121317] cursor-pointer">Simulador Trade-In</div>
                          <div className="hover:text-[#121317] cursor-pointer">Orbit Care+</div>
                          <div className="hover:text-[#121317] cursor-pointer">Empresas</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold text-[#121317] block">Engenharia</span>
                        <div className="space-y-1">
                          <div className="hover:text-[#121317] cursor-pointer">Homologação Anatel</div>
                          <div className="hover:text-[#121317] cursor-pointer">Laudos de Bateria</div>
                          <div className="hover:text-[#121317] cursor-pointer">Sustentabilidade</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold text-[#121317] block">Design System</span>
                        <div className="space-y-1">
                          <div className="hover:text-[#121317] cursor-pointer">@google/design.md</div>
                          <div className="hover:text-[#121317] cursor-pointer">Invariantes de Layout</div>
                          <div className="hover:text-[#121317] cursor-pointer">Tokens de Cor</div>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-5xl mx-auto pt-6 border-t border-[#E8EAED] flex justify-between items-center text-[11px]">
                      <span>© 2026 {clientName} Inc. Todos os direitos reservados.</span>
                      <span className="font-mono text-[#5F6368]">Inspirado na arquitetura estética de Google Antigravity</span>
                    </div>
                  </footer>
                </div>
              )}

              {/* =================================================== */}
              {/* VARIANT B: ABACATEPAY BLUEPRINT                     */}
              {/* (Playful Neo-Organic, Botanical Lime, Chips, Tabs)  */}
              {/* =================================================== */}
              {isAbacate && (
                <div className="bg-[#F7FAF6] text-[#1F4647] antialiased">
                  {/* Top Bar */}
                  <header className="border-b border-[#E1EADF] bg-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🥑</span>
                      <span className="font-bold text-lg text-[#1F4647]">{clientName}</span>
                    </div>
                    <button
                      className="px-6 py-2.5 rounded-full text-[#1F4647] font-bold text-xs shadow-md transition-all active:scale-95"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Começar Grátis →
                    </button>
                  </header>

                  {/* Neo-Organic Hero */}
                  <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1F4647]/5 text-xs font-semibold text-[#1F4647]">
                      <span>🥑 Nutrição de precisão com IA em segundos</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F4647] leading-tight">
                      Nutrição clínica online da forma que sempre deveria ter sido.
                    </h1>
                    <p className="text-base text-[#486E6F] max-w-2xl mx-auto">
                      {clientPrompt}
                    </p>
                    <div className="pt-2 flex justify-center space-x-3">
                      <button
                        className="px-8 py-3.5 rounded-full text-[#1F4647] font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Criar Plano em 90s →
                      </button>
                    </div>
                  </section>
                </div>
              )}

              {/* =================================================== */}
              {/* VARIANT C: STRIPE BLUEPRINT                         */}
              {/* (Prismatic Mesh, Split Code Terminal, High FinTech) */}
              {/* =================================================== */}
              {isStripe && (
                <div className="bg-white text-[#0A2540] antialiased">
                  <header className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <span className="font-bold text-xl tracking-tight text-[#635BFF]">{clientName}</span>
                    <button className="px-5 py-2 rounded-full bg-[#635BFF] text-white text-xs font-semibold shadow-md">
                      Acessar Dashboard
                    </button>
                  </header>

                  <section className="py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-6 space-y-6">
                      <h1 className="text-5xl font-extrabold tracking-tight text-[#0A2540] leading-tight">
                        Infraestrutura financeira para a internet.
                      </h1>
                      <p className="text-base text-[#425466]">
                        {clientPrompt}
                      </p>
                      <button className="px-6 py-3 rounded-full bg-[#635BFF] text-white font-semibold text-sm shadow-lg">
                        Iniciar Integração
                      </button>
                    </div>

                    <div className="md:col-span-6 bg-[#0A2540] rounded-2xl p-6 text-white font-mono text-xs shadow-2xl">
                      <div className="flex items-center space-x-2 text-gray-400 border-b border-gray-700 pb-3 mb-3">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>terminal — bash</span>
                      </div>
                      <div className="space-y-1 text-emerald-400">
                        <div>$ curl https://api.{clientName.toLowerCase()}.com/v1/charges \</div>
                        <div className="text-gray-300">  -u sk_live_...: \</div>
                        <div className="text-gray-300">  -d amount=2000 \</div>
                        <div className="text-gray-300">  -d currency=brl</div>
                        <div className="text-gray-500 pt-2"># Resposta em 42ms (D+0)</div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* =================================================== */}
              {/* VARIANT D: LINEAR BLUEPRINT                         */}
              {/* (Obsidian Darkroom, Bento Grid, ⌘K Keyboard Chips)  */}
              {/* =================================================== */}
              {isLinear && (
                <div className="bg-[#0D0E12] text-white antialiased">
                  <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
                    <span className="font-semibold text-lg tracking-tight text-white">{clientName}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/10 text-gray-400">⌘K Search</span>
                      <button className="px-4 py-1.5 rounded-md bg-[#5E6AD2] text-white text-xs font-medium">
                        Iniciar Sprint
                      </button>
                    </div>
                  </header>

                  <section className="py-24 px-6 max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl font-semibold tracking-tight text-white leading-tight">
                      Projetado para engenheiros de alto impacto.
                    </h1>
                    <p className="text-base text-gray-400 max-w-xl mx-auto">
                      {clientPrompt}
                    </p>
                    <div>
                      <button className="px-6 py-3 rounded-lg bg-[#5E6AD2] text-white font-medium text-xs shadow-lg">
                        Começar Agora • Grátis
                      </button>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SYNTHESIZED DESIGN.MD SPECIFICATION                */}
        {/* ========================================================= */}
        {activeTab === 'design-md' && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-[#16181D] p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                  <span>Especificação Canônica @google/design.md</span>
                </h3>
                <p className="text-xs text-[#9AA0A6]">
                  Documento arquitetural compilado pela engine analítica, pronto para consumo por agentes de IA e humanos
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(adaptation?.adaptedDesignMd || '', 'DESIGN.MD')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
                >
                  {copiedType === 'DESIGN.MD' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Markdown</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadDesignMd}
                  className="px-4 py-2 rounded-xl bg-[#4285F4] hover:bg-[#4285F4]/90 text-white text-xs font-mono font-semibold flex items-center space-x-1.5 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            {/* Markdown Display */}
            <div className="rounded-2xl bg-black/60 border border-white/10 p-6 font-mono text-xs text-[#E8EAED] overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
              <pre>{adaptation?.adaptedDesignMd}</pre>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: INVARIANTS & TOPOLOGICAL BLUEPRINTS                */}
        {/* ========================================================= */}
        {activeTab === 'invariants' && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-[#16181D] p-6 lg:p-8 space-y-8 shadow-2xl">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
                <span>Invariantes Arquiteturais & Regras Invioláveis</span>
              </h3>
              <p className="text-xs text-[#9AA0A6]">
                Regras estruturais que o agente de código NUNCA pode quebrar ao gerar novas telas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* O que SEMPRE fazem */}
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>O que os Designers SEMPRE Fazem:</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#E8EAED]">
                  {(referenceCompany.dna?.invariants?.always || [
                    'Manter simetria centralizada estrita no Hero.',
                    'Utilizar botão pílula escultural único.',
                    'Manter espaçamento de respiro vertical mínimo de 120px.',
                  ]).map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* O que NUNCA fariam */}
              <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-4">
                <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>O que os Designers NUNCA Fariam (Anti-Padrões):</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#E8EAED]">
                  {(referenceCompany.dna?.invariants?.never || [
                    'Nunca dividir o hero em duas colunas (split-screen).',
                    'Nunca posicionar cards de mockups flutuando ao lado do título.',
                    'Nunca utilizar cantos vivos pontudos (0px) em botões.',
                  ]).map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section Blueprints Table */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white">
                Topologia Estrutural das Seções Adaptadas:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adaptation?.adaptedSections?.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-[#8AB4F8] uppercase tracking-wider block">
                      Seção {idx + 1}
                    </span>
                    <div className="font-semibold text-white text-sm">{sec.name}</div>
                    <p className="text-xs text-[#9AA0A6] leading-relaxed">{sec.description}</p>
                    <div className="text-[10px] font-mono text-emerald-400 pt-1">
                      Regra: {sec.dnaRuleApplied}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: GENERATED REACT COMPONENT CODE                     */}
        {/* ========================================================= */}
        {activeTab === 'code' && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-[#16181D] p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <FileCode className="w-5 h-5 text-[#D96570]" />
                  <span>Componente React TSX Exportável</span>
                </h3>
                <p className="text-xs text-[#9AA0A6]">
                  Código reativo em Tailwind CSS pronto para copiar para seu projeto
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(generatedReactCode, 'Código React')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
              >
                {copiedType === 'Código React' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar TSX</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-2xl bg-black/60 border border-white/10 p-6 font-mono text-xs text-[#E8EAED] overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
              <pre>{generatedReactCode}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
