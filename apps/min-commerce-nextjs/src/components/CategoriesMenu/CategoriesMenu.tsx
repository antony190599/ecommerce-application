"use client";
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Types
interface Subcategory {
  id: string;
  name: string;
  path?: string;
}

interface Category {
  id: string;
  name: string;
  icon?: ReactNode;
  subcategories: Subcategory[];
  path?: string;
}

interface CategoriesMenuProps {
  categories: Category[];
  label?: string; // Optional label for the menu button
  showArrowIcon?: boolean; // Optional prop to show/hide the arrow icon
}

// Styled Components
const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const MenuPanel = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "lowStock, isRemove",
})<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1px;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  width: 700px;
  max-width: 90vw;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CategoriesList = styled.ul`
  flex: 0 0 250px;
  margin: 0;
  padding: 8px 0;
  list-style: none;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  max-height: 500px;
  overflow-y: auto;
`;

const CategoryItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  padding: 0;
  margin: 0;

  a, button {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    width: 100%;
    text-decoration: none;
    border: none;
    background-color: ${props => props.isActive 
      ? props.theme.colors.hoverSurface 
      : 'transparent'
    };
    color: ${props => props.isActive 
      ? props.theme.colors.primaryText
      : props.theme.colors.text
    };
    font-weight: ${props => props.isActive 
      ? props.theme.typography.fontWeight.medium 
      : 'normal'
    };
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverSurface};
      color: ${({ theme }) => theme.colors.primaryText};
    }
  }

  .icon {
    margin-right: 12px;
    color: ${props => props.isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.textLight
    };
  }
`;

const SubcategoryPanel = styled.div`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SubcategoryTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SubcategoriesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SubcategoryItem = styled.li`
  a {
    display: block;
    padding: 8px 0;
    color: ${({ theme }) => theme.colors.mutedText};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

// SVG icons

const ArrowDownIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.666 7a1.661 1.661 0 011.179.488l4.939 4.798 4.926-4.798a1.667 1.667 0 012.357 2.357L11.783 17 4.489 9.845A1.667 1.667 0 015.666 7z"></path>
  </svg>
);

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ categories, label, showArrowIcon = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isClickActivated, setIsClickActivated] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  
  // Set the first category as active by default when menu opens
  useEffect(() => {
    if (isOpen && !activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [isOpen, activeCategory, categories]);

  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsClickActivated(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear any pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleButtonClick = () => {
    // setIsOpen(!isOpen);
    // setIsClickActivated(!isOpen);
  };

  const handleMouseEnter = () => {
    // Clear any pending close timeouts
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    if (!isClickActivated) {
      setIsOpen(true);
    }
  };
  
  const handleMouseLeave = () => {
    // Set a small timeout to prevent the menu from closing immediately
    // This gives users a small grace period to move the cursor back to the menu
    closeTimeoutRef.current = window.setTimeout(() => {
      if (!isClickActivated) {
        setIsOpen(false);
      }
    }, 150); // 150ms delay before closing
  };

  const handleCategoryMouseEnter = (categoryId: string) => {
    if (!isClickActivated) {
      setActiveCategory(categoryId);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsClickActivated(true);
    // Don't close the menu when clicking on a category
    // This keeps the menu open while allowing category navigation
  };

  const activeSubcategories = categories.find(cat => cat.id === activeCategory)?.subcategories || [];
  const activeCategoryName = categories.find(cat => cat.id === activeCategory)?.name || '';

  return (
    <MenuContainer 
      ref={menuRef} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <MenuButton 
        onClick={handleButtonClick}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label || 'Categorías'}
        {
          showArrowIcon && <ArrowDownIcon />
        }
      </MenuButton>

      <MenuPanel isOpen={isOpen} role="menu" aria-label="Categorías de productos">
        <CategoriesList>
          {categories.map((category) => (
            <CategoryItem 
              key={category.id} 
              isActive={category.id === activeCategory}
              onMouseEnter={() => handleCategoryMouseEnter(category.id)}
              role="menuitem"
            >
              {category.path ? (
                <Link href={category.path}>
                  {category.icon && <span className="icon">{category.icon}</span>}
                  {category.name}
                </Link>
              ) : (
                <button onClick={() => handleCategoryClick(category.id)}>
                  {category.icon && <span className="icon">{category.icon}</span>}
                  {category.name}
                </button>
              )}
            </CategoryItem>
          ))}
        </CategoriesList>

        <SubcategoryPanel role="menu" aria-label={`Subcategorías de ${activeCategoryName}`}>
          <SubcategoryTitle>{activeCategoryName}</SubcategoryTitle>
          <SubcategoriesList>
            {activeSubcategories.map((subcategory) => (
              <SubcategoryItem key={subcategory.id} role="menuitem">
                <Link href={subcategory.path || `/categoria/${activeCategory}/${subcategory.id}`}>
                  {subcategory.name}
                </Link>
              </SubcategoryItem>
            ))}
          </SubcategoriesList>
        </SubcategoryPanel>
      </MenuPanel>
    </MenuContainer>
  );
};

export default CategoriesMenu;
