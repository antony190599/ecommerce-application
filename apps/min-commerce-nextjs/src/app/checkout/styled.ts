import Link from "next/link";
import styled from "styled-components";

export const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const CartTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

// Componentes para resumen del pedido
export const OrderSummary = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
`;

export const SummaryTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 20px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

export const SummaryValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const SummaryTotal = styled(SummaryRow)`
  border-top: 1px solid #eee;
  margin-top: 15px;
  padding-top: 15px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const TotalLabel = styled.span`
  font-size: 1.1rem;
`;

export const TotalValue = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

export const EmptyCartTitle = styled.h2`
  margin-bottom: 20px;
`;

export const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

// Componentes para el formulario de checkout
export const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CheckoutFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0;
  display: flex;
  align-items: center;
  
  span {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-size: 0.9rem;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const FormInput = styled.input
  .withConfig({ shouldForwardProp: prop => prop !== 'error' })
  <{ error?: boolean }>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.gray300};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primaryLighter};
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  
  input {
    margin-right: 12px;
  }
`;

export const PaymentIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

export const CustomerInfo = styled.div`
  margin-top: 10px;
`;

export const CustomerInfoText = styled.p`
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorMessage = styled.p`
  color: #e53935;
  font-size: 0.8rem;
  margin-top: 4px;
`;