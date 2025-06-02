import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 25%; /* 4:1 aspect ratio */
  overflow: hidden;
  
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 0;
    height: 180px;
  }
`;

interface SlideProps {
  isActive: boolean;
}

export const Slide = styled.div<SlideProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 600ms ease-in-out;
  pointer-events: ${({ isActive }) => (isActive ? "auto" : "none")};
  animation: ${({ isActive }) => isActive ? css`${fadeIn} 600ms ease-in-out` : 'none'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent 50%,
    ${({ theme }) => theme.colors.background} 100%
  );
`;

interface ArrowButtonProps {
  direction: "prev" | "next";
}

export const ArrowButton = styled.button<ArrowButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => direction === "prev" ? "left: 20px;" : "right: 20px;"}
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.hoverSurface};
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    ${({ direction }) => direction === "prev" ? "left: 10px;" : "right: 10px;"}
  }
`;

export const Dots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 10px;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
  }
`;

interface DotProps {
  isActive: boolean;
}

export const Dot = styled.button<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.gray500};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    transform: scale(1.2);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 10px;
    height: 10px;
    margin: 2px;
  }
`;
