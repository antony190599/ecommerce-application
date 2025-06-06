import { z } from 'zod';

export const quantitySchema = z.object({
  id: z.string(),
  quantity: z
    .number()
    .int()
    .min(0, { message: "La cantidad no puede ser negativa" })
    .refine((val) => val !== 0, {
      message: "Para eliminar el producto use la función remover",
    }),
  maxQuantity: z.number().int().positive()
}).refine((data) => data.quantity <= data.maxQuantity, {
  message: "La cantidad excede el stock disponible",
  path: ["quantity"]
});

export type CartItemQuantity = z.infer<typeof quantitySchema>;