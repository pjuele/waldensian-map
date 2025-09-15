# CLAUDE.md - React Context

This directory contains the global state management using React Context API.

## Context Architecture (`index.tsx`)

### Single Context Provider Strategy
The application uses a **single context provider** that manages all global state, avoiding multiple context providers and prop drilling.

```typescript
export const appSettings = createContext(null as AppSettings);
```

## Type Definitions

### `AppSettings` Type
**Main context interface** containing all application state:

```typescript
export type AppSettings = null | {
  map: L.Map | null,
  setMap: React.Dispatch<React.SetStateAction<L.Map | null>>,
  mapPosition: {
    lat: number,
    lng: number
  },
  setMapPosition: React.Dispatch<React.SetStateAction<{
    lat: number,
    lng: number
  }>>,
  popupSettings: PopupSettings,
}
```

### `PopupSettings` Type
**Nested state structure** for article popup management:

```typescript
export type PopupSettings = null | {
  showPopup: boolean,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  popupTitle: string,
  setPopupTitle: React.Dispatch<React.SetStateAction<string>>,
  popupSubtitle: string,
  setPopupSubtitle: React.Dispatch<React.SetStateAction<string>>,
  popupText: string,
  setPopupText: React.Dispatch<React.SetStateAction<string>>,
  popupImages: Artwork[],
  setPopupImages: React.Dispatch<React.SetStateAction<Artwork[]>>
};
```

## State Management Patterns

### Provider Implementation
**Single provider wraps entire application** in `layout.tsx`:

```typescript
function Context({ children }: { children: React.ReactNode }): JSX.Element {
  // All state declarations
  const [showPopup, setShowPopup] = useState(false as boolean);
  const [popupTitle, setPopupTitle] = useState("" as string);
  const [map, setMap] = useState(null as L.Map | null);
  const [mapPosition, setMapPosition] = useState({lat: 25, lng: -5});

  // State object construction
  const defaultAppSettings = {
    map, setMap,
    mapPosition, setMapPosition,
    popupSettings: {
      showPopup, setShowPopup,
      popupTitle, setPopupTitle,
      // ... all popup state
    }
  };

  return (
    <appSettings.Provider value={defaultAppSettings}>
      {children}
    </appSettings.Provider>
  );
}
```

### State Consumption Pattern
**Standard pattern used across all components**:

```typescript
import { appSettings } from "@/app/context";
import { useContext } from "react";

// Component consumption pattern
const popupSettings = useContext(appSettings)?.popupSettings;
const setShowPopup = popupSettings?.setShowPopup || (() => {});
const map = useContext(appSettings)?.map;
const mapPosition = useContext(appSettings)?.mapPosition;
```

**Critical Pattern**: Always provide fallback functions to prevent runtime errors:
```typescript
const setShowPopup = popupSettings?.setShowPopup || (() => {}); // ✅ Safe
const setShowPopup = popupSettings?.setShowPopup; // ❌ Could be undefined
```

## State Categories

### Map State
**Map instance and position management**:
- `map: L.Map | null` - Leaflet map instance (set after initialization)
- `setMap` - Updates map reference (used by Map.cli.tsx after polling)
- `mapPosition: {lat, lng}` - Current map center coordinates
- `setMapPosition` - Updates map center (for programmatic navigation)

**Initial Values**:
```typescript
const [map, setMap] = useState(null as L.Map | null);
const [mapPosition, setMapPosition] = useState({lat: 25, lng: -5}); // Mediterranean center
```

### Popup State
**Article popup content and visibility**:
- `showPopup: boolean` - Controls popup modal visibility
- `popupTitle: string` - Main article title
- `popupSubtitle: string` - Article subtitle
- `popupText: string` - Main content (Markdown format)
- `popupImages: Artwork[]` - Array of artwork/images for article

**State Flow**:
1. Component triggers popup (FloatingEmblem, MarkerPopup)
2. Sets all popup content via context setters
3. Sets `showPopup: true` to display modal
4. ArticlePopup.cli.tsx renders content from context state

## Usage Patterns

### Triggering Article Popups
**Standard workflow** for showing educational content:

