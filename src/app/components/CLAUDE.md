# CLAUDE.md - Map Components

This file provides specific guidance for working with map-related components in this directory.

## Component Architecture Overview

All components in this directory are **client-side only** and use the `.cli.tsx` naming convention to indicate they require browser APIs. They cannot be server-side rendered due to Leaflet dependencies.

## Required Patterns

### Client-Side Directive
```typescript
'use client';
// Must be first line in every component file
```

### Context Consumption Pattern
All components consume the `appSettings` context for state management:

```typescript
import { appSettings } from "../context";
import { useContext } from "react";

// Standard context consumption pattern
const popupSettings = useContext(appSettings)?.popupSettings;
const setShowPopup = popupSettings?.setShowPopup || (() => {});
const map = useContext(appSettings)?.map;
```

### Popup State Management
To trigger article popups, use this pattern:
```typescript
const popupSettings = useContext(appSettings)?.popupSettings;
const setTitle = popupSettings?.setPopupTitle || (() => {});
const setSubtitle = popupSettings?.setPopupSubtitle || (() => {});
const setText = popupSettings?.setPopupText || (() => {});
const setImages = popupSettings?.setPopupImages || (() => {});
const setShowPopup = popupSettings?.setShowPopup || (() => {});

// Usage:
setTitle("Article Title");
setSubtitle("Optional subtitle");
setText(markdownContent);
setImages(artworkArray);
setShowPopup(true);
```

## Component-Specific Notes

### Map.cli.tsx (Core Map Component)
- **Polling Pattern**: Uses `setInterval` to wait for Leaflet map initialization
- **Dark Mode**: Automatically detects system preference and updates tiles
- **State Management**: Sets map reference in context after initialization
- **Error Handling**: Conditional rendering based on `componentMounted` state
- **Zoom Controls**: Configured with `minZoom: 3` and geographic bounds

### ArticlePopup.cli.tsx (Modal Display)
- **Markdown Support**: Uses `react-markdown` with `rehype-highlight` for syntax highlighting
- **Conditional Rendering**: Returns `null` if `showPopup` is false
- **Context Pattern**: Destructures all popup state from context with fallbacks
- **Styling**: Uses shadcn/ui Card components with custom scrollable content

### FloatingMenu.cli.tsx (Navigation Controls)
- **flyTo Integration**: Uses `map.flyTo(coordinates, zoom)` for smooth navigation
- **Toast Feedback**: Provides user feedback for navigation actions
- **Regional Data**: Imports from `meaningfulRegions.data.ts` for button configuration
- **Dynamic Rendering**: Maps over region data to generate navigation buttons

### FloatingEmblem.cli.tsx (Branding/Info)
- **Click Handler**: Triggers main article popup with Waldensian content
- **Image Optimization**: Uses Next.js `Image` component with `priority` flag
- **Content Integration**: Imports from `waldensiansContent.ts` for article data

### MarkerPopup.tsx (Marker Tooltips)
- **Leaflet Integration**: Works with `react-leaflet` Tooltip component
- **Props Pattern**: Receives marker data as props from parent Map component
- **Content Display**: Shows marker name, description, and optional images

## Common Patterns & Best Practices

### Error Handling
```typescript
// Always provide fallback functions for context setters
const setSomething = contextValue?.setSomething || (() => {});

// Use optional chaining for context consumption
const value = useContext(appSettings)?.someValue;
```

### Toast Notifications
```typescript
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

toast({
  title: "Action completed",
  description: "Additional details here",
});
```

### Leaflet Map Reference
```typescript
// Wait for map initialization before using
const map = useContext(appSettings)?.map;
if (map) {
  map.flyTo([lat, lng], zoom);
}
```

## Integration Requirements

- All components must import and consume `appSettings` context
- Map-dependent components should check for map availability before operations
- Toast notifications should be used for user feedback on actions
- Content should come from data files, not hardcoded strings
- Images should use Next.js `Image` component with appropriate optimization

## Styling Conventions

- Use Tailwind utility classes for all styling
- Follow shadcn/ui component patterns for consistent design
- Apply `z-index` classes for proper layering (map overlays)
- Use responsive classes for mobile compatibility

## Testing Considerations

Currently no tests exist, but future testing should:
- Mock Leaflet map instances for component testing
- Test context state changes and side effects
- Verify client-side only rendering behavior
- Test map interaction patterns (flyTo, marker clicks, etc.)