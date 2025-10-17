import { z } from "zod";

export const videoSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  isPublished: z.boolean(),
});

export type VideoSchema = z.infer<typeof videoSchema>;