```typescript
const popupSettings = useContext(appSettings)?.popupSettings;
const setTitle = popupSettings?.setPopupTitle || (() => {});
const setSubtitle = popupSettings?.setPopupSubtitle || (() => {});
const setText = popupSettings?.setPopupText || (() => {});
const setImages = popupSettings?.setPopupImages || (() => {});
const setShowPopup = popupSettings?.setShowPopup || (() => {});

// Usage example from FloatingEmblem
const {title, subTitle, text, images} = waldensiansContent;
setTitle(title);
setSubtitle(subTitle);
setText(text);
setImages(images);
setShowPopup(true);
```

### Map Navigation
**Programmatic map navigation** using context:

```typescript
const map = useContext(appSettings)?.map;
const setMapPosition = useContext(appSettings)?.setMapPosition;

// Navigation function
function flyToLocation(coordinates: [number, number], zoom: number) {
  if (map) {
    map.flyTo(coordinates, zoom);
    setMapPosition({lat: coordinates[0], lng: coordinates[1]});
  }
}
```

### Map Instance Management
**Handling async Leaflet initialization**:

Map.cli.tsx uses a **polling pattern** to set map reference:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    if (!current && mapRef.current) {
      setCurrent(mapRef.current);
      clearInterval(interval);
    }
  }, 100);
}, []);

// Later, set in context
useEffect(() => {
  if (setMap && current) setMap(current);
}, [setMap, current]);
```

## Context Consumer Patterns

### Safe Context Access
**Always check for null context values**:

```typescript
// ✅ Safe pattern with null checking
const settings: PopupSettings = useContext(appSettings)?.popupSettings || null;
const showPopup: boolean = settings?.showPopup || false;

// ✅ Safe setter pattern
const showPopupSetter: React.Dispatch<React.SetStateAction<boolean>>
  = settings?.setShowPopup || (() => {});
```

### Type-Safe Context Hooks
**Consider creating custom hooks** for safer context access:

```typescript
// Future enhancement: Custom hooks
function usePopupSettings() {
  const context = useContext(appSettings);
  if (!context) {
    throw new Error('usePopupSettings must be used within Context provider');
  }
  return context.popupSettings;
}

function useMapSettings() {
  const context = useContext(appSettings);
  if (!context) {
    throw new Error('useMapSettings must be used within Context provider');
  }
  return { map: context.map, setMap: context.setMap, position: context.mapPosition };
}
```

## State Synchronization

### Map-Context Synchronization
**Two-way synchronization** between Leaflet map and React state:

1. **React → Leaflet**: Context state changes trigger map updates
2. **Leaflet → React**: Map events update context state
3. **Initial sync**: Polling pattern handles async map initialization

### Popup State Lifecycle
**Complete popup lifecycle management**:

1. **Closed state**: `showPopup: false`, empty content
2. **Content setting**: Components populate title, text, images
3. **Display**: `setShowPopup(true)` triggers modal
4. **User interaction**: Close button sets `showPopup: false`
5. **Cleanup**: Content remains in state for potential re-display

## Performance Considerations

### Context Value Optimization
**Current approach**: Context value is recreated on every render

**Future optimization**: Consider `useMemo` for context value:
```typescript
const contextValue = useMemo(() => ({
  map, setMap,
  mapPosition, setMapPosition,
  popupSettings: {
    showPopup, setShowPopup,
    // ... other popup state
  }
}), [map, mapPosition, showPopup, /* other dependencies */]);
```

### Selective Context Consumption
**Best practice**: Only consume needed context values in components to minimize re-renders.

## Testing Considerations

### Context Testing Strategy
Future testing should include:

```typescript
// Test helper: Context wrapper
function renderWithContext(component: React.ReactElement) {
  return render(
    <appSettings.Provider value={mockContextValue}>
      {component}
    </appSettings.Provider>
  );
}

// Mock context values for testing
const mockContextValue: AppSettings = {
  map: null,
  setMap: jest.fn(),
  mapPosition: { lat: 25, lng: -5 },
  setMapPosition: jest.fn(),
  popupSettings: {
    showPopup: false,
    setShowPopup: jest.fn(),
    // ... other mock values
  }
};
```

## Migration Considerations

### Moving to External State Management
**If scaling requires external state management** (Redux, Zustand):

1. **Keep context interface**: Maintain same API for components
2. **Gradual migration**: Replace context internals with external store
3. **Type preservation**: Maintain existing TypeScript interfaces
4. **Component isolation**: No component changes needed if interface preserved