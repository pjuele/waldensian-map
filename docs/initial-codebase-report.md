# Initial Codebase Report: Waldensian Map

**Generated:** September 14, 2025
**Project:** Waldensian Map v0.1.0
**Framework:** Next.js 14 with App Router

## Executive Summary

The Waldensian Map is a Next.js-based interactive web application that displays historical locations related to the Waldensian movement. It features a React Leaflet map with custom markers, floating navigation controls, and popup articles with educational content. The application uses modern React patterns with TypeScript, shadcn/ui components, and Tailwind CSS.

---

## Entry Points

### Primary Entry Points
1. **`src/app/layout.tsx`** - Root layout component that defines the HTML structure, loads fonts, and wraps the app with global providers
2. **`src/app/page.tsx`** - Main page component that renders the map interface with all interactive elements
3. **`next.config.mjs`** - Next.js configuration with image domain allowlists for map tiles and media
4. **`src/app/globals.css`** - Global styles including Tailwind base styles and CSS custom properties

### Secondary Entry Points
- **`src/app/context/index.tsx`** - React Context provider for global state management
- **`src/types/index.ts`** - TypeScript type definitions for the application
- **`src/lib/utils.ts`** - Utility functions (primarily Tailwind class merging)

---

## Folder Structure

```
waldensian-map/
├── docs/                           # Documentation (new)
├── public/                         # Static assets
│   ├── favicon_package_v0.16/      # Favicon files
│   └── [images]                    # Location images (*.jpg, *.webp, *.png)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── components/             # Map-specific components
│   │   │   ├── *.cli.tsx           # Client-side map components
│   │   │   └── MarkerPopup.tsx     # Marker tooltip component
│   │   ├── context/                # React Context providers
│   │   ├── data/                   # Static data files
│   │   │   ├── markers.json        # Map markers data
│   │   │   ├── *.ts                # Content and configuration data
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Main page
│   ├── components/ui/              # Reusable shadcn/ui components
│   ├── lib/                        # Utility functions
│   └── types/                      # TypeScript definitions
├── components.json                 # shadcn/ui configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

### Naming Conventions
- **`.cli.tsx`** suffix for client-side components that require browser APIs
- **`*.data.ts`** for static data files
- **`ui/`** prefix for reusable UI components
- **PascalCase** for component files and directories

---

## Technologies Used

### Core Framework & Runtime
- **Next.js 14.1.0** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5** - Type system

### Map & Visualization
- **React Leaflet 4.2.1** - React wrapper for Leaflet maps
- **Leaflet 1.9.4** - Interactive maps library
- **leaflet-defaulticon-compatibility 0.1.2** - Icon compatibility fixes

### UI & Styling
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **shadcn/ui components** based on:
  - **Radix UI primitives** - Accessible component building blocks
  - **class-variance-authority 0.7.0** - Component variant management
  - **tailwind-merge 2.2.1** - Tailwind class merging utility
  - **tailwindcss-animate 1.0.7** - Animation utilities

### Content & Markdown
- **react-markdown 9.0.1** - Markdown rendering
- **rehype-highlight 7.0.0** - Syntax highlighting for code blocks

### Development Tools
- **ESLint 8** with Next.js config - Code linting
- **PostCSS 8** - CSS processing
- **Autoprefixer 10** - CSS vendor prefixes

### Build & Deployment
- Standard Next.js build system
- No custom build tools or bundler configuration

---

## Testing Setup

**Current Status: No Testing Framework**

The codebase currently has **no test files or testing infrastructure**. Key gaps:
- No unit tests for components
- No integration tests for map functionality
- No end-to-end testing
- No test runners (Jest, Vitest, Cypress, etc.)

**Recommendations for Future Testing:**
- Add Jest + React Testing Library for unit tests
- Consider Cypress or Playwright for E2E testing of map interactions
- Test coverage for Context state management and marker functionality

---

## Coding Patterns & Conventions

### React Patterns
1. **Functional Components** - All components use function declaration syntax
2. **React Hooks** - Extensive use of useState, useEffect, useContext, useRef
3. **Custom Hook Integration** - Uses shadcn/ui custom hooks (useToast)
4. **Context Pattern** - Global state management via React Context
5. **Dynamic Imports** - Map components loaded dynamically to avoid SSR issues

### TypeScript Patterns
- **Interface definitions** for complex data structures (Artwork, Coordinates, MyMarker)
- **Type unions** for component props and state
- **Optional properties** extensively used in interfaces
- **Type aliases** for reusable type definitions

### Component Architecture
```typescript
// Example pattern from Map.cli.tsx
'use client';  // Client directive for browser APIs

