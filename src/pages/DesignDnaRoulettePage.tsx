import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  HelpCircle,
  Eye,
  Dice5,
  Palette,
  Terminal,
  Activity,
  Heart,
  Truck,
  ShoppingBag,
  DollarSign
} from 'lucide-react';
import { Company, DesignTokens } from '../types';

interface RouletteNiche {
  id: string;
  name: string;
  icon: string;
  clientName: string;
  context: string;
  defaultColor: string;
  tagline: string;
}

const ROULETTE_NICHES: RouletteNiche[] = [
  {
    id: 'mobile-store',
    name: 'Loja de Smartphones & Flagships',
    icon: '📱',
    clientName: 'Orbit Mobile',
    context: 'Loja premium de smartphones de titânio e silício onde a cor primária é Laranja (#FF6B00), com programa de Trade-In para aparelhos usados e garantia estendida de 2 anos.',
    defaultColor: '#FF6B00',
    tagline: 'Hardware esculpido para a velocidade do pensamento.',
  },
  {
    id: 'nutrition',
    name: 'Clínica de Nutrição & Bem-Estar',
    icon: '🥑',
    clientName: 'NutriFlui',
    context: 'Plataforma para nutricionistas com prescrição dietética automatizada por IA, cálculo de macro e micronutrientes baseado na tabela TACO e acompanhamento contínuo via WhatsApp.',
    defaultColor: '#9EEA6C',
    tagline: 'Nutrição clínica da forma que sempre deveria ter sido.',
  },
  {
    id: 'fintech',
    name: 'Fintech de Pagamentos & Cobrança',
    icon: '💳',
    clientName: 'FluxoPay',
    context: 'Gateway de pagamentos digitais com Pix instantâneo, split de pagamentos em tempo real e dashboard financeiro com taxas transparentes sem letras miúdas.',
    defaultColor: '#10B981',
    tagline: 'Infraestrutura financeira com liquidação em D+0.',
  },
  {
    id: 'ai-agents',
    name: 'Plataforma de Agentes de IA & DevTools',
    icon: '🤖',
    clientName: 'Kore Agents',
    context: 'Orquestrador de agentes de código autônomos locais, execução paralela de tarefas de engenharia de software e workspaces isolados orientados a terminal.',
    defaultColor: '#6366F1',
    tagline: 'Eleve seu time de engenharia à velocidade dos agentes autônomos.',
  },
  {
    id: 'health-saas',
    name: 'SaaS Hospitalar & Cardiologia',
    icon: '🏥',
    clientName: 'Vitalis Health',
    context: 'Monitoramento contínuo de telemetria de ECG em tempo real para UTIs hospitalares com detecção preditiva de arritmias cardíacas por redes neurais.',
    defaultColor: '#0EA5E9',
    tagline: 'Precisão milissegundo onde cada batimento cardíaco importa.',
  },
  {
    id: 'logistics',
    name: 'Logística & Gestão de Frotas',
    icon: '🚚',
    clientName: 'Apex Log',
    context: 'Plataforma de rastreamento de cargas blindadas, roteirização autônoma de veículos pesados e telemetria de consumo em tempo real com seguro de ponta a ponta.',
    defaultColor: '#F97316',
    tagline: 'Logística de alta precisão do centro de distribuição ao destino.',
  },
  {
    id: 'luxury-fashion',
    name: 'E-commerce de Moda & Luxo',
    icon: '💎',
    clientName: 'Maison Noir',
    context: 'Ateliê digital de alfaiataria sustentável e alta costura com catálogo de edição limitada, provador virtual com inteligência artificial e consultoria exclusiva de estilo.',
    defaultColor: '#EC4899',
    tagline: 'Alta costura escultural com corte milimétrico e tecidos nobres.',
  },
  {
    id: 'cloud-infra',
    name: 'Infraestrutura Cloud & APIs',
    icon: '⚡',
    clientName: 'Aether Cloud',
    context: 'Rede global de computação em borda (edge runtime) com latência sub-5ms, deploy instantâneo de microsserviços e balanceamento geográfico automático de carga.',
    defaultColor: '#8B5CF6',
    tagline: 'Deploy global em menos de 100ms em 300+ edge locations.',
  },
];

interface DesignDnaRoulettePageProps {
  companies: Company[];
  onShowToast: (message: string) => void;
}

