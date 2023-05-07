import { InferType } from "yup";

import { CODE } from "./constants";
import { registerInputSchema } from "./schema";

export type Code = keyof typeof CODE;
export type CodeValue = (typeof CODE)[Code];
export type NonAdminUserRole = "TEACHER" | "STUDENT";

// Auth
export type RegisterInput = InferType<typeof registerInputSchema>;
