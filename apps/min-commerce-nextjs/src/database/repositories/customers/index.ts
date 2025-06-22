import { db } from "@/database/db";
import { customers, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export class CustomersRepository {
  static async getCustomerByUserId(userId: string) {
    try {
      const customer = await db.query.customers.findFirst({
        where: eq(customers.userId, userId),
      });

      if (!customer) {
        return null;
      }

      return customer;
    } catch (error) {
      console.error('Error retrieving customer by user ID:', error);
      throw error;
    }
  }

  static async getAllCustomers() {
    try {
      // Obtener todos los clientes con información de usuario relacionada
      const result = await db
        .select({
          id: customers.id,
          name: customers.name,
          email: customers.email,
          phone: customers.phone,
          direccion: customers.direccion,
          referencia: customers.referencia,
          needInvoice: customers.needInvoice,
          paymentMethod: customers.paymentMethod,
          createdAt: customers.createdAt,
          updatedAt: customers.updatedAt,
        })
        .from(customers)
        .leftJoin(users, eq(customers.userId, users.id));
      
      return result;
    } catch (error) {
      console.error('Error retrieving all customers:', error);
      throw error;
    }
  }
}