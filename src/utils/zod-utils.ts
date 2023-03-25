import { z } from "zod";

export const UserId = z.string().cuid();
export type UserId = z.infer<typeof UserId>;

export const nonEmptyString = z
  .string()
  .transform((t) => t?.trim())
  .pipe(z.string().min(1));