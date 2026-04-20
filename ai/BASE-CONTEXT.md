# [SYSTEM_CONTEXT_RAVIUS_PATTERN]
**Role:** Senior Front-end Architect.
**Objective:** Maintain, expand, and debug the Ravius Landing Page Template.
**Tech Stack:** React 18+, TypeScript (Strict), Vite, Tailwind CSS, Lenis (Smooth Scroll), React Query, Lucide React (Icons), Sonner (Toasts), GSAP + @gsap/react (SplitText, ScrollTrigger).

## 1. ARCHITECTURE: THE 4 ISOLATED LAYERS
The project strictly follows a 4-layer separation of concerns. **Never mix responsibilities.**

### 1.1 Data Layer (`src/config/siteConfig.ts`)
* **Role:** Single Source of Truth (SSoT) for all content.
* **Rule:** Components (`.tsx`) MUST NOT contain hardcoded copy, image paths, or external links. All data is injected via props from this file.
* **Typing:** Strict TypeScript interfaces. Polymorphic content uses a Discriminated Union (`ContentBlockConfig`) with 9 block types:
  `image` | `video` | `features` | `faq` | `testimonials` | `logobar` | `process` | `team` | `stats`
* **Global Config:** `BackgroundGifConfig` controls the default animated background (gifUrl, overlayColor, blur).

### 1.2 Logic Layer (`src/hooks/`)
* **Role:** Math, DOM observation, and browser APIs.
* **Rule:** Pure logic. Hooks return primitive states (`boolean`, `number`) or Refs. They DO NOT render JSX or inject CSS directly.
* **Key Hooks:**
    * `useParallax(configOrSpeed)`: Accepts `number` or `ParallaxConfig { speed, direction, disabled }`. Returns `{ ref, offset, progress, direction }`. Uses `requestAnimationFrame` + `resize` listener with stable `useCallback`. GPU-accelerated via component wrappers.
    * `useScrollReveal(threshold)`: Uses `IntersectionObserver` for viewport entry. Returns `{ ref, isVisible }`. Triggers once then calls `unobserve`.
    * `useSmoothScroll()`: Lenis implementation for anchor routing.
    * `useScrollVideo(src, config?)`: Scroll-controlled video scrubbing. Fetches video into in-memory Blob, maps scroll progress within a container to `video.currentTime` via rAF + lerp interpolation. Returns `{ containerRef, videoRef, isReady, progress }`. Config: `{ smoothing?: number, disabled?: boolean }`.

### 1.3 Style Layer (`src/index.css` & Tailwind)
* **Role:** Design System global state.
* **Rule:** No arbitrary values in Tailwind classes (e.g., avoid `text-[15px]`). Use design tokens.
* **Tokens:** Defined as HSL variables (`--primary`, `--background`).
* **Glassmorphism:** Use pre-defined utility classes (`glass-subtle`, `glass-strong`, `glass-glow`) instead of writing manual backdrop-blurs in components.
* **Animations:** `marquee` (30s, left-to-right) and `marquee-reverse` (35s, right-to-left) defined in `tailwind.config.ts`.
* **Note:** Scroll reveal transitions are handled inline by `RevealBlock`, NOT via CSS classes. The old `reveal-hidden`/`reveal-visible` classes have been removed.

### 1.4 Structure Layer (3 directories)
The project separates rendering into three physically isolated directories. **Componentes primitivos e abstrações visuais vivem em `src/components/core/`. Blocos de conteúdo orquestrados via siteConfig vivem em `src/sections/`. Elementos estruturais globais vivem em `src/components/layout/`.**

#### `src/components/core/` — Primitivos reutilizáveis
* `RevealBlock`: Encapsulates `useScrollReveal`. `opacity + translateY` transition with `delay` prop for stagger. **All scroll-reveal animations must use this component.**
* `ParallaxLayer`: Encapsulates `useParallax`. GPU-accelerated `translate3d` + `willChange: "transform"`. Props: `speed`, `children`, `className`, `disabled`.
* `ParallaxRevealImage`: Premium `clipPath` + scale + `ParallaxLayer` reveal. GPU-layered.
* `BackgroundGif`: Animated background layer, reads defaults from `siteConfig.backgroundGif`.
* `SplitText`: GSAP-powered typography animation primitive. Encapsulates `SplitText`, `ScrollTrigger`, and `useGSAP`. GPU-optimized (`will-change`, `force3D`). Props: `text`, `splitType`, `delay`, `duration`, `ease`, `from`, `to`, `tag`, `threshold`, `rootMargin`, `onLetterAnimationComplete`. Waits for font loading before splitting.
* `ScrollVideo`: Encapsulates `useScrollVideo`. Scroll-controlled video scrubbing primitive with sticky viewport. Props: `src`, `children`, `scrollHeight`, `videoOpacity`, `gradientOverlay`, `config`, `className`, `stickyClassName`. Consumers pass overlay content as children.
* `NavLink`: Typed wrapper for React Router's NavLink.

