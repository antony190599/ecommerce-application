import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import ProductDetail from '../../components/ProductDetail';
import { products } from '../../data/products';

// Styled Components
const ProductScreenContainer = styled.div`
  margin: 0 auto;
`;

const MainContent = styled.main`
//   max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-lg);
`;

const ProductNotFound = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
  }
  
  p {
    color: var(--color-text-light);
    margin-bottom: var(--spacing-lg);
  }
  
  a {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-lg);
    background-color: var(--color-primary);
    color: white;
    border-radius: var(--border-radius-sm);
    text-decoration: none;
    
    &:hover {
      background-color: var(--color-secondary);
    }
  }
`;

const ProductScreen: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  // Find the product by ID
  const product = products.find(p => p.id === productId);
  
  // Example of extended product data with description, features and specifications
  const extendedProduct = product 
    ? {
        ...product,
        description: `El ${product.name} es un producto de alta calidad diseñado para ofrecer un rendimiento excepcional y durabilidad. Perfecto para uso escolar, oficina o personal, este producto ha sido fabricado con materiales de primera calidad y cumple con los estándares más exigentes.`,
        features: [
          'Material de alta calidad',
          'Duradero y resistente',
          'Diseño ergonómico',
          'Fácil de usar',
          'Compatible con diferentes superficies',
          'Colores vibrantes y duraderos'
        ],
        specifications: {
          'Marca': product.meta.split(',')[0]?.trim() || 'N/A',
          'Material': 'Plástico de alta calidad',
          'Dimensiones': '21 x 30 cm',
          'Peso': '250g',
          'Color': 'Varios colores disponibles',
          'País de origen': 'Perú'
        }
      } 
    : undefined;
  
  return (
    <ProductScreenContainer>
      <Navbar />
      
      <MainContent>
        {extendedProduct ? (
          <ProductDetail product={extendedProduct} />
        ) : (
          <ProductNotFound>
            <h2>Producto no encontrado</h2>
            <p>Lo sentimos, el producto que estás buscando no existe o ha sido descontinuado.</p>
            <a href="/">Volver al inicio</a>
          </ProductNotFound>
        )}
      </MainContent>
    </ProductScreenContainer>
  );
};

export default ProductScreen;
