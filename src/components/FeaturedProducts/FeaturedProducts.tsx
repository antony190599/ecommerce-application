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
  {
    id: "2",
    name: "Resaltador Pastel Softliner Faber Castell",
    unit: "UNIDAD",
    meta: "FABER-CASTELL, Color naranja, punta biselada, SKU: 127453",
    price: "S/ 3.50",
    imageUrl: "https://res.cloudinary.com/riqra/image/upload/h_380,c_limit,q_auto,f_auto/v1735858401/utilex/products/416545df65ef3724.jpg",
  },
  {
    id: "3",
    name: "Cuaderno Anillado A4 Cuadriculado 160 hojas",
    unit: "UNIDAD",
    meta: "COLLEGE, Tapa dura, Anillado doble, SKU: 235782",
    price: "S/ 12.90",
    imageUrl: "https://res.cloudinary.com/riqra/image/upload/h_380,c_limit,q_auto,f_auto/v1735858401/utilex/products/416545df65ef3724.jpg",
  },
  {
    id: "4",
    name: "Set de Plumones para Pizarra 4 colores",
    unit: "PACK",
    meta: "PILOT, Punta mediana, borrable, SKU: 345612",
    price: "S/ 15.50",
    imageUrl: "https://res.cloudinary.com/riqra/image/upload/h_380,c_limit,q_auto,f_auto/v1735858401/utilex/products/416545df65ef3724.jpg",
  },
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
