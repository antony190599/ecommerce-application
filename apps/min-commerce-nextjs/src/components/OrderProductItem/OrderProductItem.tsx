"use client";
import React from 'react';
import styled from 'styled-components';

// Estilos
const OrderItemCard = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 4px;
  box-sizing: border-box;
`;

const OrderItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const OrderItemDetails = styled.div`
  flex: 1;
`;

const OrderItemName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: 4px;
`;

const OrderItemMeta = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export interface OrderProductItemProps {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const OrderProductItem: React.FC<OrderProductItemProps> = ({ 
  name, 
  price, 
  quantity, 
  imageUrl 
}) => {
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `S/ ${numValue.toFixed(2)}`;
  };

  return (
    <OrderItemCard>
      <OrderItemImage 
        src={imageUrl} 
        alt={name} 
        onError={(e) => {
          // Manejar el error si la imagen no se puede cargar
          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3ESin imagen%3C/text%3E%3C/svg%3E";
        }}
      />
      <OrderItemDetails>
        <OrderItemName>{name}</OrderItemName>
        <OrderItemMeta>
          {formatCurrency(price)} x {quantity}
        </OrderItemMeta>
      </OrderItemDetails>
    </OrderItemCard>
  );
}

export default OrderProductItem;