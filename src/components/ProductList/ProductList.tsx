import React from 'react';
import styled from 'styled-components';
import ProductCard, { ProductCardProps } from '../ProductCard';

export interface ProductListProps {
  products: ProductCardProps[];
  title?: string;
  maxColumns?: 2 | 3 | 4 | 5;
}

const ListContainer = styled.section`
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
`;

const ListTitle = styled.h2`
  font-size: 24px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
`;

const Grid = styled.div<{ maxColumns: number }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-md);
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => Math.min(3, props.maxColumns)}, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(${props => props.maxColumns}, 1fr);
  }
`;

const EmptyState = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-light);
  border: 1px dashed var(--color-gray-300);
  border-radius: var(--border-radius-md);
`;

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  title = "Productos",
  maxColumns = 4
}) => {
  if (products.length === 0) {
    return (
      <ListContainer>
        {title && <ListTitle>{title}</ListTitle>}
        <EmptyState>No hay productos disponibles</EmptyState>
      </ListContainer>
    );
  }
  
  return (
    <ListContainer>
      {title && <ListTitle>{title}</ListTitle>}
      <Grid maxColumns={maxColumns}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </Grid>
    </ListContainer>
  );
};

export default ProductList;
