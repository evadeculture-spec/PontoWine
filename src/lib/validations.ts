import { z } from "zod";

/**
 * Esquemas de validação (Zod) partilhados entre formulários (React Hook Form)
 * e a camada de persistência. Mensagens em português de Portugal.
 */

const phoneRegex = /^[0-9 +()-]{6,20}$/;

export const reservationSchema = z.object({
  name: z.string().min(2, "Indique o seu nome."),
  phone: z.string().regex(phoneRegex, "Indique um telefone válido."),
  email: z.string().email("Indique um email válido."),
  date: z.string().min(1, "Escolha uma data."),
  time: z.string().min(1, "Escolha uma hora."),
  party_size: z.coerce
    .number({ invalid_type_error: "Indique o número de pessoas." })
    .int()
    .min(1, "Pelo menos 1 pessoa.")
    .max(40, "Para grupos maiores, contacte-nos diretamente."),
  kind: z.enum(["jantar", "tapas", "prova", "evento", "outro"], {
    required_error: "Escolha o tipo de reserva.",
  }),
  notes: z.string().max(600, "Texto demasiado longo.").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário o seu consentimento para continuar." }),
  }),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const b2bSchema = z.object({
  company_name: z.string().min(2, "Indique o nome do restaurante/empresa."),
  contact_name: z.string().min(2, "Indique o nome do responsável."),
  email: z.string().email("Indique um email válido."),
  phone: z.string().regex(phoneRegex, "Indique um telefone válido."),
  location: z.string().min(2, "Indique a localidade."),
  nif: z
    .string()
    .regex(/^[0-9]{9}$/, "O NIF deve ter 9 dígitos.")
    .optional()
    .or(z.literal("")),
  business_type: z.enum(
    ["restaurante", "hotel", "bar", "loja", "evento", "outro"],
    { required_error: "Escolha o tipo de negócio." }
  ),
  monthly_volume: z.string().max(120).optional(),
  wine_types: z.string().max(300).optional(),
  message: z.string().max(800, "Texto demasiado longo.").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário o seu consentimento para continuar." }),
  }),
});

export type B2BFormValues = z.infer<typeof b2bSchema>;
