import { is } from 'drizzle-orm';
import { boolean, integer, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

//Create a table for products
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  price: text('price').notNull(),
  rating: numeric('rating', { precision: 2, scale: 1 }).default("0.0"),
  isOnSale: boolean('is_on_sale').default(false),
  stock: integer('stock').notNull().default(0),
  unit: text('unit').notNull(),
  discount: numeric('discount', { precision: 5, scale: 2 }).default("0.00"),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    needInvoice: text('need_invoice').notNull().default('false'),
    paymentMethod: text('payment_method').notNull(),
    direccion: text('direccion'),
    referencia: text('referencia'),
    nombre: text('nombre').notNull(),
    email: text('email').notNull(),
    telefono: text('telefono').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});


// Create a table for orders
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  total: text('total').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

// Create a table for order items
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: text('order_id').notNull(),
  productId: text('product_id').notNull(),
  productName: text('product_name').notNull(),
  productImageUrl: text('product_image_url').notNull(),
  productPrice: text('product_price').notNull(),
  quantity: text('quantity').notNull(),
  unit: text('unit').notNull(),
  discount: text('discount').default('0'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});