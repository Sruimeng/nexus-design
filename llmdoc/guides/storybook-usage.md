---
id: guide-storybook
type: guide
related_ids: [arch-system-overview, ref-tech-stack]
---

# Storybook Usage

## Quick Start

**Run Dev Server:**
```bash
pnpm storybook
```
**Access:** `http://localhost:6006`

**Build Static:**
```bash
pnpm build-storybook
```

## Structure

```
demo/stories/
├── components/         # 10 custom components
│   ├── credits-button.stories.tsx
│   ├── icon.stories.tsx
│   ├── icon-button.stories.tsx
│   ├── img-uploader.stories.tsx
│   ├── img-viewer.stories.tsx
│   ├── loadable.stories.tsx
│   ├── loading.stories.tsx
│   ├── model-uploader.stories.tsx
│   └── tree.stories.tsx
└── ui/                 # 32 UI primitives
    ├── avatar.stories.tsx
    ├── badge.stories.tsx
    ├── button.stories.tsx
    ├── carousel.stories.tsx
    ├── checkbox.stories.tsx
    ├── collapsible.stories.tsx
    ├── dialog.stories.tsx
    ├── drawer.stories.tsx
    ├── form.stories.tsx
    ├── input-otp.stories.tsx
    ├── label.stories.tsx
    ├── popover.stories.tsx
    ├── progress.stories.tsx
    ├── select.stories.tsx
    ├── slider.stories.tsx
    ├── snap-input.stories.tsx
    ├── sonner.stories.tsx
    ├── switch.stories.tsx
    ├── table.stories.tsx
    ├── tabs.stories.tsx
    ├── toggle.stories.tsx
    └── tooltip.stories.tsx
```

**Total:** 42 stories

## Configuration

**Location:** `.storybook/main.ts`

```typescript
{
  stories: ['../demo/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  viteFinal: {
    plugins: [UnoCSS, tsconfigPaths]
  }
}
```

**UnoCSS Integration:**
- Preset: `presetWind3`, `presetAnimations`, `presetIcons`
- Theme: Extended with `src/theme.ts`
- Shortcuts: `backdrop-blur-10`, `ease-smooth`, `duration-fast`, etc.

## Story Pattern

### Basic Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Primary Action',
  },
};

export const Hollow: Story = {
  args: {
    variant: 'hollow',
    children: 'Secondary Action',
  },
};
```

### Interactive Story

```typescript
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};
```

### Composite Story

```typescript
export const Form: Story = {
  render: () => (
    <div className="space-y-4">
      <Label>Username</Label>
      <Input placeholder="Enter name" />
      <Button variant="solid">Submit</Button>
    </div>
  ),
};
```

## Best Practices

**DO:**
- Set `backgrounds: { default: 'dark' }` for all stories (Nexus is dark-first)
- Test all variants, sizes, states
- Use `argTypes` for controls (`variant`, `size`, `disabled`)
- Group related stories (`UI/`, `Components/`)

**DO NOT:**
- Override Nexus design tokens with inline styles
- Skip accessibility tests (addon-a11y enabled)
- Use light backgrounds (breaks contrast ratios)
- Hardcode colors in stories

## Accessibility Testing

**Addon:** `@storybook/addon-a11y`

**Auto-checks:**
- Contrast ratios (WCAG AA: 4.5:1, AAA: 7:1)
- Keyboard navigation
- ARIA attributes
- Focus indicators

**View Results:**
1. Open story
2. Click "Accessibility" tab
3. Fix violations

## Development Workflow

```
1. Create component in src/ui/ or src/components/
2. Write story in demo/stories/<category>/<name>.stories.tsx
3. Run pnpm storybook
4. Verify dark mode appearance
5. Test interactions
6. Check a11y panel
7. Document usage in story description
```

## Deployment

**Build Output:** `storybook-static/`

**Host Options:**
- Chromatic (integrated via `@chromatic-com/storybook`)
- Vercel/Netlify (static site)
- GitHub Pages

## Related

- [Tech Stack](../reference/tech-stack.md) - Storybook version
- [System Overview](../architecture/system-overview.md) - Demo structure
- [Accessibility](./accessibility.md) - WCAG compliance
