import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Types
interface AddQuantityButtonProps {
  onQuantityChange?: (quantity: number) => void;
  initialQuantity?: number;
  maxQuantity?: number;
  disabled?: boolean;
  showZero?: boolean; // New prop to control visibility of zero quantity
}

// Animations
const expandAnimation = keyframes`
  from {
    width: 176px;
  }
  to {
    width: 176px;
  }
`;

// Styled Components
const ButtonContainer = styled.div`
  width: 176px;
  height: 52px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const AddButton = styled.button<{ disabled?: boolean }>`
  width: 52px;
  height: 52px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: var(--color-secondary);
  }
  
  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const QuantitySelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 176px;
  height: 52px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 0 ${({ theme }) => theme.spacing.xs};
  animation: ${expandAnimation} 0.3s ease;
`;

const ControlButton = styled.button<{ isRemove?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isRemove 
    ? props.theme.colors.white
    : props.theme.colors.primary
  };
  color: ${props => props.isRemove 
    ? props.theme.colors.primary
    : props.theme.colors.white
  };
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast}, transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.isRemove 
      ? props.theme.colors.gray100
      : props.theme.colors.secondary
    };
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const QuantityDisplay = styled.div`
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  min-width: 40px;
  text-align: center;
`;

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
      onQuantityChange?.(newQuantity);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };
  
  const handleAddClick = () => {
    const newQuantity = 1;
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };
  
  // Render the Add button if quantity is 0 and showZero is false,
  // otherwise render the quantity selector
  return (
    <ButtonContainer>
      {quantity === 0 && !showZero ? (
        <AddButton onClick={handleAddClick} disabled={disabled}>
          <PlusIcon />
        </AddButton>
      ) : (
        <QuantitySelectorContainer>
          <ControlButton 
            onClick={handleDecrease}
            isRemove={true}
            disabled={quantity <= 0} // Disable the button when quantity is 0 or less
            aria-label="Disminuir cantidad"
          >
            {quantity === 1 ? <TrashIcon /> : <MinusIcon />}
          </ControlButton>
          
          <QuantityDisplay aria-live="polite">
            {quantity}
          </QuantityDisplay>
          
          <ControlButton 
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            aria-label="Aumentar cantidad"
          >
            <PlusIcon />
          </ControlButton>
        </QuantitySelectorContainer>
      )}
    </ButtonContainer>
  );
};

export default AddQuantityButton;
