# 💠 Nexus Design System (NDS) - Core Specification

**Design Philosophy:** Luminous Clarity (光之澄澈)
**Core Metaphor:** The HUD (Heads-Up Display) — 数据悬浮于现实之上。
**Applicability:** Web, Mobile, Desktop Apps.

---

## 版本 v1.1 - 可读性修复

### 颜色更新
- `$mist` (主要文本): `#FFFFFF` (Pure White)
- `$steel` (次要文本): `#CBD5E1` (Slate-300)
- `disabled`: `#64748B` (Slate-500)

### 材质更新
- `$surface-glass-low`: Opacity 70% (was 40%), Blur 12px (was 24px)
- `$surface-glass-high`: Opacity 90% (was 70%), Blur 12px (was 24px)
- Border: Opacity 10% (was 8%)

### 排版更新
- H1: ExtraBold (800) - was Bold (700)
- H2: Bold (700) - was SemiBold (600)
- H3: SemiBold (600) - was Medium (500)
- Body: Regular (400) - was Light (300)
- Caption: Medium (500) - was Regular (400)

### A11y 标准
- 所有文本: WCAG AA (4.5:1)
- 大标题: WCAG AAA (7:1)
- 按钮文本: Pure White (#FFFFFF)
- 次要文本: Slate-300 (#CBD5E1) - 提升可读性

---

## 1. 基础令牌 (Design Tokens)

这是系统的“原子常数”。所有组件属性必须引用于此，严禁使用 Hard-coded (硬编码) 数值。

### 1.1 核心调色板 (Color Primitives)

采用 **HXL (Hue, Saturation, Lightness)** 模型管理，确保深色模式下的色彩亮度一致。

| Token Group | Name | Spec (HSLA/Hex) | Use Case |
| --- | --- | --- | --- |
| **Neutral** | `Obsidian` | `#020617` (Slate-950) | 宇宙深空背景，光吸收层 |
| **Neutral** | `Steel` | `#94A3B8` (Slate-400) | 次级文本，非活跃图标 |
| **Neutral** | `Mist` | `#F8FAFC` (Slate-50) | 标题，高亮文本 |
| **Brand** | `Core Blue` | `#3B82F6` | 主品牌色，系统反馈，链接 |
| **Semantic** | `Signal Red` | `#F43F5E` | 错误，危险，Critic 模式 |
| **Semantic** | `Signal Green` | `#10B981` | 成功，安全，Pragma 模式 |
| **Semantic** | `Signal Amber` | `#F59E0B` | 警告，注意 |

### 1.2 语义化色彩映射 (Semantic Color Mapping)

组件开发时只能调用语义变量，不能直接调用原始色值。

* **$surface-primary:** `Obsidian` @ 100% Opacity (应用底色)
* **$surface-glass-low:** `Slate-900` @ 40% Opacity (普通卡片)
* **$surface-glass-high:** `Slate-950` @ 70% Opacity (浮层/模态框)
* **$border-dim:** `White` @ 10% Opacity (结构性边框)
* **$border-highlight:** `White` @ 20% Opacity (Hover 边框)
* **$glow-primary:** `Core Blue` @ 50% Opacity (光晕)

### 1.3 空间网格 (Spacing System)

基于 **4px** 基础网格。

* **xs:** 4px (紧凑间距)
* **sm:** 8px (组件内间距)
* **md:** 16px (标准内边距)
* **lg:** 24px (卡片间距)
* **xl:** 32px (区块间距)
* **xxl:** 64px (版块分割)

### 1.4 核心令牌实现 (Token Implementation)

**Location:** `src/tokens/nexus.ts`

```typescript
const obsidian = { 100: '#020617', 200: '#0F172A', 300: '#1E293B' };
const steel = { 100: '#CBD5E1', 200: '#E2E8F0', 300: '#F1F5F9' };
const mist = { 100: '#E2E8F0', 200: '#F1F5F9', 300: '#FFFFFF' };
const core = { blue: '#3B82F6' };
const status = { error: '#F43F5E', success: '#10B981', warning: '#F59E0B' };

const easing = { smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)' };
const duration = { fast: '150ms', base: '200ms', slow: '300ms', slower: '500ms' };
```

**Usage in UnoCSS:**
- Colors: `bg-obsidian-100`, `text-mist-300`, `border-white/10`
- Motion: `duration-fast ease-smooth`
- Shortcuts: `backdrop-blur-10`, `backdrop-blur-20`

### 1.5 圆角系统 (Radii)

Nexus 风格不仅是圆角，而是混合形状。

* **$radius-xs:** 2px (微标签)
* **$radius-sm:** 6px (内部输入框)
* **$radius-md:** 12px (标准卡片)
* **$radius-lg:** 16px (模态框)
* **$radius-full:** 9999px (胶囊按钮/导航栏)

---

## 2. 材质系统 (Material System)

这是区分 Nexus 与普通 Dark Mode 的关键。我们在规范中定义物理材质。

### M1: The Void (虚空)

* **Visual:** 纯深色，无噪点。
* **Usage:** 应用的最底层背景 (`<body>`, `<View>`)。

### M2: Frost Glass (磨砂)

* **Visual:** 背景模糊 (Blur 12px) + 中等透明度填充 (Fill 70%) + 1px 内描边 (Inner Border)。
* **Usage:** 卡片、侧边栏、非主要浮层。
* **Spec:**
  * Backdrop Blur: `12px`
  * Fill: `rgba(15, 23, 42, 0.7)` (v1.1: increased from 0.4)
  * Border: `1px solid rgba(255, 255, 255, 0.1)` (v1.1: increased from 0.08)
* **Implementation:** `src/tokens/materials.ts`
  ```typescript
  const FrostGlass = 'backdrop-blur-12 bg-slate-900/70 border border-white/10';
  ```

### M3: Deep Glass (深磨砂)

* **Visual:** 高背景模糊 (Blur 12px) + 高遮盖力 (Fill 90%)。
* **Usage:** 模态框 (Modal)、Dropdown 菜单、底部控制台 (Console)。防止背景文字干扰前景。
* **Spec:**
  * Backdrop Blur: `12px` (v1.1: reduced from 24px)
  * Fill: `rgba(2, 6, 23, 0.9)` (v1.1: increased from 0.7)
* **Implementation:** `src/tokens/materials.ts`
  ```typescript
  const DeepGlass = 'backdrop-blur-12 bg-slate-950/90';
  ```

---

## 3. 原子组件规范 (Atomic Specs)

以下是每个组件库必须包含的核心原子定义。

### 3.1 按钮 (Button)

**Variants (变体):**

1. **Solid (Primary):**
* Background: `bg-core-blue/20` (Hover: `/30`)
* Border: `border-core-blue/50`
* Text: `#FFFFFF` (Pure White, WCAG AAA)
* Glow: `shadow-[0_0_15px_rgba(59,130,246,0.4)]` on hover

2. **Hollow (Secondary):**
* Background: Transparent
* Border: `border-white/20`
* Text: `#CBD5E1` (Slate-300, Hover: `#FFFFFF`)
* Hover: `bg-white/10`

3. **Plain (Text Only):**
* Background: Transparent
* Text: `#CBD5E1` (Slate-300, Hover: `#FFFFFF`)
* Hover: Underline

**Implementation:** `src/ui/button.tsx`
```typescript
const VariantStyle = {
  solid: 'bg-core-blue/20 hover:bg-core-blue/30 border border-core-blue/50 text-white',
  hollow: 'bg-transparent border border-white/20 text-slate-200 hover:bg-white/10',
  plain: 'bg-transparent text-slate-200 hover:text-white hover:underline',
} as const;

const SizeMap = {
  small: 'h-6 text-2.5',
  middle: 'h-8 text-3',
  large: 'w-56 h-10 text-3.5',
} as const;
```



**States (状态):**

* **Default:** 标准状态。
* **Hover:** 亮度提升 10%，光标变为 Pointer。
* **Active (Press):** 整体 Scale 缩放至 0.98。
* **Disabled:** Opacity 50%，去除所有交互和光效。
* **Loading:** 隐藏文字，中心显示 Loading Spinner。

### 3.2 输入框 (Input)

**Design Logic:** 输入框不是一个“坑”，而是一个“能量槽”。

* **Shape:** `$radius-sm` 或 `$radius-full` (搜索框)。
* **Default:** 背景 `$surface-glass-low`，边框 `$border-dim`。
* **Focus:**
* Border 变色为 `$brand-primary`。
* 增加外发光 (Ring): `0px 0px 0px 4px rgba(59, 130, 246, 0.2)`。


* **Error:** Border 变色为 `$signal-red`，震动动效。

### 3.3 开关与选框 (Toggle & Checkbox)

**Checkbox:**
* Unchecked: `size-5`, `border-white/10`
* Checked: `bg-core-blue`, `border-core-blue`, `shadow-[0_0_8px_rgba(59,130,246,0.4)]`
* Icon: `i-nexus:check-monotone`, white glow

**Implementation:** `src/ui/checkbox/index.tsx`
```typescript
const BaseStyle = 'size-5 rounded border border-white/10 transition-colors duration-fast ease-smooth';
const CheckedStyle = 'data-[state=checked]:bg-core-blue data-[state=checked]:border-core-blue';
```

**Switch:**
* Track: `w-11 h-6`, Unchecked: `bg-white/10`, Checked: `bg-core-blue/50`
* Thumb: `size-5`, `bg-white`, `shadow-[0_0_4px_rgba(255,255,255,0.3)]`
* Motion: `translate-x-5` when checked

**Implementation:** `src/ui/switch.tsx`
```typescript
const BaseStyle = 'h-6 w-11 rounded-full border border-white/10 bg-white/10 data-[state=checked]:bg-core-blue/50';
const ThumbStyle = 'size-5 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.3)] data-[state=checked]:translate-x-5';
```



### 3.4 图标 (Iconography)

* **Set:** 统一使用线性图标 (Stroke-based)，推荐 Lucide 或 Heroicons。
* **Weight:** 统一 Stroke Width 为 **1.5px** 或 **2px**。
* **Size:**
* sm: 16px
* md: 20px (标准)
* lg: 24px



---

## 4. 动效物理学 (Motion Physics)

在 Nexus 系统中，动效必须遵循“机械与流体”结合的物理规律。严禁使用线性的 `ease-in`。

### 4.1 贝塞尔曲线 (Timing Functions)

* **$ease-out-expo:** `cubic-bezier(0.19, 1, 0.22, 1)` -> 用于入场 (Enter)。
* **$ease-in-expo:** `cubic-bezier(0.95, 0.05, 0.795, 0.035)` -> 用于离场 (Exit)。
* **$spring-bouncy:** Mass: 1, Tension: 180, Friction: 12 -> 用于强调交互 (Like, Success)。

### 4.2 持续时间 (Durations)

* **Fast:** 150ms (Hover, Toggle, Micro-interaction)
* **Normal:** 300ms (Card Expand, Modal Pop)
* **Slow:** 500ms+ (Page Transition, Background shifts)

---

## 5. 版式层级 (Typography Scale)

基于 `Inter`，设定严格的字号层级，避免随意产生新字号。

| Scale Name | Size (px/rem) | Weight | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- |
| **H1 (Display)** | 32px / 2.0rem | Bold (700) | 1.2 | -0.02em |
| **H2 (Section)** | 24px / 1.5rem | SemiBold (600) | 1.3 | -0.01em |
| **H3 (Card Title)** | 18px / 1.125rem | Medium (500) | 1.4 | 0 |
| **Body (Main)** | 16px / 1.0rem | Light (300) | 1.6 | 0 |
| **Caption** | 14px / 0.875rem | Regular (400) | 1.5 | 0.02em |
| **Mono (Code)** | 14px / 0.875rem | Regular (400) | 1.6 | 0 |

---

## 6. 推广与落地指南 (Implementation Guide)

为了将这套系统推广到“所有项目”，你需要产出以下技术资产：

1. **Design Tokens Package (NPM):**
* 导出一个 JSON 文件，包含所有颜色、间距、字体变量。
* Web 端转化为 CSS Variables (`:root`).
* App 端转化为 JS/Swift 常量。


2. **Component Playground (Storybook):**
* 必须搭建一个 Storybook 站点。
* 每个组件必须有 "Dark Mode" 默认背景，否则无法验收“光效”。


3. **Developer Linter:**
* 配置 Stylelint 或 ESLint 插件，禁止开发者手写 Hex 颜色 (如 `#333`)，强制要求使用 Token (如 `bg-surface-glass`)。