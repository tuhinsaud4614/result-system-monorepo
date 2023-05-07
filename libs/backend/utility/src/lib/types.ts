import type { UserRole } from "@prisma/client";
import type { InferType } from "yup";

import { userRegistrationSchema } from "./schema";

export type NonAdminUserRole = Exclude<UserRole, "ADMIN">;

// Auth
export type UserRegistrationBody = InferType<
  typeof userRegistrationSchema
>["body"];
