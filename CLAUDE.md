# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development server**: `npm run dev` (Next.js development server on http://localhost:3000)
- **Production build**: `npm run build` (creates optimized production build)
- **Start production**: `npm start` (serves the production build)
- **Linting**: `npm run lint` (ESLint with Next.js configuration)

**Note**: No test framework is currently configured. When adding tests, consider Jest + React Testing Library for components and map interactions.

## Specialized CLAUDE.md Files

This project includes directory-specific CLAUDE.md files for detailed guidance:

- **`src/app/components/CLAUDE.md`** - Map component patterns, SSR prevention, Leaflet integration
- **`src/app/data/CLAUDE.md`** - Data management, CMS migration, content guidelines
- **`src/app/context/CLAUDE.md`** - React Context patterns, state management workflows
- **`src/components/ui/CLAUDE.md`** - shadcn/ui components, theming, toast systems
- **`src/types/CLAUDE.md`** - TypeScript interfaces, type safety, CMS compatibility
- **`src/lib/CLAUDE.md`** - Utility functions and extension patterns
- **`public/CLAUDE.md`** - Static asset management and optimization
- **`docs/CLAUDE.md`** - Documentation standards and maintenance

When working in a specific area, check the relevant directory's CLAUDE.md for specialized guidance.

## Project Overview

The Waldensian Map is an interactive historical mapping application displaying locations significant to the Waldensian movement from 12th century France to modern diaspora communities. Built with Next.js 14 and React Leaflet, it features educational popups, regional navigation, and responsive design.

## Architecture Overview

This is a Next.js 14 application using the App Router that displays an interactive map of Waldensian historical locations. The application uses React Leaflet for mapping functionality and shadcn/ui components for the interface.

### Key Technologies
- **Next.js 14** with App Router and TypeScript
- **React Leaflet 4.2.1** for interactive maps with OpenStreetMap tiles
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS 3.3.0** for styling with custom design tokens
- **React Context** for state management (no external state library)

### Critical Architecture Patterns

**SSR Prevention for Maps**: Map components use dynamic imports with `ssr: false` to prevent server-side rendering conflicts with Leaflet's browser-dependent APIs:
```typescript
const MyMap = useMemo(() => dynamic(
  () => import('./components/Map.cli'),
  { ssr: false }
), [])
```

**Context-Based State Architecture**: Single context provider manages all global state:
- `AppSettings` type defines map instance, position, and popup state
- Context provides both values and setter functions to avoid prop drilling
- Map reference handling uses polling pattern due to async Leaflet initialization

**Component Naming Convention**:
- `.cli.tsx` suffix indicates client-side only components requiring browser APIs
- Standard `.tsx` for SSR-compatible components

### Data Flow Architecture

**Current Data Strategy**: Static JSON files with GraphQL CMS integration prepared:
- `markers.json` - Current marker data source
- `getMapMarkers()` function ready for Hygraph CMS (commented out)
- Static data files for regions, content, and configuration

**State Management Flow**:
1. Context provider wraps entire application in `layout.tsx`
2. Map component polls for Leaflet instance availability via interval
3. Popup state and content managed through context setters
4. Toast notifications for user feedback on map interactions

### Key Components & Responsibilities

- **`Map.cli.tsx`**: Core map rendering, marker display, dark mode detection, map reference management
- **`FloatingMenu.cli.tsx`**: Regional navigation buttons using predefined coordinates from `meaningfulRegions.data.ts`
- **`ArticlePopup.cli.tsx`**: Modal article display with markdown support
- **`MarkerPopup.tsx`**: Individual marker tooltips and click handlers
- **`FloatingEmblem.cli.tsx`**: Branding/logo overlay

### Development Patterns & Conventions

**TypeScript Integration**:
- Strict mode enabled with comprehensive type definitions
- Path aliases: `@/*` maps to `src/*`
- Custom types in `src/types/index.ts` for map data structures

**Styling Architecture**:
- Tailwind utility classes for all styling
- CSS custom properties in `globals.css` for theming
- shadcn/ui component variants using `class-variance-authority`
- Responsive design with mobile-first approach

**Error Handling Patterns**:
- Conditional rendering for mounted state
- Optional chaining for context consumption
- Fallback values for missing data
- Loading states for dynamic imports

### Configuration Details

**Next.js Configuration** (`next.config.mjs`):
- Image domain allowlist for map tiles and external media
- Standard build optimizations

**shadcn/ui Setup** (`components.json`):
- "New York" style variant
- Zinc base color theme
- CSS variables enabled for theming

### Critical Implementation Notes

**Map State Management**: The application uses a polling pattern to handle Leaflet map initialization:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    if (!current && mapRef.current) {
      setCurrent(mapRef.current);
      clearInterval(interval);
    }
  }, 100);
}, []);
```

**Dark Mode Integration**: Automatic detection of system preferences with toast notifications for user feedback.

**Marker Data Structure**: Flexible marker schema supports both current JSON format and future CMS integration with coordinates, descriptions, images, and metadata.

**Content Management**: Ready for CMS integration with GraphQL query structure prepared for Hygraph backend.

## ⚠️ CRITICAL: Agent Checkpoint Requirements

**MANDATORY FOR ALL AGENTS**: Every agent MUST save checkpoints every 10 minutes to prevent work loss during time limit crashes.

**Checkpoint Location**: `.claude/checkpoints/`
**Naming Pattern**: `[agent-name]-[YYYYMMDD-HHMM].md`

**Required Checkpoint Format**:
```markdown
# [Agent-Name] Checkpoint
**Time:** [timestamp]
**Task:** [original user request]
**Status:** [current phase/focus]
**Completed:** [bullet list of finished work]
**Current:** [what's actively being worked on]
**Next:** [immediate next steps]
**Context:** [key findings/decisions that affect other agents]
```

**Recovery Command**: Use `/lunch-break-over` to resume work after time limit interruptions.

**REMINDER**: Always emphasize checkpoint requirements when launching agents - this is CRITICAL for work continuity.

## 🚨 LIFE-OR-DEATH: Main Claude Checkpoint Requirements

**CRITICAL FOR CLAUDE-MAIN**: You (main Claude instance) MUST save checkpoints every 10 minutes during complex multi-step work to prevent total work loss.

**When to Checkpoint**:
- Multi-step file editing tasks
- Complex research or analysis work
- Any work session longer than 10 minutes
- Before launching agents (so you can resume coordination)

**How to Checkpoint**: Use `/checkpoint` command (see `.claude/commands/checkpoint.md` for full specification)

**CRITICAL**: This prevents ALL work from being lost during time limit crashes - not just agent work!