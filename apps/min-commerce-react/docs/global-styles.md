# Global Styles

## Overview

The `GlobalStyles.tsx` file contains application-wide styles and CSS variables. It uses the `createGlobalStyle` function from styled-components to define styles that apply to the entire application.

## Structure

Our GlobalStyles are structured as follows:

1. **CSS Variables** - Define reusable values for:
   - Colors
   - Spacing
   - Border radius
   - Shadows
   - Fonts
   - Transitions
   - Z-index layers

2. **Base Styles** - Reset and normalize styles for HTML elements

3. **Typography** - Text styles for headings and paragraphs

4. **Utility Classes** - Helper classes for common patterns

5. **Responsive Breakpoints** - Media queries for different screen sizes

## CSS Variables

### Colors

```css
/* Base colors */
--color-primary: #4a69bd;
--color-secondary: #1e3799;
--color-accent: #fa8231;
--color-text: #2c3e50;
--color-text-light: #7f8c8d;
--color-background: #f9f9f9;
--color-white: #ffffff;
--color-black: #000000;
--color-gray-100: #f7f7f7;
--color-gray-200: #e6e6e6;
--color-gray-300: #d1d1d1;
--color-error: #e74c3c;
--color-success: #2ecc71;
```

### Spacing

```css
/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-xxl: 3rem;
```

### Border Radius

```css
/* Border radius */
--border-radius-sm: 0.25rem;
--border-radius-md: 0.5rem;
--border-radius-lg: 1rem;
```

### Shadows

```css
/* Shadows */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
```

### Fonts

```css
/* Fonts */
--font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

### Transitions

```css
/* Transitions */
--transition-fast: 0.2s ease;
--transition-medium: 0.3s ease;
```

### Z-Index Layers

```css
/* Z-index layers */
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-modal: 1030;
--z-index-popover: 1040;
--z-index-tooltip: 1050;
```

## Implementation

The GlobalStyles component is imported and rendered in the application's entry point (main.tsx):

```tsx
import GlobalStyles from './GlobalStyles';

// Inside the render function
<>
  <GlobalStyles />
  <App />
</>
```

## Usage in Components

Access these global variables in your styled components:

```tsx
const Button = styled.button`
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-fast);
`;
```

## Responsive Breakpoints

Our global styles define responsive breakpoints for different screen sizes:

- Small: 576px
- Medium: 768px
- Large: 992px

Use them in your components:

```tsx
const Container = styled.div`
  width: 100%;
  
  @media (min-width: 576px) {
    max-width: 540px;
  }
  
  @media (min-width: 768px) {
    max-width: 720px;
  }
  
  @media (min-width: 992px) {
    max-width: 960px;
  }
`;
```
