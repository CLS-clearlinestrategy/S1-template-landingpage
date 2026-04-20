export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  parallaxLayers: ParallaxLayer[];
}

export interface ParallaxLayer {
  speed: number;
  content: string;
  className?: string;
}

export interface BackgroundGifConfig {
  gifUrl: string;
  overlayColor: string;
  blur: string;
}

export interface ScrollVideoSlide {
  title: string;
  highlight?: string;
  description?: string;
}

export interface ScrollVideoConfig {
  src: string;
  scrollHeight: string;
  videoOpacity: number;
  slides: ScrollVideoSlide[];
}

/* ── Content Block Discriminated Union ── */

interface BaseBlock {
  id: string;
  title: string;
  highlight?: string;
  description?: string;
}

export interface ImageBlockConfig extends BaseBlock {
  type: "image";
  imageUrl: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  features?: string[];
}

export interface VideoBlockConfig extends BaseBlock {
  type: "video";
  videoUrl: string;
  posterImage?: string;
  videoPosition?: "left" | "right";
}

export interface FeatureBlockItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesBlockConfig extends BaseBlock {
  type: "features";
  items: FeatureBlockItem[];
}

export interface FAQBlockConfig extends BaseBlock {
  type: "faq";
  questions: { question: string; answer: string }[];
}

export interface TestimonialsBlockConfig extends BaseBlock {
  type: "testimonials";
  testimonials: { name: string; role: string; content: string; avatarUrl: string }[];
}

export interface LogoBarBlockConfig extends BaseBlock {
  type: "logobar";
  logos: { name: string; logoUrl: string }[];
}

export interface ProcessBlockConfig extends BaseBlock {
  type: "process";
  steps: { icon: string; title: string; description: string }[];
}

export interface TeamBlockConfig extends BaseBlock {
  type: "team";
  members: { name: string; role: string; photoUrl: string }[];
}

export interface StatsBlockConfig extends BaseBlock {
  type: "stats";
  stats: { value: string; label: string }[];
}

export type ContentBlockConfig =
  | ImageBlockConfig
  | VideoBlockConfig
  | FeaturesBlockConfig
  | FAQBlockConfig
  | TestimonialsBlockConfig
  | LogoBarBlockConfig
  | ProcessBlockConfig
  | TeamBlockConfig
  | StatsBlockConfig;

export interface ExperienceCard {
  icon: string;
  title: string;
  description: string;
  tag?: string;
}

export interface ContactFormContent {
  title: string;
  subtitle: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  nav: NavLink[];
  hero: HeroContent;
  scrollVideo: ScrollVideoConfig;
  features: FeatureItem[];
  contentBlocks: ContentBlockConfig[];
  experiences: {
    title: string;
    subtitle: string;
    cards: ExperienceCard[];
  };
  contact: ContactFormContent;
  footer: {
    copyright: string;
    tagline: string;
    socials: SocialLink[];
  };
  backgroundGif: BackgroundGifConfig;
}

