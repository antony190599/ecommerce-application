import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { CustomersRepository } from "@/database/repositories/customers";
import { getSearchParams } from "@/utils/url";

export async function GET(req: Request) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verificar si es admin
        if (!session.user.isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const searchParams = getSearchParams(req.url);

        // Obtener todos los clientes (puedes implementar paginación similar a productos)
        const customers = await CustomersRepository.getAllCustomers();

        return NextResponse.json({
            data: customers,
            summary: {
                total: customers.length
            }
        });
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json(
            { error: "Failed to fetch customers" },
            { status: 500 }
        );
    }
}