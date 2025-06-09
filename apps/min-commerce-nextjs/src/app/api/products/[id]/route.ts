import { products } from "@/database/schema";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, args: {
    params: Promise<{ id: string }>;
  }): Promise<Response> {
    try {
        const { id } = await args.params;
        
        const product = await db.select()
            .from(products)
            .where(eq(products.id, id))
            .limit(1);
        
        if (!product || product.length === 0) {
            return NextResponse.json(
                { error: `Producto con id=${id} no encontrado` },
                { status: 404 }
            );
        }
        
        return NextResponse.json(product[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}