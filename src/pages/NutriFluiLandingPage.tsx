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
  Leaf,
  Volume2,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Terminal,
  Smartphone,
  DollarSign
} from 'lucide-react';

interface NutriFluiLandingPageProps {
  onShowToast: (message: string) => void;
}

export const NutriFluiLandingPage: React.FC<NutriFluiLandingPageProps> = ({ onShowToast }) => {
  // Simulator state: monthly patients count
  const [patientsCount, setPatientsCount] = useState<number>(35);

  // Inspector modal state
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<'md' | 'comparison' | 'tokens'>('md');
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  // Interactive Prompt Box
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'prompt' | 'curl' | 'whatsapp'>('prompt');

  // Dashboard mockup timeframe filter
  const [activeTimeframe, setActiveTimeframe] = useState<'hoje' | 'mes' | '30dias'>('mes');

  // Audio quote playing state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hero email form
  const [trialEmail, setTrialEmail] = useState<string>('');

  // Calculations for simulator (NutriFlui vs Traditional Software)
  const traditionalCost = Math.round(180 + patientsCount * 3.5); // base + per-patient fee
  const nutrifluiCost = 89; // flat fee, no per-patient cost!
  const savingsPerMonth = traditionalCost - nutrifluiCost;
  const hoursSaved = Math.round(patientsCount * 1.8);

  const sampleAiPrompt = `Atue como nutricionista clínico especialista. Crie um plano alimentar normatizado com 2.450 kcal baseado estritamente na Tabela TACO para paciente de 28 anos, 76kg, hipertrofia muscular:
- Carboidratos: 300g (50%)
- Proteínas: 160g (26%)
- Lipídios: 65g (24%)
Gere substituições práticas para o almoço e exporte a lista de compras em formato JSON compatível com NutriFlui.`;

  const nutrifluiDesignMdContent = `---
name: NutriFlui Design System (Inspired by AbacatePay)
version: 2.0.0
archetype: "Playful Neo-Organic & Tactile High-Contrast"
colors:
  primary: "#1F4647"      # Deep Pine / Avocado Botanical Ink
  secondary: "#486E6F"    # Muted botanical slate
  tertiary: "#9EEA6C"     # Electric Lime / High-Contrast Action
  neutral: "#F7FAF6"      # Fresh organic canvas
  surface: "#FFFFFF"      # Crisp white elevated cards
  border: "#E3EBE1"       # Subtle botanical border
typography:
  fontFamily: "Inter, system-ui, sans-serif"
  headingFamily: "Inter, system-ui, sans-serif"
  h1:
    fontSize: 3.5rem
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  h2:
    fontSize: 2.5rem
    letterSpacing: "-0.02em"
rounded:
  sm: 6px
  md: 12px
  lg: 32px
  full: 9999px            # Iconic AbacatePay full pill geometry
---

# Design System: NutriFlui

> Transplante integral da estrutura de seções, atitude e arquitetura estética do **AbacatePay** para o segmento de consultório digital e nutrição de alta performance.

## 1. Visual Archetype & Tone of Voice
- **Arquétipo:** Playful Neo-Organic & Tactile High-Contrast
- **Atmosfera & Voz:** Tom coloquial, seguro, sem jargões corporativos ("sem letrinha pequena, sem migué"). Contraste enérgico entre verde pinho profundo (#1F4647) e verde lima elétrico (#9EEA6C).

## 2. Section Blueprints (Anatomia Exata das Seções do AbacatePay)
1. **Hero Section:** "Consultório de nutrição online da forma que deveria ser" com badge flutuante, CTA em pílula e chips de notificações reais.
2. **Logos Ribbon:** Ticker "Quem já atende com a NutriFlui" com marcas e clínicas parceiras.
3. **Anchor de Valor Fixo:** "R$ 0 por paciente extra. Fixo. Atendeu 10 ou 100, o valor é o mesmo, sem letrinha pequena, sem migué."
4. **Integração & Prompt Box:** "Prescreva do jeito que você atende" com caixa interativa de prompt para IA (Claude/ChatGPT) e 1-click copy.
5. **Dashboard Showcase:** "Um painel que fala a tua língua" com filtros de tempo e métricas reais (Aderência, Retenção, Metas).
6. **Simulador Comparativo Real:** "Simule e veja quanto você economiza de verdade" com slider e confronto direto com softwares tradicionais.
7. **Vozes Reais:** "Ouça algumas das mais de 1.800 pessoas que já usam a NutriFlui" com player de áudio e depoimentos autênticos.
8. **Suporte Humano:** "Suporte que não te deixa na mão" com tempo de resposta em menos de 2 minutos.
9. **FAQ Descontraído:** "Tem dúvidas? Relaxa, nós temos as respostas" com respostas sinceras e sem enrolação.
10. **Closing CTA:** "Você leu até aqui. Tá interessado né?" com deck curvo verde escuro e início em 2 minutos.

## 3. Invariantes dos Designers (Regras Invioláveis)
- **SEMPRE:** Botões de ação em pílula total (rounded-full); contraste WCAG AAA entre #1F4647 e #9EEA6C; cantos de cards em 32px-48px.
- **NUNCA:** Cantos quadrados (0px); cinzas hospitalares frios; popups agressivos; tabelas rígidas de Excel; botões com bounce artificial.`;

  const handleCopyMd = () => {
    navigator.clipboard.writeText(nutrifluiDesignMdContent);
    setCopiedMd(true);
    onShowToast('DESIGN.MD da NutriFlui copiado com sucesso!');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(sampleAiPrompt);
    setCopiedPrompt(true);
    onShowToast('Prompt de IA copiado! Cole no Claude ou ChatGPT.');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trialEmail.trim()) {
      onShowToast(`🎉 Cadastro iniciado para ${trialEmail}! 14 dias liberados.`);
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
              Estrutura Idêntica ao AbacatePay: <strong className="text-white underline decoration-[#9EEA6C] decoration-2">abacatepay.com</strong> → <strong className="text-[#9EEA6C]">NutriFlui</strong>
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
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* 2. NUTRIFLUI BRAND NAVBAR (Identical Header Structure to AbacatePay) */}
      <header className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
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

        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#486E6F]">
          <a href="#valor" className="hover:text-[#1F4647] transition-colors">Preço Fixo</a>
          <a href="#integracao" className="hover:text-[#1F4647] transition-colors">Prescrição com IA</a>
          <a href="#painel" className="hover:text-[#1F4647] transition-colors">O Painel</a>
          <a href="#simulador" className="hover:text-[#1F4647] transition-colors">Simulador</a>
          <a href="#vozes" className="hover:text-[#1F4647] transition-colors">Depoimentos</a>
          <a href="#faq" className="hover:text-[#1F4647] transition-colors">Dúvidas</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="#trial"
            className="px-6 py-2.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-sm flex items-center space-x-2"
          >
            <span>Criar conta grátis</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION (AbacatePay Hero Blueprint: "Consultório de nutrição online da forma que deveria ser") */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#E3EBE1] text-xs font-semibold text-[#1F4647] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#9EEA6C]" />
            <span>Prescreva com IA e Tabela TACO em minutos</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1F4647] tracking-tight leading-[1.05]">
            Consultório de nutrição
            <span className="block text-[#357546]">da forma que deveria ser</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#486E6F] leading-relaxed max-w-2xl mx-auto">
            Sem taxa abusiva por paciente extra, sem complicação de software dos anos 2000, e com prescrição por IA que você monta antes do teu café esfriar.
          </p>

          <form onSubmit={handleTrialSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={trialEmail}
              onChange={(e) => setTrialEmail(e.target.value)}
              placeholder="Digite seu email profissional..."
              className="w-full px-5 py-3.5 rounded-full border border-[#D5E2D3] bg-white text-sm text-[#1F4647] placeholder-[#8EA98F] focus:outline-none focus:border-[#1F4647] shadow-2xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-sm whitespace-nowrap"
            >
              Criar conta grátis
            </button>
          </form>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-[#486E6F] pt-1">
            <span className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-[#357546]" />
              <span>14 dias grátis</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-[#357546]" />
              <span>Sem cartão de crédito</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-[#357546]" />
              <span>Compatível com CFN & CRN</span>
            </span>
          </div>
        </div>

        {/* Hero Visual: Interactive App Card + Floating Chips */}
        <div className="mt-12 max-w-4xl mx-auto relative">
          <div className="bg-[#1F4647] text-white p-7 sm:p-10 rounded-[44px] shadow-2xl border border-[#2B5E5F] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold flex items-center justify-center text-sm">
                  LC
                </div>
                <div>
                  <div className="font-bold text-sm text-white">Lucas Carvalho (Paciente Ativo)</div>
                  <div className="text-[11px] text-[#9EEA6C] font-mono">Meta: Hipertrofia • 2.650 kcal diárias</div>
                </div>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-[#9EEA6C]">
                Sincronizado hoje via App
              </span>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-white/80">Aderência aos Macronutrientes</span>
                <span className="font-bold text-[#9EEA6C]">94% Concluído Hoje</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                <div className="h-full bg-[#9EEA6C]" style={{ width: '52%' }} title="Carboidratos" />
                <div className="h-full bg-[#65C947]" style={{ width: '30%' }} title="Proteínas" />
                <div className="h-full bg-[#F59E0B]" style={{ width: '12%' }} title="Gorduras" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-white/60 text-[10px] block">Carboidratos</span>
                  <span className="text-[#9EEA6C] font-bold text-sm">280g / 280g</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-white/60 text-[10px] block">Proteínas</span>
                  <span className="text-[#9EEA6C] font-bold text-sm">160g / 170g</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-white/60 text-[10px] block">Gorduras</span>
                  <span className="text-[#9EEA6C] font-bold text-sm">62g / 65g</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-white/70">
                Almoço registrado às 12:45 • Foto analisada por IA
              </span>
              <button
                type="button"
                onClick={() => onShowToast('🥗 Cardápio recalibrado com sucesso!')}
                className="px-5 py-2.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-xs hover:bg-[#8CD85A] transition-colors"
              >
                Ajustar com IA (Tabela TACO)
              </button>
            </div>
          </div>

          {/* Floating Chip 1 (Top Left) */}
          <div className="hidden sm:flex absolute -top-5 -left-6 bg-white border border-[#E3EBE1] text-[#1F4647] px-4 py-2.5 rounded-full shadow-lg items-center space-x-2.5 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-7 h-7 rounded-full bg-[#9EEA6C]/30 text-[#1F4647] flex items-center justify-center text-xs">
              ⚡
            </div>
            <div className="text-xs">
              <span className="font-bold">Cardápio em 45 segundos</span>
              <span className="text-[#486E6F] block text-[10px]">com tabela TACO oficial</span>
            </div>
          </div>

          {/* Floating Chip 2 (Bottom Right) */}
          <div className="hidden sm:flex absolute -bottom-5 -right-6 bg-white border border-[#E3EBE1] text-[#1F4647] px-4 py-2.5 rounded-full shadow-lg items-center space-x-2.5 transition-transform duration-300 hover:-translate-y-1">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <div className="text-xs">
              <span className="font-bold">Lembrete no WhatsApp</span>
              <span className="text-[#486E6F] block text-[10px]">-78% faltas em consultas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOGOS RIBBON ("Quem já atende com a NutriFlui") */}
      <section className="border-y border-[#E3EBE1] bg-white py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-xs font-mono uppercase tracking-wider text-[#486E6F] font-semibold">
            Quem já atende e escala com a NutriFlui
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all text-sm font-bold text-[#1F4647]">
            <span>Clínica BioEquilíbrio</span>
            <span>Espaço NutriFit</span>
            <span>Instituto Vida Saudável</span>
            <span>Centro Esportivo Performance</span>
            <span>Nutrição Clínica Integrada</span>
          </div>
        </div>
      </section>

      {/* 5. ANCHOR DE VALOR FIXO (AbacatePay's Iconic "R$ 0,80 por Pix. Fixo." translated to Nutrition!) */}
      <section id="valor" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-24">
        <div className="bg-[#1F4647] text-white p-8 sm:p-16 rounded-[48px] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-[#9EEA6C]/20 text-[#9EEA6C] border border-[#9EEA6C]/30 inline-block">
              Sem Pegadinhas
            </span>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              R$ 0 por paciente extra.
              <span className="block text-[#9EEA6C]">Fixo.</span>
            </h2>

            <p className="text-lg text-white/80 leading-relaxed">
              Atendeu 10 ou 100 pacientes no mês, o valor da plataforma é o mesmo, sem letrinha pequena, sem migué.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                <Check className="w-5 h-5 text-[#9EEA6C]" />
                <div className="font-bold text-sm text-white">R$ 0 por cardápio</div>
                <div className="text-xs text-white/60">Gere quantas dietas precisar, nadinha a mais.</div>
              </div>

              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                <Check className="w-5 h-5 text-[#9EEA6C]" />
                <div className="font-bold text-sm text-white">Sem falar com vendas</div>
                <div className="text-xs text-white/60">Sem ligação de vendedor querendo empurrar plano.</div>
              </div>

              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                <Check className="w-5 h-5 text-[#9EEA6C]" />
                <div className="font-bold text-sm text-white">Poucos minutos</div>
                <div className="text-xs text-white/60">Cadastrou, prescreveu, o paciente já recebe no app.</div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#simulador"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-sm hover:scale-105 active:scale-95 transition-transform"
              >
                <span>Calcular quanto você economiza</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTEGRAÇÃO & SANDBOX (AbacatePay's "Integre do jeito que você constrói" -> "Prescreva do jeito que você atende") */}
      <section id="integracao" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 space-y-10">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#357546]">
            Prescrição com IA & Ferramentas Modernas
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F4647] leading-tight">
            Prescreva do jeito que você atende.
          </h2>
          <p className="text-base text-[#486E6F] leading-relaxed">
            No computador, no celular ou com inteligência artificial dá no mesmo. Se você usa Claude, ChatGPT ou Cursor, copia o prompt abaixo, cola na sua ferramenta favorita e deixa ela montar o cardápio por você.
          </p>
        </div>

        {/* Interactive Code/Prompt Sandbox */}
        <div className="bg-[#121317] text-white rounded-[36px] border border-[#2B5E5F] overflow-hidden shadow-2xl">
          <div className="px-6 py-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#EA4335]/80" />
              <span className="w-3 h-3 rounded-full bg-[#FBBC05]/80" />
              <span className="w-3 h-3 rounded-full bg-[#34A853]/80" />
              <span className="font-mono text-xs text-white/60 pl-2">prompt-clinico-taco.prompt</span>
            </div>

            <button
              onClick={handleCopyPrompt}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-colors flex items-center space-x-1.5"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-[#9EEA6C]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Prompt Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-[#E2E8F0] leading-relaxed overflow-x-auto">
            <pre className="whitespace-pre-wrap">{sampleAiPrompt}</pre>
          </div>

          <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-white/60">
              💡 Funciona instantaneamente no <strong>Claude, ChatGPT, Lovable, Windsurf</strong> e na própria NutriFlui.
            </span>
            <div className="flex items-center space-x-2">
              <a
                href="#trial"
                className="px-4 py-1.5 rounded-full bg-[#9EEA6C] text-[#1F4647] font-bold text-xs hover:bg-[#8CD85A] transition-colors"
              >
                Prescrever com IA na NutriFlui
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DASHBOARD SHOWCASE (AbacatePay's "Um painel que fala a tua língua") */}
      <section id="painel" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-20 space-y-10">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#357546]">
            Métricas Reais
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F4647] leading-tight">
            Um painel que fala a tua língua.
          </h2>
          <p className="text-base text-[#486E6F] leading-relaxed">
            Software comum te mostra uma lista morta de pacientes. O painel da NutriFlui te mostra quem tá batendo meta de calorias, quem tá perto de abandonar o tratamento e o que realmente faz seu consultório crescer.
          </p>
        </div>

        {/* Dashboard Mockup Component */}
        <div className="bg-white border border-[#E3EBE1] p-6 sm:p-10 rounded-[44px] shadow-sm space-y-8">
          {/* Timeframe pill filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3EBE1] pb-5">
            <div className="flex items-center space-x-1.5 p-1 rounded-full bg-[#F7FAF6] border border-[#E3EBE1]">
              {(['hoje', 'mes', '30dias'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                    activeTimeframe === tf
                      ? 'bg-[#1F4647] text-white shadow-xs'
                      : 'text-[#486E6F] hover:text-[#1F4647]'
                  }`}
                >
                  {tf === 'hoje' ? 'Hoje' : tf === 'mes' ? 'Esse Mês' : 'Últimos 30 dias'}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-[#486E6F]">
              Atualizado em tempo real • <strong>48 pacientes ativos</strong>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#F7FAF6] border border-[#E3EBE1] space-y-2">
              <div className="text-xs font-mono text-[#486E6F] uppercase">Aderência aos Macros</div>
              <div className="text-3xl font-extrabold text-[#1F4647]">92.4%</div>
              <div className="text-xs text-[#357546] font-semibold flex items-center space-x-1">
                <span>+8.2% vs mês anterior</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#F7FAF6] border border-[#E3EBE1] space-y-2">
              <div className="text-xs font-mono text-[#486E6F] uppercase">Retenção de Retorno</div>
              <div className="text-3xl font-extrabold text-[#1F4647]">84%</div>
              <div className="text-xs text-[#357546] font-semibold flex items-center space-x-1">
                <span>42 de 48 pacientes remarcam</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#F7FAF6] border border-[#E3EBE1] space-y-2">
              <div className="text-xs font-mono text-[#486E6F] uppercase">Faltas Evitadas no WhatsApp</div>
              <div className="text-3xl font-extrabold text-[#357546]">-78%</div>
              <div className="text-xs text-[#486E6F]">Zero buracos na agenda</div>
            </div>

            <div className="p-5 rounded-3xl bg-[#1F4647] text-white space-y-2">
              <div className="text-xs font-mono text-[#9EEA6C] uppercase">Faturamento Estimado</div>
              <div className="text-3xl font-extrabold text-[#9EEA6C]">R$ 14.800</div>
              <div className="text-xs text-white/70">Média de R$ 300 por paciente</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SIMULADOR COMPARATIVO (AbacatePay's "Simule e veja quanto você recebe de verdade" translated) */}
      <section id="simulador" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-20">
        <div className="bg-[#1F4647] text-white p-8 sm:p-14 rounded-[48px] shadow-2xl relative overflow-hidden space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-[#9EEA6C]/20 text-[#9EEA6C] border border-[#9EEA6C]/40 inline-block">
              Simulador Comparativo
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Simule e veja quanto você economiza de verdade.
            </h2>
            <p className="text-base text-white/75">
              R$ 89 fixos na NutriFlui, sem taxa por paciente cadastrado e WhatsApp incluso. Compare com a concorrência.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="max-w-xl mx-auto space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Quantos pacientes você atende por mês?</span>
              <span className="text-2xl font-bold text-[#9EEA6C] font-mono">{patientsCount} pacientes</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={patientsCount}
              onChange={(e) => setPatientsCount(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#9EEA6C]"
            />
            <div className="flex justify-between text-xs text-white/50 font-mono">
              <span>10 pacientes</span>
              <span>50 pacientes</span>
              <span>90+ pacientes</span>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Traditional Software Card */}
            <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
              <div className="text-xs font-mono text-white/60 uppercase">Softwares Antigos de Nutrição</div>
              <div className="text-3xl font-extrabold text-white/80">R$ {traditionalCost} <span className="text-xs font-normal text-white/50">/mês</span></div>
              <ul className="space-y-2 text-xs text-white/70">
                <li>• Cobrança extra ao ultrapassar o limite de pacientes</li>
                <li>• Cobrança por pacote de mensagens no WhatsApp</li>
                <li>• Interface lenta que exige horas de preenchimento</li>
              </ul>
            </div>

            {/* NutriFlui Card (Highlighted) */}
            <div className="p-6 rounded-[32px] bg-white text-[#1F4647] border-2 border-[#9EEA6C] shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#357546] font-bold uppercase">Com a NutriFlui</span>
                <span className="text-[10px] font-mono font-bold bg-[#9EEA6C] text-[#1F4647] px-2.5 py-0.5 rounded-full">Fixo & Sem Pegadinhas</span>
              </div>
              <div className="text-4xl font-extrabold text-[#1F4647]">R$ 89 <span className="text-xs font-normal text-[#486E6F]">/mês</span></div>
              <div className="text-xs font-bold text-[#357546] bg-[#9EEA6C]/20 p-2 rounded-xl">
                Economia real de R$ {savingsPerMonth * 12}/ano + {hoursSaved}h livres todo mês!
              </div>
              <ul className="space-y-2 text-xs text-[#486E6F]">
                <li>✓ Pacientes 100% ilimitados sem custo extra</li>
                <li>✓ WhatsApp automático integrado sem cobrança por disparo</li>
                <li>✓ Prescrição assistida por IA via Tabela TACO</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DEPOIMENTOS EM ÁUDIO (AbacatePay's "Ouça algumas das mais de X pessoas..." translated) */}
      <section id="vozes" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#357546]">
            Comunidade Ativa
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F4647] leading-tight">
            Ouça quem já vive de consultório com a NutriFlui.
          </h2>
          <p className="text-base text-[#486E6F]">
            Sem depoimentos comprados. Relatos reais de nutricionistas que recuperaram o final de semana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Audio Quote 1 */}
          <div className="bg-white border border-[#E3EBE1] p-6 rounded-[36px] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#1F4647] text-white flex items-center justify-center font-bold text-sm">
                  LM
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1F4647]">Dra. Larissa Mendes</div>
                  <div className="text-xs text-[#486E6F]">Nutrição Esportiva • CRN-3 48123</div>
                </div>
              </div>

              {/* Simulated Audio Waveform Bar */}
              <div className="p-3 rounded-2xl bg-[#F7FAF6] border border-[#E3EBE1] flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingAudio(!isPlayingAudio);
                    onShowToast(isPlayingAudio ? 'Áudio pausado' : 'Reproduzindo depoimento de Dra. Larissa...');
                  }}
                  className="w-8 h-8 rounded-full bg-[#9EEA6C] text-[#1F4647] flex items-center justify-center flex-shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div className="flex-1 flex items-center space-x-1">
                  <span className="h-4 w-1 bg-[#1F4647] rounded-full animate-pulse" />
                  <span className="h-6 w-1 bg-[#357546] rounded-full" />
                  <span className="h-3 w-1 bg-[#9EEA6C] rounded-full" />
                  <span className="h-7 w-1 bg-[#1F4647] rounded-full animate-pulse" />
                  <span className="h-5 w-1 bg-[#357546] rounded-full" />
                  <span className="h-2 w-1 bg-[#9EEA6C] rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-[#486E6F]">0:38</span>
              </div>

              <p className="text-xs text-[#486E6F] leading-relaxed italic">
                "Eu levava o domingo inteiro montando dietas no Word. Com a NutriFlui e a IA da Tabela TACO, faço tudo em 3 minutos no intervalo da consulta."
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#357546] font-semibold">
              ✓ Atende 60 pacientes/mês
            </div>
          </div>

          {/* Quote 2 */}
          <div className="bg-white border border-[#E3EBE1] p-6 rounded-[36px] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#357546] text-white flex items-center justify-center font-bold text-sm">
                  RF
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1F4647]">Rodrigo Fagundes</div>
                  <div className="text-xs text-[#486E6F]">Nutricionista Clínico • CRN-8 12904</div>
                </div>
              </div>

              <p className="text-xs text-[#486E6F] leading-relaxed italic pt-2">
                "O que mais me impressionou foi a retenção. O paciente adora abrir o app pra fotografar o prato. Eles não faltam mais porque o WhatsApp avisa antes."
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#357546] font-semibold">
              ✓ Retenção subiu para 88%
            </div>
          </div>

          {/* Quote 3 */}
          <div className="bg-white border border-[#E3EBE1] p-6 rounded-[36px] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#1F4647] text-[#9EEA6C] flex items-center justify-center font-bold text-sm">
                  CB
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1F4647]">Camila Bittencourt</div>
                  <div className="text-xs text-[#486E6F]">Nutrição Materno-Infantil • CRN-4 33201</div>
                </div>
              </div>

              <p className="text-xs text-[#486E6F] leading-relaxed italic pt-2">
                "Não tem pegadinha de preço. Outros sistemas começavam cobrando R$ 50 e quando eu batia 40 pacientes subiam pra R$ 250. A NutriFlui é honesta."
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#357546] font-semibold">
              ✓ Economia de R$ 1.600/ano
            </div>
          </div>
        </div>
      </section>

      {/* 10. SUPORTE RÁPIDO (AbacatePay's "Suporte que não te deixa na mão") */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white border border-[#E3EBE1] p-8 sm:p-12 rounded-[44px] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#357546]">
              Atendimento Humanizado
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F4647]">
              E tudo isso com um suporte que não te deixa na mão.
            </h2>
            <p className="text-sm text-[#486E6F] leading-relaxed">
              Na NutriFlui você não fala com robô burro. Nosso time de atendimento entende de consultório de nutrição e responde antes do teu café esfriar.
            </p>
          </div>

          <div className="md:col-span-5 space-y-3">
            <div className="p-4 rounded-3xl bg-[#F7FAF6] border border-[#E3EBE1] flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-[#1F4647] block">Tempo médio de resposta</span>
                <span className="text-[#486E6F] text-[11px]">Via WhatsApp e Chat ao vivo</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#357546] bg-[#9EEA6C]/20 px-3 py-1 rounded-full">
                &lt; 2 minutos
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-[#F7FAF6] border border-[#E3EBE1] flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-[#1F4647] block">Migração de dados gratuita</span>
                <span className="text-[#486E6F] text-[11px]">Trazemos seus pacientes do sistema antigo</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#357546] bg-[#9EEA6C]/20 px-3 py-1 rounded-full">
                R$ 0
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ CONVERSACIONAL (AbacatePay's "Tem dúvidas? Relaxa, nós temos as respostas.") */}
      <section id="faq" className="max-w-[860px] mx-auto px-4 sm:px-6 py-16 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F4647]">
            Tem dúvidas? Relaxa,<br />nós temos as respostas.
          </h2>
          <p className="text-sm text-[#486E6F]">
            Perguntas diretas e sinceras sobre a plataforma, sem enrolação jurídica.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Preciso de CNPJ para assinar a NutriFlui?',
              a: 'Não. Nutricionistas autônomos com CPF e registro ativo no CRN podem utilizar a plataforma normalmente com todas as funcionalidades liberadas.'
            },
            {
              q: 'O paciente paga alguma coisa para baixar o app?',
              a: 'Nadinha de nada. O app do paciente é 100% gratuito tanto na Apple App Store quanto na Google Play Store.'
            },
            {
              q: 'Tem limite de pacientes cadastrados no plano fixo?',
              a: 'Não! O valor de R$ 89/mês é fixo e você pode ter 10, 50 ou 200 pacientes ativos sem nenhuma cobrança por paciente adicional.'
            },
            {
              q: 'Como funciona a IA com a Tabela TACO?',
              a: 'Nossa inteligência artificial foi treinada estritamente sobre a base de dados oficial da Tabela Brasileira de Composição de Alimentos (TACO) e IBGE. Ela calcula os macronutrientes com precisão laboratorial e sugere substituições plausíveis.'
            },
            {
              q: 'Tem período de carência ou multa se eu quiser cancelar?',
              a: 'Zero fidelidade. Você pode cancelar sua assinatura a qualquer momento com apenas 1 clique no painel, sem precisar ligar para ninguém.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E3EBE1] rounded-3xl overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#1F4647]"
              >
                <span>{item.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#357546]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#486E6F]" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs text-[#486E6F] leading-relaxed border-t border-[#F7FAF6] pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. CLOSING CTA (AbacatePay's Iconic "Você leu até aqui. Tá interessado né?") */}
      <section id="trial" className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
        <div className="bg-[#1F4647] text-white p-10 sm:p-20 rounded-[48px] text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-[#9EEA6C]/20 text-[#9EEA6C] border border-[#9EEA6C]/40 inline-block">
              14 Dias Grátis • Instalação Imediata
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Você leu até aqui.
              <span className="block text-[#9EEA6C]">Tá interessado né?</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              O cadastro leva 2 minutos, a aprovação é imediata, e o primeiro paciente você prescreve ainda hoje.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={() => onShowToast('🎉 Bem-vindo à NutriFlui! Cadastro liberado.')}
                className="px-9 py-4 rounded-full bg-[#9EEA6C] text-[#1F4647] font-extrabold text-base hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center space-x-2"
              >
                <span>Criar conta grátis</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-[11px] text-white/50 font-mono pt-2">
              Sem necessidade de cartão de crédito • Cancele quando quiser
            </div>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="border-t border-[#E3EBE1] py-12 text-xs text-[#486E6F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#9EEA6C] flex items-center justify-center text-[#1F4647]">
              <Leaf className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-[#1F4647]">NutriFlui Tecnologias em Nutrição Ltda.</span>
          </div>

          <div>
            Design System sintetizado pelo <strong className="text-[#1F4647]">OpenDesignMD</strong> a partir do <strong className="text-[#1F4647]">AbacatePay</strong>.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSpecModal(true)}
              className="text-[#1F4647] font-semibold hover:underline"
            >
              Inspecionar DESIGN.MD
            </button>
            <Link to="/explore" className="text-[#1F4647] font-semibold hover:underline">
              Voltar à Plataforma
            </Link>
          </div>
        </div>
      </footer>

      {/* 14. MODAL: SPECIFICATION INSPECTOR */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#16181D] w-full max-w-3xl rounded-[36px] border border-[#E8EAED] dark:border-[#26282E] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn">
            <div className="px-6 py-4 bg-[#FAF9F6] dark:bg-[#121317] border-b border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#1A73E8]" />
                <span className="font-bold text-sm text-[#121317] dark:text-white">
                  Especificação Canônica: nutriflui-DESIGN.md
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#9EEA6C]/20 text-[#1F4647] dark:text-[#9EEA6C] font-semibold">
                  Google Labs & Impeccable Refined
                </span>
              </div>

              <button
                onClick={() => setShowSpecModal(false)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#5F6368] hover:text-[#121317] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-2 bg-white dark:bg-[#16181D] border-b border-[#E8EAED] dark:border-[#26282E] flex items-center space-x-2 text-xs">
              <button
                onClick={() => setActiveModalTab('md')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeModalTab === 'md' ? 'bg-[#1F4647] text-white' : 'text-[#5F6368]'
                }`}
              >
                DESIGN.MD Gerado
              </button>
              <button
                onClick={() => setActiveModalTab('comparison')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeModalTab === 'comparison' ? 'bg-[#1F4647] text-white' : 'text-[#5F6368]'
                }`}
              >
                Mapeamento das 10 Seções
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs">
              {activeModalTab === 'md' && (
                <pre className="p-4 rounded-2xl bg-[#121317] text-[#E2E8F0] leading-relaxed overflow-x-auto">
                  {nutrifluiDesignMdContent}
                </pre>
              )}

              {activeModalTab === 'comparison' && (
                <div className="space-y-3 font-sans text-xs text-[#121317] dark:text-white">
                  <div className="font-bold text-sm text-[#357546]">
                    Como as 10 seções do AbacatePay foram transplantadas para a NutriFlui:
                  </div>
                  <ul className="space-y-2 text-[#486E6F]">
                    <li><strong>1. Hero:</strong> "Pagamentos online..." → "Consultório de nutrição online da forma que deveria ser"</li>
                    <li><strong>2. Logos Ribbon:</strong> "Quem já recebe..." → "Quem já atende com a NutriFlui"</li>
                    <li><strong>3. Âncora de Valor:</strong> "R$ 0,80 por Pix. Fixo." → "R$ 0 por paciente extra. Fixo. Sem letrinha pequena, sem migué."</li>
                    <li><strong>4. Integração:</strong> "Integre do jeito que você constrói" → "Prescreva do jeito que você atende (Sandbox de IA)"</li>
                    <li><strong>5. Painel:</strong> "Um painel que fala a tua língua" → Métricas de retenção e aderência em vez de CSV</li>
                    <li><strong>6. Simulador:</strong> Calculadora de economia de Pix → Calculadora de economia de horas e mensalidade fixa</li>
                    <li><strong>7. Vozes Reais:</strong> "Ouça algumas das 10.000 pessoas..." → Player de áudio com depoimentos de nutricionistas</li>
                    <li><strong>8. Suporte:</strong> "Suporte que não te deixa na mão" → Atendimento humanizado em &lt; 2 minutos</li>
                    <li><strong>9. FAQ:</strong> "Tem dúvidas? Relaxa..." → FAQ sincero e sem juridiquês</li>
                    <li><strong>10. Fechamento:</strong> "Você leu até aqui. Tá interessado né?" → Convite irresistível em verde escuro maciço</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-[#FAF9F6] dark:bg-[#121317] border-t border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between text-xs">
              <span className="text-[#5F6368] font-mono">
                Arquivo persistido na raiz: <code>nutriflui-DESIGN.md</code>
              </span>
              <button
                onClick={handleCopyMd}
                className="px-4 py-1.5 rounded-full bg-[#1F4647] text-white font-medium hover:scale-105 transition-transform flex items-center space-x-1.5"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-[#9EEA6C]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMd ? 'Copiado!' : 'Copiar .MD'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
