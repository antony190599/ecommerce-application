import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-size: 0.9rem;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: '>';
    margin: 0 var(--spacing-xs);
    color: var(--color-gray-300);
  }
  
  &:last-child {
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
  }
`;

const BreadcrumbLink = styled(Link)`
  color: var(--color-text-light);
  text-decoration: none;
  
  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <BreadcrumbContainer aria-label="Breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <BreadcrumbItem key={index}>
              {!isLast && item.url ? (
                <BreadcrumbLink to={item.url}>{item.label}</BreadcrumbLink>
              ) : (
                <span>{item.label}</span>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
