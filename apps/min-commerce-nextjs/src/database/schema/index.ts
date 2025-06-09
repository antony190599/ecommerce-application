import { boolean, integer, numeric, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

//Create a table for products
export const products = pgTable('products', {
    id: uuid('id').primaryKey(),
    name: varchar('name').notNull(),
    slug: varchar('slug').notNull().unique(),
    unit: text('unit').notNull(),
    meta: text('meta').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    discountPrice: numeric('discount_price', { precision: 10, scale: 2 }).default("0.00"),
    imageUrl: text('image_url').notNull(),
    isOnSale: boolean('is_on_sale').default(false),
    stock: integer('stock').notNull().default(0),
    rating: numeric('rating', { precision: 2, scale: 1 }).default("0.00"),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

// Create a table for customers
export const customers = pgTable('customers', {
    id: uuid('id').primaryKey(),
    needInvoice: boolean('need_invoice').default(false),
    paymentMethod: varchar('payment_method').notNull(),
    direccion: text('direccion'),
    referencia: text('referencia'),
    nombre: varchar('nombre').notNull(),
    email: varchar('email').notNull(),
    telefono: varchar('telefono').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});


// Create a table for orders
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey(),
    customerName: varchar('customer_name').notNull(),
    customerEmail: varchar('customer_email').notNull(),
    customerPhone: varchar('customer_phone').notNull(),
    total: numeric('price', { precision: 10, scale: 2 }).notNull(),
    status: varchar('status').notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

// Create a table for order items
export const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey(),
    orderId: uuid('order_id').notNull(),
    productId: uuid('product_id').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    quantity: integer('quantity').notNull().default(1),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});