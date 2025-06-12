import { NextResponse } from "next/server";
import { OrderRepository } from "@/database/repositories/orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session?.user?.userId;
    
    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.customer || !body.items || !Array.isArray(body.items) || typeof body.total !== 'number') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    
    // Use OrderRepository to save the order
    const createdOrder = await OrderRepository.saveOrderByUserId(userId, {
      customer: body.customer,
      items: body.items,
      total: body.total.toString() // Convert number to string for compatibility
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order created successfully', 
      order: {
        ...createdOrder,
        date: createdOrder.createdAt,
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create order' 
    }, { status: 500 });
  }
}

// GET endpoint to fetch user orders
export async function GET() {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session?.user?.userId;
    
    // Use OrderRepository to get orders by user ID
    const userOrders = await OrderRepository.getOrdersByUserId(userId);
    
    // Format orders to match expected response structure
    const formattedOrders = userOrders.map(order => ({
      ...order,
      date: order.createdAt
    }));
    
    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch orders' 
    }, { status: 500 });
  }
}
