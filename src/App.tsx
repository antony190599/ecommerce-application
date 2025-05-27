import styled from 'styled-components'
import FeaturedProducts from './components/FeaturedProducts'

// Styled Components
const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

function App() {
  return (
    <AppContainer>
      <FeaturedProducts />
    </AppContainer>
  )
}

export default App
