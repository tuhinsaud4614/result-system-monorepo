import type { Picture, User, UserRole } from "@prisma/client";
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

// Picture
export type LeanPicture = Pick<Picture, "url" | "width" | "height">;
// Auth
export interface UserCreateInput
  extends Omit<UserRegistrationBody, "confirmPassword"> {
  username: string;
  avatar?: LeanPicture;
}
export type LeanUser = Omit<
  User,
  "password" | "classRoomId" | "createdAt" | "updatedAt"
>;
export type UserWithAvatar = LeanUser & {
  avatar: LeanPicture | null;
};
