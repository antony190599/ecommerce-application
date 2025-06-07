"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '@/providers/CartProvider';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

// Componentes para resumen del pedido
const OrderSummary = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const SummaryValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SummaryTotal = styled(SummaryRow)`
  border-top: 1px solid #eee;
  margin-top: 15px;
  padding-top: 15px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const TotalLabel = styled.span`
  font-size: 1.1rem;
`;

const TotalValue = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  margin-top: 20px;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyCartTitle = styled.h2`
  margin-bottom: 20px;
`;

const ShopNowButton = styled(Link)`
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
const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
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

const EditButton = styled.button`
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

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLighter};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ContinueButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const RadioOption = styled.label`
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

const PaymentIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

const CustomerInfo = styled.div`
  margin-top: 10px;
`;

const CustomerInfoText = styled.p`
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const formatCurrency = (value: number) => {
  return `S/ ${value.toFixed(2)}`;
};

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  needInvoice: boolean;
  paymentMethod: string;
}

const CheckoutPage: React.FC = () => {
  const { items, totalAmount } = useCart();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    needInvoice: false,
    paymentMethod: 'izipay'
  });
  
  // Estado para controlar qué secciones están completadas y editables
  const [sectionStatus, setSectionStatus] = useState({
    customer: { completed: false, editing: true },
    address: { completed: false, editing: false },
    payment: { completed: false, editing: false },
  });

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar datos del cliente
    if (!customerData.name || !customerData.email || !customerData.phone) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    setSectionStatus({
      ...sectionStatus,
      customer: { completed: true, editing: false },
      address: { completed: false, editing: true }
    });
    setCurrentStep(2);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar dirección
    if (!customerData.address) {
      alert('Por favor ingrese una dirección');
      return;
    }
    
    setSectionStatus({
      ...sectionStatus,
      address: { completed: true, editing: false },
      payment: { completed: false, editing: true }
    });
    setCurrentStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar método de pago
    if (!customerData.paymentMethod) {
      alert('Por favor seleccione un método de pago');
      return;
    }
    
    setSectionStatus({
      ...sectionStatus,
      payment: { completed: true, editing: false }
    });
  };

  const handleEditSection = (section: 'customer' | 'address' | 'payment') => {
    setSectionStatus({
      ...sectionStatus,
      [section]: { ...sectionStatus[section], editing: true }
    });
    
    // Actualizar el paso actual según la sección a editar
    if (section === 'customer') setCurrentStep(1);
    if (section === 'address') setCurrentStep(2);
    if (section === 'payment') setCurrentStep(3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCheckout = () => {
    console.log('Procesando compra con datos:', {
      customer: customerData,
      items,
      total: totalAmount + (totalAmount >= 80 ? 0 : 10)
    });
    // Implementar lógica de checkout
  };

  return (
    <>
      <Navbar />
      <CartContainer>
        <CartHeader>
          <CartTitle>Finalizar Compra</CartTitle>
        </CartHeader>
        
        {items.length === 0 ? (
          <EmptyCartMessage>
            <EmptyCartTitle>Tu carrito está vacío</EmptyCartTitle>
            <p>Parece que aún no has añadido productos a tu carrito.</p>
            <ShopNowButton href="/">Ir a Comprar</ShopNowButton>
          </EmptyCartMessage>
        ) : (
          <CheckoutLayout>
            <CheckoutFormContainer>
              {/* Sección de Datos del Cliente */}
              <FormSection>
                <SectionHeader>
                  <SectionTitle>
                    <span>1</span>DATOS DE CLIENTE
                  </SectionTitle>
                  {sectionStatus.customer.completed && !sectionStatus.customer.editing && (
                    <EditButton onClick={() => handleEditSection('customer')}>Editar</EditButton>
                  )}
                </SectionHeader>

                {sectionStatus.customer.completed && !sectionStatus.customer.editing ? (
                  <CustomerInfo>
                    <CustomerInfoText>{customerData.name}</CustomerInfoText>
                    <CustomerInfoText>{customerData.email}</CustomerInfoText>
                    <CustomerInfoText>{customerData.phone}</CustomerInfoText>
                  </CustomerInfo>
                ) : (
                  <form onSubmit={handleCustomerSubmit}>
                    <FormGroup>
                      <FormLabel htmlFor="name">Nombre completo</FormLabel>
                      <FormInput 
                        id="name" 
                        name="name" 
                        value={customerData.name} 
                        onChange={handleInputChange}
                        required 
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                      <FormInput 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={customerData.email} 
                        onChange={handleInputChange}
                        required 
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="phone">Teléfono</FormLabel>
                      <FormInput 
                        id="phone" 
                        name="phone" 
                        value={customerData.phone} 
                        onChange={handleInputChange}
                        required 
                      />
                    </FormGroup>
                    <FormActions>
                      <ContinueButton type="submit">Continuar</ContinueButton>
                    </FormActions>
                  </form>
                )}
              </FormSection>
              
              {/* Sección de Dirección de Entrega */}
              <FormSection>
                <SectionHeader>
                  <SectionTitle>
                    <span>2</span>DIRECCIÓN DE ENTREGA
                  </SectionTitle>
                  {sectionStatus.address.completed && !sectionStatus.address.editing && (
                    <EditButton onClick={() => handleEditSection('address')}>Editar</EditButton>
                  )}
                </SectionHeader>
                
                {currentStep < 2 ? (
                  <CustomerInfo>
                    <CustomerInfoText>Complete los datos del cliente primero</CustomerInfoText>
                  </CustomerInfo>
                ) : sectionStatus.address.completed && !sectionStatus.address.editing ? (
                  <CustomerInfo>
                    <CustomerInfoText>Delivery</CustomerInfoText>
                    <CustomerInfoText>{customerData.address}</CustomerInfoText>
                    <CustomerInfoText>{customerData.needInvoice ? 'Con factura' : 'Sin factura'}</CustomerInfoText>
                  </CustomerInfo>
                ) : (
                  <form onSubmit={handleAddressSubmit}>
                    <FormGroup>
                      <FormLabel htmlFor="address">Dirección completa</FormLabel>
                      <FormInput 
                        id="address" 
                        name="address" 
                        value={customerData.address} 
                        onChange={handleInputChange}
                        placeholder="Dirección, Número, Distrito, Provincia, Departamento"
                        required 
                      />
                    </FormGroup>
                    <FormGroup>
                      <RadioOption>
                        <input
                          type="checkbox"
                          id="needInvoice"
                          name="needInvoice"
                          checked={customerData.needInvoice}
                          onChange={handleInputChange}
                        />
                        <span>Necesito factura</span>
                      </RadioOption>
                    </FormGroup>
                    <FormActions>
                      <ContinueButton type="submit">Continuar</ContinueButton>
                    </FormActions>
                  </form>
                )}
              </FormSection>
              
              {/* Sección de Método de Pago */}
              <FormSection>
                <SectionHeader>
                  <SectionTitle>
                    <span>3</span>MÉTODO DE PAGO
                  </SectionTitle>
                  {sectionStatus.payment.completed && !sectionStatus.payment.editing && (
                    <EditButton onClick={() => handleEditSection('payment')}>Editar</EditButton>
                  )}
                </SectionHeader>
                
                {currentStep < 3 ? (
                  <CustomerInfo>
                    <CustomerInfoText>Complete la dirección de entrega primero</CustomerInfoText>
                  </CustomerInfo>
                ) : sectionStatus.payment.completed && !sectionStatus.payment.editing ? (
                  <CustomerInfo>
                    <CustomerInfoText>
                      Pago con {customerData.paymentMethod === 'izipay' ? 'Izipay' : 'Visa'}
                    </CustomerInfoText>
                  </CustomerInfo>
                ) : (
                  <form onSubmit={handlePaymentSubmit}>
                    <FormGroup>
                      <RadioOption>
                        <input 
                          type="radio" 
                          id="izipay"
                          name="paymentMethod"
                          value="izipay"
                          checked={customerData.paymentMethod === 'izipay'}
                          onChange={handleInputChange}
                          required
                        />
                        <span>Izipay</span>
                        <PaymentIcon>💳</PaymentIcon>
                      </RadioOption>
                      
                      <RadioOption>
                        <input 
                          type="radio" 
                          id="visa"
                          name="paymentMethod"
                          value="visa"
                          checked={customerData.paymentMethod === 'visa'}
                          onChange={handleInputChange}
                          required
                        />
                        <span>Visa</span>
                        <PaymentIcon>💳 Visa</PaymentIcon>
                      </RadioOption>
                    </FormGroup>
                    <FormActions>
                      <ContinueButton type="submit">Confirmar</ContinueButton>
                    </FormActions>
                  </form>
                )}
              </FormSection>
            </CheckoutFormContainer>

            <OrderSummary>
              <SummaryTitle>Resumen del Pedido</SummaryTitle>
              <SummaryRow>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>{formatCurrency(totalAmount)}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Envío</SummaryLabel>
                <SummaryValue>{totalAmount >= 80 ? 'Gratis' : formatCurrency(10)}</SummaryValue>
              </SummaryRow>
              <SummaryTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalValue>
                  {formatCurrency(totalAmount + (totalAmount >= 80 ? 0 : 10))}
                </TotalValue>
              </SummaryTotal>
              <CheckoutButton 
                onClick={handleCheckout}
                disabled={!sectionStatus.customer.completed || !sectionStatus.address.completed || !sectionStatus.payment.completed}
              >
                Finalizar Compra
              </CheckoutButton>
            </OrderSummary>
          </CheckoutLayout>
        )}
      </CartContainer>
    </>
  );
};

export default CheckoutPage;