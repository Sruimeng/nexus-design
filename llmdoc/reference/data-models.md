---
id: ref-data-models
type: reference
related_ids: [ref-component-api, guide-validation, nexus-tokens, nexus-materials]
---

# Data Models

## Design Tokens

**File:** `src/tokens/nexus.ts`

### Color Primitives

```typescript
const obsidian = {
  100: 'var(--color-bg)',
  200: 'var(--color-bg-secondary)',
  300: 'var(--color-surface)',
} as const;

const steel = {
  100: 'var(--color-border)',
  200: 'var(--color-border-subtle)',
  300: 'var(--color-surface-hover)',
} as const;

const mist = {
  100: 'var(--color-surface)',
  200: 'var(--color-surface-elevated)',
  300: 'var(--color-bg-secondary)',
} as const;

const core = { blue: '#FB923C' } as const;  // Orange accent
const status = { error: '#F43F5E', success: '#10B981', warning: '#F59E0B' } as const;
```

### Semantic Tokens

```typescript
const surface = {
  primary: 'var(--color-surface)',
  secondary: 'var(--color-surface-elevated)',
  dim: 'var(--color-bg-secondary)',
  hover: 'var(--color-surface-hover)',
} as const;

const border = {
  subtle: 'var(--color-border-subtle)',
  dim: 'var(--color-border)',
  focus: core.blue,
} as const;

const text = {
  primary: 'var(--color-text)',
  secondary: 'var(--color-text-secondary)',
  disabled: 'var(--color-text-muted)',
  accent: core.blue,
} as const;
```

### Motion Constants

```typescript
const easing = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

const duration = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;
```

### Materials

**File:** `src/tokens/materials.ts`

```typescript
const Void = 'bg-background';
const FrostGlass = 'paper-card backdrop-blur-10';
const DeepGlass = 'backdrop-blur-6 bg-[rgba(43,36,28,0.45)]';
```

**Location:** `src/tokens/nexus.ts`, `src/tokens/materials.ts`

## Tree

```typescript
interface ITreeNode {
  name: string;
  displayName: string;
  visible: boolean;
  disabled: boolean;
  children: ITreeNode[];
}
```

**Constraints:**
- Recursive structure (max depth: 5)
- `name`: unique identifier
- `displayName`: user-facing label
- `children`: empty array if leaf node

## File Upload

### Image

```typescript
interface ImgUploaderProps {
  onChange: (file: File | File[]) => void;
  multiple?: boolean;
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  required?: boolean;
}
```

**Constraints:**
- Size: max 5MB per file
- Types: `['webp', 'png', 'jpg', 'jpeg']`
- Accept: `"image/png,image/webp,image/jpg,image/jpeg"`

### 3D Model

```typescript
interface ModelUploaderProps {
  onChange: (file: File) => void;
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  required?: boolean;
}
```

**Constraints:**
- Size: max 50MB
- Types: `['fbx', 'obj', 'stl', 'glb']`
- Accept: `".fbx,.obj,.stl,.glb"`
- Multiple: false (single file only)

## UI Components

### Button

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'hollow' | 'solid' | 'plain';
  size?: 'small' | 'middle' | 'large';
}
```

**Size Map:**
- `small`: `h-6 text-2.5`
- `middle`: `h-8 text-3`
- `large`: `w-56 h-10 text-3.5`

**Variant Map:**
- `solid`: `bg-core-blue/20 hover:bg-core-blue/30 border border-core-blue/50 text-white`
- `hollow`: `bg-transparent border border-white/20 text-slate-200 hover:bg-white/10`
- `plain`: `bg-transparent text-slate-200 hover:text-white hover:underline`
- `disabled`: `opacity-50 cursor-not-allowed pointer-events-none` (overrides all variants)

### Dialog

```typescript
interface DialogProps extends D.DialogContentProps, D.DialogProps {
  overlayClassName?: string;
}

// Imperative API
Dialog.show(
  dialog: React.ReactNode,
  params?: Omit<DialogContentProps & DialogProps, 'open' | 'defaultOpen'> & Props
) => () => void
```

**Behavior:**
- Returns cleanup function
- Uses Symbol-based global registry
- Auto-cleanup after 150ms fade-out
- SSR: no-op with console warning

**Compound Pattern:**
- `Dialog.Root`
- `Dialog.Portal`
- `Dialog.Trigger`
- `Dialog.Overlay`
- `Dialog.Content`

## Form

### Context

```typescript
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};
```

### Hook Integration

```typescript
const useForm = <T extends FieldValues>(
  fn: (_z: typeof z) => Omit<UseFormProps<T>, 'resolver'> & { resolver: z.ZodSchema<T> },
  deps: React.DependencyList = []
) => UseFormReturn<T>
```

**Logic:**
```
1. Memoize schema with deps
2. Apply zodResolver
3. Return useFormPrimitive(schema)
```

**Compound Pattern:**
- `Form.Item`
- `Form.Field`
- `Form.Label`
- `Form.Control`
- `Form.Description`
- `Form.Message`

## Validation

### File Size

```typescript
checkSize(file: File, size: number = 5) => boolean
```

**Logic:**
```
maxBytes = size * 1024 * 1024
return file.size <= maxBytes
```

### File Type

```typescript
checkType(file: File, type: 'image' | 'model') => boolean
```

**Map:**
```typescript
{
  image: ['webp', 'png', 'jpg', 'jpeg'],
  model: ['fbx', 'obj', 'stl', 'glb']
}
```

**Logic:**
```
1. Extract suffix (file.name.split('.').pop() || file.type.split('/').pop())
2. Lowercase
3. Check if suffix in map[type]
```

## Negative Constraints

- Do NOT accept files without extension check
- Do NOT skip size validation on client
- Do NOT mutate ITreeNode children array directly
- Do NOT use FormField outside FormProvider
- Do NOT call Dialog.show on server side
- Do NOT nest Tree beyond level 5
