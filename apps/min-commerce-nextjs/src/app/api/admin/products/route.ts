import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProductRepository } from "@/database/repositories/products";
import { getSearchParams } from "@/utils/url";

// GET /api/products
export async function GET(req: Request) {
    try {
        // Query all products from the database
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //verify isAdmin in session
        if (!session.user.isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const searchParams = getSearchParams(req.url);

        const result = await ProductRepository.getProductsPaginated(
            searchParams?.page as unknown as number || 1,
            searchParams?.limit as unknown as number || 10,
            searchParams?.searchTerm,
            searchParams?.categoryId
        );
        
        return NextResponse.json({
            data: result.products,
            summary: {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages
            }
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
