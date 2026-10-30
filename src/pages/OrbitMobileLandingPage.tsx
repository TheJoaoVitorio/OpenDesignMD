import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  X,
  Layers,
  Copy,
  Check,
  ChevronDown,
  RefreshCw,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Rocket,
  CheckCheck,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface OrbitMobileLandingPageProps {
  onShowToast: (message: string) => void;
}

export const OrbitMobileLandingPage: React.FC<OrbitMobileLandingPageProps> = ({ onShowToast }) => {
  // Top announcement banner
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);

  // Inspector modal state
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<'md' | 'comparison' | 'tokens'>('md');
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  // Trade-In Calculator State
  const [tradeInBrand, setTradeInBrand] = useState<'apple' | 'samsung' | 'xiaomi'>('apple');
  const [tradeInModel, setTradeInModel] = useState<string>('iPhone 14 Pro 128GB');
  const [tradeInCondition, setTradeInCondition] = useState<'mint' | 'good' | 'fair'>('mint');
  const [targetDevice, setTargetDevice] = useState<string>('iPhone 16 Pro 128GB');

  // Newsletter email state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  // Canvas ref for Antigravity swirling particle vortex
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Particle Vortex Animation (Authentic Antigravity Swirl)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      originTheta: number;
      originR: number;
      currentTheta: number;
      currentR: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
      pulseOffset: number;
    }

    const particles: Particle[] = [];
    const numParticles = 190;

    // Palette: Orange #FF6B00 dominant, plus warm amber, graphite and Google Antigravity tones
    const colors = [
      '#FF6B00', // Client Vibrant Orange
      '#FF9E40', // Soft Warm Orange
      '#1A73E8', // Antigravity Accent Blue
      '#7C3AED', // Soft Indigo
      '#121317', // Deep Graphite Ink
      '#9AA0A6', // Slate Dust
      '#FFA000', // Amber
    ];

    // Seed particles along a graceful logarithmic spiral / vortex arch
    // Matching the exact curve on the right and center of antigravity.google
    for (let i = 0; i < numParticles; i++) {
      const progress = i / numParticles;
      // Exponential radius spread
      const r = 80 + Math.pow(progress, 1.3) * (width * 0.48);
      // Logarithmic spiral angle with offset
      const theta = progress * Math.PI * 2.8 + Math.PI * 0.15;
      const jitterR = (Math.random() - 0.5) * 45;
      const jitterTheta = (Math.random() - 0.5) * 0.25;

      particles.push({
        originTheta: theta + jitterTheta,
        originR: r + jitterR,
        currentTheta: theta + jitterTheta,
        currentR: r + jitterR,
        speed: 0.0015 + Math.random() * 0.002,
        size: 1.5 + Math.random() * 2.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.35 + Math.random() * 0.6,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Center vortex focal point (slightly offset to the right-center, matching antigravity.google)
      const centerX = width * 0.62;
      const centerY = height * 0.48;

      particles.forEach((p) => {
        // Slow orbital rotation
        p.currentTheta += p.speed;

        // Subtle breathing radial motion
        const breathing = Math.sin(time + p.pulseOffset) * 12;
        const currentRadius = p.currentR + breathing;

        const x = centerX + Math.cos(p.currentTheta) * currentRadius;
        const y = centerY + Math.sin(p.currentTheta) * (currentRadius * 0.72); // slightly elliptical

        // Dynamic alpha pulsing
        const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha + Math.sin(time * 2 + p.pulseOffset) * 0.2));

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Subtle aura for larger orange particles
        if (p.size > 3 && p.color === '#FF6B00') {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#FF6B00';
          ctx.globalAlpha = currentAlpha * 0.2;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Trade-In calculation logic
  const valuationMap: Record<string, { base: number; max: number }> = {
    'iPhone 15 Pro Max 256GB': { base: 4200, max: 4800 },
    'iPhone 15 Pro 128GB': { base: 3600, max: 4100 },
    'iPhone 14 Pro Max 128GB': { base: 3100, max: 3500 },
    'iPhone 14 Pro 128GB': { base: 2700, max: 3100 },
    'iPhone 13 Pro 128GB': { base: 2200, max: 2600 },
    'Galaxy S24 Ultra 256GB': { base: 3600, max: 4200 },
    'Galaxy S23 Ultra 256GB': { base: 2600, max: 3000 },
    'Xiaomi 14 Ultra 512GB': { base: 3000, max: 3500 },
  };

  const targetPrices: Record<string, number> = {
    'iPhone 16 Pro 128GB': 7499,
    'iPhone 16 Pro Max 256GB': 8999,
    'Galaxy S25 Ultra 256GB': 6899,
    'Google Pixel 9 Pro XL 128GB': 5999,
  };

  const currentValuation = valuationMap[tradeInModel] || { base: 2500, max: 2900 };
  const multiplier = tradeInCondition === 'mint' ? 1.0 : tradeInCondition === 'good' ? 0.85 : 0.65;
  const tradeInCredit = Math.round(currentValuation.max * multiplier);
  const targetPrice = targetPrices[targetDevice] || 7499;
  const priceAfterCredit = Math.max(0, targetPrice - tradeInCredit);
  const installment12x = (priceAfterCredit / 12).toFixed(2);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    onShowToast(`Inscrição confirmada para ${newsletterEmail}!`);
    setNewsletterEmail('');
  };

  const orbitDesignMdText = `---
name: Orbit Mobile Design System (Inspired by Google Antigravity)
version: 2.0.0
archetype: "Engineered Calm, Monastic Purity & Gravitational Symmetry"
sourceDesignSystem: "Google Antigravity (antigravity.google)"
clientContext:
  business: "Loja de Smartphones e Flagships Premium (Orbit Mobile)"
  primaryColorRequirement: "#FF6B00 (Aerospace Vibrant Orange)"
colors:
  primary: "#FF6B00"        # Vibrant Aerospace Orange (Client Primary Action)
  primaryHover: "#E05E00"   # Deepened Optical Orange for Hover States
  secondary: "#5F6368"      # Google Slate Grey / Metadata Ink
  tertiary: "#FF6B00"       # High-Contrast Accent & Focus Ring
  neutral: "#FAF9F6"        # Google Antigravity Warm Off-White Canvas
  surface: "#FFFFFF"        # Crisp Elevated White Cards
  surfaceDark: "#121317"    # Antigravity Monolithic Void Slate
  border: "#E8EAED"         # 1px Technical Hairline Border
typography:
  fontFamily: "Google Sans, Inter, -apple-system, sans-serif"
  h1:
    fontSize: 4rem
    letterSpacing: "-0.035em"
    textAlign: "center"
rounded:
  full: 9999px
---

# Design System: Orbit Mobile (Inspirado em Google Antigravity)

## 1. Visual Archetype: Engineered Calm & Gravitational Symmetry
- **Simetria Monumental Centralizada:** O Hero NUNCA usa tela dividida (split-screen). O título monumental é 100% centralizado, cercado pelo vórtice matemático de partículas orbitais.
- **Botão Pílula Central Único:** Um único botão pílula escultural sob o título centralizado.
- **Espaço Negativo Vasto:** Margens generosas, ausência de poluição visual de varejo.
`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMd(true);
    onShowToast('Especificação copiada para a área de transferência!');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121317] font-sans antialiased selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
      {/* ========================================================= */}
      {/* 0. OPEN DESIGN MD HUD INSPECTOR BAR (Platform Utility)   */}
      {/* ========================================================= */}
      <div className="bg-[#121317] text-white py-2 px-4 border-b border-white/10 text-xs font-mono">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              to="/system/google-antigravity"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 flex items-center space-x-1.5 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#FF6B00]" />
              <span>Voltar ao Sistema Antigravity</span>
            </Link>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-white/80">
              Estética: <span className="text-white font-semibold">Google Antigravity</span>
            </span>
            <span className="hidden sm:inline text-white/40">→</span>
            <span className="hidden sm:inline text-[#FF6B00] font-semibold">
              Loja: Orbit Mobile (Primária: Laranja #FF6B00)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSpecModal(true)}
              className="px-3.5 py-1 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inspecionar DESIGN.MD</span>
            </button>
            <Link
              to="/preview/roleta"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors hidden sm:inline-flex items-center space-x-1"
            >
              <span>🎲</span>
              <span>Roleta Studio</span>
            </Link>
            <Link
              to="/"
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden md:inline-flex"
            >
              OpenDesignMD Home
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. TOP ANNOUNCEMENT BANNER (Identical to Antigravity)     */}
      {/* ========================================================= */}
      {showAnnouncement && (
        <div className="border-b border-[#E8EAED] bg-white py-2.5 px-4 text-xs font-sans transition-all">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center space-x-2 sm:space-x-3 text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#121317] text-white text-[10px] font-semibold tracking-wide">
                + NOVO
              </span>
              <span className="text-[#5F6368] font-normal truncate max-w-md sm:max-w-none">
                Apresentando a Linha Titanium 2026 e o Novo Programa Orbit Trade-In
              </span>
              <a
                href="#trade-in"
                className="font-medium text-[#121317] hover:text-[#FF6B00] transition-colors inline-flex items-center space-x-1"
              >
                <span>Ver novidades</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>

            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-[#5F6368] hover:text-[#121317] p-1 rounded-full transition-colors"
              aria-label="Fechar anúncio"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. MAIN NAVBAR (Aerodynamic Antigravity Geometry)         */}
      {/* ========================================================= */}
      <header className="border-b border-[#E8EAED] bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo: Architectural Orbit Glyphs in Orange & Ink */}
          <div className="flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2.5 group">
              {/* Minimalist Antigravity 'A'-inspired Orbit Ring */}
              <div className="w-6 h-6 flex items-center justify-center relative">
                <div className="w-5 h-5 rounded-full border-2 border-[#FF6B00] group-hover:scale-110 transition-transform" />
                <div className="w-2 h-2 rounded-full bg-[#121317] absolute" />
              </div>
              <span className="font-medium text-lg tracking-tight text-[#121317]">
                Orbit Mobile
              </span>
            </a>

            {/* Dropdown Links (Exact Antigravity Hierarchy) */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-normal text-[#121317]">
              <a href="#flagships" className="flex items-center space-x-1 hover:text-[#FF6B00] transition-colors py-2">
                <span>Dispositivos</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5F6368]" />
              </a>
              <a href="#trade-in" className="flex items-center space-x-1 hover:text-[#FF6B00] transition-colors py-2">
                <span>Trade-In</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5F6368]" />
              </a>
              <a href="#care" className="hover:text-[#FF6B00] transition-colors py-2">
                Garantia Care
              </a>
              <a href="#b2b" className="hover:text-[#FF6B00] transition-colors py-2">
                Empresas
              </a>
              <a href="#benchmarks" className="flex items-center space-x-1 hover:text-[#FF6B00] transition-colors py-2">
                <span>Recursos</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5F6368]" />
              </a>
            </nav>
          </div>

          {/* Right Action Cluster (Rocket + Black/Orange Pill + Language) */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-[#5F6368] hover:text-[#121317] cursor-pointer transition-colors">
              <Rocket className="w-4 h-4 text-[#FF6B00]" />
            </div>

            {/* Full Pill Button in pure dark ink (or orange hover) */}
            <a
              href="#flagships"
              className="px-5 py-2 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-sm font-medium transition-all duration-300 flex items-center space-x-1.5 shadow-sm active:scale-95"
            >
              <span>Explorar</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            {/* Language Selector with Globe */}
            <div className="flex items-center space-x-1 text-xs font-medium text-[#5F6368] hover:text-[#121317] cursor-pointer transition-colors border-l border-[#E8EAED] pl-3">
              <Globe className="w-3.5 h-3.5" />
              <span>PT</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION (100% Symmetrical Monumental Antigravity)  */}
      {/* ========================================================= */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF9F6]">
        {/* Dynamic Canvas with Swirling Antigravity Particle Vortex */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[1440px] opacity-80"
          />
        </div>

        {/* Hero Foreground Content - Perfectly Centered */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 py-16 sm:py-24">
          {/* Centered Brand Mark Badge above title */}
          <div className="inline-flex items-center space-x-2 text-sm font-medium text-[#121317] animate-fade-in">
            <div className="w-4 h-4 rounded-full border-2 border-[#FF6B00] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#121317]" />
            </div>
            <span>Orbit Mobile</span>
          </div>

          {/* Monumental Centered H1 (Strictly -0.035em Google Sans Letter Spacing) */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-medium tracking-[-0.035em] text-[#121317] leading-[1.08] max-w-3xl mx-auto">
            Impulsione sua experiência com a nova geração de smartphones
          </h1>

          {/* Solitary Centered Sculptured Pill Button (Zero Clutter) */}
          <div className="pt-4 flex justify-center">
            <a
              href="#flagships"
              className="px-8 py-3.5 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-base font-medium shadow-md hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group active:scale-95"
            >
              <span>Explorar Dispositivos</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURE EXPLORER SECTION (Alternating Spacious Rows)    */}
      {/* Matches Antigravity's "feature-explorer-section"           */}
      {/* ========================================================= */}
      <section id="flagships" className="py-24 sm:py-32 bg-white border-t border-[#E8EAED]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {/* Section Lead */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#121317]">
              Engenharia de precisão para a era do silício
            </h2>
            <p className="text-base text-[#5F6368]">
              Dispositivos selecionados individualmente com tolerância milimétrica e 2 anos de garantia contratual.
            </p>
          </div>

          {/* Feature Item 1: iPhone 16 Pro Max */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Titanium Series 01
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-[#121317]">
                iPhone 16 Pro Max
              </h3>
              <p className="text-base text-[#5F6368] leading-relaxed">
                Estrutura esculpida em titânio Grau 5 com acabamento jateado. Botão de Controle da Câmera capacitivo e processador A18 Pro com aceleração neural dedicada para modelos de inteligência artificial locais.
              </p>
              <div className="pt-2">
                <a
                  href="#trade-in"
                  className="inline-flex items-center space-x-2 text-sm font-medium text-[#121317] hover:text-[#FF6B00] transition-colors group"
                >
                  <span>Avaliar troca com seu smartphone atual</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md p-8 rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] shadow-sm flex flex-col items-center hover:border-[#121317]/30 transition-all duration-500">
                <div className="w-44 h-72 rounded-[36px] bg-gradient-to-b from-[#2B2D33] via-[#1A1C22] to-[#121317] border-4 border-[#3E424B] shadow-xl relative overflow-hidden flex flex-col justify-between p-3">
                  <div className="w-16 h-4 bg-black rounded-full mx-auto" />
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-light text-white tracking-tight">10:42</div>
                    <div className="text-[10px] text-white/50">Orbit Pro Series</div>
                  </div>
                  <div className="w-20 h-1 bg-white/30 rounded-full mx-auto" />
                </div>
                <div className="mt-6 flex items-center justify-between w-full text-xs font-mono text-[#5F6368] border-t border-[#E8EAED] pt-4">
                  <span>A18 Pro (3nm)</span>
                  <span className="text-[#121317] font-semibold">R$ 8.999 à vista</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Item 2: Samsung Galaxy S25 Ultra (Reversed Row) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-md p-8 rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] shadow-sm flex flex-col items-center hover:border-[#121317]/30 transition-all duration-500">
                <div className="w-44 h-72 rounded-[28px] bg-gradient-to-b from-[#33373E] via-[#20232A] to-[#121317] border-4 border-[#4E5460] shadow-xl relative overflow-hidden flex flex-col justify-between p-3">
                  <div className="w-2.5 h-2.5 bg-black rounded-full mx-auto" />
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-light text-white tracking-tight">S25 Ultra</div>
                    <div className="text-[10px] text-white/50">Snapdragon 8 Elite</div>
                  </div>
                  <div className="w-20 h-1 bg-white/30 rounded-full mx-auto" />
                </div>
                <div className="mt-6 flex items-center justify-between w-full text-xs font-mono text-[#5F6368] border-t border-[#E8EAED] pt-4">
                  <span>200MP ISOCELL</span>
                  <span className="text-[#121317] font-semibold">R$ 6.899 à vista</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Titanium Series 02
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-[#121317]">
                Galaxy S25 Ultra
              </h3>
              <p className="text-base text-[#5F6368] leading-relaxed">
                Snapdragon 8 Elite customizado com arquitetura Oryon de 4.47GHz. Tela Dynamic AMOLED 2X com tratamento antirreflexo Corning Armor e S-Pen integrada para anotações instantâneas.
              </p>
              <div className="pt-2">
                <a
                  href="#trade-in"
                  className="inline-flex items-center space-x-2 text-sm font-medium text-[#121317] hover:text-[#FF6B00] transition-colors group"
                >
                  <span>Simular crédito de troca para o Galaxy S25</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Feature Item 3: Google Pixel 9 Pro XL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Google Hardware Series
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-[#121317]">
                Pixel 9 Pro XL
              </h3>
              <p className="text-base text-[#5F6368] leading-relaxed">
                A expressão nativa da engenharia do Google. Processador Tensor G4 executando Gemini Nano localmente com 16GB de RAM, visor Super Actua de 3.000 nits e 7 anos de atualizações contínuas de sistema operacional.
              </p>
              <div className="pt-2">
                <a
                  href="#trade-in"
                  className="inline-flex items-center space-x-2 text-sm font-medium text-[#121317] hover:text-[#FF6B00] transition-colors group"
                >
                  <span>Conhecer o programa de troca para o Pixel 9</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md p-8 rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] shadow-sm flex flex-col items-center hover:border-[#121317]/30 transition-all duration-500">
                <div className="w-44 h-72 rounded-[32px] bg-gradient-to-b from-[#E8EAED] via-[#D2D6DC] to-[#BCC1C9] border-4 border-[#9AA0A6] shadow-xl relative overflow-hidden flex flex-col justify-between p-3">
                  <div className="w-2.5 h-2.5 bg-black rounded-full mx-auto" />
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-light text-[#121317] tracking-tight">Pixel 9 Pro</div>
                    <div className="text-[10px] text-[#5F6368]">Gemini Nano Nativo</div>
                  </div>
                  <div className="w-20 h-1 bg-black/30 rounded-full mx-auto" />
                </div>
                <div className="mt-6 flex items-center justify-between w-full text-xs font-mono text-[#5F6368] border-t border-[#E8EAED] pt-4">
                  <span>Google Tensor G4</span>
                  <span className="text-[#121317] font-semibold">R$ 5.999 à vista</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE TRADE-IN SECTION (Antigravity Solution Box) */}
      {/* Matches "try-solutions-section"                           */}
      {/* ========================================================= */}
      <section id="trade-in" className="py-24 bg-[#FAF9F6] border-t border-[#E8EAED]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-xs font-mono text-[#5F6368]">
              Programa Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#121317]">
              Orbit Trade-In Instantâneo
            </h2>
            <p className="text-base text-[#5F6368]">
              Avaliação matemática sem intermediários. Troque seu seminovo e pague apenas a diferença.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8EAED] p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Selectors */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#5F6368]">
                    Marca do aparelho atual
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['apple', 'samsung', 'xiaomi'] as const).map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          setTradeInBrand(b);
                          if (b === 'apple') setTradeInModel('iPhone 14 Pro 128GB');
                          if (b === 'samsung') setTradeInModel('Galaxy S24 Ultra 256GB');
                          if (b === 'xiaomi') setTradeInModel('Xiaomi 14 Ultra 512GB');
                        }}
                        className={`py-2 rounded-full border text-xs font-medium transition-all ${
                          tradeInBrand === b
                            ? 'bg-[#121317] text-white border-[#121317]'
                            : 'border-[#E8EAED] text-[#5F6368] hover:border-[#121317]'
                        }`}
                      >
                        {b.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#5F6368]">
                    Modelo do aparelho
                  </label>
                  <select
                    value={tradeInModel}
                    onChange={(e) => setTradeInModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E8EAED] bg-[#FAF9F6] text-xs font-medium text-[#121317] focus:outline-none focus:border-[#FF6B00]"
                  >
                    {tradeInBrand === 'apple' && (
                      <>
                        <option value="iPhone 15 Pro Max 256GB">iPhone 15 Pro Max 256GB</option>
                        <option value="iPhone 15 Pro 128GB">iPhone 15 Pro 128GB</option>
                        <option value="iPhone 14 Pro Max 128GB">iPhone 14 Pro Max 128GB</option>
                        <option value="iPhone 14 Pro 128GB">iPhone 14 Pro 128GB</option>
                        <option value="iPhone 13 Pro 128GB">iPhone 13 Pro 128GB</option>
                      </>
                    )}
                    {tradeInBrand === 'samsung' && (
                      <>
                        <option value="Galaxy S24 Ultra 256GB">Galaxy S24 Ultra 256GB</option>
                        <option value="Galaxy S23 Ultra 256GB">Galaxy S23 Ultra 256GB</option>
                      </>
                    )}
                    {tradeInBrand === 'xiaomi' && (
                      <option value="Xiaomi 14 Ultra 512GB">Xiaomi 14 Ultra 512GB</option>
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#5F6368]">
                    Estado de conservação
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'mint', label: 'Impecável' },
                      { id: 'good', label: 'Bom estado' },
                      { id: 'fair', label: 'Com marcas' },
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        onClick={() => setTradeInCondition(cond.id as any)}
                        className={`py-2 rounded-full border text-xs font-medium transition-all ${
                          tradeInCondition === cond.id
                            ? 'border-[#FF6B00] text-[#FF6B00] bg-[#FF6B00]/5 font-semibold'
                            : 'border-[#E8EAED] text-[#5F6368]'
                        }`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Result Card */}
              <div className="p-6 rounded-3xl bg-[#121317] text-white space-y-5">
                <div className="text-xs font-mono text-white/60 uppercase">
                  Estimativa de Bônus Orbit
                </div>

                <div>
                  <div className="text-xs text-white/50">Crédito pelo seu aparelho:</div>
                  <div className="text-3xl font-semibold text-[#FF6B00] tracking-tight">
                    R$ {tradeInCredit.toLocaleString('pt-BR')},00
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1">
                  <div className="text-xs text-white/60">Você investe apenas:</div>
                  <div className="text-xl font-medium text-white">
                    R$ {priceAfterCredit.toLocaleString('pt-BR')},00
                  </div>
                  <div className="text-[11px] text-white/50 font-mono">
                    ou 12x de R$ {installment12x}
                  </div>
                </div>

                <button
                  onClick={() => onShowToast(`Bônus de R$ ${tradeInCredit.toLocaleString('pt-BR')} garantido!`)}
                  className="w-full py-3 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
                >
                  Garantir Bônus de Troca
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. NEWSLETTER / STAY IN SYNC (Identical to Antigravity)   */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-t border-[#E8EAED] text-center">
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.025em] text-[#121317]">
            Fique em sincronia com a Orbit Mobile
          </h2>
          <p className="text-sm text-[#5F6368]">
            Receba anúncios de novos lotes de hardware homologados e condições exclusivas de Trade-In.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Digite seu e-mail corporativo"
              className="w-full sm:w-auto flex-1 px-5 py-3 rounded-full border border-[#E8EAED] bg-[#FAF9F6] text-xs focus:outline-none focus:border-[#FF6B00] transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-xs font-medium transition-all active:scale-95 shadow-sm"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FOOTER (Multi-column Antigravity Architecture)         */}
      {/* ========================================================= */}
      <footer className="border-t border-[#E8EAED] bg-[#FAF9F6] py-16 text-xs text-[#5F6368] font-sans">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="font-semibold text-[#121317]">Dispositivos</div>
              <ul className="space-y-2">
                <li><a href="#flagships" className="hover:text-[#121317]">iPhone 16 Pro</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Galaxy S25 Ultra</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Pixel 9 Pro XL</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Seminovos Certified</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-[#121317]">Programas</div>
              <ul className="space-y-2">
                <li><a href="#trade-in" className="hover:text-[#121317]">Orbit Trade-In</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Orbit Care 24M</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Para Empresas</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Logística Express</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-[#121317]">Recursos</div>
              <ul className="space-y-2">
                <li><a href="#trade-in" className="hover:text-[#121317]">Simulador</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Matriz Técnica</a></li>
                <li><a href="#flagships" className="hover:text-[#121317]">Documentação</a></li>
                <li><button onClick={() => setShowSpecModal(true)} className="text-[#FF6B00] hover:underline">DESIGN.MD</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-[#121317]">Sobre</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#121317]">Filosofia de Design</a></li>
                <li><a href="#" className="hover:text-[#121317]">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#121317]">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-[#121317]">Gerenciar Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E8EAED] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-[#FF6B00]" />
              <span className="font-medium text-[#121317]">Orbit Mobile Inc.</span>
              <span>• Estética fielmente adaptada de Google Antigravity</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Primária: #FF6B00</span>
              <button
                onClick={() => setShowSpecModal(true)}
                className="text-[#FF6B00] hover:underline font-mono"
              >
                Inspecionar Tokens
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* DESIGN.MD INSPECTOR MODAL                                */}
      {/* ========================================================= */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E8EAED] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EAED] flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                <div>
                  <h3 className="text-base font-semibold text-[#121317]">
                    orbit-mobile-DESIGN.md
                  </h3>
                  <p className="text-xs text-[#5F6368] font-mono">
                    Google Antigravity Symmetrical Purity + Laranja (#FF6B00)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(orbitDesignMdText)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] flex items-center space-x-1.5 transition-colors"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#5F6368]" />}
                  <span>{copiedMd ? 'Copiado!' : 'Copiar .MD'}</span>
                </button>
                <button
                  onClick={() => setShowSpecModal(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 text-[#5F6368] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-6 pt-3 border-b border-[#E8EAED] bg-[#FAF9F6] flex space-x-4">
              <button
                onClick={() => setActiveModalTab('md')}
                className={`pb-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
                  activeModalTab === 'md' ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-transparent text-[#5F6368]'
                }`}
              >
                Arquivo Markdown
              </button>
              <button
                onClick={() => setActiveModalTab('comparison')}
                className={`pb-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
                  activeModalTab === 'comparison' ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-transparent text-[#5F6368]'
                }`}
              >
                Invariantes de Layout
              </button>
              <button
                onClick={() => setActiveModalTab('tokens')}
                className={`pb-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
                  activeModalTab === 'tokens' ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-transparent text-[#5F6368]'
                }`}
              >
                Paleta de Cores
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed bg-white">
              {activeModalTab === 'md' && (
                <pre className="p-4 rounded-2xl bg-[#121317] text-[#FAF9F6] overflow-x-auto whitespace-pre font-mono text-xs leading-5">
                  {orbitDesignMdText}
                </pre>
              )}

              {activeModalTab === 'comparison' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8EAED]">
                    <div className="font-semibold text-sm text-[#121317] mb-1">
                      Por que a versão anterior falhou e como esta corrige:
                    </div>
                    <p className="text-[#5F6368] leading-relaxed">
                      Lojas e ferramentas geradas por IA normalmente usam um modelo padrão de duas colunas (split-screen: texto à esquerda e card à direita). O <strong>Google Antigravity original</strong>, no entanto, é caracterizado por <strong>Simetria Monumental Centralizada</strong>, com um vórtice orbital de partículas, título de 4rem em duas linhas centralizado, e um único botão pílula escultural sem distrações visuais.
                    </p>
                  </div>
                </div>
              )}

              {activeModalTab === 'tokens' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
                  <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                    <div className="h-10 rounded-xl bg-[#FF6B00]" />
                    <div className="font-mono text-xs font-semibold text-[#121317]">#FF6B00</div>
                    <div className="text-[10px] text-[#5F6368]">Primária (Laranja)</div>
                  </div>
                  <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                    <div className="h-10 rounded-xl bg-[#FAF9F6] border border-[#E8EAED]" />
                    <div className="font-mono text-xs font-semibold text-[#121317]">#FAF9F6</div>
                    <div className="text-[10px] text-[#5F6368]">Canvas Quente</div>
                  </div>
                  <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                    <div className="h-10 rounded-xl bg-[#121317]" />
                    <div className="font-mono text-xs font-semibold text-[#121317]">#121317</div>
                    <div className="text-[10px] text-[#5F6368]">Dark Ink</div>
                  </div>
                  <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                    <div className="h-10 rounded-xl bg-[#E8EAED]" />
                    <div className="font-mono text-xs font-semibold text-[#121317]">#E8EAED</div>
                    <div className="text-[10px] text-[#5F6368]">Borda 1px</div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-[#E8EAED] bg-[#FAF9F6] flex justify-end">
              <button
                onClick={() => setShowSpecModal(false)}
                className="px-5 py-2 rounded-full bg-[#121317] hover:bg-black text-white text-xs font-mono transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitMobileLandingPage;
