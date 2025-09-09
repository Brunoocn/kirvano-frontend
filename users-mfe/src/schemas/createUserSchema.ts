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


export const formSchema = z.object({
  users: z.array(createUserSchema).min(1, "Pelo menos um usuário é obrigatório"),
});

export type FormData = z.infer<typeof formSchema>;

export type CreateUserFormData = z.infer<typeof createUserSchema>;