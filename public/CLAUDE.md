# CLAUDE.md - Static Assets

This directory contains static assets served directly by Next.js. All files are publicly accessible via root-relative URLs.

## Asset Categories

### Location Images (19 total)
**Purpose**: Historical location photographs displayed in marker popups and articles

**Naming Convention**: `[COUNTRY_CODE]-[location-name].[ext]`

**Current Images**:
- **Germany**: `DE-neuhengstett.jpg` (285KB)
- **Italy**: `IT-agape.jpg` (126KB), `IT-guardia-piemontese.jpg` (129KB), `IT-prali.webp` (49KB)
- **Uruguay**: `UY-colonia-valdense.jpg`, `LaPaz.jpeg` (14KB)
- **United States**: `US-NC-valdense-town-hall.jpg`, `US-waldensian-presbyterian-church.webp`

**Usage Pattern**:
```typescript
// In markers.json
{
  "name": "Colonia Valdense",
  "imageUrl": "/UY-colonia-valdense.jpg"  // Root-relative path
}

// In components
<Image src={marker.imageUrl} alt={marker.name} />
```

### Branding Assets
**Waldensian Emblem Images**:
- **`LuxLucetLogo.png`** (287KB) - Main logo used in FloatingEmblem component
- **`emblem.png`** (3MB) - High-resolution emblem
- **`emblem-shadow.png`** (120KB) - Logo with drop shadow effect

**Usage**:
```typescript
// FloatingEmblem.cli.tsx
<Image
  src="/LuxLucetLogo.png"
  alt="Emblem"
  width={150}
  height={177}
  priority
/>
```

### Icon Assets
**Decorative Icons**:
- **`candle.png`** (1KB) - Small candle icon
- **`houses.png`** (2KB) - Houses illustration

### Favicon Package
**Directory**: `favicon_package_v0.16/`
**Contents**: Complete favicon set for different devices and browsers
- Android Chrome icons (192x192, 384x384)
- Apple touch icon
- Browser configuration files
- Multiple favicon sizes

**Root Favicon**: `favicon.ico` (15KB)

## Next.js Image Optimization

### Remote Image Domains
**Configured in `next.config.mjs`** for external image sources:
```javascript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "openstreetmap.org" },
    { protocol: "https", hostname: "*.tile.openstreetmap.org" },
    { protocol: "https", hostname: "tiles.stadiamaps.com" },
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "upload.wikimedia.org" }
  ]
}
```

### Local Image Usage
**Best Practices**:
```typescript
import Image from 'next/image';

// Static local images with optimization
<Image
  src="/location-image.jpg"
  alt="Descriptive text"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

## File Organization Principles

### Geographic Organization
**Location images follow ISO country codes**:
- `DE-` = Germany (Deutschland)
- `IT-` = Italy (Italia)
- `UY-` = Uruguay
- `US-` = United States

### File Size Considerations
**Current sizes range from 1KB to 3MB**:
- **Large files** (>100KB): Location photographs
- **Medium files** (10-100KB): Logos and emblems
- **Small files** (<10KB): Icons and decorative elements

### Format Selection
**Image formats by use case**:
- **`.jpg/.jpeg`**: Photographs with many colors
- **`.png`**: Logos, emblems, images with transparency
- **`.webp`**: Modern format for better compression (where supported)

## Asset Management Guidelines

### Adding New Images
1. **Follow naming convention**: `[COUNTRY]-[location-name].[ext]`
2. **Optimize file size**: Use appropriate compression
3. **Choose correct format**: PNG for logos, JPG for photos, WebP when possible
4. **Update markers.json**: Reference with root-relative path `/filename.ext`
5. **Consider responsive images**: Provide multiple sizes if needed

### Image Optimization Checklist
- [ ] Compress images to reasonable file sizes (<200KB for photos)
- [ ] Use appropriate dimensions (max 800px width for location photos)
- [ ] Include proper alt text in components
- [ ] Use Next.js Image component for optimization
- [ ] Test loading performance on slower connections

### Historical Accuracy
**Content Guidelines**:
- Verify image permissions and licensing
- Use historically accurate photographs when possible
- Include proper attribution in alt text or captions
- Maintain respectful representation of historical sites

## Performance Considerations

### Load Order Priority
**Priority images** (loaded first):
```typescript
<Image src="/LuxLucetLogo.png" priority />  // Above-fold logo
```

**Lazy loading** (default behavior):
```typescript
<Image src="/location-image.jpg" />  // Loads when scrolled into view
```

### Size Optimization
**Large image files should be optimized**:
- `emblem.png` (3MB) - Consider WebP version
- Location photos - Compress to <200KB when possible
- Use responsive image sizes for different breakpoints

## Accessibility Guidelines

### Alt Text Standards
```typescript
// ✅ Good alt text
<Image src="/IT-agape.jpg" alt="Chiesa Valdese church building in Agape, Italy" />

// ❌ Poor alt text
<Image src="/IT-agape.jpg" alt="Agape" />
```

### Loading States
Consider loading placeholders for slow connections:
```typescript
<Image
  src="/large-image.jpg"
  alt="Historical site"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Future Enhancements

### Dynamic Image Loading
Consider moving large image collections to:
- External CDN (Cloudinary, AWS S3)
- CMS image management (Hygraph media)
- Progressive loading strategies

### Image Formats
**Modern format adoption**:
- Convert large PNGs to WebP where appropriate
- Implement AVIF format for supported browsers
- Maintain fallbacks for older browsers

### Responsive Images
**Implement responsive image sets**:
```typescript
<Image
  src="/location-image.jpg"
  alt="Historical location"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  width={800}
  height={600}
/>
```

## SEO Considerations

### Structured Data
Consider adding structured data for historical images:
```json
{
  "@type": "ImageObject",
  "url": "https://yourdomain.com/IT-agape.jpg",
  "description": "Chiesa Valdese church building in Agape, Italy",
  "creditText": "Historical archive"
}
```

### Open Graph Images
Ensure key images work well for social sharing:
- Appropriate aspect ratios (1.91:1 for Facebook)
- Clear, recognizable content when scaled down
- Proper file sizes (under 8MB for most platforms)