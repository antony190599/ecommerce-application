import { z } from 'zod';

export const checkoutStep1FormSchema = z.object({
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
  
  
});

export  const checkoutStep2FormSchema = z.object({
  direccion: z.string()
    .min(5, { message: 'La dirección debe tener al menos 5 caracteres' })
    .max(100, { message: 'La dirección no puede exceder los 100 caracteres' }),
  
  referencia: z.string()
    .max(100, { message: 'La referencia no puede exceder los 100 caracteres' })
    .optional()
    .nullable(),
});

export type CheckoutStep1FormValues = z.infer<typeof checkoutStep1FormSchema>;
export type CheckoutStep2FormValues = z.infer<typeof checkoutStep2FormSchema>;

export const initialCheckoutStep1FormValues: CheckoutStep1FormValues = {
  nombre: '',
  email: '',
  telefono: '',  
} as const;

export const initialCheckoutStep2FormValues: CheckoutStep2FormValues = {
  direccion: '',
  referencia: '',
} as const;
