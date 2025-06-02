import React from 'react';
import styled, { css } from 'styled-components';

export interface IconButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}

const StyledIconButton = styled.button<Omit<IconButtonProps, 'children' | 'onClick' | 'ariaLabel'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  /* Size variants */
  ${({ size, theme }) => {
    switch(size) {
      case 'sm':
        return css`
          width: 32px;
          height: 32px;
          
          @media (max-width: ${theme.breakpoints.sm}) {
            width: 44px;
            height: 44px;
          }
          
          svg {
            width: 16px;
            height: 16px;
          }
        `;
      case 'lg':
        return css`
          width: 56px;
          height: 56px;
          
          svg {
            width: 24px;
            height: 24px;
          }
        `;
      default: // md
        return css`
          width: 44px;
          height: 44px;
          
          svg {
            width: 20px;
            height: 20px;
          }
        `;
    }
  }}
  
  /* Variant styles */
  ${({ variant, theme }) => {
    switch(variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            transform: scale(1.05);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          &:active:not(:disabled) {
            transform: scale(1);
          }
        `;
      case 'outline':
        return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLighter};
            transform: scale(1.05);
          }
          
          &:active:not(:disabled) {
            transform: scale(1);
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLighter};
            transform: scale(1.05);
          }
          
          &:active:not(:disabled) {
            transform: scale(1);
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary};
            transform: scale(1.05);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          &:active:not(:disabled) {
            transform: scale(1);
          }
        `;
    }
  }}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  /* Focus state for accessibility */
  &:focus {
    outline: none;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  ariaLabel,
  ...props
}) => {
  return (
    <StyledIconButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
