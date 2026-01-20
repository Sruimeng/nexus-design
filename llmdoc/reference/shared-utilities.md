---
id: shared-utilities
type: reference
related_ids: [config, theme]
---

# Shared Utilities

Core utility functions. Import from `@/utils`.

## Type Definitions

```typescript
type FileType = 'image' | 'model';
type ClassValue = string | number | boolean | undefined | null | ClassValue[];
```

## File Operations

| Function | Signature | Returns | Purpose |
|----------|-----------|---------|---------|
| `getSuffix` | `(file: File \| string) => string \| undefined` | Extension (lowercase) | Extract file extension from File object or path |
| `checkSize` | `(file: File, size?: number) => boolean` | Pass/Fail | Validate file size (default: 5MB) |
| `checkType` | `(file: File, type: FileType) => boolean` | Pass/Fail | Validate file type against whitelist |

**Supported Types:**
- `image`: `webp`, `png`, `jpg`, `jpeg`
- `model`: `fbx`, `obj`, `stl`, `glb`

```typescript
// Usage
if (!checkSize(file, 10)) return; // 10MB max
if (!checkType(file, 'image')) return;
const ext = getSuffix(file); // "png"
```

## DOM Operations

| Function | Signature | Returns | Purpose |
|----------|-----------|---------|---------|
| `isMobileDevice` | `(ua: string \| null) => boolean` | Mobile detected | Parse User-Agent string |
| `sleep` | `(ms: number) => Promise<void>` | Promise | Delay execution |
| `jump` | `(url: string, blank?: boolean) => void` | void | Navigate (default: new tab) |
| `download` | `(url: string, name?: string) => void` | void | Trigger file download |
| `copy` | `(text: string, toastText: string) => void` | void | Copy to clipboard with toast |

```typescript
// Usage
if (isMobileDevice(navigator.userAgent)) { /* mobile UI */ }
await sleep(1000); // 1s delay
jump('/path'); // new tab
download(url, 'file.zip');
copy('text', 'Copied!');
```

## Styling

| Function | Signature | Returns | Purpose |
|----------|-----------|---------|---------|
| `cn` | `(...inputs: ClassValue[]) => string` | Merged classes | clsx + tailwind-merge + theme-aware |
| `flattenThemeColors` | `(colorsObj: Theme['colors'], prefix?: string) => string[]` | Flattened color keys | Extract UnoCSS theme colors |

```typescript
// Usage
cn('btn', isActive && 'active'); // "btn active"
cn('text-primary', 'text-secondary'); // "text-secondary" (merge conflict resolved)
```

**cn() Features:**
- Conditional classes (falsy values ignored)
- Tailwind class conflict resolution
- UnoCSS theme color support
- Numeric utilities (`text-16`, `rounded-8`)

## When to Use

**File Validation:**
```typescript
// Upload validation pipeline
const file = event.target.files[0];
if (!checkSize(file, 10)) return;
if (!checkType(file, 'image')) return;
// Process file
```

**Navigation:**
```typescript
// Internal: use router
// External/download: use jump/download
jump('https://external.com'); // new tab
download(blobUrl, 'export.json');
```

**Styling:**
```typescript
// Component classes
<div className={cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  className
)} />
```

## Constraints

- **checkSize**: Logs to console on fail (no throw)
- **checkType**: Logs to console on fail (no throw)
- **copy**: Silent fail if clipboard unavailable
- **cn**: Theme colors must be defined in `@/theme`
- **flattenThemeColors**: Recursive (handles nested color objects)

## Related

- `/src/utils/utils.ts` - DOM/File utilities
- `/src/utils/config.ts` - Styling utilities
- `/src/theme.ts` - UnoCSS theme configuration
