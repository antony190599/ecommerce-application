import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import CategoriesMenu from '../../components/CategoriesMenu/CategoriesMenu';
import categories from '../../data/categories';

const ScreenContainer = styled.div`
  margin: 0 auto;
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-lg);
`;

const Section = styled.section`
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin: var(--spacing-lg) 0 var(--spacing-md);
`;

const DemoBox = styled.div`
  background-color: var(--color-gray-100);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  margin: var(--spacing-md) 0;
`;

const InfoText = styled.p`
  margin-bottom: var(--spacing-md);
  color: var(--color-text-light);
`;

const NavbarStyleExample = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-gray-200);
`;

const DemoLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-left: var(--spacing-lg);

  a {
    color: var(--color-text);
    text-decoration: none;
    padding: var(--spacing-xs) var(--spacing-sm);
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const CategoriesMenuScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Navbar />
      <MainContent>
        <Title>Navegación por Categorías</Title>
        <InfoText>
          Explora nuestros productos organizados por categorías
        </InfoText>

        <Section>
          <Subtitle>Todas las categorías</Subtitle>
          <DemoBox>
            <CategoriesMenu categories={categories} />
          </DemoBox>
          <InfoText>
            Navega y descubre productos por categoría. Haz clic o pasa el mouse sobre "Categorías" para ver todas las opciones.
          </InfoText>
        </Section>

        <Section>
          <Subtitle>Categorías populares</Subtitle>
          <DemoBox>
            <NavbarStyleExample>
              <CategoriesMenu categories={categories.slice(0, 4)} />
              <DemoLinks>
                <a href="/ofertas">Ofertas</a>
                <a href="/novedades">Novedades</a>
                <a href="/mas-vendidos">Más vendidos</a>
              </DemoLinks>
            </NavbarStyleExample>
          </DemoBox>
          <InfoText>
            Las categorías más populares entre nuestros clientes.
          </InfoText>
        </Section>
      </MainContent>
    </ScreenContainer>
  );
};

export default CategoriesMenuScreen;
