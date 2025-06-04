import { NextResponse } from 'next/server';
import { productImages } from '../../../../data/product-images';
import { products } from '../../../../data/products';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Find the product by ID
    const product = products.find(product => product.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Get images for this product
    const images = productImages.filter(image => image.productId === id);
    
    // Return product with images
    return NextResponse.json({
      ...product,
      images
    });
  } catch (error: unknown) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
    );
  }
}