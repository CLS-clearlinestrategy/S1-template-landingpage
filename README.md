<div align="center">

<br />

<picture>
  <img alt="Ravius" src="./ravius.svg" height="64" />
</picture>

# Landing Page Template S1

**Base de produção para Landing Pages modernas, escaláveis e prontas para IA.**

<br />

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-22c55e?style=flat-square)](LICENSE)

<br />

[Início Rápido](#-início-rápido) · [Arquitetura](#-arquitetura) · [Personalizando](#-personalizando-o-conteúdo) · [Expandindo](#-expandindo-o-template) · [Convenções](#-convenções)

<br />

</div>

---

## Sobre o Projeto

Este repositório é a **base oficial de produção** para Landing Pages da Ravius. Não é uma coleção de componentes avulsos — é uma **arquitetura opinativa e documentada** que elimina decisões repetitivas, previne bugs em produção e garante que qualquer desenvolvedor (ou IA como Cursor, Copilot e Lovable) possa contribuir sem introduzir efeitos colaterais.

A aplicação é construída sobre o **Padrão Ravius de Arquitetura Front-End**: quatro camadas com responsabilidades estritamente isoladas, comunicando-se em fluxo unidirecional. O princípio central é simples — o componente que renderiza um botão não precisa saber calcular a matemática de um scroll.

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| [React](https://react.dev/) | 18.3.1 | Camada de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Tipagem estrita e contratos de interface |
| [Vite](https://vitejs.dev/) | 5.4.19 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utilitários de estilo + Design Tokens |
| [React Router](https://reactrouter.com/) | 6.30.1 | Roteamento SPA |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3.21 | Smooth scroll com física real |
| [Lucide React](https://lucide.dev/) | 0.462.0 | Iconografia |
| [TanStack Query](https://tanstack.com/query) | 5.83.0 | Estado assíncrono e cache |
| [Sonner](https://sonner.emilkowal.ski/) | 1.7.4 | Notificações toast |
| [Vitest](https://vitest.dev/) | 3.2.4 | Testes unitários |

> **Gerenciador de pacotes:** [Bun](https://bun.sh/). Os comandos abaixo usam `bun` — substitua por `npm run` se preferir.

---

## Início Rápido

### Pré-requisitos

- [Bun](https://bun.sh/) `>= 1.x` (recomendado) ou Node.js `>= 20.x`

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/CLS-clearlinestrategy/defaultlandingpagepattern.git meu-projeto
cd meu-projeto

# 2. Instale as dependências
bun install

# 3. Inicie o servidor de desenvolvimento
bun dev
```

Acesse `http://localhost:8080`.

### Personalizando em 30 segundos

Todo o conteúdo visível da página vive em **um único arquivo**:

```bash
src/config/siteConfig.ts
```

Edite os dados, salve, e o site atualiza em tempo real. Nenhum componente precisa ser tocado.

---

## Estrutura do Projeto

```
landing-page-template/
│
├── ai/
│   ├── BASE-CONTEXT.md           # Contexto de sistema para IAs (Cursor, Copilot, Lovable)
│   ├── CLEAN-CODE.md             # Checklist de limpeza pós-boilerplate
│   └── Prompt.md                 # Prompts de expansão para agentes IA
│
├── public/
│   ├── robots.txt
│   └── favicon assets
│
├── src/
│   ├── config/
│   │   └── siteConfig.ts         # 🟡 CAMADA DE DADOS — único ponto de verdade do conteúdo
│   │
│   ├── hooks/                    # 🔵 CAMADA DE LÓGICA — inteligência do navegador
│   │   ├── useParallax.ts        # Efeito parallax via rAF (retorna { ref, offset, progress })
│   │   ├── useScrollReveal.ts    # Animação de entrada via IntersectionObserver (retorna { ref, isVisible })
│   │   ├── useHeroVisibility.ts  # Detecta visibilidade do Hero (controla Navbar)
│   │   ├── useSmoothScroll.ts    # Lenis smooth scroll + navegação por âncoras
│   │   ├── use-mobile.tsx        # Detecta viewport mobile (< 768px)
│   │   └── use-toast.ts          # Gerenciamento de estado de toasts
│   │
│   ├── components/
│   │   ├── core/                 # 🔧 Primitivos reutilizáveis e abstrações visuais
│   │   │   ├── RevealBlock.tsx   # Encapsula useScrollReveal — animações de entrada
│   │   │   ├── ParallaxLayer.tsx # Wrapper GPU-accelerated para profundidade
│   │   │   ├── ParallaxRevealImage.tsx # Efeito premium: clipPath + scale + parallax
│   │   │   ├── BackgroundGif.tsx # Fundo animado configurável (gif + overlay + blur)
│   │   │   └── NavLink.tsx       # Wrapper tipado do NavLink do React Router
│   │   │
│   │   ├── layout/               # 🏗️ Elementos estruturais globais
│   │   │   ├── Navbar.tsx        # Navbar responsiva (transparente → glass no scroll)
│   │   │   └── Footer.tsx        # Rodapé com redes sociais configuráveis
│   │   │
│   │   └── ui/                   # Primitivos shadcn/ui (não editar diretamente)
│   │
│   ├── sections/                 # 🔴 Blocos de conteúdo orquestrados via siteConfig
│   │   ├── Hero.tsx              # Seção hero com parallax em camadas decorativas
│   │   ├── ContentBlock.tsx      # Bloco imagem + texto (type: "image")
│   │   ├── VideoContentBlock.tsx # Bloco vídeo + texto (type: "video")
│   │   ├── FeaturesContentBlock.tsx # Grid de features (type: "features")
│   │   ├── FAQContentBlock.tsx   # Accordion de perguntas (type: "faq")
│   │   ├── TestimonialsContentBlock.tsx # Grid de depoimentos (type: "testimonials")
│   │   ├── LogoBarContentBlock.tsx # Marquee dupla de logos (type: "logobar")
│   │   ├── ProcessContentBlock.tsx # Timeline de etapas (type: "process")
│   │   ├── TeamContentBlock.tsx  # Grid de membros da equipe (type: "team")
│   │   ├── StatsContentBlock.tsx # Grid de estatísticas (type: "stats")
│   │   ├── ExperiencesGrid.tsx   # Grid de cards de experiências/diferenciais
│   │   └── ContactForm.tsx       # Formulário com useReducer + validação nativa + Sonner
│   │
│   ├── pages/
│   │   ├── Index.tsx             # Orquestrador — monta e ordena todas as seções
│   │   └── NotFound.tsx          # Página 404
│   │
│   ├── lib/
│   │   └── utils.ts              # cn() — merge de classes Tailwind (clsx + tailwind-merge)
│   │
│   ├── test/
│   │   ├── setup.ts              # Configuração do Vitest + Testing Library
│   │   └── example.test.ts       # Exemplo de teste de referência
│   │
│   ├── index.css                 # 🟢 CAMADA DE ESTILO — tokens HSL + glassmorphism + animações
│   ├── App.tsx                   # Providers globais, roteamento e toasters
│   └── main.tsx                  # Entry point da aplicação
│
└── index.html                    # HTML raiz (atualize <title> e meta tags aqui)
```

---

## Arquitetura

O Padrão Ravius impõe **isolamento total de responsabilidades** em quatro camadas. A regra fundamental: nenhuma camada ultrapassa a seguinte.

```
siteConfig.ts ──► Index.tsx ──► <Componente /> ──► useHook()
  (Dados)          (Página)      (Estrutura)        (Lógica)
```

---

### 🟡 Camada de Dados — `src/config/siteConfig.ts`

**O único lugar onde os dados da empresa existem.**

Nenhum componente `.tsx` pode conter texto, URL ou configuração hardcoded. Tudo é injetado via props a partir daqui. Se a interface `SiteConfig` for quebrada, o build falha antes do deploy.

O conteúdo dos blocos de página é modelado como **Discriminated Union** com **9 tipos de bloco** — o TypeScript garante que cada tipo tenha exatamente os campos que precisa, e que nenhuma variante seja ignorada silenciosamente no `switch` do orquestrador:

```typescript
export type ContentBlockConfig =
  | ImageBlockConfig        // type: "image"
  | VideoBlockConfig        // type: "video"
  | FeaturesBlockConfig     // type: "features"
  | FAQBlockConfig          // type: "faq"
  | TestimonialsBlockConfig // type: "testimonials"
  | LogoBarBlockConfig      // type: "logobar"
  | ProcessBlockConfig      // type: "process"
  | TeamBlockConfig         // type: "team"
  | StatsBlockConfig        // type: "stats"
```

---

### 🔵 Camada de Lógica — `src/hooks/`

**O sistema nervoso da aplicação.**

Hooks encapsulam toda a inteligência do navegador. A regra é rígida: hooks **não renderizam JSX** e **não carregam dados externos** — apenas calculam estados primitivos (`boolean`, `number`, `ref`) e os devolvem.

#### `useParallax(configOrSpeed)`

Calcula o offset de translação vertical de um elemento com base na posição do scroll, usando `requestAnimationFrame` com flag de `ticking` e `useCallback` estável para garantir 60fps sem jank. Escuta eventos `scroll` e `resize`. Cancela o `rAF` no cleanup para evitar memory leaks.

```typescript
// Forma simples (retrocompatível)
const { ref, offset } = useParallax(0.06)

// Forma avançada com config
const { ref, offset, progress } = useParallax({
  speed: 0.15,
  direction: "vertical",  // "vertical" | "horizontal"
  disabled: false,
})
```

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `configOrSpeed` | `number \| ParallaxConfig` | `0.3` | Velocidade direta ou objeto de configuração |
| `speed` | `number` | `0.3` | Intensidade. `0.05` = sutil, `0.3` = médio, `1` = intenso |
| `direction` | `string` | `"vertical"` | Eixo do efeito |
| `disabled` | `boolean` | `false` | Desativa o efeito sem desmontar |

| Retorno | Tipo | Descrição |
|---|---|---|
| `ref` | `RefObject<HTMLDivElement>` | Ref para o elemento observado |
| `offset` | `number` | Valor de translação em pixels |
| `progress` | `number` | Progresso de 0 (entrada) a 1 (saída do viewport) |

> **Importante:** Em componentes de conteúdo, prefira usar `<ParallaxLayer>` ao invés de chamar o hook diretamente.

#### `useScrollReveal<T>(threshold?)`

Monitora a entrada do elemento no viewport via `IntersectionObserver`. Dispara uma vez e chama `unobserve` para performance.

```typescript
const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.15)
```

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `threshold` | `number` | `0.15` | Fração do elemento visível para disparar |

> **Importante:** Em componentes de conteúdo, prefira usar `<RevealBlock>` ao invés de chamar o hook diretamente.

#### `useHeroVisibility(threshold?)`

Monitora se a seção Hero está visível no viewport. O resultado controla o estilo do `Navbar` — transparente quando o hero está visível, `glass-strong` quando o usuário scrolla para baixo.

```typescript
const { heroRef, isHeroVisible } = useHeroVisibility(0.3)
// isHeroVisible: true enquanto 30% do hero estiver na tela
```

#### `useSmoothScroll()`

Inicializa o [Lenis](https://lenis.darkroom.engineering/) com `duration: 1.2` e `smoothWheel: true`. Intercepta automaticamente cliques em qualquer `<a href="#ancora">` da página e executa o scroll suave com offset de `-80px` (compensação da altura do Navbar fixo). Retorna `lenisRef` para controle externo.

```typescript
// src/pages/Index.tsx — chamado uma única vez no topo da página
useSmoothScroll()
```

---

### 🟢 Camada de Estilo — `src/index.css`

**A identidade visual centralizada.**

Cores, fontes e arredondamentos são definidos como **variáveis CSS no formato HSL** no `:root`. Para trocar a paleta de um cliente, altere `--primary` — o site inteiro se re-pinta. As fontes `Outfit` (headings) e `Inter` (body) são carregadas via `@import` do Google Fonts.

```css
/* src/index.css — tokens principais */

:root {
  --background:         0 0% 4%;      /* fundo da página */
  --foreground:         0 0% 95%;     /* texto principal */
  --primary:            145 65% 52%;  /* verde Ravius — troque aqui */
  --primary-foreground: 0 0% 4%;
  --secondary:          220 14% 14%;
  --muted:              220 10% 12%;
  --muted-foreground:   220 10% 55%;
  --border:             220 10% 16%;
  --radius:             0.75rem;

  --font-heading: 'Outfit', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

#### Sistema Glassmorphism

Três classes globais prontas para uso. **Não escreva `backdrop-filter` inline nos componentes** — use sempre uma dessas classes para garantir consistência visual:

| Classe | Opacidade do fundo | Blur | Uso recomendado |
|---|---|---|---|
| `.glass-subtle` | 3% | 12px | Cards, painéis, fundos de seção |
| `.glass-strong` | 7% | 24px | Navbar após scroll, formulários, modais |
| `.glass-glow` | 5% (cor primária) | 20px | Badges e elementos com brilho verde |

#### Animações

| Classe Tailwind | Duração | Descrição |
|---|---|---|
| `animate-marquee` | 30s | Scroll horizontal infinito (esquerda → direita) |
| `animate-marquee-reverse` | 35s | Scroll horizontal infinito (direita → esquerda) |

> As transições de scroll reveal são gerenciadas inline pelo componente `<RevealBlock>` — não existem mais classes CSS `.reveal-hidden`/`.reveal-visible`.

---

#### Background animado

Um dos componentes que dá alma ao design padrão Ravius é o `BackgroundGif.tsx`, que aplica um overlay de cor sobre um GIF animado de fundo.

```typescript
interface BackgroundGifProps {
  gifUrl?: string;
  overlayColor?: string;
  blur?: string;
}
```

Possui valores padrões que podem ser sobrescritos. Pode ser utilizado em diversos contextos como background de seções, cards, etc.

> Fonte padrão de gifs: [Erica Of Anderson](https://giphy.com/ericaofanderson)

---

### 🔴 Camada de Estrutura — 3 diretórios isolados

**O esqueleto que monta as peças.**

A camada de estrutura separa componentes em três diretórios físicos com responsabilidades distintas:

> **Regra:** Componentes primitivos e abstrações visuais vivem em `src/components/core/`. Blocos de conteúdo orquestrados via siteConfig vivem em `src/sections/`. Elementos estruturais globais vivem em `src/components/layout/`.

#### `src/components/core/` — Primitivos reutilizáveis

Wrappers que encapsulam hooks, mantendo os blocos de conteúdo limpos:

| Componente | Papel | Props principais |
|---|---|---|
| `RevealBlock` | Animação de entrada no scroll (opacity + translateY) | `children`, `className`, `delay` |
| `ParallaxLayer` | Profundidade 3D via `translate3d` GPU-accelerated | `speed`, `children`, `className`, `disabled` |
| `ParallaxRevealImage` | Reveal premium com `clipPath` + scale + parallax | `src`, `alt`, `speed`, `className` |
| `BackgroundGif` | Fundo animado avec overlay e blur | `gifUrl`, `overlayColor`, `blur` |
| `NavLink` | Wrapper tipado do React Router NavLink | `to`, `className`, `activeClassName` |

**Padrão de uso — `RevealBlock` com stagger:**

```tsx
// Efeito cascata em listas — cada card aparece 100ms após o anterior
{data.items.map((item, i) => (
  <RevealBlock key={i} delay={i * 100}>
    <div className="glass-subtle rounded-2xl p-6">
      {/* conteúdo do card */}
    </div>
  </RevealBlock>
))}
```

**Padrão de uso — `ParallaxLayer` para decorativos:**

```tsx
// Elementos de fundo com profundidade
<ParallaxLayer speed={0.15} className="absolute top-[10%] left-[5%]">
  <div className="w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
</ParallaxLayer>
```

#### `src/components/layout/` — Estrutura global

| Componente | Descrição |
|---|---|
| `Navbar` | Navegação fixa — transparente → `glass-strong` no scroll |
| `Footer` | Rodapé com ícones sociais configuráveis |

#### `src/sections/` — Blocos de conteúdo (1:1 com `ContentBlockConfig.type`)

| Seção | Tipo | Descrição |
|---|---|---|
| `ContentBlock` | `image` | Imagem + texto com lista de checkmarks |
| `VideoContentBlock` | `video` | YouTube/Vimeo/mp4 + texto |
| `FeaturesContentBlock` | `features` | Grid 2-col de features com ícones |
| `FAQContentBlock` | `faq` | Accordion de perguntas com animação |
| `TestimonialsContentBlock` | `testimonials` | Grid de depoimentos com quote decorativa |
| `LogoBarContentBlock` | `logobar` | Dual marquee com parallax horizontal |
| `ProcessContentBlock` | `process` | Timeline alternada com ícones |
| `TeamContentBlock` | `team` | Grid de membros com avatar flutuante |
| `StatsContentBlock` | `stats` | Grid de números com gradiente |
| `Hero` | — | Seção hero com parallax em camadas |
| `ExperiencesGrid` | — | Grid de cards de diferenciais |
| `ContactForm` | — | Formulário com validação nativa + Sonner |

#### `Index.tsx` — O Orquestrador

A página principal importa seções de `@/sections/` e layout de `@/components/layout/`. É o único lugar onde a composição e a ordem das seções são decididas.

```tsx
// src/pages/Index.tsx

import Navbar from "@/components/layout/Navbar"
import Hero from "@/sections/Hero"
import ContentBlock from "@/sections/ContentBlock"
import Footer from "@/components/layout/Footer"

const renderBlock = (block: ContentBlockConfig) => {
  switch (block.type) {
    case "image":        return <ContentBlock            key={block.id} data={block} />
    case "video":        return <VideoContentBlock       key={block.id} data={block} />
    case "features":     return <FeaturesContentBlock    key={block.id} data={block} />
    case "faq":          return <FAQContentBlock         key={block.id} data={block} />
    case "testimonials": return <TestimonialsContentBlock key={block.id} data={block} />
    case "logobar":      return <LogoBarContentBlock     key={block.id} data={block} />
    case "process":      return <ProcessContentBlock     key={block.id} data={block} />
    case "team":         return <TeamContentBlock        key={block.id} data={block} />
    case "stats":        return <StatsContentBlock       key={block.id} data={block} />
  }
}
```

---

## Personalizando o Conteúdo

### Textos, imagens e links

Edite `src/config/siteConfig.ts`. O TypeScript avisará em build se algum campo obrigatório estiver ausente.

### Paleta de cores

Altere a variável `--primary` em `src/index.css`. Todo o site atualiza em cascata:

```css
--primary: 210 100% 50%;  /* azul */
--primary: 262 83% 58%;   /* roxo */
--primary: 145 65% 52%;   /* verde (padrão Ravius) */
```

### Tipografia

Substitua `Outfit` e `Inter` no `@import` do Google Fonts no topo de `index.css` e atualize as variáveis `--font-heading` e `--font-body`.

### Meta tags e SEO

Abra `index.html` e edite `<title>`, `<meta name="description">` e as tags `og:*` e `twitter:*`.

### Ícones

O mapeamento de string → componente Lucide está nos arquivos `ExperiencesGrid.tsx`, `FeaturesContentBlock.tsx` e `ProcessContentBlock.tsx`. Para adicionar novos ícones, importe-os do `lucide-react` e adicione ao `iconMap` local do componente:

```typescript
import { Database, CreditCard } from "lucide-react"

const iconMap = {
  ...,
  Database,
  CreditCard,
}
```

Depois referencie-os pelo nome string no `siteConfig.ts`.

---

## Expandindo o Template

### Adicionando um Novo Tipo de Bloco de Conteúdo

Siga esta ordem para não quebrar o isolamento de camadas.

**1. Declare a interface e expanda a union em `siteConfig.ts`:**

```typescript
export interface PricingBlockConfig extends BaseBlock {
  type: "pricing"
  plans: Array<{ name: string; price: string; features: string[] }>
}

export type ContentBlockConfig =
  | ImageBlockConfig
  | VideoBlockConfig
  | ...
  | PricingBlockConfig  // ← novo
```

**2. Adicione os dados no array `contentBlocks`:**

```typescript
{
  id: "pricing",
  type: "pricing",
  title: "Planos que",
  highlight: "cabem no bolso",
  plans: [{ name: "Starter", price: "R$49", features: ["..."] }],
}
```

**3. Crie a seção em `src/sections/` usando os primitivos de `core/`:**

```tsx
// src/sections/PricingContentBlock.tsx

import { PricingBlockConfig } from "@/config/siteConfig"
import RevealBlock from "@/components/core/RevealBlock"

const PricingContentBlock = ({ data }: { data: PricingBlockConfig }) => {
  return (
    <section id={data.id} className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <RevealBlock className="text-center mb-14">
          <h2 className="text-3xl font-bold">
            {data.title} <span className="text-primary">{data.highlight}</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.plans.map((plan, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="glass-subtle rounded-2xl p-6">
                {/* ... */}
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingContentBlock
```

**4. Registre no `switch` do `Index.tsx`:**

```tsx
case "pricing": return <PricingContentBlock key={block.id} data={block} />
```

> O TypeScript emitirá um erro de tipo se o novo `case` for esquecido no `switch`, graças à Discriminated Union.

### Adicionando Efeitos de Movimento

| Objetivo | Componente | Exemplo |
|---|---|---|
| Animar entrada no scroll | `<RevealBlock>` | `<RevealBlock delay={200}>...</RevealBlock>` |
| Profundidade em backgrounds | `<ParallaxLayer>` | `<ParallaxLayer speed={0.15}>...</ParallaxLayer>` |
| Reveal premium em imagens | `<ParallaxRevealImage>` | `<ParallaxRevealImage src={url} speed={0.2} />` |
| Scroll horizontal infinito | CSS `animate-marquee` | `className="animate-marquee"` |

### Adicionando um Novo Hook Global

1. Crie `src/hooks/useNomeDoHook.ts`
2. Garanta que o hook **não renderiza JSX** e retorna apenas estados primitivos ou refs
3. Documente-o na tabela de hooks da seção [Camada de Lógica](#-camada-de-lógica--srchooks)
4. Se alterar o comportamento global da aplicação, atualize também `ai/BASE-CONTEXT.md`

---

## Convenções

### Regras de camada

| ✅ Faça | ❌ Não faça |
|---|---|
| Todo texto e URL vêm do `siteConfig.ts` | Hardcodar strings em qualquer `.tsx` |
| Lógica de DOM e scroll ficam em hooks | `useEffect` com `document.querySelector` em componentes |
| Use as classes glassmorphism globais | Escrever `backdrop-filter` inline em componentes |
| Use `<RevealBlock>` para animações de entrada | Chamar `useScrollReveal` direto em seções |
| Use `<ParallaxLayer>` para efeitos de profundidade | Estilos `transform` inline com `useParallax` em seções |
| Seções importam de `@/components/core/` | Colocar seções de página em `src/components/` |
| Layout (`Navbar`, `Footer`) vive em `components/layout/` | Misturar layout com seções ou primitivos |
| Props tipadas a partir do `siteConfig.ts` | Redefinir interfaces que já existem na camada de dados |
| `cancelAnimationFrame` no cleanup de hooks | Loops de `rAF` sem limpeza no unmount |
| "Quick fix" que introduz texto hardcoded? Avise o time antes | Aceitar dívida técnica silenciosamente |

### Critério de aprovação em PRs

> *"Esta mudança quebra o isolamento de camadas do Padrão Ravius?"*

Se a resposta for **sim**, o código deve ser refatorado antes de ser aprovado.

### Integração com IAs

O arquivo `ai/BASE-CONTEXT.md` contém o contexto de sistema para Cursor, Copilot e Lovable. **Sempre que um novo padrão global for introduzido** (novo hook, novo tipo de bloco, nova classe utilitária), atualize esse arquivo junto com este README — os dois documentos precisam estar em sincronia para que as IAs gerem código consistente com a arquitetura.

---

## Scripts

```bash
bun dev           # Servidor de desenvolvimento — http://localhost:5173
bun build         # Build de produção (output: /dist)
bun preview       # Pré-visualização do build gerado
bun lint          # ESLint em todo o projeto
bun test          # Vitest em modo watch
bun test --run    # Vitest single-run (para CI)
```

---

## Licença

Distribuído sob a licença Apache License Version 2.0. Veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">

<br />

*Construa com a fluidez do design. Escale com o rigor da engenharia.*

<br />

**Ravius** · [ravius.dev](https://ravius.dev)

</div>
