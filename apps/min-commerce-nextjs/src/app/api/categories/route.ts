import { db } from '@/database/db';
import { categories } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async() => {
  try {
    // First, get all parent categories (level 0)
    const parentCategories = await db.query.categories.findMany({
      where: eq(categories.level, 0),
      orderBy: categories.name,
    });

    // Format the response with subcategories
    const formattedCategories = await Promise.all(
      parentCategories.map(async (parent) => {
        // For each parent category, find its children
        const subcategories = await db.query.categories.findMany({
          where: eq(categories.parentId, parent.id),
          orderBy: categories.name,
        });

        // Format subcategories to match the expected response structure
        const formattedSubcategories = subcategories.map(sub => ({
          id: sub.id,
          name: sub.name,
          path: sub.path
        }));

        // Return the parent with its subcategories
        return {
          id: parent.id,
          name: parent.name,
          path: parent.path,
          subcategories: formattedSubcategories
        };
      })
    );

    return NextResponse.json({
      data: formattedCategories,
      count: formattedCategories.length,
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}