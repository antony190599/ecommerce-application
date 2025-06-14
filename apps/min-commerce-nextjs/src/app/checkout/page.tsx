/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '@/providers/CartProvider';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  checkoutStep1FormSchema, 
  CheckoutStep1FormValues, 
  checkoutStep2FormSchema,
  CheckoutStep2FormValues,
  initialCheckoutStep1FormValues,
  initialCheckoutStep2FormValues
} from '@/validations/checkoutSchema';
import { BrickButton } from 'brick-ui';
import Mainlayout from '@/layouts/main';

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

const FormInput = styled.input
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

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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

const ErrorMessage = styled.p`
  color: #e53935;
  font-size: 0.8rem;
  margin-top: 4px;
`;

const formatCurrency = (value: number) => {
  return `S/ ${value.toFixed(2)}`;
};

interface CustomerData {
  paymentMethod: string;
  needInvoice: boolean;
}

const CheckoutPage: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const [ checkoutLoading, setCheckoutLoading ] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<CustomerData>({
    needInvoice: false,
    paymentMethod: 'izipay'
  });
  
  // Estado para controlar qué secciones están completadas y editables
  const [sectionStatus, setSectionStatus] = useState({
    customer: { completed: false, editing: true },
    address: { completed: false, editing: false },
    payment: { completed: false, editing: false },
  });

  // Step 1 form
  const { 
    register: registerStep1, 
    handleSubmit: handleSubmitStep1, 
    formState: { errors: errorsStep1 },
    getValues: getValuesStep1,
  } = useForm<CheckoutStep1FormValues>({
    resolver: zodResolver(checkoutStep1FormSchema as any),
    defaultValues: initialCheckoutStep1FormValues,
  });

  // Step 2 form
  const { 
    register: registerStep2, 
    handleSubmit: handleSubmitStep2, 
    formState: { errors: errorsStep2 },
    getValues: getValuesStep2,
  } = useForm<CheckoutStep2FormValues>({
    resolver: zodResolver(checkoutStep2FormSchema as any),
    defaultValues: initialCheckoutStep2FormValues,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitStep1 = (data: CheckoutStep1FormValues) => {
    setSectionStatus({
      ...sectionStatus,
      customer: { completed: true, editing: false },
      address: { completed: false, editing: true }
    });
    setCurrentStep(2);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitStep2 = (data: CheckoutStep2FormValues) => {
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

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    const formData = {
      ...getValuesStep1(),
      ...getValuesStep2(),
      needInvoice: customerData.needInvoice,
      paymentMethod: customerData.paymentMethod
    };
    
    const orderData = {
      customer: formData,
      items: items.map(item => ({
        id: item.id,
        name: item.name,            // Explícitamente incluir el nombre
        price: item.price.toString(),
        quantity: item.quantity,
        stock: item.stock,
        imageUrl: item.imageUrl     // Explícitamente incluir la URL de la imagen
      })),
      total: totalAmount + (totalAmount >= 80 ? 0 : 10)
    };
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Clear cart or redirect to success page
        alert('¡Orden creada con éxito! Número de orden: ' + result.order.id);
        setCheckoutLoading(false);

        // VACIAR EL CARRITO
        clearCart();

        // Optionally clear the cart here
        window.location.href = '/';
      } else {
        alert('Error al procesar la orden: ' + (result.error || 'Intente nuevamente'));
        setCheckoutLoading(false);
      }
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      alert('Error al procesar la orden. Por favor intente nuevamente.');
      setCheckoutLoading(false);
    }
  };

  const handleCancelCheckout = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar la compra? Se perderá la información ingresada.')) {
      // Opcionalmente, puedes limpiar el carrito o guardar el estado actual
      // cart.clearCart(); // Si quieres vaciar el carrito al cancelar
      window.location.href = '/';
    }
  };

  return (
    
    <Mainlayout>
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
                    <CustomerInfoText>{getValuesStep1().nombre}</CustomerInfoText>
                    <CustomerInfoText>{getValuesStep1().email}</CustomerInfoText>
                    <CustomerInfoText>{getValuesStep1().telefono}</CustomerInfoText>
                  </CustomerInfo>
                ) : (
                  <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
                    <FormGroup>
                      <FormLabel htmlFor="nombre">Nombre completo</FormLabel>
                      <FormInput 
                        id="nombre" 
                        error={!!errorsStep1.nombre}
                        {...registerStep1("nombre")} 
                      />
                      {errorsStep1.nombre && (
                        <ErrorMessage>{errorsStep1.nombre.message}</ErrorMessage>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                      <FormInput 
                        id="email" 
                        type="email"
                        error={!!errorsStep1.email}
                        {...registerStep1("email")} 
                      />
                      {errorsStep1.email && (
                        <ErrorMessage>{errorsStep1.email.message}</ErrorMessage>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                      <FormInput 
                        id="telefono" 
                        type="tel"
                        error={!!errorsStep1.telefono}
                        {...registerStep1("telefono")} 
                      />
                      {errorsStep1.telefono && (
                        <ErrorMessage>{errorsStep1.telefono.message}</ErrorMessage>
                      )}
                    </FormGroup>
                    <FormActions>
                      <BrickButton variant='primary' type="submit">Continuar</BrickButton>
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
                    <CustomerInfoText>{getValuesStep2().direccion}</CustomerInfoText>
                    <CustomerInfoText>{getValuesStep2().referencia || 'Sin referencia'}</CustomerInfoText>
                    <CustomerInfoText>{customerData.needInvoice ? 'Con factura' : 'Sin factura'}</CustomerInfoText>
                  </CustomerInfo>
                ) : (
                  <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
                    <FormGroup>
                      <FormLabel htmlFor="direccion">Dirección completa</FormLabel>
                      <FormInput 
                        id="direccion" 
                        placeholder="Dirección, Número, Distrito, Provincia, Departamento"
                        error={!!errorsStep2.direccion}
                        {...registerStep2("direccion")} 
                      />
                      {errorsStep2.direccion && (
                        <ErrorMessage>{errorsStep2.direccion.message}</ErrorMessage>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="referencia">Referencia (Opcional)</FormLabel>
                      <FormInput 
                        id="referencia" 
                        placeholder="Puntos de referencia para encontrar la dirección"
                        error={!!errorsStep2.referencia}
                        {...registerStep2("referencia")} 
                      />
                      {errorsStep2.referencia && (
                        <ErrorMessage>{errorsStep2.referencia.message}</ErrorMessage>
                      )}
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
                      <BrickButton variant='primary' type="submit">Continuar</BrickButton>
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
                      <BrickButton variant='primary' type="submit">Confirmar</BrickButton>
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
              <BrickButton 
                variant='secondary'
                style={{ marginBottom: '20px' }}
                fullWidth
                size="lg"
                onClick={handleCancelCheckout}
              >  
                Cancelar Compra
              </BrickButton>
              <BrickButton
                variant="primary"
                loading={checkoutLoading}
                fullWidth
                size="lg" 
                onClick={handleCheckout}
                disabled={!sectionStatus.customer.completed || !sectionStatus.address.completed || !sectionStatus.payment.completed}
              >
                Finalizar Compra
              </BrickButton>
            </OrderSummary>
          </CheckoutLayout>
        )}
      </CartContainer>

    </Mainlayout>
  );
};

export default CheckoutPage;