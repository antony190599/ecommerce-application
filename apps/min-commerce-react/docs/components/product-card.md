# ProductCard Component

## Overview

The `ProductCard` component is a reusable card that displays product information in a visually appealing way. It includes the product image, name, unit, metadata, price, and interactive buttons for adding the product to cart and favorites.

## Component Structure

```
ProductCard/
├── ProductCard.tsx  - Main component implementation
└── index.ts        - Re-exports for cleaner imports
```

## Interface

```tsx
export interface ProductCardProps {
  id: string;
  name: string;
  unit: string;
  meta: string;
  price: string;
  imageUrl: string;
}
```

## Implementation

```tsx
import React from 'react';
import styled from 'styled-components';

// Types
export interface ProductCardProps {
  id: string;
  name: string;
  unit: string;
  meta: string;
  price: string;
  imageUrl: string;
}

// Styled Components
const Card = styled.div`
  background: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform var(--transition-fast);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const AddButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8DC63F;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  &:hover {
    background: #7DB52E;
  }
`;

const FavButton = styled.button`
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #EEE;
  color: #E53946;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
  
  &:hover {
    background: #FAFAFA;
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  padding: 16px;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
  line-height: 1.3;
  text-align: left;
`;

const Unit = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 4px;
  text-align: left;
`;

const Meta = styled.p`
  font-size: 12px;
  color: #AAA;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-bottom: 8px;
`;

const Price = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: #E53946;
`;

const ProductCard: React.FC<ProductCardProps> = ({ id, name, unit, meta, price, imageUrl }) => {
  return (
    <Card>
      <ImageWrapper>
        <img src={imageUrl} alt={name} />
        <AddButton aria-label="Agregar al carrito">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20.75 10.75h-7.5v-7.5a1.25 1.25 0 00-2.5 0v7.5h-7.5a1.25 1.25 0 000 2.5h7.5v7.5a1.25 1.25 0 002.5 0v-7.5h7.5a1.25 1.25 0 000-2.5z"></path></svg>
        </AddButton>
        <FavButton aria-label="Agregar a favoritos">
          <svg viewBox="0 0 24 24" fill="#F43F5E" width="24" height="24"><path d="M12 9.733c.195-.917 1.29-5.097 4.485-5.097 1.85 0 3.848 1.27 3.848 4.094 0 3.196-3.022 6.93-8.333 10.332C6.69 15.66 3.667 11.927 3.667 8.73c0-2.85 1.974-4.095 3.814-4.095 3.269 0 4.287 4.194 4.519 5.098zM2 8.73C2 12.058 4.55 16.487 12 21c7.45-4.513 10-8.942 10-12.27 0-6.515-8.04-7.387-10-3.058C10.052 1.367 2 2.178 2 8.73z"></path></svg>
        </FavButton>
      </ImageWrapper>
      <Info>
        <Name>{name}</Name>
        <Unit>{unit}</Unit>
        <Meta>{meta}</Meta>
        <Price>{price}</Price>
      </Info>
    </Card>
  );
};

export default ProductCard;
```

## Usage

```tsx
import ProductCard from './components/ProductCard';

const MyComponent = () => {
  return (
    <ProductCard
      id="1"
      name="Block Papel Arcoiris A4 75 g x 25 Hojas"
      unit="UNIDAD"
      meta="CONTI, Encolado, Para manualidades, SKU: 098859"
      price="S/ 4.90"
      imageUrl="https://example.com/image.jpg"
    />
  );
};
```

## Design Notes

1. **Card Layout**: The product card uses a clean, minimal design with a shadow effect and smooth hover transition.

2. **Image Section**:
   - Product image takes full width of the card
   - Add-to-cart button in the top-right corner
   - Favorites button in the bottom-left corner

3. **Information Section**:
   - Product name (bold, larger font)
   - Unit information (uppercase, smaller font)
   - Meta information (small font, ellipsis for overflow)
   - Price (bold, highlighted color)

4. **Interactive Elements**:
   - Hover effects on the card (subtle elevation)
   - Hover effects on buttons (color change)
   - Both buttons use SVG icons for crisp rendering

5. **Accessibility**:
   - All buttons have aria-label attributes
   - Text alignment is left-aligned for better readability
