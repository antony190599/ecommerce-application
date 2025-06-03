# Component Guidelines

## Component Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx
└── index.ts
```

### ComponentName.tsx

```tsx
import React from 'react';
import styled from 'styled-components';

// Types (if applicable)
interface ComponentNameProps {
  // Props definition
}

// Styled Elements
const Container = styled.div`
  // Styles
`;

// Component
const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return (
    <Container>
      {/* Component Content */}
    </Container>
  );
};

export default ComponentName;
```

### index.ts

```ts
export { default } from './ComponentName';
export type { ComponentNameProps } from './ComponentName'; // If applicable
```

## Styling Principles

### 1. Use CSS Variables

Utilize the global CSS variables defined in `GlobalStyles.tsx` for consistency:

```tsx
const Button = styled.button`
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
`;
```

### 2. Component-Specific Styles

Define styled components within the component file, keeping styles close to their usage:

```tsx
// ProductCard.tsx
const Card = styled.div`
  background: var(--color-white);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
`;

const ProductCard = () => {
  return <Card>{/* Content */}</Card>;
};
```

### 3. Responsive Design

Use media queries for responsive designs:

```tsx
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
```

### 4. Props for Variant Styles

Use props to create style variations:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => {
    switch(props.variant) {
      case 'secondary': return 'var(--color-secondary)';
      case 'accent': return 'var(--color-accent)';
      default: return 'var(--color-primary)';
    }
  }};
`;
```

### 5. Nested Selectors

Use the `&` symbol to refer to the component itself in nested selectors:

```tsx
const Card = styled.div`
  transition: transform var(--transition-fast);
  
  &:hover {
    transform: translateY(-4px);
  }
  
  & > img {
    width: 100%;
  }
`;
```

## Best Practices

1. **Naming Convention**: Use descriptive names for styled components (e.g., `ProductCard`, `NavigationBar`).

2. **Component Composition**: Build complex components by composing smaller styled components.

3. **Reusable Components**: Create generic, reusable components for common UI elements.

4. **TypeScript**: Use TypeScript interfaces for props to ensure type safety.

5. **Performance**: Avoid creating styled components inside the render method.
