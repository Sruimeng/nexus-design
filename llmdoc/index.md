---
id: llmdoc-index
type: navigation
status: stable
---

# LLMDoc Index

## Quick Start

**START HERE:**
1. [constitution.md](reference/constitution.md) - Technical rules (MANDATORY)
2. [style-hemingway.md](reference/style-hemingway.md) - Code style (MANDATORY)
3. [system-overview.md](architecture/system-overview.md) - Architecture map

## Reference (Constitution)

**Core Laws:**
- [constitution.md](reference/constitution.md) - TypeScript, React, Radix UI, UnoCSS rules
- [style-hemingway.md](reference/style-hemingway.md) - Iceberg Principle, naming, terseness
- [forbidden-patterns.md](reference/forbidden-patterns.md) - Anti-patterns and violations

**Technical Specs:**
- [tech-stack.md](reference/tech-stack.md) - Dependencies, build tools, Storybook
- [data-models.md](reference/data-models.md) - TypeScript interfaces, data models
- [tokens.md](reference/tokens.md) - Design tokens (colors, motion)
- [materials.md](reference/materials.md) - Material system (Void, FrostGlass, DeepGlass)
- [components.md](reference/components.md) - Component inventory
- [ui.md](reference/ui.md) - Nexus Design System spec
- [shared-utilities.md](reference/shared-utilities.md) - Helper functions (cn, config)

## Architecture

**System Design:**
- [system-overview.md](architecture/system-overview.md) - Directory structure, component hierarchy, export map

## Guides

**Development:**
- [storybook-usage.md](guides/storybook-usage.md) - Run, create, and deploy stories
- [accessibility.md](guides/accessibility.md) - WCAG AA/AAA compliance, v1.1 updates

## Navigation Rules

**Document Priority:**
1. Reference docs = immutable law
2. Architecture docs = stable structure
3. Guides = tactical procedures

**Update Protocol:**
- Reference changes require audit
- Architecture changes require approval
- Guides can evolve iteratively

**Cross-References:**
- Each doc has `related_ids` in frontmatter
- Follow links for deep dives
- Start from constitution for all new work
