# CLAUDE.md - Type Definitions

This directory contains TypeScript type definitions used throughout the application.

## Current Type Definitions (`index.ts`)

### `Artwork` Interface
**Purpose**: Defines artwork/image data structure for article popups

```typescript
export interface Artwork {
  artist: string;
  art: string;  // URL to artwork/image
}
```

**Usage**:
- Used in popup content for displaying images
- Referenced in `works.ts` data file
- Consumed by article popup components
- Part of context state for popup images

**Examples**:
```typescript
const artwork: Artwork = {
  artist: "Unknown",
  art: "https://upload.wikimedia.org/wikipedia/commons/d/da/Waldenser-Wappen.png"
}
```

### `Coordinates` Type
**Purpose**: Defines geographic coordinate structure for map markers

```typescript
export type Coordinates = {
  latitude: number
  longitude: number
}
```

**Usage**:
- Core structure for all geographic data
- Used by map markers and regional navigation
- Integrated with Leaflet coordinate system
- Essential for `flyTo` functionality

**Validation Considerations**:
- Latitude: -90 to 90 degrees
- Longitude: -180 to 180 degrees

### `MyMarker` Type
**Purpose**: Comprehensive marker data structure supporting both current JSON format and future CMS integration

```typescript
export type MyMarker = {
  id: string
  name: string
  coordinates: Coordinates
  image?: string
  description?: string
  createdAt?: string
  publishedAt?: string
  updatedAt?: string
  imageUrl?: string
  links?: string | undefined  // Note: prepared for string[] in CMS
}
```

**Key Features**:
- **Required fields**: `id`, `name`, `coordinates`
- **Optional metadata**: Timestamp fields for CMS integration
- **Flexible image handling**: Both `image` and `imageUrl` supported
- **Links field**: Currently string, designed for future array conversion
- **CMS-ready**: Structure matches Hygraph GraphQL schema

**Usage Patterns**:
```typescript
// Current JSON marker format
const marker: MyMarker = {
  id: "unique-id",
  name: "Colonia Valdense",
  coordinates: { latitude: -34.339, longitude: -57.264 },
  description: "Historical description",
  imageUrl: "/local-image.jpg"
}

// Future CMS integration ready
const cmsMarker: MyMarker = {
  id: "cms-generated-id",
  name: "Location Name",
  coordinates: { latitude: 45.123, longitude: 7.456 },
  createdAt: "2024-01-01T00:00:00Z",
  publishedAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-02T00:00:00Z",
  links: ["https://example.com", "https://wikipedia.org"] // Future format
}
```

## Type Safety Patterns

### Import and Usage
Always import types from the centralized location:

```typescript
import { Artwork, Coordinates, MyMarker } from '@/types';

// Component props
interface MapProps {
  markers: MyMarker[];
}

// Function parameters
function flyToCoordinates(coords: Coordinates, zoom: number) {
  // Implementation
}
```

### Optional Property Handling
Use optional chaining and nullish coalescing for optional fields:

```typescript
// Safe access to optional properties
const description = marker.description ?? 'No description available';
const imageUrl = marker.imageUrl || marker.image || '/default-image.jpg';
const links = typeof marker.links === 'string' ? [marker.links] : marker.links || [];
```

### Type Guards
Consider adding type guards for runtime validation:

```typescript
export function isValidCoordinates(obj: any): obj is Coordinates {
  return (
    typeof obj === 'object' &&
    typeof obj.latitude === 'number' &&
    typeof obj.longitude === 'number' &&
    obj.latitude >= -90 && obj.latitude <= 90 &&
    obj.longitude >= -180 && obj.longitude <= 180
  );
}

export function isValidMarker(obj: any): obj is MyMarker {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    isValidCoordinates(obj.coordinates)
  );
}
```

## Future Type Extensions

### Enhanced Marker Types
As the application grows, consider these type extensions:

```typescript
// Marker categories/types
export type MarkerCategory = 'settlement' | 'persecution' | 'church' | 'historical-event';

// Enhanced marker with category
export interface EnhancedMarker extends MyMarker {
  category: MarkerCategory;
  significance: 'high' | 'medium' | 'low';
  timelineEvents: TimelineEvent[];
}

// Historical timeline events
export interface TimelineEvent {
  date: string;
  event: string;
  significance: string;
}

// Regional data enhancement
export interface Region {
  id: string;
  name: string;
  country: string;
  coordinates: Coordinates;
  zoom: number;
  markers: MyMarker[];
  historicalPeriod: string;
}
```

### Context State Types
Types for context state management:

```typescript
// Popup state (currently in context/index.tsx)
export interface PopupState {
  showPopup: boolean;
  title: string;
  subtitle: string;
  content: string;
  images: Artwork[];
}

// Map state
export interface MapState {
  instance: L.Map | null;
  position: Coordinates;
  zoom: number;
  selectedMarker: MyMarker | null;
}

// Application state
export interface AppState {
  map: MapState;
  popup: PopupState;
  theme: 'light' | 'dark' | 'system';
}
```

### API Integration Types
For future CMS and API integrations:

```typescript
// GraphQL response types
export interface HygraphResponse {
  data: {
    places: MyMarker[];
  };
  errors?: GraphQLError[];
}

// API error handling
export interface APIError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

## Best Practices

### Type Organization
- Keep all shared types in `index.ts`
- Use consistent naming conventions
- Export all types as named exports
- Document complex types with JSDoc comments

### Type Safety
- Prefer interfaces for object shapes that might be extended
- Use type aliases for unions and primitives
- Always type function parameters and return values
- Use strict TypeScript configuration

### Backward Compatibility
- When updating types, ensure backward compatibility
- Use optional properties for new fields
- Consider migration strategies for breaking changes
- Document type evolution in commit messages

### Documentation
Include JSDoc comments for complex types:

```typescript
/**
 * Represents a historical marker on the Waldensian map
 * @interface MyMarker
 * @property {string} id - Unique identifier for the marker
 * @property {Coordinates} coordinates - Geographic location
 * @property {string} [links] - Currently string, will become string[] in CMS version
 */
export type MyMarker = {
  // ... type definition
}
```

## Integration Notes

### Component Integration
Types are consumed throughout the component tree:
- Map components use `MyMarker` and `Coordinates`
- Popup components use `Artwork` for image display
- Context uses all types for state management

### Data Layer Integration
Types ensure consistency between:
- Static JSON data files
- Future CMS integration
- Component prop interfaces
- Context state shapes

### Build-Time Validation
TypeScript compiler validates:
- Type compatibility across imports
- Optional property access patterns
- Function parameter/return type matching
- Interface implementation completeness