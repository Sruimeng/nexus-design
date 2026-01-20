# Nexus Design System

基于 Radix UI 原语和 UnoCSS 构建的现代 React 组件库。

[English](./README.md) | [API 参考](./docs/api-reference.md)

## 特性

- **Radix UI 原语** - 无障碍、无样式的组件基础
- **UnoCSS 样式** - 原子化 CSS 配合自定义主题令牌
- **TypeScript** - 严格模式下的完整类型安全
- **暗色主题** - 基于 Obsidian 的暗色设计
- **玻璃效果** - 毛玻璃材质 (FrostGlass, DeepGlass)
- **复合组件** - 灵活的组合模式

## 安装

```bash
pnpm add @sruim/nexus-design
```

**对等依赖：**

```bash
pnpm add react react-dom
```

## 快速开始

### 1. 配置 UnoCSS

```typescript
// uno.config.ts
import { theme } from '@sruim/nexus-design/theme';
import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  theme,
});
```

### 2. 导入样式

```typescript
// main.tsx
import '@sruim/nexus-design/style.css';
```

### 3. 设置 Dialoger

使用命令式对话框 API（`Dialog.show`、`Confirm.show`）时必需：

```tsx
import { Dialoger } from '@sruim/nexus-design/ui';

function App() {
  return (
    <>
      <YourApp />
      <Dialoger />
    </>
  );
}
```

### 4. 使用组件

```tsx
import { Button, Dialog, Select } from '@sruim/nexus-design/ui';
import { IconButton } from '@sruim/nexus-design/components';

function Example() {
  return (
    <div>
      <Button variant="solid">点击我</Button>
      <IconButton icon="i-nexus:download" text="下载" />
    </div>
  );
}
```

## 导入路径

| 路径 | 描述 |
|------|------|
| `@sruim/nexus-design` | 所有导出 |
| `@sruim/nexus-design/ui` | UI 原语 (Button, Dialog, Select...) |
| `@sruim/nexus-design/components` | 复合组件 (Icon, IconButton...) |
| `@sruim/nexus-design/utils` | 工具函数 (cn, sleep, copy...) |
| `@sruim/nexus-design/theme` | UnoCSS 主题配置 |
| `@sruim/nexus-design/style.css` | 全局样式 |

## 组件

### UI 原语

| 组件 | 描述 |
|------|------|
| `Button` | 主按钮，支持 solid/hollow/plain 变体 |
| `Dialog` | 模态对话框，支持命令式 API |
| `Confirm` | 确认对话框 |
| `Select` | 下拉选择器 |
| `Tabs` | 标签页导航 |
| `Popover` | 浮动弹出框 |
| `Tooltip` | 悬停提示 |
| `Checkbox` | 复选框 |
| `Switch` | 开关切换 |
| `Slider` | 滑块，可选输入框 |
| `Progress` | 进度条 |
| `Toggle` | 切换按钮 |
| `ToggleGroup` | 切换按钮组 |
| `Avatar` | 用户头像 |
| `Badge` | 通知徽章 |
| `Drawer` | 底部抽屉 |
| `Form` | 表单，集成 Zod 验证 |

### 复合组件

| 组件 | 描述 |
|------|------|
| `Icon` | UnoCSS 图标包装器 |
| `IconButton` | 带图标的按钮 |
| `ImgUploader` | 图片上传组件 |
| `ImgViewer` | 图片查看器 |
| `ModelUploader` | 3D 模型上传 |
| `Tree` | 树形视图 |
| `Loading` | 加载指示器 |
| `Loadable` | 异步内容包装器 |

## 主题令牌

### 颜色

```tsx
// 暗色背景
bg-obsidian-100  // #020617
bg-obsidian-200  // #0F172A
bg-obsidian-300  // #1E293B

// 主色调
bg-core-blue     // #3B82F6

// 状态色
text-status-error    // #F43F5E
text-status-success  // #10B981
text-status-warning  // #F59E0B

// 文本色
text-text-primary    // #FFFFFF
text-text-secondary  // #CBD5E1
text-text-disabled   // #64748B
```

### 玻璃材质

```tsx
import { FrostGlass, DeepGlass } from '@sruim/nexus-design/tokens/materials';

// FrostGlass: backdrop-blur-12 bg-slate-900/70 border border-white/10
// DeepGlass: backdrop-blur-12 bg-slate-950/90
```

## 开发

```bash
# 安装依赖
pnpm install

# 启动 Storybook
pnpm storybook

# 构建库
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

## 技术栈

- React 19
- TypeScript 5.8
- Radix UI
- UnoCSS
- Vite
- Storybook
- Zod + React Hook Form

## 许可证

MIT
