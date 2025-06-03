/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef } from 'react';
import CartButton from '../CartButton';
import CategoriesMenu from '../CategoriesMenu';
import categories from '../../data/categories';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryBar, CategoryItem, CategoryLink, CategoryList, ContactInfo, CoverageButton, IconGroup, IconLink, Logo, MainBar, NavArrowButton, NavbarContainer, NavLinks, SearchBar, SearchButton, SearchForm, SearchInput, SocialLinks, TopBar,  } from './styled';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryListRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search for:', searchQuery);
  };
  
  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryListRef.current) {
      const scrollAmount = 300; // Adjust this value as needed
      const newScrollPosition = direction === 'left' 
        ? categoryListRef.current.scrollLeft - scrollAmount 
        : categoryListRef.current.scrollLeft + scrollAmount;
        
      categoryListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      
      // Check scroll position after animation
      setTimeout(() => checkScrollPosition(), 300);
    }
  };
  
  const checkScrollPosition = () => {
    if (categoryListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryListRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // Small buffer for rounding errors
    }
  };
  
  // Add scroll event listener to update arrow visibility
  React.useEffect(() => {
    const listElement = categoryListRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', checkScrollPosition);
      // Check initial state
      checkScrollPosition();
    }
    
    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);
  
  return (
    <NavbarContainer>
      {/* Top info bar */}
      <TopBar>
        <ContactInfo>
          <a href="mailto:antonycayo@antokit.pe">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            antonycayo@antokit.pe
          </a>
          <a href="tel:922571506">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
            </svg>
            922571506
          </a>
        </ContactInfo>
        
        <SocialLinks>
          <span>Síguenos en:</span>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.065a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.669a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
        </SocialLinks>
      </TopBar>
      
      {/* Main navbar */}
      <MainBar>
        <Logo>
          <Link href="/">
            <img src="/img/MONTCARE-LOGO-FINAL.jpg" alt="Antokit"/>
          </Link>
        </Logo>
        
        <SearchBar>
          <SearchForm onSubmit={handleSearchSubmit}>
            <SearchInput 
              type="text"
              placeholder="¿Qué producto estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </SearchButton>
          </SearchForm>
        </SearchBar>
        
        <IconGroup>
          <CoverageButton href="/cobertura">
            Cobertura
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
            </svg>
          </CoverageButton>
          
          <IconLink href="/account">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </IconLink>
          
          <CartButton />
        </IconGroup>
      </MainBar>
      
      {/* Category links */}
      <CategoryBar>
        <CategoriesMenu label="Categorías" showArrowIcon={true} categories={categories}/>
        <NavLinks>
          {showLeftArrow && (
            <NavArrowButton 
              direction="left" 
              onClick={() => scrollCategories('left')}
              aria-label="Scroll categories left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
              </svg>
            </NavArrowButton>
          )}
          
          <CategoryList ref={categoryListRef}>
            
            <CategoryItem>
              <CategoryLink href="/accesorios-escritorio">Accesorios de Escritorio</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/papeleria">Papelería</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/escritura-caligrafia">Escritura y Caligrafía</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/arte">Arte</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/archivo-organizacion">Archivo y Organización</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/cuadernos-blocks">Cuadernos y Blocks</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/agendas-otros">Agendas y Otros</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/cuadernos-anillados-empastados">Cuadernos Anillados y Empastados</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/cintas-pegamentos">Cintas y Pegamentos</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/materiales-didacticos">Materiales Didácticos y Educativos</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/computadoras-accesorios">Computadoras y Accesorios</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/higiene-limpieza">Higiene y Limpieza</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/manualidades">Manualidades</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/mochilas-loncheras">Mochilas y Loncheras</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/muebles-espacios-trabajo">Muebles y Espacios de Trabajo</CategoryLink>
            </CategoryItem>
            <CategoryItem>
              <CategoryLink href="/blocks">Blocks</CategoryLink>
            </CategoryItem>
          </CategoryList>
          
          {showRightArrow && (
            <NavArrowButton 
              direction="right" 
              onClick={() => scrollCategories('right')}
              aria-label="Scroll categories right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </NavArrowButton>
          )}
        </NavLinks>

      </CategoryBar>
      
    </NavbarContainer>
  );
};

export default Navbar;
