import { productImages, ProductImage } from '../data/product-images';

export function getProductImages(productId: string): ProductImage[] {
  return productImages.filter(img => img.productId === productId);
}

export function getDefaultProductImage(productId: string): ProductImage | undefined {
  return productImages.find(img => img.productId === productId && img.default === true);
}