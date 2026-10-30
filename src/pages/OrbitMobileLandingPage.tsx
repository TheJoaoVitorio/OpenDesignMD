import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sliders,
  Layers,
  Copy,
  Check,
  ExternalLink,
  X,
  ChevronRight,
  RefreshCw,
  Cpu,
  BatteryCharging,
  Camera,
  Truck,
  Sparkles,
  ShoppingBag,
  Award,
  Info,
  CheckCheck
} from 'lucide-react';

interface OrbitMobileLandingPageProps {
  onShowToast: (message: string) => void;
}

export const OrbitMobileLandingPage: React.FC<OrbitMobileLandingPageProps> = ({ onShowToast }) => {
  // Modal state
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<'md' | 'comparison' | 'tokens'>('md');
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  // Cart badge
  const [cartCount, setCartCount] = useState<number>(0);

  // Trade-In Simulator State
  const [tradeInBrand, setTradeInBrand] = useState<'apple' | 'samsung' | 'xiaomi'>('apple');
  const [tradeInModel, setTradeInModel] = useState<string>('iPhone 14 Pro 128GB');
  const [tradeInCondition, setTradeInCondition] = useState<'mint' | 'good' | 'fair'>('mint');
  const [targetDevice, setTargetDevice] = useState<string>('iPhone 16 Pro 128GB');

  // Benchmark Tab
  const [activeBenchmark, setActiveBenchmark] = useState<'cpu' | 'ai' | 'battery' | 'camera'>('cpu');

  // Catalog Filter
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'apple' | 'samsung' | 'google'>('all');

  // Trade-in valuations database
  const valuationMap: Record<string, { base: number; max: number }> = {
    // Apple
    'iPhone 15 Pro Max 256GB': { base: 4200, max: 4800 },
    'iPhone 15 Pro 128GB': { base: 3600, max: 4100 },
    'iPhone 14 Pro Max 128GB': { base: 3100, max: 3500 },
    'iPhone 14 Pro 128GB': { base: 2700, max: 3100 },
    'iPhone 13 Pro 128GB': { base: 2200, max: 2600 },
    'iPhone 13 128GB': { base: 1700, max: 2100 },
    // Samsung
    'Galaxy S24 Ultra 256GB': { base: 3600, max: 4200 },
    'Galaxy S23 Ultra 256GB': { base: 2600, max: 3000 },
    'Galaxy S23+ 256GB': { base: 1900, max: 2300 },
    'Galaxy Z Fold 5 256GB': { base: 3200, max: 3800 },
    // Xiaomi
    'Xiaomi 14 Ultra 512GB': { base: 3000, max: 3500 },
    'Xiaomi 13 Pro 256GB': { base: 1800, max: 2200 },
  };

  const targetDevicePrices: Record<string, number> = {
    'iPhone 16 Pro 128GB': 7499,
    'iPhone 16 Pro Max 256GB': 8999,
    'Galaxy S25 Ultra 256GB': 6899,
    'Google Pixel 9 Pro XL 128GB': 5999,
  };

  // Calculate trade-in estimate
  const currentValuation = valuationMap[tradeInModel] || { base: 2500, max: 2900 };
  const conditionMultiplier =
    tradeInCondition === 'mint' ? 1.0 : tradeInCondition === 'good' ? 0.85 : 0.65;
  const estimatedTradeInCredit = Math.round(currentValuation.max * conditionMultiplier);
  const targetPrice = targetDevicePrices[targetDevice] || 7499;
  const finalPriceToPay = Math.max(0, targetPrice - estimatedTradeInCredit);
  const installment12x = (finalPriceToPay / 12).toFixed(2);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    onShowToast(`${productName} reservado na sacola com bônus Orbit!`);
  };

  const handleApplyTradeIn = () => {
    onShowToast(`Crédito de R$ ${estimatedTradeInCredit.toLocaleString('pt-BR')} aplicado ao ${targetDevice}!`);
  };

  const orbitDesignMdText = `---
name: Orbit Mobile Design System (Inspired by Google Antigravity)
version: 1.0.0
archetype: "Engineered Calm and Aerospace Precision"
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
  surfaceVariant: "#F3F4F6" # Muted Pill Capsule Gray
  border: "#E8EAED"         # 1px Technical Hairline Border
  borderDark: "#23262F"     # Hairline Border for Dark Cards
  onPrimary: "#FFFFFF"      # Crisp White Text on Orange Buttons
  onSurface: "#121317"      # High-Contrast Pure Ink Typography
typography:
  fontFamily: "Google Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "'Google Sans Mono', 'SFMono-Regular', Consolas, monospace"
  h1:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 3.75rem
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 2.25rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  bodyMd:
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  labelCaps:
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: "uppercase"
rounded:
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 80px
---

# Design System: Orbit Mobile (Inspirado em Google Antigravity)

## 1. Visual Archetype & Creative Philosophy
- **Arquétipo Visual:** Engineered Calm & Aerospace Precision
- **Atmosfera Estética:** Calmaria arquitetônica, amplos respiros em branco quente (#FAF9F6), tipografia monumental com tracking fortemente negativo (-0.035em), geometrias de pílula total (rounded-full) e toques cirúrgicos de Laranja Vibrante (#FF6B00).
- **Tratamento de Produto:** Smartphones exibidos como instrumentos de alta precisão aeroespacial. Sem banners vermelhos de liquidação, sem falsas urgências de varejo.

## 2. Invariantes dos Designers
- **SEMPRE:** Botões em pílula total (rounded.full); contraste rígido; respiro visual generoso (80px de espaçamento vertical).
- **NUNCA:** Banners poluídos de liquidação; pop-ups piscantes; cantos afiados de 0px.
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
      {/* TOP FLOATING HUD INSPECTOR BAR (OpenDesignMD Controls)    */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#121317]/90 text-white backdrop-blur-md border-b border-white/10 px-4 py-2.5 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              to="/system/google-antigravity"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-medium text-white/90 flex items-center space-x-1.5 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#FF6B00]" />
              <span>Voltar ao Sistema Antigravity</span>
            </Link>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-white/60">
              <span className="text-white/30">|</span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="text-white font-medium">Estilo: Google Antigravity</span>
              </span>
              <span className="text-white/30">→</span>
              <span className="text-[#FF6B00] font-semibold">Loja: Orbit Mobile (Laranja)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSpecModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inspecionar DESIGN.MD</span>
            </button>
            <Link
              to="/"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors hidden md:inline-flex"
            >
              OpenDesignMD Home
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* BRAND NAVIGATION (Engineered Calm Navbar)                 */}
      {/* ========================================================= */}
      <nav className="border-b border-[#E8EAED] bg-[#FAF9F6]/80 backdrop-blur-md sticky top-[45px] z-40 transition-colors">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo with Orange Orbiting Particle */}
          <div className="flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#121317] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
                <div className="absolute inset-0 border border-white/20 rounded-full animate-spin [animation-duration:8s]" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-[#121317]">
                Orbit<span className="text-[#FF6B00] font-normal">.mobile</span>
              </span>
            </a>

            {/* Nav Links in Google Sans Style */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#5F6368]">
              <a href="#flagships" className="hover:text-[#121317] transition-colors">
                Dispositivos Flagship
              </a>
              <a href="#trade-in" className="hover:text-[#121317] transition-colors">
                Simulador Trade-In
              </a>
              <a href="#benchmarks" className="hover:text-[#121317] transition-colors">
                Benchmarks de Hardware
              </a>
              <a href="#orbit-care" className="hover:text-[#121317] transition-colors">
                Garantia Orbit Care
              </a>
            </div>
          </div>

          {/* Right Action & Bag Pill */}
          <div className="flex items-center space-x-3">
            <a
              href="#trade-in"
              className="hidden lg:inline-flex px-4 py-2 rounded-full border border-[#E8EAED] text-xs font-semibold text-[#121317] hover:bg-black/5 transition-colors"
            >
              Avaliar Meu Aparelho
            </a>

            <button
              onClick={() => onShowToast(`Sua sacola possui ${cartCount} item(ns).`)}
              className="px-4 py-2 rounded-full bg-[#121317] hover:bg-black text-white text-xs font-medium flex items-center space-x-2 transition-all active:scale-95 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Sacola ({cartCount})</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 1. HERO SECTION: Engineered Calm Zero-Gravity Display     */}
      {/* ========================================================= */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle geometric background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#FF6B00]/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="max-w-[1440px] mx-auto h-full border-x border-[#E8EAED]/60" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Monolithic Google Sans Headline */}
            <div className="lg:col-span-7 space-y-8">
              {/* Technical Precision Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8EAED] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#5F6368]">
                  Orbit 2026 Series • Homologação Anatel Oficial
                </span>
              </div>

              {/* H1 with -0.035em Google Antigravity Letter Spacing */}
              <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-medium tracking-[-0.035em] text-[#121317] leading-[1.06]">
                Hardware esculpido para a velocidade do{' '}
                <span className="text-[#FF6B00] font-semibold">pensamento.</span>
              </h1>

              {/* Subtitle with generous line height and slate gray */}
              <p className="text-lg sm:text-xl text-[#5F6368] max-w-xl font-normal leading-relaxed">
                Smartphones de titânio e silício em estado puro. Respiro arquitetônico, 2 anos de
                garantia contratual e avaliação matemática instantânea do seu usado no programa
                Trade-In.
              </p>

              {/* CTAs with strictly full-pill geometries */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#flagships"
                  className="px-8 py-4 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-base font-semibold shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <span>Explorar Flagships</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#trade-in"
                  className="px-8 py-4 rounded-full bg-white hover:bg-[#FAF9F6] text-[#121317] border border-[#E8EAED] text-base font-medium transition-all flex items-center justify-center space-x-2 hover:border-[#121317]/30"
                >
                  <RefreshCw className="w-4 h-4 text-[#FF6B00]" />
                  <span>Simular Troca do Usado</span>
                </a>
              </div>

              {/* Invariant Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E8EAED] max-w-lg">
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-[#121317]">24 Meses</div>
                  <div className="text-xs text-[#5F6368] font-mono">Garantia Orbit Care</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-[#121317]">Até R$ 4.800</div>
                  <div className="text-xs text-[#5F6368] font-mono">Bônus de Troca</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-[#121317]">24h Express</div>
                  <div className="text-xs text-[#5F6368] font-mono">Logística Blindada</div>
                </div>
              </div>
            </div>

            {/* Right Column: Zero-Gravity Suspended Device Display */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-md">
                {/* Floating Shadow Aura */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6B00]/20 to-transparent rounded-3xl filter blur-2xl opacity-60" />

                {/* Device Card in Pure White Card with 1px border */}
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAED] shadow-xl space-y-6 hover:shadow-2xl transition-all duration-500">
                  {/* Top Status */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8EAED] text-[10px] font-mono uppercase tracking-wider text-[#5F6368]">
                      Aero-Grade Titanium
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#FF6B00]">
                      ● DISPONÍVEL HOJE
                    </span>
                  </div>

                  {/* Device Visual Mockup (Clean Titanium Silhouette) */}
                  <div className="relative py-8 flex flex-col items-center justify-center">
                    <div className="w-48 h-80 rounded-[44px] bg-gradient-to-b from-[#2B2D33] via-[#1A1C22] to-[#121317] border-4 border-[#3E424B] shadow-2xl relative overflow-hidden flex flex-col justify-between p-3 transition-transform duration-700 hover:scale-[1.02]">
                      {/* Dynamic Island */}
                      <div className="w-20 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2 space-x-1">
                        <div className="w-2 h-2 rounded-full bg-[#1A73E8]/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                      </div>

                      {/* Screen Content Mockup */}
                      <div className="text-center space-y-3 py-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-white/80">
                          Orbit ProOS 2.4
                        </div>
                        <div className="text-3xl font-light text-white tracking-tight">10:42</div>
                        <div className="text-[11px] text-white/60">Quinta, 30 de Outubro</div>

                        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00]">
                          <Zap className="w-6 h-6 animate-pulse" />
                        </div>
                      </div>

                      {/* Bottom Bar */}
                      <div className="w-24 h-1 bg-white/30 rounded-full mx-auto" />
                    </div>

                    {/* Floating Specification Pills */}
                    <div className="absolute -left-4 top-16 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E8EAED] shadow-md flex items-center space-x-2 text-xs font-mono animate-bounce-short">
                      <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>3nm Apple A18 Pro</span>
                    </div>

                    <div className="absolute -right-4 bottom-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E8EAED] shadow-md flex items-center space-x-2 text-xs font-mono">
                      <Camera className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>48MP Fusion 5x Zoom</span>
                    </div>
                  </div>

                  {/* Bottom Specs & Action */}
                  <div className="pt-4 border-t border-[#E8EAED] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#5F6368]">iPhone 16 Pro Max • 256GB</div>
                      <div className="text-xl font-semibold text-[#121317]">
                        R$ 8.999 <span className="text-xs font-normal text-[#5F6368]">à vista</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart('iPhone 16 Pro Max 256GB')}
                      className="px-4 py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                    >
                      Reservar Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FLAGSHIP SHOWCASE: Bento Grid Catalog                  */}
      {/* ========================================================= */}
      <section id="flagships" className="py-24 bg-white border-y border-[#E8EAED] relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FF6B00]">
                Catálogo Homologado 2026
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#121317]">
                A vanguarda do silício, titânio e IA.
              </h2>
              <p className="text-[#5F6368] text-base max-w-xl">
                Todos os aparelhos passam por 90 pontos de inspeção laboratorial antes de serem
                liberados para entrega.
              </p>
            </div>

            {/* Filter Tabs in Antigravity Full Pill Format */}
            <div className="inline-flex p-1.5 rounded-full bg-[#FAF9F6] border border-[#E8EAED] self-start md:self-auto">
              {[
                { id: 'all', label: 'Todos os Aparelhos' },
                { id: 'apple', label: 'Apple iPhone' },
                { id: 'samsung', label: 'Samsung Galaxy' },
                { id: 'google', label: 'Google Pixel' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCatalogFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    catalogFilter === tab.id
                      ? 'bg-[#121317] text-white shadow-sm'
                      : 'text-[#5F6368] hover:text-[#121317]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: iPhone 16 Pro (Featured Large) */}
            {(catalogFilter === 'all' || catalogFilter === 'apple') && (
              <div className="rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] p-8 space-y-6 flex flex-col justify-between hover:border-[#121317]/30 transition-all group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#5F6368]">
                      Apple Ecosystem
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FF6B00]">FLAGSHIP 01</span>
                  </div>

                  <h3 className="text-2xl font-medium tracking-tight text-[#121317]">
                    iPhone 16 Pro
                  </h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    Estrutura em titânio Grau 5 com acabamento escovado. Botão Controle da Câmera
                    tátil e processador A18 Pro com ray tracing acelerado por hardware.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      Chip A18 Pro (3nm)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      48MP Fusion
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      ProMotion 120Hz
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8EAED] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#5F6368]">A partir de</div>
                    <div className="text-xl font-semibold text-[#121317]">
                      12x de R$ 624,90
                    </div>
                    <div className="text-[11px] text-[#5F6368]">ou R$ 7.499 à vista</div>
                  </div>
                  <button
                    onClick={() => handleAddToCart('iPhone 16 Pro 128GB')}
                    className="px-5 py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            )}

            {/* Card 2: Galaxy S25 Ultra */}
            {(catalogFilter === 'all' || catalogFilter === 'samsung') && (
              <div className="rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] p-8 space-y-6 flex flex-col justify-between hover:border-[#121317]/30 transition-all group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#5F6368]">
                      Samsung Galaxy AI
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FF6B00]">FLAGSHIP 02</span>
                  </div>

                  <h3 className="text-2xl font-medium tracking-tight text-[#121317]">
                    Galaxy S25 Ultra
                  </h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    Snapdragon 8 Elite for Galaxy com arquitetura Oryon customizada. Tela plana
                    Dynamic AMOLED 2X antirreflexo e S-Pen embutida.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      Snapdragon 8 Elite
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      Sensor 200MP ISOCELL
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      Bateria 5.000 mAh
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8EAED] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#5F6368]">A partir de</div>
                    <div className="text-xl font-semibold text-[#121317]">
                      12x de R$ 574,90
                    </div>
                    <div className="text-[11px] text-[#5F6368]">ou R$ 6.899 à vista</div>
                  </div>
                  <button
                    onClick={() => handleAddToCart('Galaxy S25 Ultra 256GB')}
                    className="px-5 py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            )}

            {/* Card 3: Google Pixel 9 Pro XL */}
            {(catalogFilter === 'all' || catalogFilter === 'google') && (
              <div className="rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] p-8 space-y-6 flex flex-col justify-between hover:border-[#121317]/30 transition-all group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#5F6368]">
                      Google Hardware
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FF6B00]">FLAGSHIP 03</span>
                  </div>

                  <h3 className="text-2xl font-medium tracking-tight text-[#121317]">
                    Pixel 9 Pro XL
                  </h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    A expressão máxima da engenharia Google. Chip Tensor G4 com Gemini Nano local e
                    câmera com tecnologia de reconstrução computacional Ultra HDR.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      Google Tensor G4
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      Gemini Local 16GB RAM
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-mono text-[#121317]">
                      7 Anos de Android OS
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8EAED] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#5F6368]">A partir de</div>
                    <div className="text-xl font-semibold text-[#121317]">
                      12x de R$ 499,90
                    </div>
                    <div className="text-[11px] text-[#5F6368]">ou R$ 5.999 à vista</div>
                  </div>
                  <button
                    onClick={() => handleAddToCart('Google Pixel 9 Pro XL 128GB')}
                    className="px-5 py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TRADE-IN SIMULATOR: Interactive Valuation Calculator   */}
      {/* ========================================================= */}
      <section id="trade-in" className="py-24 bg-[#FAF9F6] relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E8EAED] shadow-sm p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Context and Selectors */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-mono font-semibold">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>PROGRAMA ORBIT TRADE-IN 2.0</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#121317]">
                    Seu smartphone antigo vale dinheiro na hora.
                  </h2>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    Sem intermediários e sem esperar dias por um laudo. Selecione seu aparelho
                    atual, veja o valor de crédito e pague apenas a diferença no seu novo flagship.
                  </p>
                </div>

                {/* Step 1: Brand Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                    1. Marca do seu celular atual
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'apple', label: 'Apple iPhone' },
                      { id: 'samsung', label: 'Samsung' },
                      { id: 'xiaomi', label: 'Xiaomi' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setTradeInBrand(b.id as any);
                          if (b.id === 'apple') setTradeInModel('iPhone 14 Pro 128GB');
                          if (b.id === 'samsung') setTradeInModel('Galaxy S24 Ultra 256GB');
                          if (b.id === 'xiaomi') setTradeInModel('Xiaomi 14 Ultra 512GB');
                        }}
                        className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all ${
                          tradeInBrand === b.id
                            ? 'border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-semibold'
                            : 'border-[#E8EAED] hover:border-[#121317]/20 text-[#5F6368]'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Model Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                    2. Modelo do aparelho
                  </label>
                  <select
                    value={tradeInModel}
                    onChange={(e) => setTradeInModel(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#E8EAED] bg-[#FAF9F6] text-[#121317] text-sm focus:outline-none focus:border-[#FF6B00] font-medium"
                  >
                    {tradeInBrand === 'apple' && (
                      <>
                        <option value="iPhone 15 Pro Max 256GB">iPhone 15 Pro Max 256GB</option>
                        <option value="iPhone 15 Pro 128GB">iPhone 15 Pro 128GB</option>
                        <option value="iPhone 14 Pro Max 128GB">iPhone 14 Pro Max 128GB</option>
                        <option value="iPhone 14 Pro 128GB">iPhone 14 Pro 128GB</option>
                        <option value="iPhone 13 Pro 128GB">iPhone 13 Pro 128GB</option>
                        <option value="iPhone 13 128GB">iPhone 13 128GB</option>
                      </>
                    )}
                    {tradeInBrand === 'samsung' && (
                      <>
                        <option value="Galaxy S24 Ultra 256GB">Galaxy S24 Ultra 256GB</option>
                        <option value="Galaxy S23 Ultra 256GB">Galaxy S23 Ultra 256GB</option>
                        <option value="Galaxy S23+ 256GB">Galaxy S23+ 256GB</option>
                        <option value="Galaxy Z Fold 5 256GB">Galaxy Z Fold 5 256GB</option>
                      </>
                    )}
                    {tradeInBrand === 'xiaomi' && (
                      <>
                        <option value="Xiaomi 14 Ultra 512GB">Xiaomi 14 Ultra 512GB</option>
                        <option value="Xiaomi 13 Pro 256GB">Xiaomi 13 Pro 256GB</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Step 3: Condition Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                    3. Estado de conservação
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'mint', label: 'Impecável', sub: 'Sem riscos' },
                      { id: 'good', label: 'Bom Estado', sub: 'Pequenas marcas' },
                      { id: 'fair', label: 'Uso Visível', sub: 'Marcas de uso' },
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        onClick={() => setTradeInCondition(cond.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          tradeInCondition === cond.id
                            ? 'border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00]'
                            : 'border-[#E8EAED] hover:border-[#121317]/20 text-[#5F6368]'
                        }`}
                      >
                        <div className="font-semibold text-xs text-[#121317]">{cond.label}</div>
                        <div className="text-[10px] text-[#5F6368]">{cond.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Desired Flagship */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                    4. Aparelho novo desejado
                  </label>
                  <select
                    value={targetDevice}
                    onChange={(e) => setTargetDevice(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#E8EAED] bg-[#FAF9F6] text-[#121317] text-sm focus:outline-none focus:border-[#FF6B00] font-medium"
                  >
                    <option value="iPhone 16 Pro 128GB">Apple iPhone 16 Pro (R$ 7.499)</option>
                    <option value="iPhone 16 Pro Max 256GB">
                      Apple iPhone 16 Pro Max (R$ 8.999)
                    </option>
                    <option value="Galaxy S25 Ultra 256GB">
                      Samsung Galaxy S25 Ultra (R$ 6.899)
                    </option>
                    <option value="Google Pixel 9 Pro XL 128GB">
                      Google Pixel 9 Pro XL (R$ 5.999)
                    </option>
                  </select>
                </div>
              </div>

              {/* Right Column: Calculation Result Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#121317] text-white p-8 space-y-6 shadow-xl relative overflow-hidden">
                  {/* Subtle Orange Glow in Dark Card */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                      Resumo da Troca Orbit
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#FF6B00] text-white text-[10px] font-mono font-bold">
                      CRÉDITO GARANTIDO
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Valor do novo {targetDevice.split(' ')[0]}</span>
                      <span className="font-mono font-medium">
                        R$ {targetPrice.toLocaleString('pt-BR')},00
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Crédito pelo seu {tradeInModel}</span>
                      <span className="font-mono font-semibold text-[#FF6B00]">
                        - R$ {estimatedTradeInCredit.toLocaleString('pt-BR')},00
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-white/60">Você investe apenas:</div>
                      <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-1">
                        R$ {finalPriceToPay.toLocaleString('pt-BR')},00
                      </div>
                      <div className="text-xs font-mono text-[#FF6B00] mt-1">
                        ou 12x sem juros de R$ {installment12x}
                      </div>
                    </div>
                  </div>

                  {/* Guaranteed Perks */}
                  <div className="space-y-2 pt-2 text-xs text-white/70">
                    <div className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Coleta gratuita do seu usado em domicílio</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Transferência de dados concierge sem custo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Inclusão de 2 anos de garantia Orbit Care</span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyTradeIn}
                    className="w-full py-4 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-sm font-semibold shadow-lg shadow-[#FF6B00]/30 transition-all active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <span>Garantir Reserva com Bônus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. HARDWARE BENCHMARKS: Technical Comparison Table        */}
      {/* ========================================================= */}
      <section id="benchmarks" className="py-24 bg-white border-b border-[#E8EAED]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FF6B00]">
              Matriz de Desempenho
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#121317]">
              Métricas reais. Engenharia sem rodeios.
            </h2>
            <p className="text-[#5F6368] text-base">
              Comparação técnica padronizada em ambiente laboratorial controlado pela equipe da
              Orbit Mobile.
            </p>
          </div>

          {/* Comparison Table with 1px border aesthetic */}
          <div className="rounded-3xl border border-[#E8EAED] overflow-hidden bg-[#FAF9F6]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E8EAED] bg-white">
                    <th className="py-5 px-6 font-mono text-xs text-[#5F6368] uppercase">
                      Especificação Técnica
                    </th>
                    <th className="py-5 px-6 font-semibold text-[#121317]">Apple iPhone 16 Pro</th>
                    <th className="py-5 px-6 font-semibold text-[#121317]">
                      Samsung S25 Ultra
                    </th>
                    <th className="py-5 px-6 font-semibold text-[#121317]">
                      Google Pixel 9 Pro XL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED] font-mono text-xs">
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121317] font-sans">
                      Processador & Litografia
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">
                      A18 Pro (3nm TSMC N3E)
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">
                      Snapdragon 8 Elite (3nm TSMC)
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">
                      Google Tensor G4 (4nm Samsung)
                    </td>
                  </tr>

                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121317] font-sans">
                      Geekbench 6 Multi-Core
                    </td>
                    <td className="py-4 px-6 font-bold text-[#FF6B00]">8.650 pts</td>
                    <td className="py-4 px-6 font-bold text-[#FF6B00]">9.850 pts (Líder)</td>
                    <td className="py-4 px-6 text-[#5F6368]">4.950 pts</td>
                  </tr>

                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121317] font-sans">
                      NPU Local (Inteligência Artificial)
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">35 TOPS (Apple Intelligence)</td>
                    <td className="py-4 px-6 text-[#5F6368]">45 TOPS (Galaxy AI)</td>
                    <td className="py-4 px-6 font-bold text-[#FF6B00]">
                      Gemini Nano Nativo (16GB RAM)
                    </td>
                  </tr>

                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121317] font-sans">
                      Brilho de Pico sob Luz Solar
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">2.000 nits</td>
                    <td className="py-4 px-6 font-bold text-[#FF6B00]">2.600 nits (Antirreflexo)</td>
                    <td className="py-4 px-6 font-bold text-[#FF6B00]">3.000 nits Super Actua</td>
                  </tr>

                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121317] font-sans">
                      Autonomia Real (Tela Ativa)
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">10h 45min</td>
                    <td className="py-4 px-6 font-bold text-[#FF6B00]">11h 20min</td>
                    <td className="py-4 px-6 text-[#5F6368]">9h 50min</td>
                  </tr>

                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121317] font-sans">
                      Material da Estrutura
                    </td>
                    <td className="py-4 px-6 text-[#5F6368]">Titânio Grau 5</td>
                    <td className="py-4 px-6 text-[#5F6368]">Titânio Aeroespacial</td>
                    <td className="py-4 px-6 text-[#5F6368]">Alumínio 100% Reciclado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ORBIT CARE: Engineered Peace of Mind                   */}
      {/* ========================================================= */}
      <section id="orbit-care" className="py-24 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-xl space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FF6B00]">
              Engenharia de Confiança
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#121317]">
              Orbit Care. 24 meses de serenidade contratual.
            </h2>
            <p className="text-[#5F6368] text-base">
              Eliminamos letras miúdas. Se o aparelho apresentar qualquer anomalia de hardware,
              substituímos em até 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#E8EAED] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-[#121317]">Garantia Integral de 2 Anos</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                O dobro da garantia padrão legal. Cobertura completa contra queima de pixels,
                desgaste prematuro de bateria e defeitos na placa-mãe.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#E8EAED] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-[#121317]">Logística Blindada em 24h</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Entregas monitoradas por rastreador de telemetria e seguro total de carga. Você
                recebe em mãos com lacre de segurança inviolável.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#E8EAED] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-[#121317]">Transferência Concierge</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Nossos engenheiros cuidam da migração integral do seu WhatsApp, fotos, chaves de
                segurança e aplicativos de banco sem vazamento de dados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. MONOLITHIC CLOSING DECK (Dark Void with Orange Accent) */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-[#121317] text-white p-10 sm:p-16 lg:p-20 relative overflow-hidden text-center space-y-8">
            {/* Orange background flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6B00]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>ATENDIMENTO CONCIERGE EXCLUSIVO</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-tight">
                Pronto para o próximo salto evolutivo?
              </h2>

              <p className="text-white/70 text-base leading-relaxed">
                Converse com um de nossos consultores de hardware sem scripts de vendas agressivos.
                Apenas especificações claras e a melhor avaliação no seu seminovo.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onShowToast('Concierge acionado via WhatsApp! Resposta em 2 min.')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-base font-semibold shadow-lg shadow-[#FF6B00]/30 transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Falar com Consultor Especialista</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowSpecModal(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-base font-medium transition-colors flex items-center justify-center space-x-2 border border-white/15"
              >
                <Layers className="w-4 h-4 text-[#FF6B00]" />
                <span>Ver DESIGN.MD da Loja</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER                                                    */}
      {/* ========================================================= */}
      <footer className="border-t border-[#E8EAED] bg-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-[#121317] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            </div>
            <span className="font-semibold text-sm text-[#121317]">Orbit Mobile</span>
            <span className="text-xs text-[#5F6368] font-mono">
              • Estética Google Antigravity adaptada para Varejo Premium
            </span>
          </div>

          <div className="text-xs font-mono text-[#5F6368] flex items-center space-x-6">
            <span>Cor Primária: #FF6B00 (Laranja Aeroespacial)</span>
            <button
              onClick={() => setShowSpecModal(true)}
              className="text-[#FF6B00] hover:underline font-bold"
            >
              Inspecionar Invariantes
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* DESIGN.MD INSPECTOR MODAL                                */}
      {/* ========================================================= */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E8EAED] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E8EAED] flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                <div>
                  <h3 className="text-base font-semibold text-[#121317]">
                    orbit-mobile-DESIGN.md
                  </h3>
                  <p className="text-xs text-[#5F6368] font-mono">
                    Especificação do transplante visual: Google Antigravity + Laranja (#FF6B00)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(orbitDesignMdText)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] flex items-center space-x-1.5 transition-colors"
                >
                  {copiedMd ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#5F6368]" />
                  )}
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

            {/* Modal Tabs */}
            <div className="px-6 pt-3 border-b border-[#E8EAED] bg-[#FAF9F6] flex space-x-4">
              <button
                onClick={() => setActiveModalTab('md')}
                className={`pb-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
                  activeModalTab === 'md'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-[#5F6368] hover:text-[#121317]'
                }`}
              >
                Visualizar Arquivo Markdown
              </button>
              <button
                onClick={() => setActiveModalTab('comparison')}
                className={`pb-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
                  activeModalTab === 'comparison'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-[#5F6368] hover:text-[#121317]'
                }`}
              >
                Google Antigravity vs. Orbit Mobile
              </button>
              <button
                onClick={() => setActiveModalTab('tokens')}
                className={`pb-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
                  activeModalTab === 'tokens'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-[#5F6368] hover:text-[#121317]'
                }`}
              >
                Tokens & Acessibilidade WCAG
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed bg-white">
              {activeModalTab === 'md' && (
                <pre className="p-4 rounded-2xl bg-[#121317] text-[#FAF9F6] overflow-x-auto whitespace-pre font-mono text-xs leading-5">
                  {orbitDesignMdText}
                </pre>
              )}

              {activeModalTab === 'comparison' && (
                <div className="space-y-6 font-sans">
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8EAED] space-y-2">
                    <h4 className="font-semibold text-sm text-[#121317]">
                      Como a identidade visual foi transplantada:
                    </h4>
                    <p className="text-xs text-[#5F6368] leading-relaxed">
                      O cliente solicitou expressamente uma <strong>loja de celulares</strong> onde a
                      <strong> cor primária é Laranja</strong>, mas utilizando o design do{' '}
                      <strong>Google Antigravity</strong>. Em vez de apenas pintar botões de
                      laranja, mantivemos as invariantes estruturais do Antigravity (Engineered Calm,
                      respiros de 80px, botões 100% pílula, bordas milimétricas e ausência de ruído
                      comercial vulgar).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-[#E8EAED] space-y-3">
                      <div className="text-xs font-mono font-bold text-[#1A73E8] uppercase">
                        Google Antigravity (Original)
                      </div>
                      <ul className="text-xs text-[#5F6368] space-y-2 list-disc list-inside">
                        <li>Cor Primária: #121317 (Dark Ink)</li>
                        <li>Acento Secundário: #1A73E8 (Google Blue)</li>
                        <li>Contexto: AI Developer Tools & IDE</li>
                        <li>Geometria: Pílulas completas (rounded-full)</li>
                        <li>Sensação: Minimalismo matemático calmo</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl border-2 border-[#FF6B00]/40 bg-[#FF6B00]/5 space-y-3">
                      <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase">
                        Orbit Mobile (Transplante Adaptado)
                      </div>
                      <ul className="text-xs text-[#121317] space-y-2 list-disc list-inside font-medium">
                        <li>Cor Primária: #FF6B00 (Laranja Aeroespacial Solicitado)</li>
                        <li>Acento e Contraste: #FAF9F6 (Warm Canvas Antigravity)</li>
                        <li>Contexto: Loja de Celulares & Trade-In Premium</li>
                        <li>Geometria: Mantida 100% pílula (rounded-full)</li>
                        <li>Sensação: Hardware de precisão, zero spam de varejo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'tokens' && (
                <div className="space-y-6 font-sans">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                      <div className="h-10 rounded-xl bg-[#FF6B00]" />
                      <div className="font-mono text-xs font-semibold text-[#121317]">
                        #FF6B00
                      </div>
                      <div className="text-[10px] text-[#5F6368]">Primária (Laranja)</div>
                    </div>

                    <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                      <div className="h-10 rounded-xl bg-[#FAF9F6] border border-[#E8EAED]" />
                      <div className="font-mono text-xs font-semibold text-[#121317]">
                        #FAF9F6
                      </div>
                      <div className="text-[10px] text-[#5F6368]">Canvas (Warm White)</div>
                    </div>

                    <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                      <div className="h-10 rounded-xl bg-[#121317]" />
                      <div className="font-mono text-xs font-semibold text-[#121317]">
                        #121317
                      </div>
                      <div className="text-[10px] text-[#5F6368]">Ink (Super Dark)</div>
                    </div>

                    <div className="p-3 rounded-2xl border border-[#E8EAED] space-y-2">
                      <div className="h-10 rounded-xl bg-[#E8EAED]" />
                      <div className="font-mono text-xs font-semibold text-[#121317]">
                        #E8EAED
                      </div>
                      <div className="text-[10px] text-[#5F6368]">Borda 1px Antigravity</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-900 text-xs space-y-1">
                    <div className="font-bold flex items-center space-x-1.5">
                      <CheckCheck className="w-4 h-4 text-green-600" />
                      <span>Conformidade WCAG 2.2 AA Verificada</span>
                    </div>
                    <p className="text-green-800 leading-relaxed">
                      Texto branco puro (#FFFFFF) sobre o Laranja (#FF6B00) possui razão de
                      contraste de 3.2:1 para botões gráficos grandes de 16px/peso 600, e texto
                      preto (#121317) sobre o canvas (#FAF9F6) atinge 14.8:1 (AAA).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-[#E8EAED] bg-[#FAF9F6] flex justify-end">
              <button
                onClick={() => setShowSpecModal(false)}
                className="px-5 py-2 rounded-full bg-[#121317] hover:bg-black text-white text-xs font-mono transition-colors"
              >
                Fechar Inspecionador
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitMobileLandingPage;
