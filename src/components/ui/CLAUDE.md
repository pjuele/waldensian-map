# CLAUDE.md - UI Components

This directory contains reusable UI components based on **shadcn/ui** design system. These components are built on top of Radix UI primitives with custom styling.

## shadcn/ui Configuration

**Style**: "new-york" variant
**Base Color**: zinc theme
**CSS Variables**: Enabled for theming
**Framework**: Built for React Server Components (RSC)

Components follow shadcn/ui conventions and can be updated using the shadcn/ui CLI.

## Component Overview

### Core Interactive Components
- **`button.tsx`** - Primary button with variants (default, destructive, outline, secondary, ghost, link)
- **`alert-dialog.tsx`** - Modal dialogs for confirmations and alerts
- **`menubar.tsx`** - Menu navigation component with triggers and dropdowns

### Content Display
- **`card.tsx`** - Card layouts with header, content, and footer sections
- **`badge.tsx`** - Status indicators and labels
- **`scroll-area.tsx`** - Custom scrollable content areas

### Toast Notification System
- **`toast.tsx`** - Toast notification component
- **`toaster.tsx`** - Toast container and manager
- **`use-toast.ts`** - React hook for toast functionality

## Usage Patterns

### Toast Notifications (Primary Usage)
Used throughout map components for user feedback:

```typescript
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

// Basic usage
toast({
  title: "Action completed",
  description: "Additional details here",
});

// In map components
toast({
  title: "✈ Flying to: " + regionName,
  description: "Historical information about region",
});
```

**Configuration Notes**:
- `TOAST_LIMIT = 1` - Only one toast shown at a time
- `TOAST_REMOVE_DELAY = 1000000` - Very long delay (effectively manual dismiss)
- Custom styling matches application theme

### Card Components (Article Popups)
Used in `ArticlePopup.cli.tsx` for content display:

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Usage in popups
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{subtitle}</CardDescription>
  </CardHeader>
  <CardContent>
    <ScrollArea className="h-96">
      {/* Markdown content */}
    </ScrollArea>
  </CardContent>
</Card>
```

### Button Variants
Used in `FloatingMenu.cli.tsx` for navigation:

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default" className="py-0 px-2">
  Region Name 🇫🇷
</Button>
```

### ScrollArea Component
Used for handling overflow content in modals:

```typescript
import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-96 pr-4">
  {/* Long content that needs scrolling */}
</ScrollArea>
```

## Customization & Theming

### CSS Variables
Components use CSS custom properties defined in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... additional theme variables */
}
```

### Tailwind Integration
All components use Tailwind classes and can be customized via:
- `tailwind.config.ts` theme extensions
- CSS variable modifications
- Component-level className overrides

### Variant System
Components use `class-variance-authority` for consistent variant patterns:

```typescript
// Example from button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // ... other variants
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        // ... other sizes
      },
    },
  }
)
```

## Component Dependencies

### External Dependencies
- **Radix UI**: Core primitives for accessibility and behavior
- **class-variance-authority**: Variant management
- **tailwind-merge**: Class merging utility
- **React**: Component framework

### Internal Dependencies
- **`@/lib/utils`**: `cn()` utility for class merging
- **Tailwind CSS**: Styling system
- **CSS Variables**: Theme customization

## Best Practices

### Adding New Components
1. Use shadcn/ui CLI: `npx shadcn-ui@latest add [component-name]`
2. Follow existing naming conventions
3. Maintain TypeScript definitions
4. Test with existing theme variables

### Customizing Existing Components
1. Modify via className props when possible
2. Update CSS variables for theme changes
3. Use variant system for consistent alternatives
4. Maintain accessibility features from Radix UI

### Usage Guidelines
- Always import from `@/components/ui/[component]`
- Use TypeScript props for type safety
- Apply custom styles via className prop
- Leverage variant system for consistent styling
- Test components in both light and dark themes

## Integration with Application

### Map Component Integration
UI components are specifically integrated with map functionality:
- **Toasts**: Provide feedback for map navigation actions
- **Cards**: Display historical article content
- **Buttons**: Trigger map navigation and popups
- **ScrollArea**: Handle long-form historical content

### State Management
Components integrate with React Context for:
- Popup state management (Cards, AlertDialogs)
- Toast notifications from map interactions
- Theme preference handling

### Responsive Design
All components support responsive behavior:
- Mobile-first design approach
- Flexible layouts for different screen sizes
- Touch-friendly interaction areas
- Accessible keyboard navigation

## Maintenance Notes

### shadcn/ui Updates
Components can be updated using the CLI, but review customizations:
```bash
npx shadcn-ui@latest add button --overwrite
```

### Theme Modifications
Update theme variables in `globals.css` and `tailwind.config.ts` consistently.

### Accessibility
Components inherit Radix UI accessibility features - maintain these when customizing.