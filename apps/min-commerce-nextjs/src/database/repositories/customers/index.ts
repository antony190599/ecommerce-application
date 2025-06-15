import { db } from "@/database/db";
import { customers } from "@/database/schema";
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


}