import React, { useState } from 'react';
import styled from 'styled-components';
import Breadcrumb from '../Breadcrumb';
import { formatPrice } from '../../utils/formatPrice';
import { ProductCardProps } from '../ProductCard';

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
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
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
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
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
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding-bottom: var(--spacing-xs);
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-100);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-300);
    border-radius: 10px;
  }
`;

const Thumbnail = styled.div<{ active: boolean }>`
  width: 70px;
  height: 70px;
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-gray-200)'};
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color var(--transition-fast);
  
  &:hover {
    border-color: var(--color-primary-light);
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
  gap: var(--spacing-md);
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: var(--spacing-xs);
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const SKUInfo = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-sm);
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

const Price = styled.span`
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
`;

const OriginalPrice = styled.span`
  font-size: 1.25rem;
  color: var(--color-text-light);
  text-decoration: line-through;
`;

const Discount = styled.span`
  background-color: var(--color-accent);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-md);
`;

const MetaItem = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  
  svg {
    color: var(--color-primary);
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
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

const QuantityLabel = styled.label`
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  max-width: 140px;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-light);
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  &:first-child {
    border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);
  }
  
  &:last-child {
    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
  }
  
  &:hover {
    background-color: var(--color-primary-medium);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--color-primary);
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid var(--color-primary-light);
  text-align: center;
  font-size: 1rem;
  -moz-appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StockWarning = styled.div<{ lowStock: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.lowStock ? 'var(--color-error)' : 'var(--color-success)'};
  margin-top: var(--spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  width: 100%;
  
  &:hover {
    background-color: var(--color-secondary);
  }
  
  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: white;
  color: var(--color-text);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
  }
  
  &:hover {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-300);
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: var(--color-error);
  }
`;

const ProductDescriptionSection = styled.section`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-gray-200);
`;

const Description = styled.div`
  line-height: 1.6;
  color: var(--color-text);
  
  p {
    margin-bottom: var(--spacing-md);
  }
  
  ul {
    margin-bottom: var(--spacing-md);
    padding-left: var(--spacing-lg);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  
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
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-md);
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--color-primary);
    margin-top: 2px;
  }
  
  div {
    flex: 1;
  }
  
  h4 {
    font-size: 1rem;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-xs);
  }
  
  p {
    font-size: 0.9rem;
    margin: 0;
    color: var(--color-text-light);
  }
`;

const SpecificationsTable = styled.div`
  margin-top: var(--spacing-lg);
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: 1px solid var(--color-gray-200);
  
  &:last-child {
    border-bottom: none;
  }
  
  div {
    padding: var(--spacing-sm);
  }
  
  div:first-child {
    font-weight: var(--font-weight-medium);
    background-color: var(--color-gray-100);
  }
`;

// SVG Icons
const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
  
  // Handlers
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncreaseQuantity = () => {
    if (!product.stock || quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && (!product.stock || value <= product.stock)) {
      setQuantity(value);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <ProductDetailContainer>
        <ProductImageContainer>
          <MainImage>
            <img src={images[selectedImage]} alt={product.name} />
          </MainImage>
          
          {images.length > 1 && (
            <Thumbnails>
              {images.map((image, index) => (
                <Thumbnail 
                  key={index} 
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} - Thumbnail ${index + 1}`} />
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
            <QuantitySelector>
              <QuantityButton 
                onClick={handleDecreaseQuantity} 
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                <MinusIcon />
              </QuantityButton>
              <QuantityInput
                id="quantity"
                type="number"
                min="1"
                max={product.stock || undefined}
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Cantidad"
              />
              <QuantityButton 
                onClick={handleIncreaseQuantity} 
                disabled={isOutOfStock || (product.stock !== undefined && quantity >= product.stock)}
                aria-label="Aumentar cantidad"
              >
                <PlusIcon />
              </QuantityButton>
            </QuantitySelector>
            
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
            <AddToCartButton 
              disabled={isOutOfStock}
              onClick={() => console.log('Adding to cart:', { ...product, quantity })}
            >
              <CartIcon /> Agregar al carrito
            </AddToCartButton>
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
