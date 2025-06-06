"use client";
import React, { useState } from 'react';
import { AddButton, ButtonContainer, ControlButton, QuantityDisplay, QuantitySelectorContainer } from './styled';

// Types
interface AddQuantityButtonProps {
  onQuantityChange?: (quantity: number) => void;
  initialQuantity?: number;
  maxQuantity?: number;
  disabled?: boolean;
  showZero?: boolean; // New prop to control visibility of zero quantity
}

// SVG Icons
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20.75 10.75h-7.5v-7.5a1.25 1.25 0 00-2.5 0v7.5h-7.5a1.25 1.25 0 000 2.5h7.5v7.5a1.25 1.25 0 002.5 0v-7.5h7.5a1.25 1.25 0 000-2.5z"></path>
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20.75 13.5H3.25a1.25 1.25 0 010-2.5h17.5a1.25 1.25 0 010 2.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19.875 4.5H15.5v-.656A1.844 1.844 0 0013.656 2H9.844A1.844 1.844 0 008 3.844V4.5H3.625a.625.625 0 000 1.25h1.156l.875 14.125A2.188 2.188 0 007.781 22h7.938a2.188 2.188 0 002.156-2.125l.844-14.125h1.156a.625.625 0 100-1.25zM9.25 3.844a.594.594 0 01.594-.594h3.812a.594.594 0 01.594.594V4.5h-5v-.656zM9.281 19.5H9.25a.625.625 0 01-.625-.594L8 7.656a.626.626 0 111.25-.062l.625 11.25a.625.625 0 01-.594.656zm3.094-.625a.624.624 0 11-1.25 0V7.625a.625.625 0 111.25 0v11.25zm2.5.031a.625.625 0 01-.625.594h-.031a.626.626 0 01-.594-.656l.625-11.25a.626.626 0 011.25.062l-.625 11.25z"></path>
  </svg>
);

const AddQuantityButton: React.FC<AddQuantityButtonProps> = ({
  onQuantityChange,
  initialQuantity = 0,
  maxQuantity = Infinity,
  disabled = false,
  showZero = false // Default to false to maintain backward compatibility
}) => {
  
  const [quantity, setQuantity] = useState(initialQuantity);
  
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(newQuantity);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(newQuantity);
    }
  };
  
  const handleRemove = () => {
    setQuantity(0);
    if (onQuantityChange) onQuantityChange(0);
  };
  
  // Render the Add button if quantity is 0 and showZero is false,
  // otherwise render the quantity selector
  return (
    <ButtonContainer>
      {(quantity > 0 || showZero) ? (
        <QuantitySelectorContainer role="group" aria-label="Product quantity controls">
          {quantity === 1 ? (
            <ControlButton 
              isRemove={true}
              onClick={handleRemove}
              aria-label="Remove product"
            >
              <TrashIcon />
            </ControlButton>
          ) : (
            <ControlButton 
              isRemove={true}
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </ControlButton>
          )}
          
          <QuantityDisplay aria-live="polite">
            {quantity}
          </QuantityDisplay>
          
          <ControlButton 
            disabled={!!maxQuantity && quantity >= maxQuantity}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </ControlButton>
        </QuantitySelectorContainer>
      ) : (
        <AddButton
          onClick={handleIncrease}
          disabled={disabled}
          aria-label="Add to cart"
        >
          <PlusIcon />
        </AddButton>
      )}
    </ButtonContainer>
  );
};

export default AddQuantityButton;
