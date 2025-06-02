# Component Examples

This document showcases examples of styled components in our application. Each example includes the component code and its usage.

## Table of Contents

- [Button Component](#button-component)
- [Card Component](#card-component)
- [Grid Layout](#grid-layout)
- [Detailed Components](#detailed-components)
  - [ProductCard](./components/product-card.md)
  - [FeaturedProducts](./components/featured-products.md)

## Button Component

### Definition

```tsx
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: ${props => {
    switch(props.variant) {
      case 'secondary': return 'var(--color-secondary)';
      case 'accent': return 'var(--color-accent)';
      default: return 'var(--color-primary)';
    }
  }};
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:hover {
    background-color: ${props => {
      switch(props.variant) {
        case 'secondary': return '#143484';
        case 'accent': return '#e67e22';
        default: return '#3959a8';
      }
    }};
  }
`;

export default Button;
```

### Usage

```tsx
<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="accent" fullWidth>Accent Button</Button>
```

## Card Component

### Definition

```tsx
import styled from 'styled-components';

const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export default Card;
```

### Usage

```tsx
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>
```

## Grid Layout

### Definition

```tsx
import styled from 'styled-components';

interface GridProps {
  columns?: number;
  gap?: string;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: ${props => props.gap || 'var(--spacing-md)'};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export default Grid;
```

### Usage

```tsx
<Grid columns={3} gap="20px">
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
  <Item>Item 4</Item>
  <Item>Item 5</Item>
</Grid>
```

## Detailed Components

For more complex components like ProductCard and FeaturedProducts, refer to their dedicated documentation:

- [ProductCard](./components/product-card.md)
- [FeaturedProducts](./components/featured-products.md)
