import type { Picture, UserRole } from "@prisma/client";
import sharp from "sharp";
import type { InferType } from "yup";

import { userRegistrationSchema } from "./schema";

/** It widens the type */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Pretty<T extends {}> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type NonAdminUserRole = Exclude<UserRole, "ADMIN">;

export type SharpInput = Parameters<typeof sharp>["0"];

// Auth Schema type
export type UserRegistrationBody = InferType<
  typeof userRegistrationSchema
>["body"];

// Auth
export interface UserCreateInput
  extends Pretty<Omit<UserRegistrationBody, "confirmPassword">> {
  username: string;
  avatar?: Pretty<Pick<Picture, "url" | "width" | "height">>;
}
