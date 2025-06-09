import { products } from "@/database/schema";
import { db } from "@/database/db";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
    try {
        // Query all products from the database
        const allProducts = await db.select().from(products);
        return NextResponse.json(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
