"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import Mainlayout from '@/layouts/main';
import { BrickButton } from 'brick-ui';
import Link from 'next/link';
import OrderProductItem from '@/components/OrderProductItem/OrderProductItem';
import { ShoppingBag as ShoppingBagIcon } from 'lucide-react'; // Importa el icono

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

const PedidoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PedidoHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const PedidoTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const PedidoDate = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const PedidoStatus = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ status, theme }) => 
    status === 'completed' ? theme.colors.success || '#4caf50' :
    status === 'processing' ? theme.colors.warning || '#ff9800' :
    status === 'cancelled' ? theme.colors.error || '#f44336' :
    theme.colors.gray200};
  color: ${({ status }) => 
    status === 'completed' ? 'white' :
    status === 'processing' ? 'white' :
    status === 'cancelled' ? 'white' :
    'black'};
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

// Nuevo componente BreadcrumbNav
const BreadcrumbNav = styled.nav`
  display: flex;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const BreadcrumbItem = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  
  &:not(:last-child):after {
    content: "/";
    margin: 0 8px;
  }
  
  &:last-child {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

// Nueva estructura para la caja de búsqueda y el botón de continuar comprando
const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const SearchPedidosBox = styled.div`
  display: flex;
  
  input {
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: 4px 0 0 4px;
    width: 300px;
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 8px 15px;
  cursor: pointer;
`;

const ContinueShoppingButton = styled.a`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  svg {
    margin-right: 8px;
  }
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
      secondary?: string;
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
  const [searchTerm, setSearchTerm] = useState<string>(''); // Nuevo estado para búsqueda

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
    // Filtrar por fecha
    const passesDateFilter = (!startDate && !endDate) ||
      (startDate && !endDate && new Date(order.date) >= new Date(startDate)) ||
      (!startDate && endDate && new Date(order.date) <= new Date(endDate)) ||
      (startDate && endDate && new Date(order.date) >= new Date(startDate) && new Date(order.date) <= new Date(endDate));

    // Si no pasa el filtro de fecha, retornar falso inmediatamente
    if (!passesDateFilter) return false;
    
    // Si no hay término de búsqueda, retornar verdadero
    if (!searchTerm) return true;
    
    // Buscar en ID de pedido
    if (order.id.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    
    // Buscar en productos
    return order.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
        
        <BreadcrumbNav>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbItem href="/account">Mi cuenta</BreadcrumbItem>
          <BreadcrumbItem href="#">Mis pedidos</BreadcrumbItem>
        </BreadcrumbNav>

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

        <ActionsContainer>
          <SearchPedidosBox>
            <input 
              type="text" 
              placeholder="Buscar por número de pedido o producto" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton>Buscar</SearchButton>
          </SearchPedidosBox>
          <Link href="/" passHref>
            <ContinueShoppingButton>
              <ShoppingBagIcon size={16} /> Seguir comprando
            </ContinueShoppingButton>
          </Link>
        </ActionsContainer>

        {filteredOrders.length === 0 ? (
          <EmptyOrdersMessage>
            <EmptyOrdersTitle>Aún no tienes pedidos</EmptyOrdersTitle>
            <p>El historial de tus compras aparecerá aquí</p>
            <ShopNowButton href="/">Comenzar a comprar</ShopNowButton>
          </EmptyOrdersMessage>
        ) : (
          <OrderList>
            {filteredOrders.map((order) => (
              <PedidoCard key={order.id}>
                <PedidoHeader>
                  <div>
                    <PedidoTitle>Pedido #{order.id}</PedidoTitle>
                    <PedidoDate>{formatDate(order.date)}</PedidoDate>
                  </div>
                  <PedidoStatus status={order.status || 'processing'}>
                    {translateStatus(order.status || 'processing')}
                  </PedidoStatus>
                </PedidoHeader>
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
              </PedidoCard>
            ))}
          </OrderList>
        )}
      </OrdersContainer>
    </Mainlayout>
  );
};

export default OrdersPage;