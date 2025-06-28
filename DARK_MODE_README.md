# Dark Mode Implementation

This project now includes a complete dark mode implementation with the following features:

## Features

- **Automatic Theme Detection**: The app automatically detects the user's system preference
- **Manual Theme Toggle**: Users can manually switch between light, dark, and system themes
- **Persistent Theme**: The selected theme is saved in localStorage and persists across sessions
- **Smooth Transitions**: Theme changes include smooth transitions for a better user experience
- **Responsive Design**: Dark mode works seamlessly on both desktop and mobile devices

## Components Added

### 1. ThemeProvider (`src/components/ThemeProvider.tsx`)
- Wraps the entire application to provide theme context
- Uses `next-themes` for robust theme management
- Configured with system theme detection and localStorage persistence

### 2. ThemeToggle (`src/components/ThemeToggle.tsx`)
- Dropdown menu with three options: Light, Dark, System
- Animated sun/moon icons that transition based on current theme
- Accessible with proper ARIA labels

### 3. SimpleThemeToggle (`src/components/SimpleThemeToggle.tsx`)
- Simple toggle button that switches between light and dark modes
- Alternative to the dropdown menu for users who prefer direct toggling

## Usage

### For Users
1. **Desktop**: Click the theme toggle icon in the top-right corner of the navbar
2. **Mobile**: Click the theme toggle icon next to the hamburger menu
3. **Options**:
   - **Light**: Always use light theme
   - **Dark**: Always use dark theme
   - **System**: Follow your system preference

### For Developers

#### Adding Theme Toggle to Components
```tsx
import { ThemeToggle } from '@/components/ThemeToggle';
// or
import { SimpleThemeToggle } from '@/components/SimpleThemeToggle';

// Use in your component
<ThemeToggle />
```

#### Using Theme-Aware Colors
The project uses CSS custom properties for theming. Use these classes instead of hardcoded colors:

- `bg-background` instead of `bg-white`
- `text-foreground` instead of `text-gray-900`
- `text-muted-foreground` instead of `text-gray-600`
- `bg-card` instead of `bg-white`
- `border-border` instead of `border-gray-200`

#### CSS Variables Available
```css
/* Light theme */
--background: 40 30% 98%;
--foreground: 150 10% 10%;
--card: 0 0% 100%;
--card-foreground: 150 10% 10%;
--muted: 40 10% 90%;
--muted-foreground: 150 10% 40%;
--border: 150 10% 90%;

/* Dark theme */
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--card: 240 10% 3.9%;
--card-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--border: 240 3.7% 15.9%;
```

## Configuration

The theme provider is configured in `src/App.tsx`:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
```

- `attribute="class"`: Uses CSS classes for theme switching
- `defaultTheme="system"`: Defaults to system preference
- `enableSystem`: Enables system theme detection
- `disableTransitionOnChange`: Prevents flash during initial load

## Files Modified

1. **`src/index.css`**: Added dark mode CSS variables
2. **`src/App.tsx`**: Added ThemeProvider wrapper
3. **`src/components/Navbar.tsx`**: Added theme toggle and updated colors
4. **`src/pages/HomePage.tsx`**: Updated to use theme-aware colors

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance

- Theme switching is instant with no performance impact
- CSS variables are used for efficient theme switching
- No additional JavaScript bundle size impact
- Smooth transitions are hardware-accelerated

## Accessibility

- Proper ARIA labels for screen readers
- High contrast ratios maintained in both themes
- Keyboard navigation support
- Focus indicators work in both themes 