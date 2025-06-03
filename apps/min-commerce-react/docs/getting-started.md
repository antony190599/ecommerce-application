# Getting Started with Styled Components

## Introduction

Styled Components is a CSS-in-JS library that allows you to write actual CSS code to style your components in JavaScript. It removes the mapping between components and styles, making component styling more intuitive and maintainable.

## Installation

Our project already has styled-components installed. If you need to add it to another project:

```bash
npm install styled-components
# or
yarn add styled-components
```

For TypeScript support:

```bash
npm install --save-dev @types/styled-components
# or
yarn add --dev @types/styled-components
```

## Basic Usage

### Creating a styled component

```tsx
import styled from 'styled-components';

// Creating a styled button
const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 10px 15px;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-secondary);
  }
`;

// Using the styled component
function MyComponent() {
  return <Button>Click me</Button>;
}
```

### Extending styles

```tsx
const PrimaryButton = styled(Button)`
  background-color: var(--color-accent);
  
  &:hover {
    background-color: #e67e22;
  }
`;
```

### Props-based styling

```tsx
interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.primary ? 'var(--color-primary)' : 'var(--color-gray-200)'};
  color: ${props => props.primary ? 'var(--color-white)' : 'var(--color-text)'};
  // ...other styles
`;

// Usage:
<Button primary>Primary Button</Button>
<Button>Secondary Button</Button>
```

## Project Setup

In our project, we use styled-components with TypeScript and follow a component-based architecture. Global styles are defined in `GlobalStyles.tsx` and component-specific styles are co-located with their components.
