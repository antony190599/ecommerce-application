"use client";
import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import ProductDetail from '@/components/ProductDetail';
import { products } from '@/data/products';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Styled Components
const ProductScreenContainer = styled.div`
  margin: 0 auto;
`;

const MainContent = styled.main`
//   max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProductNotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  a {
    display: inline-block;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    text-decoration: none;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ProductPage: React.FC = () => {
  // Get the product ID from the URL parameters
  const { productSlug } = useParams<{ productSlug: string }>();
  
  // Find the product by ID
  const product = products.find(p => p.slug === productSlug);
  
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
            <Link href="/">Volver al inicio</Link>
          </ProductNotFound>
        )}
      </MainContent>
    </ProductScreenContainer>
  );
};

export default ProductPage;
