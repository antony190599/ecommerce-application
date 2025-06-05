import { ThemeType } from 'brick-theme-ui';
import styled, { css } from 'styled-components';

interface InputProps {
  error?: boolean;
  isFilled?: boolean;
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const StyledLabel = styled.label<{ required?: boolean }>`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  
  ${props => props.required && css`
    &:after {
      content: '*';
      color: ${({ theme }) => theme.colors.error};
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
  `}
`;

export const StyledInput = styled.input<InputProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLighter};
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
  
  ${props => props.error && css`
    border-color: ${(props.theme as ThemeType).colors.error};
    
    &:focus {
      box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
  `}
  
  ${props => props.isFilled && !props.error && css`
    border-color: ${(props.theme as ThemeType).colors.success};
  `}
`;

export const HelpText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

export const ErrorText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;
