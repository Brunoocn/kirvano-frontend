import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email deve ter um formato válido")
    .max(100, "Email deve ter no máximo 100 caracteres"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email deve ter um formato válido")
    .max(100, "Email deve ter no máximo 100 caracteres"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Senha deve ter pelo menos 6 caracteres",
    })
    .refine((val) => !val || val.length <= 100, {
      message: "Senha deve ter no máximo 100 caracteres",
    }),
});

export const updateUserFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email deve ter um formato válido")
    .max(100, "Email deve ter no máximo 100 caracteres"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type UpdateUserFormOnlyData = z.infer<typeof updateUserFormSchema>;