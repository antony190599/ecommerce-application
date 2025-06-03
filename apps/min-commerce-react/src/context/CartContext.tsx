import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      } else {
        // If item doesn't exist, add it
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  const value: CartContextType = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getItem,
    totalItems,
    totalAmount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
