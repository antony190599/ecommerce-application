import Link from "next/link";
import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // Creates a 1:1 aspect ratio box
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; // Ensures image fits within container without distortion
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const AddButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: ${props => props.theme.zIndex.dropdown};
`;

export const FavButton = styled.button`
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #EEE;
  color: #E53946;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast}, transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: #FAFAFA;
    transform: scale(1.05);
  }
`;

export const Info = styled.div`
  padding: 16px;
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
  }
`;

export const Name = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
  line-height: 1.3;
  text-align: left;
`;

export const Unit = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 4px;
  text-align: left;
`;

export const Meta = styled.p`
  font-size: 12px;
  color: #AAA;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-bottom: 8px;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Price = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: #E53946;
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: line-through;
`;

export const StockInfo = styled.div<{ stock: number }>`
  font-size: 12px;
  color: ${props => props.stock > 5 ? props.theme.colors.success : props.theme.colors.error};
  margin-top: 4px;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

export const Rating = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
`;

export const TagsContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;