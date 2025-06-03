"use client";
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
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage only on client side
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate the cart data structure
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart);
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem('cart');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save to localStorage whenever cart changes (but not on initial load)
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('cart', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isLoading]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    if (quantity <= 0) {
      console.warn('Quantity must be greater than 0');
      return;
    }

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
    if (quantity < 0) {
      console.warn('Quantity cannot be negative');
      return;
    }

    setItems(prevItems => 
      quantity === 0
        ? prevItems.filter(item => item.id !== id)
        : prevItems.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
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
    (total, item) => total + (item.price * item.quantity), 
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
    totalAmount,
    isLoading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};