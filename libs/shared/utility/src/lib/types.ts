import { Picture, User, UserRole } from "@prisma/client";
import { InferType } from "yup";

import { CODE, IMAGE_MIMES } from "./constants";
import { loginInputSchema, registerInputSchema } from "./schema";

export type Code = keyof typeof CODE;
export type CodeValue = (typeof CODE)[Code];
export type IMAGE_MIME = keyof typeof IMAGE_MIMES;

/** It widens the type */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Pretty<T extends {}> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

// Auth
export type RegisterInput = InferType<typeof registerInputSchema>;
export type LoginInput = InferType<typeof loginInputSchema>;

// User
export type NonAdminUserRole = Exclude<UserRole, "ADMIN">;
export type LeanUser = Omit<
  User,
  "password" | "classRoomId" | "createdAt" | "updatedAt"
>;
export type UserWithAvatar = LeanUser & {
  avatar: LeanPicture | null;
};

// Picture
export type LeanPicture = Pick<Picture, "url" | "width" | "height">;
