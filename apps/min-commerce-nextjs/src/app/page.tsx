"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import ProductList from '@/components/ProductList'
import { products } from '@/data/products'
import Navbar from '@/components/Navbar'
import ProductSlider from '@/components/ProductSlider/ProductSlider'

// Styled Components

const HomeContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const MainContent = styled.main`
  // max-width: 1280px;
  margin: 0 auto;
  padding: 0 0;
`;

export default function Home() {
  // Get featured products (those that are on sale)
  const featuredProducts = products.filter(product => Boolean(product.isOnSale));
  
  // Get all products that are in stock - usar operador de coalescencia nula para manejar undefined
  const availableProducts = products.filter(product => (product.stock ?? 0) > 0);
  
  // Banner images for ProductSlider
  const bannerImages = [
    { src: "https://res.cloudinary.com/riqra/image/upload/w_2700,h_675,c_limit,q_auto,f_auto/v1742247489/sellers/utilex/banners/ejfnesyarvk7eaeuqzce.webp", alt: "Banner 1" },
    { src: "https://res.cloudinary.com/riqra/image/upload/w_2700,h_675,c_limit,q_auto,f_auto/v1742247539/sellers/utilex/banners/rgkmsotckyp19b70rupl.webp", alt: "Banner 2" },
    { src: "https://res.cloudinary.com/riqra/image/upload/w_2700,h_675,c_limit,q_auto,f_auto/v1743785213/sellers/utilex/banners/dlctj1cgn3u4mbt2tu2q.webp", alt: "Banner 3" },
    { src: "https://res.cloudinary.com/riqra/image/upload/w_2700,h_675,c_limit,q_auto,f_auto/v1744730629/sellers/utilex/banners/c4ed6ni4rrc2dyzsdsg8.webp", alt: "Banner 4" },
    { src: "https://res.cloudinary.com/riqra/image/upload/w_2700,h_675,c_limit,q_auto,f_auto/v1744927287/sellers/utilex/banners/egotuqixdw7tgc1tuk4n.webp", alt: "Banner 5" },
  ];
  
  return (
    <HomeContainer>
      <Navbar />
      <MainContent>
        {/* Banner Carousel */}
        <ProductSlider images={bannerImages} />

        {/* All available products */}
        <ProductList 
          products={availableProducts}
          title="Catálogo de productos" 
          maxColumns={5}
        />
      </MainContent>
    </HomeContainer>
  )
}
