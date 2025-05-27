import React from 'react';
import styled from 'styled-components';

export type TagType = 'sale' | 'new' | 'limited' | 'soldout';

interface ProductTagProps {
  type: TagType;
}

interface TagStyles {
  backgroundColor: string;
  color: string;
}

const tagStyles: Record<TagType, TagStyles> = {
  sale: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-white)'
  },
  new: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)'
  },
  limited: {
    backgroundColor: 'var(--color-error)',
    color: 'var(--color-white)'
  },
  soldout: {
    backgroundColor: 'var(--color-gray-300)',
    color: 'var(--color-text)'
  }
};

const TagContent: Record<TagType, string> = {
  sale: 'En Oferta',
  new: 'Nuevo',
  limited: 'Stock Limitado',
  soldout: 'Agotado'
};

const TagContainer = styled.div<{ tagType: TagType }>`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius-sm);
  background-color: ${props => tagStyles[props.tagType].backgroundColor};
  color: ${props => tagStyles[props.tagType].color};
  text-transform: uppercase;
`;

const ProductTag: React.FC<ProductTagProps> = ({ type }) => {
  return (
    <TagContainer tagType={type}>
      {TagContent[type]}
    </TagContainer>
  );
};

export default ProductTag;
