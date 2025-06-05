import React from 'react';
import { StyledButton, ButtonContent, SpinnerContainer, ButtonVariant, ButtonSize } from './BrickButton.styled';

export interface BrickButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const BrickButton: React.FC<BrickButtonProps> = ({
  variant = 'primary',
  loading = false,
  size = 'md',
  icon,
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {  
  return (
    <StyledButton
      variant={variant}
      loading={loading}
      size={size}
      fullWidth={fullWidth}
      hasIcon={!!icon}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <SpinnerContainer size={size} />}
      <ButtonContent isLoading={loading}>
        {icon && <span className="icon">{icon}</span>}
        {children}
      </ButtonContent>
    </StyledButton>
  );
};
