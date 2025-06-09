import { orders, orderItems, customers, products } from "@/database/schema";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

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

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.customer || !body.items || !Array.isArray(body.items) || typeof body.total !== 'number') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    
    // Generate UUIDs for the order and customer
    const orderId = uuidv4();
    const customerId = uuidv4();
    
    // Begin a transaction
    return await db.transaction(async (tx) => {
      // Insert customer record
      await tx.insert(customers).values({
        id: customerId,
        needInvoice: body.customer.needInvoice,
        paymentMethod: body.customer.paymentMethod,
        direccion: body.customer.direccion || null,
        referencia: body.customer.referencia || null,
        nombre: body.customer.nombre || '',
        email: body.customer.email || '',
        telefono: body.customer.telefono || ''
      });
      
      // Insert order record
      await tx.insert(orders).values({
        id: orderId,
        customerName: body.customer.nombre || '',
        customerEmail: body.customer.email || '',
        customerPhone: body.customer.telefono || '',
        total: body.total,
        status: 'pending'
      });
      
      // Insert order items
      for (const item of body.items) {
        await tx.insert(orderItems).values({
          id: uuidv4(),
          orderId: orderId,
          productId: item.id,
          price: item.price,
          quantity: item.quantity
        });
        
        // Optionally update product stock
        if (item.stock !== undefined) {
          const product = await tx.select({ stock: products.stock })
            .from(products)
            .where(eq(products.id, item.id))
            .limit(1);
          
          if (product && product.length > 0) {
            const newStock = Math.max(0, product[0].stock - item.quantity);
            await tx.update(products)
              .set({ stock: newStock })
              .where(eq(products.id, item.id));
          }
        }
      }
      
      // Get the created order with all its data to return to the client
      const [createdOrder] = await tx.select()
        .from(orders)
        .where(eq(orders.id, orderId))
        .limit(1);
        
      return NextResponse.json({ 
        success: true, 
        message: 'Order created successfully', 
        order: {
          ...createdOrder,
          date: createdOrder.createdAt,
        }
      }, { status: 201 });
    });
    
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create order' 
    }, { status: 500 });
  }
}

// GET endpoint to fetch all orders
export async function GET() {
  try {
    const allOrders = await db.select().from(orders);
    
    // For each order, fetch its items
    const ordersWithItems = await Promise.all(allOrders.map(async (order) => {
      const items = await db.select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));
        
      return {
        ...order,
        date: order.createdAt,
        items
      };
    }));
    
    return NextResponse.json({ orders: ordersWithItems });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
