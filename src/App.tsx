import styled from 'styled-components'
import ProductList from './components/ProductList'
import { products } from './data/products'

// Styled Components
const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const AppHeader = styled.header`
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-light);
`;

function App() {
  // Get featured products (those that are on sale)
  const featuredProducts = products.filter(product => Boolean(product.isOnSale));
  
  // Get all products that are in stock - usar operador de coalescencia nula para manejar undefined
  const availableProducts = products.filter(product => (product.stock ?? 0) > 0);
  
  return (
    <AppContainer>
      <AppHeader>
        <Title>Mi Tienda Online</Title>
        <Subtitle>Los mejores productos para tu oficina y hogar</Subtitle>
      </AppHeader>
      
      {/* Featured products section */}
      <ProductList 
        products={featuredProducts}
        title="Ofertas destacadas" 
        maxColumns={2}
      />
      
      {/* All available products */}
      <ProductList 
        products={availableProducts}
        title="Catálogo de productos" 
        maxColumns={4}
      />
    </AppContainer>
  )
}

export default App
