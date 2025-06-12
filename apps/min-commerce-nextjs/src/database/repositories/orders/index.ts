import { eq, and } from 'drizzle-orm';
import { db } from '../../db';
import { orders, orderItems, products, users, customers } from '../../schema';
import { v4 as uuidv4 } from 'uuid';

export class OrderRepository {
  /**
   * Retrieves all orders associated with a specific user ID
   * @param userId - The UUID of the user
   * @returns Array of orders with their order items
   */
  static async getOrdersByUserId(userId: string) {
    try {
      // First, get the customer associated with this user
      const customer = await db.query.customers.findFirst({
        where: eq(customers.userId, userId),
      });

      if (!customer) {
        return []; // Return empty array if no customer found for this user
      }

      // Get all orders with their items in a single query using left join
      const result = await db
        .select({
          order: orders,
          item: orderItems
        })
        .from(orders)
        .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
        .where(eq(orders.customerId, customer.id))
        .orderBy(orders.createdAt);

      // Group order items by order
      const ordersMap = new Map();
      
      result.forEach(row => {
        const { order, item } = row;
        
        if (!ordersMap.has(order.id)) {
          ordersMap.set(order.id, {
            ...order,
            items: []
          });
        }
        
        // Only add item if it exists (due to left join, some might be null)
        if (item) {
          ordersMap.get(order.id).items.push({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId
          });
        }
      });
      
      // Convert map to array and sort by most recent
      const ordersWithItems = Array.from(ordersMap.values())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      return ordersWithItems;
    } catch (error) {
      console.error('Error retrieving orders by user ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves a single order with its items by order ID
   * @param orderId - The UUID of the order
   * @returns The order with its items or null if not found
   */
  static async getOrderById(orderId: string) {
    try {
      const order = await db.query.orders.findFirst({
        where: eq(orders.id, orderId),
      });

      if (!order) {
        return null;
      }

      const items = await db
        .select({
          id: orderItems.id,
          price: orderItems.price,
          quantity: orderItems.quantity,
          productId: orderItems.productId,
        })
        .from(orderItems)
        .where(eq(orderItems.orderId, orderId));

      return {
        ...order,
        items,
      };
    } catch (error) {
      console.error('Error retrieving order by ID:', error);
      throw error;
    }
  }

  /**
   * Creates an order with order items and associates it with a customer
   * @param userId - The UUID of the user
   * @param orderData - Order data including customer details and items
   * @returns The created order with its items
   */
  static async saveOrderByUserId(userId: string, orderData: {
    customer: {
      needInvoice?: boolean;
      paymentMethod?: string;
      direccion?: string;
      referencia?: string;
      nombre?: string;
      email?: string;
      telefono?: string;
    };
    items: Array<{
      id: string;
      price: string;
      quantity: number;
      stock?: number;
    }>;
    total: string;
  }) {
    try {
      // Check if user exists
      const userExists = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!userExists) {
        throw new Error('User not found');
      }

      // Begin transaction
      return await db.transaction(async (tx) => {
        // Check if customer already exists for this user
        let customerId: string;
        const existingCustomer = await tx.query.customers.findFirst({
          where: eq(customers.userId, userId),
        });

        if (existingCustomer) {
          customerId = existingCustomer.id;
          
          // Update existing customer if new data is provided
          if (orderData.customer) {
            await tx.update(customers)
              .set({
                needInvoice: orderData.customer.needInvoice ?? existingCustomer.needInvoice,
                paymentMethod: orderData.customer.paymentMethod ?? existingCustomer.paymentMethod,
                direccion: orderData.customer.direccion ?? existingCustomer.direccion,
                referencia: orderData.customer.referencia ?? existingCustomer.referencia,
                name: orderData.customer.nombre ?? existingCustomer.name,
                email: orderData.customer.email ?? existingCustomer.email,
                phone: orderData.customer.telefono ?? existingCustomer.phone,
                updatedAt: new Date(),
              })
              .where(eq(customers.id, customerId));
          }
        } else {
          // Create new customer
          customerId = uuidv4();
          await tx.insert(customers).values({
            id: customerId,
            userId,
            needInvoice: orderData.customer.needInvoice ?? false,
            paymentMethod: orderData.customer.paymentMethod ?? '',
            direccion: orderData.customer.direccion ?? null,
            referencia: orderData.customer.referencia ?? null,
            name: orderData.customer.nombre ?? '',
            email: orderData.customer.email ?? '',
            phone: orderData.customer.telefono ?? '',
          });
        }

        // Create order
        const orderId = uuidv4();
        await tx.insert(orders).values({
          id: orderId,
          customerId,
          customerName: orderData.customer.nombre || '',
          customerEmail: orderData.customer.email || '',
          customerPhone: orderData.customer.telefono || '',
          needInvoice: orderData.customer.needInvoice ?? false,
          paymentMethod: orderData.customer.paymentMethod,
          direccion: orderData.customer.direccion || null,
          referencia: orderData.customer.referencia || null,
          total: orderData.total,
          status: 'pending',
        });

        // Create order items and update product stock
        for (const item of orderData.items) {
            const orderItemId = uuidv4();
            await tx.insert(orderItems).values({
                id: orderItemId,
                orderId: orderId,
                productId: item.id,
                price: item.price,
                quantity: item.quantity
            });

            // Update product stock if specified
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

        // Get the created order with all its items
        const order = await tx.query.orders.findFirst({
          where: eq(orders.id, orderId),
        });

        const items = await tx
          .select({
            id: orderItems.id,
            price: orderItems.price,
            quantity: orderItems.quantity,
            productId: orderItems.productId,
          })
          .from(orderItems)
          .where(eq(orderItems.orderId, orderId));

        return {
          ...order,
          items,
        };
      });
    } catch (error) {
      console.error('Error saving order by user ID:', error);
      throw error;
    }
  }
}
