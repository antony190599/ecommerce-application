import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { OrderRepository } from "@/database/repositories/orders";
import { getSearchParams } from "@/utils/url";



//GET /api/admin/orders
export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!session.user.isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const searchParams = getSearchParams(req.url);

        const {ordersArray: orders, total} = await OrderRepository.findAllPaginated(
            searchParams?.page as unknown as number || 1,
            searchParams?.limit as unknown as number || 10,
            searchParams?.searchTerm
        );

        return NextResponse.json({
            data: orders,
            summary: {
                total: total,
                page: searchParams?.page as unknown as number || 1,
                limit: searchParams?.limit as unknown as number || 10,
                totalPages: Math.ceil(total / (searchParams?.limit as unknown as number || 10))
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}








