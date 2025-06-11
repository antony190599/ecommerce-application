"use client";

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import CartButton from '../CartButton';
import CategoriesMenu from '../CategoriesMenu';
import AuthButton from '../AuthButton';

// Data
import categories from '../../data/categories';

// Styled components
import {
  CategoryBar,
  CategoryItem,
  CategoryLink,
  CategoryList,
  ContactInfo,
  CoverageButton,
  IconGroup,
  IconLink,
  Logo,
  MainBar,
  NavArrowButton,
  NavbarContainer,
  NavLinks,
  SearchBar,
  SearchButton,
  SearchForm,
  SearchInput,
  SocialLinks,
  TopBar,
} from './styled';

// Types
interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface ContactItem {
  href: string;
  icon: React.ReactNode;
  text: string;
}

interface CategoryItem {
  href: string;
  label: string;
}

// Constants
const SCROLL_AMOUNT = 300;
const SCROLL_CHECK_DELAY = 300;
const SCROLL_BUFFER = 5;

const CONTACT_INFO: ContactItem[] = [
  {
    href: "mailto:antonycayo@antokit.pe",
    text: "antonycayo@antokit.pe",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  },
  {
    href: "tel:+51922571506",
    text: "922571506",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
      </svg>
    )
  }
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://facebook.com/antokit",
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
      </svg>
    )
  },
  {
    href: "https://instagram.com/antokit",
    label: "Instagram", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.065a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.669a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
      </svg>
    )
  },
  {
    href: "https://youtube.com/@antokit",
    label: "YouTube",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
    )
  }
];

const CATEGORY_ITEMS: CategoryItem[] = [
  { href: "/accesorios-escritorio", label: "Accesorios de Escritorio" },
  { href: "/papeleria", label: "Papelería" },
  { href: "/escritura-caligrafia", label: "Escritura y Caligrafía" },
  { href: "/arte", label: "Arte" },
  { href: "/archivo-organizacion", label: "Archivo y Organización" },
  { href: "/cuadernos-blocks", label: "Cuadernos y Blocks" },
  { href: "/agendas-otros", label: "Agendas y Otros" },
  { href: "/cuadernos-anillados-empastados", label: "Cuadernos Anillados y Empastados" },
  { href: "/cintas-pegamentos", label: "Cintas y Pegamentos" },
  { href: "/materiales-didacticos", label: "Materiales Didácticos y Educativos" },
  { href: "/computadoras-accesorios", label: "Computadoras y Accesorios" },
  { href: "/higiene-limpieza", label: "Higiene y Limpieza" },
  { href: "/manualidades", label: "Manualidades" },
  { href: "/mochilas-loncheras", label: "Mochilas y Loncheras" },
  { href: "/muebles-espacios-trabajo", label: "Muebles y Espacios de Trabajo" },
  { href: "/blocks", label: "Blocks" }
];

// Custom hooks
const useScrollNavigation = () => {
  const categoryListRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = useCallback(() => {
    if (!categoryListRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = categoryListRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - SCROLL_BUFFER);
  }, []);

  const scrollCategories = useCallback((direction: 'left' | 'right') => {
    if (!categoryListRef.current) return;

    const newScrollPosition = direction === 'left' 
      ? categoryListRef.current.scrollLeft - SCROLL_AMOUNT 
      : categoryListRef.current.scrollLeft + SCROLL_AMOUNT;
      
    categoryListRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
    
    setTimeout(checkScrollPosition, SCROLL_CHECK_DELAY);
  }, [checkScrollPosition]);

  // Initialize scroll listeners
  React.useEffect(() => {
    const listElement = categoryListRef.current;
    if (!listElement) return;

    listElement.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Check initial state

    // Cleanup
    return () => {
      listElement.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return {
    categoryListRef,
    showLeftArrow,
    showRightArrow,
    scrollCategories
  };
};

// Components
const TopBarSection: React.FC = () => (
  <TopBar>
    <ContactInfo>
      {CONTACT_INFO.map(({ href, icon, text }) => (
        <a key={href} href={href} aria-label={text}>
          {icon}
          {text}
        </a>
      ))}
    </ContactInfo>
    
    <SocialLinks>
      <span>Síguenos en:</span>
      {SOCIAL_LINKS.map(({ href, icon, label }) => (
        <a 
          key={href} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`Síguenos en ${label}`}
        >
          {icon}
        </a>
      ))}
    </SocialLinks>
  </TopBar>
);

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit 
}) => (
  <SearchBar>
    <SearchForm onSubmit={onSearchSubmit} role="search">
      <SearchInput 
        type="text"
        placeholder="¿Qué producto estás buscando?"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Buscar productos"
      />
      <SearchButton type="submit" aria-label="Buscar">
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </SearchButton>
    </SearchForm>
  </SearchBar>
);

interface CategoryNavigationProps {
  categoryListRef: React.RefObject<HTMLUListElement>;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  onScrollCategories: (direction: 'left' | 'right') => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categoryListRef,
  showLeftArrow,
  showRightArrow,
  onScrollCategories
}) => (
  <CategoryBar>
    <CategoriesMenu 
      label="Categorías" 
      showArrowIcon={true} 
      categories={categories}
    />
    
    <NavLinks>
      {showLeftArrow && (
        <NavArrowButton 
          direction="left" 
          onClick={() => onScrollCategories('left')}
          aria-label="Desplazar categorías hacia la izquierda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </NavArrowButton>
      )}
      
      <CategoryList ref={categoryListRef} role="list">
        {CATEGORY_ITEMS.map(({ href, label }) => (
          <CategoryItem key={href} role="listitem">
            <CategoryLink href={href}>{label}</CategoryLink>
          </CategoryItem>
        ))}
      </CategoryList>
      
      {showRightArrow && (
        <NavArrowButton 
          direction="right" 
          onClick={() => onScrollCategories('right')}
          aria-label="Desplazar categorías hacia la derecha"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </NavArrowButton>
      )}
    </NavLinks>
  </CategoryBar>
);

// Main Component
const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollNavigation = useScrollNavigation();
  
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // TODO: Implement search functionality
    console.log('Search for:', searchQuery);
    // Example: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }, [searchQuery]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  return (
    <NavbarContainer>
      <TopBarSection />
      
      <MainBar>
        <Logo>
          <Link href="/" aria-label="Ir al inicio">
            <Image 
              src="/img/MONTCARE-LOGO-FINAL.jpg" 
              alt="Antokit - Logo de la empresa"
              width={150}
              height={50}
              priority
            />
          </Link>
        </Logo>
        
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        
        <IconGroup>
          <CoverageButton href="/cobertura">
            Cobertura
            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
            </svg>
          </CoverageButton>
          
          
          <IconLink href="/wishlist" aria-label="Mis favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </IconLink>
          
          <AuthButton />
          
          <CartButton />
        </IconGroup>
      </MainBar>
      
      <CategoryNavigation {...({
        categoryListRef: scrollNavigation.categoryListRef as React.RefObject<HTMLUListElement>,
        showLeftArrow: scrollNavigation.showLeftArrow,
        showRightArrow: scrollNavigation.showRightArrow,
        onScrollCategories: scrollNavigation.scrollCategories
      })} />
    </NavbarContainer>
  );
};

export default Navbar;