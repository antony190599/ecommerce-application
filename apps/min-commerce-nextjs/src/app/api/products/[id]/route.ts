import { products } from "@/data/products";

export async function GET(request: Request, args: {
    params: Promise<{ id: string }>;
  }): Promise<Response> {
    const { id } = await args.params;
        
    const product = products.find((product) => product.id === id);
    
    if (!product) {
        return Response.json(
            { error: `Producto con id=${id} no encontrado` },
            { status: 404 }
          );
    }
    
    return Response.json(product);

}