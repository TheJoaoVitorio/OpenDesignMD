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
  DollarSign,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  CheckCheck,
  X,
  ChevronDown
} from 'lucide-react';
import { Company } from '../types';

interface RouletteNiche {
  id: string;
  name: string;
  icon: string;
  clientName: string;
  context: string;
  defaultColor: string;
  tagline: string;
  subheadline: string;
  features: Array<{
    title: string;
    description: string;
    badge: string;
    metric: string;
  }>;
  interactiveWidgetType: 'trade-in' | 'calculator' | 'terminal' | 'telemetry' | 'slider';
}

const ROULETTE_NICHES: RouletteNiche[] = [
  {
    id: 'mobile-store',
    name: 'Loja de Smartphones & Flagships',
    icon: '📱',
    clientName: 'Orbit Mobile',
    context: 'Loja premium de smartphones de titânio e silício com programa de Trade-In e garantia estendida de 2 anos.',
    defaultColor: '#FF6B00',
    tagline: 'Hardware esculpido para a velocidade do pensamento.',
    subheadline: 'Smartphones homologados com avaliação matemática do seu aparelho usado e garantia contratual de 24 meses.',
    features: [
      {
        title: 'Apple iPhone 16 Pro Max',
        description: 'Estrutura em titânio Grau 5 com acabamento jateado. Botão Controle da Câmera tátil e chip A18 Pro 3nm com ray tracing nativo.',
        badge: 'TSMC 3nm N3E',
        metric: 'R$ 8.999 à vista',
      },
      {
        title: 'Samsung Galaxy S25 Ultra',
        description: 'Processador Snapdragon 8 Elite com arquitetura Oryon customizada. Tela Dynamic AMOLED 2X antirreflexo e S-Pen inclusa.',
        badge: 'Snapdragon 8 Elite',
        metric: 'R$ 6.899 à vista',
      },
      {
        title: 'Google Pixel 9 Pro XL',
        description: 'Engenharia pura Google com processador Tensor G4 executando Gemini Nano localmente com 16GB de RAM e 7 anos de OS updates.',
        badge: 'Google Tensor G4',
        metric: 'R$ 5.999 à vista',
      },
    ],
    interactiveWidgetType: 'trade-in',
  },
  {
    id: 'nutrition',
    name: 'Clínica de Nutrição & Bem-Estar',
    icon: '🥑',
    clientName: 'NutriFlui',
    context: 'Plataforma para nutricionistas com prescrição dietética automatizada por IA e tabela TACO.',
    defaultColor: '#9EEA6C',
    tagline: 'Nutrição clínica da forma que sempre deveria ter sido.',
    subheadline: 'Prescrição de planos alimentares em 90 segundos com cálculo de bioimpedância e aderência contínua via WhatsApp.',
    features: [
      {
        title: 'Prescrição Automática TACO',
        description: 'Gere dietas normatizadas e substituições práticas em segundos, sem cálculos manuais de macronutrientes em planilhas.',
        badge: '100% Normatizado',
        metric: 'Economia de 1.8h/paciente',
      },
      {
        title: 'Acompanhamento WhatsApp IA',
        description: 'Seu assistente clínico tira dúvidas do paciente sobre trocas de alimentos direto no WhatsApp com a sua voz.',
        badge: 'Disponível 24/7',
        metric: '94% Taxa de Aderência',
      },
      {
        title: 'Prontuário & Bioimpedância',
        description: 'Gráficos evolutivos de massa magra, pregas cutâneas e fotos de evolução comparativa com privacidade médica.',
        badge: 'Padrão CFN/CRN',
        metric: 'Histórico em 1-Clique',
      },
    ],
    interactiveWidgetType: 'calculator',
  },
  {
    id: 'fintech',
    name: 'Fintech de Pagamentos & Cobrança',
    icon: '💳',
    clientName: 'FluxoPay',
    context: 'Gateway de pagamentos com Pix instantâneo, split em tempo real e conciliação bancária automática.',
    defaultColor: '#10B981',
    tagline: 'Infraestrutura financeira com liquidação instantânea em D+0.',
    subheadline: 'Elimine intermediários lentos. Receba no Pix na hora com split automático e menor taxa contratual do mercado.',
    features: [
      {
        title: 'Pix Instantâneo com Webhooks',
        description: 'Confirmação de recebimento em menos de 800 milissegundos com redundância multi-adquirente e zero downtime.',
        badge: 'Latência < 800ms',
        metric: 'Taxa zero no primeiro mês',
      },
      {
        title: 'Split de Pagamentos Multi-contas',
        description: 'Distribua comissões e repasses de marketplaces automaticamente entre múltiplos parceiros na hora da venda.',
        badge: 'Compliance Bacen',
        metric: 'Split ilimitado',
      },
      {
        title: 'Antifraude com Redes Neurais',
        description: 'Análise comportamental de transações em tempo real bloqueando chargebacks sem recusar clientes legítimos.',
        badge: '99.8% Aprovação',
        metric: 'Chargeback < 0.02%',
      },
    ],
    interactiveWidgetType: 'calculator',
  },
  {
    id: 'ai-agents',
    name: 'Plataforma de Agentes de IA & DevTools',
    icon: '🤖',
    clientName: 'Kore Agents',
    context: 'Orquestrador de agentes de código autônomos locais com workspaces isolados e terminal em tempo real.',
    defaultColor: '#6366F1',
    tagline: 'Eleve seu time de engenharia à velocidade dos agentes autônomos.',
    subheadline: 'Execute múltiplos agentes locais em paralelo para auditoria de PRs, refatoração e migrações de sistemas legados.',
    features: [
      {
        title: 'Workspaces Isolados em Sandbox',
        description: 'Ambientes herméticos com micro-VMs onde agentes executam testes unitários e lint com segurança total.',
        badge: 'POSIX Sandbox',
        metric: 'Zero vazamento de código',
      },
      {
        title: 'Protocolo MCP & Sidecars',
        description: 'Conectores padronizados para integrar bancos de dados, terminais de shell e navegadores aos agentes.',
        badge: 'Model Context Protocol',
        metric: '50+ ferramentas nativas',
      },
      {
        title: 'Swarm Orchestration Paralelo',
        description: 'Divida tarefas complexas entre agentes especialistas (revisor de layout, auditor de segurança e implementador).',
        badge: 'Multi-Agent Swarm',
        metric: '10x mais rápido que manual',
      },
    ],
    interactiveWidgetType: 'terminal',
  },
  {
    id: 'health-saas',
    name: 'SaaS Hospitalar & Cardiologia',
    icon: '🏥',
    clientName: 'Vitalis Health',
    context: 'Monitoramento contínuo de telemetria de ECG em tempo real para UTIs hospitalares com IA preditiva.',
    defaultColor: '#0EA5E9',
    tagline: 'Precisão milissegundo onde cada batimento cardíaco importa.',
    subheadline: 'Algoritmos preditivos treinados em mais de 10 milhões de traçados de eletrocardiograma para intervenção precoce.',
    features: [
      {
        title: 'Telemetria de ECG em Alta Fidelidade',
        description: 'Transmissão em tempo real de 12 derivações com supressão ativa de ruído eletromiográfico e visualização vetorial.',
        badge: 'Taxa 1.000 Hz',
        metric: 'Atraso sub-15ms',
      },
      {
        title: 'Detecção Preditiva de Arritmias',
        description: 'Modelos de deep learning alertam a equipe de enfermagem até 45 minutos antes de episódios clínicos agudos.',
        badge: 'Certificação Anvisa',
        metric: 'Sensibilidade de 99.4%',
      },
      {
        title: 'Integração HL7 e FHIR',
        description: 'Sincronização bidirecional instantânea com prontuários Tasy, MV e Epic sem duplicidade de digitação.',
        badge: 'Padrão Interoperável',
        metric: 'Conexão nativa EMR',
      },
    ],
    interactiveWidgetType: 'telemetry',
  },
  {
    id: 'logistics',
    name: 'Logística & Gestão de Frotas',
    icon: '🚚',
    clientName: 'Apex Log',
    context: 'Plataforma de rastreamento de cargas blindadas, roteirização autônoma e telemetria de consumo em tempo real.',
    defaultColor: '#F97316',
    tagline: 'Logística de alta precisão do centro de distribuição ao destino.',
    subheadline: 'Rotas otimizadas por inteligência artificial para frotas pesadas com escolta virtual e seguro integral de carga.',
    features: [
      {
        title: 'Roteirização com Previsão de Risco',
        description: 'Cálculo dinâmico de trajetos considerando histórico de incidentes, pedágios e condições de pavimentação.',
        badge: 'Rotas Inteligentes',
        metric: 'Economia de 18% diesel',
      },
      {
        title: 'Telemetria CAN e Frenagem',
        description: 'Monitoramento em tempo real de rotação do motor, velocidade e comportamento de condução do motorista.',
        badge: 'Telemetria 24/7',
        metric: 'Redução de 40% em sinistros',
      },
      {
        title: 'Comprovante de Entrega Digital',
        description: 'Assinatura biométrica, leitura de código de barras e geolocalização exata no momento da entrega do frete.',
        badge: 'Auditoria 100%',
        metric: 'Baixa no ERP em tempo real',
      },
    ],
    interactiveWidgetType: 'slider',
  },
  {
    id: 'luxury-fashion',
    name: 'E-commerce de Moda & Luxo',
    icon: '💎',
    clientName: 'Maison Noir',
    context: 'Ateliê digital de alfaiataria sustentável e alta costura com catálogo de edição limitada e provador virtual.',
    defaultColor: '#EC4899',
    tagline: 'Alta costura escultural com corte milimétrico e tecidos nobres.',
    subheadline: 'Peças numeradas confeccionadas artesanalmente sob demanda com lã fria italiana e seda pura orgânica.',
    features: [
      {
        title: 'Alfaiataria Escultural Sob Medida',
        description: 'Modelagem tridimensional que respeita a biomecânica e ergonomia do corpo com acabamento manual de mestre alfaiate.',
        badge: 'Edição Numerada',
        metric: 'Lã Super 150s Italiana',
      },
      {
        title: 'Provador Virtual com Visão Computacional',
        description: 'Simulação exata do caimento do tecido através de reconstrução tridimensional da silhueta pela câmera do celular.',
        badge: 'Precisão de 99%',
        metric: 'Devoluções reduzidas a zero',
      },
      {
        title: 'Passaporte Digital em Blockchain',
        description: 'Certificado inviolável de autenticidade registrando a cadeia sustentável de suprimentos e histórico do ateliê.',
        badge: 'NFT Autenticado',
        metric: 'Origem 100% rastreável',
      },
    ],
    interactiveWidgetType: 'slider',
  },
  {
    id: 'cloud-infra',
    name: 'Infraestrutura Cloud & APIs',
    icon: '⚡',
    clientName: 'Aether Cloud',
    context: 'Rede global de computação em borda (edge runtime) com latência sub-5ms e deploy instantâneo de microsserviços.',
    defaultColor: '#8B5CF6',
    tagline: 'Deploy global em menos de 100ms em 300+ edge locations.',
    subheadline: 'Execute funções serverless ao lado do seu usuário final com isolamento V8 e propagação mundial instantânea.',
    features: [
      {
        title: 'Edge Compute Sub-5ms',
        description: 'Isolados V8 ultraleves inicializados em 0 milissegundos sem cold-start em mais de 300 data centers globais.',
        badge: 'Zero Cold Start',
        metric: 'Inicialização em 0ms',
      },
      {
        title: 'Anycast DNS com Proteção DDoS',
        description: 'Mitigação automática de ataques volumétricos de até 150 Tbps direto na borda sem impactar a aplicação.',
        badge: 'Escala Terabit',
        metric: '100% tráfego blindado',
      },
      {
        title: 'Banco de Dados Global Replicado',
        description: 'Armazenamento distribuído com sincronização atômica e leitura instantânea no nó mais próximo do cliente.',
        badge: 'Acid Compliance',
        metric: 'Consistência garantida',
      },
    ],
    interactiveWidgetType: 'terminal',
  },
];

