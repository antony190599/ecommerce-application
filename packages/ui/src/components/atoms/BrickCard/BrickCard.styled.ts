import styled, { css } from 'styled-components';

export interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const StyledCard = styled.div<Omit<CardProps, 'children'>>`
  background-color: ${({ theme }) => theme.colors.white};
  
  /* Border radius variants */
  border-radius: ${({ radius, theme }) => {
    switch(radius) {
      case 'sm': 
        return theme.borderRadius.sm;
      case 'lg': 
        return theme.borderRadius.lg;
      default: 
        return theme.borderRadius.md;
    }
  }};
  
  /* Padding variants */
  padding: ${({ padding, theme }) => {
    switch(padding) {
      case 'none': 
        return '0';
      case 'sm': 
        return theme.spacing.sm;
      case 'lg': 
        return theme.spacing.lg;
      default: 
        return theme.spacing.md;
    }
  }};
  
  /* Card variants */
  ${({ variant, theme }) => {
    switch(variant) {
      case 'outlined':
        return css`
          border: 1px solid ${theme.colors.gray200};
        `;
      case 'elevated':
        return css`
          box-shadow: ${theme.shadows.md};
        `;
      default:
        return css`
          border: none;
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}
  
  /* Hover effect */
  ${({ hoverEffect, theme }) => hoverEffect && css`
    transition: transform ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;