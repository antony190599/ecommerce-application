import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import CategoriesMenu from './CategoriesMenu';
import categories from '../../data/categories';

const DemoContainer = styled.div`
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

const CategoriesMenuDemo: React.FC = () => {
  return (
    <DemoContainer>
      <Navbar />
      <MainContent>
        <Title>CategoriesMenu Demo</Title>
        <InfoText>
          A demonstration of the CategoriesMenu component with different implementations.
        </InfoText>

        <Section>
          <Subtitle>Default Implementation</Subtitle>
          <DemoBox>
            <CategoriesMenu categories={categories} />
          </DemoBox>
          <InfoText>
            Default implementation showing how the menu works. Hover over "Categorías" to open,
            then hover over different categories to see their subcategories.
          </InfoText>
        </Section>

        <Section>
          <Subtitle>Navbar Integration Example</Subtitle>
          <DemoBox>
            <NavbarStyleExample>
              <CategoriesMenu categories={categories} />
              <DemoLinks>
                <a href="#">Inicio</a>
                <a href="#">Ofertas</a>
                <a href="#">Contacto</a>
                <a href="#">Ayuda</a>
              </DemoLinks>
            </NavbarStyleExample>
          </DemoBox>
          <InfoText>
            Example showing how the menu integrates with a navbar-like component.
          </InfoText>
        </Section>
      </MainContent>
    </DemoContainer>
  );
};

export default CategoriesMenuDemo;
