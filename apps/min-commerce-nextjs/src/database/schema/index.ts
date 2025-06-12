import { boolean, integer, numeric, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// Create a table for users
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  isAdmin: boolean('is_admin').default(false),
  password: varchar('password'),
  provider: varchar('provider').default('credentials'),
  providerId: varchar('provider_id'),
  name: varchar('name'),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

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
    userId: uuid('user_id'),
    paymentMethod: varchar('payment_method'),
    direccion: text('direccion'),
    referencia: text('referencia'),
    name: varchar('nombre'),
    email: varchar('email'),
    phone: varchar('telefono'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});


// Create a table for orders
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey(),
    customerName: varchar('customer_name').notNull(),
    customerEmail: varchar('customer_email').notNull(),
    customerPhone: varchar('customer_phone').notNull(),
    customerId: uuid('customer_id'),
    needInvoice: boolean('need_invoice'),
    paymentMethod: varchar('payment_method'),
    direccion: text('direccion'),
    referencia: text('referencia'),
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

// Create a table for categories with self-referential relationship
export const categories = pgTable('categories', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  path: varchar('path').notNull().unique(),
  parentId: varchar('parent_id').references(() => categories.id, { onDelete: 'cascade' }),
  level: integer('level').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

// Add category relationship to products
export const productCategories = pgTable('product_categories', {
  id: uuid('id').primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  categoryId: varchar('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});