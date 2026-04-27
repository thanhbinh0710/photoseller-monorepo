import { z } from "zod";

/**
 * Email validation pattern
 * Matches: user@example.com format
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Login form validation schema
 * Used with react-hook-form for client-side validation
 */
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register form validation schema
 * Used with react-hook-form for client-side validation
 */
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Get localized error messages for validation
 * This function maps Zod validation errors to i18n keys for translation
 */
export function getErrorMessageKey(
  field: string,
  errorType: string,
): string | null {
  const errorMap: Record<string, Record<string, string>> = {
    email: {
      required: "auth.login.errorEmail",
      invalid: "auth.login.errorEmailInvalid",
    },
    password: {
      required: "auth.login.errorPassword",
      min: "auth.login.errorPasswordMin",
    },
    firstName: {
      required: "auth.register.errorFirstName",
      min: "auth.register.errorFirstName",
    },
    lastName: {
      required: "auth.register.errorLastName",
      min: "auth.register.errorLastName",
    },
    confirmPassword: {
      required: "auth.register.errorConfirmPassword",
      mismatch: "auth.register.errorPasswordMismatch",
    },
  };

  return errorMap[field]?.[errorType] || null;
}
