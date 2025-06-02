"use client";
import React from 'react';
import styled from 'styled-components';
import { useCart } from '@/providers/CartProvider';
import AddQuantityButton from '../../components/AddQuantityButton';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CartItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(74, 105, 189, 0.05)'};
  border-bottom: 1px solid #eee;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CartItemsList = styled.div`
  padding: 0;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div``;

const ItemName = styled.h3`
  margin: 0 0 5px;
  font-size: 1rem;
`;

const ItemUnit = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ItemPrice = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ItemQuantity = styled.div``;

const ItemTotal = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  margin-top: 5px;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const OrderSummary = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const SummaryValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SummaryTotal = styled(SummaryRow)`
  border-top: 1px solid #eee;
  margin-top: 15px;
  padding-top: 15px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const TotalLabel = styled.span`
  font-size: 1.1rem;
`;

const TotalValue = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  margin-top: 20px;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyCartTitle = styled.h2`
  margin-bottom: 20px;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const formatCurrency = (value: number) => {
  return `S/ ${value.toFixed(2)}`;
};

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, totalItems, totalAmount } = useCart();

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
    // Implement checkout logic
  };

  return (
    <>
      <Navbar />
      <CartContainer>
        <CartHeader>
          <CartTitle>Tu Carrito {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'producto' : 'productos'})`}</CartTitle>
        </CartHeader>
        
        {items.length === 0 ? (
          <EmptyCartMessage>
            <EmptyCartTitle>Tu carrito está vacío</EmptyCartTitle>
            <p>Parece que aún no has añadido productos a tu carrito.</p>
            <ShopNowButton href="/">Ir a Comprar</ShopNowButton>
          </EmptyCartMessage>
        ) : (
          <CartContent>
            <CartItems>
              <CartItemsHeader>
                <div>Producto</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Total</div>
              </CartItemsHeader>
              <CartItemsList>
                {items.map(item => (
                  <CartItem key={item.id}>
                    <ItemInfo>
                      <ItemImage src={item.imageUrl} alt={item.name} />
                      <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemUnit>{item.unit}</ItemUnit>
                        <RemoveButton onClick={() => removeItem(item.id)}>
                          Eliminar
                        </RemoveButton>
                      </ItemDetails>
                    </ItemInfo>
                    <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
                    <ItemQuantity>
                      <AddQuantityButton
                        initialQuantity={item.quantity}
                        onQuantityChange={(quantity: number) => updateQuantity(item.id, quantity)}
                        maxQuantity={item.stock}
                        showZero={true}
                      />
                    </ItemQuantity>
                    <ItemTotal>{formatCurrency(item.price * item.quantity)}</ItemTotal>
                  </CartItem>
                ))}
              </CartItemsList>
            </CartItems>

            <OrderSummary>
              <SummaryTitle>Resumen del Pedido</SummaryTitle>
              <SummaryRow>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>{formatCurrency(totalAmount)}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Envío</SummaryLabel>
                <SummaryValue>{totalAmount >= 80 ? 'Gratis' : formatCurrency(10)}</SummaryValue>
              </SummaryRow>
              <SummaryTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalValue>
                  {formatCurrency(totalAmount + (totalAmount >= 80 ? 0 : 10))}
                </TotalValue>
              </SummaryTotal>
              <CheckoutButton onClick={handleCheckout}>
                Finalizar Compra
              </CheckoutButton>
            </OrderSummary>
          </CartContent>
        )}
      </CartContainer>
    </>
  );
};

export default CartPage;