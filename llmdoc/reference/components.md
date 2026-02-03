---
id: component-inventory
type: reference
related_ids: [data-models, nexus-tokens, ui]
---

# Component Inventory

## UI Components (`src/ui/`)

Primitives built on Radix UI.

| Component | File | Radix Base | Exports |
|-----------|------|------------|---------|
| Avatar | `avatar/index.tsx` | `@radix-ui/react-avatar` | `Avatar`, `Avatar.Image`, `Avatar.Fallback` |
| Badge | `badge/index.tsx` | - | `Badge` |
| Button | `button.tsx` | `@radix-ui/react-slot` | `Button` |
| Carousel | `carousel/index.tsx` | Embla | `Carousel`, `Carousel.Content`, `Carousel.Item`, `Carousel.Previous`, `Carousel.Next` |
| Checkbox | `checkbox/index.tsx` | `@radix-ui/react-checkbox` | `Checkbox` |
| Collapsible | `collapsible/index.tsx` | `@radix-ui/react-collapsible` | `Collapsible`, `Collapsible.Trigger`, `Collapsible.Content` |
| Dialog | `dialog/index.tsx` | `@radix-ui/react-dialog` | `Dialog`, `Dialog.Portal`, `Dialog.Trigger`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.Close`, `Dialog.show` |
| Drawer | `drawer.tsx` | Vaul | `Drawer`, `Drawer.Trigger`, `Drawer.Content`, `Drawer.Header`, `Drawer.Title`, `Drawer.Description`, `Drawer.Footer` |
| Form | `form.tsx` | `react-hook-form` | `Form`, `Form.Item`, `Form.Field`, `Form.Label`, `Form.Control`, `Form.Description`, `Form.Message`, `useForm` |
| InputOTP | `input-otp.tsx` | `input-otp` | `InputOTP`, `InputOTP.Group`, `InputOTP.Slot` |
| Label | `label.tsx` | `@radix-ui/react-label` | `Label` |
| Masonry | `masonry/index.tsx` | - | `Masonry` |
| Popover | `popover/index.tsx` | `@radix-ui/react-popover` | `Popover`, `Popover.Trigger`, `Popover.Content`, `Popover.Anchor` |
| Progress | `progress.tsx` | `@radix-ui/react-progress` | `Progress` |
| Select | `select/index.tsx` | `@radix-ui/react-select` | `Select`, `Select.Group`, `Select.Value`, `Select.Trigger`, `Select.Content`, `Select.Item` |
| Slider | `slider.tsx` | `@radix-ui/react-slider` | `Slider` |
| SnapInput | `snap-input.tsx` | - | `SnapInput` |
| Sonner | `sonner.tsx` | Sonner | `Toaster` |
| Switch | `switch.tsx` | `@radix-ui/react-switch` | `Switch` |
| Table | `table/index.tsx` | - | `Table`, `Table.Header`, `Table.Body`, `Table.Footer`, `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption` |
| Tabs | `tabs/index.tsx` | `@radix-ui/react-tabs` | `Tabs`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` |
| Toggle | `toggle/toggle.tsx` | `@radix-ui/react-toggle` | `Toggle` |
| Tooltip | `tooltip/index.tsx` | `@radix-ui/react-tooltip` | `Tooltip`, `Tooltip.Trigger`, `Tooltip.Content`, `Tooltip.Provider` |

## Composite Components (`src/components/`)

Domain-specific components.

| Component | File | Purpose |
|-----------|------|---------|
| CreditsButton | `credits-button/index.tsx` | Credit display with icon |
| Icon | `icon/index.tsx` | Icon wrapper with sizing |
| IconButton | `icon-button/index.tsx` | Button with icon-only layout |
| ImgUploader | `img-uploader/index.tsx` | Image file upload with preview |
| ImgViewer | `img-viewer/index.tsx` | Image display with controls |
| Loadable | `loadable/index.tsx` | Suspense boundary wrapper |
| Loading | `loading/index.tsx` | Loading states/spinners |
| ModelUploader | `model-uploader/index.tsx` | 3D model file upload |
| Tree | `tree/index.tsx` | Hierarchical tree view |

## Props Interfaces

### Button

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'hollow' | 'solid' | 'plain';
  size?: 'small' | 'middle' | 'large';
}
```

**Variants:**
- `solid`: `accent-gradient` + shadow
- `hollow`: `paper-surface` + hover state
- `plain`: transparent + underline hover

**Sizes:**
- `small`: `h-6 text-2.5`
- `middle`: `h-8 text-3`
- `large`: `w-56 h-10 text-3.5`

### Checkbox

```typescript
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}
```

**Styles:**
- Base: `size-5 rounded border border-border-dim bg-surface-primary`
- Checked: `bg-core-blue border-core-blue` + shadow
- Icon: `i-nexus:check-monotone`

### Avatar

```typescript
interface IAvatar extends React.ForwardRefExoticComponent<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLDivElement>> {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
  Root: typeof Avatar;
}
```

**Compound Pattern:**
- `Avatar.Root`: Container (`rounded-full overflow-hidden`)
- `Avatar.Image`: `aspect-square size-full`
- `Avatar.Fallback`: `bg-surface-dim text-text-secondary`

### Badge

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}
```

**Style:**
- `absolute right-0 top-0`
- `min-w-3 min-h-2.5 rounded-full`
- `bg-status-error text-white`
- With children: `translate-x-1/2`

## Export Aggregation

**UI Index:** `src/ui/index.ts`
- Re-exports all UI components
- Re-exports `@radix-ui/react-portal`

**Components Index:** `src/components/index.ts`
- Re-exports all composite components
