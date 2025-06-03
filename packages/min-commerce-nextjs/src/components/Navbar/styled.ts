import styled from 'styled-components';

export const NavbarContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
  
  a {
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    
    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    height: 1rem;
    width: auto;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  span {
    margin-right: ${({ theme }) => theme.spacing.xs};
    font-size: 0.9rem;
  }
  
  a {
    color: ${({ theme }) => theme.colors.white};
    
    &:hover {
      opacity: 0.8;
    }
  }

  svg {
    height: 1rem;
    width: auto;
  }
`;

export const MainBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Logo = styled.div`
  img {
    height: 40px;
    object-fit: contain;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  max-width: 700px;
  margin: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: none;
  outline: none;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0 ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${({ theme }) => theme.colors.gray300};
    height: 1.5rem;
    width: auto;
  }
  
  &:hover svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const IconLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  position: relative;
  
  svg {
    height: 1.5rem;
    width: auto;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

export const NavLinks = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;
`;

export const CategoryList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0 40px; /* Space for navigation arrows */
  margin: 0;
  overflow-x: scroll;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari and Opera */
  }
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

export const CategoryItem = styled.li`
  position: relative;
  
  &:hover > a {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

export const CategoryLink = styled.a`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CoverageButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  margin-left: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
  }
  
  svg {
    margin-left: ${({ theme }) => theme.spacing.xs};
    height: 1rem;
    width: auto;
  }
`;

export const NavArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${({ direction }) => direction === 'left' ? 'left: 0;' : 'right: 0;'}
  height: 100%;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ direction }) => 
    direction === 'left' ? '2px 0 5px rgba(0,0,0,0.1)' : '-2px 0 5px rgba(0,0,0,0.1)'};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    background-color: rgba(255, 255, 255, 1);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CategoryBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;