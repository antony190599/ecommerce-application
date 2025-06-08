"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import AddQuantityButton from '../AddQuantityButton';
import { CartItem } from '../../types/cart';
import Link from 'next/link';
import { BrickButton } from 'brick-ui';

// Types (ahora importados desde types/cart.ts)
interface CartModalProps {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

// Styled Components
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 100;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 90%;
  max-width: 450px;
  height: 100vh;
  z-index: 101;
  display: flex;
  flex-direction: column;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  
  @media (max-width: 576px) {
    width: 100%;
    max-width: none;
  }
  
  @keyframes contentShow {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(74, 105, 189, 0.05)'};
`;

const CartTitle = styled(Dialog.Title)`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const CartBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProductItem = styled.li`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  position: relative;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h3`
  margin: 0 0 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ProductUnit = styled.p`
  margin: 0 0 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ProductPrice = styled.p`
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

const ProductControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ItemTotal = styled.div`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-left: auto;
  min-width: 70px;
  text-align: right;
`;

const MinimumOrderMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLighter || 'rgba(74, 105, 189, 0.05)'};
  border: 1px dashed ${({ theme }) => theme.colors.primaryLight || 'rgba(74, 105, 189, 0.2)'};
  border-radius: 8px;
  padding: 12px;
  margin: 20px 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const CartFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(74, 105, 189, 0.05)'};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalLabel = styled.span`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const TotalAmount = styled.span`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ContinueShoppingButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(74, 105, 189, 0.1)'};
  }
`;

const ViewCartLink = styled(Link)`
  flex: 2;
  padding: 12px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

const formatCurrency = (value: number) => {
  return `S/ ${value.toFixed(2)}`;
};

const CartModal: React.FC<CartModalProps> = ({
  items,
  onQuantityChange,
  onRemove,
  onCheckout,
  onClose
}) => {
  const totalAmount = items.reduce((total, item) => 
    total + item.price * item.quantity, 0
  );
  
  const hasItems = items.length > 0;

  return (
    <Dialog.Portal>
      <StyledOverlay onClick={onClose} />
      <StyledContent onEscapeKeyDown={onClose}>
        <CartHeader>
          <CartTitle>Tu Carrito</CartTitle>
          <CloseButton onClick={onClose}>
            <Cross2Icon width={18} height={18} />
          </CloseButton>
        </CartHeader>

        <CartBody>
          {hasItems ? (
            <>
              <ProductList>
                {items.map(item => (
                  <ProductItem key={item.id}>
                    <ProductImage src={item.imageUrl} alt={item.name} />
                    <ProductInfo>
                      <ProductName>{item.name}</ProductName>
                      <ProductUnit>{item.unit}</ProductUnit>
                      <ProductPrice>{formatCurrency(item.price)}</ProductPrice>
                      <ProductControls>
                        <AddQuantityButton
                          initialQuantity={item.quantity}
                          onQuantityChange={(quantity: number) => onQuantityChange(item.id, quantity)}
                          showZero={true}
                          maxQuantity={item.stock}
                        />
                      </ProductControls>
                    </ProductInfo>
                    <ItemTotal>{formatCurrency(item.price * item.quantity)}</ItemTotal>
                    {item.discount && (
                      <DiscountTag>-{item.discount}%</DiscountTag>
                    )}
                  </ProductItem>
                ))}
              </ProductList>

              <MinimumOrderMessage>
                Pedido mínimo: S/ 30.00 • Envío gratuito en pedidos mayores a S/ 80.00
              </MinimumOrderMessage>
            </>
          ) : (
            <EmptyCartMessage>
              Tu carrito está vacío
            </EmptyCartMessage>
          )}
        </CartBody>

        <CartFooter>
          {hasItems && (
            <TotalRow>
              <TotalLabel>Total</TotalLabel>
              <TotalAmount>{formatCurrency(totalAmount)}</TotalAmount>
            </TotalRow>
          )}
          <ActionButtons>
            <BrickButton
              variant='secondary'
              fullWidth
              size='lg'
              onClick={onClose}
            >
              Atrás
            </BrickButton>
            {hasItems && (
              <BrickButton 
                onClick={onCheckout}
                variant="primary"
                fullWidth
                size='lg'
              >
                Finalizar Compra
              </BrickButton>

            )}
          </ActionButtons>
        </CartFooter>
      </StyledContent>
    </Dialog.Portal>
  );
};

export default CartModal;