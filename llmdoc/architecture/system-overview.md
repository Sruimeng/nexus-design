---
id: arch-system-overview
type: architecture
status: stable
related_ids:
  - ref-export-map
  - ref-component-patterns
  - guide-component-dev
---

# System Overview

## Package Identity

```typescript
{
  name: "@sruim/nexus-design",
  version: "0.0.27",
  type: "module",
  main: "dist/index.js"
}
```

## Directory Structure

```
src/
├── tokens/                # Nexus Design System
│   ├── nexus.ts          # Core color, motion primitives
│   └── materials.ts      # Void, FrostGlass, DeepGlass
├── ui/                    # 24 Radix UI primitives (wrapped)
│   ├── avatar/
│   ├── badge/
│   ├── button.tsx
│   ├── carousel/
│   ├── checkbox/
│   ├── collapsible/
│   ├── dialog/
│   │   ├── confirm.tsx    # Imperative API
│   │   ├── dialog.tsx     # Base component
│   │   └── index.tsx      # Compound exports
│   ├── drawer.tsx
│   ├── form.tsx           # React Hook Form wrapper
│   ├── input-otp.tsx
│   ├── label.tsx
│   ├── masonry/
│   ├── popover/
│   ├── progress.tsx
│   ├── select/
│   ├── slider/
│   ├── snap-input.tsx
│   ├── sonner.tsx         # Toast system
│   ├── switch.tsx
│   ├── table/             # TanStack Table wrapper
│   ├── tabs/
│   ├── toggle/
│   │   ├── toggle.tsx
│   │   └── toggle-group.tsx
│   └── tooltip/
│
├── components/            # 9 domain components
│   ├── credits-button/
│   ├── icon/
│   ├── icon-button/
│   ├── img-uploader/
│   ├── img-viewer/
│   ├── loadable/          # Code splitting wrapper
│   ├── loading/
│   ├── model-uploader/
│   └── tree/
│       ├── index.tsx      # Tree controller
│       └── node.tsx       # Recursive node
│
├── utils/                 # Shared utilities
│   ├── config.ts
│   ├── utils.ts           # clsx + tailwind-merge
│   └── index.ts
│
├── theme.ts               # UnoCSS theme config
├── style.scss             # Global styles
└── index.ts               # Root barrel

demo/
└── stories/               # 42 Storybook stories (v10.1.11)
    ├── components/        # 10 custom component stories
    └── ui/                # 32 UI primitive stories
```

## Export Map

### Primary Entry
```typescript
// import from "@sruim/nexus-design"
dist/index.js → {
  components: all,
  ui: all,
  utils: all,
  theme: all,
  sideEffect: style.scss
}
```

### Subpath Exports
```typescript
"@sruim/nexus-design/ui"         → dist/ui/index.js       // 24 components
"@sruim/nexus-design/components" → dist/components/index.js  // 9 components
"@sruim/nexus-design/utils"      → dist/utils/index.js
"@sruim/nexus-design/theme"      → dist/theme.js
"@sruim/nexus-design/style.css"  → dist/style.css
```

### Granular Exports (Tree-shakeable)
```typescript
"@sruim/nexus-design/ui/*"         → dist/ui/*.js
"@sruim/nexus-design/components/*" → dist/components/*.js

// Example:
"@sruim/nexus-design/ui/button"      → dist/ui/button.js
"@sruim/nexus-design/ui/dialog"      → dist/ui/dialog/index.js
"@sruim/nexus-design/components/tree" → dist/components/tree/index.js
```

## Component Hierarchy

### Layer 1: UI Primitives (ui/)
**Role:** Radix UI wrappers with design system styling.

**Pattern:**
```typescript
forwardRef<HTMLElement, RadixProps & VariantProps>((props, ref) => {
  return <RadixPrimitive {...styled(props)} ref={ref} />
})
```

**Key Components:**
- Dialog: Compound component + imperative API (`Dialog.show()`)
- Form: React Hook Form + Zod integration
- Table: TanStack Table wrapper with pagination
- Carousel: Embla Carousel wrapper

### Layer 2: Domain Components (components/)
**Role:** Application-specific compositions.

**Pattern:**
```typescript
// Compound logic combining UI primitives
export const Tree = () => {
  const [state, setState] = useState()
  return <TreeNode recursive />
}
```

**Key Components:**
- ImgUploader: File upload + preview
- ImgViewer: Lightbox with infinite scroll (IntersectionObserver)
- Loadable: React.lazy wrapper
- Tree: Recursive tree with expand/collapse

### Layer 3: Utilities (utils/)
**Role:** Shared functions and configuration.

**Exports:**
```typescript
cn()        // clsx + tailwind-merge
config      // App-level constants
```

## Architectural Patterns

### 1. Compound Components
```typescript
// Export pattern
Dialog.Root
Dialog.Trigger
Dialog.Content
Dialog.show()  // Imperative API
```

### 2. forwardRef Everywhere
```typescript
// All components forward refs for DOM access
const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <div ref={ref} {...props} />
})
```

### 3. Variant System
```typescript
// class-variance-authority (cva)
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', lg: '...' }
  }
})
```

### 4. Form Integration
```typescript
// React Hook Form + Zod
<Form schema={zodSchema}>
  <FormField name="field" />
</Form>
```

### 5. Lazy Loading
```typescript
// IntersectionObserver for infinite scroll
useEffect(() => {
  const observer = new IntersectionObserver(callback)
  observer.observe(sentinel)
}, [])
```

## Tech Stack

**Core:**
- React 19
- TypeScript 5.8
- UnoCSS (Tailwind-compatible)

**Radix UI Primitives:**
- @radix-ui/react-* (24 packages)
- Portal support for modals/popovers

**State & Forms:**
- react-hook-form 7.54
- zod 3.25 (validation)

**Styling:**
- UnoCSS 66.2 + Shadcn preset
- class-variance-authority (variants)
- tailwind-merge (class deduplication)

**Table:**
- @tanstack/react-table 8.21

**Carousel:**
- embla-carousel-react 8.5

**Toast:**
- sonner 2.0

**Build:**
- Vite 6.3
- vite-plugin-dts (TypeScript declarations)

## Build Output

```
dist/
├── index.js           # All exports
├── index.d.ts
├── ui/                # 24 components
│   ├── index.js
│   ├── button.js
│   └── dialog/
├── components/        # 9 components
│   ├── index.js
│   └── tree/
├── utils/
│   └── index.js
├── theme.js
├── theme.d.ts
└── style.css
```

## Constraints

**DO:**
- Use forwardRef for all components
- Export compound components (Namespace.Part)
- Provide both barrel exports and granular imports
- Follow Radix UI patterns for primitives
- Use cva for variant management

**DO NOT:**
- Import from /dist directly
- Bypass forwardRef for DOM components
- Mix UI primitives with domain logic
- Skip TypeScript type exports

## Related Documents

- [Export Map Reference](../reference/export-map.md)
- [Component Patterns](../reference/component-patterns.md)
- [Development Guide](../guides/component-dev.md)
