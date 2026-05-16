import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(30, {
      message: "Name must be at most 30 characters",
    }),

  email: z
    .email({
      message: "Invalid email address",
    }),

  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(50, {
      message: "Password must be at most 50 characters",
    }),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(30, {
      message: "Name must be at most 30 characters",
    })
    .optional(),

  email: z
    .email({
      message: "Invalid email address",
    })
    .optional(),
});


// infer allows us to extract the type from a schema
export type LoginFormData =
  z.infer<typeof loginSchema>;

export type RegisterFormData =
  z.infer<typeof registerSchema>;

export type UpdateUserFormData =
  z.infer<typeof updateUserSchema>;