export const siteConfig: SiteConfig = {
  name: "Ravius",
  description: "Plataforma moderna para escalar seu negócio digital.",

  nav: [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Experiências", href: "#experiences" },
    { label: "Contato", href: "#contact" },
  ],

  backgroundGif: {
    gifUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmpxcXoxN252N3R2MzZzaTRvcGJzNHY5MDJ2aXNzM3hranRtdXI0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3BZHlKZbrJwL0buDOc/giphy.gif",
    overlayColor: "bg-black/80",
    blur: "blur-3xl",
  },

  hero: {
    badge: "Versão - v1.1 - S0",
    title: "Construa experiências",
    highlight: "extraordinárias",
    subtitle:
      "Uma base escalável e modular para criar landing pages de alta performance com animações fluidas e design impecável.",
    ctaPrimary: "Começar agora",
    ctaPrimaryHref: "#experiences",
    ctaSecondary: "Saiba mais",
    ctaSecondaryHref: "#about",
    parallaxLayers: [
      { speed: 0.3, content: "◆", className: "text-primary/10 text-[120px] top-[15%] left-[10%]" },
      { speed: 0.2, content: "○", className: "text-primary/8 text-[80px] top-[60%] right-[15%]" },
      { speed: 0.4, content: "△", className: "text-primary/6 text-[100px] bottom-[20%] left-[70%]" },
    ],
  },

  scrollVideo: {
    src: "/video-underwater-optimized.mp4",
    scrollHeight: "300vh",
    videoOpacity: 0.5,
    slides: [
      {
        title: "Você merece um sistema",
        highlight: "melhor.",
        description: "Software ruim é barato e custa caro. Resolva isso.",
      },
      {
        title: "Transformamos sistemas em vantagem competitiva.",
        description: "Fundamos a Ravius para mudar a realidade das empresas.",
      },
    ],
  },

  features: [
    { icon: "Zap", title: "Performance extrema", description: "Otimizado com requestAnimationFrame e lazy loading para 60fps constantes." },
    { icon: "Layers", title: "Modular por design", description: "Hooks isolados, config centralizada e componentes desacoplados." },
    { icon: "Shield", title: "TypeScript estrito", description: "Interfaces tipadas para cada dado, garantindo segurança e previsibilidade." },
    { icon: "Sparkles", title: "Animações sofisticadas", description: "Parallax, scroll reveal e transições suaves com Lenis integrado." },
  ],

  contentBlocks: [
    {
      id: "about",
      type: "image",
      title: "Arquitetura que",
      highlight: "escala",
      description:
        "O Padrão Ravius separa dados, lógica e visual em camadas independentes. Isso significa que você pode trocar o design inteiro sem tocar na lógica de negócio — ou vice-versa.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      imageAlt: "Dashboard de arquitetura modular",
      imagePosition: "right",
      features: [
        "Configuração centralizada em um único arquivo",
        "Hooks reutilizáveis e testáveis",
        "Componentes puros sem side-effects",
      ],
    },
    {
      id: "demo-video",
      type: "video",
      title: "Veja em",
      highlight: "ação",
      description:
        "Assista como o Padrão Ravius acelera a criação de interfaces modernas com scroll suave, parallax e animações baseadas em física real.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      posterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      videoPosition: "left",
    },
    {
      id: "philosophy",
      type: "image",
      title: "Design com",
      highlight: "propósito",
      description:
        "Cada pixel foi pensado para contar uma história. Glassmorphism sutil, tipografia precisa e micro-animações que guiam o olhar sem distrair.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      imageAlt: "Design abstrato com formas geométricas",
      imagePosition: "left",
      features: [
        "Sistema de tokens semânticos em HSL",
        "Glassmorphism com dois níveis de intensidade",
        "Animações baseadas em física real",
      ],
    },
    {
      id: "differentials",
      type: "features",
      title: "Nossos",
      highlight: "diferenciais",
      description:
        "Cada detalhe foi projetado para entregar a melhor experiência possível, do código à interface final.",
      items: [
        { icon: "Zap", title: "Ultra Rápido", description: "Build otimizado com Vite e tree-shaking agressivo para bundles mínimos." },
        { icon: "Palette", title: "Design Tokens", description: "Sistema semântico de cores HSL com suporte nativo a temas." },
        { icon: "Code2", title: "DX Premium", description: "TypeScript estrito, auto-complete rico e zero configuração manual." },
        { icon: "Shield", title: "Segurança First", description: "Validação Zod em todas as entradas e sanitização automática." },
      ],
    },
    {
      id: "stats",
      type: "stats",
      title: "Resultados que",
      highlight: "falam por si",
      description: "Números reais de clientes que adotaram o Padrão Ravius em seus negócios.",
      stats: [
        { value: "+320%", label: "Aumento em conversões" },
        { value: "1.2s", label: "Tempo médio de carregamento" },
        { value: "98", label: "Pontuação Lighthouse" },
        { value: "+150", label: "Projetos entregues" },
      ],
    },
    {
      id: "process",
      type: "process",
      title: "Como",
      highlight: "funciona",
      description: "Um processo claro e eficiente para transformar sua presença digital em semanas, não meses.",
      steps: [
        { icon: "MessageSquare", title: "Descoberta", description: "Entendemos seu negócio, público-alvo e objetivos para traçar a estratégia ideal." },
        { icon: "PenTool", title: "Design & Prototipação", description: "Criamos protótipos interativos com seu branding aplicado ao Padrão Ravius." },
        { icon: "Code2", title: "Desenvolvimento", description: "Implementação modular com TypeScript estrito, testes e deploy automatizado." },
        { icon: "Rocket", title: "Lançamento & Suporte", description: "Deploy em produção com monitoramento, analytics e suporte contínuo pós-lançamento." },
      ],
    },
    {
      id: "testimonials",
      type: "testimonials",
      title: "O que nossos clientes",
      highlight: "dizem",
      description: "Depoimentos reais de profissionais que transformaram seus negócios com o Padrão Ravius.",
      testimonials: [
        {
          name: "Dra. Camila Ferreira",
          role: "Diretora — Clínica Vitale",
          content: "Depois de adotar o Ravius, nosso agendamento online cresceu 240%. A landing page transmite exatamente a sofisticação que nossos pacientes esperam.",
          avatarUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=100&h=100&fit=crop&crop=face",
        },
        {
          name: "Ricardo Mendes",
          role: "CEO — Aura Spa & Wellness",
          content: "A velocidade de carregamento e as animações fluidas fizeram toda a diferença. Nossos clientes comentam sobre a experiência do site antes mesmo da primeira sessão.",
          avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        },
        {
          name: "Ana Beatriz Costa",
          role: "Fundadora — Studio Lumière",
          content: "Ter uma landing page que reflete a identidade do meu estúdio era essencial. O Ravius entregou isso com uma arquitetura que minha equipe de marketing consegue atualizar sozinha.",
          avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        },
      ],
    },
    {
      id: "logos",
      type: "logobar",
      title: "Empresas que",
      highlight: "confiam",
      description: "Parceiros e clientes que já utilizam o Padrão Ravius em seus projetos.",
      logos: [
        { name: "Clínica Vitale", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Vitale&font=outfit" },
        { name: "Aura Spa", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Aura+Spa&font=outfit" },
        { name: "Studio Lumière", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Lumière&font=outfit" },
        { name: "Dermavita", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Dermavita&font=outfit" },
        { name: "ZenFlow", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=ZenFlow&font=outfit" },
        { name: "NeoHealth", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=NeoHealth&font=outfit" },
      ],
    },
    {
      id: "team",
      type: "team",
      title: "Quem está por",
      highlight: "trás",
      description: "Conheça a equipe que desenha, desenvolve e mantém o Padrão Ravius.",
      members: [
        { name: "Samuel Oliveira", role: "Arquiteto Front-end", photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
        { name: "Mariana Silva", role: "UI/UX Designer", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
        { name: "Lucas Andrade", role: "Engenheiro Full-stack", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
        { name: "Isabela Costa", role: "Estrategista Digital", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
      ],
    },
    {
      id: "faq",
      type: "faq",
      title: "Perguntas",
      highlight: "frequentes",
      description: "Tire suas dúvidas sobre o Padrão Ravius e como ele pode ajudar seu negócio.",
      questions: [
        {
          question: "O que é o Padrão Ravius?",
          answer: "É uma arquitetura front-end modular e tipada, projetada para criar landing pages de alta performance. Ele separa dados, lógica e visual em camadas independentes, permitindo escalar e personalizar sem reescrever código.",
        },
        {
          question: "Preciso saber programar para usar?",
          answer: "Para personalizar conteúdo, não — basta editar o arquivo siteConfig.ts. Para criar novos componentes ou alterar o comportamento, conhecimentos de React e TypeScript são recomendados.",
        },
        {
          question: "Qual o tempo médio de implementação?",
          answer: "Um projeto completo com branding personalizado é entregue em 2 a 4 semanas. Projetos que usam o template base podem estar no ar em poucos dias.",
        },
        {
          question: "O Ravius funciona com qualquer back-end?",
          answer: "Sim. Como é uma solução puramente front-end (React + Vite), ele pode consumir qualquer API REST ou GraphQL. A integração com Supabase, Firebase ou back-ends customizados é direta.",
        },
        {
          question: "Há suporte após o lançamento?",
          answer: "Oferecemos planos de suporte contínuo que incluem atualizações de dependências, monitoramento de performance e ajustes de conteúdo sob demanda.",
        },
      ],
    },
  ],

  experiences: {
    title: "Experiências que",
    subtitle: "inspiram",
    cards: [
      { icon: "Rocket", title: "Lançamento Rápido", description: "Do conceito ao deploy em horas, não semanas. Estrutura pronta para produção.", tag: "Velocidade" },
      { icon: "Palette", title: "Design System", description: "Tokens, variantes e componentes coesos que mantêm a consistência visual.", tag: "Visual" },
      { icon: "Code2", title: "Developer Experience", description: "TypeScript estrito, hooks isolados e zero dependências desnecessárias.", tag: "DX" },
      { icon: "BarChart3", title: "Performance First", description: "IntersectionObserver, rAF e lazy loading para métricas Core Web Vitals perfeitas.", tag: "Metrics" },
      { icon: "Globe", title: "Pronto para o Mundo", description: "Config centralizada facilita i18n, multi-tema e personalização por cliente.", tag: "Scale" },
      { icon: "Lock", title: "Segurança Integrada", description: "Validação com Zod, sanitização de inputs e boas práticas desde o dia zero.", tag: "Security" },
    ],
  },

  contact: {
    title: "Vamos conversar?",
    subtitle: "Envie sua mensagem e retornaremos em breve.",
    fields: {
      name: { label: "Nome", placeholder: "Seu nome completo" },
      email: { label: "E-mail", placeholder: "seu@email.com" },
      message: { label: "Mensagem", placeholder: "Como podemos ajudar?" },
    },
    submitLabel: "Enviar mensagem",
    successMessage: "Mensagem enviada com sucesso!",
    errorMessage: "Erro ao enviar. Tente novamente.",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Ravius. Todos os direitos reservados.`,
    tagline: "Construído com o Padrão Ravius.",
    socials: [
      { platform: "GitHub", url: "https://github.com", icon: "Github" },
      { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    ],
  },
};
