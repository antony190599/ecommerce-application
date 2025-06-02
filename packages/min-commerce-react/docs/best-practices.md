# Styled Components Best Practices

This document outlines the best practices for using styled-components in our e-commerce application.

## 1. Component Organization

### File Structure

Organize styled components in a clear and consistent way:

```
ComponentName/
├── ComponentName.tsx  - Main component with its styled components
└── index.ts          - Export file for cleaner imports
```

### Component Exports

Use barrel files (index.ts) for cleaner imports:

```tsx
// index.ts
export { default } from './ComponentName';
export type { ComponentNameProps } from './ComponentName'; // If applicable
```

## 2. Styling Patterns

### CSS Variables

Use CSS variables from GlobalStyles for consistency:

```tsx
// Good
const Button = styled.button`
  background-color: var(--color-primary);
  padding: var(--spacing-md);
`;

// Avoid
const Button = styled.button`
  background-color: #4a69bd; // Hard-coded value
  padding: 16px; // Hard-coded value
`;
```

### Component Composition

Build complex components by composing smaller styled components:

```tsx
const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius-md);
`;

const CardHeader = styled.header`
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--spacing-md);
`;

const CardBody = styled.div`
  padding: var(--spacing-md);
`;

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Prop-Based Styling

Use props to create variants and conditional styling:

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const Button = styled.button<ButtonProps>`
  /* Base styles */
  
  /* Variant styles */
  background-color: ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--color-secondary)';
      case 'danger': return 'var(--color-error)';
      default: return 'var(--color-primary)';
    }
  }};
  
  /* Size styles */
  padding: ${props => {
    switch (props.size) {
      case 'small': return 'var(--spacing-xs) var(--spacing-sm)';
      case 'large': return 'var(--spacing-md) var(--spacing-lg)';
      default: return 'var(--spacing-sm) var(--spacing-md)';
    }
  }};
`;
```

### Responsive Design

Use media queries for responsive styling:

```tsx
const Container = styled.div`
  padding: var(--spacing-md);
  
  @media (min-width: 768px) {
    padding: var(--spacing-lg);
  }
  
  @media (min-width: 992px) {
    padding: var(--spacing-xl);
  }
`;
```

## 3. Performance Optimization

### Avoid Creating Styled Components in Render

Don't create styled components inside render functions:

```tsx
// Bad - creates a new component on every render
const Component = () => {
  const DynamicButton = styled.button`
    color: red;
  `;
  
  return <DynamicButton>Click me</DynamicButton>;
};

// Good - component is defined outside the render function
const StyledButton = styled.button`
  color: red;
`;

const Component = () => {
  return <StyledButton>Click me</StyledButton>;
};
```

### Use Memoization

Memoize components that use styled-components for better performance:

```tsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
});
```

## 4. TypeScript Integration

### Type Props

Always type your styled component props:

```tsx
interface CardProps {
  elevated?: boolean;
}

const Card = styled.div<CardProps>`
  box-shadow: ${props => props.elevated 
    ? 'var(--shadow-md)' 
    : 'var(--shadow-sm)'
  };
`;
```

### Export Types

Export component prop types for reuse:

```tsx
// In your component file
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const Button = styled.button<ButtonProps>`
  // styles
`;

// In consumer components
import Button, { ButtonProps } from './Button';
```

## 5. Theme Consistency

### Use Theme Provider (when applicable)

If your application has multiple themes, use ThemeProvider:

```tsx
// theme.ts
export const lightTheme = {
  background: '#FFFFFF',
  text: '#333333',
};

export const darkTheme = {
  background: '#222222',
  text: '#F5F5F5',
};

// App.tsx
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}
```

### Consistent Styling

Maintain consistent styling across similar components:

```tsx
// Common styling patterns
const inputStyles = css`
  padding: var(--spacing-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
`;

const Input = styled.input`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}
  min-height: 100px;
`;
```

## 6. Accessibility

### Focus States

Always define focus states for interactive elements:

```tsx
const Button = styled.button`
  background: var(--color-primary);
  
  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;
```

### Color Contrast

Ensure sufficient color contrast for text and interactive elements:

```tsx
// Good - High contrast
const Button = styled.button`
  background: var(--color-primary);
  color: white;
`;

// Avoid - Low contrast
const Button = styled.button`
  background: #E5E5E5;
  color: #A0A0A0;
`;
```

## 7. Testing

### Test Attributes

Add test attributes to make components easier to test:

```tsx
const Button = styled.button.attrs({
  'data-testid': 'button',
})`
  // styles
`;

// In tests
const button = screen.getByTestId('button');
```

## 8. Documentation

### Component Comments

Add comments to complex styled components:

```tsx
// PaginationControl: Displays a list of page numbers and navigation controls
// for moving between pages of content
const PaginationControl = styled.div`
  display: flex;
  justify-content: center;
  
  /* Page number buttons container */
  & > div {
    display: flex;
    margin: 0 var(--spacing-sm);
  }
`;
```
