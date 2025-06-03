import styled, { keyframes } from 'styled-components';

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
export const ButtonContainer = styled.div`
  width: 176px;
  height: 52px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const AddButton = styled.button<{ disabled?: boolean }>`
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

export const QuantitySelectorContainer = styled.div`
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

export const ControlButton = styled.button<{ isRemove?: boolean }>`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
  }
`;

export const QuantityDisplay = styled.div`
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  min-width: 40px;
  text-align: center;
`;
