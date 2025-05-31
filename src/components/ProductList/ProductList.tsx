import React from 'react';
import styled from 'styled-components';
import ProductCard, { ProductCardProps } from '../ProductCard';

export interface ProductListProps {
  products: ProductCardProps[];
  title?: string;
  maxColumns?: 2 | 3 | 4 | 5;
}

const ListContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
  // max-width: 1200px;
  margin: 0 auto;
`;

const ListTitle = styled.h2`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div<{ $maxColumns: number }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => Math.min(3, props.$maxColumns)}, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(${props => props.$maxColumns}, 1fr);
  }
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  border: 1px dashed ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
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
      <Grid $maxColumns={maxColumns}>
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
