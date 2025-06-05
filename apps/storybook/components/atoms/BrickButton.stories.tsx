import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BrickButton } from 'brick-ui';

const meta: Meta<typeof BrickButton> = {
  title: 'General/Atoms/BrickButton',
  component: BrickButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Button style variant',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
      defaultValue: false,
    },
    icon: {
      control: false,
      description: 'Icon to show at the start of button',
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrickButton>;

// Single comprehensive story showing all button variants and states
export const ButtonShowcase: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      {/* Standard Variants */}
      <section>
        <h5 style={{ marginBottom: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '8px' }}>Button Variants</h5>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <BrickButton {...args} variant="primary">Primary Button</BrickButton>
          <BrickButton {...args} variant="secondary">Secondary Button</BrickButton>
          <BrickButton {...args} variant="danger">Danger Button</BrickButton>
        </div>
      </section>
      
      {/* Size Variations */}
      <section>
        <h5 style={{ marginBottom: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '8px' }}>Button Sizes</h5>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <BrickButton {...args} size="sm">Small Button</BrickButton>
          <BrickButton {...args} size="md">Medium Button</BrickButton>
          <BrickButton {...args} size="lg">Large Button</BrickButton>
        </div>
      </section>
      
      {/* All States */}
      <section>
        <h5 style={{ marginBottom: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '8px' }}>Button States</h5>
        
        {/* Default state */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Default State</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <BrickButton {...args} variant="primary">Primary Button</BrickButton>
            <BrickButton {...args} variant="secondary">Secondary Button</BrickButton>
            <BrickButton {...args} variant="danger">Danger Button</BrickButton>
          </div>
        </div>
        
        {/* Disabled state */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Disabled State</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <BrickButton {...args} variant="primary" disabled>Primary Button</BrickButton>
            <BrickButton {...args} variant="secondary" disabled>Secondary Button</BrickButton>
            <BrickButton {...args} variant="danger" disabled>Danger Button</BrickButton>
          </div>
        </div>
        
        {/* Loading state */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Loading State</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <BrickButton {...args} variant="primary" loading>Primary Button</BrickButton>
            <BrickButton {...args} variant="secondary" loading>Secondary Button</BrickButton>
            <BrickButton {...args} variant="danger" loading>Danger Button</BrickButton>
          </div>
        </div>
      </section>
      
      {/* Full Width */}
      <section>
        <h5 style={{ marginBottom: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '8px' }}>Full Width Buttons</h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <BrickButton {...args} variant="primary" fullWidth>Full Width Primary</BrickButton>
          <BrickButton {...args} variant="secondary" fullWidth>Full Width Secondary</BrickButton>
          <BrickButton {...args} variant="danger" fullWidth>Full Width Danger</BrickButton>
        </div>
      </section>
      
      {/* Size Combinations */}
      <section>
        <h5 style={{ marginBottom: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '8px' }}>Size Combinations</h5>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Small Buttons</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <BrickButton {...args} variant="primary" size="sm">Primary</BrickButton>
            <BrickButton {...args} variant="secondary" size="sm">Secondary</BrickButton>
            <BrickButton {...args} variant="danger" size="sm">Danger</BrickButton>
          </div>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Large Buttons</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <BrickButton {...args} variant="primary" size="lg">Primary</BrickButton>
            <BrickButton {...args} variant="secondary" size="lg">Secondary</BrickButton>
            <BrickButton {...args} variant="danger" size="lg">Danger</BrickButton>
          </div>
        </div>
      </section>
      
      {/* Interactive Example */}
      <section>
        <h5 style={{ marginBottom: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '8px' }}>Interactive Example</h5>
        <InteractiveButtons />
      </section>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interactive buttons component for the showcase
const InteractiveButtons = () => {
  const [isLoading, setIsLoading] = React.useState<{[key: string]: boolean}>({
    primary: false,
    secondary: false,
    danger: false
  });
  
  const handleClick = (variant: string) => {
    setIsLoading(prev => ({ ...prev, [variant]: true }));
    setTimeout(() => {
      setIsLoading(prev => ({ ...prev, [variant]: false }));
    }, 2000);
  };
  
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <BrickButton 
        variant="primary" 
        loading={isLoading.primary}
        onClick={() => handleClick('primary')}
      >
        {isLoading.primary ? 'Loading...' : 'Click Primary'}
      </BrickButton>
      
      <BrickButton 
        variant="secondary" 
        loading={isLoading.secondary}
        onClick={() => handleClick('secondary')}
      >
        {isLoading.secondary ? 'Loading...' : 'Click Secondary'}
      </BrickButton>
      
      <BrickButton 
        variant="danger" 
        loading={isLoading.danger}
        onClick={() => handleClick('danger')}
      >
        {isLoading.danger ? 'Loading...' : 'Click Danger'}
      </BrickButton>
    </div>
  );
};
