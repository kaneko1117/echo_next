import { z } from "zod";

export const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is invalid",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
