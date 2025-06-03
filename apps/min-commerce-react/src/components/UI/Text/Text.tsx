import React from 'react';
import styled from 'styled-components';

export interface TextProps {
  variant?: 'body' | 'bodySmall' | 'bodyLarge' | 'caption' | 'label';
  weight?: 'regular' | 'medium' | 'bold';
  color?: 'text' | 'textLight' | 'primary' | 'secondary' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  as?: React.ElementType; // Changed from keyof JSX.IntrinsicElements to be more permissive
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}

const StyledText = styled.p<Omit<TextProps, 'children' | 'as' | 'style' | 'id'>>`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ color, theme }) => {
    switch(color) {
      case 'textLight':
        return theme.colors.textLight;
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.text;
    }
  }};
  font-weight: ${({ weight, theme }) => {
    switch(weight) {
      case 'medium':
        return theme.typography.fontWeight.medium;
      case 'bold':
        return theme.typography.fontWeight.bold;
      default:
        return theme.typography.fontWeight.regular;
    }
  }};
  text-align: ${({ align }) => align || 'left'};
  
  ${({ variant }) => {
    switch(variant) {
      case 'bodySmall':
        return `
          font-size: 0.875rem;
          line-height: 1.5;
        `;
      case 'bodyLarge':
        return `
          font-size: 1.125rem;
          line-height: 1.6;
        `;
      case 'caption':
        return `
          font-size: 0.75rem;
          line-height: 1.4;
        `;
      case 'label':
        return `
          font-size: 0.875rem;
          line-height: 1.4;
          font-weight: 500;
        `;
      default: // body
        return `
          font-size: 1rem;
          line-height: 1.5;
        `;
    }
  }}
  
  ${({ truncate }) => truncate && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  `}
`;

const Text: React.FC<TextProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'text',
  align,
  truncate = false,
  as,
  children,
  style,
  id,
  ...props
}) => {
  return (
    <StyledText
      variant={variant}
      weight={weight}
      color={color}
      align={align}
      truncate={truncate}
      as={as}
      style={style}
      id={id}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;
