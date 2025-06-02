"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import Breadcrumb from '../Breadcrumb';
import { formatPrice } from '../../utils/formatPrice';
import { ProductCardProps } from '../ProductCard';
import AddQuantityButton from '../AddQuantityButton/AddQuantityButton';
import { useCart } from '@/providers/CartProvider';
import Image from 'next/image';

// Types
export interface ProductDetailProps {
  product: ProductCardProps & {
    description?: string;
    features?: string[];
    specifications?: Record<string, string>;
  };
}

// Styled Components
const ProductDetailContainer = styled.section`
  display: grid;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 5fr;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 400px;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    aspect-ratio: 1 / 1;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray300};
    border-radius: 10px;
  }
`;

const Thumbnail = styled.div<{ active: boolean }>`
  width: 70px;
  height: 70px;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const SKUInfo = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Price = styled.span`
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: line-through;
`;

const Discount = styled.span`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const MetaItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
  }
`;

const QuantitySelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const QuantityLabel = styled.label`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const StockWarning = styled.div<{ lowStock: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.lowStock ? props.theme.colors.error : props.theme.colors.success};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-color: ${({ theme }) => theme.colors.gray300};
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.error};
  }
`;

const ProductDescriptionSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const Description = styled.div`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  ul {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 2px;
  }
  
  div {
    flex: 1;
  }
  
  h4 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  p {
    font-size: 0.9rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SpecificationsTable = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  
  &:last-child {
    border-bottom: none;
  }
  
  div {
    padding: ${({ theme }) => theme.spacing.sm};
  }
  
  div:first-child {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17.01L12.01 16.9989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  // Simulate we could have multiple images for products
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];
  
  // Stock related
  const isOutOfStock = product.stock === 0;
  const isLowStock = (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5;
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Categoría', url: '/categoria' },
    { label: product.name }
  ];
  
  const { addItem, getItem, updateQuantity } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    
    if (product) {
      const cartItem = getItem(product.id);
      
      if (cartItem) {
        updateQuantity(product.id, newQuantity);
      } else if (newQuantity > 0) {
        addItem({
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          unit: product.unit || 'UNIDAD',
          stock: product.stock
        }, newQuantity);
      }
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <ProductDetailContainer>
        <ProductImageContainer>
          <MainImage>
            <Image src={images[selectedImage]} alt={product.name} />
          </MainImage>
          
          {images.length > 1 && (
            <Thumbnails>
              {images.map((image, index) => (
                <Thumbnail 
                  key={index} 
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} - Thumbnail ${index + 1}`} 
                  />
                </Thumbnail>
              ))}
            </Thumbnails>
          )}
        </ProductImageContainer>
        
        <ProductInfo>
          <div>
            <Title>{product.name}</Title>
            <SKUInfo>SKU: {product.meta.split('SKU:')[1]?.trim() || 'N/A'}</SKUInfo>
          </div>
          
          <PriceContainer>
            <Price>{formatPrice(product.discountPrice ?? product.price)}</Price>
            {product.discountPrice && (
              <>
                <OriginalPrice>{formatPrice(product.price)}</OriginalPrice>
                <Discount>-20%</Discount>
              </>
            )}
          </PriceContainer>
          
          <MetaInfo>
            <MetaItem>
              <CheckIcon />
              <p>Entrega en Lima 24-48 horas</p>
            </MetaItem>
            <MetaItem>
              <CheckIcon />
              <p>Productos 100% originales</p>
            </MetaItem>
            <MetaItem>
              <CheckIcon />
              <p>Pago seguro, varios métodos disponibles</p>
            </MetaItem>
          </MetaInfo>
          
          <QuantitySelectorContainer>
            <QuantityLabel htmlFor="quantity">Cantidad</QuantityLabel>
            <AddQuantityButton 
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantity}
              maxQuantity={product.stock}
              disabled={isOutOfStock}
              showZero={true} // Add the new prop to always show quantity selector
            />
            
            {isOutOfStock ? (
              <StockWarning lowStock={true}>
                <WarningIcon /> Producto agotado
              </StockWarning>
            ) : isLowStock ? (
              <StockWarning lowStock={true}>
                <WarningIcon /> Solo {product.stock} unidades disponibles
              </StockWarning>
            ) : (
              <StockWarning lowStock={false}>
                <CheckIcon /> Producto disponible
              </StockWarning>
            )}
          </QuantitySelectorContainer>
          
          <ActionButtons>
            <FavoriteButton
              onClick={() => console.log('Adding to favorites:', product.id)}
            >
              <HeartIcon /> Favorito
            </FavoriteButton>
          </ActionButtons>
        </ProductInfo>
      </ProductDetailContainer>
      
      <ProductDescriptionSection>
        <SectionTitle>Descripción del producto</SectionTitle>
        <Description>
          <p>
            {product.description || `${product.name} es un producto de alta calidad, ideal para uso escolar y de oficina. Fabricado con materiales duraderos y diseñado para ofrecer un rendimiento excepcional. Este producto cumple con los más altos estándares de calidad y es perfecto para cualquier tipo de actividad creativa o académica.`}
          </p>
        </Description>
        
        {product.features && (
          <>
            <SectionTitle>Características principales</SectionTitle>
            <FeaturesGrid>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <CheckIcon />
                  <div>
                    <p>{feature}</p>
                  </div>
                </FeatureItem>
              ))}
            </FeaturesGrid>
          </>
        )}
        
        {product.specifications && (
          <>
            <SectionTitle>Especificaciones técnicas</SectionTitle>
            <SpecificationsTable>
              {Object.entries(product.specifications).map(([key, value], index) => (
                <SpecRow key={index}>
                  <div>{key}</div>
                  <div>{value}</div>
                </SpecRow>
              ))}
            </SpecificationsTable>
          </>
        )}
      </ProductDescriptionSection>
    </>
  );
};

export default ProductDetail;
