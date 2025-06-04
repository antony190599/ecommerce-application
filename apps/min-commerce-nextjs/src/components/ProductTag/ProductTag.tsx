"use client";
import React from 'react';
import styled from 'styled-components';
import { ThemeType } from 'brick-theme-ui';

export type TagType = 'sale' | 'new' | 'limited' | 'soldout';

interface ProductTagProps {
  type: TagType;
}

const tagStyles = {
  sale: {
    backgroundColor: (theme: ThemeType) => theme.colors.accent,
    color: (theme: ThemeType) => theme.colors.white
  },
  new: {
    backgroundColor: (theme: ThemeType) => theme.colors.primary,
    color: (theme: ThemeType) => theme.colors.white
  },
  limited: {
    backgroundColor: (theme: ThemeType) => theme.colors.error,
    color: (theme: ThemeType) => theme.colors.white
  },
  soldout: {
    backgroundColor: (theme: ThemeType) => theme.colors.gray300,
    color: (theme: ThemeType) => theme.colors.text
  }
};

const TagContent: Record<TagType, string> = {
  sale: 'En Oferta',
  new: 'Nuevo',
  limited: 'Stock Limitado',
  soldout: 'Agotado'
};

const TagContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "tagType",
})<{ tagType: TagType }>`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${props => tagStyles[props.tagType].backgroundColor(props.theme)};
  color: ${props => tagStyles[props.tagType].color(props.theme)};
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
