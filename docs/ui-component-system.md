# UI Component System

This document outlines our UI component system and how to use the base components to ensure consistency across the application.

## Overview

Our UI component system is designed to ensure visual consistency, improve accessibility, and reduce code duplication. It consists of foundational components that can be combined to create more complex interfaces.

## Core Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '../components/UI';

// Primary button (default)
<Button>Primary Button</Button>

// Secondary button
<Button variant="secondary">Secondary Button</Button>

// Outline button
<Button variant="outline">Outline Button</Button>

// Different sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>

// Full width button
<Button fullWidth>Full Width Button</Button>

// Disabled button
<Button disabled>Disabled Button</Button>
```

### IconButton

A circular button specifically designed for icons.

```tsx
import { IconButton } from '../components/UI';

<IconButton 
  variant="primary" 
  ariaLabel="Add to favorites"
  onClick={() => console.log('Clicked')}
>
  <HeartIcon />
</IconButton>

// Available variants: 'primary', 'secondary', 'outline', 'ghost'
// Available sizes: 'sm', 'md', 'lg'
```

### Text

A component for consistent typography.

```tsx
import { Text } from '../components/UI';

<Text>Default body text</Text>
<Text variant="bodySmall">Smaller text</Text>
<Text variant="bodyLarge">Larger text</Text>
<Text variant="caption">Caption text</Text>
<Text variant="label">Label text</Text>

// Font weights
<Text weight="regular">Regular weight</Text>
<Text weight="medium">Medium weight</Text>
<Text weight="bold">Bold weight</Text>

// Colors
<Text color="text">Default text color</Text>
<Text color="textLight">Light text color</Text>
<Text color="primary">Primary color text</Text>
<Text color="error">Error text</Text>

// Alignment
<Text align="center">Centered text</Text>

// Truncate long text with ellipsis
<Text truncate>This is a very long text that will be truncated...</Text>

// Change the underlying HTML element
<Text as="span">This renders as a span</Text>
<Text as="h2">This renders as an h2</Text>
```

### Card

A container component with consistent styling.

```tsx
import { Card } from '../components/UI';

<Card>Default card</Card>

// Variants
<Card variant="outlined">Outlined card</Card>
<Card variant="elevated">Elevated card</Card>

// Padding
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>

// Border radius
<Card radius="sm">Small radius</Card>
<Card radius="md">Medium radius</Card>
<Card radius="lg">Large radius</Card>

// Hover effect
<Card hoverEffect>Card with hover effect</Card>
```

### FormInput

An input component with consistent styling, error handling, and accessibility features.

```tsx
import { FormInput } from '../components/UI';
import { useState } from 'react';

const [value, setValue] = useState('');

<FormInput 
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  helpText="We'll never share your email."
  required
/>

// With error state
<FormInput 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Disabled input
<FormInput 
  label="Username"
  disabled
  value="johnsmith"
/>
```

## Best Practices

1. **Consistent Component Usage**: Always use these base components instead of creating new styled components for the same purpose.

2. **Accessibility**: Always provide `ariaLabel` for icon buttons and ensure all interactive elements have proper focus styles.

3. **Mobile Optimization**: The components are designed to be mobile-friendly, with touch targets of at least 44x44px.

4. **Composition Over Customization**: Compose complex UI from these base components rather than creating highly customized one-off components.

5. **Theme Consistency**: Always use theme values from the theme object for colors, spacing, etc., instead of hard-coded values.
