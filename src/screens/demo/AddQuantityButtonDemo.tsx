import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import AddQuantityButton from '../../components/AddQuantityButton';

const DemoContainer = styled.div`
  margin: 0 auto;
`;

const MainContent = styled.main`
  max-width: 800px;
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
  margin-bottom: var(--spacing-md);
`;

const InfoText = styled.p`
  margin-bottom: var(--spacing-md);
  color: var(--color-text-light);
`;

const DemoRow = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const CurrentQuantity = styled.div`
  font-size: 1.25rem;
  font-weight: var(--font-weight-medium);
`;

const AddQuantityButtonDemo: React.FC = () => {
  const [quantity1, setQuantity1] = useState(0);
  const [quantity2, setQuantity2] = useState(2);
  
  return (
    <DemoContainer>
      <Navbar />
      
      <MainContent>
        <Section>
          <Title>AddQuantityButton Demo</Title>
          <InfoText>
            This component allows users to add items to cart and adjust quantity in a single UI element.
            It transitions between an "Agregar" button and a quantity selector based on the current state.
          </InfoText>
          
          <Subtitle>Basic Usage</Subtitle>
          <DemoBox>
            <DemoRow>
              <AddQuantityButton 
                onQuantityChange={setQuantity1}
              />
              <CurrentQuantity>
                Current quantity: {quantity1}
              </CurrentQuantity>
            </DemoRow>
            <InfoText>
              Click "Agregar" to add 1 item and see the button transform into a quantity selector.
              If you decrease the quantity to 0, it will revert back to the "Agregar" button.
            </InfoText>
          </DemoBox>
          
          <Subtitle>Initial Quantity Set</Subtitle>
          <DemoBox>
            <DemoRow>
              <AddQuantityButton 
                initialQuantity={2}
                onQuantityChange={setQuantity2}
                maxQuantity={5}
              />
              <CurrentQuantity>
                Current quantity: {quantity2}
                {quantity2 === 5 && " (Max reached)"}
              </CurrentQuantity>
            </DemoRow>
            <InfoText>
              This example starts with 2 items already added, and has a maximum limit of 5 items.
            </InfoText>
          </DemoBox>
          
          <Subtitle>Disabled State</Subtitle>
          <DemoBox>
            <DemoRow>
              <AddQuantityButton 
                disabled={true}
              />
            </DemoRow>
            <InfoText>
              A disabled button that cannot be interacted with, useful for out-of-stock items.
            </InfoText>
          </DemoBox>
        </Section>
      </MainContent>
    </DemoContainer>
  );
};

export default AddQuantityButtonDemo;
