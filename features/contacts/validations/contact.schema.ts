import { z } from "zod";

/**
 * Esquema de validación para un teléfono.
 */
export const phoneSchema = z.object({
  id: z.string("El identificador del teléfono es obligatorio"),

  number: z
    .string("El número de teléfono es obligatorio")
    .min(10, "El teléfono debe contener al menos 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),

  label: z.string().optional(),
});

/**
 * Esquema de validación para un contacto.
 */
export const contactSchema = z.object({
  name: z
    .string("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: z
    .string("El correo electrónico es obligatorio")
    .email("El correo electrónico no es válido"),

  phones: z
    .array(phoneSchema)
    .min(1, "Debe existir al menos un número telefónico"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;