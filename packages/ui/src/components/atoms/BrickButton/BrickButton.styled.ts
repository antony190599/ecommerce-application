import styled, { css, keyframes } from 'styled-components';

// Types
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonState = 'default' | 'disabled' | 'loading';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Props for the styled components
export interface StyledButtonProps {
  variant: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  hasIcon?: boolean;
  size?: ButtonSize;
}

// Spinner animation for loading state
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Base button styles
export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  gap: ${({ theme }) => theme.spacing.sm};
  outline: none;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  
  /* Size styles */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: 0.875rem;
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: 1.125rem;
        `;
      case 'md':
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: 1rem;
        `;
    }
  }}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  /* Icon spacing */
  ${({ hasIcon, size, theme }) => hasIcon && css`
    .icon {
      margin-right: ${
        size === 'sm' 
          ? theme.spacing.xs 
          : size === 'lg' 
            ? theme.spacing.md 
            : theme.spacing.sm
      };
      
      svg {
        width: ${size === 'sm' ? '14px' : size === 'lg' ? '24px' : '18px'};
        height: ${size === 'sm' ? '14px' : size === 'lg' ? '24px' : '18px'};
      }
    }
  `}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: 1px solid ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary};
            border-color: ${theme.colors.secondary};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.secondaryText};
          border: 1px solid ${theme.colors.gray400};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.hoverSurface};
            border-color: ${theme.colors.gray500};
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.primaryLight};
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLighter};
          }
        `;
      default:
        return '';
    }
  }}

  /* State styles */
  ${({ loading, disabled, theme }) => {
    if (loading) {
        return css`
            pointer-events: none;
            opacity: 0.7;
        `;
    }
    if (disabled) {
      return css`
            background-color: ${theme.colors.gray200};
            color: ${theme.colors.gray500};
            border-color: ${theme.colors.gray300};
            cursor: not-allowed;
            pointer-events: none;
      `;
    }
    if (loading && disabled) {
        return css`
                background-color: ${theme.colors.gray200};
                color: ${theme.colors.gray500};
                border-color: ${theme.colors.gray300};
                cursor: not-allowed;
                pointer-events: none;
                opacity: 0.7;
        `;
    }
  }}

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme, variant }) => 
      variant === 'primary' 
        ? `${theme.colors.primaryMedium}` 
        : variant === 'danger' 
          ? `rgba(231, 76, 60, 0.3)` 
          : `${theme.colors.gray200}`};
  }
`;

export const SpinnerContainer = styled.span<{ size?: ButtonSize }>`
  display: inline-block;
  width: ${({ size }) => size === 'sm' ? '16px' : size === 'lg' ? '28px' : '20px'};
  height: ${({ size }) => size === 'sm' ? '16px' : size === 'lg' ? '28px' : '20px'};
  border: ${({ size }) => size === 'sm' ? '2px' : '3px'} solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: currentColor;
  animation: ${spin} 0.8s linear infinite;
`;

export const ButtonContent = styled.span<{ isLoading: boolean }>`
  //visibility: ${({ isLoading }) => isLoading ? 'hidden' : 'visible'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