import { useState, useRef, useContext, useEffect } from 'react';
// Component logic with hooks
// Context consumption
// Conditional rendering based on mount state
```

### State Management Patterns
- **Context Provider** wraps entire application
- **Multiple state slices** (map, popup, position) in single context
- **Setter function distribution** via context
- **Ref-based map instance management**

### Error Handling & Edge Cases
- **Conditional rendering** for unmounted components
- **Fallback values** using optional chaining and nullish coalescing
- **Loading states** for dynamically imported components
- **Interval-based polling** for map reference availability

### Styling Patterns
- **Tailwind utility classes** for all styling
- **CSS custom properties** for theming (defined in globals.css)
- **Class merging** utility for conditional styles
- **Component variants** using class-variance-authority
- **Responsive design** with Tailwind breakpoint prefixes

---

## Custom Commands & Scripts

### Package.json Scripts
```json
{
  "dev": "next dev",           // Development server (localhost:3000)
  "build": "next build",       // Production build
  "start": "next start",       // Serve production build
  "lint": "next lint"          // ESLint validation
}
```

### Development Workflow
1. **`npm run dev`** - Start development server with hot reload
2. **`npm run build`** - Create optimized production build
3. **`npm run lint`** - Check code quality and standards
4. **`npm start`** - Serve production build locally

### Build Configuration
- **No custom webpack configuration**
- **Standard Next.js build pipeline**
- **No custom deployment scripts**
- **Environment variables** ready for Hygraph CMS integration (commented out)

---

## Key Architectural Decisions

### 1. SSR Avoidance for Maps
```typescript
const MyMap = useMemo(() => dynamic(
  () => import('./components/Map.cli'),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false  // Prevents server-side rendering issues
  }
), [])
```

### 2. Context-Based State Management
- Single context provider for all global state
- Avoids prop drilling for map references and popup state
- Centralized state management without external libraries

### 3. Component Naming Strategy
- `.cli.tsx` suffix indicates client-side only components
- Distinguishes between SSR-safe and browser-only components

### 4. Data Strategy
- Static JSON files for markers (with CMS integration ready)
- TypeScript modules for configuration data
- Separation of content, configuration, and component logic

---

## Future Enhancement Opportunities

### Immediate Improvements
1. **Add comprehensive testing suite**
2. **Implement error boundaries for map components**
3. **Add loading states and error handling**
4. **Performance optimization for large marker datasets**

### Feature Enhancements
1. **Activate Hygraph CMS integration** (code already present)
2. **Add search functionality for locations**
3. **Implement marker clustering for dense areas**
4. **Add accessibility improvements for keyboard navigation**

### Technical Debt
1. **Remove commented code blocks** in page.tsx
2. **Standardize error handling patterns**
3. **Add proper TypeScript strict mode compliance**
4. **Implement proper SEO optimization**

---

## Dependencies Analysis

### Production Dependencies (11 packages)
- **Core:** React, Next.js, TypeScript
- **UI:** 6 Radix UI packages + shadcn/ui utilities
- **Maps:** Leaflet + React Leaflet + compatibility layer
- **Content:** react-markdown + syntax highlighting

### Development Dependencies (7 packages)
- **Types:** @types packages for TypeScript support
- **Build:** PostCSS, Autoprefixer, Tailwind CSS
- **Linting:** ESLint with Next.js configuration

**Dependency Health:** All dependencies are well-maintained and up-to-date. No security vulnerabilities detected in the initial analysis.

---

*This report provides a comprehensive overview of the current codebase state as of the initial analysis. Regular updates recommended as the project evolves.*