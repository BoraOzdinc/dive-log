import { z } from "zod";


export const nonEmptyString = z
  .string()
  .transform((t) => t?.trim())
  .pipe(z.string().min(1));