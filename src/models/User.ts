import { z } from "zod";

export const userSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.string(),
    role: z.string(),
    token: z.string(),
    image: z.string().optional(),
  }),
});

export type User = z.infer<typeof userSchema>;
