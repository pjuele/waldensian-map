# CLAUDE.md - Utility Functions

This directory contains utility functions used throughout the application.

## Current Utilities

### `utils.ts` - Class Name Utility

**Purpose**: Provides the `cn()` function for merging Tailwind CSS classes with conflict resolution.

**Implementation**:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Dependencies**:
- **`clsx`**: Conditional class name construction
- **`tailwind-merge`**: Tailwind class conflict resolution

## Usage Patterns

### Primary Usage
Used throughout the application for dynamic class name generation:

```typescript
import { cn } from "@/lib/utils"

// Basic class merging
<div className={cn("base-class", conditionalClass && "conditional-class")} />

// shadcn/ui component pattern
<button className={cn(buttonVariants({ variant, size }), className)} />

// Layout.tsx example
<body className={cn(
  "min-h-screen bg-background font-sans antialiased",
  fontSans.variable,
)}>
```

### Component Variants
Essential for shadcn/ui component variant system:

```typescript
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const variants = cva("base", {
  variants: {
    size: { sm: "text-sm", lg: "text-lg" }
  }
})

<Component className={cn(variants({ size }), "custom-class")} />
```

### Conditional Styling
Handles conditional classes safely:

```typescript
<div className={cn(
  "default-styles",
  isActive && "active-styles",
  hasError && "error-styles",
  disabled && "disabled-styles"
)} />
```

## Function Behavior

### Class Conflict Resolution
The `cn()` function resolves Tailwind class conflicts:

```typescript
cn("px-4 px-8") // Result: "px-8" (later takes precedence)
cn("text-red-500 text-blue-500") // Result: "text-blue-500"
```

### Conditional Classes
Handles falsy values gracefully:

```typescript
cn("base", null, undefined, false, "valid") // Result: "base valid"
cn("base", condition && "conditional") // Result: "base" or "base conditional"
```

### Type Safety
Accepts multiple input types:
- Strings
- Objects with boolean values
- Arrays
- Null/undefined (ignored)

## Extension Opportunities

### Additional Utilities
Common patterns that could be added:

```typescript
// Color utility for dynamic theming
export function getColorFromType(type: 'success' | 'error' | 'warning') {
  const colors = {
    success: 'text-green-600 bg-green-50',
    error: 'text-red-600 bg-red-50',
    warning: 'text-yellow-600 bg-yellow-50'
  }
  return colors[type]
}

// Responsive utility for breakpoint classes
export function responsive(classes: Record<string, string>) {
  return Object.entries(classes)
    .map(([breakpoint, classNames]) =>
      breakpoint === 'base' ? classNames : `${breakpoint}:${classNames}`
    )
    .join(' ')
}

// Format utility for coordinates display
export function formatCoordinates(lat: number, lng: number) {
  return `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}°${lng >= 0 ? 'E' : 'W'}`
}
```

### Map-Specific Utilities
Potential utilities for map functionality:

```typescript
// Distance calculation between coordinates
export function calculateDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  // Haversine formula implementation
}

// Zoom level calculation based on bounds
export function calculateZoomLevel(bounds: number[][]): number {
  // Calculate appropriate zoom level for given bounds
}

// URL generation for tile providers
export function generateTileUrl(provider: string, x: number, y: number, z: number): string {
  // Generate tile URL based on provider and coordinates
}
```

## Best Practices

### When to Add Utilities
Add utilities here when:
- Function is used in 3+ places across the application
- Logic is complex enough to warrant centralization
- Function provides reusable business logic
- Utility enhances type safety or developer experience

### Naming Conventions
- Use descriptive, verb-based names
- Follow camelCase convention
- Export as named exports (not default)
- Include TypeScript types for parameters and return values

### Documentation
Include JSDoc comments for complex utilities:

```typescript
/**
 * Merges class names with Tailwind CSS conflict resolution
 * @param inputs - Class names, objects, or arrays of classes
 * @returns Merged and deduplicated class string
 * @example
 * cn("px-4 px-8", { "font-bold": isActive }) // "px-8 font-bold"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Integration Notes

### Import Alias
Always import using the `@/lib/utils` alias for consistency:

```typescript
import { cn } from "@/lib/utils" // ✅ Correct
import { cn } from "../../lib/utils" // ❌ Avoid relative imports
```

### Testing Considerations
Future testing should cover:
- Class conflict resolution
- Conditional class handling
- Type safety with various inputs
- Edge cases with null/undefined values

### Performance
The `cn()` function is lightweight and optimized for frequent use in render cycles. No memoization needed for typical usage patterns.