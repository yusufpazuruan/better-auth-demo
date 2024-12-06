import { z } from "zod";

// Auth
export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password too short"),
});

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const twoFactorSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(6, {
    message: "Code must be 6 characters",
  }),
});

// Profile
export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z
    .enum(["user", "admin", "moderator"], {
      message: "Invalid role",
    })
    .default("user"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .superRefine(({ currentPassword, newPassword }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from current password",
        path: ["newPassword"],
      });
    }
  });

// Types(Auth)
export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type TwoFactorValues = z.infer<typeof twoFactorSchema>;

// Types(Profile)
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
