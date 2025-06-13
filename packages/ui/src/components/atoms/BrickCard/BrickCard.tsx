import React from 'react';
import { CardProps, StyledCard } from './BrickCard.styled';


const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  radius = 'md',
  hoverEffect = false,
  children,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      radius={radius}
      hoverEffect={hoverEffect}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
