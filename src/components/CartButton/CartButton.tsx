import React, { useState } from 'react';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import CartModal from '../CartModal';

// Sample data for testing
const sampleCartItems = [
  {
    id: '1',
    name: 'Pastel de Chocolate Premium',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
    price: 35.90,
    quantity: 1,
    unit: 'UNIDAD',
    discount: 10
  },
  {
    id: '2',
    name: 'Cupcakes de Vainilla (Pack x6)',
    imageUrl: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
    price: 18.50,
    quantity: 2,
    unit: 'CAJA'
  },
  {
    id: '3',
    name: 'Galletas de Avena y Pasas',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
    price: 12.90,
    quantity: 1,
    unit: 'PAQUETE'
  }
];

const CartButtonContainer = styled.div`
  position: relative;
`;

const CartIconButton = styled(Dialog.Trigger)`
  background-color: #F6F7FC;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  color: var(--color-primary);
  position: relative;

  &:hover {
    background-color: #E4E9F5;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: var(--font-weight-bold);
`;

const CartButton: React.FC = () => {
  const [items, setItems] = useState(sampleCartItems);
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
    // Implement checkout logic or redirect
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <CartButtonContainer>
        <CartIconButton aria-label="Open shopping cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          {totalItemCount > 0 && <CartCount>{totalItemCount}</CartCount>}
        </CartIconButton>
      </CartButtonContainer>

      <CartModal 
        items={items}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        onClose={() => setIsOpen(false)}
      />
    </Dialog.Root>
  );
};

export default CartButton;
