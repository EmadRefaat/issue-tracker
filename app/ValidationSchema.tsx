import z from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "min title length is one character").max(250),
  description: z.string().min(1, "min description length is one character"),
});
