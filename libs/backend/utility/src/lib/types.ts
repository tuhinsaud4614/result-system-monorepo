import sharp from "sharp";
import type { InferType } from "yup";

import { userRegistrationSchema } from "./schema";

export type SharpInput = Parameters<typeof sharp>["0"];

// Auth Schema type
export type UserRegistrationBody = InferType<
  typeof userRegistrationSchema
>["body"];
