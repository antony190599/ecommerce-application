/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { InputContainer, StyledLabel, StyledInput, HelpText, ErrorText } from './BrickInputBase.styled';
import { useTheme } from 'styled-components';
import { ThemeType } from 'brick-theme-ui';

export interface BrickInputBaseProps {
  label?: string;
  helpText?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  errorText?: string;
  error?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const BrickInputBase: React.FC<BrickInputBaseProps> = ({
  label,
  helpText,
  placeholder,
  value = '',
  disabled = false,
  errorText,
  error = false,
  required = false,
  onChange,
  onFocus,
  onBlur,
}) => {
  const theme = useTheme() as ThemeType;

  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value !== '';

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (onFocus) onFocus();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (onBlur) onBlur();
  }, [onBlur]);

  return (
    <InputContainer>
      {label && (
        <StyledLabel required={required}>
          {label}
        </StyledLabel>
      )}
      
      {helpText && <HelpText>{helpText}</HelpText>}
      
      <StyledInput
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        error={error}
        isFilled={isFilled}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
      />
      
      {error && errorText && (
        <ErrorText>{errorText}</ErrorText>
      )}
    </InputContainer>
  );
};
