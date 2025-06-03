import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { formatPrice } from '../../utils/formatPrice';
import ProductTag from '../ProductTag';
import AddQuantityButton from '../AddQuantityButton';
import { useCart } from '../../context/CartContext';

// Types
export interface ProductCardProps {
    id: string;
    name: string;
    unit: string;
    meta: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    isOnSale?: boolean;
    stock?: number;
    rating?: number;
}

// Styled Components
const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // Creates a 1:1 aspect ratio box
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; // Ensures image fits within container without distortion
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const AddButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
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
  transition: background-color ${({ theme }) => theme.transitions.fast}, transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: #FAFAFA;
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  padding: 16px;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
  }
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

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Price = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: #E53946;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: line-through;
`;

const StockInfo = styled.div<{ stock: number }>`
  font-size: 12px;
  color: ${props => props.stock > 5 ? props.theme.colors.success : props.theme.colors.error};
  margin-top: 4px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const Rating = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
`;

const TagsContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  unit,
  meta,
  price,
  discountPrice,
  imageUrl,
  isOnSale = false,
  stock = 0,
  rating
}) => {
    const { addItem, getItem, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(() => {
      const cartItem = getItem(id);
      return cartItem ? cartItem.quantity : 0;
    });
    
    const handleQuantityChange = (newQuantity: number) => {
      setQuantity(newQuantity);
      
      const cartItem = getItem(id);
      
      if (cartItem) {
        updateQuantity(id, newQuantity);
      } else if (newQuantity > 0) {
        addItem({
          id,
          name,
          imageUrl,
          price,
          unit: unit || 'UNIDAD',
          stock
        }, newQuantity);
      }
    };
    
    return (
        <Card data-product-id={id}>
            <ImageWrapper>
                <ProductLink to={`/product/${id}`}>
                  <img src={imageUrl} alt={name} />
                </ProductLink>
                
                <AddButtonWrapper>
                  <AddQuantityButton 
                    onQuantityChange={handleQuantityChange}
                    initialQuantity={quantity}
                    maxQuantity={stock || undefined}
                    disabled={stock === 0}
                  />
                </AddButtonWrapper>
                
                <FavButton aria-label="Agregar a favoritos">
                    <svg viewBox="0 0 24 24" fill="#F43F5E" width="24" height="24"><path d="M12 9.733c.195-.917 1.29-5.097 4.485-5.097 1.85 0 3.848 1.27 3.848 4.094 0 3.196-3.022 6.93-8.333 10.332C6.69 15.66 3.667 11.927 3.667 8.73c0-2.85 1.974-4.095 3.814-4.095 3.269 0 4.287 4.194 4.519 5.098zM2 8.73C2 12.058 4.55 16.487 12 21c7.45-4.513 10-8.942 10-12.27 0-6.515-8.04-7.387-10-3.058C10.052 1.367 2 2.178 2 8.73z"></path></svg>
                </FavButton>
                
                <TagsContainer>
                  {isOnSale && <ProductTag type="sale" />}
                  {stock <= 5 && stock > 0 && <ProductTag type="limited" />}
                  {stock === 0 && <ProductTag type="soldout" />}
                </TagsContainer>
            </ImageWrapper>
            <Info>
                <ProductLink to={`/product/${id}`}>
                  <Name>{name}</Name>
                </ProductLink>
                <Unit>{unit}</Unit>
                <Meta>{meta}</Meta>
                
                <PriceContainer>
                  <Price>{formatPrice(discountPrice ?? price)}</Price>
                  {discountPrice && <OriginalPrice>{formatPrice(price)}</OriginalPrice>}
                </PriceContainer>
                
                {stock > 0 ? (
                  <StockInfo stock={stock}>{stock <= 5 ? `¡Solo ${stock} unidades!` : 'En stock'}</StockInfo>
                ) : (
                  <StockInfo stock={0}>Agotado</StockInfo>
                )}
                
                {rating !== undefined && (
                  <RatingContainer>
                    <Rating>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} style={{ color: star <= rating ? 'var(--color-accent)' : 'var(--color-gray-200)' }}>
                          ★
                        </span>
                      ))}
                    </Rating>
                    <span style={{ fontSize: '12px' }}>{rating}/5</span>
                  </RatingContainer>
                )}
            </Info>
        </Card>
    );
};

export default ProductCard;
