CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"is_admin" boolean DEFAULT false,
	"password" varchar,
	"provider" varchar DEFAULT 'credentials',
	"provider_id" varchar,
	"name" varchar,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "payment_method" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "nombre" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "telefono" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "need_invoice" boolean;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_method" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "direccion" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "referencia" text;