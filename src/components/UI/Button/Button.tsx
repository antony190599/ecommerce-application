import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

const StyledButton = styled.button<Omit<ButtonProps, 'children' | 'onClick' | 'ariaLabel' | 'type'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  /* Variant styles */
  ${({ variant, theme }) => {
    switch(variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLighter};
            transform: translateY(-2px);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'icon':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          padding: 0;
          border-radius: 50%;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLighter};
            transform: scale(1.1);
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
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
    }
  }}
  
  /* Size styles */
  ${({ size, theme, variant }) => {
    if (variant === 'icon') {
      switch(size) {
        case 'sm':
          return css`
            width: 32px;
            height: 32px;
            
            @media (max-width: ${theme.breakpoints.sm}) {
              width: 44px;
              height: 44px;
            }
          `;
        case 'lg':
          return css`
            width: 56px;
            height: 56px;
            
            @media (max-width: ${theme.breakpoints.sm}) {
              width: 56px;
              height: 56px;
            }
          `;
        default: // md
          return css`
            width: 44px;
            height: 44px;
          `;
      }
    } else {
      switch(size) {
        case 'sm':
          return css`
            padding: ${theme.spacing.xs} ${theme.spacing.sm};
            font-size: 0.875rem;
            
            @media (max-width: ${theme.breakpoints.sm}) {
              padding: ${theme.spacing.sm} ${theme.spacing.md};
            }
          `;
        case 'lg':
          return css`
            padding: ${theme.spacing.md} ${theme.spacing.lg};
            font-size: 1.125rem;
          `;
        default: // md
          return css`
            padding: ${theme.spacing.sm} ${theme.spacing.md};
            font-size: 1rem;
          `;
      }
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

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
  ariaLabel,
  ...props
}) => {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
