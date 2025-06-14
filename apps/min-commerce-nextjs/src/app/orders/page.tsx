"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import Mainlayout from '@/layouts/main';
import { BrickButton } from 'brick-ui';
import Link from 'next/link';
import OrderProductItem from '@/components/OrderProductItem/OrderProductItem';

// Tipos
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  items: OrderItem[];
  status: string;
  customer: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
  };
}

// Estilos
const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const OrdersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const OrdersTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

const EmptyOrdersMessage = styled.div`
  text-align: center;
  padding: 60px 0;
`;

const EmptyOrdersTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 25px;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const OrderHeader = styled.div`
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(74, 105, 189, 0.05)'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderDetails = styled.div`
  padding: 20px;
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const OrderInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderInfoLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 5px;
`;

const OrderInfoValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const OrderStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return theme.colors.success || '#4caf50';
      case 'processing':
        return theme.colors.warning || '#ff9800';
      case 'cancelled':
        return theme.colors.error || '#f44336';
      default:
        return theme.colors.gray200;
    }
  }};
  color: white;
`;

const OrderItems = styled.div`
  margin-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-top: 15px;
`;

const OrderItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const DateFilter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 4px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

// Formateador de moneda
const formatCurrency = (value: number | string) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return `S/ ${numValue.toFixed(2)}`;
};

// Add type declaration for theme.colors to fix the TypeScript warning
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight?: string;
      text: string;
      textLight: string;
      gray200: string;
      success?: string;
      warning?: string;
      error?: string;
    };
    typography: {
      fontWeight: {
        medium: number | string;
        bold: number | string;
      };
    };
  }
}

// Componente principal
const OrdersPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    async function fetchOrders() {
      if (status === 'loading') return;
      
      if (!session) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Error fetching orders');
        
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, [session, status]);

  // Obtener una lista de pedidos filtrados por fecha si se han establecido filtros
  const filteredOrders = orders.filter(order => {
    if (!startDate && !endDate) return true;
    
    const orderDate = new Date(order.date);
    
    if (startDate && !endDate) {
      return orderDate >= new Date(startDate);
    }
    
    if (!startDate && endDate) {
      return orderDate <= new Date(endDate);
    }
    
    return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
  });

  // Función para traducir el estado del pedido
  const translateStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'processing':
        return 'En proceso';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Procesando';
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (status === 'loading' || loading) {
    return (
      <Mainlayout>
        <OrdersContainer>
          <LoadingContainer>Cargando pedidos...</LoadingContainer>
        </OrdersContainer>
      </Mainlayout>
    );
  }

  if (!session) {
    return (
      <Mainlayout>
        <OrdersContainer>
          <OrdersHeader>
            <OrdersTitle>Mis pedidos</OrdersTitle>
          </OrdersHeader>
          <EmptyOrdersMessage>
            <EmptyOrdersTitle>Por favor inicia sesión para ver tus pedidos</EmptyOrdersTitle>
            <BrickButton 
              variant="primary" 
              onClick={() => window.location.href = '/api/auth/signin'}
            >
              Iniciar Sesión
            </BrickButton>
          </EmptyOrdersMessage>
        </OrdersContainer>
      </Mainlayout>
    );
  }

  return (
    <Mainlayout>
      <OrdersContainer>
        <OrdersHeader>
          <OrdersTitle>Mis pedidos</OrdersTitle>
        </OrdersHeader>

        <FiltersContainer>
          <DateFilter>
            <label htmlFor="start-date">Desde:</label>
            <DateInput
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </DateFilter>
          <DateFilter>
            <label htmlFor="end-date">Hasta:</label>
            <DateInput
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </DateFilter>
        </FiltersContainer>

        {filteredOrders.length === 0 ? (
          <EmptyOrdersMessage>
            <EmptyOrdersTitle>Aún no tienes pedidos</EmptyOrdersTitle>
            <p>El historial de tus compras aparecerá aquí</p>
            <ShopNowButton href="/">Comenzar a comprar</ShopNowButton>
          </EmptyOrdersMessage>
        ) : (
          <OrderList>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <div>
                    <strong>Pedido #{order.id}</strong>
                    <span> - {formatDate(order.date)}</span>
                  </div>
                  <OrderStatus status={order.status || 'processing'}>
                    {translateStatus(order.status || 'processing')}
                  </OrderStatus>
                </OrderHeader>
                <OrderDetails>
                  <OrderInfo>
                    <OrderInfoGroup>
                      <OrderInfoLabel>Cliente</OrderInfoLabel>
                      <OrderInfoValue>{order.customer.nombre}</OrderInfoValue>
                    </OrderInfoGroup>
                    <OrderInfoGroup>
                      <OrderInfoLabel>Contacto</OrderInfoLabel>
                      <OrderInfoValue>{order.customer.telefono}</OrderInfoValue>
                    </OrderInfoGroup>
                    <OrderInfoGroup>
                      <OrderInfoLabel>Dirección de entrega</OrderInfoLabel>
                      <OrderInfoValue>{order.customer.direccion}</OrderInfoValue>
                    </OrderInfoGroup>
                    <OrderInfoGroup>
                      <OrderInfoLabel>Total</OrderInfoLabel>
                      <OrderInfoValue>{formatCurrency(order.total)}</OrderInfoValue>
                    </OrderInfoGroup>
                  </OrderInfo>

                  <OrderItems>
                    <h3>Productos ({order.items.length})</h3>
                    <OrderItemsList>
                      {order.items.map((item) => (
                        <div key={item.id} style={{ width: 'calc(50% - 5px)' }}>
                          <OrderProductItem
                            key={item.id}
                            productId={item.id}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            imageUrl={item.imageUrl}
                          />
                        </div>  
                      ))}
                    </OrderItemsList>
                  </OrderItems>
                </OrderDetails>
              </OrderCard>
            ))}
          </OrderList>
        )}
      </OrdersContainer>
    </Mainlayout>
  );
};

export default OrdersPage;