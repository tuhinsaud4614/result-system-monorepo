import { InferType } from "yup";

import { CODE, IMAGE_MIMES } from "./constants";
import { registerInputSchema } from "./schema";

export type Code = keyof typeof CODE;
export type CodeValue = (typeof CODE)[Code];
export type NonAdminUserRole = "TEACHER" | "STUDENT";
export type IMAGE_MIME = keyof typeof IMAGE_MIMES;

// Auth
export type RegisterInput = InferType<typeof registerInputSchema>;

// User
export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";
