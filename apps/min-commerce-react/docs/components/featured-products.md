# FeaturedProducts Component

## Overview

The `FeaturedProducts` component displays a curated collection of featured products in a responsive grid layout. It serves as a showcase section for highlighted products on the e-commerce platform.

## Component Structure

```
FeaturedProducts/
├── FeaturedProducts.tsx  - Main component implementation
└── index.ts             - Re-exports for cleaner imports
```

## Implementation

```tsx
import React from 'react';
import styled from 'styled-components';
import ProductCard, { ProductCardProps } from '../ProductCard';

const FeaturedProducts = styled.section`
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: var(--font-weight-bold);
  color: #333;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding: 16px 0;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Sample product data
const products: ProductCardProps[] = [
  {
    id: "1",
    name: "Block Papel Arcoiris A4 75 g x 25 Hojas",
    unit: "UNIDAD",
    meta: "CONTI, Encolado, Para manualidades, SKU: 098859",
    price: "S/ 4.90",
    imageUrl: "https://res.cloudinary.com/riqra/image/upload/h_380,c_limit,q_auto,f_auto/v1735858401/utilex/products/416545df65ef3724.jpg",
  },
  // Additional products...
];

const FeaturedProductsComponent: React.FC = () => {
  return (
    <FeaturedProducts>
      <SectionTitle>Productos destacados</SectionTitle>
      <Grid>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            unit={product.unit}
            meta={product.meta}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </Grid>
    </FeaturedProducts>
  );
};

export default FeaturedProductsComponent;
```

## Usage

```tsx
import FeaturedProducts from './components/FeaturedProducts';

function App() {
  return (
    <div>
      <Header />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
```

## Design Notes

1. **Section Container**:
   - Max width of 1200px with centered alignment
   - Padding using the global spacing variable

2. **Section Title**:
   - Bold font weight
   - 24px font size
   - Dark gray color (#333)
   - Bottom margin for separation

3. **Grid Layout**:
   - Responsive design with different column counts based on screen size:
     - 1 column on mobile (default)
     - 2 columns on small screens (≥576px)
     - 3 columns on medium screens (≥768px)
     - 4 columns on large screens (≥992px)
   - 16px gap between grid items
   - Top and bottom padding for visual spacing

4. **Product Cards**:
   - Uses the `ProductCard` component to display each product
   - Each card receives product data as props

## Implementation Details

1. **Responsive Grid**: The component uses CSS Grid with media queries to create a responsive layout that adapts to different screen sizes.

2. **Component Composition**: Instead of implementing its own card layout, it leverages the `ProductCard` component, demonstrating good component composition.

3. **Mock Data**: The component includes sample product data for demonstration purposes. In a real application, this would likely come from an API or a state management system.

4. **TypeScript Integration**: Uses TypeScript for type safety with the `ProductCardProps` interface.

## Customization Options

The FeaturedProducts component can be customized by:

1. Changing the grid layout (columns, gaps)
2. Modifying the section title styling
3. Adjusting the container padding and maximum width
4. Providing different product data

The component is designed to work with the existing styling system, utilizing CSS variables from the global styles where appropriate.