const FALLBACK_COMPANY: Company = {
  id: 'google-antigravity',
  name: 'Google Antigravity',
  domain: 'antigravity.google',
  category: 'AI & Developer Tools',
  description: 'Estética de Engineered Calm',
  logoUrl: 'https://cdn.simpleicons.org/google/1A73E8',
  colors: {
    primary: '#121317',
    secondary: '#5F6368',
    tertiary: '#1A73E8',
    neutral: '#FAF9F6',
    surface: '#FFFFFF',
    accent: '#1A73E8',
    border: '#E8EAED',
  },
  typography: {
    fontFamily: 'Google Sans, Inter, sans-serif',
    headingFamily: 'Google Sans, Inter, sans-serif',
    monoFamily: 'monospace',
    h1: { fontSize: '4rem', fontWeight: 500, letterSpacing: '-0.035em' },
    h2: { fontSize: '2.5rem', fontWeight: 500 },
    bodyMd: { fontSize: '1rem', fontWeight: 400 },
  },
  spacing: {},
  rounded: { full: '9999px' },
  components: {},
  designMd: '',
  dna: {
    archetype: 'Engineered Calm, Monastic Purity & Gravitational Symmetry',
    visualAtmosphere: 'Calmaria arquitetônica e simetria monumental',
    spatialRhythm: {
      density: 'sprawling',
      whitespaceStrategy: 'Margens generosas com foco central',
      containerMaxWidth: '1440px',
    },
    sectionBlueprints: [
      {
        name: 'Hero Section',
        layoutType: 'Centrally Aligned Monumental Symmetry with Gravitational Particle Vortex',
        density: 'sprawling',
        keyVisualElements: ['Centered H1', 'Solitary Pill CTA', 'Particle Vortex'],
        typographyHierarchy: 'H1 Display 4rem',
        designRule: 'Preserve absolute central symmetry. Zero split-screen.',
      },
    ],
    invariants: {
      always: ['Manter simetria centralizada', 'Manter contraste WCAG AA'],
      never: ['Nunca usar split-screen no hero', 'Nunca usar cantos de 0px'],
    },
  },
};

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

  // Viewport mode: desktop, tablet, mobile, fullscreen
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Active tab: preview, markdown, code, blueprints
  const [activeTab, setActiveTab] = useState<'preview' | 'md' | 'code' | 'blueprints'>('preview');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive widget state inside preview
  const [interactiveParam, setInteractiveParam] = useState<number>(35);
  const [tradeInModel, setTradeInModel] = useState<string>('iPhone 14 Pro');
  const [tradeInCredit, setTradeInCredit] = useState<number>(3200);

  // Antigravity Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeNiche = ROULETTE_NICHES[selectedNicheIndex] || ROULETTE_NICHES[0];
  const selectedCompany =
    (Array.isArray(companies) && companies.length > 0
      ? companies.find((c) => c?.id === selectedCompanyId) || companies[0]
      : null) || FALLBACK_COMPANY;

  // Pick niche
  const handleSelectNiche = (index: number) => {
    setSelectedNicheIndex(index);
    const n = ROULETTE_NICHES[index];
    setCustomClientName(n.clientName);
    setCustomPrimaryColor(n.defaultColor);
  };

  // Spin the Roulette with physics
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);

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

  // Canvas particle effect for Antigravity-style live preview
  useEffect(() => {
    if (selectedCompanyId !== 'google-antigravity') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const particles: Array<{
      r: number;
      theta: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const num = 140;
    const colors = [customPrimaryColor, '#FFA000', '#121317', '#5F6368', '#E2E8F0'];

    for (let i = 0; i < num; i++) {
      const progress = i / num;
      const r = 50 + Math.pow(progress, 1.3) * (width * 0.44);
      const theta = progress * Math.PI * 2.8;
      particles.push({
        r: r + (Math.random() - 0.5) * 35,
        theta: theta + (Math.random() - 0.5) * 0.25,
        speed: 0.0018 + Math.random() * 0.002,
        size: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.35 + Math.random() * 0.55,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.58;
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
    return () => cancelAnimationFrame(animId);
  }, [selectedCompanyId, customPrimaryColor, activeTab, viewportMode]);

  // Generate canonical DESIGN.MD for the current combination
  const generatedDesignMd = `---
name: ${customClientName} Design System (Inspired by ${selectedCompany?.name || 'Google Antigravity'})
version: 1.0.0
archetype: "${selectedCompany?.dna?.archetype || 'Engineered Calm, Monastic Purity & Gravitational Symmetry'}"
sourceReference: "${selectedCompany?.name || 'Google Antigravity'} (${selectedCompany?.domain || 'antigravity.google'})"
clientContext:
  businessSector: "${activeNiche.name}"
  clientProject: "${activeNiche.context}"
  primaryColorRequirement: "${customPrimaryColor}"
colors:
  primary: "${customPrimaryColor}"
  secondary: "#5F6368"
  tertiary: "${customPrimaryColor}"
  neutral: "${selectedCompany?.colors?.neutral || '#FAF9F6'}"
  surface: "#FFFFFF"
  border: "${selectedCompany?.colors?.border || '#E8EAED'}"
typography:
  fontFamily: "${selectedCompany?.typography?.fontFamily || 'Google Sans, Inter, sans-serif'}"
  h1:
    fontSize: "${selectedCompanyId === 'google-antigravity' ? '4rem' : '3.5rem'}"
    letterSpacing: "${selectedCompanyId === 'google-antigravity' ? '-0.035em' : '-0.02em'}"
    textAlign: "${selectedCompanyId === 'google-antigravity' ? 'center' : 'left'}"
rounded:
  full: 9999px
---

# Design System: ${customClientName} (Inspirado em ${selectedCompany?.name || 'Google Antigravity'})

## 1. Visual Archetype & Creative Philosophy
- **Arquétipo Herdado:** ${selectedCompany?.dna?.archetype || 'Engineered Calm, Monastic Purity & Gravitational Symmetry'}
- **Atmosfera Visual:** ${selectedCompany?.dna?.visualAtmosphere || 'Calmaria arquitetônica, respiros generosos e pureza geométrica.'}
- **Adaptação para o Nicho:** O projeto ${customClientName} preserva a integridade de layout e os blueprints de ${selectedCompany?.name || 'Google Antigravity'}, aplicando a cor primária ${customPrimaryColor} de forma cirúrgica.

## 2. Spatial Rhythm & Layout Density
- **Densidade:** ${selectedCompany?.dna?.spatialRhythm?.density?.toUpperCase() || 'SPRAWLING'}
- **Estratégia de Espaçamento:** ${selectedCompany?.dna?.spatialRhythm?.whitespaceStrategy || 'Margens de 100px a 120px para respiro e foco absoluto.'}
- **Largura Máxima:** ${selectedCompany?.dna?.spatialRhythm?.containerMaxWidth || '1440px'}

## 3. Section Blueprints (Layout Topology Garantido)
${selectedCompany?.dna?.sectionBlueprints?.map((s, idx) => `
### ${idx + 1}. ${s.name}
- **Padrão de Layout:** ${s.layoutType}
- **Densidade Visual:** ${s.density}
- **Elementos-Chave:** ${Array.isArray(s.keyVisualElements) ? s.keyVisualElements.join(', ') : s.keyVisualElements}
- **Regra de Design Herdada:** ${s.designRule}
`).join('') || ''}

## 4. Design Invariants (Regras Rígidas)
### SEMPRE:
${selectedCompany?.dna?.invariants?.always?.map(a => `- ${a}`).join('\n') || '- Manter coerência de raio de curvatura.\n- Garantir contraste WCAG AA.'}

### NUNCA:
${selectedCompany?.dna?.invariants?.never?.map(n => `- ${n}`).join('\n') || '- Nunca usar split-screen no Hero se o arquétipo for centralizado.\n- Nunca usar cantos afiados de 0px.'}
`;

  // Generated React Component Code
  const generatedReactCode = `import React from 'react';

export default function ${customClientName.replace(/\s+/g, '')}LandingPage() {
  return (
    <div className="min-h-screen bg-[${selectedCompany?.colors?.neutral || '#FAF9F6'}] text-[#121317] font-sans antialiased">
      {/* 1. Header / Navbar */}
      <nav className="border-b border-[#E8EAED] bg-white/90 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg">${customClientName}</div>
        <button className="px-5 py-2 rounded-full bg-[${customPrimaryColor}] text-white text-xs font-semibold shadow-md">
          Acessar Plataforma
        </button>
      </nav>

      {/* 2. Hero Section (${selectedCompany?.dna?.sectionBlueprints?.[0]?.layoutType || 'Monumental Symmetry'}) */}
      <section className="py-24 text-center max-w-4xl mx-auto px-6 space-y-6">
        <h1 className="text-5xl font-medium tracking-[-0.035em] text-[#121317]">
          ${activeNiche.tagline}
        </h1>
        <p className="text-base text-[#5F6368] max-w-2xl mx-auto">
          ${activeNiche.subheadline}
        </p>
        <div className="pt-4">
          <button className="px-8 py-3.5 rounded-full bg-[${customPrimaryColor}] text-white font-semibold shadow-lg">
            Começar Agora
          </button>
        </div>
      </section>

      {/* 3. Feature Section */}
      <section className="py-20 bg-white border-t border-[#E8EAED]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          ${activeNiche.features.map(f => `
          <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] space-y-3">
            <span className="text-xs font-mono font-bold text-[${customPrimaryColor}]">${f.badge}</span>
            <h3 className="text-xl font-medium">${f.title}</h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">${f.description}</p>
          </div>`).join('')}
        </div>
      </section>
    </div>
  );
}
`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    onShowToast(`${type} copiado com sucesso!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const isAntigravity = selectedCompanyId === 'google-antigravity';
  const isAbacatePay = selectedCompanyId === 'abacatepay';
  const isStripe = selectedCompanyId === 'stripe';
  const isLinear = selectedCompanyId === 'linear' || selectedCompanyId === 'supabase';

  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-[#121317] font-sans antialiased pb-24 ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-white' : ''}`}>
      {/* ========================================================= */}
      {/* 1. TOP HEADER & BREADCRUMB                                */}
      {/* ========================================================= */}
      {!isFullscreen && (
        <header className="border-b border-[#E8EAED] bg-white sticky top-0 z-40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/explore"
                className="text-xs font-mono text-[#5F6368] hover:text-[#121317] flex items-center space-x-1.5 transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#FF6B00]" />
                <span>Catálogo</span>
              </Link>
              <span className="text-[#E8EAED]">/</span>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="text-sm font-semibold text-[#121317]">
                  Estúdio Roleta de Design DNA • Compilador de Previews
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/preview/orbit-celulares"
                className="px-3 py-1.5 rounded-full border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] transition-colors hidden sm:inline-flex items-center space-x-1"
              >
                <span>Orbit Mobile</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                to="/preview/nutriflui"
                className="px-3 py-1.5 rounded-full border border-[#E8EAED] hover:bg-black/5 text-xs font-mono text-[#121317] transition-colors hidden sm:inline-flex items-center space-x-1"
              >
                <span>NutriFlui</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* ========================================================= */}
      {/* 2. ROULETTE CONTROLS DRAWER                               */}
      {/* ========================================================= */}
      {!isFullscreen && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Roulette Wheel & Niche Selector */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8EAED] p-6 space-y-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E8EAED] pb-3">
                  <div>
                    <h3 className="font-semibold text-sm text-[#121317] flex items-center space-x-2">
                      <span>1. Roleta de Nichos de Negócio</span>
                      <span>🎲</span>
                    </h3>
                    <p className="text-[11px] text-[#5F6368]">
                      Gire para sortear ou clique direto em um nicho
                    </p>
                  </div>

                  <button
                    onClick={spinRoulette}
                    disabled={isSpinning}
                    className="px-4 py-2 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all active:scale-95 shadow-sm disabled:opacity-50"
                  >
                    <Dice5 className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                    <span>{isSpinning ? 'Sorteando...' : 'Girar Roleta!'}</span>
                  </button>
                </div>

                {/* Rotating Visual Hub */}
                <div className="py-4 flex justify-center items-center relative overflow-hidden">
                  <div
                    className="w-36 h-36 rounded-full border-4 border-[#121317] shadow-lg relative flex items-center justify-center transition-transform duration-[2800ms] ease-out bg-gradient-to-tr from-[#FAF9F6] to-white"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                  >
                    {ROULETTE_NICHES.map((n, idx) => {
                      const angle = (360 / ROULETTE_NICHES.length) * idx;
                      return (
                        <div
                          key={n.id}
                          className="absolute text-base font-bold cursor-pointer hover:scale-125 transition-transform"
                          style={{
                            transform: `rotate(${angle}deg) translate(0, -50px) rotate(-${angle}deg)`,
                          }}
                        >
                          {n.icon}
                        </div>
                      );
                    })}
                    <div className="w-12 h-12 rounded-full bg-[#121317] text-white flex flex-col items-center justify-center shadow-md z-10 text-[10px] font-mono font-bold text-[#FF6B00]">
                      NICHO
                    </div>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#FF6B00] -mt-1 z-20 absolute top-2" />
                </div>

                {/* Selected Active Niche Pill */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8EAED] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#5F6368] uppercase text-[10px]">Segmento Ativo:</span>
                    <span className="font-bold text-[#121317] flex items-center space-x-1">
                      <span>{activeNiche.icon}</span>
                      <span>{activeNiche.name}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5F6368] line-clamp-2">
                    {activeNiche.context}
                  </p>
                </div>
              </div>

              {/* Quick Niche Picker Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-2">
                {ROULETTE_NICHES.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => handleSelectNiche(idx)}
                    className={`px-2.5 py-1.5 rounded-xl text-left text-[11px] font-medium border transition-all flex items-center space-x-1.5 ${
                      selectedNicheIndex === idx
                        ? 'border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-semibold'
                        : 'border-[#E8EAED] text-[#5F6368] hover:border-[#121317]/20 bg-white'
                    }`}
                  >
                    <span>{n.icon}</span>
                    <span className="truncate">{n.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Reference Benchmark Site & Trigger */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8EAED] p-6 space-y-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-[#E8EAED] pb-3">
                  <h3 className="font-semibold text-sm text-[#121317]">
                    2. Escolha o Sistema de Design de Origem (A Referência Arquitetural)
                  </h3>
                  <p className="text-[11px] text-[#5F6368]">
                    O motor preserva a topologia e as regras visuais da marca selecionada
                  </p>
                </div>

                {/* System Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'google-antigravity', name: 'Google Antigravity', icon: '🌌', badge: 'Simetria Monumental', sub: 'Hero centralizado, vórtice de partículas e pílula solitária' },
                    { id: 'abacatepay', name: 'AbacatePay', icon: '🥑', badge: 'Playful Neo-Organic', sub: 'Verde botânico, pílulas táteis e microcopy esperto' },
                    { id: 'stripe', name: 'Stripe', icon: '💳', badge: 'Prismatic Mesh', sub: 'Gradiente mesh, terminais e rigor financeiro' },
                    { id: 'linear', name: 'Linear', icon: '📐', badge: 'Tactile Darkroom', sub: 'Bordas finas de 1px, ⌘K e bento grid' },
                    { id: 'airbnb', name: 'Airbnb', icon: '🏡', badge: 'Warm Editorial', sub: 'Papel aquecido e fotografia imersiva' },
                    { id: 'vercel', name: 'Vercel', icon: '▲', badge: 'Monocromático', sub: 'Triângulos, contraste preto/branco e edge compute' },
                  ].map((sys) => {
                    const isSel = selectedCompanyId === sys.id;
                    return (
                      <button
                        key={sys.id}
                        onClick={() => setSelectedCompanyId(sys.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSel
                            ? 'border-[#121317] bg-[#121317] text-white shadow-md'
                            : 'border-[#E8EAED] bg-[#FAF9F6] text-[#121317] hover:border-[#121317]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base">{sys.icon}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full ${isSel ? 'bg-white/20 text-white' : 'bg-black/5 text-[#5F6368]'}`}>
                            {sys.badge}
                          </span>
                        </div>
                        <div className="font-semibold text-xs truncate">{sys.name}</div>
                        <div className={`text-[9px] line-clamp-2 mt-0.5 ${isSel ? 'text-white/70' : 'text-[#5F6368]'}`}>
                          {sys.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom tuning: Brand Name & Color */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#5F6368] mb-1">
                      Nome da Marca Gerada:
                    </label>
                    <input
                      type="text"
                      value={customClientName}
                      onChange={(e) => setCustomClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8EAED] bg-[#FAF9F6] text-xs font-semibold text-[#121317] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#5F6368] mb-1">
                      Cor Primária Solicitada:
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={customPrimaryColor}
                        onChange={(e) => setCustomPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border border-[#E8EAED] cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={customPrimaryColor}
                        onChange={(e) => setCustomPrimaryColor(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-[#E8EAED] bg-[#FAF9F6] text-xs font-mono font-semibold text-[#121317]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-3 border-t border-[#E8EAED] flex items-center justify-between text-xs font-mono text-[#5F6368]">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Blueprints & Invariantes sincronizados</span>
                </div>
                <div className="text-[11px] text-[#FF6B00] font-semibold">
                  Preview renderizado automaticamente abaixo ↓
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. VIEWPORT INSPECTION & WORKSPACE TOOLBAR                 */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E8EAED] p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          {/* Main Action Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'preview'
                  ? 'bg-[#121317] text-white shadow-xs'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>🖥️ Live Preview Completo ({customClientName})</span>
            </button>

            <button
              onClick={() => setActiveTab('md')}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'md'
                  ? 'bg-[#121317] text-white shadow-xs'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>📄 DESIGN.MD Canônico</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'code'
                  ? 'bg-[#121317] text-white shadow-xs'
                  : 'text-[#5F6368] hover:text-[#121317]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>💻 Código React JSX</span>
            </button>
          </div>

          {/* Right: Device Viewport Switcher & Fullscreen */}
          <div className="flex items-center space-x-2">
            {activeTab === 'preview' && (
              <div className="flex items-center bg-[#FAF9F6] border border-[#E8EAED] rounded-xl p-0.5">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${viewportMode === 'desktop' ? 'bg-white shadow-2xs text-[#121317]' : 'text-[#5F6368]'}`}
                  title="Desktop (100%)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${viewportMode === 'tablet' ? 'bg-white shadow-2xs text-[#121317]' : 'text-[#5F6368]'}`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${viewportMode === 'mobile' ? 'bg-white shadow-2xs text-[#121317]' : 'text-[#5F6368]'}`}
                  title="Mobile (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl border border-[#E8EAED] text-[#5F6368] hover:text-[#121317] hover:bg-black/5 transition-colors"
              title={isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. RENDERED PREVIEW VIEWPORT (The Real Landing Page)      */}
        {/* ========================================================= */}
        {activeTab === 'preview' && (
          <div className="flex justify-center mt-6">
            <div
              className={`w-full transition-all duration-300 rounded-3xl border border-[#E8EAED] overflow-hidden bg-white shadow-2xl ${
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
                  <span className="ml-3 px-3 py-0.5 rounded-full bg-white border border-[#E8EAED]">
                    https://{customClientName.toLowerCase().replace(/\s+/g, '')}.com
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span>Arquétipo: <strong>{selectedCompany?.name || 'Google Antigravity'}</strong></span>
                  <span>•</span>
                  <span style={{ color: customPrimaryColor }} className="font-bold">
                    {customPrimaryColor}
                  </span>
                </div>
              </div>

              {/* =================================================== */}
              {/* VARIANT A: GOOGLE ANTIGRAVITY ARCHETYPE             */}
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
                      Apresentando o programa oficial {customClientName} 2026
                    </span>
                    <span className="text-xs">→</span>
                  </div>

                  {/* Antigravity Navbar */}
                  <header className="border-b border-[#E8EAED] bg-[#FAF9F6]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: customPrimaryColor }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#121317]" />
                        </div>
                        <span className="font-medium text-base tracking-tight">{customClientName}</span>
                      </div>
                      <div className="hidden md:flex items-center space-x-5 text-xs text-[#5F6368]">
                        <span className="hover:text-[#121317] cursor-pointer">Visão Geral</span>
                        <span className="hover:text-[#121317] cursor-pointer">Especificações</span>
                        <span className="hover:text-[#121317] cursor-pointer">Empresas</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onShowToast(`Ação disparada no preview de ${customClientName}!`)}
                      className="px-5 py-2 rounded-full text-white text-xs font-medium shadow-sm transition-all"
                      style={{ backgroundColor: customPrimaryColor }}
                    >
                      Explorar Plataforma ↓
                    </button>
                  </header>

                  {/* Monumental Centered Hero with Live Particle Canvas */}
                  <section className="relative min-h-[580px] flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
                    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-80" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                      <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                        <span>[2026 SERIES] • RIGOR DE SILÍCIO</span>
                      </div>

                      <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.035em] text-[#121317] leading-[1.06]">
                        {activeNiche.tagline}
                      </h1>

                      <p className="text-base text-[#5F6368] max-w-xl mx-auto font-normal leading-relaxed">
                        {activeNiche.subheadline}
                      </p>

                      <div className="pt-2 flex justify-center">
                        <button
                          onClick={() => onShowToast(`Explorar ativado!`)}
                          className="px-8 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 active:scale-95"
                          style={{ backgroundColor: customPrimaryColor }}
                        >
                          <span>Acessar Plataforma</span>
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Feature Explorer in Alternating Spacious Rows */}
                  <section className="py-24 bg-white border-t border-[#E8EAED] px-6">
                    <div className="max-w-5xl mx-auto space-y-24">
                      <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="text-xs font-mono font-bold uppercase" style={{ color: customPrimaryColor }}>
                          Catálogo de Vanguarda
                        </span>
                        <h2 className="text-3xl font-medium tracking-tight text-[#121317]">
                          Engenharia sem compromissos para a era da precisão.
                        </h2>
                      </div>

                      {activeNiche.features.map((feat, idx) => (
                        <div
                          key={feat.title}
                          className={`grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${
                            idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <div className={`md:col-span-5 space-y-4 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                            <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8EAED] text-[10px] font-mono text-[#5F6368]">
                              {feat.badge}
                            </span>
                            <h3 className="text-2xl font-medium text-[#121317]">{feat.title}</h3>
                            <p className="text-sm text-[#5F6368] leading-relaxed">{feat.description}</p>
                            <div className="text-xs font-mono font-semibold" style={{ color: customPrimaryColor }}>
                              {feat.metric}
                            </div>
                          </div>

                          <div className={`md:col-span-7 flex justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                            <div className="w-full max-w-md p-8 rounded-3xl bg-[#FAF9F6] border border-[#E8EAED] shadow-sm space-y-4">
                              <div className="w-full h-44 rounded-2xl bg-white border border-[#E8EAED] flex flex-col items-center justify-center p-4 text-center space-y-2">
                                <span className="text-3xl">{activeNiche.icon}</span>
                                <span className="font-mono text-xs text-[#5F6368]">{feat.title}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs font-mono text-[#5F6368]">
                                <span>Status: Certificado</span>
                                <span className="font-semibold text-[#121317]">{feat.metric}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Interactive Trade-In / Valuation Widget */}
                  <section className="py-20 bg-[#FAF9F6] border-t border-[#E8EAED] px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8EAED] p-8 sm:p-12 shadow-sm space-y-8">
                      <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-mono text-[#5F6368]">
                          Calculadora de Conversão
                        </span>
                        <h3 className="text-2xl font-medium text-[#121317]">
                          Simulador de Economia e Bônus em Tempo Real
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                          <label className="block text-xs font-mono uppercase text-[#5F6368]">
                            Ajuste de Parâmetro / Volume:
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="150"
                            value={interactiveParam}
                            onChange={(e) => setInteractiveParam(Number(e.target.value))}
                            className="w-full accent-[#FF6B00]"
                          />
                          <div className="flex justify-between text-xs font-mono text-[#5F6368]">
                            <span>Base: 10</span>
                            <span className="font-bold text-[#121317]">{interactiveParam} unidades</span>
                            <span>Max: 150</span>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#121317] text-white space-y-3">
                          <div className="text-xs font-mono text-white/60 uppercase">Resultado Calculado</div>
                          <div className="text-3xl font-bold tracking-tight text-white" style={{ color: customPrimaryColor }}>
                            R$ {(interactiveParam * 89).toLocaleString('pt-BR')},00
                          </div>
                          <p className="text-xs text-white/70">
                            Estimativa instantânea calculada sem letrinhas miúdas.
                          </p>
                          <button
                            onClick={() => onShowToast(`Simulação gravada para ${customClientName}!`)}
                            className="w-full py-2.5 rounded-full text-white text-xs font-bold transition-all"
                            style={{ backgroundColor: customPrimaryColor }}
                          >
                            Garantir Condição Exclusiva
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Clean Monolithic Footer */}
                  <footer className="border-t border-[#E8EAED] bg-white py-12 px-6 text-xs text-[#5F6368]">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#121317]">{customClientName}</span>
                        <span>• Estética fielmente herdada de Google Antigravity</span>
                      </div>
                      <div className="flex items-center space-x-4 font-mono">
                        <span>Primária: {customPrimaryColor}</span>
                        <span>Contraste: WCAG AA</span>
                      </div>
                    </div>
                  </footer>
                </div>
              )}

              {/* =================================================== */}
              {/* VARIANT B: ABACATEPAY ARCHETYPE (Playful Neo-Organic)*/}
              {/* =================================================== */}
              {isAbacatePay && (
                <div className="bg-[#F7FAF6] text-[#1F4647] antialiased">
                  {/* Botanical Header */}
                  <header className="border-b border-[#E3EBE1] bg-white px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{activeNiche.icon}</span>
                      <span className="font-extrabold text-lg text-[#1F4647]">{customClientName}</span>
                    </div>
                    <button
                      className="px-6 py-2 rounded-full font-bold text-xs text-[#1F4647] shadow-sm hover:scale-105 transition-transform"
                      style={{ backgroundColor: customPrimaryColor || '#9EEA6C' }}
                    >
                      Criar Conta em 2 min
                    </button>
                  </header>

                  {/* Playful Asymmetric Hero */}
                  <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3EBE1] text-xs font-bold">
                        <span>🌱</span>
                        <span>Do jeito que você e seu time merecem</span>
                      </div>

                      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F4647] leading-tight">
                        {activeNiche.tagline}
                      </h1>

                      <p className="text-sm text-[#486E6F] leading-relaxed max-w-lg">
                        {activeNiche.subheadline}
                      </p>

                      <div className="flex items-center space-x-3 pt-2">
                        <button
                          className="px-8 py-3.5 rounded-full font-extrabold text-sm text-[#1F4647] shadow-md hover:scale-105 active:scale-95 transition-all"
                          style={{ backgroundColor: customPrimaryColor || '#9EEA6C' }}
                        >
                          Começar sem Cartão
                        </button>
                        <span className="text-xs text-[#486E6F] font-semibold">Sem migué. Cancele quando quiser.</span>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <div className="p-8 rounded-[36px] bg-[#1F4647] text-white shadow-xl space-y-4">
                        <span className="text-xs font-mono font-bold uppercase text-[#9EEA6C]">Plano Transparente</span>
                        <div className="text-4xl font-extrabold text-white">
                          R$ 89 <span className="text-sm font-normal text-white/70">/mês fixo</span>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                          Nada de cobrança escondida por paciente ou transação. Você cresce sem pagar mais por isso.
                        </p>
                        <div className="p-3 rounded-2xl bg-white/10 text-xs font-bold text-center">
                          Economia média de R$ 1.450/mês
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Feature Bento */}
                  <section className="py-16 bg-white border-t border-[#E3EBE1] px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                      {activeNiche.features.map(f => (
                        <div key={f.title} className="p-6 rounded-[32px] bg-[#F7FAF6] border border-[#E3EBE1] space-y-3">
                          <span className="px-3 py-1 rounded-full bg-white text-xs font-bold text-[#1F4647]">
                            {f.badge}
                          </span>
                          <h3 className="text-xl font-bold text-[#1F4647]">{f.title}</h3>
                          <p className="text-xs text-[#486E6F] leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* =================================================== */}
              {/* VARIANT C: STRIPE / LINEAR / PRISMATIC / DARKROOM   */}
              {/* =================================================== */}
              {(!isAntigravity && !isAbacatePay) && (
                <div className={`${isLinear ? 'bg-[#0D0E12] text-white' : 'bg-[#FAF9F6] text-[#121317]'} antialiased p-8 sm:p-14 space-y-16`}>
                  <header className="flex justify-between items-center border-b pb-4 border-current/10">
                    <div className="font-bold text-lg font-mono">{customClientName}</div>
                    <button
                      className="px-6 py-2 rounded-full text-white text-xs font-medium shadow-md"
                      style={{ backgroundColor: customPrimaryColor }}
                    >
                      Acessar Console
                    </button>
                  </header>

                  <section className="max-w-4xl mx-auto text-center space-y-6 py-10">
                    <div className="text-xs font-mono uppercase tracking-wider opacity-60">
                      Infraestrutura de Alta Precisão
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
                      {activeNiche.tagline}
                    </h1>
                    <p className="text-base opacity-70 max-w-2xl mx-auto">
                      {activeNiche.subheadline}
                    </p>
                    <div className="pt-2">
                      <button
                        className="px-8 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg"
                        style={{ backgroundColor: customPrimaryColor }}
                      >
                        Começar Agora
                      </button>
                    </div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {activeNiche.features.map(f => (
                      <div key={f.title} className="p-6 rounded-2xl border border-current/10 space-y-2 bg-current/5">
                        <div className="text-xs font-mono font-bold" style={{ color: customPrimaryColor }}>{f.badge}</div>
                        <h3 className="text-lg font-semibold">{f.title}</h3>
                        <p className="text-xs opacity-70 leading-relaxed">{f.description}</p>
                      </div>
                    ))}
                  </section>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Full Generated Canonical DESIGN.MD */}
        {activeTab === 'md' && (
          <div className="bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-4 shadow-sm mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-[#121317]">
                  DESIGN.MD Canônico Gerado para {customClientName}
                </h3>
                <p className="text-xs text-[#5F6368] font-mono">
                  Documento com Blueprints de Seções, Topologia e Invariantes extraídos de {selectedCompany?.name || 'Google Antigravity'}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(generatedDesignMd, 'DESIGN.MD')}
                className="px-4 py-2 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-xs font-mono transition-colors flex items-center space-x-1.5"
              >
                {copiedText === 'DESIGN.MD' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'DESIGN.MD' ? 'Copiado!' : 'Copiar .MD'}</span>
              </button>
            </div>

            <pre className="p-6 rounded-2xl bg-[#121317] text-[#FAF9F6] font-mono text-xs leading-5 overflow-x-auto whitespace-pre max-h-[600px]">
              {generatedDesignMd}
            </pre>
          </div>
        )}

        {/* Tab 3: Generated React Component Code */}
        {activeTab === 'code' && (
          <div className="bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 space-y-4 shadow-sm mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-[#121317]">
                  Código React / Tailwind JSX Sintetizado
                </h3>
                <p className="text-xs text-[#5F6368] font-mono">
                  Código compilado pronto para colar no projeto frontend do cliente
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(generatedReactCode, 'Código React')}
                className="px-4 py-2 rounded-full bg-[#121317] hover:bg-[#FF6B00] text-white text-xs font-mono transition-colors flex items-center space-x-1.5"
              >
                {copiedText === 'Código React' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'Código React' ? 'Copiado!' : 'Copiar JSX'}</span>
              </button>
            </div>

            <pre className="p-6 rounded-2xl bg-[#121317] text-[#FAF9F6] font-mono text-xs leading-5 overflow-x-auto whitespace-pre max-h-[600px]">
              {generatedReactCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignDnaRoulettePage;
