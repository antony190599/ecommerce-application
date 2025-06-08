
// Define types for our order data
interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  unit: string;
  discount?: number;
  stock?: number;
}

interface Customer {
  needInvoice: boolean;
  paymentMethod: string;
  direccion?: string;
  referencia?: string;
  nombre?: string;
  email?: string;
  telefono?: string;
}

interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

// In-memory store for orders
const orders: Order[] = [];

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.customer || !body.items || !Array.isArray(body.items) || typeof body.total !== 'number') {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }
    
    // Create new order with generated ID
    const newOrder: Order = {
      id: generateOrderId(),
      customer: body.customer,
      items: body.items,
      total: body.total,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Save order to in-memory store
    orders.push(newOrder);

    console.log('orders:', orders);
    // Optionally, you could save the order to a database here
    
    // Return success response with the created order
    return Response.json({ 
      success: true, 
      message: 'Order created successfully', 
      order: newOrder 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to create order' 
    }, { status: 500 });
  }
}

// Utility function to generate a unique order ID
function generateOrderId(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
}

// GET endpoint to fetch all orders (for testing purposes)
export async function GET() {
  return Response.json({ orders });
}
