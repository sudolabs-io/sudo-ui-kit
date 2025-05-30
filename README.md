# Sudo UI Kit Registry

A custom shadcn/ui component registry providing a comprehensive collection of reusable React components, icons, and utilities for modern web applications.

## Registry URL

This registry is hosted at:
```
https://sudolabs-io.github.io/sudo-ui-kit/public/r/
```

## Quick Start

### Prerequisites

- A React project with TypeScript
- Tailwind CSS configured
- shadcn/ui CLI installed

### Installation

1. **Install shadcn/ui CLI** (if not already installed):
```bash
npm install -g shadcn-ui@latest
```

2. **Initialize shadcn/ui in your project** (if not already done):
```bash
npx shadcn-ui@latest init
```

3. **Configure the custom registry**:
Add the aliases to your `components.json` file:
```json
{
  "aliases": {
    "components": "components",
    "ui": "components/ui",
    "utils": "lib/utils"
  }
}
```

### Usage Examples

#### Install Individual Components

Install a single component:
```bash
npx shadcn add https://sudolabs-io.github.io/sudo-ui-kit/public/r/button.json
```

Install multiple components:
```bash
npx shadcn add https://sudolabs-io.github.io/sudo-ui-kit/public/r/button.json
npx shadcn add https://sudolabs-io.github.io/sudo-ui-kit/public/r/input.json
npx shadcn add https://sudolabs-io.github.io/sudo-ui-kit/public/r/calendar.json
```

#### Install All Components

Install all available components at once:
```bash
npx shadcn add https://sudolabs-io.github.io/sudo-ui-kit/public/r/all.json
```

#### Install with Automatic Dependencies

The registry automatically handles dependencies, so when you install a component, all its required dependencies and other dependent registry items will be installed as well:
```bash
npx shadcn add https://sudolabs-io.github.io/sudo-ui-kit/public/r/video-player.json
```

## Available Components

### UI Components

- **badge** - Status and label badges with various styles
- **button** - Customizable button with variants, sizes, and icon options
- **calendar** - Date picker and calendar component
- **callout** - Alert and notification callouts
- **command** - Command palette and search interface
- **dialog** - Modal dialogs and overlays
- **dropzone** - File upload dropzone component
- **file-input** - File input with drag-and-drop support
- **form** - Form components with validation
- **image-gallery** - Image gallery with lightbox functionality
- **indicator** - Status indicators and badges
- **input** - Text input with various configurations
- **label** - Form labels and text labels
- **multi-select** - Multi-selection dropdown component
- **phone-input** - International phone number input
- **pill** - Pill-shaped tags and labels
- **pill-row** - Row layout for pill components
- **popover** - Popover and tooltip-like overlays
- **radio-group** - Radio button group component
- **rating** - Star rating component
- **scroll-area** - Custom scrollable area
- **select** - Dropdown select component
- **separator** - Divider and separator lines
- **sidebar** - Navigation sidebar component
- **slider** - Range slider input
- **social-button** - Social media login buttons
- **tooltip** - Hover tooltips
- **video-player** - Video player with custom controls

### Advanced Components

- **dnd-tree** - Drag-and-drop tree component
- **DNDTreeContext** - Context for drag-and-drop tree
- **useDNDTree** - Hook for drag-and-drop tree functionality

### Icons

- **AdjustmentsIcon** - Settings adjustment icon
- **AsterixIcon** - Asterisk symbol icon
- **ClockIcon** - Clock/time icon
- **CloseIcon** - Close/X icon
- **ComponentsIcon** - Components library icon
- **FileIcon** - File document icon
- **InboxIcon** - Inbox/mail icon
- **LifeBuoyIcon** - Help/support icon
- **LoaderIcon** - Loading spinner icon
- **LockIcon** - Security/lock icon
- **PieChartIcon** - Chart/analytics icon
- **PlayIcon** - Media play icon
- **SettingsIcon** - Settings gear icon
- **ShoppingCartIcon** - E-commerce cart icon
- **SudolabsIcon** - Sudolabs brand icon
- **TooltipIcon** - Information tooltip icon
- **TrashIcon** - Delete/trash icon
- **UploadIcon** - File upload icon
- **WorldIcon** - Globe/world icon

### Utilities

- **constants** - Shared constants and configuration
- **IconTypes** - TypeScript types for icons
- **utils** - Utility functions and helpers

## Component Features

### Modern Design System
- Built with Tailwind CSS
- Consistent design tokens
- Dark mode support
- Responsive by default

### Developer Experience
- Full TypeScript support
- Comprehensive Storybook stories
- Extensive prop interfaces
- Clear documentation

### Accessibility
- ARIA compliant
- Keyboard navigation
- Screen reader support
- Focus management

### Customization
- Theme-aware components
- CSS custom properties
- Variant-based styling
- Easy customization

## Examples

### Basic Button Usage
```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button variant="default" size="base">
      Click me
    </Button>
  )
}
```

### Video Player with Custom Controls
```tsx
import { VideoPlayer } from "@/components/ui/video-player"

export function VideoDemo() {
  return (
    <VideoPlayer
      src="https://example.com/video.mp4"
      poster="https://example.com/poster.jpg"
      controls
    />
  )
}
```

### Form with Validation
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  return (
    <Form>
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
        </FormItem>
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

## Contributing

This registry is maintained by [Sudolabs](https://sudolabs.com).

## Documentation

Visit the [shadcn/ui documentation](https://ui.shadcn.com/docs/registry) to learn more about using custom registries and component installation.
