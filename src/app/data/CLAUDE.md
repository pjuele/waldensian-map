# CLAUDE.md - Data Management

This file provides guidance for working with data files in this directory. Each file serves a specific purpose in the application's data architecture.

## Data File Overview

### markers.json - Map Marker Data
**Purpose**: Defines all map markers with locations, descriptions, and metadata

**Structure**:
```json
{
  "id": "unique-identifier",
  "name": "Location Name",
  "description": "Historical description",
  "coordinates": {
    "latitude": -34.339840281517866,
    "longitude": -57.26474822657908
  },
  "imageUrl": "/local-image.jpg"
}
```

**Usage**:
- Imported in `page.tsx` via `getMapMarkers()` function
- Consumed by `Map.cli.tsx` for marker rendering
- Structure supports future CMS integration (Hygraph)

**CMS Integration**: Ready for GraphQL replacement - see commented code in `page.tsx`

### meaningfulRegions.data.ts - Navigation Regions
**Purpose**: Defines regional navigation buttons for the floating menu

**Structure**:
```typescript
{
  title: "Region Name 🇫🇷",
  coords: [latitude, longitude],
  zoom?: number,           // Optional, defaults to 8
  toastMessage: "Description for user feedback"
}
```

**Usage**:
- Imported by `FloatingMenu.cli.tsx`
- Powers the regional navigation buttons
- `coords` used for `map.flyTo()` functionality
- `toastMessage` displayed as user feedback

**Adding New Regions**:
1. Add object to array with required fields
2. Include appropriate flag emoji in title
3. Use meaningful toast messages for user education

### waldensiansContent.ts - Main Article Content
**Purpose**: Contains the primary educational content about Waldensians

**Structure**:
```typescript
{
  title: "Main title",
  subTitle: "Subtitle",
  text: "Markdown content with __bold__ and _italic_",
  images: Artwork[]  // Array of artwork objects
}
```

**Usage**:
- Imported by `FloatingEmblem.cli.tsx` for main article display
- Content rendered in `ArticlePopup.cli.tsx` using react-markdown
- Supports full Markdown syntax including formatting and links

**Content Guidelines**:
- Use Markdown formatting for rich text
- Keep content historically accurate
- Include proper citations where applicable
- Structure content for readability in popup modal

### works.ts - Artwork Data
**Purpose**: Defines artwork/images for article popups

**Current State**: Mostly commented out - contains sample artwork data

**Structure**:
```typescript
{
  artist: "Artist Name",
  art: "https://example.com/image.jpg"  // Full URL to image
}
```

**Usage**:
- Imported by article content files
- Referenced in popup display components
- Images displayed in article popups

**Image Guidelines**:
- Use HTTPS URLs for external images
- Ensure proper licensing for historical images
- Optimize image sizes for web display
- Include proper artist attribution

### mapProviders.ts - Map Tile Configurations
**Purpose**: Defines different map tile layers for Leaflet

**Structure**: JavaScript Map object with tile layer configurations:
```typescript
mapProviders.set("LayerName", L.tileLayer(
  "https://tile-url-pattern/{z}/{x}/{y}.png",
  {
    attribution: "Proper attribution string",
    maxZoom: 17,
    // Additional options
  }
));
```

**Available Layers**:
- **Default**: OpenStreetMap standard tiles
- **OpenTopoMap**: Topographic map layer
- **Dark**: Dark theme from Stadia Maps
- **WorldImagery**: Satellite imagery from Esri

**Usage**:
- Currently imported but not actively used in UI
- Ready for future tile layer switching functionality
- All layers configured with proper attribution

## Data Management Patterns

### Static vs Dynamic Data
- **Static**: All current data files are static imports
- **Dynamic**: CMS integration prepared for `markers.json` replacement
- **Future**: Consider moving large datasets to external sources

### Type Safety
- Import types from `@/types` for consistency
- Use `Coordinates`, `MyMarker`, and `Artwork` interfaces
- Maintain type compatibility between data and components

### Content Updates
1. **Historical Content**: Update `waldensiansContent.ts` for main article changes
2. **New Locations**: Add entries to `markers.json` following existing structure
3. **Navigation**: Extend `meaningfulRegions.data.ts` for new regional buttons
4. **Artwork**: Uncomment and populate `works.ts` for visual content

### CMS Migration (Future)
The codebase is prepared for Hygraph CMS integration:
1. Uncomment GraphQL query in `getMapMarkers()`
2. Add `HYGRAPH_ENDPOINT` environment variable
3. Update marker structure if needed for CMS fields
4. Test data fetching and error handling

## Best Practices

### File Organization
- Keep related data in appropriate files
- Use TypeScript for structured data when possible
- Maintain consistent naming conventions
- Document data sources and licensing

### Performance Considerations
- Static imports are bundled at build time
- Large datasets should be loaded dynamically
- Consider image optimization for artwork
- Cache external API responses when implemented

### Data Validation
- Ensure coordinate accuracy (latitude/longitude ranges)
- Validate image URLs and accessibility
- Check markdown syntax in content strings
- Verify external links in content

### Historical Accuracy
- Cross-reference historical information
- Include source citations where possible
- Maintain cultural sensitivity in descriptions
- Update content based on historical research