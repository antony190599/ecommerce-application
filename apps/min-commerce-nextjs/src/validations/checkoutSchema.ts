import { z } from 'zod';

export const checkoutFormSchema = z.object({
  nombre: z.string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),
  
  email: z.string()
    .email({ message: 'Ingrese un email válido' }),
  
  telefono: z.string()
    .min(9, { message: 'El número de teléfono debe tener al menos 9 dígitos' })
    .max(15, { message: 'El número de teléfono no puede exceder los 15 dígitos' })
    .refine((value) => /^\d+$/.test(value), {
      message: 'El teléfono debe contener solo números'
    }),
  
  direccion: z.string()
    .min(5, { message: 'La dirección debe tener al menos 5 caracteres' })
    .max(100, { message: 'La dirección no puede exceder los 100 caracteres' }),
  
  referencia: z.string()
    .max(100, { message: 'La referencia no puede exceder los 100 caracteres' })
    .optional()
    .nullable(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const initialCheckoutFormValues: CheckoutFormValues = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  referencia: '',
} as const;
