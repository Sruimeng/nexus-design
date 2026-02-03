---
id: nexus-tokens
type: reference
related_ids: [nexus-materials, data-models, ui]
---

# Nexus Tokens

**Location:** `src/tokens/nexus.ts`, `src/theme.ts`

## Color Primitives

### Obsidian (Background Scale)

```typescript
const obsidian = {
  100: 'var(--color-bg)',
  200: 'var(--color-bg-secondary)',
  300: 'var(--color-surface)',
} as const;
```

### Steel (Border/Interaction Scale)

```typescript
const steel = {
  100: 'var(--color-border)',
  200: 'var(--color-border-subtle)',
  300: 'var(--color-surface-hover)',
} as const;
```

### Mist (Surface Elevation Scale)

```typescript
const mist = {
  100: 'var(--color-surface)',
  200: 'var(--color-surface-elevated)',
  300: 'var(--color-bg-secondary)',
} as const;
```

### Core (Brand)

```typescript
const core = {
  blue: '#FB923C',  // Orange accent (not blue)
} as const;
```

### Status (Semantic)

```typescript
const status = {
  error: '#F43F5E',
  success: '#10B981',
  warning: '#F59E0B',
} as const;
```

## Semantic Tokens

### Surface

```typescript
const surface = {
  primary: 'var(--color-surface)',
  secondary: 'var(--color-surface-elevated)',
  dim: 'var(--color-bg-secondary)',
  hover: 'var(--color-surface-hover)',
} as const;
```

### Border

```typescript
const border = {
  subtle: 'var(--color-border-subtle)',
  dim: 'var(--color-border)',
  focus: core.blue,
} as const;
```

### Text

```typescript
const text = {
  primary: 'var(--color-text)',
  secondary: 'var(--color-text-secondary)',
  disabled: 'var(--color-text-muted)',
  accent: core.blue,
} as const;
```

## Motion

### Easing

```typescript
const easing = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
```

### Duration

```typescript
const duration = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;
```

## UnoCSS Theme Integration

**File:** `src/theme.ts`

Theme extends `unocss/preset-mini` with:

- Custom colors: `obsidian`, `steel`, `mist`, `core`, `status`, `surface`, `border`, `text`
- Opacity scales: `black/white` (0, 5, 10, 20, 30, 40, 60, 80)
- Extended gray palette (1-950)
- Brand colors: `purple`, `red`, `blue`, `green`, `pink`
- Breakpoint: `fhd: '1900px'`
- Animation: `scroll-loop` keyframe

## Usage Patterns

**Background:**
- `bg-background` - app root
- `bg-surface-primary` - cards
- `bg-surface-dim` - secondary surfaces

**Text:**
- `text-text-primary` - main content
- `text-text-secondary` - subtitles
- `text-core-blue` - accent

**Border:**
- `border-border-dim` - structural
- `border-core-blue` - focus/active

**Motion:**
- `duration-fast ease-smooth` - hover
- `duration-base ease-spring` - emphasis
