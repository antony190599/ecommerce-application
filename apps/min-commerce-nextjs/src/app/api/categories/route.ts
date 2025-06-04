import { categories } from '@/data/categories';
import { NextResponse } from 'next/server';

export const  GET = async() => {
  try {
    return NextResponse.json({
      data: categories,
      count: categories.length,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}