export const DesignDnaRoulettePage: React.FC<DesignDnaRoulettePageProps> = ({ companies, onShowToast }) => {
  // Roulette state
  const [selectedNicheIndex, setSelectedNicheIndex] = useState<number>(0);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google-antigravity');
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string>('#FF6B00');
  const [customClientName, setCustomClientName] = useState<string>('Orbit Mobile');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Generation result state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedDesignMd, setGeneratedDesignMd] = useState<string | null>(null);
  const [generatedRationale, setGeneratedRationale] = useState<string | null>(null);
  const [generatedArchetype, setGeneratedArchetype] = useState<string | null>(null);
  const [generatedTokens, setGeneratedTokens] = useState<Record<string, string> | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'md' | 'blueprints' | 'tokens'>('preview');
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  // Canvas ref for Antigravity particles in live preview
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeNiche = ROULETTE_NICHES[selectedNicheIndex];
  const selectedCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0];

  // Sync custom inputs when niche changes
  const handleSelectNiche = (index: number) => {
    setSelectedNicheIndex(index);
    const n = ROULETTE_NICHES[index];
    setCustomClientName(n.clientName);
    setCustomPrimaryColor(n.defaultColor);
  };

  // Spin the Roulette
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Random turns (4 to 7 full rotations) plus random target segment
    const randomIndex = Math.floor(Math.random() * ROULETTE_NICHES.length);
    const extraDegrees = (360 / ROULETTE_NICHES.length) * randomIndex;
    const totalRotation = rotationAngle + 360 * 5 + extraDegrees;

    setRotationAngle(totalRotation);

    setTimeout(() => {
      setSelectedNicheIndex(randomIndex);
      const chosen = ROULETTE_NICHES[randomIndex];
      setCustomClientName(chosen.clientName);
      setCustomPrimaryColor(chosen.defaultColor);
      setIsSpinning(false);
      onShowToast(`Roleta sorteou: ${chosen.name}!`);
    }, 2800);
  };

  // Automatically trigger initial generation on mount
  useEffect(() => {
    handleGeneratePreview();
  }, [selectedCompanyId]);

  // Generate with Backend Adaptation Engine
  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/adapt-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: selectedCompanyId,
          clientName: customClientName,
          clientProjectContext: `${activeNiche.context} (Cor primária solicitada expressamente: ${customPrimaryColor})`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedDesignMd(data.adaptedDesignMd || '');
        setGeneratedRationale(data.rationale || '');
        setGeneratedArchetype(data.archetypeApplied || '');
        setGeneratedTokens(data.suggestedTokens || null);
        onShowToast(`Design System sintetizado com sucesso a partir de ${selectedCompany.name}!`);
      } else {
        throw new Error('Falha na resposta do servidor.');
      }
    } catch (err) {
      console.warn('Fallback adaptation generation:', err);
      // Fallback generation based on selected system
      const fallbackMd = `---
name: ${customClientName} Design System (Inspired by ${selectedCompany.name})
version: 1.0.0
archetype: "${selectedCompany.dna?.archetype || 'Engineered Calm'}"
colors:
  primary: "${customPrimaryColor}"
  secondary: "#5F6368"
  tertiary: "${customPrimaryColor}"
  neutral: "${selectedCompany.colors.neutral || '#FAF9F6'}"
  surface: "#FFFFFF"
---
# Design System: ${customClientName}
> Transplante da estética de ${selectedCompany.name} para o segmento de ${activeNiche.name}.
`;
      setGeneratedDesignMd(fallbackMd);
      setGeneratedArchetype(selectedCompany.dna?.archetype || 'Engineered Calm');
      setGeneratedTokens({
        primary: customPrimaryColor,
        secondary: '#5F6368',
        tertiary: customPrimaryColor,
        neutral: selectedCompany.colors.neutral || '#FAF9F6',
        surface: '#FFFFFF',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Canvas particle effect for Antigravity-style live preview
  useEffect(() => {
    if (selectedCompanyId !== 'google-antigravity' && !generatedArchetype?.includes('Gravitational')) return;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const particles: Array<{
      r: number;
      theta: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const num = 120;
    const colors = [customPrimaryColor, '#FFA000', '#121317', '#5F6368', '#CBD5E1'];

    for (let i = 0; i < num; i++) {
      const progress = i / num;
      const r = 40 + Math.pow(progress, 1.3) * (width * 0.42);
      const theta = progress * Math.PI * 2.8;
      particles.push({
        r: r + (Math.random() - 0.5) * 30,
        theta: theta + (Math.random() - 0.5) * 0.2,
        speed: 0.002 + Math.random() * 0.002,
        size: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.4 + Math.random() * 0.5,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.55;
      const cy = height * 0.48;

      particles.forEach((p) => {
        p.theta += p.speed;
        const currentR = p.r + Math.sin(time + p.theta) * 8;
        const x = cx + Math.cos(p.theta) * currentR;
        const y = cy + Math.sin(p.theta) * (currentR * 0.7);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedCompanyId, generatedArchetype, customPrimaryColor, activeTab]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMd(true);
    onShowToast('DESIGN.MD copiado!');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const isAntigravity = selectedCompanyId === 'google-antigravity';
  const isAbacatePay = selectedCompanyId === 'abacatepay';
  const isStripe = selectedCompanyId === 'stripe';
  const isLinear = selectedCompanyId === 'linear' || selectedCompanyId === 'supabase';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121317] font-sans antialiased pb-24">
      {/* ========================================================= */}
      {/* 1. TOP HEADER & BREADCRUMB                                */}
      {/* ========================================================= */}
      <header className="border-b border-[#E8EAED] bg-white sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/explore"
              className="text-xs font-mono text-[#5F6368] hover:text-[#121317] flex items-center space-x-1.5 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#FF6B00]" />
              <span>Voltar ao Catálogo</span>
            </Link>
            <span className="text-[#E8EAED]">/</span>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-sm font-semibold text-[#121317]">
                Estúdio de Demonstração & Roleta de Design DNA
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/preview/orbit-celulares"
              className="px-3.5 py-1.5 rounded-full border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] transition-colors hidden sm:inline-flex items-center space-x-1.5"
            >
              <span>Ver Orbit Mobile</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/preview/nutriflui"
              className="px-3.5 py-1.5 rounded-full border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] transition-colors hidden sm:inline-flex items-center space-x-1.5"
            >
              <span>Ver NutriFlui</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO BANNER: The Interactive Experiment               */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-xs font-mono text-[#5F6368] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>PROVADOR UNIVERSAL DE DESIGN DNA • AUTOMAÇÃO RIGOROSA</span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] text-[#121317] leading-tight">
            Transplante a alma visual de qualquer marca para o seu negócio.
          </h1>
          <p className="text-base text-[#5F6368] leading-relaxed">
            Gire a roleta de nichos ou selecione manualmente a área da empresa. Nosso motor extrai as
            regras de layout, blueprints de seções e invariantes do site de referência, gerando o
            <strong> DESIGN.MD canônico</strong> e compilando o <strong>Preview ao vivo</strong> sem
            intervenção manual de CSS.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE STUDIO CONTROLS (Roulette + Reference Site) */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Roulette & Niche Selector */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
              <div>
                <h3 className="font-semibold text-base text-[#121317] flex items-center space-x-2">
                  <span>1. Roleta de Áreas & Nichos</span>
                  <span className="text-lg">🎲</span>
                </h3>
                <p className="text-xs text-[#5F6368]">
                  Sorteie ou clique em um segmento de negócio
                </p>
              </div>

              <button
                onClick={spinRoulette}
                disabled={isSpinning}
                className="px-4 py-2 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all active:scale-95 shadow-md disabled:opacity-50"
              >
                <Dice5 className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'Girando...' : 'Girar Roleta!'}</span>
              </button>
            </div>

            {/* Visual Roulette Wheel Presentation */}
            <div className="relative py-4 flex flex-col items-center justify-center overflow-hidden">
              <div
                className="w-48 h-48 rounded-full border-4 border-[#121317] shadow-xl relative flex items-center justify-center transition-transform duration-[2800ms] ease-out bg-gradient-to-tr from-[#FAF9F6] via-white to-[#F3F4F6]"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
              >
                {ROULETTE_NICHES.map((niche, idx) => {
                  const angle = (360 / ROULETTE_NICHES.length) * idx;
                  return (
                    <div
                      key={niche.id}
                      className="absolute text-xl font-bold cursor-pointer hover:scale-125 transition-transform"
                      style={{
                        transform: `rotate(${angle}deg) translate(0, -68px) rotate(-${angle}deg)`,
                      }}
                      title={niche.name}
                    >
                      {niche.icon}
                    </div>
                  );
                })}
                {/* Center Wheel Hub */}
                <div className="w-16 h-16 rounded-full bg-[#121317] text-white flex flex-col items-center justify-center shadow-lg z-10">
                  <span className="text-xs font-mono font-bold text-[#FF6B00]">DNA</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/70">WHEEL</span>
                </div>
              </div>

              {/* Indicator Arrow */}
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#FF6B00] -mt-2 z-20" />
            </div>

            {/* Currently Selected Niche Card */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8EAED] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase text-[#5F6368]">
                  Área Sorteada:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8EAED] text-xs font-semibold text-[#121317]">
                  {activeNiche.icon} {activeNiche.name}
                </span>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                {activeNiche.context}
              </p>
            </div>

            {/* Quick Niche Chips */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-[#5F6368]">
                Ou escolha diretamente o nicho:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROULETTE_NICHES.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => handleSelectNiche(idx)}
                    className={`p-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center space-x-2 ${
                      selectedNicheIndex === idx
                        ? 'border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-semibold'
                        : 'border-[#E8EAED] text-[#5F6368] hover:border-[#121317]/30 bg-white'
                    }`}
                  >
                    <span>{n.icon}</span>
                    <span className="truncate">{n.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Reference Benchmark System & Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-[#E8EAED] pb-4">
                <h3 className="font-semibold text-base text-[#121317] flex items-center space-x-2">
                  <span>2. Escolha o Sistema de Design de Origem (A Referência Visual)</span>
                </h3>
                <p className="text-xs text-[#5F6368]">
                  Selecione qual empresa servirá de modelo para o transplante de layout e estilo
                </p>
              </div>

              {/* Benchmark Reference Companies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'google-antigravity',
                    name: 'Google Antigravity',
                    icon: '🌌',
                    badge: 'Simetria & Vórtice',
                    desc: 'Calmaria monumental, pílula solitária e partículas',
                  },
                  {
                    id: 'abacatepay',
                    name: 'AbacatePay',
                    icon: '🥑',
                    badge: 'Playful Neo-Organic',
                    desc: 'Verde botânico, pílulas táteis e microcopy esperto',
                  },
                  {
                    id: 'stripe',
                    name: 'Stripe',
                    icon: '💳',
                    badge: 'Prismatic Precision',
                    desc: 'Gradiente mesh, terminais e rigor financeiro',
                  },
                  {
                    id: 'linear',
                    name: 'Linear',
                    icon: '📐',
                    badge: 'Tactile Darkroom',
                    desc: 'Bordas 1px, atalhos de teclado e bento grid',
                  },
                  {
                    id: 'airbnb',
                    name: 'Airbnb',
                    icon: '🏡',
                    badge: 'Warm Editorial',
                    desc: 'Papel aquecido e fotografia imersiva',
                  },
                  {
                    id: 'vercel',
                    name: 'Vercel',
                    icon: '▲',
                    badge: 'Monocromático Geométrico',
                    desc: 'Triângulos, contraste preto/branco e alta performance',
                  },
                ].map((sys) => {
                  const isSel = selectedCompanyId === sys.id;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => setSelectedCompanyId(sys.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSel
                          ? 'border-[#121317] bg-[#121317] text-white shadow-md'
                          : 'border-[#E8EAED] bg-[#FAF9F6] text-[#121317] hover:border-[#121317]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{sys.icon}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                            isSel ? 'bg-white/20 text-white' : 'bg-black/5 text-[#5F6368]'
                          }`}
                        >
                          {sys.badge}
                        </span>
                      </div>
                      <div className="font-semibold text-xs truncate">{sys.name}</div>
                      <div
                        className={`text-[10px] line-clamp-2 mt-1 ${
                          isSel ? 'text-white/70' : 'text-[#5F6368]'
                        }`}
                      >
                        {sys.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tuning: Color & Name Override */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#5F6368] mb-1">
                    Nome da Empresa / Marca Gerada:
                  </label>
                  <input
                    type="text"
                    value={customClientName}
                    onChange={(e) => setCustomClientName(e.target.value)}
                    placeholder="Nome da marca..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8EAED] bg-[#FAF9F6] text-xs font-semibold text-[#121317] focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#5F6368] mb-1">
                    Cor Primária Solicitada (Hex):
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={customPrimaryColor}
                      onChange={(e) => setCustomPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border border-[#E8EAED] cursor-pointer bg-white p-1"
                    />
                    <input
                      type="text"
                      value={customPrimaryColor}
                      onChange={(e) => setCustomPrimaryColor(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8EAED] bg-[#FAF9F6] text-xs font-mono font-semibold text-[#121317] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-6 border-t border-[#E8EAED] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#5F6368] font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Topologia & Blueprints garantidos pelo backend</span>
              </div>

              <button
                onClick={handleGeneratePreview}
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-sm font-semibold shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sintetizando com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gerar DESIGN.MD & Preview ao Vivo</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. LIVE PREVIEW VIEWPORT & INSPECTOR TABS                 */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#E8EAED] shadow-2xs">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'preview'
                  ? 'bg-[#121317] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview Interativo ({customClientName})</span>
            </button>

            <button
              onClick={() => setActiveTab('md')}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'md'
                  ? 'bg-[#121317] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>DESIGN.MD Gerado com Blueprints</span>
            </button>

            <button
              onClick={() => setActiveTab('blueprints')}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'blueprints'
                  ? 'bg-[#121317] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Topologia de Layout Herdada</span>
            </button>

            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'tokens'
                  ? 'bg-[#121317] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Paleta Semântica Recalibrada</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            {generatedDesignMd && (
              <button
                onClick={() => copyToClipboard(generatedDesignMd)}
                className="px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] flex items-center space-x-1.5 transition-colors"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#5F6368]" />}
                <span>{copiedMd ? 'Copiado!' : 'Copiar .MD'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Live Interactive Preview */}
        {activeTab === 'preview' && (
          <div className="rounded-3xl border border-[#E8EAED] overflow-hidden bg-white shadow-xl transition-all">
            {/* Browser Frame Chrome */}
            <div className="bg-[#FAF9F6] border-b border-[#E8EAED] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block" />
                <div className="ml-4 px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#5F6368]">
                  https://{customClientName.toLowerCase().replace(/\s+/g, '')}.app
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#5F6368] flex items-center space-x-2">
                <span>Estilo: {selectedCompany.name}</span>
                <span>•</span>
                <span style={{ color: customPrimaryColor }} className="font-semibold">
                  {customPrimaryColor}
                </span>
              </div>
            </div>

            {/* RENDERED PREVIEW CONTAINER */}
            <div className="relative min-h-[550px] overflow-hidden">
              {/* ================================================= */}
              {/* VARIANT A: GOOGLE ANTIGRAVITY (Monumental Symmetry) */}
              {/* ================================================= */}
              {isAntigravity && (
                <div className="bg-[#FAF9F6] text-[#121317] p-8 sm:p-14 relative flex flex-col justify-between min-h-[550px]">
                  {/* Swirling Antigravity Canvas */}
                  <canvas ref={previewCanvasRef} className="absolute inset-0 pointer-events-none opacity-80" />

                  {/* Antigravity Announcement Pill */}
                  <div className="relative z-10 flex justify-center mb-8">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-[#121317] text-white text-[10px] font-bold">
                        + NOVO
                      </span>
                      <span className="text-[#5F6368]">
                        Lançamento da plataforma oficial {customClientName} 2026
                      </span>
                    </div>
                  </div>

                  {/* Monumental Centered Hero */}
                  <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6 my-auto">
                    <div className="inline-flex items-center space-x-2 text-xs font-medium text-[#121317]">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: customPrimaryColor }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#121317]" />
                      </div>
                      <span>{customClientName}</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.035em] text-[#121317] leading-[1.08]">
                      {activeNiche.tagline}
                    </h2>

                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={() => onShowToast(`Ação disparada no preview de ${customClientName}!`)}
                        className="px-8 py-3.5 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 active:scale-95"
                        style={{ backgroundColor: customPrimaryColor }}
                      >
                        <span>Explorar Plataforma</span>
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Antigravity Feature Row (Alternating Spacious Blueprint) */}
                  <div className="relative z-10 pt-16 border-t border-[#E8EAED] grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold uppercase" style={{ color: customPrimaryColor }}>
                        Engenharia & Rigor
                      </span>
                      <h4 className="text-xl font-medium text-[#121317]">
                        Desenvolvido para máxima tolerância e serenidade cognitiva.
                      </h4>
                      <p className="text-xs text-[#5F6368] leading-relaxed">
                        {activeNiche.context}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#E8EAED] shadow-sm flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#5F6368]">Disponibilidade Global</div>
                        <div className="text-2xl font-semibold text-[#121317]">99.99%</div>
                      </div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                        style={{ backgroundColor: customPrimaryColor }}
                      >
                        <Zap className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================= */}
              {/* VARIANT B: ABACATEPAY (Playful Neo-Organic)       */}
              {/* ================================================= */}
              {isAbacatePay && (
                <div className="bg-[#F7FAF6] text-[#1F4647] p-8 sm:p-14 relative space-y-12 min-h-[550px]">
                  {/* Organic Navbar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{activeNiche.icon}</span>
                      <span className="font-bold text-xl text-[#1F4647]">{customClientName}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#1F4647] text-[#9EEA6C] text-xs font-bold font-mono">
                      SEM MIGUÉ
                    </span>
                  </div>

                  {/* Asymmetric Split with Playful High-Contrast */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3EBE1] text-xs text-[#1F4647] font-semibold">
                        <span>🌱</span>
                        <span>Do jeito que você e seu time merecem</span>
                      </div>

                      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F4647] leading-tight">
                        {activeNiche.tagline}
                      </h2>

                      <p className="text-sm text-[#486E6F] leading-relaxed max-w-lg">
                        {activeNiche.context}
                      </p>

                      <div className="flex items-center space-x-3 pt-2">
                        <button
                          onClick={() => onShowToast(`Gatilho de cadastro em ${customClientName}!`)}
                          className="px-7 py-3 rounded-full text-[#1F4647] font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
                          style={{ backgroundColor: customPrimaryColor || '#9EEA6C' }}
                        >
                          Começar em 2 Minutos
                        </button>
                        <button className="px-5 py-3 rounded-full border border-[#E3EBE1] text-[#1F4647] text-sm font-semibold hover:bg-white transition-colors">
                          Ver Tabela Sem Letrinha
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="p-6 rounded-[32px] bg-white border-2 border-[#E3EBE1] shadow-lg space-y-4">
                        <div className="text-xs font-mono font-bold uppercase text-[#486E6F]">
                          Simulador em Tempo Real
                        </div>
                        <div className="text-3xl font-extrabold text-[#1F4647]">
                          R$ 89 <span className="text-sm font-normal text-[#486E6F]">/mês flat</span>
                        </div>
                        <p className="text-xs text-[#486E6F]">
                          Sem cobrança oculta por volume. Cancele quando quiser com um clique.
                        </p>
                        <div className="w-full py-2.5 rounded-full bg-[#1F4647] text-white text-center text-xs font-bold">
                          Economia de até 65% comprovada
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================= */}
              {/* VARIANT C: STRIPE / PRISMATIC TECH                */}
              {/* ================================================= */}
              {isStripe && (
                <div className="bg-[#FAF9F6] p-8 sm:p-14 relative space-y-12 min-h-[550px] overflow-hidden">
                  <div
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: customPrimaryColor }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#5F6368]">
                        Infraestrutura Prismática
                      </div>
                      <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#121317]">
                        {activeNiche.tagline}
                      </h2>
                      <p className="text-sm text-[#5F6368] leading-relaxed">
                        {activeNiche.context}
                      </p>
                      <button
                        className="px-6 py-3 rounded-full text-white text-sm font-medium shadow-md transition-all"
                        style={{ backgroundColor: customPrimaryColor }}
                      >
                        Iniciar Integração API →
                      </button>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-2xl bg-[#121317] text-white p-5 font-mono text-xs space-y-3 shadow-2xl">
                        <div className="flex items-center space-x-2 text-white/40 pb-2 border-b border-white/10">
                          <Terminal className="w-4 h-4 text-green-400" />
                          <span>curl https://api.{customClientName.toLowerCase().replace(/\s+/g, '')}.com/v1</span>
                        </div>
                        <div className="text-green-400 font-light">
                          {`{\n  "status": "ready",\n  "latency": "1.2ms",\n  "client": "${customClientName}"\n}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================= */}
              {/* VARIANT D: LINEAR / TACTILE DARKROOM              */}
              {/* ================================================= */}
              {(isLinear || (!isAntigravity && !isAbacatePay && !isStripe)) && (
                <div className="bg-[#0D0E12] text-white p-8 sm:p-14 relative space-y-10 min-h-[550px]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="font-mono text-sm font-semibold">{customClientName}</div>
                    <div className="text-xs font-mono text-white/50">⌘K Navigation</div>
                  </div>

                  <div className="max-w-2xl space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-medium tracking-tight">
                      {activeNiche.tagline}
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {activeNiche.context}
                    </p>
                    <button
                      className="px-6 py-2.5 rounded-lg text-white text-xs font-mono font-medium shadow-md transition-all border border-white/20"
                      style={{ backgroundColor: customPrimaryColor }}
                    >
                      Acessar Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Full Generated DESIGN.MD */}
        {activeTab === 'md' && (
          <div className="bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-[#121317]">
                  DESIGN.MD Sintetizado Automaticamente
                </h3>
                <p className="text-xs text-[#5F6368] font-mono">
                  Especificação canônica Google Labs compatível com Windsurf, Cursor e Claude
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(generatedDesignMd || '')}
                className="px-4 py-2 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-xs font-mono transition-colors flex items-center space-x-1.5"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMd ? 'Copiado' : 'Copiar Arquivo'}</span>
              </button>
            </div>

            <pre className="p-6 rounded-2xl bg-[#121317] text-[#FAF9F6] font-mono text-xs leading-5 overflow-x-auto whitespace-pre max-h-[600px]">
              {generatedDesignMd || 'Sintetizando especificação...'}
            </pre>
          </div>
        )}

        {/* Tab 3: Inherited Layout Topology & Blueprints */}
        {activeTab === 'blueprints' && (
          <div className="bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="font-semibold text-base text-[#121317]">
                Topologia de Layout Herdada de {selectedCompany.name}
              </h3>
              <p className="text-xs text-[#5F6368]">
                Comprovação de que o sistema de design gerou a arquitetura real e não um template split-screen genérico.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8EAED] space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#FF6B00]">
                  Topologia do Hero
                </span>
                <div className="font-semibold text-sm text-[#121317]">
                  {selectedCompany.dna?.sectionBlueprints?.[0]?.layoutType || 'Centrally Aligned Monumental Symmetry'}
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  {selectedCompany.dna?.sectionBlueprints?.[0]?.designRule ||
                    'Preserva o foco central monumental e serenidade visual sem divisão em duas colunas.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8EAED] space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#FF6B00]">
                  Densidade & Espaçamento
                </span>
                <div className="font-semibold text-sm text-[#121317]">
                  {selectedCompany.dna?.spatialRhythm?.density?.toUpperCase() || 'SPRAWLING'}
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  {selectedCompany.dna?.spatialRhythm?.whitespaceStrategy ||
                    'Respiro amplo com margens de 100px a 120px entre seções para contemplação do produto.'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8EAED] space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#121317]">
                Regras Invioláveis Herdadas (Invariants):
              </span>
              <ul className="text-xs text-[#5F6368] space-y-1.5 list-disc list-inside">
                {selectedCompany.dna?.invariants?.always?.map((rule, idx) => (
                  <li key={idx}>
                    <strong>SEMPRE:</strong> {rule}
                  </li>
                ))}
                {selectedCompany.dna?.invariants?.never?.map((rule, idx) => (
                  <li key={idx} className="text-[#EA4335]">
                    <strong>NUNCA:</strong> {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Semantic Tokens & Contrast */}
        {activeTab === 'tokens' && (
          <div className="bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="font-semibold text-base text-[#121317]">
                Paleta Semântica Recalibrada para {customClientName}
              </h3>
              <p className="text-xs text-[#5F6368]">
                Tokens de cor ajustados com contraste verificado contra as diretrizes WCAG 2.2
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {generatedTokens &&
                Object.entries(generatedTokens).map(([role, hex]) => (
                  <div key={role} className="p-3.5 rounded-2xl border border-[#E8EAED] space-y-2">
                    <div className="h-12 rounded-xl shadow-inner border border-black/5" style={{ backgroundColor: hex }} />
                    <div className="font-mono text-xs font-semibold text-[#121317]">{hex}</div>
                    <div className="text-[10px] text-[#5F6368] uppercase font-mono">{role}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignDnaRoulettePage;