#### `src/components/layout/` — Estrutura global
* `Navbar`: Fixed navigation, transparent → glass on scroll.
* `Footer`: Site footer with configurable social icons.

#### `src/sections/` — Blocos de conteúdo (1:1 map to `ContentBlockConfig.type`)
`ContentBlock` (image) · `VideoContentBlock` · `FeaturesContentBlock` · `FAQContentBlock` · `TestimonialsContentBlock` · `LogoBarContentBlock` · `ProcessContentBlock` · `TeamContentBlock` · `StatsContentBlock` · `Hero` · `ExperiencesGrid` · `ContactForm`

* **Icon Mapping:** Lucide icons resolved via shared `iconMap: Record<string, Component>` pattern.
* **Form Validation:** `ContactForm` uses native manual validation (no external libraries).

---

## 2. EXECUTION WORKFLOWS (FOR AI AGENTS)

### 2.1 Editing Content
* **Prompt Request:** "Change the title" or "Swap the image".
* **Action:** Modify ONLY `src/config/siteConfig.ts`. Do NOT touch `.tsx` files.

### 2.2 Adding a New Section Type (Polymorphic Expansion)
When expanding the layout, execute precisely in this order:
1.  **Config:** Add new type literal to the Union and create its interface extending `BaseBlock` in `siteConfig.ts`.
2.  **Data:** Add example block entry to `siteConfig.contentBlocks[]`.
3.  **Section:** Create `<Type>ContentBlock.tsx` in `src/sections/`. Import core components via `@/components/core/`. Use `<RevealBlock>` for Motion UX, `<ParallaxLayer>` for depth, `glass-subtle`/`glass-strong` for styling.
4.  **Orchestration:** Add `case` to `renderBlock()` switch in `src/pages/Index.tsx`. Import from `@/sections/`.

### 2.3 Adding Motion/Parallax Effects
* **Scroll Reveal:** Wrap elements with `<RevealBlock delay={index * 100}>`. Never call `useScrollReveal` directly in content components.
* **Parallax Depth (backgrounds):** Wrap decorative elements with `<ParallaxLayer speed={0.15}>`. Use negative speeds for counter-scroll.
* **Parallax Depth (images):** Use `<ParallaxRevealImage src={url} speed={0.2}>` for premium clip-path + scale reveals.
* **Typography Animation:** Use `<SplitText text={config.title} splitType="chars" />` for animated headings. Never call GSAP directly inside `sections/`.
* **Marquee:** Use `animate-marquee` / `animate-marquee-reverse` Tailwind classes for infinite horizontal scroll.

### 2.4 Debugging Performance/UI
* **Scroll/Jank issues:** Check `/hooks` first. Ensure `requestAnimationFrame` is properly cancelled on unmount. Verify `willChange` is applied via `ParallaxLayer`.
* **Hydration/State issues:** Check if React Query or context is out of sync.
* **Responsiveness:** Use `useIsMobile()` hook for logic branching, and Tailwind `md:`, `lg:` for style branching.

---

## 3. META-DOCUMENTATION & SCALABILITY RULES

As the framework evolves, the documentation MUST evolve autonomously to maintain context window integrity for future AI prompts. 

**If you (the AI) are asked to introduce a new global pattern, API, or core hook, you MUST execute the following Meta-Documentation routine:**

1.  **Identify Global Impact:** Does this change affect how data is passed, how animations are handled, or how styling is applied globally?
2.  **Update `BASE-CONTEXT.md` (This file):**
    * If a new hook is added, append it to section `1.2 Logic Layer`.
    * If a new external library is added to the stack, update the `Tech Stack` header.
    * If a new structural pattern is introduced (e.g., wrapper components), document in section `1.4 Structure Layer`.
    * If a new workflow is introduced, add to section `2. EXECUTION WORKFLOWS`.
3.  **Self-Correction:** Ensure the markdown remains highly compressed. Remove outdated examples. Use code snippets only when abstract explanation is insufficient.

**CRITICAL DIRECTIVE:** You are forbidden from degrading the modularity of this system. If a user asks for a "quick fix" that involves hardcoding a string into a component or bypassing a hook, you MUST warn the user about the architectural violation before proceeding, or offer the Config-Driven alternative first.


**LOCALHOST:** http://localhost:8080