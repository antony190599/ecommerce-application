import { db } from "@/database/db";
import { products, productCategories, categories } from "@/database/schema";
import { and, count, eq, ilike, sql } from "drizzle-orm";


export class ProductRepository {

    static async getProductsPaginated(
        page: number = 1,
        limit: number = 10,
        searchTerm?: string,
        categoryId?: string
    ) {
        const offset = (page - 1) * limit;

        // Start with base query
        let query = db.select().from(products);
        let countQuery = db.select({ count: count() }).from(products);

        // Apply filters if provided
        if (searchTerm) {
            const searchFilter = ilike(products.name, `%${searchTerm}%`);
            query = query.where(searchFilter) as any;
            countQuery = countQuery.where(searchFilter) as any;
        }

        // Filter by category if provided
        if (categoryId) {
            query = query
                .innerJoin(productCategories, eq(products.id, productCategories.productId))
                .where(eq(productCategories.categoryId, categoryId)) as any;
            
            countQuery = countQuery
                .innerJoin(productCategories, eq(products.id, productCategories.productId))
                .where(eq(productCategories.categoryId, categoryId)) as any;
        }

        // Execute the queries
        const [productsResult, countResult] = await Promise.all([
            query.limit(limit).offset(offset),
            countQuery
        ]);

        return {
            products: productsResult,
            total: Number(countResult[0]?.count || 0),
            page,
            limit,
            totalPages: Math.ceil(Number(countResult[0]?.count || 0) / limit)
        };
    }

}