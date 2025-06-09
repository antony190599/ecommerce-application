CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"need_invoice" boolean DEFAULT false,
	"payment_method" varchar NOT NULL,
	"direccion" text,
	"referencia" text,
	"nombre" varchar NOT NULL,
	"email" varchar NOT NULL,
	"telefono" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"customer_name" varchar NOT NULL,
	"customer_email" varchar NOT NULL,
	"customer_phone" varchar NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"unit" text NOT NULL,
	"meta" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"discount_price" numeric(10, 2) DEFAULT '0.00',
	"image_url" text NOT NULL,
	"is_on_sale" boolean DEFAULT false,
	"stock" integer DEFAULT 0 NOT NULL,
	"rating" numeric(2, 1) DEFAULT '0.00',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
