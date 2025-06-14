/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, use } from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../utils/formatPrice';
import ProductTag from '../ProductTag';
import AddQuantityButton from '../AddQuantityButton';
import { useCart } from '@/providers/CartProvider';
import { AddButtonWrapper, Card, FavButton, ImageWrapper, Info, Meta, Name, OriginalPrice, Price, PriceContainer, ProductLink, Rating, RatingContainer, StockInfo, TagsContainer, Unit } from './styled';
// Types
export interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
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

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  unit,
  meta,
  price,
  discountPrice,
  imageUrl,
  isOnSale = false,
  stock = 0,
  rating
}) => {
    // Obtener la imagen por defecto (si existe) o usar la proporcionada
    
    const { addItem, getItem, updateQuantity, items } = useCart();
    const [quantity, setQuantity] = useState(() => {
      const cartItem = getItem(id);
      return cartItem ? cartItem.quantity : 0;
    });

    
    // Update quantity when cart changes
    useEffect(() => {
      const cartItem = getItem(id);
      if (cartItem) {
        setQuantity(cartItem ? cartItem.quantity : 0);
      }
      
    }, [items, updateQuantity]);
    
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
                <ProductLink href={`/product/${slug}`}>
                  <img
                    src={imageUrl} 
                    alt={name}
                    onError={(e) => {
                      console.log(`Error cargando imagen para ${name}: ${imageUrl}`);
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                    }}
                  />  
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
                <ProductLink href={`/product/${slug}`}>
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