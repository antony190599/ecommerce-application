import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Text from '../Text';

export interface FormInputProps {
  label?: string;
  helpText?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  error?: string;
  required?: boolean;
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const StyledLabel = styled.label<{ required?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  ${props => props.required && css`
    &:after {
      content: '*';
      color: ${({ theme }) => theme.colors.error};
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
  `}
`;

const StyledInput = styled.input<{ hasError?: boolean; isFilled?: boolean; isFocused?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: 1rem;
  border: 1px solid ${({ hasError, isFocused, theme }) => 
    hasError 
      ? theme.colors.error 
      : isFocused 
        ? theme.colors.primary 
        : theme.colors.gray300
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.primary
    };
    box-shadow: 0 0 0 2px ${({ theme, hasError }) => 
      hasError 
        ? 'rgba(231, 76, 60, 0.2)' 
        : theme.colors.primaryLighter
    };
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray500};
    border-color: ${({ theme }) => theme.colors.gray200};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
  
  ${({ isFilled, hasError, theme }) => isFilled && !hasError && css`
    border-color: ${theme.colors.success};
  `}
`;

const FormInput: React.FC<FormInputProps> = ({
  label,
  helpText,
  placeholder,
  value = '',
  type = 'text',
  disabled = false,
  error,
  required = false,
  name,
  id,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value !== '';
  const hasError = !!error;
  const inputId = id || name || Math.random().toString(36).substring(2, 9);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <InputContainer>
      {label && (
        <StyledLabel htmlFor={inputId} required={required}>
          <Text variant="label" weight="medium">{label}</Text>
        </StyledLabel>
      )}
      
      {helpText && (
        <Text 
          variant="caption" 
          color="textLight"
          as="span"
          style={{ marginBottom: '4px' }}
        >
          {helpText}
        </Text>
      )}
      
      <StyledInput
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        hasError={hasError}
        isFilled={isFilled}
        isFocused={isFocused}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        {...props}
      />
      
      {hasError && (
        <Text 
          variant="caption"
          color="error"
          as="span"
          id={`${inputId}-error`}
          style={{ marginTop: '4px' }}
        >
          {error}
        </Text>
      )}
    </InputContainer>
  );
};

export default FormInput;

