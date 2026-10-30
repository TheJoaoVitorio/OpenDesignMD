import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageCircle,
  TrendingUp,
  Activity,
  Heart,
  ShieldCheck,
  FileText,
  Clock,
  Users,
  Copy,
  Download,
  Check,
  ChevronRight,
  ExternalLink,
  Code2,
  Zap,
  Sliders,
  X,
  Layers,
  Leaf
} from 'lucide-react';

interface NutriFluiLandingPageProps {
  onShowToast: (message: string) => void;
}

export const NutriFluiLandingPage: React.FC<NutriFluiLandingPageProps> = ({ onShowToast }) => {
  // Simulator state: weekly patients count
  const [patientsCount, setPatientsCount] = useState<number>(25);

  // Inspector modal state
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<'md' | 'comparison' | 'tokens'>('md');
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  // Form state in hero
  const [trialEmail, setTrialEmail] = useState<string>('');

  // Calculations
  const hoursSavedPerMonth = Math.round(patientsCount * 2.2);
  const revenuePotential = Math.round(patientsCount * 140);

  const nutrifluiDesignMdContent = `---
name: NutriFlui Design System (Inspired by AbacatePay)
version: 1.0.0
archetype: "Playful Neo-Organic & Tactile High-Contrast"
colors:
  primary: "#1F4647"      # Deep Pine / Avocado Botanical Ink
  secondary: "#486E6F"    # Muted botanical slate
  tertiary: "#9EEA6C"     # Electric Lime / High-Contrast CTA
  neutral: "#F7FAF6"      # Fresh organic canvas
  surface: "#FFFFFF"      # Crisp white elevated cards
typography:
  fontFamily: "Inter, system-ui, sans-serif"
  h1:
    fontSize: 3.25rem
    letterSpacing: "-0.025em"
  h2:
    fontSize: 2.25rem
    letterSpacing: "-0.02em"
rounded:
  sm: 6px
  md: 12px
  lg: 32px
  full: 9999px
---

# Design System: NutriFlui

> Transplante de DNA visual baseado na arquitetura estética e disciplina de **AbacatePay**, adaptado para o ecossistema de saúde e nutrição de alta performance.

## 1. Visual Archetype & Creative Philosophy
- **Arquétipo:** Playful Neo-Organic & Tactile High-Contrast
- **Atmosfera Visual:** Vitalidade botânica, autoridade clínica e extrema simpatia combinando verde pinho profundo (#1F4647), toques de verde lima elétrico (#9EEA6C) e pílulas arredondadas.

## 2. Spatial Rhythm & Information Density
- **Densidade:** BALANCED
- **Estratégia de Respiro:** Espaçamento orgânico generoso (32px-48px) entre seções e cartões.
- **Largura Máxima:** 1280px

## 3. Section Blueprints
1. **Hero Section:** Split assimétrico com CTA em pílula de alto contraste e chips flutuantes de notificações em tempo real.
2. **Feature Showcase:** Bento Grid orgânico alternando superfícies brancas com decks escuros em #1F4647.
3. **Interactive Simulator:** Calculadora tátil com slider e feedback numérico instantâneo.
4. **Social Proof:** Ticker e billboard de confiança com contadores de pacientes e avaliações.
5. **CTA Deck:** Convite imersivo em verde escuro maciço com botão verde lima e garantia zero fricção.

## 4. Invariantes dos Designers
- **SEMPRE:** Botões de ação primária em pílula (rounded-full); contraste rigoroso entre #1F4647 e #9EEA6C; cantos de cards em 32px+.
- **NUNCA:** Cantos quadrados (0px); cinzas hospitalares frios; tabelas rígidas sem respiro; pop-ups agressivos.`;

  const handleCopyMd = () => {
    navigator.clipboard.writeText(nutrifluiDesignMdContent);
    setCopiedMd(true);
    onShowToast('DESIGN.MD da NutriFlui copiado com sucesso!');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([nutrifluiDesignMdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'nutriflui-DESIGN.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Download concluído: nutriflui-DESIGN.md');
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trialEmail.trim()) {
      onShowToast(`🎉 Bem-vindo à NutriFlui! Teste ativado para ${trialEmail}`);
      setTrialEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF6] text-[#1F4647] font-sans antialiased selection:bg-[#9EEA6C] selection:text-[#1F4647]">
      {/* 1. TOP EXPERIMENT INSPECTOR BAR (OpenDesignMD Engine HUD) */}
      <div className="bg-[#1F4647] text-white border-b border-[#2B5E5F] sticky top-0 z-50 shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#9EEA6C] animate-ping" />
            <span className="font-mono font-bold text-[#9EEA6C] uppercase tracking-wider text-[11px]">
              OpenDesignMD Live Test
            </span>
            <span className="opacity-40">•</span>
            <span className="text-white/80">
              DNA Transplante: <strong className="text-white underline decoration-[#9EEA6C] decoration-2">AbacatePay</strong> → <strong className="text-[#9EEA6C]">NutriFlui</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSpecModal(true)}
              className="px-3 py-1 rounded-full bg-[#9EEA6C] text-[#1F4647] font-medium hover:bg-[#8CD85A] transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspecionar DESIGN.MD</span>
            </button>

            <Link
              to="/system/abacatepay"
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center space-x-1"
            >
              <span>Ver AbacatePay Original</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>

            <Link
              to="/explore"
              className="px-3 py-1 rounded-full bg-black/20 hover:bg-black/30 text-white/80 hover:text-white transition-colors"
            >
              Voltar à Plataforma
            </Link>
          </div>
        </div>
      </div>

      {/* 2. NUTRIFLUI BRAND NAVBAR */}
      <header className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#9EEA6C] flex items-center justify-center text-[#1F4647] shadow-xs">
            <Leaf className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-[#1F4647] flex items-center">
              Nutri<span className="text-[#357546]">Flui</span>
              <span className="w-2 h-2 rounded-full bg-[#9EEA6C] ml-1" />
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#486E6F]">
          <a href="#features" className="hover:text-[#1F4647] transition-colors">Recursos</a>
          <a href="#simulator" className="hover:text-[#1F4647] transition-colors">Simulador</a>
          <a href="#app" className="hover:text-[#1F4647] transition-colors">App do Paciente</a>
          <a href="#pricing" className="hover:text-[#1F4647] transition-colors">Planos</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="#trial"
            className="px-6 py-2.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-sm flex items-center space-x-2"
          >
            <span>Testar Grátis</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION (Asymmetric Split Hero with High-Contrast Pill CTA & Floating Notification Chips) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1F4647]/5 border border-[#1F4647]/10 text-xs font-semibold text-[#1F4647]">
              <span className="w-2 h-2 rounded-full bg-[#9EEA6C]" />
              <span>Plataforma de Inteligência Nutricional & Fidelização</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-[#1F4647] tracking-tight leading-[1.08]">
              Prescreva dietas personalizadas em minutos. Acompanhe a evolução do paciente{' '}
              <span className="relative inline-block text-[#1F4647]">
                em tempo real.
                <span className="absolute bottom-1.5 left-0 w-full h-3 bg-[#9EEA6C]/50 -z-10 rounded-sm" />
              </span>
            </h1>

            <p className="text-lg text-[#486E6F] leading-relaxed max-w-xl">
              Elimine planilhas complexas. Gere cardápios calibrados pela tabela TACO com auxílio de IA, envie lembretes automáticos no WhatsApp e mantenha seus pacientes engajados com um aplicativo encantador.
            </p>

            <form onSubmit={handleTrialSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md">
              <input
                type="email"
                required
                value={trialEmail}
                onChange={(e) => setTrialEmail(e.target.value)}
                placeholder="Seu melhor email profissional..."
                className="px-5 py-3.5 rounded-full border border-[#D5E2D3] bg-white text-sm text-[#1F4647] placeholder-[#8EA98F] focus:outline-none focus:border-[#1F4647] flex-1 shadow-2xs"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-sm flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <span>Criar Conta Grátis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-[#486E6F]">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#357546]" />
                <span>14 dias grátis sem cartão</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#357546]" />
                <span>Compatível com CFM & CRN</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#357546]" />
                <span>Integração WhatsApp em 1 clique</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container (5 cols) with Floating Chips */}
          <div className="lg:col-span-5 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#9EEA6C]/20 rounded-[48px] filter blur-3xl transform -rotate-3 -z-10" />

            {/* Main Interactive Preview Card */}
            <div className="bg-[#1F4647] text-white p-7 rounded-[40px] shadow-2xl relative space-y-6 overflow-hidden border border-[#2B5E5F]">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold flex items-center justify-center text-sm">
                    LC
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">Lucas Carvalho (Paciente)</div>
                    <div className="text-[11px] text-[#9EEA6C] font-mono">Meta: Hipertrofia • 2.650 kcal</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-[#9EEA6C]">
                  Hoje, 14:32
                </span>
              </div>

              {/* Macro Nutrients Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Aderência aos Macronutrientes</span>
                  <span className="font-bold text-[#9EEA6C]">94% Concluído</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-[#9EEA6C]" style={{ width: '50%' }} title="Carboidratos" />
                  <div className="h-full bg-[#65C947]" style={{ width: '30%' }} title="Proteínas" />
                  <div className="h-full bg-[#F59E0B]" style={{ width: '14%' }} title="Gorduras" />
                </div>
                <div className="flex justify-between text-[11px] text-white/60 font-mono">
                  <span>Carb: 280g (100%)</span>
                  <span>Prot: 160g (95%)</span>
                  <span>Gord: 65g (88%)</span>
                </div>
              </div>

              {/* Meal Timeline Sample */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#9EEA6C] flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Almoço Confirmado via App</span>
                  </span>
                  <span className="text-white/40 text-[10px]">12:45</span>
                </div>
                <div className="text-xs text-white/90">
                  Frango grelhado (180g), Arroz integral (150g), Brócolis ao vapor e Azeite extra-virgem (10ml).
                </div>
              </div>

              {/* Quick Prescription Action */}
              <button
                type="button"
                onClick={() => onShowToast('🥗 Cardápio sincronizado em tempo real!')}
                className="w-full py-3 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-xs hover:bg-[#8CD85A] transition-colors flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ajustar Cardápio com IA (Tabela TACO)</span>
              </button>
            </div>

            {/* Floating Tactile Chip 1 (Top Left) */}
            <div className="absolute -top-6 -left-6 bg-white border border-[#E3EBE1] text-[#1F4647] px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-7 h-7 rounded-full bg-[#9EEA6C]/30 text-[#1F4647] flex items-center justify-center text-xs">
                ⚡
              </div>
              <div className="text-xs">
                <span className="font-bold">Prescrição em 45s</span>
                <span className="text-[#486E6F] block text-[10px]">com cálculos automáticos</span>
              </div>
            </div>

            {/* Floating Tactile Chip 2 (Bottom Right) */}
            <div className="absolute -bottom-6 -right-4 bg-white border border-[#E3EBE1] text-[#1F4647] px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2.5">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <div className="text-xs">
                <span className="font-bold">WhatsApp Integrado</span>
                <span className="text-[#486E6F] block text-[10px]">-78% faltas em consultas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF BILLBOARD */}
      <section className="bg-white border-y border-[#E3EBE1] py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1F4647]">1.850+</div>
              <div className="text-xs sm:text-sm text-[#486E6F] mt-1 font-medium">Nutricionistas Ativos</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1F4647]">64.000+</div>
              <div className="text-xs sm:text-sm text-[#486E6F] mt-1 font-medium">Pacientes Acompanhados</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#357546]">98.4%</div>
              <div className="text-xs sm:text-sm text-[#486E6F] mt-1 font-medium">Satisfação dos Pacientes</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1F4647]">18 horas</div>
              <div className="text-xs sm:text-sm text-[#486E6F] mt-1 font-medium">Economizadas por Mês</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SIMULATOR (Playful Interactive Simulator Card) */}
      <section id="simulator" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-20">
        <div className="bg-[#1F4647] text-white p-8 sm:p-14 rounded-[48px] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9EEA6C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-[#9EEA6C]/15 text-[#9EEA6C] border border-[#9EEA6C]/30">
                Simulador de Retorno de Tempo & Receita
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Quantas horas você gasta montando dietas no domingo à noite?
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Mova o seletor para calcular o impacto da automação NutriFlui na sua rotina de consultório e na fidelização dos seus pacientes.
              </p>

              {/* Slider Input */}
              <div className="pt-6 space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span>Pacientes atendidos por semana:</span>
                  <span className="text-2xl font-bold text-[#9EEA6C]">{patientsCount} pacientes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={patientsCount}
                  onChange={(e) => setPatientsCount(Number(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#9EEA6C]"
                />
                <div className="flex justify-between text-xs text-white/50 font-mono">
                  <span>5 pacientes</span>
                  <span>30 pacientes</span>
                  <span>60+ pacientes</span>
                </div>
              </div>
            </div>

            {/* Calculation Result Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-[32px] border border-white/15 space-y-2">
                <Clock className="w-8 h-8 text-[#9EEA6C]" />
                <div className="text-3xl font-extrabold text-white">+{hoursSavedPerMonth}h / mês</div>
                <div className="text-xs text-white/70">
                  Tempo livre recuperado para descanso ou abertura de novos horários na agenda.
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-[32px] border border-white/15 space-y-2">
                <TrendingUp className="w-8 h-8 text-[#9EEA6C]" />
                <div className="text-3xl font-extrabold text-[#9EEA6C]">
                  +R$ {revenuePotential.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs text-white/70">
                  Potencial de receita extra mensal através de retenção contínua e redução de faltas.
                </div>
              </div>

              <div className="sm:col-span-2 bg-[#9EEA6C] text-[#1F4647] p-5 rounded-[28px] flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">Pronto para transformar sua clínica?</div>
                  <div className="text-xs text-[#1F4647]/80">Teste grátis por 14 dias sem compromisso.</div>
                </div>
                <a
                  href="#trial"
                  className="px-5 py-2.5 rounded-full bg-[#1F4647] text-white font-bold text-xs hover:scale-105 transition-transform"
                >
                  Começar Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURE SHOWCASE (Organic Bento Grid) */}
      <section id="features" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#357546]">
            Arquitetura de Recursos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4647]">
            Tudo o que seu consultório precisa em uma única plataforma viva.
          </h2>
          <p className="text-sm text-[#486E6F]">
            Projetado de ponta a ponta para eliminar atritos, respeitar seu tempo e encantar os pacientes.
          </p>
        </div>

        {/* Bento Grid 4 Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Deep Pine Hero Tile (Span 2 cols) */}
          <div className="md:col-span-2 bg-[#1F4647] text-white p-8 sm:p-10 rounded-[40px] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#9EEA6C] text-[#1F4647] inline-block">
                Prescritor IA + Tabela TACO
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                Gere cardápios 100% personalizados com substituições automáticas inteligentes.
              </h3>
              <p className="text-sm text-white/70 max-w-xl">
                O prescritor cruza restrições alimentares, rotina do paciente e orçamento em segundos. Quando o paciente não gosta de um ingrediente, o algoritmo recalibra os macros instantaneamente.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/5 p-3 rounded-2xl">
                <span className="text-[#9EEA6C] block font-bold text-base">4.200+</span>
                <span className="text-white/60 text-[10px]">Alimentos TACO/IBGE</span>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl">
                <span className="text-[#9EEA6C] block font-bold text-base">&lt; 1 min</span>
                <span className="text-white/60 text-[10px]">Cálculo Completo</span>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl">
                <span className="text-[#9EEA6C] block font-bold text-base">100%</span>
                <span className="text-white/60 text-[10px]">Exportação em PDF Lindo</span>
              </div>
            </div>
          </div>

          {/* Tile 2: App do Paciente */}
          <div className="bg-white border border-[#E3EBE1] p-8 rounded-[40px] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#9EEA6C]/30 text-[#1F4647] flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#1F4647]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F4647]">App do Paciente com Diário Fotográfico</h3>
              <p className="text-xs text-[#486E6F] leading-relaxed">
                Seus pacientes registram as refeições com fotos e você acompanha a aderência em tempo real. Notificações inteligentes lembram a hidratação diária.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7FAF6] text-xs font-mono text-[#357546] border border-[#E3EBE1]">
              ⭐ 4.9 na App Store & Google Play
            </div>
          </div>

          {/* Tile 3: WhatsApp Integrado */}
          <div className="bg-white border border-[#E3EBE1] p-8 rounded-[40px] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F4647]">Zero Faltas com WhatsApp</h3>
              <p className="text-xs text-[#486E6F] leading-relaxed">
                Confirmações automáticas de consulta 24 horas antes. Se o paciente remarcar, o horário vago é ofertado automaticamente à fila de espera.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#1F4647] flex items-center space-x-1">
              <span>Sem cobrança por disparo</span>
              <Check className="w-4 h-4 text-[#357546]" />
            </div>
          </div>

          {/* Tile 4: Bioimpedância & Antropometria (Span 2 cols) */}
          <div className="md:col-span-2 bg-white border border-[#E3EBE1] p-8 sm:p-10 rounded-[40px] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#1F4647]/5 text-[#1F4647] inline-block">
                Evolução Visual
              </span>
              <h3 className="text-2xl font-bold text-[#1F4647]">
                Gráficos de Bioimpedância e Comparador de Fotos Antes/Depois
              </h3>
              <p className="text-xs sm:text-sm text-[#486E6F] max-w-xl leading-relaxed">
                Gere relatórios comparativos automáticos para mostrar ao paciente o ganho de massa magra e perda de gordura visceral. O paciente vê o resultado com clareza e renova o acompanhamento.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 rounded-full bg-[#F7FAF6] text-xs font-mono text-[#1F4647] border border-[#E3EBE1]">
                Protocolo Pollock 3 & 7 dobras
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#F7FAF6] text-xs font-mono text-[#1F4647] border border-[#E3EBE1]">
                Compatível InBody & Omron
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#F7FAF6] text-xs font-mono text-[#1F4647] border border-[#E3EBE1]">
                Metabolismo Basal Harris-Benedict
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION (Transparent Plans) */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-20 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#357546]">
            Planos Sem Pegadinhas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4647]">
            Investimento transparente que se paga logo na primeira semana.
          </h2>
          <p className="text-sm text-[#486E6F]">
            Cancele a qualquer momento com 1 clique. Sem fidelidade forçada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1 */}
          <div className="bg-white border border-[#E3EBE1] p-8 rounded-[40px] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-lg font-bold text-[#1F4647]">Solo Starter</div>
              <div className="text-xs text-[#486E6F]">Ideal para nutricionistas recém-formados.</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#1F4647]">R$ 79</span>
                <span className="text-xs text-[#486E6F]">/mês</span>
              </div>
              <ul className="space-y-3 text-xs text-[#486E6F] pt-4 border-t border-[#E3EBE1]">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#357546]" />
                  <span>Até 30 pacientes ativos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#357546]" />
                  <span>Prescritor com Tabela TACO</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#357546]" />
                  <span>App NutriFlui para Pacientes</span>
                </li>
              </ul>
            </div>
            <a
              href="#trial"
              className="w-full py-3 rounded-full border border-[#1F4647] text-[#1F4647] font-semibold text-xs text-center hover:bg-[#1F4647] hover:text-white transition-colors"
            >
              Testar Starter
            </a>
          </div>

          {/* Plan 2: FEATURED PLAN (Deep Pine with Lime border & pill CTA) */}
          <div className="bg-[#1F4647] text-white border-2 border-[#9EEA6C] p-8 sm:p-10 rounded-[44px] shadow-xl flex flex-col justify-between space-y-6 relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#9EEA6C] text-[#1F4647] font-bold text-[10px] font-mono px-4 py-1 rounded-full uppercase tracking-wider">
              Mais Escolhido por Especialistas
            </div>

            <div className="space-y-4">
              <div className="text-xl font-bold text-white">Profissional Pro</div>
              <div className="text-xs text-white/70">Para consultórios em crescimento e escala.</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-5xl font-extrabold text-[#9EEA6C]">R$ 139</span>
                <span className="text-xs text-white/60">/mês</span>
              </div>
              <ul className="space-y-3 text-xs text-white/80 pt-4 border-t border-white/10">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#9EEA6C]" />
                  <span>Pacientes ilimitados</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#9EEA6C]" />
                  <span>IA Clínica para cardápios instantâneos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#9EEA6C]" />
                  <span>WhatsApp automático (lembretes e retornos)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#9EEA6C]" />
                  <span>App com logotipo e cores da sua clínica</span>
                </li>
              </ul>
            </div>
            <a
              href="#trial"
              className="w-full py-3.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-xs text-center hover:scale-105 active:scale-95 transition-transform shadow-md"
            >
              Começar Teste Pro Grátis
            </a>
          </div>

          {/* Plan 3 */}
          <div className="bg-white border border-[#E3EBE1] p-8 rounded-[40px] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-lg font-bold text-[#1F4647]">Clínicas & Equipes</div>
              <div className="text-xs text-[#486E6F]">Para clínicas multiprofissionais e franquias.</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#1F4647]">R$ 289</span>
                <span className="text-xs text-[#486E6F]">/mês</span>
              </div>
              <ul className="space-y-3 text-xs text-[#486E6F] pt-4 border-t border-[#E3EBE1]">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#357546]" />
                  <span>Até 5 nutricionistas na equipe</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#357546]" />
                  <span>Prontuário unificado multiprofissional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#357546]" />
                  <span>Gestão financeira e relatórios de comissão</span>
                </li>
              </ul>
            </div>
            <a
              href="#trial"
              className="w-full py-3 rounded-full border border-[#1F4647] text-[#1F4647] font-semibold text-xs text-center hover:bg-[#1F4647] hover:text-white transition-colors"
            >
              Falar com Consultor
            </a>
          </div>
        </div>
      </section>

      {/* 8. CTA & CLOSING (Immersive Deep Pine Curved Deck) */}
      <section id="trial" className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
        <div className="bg-[#1F4647] text-white p-10 sm:p-16 rounded-[48px] text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial from-[#9EEA6C]/15 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-[#9EEA6C]/20 text-[#9EEA6C] border border-[#9EEA6C]/40">
              14 Dias Grátis • Instalação Instantânea
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Seus pacientes merecem uma experiência incrível. Você merece mais tempo livre.
            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Junte-se aos mais de 1.850 nutricionistas que transformaram o atendimento clínico em um negócio de recorrência sustentável com o NutriFlui.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
              <a
                href="#trial"
                onClick={() => onShowToast('🎉 Teste ativado! Bem-vindo à NutriFlui!')}
                className="px-8 py-4 rounded-full bg-[#9EEA6C] text-[#1F4647] font-extrabold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center space-x-2"
              >
                <span>Criar Meu Consultório Digital Grátis</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="text-[11px] text-white/50 font-mono pt-2">
              Sem necessidade de cartão de crédito • Cancelamento com 1 clique
            </div>
          </div>
        </div>
      </section>

      {/* 9. NUTRIFLUI FOOTER */}
      <footer className="border-t border-[#E3EBE1] py-12 text-xs text-[#486E6F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#9EEA6C] flex items-center justify-center text-[#1F4647]">
              <Leaf className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-[#1F4647]">NutriFlui Tecnologias em Nutrição Ltda.</span>
          </div>

          <div>
            Projetado sob a disciplina de design <strong className="text-[#1F4647]">@google/design.md</strong> via motor OpenDesignMD.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSpecModal(true)}
              className="text-[#1F4647] font-semibold hover:underline"
            >
              Ver DESIGN.MD
            </button>
            <Link to="/explore" className="text-[#1F4647] font-semibold hover:underline">
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </footer>

      {/* 10. MODAL: SPECIFICATION INSPECTOR (OpenDesignMD Analysis) */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#16181D] w-full max-w-3xl rounded-[36px] border border-[#E8EAED] dark:border-[#26282E] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FAF9F6] dark:bg-[#121317] border-b border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#1A73E8]" />
                <span className="font-bold text-sm text-[#121317] dark:text-white">
                  Contrato Visual Normativo: nutriflui-DESIGN.md
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#9EEA6C]/20 text-[#1F4647] dark:text-[#9EEA6C] font-semibold">
                  Google Labs Spec
                </span>
              </div>

              <button
                onClick={() => setShowSpecModal(false)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#5F6368] hover:text-[#121317] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="px-6 py-2 bg-white dark:bg-[#16181D] border-b border-[#E8EAED] dark:border-[#26282E] flex items-center space-x-2 text-xs">
              <button
                onClick={() => setActiveModalTab('md')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeModalTab === 'md'
                    ? 'bg-[#1F4647] text-white'
                    : 'text-[#5F6368] hover:text-[#121317]'
                }`}
              >
                DESIGN.MD Gerado
              </button>
              <button
                onClick={() => setActiveModalTab('comparison')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeModalTab === 'comparison'
                    ? 'bg-[#1F4647] text-white'
                    : 'text-[#5F6368] hover:text-[#121317]'
                }`}
              >
                Comparativo AbacatePay → NutriFlui
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs">
              {activeModalTab === 'md' && (
                <pre className="p-4 rounded-2xl bg-[#121317] text-[#E2E8F0] leading-relaxed overflow-x-auto">
                  {nutrifluiDesignMdContent}
                </pre>
              )}

              {activeModalTab === 'comparison' && (
                <div className="space-y-4 font-sans text-xs text-[#121317] dark:text-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#F7FAF6] dark:bg-[#1A1C23] border border-[#E3EBE1] space-y-2">
                      <div className="font-bold text-[#1F4647] dark:text-[#9EEA6C] text-sm">
                        Origem: AbacatePay
                      </div>
                      <div className="text-[11px] text-[#5F6368]">
                        Fintech de pagamentos SaaS com visual botânico e descontraído.
                      </div>
                      <div className="space-y-1 font-mono text-[11px]">
                        <div>• Cor Primária: <span className="font-bold text-[#1F4647]">#1F4647</span></div>
                        <div>• Cor de Ação: <span className="font-bold text-[#357546]">#9EEA6C (Lima)</span></div>
                        <div>• Botões: <span className="font-bold">rounded-full (600px)</span></div>
                        <div>• Arquétipo: Playful Neo-Organic</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F7FAF6] dark:bg-[#1A1C23] border border-[#9EEA6C] space-y-2">
                      <div className="font-bold text-[#357546] dark:text-[#9EEA6C] text-sm">
                        Destino: NutriFlui
                      </div>
                      <div className="text-[11px] text-[#5F6368]">
                        Plataforma de consultório digital e nutrição clínica de alta performance.
                      </div>
                      <div className="space-y-1 font-mono text-[11px]">
                        <div>• Cor Primária: <span className="font-bold text-[#1F4647]">#1F4647 (Pinho)</span></div>
                        <div>• Cor de Ação: <span className="font-bold text-[#357546]">#9EEA6C (Vitalidade)</span></div>
                        <div>• Botões: <span className="font-bold">rounded-full (Pílula)</span></div>
                        <div>• Adaptação: Transfere a simpatia e o contraste para saúde e dietas</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#9EEA6C]/10 border border-[#9EEA6C]/30 text-xs text-[#1F4647] dark:text-[#E2E8F0]">
                    💡 <strong>Conclusão do Teste:</strong> A inteligência de transplante estético provou que as regras artísticas (proporção de bordas, contraste de cores e ritmo de seções) são 100% transferíveis para nichos completamente distintos sem descaracterizar a alma do design de origem.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-3 bg-[#FAF9F6] dark:bg-[#121317] border-t border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between text-xs">
              <span className="text-[#5F6368] font-mono">
                Arquivo persistido na raiz: <code>nutriflui-DESIGN.md</code>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyMd}
                  className="px-4 py-1.5 rounded-full bg-white dark:bg-[#16181D] border border-[#E8EAED] dark:border-[#26282E] font-medium text-[#121317] dark:text-white hover:bg-black/5 flex items-center space-x-1.5"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-[#357546]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMd ? 'Copiado!' : 'Copiar .MD'}</span>
                </button>

                <button
                  onClick={handleDownloadMd}
                  className="px-4 py-1.5 rounded-full bg-[#1F4647] text-white font-medium hover:scale-105 transition-transform flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar nutriflui-DESIGN.md</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
