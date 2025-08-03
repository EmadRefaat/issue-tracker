import z from "zod";

export const ValidationSchema = z.object({
  title: z.string().min(1, "min title length is one character").max(250),
  description: z.string().min(1, "min description length is one character"),
});

export const PatchValidaton = z.object({
  title: z
    .string()
    .min(1, "min title length is one character")
    .max(250)
    .optional(),
  description: z
    .string()
    .min(1, "min description length is one character")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required ")
    .optional(),
});
