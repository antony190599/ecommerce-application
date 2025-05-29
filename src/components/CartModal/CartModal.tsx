import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, TrashIcon, MinusIcon, PlusIcon } from '@radix-ui/react-icons';

// Types
interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  unit: string;
  discount?: number;
}

interface CartModalProps {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

// Animations
const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentSlide = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Styled Components
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 300ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
`;

const StyledContent = styled(Dialog.Content)`
  background-color: white;
  box-shadow: -10px 0 30px -15px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  animation: ${contentSlide} 300ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1001;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--color-gray-200);
  background-color: var(--color-primary-light, rgba(74, 105, 189, 0.05));
`;

const CartTitle = styled(Dialog.Title)`
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color var(--transition-fast);

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
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-gray-200);
  position: relative;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  background-color: var(--color-primary-lighter, rgba(74, 105, 189, 0.02));
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h4`
  font-size: 1rem;
  margin: 0 0 5px 0;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
`;

const ProductUnit = styled.span`
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-bottom: 8px;
`;

const ProductPrice = styled.div`
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
`;

const ProductControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-light, rgba(74, 105, 189, 0.1));
  color: var(--color-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-medium, rgba(74, 105, 189, 0.2));
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 0.9rem;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  padding: 5px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-light, rgba(74, 105, 189, 0.1));
  }
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: var(--font-weight-medium);
`;

const ItemTotal = styled.div`
  font-size: 1rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-left: auto;
  min-width: 70px;
  text-align: right;
`;

const MinimumOrderMessage = styled.div`
  background-color: var(--color-primary-lighter, rgba(74, 105, 189, 0.05));
  border: 1px dashed var(--color-primary-light, rgba(74, 105, 189, 0.2));
  border-radius: 8px;
  padding: 12px;
  margin: 20px 0;
  font-size: 0.9rem;
  color: var(--color-text);
  text-align: center;
`;

const CartFooter = styled.div`
  padding: 20px;
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-primary-light, rgba(74, 105, 189, 0.05));
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalLabel = styled.span`
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
`;

const TotalAmount = styled.span`
  font-size: 1.2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ContinueShoppingButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid var(--color-primary);
  background-color: white;
  color: var(--color-primary);
  border-radius: 8px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-light, rgba(74, 105, 189, 0.1));
  }
`;

const CheckoutButton = styled.button`
  flex: 2;
  padding: 12px;
  border: none;
  background-color: var(--color-primary);
  color: white;
  border-radius: 8px;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-secondary);
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  color: var(--color-text-light);
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
                        <QuantityControls>
                          <QuantityButton 
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon width={14} height={14} />
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton 
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                          >
                            <PlusIcon width={14} height={14} />
                          </QuantityButton>
                        </QuantityControls>
                        <RemoveButton onClick={() => onRemove(item.id)}>
                          <TrashIcon width={16} height={16} />
                        </RemoveButton>
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
            <ContinueShoppingButton onClick={onClose}>
              Seguir Comprando
            </ContinueShoppingButton>
            {hasItems && (
              <CheckoutButton onClick={onCheckout}>
                Finalizar Compra
              </CheckoutButton>
            )}
          </ActionButtons>
        </CartFooter>
      </StyledContent>
    </Dialog.Portal>
  );
};

export default CartModal;
