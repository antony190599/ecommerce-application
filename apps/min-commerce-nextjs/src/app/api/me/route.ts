import { CustomersRepository } from "@/database/repositories/customers";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session?.user?.userId;
    
    // Use CustomersRepository to get customer by user ID
    const customer = await CustomersRepository.getCustomerByUserId(userId);
    
    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error fetching user information:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch user information' 
    }, { status: 500 });
  }
}